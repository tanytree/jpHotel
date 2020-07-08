<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-08 15:46:57
 * @FilePath: /jiudian/src/views/market/customer/company/c2.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <el-form-item label="收款门店">
                <el-select v-model="searchForm.enterStatus" class="width150">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位名称">
                <el-select v-model="searchForm.enterStatus" class="width150">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                </el-select>
            </el-form-item>
            <el-row>
            <el-form-item label="收款类型">
                <el-tag type="success">不限</el-tag>&nbsp;&nbsp;
              <el-tag type="success">结算</el-tag>&nbsp;&nbsp;
              <el-tag type="success">预收款</el-tag>&nbsp;&nbsp;
            </el-form-item>
            </el-row>
            <el-row>
            <el-form-item label="支付方式">
                <el-tag type="success">不限</el-tag>&nbsp;&nbsp;
              <el-tag type="success">现金</el-tag>&nbsp;&nbsp;
              <el-tag type="success">银行卡</el-tag>&nbsp;&nbsp;
              <el-tag type="success">支票</el-tag>&nbsp;&nbsp;
              <el-tag type="success">支付宝</el-tag>&nbsp;&nbsp;
              <el-tag type="success">自定义</el-tag>&nbsp;&nbsp;
            </el-form-item>
            </el-row>
            <el-row>
            <el-form-item label="收款时间">
                <el-tag type="success">不限</el-tag>&nbsp;&nbsp;
              <el-tag type="success">今日</el-tag>&nbsp;&nbsp;
              <el-tag type="success">昨日</el-tag>&nbsp;&nbsp;
              <el-tag type="success">上周</el-tag>&nbsp;&nbsp;
              <el-tag type="success">上月</el-tag>&nbsp;&nbsp;
              <el-tag type="success">本月</el-tag>&nbsp;&nbsp;
              <el-tag type="success">自定义</el-tag>&nbsp;&nbsp;
            </el-form-item>
             <el-form-item>
                <el-button type="primary" @click="getDataList">查询</el-button>
                <el-button type="primary" @click="initForm">重置</el-button>
            </el-form-item>
            </el-row>
        
        </el-form>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="enterName" label="单位名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="收款门店" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="收款类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="支付方式" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="收款时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="操作" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="操作人" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini">预收款退款</el-button>
                    <el-button type="text" size="mini">预收款补打</el-button>
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
            tableData: [
                {}
            ] //表格数据
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
