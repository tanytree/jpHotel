<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-03 15:02:23
 * @FilePath: \jiudian\src\views\market\orders\bookingList.vue
 -->

<template>
    <!-- 统一的列表格式 -->
    <div class="boss-index">
        <div class="booking">
            <el-collapse v-model="queryFormIndex">
                <el-collapse-item :title="$t('commons.moreOperatingA')" class="term" name="query">
                    <!-- 查询部分 -->
                    <el-form class="term" inline size="small" label-width="100px">
                        <el-row v-if="storesNum == $F.getHQCode()">
                            <el-form-item :label="$t('manager.hp_hotelName')+':'">
                                <el-select v-model="searchForm.storesNum">
                                    <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item :label="$t('desk.order_orderStatus') + ':'">
                                <div class="tagList">
                                    <template v-for="(item, key, index) of reserveStatusObject">
                                        <el-tag class="tag" :type="searchForm.state == key ? '' : 'info'" :key="index" @click="stateClick(key)">{{ item }}</el-tag>
                                    </template>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item :label="$t('desk.order_dateList') + ':'">
                                <el-tag :type="searchForm.checkInTimeType == '' ? '' : 'info'" @click="timeTypeClick('')">{{
                                        $t("desk.home_noLimit")
                                    }}</el-tag>
                                <el-tag :type="searchForm.checkInTimeType == '1' ? '' : 'info'" @click="timeTypeClick('1')">{{
                                        $t("desk.customer_lastWeek")
                                    }}</el-tag>
                                <el-tag :type="searchForm.checkInTimeType == '2' ? '' : 'info'" @click="timeTypeClick('2')">{{
                                        $t("desk.customer_today")
                                    }}</el-tag>
                                <el-tag :type="searchForm.checkInTimeType == '3' ? '' : 'info'" @click="timeTypeClick('3')">{{
                                        $t("desk.customer_thisWeek")
                                    }}</el-tag>
                                <el-tag :type="searchForm.checkInTimeType == '4' ? '' : 'info'" @click="timeTypeClick('4')">{{
                                        $t("desk.order_nextWeek")
                                    }}</el-tag>
                                <el-tag :type="searchForm.checkInTimeType == '10' ? '' : 'info'" @click="timeTypeClick('10')">{{
                                        $t("desk.book_theCustomA")
                                    }}</el-tag>
                            </el-form-item>
                            <el-form-item label="" v-if="searchForm.checkInTimeType==10">
                                <el-date-picker v-model="searchForm.cstartTime" value-format="yyyy-MM-dd" type="date" style="width: 140px"></el-date-picker>
                                <el-date-picker v-model="searchForm.cendTime" value-format="yyyy-MM-dd" type="date" style="width: 140px"></el-date-picker>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item :label="$t('desk.order_bookDate') + ':'">
                                <el-tag :type="searchForm.createTimeType == '' ? '' : 'info'" @click="dateNum('')">{{
                                        $t("desk.home_noLimit")
                                    }}</el-tag>
                                <el-tag :type="searchForm.createTimeType == '1' ? '' : 'info'" @click="dateNum('1')">{{
                                        $t("desk.customer_lastWeek")
                                    }}</el-tag>
                                <el-tag :type="searchForm.createTimeType == '2' ? '' : 'info'" @click="dateNum('2')">{{
                                        $t("desk.customer_today")
                                    }}</el-tag>
                                <el-tag :type="searchForm.createTimeType == '3' ? '' : 'info'" @click="dateNum('3')">{{
                                        $t("desk.customer_thisWeek")
                                    }}</el-tag>
                                <el-tag :type="searchForm.createTimeType == '4' ? '' : 'info'" @click="dateNum('4')">{{
                                        $t("desk.order_nextWeek")
                                    }}</el-tag>
                                <el-tag :type="searchForm.createTimeType == '5' ? '' : 'info'" @click="dateNum('5')">{{
                                        $t("desk.book_theCustomA")
                                    }}</el-tag>
                            </el-form-item>
                            <el-form-item label="" v-if="searchForm.createTimeType == 5">
                                <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width: 140px"></el-date-picker>
                                <el-date-picker v-model="searchForm.endTime" value-format="yyyy-MM-dd" type="date" style="width: 140px"></el-date-picker>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item :label="$t('desk.book_orderSoutce')">
                                <el-select v-model="searchForm.orderSource" class="width150">
                                    <el-option :value="key" v-for="(item, key, index) of $t('commons.orderSource')" :label="item" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="OTA" v-if="searchForm.orderSource == 5">
                                <el-select v-model="searchForm.otaChannelId" style="width:330px">
                                    <el-option :value="item.id" v-for="(item, index) of otaList" :label="item.otaName" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('desk.order_teamName') + ':'">
                                <el-input v-model="searchForm.enterName" class="width150"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('desk.order_bookOrderNum') + ':'">
                                <el-input v-model="searchForm.orderNum" class="width150"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item :label="$t('desk.home_bookPeople')">
                                <el-input v-model="searchForm.name" class="width150"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('desk.home_phoneNumB') + ':'">
                                <el-input v-model="searchForm.mobile" class="width150"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('desk.home_roomType')">
                                <el-select v-model="searchForm.roomTypeId" class="width150">
                                    <el-option :label="item.houseName ? item.houseName : $t('desk.home_unknown')" :value="item.roomTypeId"
                                               v-for="(item, index) of roomTypeList" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('desk.home_roomNum')">
                                <el-input v-model="searchForm.houseNum" class="width150"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item :label="$t('desk.order_outOrderNum') + ':'">
                                <el-input v-model="searchForm.thirdOrdernum" class="width150"></el-input>
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
                </el-collapse-item>
            </el-collapse>

            <!--表格数据 -->
            <el-table ref="multipleTable" v-loading="loading" border :data="tableData"  height="100%" header-row-class-name="default" size="small">
                <el-table-column prop="mobile" :label="$t('desk.readStatusDesc')" align="center" v-if="$F.getHQCode() != storesNum">
                    <template slot-scope="{row}">
                        <span style="color: red; cursor: pointer;text-decoration: underline" @click="handelDetail(row)" v-if="row.readStatus == 1">No</span>
                        <span v-if="row.readStatus == 2">Yes</span>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" :label="$t('boss.store_storeNameA')" v-if="storesNum == $F.getHQCode()">
                    <template slot-scope="{row}">
                        {{getStoresNumDesc(row)}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" :label="$t('desk.reserveInfoDescA')">
                    <template slot-scope="{ row }">
                        <div>
                            <div>{{row.name}}</div>
                            <div v-if="row.pronunciation">【{{row.pronunciation}}】</div>
                        </div>
                        <div v-if="row.teamName">
                            <div>{{row.teamName}}</div>
                            <div v-if="row.teamPronunciation">【{{row.teamPronunciation}}】</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" :label="$t('desk.home_phoneNumB')" ></el-table-column>
                <el-table-column prop="createTime" :label="$t('desk.order_bookTime')">
                    <template slot-scope="{row}">
                        <div v-for="(item,index) in $F.formatTime(row.createTime)" :key="index">{{item}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="" :label="$t('desk.nightAudit.arriveTimeA')" width="220">
                    <template slot-scope="{ row }">
                        <div class="box">
                            <div class="item">
                                <div>
                  <span class="text-blue">{{
                          $t("desk.customer_arrived")
                      }}</span>{{ $F.substringDate(row.checkinTime, 16) }}
                                </div>
                                <div>
                                    <span class="text-red">{{ $t("desk.customer_leave") }}</span>{{ $F.substringDate(row.checkoutTime, 16) }}
                                </div>
                            </div>
                            <div>{{ row.checkinDays }}{{ $t("desk.order_day") }}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('desk.customer_roomKind')">
                    <template slot-scope="{ row }">
                        <div v-html="getRoomInfo(row)"></div>
                    </template>
                </el-table-column>
<!--                <el-table-column prop="deposit" :label="$t('desk.downPaymentA')" width="100" align="center">-->
<!--                    <template slot-scope="{ row }">-->
<!--                        ￥{{$F.numFormate( row.deposit?row.deposit : 0 )}}-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="totalRoomPrice" :label="$t('desk.order_totalRoomPrice')" width="100" align="center">-->
<!--                    <template slot-scope="{ row }">-->
<!--                        ￥{{ $F.numFormate(row.totalRoomPrice?row.totalRoomPrice : 0 )}}-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column prop="" :label="$t('desk.book_orderSoutce')" align="center">
                    <template slot-scope="{ row }">
                        <div>{{ F_orderSource(row.orderSource) }}</div>
                        <div v-if="row.orderSource == 5">{{checkPlatform(row.otaChannelId)}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="" :label="$t('desk.reserveOperator')" align="center">
                    <template slot-scope="{ row }">
                        <div v-if="row.headquarters">{{$t('desk.book_HQ') + '/' + row.creatorName}}</div>
                        <div v-else>{{row.creatorName}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="" :label="$t('food.common.status')" width="120px" align="center">
                    <template slot-scope="{ row }">
                        {{ F_reserveState((row.state == 1 || row.state == 2 || row.state == 9) ? 5 : row.state ) }}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commons.operating')">
                    <template slot-scope="{ row }">
                        <el-button type="text" size="mini" @click="handelDetail(row)">{{ $t("commons.detail") }}</el-button>
                        <el-button type="text" size="mini" v-if="storesNum == $F.getHQCode() && (row.state == 1 || row.state == 2 || row.state == 5) && row.headquarters" @click="handleCancel(row)">{{ $t("commons.cancel") }}</el-button>
                            <el-button type="text" size="mini" v-if="storesNum == $F.getHQCode() && row.state==8 && row.headquarters" @click="handleReset(row)">
                            {{ $t('desk.reserveReset') }}</el-button>
                        <template v-if="row.state != 7">
                            <!--              <el-button type="text" size="mini" v-if="!row.deposit" @click="handleDeposit(row)">{{ $t("desk.order_deposit") }}</el-button>-->
                            <!--              <el-button type="text" size="mini" v-if="row.state == 5" @click="handleNoshow(row)">NOSHOW</el-button>-->
                            <!--                        只有当渠道订单才会有接收和拒单-->
                            <el-button type="text" size="mini" v-if="row.state == 1 && row.orderSource == 3" @click="handleAccept(row)">{{ $t("desk.order_accept") }}</el-button>
                            <el-button type="text" size="mini" v-if="row.state == 1 && row.orderSource == 3" @click="handleRefuse(row)">{{ $t("desk.book_reject") }}</el-button>
<!--                            <el-button type="text" size="mini" v-if="row.state == 8" @click="handleReset(row)">{{ $t("desk.order_restore") }}</el-button>-->
                            <!--                        <el-button type="text" size="mini" v-if="row.state==4" @click="handleReset(row)">撤销</el-button>-->
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页 -->
            <div class="block">
                <el-pagination @current-change="handleCurrentChange" :current-page="searchForm.pageIndex" :page-size="searchForm.pageSize" :total="listTotal" layout="total, prev, pager, next, jumper"></el-pagination>
            </div>
        </div>
        <!-- 编辑or详情弹窗 -->
        <el-dialog top="0" title="NOSHOW" :visible.sync="noShowDiaShow" width="600px" center>
            <el-form :model="currentItem" style="margin-top: -20px" size="mini">
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('desk.order_bookOrderNum') + ':'" class="">
                            {{ currentItem.orderNum }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('desk.home_bookPeople')" class="">
                            {{ currentItem.name }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('desk.order_accountingService') + ':'" class="">
                            NOSHOW{{ $t("desk.serve_roomPrice") }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('desk.customer_sum') + ':'" class="">
                            <el-input type="text" disabled v-model="currentItem.deposit" style="width: 150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item :label="$t('desk.home_note') + ':'" class="">
                            <el-input type="textarea" v-model="currentItem.remark" style="width: 450px"></el-input>
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
        <el-dialog :title="$t('desk.order_payDeposit')" :visible.sync="depositShow">
            <el-form :model="consumeOperForm" ref="deposit" size="mini" label-width="100px">
                <el-row>
                    <el-col :span="8">{{ $t("desk.order_bookOrderNum") }}：{{
                            currentItem.reserveOrderNum
                        }}</el-col>
                    <el-col :span="8">{{ $t("desk.home_bookPeople") }}：{{ currentItem.name }}</el-col>
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
                    <el-input class="width100" v-model="consumeOperForm.payPrice" :autofocus="true" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.home_note') + ':'">
                    <el-input class="width200" type="textarea" v-model="consumeOperForm.remark" autocomplete="off"></el-input>
                </el-form-item>
                <!--            <el-form-item label="打印单据：">-->
                <!--                <el-checkbox v-model="consumeOperForm.name"></el-checkbox>-->
                <!--            </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="depositShow = false">{{
                        $t("commons.close")
                    }}</el-button>
                <el-button type="primary" @click="consume_oper(1, 'deposit')">{{ $t("desk.customer_settlement") }}
                </el-button>
            </div>
        </el-dialog>
        <el-dialog :title="$t('desk.order_selectPayWay')" :visible.sync="payTypeShow">
            <el-form :model="consumeOperForm" size="mini">
                <el-form-item label="">
                    <el-radio-group v-model="consumeOperForm.payType">
                        <el-radio v-for="(value, key) in $t('commons.payType')" :label="key" :key="key">{{ value }}</el-radio>
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
import myMixin from "@/utils/filterMixin";

export default {
    mixins: [myMixin],
    props: ['storesNum'],
    data() {
        return {
            queryFormIndex: "",
            platformList: [],
            loading: false,
            noShowDiaShow: false,
            showDetail: false,
            depositShow: false,
            payTypeShow: false,
            searchForm: {
                roomTypeId: '',
                pageIndex: 1,
                pageSize: 10,
            },
            storeList: [],
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [], //表格数据
            roomTypeList: [],
            currentItem: {},
            otaList: [],
            consumeOperForm: {
                priceType: "1",
                payType: "",
                name: "",
            },
        };
    },
    mounted() {
        this.changeObject();
        this.initForm();
        this.$F.commons.fetchOtaList({}, (list) => {
            this.otaList = list;
            this.$forceUpdate();
        });
        this.$F.doRequest(this, "/pms/freeuser/stores_list", {
                filterHeader: false,
            },
            (data) => {
                this.storeList = data;
            }
        );

    },
    computed: {
        reserveStatusObject() {
            let reserveStatus = this.$t("commons.reserveState");
            console.log(reserveStatus);

            let reserveStatusObject = {};
            for (let i in reserveStatus) {
                if (i == 1 || i == 2 || i == 9 || i == 5) {
                    reserveStatusObject["5"] = reserveStatus["5"];
                } else {
                    reserveStatusObject[i] = reserveStatus[i];
                }
            }
            return reserveStatusObject;
        },
    },
    methods: {
        getStoresNumDesc(row) {
            let tempArray = this.storeList.filter(store => {
                return store.storesNum == row.storesNum;
            }) || [];
            return tempArray[0] && tempArray[0].storesName;
        },
        changeObject() {},
        getRoomInfo(row) {
            let value = row.roomInfo.split(",").join("<br>");
            return value;
        },
        checkPlatform(otaChannelId) {
            let array = this.otaList.filter((item) => {
                return item.id == otaChannelId;
            }) || [{}];
            return array.length > 0 ? array[0].otaName : "";
        },

        initForm() {
            this.searchForm = {
                createTimeType: "",
                checkInTimeType: "",
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
                // filterType: 1,  //数据类型过滤  1过滤已办理入住数据     int选填
                timeType: "",
            };
            this.realtime_room_statistics();
            //加载数据
            //加载渠道
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            let params = this.$F.deepClone(this.searchForm);
            if (params.state == "0") params.state = "";
            if (params.checkInTimeType == "5" || params.checkInTimeType == "10")
                params.checkInTimeType = "";
            if (params.createTimeType == "5" || params.checkInTimeType == "10")
                params.createTimeType = "";
            if (this.storesNum == this.$F.getHQCode()) {
                params.storesNum = this.searchForm.storesNum || '';
            }
            this.$F.doRequest(
                this,
                "/pms/reserve/reserve_order_list",
                params,
                (res) => {
                    if (res.resreveList) {
                        //这里吧房型/间解析出来  可能没有房间 可能多间房
                        res.resreveList.forEach((order) => {
                            if (order.checkInRoomList) {
                                if (order.checkInRoomList.length == 1) {
                                    order.roomInfo =
                                        (order.checkInRoomList[0].roomTypeName || "") + "/";
                                    order.roomInfo += order.checkInRoomList[0].houseNum
                                        ? order.checkInRoomList[0].houseNum
                                        : `(${this.$t("desk.noRowHouses")})`;
                                } else {
                                    order.roomInfo = "";
                                    order.checkInRoomList.forEach((room) => {
                                        order.roomInfo += (room.roomTypeName || "") + "/";
                                        order.roomInfo += room.houseNum
                                            ? room.houseNum
                                            : `(${this.$t("desk.noRowHouses")})`;
                                        order.roomInfo += ",";
                                    });
                                    order.roomInfo = order.roomInfo.substring(
                                        0,
                                        order.roomInfo.length - 1
                                    );
                                }
                            } else {
                                order.roomInfo = this.$t("desk.noRowHouses");
                            }
                        });
                        this.tableData = res.resreveList;
                        this.listTotal = res.page.count;
                        this.$forceUpdate();
                    }
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
            if (key == "0") key = "";
            this.searchForm.state = key;
            this.getDataList();
        },

        timeTypeClick(key) {
            this.searchForm.checkInTimeType = key;
            this.getDataList();
        },
        dateNum(key) {
            this.searchForm.createTimeType = key;
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
            this.$F.doRequest(this, "/pms/reserve/reserve_oper", params, (res) => {
                this.noShowDiaShow = false;
                this.getDataList();
                this.$message({
                    message: this.$t("commons.request_success"),
                    type: "success",
                });
            });
        },

        handleCancel(item) {
            let params = {
                checkInReserveId: item.id,
                state: 8,
            };
            this.$confirm(
                this.$t("desk.order_sureDeleteA"),
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
                state: 5,
            };
            this.$confirm(
                this.$t("desk.order_sureOperate"),
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
                        this.$message.error(this.$t("desk.order_inputMinusPrice"));
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

<style lang="scss">
.el-table .cell {
    white-space: pre-line;
}
.el-collapse-item .el-collapse-item__header {
    float: right !important;
}
</style>
