<!--
 * @Date: 2020-08-27 13:25:04
 * @Author: 陶子
 * @LastEditTime: 2020-12-24 15:49:19
 * @FilePath: \jiudian\src\views\finance\report\table.vue
-->
<template>
  <div>
    <el-card class="box-card" :body-style="{ padding: '10px  20px 0px' }">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          style="cursor: pointer; font-weight: 600"
          @click.native="backLastStack"
          >报表</el-breadcrumb-item
        >
        <el-breadcrumb-item style="font-weight: 700">详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <div style="margin-top: 10px" v-loading="loading">
      <el-card class="box-card2" :body-style="{ height: 'min: 600px' }">
        <el-form ref="searchForm" :model="searchForm" inline>
          <!-- 日计表-->
          <el-form-item
            label="营业时间："
            v-if="searchForm.reportNum == '1001'"
          >
            <el-date-picker
              v-model="searchForm.startTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="营业时间"
            ></el-date-picker>
          </el-form-item>
          <!-- 月报账表-->
          <el-form-item
            label="营业时间："
            v-if="searchForm.reportNum == '1003'"
          >
            <el-date-picker
              v-model="searchForm.startTime"
              type="month"
              value-format="yyyy-MM"
              placeholder="营业时间"
            ></el-date-picker>
          </el-form-item>
          <!-- 选择多个日期 -->
          <el-form-item
            label="选择日期:"
            v-if="
              reportType == '11' ||
              reportType == '12' ||
              reportType == '37' ||
              reportType == '38'
            "
          >
            <el-date-picker
              v-model="searchForm.startTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始时间"
            ></el-date-picker>
            <span style="margin: 0 5px">-</span>
            <el-date-picker
              v-model="searchForm.endTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束时间"
            ></el-date-picker>
          </el-form-item>
          <!-- 选择单个日期 -->
          <el-form-item
            label="选择日期:"
            v-if="
              reportType == '13' ||
              reportType == '35' ||
              reportType == '14' ||
              reportType == '39' ||
              reportType == '40' ||
              reportType == '42' ||
              reportType == '25' ||
              reportType == '28' ||
              reportType == '26' ||
              reportType == '27' ||
              reportType == '29'
            "
          >
            <el-date-picker
              v-model="searchForm.startTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="选择月份:" v-if="reportType == '34'">
            <el-date-picker
              v-model="searchForm.startTime"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择月份"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="选择月份:" v-if="reportType == '36'">
            <el-date-picker
              v-model="searchForm.startTime"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择月份"
            ></el-date-picker>
            <span style="margin: 0 5px">-</span>
            <el-date-picker
              v-model="searchForm.startTime"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择月份"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            label="选择单位:"
            style="margin: 0 20px"
            v-if="
              reportType == '11' || reportType == '12' || reportType == '13'
            "
          >
            <el-select v-model="searchForm.enterName" filterable clearable>
              <el-option
                v-for="(item, index) in unitList"
                :key="index"
                :label="item.enterName"
                :value="item.enterName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="客户名称:"
            style="margin: 0 20px"
            v-if="
              reportType == '13' ||
              reportType == '14' ||
              reportType == '39' ||
              reportType == '40'
            "
          >
            <el-autocomplete
              v-model="searchForm.name"
              :fetch-suggestions="remoteMethod"
              placeholder="请输入内容"
              @select="changeName"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item
            label="团队名:"
            style="margin: 0 20px"
            v-if="reportType == '42'"
          >
            <el-autocomplete
              v-model="searchForm.name"
              :fetch-suggestions="remoteMethod"
              placeholder="请输入内容"
              @select="changeName"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="queryReport"
              v-if="reportType != '41'"
              >查询</el-button
            >
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
import { getLanguage, setLanguage } from "@/utils/auth";
import axios from "axios";
import XLSX from "xlsx";

export default {
  data() {
    return {
      loading: false,
      reportType: "", //报表类型  reportNum 的子集
      currentReport: {}, //当前report
      exportPrintShow: false,
      content: "", //excel显示的内容
      searchForm: {},
      sourcePage: null,
      unitList: null,
      options: [],
    };
  },
  mounted() {
    this.getUnitList();
    this.searchForm = {
      languageType: getLanguage() == "ri" ? 2 : 1, //语言类型  1中文  2日文
      reportNum: "", //报表模板种类
      startTime: "",
      endTime: "",
    };
    this.content = "";
    this.sourcePage = this.$route.params.sourcePage; //判定是总办的页面还是前台部的页面
    this.searchForm.reportNum = this.$route.params.reportNum; //接收报表的reportNum
    this.reportType = this.$route.params.reportType || 1; //接收报表的reportType
    if (this.reportType == "41") {
      this.queryReport();
    }
  },
  methods: {
    exportReport() {
      if (this.currentReport.reportHttpUrl) {
        location.href = this.currentReport.reportHttpUrl;
      } else {
        this.$message({
          message: "前先查询要导出的报表",
          type: "warning",
        });
      }
    },
    backLastStack() {
      this.$router.go(-1);
    },
    remoteMethod(query, cb) {
      let params = {
        name: query,
        searchType: 1,
        pageIndex: 1,
        pageSize: 999,
        paging: false,
      };
      this.$F.doRequest(
        this,
        "/pms/checkin/checkin_order_list",
        params,
        (res) => {
          this.options = res.roomPersonList || [];
          console.log(this.options);
          if (this.reportType == "42") {
            this.options.forEach((item) => {
              item.value = item.teamName;
            });
          } else {
            this.options.forEach((item) => {
              item.value = item.name;
            });
          }
          cb(this.options);
        }
      );
    },
    changeName(e) {
      console.log(e);
    },

    //请求 单位 列表
    getUnitList() {
      this.$F.doRequest(this, "/pms/hotelenter/list", {}, (res) => {
        this.unitList = res.list;
        console.log(this.unitList);
      });
    },
    queryReport() {
      //组织报表入参 需要根据不同得reportType做判断
      this.content = "";
      this.searchForm.languageType = getLanguage() == "ri" ? 2 : 1; //语言类型  1中文  2日文
      if (
        this.searchForm.reportNum == 1001 ||
        this.searchForm.reportNum == 1003
      ) {
        this.searchForm.endTime = this.searchForm.startTime;
      } else if (this.searchForm.reportNum == 1004) {
        //陶子加下
      }
      this.$F.doRequest(
        this,
        "/pms/report/select_report",
        this.searchForm,
        (res) => {
          if (res.logList && res.logList.length > 0) {
            let array = res.logList.filter((item) => {
              return item.reportNum == this.searchForm.reportNum;
            });
            this.currentReport = array[0];
            this.showReport(array[0].reportHttpUrl);
          }
          this.exportPrintShow = true;
        }
      );
    },
    showReport(url) {
      // var url = "http://39.104.116.153:8887/report/fs/20201202123355.xlsx" //放在public目录下的文件可以直接访问
      //               http://39.104.116.153:8887/report/fs/1001/20201203/%E6%97%A5%E8%A8%88%E8%A1%A8201203.xlsx
      //读取二进制excel文件,参考https://github.com/SheetJS/js-xlsx#utility-functions
      axios
        .get(url, { responseType: "arraybuffer" })
        .then((res) => {
          var data = new Uint8Array(res.data);
          var wb = XLSX.read(data, { type: "array" });
          var sheets = wb.Sheets;
          this.content = this.transformSheets(sheets);
        })
        .catch((err) => {
          this.err = err;
        });
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
