<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-09 16:13:28
 * @FilePath: \jiudian\src\views\market\orders\bookingList.vue
 -->

<template>
    <!-- 统一的列表格式 -->
    <div class="boss-index">
        <div class="booking">
            <!-- 查询部分 -->
            <el-form class="term" inline size="small" label-width="100px">
                <el-row>
                    <el-form-item :label="$t('desk.order_orderStatus') + ':'">
                        <div class="tagList">
                            <template v-for="(item, key, index) of $t('commons.reserveState')">
                                <el-tag class="tag" :type="searchForm.state == key ? '' : 'info' " :key="index" @click="stateClick(key)"  >{{ item }} </el-tag>
                            </template>
                        </div>
                    </el-form-item>
                </el-row>
<!--                <el-row>-->
<!--                    <el-form-item :label="$t('desk.order_dateList') + ':'">-->
<!--                        <el-tag type="info" @click="timeTypeClick('')">{{-->
<!--                            $t("desk.home_noLimit")-->
<!--                        }}</el-tag>-->
<!--                        <el-tag type="info" @click="timeTypeClick('1')">{{-->
<!--                            $t("desk.customer_lastWeek")-->
<!--                        }}</el-tag>-->
<!--                        <el-tag type="info" @click="timeTypeClick('7')">{{-->
<!--                            $t("desk.customer_today")-->
<!--                        }}</el-tag>-->
<!--                        <el-tag type="info" @click="timeTypeClick('8')">{{-->
<!--                            $t("desk.customer_thisWeek")-->
<!--                        }}</el-tag>-->
<!--                        <el-tag type="info" @click="timeTypeClick('9')">{{-->
<!--                            $t("desk.order_nextWeek")-->
<!--                        }}</el-tag>-->
<!--                        <el-tag type="info">{{-->
<!--                            $t("desk.book_theCustom")-->
<!--                        }}</el-tag>-->
<!--                    </el-form-item>-->
<!--                    &lt;!&ndash;<el-form-item label="">-->
<!--                              <el-date-picker v-model="searchForm.checkinTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>-->
<!--                          </el-form-item>&ndash;&gt;-->
<!--                </el-row>-->
<!--                <el-row>-->
<!--                    <el-form-item :label="$t('desk.order_bookDate') + ':'">-->
<!--                        <el-tag type="info">{{-->
<!--                            $t("desk.home_noLimit")-->
<!--                        }}</el-tag>-->
<!--                        <el-tag type="info">{{-->
<!--                            $t("desk.customer_lastWeek")-->
<!--                        }}</el-tag>-->
<!--                        <el-tag type="info">{{-->
<!--                            $t("desk.customer_today")-->
<!--                        }}</el-tag>-->
<!--                        <el-tag type="info">{{-->
<!--                            $t("desk.customer_thisWeek")-->
<!--                        }}</el-tag>-->
<!--                        <el-tag type="info">{{-->
<!--                            $t("desk.order_nextWeek")-->
<!--                        }}</el-tag>-->
<!--                        <el-tag type="info">{{-->
<!--                            $t("desk.book_theCustom")-->
<!--                        }}</el-tag>-->
<!--                    </el-form-item>-->
<!--                    &lt;!&ndash;<el-form-item label="">-->
<!--                              <el-date-picker v-model="searchForm.createTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>-->
<!--                          </el-form-item>&ndash;&gt;-->
<!--                </el-row>-->
                <el-row>
