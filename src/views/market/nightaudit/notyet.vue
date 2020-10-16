<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-12 17:15:26
 * @FilePath: \jiudian\src\views\market\nightaudit\notyet.vue
 -->

<template>
    <!-- 统一的列表格式 -->
    <div class="boss-index">
        <div class="booking">
            <!--表格数据 -->
            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="tableData"
                height="100%"
                header-row-class-name="default"
                size="small"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="name" label="预订人"></el-table-column>
                <el-table-column prop="mobile" label="手机号码"></el-table-column>
                <el-table-column
                    prop="createTime"
                    label="预定时间"
                    width="180"
                    align="center"
                ></el-table-column>
                <el-table-column prop="enterName" label="抵离时间" width="220">
                    <template slot-scope="{ row }">
                        <div class="box">
                            <div class="item">
                                <div>
                                    <span class="text-blue">抵</span>{{ row.checkinTime }}
                                </div>
                                <div>
                                    <span class="text-red">离</span>{{ row.checkoutTime }}
                                </div>
                            </div>
                            <div>{{ row.checkinDays }}天</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="deposit" label="订金" width="140" align="center">
                    <template slot-scope="{ row }">
                        {{ row.deposit ? row.deposit : "0" }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderSource"
                    label="订单来源"
                    width="140"
                    align="center"
                ></el-table-column>
                <el-table-column prop="state" label="状态" width="140" align="center">
                    <template slot-scope="{ row }">
                        {{ checkState(row.state) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="checkinType"
                    label="入住类型"
                    width="140"
                    align="center"
                >
                    <template slot-scope="{ row }">
                        {{ F_checkinType(row.checkinType) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="reserveOrderNum"
                    label="预定单号"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="{ row }">
                        <el-button type="text" size="mini">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页 -->
            <div class="block">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="searchForm.page"
                    :page-size="searchForm.page_num"
                    :total="listTotal"
                    layout="total, prev, pager, next, jumper"
                ></el-pagination>
            </div>
        </div>
        <!-- 编辑or详情弹窗 -->
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import myMixin from "@/utils/filterMixin";

export default {
    mixins: [myMixin],
    props: ['data'],
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
            tableData: [], //表格数据
        };
    },

    created() {
        this.initForm();
    },
    methods: {
        initForm() {
            this.searchForm = {
                operCheckinType: "",
                enterName: "",
                houseNum: "",
                thirdOrdernum: "",
                orderNum: "",
                mobile: "",
                name: "",
                orderSource: "",
                checkinType: "",
                checkinTime: "",
                createTime: "",
                state: 9,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true,
            };
            // this.getDataList();
            this.listTotal = this.data.page.count;
            this.tableData = this.data.resreveList;
        },
        checkState(state) {
            switch (state) {
                case 1:
                    return "待确认（预定中）";
                    break;
                case 2:
                    return "已确认预定订单";
                    break;
                case 3:
                    return "拒单";
                    break;
                case 4:
                    return "NOSHOW";
                    break;
                case 5:
                    return "未入住";
                    break;
                case 6:
                    return "已入住";
                    break;
                case 7:
                    return "离店";
                    break;
                case 8:
                    return "已取消订单";
                    break;
                case 9:
                    return "应到未到订单";
                    break;
            }
        },
        /**获取表格数据 */
        getDataList() {
            this.$F.doRequest(
                this,
                "/pms/reserve/reserve_order_list",
                this.searchForm,
                (res) => {
                    this.tableData = res.resreveList;
                    this.listTotal = res.page.count;
                }
            );
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
            this.searchForm.pageSize = val;
            this.searchForm.pageIndex = 1;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.pageIndex = val;
            this.getDataList();
        },
    },
};
</script>
