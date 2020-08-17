<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-17 15:33:02
 * @FilePath: /jiudian/src/views/market/home/rowRoomHandle.vue
 -->
<template>
<div>
    <el-dialog top="0" :visible.sync="rowRoomHandleShow" class="rowRoomHandle" title="排房" width="80%">

        <el-row style="margin-bottom:60px" v-loading="loading">
            <h3>房间信息</h3>
            <el-form inline size="mini">
                <el-row>
                    <el-col :span="17">
                        <div class="grid-content">
                            <el-row>
                                <el-radio-group v-model="getRoomsForm.changeType" size="small" @change="getDataList">
                                    <el-radio :label="1" border>可改房价</el-radio>
                                    <el-radio :label="2" border>不可改房价</el-radio>
                                </el-radio-group>
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
                                                            <el-input-number @change="handleNumChange($event,v)" :min="0" :max="v.reserveTotal" label="描述文字" size="mini" style="width:100px" v-model.number="v.num"></el-input-number>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                                <el-row class="row">
                                                    <el-col :span="14">
                                                        <el-button type="text" size="mini">可订{{v.reserveTotal}}</el-button>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <div style="text-align: right">

                                                            <el-input placeholder="" size="mini" style="width:60px" v-model="v.price" v-if="getRoomsForm.changeType==1"></el-input>
                                                            <em>{{v.todayPrice}}</em>
                                                        </div>
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
                            <el-row>
                                <el-button @click="page_row_houses">自动排房</el-button>&nbsp;&nbsp;
                            </el-row>
                            <br />
                            <el-row class="roomSelect">
                                <ul>
                                    <li v-for="(v,index) in waitingRoom" :key="index">
                                        <div class="grid-content">
                                            <div class="grid-cell">
                                                <div class="wrap">
                                                    <el-row class="row">
                                                        <el-col :span="14">
                                                            <span>{{v.roomTypeName}}</span><span class="text-red">{{v.num}}间</span>
                                                        </el-col>
                                                        <el-col :span="10">
                                                            <div style="text-align: right">
                                                                <el-button type="primary" size="mini" @click="rowRoomByItem(v,index)">排房</el-button>
                                                            </div>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row class="row" v-if="v.roomsArr&&v.roomsArr.length">
                                                        <el-button class="roomNumTag" size="mini" v-for="(item,i) of v.roomsArr" :key="i">{{item.houseNum}} <span class="del" @click="delete_db_row_houses(v,item.id,i)">✕ 移除</span></el-button>
                                                    </el-row>
                                                    <!-- <el-row class="row">
                                                        <el-button class="roomNumTag" size="mini" >A145<em class="del">✕ 移除</em></el-button>
                                                        <el-button class="roomNumTag" size="mini" >A145<em class="del">✕ 移除</em></el-button>
                                                    </el-row> -->
                                                    <!-- <el-row class="row">
                                                        <el-col :span="14">
                                                            <el-button type="text" size="mini">可订{{v.reserveTotal}}</el-button>
                                                        </el-col>
                                                        <el-col :span="10">
                                                            <div style="text-align: right">
                                                                <el-button type="text" style="color:#666">
                                                                    {{v.num}}间
                                                                </el-button>

                                                            </div>
                                                        </el-col>
                                                    </el-row> -->
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
    </el-dialog>

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
            <el-button size="small" @click="rowRoomShow = false">取消</el-button>
            <el-button size="small" type="primary" @click="db_row_houses">确定</el-button>
        </span>
    </el-dialog>

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
import myMixin from './rowRoomMixin';

export default {
    mixins: [myMixin],
    data() {
        return {
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
                changeType: 1,
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
            typeText: '入住'
        };
    },
    computed: {},
    methods: {
        initForm(checkInId) {
            this.rowRoomHandleShow = true
            this.getRoomsForm = {
                changeType: 1,
                bedCount: '',
                roomType: this.operCheckinType == 'b3' ? 2 : 1
            };
            this.checkInForm.checkInId = checkInId
            this.checkInForm.checkInReserveId = checkInId
            alert(checkInId)
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
                this.$message.error('请完善入住信息后操作');
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
                this.$message.error('排房数量超过订房数量');
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
            this.$F.doRequest(this, '/pms/checkin/db_row_houses', params, (res) => {
                this.$message({
                    message: '排房成功',
                    type: 'success'
                });
                this.waitingRoom[this.rowRoomCurrentIndex] = this.rowRoomCurrentItem
                this.rowRoomShow = false
                this.$forceUpdate()
            })
        },
        //自动排房确定
        page_row_houses() {
            if (!this.checkInForm.checkInId) {
                this.$message.error('请输入入住信息后操作')
                return false
            }
            if (this.waitingRoom.length < 1) {
                this.$message.error('请选择房型后操作');
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
                            id: item.id
                        })
                    }
                }
            }
            this.$F.doRequest(this, '/pms/checkin/page_row_houses', params, (res) => {
                let data = res
                this.$message({
                    message: '排房成功',
                    type: 'success'
                });
                for (let k in data) {
                    // for (let j in data[k]) {
                    //     setRooms(k, data[k][j])
                    // }
                    data[k].forEach(element => {
                        setRooms(k, element)
                    });
                }
                this.$forceUpdate()
            })
        },
        //移除排房
        delete_db_row_houses(item, id, i) {
            let params = {
                checkinRoomType: 1,
                roomTypeId: item.roomTypeId,
                checkinId: this.checkInForm.checkInId,
                checkinReserveId: this.checkInForm.checkInId,
                roomId: id
            };
            this.$F.doRequest(this, '/pms/checkin/delete_db_row_houses', params, (res) => {
                this.$message({
                    message: '移除成功',
                    type: 'success'
                });
                item.roomsArr.splice(i, 1)
                this.$forceUpdate()
            })
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
