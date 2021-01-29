<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-26 17:52:47
 * @FilePath: \jiudian\src\views\market\reception\checkin\normal.vue
 -->
<template>
    <div class="boss-index ru">
        <div class="content">
            <h3 v-if="operCheckinType == 'a1' || operCheckinType == 'a2'">
                {{ $t("frontOffice.checkInfoDesc") }}
            </h3>
            <h3 v-if="operCheckinType == 'b1' || operCheckinType == 'b2'">
                {{ $t("desk.order_bookOrderInfo") }}
            </h3>
            <h3 v-if="operCheckinType == 'b3'">
                {{ $t("desk.serve_conferenceInfo") }}
            </h3>
            <el-form ref="checkInForm" class="inForm" inline size="small" :model="checkInForm" :rules="rules"
                     label-width="130px" v-if="operCheckinType == 'a1' || operCheckinType == 'a2'">
                <el-form-item :label="$t('desk.customer_livePeople')" prop="name">
                    <el-autocomplete
                        style="width: 100px"
                        v-model="checkInForm.name"
                        name="name"
                        :fetch-suggestions="remoteMethod"
                        :highlight-first-item="true"
                        popper-class="popper-class"
                        :trigger-on-focus="false"
                        :placeholder="$t('desk.book_inputContent')"
                        @select="changeName($event)"
                    ></el-autocomplete>
                    <el-input
                        style="width: 110px; margin-left: 10px"
                        v-model="checkInForm.pronunciation"
                        :placeholder="$t('desk.home_nameA')"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.customer_sex') + ':'" prop="sex">
                    <el-radio-group v-model="checkInForm.sex">
                        <el-radio
                            v-for="(item, key, index) of $t('commons.F_sex')"
                            :label="key"
                            :key="index"
                        >{{ item }}</el-radio
                        >
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('commons.idCardTypeDesc')" >
                    <el-select v-model="checkInForm.idcardType">
                        <el-option
                            :value="key"
                            v-for="(item, key, index) of $t('commons.idCardType')"
                            :label="item"
                            :key="index"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('desk.customer_idNo') + ':'" >
                    <el-input v-model="checkInForm.idcard"></el-input>
                </el-form-item>
                <template v-if="operCheckinType == 'a1' || operCheckinType == 'a2'">
                    <el-form-item :label="$t('frontOffice.nightAudit.checkInTime')" prop="checkinTime">
                        <el-date-picker
                            v-model="checkInForm.checkinTime"
                            disabled
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="startTime"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="$t('desk.order_departureTime')" prop="checkoutTime">
                        <el-date-picker
                            v-model="checkInForm.checkoutTime"
                            :disabled="operCheckinType == 'a2'"
                            type="datetime"
                            :picker-options="leaveTime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="endTimeChange"
                        ></el-date-picker>
                    </el-form-item>
                </template>
                <p></p>
                <el-form-item :label="$t('desk.order_outOrder')">
                    <el-input v-model="checkInForm.thirdOrdernum"></el-input>
                </el-form-item>

                <el-form-item :label="$t('desk.order_sourceType')" prop="guestType">
                    <el-input type="input" :value="$t('commons.guestType')[checkInForm.guestType]" :disabled="true">
                        <template slot="append">
                            <span @click="popup('guestTypeShow')" style="padding: 10px">…</span>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item :label="$t('desk.book_orderSoutce')" prop="orderSource">
                    <el-select
                        v-model="checkInForm.orderSource"
                        :placeholder="$t('commons.placeChoose')"
                    >
                        <el-option
                            :value="key"
                            v-for="(item, key, index) of $t('commons.orderSource')"
                            :label="item"
                            :key="index"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="OTA" prop="orderSource" v-if="checkInForm.orderSource==5" >
                    <el-select  v-model="checkInForm.otaChannelId" >
                        <el-option :value="item.id" v-for="(item, index) of otaList" :label="item.otaName" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('desk.orderMarkInfo') + '：'">
                    <el-input type="textarea" v-model="checkInForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="checkInForm" class="inForm" inline size="small" :model="checkInForm" :rules="rules" label-width="120px"
                     v-if=" operCheckinType == 'b1' || operCheckinType == 'b2' || operCheckinType == 'b3'">
                <el-form-item :label="$t('desk.customer_reservePerson')" :required="true">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="name">
                                <el-autocomplete
                                    style="width: 100px"
                                    v-model="checkInForm.name"
                                    name="name"
                                    :fetch-suggestions="remoteMethod"
                                    :highlight-first-item="true"
                                    popper-class="popper-class"
                                    :trigger-on-focus="false"
                                    :placeholder="$t('desk.serve_nameQuery')"
                                    @select="changeName($event)"
                                ></el-autocomplete>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="pronunciation">
                                <el-input style="width: 110px" v-model="checkInForm.pronunciation" :placeholder="$t('desk.home_nameA')"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item :label="$t('desk.order_moblePhone')" prop="prop">
                    <el-input v-model="checkInForm.mobile"></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.home_liveMobile')" prop="prop">
                    <el-input v-model="checkInForm.homeMobile"></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.home_unitMobile')" prop="prop">
                    <el-input v-model="checkInForm.enterMobile"></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.book_orderSoutce')" prop="orderSource">
                    <el-select v-model="checkInForm.orderSource">
                        <el-option
                            :value="key"
                            v-for="(item, key, index) of $t('commons.orderSource')"
                            :label="item"
                            :key="index"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="OTA" prop="orderSource" v-if="checkInForm.orderSource==5" >
                    <el-select  v-model="checkInForm.otaChannelId" >
                        <el-option
                            :value="item.id"
                            v-for="(item, index) of otaList"
                            :label="item.otaName"
                            :key="index"
                        ></el-option>
                    </el-select>
                </el-form-item>
<!--                <el-form-item :label="$t('desk.order_salesman') + '：'" v-if="operCheckinType == 'b3'">-->
<!--                    <el-select v-model="checkInForm.salesId" :placeholder="$t('commons.placeChoose')">-->
<!--                        <el-option v-for="item in salesList" :key="item.id" :label="item.userName" :value="item.id"></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
                <el-form-item :label="$t('desk.arrivalTime')" prop="checkinTime">
                    <el-date-picker
                        v-model="checkInForm.checkinTime"
                        type="datetime"
                        :placeholder="$t('desk.serve_chooseDate')"
                        :picker-options="startTime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        @change="startTimeChange"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('desk.checkInDays')" prop="checkinDays" v-if="operCheckinType == 'b1'">
                    <el-input-number v-model="checkInForm.checkinDays" :step="1" :min="1" @change="checkinDaysChange"></el-input-number>
                </el-form-item>
                <el-form-item :label="$t('desk.order_departureTime')" prop="checkoutTime" v-if="operCheckinType == 'b1'">
                    <el-date-picker
                        v-model="checkInForm.checkoutTime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="leaveTime"
                        @change="endTimeChange"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('desk.order_departureTime')" prop="checkoutTime" v-if="operCheckinType == 'b2'">
                    <el-date-picker
                        v-model="checkInForm.checkoutTime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="leaveTime"
                        @change="endTimeChange"
                    ></el-date-picker>
                </el-form-item>