<!--                    <el-form-item :label="$t('commons.checkInTypeDesc')">-->
<!--                        <el-select-->
<!--                            v-model="searchForm.checkinType"-->
<!--                            class="width150"-->
<!--                        >-->
<!--                            <el-option-->
<!--                                :value="key"-->
<!--                                v-for="(item, key, index) of $t(-->
<!--                                    'commons.checkinType'-->
<!--                                )"-->
<!--                                :label="item"-->
<!--                                :key="index"-->
<!--                            ></el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
                    <el-form-item :label="$t('desk.book_orderSoutce')">
                        <el-select
                            v-model="searchForm.orderSource"
                            class="width150"
                        >
                            <el-option
                                :value="key"
                                v-for="(item, key, index) of $t(
                                    'commons.orderSource'
                                )"
                                :label="item"
                                :key="index"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('desk.order_teamName') + ':'">
                        <el-input
                            v-model="searchForm.enterName"
                            class="width150"
                        ></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.order_bookOrderNum') + ':'">
                        <el-input
                            v-model="searchForm.orderNum"
                            class="width150"
                        ></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item :label="$t('desk.home_bookPeople')">
                        <el-input
                            v-model="searchForm.name"
                            class="width150"
                        ></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.home_phoneNum') + ':'">
                        <el-input
                            v-model="searchForm.mobile"
                            class="width150"
                        ></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.home_roomType')">
                        <el-select
                            v-model="searchForm.enterStatus"
                            class="width150"
                        >
                            <el-option
                                :label="
                                    item.houseName
                                        ? item.houseName
                                        : $t('desk.home_unknown')
                                "
                                :value="item.roomTypeId"
                                v-for="(item, index) of roomTypeList"
                                :key="index"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('desk.home_roomNum')">
                        <el-input
                            v-model="searchForm.houseNum"
                            class="width150"
                        ></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item :label="$t('desk.order_outOrderNum') + ':'">
                        <el-input
                            v-model="searchForm.thirdOrdernum"
                            class="width150"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getDataList">{{
                            $t("commons.queryBtn")
                        }}</el-button>
                        <el-button type="primary" @click="initForm">{{
                            $t("commons.resetBtn")
                        }}</el-button>
