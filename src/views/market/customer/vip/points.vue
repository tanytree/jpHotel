<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-04 14:27:06
 * @FilePath: /jiudian/src/views/market/customer/vip/points.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
        <!-- 查询部分 -->
        <el-form inline size="small">
            <el-form-item label="发布日期">
              <el-tag type="success">不限</el-tag>&nbsp;&nbsp;
              <el-tag type="success">今日</el-tag>&nbsp;&nbsp;
              <el-tag type="success">昨日</el-tag>&nbsp;&nbsp;
              <el-tag type="success">本周</el-tag>&nbsp;&nbsp;
              <el-tag type="success">本月</el-tag>&nbsp;&nbsp;
              <el-tag type="success">自定义</el-tag>&nbsp;&nbsp;
                <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                <span style="margin:0 5px">-</span>
                <el-date-picker v-model="searchForm.endTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <br />
            <el-form-item label="发生门店">
                <el-select v-model="searchForm.enterStatus">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="操作类型">
                <el-select v-model="searchForm.enterStatus">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="增加" value="1"></el-option>
                    <el-option label="扣除" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="会员类型">
                <el-select v-model="searchForm.enterStatus">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="searchForm.content"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="卡号">
                <el-input v-model="searchForm.content"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="searchForm.content"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="getDataList">查询</el-button>
                <el-button type="primary" @click="initForm">重置</el-button>
            </el-form-item>
            <el-form-item>
               <el-button plain>读会员卡</el-button>
            </el-form-item>
        </el-form>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="enterName" label="卡号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="会员类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="手机号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="增加" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="扣除" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="发生日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="发生门店" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="操作员" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="备注" show-overflow-tooltip></el-table-column>
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
            tableData: [] //表格数据
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