<!--                <el-form-item :label="$t('desk.keepTime')" prop="keepTime">-->
<!--                    <el-date-picker-->
<!--                        v-model="checkInForm.keepTime"-->
<!--                        type="datetime"-->
<!--                        format="yyyy-MM-dd HH:mm:ss"-->
<!--                        value-format="yyyy-MM-dd HH:mm:ss"-->
<!--                        :picker-options="keepTime"-->
<!--                        @change="endTimeChange"-->
<!--                    ></el-date-picker>-->
<!--                </el-form-item>-->

                <el-form-item :label="$t('desk.order_sourceType')" prop="guestType" label-width="140px">
                    <el-input type="input" :value="$t('commons.guestType')[checkInForm.guestType]" :disabled="true">
                        <template slot="append">
                            <span @click="popup('guestTypeShow')">…</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item
                    :label="$t('desk.customer_payType')"
                    v-if="operCheckinType != 'b3'"
                >
                    <el-select v-model="checkInForm.payType">
                        <el-option
                            :value="key"
                            v-for="(item, key, index) of $t('commons.payType')"
                            :label="item"
                            :key="index"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('desk.order_outOrder')" v-if="operCheckinType != 'b3'">
                    <el-input v-model="checkInForm.thirdOrdernum"></el-input>
                </el-form-item>
                <template v-if="operCheckinType == 'b3'">
                    <el-form-item :label="$t('desk.book_meetName') + '：'" prop="meetingName">
                        <el-input v-model="checkInForm.meetingName"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('frontOffice.enterpriseName') + ':'" prop="enterName">
                        <el-input v-model="checkInForm.enterName"></el-input>
                    </el-form-item>
                </template>
                <el-form-item :label="$t('desk.customer_region')" prop="prop">
                    <el-input v-model="checkInForm.region"></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.orderMarkInfo') + ':'">
                    <el-input type="textarea" v-model="checkInForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <el-form  label-width="120px" v-if="operCheckinType != 'a1' && operCheckinType != 'a2'">
                <el-form-item :label="$t('desk.book_bookProject') + ':'" required>
                    <template>
                        <div v-for="(value, index) in checkInForm.reserveProjects" :key="index">
                            <el-input :placeholder="$t('desk.book_projectName')+(index+1)" size="small" v-model="value.projectName" style="width: 300px"></el-input>
                            <el-input :placeholder="$t('desk.book_projectCount')" size="small" v-model="value.projectCount" style="width: 100px; margin-left: 10px"></el-input>
                            <el-input :placeholder="$t('desk.book_price')" size="small" v-model="value.price" style="width: 100px; margin-left: 10px"></el-input>
                            <img src="~@/assets/images/close.png" @click="deleteProject(index)" v-if="checkInForm.reserveProjects.length>1" class="closePng">
                        </div>
                    </template>
                    <el-button type="text"  @click="addProject()">{{$t('desk.book_addProject')}}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content last">
            <h3>{{ $t("desk.roomInfoDesc") }}</h3>
            <div class="roomMsg">
                <div class="left">
                    <el-form inline size="small" v-if="operCheckinType != 'b3'">
                        <el-form-item>
                            <el-select v-model="getRoomsForm.bedCount" @change="getDataList" :placeholder="$t('commons.placeChoose')">
                                <el-option :value="key" v-for="(item, key, index) of $t('commons.bedCount')" :label="item" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="roomBtm">
                        <div class="roomBox" v-for="v in roomList" :key="v.roomTypeId">
                            <div class="rooms" :class="activeRoomCheck(v.roomTypeId) ? 'active' : ''">
                                <div class="row">
                                    <span>{{ v.roomTypeName }}</span>
                                    <el-input-number @change="handleNumChange($event, v)" :min="0" :max="v.reserveTotal"
                                                     :label="$t('desk.home_describeText')" size="mini" style="width: 100px" v-model.number="v.num"></el-input-number>
                                </div>
                                <div class="row">
