<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-18 11:56:24
 * @FilePath: /jiudian/src/views/market/reception/checkin/normal.vue
 -->

<template>
    <!-- 统一的列表格式 -->
    <div class="boss-index ru">
        <div class="content">
            <h3 v-if="operCheckinType=='a1' || operCheckinType=='a2'">入住信息</h3>
            <h3 v-if="operCheckinType=='b1' || operCheckinType=='b2'">预订信息</h3>
            <h3 v-if="operCheckinType=='b3'">会议登记信息</h3>
            <el-form ref="checkInForm" class="inForm" inline size="small" :model="checkInForm" :rules="rules"
                     label-width="120px" v-if="operCheckinType=='a1' || operCheckinType=='a2'">
                <el-form-item :label="$t('desk.customer_livePeople')" prop="name">
                    <el-autocomplete v-model="checkInForm.name" name="name" :fetch-suggestions="remoteMethod" :highlight-first-item="true" popper-class="popper-class" :trigger-on-focus="false" placeholder="请输入内容" @select="changeName($event)"></el-autocomplete>
                </el-form-item>
                <el-form-item label="性别：" prop="sex">
                    <el-radio-group v-model="checkInForm.sex">
                        <el-radio v-for="(item,key,index) of $t('commons.F_sex')" :label="key" :key="index">{{item}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('commons.idCardTypeDesc')" prop="idcardType">
                    <el-select v-model="checkInForm.idcardType">
                        <el-option :value="key" v-for="(item,key,index) of $t('commons.idCardType')" :label="item" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号：" prop="idcard">
                    <el-input v-model="checkInForm.idcard"></el-input>
                </el-form-item>
                <template v-if="operCheckinType=='a1'">
                    <el-form-item :label="$t('frontOffice.nightAudit.checkInTime')" prop="checkinTime">
                        <el-date-picker v-model="checkInForm.checkinTime" disabled type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="startTime"></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="$t('desk.order_departureTime')" prop="checkoutTime">
                        <el-date-picker v-model="checkInForm.checkoutTime" type="datetime" placeholder="选择日期" :picker-options="leaveTime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" @change="endTimeChange"></el-date-picker>
                    </el-form-item>
                </template>
                <template v-if="operCheckinType=='a2'">
                    <el-form-item label="计费规则：" prop="ruleHourId">
                        <el-select v-model="checkInForm.ruleHourId">
                            <el-option v-for="item in ruleHourList" :key="item.id" :label="item.ruleName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <el-form-item label="销售员：">
                    <el-select v-model="checkInForm.salesId">
                        <el-option v-for="item in salesList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="外部订单号：">
                    <el-input v-model="checkInForm.thirdOrdernum"></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.order_moblePhone')" prop="mobile">
                    <el-input v-model="checkInForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="客源类型" prop="guestType">
                    <el-input type="input" :value="$t('commons.guestType')[checkInForm.guestType]" :disabled="true">
                        <template slot="append">
                            <span @click="popup('guestTypeShow')">…</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.book_orderSoutce')" prop="orderSource">
                    <el-select v-model="checkInForm.orderSource">
                        <el-option :value="key" v-for="(item,key,index) of $t('commons.orderSource')" :label="item" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('commons.checkInTypeDesc')" prop="checkinType">
                    <el-select v-model="checkInForm.checkinType">
                        <el-option :value="key" v-for="(item,key,index) of $t('commons.checkinType')" :label="item" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单备注：">
                    <el-input type="textarea" v-model="checkInForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="checkInForm" class="inForm" inline size="small" :model="checkInForm" :rules="rules" label-width="120px" v-if="operCheckinType=='b1' || operCheckinType=='b2'|| operCheckinType=='b3'">
                <el-form-item :label="$t('desk.customer_livePeople')" prop="name">
                    <el-autocomplete v-model="checkInForm.name" name="name" :fetch-suggestions="remoteMethod" :highlight-first-item="true" popper-class="popper-class" :trigger-on-focus="false" placeholder="姓名查询" @select="changeName($event)"></el-autocomplete>
                </el-form-item>
                <el-form-item :label="$t('desk.order_moblePhone')" prop="prop">
                    <el-input v-model="checkInForm.mobile"></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.book_orderSoutce')" prop="orderSource">
                    <el-select v-model="checkInForm.orderSource">
                        <el-option :value="key" v-for="(item,key,index) of $t('commons.orderSource')" :label="item" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('commons.checkInTypeDesc')" prop="checkinType" v-if="operCheckinType!='b3'">
                    <el-select v-model="checkInForm.checkinType">
                        <el-option :value="key" v-for="(item,key,index) of $t('commons.checkinType')" :label="item" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="销售员：" v-if="operCheckinType=='b3'">
                    <el-select v-model="checkInForm.salesId">
                        <el-option v-for="item in salesList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计费规则：" prop="ruleHourId" v-if="operCheckinType=='b2'">
                    <el-select v-model="checkInForm.ruleHourId">
                        <el-option v-for="item in ruleHourList" :key="item.id" :label="item.ruleName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="预抵时间" prop="checkinTime">
                    <el-date-picker v-model="checkInForm.checkinTime" type="datetime" placeholder="选择日期" :picker-options="startTime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" @change="startTimeChange"></el-date-picker>
                </el-form-item>
                <el-form-item label="入住天数：" prop="checkinDays" v-if="operCheckinType=='b1'">
                    <el-input-number v-model="checkInForm.checkinDays" :step="1" :min="1" @change="checkinDaysChange"></el-input-number>
                </el-form-item>
                <el-form-item :label="$t('desk.order_departureTime')" prop="checkoutTime">
                    <el-date-picker v-model="checkInForm.checkoutTime" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="leaveTime" @change="endTimeChange"></el-date-picker>
                </el-form-item>
                <el-form-item label="保留时间：" prop="keepTime">
                    <el-date-picker v-model="checkInForm.keepTime" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="leaveTime"></el-date-picker>
                </el-form-item>
                <el-form-item label="客源类型" prop="guestType">
                    <el-input type="input" :value="$t('commons.guestType')[checkInForm.guestType]" :disabled="true">
                        <template slot="append"><span @click="popup('guestTypeShow')">…</span></template>
                    </el-input>
                </el-form-item>
                <el-form-item label="销售员：" v-if="operCheckinType!='b3'">
                    <el-select v-model="checkInForm.salesId">
                        <el-option v-for="item in salesList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="外部订单号：" v-if="operCheckinType!='b3'">
                    <el-input v-model="checkInForm.thirdOrdernum"></el-input>
                </el-form-item>
                <template v-if="operCheckinType=='b3'">
                    <el-form-item label="会议名称：" prop="meetingName">
                        <el-input v-model="checkInForm.meetingName"></el-input>
                    </el-form-item>
                    <el-form-item label="单位名称：" prop="enterName">
                        <el-input v-model="checkInForm.enterName"></el-input>
                    </el-form-item>
                </template>
                <el-form-item label="订单备注：">
                    <el-input type="textarea" v-model="checkInForm.remark"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="content last">
            <h3>房间信息</h3>
            <div class="roomMsg">
                <div class="left">
                    <el-form inline size="small">
                        <el-form-item>
                            <el-radio-group v-model="getRoomsForm.changeType" @change="getDataList">
                                <el-radio :label="1" border>可改房价</el-radio>
                                <el-radio :label="2" border>不可改房价</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="getRoomsForm.bedCount" @change="getDataList">
                                <el-option :value="key" v-for="(item,key,index) of $t('commons.bedCount')" :label="item" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="roomBtm">
                        <div class="roomBox" v-for="v in roomList" :key="v.roomTypeId">
                            <div class="rooms" :class="activeRoomCheck(v.roomTypeId)?'active':''">
                                <div class="row">
                                    <span>{{v.roomTypeName}}</span>
                                    <el-input-number @change="handleNumChange($event,v)" :min="0" :max="v.reserveTotal" label="描述文字" size="mini" style="width:100px" v-model.number="v.num"></el-input-number>
                                </div>
                                <div class="row">
                                    <span class="allow">可订{{v.reserveTotal}}</span>
                                    <div>
                                        <el-input size="mini" class="num" v-model="v.discountPrice" v-if="getRoomsForm.changeType==1"></el-input>
                                        <del>{{v.price }}</del>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <el-form inline size="small">
                        <el-form-item>
                            <el-button @click="empty_row_houses">自动排房</el-button>
                            <el-button @click="live_in_person_list" v-if="!operCheckinType.startsWith('b') && waitingRoom.length > 0"><i v-loading='liveLoading'></i>{{ $t('desk.order_rowHouses') }}</el-button>
                            <el-button @click="live_in_person_list" v-if="!operCheckinType.startsWith('b') && waitingRoom.length > 0"><i v-loading="liveCardLoading"></i>制卡</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="roomBtm checked">
                        <div class="checkRoom" v-for="(v,index) in waitingRoom" :key="index">
                            <div class="row rowReverse">
                                <div>
                                    <el-button type="primary" class="white" size="mini" @click="">附餐</el-button>
                                    <el-button type="primary" class="submit" size="mini" @click="rowRoomByItem(v,index)">排房</el-button>
                                </div>
                                <div><span>{{v.roomTypeName}}</span><span class="text-red">{{v.num}}间</span></div>
                            </div>
                            <div class="row">
                                <div class="tags margin-t-5">
                                    <el-button class="roomNumTag" size="mini" v-for="(item,i) of v.roomsArr" :key="i">{{item.houseNum}} <span class="del" @click="delete_db_row_houses(v,item.id,i)">✕ 移除</span></el-button>
                                </div>
                            </div>
                            <div class="row rowReverse">
                                <el-input-number class="margin-t-5" @change="handleNumChange($event,v)" :min="0" :max="v.reserveTotal" size="mini" style="width:100px" v-model.number="v.num"></el-input-number>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 编辑or详情弹窗 -->
        <div class="fixedFoot">
            <div class="wrap">
                <el-button type="primary" class="submit" @click="hotel_check_in(2)">{{ $t('commons.save') }}</el-button>
                <el-button class="white" @click="hotel_check_in(3)">{{ $t('frontOffice.saveGoon') }}{{typeText}}</el-button>
            </div>
        </div>

        <el-dialog top="0" :visible.sync="rowRoomShow" class="rowRoomDia" title="排房" width="800px">
            <el-form :model="hotelRoomListParams" style="margin-top:-20px" v-loading="loading">
                <el-form-item label="朝向:" class="" style="margin-bottom:0">
                    <el-checkbox-group v-model="hotelRoomListParams.toward" @change="hotel_room_list">
                        <el-checkbox v-for="(item,key,index) of $t('commons.toward')" :label="key" :value="key" :key="index">{{item}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="属性:" class="" style="margin-bottom:0">
                    <el-checkbox v-model="hotelRoomListParams.windowFlag" @change="hotel_room_list">有窗</el-checkbox>
                    <el-checkbox v-model="hotelRoomListParams.roadFlag" @change="hotel_room_list">靠马路</el-checkbox>
                    <el-checkbox v-model="hotelRoomListParams.smokeFlag" @change="hotel_room_list">无烟房</el-checkbox>
                    <el-checkbox v-model="hotelRoomListParams.noiseFlag" @change="hotel_room_list">非噪音房</el-checkbox>
                    <el-checkbox v-model="hotelRoomListParams.temperatureFlag" @change="hotel_room_list">非高温房</el-checkbox>
                </el-form-item>
                <div class="rowRoomsList">
                    <div class="wrap">
                        <el-row>
                            <!-- <h3>新加坡假日酒店</h3> -->
                            <el-row class="roomsInserted" :gutter="10">
                                <el-col v-for="v in rowRoomCurrentList" :key="v.id" :span="3" style="margin-bottom:10px">
                                    <el-tag :type="checkIsSelect(v)?'danger':'info'" effect="dark" class="tag" @click="rowRoomCurrentListItemAdd(v)">{{v.houseNum}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-row>
                    </div>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="rowRoomShow = false">{{ $t('commons.cancel') }}</el-button>
            <el-button size="small" type="primary" @click="db_row_houses">{{ $t('commons.confirm') }}</el-button>
        </span>
        </el-dialog>
        <el-dialog top="0" :visible.sync="liveInPersonShow" class="liveInPersonDia" :title="$t('desk.order_rowHouses')" width="80%">
            <el-table v-loading="loading" :data="liveInPersonData" style="width: 100%;margin-bottom: 20px;"
                      row-key="id" border :default-expand-all='true'
                      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column :label="$t('desk.customer_roomKind')" width="100">
                    <template slot-scope="scope">
                        {{scope.row.isChild?'':scope.row.houseNum}}
                        {{scope.row.isChild?'':scope.row.roomTypeName}}
                    </template>
                </el-table-column>
                <el-table-column prop="realPrice" label="房价" width="100">
                </el-table-column>
                <!-- <el-table-column prop="" label="排房" width="150">
                </el-table-column> -->
                <el-table-column label="姓名" width="150">
                    <template slot-scope="{row}">
                        <el-row>
                            <el-input v-model="row.name" placeholder="请输入姓名"></el-input>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column prop="groupName" :label="$t('commons.idCardTypeDesc')" width="150">
                    <template slot-scope="{row}">
                        <el-row>
                            <el-select v-model="row.idcardType" style="width:100%">
                                <el-option :value="key" v-for="(item,key,index) of $t('commons.idCardType')" :label="item" :key="index"></el-option>
                            </el-select>
                        </el-row>
                    </template>

                </el-table-column>
                <el-table-column prop="groupName" label="证件号码">
                    <template slot-scope="{row}">
                        <el-row>
                            <el-input v-model="row.idcard" placeholder="请输入证件号码"></el-input>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="性别" width="120">
                    <template slot-scope="{row}">
                        <el-row>
                            <el-select v-model="row.sex" style="width:100%">
                                <el-option v-for="(item,key,index) of $t('commons.F_sex')" :label="item" :value="key" :key="index"></el-option>
                            </el-select>
                        </el-row>
                    </template>
                </el-table-column>checkInRoomJson
                <el-table-column prop="groupName" :label="$t('desk.order_moblePhone')" width="150">
                    <template slot-scope="{row}">
                        <el-row>
                            <el-input v-model="row.mobile" placeholder="请输入手机号"></el-input>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commons.operating')" width="180">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="" v-if="scope.row.isChild && !scope.row.isIndex0">{{$t('commons.delete')}}</el-button>
                        <el-button type="text" v-if="!scope.row.isChild" size="mini" @click="addGuest(scope.row, scope.$index)"><!--@click="addItem_live_in_person(scope.$index,scope.row)"-->
                            <template>+同来宾客</template>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="liveInPersonCancel">{{ $t('commons.cancel') }}</el-button>
             <el-button size="small" type="primary" @click="liveInPersonShow = false">{{ $t('commons.confirm') }}</el-button>
        </span>
        </el-dialog>
        <el-dialog top="0" :show-close='false' title="房卡操作" :visible.sync="mackcade" width="60%">
            <el-row>
                <span>共一间&nbsp;&nbsp;本次已制卡数：{{liveCardData.done}}</span>
                <el-col :span="8" style="float:right">
                    <el-button @click="make_card_status">制卡</el-button>
                    <el-button>清卡</el-button>
                    <el-button>读卡</el-button>
                </el-col>
            </el-row>
            <el-table ref="multipleTable" :data="liveCardData.checkInRoomList" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" :label="$t('desk.home_roomNum')" width="200">
                    <template slot-scope="{row}">
                        {{row.room?row.room.houseNum:''}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="本次制卡状态">
                    <template slot-scope="{row}">
                        {{F_markCard(row.markCard)}}
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="mackcadeCancel">{{ $t('commons.cancel') }}</el-button>
        </span>
        </el-dialog>
        <el-dialog top="0" :show-close='false' :title="$t('desk.order_rowHouses')" :visible.sync="addLivePersonShow" width="60%">
            <customer v-if="addLivePersonShow" type="checkin" :liveData="liveData" :type="order" @personCallback="personCallback"></customer>

        </el-dialog>
        <guestChoose @guestChooseCallback="guestChooseCallback" ref="guestChoose" :checkInForm="checkInForm"></guestChoose>
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
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function getDaysBetween(dateString1, dateString2) {
    var startDate = Date.parse(dateString1);
    var endDate = Date.parse(dateString2);
    var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
    // alert(days);
    return days;
}
import {
    mapState,
    mapActions
} from "vuex";
const vm = window.vm;
import customer from '@/components/front/customer2'
import guestChoose from '@/views/market/reception/checkin/guestChoose'
export default {
    props: ['operCheckinType'],   //b1：普通预定 b2:时租房预定 b3:会场预定     a1: 普通入住  a2:时租入住
    components: {
        customer,
        guestChoose
    },
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
            liveData: [],  //添加入住人
            addLivePersonShow: false,  //是否显示添加入住人组件
            afterToday: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天
                }
            },
            leaveTime: {
                disabledDate: time => {
                    if (this.checkInForm.checkinTime != "" && this.checkInForm.checkinTime) {
                        let timeStr = new Date(new Date(this.checkInForm.checkinTime).Format("yyyy-MM-dd").replace(/-/g, "/"));
                        if (this.operCheckinType == 'b2') { //时租预订
                            return new Date(time.Format("yyyy-MM-dd")).getTime() - 8.64e7 > timeStr;
                        }
                        return new Date(time.Format("yyyy-MM-dd")).getTime() - 8.64e7 < timeStr;
                    } else if (this.checkInForm.checkinTime == "") {
                        return new Date(time.Format("yyyy-MM-dd")).getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天
                    } else {
                        return "";
                    }
                }
            },
            startTime: {
                disabledDate: time => {
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
                }
            },
            num: 1,
            isSubmitErr: false,
            loading: false,
            liveLoading: false,
            liveCardLoading: false,
            rowRoomShow: false,
            showDetail: false,
            guestTypeShow: false,
            liveInPersonShow: false,
            mackcade: false,
            nameLoading: false,
            options: [],
            baseInfo: '',
            getRoomsForm: {
                changeType: 1,
                roomType : 1,
                bedCount: '',
            },
            salesList: '',
            ruleHourList: [],
            //预定和入住人信息
            checkInForm: {
                checkInRoomJson: []
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }, ],
                sex: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择性别',
                    trigger: 'blur'
                }, ], mobile: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                }, ],
                idcardType: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择护照类型',
                    trigger: 'change'
                }, ],
                idcard: [{
                    required: true,
                    message: '请输入证件号',
                    trigger: 'blur'
                }, ],
                checkinTime: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择入住时间',
                    trigger: 'blur'
                }, ],
                checkoutTime: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择预离时间',
                    trigger: 'blur'
                }, ],
                keepTime: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择保留时间',
                    trigger: 'blur'
                }, ],
                checkinDays: [{
                    required: true,
                    message: '请输入入住天数',
                    trigger: 'blur'
                }, ],
                guestType: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择客源类型',
                    trigger: 'blur'
                }, ],
                orderSource: [{
                    required: true,
                    message: this.$t('desk.book_orderSoutce'),
                    trigger: 'blur'
                }, ],
                checkinType: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择入住类型',
                    trigger: 'blur'
                }, ],
                ruleHourId: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择计费规则',
                    trigger: 'blur'
                }, ],
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            roomList: [], //表格数据
            waitingRoom: [],
            rowRoomCurrentItem: '',
            rowRoomCurrentList: '',

            hotelRoomListParams: {
                buildingId: '',
                buildingFloorId: '',
                roomTypeId: '',
                houseNum: '',
                toward: [],
                roadFlag: '',
                windowFlag: '',
                smokeFlag: '',
                noiseFlag: '',
                temperatureFlag: '',
                livingRoomStatus: '',
                pageIndex: 1,
                pageSize: 9999
            },
            liveInPersonData: [],
            liveCardData: '',
            typeText: '入住'
        };
    },
    mounted() {
        this.handleOperCheckinType()
        this.hotel_rule_hour_list()
        this.$F.commons.fetchSalesList({salesFlag: 1}, (data)=> {
            this.salesList = data.hotelUserList;
        });
        this.getDataList();
        this.initForm();
    },
    watch: {
        operCheckinType() {
            this.initForm();
            // this.handleOperCheckinType()
            console.log(this.checkInForm)
        },
        checkInForm: {
            handler(n, o) {
                console.log(n)
                let arr = [];
                if (this.operCheckinType == 'a1') {
                    arr = [
                        'name', 'sex', 'idcardType', 'idcard', 'checkinTime', 'checkoutTime', 'guestType', 'orderSource', 'checkinType','mobile'
                    ]
                }
                if (this.operCheckinType == 'a2') {
                    arr = [
                        'name', 'sex', 'idcardType', 'idcard', 'ruleHourId', 'guestType', 'orderSource', 'checkinType','mobile'
                    ]
                }
                if (this.operCheckinType == 'b1') {
                    arr = [
                        'name', 'guestType', 'orderSource', 'checkinType', 'checkinTime', 'checkoutTime', 'keepTime', 'checkinDays','mobile'
                    ]
                }
                if (this.operCheckinType == 'b2') {
                    arr = [
                        'name', 'guestType', 'orderSource', 'checkinTime', 'checkoutTime', 'keepTime', 'ruleHourId','mobile'
                    ]
                }
                if (this.operCheckinType == 'b3') {
                    arr = [
                        'name', 'checkinTime', 'checkoutTime', 'keepTime', 'guestType', 'orderSource','mobile'
                    ]
                }
                console.log(this.operCheckinType)
                console.log(arr)
                if (!this.checkInForm.checkInId && arr.length) {
                    let len = 0;
                    for (let k in arr) {
                        if (this.checkInForm[arr[k]] != '' && this.checkInForm[arr[k]] != 'undefined' && this.checkInForm[arr[k]] != undefined) {
                            console.log(this.checkInForm[arr[k]])
                            len++
                        }
                    }
                }

            },
            //   immediate: true,
            deep: true
        }
    },
    methods: {
        initForm() {
            this.getRoomsForm = {
                changeType: 1,
                bedCount: '',
                roomType: this.operCheckinType == 'b3' ? 2 : 1
            };
            //预定和入住人信息
            let operTypeEM = {
                b1: '1',
                b2: '2',
                b3: '3'
            }
            this.checkInForm = {
                operCheckinType: operTypeEM[this.operCheckinType] || '',  //预定办理类型  1普通预定 2时租房预定 3会场预定 Integer必填
                name: '',    //入住人姓名  String必填
                mobile: '',   //电话  String选填
                orderSource: '1',   //订单来源  1前台 2销售推荐 3渠道订单 10其他  Integer必填
                sex: '1',     //    入住人性别 1男 2女 3保密  Integer必填
                idcardType: '1',    // 证件类型  1身份证 2护照  Integer必填
                idcard: '',    //证件号码  String必填
                memberCard: '',    // 会员卡号  String选填
                checkinTime: '',    // 预抵时间/到店时间 yyyy-MM-dd hh:mm:ss格式  String必填
                checkoutTime: '',   //预离时间 yyyy-MM-dd hh:mm:ss格式  String必填
                keepTime: '',       //保留时间 yyyy-MM-dd hh:mm:ss格式  String必填
                checkinDays: 1,   //入住天数  int必填
                salesId: '',      //销售员id  String选填
                thirdOrdernum: '',    //外部订单号  String选填
                ruleHourId: '',    //时租房规则id  operCheckinType=2必填  String选填
                guestType: '1',    //客户类型  1散客 2会员 3单位  Integer必填
                recommendInfo: '',   //推荐人信息（姓名或销售用户id）  String选填
                channel: '',      //渠道类型  2飞猪  3去哪儿 4携程 5艺龙 6美团  Integer选填
                checkinType: '1',    // 入住类型  1正常 2免费  Integer必填
                remark: '',       //订单信息备注  String选填
                // checkInId: '2c9f404b73939b040173947c555b000c',
                // checkInReserveId: '2c9f404b738f2f5d017393748ad60009',
                checkInId: '',    // 传入改值，将会进行编辑客人信息  String选填
                checkInReserveId: '',   //传入改值，将会进行编辑预定客人信息  String选填
                meetingName: '',    //会议名称  String选填
                enterName: '',      //单位名称 String选填
                checkInRoomJson: [],   //排房信息json集合字符串
            }
            this.handleOperCheckinType();
            this.getDataList();
        },
        /**获取房间信息数据 */
        getDataList() {
            let that = this;
            this.$F.doRequest(this, '/pms/checkin/hotel_checkin_roominfo', this.getRoomsForm, (res) => {
                let list = res.roomTypeList;
                list.forEach(element => {
                    let coverData = check(element.roomTypeId)
                    if (coverData) {
                        element.price = coverData.todayPrice
                        element.num = coverData.num
                    } else {
                        element.price = element.todayPrice
                        element.num = 0
                    }
                });

                function check(id) {
                    for (let k in that.waitingRoom) {
                        if (that.waitingRoom[k].roomTypeId == id) {
                            return that.waitingRoom[k];
                        }
                    }
                    return false
                }
                this.roomList = list;
                this.$forceUpdate();
            })
        },

        //页面上点击事件都在这里
        popup(type, row) {
            //客源类型选择
            if(type == 'guestTypeShow') {
                // this.guestTypeShow = true;
                this.checkInForm.guestType = this.checkInForm.guestType ? this.checkInForm.guestType.toString() : '1';
                this.$refs.guestChoose.dialogOpen(this.checkInForm);
            } else if (type == 'bin') {
                this.$F.doRequest(this, '/pms/hotelgoods/up_status', {
                    id: row.id,
                    state: row.state == 1 ? 2 : 1
                }, (res) => {
                    this.$message.success('success');
                    this.initData()
                })
            } else if (type == 'change') {
                this.edit = true;
                this.tab_show = false;
                this.rowData = row;
            }
        },

        hotel_check_in(type) {
            this.isSubmitErr = false;
            let url = ''
            let operCheckinType = this.operCheckinType
            if (operCheckinType == 'a1' || operCheckinType == 'a2') {
                url = '/pms/checkin/hotel_check_in'
            } else {
                url = '/pms/reserve/reserve_check_in'
            }
            let ajax = () => {
                let params = this.$F.deepClone(this.checkInForm);
                params.checkInRoomJson = JSON.stringify(params.checkInRoomJson);
                this.$F.doRequest(this, url, params, (data) => {
                    if (type == 2) {
                        this.$message({
                            message: 'Success',
                            type: 'success'
                        });
                        window.setTimeout(() => {
                            if ((operCheckinType == 'a1' || operCheckinType == 'a2')) {
                                this.$router.push('/orderdetail?id=' + (data.checkInReserveId || data.checkinId));
                            } else {
                                this.$router.push('/bookingDetail?id=' + (data.checkInReserveId || data.checkinId));
                            }
                        }, 500)
                    } else if (type == 3) {
                        this.$message({
                            message: this.$t('commons.request_success'),
                            type: 'success'
                        });
                        this.initForm();
                        this.waitingRoom = [];
                        this.liveInPersonData = [];
                    }
                })
            }
            this.$refs.checkInForm.validate((valid) => {
                console.log(this.waitingRoom);

                if (valid) {
                    if ((operCheckinType == 'a1' || operCheckinType == 'a2')) {
                        if (!this.waitingRoom.length) {
                            this.$message.error('请选择房型')
                            return false
                        }
                        for (let k= 0;k < this.waitingRoom.length;k++) {
                            if (!this.waitingRoom[k].roomsArr) {
                                this.$message.error('请选择房间')
                                return false
                            }
                            if (this.waitingRoom[k].roomsArr.length < this.waitingRoom[k].num) {
                                this.$message.error('请选择房间')
                                return false
                            }
                        }
                        // if (this.liveCardData == '') {
                        //     this.isSubmitErr = true
                        //     this.$message.error('请制卡')
                        //     // this.liveCard_in_person_list()
                        //     return false
                        // }
                        // if (this.liveCardData.unfinished > 0) {
                        //     this.isSubmitErr = true
                        //     this.$message.error('请制卡')
                        //     // this.liveCard_in_person_list()
                        //     return false
                        // }
                    } else {
                        this.waitingRoom.forEach((item) => {
                            let temp = {
                                roomTypeId: item.roomTypeId,
                                reservePrice: item.price,
                                realPrice: item.todayPrice,
                            }
                            if (item.roomsArr && item.roomsArr.length > 0) {
                                let array = [];
                                item.roomsArr.forEach((room) => {
                                    array.push(room.roomId);
                                })
                                temp.roomId = array.join(",");
                            }
                            this.checkInForm.checkInRoomJson.push(temp);
                        })
                    }
                    ajax();
                } else {
                    console.log('error submit!!');
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
            let exist = false
            for (let k in this.waitingRoom) {
                if (this.waitingRoom[k].roomTypeId == item.roomTypeId) {
                    if (item.num > 0) {
                        this.waitingRoom[k].price = item.price
                        this.waitingRoom[k].todayPrice = item.todayPrice;
                        this.waitingRoom[k].num = item.num
                    } else {
                        this.waitingRoom.splice(k, 1)
                    }
                    exist = true;
                    break
                }
            }
            if (!exist) {
                this.waitingRoom.push(item)
            }
            console.log(this.waitingRoom)
        },
        activeRoomCheck(id) {
            for (let k in this.waitingRoom) {
                if (this.waitingRoom[k].roomTypeId == id) {
                    return true
                }
            }
            return false
        },

        rowRoomByItem(item, index) {
            this.rowRoomCurrentItem = JSON.parse(JSON.stringify(item))
            this.rowRoomCurrentIndex = index
            this.hotelRoomListParams.roomTypeId = item.roomTypeId
            this.rowRoomShow = true
            this.hotel_room_list()
        },

        //计费规则时租房计费列表
        hotel_rule_hour_list() {
            let params = {
                ruleName: '',
                priceModel: '', //收费模式 1固定时间退房模式  2 24小时退房模式
                state: '',
                status: 2,
                pageIndex: 1,
                pageSize: 999,
                totalSize: 0
            }
            this.$F.doRequest(this, '/pms/hotel/hotel_rule_hour_list', params, (res) => {
                if (res.list.length != 0) {
                    res.list.forEach(item =>{
                        if (item.status != 2) {
                            this.ruleHourList.push(item)
                        }
                    })
                    // this.tableData = res.list
                    // this.ruleForm.totalSize = res.totalSize
                }
            })
        },
        //获取可排房的房间
        hotel_room_list() {
            let params = Object.assign({}, this.hotelRoomListParams);
            params.roadFlag !== '' && (params.roadFlag = params.roadFlag ? 1 : '')
            params.windowFlag !== '' && (params.windowFlag = params.windowFlag ? 1 : '')
            params.smokeFlag !== '' && (params.smokeFlag = params.smokeFlag ? 1 : '')
            params.noiseFlag !== '' && (params.noiseFlag = params.noiseFlag ? 1 : '')
            params.temperatureFlag !== '' && (params.temperatureFlag = params.temperatureFlag ? 1 : '')
            this.$F.doRequest(this, '/pms/hotel/hotel_room_list', params, (res) => {
                this.rowRoomCurrentList = res.list
            })
        },
        //手动排房确定
        db_row_houses() {
            if (this.rowRoomCurrentItem.roomsArr.length > this.rowRoomCurrentItem.num) {
                this.$message.error('排房数量超过订房数量');
                return
            }
            this.rowRoomCurrentItem.roomsArr.forEach( item => {
                let ids = [];
                this.rowRoomCurrentItem.roomsArr.map((item) => {
                    ids.push(item.id);
                })
                this.checkInForm.checkInRoomJson.push({
                    roomTypeId: this.rowRoomCurrentItem.roomTypeId,
                    roomId: ids.join(','),
                    reservePrice: this.rowRoomCurrentItem.todayPrice,
                    realPrice: this.rowRoomCurrentItem.price
                })
            })
            this.$message({
                message: 'Success',
                type: 'success'
            });
            this.waitingRoom[this.rowRoomCurrentIndex] = this.rowRoomCurrentItem;
            this.rowRoomShow = false;
        },

        //自动排房
        empty_row_houses() {
            let roomTypeId = [],
                numbers = [];
            this.waitingRoom.forEach(element => {
                let thisNum = element.num - (element.roomsArr?element.roomsArr.length:0)
                // number += thisNum
                numbers.push(thisNum);
                if(thisNum>0){
                    for(let i = 0;i < thisNum;i++){
                        if (roomTypeId.indexOf(element.roomTypeId) == -1) {
                            roomTypeId.push(element.roomTypeId);
                        }
                    }
                }
            });
            if (numbers.length < 1)
                return
            let params = {
                checkinRoomType: 1,
                roomTypeId: roomTypeId.join(','),
                rowHousesTotal : numbers.join(',')
            }
            // if (this.operCheckinType == 'a1' || this.operCheckinType == 'a2') {
            //     params.checkinId = this.checkInForm.checkInId
            // }
            // if (this.operCheckinType == 'b1' || this.operCheckinType == 'b2' || this.operCheckinType == 'b3') {
            //     params.checkinReserveId = this.checkInForm.checkInId
            // }
            let setRooms = (key, item) => {
                this.waitingRoom[this.rowRoomCurrentIndex] = this.rowRoomCurrentItem;
                this.rowRoomShow = false;
                console.log(this.waitingRoom)
                for (let k in this.waitingRoom) {
                    if (this.waitingRoom[k].roomTypeId == key) {
                        if (!this.waitingRoom[k].roomsArr) {
                            this.waitingRoom[k].roomsArr = []
                        }
                        let object = this.waitingRoom.filter((temp) => {
                            return temp.roomTypeId == item.roomTypeId
                        })[0];
                        this.waitingRoom[k].roomsArr.push({
                            roomTypeId: item.roomTypeId,
                            roomId: item.id,
                            houseNum: item.houseNum,
                            reservePrice: object.price,
                            realPrice: object.todayPrice
                        })
                    }
                }
            }
            this.$F.doRequest(this, '/pms/checkin/empty_row_houses', params, (res) => {
                let data = res;
                for (let k in data) {
                    let ids = [];
                    data[k].forEach((item) => {
                        ids.push(item.id);
                    })
                    data[k].forEach(element => {
                        setRooms(k, element)
                    });
                }
                console.log(this.waitingRoom);
                this.$forceUpdate()
            })
        },
        //移除排房
        delete_db_row_houses(item, id, i) {
            item.roomsArr.splice(i, 1);
            this.$forceUpdate()
        },
        rowRoomCurrentListItemAdd(item) {
            this.rowRoomCurrentItem.roomsArr = this.rowRoomCurrentItem.roomsArr || [];
            let exist = false;
            for (let k in this.rowRoomCurrentItem.roomsArr) {
                if (item.id == this.rowRoomCurrentItem.roomsArr[k].id) {
                    this.rowRoomCurrentItem.roomsArr.splice(k, 1)
                    exist = true
                    break
                }
            }
            if (!exist) {
                // this.rowRoomCurrentItem.roomsArr.push({
                //     houseNum: item.houseNum,
                //     id: item.id,
                //     checkinNum: item.hotelRoomType.checkinNum
                // })
                this.rowRoomCurrentItem.roomsArr.push(item);
            }
            this.$forceUpdate()
            console.log(this.rowRoomCurrentItem)
        },
        checkIsSelect(item) {
            if (this.rowRoomCurrentItem.roomsArr && this.rowRoomCurrentItem.roomsArr.length) {
                for (let k in this.rowRoomCurrentItem.roomsArr) {
                    if (item.id == this.rowRoomCurrentItem.roomsArr[k].id) {
                        return true
                    }
                }
                return false
            }
            return false
        },
        //入住人回调
        personCallback(data) {

            this.checkInForm.checkInRoomJson = data;
            this.addLivePersonShow = false;
        },
        live_in_person_list() {
            let waitingRoom2 =  this.$F.deepClone(this.waitingRoom);
            this.liveData = [];
            if (this.checkInForm.checkInRoomJson.length > 0 && this.checkInForm.checkInRoomJson[0].personList.length > 0) {
                this.checkInForm.checkInRoomJson.forEach((room, index) => {
                    this.$F.merge(room, room.personList[0])
                    room.personList.splice(0, 1);
                });
                this.liveData =  this.checkInForm.checkInRoomJson;
            } else {
                waitingRoom2.forEach(roomTypeObject => {
                    roomTypeObject.roomsArr.forEach((room, index) => {
                        room.roomTypeName = roomTypeObject.roomTypeName;
                        room.houseNum = room.houseNum;
                        if (room.personList && room.personList.length > 1) {
                            room.personList.forEach((element, index) => {
                                if (index > 0) {
                                    element.isChild = true;
                                }
                            });
                        } else {
                            this.$F.merge(room, {
                                checkinRoomId: '',
                                name: this.checkInForm.name,
                                idcardType: this.checkInForm.idcardType,
                                idcard: this.checkInForm.idcard,
                                sex: this.checkInForm.sex,
                                mobile: this.checkInForm.mobile,
                                checkinId: '',
                                checkInPersonId: '',
                            })
                        }
                        this.liveData.push(room);
                    })
                })
            }

            console.log(this.liveData);
            this.addLivePersonShow = true;
        },

        make_card_status() {
            let arr = []
            if (!this.multipleSelection.length) {
                this.$message.error('至少选择一间房间')
                return
            }
            this.multipleSelection.forEach(element => {
                arr.push(element.id)
            });
            let params = {
                checkInRoomIds: arr,
            };
            this.$F.doRequest(this, '/pms/checkin/make_card_status', params, (res) => {
                this.$message({
                    message: this.$t('commons.request_success'),
                    type: 'success'
                });
                this.$forceUpdate()
            })
        },
        F_markCard(value) {
            let enums = this.$t('commons.markCard')
            return value && enums[value] ? enums[value] : ''
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val)
        },
        remoteMethod(query, cb) {
            let params = {
                name: query,
                searchType: 1,
                pageIndex: 1,
                pageSize: 999,
                paging: false
            }
            this.nameLoading = true;
            this.$F.doRequest(this, '/pms/checkin/checkin_order_list', params, (res) => {
                this.nameLoading = false
                this.options = res.roomPersonList || [];
                this.options.forEach(element => {
                    element.value = element.name + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + (element.mobile || '') + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + (element.idcard ? element.idcard.slice(-4) : '');
                });

                cb(this.options);
                this.$forceUpdate()
            })
        },
        changeName(e) {
            console.log(e)
            if (e.name) {
                this.baseInfo = e;
                this.checkInForm.name = e.name
                this.checkInForm.guestType = e.guestType
                this.checkInForm.idcard = e.idcard
                this.checkInForm.idcardType = e.idcardType.toString()
                this.checkInForm.mobile = e.mobile
                this.checkInForm.orderSource = e.orderSource.toString()
                this.checkInForm.orderType = e.orderType.toString()
                this.checkInForm.sex = e.sex.toString()
                this.checkInForm.ruleHourId = e.ruleHourId ? e.ruleHourId : ''
                this.checkInForm.checkinType = e.checkinType ? e.checkinType.toString() : ''
            } else {
                this.checkInForm.name = e
            }

        },

        //选择客源类型组件的确认回调
        guestChooseCallback(data) {
            ;
            this.checkInForm = data;
        },
        handleOperCheckinType() {
            let menu = {
                a1: 1,
                a2: 2,
                b1: 1,
                b2: 2,
                b3: 3
            }
            this.checkInForm.operCheckinType = menu[this.operCheckinType];
            let nowDate = new Date();
            if (this.operCheckinType && this.operCheckinType.startsWith('b')) {
                this.checkInForm.checkinTime = nowDate.Format('yyyy-MM-dd HH:mm:ss')
                if (this.operCheckinType == 'b1') {
                    this.checkInForm.checkinDays = 1;
                    nowDate.setDate(nowDate.getDate() + this.checkInForm.checkinDays);
                    this.checkInForm.checkoutTime = nowDate.Format('yyyy-MM-dd HH:mm:ss');
                } else if (this.operCheckinType == 'b2' || this.operCheckinType == 'b3') {
                    this.checkInForm.checkinDays = '';
                    nowDate.setDate(nowDate.getDate() + 1);
                    nowDate.setHours(12);
                    nowDate.setMinutes(0);
                    nowDate.setSeconds(0);
                    this.checkInForm.checkoutTime = nowDate.Format('yyyy-MM-dd HH:mm:ss');
                    // for (let k in this.checkInForm) {
                    //     if (k !== 'operCheckinType') {
                    //         this.checkInForm[k] = ''
                    //     }
                    // }
                }
                this.checkInForm.keepTime = new Date().Format("yyyy-MM-dd") + ' 23:59:00';
            }
            if (this.operCheckinType == 'a1' || this.operCheckinType == 'a2') {
                this.checkInForm.checkinTime = new Date().Format("yyyy-MM-dd HH:mm:ss")
            } else {
                this.typeText = '预订'
            }

        },
        selectBlur(e) {
            console.log(e)
            this.checkInForm.name = e.target.value
        },
        liveInPersonCancel() {
            if (this.isSubmitErr) {
                this.isSubmitErr = false
                this.$router.replace('/orderdetail?id=' + this.checkInForm.checkInId)
            } else {
                this.liveInPersonShow = false
            }
        },
        mackcadeCancel() {
            if (this.isSubmitErr) {
                this.isSubmitErr = false
                this.$router.replace('/orderdetail?id=' + this.checkInForm.checkInId)
            } else {
                this.mackcade = false
            }
        },
        startTimeChange(e) {
            let day = 0
            if (this.checkInForm.checkoutTime != '') {
                day = getDaysBetween(new Date(this.checkInForm.checkinTime).Format("yyyy-MM-dd"),
                    new Date(this.checkInForm.checkoutTime).Format("yyyy-MM-dd"))
                this.checkInForm.checkinDays = day
            }
        },
        endTimeChange(e) {
            let day = 0
            if (this.checkInForm.checkinTime != '') {
                day = getDaysBetween(new Date(this.checkInForm.checkinTime).Format("yyyy-MM-dd"), new Date(this.checkInForm.checkoutTime).Format("yyyy-MM-dd"))
                this.checkInForm.checkinDays = day
            }
        },
        checkinDaysChange(e) {
            console.log(e)
            if (this.checkInForm.checkinTime == '') {
                this.$message.error('请选择到店时间')
                this.checkInForm.checkinDays = 0
                return
            } else {
                var date = new Date(this.checkInForm.checkinTime);
                date.setDate(date.getDate() + e);
                this.checkInForm.checkoutTime = date.Format("yyyy-MM-dd HH:mm:ss");
            }
        },

        //添加同来宾客
        addGuest(row, index) {
            let newRow = this.$F.deepClone(row);
            row.children.push({
                checkinId: newRow.checkinId,
                checkinRoomId: newRow.roomId,
                id: '3213213',
                name: '',
                isChild: true,
                idcardType: '',
                idcard: '',
                edit: true,
                sex: '',
                mobile: '',
                checkInPersonId: '',
                // hasChildren: false
            });
        },

    }
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

                    .el-autocomplete, .el-input, .el-select, .el-input-number {
                        width: 100%;
                    }
                }
            }
        }

        .roomMsg {
            display: flex;

            .left, .right {
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
                background: #F6F7F7;
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
                            background: #E3EEFF;
                            border-color: #126EFF;
                        }
                        .row {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 12px;

                            &:last-child {
                                margin-bottom: 0;
                            }
                            .allow {
                                color: #126EFF;
                                font-size: 13px;
                            }
                            .num {
                                width: 70px;

                                .el-input__inner {
                                    background: #D6D6D6;
                                }
                            }
                            del {
                                margin-left: 10px;
                                color: #999;
                                font-size: 13px;
                            }
                        }
                    }
                }
                .checkRoom {
                    padding: 15px 10px;
                    border-bottom: 1px solid #D7D7D7;

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
    background: #F6F7F7;
    min-height: 500px;
}

.roomSelect ul li .rooms {
    margin: 0
}

.roomSelect ul li .rooms .grid-cell {
    border: 0
}

.roomSelect ul {
    padding: 0 20px
}

.roomSelect ul li {
    border-bottom: 1px solid #D7D7D7;
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
    padding: .1px;
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
    color: #fff
}

.el-select {
    display: inline-block;
}
</style>
