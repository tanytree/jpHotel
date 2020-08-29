<!--  前台部 > 客户管理 > 单位管理 > 账务查询  -->
<template>
    <!-- 统一的列表格式 -->
    <div class="boss-index">
        <div class="booking">
            <!-- 查询部分 -->
            <el-form class="term" inline size="small" label-width="80px" v-model="searchForm">
                <el-form-item label="消费门店">
                    <el-select v-model="searchForm.enterStatus" class="width150">
                        <el-option label="全部" value="3">全部</el-option>
                        <el-option label="已认证" value="1">已认证</el-option>
                        <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="挂账单位">
                    <el-select v-model="searchForm.enterStatus" class="width150">
                        <el-option label="全部" value="3">全部</el-option>
                        <el-option label="已认证" value="1">已认证</el-option>
                        <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="结账状态">
                    <el-select v-model="searchForm.enterStatus" class="width150">
                        <el-option label="全部" value="3">全部</el-option>
                        <el-option label="已结" value="1">已认证</el-option>
                        <el-option label="未结" value="2">未认证</el-option>
                    </el-select>
                </el-form-item>
                <br/>
                <el-form-item label="姓名">
                    <el-input v-model="searchForm.content" class="width150"></el-input>
                </el-form-item>
                <el-form-item label="房间号">
                    <el-input v-model="searchForm.content" class="width150"></el-input>
                </el-form-item>
                <el-form-item label="消费日期">
                    <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                    <span style="margin:0 5px">-</span>
                    <el-date-picker v-model="searchForm.endTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit" @click="onSubmit">查询</el-button>
                    <el-button type="primary" class="grey" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
            <!--表格数据 -->
            <el-table ref="multipleTable" v-loading="loading" :data="tableData" height="100%" header-row-class-name="default" size="small">
                <el-table-column prop="createTime" label="消费时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="checkInPerson.checkIn.storesName" label="消费门店" show-overflow-tooltip></el-table-column>
                <el-table-column prop="creditName" label="挂账单位" show-overflow-tooltip></el-table-column>
                <el-table-column prop="consumePrice" label="挂账金额" show-overflow-tooltip></el-table-column>
                <el-table-column prop="checkInPerson.checkIn.name" label="姓名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="checkInPerson.idcard" label="证件号" show-overflow-tooltip></el-table-column>
                <el-table-column label="房型/房号" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        <div v-if="row.checkInPerson.houseName&&row.checkInPerson.houseNum">
                            {{row.checkInPerson.houseName}}/{{row.checkInPerson.houseNum}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="checkInPerson.checkIn.checkinTime" label="入住时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="checkInPerson.checkIn.checkoutTime" label="离店时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="state" label="结算状态" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        <div v-if="row.state==1">未结</div>
                        <div v-if="row.state==2">已结</div>
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
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                loading: false,
                showEdit: false,
                showDetail: false,
                searchForm: {
                    searchType: 1,
                    content: "",
                    enterStatus: "",
                    startTime: "", //考试时件
                    endTime: "", //结束时间
                },
                listTotal: 0, //总条数
                multipleSelection: [], //多选
                tableData: [], //表格数据
            };
        },

        created() {
            this.getDataList();
        },
        methods: {
            // 查询按钮
            onSubmit() {
                this.pageIndex = 1;
                this.getDataList();
            },

            // 重置
            resetForm() {
                this.searchForm = {};
                this.pageIndex = 1;
                this.getDataList();
            },
            //请求 账务列表 接口
            getDataList(params = {}) {
                this.$F.merge(params, {
                    paging: true,
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                });
                this.$F.merge(params, this.searchForm);
                this.$F.doRequest(
                    this,
                    "/pms/consume/enter_finance_order_list",
                    params,
                    (data) => {
                        console.log(data);
                        this.tableData = data.enterOrderLogList;
                        this.listTotal = data.page.count;
                    }
                );
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
