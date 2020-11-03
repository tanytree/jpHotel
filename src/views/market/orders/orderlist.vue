<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-28 15:13:49
 * @FilePath: \jiudian\src\views\market\orders\orderlist.vue
 -->

<template>
    <!-- 统一的列表格式 -->
    <div class="boss-index">
        <div class="booking flex_column">
            <!-- 查询部分 -->
            <el-form class="term" inline size="small" label-width="130px">
                <el-form-item :label="$t('desk.order_orderType')">
                    <div class="tagList">
                        <template v-for="(item, key, index) of $t( 'frontOffice.orderType' )">
                            <el-tag class="tag" :type=" searchForm.orderType == key ? '' : 'info'" style="cursor: pointer" :key="index"
                                    @click="orderTypeClick(key)">{{ item }}</el-tag>
                        </template>
                    </div>
                </el-form-item>
                <br />
                <el-form-item :label="$t('desk.order_departureDate')">
                    <div class="tagList" style="display: inline-block">
                        <template v-for="(item, key, index) of $t( 'frontOffice.leaveDate' )">
                            <el-tag style="cursor: pointer" class="tag" :type=" searchForm.leaveDate == key ? '' : 'info'"
                                    :key="index" @click="leaveDateClick(key)">{{ item }}</el-tag>
                        </template>
                    </div>
                    <el-form-item label v-if="searchForm.leaveDate == 10">
                        <el-date-picker
                            v-model="searchForm.outStartTime"
                            value-format="yyyy-MM-dd"
                            type="date"
                            style="width: 140px"
                            :placeholder="$t('desk.serve_chooseDate')"
                        ></el-date-picker>
                        <span style="margin: 0 5px">-</span>
                        <el-date-picker
                            v-model="searchForm.outEndTime"
                            value-format="yyyy-MM-dd"
                            type="date"
                            style="width: 140px"
                            :placeholder="$t('desk.serve_chooseDate')"
                        ></el-date-picker>
                    </el-form-item>
                </el-form-item>

                <br />
                <el-form-item :label="$t('desk.order_checkinWay')">
                    <div class="tagList" style="display: inline-block">
                        <template v-for="(item, key, index) of $t( 'frontOffice.checkInRoomType' )">
                            <el-tag style="cursor: pointer" class="tag" :type=" searchForm.checkInRoomType == key ? '' : 'info'"
                                    :key="index" @click="checkInRoomTypeClick(key)">{{ item }}</el-tag>
                        </template>
                    </div>
                    <el-form-item :label="$t('desk.order_checkinTime')">
                        <el-date-picker
                            v-model="searchForm.inStartTime"
                            value-format="yyyy-MM-dd"
                            type="date"
                            style="width: 140px"
                            :placeholder="$t('desk.serve_chooseDate')"
                        ></el-date-picker>
                        <span style="margin: 0 5px">-</span>
                        <el-date-picker
                            v-model="searchForm.inEndTime"
                            value-format="yyyy-MM-dd"
                            type="date"
                            style="width: 140px"
                            :placeholder="$t('desk.serve_chooseDate')"
                        ></el-date-picker>
                    </el-form-item>
                </el-form-item>
                <br />
                <el-form-item :label="$t('desk.book_orderSoutce')">
                    <el-select :placeholder="$t('commons.placeChoose')" v-model="searchForm.orderSource" class="width150">
                        <el-option :value="key" v-for="(value, key, index) of $t( 'commons.orderSource' )" :label="value" :key="index"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item :label="$t('desk.home_customersCategory')">
                    <el-select v-model="searchForm.guestType" class="width150" :placeholder="$t('commons.placeChoose')">
                        <el-option :value="key" v-for="(item, key, index) of $t( 'commons.guestType' )" :label="item" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('desk.home_roomType')">
                    <el-select v-model="searchForm.roomTypeId" class="width150" :placeholder="$t('commons.placeChoose')">
                        <el-option :label="$t('desk.home_all')" value>{{
                            $t("desk.home_all")
                        }}</el-option>
                        <el-option :value="item.id" v-for="(item, index) of roomTypeList" :label="item.houseName" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('desk.order_outOrder')">
                    <el-input
                        v-model="searchForm.thirdOrdernum"
                        class="width150"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.home_name')">
                    <el-input
                        v-model="searchForm.name"
                        class="width150"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.home_roomNum')">
                    <el-input
                        v-model="searchForm.roomNum"
                        class="width150"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.book_orderNum')">
                    <el-input
                        v-model="searchForm.orderNum"
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
<!--                    <el-button type="primary" @click="initForm">{{-->
<!--                        $t("commons.exportBtn")-->
<!--                    }}</el-button>-->
                </el-form-item>
                <!-- <el-form-item style="float: right">
            <el-button type="text" icon="el-icon-arrow-up">收起</el-button>
          </el-form-item> -->
            </el-form>
            <!--表格数据 -->
            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="tableData"
                header-row-class-name="default"
                height="100%"
                size="small"
            >
                <el-table-column
                    prop="name"
                    :label="$t('desk.home_name')"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="mobile"
                    width="140px"
                    :label="$t('desk.order_moblePhone')"
                ></el-table-column>
                <el-table-column
                    prop="checkinTime"
                    :label="$t('desk.order_checkinDate')"
                    width="160px"
                ></el-table-column>
                <el-table-column
                    prop="checkoutTime"
                    :label="$t('desk.order_departureTime')"
                    width="160px"
                ></el-table-column>
                <el-table-column
                    prop="hotelCheckInRoom.houseNum"
                    :label="$t('desk.home_roomNum')"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="hotelCheckInRoom.roomTypeName"
                    :label="$t('desk.home_roomType')"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop
                    :label="$t('desk.home_customersCategory')"
                    width="120px"
                >
                    <template slot-scope="{ row }">{{
                        F_guestType(row.guestType)
                    }}</template>
                </el-table-column>
                <el-table-column
                    prop
                    :label="$t('desk.book_orderSoutce')"
                    width="120px"
                >
                    <template slot-scope="{ row }">{{
                        F_orderSource(row.orderSource)
                    }}</template>
                </el-table-column>
                <el-table-column
                    prop
                    :label="$t('desk.order_liveState')"
                    width="120px"
                >
                    <template slot-scope="{ row }" style="color: red">
                        <!-- <span
                            v-if="
                                row.state == 3 ||
                                row.state == 4 ||
                                row.state == 5
                            "
                            style="color: red"
                        >
                            {{ F_checkinState(row.state) }}
                        </span>
                        <span v-if="row.state == 1 || row.state == 2">
                            {{ F_checkinState(row.state) }}
                        </span> -->
                        <span v-if="!row.billType">在住</span>
                        <span
                            v-if="
                                row.billType == 2 ||
                                row.billType == 3 ||
                                row.billType == 4
                            "
                            >离店</span
                        >
                        <span v-if="row.billType == 1 || row.billType == 5"
                            >已退房</span
                        >
                    </template>
                </el-table-column>
                <el-table-column
                    prop
                    :label="$t('desk.order_checkStatus')"
                    width="100px"
                >
                    <template slot-scope="{ row }">
                        <!-- {{ F_billType(row.billType || "0") }} -->
                        <span
                            v-if="
                                !row.billType ||
                                row.billType == 2 ||
                                row.billType == 3 ||
                                row.billType == 4
                            "
                            >{{ F_billType("0") }}</span
                        >
                        <span v-if="row.billType == 1 || row.billType == 5">{{
                            F_billType("1")
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commons.operating')" width="240">
                    <template slot-scope="{ row }">
                        <el-button
                            type="text"
                            size="mini"
                            @click="popClick(row, 'detail')"
                            >{{ $t("commons.detail") }}</el-button
                        >
                        <!--              这里未退房或者今日预离订单才可以操作结账-->
                        <el-button
                            type="text"
                            size="mini"
                            v-if="row.orderType == 1 || row.orderType == 2"
                            @click="popClick(row, 'detail')"
                            >{{ $t("desk.order_invoicing") }}</el-button
                        >
                        <!--              @click="settleAccounts(row)"-->
                        <el-button
                            type="text"
                            size="mini"
                            @click="popClick(row, 'invoicing')"
                            >{{ $t("desk.order_invoice") }}</el-button
                        >
                        <el-button
                            type="text"
                            size="mini"
                            v-if="
                                row.orderType == 3 ||
                                row.orderType == 4 ||
                                row.orderType == 5
                            "
                            @click="popClick(row, 'unCheckOut')"
                            >{{ $t("desk.order_notCheckout") }}</el-button
                        >
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
        <!-- 开发票 -->
        <invoicing ref="invoicing" />
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import myMixin from "@/utils/filterMixin";
import invoicing from "./coms/invoicing";
export default {
    mixins: [myMixin],
    components: {
        invoicing,
    },
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
            consumeOperForm: {
                payType: "1",
                consumePrice: "",
                remark: "",
                ifPrint: false, //false 为不选中 true 为选中
            },
            itemInfo: null, //每一条数据的信息
            checkOutShow: false, //结账弹框
            loading: false,
            showEdit: false,
            showDetail: false,
            searchForm: {},
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [], //表格数据
            roomTypeList: [],
            rules: {
                payType: [
                    {
                        required: true,
                        message: "请选择",
                        trigger: "change",
                    },
                ],
                consumePrice: [
                    {
                        required: true,
                        // message: "请输入金额",
                        message: this.$t("commons.mustInput"),
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    mounted() {
        this.initForm();
    },

    methods: {
        orderTypeClick(key) {
            this.searchForm.orderType = key;
            this.getDataList();
        },
        initForm() {
            this.searchForm = {
                leaveDate: "",
                checkInRoomType: "",
                orderType: "",
                mobile: "",
                idcard: "",
                name: "",
                searchType: 2,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true,
            };
            this.room_type_list();
            this.getDataList();
        },
        //点击结账按钮
        settleAccounts(row) {
            this.itemInfo = row;
            console.log(this.itemInfo);
            this.checkOutShow = true;
        },
        /**获取表格数据 */
        getDataList() {
            this.loading = true;
            this.$F.doRequest(
                this,
                "/pms/checkin/checkin_order_list",
                this.searchForm,
                (res) => {
                    this.loading = false;
                    this.tableData = res.roomPersonList;
                    this.listTotal = res.page.count;
                }
            );
        },
        /**房型下拉框 */
        room_type_list() {
            this.loading = true;
            this.$F.doRequest(
                this,
                "/pms/hotel/room_type_list",
                this.searchForm,
                (res) => {
                    this.loading = false;
                    this.roomTypeList = res.roomtype;
                }
            );
        },

        popClick(item, type) {
            if (type == "detail") {
                //跳转至订单详情
                this.$router.push("/orderdetail?id=" + item.id);
            } else if (type == "zoujie") {
                //调用走结接口（这里实在不知道走结怎么翻译）
            } else if (type == "unCheckOut") {
                //调用撤销退房接口
            } else if (type == "invoicing") {
                //开发票
                this.$refs.invoicing.init(item);
            }
        },

        checkInRoomTypeClick(key) {
            this.searchForm.checkInRoomType = key ? key : "";
            this.getDataList();
        },
        leaveDateClick(key) {
            let that = this;
            let date = "";
            this.searchForm.leaveDate = key;
            function getCalcDate(v = 0) {
                var datetime = new Date();
                datetime.setDate(datetime.getDate() + v);
                console.log(datetime);
                var year = datetime.getFullYear();
                var month =
                    datetime.getMonth() + 1 < 10
                        ? "0" + (datetime.getMonth() + 1)
                        : datetime.getMonth() + 1;
                var date =
                    datetime.getDate() < 10
                        ? "0" + datetime.getDate()
                        : datetime.getDate();
                return year + "-" + month + "-" + date;
            }

            switch (key * 1) {
                case 0:
                    that.searchForm.outStartTime = "";
                    that.searchForm.outEndTime = "";
                    break;
                case 1:
                    date = getCalcDate(0);
                    that.searchForm.outStartTime = date;
                    that.searchForm.outEndTime = date;
                    break;
                case 2:
                    date = getCalcDate(-1);
                    that.searchForm.outStartTime = date;
                    that.searchForm.outEndTime = date;
                    break;
                case 3:
                    date = getCalcDate(1);
                    that.searchForm.outStartTime = date;
                    that.searchForm.outEndTime = date;
                    break;
                case 4:
                    that.searchForm.outStartTime = getCalcDate(1);
                    that.searchForm.outEndTime = getCalcDate(3);
                    break;
                case 5:
                    that.searchForm.outStartTime = getCalcDate(-2);
                    that.searchForm.outEndTime = getCalcDate(0);
                    break;
                case 6:
                    that.searchForm.outStartTime = getCalcDate(-6);
                    that.searchForm.outEndTime = getCalcDate(0);
                    break;
                case 7:
                    (function prevMonth() {
                        var nowdays = new Date();
                        var year = nowdays.getFullYear();
                        var month = nowdays.getMonth();
                        if (month == 0) {
                            month = 12;
                            year = year - 1;
                        }
                        if (month < 10) {
                            month = "0" + month;
                        }
                        var myDate = new Date(year, month, 0);
                        that.searchForm.outStartTime =
                            year + "-" + month + "-01"; //上个月第一天
                        that.searchForm.outEndTime =
                            year + "-" + month + "-" + myDate.getDate(); //上个月最后一天
                    })();
                    break;
                case 8:
                    (function prevMonth() {
                        var nowdays = new Date();
                        var year = nowdays.getFullYear();
                        var month = nowdays.getMonth() + 1;
                        if (month == 0) {
                            month = 12;
                            year = year - 1;
                        }
                        if (month < 10) {
                            month = "0" + month;
                        }
                        var myDate = new Date(year, month, 0);
                        that.searchForm.outStartTime =
                            year + "-" + month + "-01"; //上个月第一天
                        that.searchForm.outEndTime =
                            year + "-" + month + "-" + myDate.getDate(); //上个月最后一天
                    })();
                    break;
                case 9:
                    (function prevMonth() {
                        var nowdays = new Date();
                        var year = nowdays.getFullYear();
                        var month = nowdays.getMonth() + 2;
                        if (month == 0) {
                            month = 12;
                            year = year - 1;
                        }
                        if (month < 10) {
                            month = "0" + month;
                        }
                        var myDate = new Date(year, month, 0);
                        that.searchForm.outStartTime =
                            year + "-" + month + "-01"; //上个月第一天
                        that.searchForm.outEndTime =
                            year + "-" + month + "-" + myDate.getDate(); //上个月最后一天
                    })();
                    break;
                case 10:
                    //不操作，手动输入日期
                    // that.searchForm.outStartTime = ''
                    // that.searchForm.outEndTime = ''
                    break;
                default:
                    this.searchForm.outStartTime = "";
                    this.searchForm.outEndTime = "";
            }
            this.getDataList();
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

<style lang="less" scoped>
.tagList .tag {
    margin-right: 5px;
}
.base p {
    font-size: 12px;
}

.cost {
    background: #fff;

    .wrap {
        padding: 20px 15px;

        span.fee {
            font-size: 26px;
            color: #dc3e3e;
            display: inline-block;
            vertical-align: middle;
            margin-right: 50px;
        }

        .costNum {
            display: inline-block;
            font-size: 16px;
            vertical-align: middle;
            border-left: 1px solid #eee;
            padding-left: 50px;
        }
    }
}
</style>