<!--                        <el-button type="primary">{{-->
<!--                            $t("commons.exportBtn")-->
<!--                        }}</el-button>-->
                    </el-form-item>
                </el-row>
            </el-form>
            <!--表格数据 -->
            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="tableData"
                height="100%"
                header-row-class-name="default"
                size="small"
            >
                <el-table-column
                    prop="name"
                    :label="$t('desk.home_bookPeople')"
                ></el-table-column>
                <el-table-column
                    prop="mobile"
                    :label="$t('commons.mobile')"
                ></el-table-column>
                <el-table-column
                    prop="createTime"
                    :label="$t('desk.order_bookTime')"
                    width="160px"
                ></el-table-column>
                <el-table-column
                    prop=""
                    :label="$t('desk.nightAudit.arriveTime')"
                    width="220"
                >
                    <template slot-scope="{ row }">
                        <div class="box">
                            <div class="item">
                                <div>
                                    <span class="text-blue">{{
                                        $t("desk.customer_arrived")
                                    }}</span
                                    >{{ row.checkinTime }}
                                </div>
                                <div>
                                    <span class="text-red">{{
                                        $t("desk.customer_leave")
                                    }}</span
                                    >{{ row.checkoutTime }}
                                </div>
                            </div>
                            <div>
                                {{ row.checkinDays }}{{ $t("desk.order_day") }}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('desk.customer_roomKind')"
                    width="140"
                >
                    <template slot-scope="{ row }">
                        {{ row.checkInRoomList.length>0?row.checkInRoomList[0].roomTypeName:''}}{{row.checkInRoomList.length>0?'/':''}}{{ row.checkInRoomList.length>0?row.checkInRoomList[0].houseNum:''}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="deposit"
                    :label="$t('desk.downPayment')"
                    width="100"
                    align="center"
                >
                    <template slot-scope="{ row }">
                        {{ row.deposit || 0 }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="totalRoomPrice"
                    :label="$t('desk.order_totalRoomPrice')"
                    width="100"
                    align="center"
                >
                    <template slot-scope="{ row }">
                        {{ row.totalRoomPrice || 0 }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    :label="$t('desk.book_orderSoutce')"
                    width="100"
                    align="center"
                >
                    <template slot-scope="{ row }">
                        {{ F_orderSource(row.orderSource) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    :label="$t('food.common.status')"
                    width="100"
                    align="center"
                >
                    <template slot-scope="{ row }">
                        {{ F_reserveState(row.state) }}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commons.operating')" width="220">
                    <template slot-scope="{ row }">
                        <el-button type="text" size="mini" @click="handelDetail(row)">{{ $t("commons.detail") }}</el-button>
                        <template v-if="row.state != 7">
                            <el-button type="text" size="mini" v-if="!row.deposit" @click="handleDeposit(row)">{{ $t("desk.order_deposit") }}</el-button>
                            <el-button type="text" size="mini" v-if="row.state == 5" @click="handleNoshow(row)">NOSHOW</el-button>
                            <el-button type="text" size="mini" v-if="row.state == 1" @click="handleCancel(row)">{{ $t("commons.cancel") }}</el-button>
                            <!--                        只有当渠道订单才会有接收和拒单-->
                            <el-button type="text" size="mini" v-if="row.state == 1 && row.orderSource == 3" @click="handleAccept(row)">{{ $t("desk.order_accept") }}</el-button>
                            <el-button type="text" size="mini" v-if="row.state == 1 && row.orderSource == 3" @click="handleRefuse(row)">{{ $t("desk.book_reject") }}</el-button>
                            <el-button type="text" size="mini" v-if="row.state == 8" @click="handleReset(row)">{{ $t("desk.order_restore") }}</el-button>
                            <!--                        <el-button type="text" size="mini" v-if="row.state==4" @click="handleReset(row)">撤销</el-button>-->
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页 -->
            <div class="block">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="searchForm.pageIndex"
                    :page-size="searchForm.pageSize"
                    :total="listTotal"
                    layout="total, prev, pager, next, jumper"
                ></el-pagination>
            </div>
        </div>
        <!-- 编辑or详情弹窗 -->
        <el-dialog
            top="0"
            title="NOSHOW"
            :visible.sync="noShowDiaShow"
            width="600px"
            center
        >
            <el-form :model="currentItem" style="margin-top: -20px" size="mini">
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            :label="$t('desk.order_bookOrderNum') + ':'"
                            class=""
                        >
                            {{ currentItem.orderNum }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            :label="$t('desk.home_bookPeople')"
                            class=""
                        >
                            {{ currentItem.name }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            :label="$t('desk.order_accountingService') + ':'"
                            class=""
                        >
                            NOSHOW{{ $t("desk.serve_roomPrice") }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            :label="$t('desk.customer_sum') + ':'"
                            class=""
                        >
                            <el-input
                                type="text"
                                disabled
                                v-model="currentItem.deposit"
                                style="width: 150px"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            :label="$t('desk.home_note') + ':'"
                            class=""
                        >
                            <el-input
                                type="textarea"
                                v-model="currentItem.remark"
                                style="width: 450px"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="noShowDiaShow = false">{{
                    $t("commons.cancel")
                }}</el-button>
                <el-button type="primary" @click="confirmNoshow">{{
                    $t("commons.confirm")
                }}</el-button>
            </span>
        </el-dialog>
        <!--交订金-->
        <el-dialog
            :title="$t('desk.order_payDeposit')"
            :visible.sync="depositShow"
        >
            <el-form
                :model="consumeOperForm"
                ref="deposit"
                size="mini"
                label-width="100px"
            >
                <el-row>
                    <el-col :span="8"
                        >{{ $t("desk.order_bookOrderNum") }}：{{
                            currentItem.reserveOrderNum
                        }}</el-col
                    >
                    <el-col :span="8"
                        >{{ $t("desk.home_bookPeople") }}：{{
                            currentItem.name
                        }}</el-col
                    >
                </el-row>
                <br />
                <el-form-item :label="$t('desk.order_payProject') + ':'">
                    <el-radio-group v-model="consumeOperForm.priceType">
                        <el-radio-button :label="1" :value="1">{{
                            $t("desk.downPayment")
                        }}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('desk.customer_sum') + ':'">
                    <el-input
                        class="width100"
                        v-model="consumeOperForm.payPrice"
                        :autofocus="true"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.home_note') + ':'">
                    <el-input
                        class="width200"
                        type="textarea"
                        v-model="consumeOperForm.remark"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <!--            <el-form-item label="打印单据：">-->
                <!--                <el-checkbox v-model="consumeOperForm.name"></el-checkbox>-->
                <!--            </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="depositShow = false">{{
                    $t("commons.close")
                }}</el-button>
                <el-button type="primary" @click="consume_oper(1, 'deposit')"
                    >{{ $t("desk.customer_settlement") }}
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="$t('desk.order_selectPayWay')"
            :visible.sync="payTypeShow"
        >
            <el-form :model="consumeOperForm" size="mini">
                <el-form-item label="">
                    <el-radio-group v-model="consumeOperForm.payType">
                        <el-radio  v-for="(value, key) in $t('commons.payType')" :label="key" :key="key">{{value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="payTypeShow = false">{{
                    $t("commons.close")
                }}</el-button>
                <el-button type="primary" @click="payTypeShow = false">{{
                    $t("desk.customer_settlement")
                }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import myMixin from "@/utils/filterMixin";

export default {
    mixins: [myMixin],
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
            noShowDiaShow: false,
            showDetail: false,
            depositShow: false,
            payTypeShow: false,
            searchForm: {
                pageIndex:1,
                pageSize:10,
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [], //表格数据
            roomTypeList: [],
            currentItem: {},
            consumeOperForm: {
                priceType: "1",
                payType: "",
                name: "",
            },
        };
    },
    mounted() {
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
                state: "0",
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true,
                filterType: 1,
            };
            this.realtime_room_statistics();
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            let params = this.$F.deepClone(this.searchForm);
            if (params.state == '0')
                params.state = '';
            this.$F.doRequest(
                this,
                "/pms/reserve/reserve_order_list",
                params,
                (res) => {
                    this.tableData = res.resreveList;
                    this.listTotal = res.page.count;
                }
            );
        },
        realtime_room_statistics() {
            this.$F.doRequest(
                this,
                "/pms/realtime/realtime_room_statistics",
                this.searchForm,
                (res) => {
                    this.roomTypeList = res.roomTypeList;
                }
            );
        },
        stateClick(key) {
            if (key == '0')
                key = '';
            this.searchForm.state = key;
            this.getDataList();
        },

        timeTypeClick(key) {
            this.searchForm.timeType = key;
            this.getDataList();
        },
        handleNoshow(item) {
            this.currentItem = item;
            this.noShowDiaShow = true;
        },
        handleDeposit(item) {
            this.currentItem = item;
            this.depositShow = true;
        },
        handelDetail(item) {
            this.$router.push("/bookingDetail?id=" + item.id);
        },
        confirmNoshow() {
            let params = {
                checkInReserveId: this.currentItem.id,
                state: 4,
            };
            this.$F.doRequest(
                this,
                "/pms/reserve/reserve_oper",
                params,
                (res) => {
                    this.noShowDiaShow = false;
                    this.getDataList();
                    this.$message({
                        message: this.$t("commons.request_success"),
                        type: "success",
                    });
                }
            );
        },

        handleCancel(item) {
            let params = {
                checkInReserveId: item.id,
                state: 8,
            };
            this.$confirm(
                this.$t("desk.order_sureDelete"),
                this.$t("commons.tip_desc"),
                {
                    confirmButtonText: this.$t("commons.confirm"),
                    cancelButtonText: this.$t("commons.cancel"),
                    type: "warning",
                }
            )
                .then(() => {
                    this.$F.doRequest(
                        this,
                        "/pms/reserve/reserve_oper",
                        params,
                        (res) => {
                            this.getDataList();
                            this.$message({
                                message: this.$t("commons.request_success"),
                                type: "success",
                            });
                        }
                    );
                })
                .catch(() => {});
        },
        handleAccept(item) {
            let params = {
                checkInReserveId: item.id,
                state: 2,
            };
            this.$confirm(
                this.$t("commons.order_sureGet"),
                this.$t("commons.tip_desc"),
                {
                    confirmButtonText: this.$t("commons.confirm"),
                    cancelButtonText: this.$t("commons.cancel"),
                    type: "warning",
                }
            )
                .then(() => {
                    this.$F.doRequest(
                        this,
                        "/pms/reserve/reserve_oper",
                        params,
                        (res) => {
                            this.getDataList();
                            this.$message({
                                message: this.$t("commons.request_success"),
                                type: "success",
                            });
                        }
                    );
                })
                .catch(() => {});
        },
        handleRefuse(item) {
            let params = {
                checkInReserveId: item.id,
                state: 3,
            };
            this.$confirm(
                this.$t("desk.order_sureReject"),
                this.$t("commons.tip_desc"),
                {
                    confirmButtonText: this.$t("commons.confirm"),
                    cancelButtonText: this.$t("commons.cancel"),
                    type: "warning",
                }
            )
                .then(() => {
                    this.$F.doRequest(
                        this,
                        "/pms/reserve/reserve_oper",
                        params,
                        (res) => {
                            this.getDataList();
                            this.$message({
                                message: this.$t("commons.request_success"),
                                type: "success",
                            });
                        }
                    );
                })
                .catch(() => {});
        },
        handleReset(item) {
            let params = {
                checkInReserveId: item.id,
                state: 1,
            };
            this.$confirm(this.$t("desk.order_sureOperate"), this.$t("commons.tip_desc"),
                {confirmButtonText: this.$t("commons.confirm"), cancelButtonText: this.$t("commons.cancel"), type: "warning",})
                .then(() => {
                    this.$F.doRequest(this, "/pms/reserve/reserve_oper", params,
                        (res) => {
                            this.getDataList();
                            this.$message({
                                type: "success",
                                message: this.$t("commons.request_success"),
                            });
                        }
                    );
                })
                .catch(() => {});
        },
        consume_oper(type, formName) {
            /**
             * 1.订金
             * 2.退订金
             *
             * **/
            let params = this.consumeOperForm;
            params.checkinReserveId = this.currentItem.id;

            if (this.currentItem.checkInRoomList.length) {
                params.roomId = this.currentItem.checkInRoomList[0].id;
                params.roomNum = this.currentItem.checkInRoomList[0].houseNum;
            } else {
                this.$message.error(this.$t("desk.order_rowHouses"));
                return;
            }

            //订金，退订金
            if (type == 1 || type == 2) {
                //这个type没什么意义，只是按照开发顺序或者按钮顺序来做个简单处理
                params.state = 2;
                if (!params.priceType) {
                    this.$message.error(this.$t("desk.order_selectPayProject"));
                    return;
                }
                // if (params.priceType == 1 && !params.payType) {
                //     this.payTypeShow = true
                //     return
                // }
                if (params.priceType == 1) {
                    if (params.payPrice < 0 || params.payPrice == 0) {
                        this.$message.error(this.$t("desk.order_inputThan"));
                        return;
                    }
                }
                if (params.priceType == 4) {
                    // params.priceType == 1
                    if (params.consumePrice > 0 || params.consumePrice == 0) {
                        this.$message.error(
                            this.$t("desk.order_inputMinusPrice")
                        );
                        return;
                    }
                }
            }
            //冲调
            if (type == 3) {
                //这个type没什么意义，只是按照开发顺序或者按钮顺序来做个简单处理
                params.state = 2;

                // params.priceType == 1
                if (params.consumePrice > 0 || params.consumePrice == 0) {
                    this.$message.error(this.$t("desk.order_inputMinusPrice"));
                    return;
                }
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$F.doRequest(
                        this,
                        "/pms/consume/consume_oper",
                        params,
                        (res) => {
                            this.depositShow = false;
                            this.getDataList();
                        }
                    );
                } else {
                    console.log("error submit!!");
                    return false;
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
            this.searchForm.pageSize = val;
            this.searchForm.pageIndex = 1;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.pageIndex = val;
            this.getDataList();
            this.searchForm.pageIndex = 1;
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