<!--                                    <span class="allow">{{ $t("desk.home_canOrderText") }}{{ v.reserveTotal }}</span>-->
                                    <div style="float: right">
                                        <span>{{$t('desk.home_onePeopleLive')}}: {{ v.onePersonPrice }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <el-form inline size="small">
                        <el-form-item>
<!--                            <el-button @click="empty_row_houses" v-if="!storesNum">{{ $t("desk.autoRowHouse") }}</el-button>-->
                            <el-button @click="live_in_person_list" v-if=" !operCheckinType.startsWith('b') && waitingRoom.length > 0">
                                <i v-loading="liveLoading"></i>{{ $t("desk.order_rowHouses") }}
                            </el-button>
                            <!--                            <el-button @click="live_in_person_list" v-if=" !operCheckinType.startsWith('b') && waitingRoom.length > 0">-->
                            <!--                                <i v-loading="liveCardLoading"></i>{{ $t("desk.home_makeCard") }}</el-button>-->
                        </el-form-item>
                    </el-form>
                    <div class="roomBtm checked">
                        <div class="checkRoom" v-for="(v, index) in waitingRoom" :key="index">
                            <div class="row rowReverse">
                                <div>
                                    <el-button type="primary" class="submit" size="mini" @click="rowRoomByItem(v, index)">{{ $t("desk.rowHouse") }}</el-button>
                                </div>
                                <div>
                                    <span>{{ v.roomTypeName }}</span><span class="text-red" style="margin-left: 10px">{{ v.num }}{{ $t("manager.hk_space") }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="tags margin-t-5">
                                    <el-button class="roomNumTag" size="mini" v-for="(item, i) of v.roomsArr" :key="i">
                                        {{ item.houseNum }}
                                        <span class="del" @click="delete_db_row_houses(v, item.id, i)">✕ {{ $t("desk.customer_remove") }}</span>
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 编辑or详情弹窗 -->
        <div class="fixedFoot">
            <div class="wrap">
                <el-button type="white" @click="handleCenter('cancel')" v-if="this.storesNum">{{$t('commons.cancel')}}</el-button>
                <el-button type="primary" class="submit" @click="handleCenter('centerReserve')" v-if="this.storesNum">{{$t('desk.book_bookText')}}</el-button>
                <el-button type="primary" class="submit" @click="hotel_check_in(2)" v-if="!this.storesNum" v-loading="loading">{{ $t("commons.save") }}</el-button>
                <el-button class="white" @click="hotel_check_in(3)" v-if="!this.storesNum">{{ $t("frontOffice.saveGoon") }}</el-button>
            </div>
        </div>

        <!-- 添加入住人 -->
        <el-dialog top="0" :show-close="false" :title="$t('desk.order_rowHouses')" :visible.sync="addLivePersonShow" width="90%">
            <checkTheDetails
                v-if="addLivePersonShow"
                checkinType="checkin"
                :checkInDetail="inRoomList"
                @personCallback="personCallback"
            ></checkTheDetails>
        </el-dialog>
        <!--        客源类型-->
        <guestChoose @guestChooseCallback="guestChooseCallback" ref="guestChoose" :checkInForm="checkInForm"></guestChoose>

        <!--        排房组件 -->
        <rowHouse  @rowHouseCallback="rowHouseCallback" ref="rowHouse" @db_row_houses="db_row_houses" @rowRoomCurrentListItemAdd="rowRoomCurrentListItemAdd"></rowHouse>
    </div>
</template>

<script>
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
};


import { mapState } from "vuex";
const vm = window.vm;
import checkTheDetails from '@/components/checktheDetails'
import customer from "@/components/front/customer2";
import guestChoose from "@/views/market/reception/checkin/guestChoose";
import rowHouse from "@/components/front/rowHouse";
export default {
    props: ["operCheckinType", "selectStoresNum"], //b1：普通预定 b2:当日回 b3:会场预定     a1: 入住办理
    components: {
        rowHouse,
        checkTheDetails,
        customer,
        guestChoose,
    },
    computed: {
        ...mapState({
            token: (state) => state.user.token,
            userId: (state) => state.user.userId,
            msgKey: (state) => state.config.msgKey,
            plat_source: (state) => state.config.plat_source,
        }),
        rules() {
            return {
                content: "",
                name: [
                    {
                        required: true,
                        // message: '请输入姓名',
                        message: this.$t("commons.mustInput"),
                        trigger: "blur",
                    },
                ],
                pronunciation: [
                    {
                        required: true,
                        // message: '请输入姓名',
                        message: this.$t("commons.mustInput"),
                        trigger: "blur",
                    },
                ],
                sex: [
                    {
                        required: true,
                        message: this.$t("commons.placeChoose"),
                        // message: '请选择性别',
                        trigger: "blur",
                    },
                ],
                mobile: [
                    {
                        required: true,
                        // message: '请输入手机号',
                        message: this.$t("commons.mustInput"),
                        trigger: "blur",
                    },
                ],
                idcard: [
                    {
                        required: true,
                        // message: '请输入证件号',
                        message: this.$t("commons.mustInput"),
                        trigger: "blur",
                    },
                ],
                checkinTime: [
                    {
                        required: true,
                        message: this.$t("commons.placeChoose"),
                        // message: '请选择入住时间',
                        trigger: "blur",
                    },
                ],
                checkoutTime: [
                    {
                        required: true,
                        message: this.$t("commons.placeChoose"),
                        // message: '请选择预离时间',
                        trigger: "blur",
                    },
                ],

                checkinDays: [
                    {
                        required: true,
                        // message: '请输入入住天数',
                        message: this.$t("commons.mustInput"),
                        trigger: "blur",
                    },
                ],
                guestType: [
                    {
                        required: true,
                        message: this.$t("commons.placeChoose"),
                        // message: '请选择客源类型',
                        trigger: "blur",
                    },
                ],
                orderSource: [
                    {
                        required: true,
                        message: this.$t("desk.book_orderSoutce"),
                        trigger: "blur",
                    },
                ],
                checkinType: [
                    {
                        required: true,
                        message: this.$t("commons.placeChoose"),
                        // message: '请选择入住类型',
                        trigger: "blur",
                    },
                ],
                ruleHourId: [
                    {
                        required: true,
                        message: this.$t("commons.placeChoose"),
                        // message: '请选择计费规则',
                        trigger: "blur",
                    },
                ],
            };
        },

    },
    data() {
        return {
            storesNum: '',
            checkInDetail: {},//添加入住人 传到入住人组件值
            inRoomList: [], //添加入住人 传到入住人组件值
            addLivePersonShow: false, //是否显示添加入住人组件
            afterToday: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天
                },
            },
            leaveTime: {
                disabledDate: (time) => {
                    if (this.checkInForm.checkinTime) {
                        let timeStr = new Date(
                            new Date(this.checkInForm.checkinTime)
                                .Format("yyyy-MM-dd")
                                .replace(/-/g, "/")
                        );
                        if (this.operCheckinType == "b2" || this.operCheckinType == "a2") {
                            return timeStr.getTime() > timeStr - 8.64e6
                        }
                        return (
                            new Date(time.Format("yyyy-MM-dd")).getTime() - 8.64e7 < timeStr
                        );
                    } else if (this.checkInForm.checkinTime == "") {
                        return (
                            new Date(time.Format("yyyy-MM-dd")).getTime() <
                            Date.now() - 8.64e7
                        ); //如果没有后面的-8.64e7就是不可以选择今天
                    } else {
                        return "";
                    }
                },
            },
            // keepTime: {
            //     disabledDate: (time) => {
            //         if (this.checkInForm.checkinTime) {
            //             let timeStr = new Date(
            //                 new Date(this.checkInForm.checkinTime)
            //                     .Format("yyyy-MM-dd")
            //                     .replace(/-/g, "/")
            //             );
            //             if (this.operCheckinType == "b2" || this.operCheckinType == "a2") {
            //                 return timeStr.getTime() > timeStr - 8.64e6
            //             }
            //             let date = new Date(time.Format("yyyy-MM-dd"));
            //             date.setDate(date.getDate() + 1);
            //             return (
            //                 date - 8.64e7 < timeStr
            //             );
            //         } else if (this.checkInForm.checkinTime == "") {
            //             return (
            //                 new Date(time.Format("yyyy-MM-dd")).getTime() <
            //                 Date.now() - 8.64e7
            //             ); //如果没有后面的-8.64e7就是不可以选择今天
            //         } else {
            //             return "";
            //         }
            //     },
            // },
            startTime: {
                disabledDate: (time) => {
                    // if (this.checkInForm.checkoutTime != "" && this.checkInForm.checkoutTime) {
                    //     let timeStr = new Date(new Date(this.checkInForm.checkoutTime).Format("yyyy-MM-dd").replace(/-/g, "/"));
                    //     if (this.operCheckinType == 'b2') { //时租预订
                    //         return new Date(time.Format("yyyy-MM-dd")).getTime() - 8.64e7 > timeStr;
                    //     }
                    //     return new Date(time.Format("yyyy-MM-dd")).getTime() + 0 > timeStr;
                    // } else if (this.checkInForm.checkoutTime == "") {
                    //     return new Date(time.Format("yyyy-MM-dd")).getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天
                    // } else {
                    //     return "";
                    // }
                    return time.getTime() < new Date().getTime();
                },
            },
            num: 1,
            otaList:[],   //OTA数组
            isSubmitErr: false,
            loading: false,
            liveLoading: false,
            liveCardLoading: false,
            showDetail: false,
            guestTypeShow: false,
            mackcade: false,
            nameLoading: false,
            options: [],
            baseInfo: "",
            getRoomsForm: {
                changeType: 1,
                roomType: 1,
                bedCount: "",
            },
            salesList: "",
            ruleHourList: [],
            //预定和入住人信息
            checkInForm: {
                reserveProjects: [{}],
                checkInRoomJson: [],
            },

            listTotal: 0, //总条数
            multipleSelection: [], //多选
            roomList: [], //表格数据
            waitingRoom: [],
            rowRoomCurrentItem: "",
            rowRoomCurrentList: [],
            hotelRoomListParams: {
                buildingId: "",
                buildingFloorId: "",
                roomTypeId: "",
                houseNum: "",
                toward: [],
                roadFlag: "",
                windowFlag: "",
                smokeFlag: "",
                noiseFlag: "",
                temperatureFlag: "",
                livingRoomStatus: "",
                pageIndex: 1,
                pageSize: 9999,
            },
            liveInPersonData: [],
            liveCardData: "",
        };
    },

    created() {
        this.initModule();
    },

    watch: {
        operCheckinType() {
            this.initForm();
            // this.handleOperCheckinType()
            console.log(this.checkInForm);
        },
        checkInForm: {
            handler(n, o) {
                console.log(n);
                let arr = [];
                if (this.operCheckinType == "a1") {
                    arr = [
                        "name",
                        "sex",
                        "idcardType",
                        "idcard",
                        "checkinTime",
                        "checkoutTime",
                        "guestType",
                        "orderSource",
                        "checkinType",
                        "mobile",
                    ];
                }
                if (this.operCheckinType == "a2") {
                    arr = [
                        "name",
                        "sex",
                        "idcardType",
                        "idcard",
                        "ruleHourId",
                        "guestType",
                        "orderSource",
                        "checkinType",
                        "mobile",
                    ];
                }
                if (this.operCheckinType == "b1") {
                    arr = [
                        "name",
                        "guestType",
                        "orderSource",
                        "checkinType",
                        "checkinTime",
                        "checkoutTime",
                        "keepTime",
                        "checkinDays",
                        "mobile",
                    ];
                }
                if (this.operCheckinType == "b2") {
                    arr = [
                        "name",
                        "guestType",
                        "orderSource",
                        "checkinTime",
                        "checkoutTime",
                        "keepTime",
                        "ruleHourId",
                        "mobile",
                    ];
                }
                if (this.operCheckinType == "b3") {
                    arr = [
                        "name",
                        "checkinTime",
                        "checkoutTime",
                        "keepTime",
                        "guestType",
                        "orderSource",
                        "mobile",
                    ];
                }
                if (!this.checkInForm.checkInId && arr.length) {
                    let len = 0;
                    for (let k in arr) {
                        if (
                            this.checkInForm[arr[k]] != "" &&
                            this.checkInForm[arr[k]] != "undefined" &&
                            this.checkInForm[arr[k]] != undefined
                        ) {
                            console.log(this.checkInForm[arr[k]]);
                            len++;
                        }
                    }
                }
            },
            //   immediate: true,
            deep: true,
        },
    },
    methods: {
        //中央预定取消和预定操作
        handleCenter(type) {
            if (type == 'centerReserve') {
                this.hotel_check_in(type, ()=> {
                    this.$emit("cancel");
                })
            } else {
                this.$emit("cancel");
            }
        },
        initModule(storesNum) {
            if (storesNum) {
                this.storesNum = storesNum;
            } else {
                if (this.selectStoresNum) {
                    this.storesNum = this.selectStoresNum;
                }
            }
            let params = {};
            this.makeStoresNum(params);
            this.$F.commons.fetchOtaList(params, (list)=> {
                this.otaList = list;
                this.$forceUpdate();
            })
            this.handleOperCheckinType();
            params = { salesFlag: 1 }
            this.makeStoresNum(params);
            this.$F.commons.fetchSalesList(params, (data) => {
                this.salesList = data.hotelUserList;
            });
            this.getDataList();
            this.initForm();
        },

        makeStoresNum(params) {
            if (this.storesNum) {
                this.$F.merge(params, {
                    storesNum: this.storesNum
                })
            }
        },

        // 排房组件回调
        rowHouseCallback(data) {

        },

        //新需求 添加项目
        addProject() {
            if (this.checkInForm.reserveProjects.length > 0) {
                let lastObject = this.checkInForm.reserveProjects[
                this.checkInForm.reserveProjects.length - 1
                    ];
                if (lastObject.projectName && lastObject.price && lastObject.projectName) {
                    this.checkInForm.reserveProjects.push({});
                }else{
                    this.$message({
                        message: this.$t('desk.book_canAdd'),
                        type: 'warning'
                    });
                }
            } else {
                this.checkInForm.reserveProjects.push({});
            }
        },
        //预定项目，点击删除
        deleteProject(index){
            this.checkInForm.reserveProjects.splice(index,1);
        },
        checkRoomInfo(row, index) {
            console.log(row);
            console.log(index);
            let newCheck = "checked" + (index + 1);
            console.log(newCheck);
            return row[newCheck];
        },

        initForm() {
            this.getRoomsForm = {
                changeType: 1,
                bedCount: "",
                roomType: this.operCheckinType == "b3" ? 2 : 1,
            };
            //预定和入住人信息
            let operTypeEM = {
                b1: "1",
                b2: "2",
                b3: "3",
            };
            this.inRoomList = [];
            this.waitingRoom = [];
            this.checkInForm = {
                operCheckinType: operTypeEM[this.operCheckinType] || "", //预定办理类型  1普通预定 2时租房预定 3会场预定 Integer必填
                name: "", //入住人姓名  String必填
                pronunciation: "", // 拼音
                mobile: "", //电话  String选填
                orderSource: "1", //订单来源  1前台 2销售推荐 3渠道订单 10其他  Integer必填
                sex: "1", //    入住人性别 1男 2女 3保密  Integer必填
                idcardType: "2", //  2护照  Integer必填
                idcard: "", //证件号码  String必填
                memberCard: "", // 会员卡号  String选填
                checkinTime: "", // 预抵时间/到店时间 yyyy-MM-dd hh:mm:ss格式  String必填
                checkoutTime: "", //预离时间 yyyy-MM-dd hh:mm:ss格式  String必填
                keepTime: "2099-12-12 12:12:12", //保留时间 yyyy-MM-dd hh:mm:ss格式  String必填
                checkinDays: 1, //入住天数  int必填
                salesId: "", //销售员id  String选填
                thirdOrdernum: "", //外部订单号  String选填
                ruleHourId: "", //时租房规则id  operCheckinType=2必填  String选填
                guestType: "1", //客户类型  1散客 2会员 3单位  Integer必填
                recommendInfo: "", //推荐人信息（姓名或销售用户id）  String选填
                channel: "", //渠道类型  2飞猪  3去哪儿 4携程 5艺龙 6美团  Integer选填
                checkinType: "1", // 入住类型  1正常 2免费  Integer必填
                remark: "", //订单信息备注  String选填
                // checkInId: '2c9f404b73939b040173947c555b000c',
                // checkInReserveId: '2c9f404b738f2f5d017393748ad60009',
                checkInId: "", // 传入改值，将会进行编辑客人信息  String选填
                checkInReserveId: "", //传入改值，将会进行编辑预定客人信息  String选填
                meetingName: "", //会议名称  String选填
                enterName: "", //单位名称 String选填
                checkInRoomJson: [], //排房信息json集合字符串
                personType: 2,  //主入住人
                reserveProjects: [], //项目list
                otaChannelId: '',   //渠道订单
                homeMobile:'',      //住家电话  String选填
                enterMobile:'',      //单位电话  String选填
                payType:'',      //支付方式  String选填
                region: '',  //地区
            };
            this.handleOperCheckinType();
            this.getDataList();
        },
        /**获取房间信息数据 */
        getDataList() {
            let that = this;
            let params = this.$F.deepClone(this.getRoomsForm);
            params.checkinTime = this.checkInForm.checkinTime.split(' ')[0];
            params.checkoutTime = this.checkInForm.checkoutTime;
            params.changeType = 2;

            this.makeStoresNum(params);
            params.roomType = this.operCheckinType == 'b3' ? 2 : 1;
            this.$F.doRequest(
                this,
                "/pms/checkin/hotel_checkin_roominfo",
                params,
                (res) => {
                    let list = res.roomTypeList;
                    list.forEach((element) => {
                        let coverData = check(element.roomTypeId);
                        if (coverData) {
                            element.price = coverData.todayPrice;
                            element.num = coverData.num;
                        } else {
                            element.price = element.todayPrice;
                            element.num = 0;
                        }
                        element.withMealPrice =
                            (element.onePersonPrice || 0) +
                            element.breakfastMealPrice +
                            element.dinnerMealPrice;
                    });

                    function check(id) {
                        for (let k in that.waitingRoom) {
                            if (that.waitingRoom[k].roomTypeId == id) {
                                return that.waitingRoom[k];
                            }
                        }
                        return false;
                    }
                    this.roomList = list;
                    this.$forceUpdate();
                }
            );
        },

        //页面上点击事件都在这里
        popup(type, row) {
            //客源类型选择
            if (type == "guestTypeShow") {
                // this.guestTypeShow = true;
                this.checkInForm.guestType = this.checkInForm.guestType ? this.checkInForm.guestType.toString() : "1";
                this.$refs.guestChoose.dialogOpen(this.checkInForm);
            } else if (type == "bin") {
                this.$F.doRequest(
                    this,
                    "/pms/hotelgoods/up_status",
                    { id: row.id, state: row.state == 1 ? 2 : 1 },
                    (res) => {
                        this.$message.success("success");
                        this.initData();
                    }
                );
            } else if (type == "change") {
                this.edit = true;
                this.tab_show = false;
                this.rowData = row;
            }
        },

        // 保存 保存并继续
        // type:{
        //  2: 保存；
        //  3: 保存后继续办理入住预定
        // }
        hotel_check_in(type, centerReserveCallback) {
            let params = this.$F.deepClone(this.checkInForm);
            this.isSubmitErr = false;
            let url = "";
            let operCheckinType = this.operCheckinType;
            if (operCheckinType == "a1" || operCheckinType == "a2") {
                url = "/pms/checkin/hotel_check_in";
            } else {
                url = "/pms/reserve/reserve_check_in";
                for (let item of params.reserveProjects) {
                    if (!item || !item.projectName || !item.price || !item.projectName) {
                        this.$message({
                            message: this.$t('desk.book_perfectProjectInfo'),
                            type: 'warning'
                        });
                        return false;
                    }
                }
                params.reserveProjects = JSON.stringify(params.reserveProjects);
            }

            let ajax = () => {
                let tempArray = params.checkInRoomJson;
                let roomIdArray = [];
                tempArray.forEach(temp => {
                    roomIdArray.push(temp.roomId);
                })
                params.roomIds = roomIdArray.join(",");
                this.makeStoresNum(params);
                this.$F.doRequest(this, url, params, (data) => {
                    debugger
                    this.$message({message: "Success", type: "success",});
                    if (type == 2) {
                        window.setTimeout(() => {
                            if (operCheckinType == "a1" || operCheckinType == "a2") {
                                this.$router.push(
                                    "/orderdetail?id=" + (data.checkInReserveId || data.checkinId)
                                );
                            } else {
                                this.$router.push(
                                    "/bookingDetail?id=" + (data.checkInReserveId || data.checkinId)
                                );
                            }
                        }, 200);
                    } else if (type == 3) {
                        this.initForm();
                        this.waitingRoom = [];
                        this.liveInPersonData = [];
                    } else if (type == 'centerReserve') {
                        centerReserveCallback();
                    }
                }, (errorMsg) => {
                    this.$message({message: this.$t('desk.roomOccupation'), type: "error",});
                });
            };
            this.$refs.checkInForm.validate((valid) => {
                if (valid) {
                    if (!this.waitingRoom.length) {
                        this.$message.error(this.$t("frontOffice.chooseRoomType"));
                        return false;
                    }
                    if (operCheckinType == "a1" || operCheckinType == "a2") {
                        console.log(this.checkInForm.checkInRoomJson);

                        if (!this.checkInForm.checkInRoomJson || this.checkInForm.checkInRoomJson.length == 0) {
                            this.$message.error(this.$t("desk.home_noPeopleLive"));
                            return false;
                        }
                        for (let k = 0; k < this.waitingRoom.length; k++) {
                            if (!this.waitingRoom[k].roomsArr) {
                                this.$message.error(this.$t("desk.serve_placeChooseRoom"));
                                return false;
                            }
                            if (this.waitingRoom[k].roomsArr.length < this.waitingRoom[k].num) {
                                this.$message.error(this.$t("desk.serve_placeChooseRoom"));
                                return false;
                            }
                        }

                        let array = params.checkInRoomJson.filter(item =>{
                            return !item.headerObj
                        }) || []
                        if (array.length > 0) {
                            this.$message.error(this.$t("desk.home_noPeopleLive"));
                            return;
                        }
                    } else {
                        params.checkInRoomJson = [];
                        this.waitingRoom.forEach((item) => {
                            let temp = {
                                roomTypeId: item.roomTypeId,
                                reservePrice: item.onePersonPrice || item.reservePrice,
                                realPrice: item.realPrice || item.onePersonPrice,
                            };
                            if (item.roomsArr && item.roomsArr.length > 0) {
                                let array = [];
                                item.roomsArr.forEach((room) => {
                                    array.push(room.roomId);
                                });
                                temp.roomId = array.join(",");
                            }
                            params.checkInRoomJson.push(temp);
                        });
                    }
                    ajax();
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

        handleNumChange(e, item) {
            let exist = false;
            for (let k in this.waitingRoom) {
                if (this.waitingRoom[k].roomTypeId == item.roomTypeId) {
                    if (item.num > 0) {
                        this.waitingRoom[k].price = item.price;
                        this.waitingRoom[k].todayPrice = item.todayPrice;
                        this.waitingRoom[k].num = item.num;
                    } else {
                        this.waitingRoom.splice(k, 1);
                    }
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                this.waitingRoom.push(item);
            }
            console.log(this.waitingRoom);
        },
        activeRoomCheck(id) {
            for (let k in this.waitingRoom) {
                if (this.waitingRoom[k].roomTypeId == id) {
                    return true;
                }
            }
            return false;
        },

        rowRoomByItem(item, index) {
            let currRommTypeData = this.waitingRoom.filter(waitRoom => {
                return waitRoom.roomTypeId == item.roomTypeId;
            })[0];
            let hadReadyCheckArray = [];
            if (currRommTypeData.roomsArr) {
                currRommTypeData.roomsArr.forEach(item => {
                    hadReadyCheckArray.push(item.houseNum);
                })
            }
            this.rowRoomCurrentItem = JSON.parse(JSON.stringify(item));
            this.rowRoomCurrentIndex = index;
            this.hotelRoomListParams.roomTypeId = item.roomTypeId;
            this.$refs.rowHouse.init(item.roomTypeId, item.num, hadReadyCheckArray,
                new Date(this.checkInForm.checkinTime).Format("yyyy-MM-dd HH:mm:ss"),
                new Date(this.checkInForm.checkoutTime).Format("yyyy-MM-dd HH:mm:ss"));
        },

        //获取可排房的房间
        // hotel_room_list(roomTypeId) {
        //
        // let params = Object.assign({}, this.hotelRoomListParams);
        // // params.roadFlag !== "" && (params.roadFlag = params.roadFlag ? 1 : "");
        // // params.windowFlag !== "" &&
        // //   (params.windowFlag = params.windowFlag ? 1 : "");
        // // params.smokeFlag !== "" && (params.smokeFlag = params.smokeFlag ? 1 : "");
        // // params.noiseFlag !== "" && (params.noiseFlag = params.noiseFlag ? 1 : "");
        // // params.temperatureFlag !== "" &&
        // //   (params.temperatureFlag = params.temperatureFlag ? 1 : "");
        // this.$F.merge(params, object || {});
        // this.$F.doRequest(
        //   this,
        //   // "/pms/hotel/hotel_room_list",
        //   "/pms/checkin/empty_row_houses",
        //   params,
        //   (res) => {
        //     this.rowRoomCurrentList = [];
        //     if (res) {
        //       for (let id in res) {
        //         this.rowRoomCurrentList = this.rowRoomCurrentList.concat(res[id]);
        //       }
        //     }
        //   }
        // );
        // },
        //手动排房确定
        db_row_houses() {
            if (this.rowRoomCurrentItem.roomsArr.length > this.rowRoomCurrentItem.num) {
                this.$message.error(this.$t("desk.home_morethenNum"));
                return;
            }
            let array = [];
            this.rowRoomCurrentItem.roomsArr.forEach((item) => {
                array.push({
                    roomTypeId: item.roomTypeId,
                    roomId: item.id,
                    houseNum: item.houseNum,
                    reservePrice: this.rowRoomCurrentItem.onePersonPrice || this.rowRoomCurrentItem.reservePrice,
                    realPrice: this.rowRoomCurrentItem.onePersonPrice || this.rowRoomCurrentItem.realPrice,
                });
            });
            this.rowRoomCurrentItem.roomsArr = array;
            this.waitingRoom[this.rowRoomCurrentIndex] = this.rowRoomCurrentItem;
            this.$forceUpdate();
        },

        //手动排房添加
        rowRoomCurrentListItemAdd(item) {
            this.rowRoomCurrentItem.roomsArr = this.rowRoomCurrentItem.roomsArr || [];
            let exist = false;

            for (let k in this.rowRoomCurrentItem.roomsArr) {
                if (item.id == this.rowRoomCurrentItem.roomsArr[k].id || item.id == this.rowRoomCurrentItem.roomsArr[k].roomId) {
                    this.rowRoomCurrentItem.roomsArr.splice(k, 1);
                    exist = true;
                    break;
                }
            }
            if (!exist) this.rowRoomCurrentItem.roomsArr.push(item);
            this.$forceUpdate();
            console.log(this.rowRoomCurrentItem);
        },

        //自动排房
        empty_row_houses() {
            let roomTypeId = [],
                numbers = [];
            this.waitingRoom.forEach((element) => {
                let thisNum =
                    element.num - (element.roomsArr ? element.roomsArr.length : 0);
                numbers.push(thisNum);
                if (thisNum > 0) {
                    for (let i = 0; i < thisNum; i++) {
                        if (roomTypeId.indexOf(element.roomTypeId) == -1) {
                            roomTypeId.push(element.roomTypeId);
                        }
                    }
                }
            });
            if (numbers.length < 1) return;
            let params = {
                checkinTime: this.checkInForm.checkinTime.split(' ')[0],
                checkoutTime: this.checkInForm.checkoutTime,
                checkinRoomType: 1,
                roomTypeId: roomTypeId.join(","),
                rowHousesTotal: numbers.join(","),
            };
            // if (this.operCheckinType == 'a1' || this.operCheckinType == 'a2') {
            //     params.checkinId = this.checkInForm.checkInId
            // }
            // if (this.operCheckinType == 'b1' || this.operCheckinType == 'b2' || this.operCheckinType == 'b3') {
            //     params.checkinReserveId = this.checkInForm.checkInId
            // }
            let setRooms = (key, item) => {
                this.waitingRoom[this.rowRoomCurrentIndex] = this.rowRoomCurrentItem;
                for (let k in this.waitingRoom) {
                    if (this.waitingRoom[k].roomTypeId == key) {
                        if (!this.waitingRoom[k].roomsArr) {
                            this.waitingRoom[k].roomsArr = [];
                        }
                        let object = this.waitingRoom.filter((temp) => {
                            return temp.roomTypeId == item.roomTypeId;
                        })[0];
                        this.waitingRoom[k].roomsArr.push({
                            roomTypeId: item.roomTypeId,
                            roomId: item.id,
                            houseNum: item.houseNum,
                            reservePrice: object.onePersonPrice,
                            realPrice: object.onePersonPrice,
                        });
                    }
                }
            };
            this.makeStoresNum(params);
            this.$F.doRequest(
                this,
                "/pms/checkin/empty_row_houses",
                params,
                (res) => {

                    let data = res;
                    for (let k in data) {
                        let ids = [];
                        data[k].forEach((item) => {
                            ids.push(item.id);
                        });
                        data[k].forEach((element) => {
                            setRooms(k, element);
                        });
                    }
                    console.log(this.waitingRoom);
                    this.$forceUpdate();
                }
            );
        },
        //移除排房
        delete_db_row_houses(item, id, i) {
            item.roomsArr.splice(i, 1);
            this.$forceUpdate();
        },

        checkIsSelect(item) {
            if (
                this.rowRoomCurrentItem.roomsArr &&
                this.rowRoomCurrentItem.roomsArr.length
            ) {
                for (let k in this.rowRoomCurrentItem.roomsArr) {
                    if (item.id == this.rowRoomCurrentItem.roomsArr[k].id) {
                        return true;
                    }
                }
                return false;
            }
            return false;
        },
        //入住人回调
        personCallback(checkInRoomJson) {
            this.checkInForm.checkInRoomJson = checkInRoomJson;
            this.addLivePersonShow = false;
        },
        live_in_person_list() {
            let waitingRoom2 = this.$F.deepClone(this.waitingRoom);
            this.inRoomList = [];
            if (this.checkInForm.checkInRoomJson.length > 0) {
                this.inRoomList = this.checkInForm.checkInRoomJson;
            } else {
                waitingRoom2.forEach((roomTypeObject) => {
                    if (roomTypeObject.roomsArr) {
                        roomTypeObject.roomsArr.forEach((room, index) => {
                            room.roomTypeName = roomTypeObject.roomTypeName;
                            room.houseNum = room.houseNum;
                            room.sex = this.checkInForm.sex;
                            room.idcard = this.checkInForm.idcard;
                            room.idcardType = this.checkInForm.idcardType;
                            room.name = this.checkInForm.name;
                            room.pronunciation = this.checkInForm.pronunciation;
                            room.personList = room.personList || [this.checkInForm];
                            this.inRoomList.push(room);
                        });
                    }
                });
                if (this.inRoomList.length == 0) {
                    this.$message.error(this.$t('desk.book_placeRowHouse'));
                    return;
                }
            }
            this.addLivePersonShow = true;
        },

        make_card_status() {
            let arr = [];
            if (!this.multipleSelection.length) {
                this.$message.error(this.$t("desk.home_shouldSelectRoom"));
                return;
            }
            this.multipleSelection.forEach((element) => {
                arr.push(element.id);
            });
            let params = {
                checkInRoomIds: arr,
            };
            this.makeStoresNum(params);
            this.$F.doRequest(this, "/pms/checkin/make_card_status", params, (res) => {
                    this.$message({
                        message: this.$t("commons.request_success"),
                        type: "success",
                    });
                    this.$forceUpdate();
                }
            );
        },
        F_markCard(value) {
            let enums = this.$t("commons.markCard");
            return value && enums[value] ? enums[value] : "";
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val);
        },
        remoteMethod(query, cb) {
            this.options = [];
            let params = {
                storesNum: '',
                name: query,
                searchType: 1,
                pageIndex: 1,
                filter: true,
                pageSize: 999,
                paging: false,
            };
            this.nameLoading = true;
            this.makeStoresNum(params);
            if (this.operCheckinType.startsWith('a')) {
                this.$F.doRequest(this, "/pms/checkin/checkin_order_list", params,
                    (res) => {
                        this.nameLoading = false;
                        this.options = res.roomPersonList || [];
                        this.options.forEach((element) => {
                            element.value =
                                element.name +
                                "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
                                (element.mobile || "") +
                                "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
                                (element.idcard ? element.idcard.slice(-4) : "");
                        });
                        cb(this.options);
                        this.$forceUpdate();
                    }
                );
            } else {
                this.getReverveList(params, ()=> {
                    this.options.forEach((element) => {
                        element.value =
                            element.name +
                            "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
                            (element.mobile || "") +
                            "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
                            (element.idcard ? element.idcard.slice(-4) : "");
                    });
                    cb(this.options);
                    this.$forceUpdate();
                })
            }
        },

        getReverveList(params, callback) {
            params.storesNum = '';
            this.$F.doRequest(
                this,
                "/pms/reserve/reserve_order_list",
                params,
                (res) => {
                    this.options = this.options.concat(res.resreveList || []);
                    callback()
                }
            );
        },
        changeName(e) {
            console.log(e);
            if (e.name) {
                this.baseInfo = e;
                this.checkInForm.name = e.name;
                this.checkInForm.pronunciation = e.pronunciation;
                this.checkInForm.guestType = e.guestType ? e.guestType.toString() : '';
                this.checkInForm.idcard = e.idcard;
                // this.checkInForm.idcardType = e.idcardType.toString();
                this.checkInForm.idcardType = e.idcardType ? e.idcardType.toString() : '2';
                this.checkInForm.mobile = e.mobile;
                // this.checkInForm.orderSource = e.orderSource.toString();
                this.checkInForm.orderSource = e.orderSource ? e.orderSource.toString() : '1';
                // this.checkInForm.orderType = e.orderType.toString();
                this.checkInForm.orderType = e.orderType;
                // this.checkInForm.sex = e.sex.toString();
                this.checkInForm.sex = e.sex ? e.sex.toString() : '1';
                this.checkInForm.ruleHourId = e.ruleHourId ? e.ruleHourId : "";
                this.checkInForm.checkinType = e.checkinType ? e.checkinType.toString() : "";
            } else {
                this.checkInForm.name = e;
            }
        },

        //选择客源类型组件的确认回调
        guestChooseCallback(data) {
            this.checkInForm = data;
        },
        handleOperCheckinType() {
            let menu = {
                a1: 1,
                a2: 2,
                b1: 1,
                b2: 2,
                b3: 3,
            };
            this.checkInForm.operCheckinType = menu[this.operCheckinType];
            let nowDate = new Date();
            if (this.operCheckinType && this.operCheckinType.startsWith("b")) {
                this.checkInForm.checkinTime = nowDate.Format("yyyy-MM-dd HH:mm:ss");
                if (this.operCheckinType == "b1") {
                    this.checkInForm.checkinDays = 1;
                    nowDate.setDate(nowDate.getDate() + this.checkInForm.checkinDays);
                    this.checkInForm.checkoutTime = nowDate.Format("yyyy-MM-dd 11:00:00");
                } else if (this.operCheckinType == "b2" || this.operCheckinType == "b3") {
                    this.checkInForm.checkinDays = "";
                    nowDate.setDate(nowDate.getDate() + 1);
                    nowDate.setHours(12);
                    nowDate.setMinutes(0);
                    nowDate.setSeconds(0);
                    this.checkInForm.checkoutTime = nowDate.Format("yyyy-MM-dd HH:mm:ss");
                    // for (let k in this.checkInForm) {
                    //     if (k !== 'operCheckinType') {
                    //         this.checkInForm[k] = ''
                    //     }
                    // }
                }
                // this.checkInForm.keepTime =
                //     new Date().Format("yyyy-MM-dd") + " 23:59:00";
            }
            if (this.operCheckinType == "a1" || this.operCheckinType == "a2") {
                this.checkInForm.checkinTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
                nowDate = new Date();
                nowDate.setDate(nowDate.getDate() + 1);
                this.checkInForm.checkoutTime = nowDate.Format("yyyy-MM-dd") + " 11:00:00";
            }
            //  else {
            //     this.typeText = "预订";
            // }
        },
        selectBlur(e) {
            console.log(e);
            this.checkInForm.name = e.target.value;
        },

        mackcadeCancel() {
            if (this.isSubmitErr) {
                this.isSubmitErr = false;
                this.$router.replace("/orderdetail?id=" + this.checkInForm.checkInId);
            } else {
                this.mackcade = false;
            }
        },
        startTimeChange(e) {
            if (this.operCheckinType == 'b1') {
                let date = new Date(e);
                if (e > this.checkInForm.checkoutTime || (date.Format("yyyy-MM-dd") == new Date(this.checkInForm.checkoutTime).Format("yyyy-MM-dd"))) {
                    date.setDate(date.getDate() + 1);
                    this.checkInForm.checkoutTime = date.Format("yyyy-MM-dd 11:00:00");
                }
                this.checkInForm.checkinDays = this.$F.getDaysBetween(
                    new Date(this.checkInForm.checkinTime).Format("yyyy-MM-dd"),
                    new Date(this.checkInForm.checkoutTime).Format("yyyy-MM-dd")
                );
            } else if (this.operCheckinType == 'b2') {
                this.checkInForm.checkoutTime = new Date(e).Format("yyyy-MM-dd") + " 22:00:00";
            }
            // let date = new Date(e);
            // date.setHours(date.getHours() + 2);  //预抵时间修改 保留时间跟着修改
            // this.checkInForm.keepTime = date.Format("yyyy-MM-dd HH:mm:ss");
        },
        endTimeChange(e) {
            let day = 0;
            if (this.checkInForm.checkinTime) {
                day = this.$F.getDaysBetween(
                    new Date(this.checkInForm.checkinTime).Format("yyyy-MM-dd"),
                    new Date(this.checkInForm.checkoutTime).Format("yyyy-MM-dd")
                );
                this.checkInForm.checkinDays = day;
            }
        },
        checkinDaysChange(e) {
            console.log(e);
            if (this.checkInForm.checkinTime == "") {
                this.$message.error(this.$t("desk.home_selectToTime"));
                this.checkInForm.checkinDays = 0;
                return;
            } else {
                var date = new Date(this.checkInForm.checkinTime);
                date.setDate(date.getDate() + e);
                this.checkInForm.checkoutTime = date.Format("yyyy-MM-dd 11:00:00");
            }
        },

        //添加同来宾客
        addGuest(row, index) {
            let newRow = this.$F.deepClone(row);
            row.children.push({
                checkinId: newRow.checkinId,
                checkinRoomId: newRow.roomId,
                id: "3213213",
                name: "",
                isChild: true,
                idcardType: "2",
                idcard: "",
                edit: true,
                sex: "1",
                mobile: "",
                checkInPersonId: "",
                // hasChildren: false
            });
        },
    },
};
</script>

<style lang="scss">
.el-autocomplete {
    position: relative;
    display: inline-block;
    width: 100%;
}
.el-autocomplete-suggestion {
    width: 450px !important;
}
.ru {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 60px;
    overflow: hidden;
    border-radius: 0 0 8px 8px;

    .content {
        padding: 20px;
        height: auto;

        &.last {
            flex: 1;
            height: 0;
            overflow: auto;
        }

        h3 {
            margin: 0 0 15px;
        }

        .inForm {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            .el-form-item {
                width: 350px;
                margin-right: 0;
                margin-bottom: 12px;
                display: flex;
                flex-direction: row;

                .el-form-item__content {
                    flex: 1;
                    width: 0;

                    .el-autocomplete,
                    .el-input,
                    .el-select,
                    .el-input-number {
                        width: 100%;
                    }
                }
            }
        }

        .roomMsg {
            display: flex;

            .left,
            .right {
                display: flex;
                flex-direction: column;
            }

            .left {
                flex: 2;
                margin-right: 20px;
            }
            .right {
                flex: 1;
            }
            .roomBtm {
                background: #f6f7f7;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                flex: 1;

                &.checked {
                    flex-direction: column;
                    padding: 0 10px;
                }

                .roomBox {
                    width: 33%;
                    padding: 10px;

                    .rooms {
                        padding: 10px;
                        background: #fff;
                        border-radius: 4px;

                        &.active {
                            background: #e3eeff;
                            border-color: #126eff;
                        }
                        .row {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 12px;

                            &:last-child {
                                margin-bottom: 0;
                            }
                            .allow {
                                color: #126eff;
                                font-size: 13px;
                            }
                            .num {
                                width: 70px;

                                .el-input__inner {
                                    background: #d6d6d6;
                                }
                            }
                            span {
                                margin-left: 10px;
                                //color: #999;
                                font-size: 12px;
                            }
                        }
                    }
                }
                .checkRoom {
                    padding: 15px 10px;
                    border-bottom: 1px solid #d7d7d7;

                    .rowReverse {
                        display: flex;
                        flex-direction: row-reverse;
                        justify-content: space-between;
                    }
                }
            }
        }
    }

    .fixedFoot {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: right;
        background: #fff;
        border-top: 1px solid #eee;

        .wrap {
            padding: 10px 20px;

            button {
                margin-left: 20px;
            }
        }
    }
}
.rooms .grid-cell .wrap {
    padding: 10px 5px;
}

.rooms .grid-cell .wrap .row:last-child {
    margin-top: 10px;
}

.rooms .grid-cell .wrap em {
    font-style: normal;
    font-size: 12px;
    color: #999;
    /* text-decoration: line-through; */
    margin-left: 5px;
}

.roomSelect {
    background: #f6f7f7;
    min-height: 500px;
}

.roomSelect ul li .rooms {
    margin: 0;
}

.roomSelect ul li .rooms .grid-cell {
    border: 0;
}

.roomSelect ul {
    padding: 0 20px;
}

.roomSelect ul li {
    border-bottom: 1px solid #d7d7d7;
    padding: 10px 0;
}

.roomSelect ul li:last-child {
    border-bottom: 0;
}

.roomSelect ul li em {
    font-style: normal;
}

.rowRoomDia .rowRoomsList {
    background: #f6f7f7;
    width: 100%;
    height: 368px;
    overflow-y: auto;
    padding: 0.1px;
}

.rowRoomDia .rowRoomsList .wrap {
    padding: 20px 30px;
}

.rowRoomDia .rowRoomsList h3 {
    padding: 0;
    margin: 0;
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: normal;
}

.rowRoomDia .rowRoomsList .tag {
    cursor: pointer;
    min-width: 50px;
    text-align: center;
}

.roomNumTag {
    position: relative;
    min-width: 60px;
}

.roomNumTag .del {
    display: none;
}

.roomNumTag:hover .del {
    display: block;
    z-index: 9;
    width: 60px;
    border-radius: 5px;
    font-size: 12px;
    font-style: normal;
    margin: 0;
    line-height: 28px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.66);
    color: #fff;
}

.el-select {
    display: inline-block;
}
.topBigbox {
    background-color: rgba(246, 247, 247, 1);
    box-sizing: border-box;
    padding: 15px 10px;
    .eackBlock {
        margin-bottom: 10px;
        &:nth-last-child() {
            margin-bottom: 0px;
        }
    }
}
.spanBox {
    margin: 10px 0;
    span {
        color: rgba(18, 110, 255, 100);
        font-size: 13px;
        text-decoration: underline;
    }
}
.closePng{
    width: 20px;
    height: 20px;
    position: relative;
    top: 6px;
    margin-left: 5px;
}
</style>
