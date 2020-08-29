<!--  前台部 > 客户管理 > 单位管理 > 账套管理  -->
<template>
    <!-- 统一的列表格式 -->
    <div class="boss-index">
        <div class="booking">
            <!-- 查询部分 -->
            <el-form class="term demo-form-inline" inline size="small" label-width="80px">
                <el-form-item label="单位名称">
                    <el-select v-model="searchForm.enterStatus" class="width150">
                        <el-option label="全部" value="3">全部</el-option>
                        <el-option label="已认证" value="1">已认证</el-option>
                        <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账套名">
                    <el-input v-model="searchForm.content" class="width150"></el-input>
                </el-form-item>

                <el-form-item label="状态">
                    <el-select v-model="searchForm.enterStatus" class="width150">
                        <el-option label="全部" value="3">全部</el-option>
                        <el-option label="已结" value="1">已结</el-option>
                        <el-option label="未结" value="2">未结</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit" @click="getDataList">查询</el-button>
                    <el-button type="primary" class="grey" @click="initForm">重置</el-button>
                </el-form-item>
                <el-form-item class="form-inline-flex">
                    <el-button type="primary" class="submit">+新增</el-button>
                </el-form-item>
            </el-form>
            <!--表格数据 -->
            <el-table ref="multipleTable" v-loading="loading" :data="tableData" height="100%" header-row-class-name="default" size="small">
                <el-table-column prop="enterType" label="单位名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterType" label="账套名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterType" label="挂账金额" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterType" label="结算金额" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterType" label="状态" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterType" label="创建人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterType" label="创建时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterType" label="结账人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterType" label="结账时间" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="220">
                    <template slot-scope="{row}">
                        <el-button type="text" size="mini">编辑</el-button>
                        <el-button type="text" size="mini">结账</el-button>
                        <el-button type="text" size="mini">撤销结账</el-button>
                        <el-button type="text" size="mini">结算单补打</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页 -->
            <div class="block">
                <el-pagination @current-change="handleCurrentChange" :current-page="searchForm.page" :page-size="searchForm.page_num" :total="listTotal" layout="total, prev, pager, next, jumper"></el-pagination>
            </div>
        </div>
        <!-- 编辑or详情弹窗 -->
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";

    export default {
        computed: {
            ...mapState({
                token: (state) => state.user.token,
                userId: (state) => state.user.userId,
                msgKey: (state) => state.config.msgKey,
                plat_source: (state) => state.config.plat_source,
            }),
        },
        data() {
            return {
                loading: false,
                showEdit: false,
                showDetail: false,
                searchForm: {
                    searchType: 1,
                    content: "",
                    enterStatus: "",
                    pageIndex: 1, //当前页
                    pageSize: 10, //页数
                    startTime: "", //考试时件
                    endTime: "", //结束时间
                },
                listTotal: 0, //总条数
                multipleSelection: [], //多选
                tableData: [{}], //表格数据
            };
        },

        mounted() {
            this.initForm();
        },
        methods: {
            initForm() {
                this.searchForm = {
                    searchType: 1,
                    content: "",
                    enterStatus: "",
                    pageIndex: 1, //当前页
                    pageSize: 10, //页数
                    startTime: "", //考试时件
                    endTime: "", //结束时间
                };
                this.getDataList();
            },
            /**获取表格数据 */
            getDataList() {
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
            },
        },
    };
</script>
