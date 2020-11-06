<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-06 10:23:22
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
                <el-table-column prop="name" :label="$t('desk.home_bookPeopleA')"></el-table-column>
                <el-table-column prop="mobile" :label="$t('desk.order_moblePhoneA')"></el-table-column>
                <el-table-column
                    prop="createTime"
                    :label="$t('desk.nightAudit.schedulerTime')"
                    width="180"
                    align="center"
                ></el-table-column>
                <el-table-column prop="enterName" :label="$t('desk.order_toLiveTime')" width="220">
                    <template slot-scope="{ row }">
                        <div class="box">
                            <div class="item">
                                <div>
                                    <span class="text-blue">{{$t('desk.customer_arrived')}}</span>{{ row.checkinTime }}
                                </div>
                                <div>
                                    <span class="text-red">{{$t('desk.customer_leave')}}</span>{{ row.checkoutTime }}
                                </div>
                            </div>
                            <div>{{ row.checkinDays }}{{$t('desk.order_day')}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="deposit" :label="$t('desk.downPayment')" width="140" align="center">
                    <template slot-scope="{ row }">
                        {{ row.deposit ? row.deposit : "0" }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderSource"
                    :label="$t('desk.book_orderSoutce')"
                    width="140"
                    align="center"
                ></el-table-column>
                <el-table-column prop="state" :label="$t('food.common.status')" width="140" align="center">
                    <template slot-scope="{ row }">
                        {{ checkState(row.state) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="reserveOrderNum"
                    :label="$t('frontOffice.nightAudit.reservationNumber')"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column :label="$t('commons.operating')" width="100">
                    <template slot-scope="{ row }">
                        <el-button type="text" size="mini" @click="goDetail(row)">{{$t('commons.detail')}}</el-button>
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
                state: '9',
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
        goDetail(item) {
            this.$router.push(`/bookingDetail?id=${item.id}`)
        },
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
            this.getDataList();
        },
        checkState(state) {
            switch (state) {
                case 1:
                    return this.$t('desk.book_waiteSure');
                    break;
                case 2:
                    return this.$t('desk.book_sureBook');
                    break;
                case 3:
                    return this.$t('desk.book_reject');
                    break;
                case 4:
                    return "NOSHOW";
                    break;
                case 5:
                    return this.$t('desk.book_notCheckin');
                    break;
                case 6:
                    return this.$t('desk.book_checkin');
                    break;
                case 7:
                    return this.$t('desk.book_leaveStore');
                    break;
                case 8:
                    return this.$t('desk.book_canceOrder');
                    break;
                case 9:
                    return this.$t('desk.nightAudit.notyet');
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
                    this.$forceUpdate();
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
