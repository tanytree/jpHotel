<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-07 17:05:49
 * @FilePath: /jiudian/src/views/market/nightaudit/verify.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" @selection-change="handleSelectionChange" size="mini">
            <el-table-column type="index" label="房间号"></el-table-column>
            <el-table-column prop="enterName" label="房型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="客人姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="订单来源" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="入住类别" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="到店时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="预离时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="入住方式" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="价格策略" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="本日房价" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="门市价" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="房价差异" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterStatus" label="操作员" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作">
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
            tableData: [] //表格数据
        };
    },

    mounted() {
        this.initForm();
    },
    methods: {
        initForm() {
            this.searchForm = {
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                pageing: false
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.$F.doRequest(this, '/pms/checkin/pretrial_order_list', this.searchForm, (data) => {
                this.tableData = data;
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
