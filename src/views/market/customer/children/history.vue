<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-08 16:20:28
 * @FilePath: /jiudian/src/views/market/customer/children/history.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
         <!-- 头部导航 -->
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/customer' }">客史档案</el-breadcrumb-item>
                <el-breadcrumb-item>客史</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <h3>客史记录-张三</h3>
            <el-form-item label="发生门店：">
                <el-input v-model="searchForm.content" class="width150"></el-input>
            </el-form-item>
            <el-form-item label="房类：">
                <el-select v-model="searchForm.enterStatus" class="width150">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="会场" value="1"></el-option>
                    <el-option label="客房" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入住人：">
                <el-input v-model="searchForm.content" class="width150"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="入住日期：">            
                <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                <span style="margin:0 5px">至</span>
                <el-date-picker v-model="searchForm.endTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="离店日期：">            
                <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                <span style="margin:0 5px">至</span>
                <el-date-picker v-model="searchForm.endTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getDataList">查询</el-button>
                <el-button type="primary" @click="initForm">重置</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button type="primary">+新增</el-button>
                <el-button type="primary">批量设置</el-button>
            </el-form-item>
            <el-row>
                <el-form-item>
                    <el-button type="text">开卡总数：999</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="enterName" label="入住人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="入住-离店日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="天数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="房类" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="入住方式" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="房间号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="房型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="总房价" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="总消费" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="发生门店" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="订单号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="同来宾客" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top:10px"></div>
        <!--分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.page" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.page_num" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
    </el-card>
    <!-- 编辑or详情弹窗 -->
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
export default {
    computed: {
        ...mapState({
            token: state => state.user.token,
            userId: state => state.user.userId,
            msgKey: state => state.config.msgKey,
            plat_source: state => state.config.plat_source
        })
    },
    data() {
        return {
            loading: false,
            showEdit: false,
            showDetail: false,
            searchForm: {
                searchType: 1,
                content: '',
                enterStatus: '',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [{}] //表格数据
        };
    },

    mounted() {
        // this.initForm();
    },
    methods: {
        initForm() {
            this.searchForm = {
                searchType: 1,
                content: '',
                enterStatus: '',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.searchForm.token = this.token
            this.searchForm.plat_source = this.plat_source
            this.searchForm.userId = this.userId
            console.log(JSON.stringify(this.searchForm))
            this.loading = true;
            enterprise_list(this.searchForm).then(res => {
                this.loading = false
                if (res.code == 200) {
                    this.tableData = res.data;
                    this.listTotal = res.data.total;
                }
            });
        },
        /**编辑 */
        editRowItem(row) {
            // 加载组件
            this.showEdit = true;
            //   组件加载完成调用组件内initdata 方法
            this.$nextTick(() => {
                //   可能没有详情接口的直接传row显示
                this.refs.editRef.initdata(row.id);
            });
        },

        handelRowItem(row) {
            // 加载组件
            this.showDetail = true;
            //   组件加载完成调用组件内initdata 方法
            this.$nextTick(() => {
                //   可能没有详情接口的直接传row显示
                this.refs.detailRef.initdata(row.id);
            });
        },

        /**多选 */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /**每页数 */
        handleSizeChange(val) {
            this.searchForm.page_num = val;
            this.searchForm.page = 1;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.page = val;
            this.getDataList();
        }
    }
};
</script>
