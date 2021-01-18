<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-07 10:27:28
 * @FilePath: \jiudian\src\views\market\home\rowRoomHandle.vue
 -->
<template>
<div>
    <el-dialog top="0" :visible.sync="rowRoomHandleShow" class="rowRoomHandle" :title="title ? title : $t('desk.home_modityReserved')" width="80%">

        <el-row style="margin-bottom:60px" v-loading="loading">
            <!--这里暂时不要做的那么细  接口暂时不支持修改单个房间预抵预离-->
            <el-form ref="checkInForm" inline size="small" :model="checkInForm" :rules="rules" label-width="100px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item :label="$t('desk.arrivalTime')" prop="checkinTime">
                            <el-date-picker v-model="checkInForm.checkinTime" type="datetime" style="width:200px" :placeholder="$t('desk.serve_chooseDate')"
                                            :picker-options="startTime" format="yyyy-MM-dd HH:mm:ss"
                                            value-format="yyyy-MM-dd HH:mm:ss" @change="startTimeChange"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="$t('desk.checkInDays')" prop="checkinDays">
                            <el-input-number class="width200" v-model="checkInForm.checkinDays" :step="1" :min="0" @change="checkinDaysChange"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="$t('desk.order_departureTime')" prop="checkoutTime">
                            <el-date-picker v-model="checkInForm.checkoutTime" type="datetime" style="width:200px" :placeholder="$t('desk.serve_chooseDate')" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="leaveTime" @change="endTimeChange"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-form inline size="mini">
                <el-row>
                    <el-col :span="17">
                        <div class="grid-content">
                            <el-row>
                                <el-select v-model="getRoomsForm.bedCount" size="small" style="margin-left:40px; width:200px" @change="getDataList">
                                    <el-option :value="key" v-for="(item,key,index) of $t('commons.bedCount')" :label="item" :key="index"></el-option>
                                </el-select>
                            </el-row>
                            <br />
                            <el-row>
                                <el-col :span="8" v-for="v in roomList" :key="v.roomTypeId">
                                    <div class="grid-content rooms">
                                        <div class="grid-cell" :class="activeRoomCheck(v.roomTypeId)?'active':''">
                                            <div class="wrap">
                                                <el-row class="row">
                                                    <el-col :span="14">
                                                        <span>{{v.roomTypeName}}</span>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <div style="text-align: right">
                                                            <el-input-number @change="handleNumChange($event,v)" :min="0"
                                                                             :max="v.reserveTotal" :label="$t('desk.home_describeText')"
                                                                             size="mini" style="width:100px" v-model.number="v.num"></el-input-number>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                                <el-row class="row">
                                                    <el-col :span="8">
                                                        <el-button type="text" size="mini">{{$t('desk.home_canOrderText')}}{{v.reserveTotal}}</el-button>
                                                    </el-col>
                                                    <el-col :span="15">
                                                        <span>{{$t('desk.home_onePeopleLive')}}: {{ v.onePersonPrice }}</span>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="grid-content">
