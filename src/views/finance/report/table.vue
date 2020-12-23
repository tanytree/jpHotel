<!--
 * @Date: 2020-08-27 13:25:04
 * @Author: 陶子
 * @LastEditTime: 2020-12-23 17:26:23
 * @FilePath: \jiudian\src\views\finance\report\table.vue
-->
<template>
    <div>
        <el-card class="box-card" :body-style="{ padding: '10px  20px 0px' }">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item style="cursor: pointer; font-weight: 600" @click.native="backLastStack">报表</el-breadcrumb-item>
                <el-breadcrumb-item style="font-weight: 700">详情</el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
        <div style="margin-top: 10px" v-loading="loading">
            <el-card class="box-card2" :body-style="{ height: 'min: 600px' }">
                <el-form ref="searchForm" :model="searchForm" inline>
                    <!--  总经理办公室日计报表-->
                    <el-form-item label="营业时间：" v-if="searchForm.reportNum == '1001'">
                        <el-date-picker v-model="searchForm.startTime" type="date" value-format="yyyy-MM-dd" placeholder="营业时间"></el-date-picker>
                    </el-form-item>

                    <!-- 总经理办公室月计报表-->
                    <el-form-item label="营业时间：" v-if="searchForm.reportNum == '1003'">
                        <el-date-picker v-model="searchForm.startTime" type="month" value-format="yyyy-MM-dd" placeholder="营业时间"></el-date-picker>
                    </el-form-item>

                    <!--  其他等等 陶子弄下-->

                    <el-form-item>
                        <el-button type="primary" @click="queryReport">查询</el-button>
                        <!--            <el-button type="primary">打印</el-button>-->
                        <el-button type="primary" @click="exportReport">导出</el-button>
                    </el-form-item>
                </el-form>
                <div class="task-list">
                    <table style="border: 1px solid black" v-if="content !== ''">
                        <!-- 设置居中,如果没获取到内容则不显示 -->
                        <tr>
                            <th v-for="h in content[0]" :key="h.id">{{ h }}</th>
                        </tr>
                        <!-- 循环读取数据并显示 -->
                        <tr v-for="row in content.slice(1)" :key="row.id">
                            <td v-for="item in row" :key="item.id">{{ item }}</td>
                        </tr>
                    </table>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import {getLanguage, setLanguage} from "@/utils/auth";
import axios from "axios";
import XLSX from "xlsx";

export default {
    data() {
        return {
            loading: false,
            reportNum: '',
            reportType: '',   //报表类型  reportNum 的子集
            currentReport: {},  //当前report
            exportPrintShow: false,
            content: '',
            selectForm: {
                region: "shanghai",
            },
            searchForm: {},
            sourcePage: null,
        };
    },
    mounted() {
        this.searchForm = {
            languageType: getLanguage() == 'ri' ? 2 : 1,  //语言类型  1中文  2日文
            reportNum: this.reportNum,  //报表模板种类
            startTime: '',
            endTime: '',
            time: "",
        },
        this.sourcePage = this.$route.query.sourcePage;
        this.searchForm.reportNum = this.$route.query.reportNum;
        this.reportType = this.$route.query.reportType || 1;
    },
    methods: {
        exportReport() {
            location.href = this.currentReport.reportHttpUrl;
        },
        backLastStack() {
            this.$router.go(-1);
        },

        queryReport() {
            this.content = '';
            this.searchForm.languageType = getLanguage() == 'ri' ? 2 : 1;  //语言类型  1中文  2日文
            if (this.searchForm.reportNum == 1001 || this.searchForm.reportNum == 1003) {
                this.searchForm.endTime = this.searchForm.startTime;
            } else {
                //陶子加下
            }
            this.$F.doRequest(
                this, "/pms/report/select_report", this.searchForm,
                (res) => {
                    if (res.logList && res.logList.length > 0) {
                        let array = res.logList.filter( (item) => {
                            return item.reportNum == this.searchForm.reportNum;
                        })
                        this.currentReport = array[0];
                        this.showReport(array[0].reportHttpUrl);
                    }
                    this.exportPrintShow = true;
                }
            );
        },
        showReport(url) {
            var url = "http://39.104.116.153:8887/report/fs/20201202123355.xlsx" //放在public目录下的文件可以直接访问
            //               http://39.104.116.153:8887/report/fs/1001/20201203/%E6%97%A5%E8%A8%88%E8%A1%A8201203.xlsx
            //读取二进制excel文件,参考https://github.com/SheetJS/js-xlsx#utility-functions
            axios.get(url, {responseType: 'arraybuffer'})
                .then((res) => {
                    var data = new Uint8Array(res.data)
                    var wb = XLSX.read(data, {type: "array"})
                    var sheets = wb.Sheets
                    this.content = this.transformSheets(sheets)
                }).catch(err => {
                this.err = err
            })
        },

        transformSheets(sheets) {
            let a = this;
            var content = [];
            var content1 = [];
            var tmplist = [];
            let index = 1;
            for (let key in sheets) {
                if (index == a.reportType) {
                    //读出来的workbook数据很难读,转换为json格式,参考https://github.com/SheetJS/js-xlsx#utility-functions
                    tmplist.push(XLSX.utils.sheet_to_json(sheets[key]).length);
                    content1.push(XLSX.utils.sheet_to_json(sheets[key]));
                    break;
                }
                index += 1;
            }
            var maxLength = Math.max.apply(Math, tmplist);
            //进行行列转换
            for (let y in [...Array(maxLength)]) {
                content.push([]);
                for (let x in [...Array(tmplist.length)]) {
                    try {
                        for (let z in content1[x][y]) {
                            content[y].push(content1[x][y][z]);
                        }
                    } catch (error) {
                        content[y].push(" ");
                    }
                }
            }
            content.unshift([]);
            index = 1;
            for (let key in sheets) {
                if (index == a.reportType) {
                    content[0].push(key);
                    break;
                }
                index += 1;
            }
            return content;
        },
    },
};
</script>

<style lang='less' scoped>
.box-card {
    width: 100%;
}

.el-card .el-card__body {
    padding: 0 20px;
}

.box-card2 {
    height: 100%;
}

.overLine {
    width: 100%;
    border: 1px solid rgba(225, 225, 225, 1);
    margin-bottom: 20px;
}
</style>
