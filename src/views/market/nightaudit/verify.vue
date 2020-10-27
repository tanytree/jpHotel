<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-27 16:03:10
 * @FilePath: \jiudian\src\views\market\nightaudit\verify.vue
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
                <el-table-column prop="index" :label="$t('desk.home_roomNum')">
                    <template slot-scope="{ row }">
                        {{
                            row.hotelCheckInRoom
                                ? row.hotelCheckInRoom.houseNum
                                : ""
                        }}
                    </template>
                </el-table-column>
                <el-table-column prop="" :label="$t('desk.home_roomType')">
                    <template slot-scope="{ row }">
                        {{
                            roomTypeFn(
                                row.hotelCheckInRoom
                                    ? row.hotelCheckInRoom.roomTypeId
                                    : ""
                            )
                        }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    :label="$t('desk.order_guestName')"
                ></el-table-column>
                <el-table-column
                    prop="orderSource"
                    :label="$t('desk.book_orderSoutce')"
                    width="100"
                    align="center"
                >
                    <template slot-scope="{ row }">
                        {{ F_orderSource(row.orderSource) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="operCheckinType"
                    :label="$t('manager.finance_kind')"
                    width="100"
                    align="center"
                >
                    <template slot-scope="{ row }">
                        {{ F_operCheckinType(row.operCheckinType) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="checkinTime"
                    :label="$t('frontOffice.nightAudit.arriveTime')"
                    width="180"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="checkoutTime"
                    :label="$t('desk.order_departureTime')"
                    width="180"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="checkinType"
                    :label="$t('desk.order_checkinWay')"
                    width="100"
                    align="center"
                >
                    <template slot-scope="{ row }">
                        {{ F_checkinType(row.checkinType) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="enterStatus"
                    :label="$t('desk.customer_pricingStrategy')"
                    width="120"
                    align="center"
                >
                    <template slot-scope="{ row }">
                        {{ setStrategyName(row.salesId) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    :label="$t('frontOffice.nightAudit.todayPrice')"
                    width="120"
                    align="center"
                >
                    <template slot-scope="{ row }">
                        {{
                            row.hotelCheckInRoom
                                ? row.hotelCheckInRoom.roomTodayPrice
                                : ""
                        }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    :label="$t('manager.hk_doorPrice')"
                    width="120"
                    align="center"
                >
                    <template slot-scope="{ row }">
                        {{
                            row.hotelCheckInRoom
                                ? row.hotelCheckInRoom.roomMarkPrice
                                : ""
                        }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    :label="$t('frontOffice.nightAudit.priceDifference')"
                    width="100"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="creatorName"
                    :label="$t('desk.customer_operator')"
                    width="100"
                    align="center"
                >
                </el-table-column>
                <el-table-column :label="$t('commons.operating')" width="120">
                    <template slot-scope="{ row }">
                        <el-button type="text" size="mini" @click="goDetail(row)">{{
                            $t("commons.detail")
                        }}</el-button>
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
import { mapState, mapActions } from "vuex";
import myMixin from "@/utils/filterMixin";
export default {
    mixins: [myMixin],
    props: ["data"],
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
                paging: true,
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [], //表格数据
            roomTypeList: [],
            strategyList: [],
        };
    },

    mounted() {
        this.initForm();
        this.hotel_room_type_list();
    },
    methods: {
        goDetail(item) {
            this.$router.push(`/orderdetail?id=${item.id}`)
        },
        initForm() {
            this.searchForm = {
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true,
            };
            // this.tableData = this.data.roomPersonList;
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.$F.doRequest(
                this,
                "/pms/checkin/pretrial_order_list",
                this.searchForm,
                (data) => {
                    this.tableData = data.roomPersonList;
                    this.listTotal = data.page.count;
                    console.log(data);
                }
            );
        },
        setStrategyName(id) {
            for (let k in this.strategyList) {
                if (this.strategyList[k].id == id) {
                    return this.strategyList[k].ruleName;
                }
            }
            return "";
        },
        /**价格策略单位列表 */
        hotel_price_enter_strategy_list() {
            this.$F.doRequest(
                this,
                "/pms/hotel/hotel_price_enter_strategy_list",
                {},
                (res) => {
                    this.strategyList = res;
                }
            );
        },

        hotel_room_type_list() {
            let params = {
                pageIndex: 1,
                pageSize: 999,
                roomType: 3,
            };
            this.$F.doRequest(
                this,
                "/pms/hotel/hotel_room_type_list",
                params,
                (data) => {
                    this.roomTypeList = data.list;
                    // this.listTotal = data.page.count
                    console.log(data);
                }
            );
        },
        roomTypeFn(id) {
            for (let k in this.roomTypeList) {
                if (this.roomTypeList[k].id == id) {
                    return this.roomTypeList[k].houseName;
                }
            }
            return "";
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
        },
    },
};
</script>