<!--                            <el-row>-->
<!--                                <el-button @click="page_row_houses">{{ $t('desk.autoRowHouse') }}</el-button>&nbsp;&nbsp;-->
<!--                            </el-row>-->
                            <br />
                            <el-row class="roomSelect">
                                <ul>
                                    <li v-for="(v,index) in waitingRoom" :key="index">
                                        <div class="grid-content">
                                            <div class="grid-cell">
                                                <div class="wrap">
                                                    <el-row class="row">
                                                        <el-col :span="14">
                                                            <span>{{v.roomTypeName}}</span>
                                                            <span class="text-red" style="margin-left: 10px">{{v.num}}{{$t('manager.hk_space')}}</span>
                                                        </el-col>

                                                        <el-col :span="10">
                                                            <div style="text-align: right">
                                                                <el-button type="primary" size="mini" @click="rowRoomByItem(v,index)">{{ $t('desk.rowHouse') }}</el-button>
                                                            </div>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row class="row" v-if="v.roomsArr&&v.roomsArr.length">
                                                        <el-button class="roomNumTag" size="mini" v-for="(item,i) of v.roomsArr" :key="i">{{item.houseNum}}
                                                            <span class="del" @click="delete_db_row_houses(v,item.id,i)">✕ {{$t('desk.customer_remove')}}</span></el-button>
                                                    </el-row>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                            </el-row>

                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="rowRoomHandleShow = false">{{ $t('commons.cancel') }}</el-button>
            <el-button size="small" type="primary" @click="hotel_check_inChange">{{ $t('commons.confirm') }}</el-button>
        </span>
    </el-dialog>

    <el-dialog top="0" :visible.sync="rowRoomShow" class="rowRoomDia" :title="$t('desk.rowHouse')" width="800px">
        <el-form :model="hotelRoomListParams" style="margin-top:-20px" v-loading="loading">
            <el-form-item :label="$t('manager.hk_toward') + ':'" class="" style="margin-bottom:0">
                <el-checkbox-group v-model="hotelRoomListParams.toward" @change="hotel_room_list">
                    <el-checkbox v-for="(item,key,index) of $t('commons.toward')" :label="key" :value="key" :key="index">{{item}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item :label="$t('desk.home_attribute') + ':'" class="" style="margin-bottom:0">
                <el-checkbox v-model="hotelRoomListParams.windowFlag" @change="hotel_room_list">{{$t('desk.home_haveWindow')}}</el-checkbox>
                <el-checkbox v-model="hotelRoomListParams.roadFlag" @change="hotel_room_list">{{$t('desk.home_onRoad')}}</el-checkbox>
                <el-checkbox v-model="hotelRoomListParams.smokeFlag" @change="hotel_room_list">{{$t('desk.home_noSmoke')}}</el-checkbox>
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

</div>
</template>

<script>

function getDaysBetween(dateString1, dateString2) {
    var startDate = Date.parse(dateString1);
    var endDate = Date.parse(dateString2);
    var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
    // alert(days);
    return days;
}
import myMixin from './rowRoomMixin';

export default {
    mixins: [myMixin],
    props: ['title'],
    data() {
        return {
            reservedRoom: [],
            afterToday: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天
                }
            },
            leaveTime: {
                disabledDate: time => {
                    if (this.checkInForm.checkinTime) {
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
                    // if (this.checkInForm.checkoutTime) {
                    //     let timeStr = new Date(new Date(this.checkInForm.checkoutTime).Format("yyyy-MM-dd").replace(/-/g, "/"));
                    //     return new Date(time.Format("yyyy-MM-dd")).getTime() + 0 > timeStr;
                    // } else if (this.checkInForm.checkoutTime == "") {
                    //
                    // } else {
                    //     return "";
                    // }
                    return new Date(time.Format("yyyy-MM-dd")).getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天
                }
            },
            rowRoomHandleShow: false,
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
                roomType: 1,
                changeType: 2,
                bedCount: '',
            },
            salesList: '',
            ruleHourList: '',

            listTotal: 0, //总条数
            multipleSelection: [], //多选
            roomList: [], //表格数据
            waitingRoom: [],
            rowRoomCurrentItem: '',
            rowRoomCurrentList: '',
            checkInForm: {
                operCheckinType: 1,
                name: '',
                sex: '',
                idcardType: '',
                idcard: '',
                memberCard: '',
                checkinTime: '',
                checkoutTime: '',
                keepTime: '',
                checkinDays: 0,
                salesId: '',
                thirdOrdernum: '',
                mobile: '',
                ruleHourId: '',
                guestType: '',
                orderSource: '',
                recommendInfo: '',
                channel: '',
                checkinType: '',
                remark: '',
                // checkInId: '2c9f404b73939b040173947c555b000c',
                // checkInReserveId: '2c9f404b738f2f5d017393748ad60009',
                checkInId: '',
                checkInReserveId: ''
            },
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
            typeText: '入住',
            handleType: '',
            orderType: '',
        };
    },
    computed: {
        rules(){
            return{
                name: [{
                    required: true,
                    // message: '请输入姓名',
                    message: this.$t('commons.mustInput'),
                    trigger: 'blur'
                }, ],
                sex: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    trigger: 'blur'
                }, ],
                mobile: [{
                    required: true,
                    // message: '请输入手机号',
                    message: this.$t('commons.mustInput'),
                    trigger: 'blur'
                }, ],
                idcardType: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    trigger: 'blur'
                }, ],
                idcard: [{
                    required: true,
                    // message: '请输入证件号',
                    message: this.$t('commons.mustInput'),
                    trigger: 'blur'
                }, ],
                checkinTime: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    trigger: 'change'
                }, ],
                checkoutTime: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择预离时间',
                    trigger: 'change'
                }, ],
                keepTime: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    trigger: 'change'
                }, ],
                checkinDays: [{
                    required: true,
                    // message: '请输入入住天数',
                    message: this.$t('commons.mustInput'),
                    trigger: 'change'
                }, ],
                guestType: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择客源类型',
                    trigger: 'blur'
                }, ],
                checkinType: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择入住类型',
                    trigger: 'change'
                }, ],
                ruleHourId: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择计费规则',
                    trigger: 'change'
                }, ],
            }
        }
    },
    methods: {
        // handleType： 操作类型  默认为空 修改预留   1： 添加房间
         // orderType ： 订单类型 1： 预订单  2：订单
        initForm(checkInId, checkinInfo, reservedRoom, handleType, orderType = 2) {
            this.reservedRoom = reservedRoom;
            this.handleType = handleType;
            this.orderType = orderType;
            let that = this
            that.waitingRoom = [];
            //初始化已排房
            for (let item of reservedRoom) {
                let exist = false
                for (let i = 0; i < that.waitingRoom.length; i++) {
                    if (that.waitingRoom[i].roomTypeId == item.roomTypeId) {
                        that.waitingRoom[i].num++
                        that.waitingRoom[i]['roomsArr'].push({
                            houseNum: item.houseNum,
                            id: item.roomId
                        })
                        exist = true
                    }
                }
                if (!exist) {
                    item.num = 1
                    item.roomsArr = []
                    item.roomsArr.push({
                        houseNum: item.houseNum,
                        id: item.roomId
                    })
                    that.waitingRoom.push(item)
                }
            }
            this.rowRoomHandleShow = true
            this.checkInForm = checkinInfo
            this.checkInForm.checkInId = checkInId
            this.checkInForm.checkInReserveId = checkInId
            this.getRoomsForm = {
                changeType: 2,
                bedCount: '',
                roomType: this.operCheckinType == 'b3' ? 2 : 1,
                checkinTime: this.checkInForm.checkinTime,
                checkoutTime: this.checkInForm.checkoutTime,
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            let that = this
            this.$F.doRequest(this, '/pms/checkin/hotel_checkin_roominfo', this.getRoomsForm, (res) => {
                this.loading = false
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
                            return that.waitingRoom[k]
                        }
                    }
                    return false
                }
                this.roomList = list
                console.log(this.roomList)
            })
        },
        handleNumChange(e, item) {
            let exist = false
            for (let k in this.waitingRoom) {
                if (this.waitingRoom[k].roomTypeId == item.roomTypeId) {
                    if (item.num > 0) {
                        this.waitingRoom[k].price = item.price
                        this.waitingRoom[k].todayPrice = item.todayPrice
                        this.waitingRoom[k].num = item.num
                    } else {
                        this.waitingRoom.splice(k, 1)
                    }
                    exist = true
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
            if (!this.checkInForm.checkInId) {
                this.$message.error(this.$t('desk.home_perfectLiveInfo'));
                return
            }
            this.rowRoomCurrentItem = JSON.parse(JSON.stringify(item))
            this.rowRoomCurrentIndex = index
            this.hotelRoomListParams.roomTypeId = item.roomTypeId
            this.rowRoomShow = true
            this.hotel_room_list()
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
                this.$message.error(this.$t('desk.home_morethenNum'));
                return
            }
            let ids = [];
            this.rowRoomCurrentItem.roomsArr.map((item) => {
                ids.push(item.id);
            })
            let params = {
                checkinRoomType: 1,
                roomTypeId: this.rowRoomCurrentItem.roomTypeId,
                checkinId: this.checkInForm.checkInId,
                checkinReserveId: this.checkInForm.checkInId,
                roomId: ids,
                reservePrice: this.rowRoomCurrentItem.todayPrice,
                realPrice: this.rowRoomCurrentItem.price
            }
            this.waitingRoom[this.rowRoomCurrentIndex] = this.rowRoomCurrentItem
            this.rowRoomShow = false
            this.$forceUpdate()
        },
        //自动排房确定
        page_row_houses() {
            if (!this.checkInForm.checkInId) {
                this.$message.error(this.$t('desk.home_inputLiveAfter'))
                return false
            }
            if (this.waitingRoom.length < 1) {
                this.$message.error(this.$t('desk.home_roomTypeOperate'));
                return
            }
            let roomTypeId = [],
                number = 0;
            this.waitingRoom.forEach(element => {
                let thisNum = element.num - (element.roomsArr ? element.roomsArr.length : 0)
                number += thisNum
                if (thisNum > 0) {
                    for (let i = 0; i < thisNum; i++) {
                        roomTypeId.push(element.roomTypeId);
                    }
                }
            });
            if (number < 1) {
                return
            }
            let params = {
                checkinRoomType: 1,
                roomTypeId: roomTypeId,
                rowHousesTotal: number
            }
            params.checkinId = this.checkInForm.checkInId
            params.checkinReserveId = this.checkInForm.checkInId
            let setRooms = (key, item) => {
                console.log(key)
                console.log(item)
                for (let k in this.waitingRoom) {
                    if (this.waitingRoom[k].roomTypeId == key) {
                        if (!this.waitingRoom[k].roomsArr) {
                            this.waitingRoom[k].roomsArr = []
                        }

                        this.waitingRoom[k].roomsArr.push({
                            houseNum: item.houseNum,
                            id: item.id,
                            reservePrice: 555,
                            realPrice: 555
                        })
                    }
                }
            }
            this.$F.doRequest(this, '/pms/checkin/empty_row_houses', params, (res) => {
                let data = res
                for (let k in data) {
                    data[k].forEach(element => {
                        setRooms(k, element)
                    });
                }
                this.$forceUpdate()
            })
        },
        //移除排房
        delete_db_row_houses(item, id, i) {
            item.roomsArr.splice(i, 1)
            this.$forceUpdate()
        },
        rowRoomCurrentListItemAdd(item) {
            if (!this.rowRoomCurrentItem.roomsArr) {
                this.rowRoomCurrentItem.roomsArr = [];
            }
            let exist = false
            for (let k in this.rowRoomCurrentItem.roomsArr) {
                if (item.id == this.rowRoomCurrentItem.roomsArr[k].id) {
                    this.rowRoomCurrentItem.roomsArr.splice(k, 1)
                    exist = true
                    break
                }
            }
            if (!exist) {
                this.rowRoomCurrentItem.roomsArr.push({
                    houseNum: item.houseNum,
                    id: item.id,
                    checkinNum: item.hotelRoomType.checkinNum
                })
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
        startTimeChange(e) {
            let date = new Date(e);
            if (e > this.checkInForm.checkoutTime || date.Format("yyyy-MM-dd") == new Date(this.checkInForm.checkoutTime).Format("yyyy-MM-dd")) {
                date.setDate(date.getDate() + 1);
                this.checkInForm.checkoutTime = date.Format("yyyy-MM-dd HH:mm:ss");
            }
            this.checkInForm.checkinDays = getDaysBetween(
                new Date(this.checkInForm.checkinTime).Format("yyyy-MM-dd"),
                new Date(this.checkInForm.checkoutTime).Format("yyyy-MM-dd")
            );
            console.log(this.checkInForm.checkinDays)
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
                this.$message.error(this.$t('desk.home_selectToTime'))
                this.checkInForm.checkinDays = 0
                return
            } else {
                var date = new Date(this.checkInForm.checkinTime);
                date.setDate(date.getDate() + e);
                this.checkInForm.checkoutTime = date
            }
        },
        hotel_check_inChange() {
            let checkInRoomJson = []

            if (this.waitingRoom.length == 0) {
                this.rowRoomHandleShow = false;
                return;
            }
            let roomIdArray = [];
            this.waitingRoom.forEach(item => {
                let array = [];
                if (item.roomsArr) {
                    item.roomsArr.forEach(room=> {
                        array.push(room.id);
                        roomIdArray.push(room.id);
                    })
                }
                checkInRoomJson.push({
                    roomTypeId: item.roomTypeId,
                    roomId: array.join(','),
                    reservePrice: item.reservePrice,
                    realPrice: item.realPrice
                })
            })
            // this.checkInForm.roomIds = roomIdArray.join(",");
            this.checkInForm.checkInRoomJson = JSON.stringify(checkInRoomJson);
            this.$refs.checkInForm.validate((valid) => {
                if (valid) {
                    if (this.handleType == 1) {
                        this.$F.doRequest(this, '/pms/checkin/checkin_add_room', {
                            checkinRoomType:  this.orderType,
                            checkinId:  this.checkInForm.checkInId,
                            checkinReserveId: this.checkInForm.checkInReserveId,
                            checkInRoomJson: this.checkInForm.checkInRoomJson
                    }, (data) => {
                            this.rowRoomHandleShow = false
                            this.$emit('baseInfoChange', '');
                        })
                    } else {

                        this.checkInForm.checkInRoomIds = this.reservedRoom[0].id;
                        console.log(JSON.parse(JSON.stringify(this.checkInForm)))
                        this.$F.doRequest(this, '/pms/reserve/reserve_check_in', this.checkInForm, (data) => {
                            this.rowRoomHandleShow = false
                            this.$emit('baseInfoChange', '');
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

    }
};
</script>

<style scoped>
.rooms {
    margin-right: 10px;
    margin-bottom: 10px;
}

.rooms .grid-cell {
    border: 1px solid #eee;
    border-radius: 5px;
}

.rooms .grid-cell.active {
    background: #E3EEFF;
    border-color: #126EFF;
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
    min-height: 100px;
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
