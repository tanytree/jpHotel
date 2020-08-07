<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-07 17:25:15
 * @FilePath: /jiudian/src/views/market/nightaudit/leave.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" @selection-change="handleSelectionChange" size="mini">
            <el-table-column type="index" label="客人名称"></el-table-column>
            <el-table-column prop="enterName" label="手机号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="入住时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="预离时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="房间号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="客源类别" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="总消费" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="在住状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="结账状态" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="{row}">
                    <el-button type="text">详情</el-button>
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
            tableData: [] //表格数据
        };
    },

    mounted() {
        this.initForm();
    },
    methods: {
        initForm() {
            this.searchForm = {
                mobile: '',
                idcard: '',
                name: '',
                searchType: 2,
                outType:4,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.loading = true;
            this.$F.doRequest(this, '/pms/checkin/checkin_order_list', this.searchForm, (res) => {
                this.loading = false
                this.tableData = res.roomPersonList;
                this.listTotal = res.page.count
            })
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
