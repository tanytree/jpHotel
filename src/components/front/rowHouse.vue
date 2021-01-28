<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-10 19:19:27
 * @FilePath: \jiudian\src\components\front\rowHouse.vue
 -->
<template>
    <div>
        <el-dialog top="0" :visible.sync="rowRoomShow" class="rowRoomDia" :title="$t('desk.rowHouse')" width="1400px">
            <!-- 房间选择块 -->
            <div class="topBigbox">
                <div class="eackBlock" v-for="(item, key) in floorList" :key="key">
                    <div class="eackTitle">{{item.building.name}}  {{item.name}}  {{item.roomList.length}} {{$t('manager.hk_space')}}</div>
                    <div style="margin-top: 10px">
                        <el-checkbox-group v-model="selectList" size="small" :max="maxSelect">
                            <el-checkbox-button style="margin-right: 15px" v-for="(room, index) in item.roomList" :label="room.houseNum" :key="index" :disabled="room.checkInRoomType == 2"
                                                @change="rowRoomCurrentListItemAdd(room)">
                                {{ room.houseNum }}</el-checkbox-button>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <!-- 时间选择块 -->
            <div class="timeBox">
                <el-link :disabled="startTime <= nowDateString" size="small" @click="dateBefore14"><i class="el-icon-d-arrow-left" style="margin-right: 5px"></i>{{$t('desk.add_go14')}}</el-link>
                <div class="middleTime">{{ startTime}} - {{endTime }}</div>
                <el-link type="primary" size="small" @click="dateLater14">{{$t('desk.add_back14')}}<i class="el-icon-d-arrow-right" style="margin-left: 5px"></i></el-link>
            </div>
            <!-- 日历表格块 -->
            <div class="riliBox" v-loading="loading">
                <div v-for="date in dates" :key="date.date" class="itemRi">
                    <div class="riTop riHeader">
                        <span>{{date.date}}</span>
                        <span>{{date.week}}</span>
                    </div>
                </div>
                <div v-for="(date, topIndex) in dates" :key="topIndex" class="itemRi border-body" :class="topIndex == (dates.length-1) ? 'last' : ''">
                    <div v-for="(item, index) in roomList" :key="index">
                        <div class="riTop" v-if="topIndex === 0">
                            <span>{{item.houseNum}}</span>
                        </div>
                        <div class="riTop" v-else>
                            <span v-if="date[item.houseNum]" style="background-color: #8EABDD;height: 100%; width: 100%;"></span>
                        </div>
                    </div>
                </div>

            </div>
            <div slot="footer" class="dialog-footer" style="text-align: right">
                <el-button size="small" @click="rowRoomShow = false">{{ $t("commons.cancel") }}</el-button>
                <el-button size="small" type="primary" @click="db_row_houses">{{ $t("commons.confirm") }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import myMixin from "@/utils/filterMixin";
export default {
    mixins: [myMixin],
    props: ["roomId"],
    data() {
        return {
            checkinTime: '',
            checkoutTime: '',
            roomList: [],   //该房型下有多少房间
            floorList: [],   //楼层
            selectList: [], //选中的房间list
            roomTypeId: '', //房型ID
            maxSelect: 0,   //最多能选择多少个房间
            rowRoomCurrentList: [],
            loading: false,
            rowRoomShow: false,
            startTime: '',
            endTime: '',
            nowDateString: '',
            dates: [],
            hadReadyCheckArray: [], //已经被选的房间集合
        };
    },

    methods: {
        init(roomTypeId, num, hadReadyCheckArray, checkinTime, checkoutTime) {
            this.roomList = [];
            this.selectList = hadReadyCheckArray;
            this.hadReadyCheckArray = hadReadyCheckArray;
            this.startTime = this.$F.formatDate('yyyy-MM-dd');
            this.endTime = this.$F.formatDate('yyyy-MM-dd', 14);
            this.checkinTime = checkinTime || this.startTime;
            this.checkoutTime = checkoutTime || this.endTime;
            let tempArray = this.getDateStr(this.startTime, this.endTime, 0);
            this.dates = [''];

            tempArray.forEach( (value, index) => {
                this.dates.push({
                    date: value,
                    week: this.$F.getWeekNumber(this, value, '/')
                });
            })
            console.log(this.dates);
            this.nowDateString= this.startTime;
            this.roomTypeId = roomTypeId;
            this.maxSelect = num;
            this.calendar();
        },

        calendar() {
            this.roomList = [];
            this.$F.doRequest(
                this,"/pms/reserve/reserve_room_list", {
                    startTime: this.startTime,
                    endTime: this.endTime,
                    searchType: 2,
                    roomTypeId: this.roomTypeId,
                    checkinTime: this.checkinTime,
                    checkoutTime: this.checkoutTime,
                }, (res) => {

                    this.floorList = res.floorList || [];
                    this.floorList.forEach( floor=> {
                        this.roomList = this.roomList.concat(floor.roomList)
                    })
                    console.log(this.roomList)
                    if (res && res.roomCheckInCalendarList.length > 0) {
                        res.roomCheckInCalendarList.forEach( (value, index) => {
                            if (value.reserveObj) {
                                let tempArray = this.getDateStr(value.reserveObj.checkinTime, value.reserveObj.checkoutTime, 0);
                                if (tempArray.length > 0) {
                                    this.dates.forEach( (temp, index) => {
                                        if (tempArray.includes(temp.date)) {
                                            value.reserveObj.checkInRoomType = 2; //预定
                                            // temp.reserveObj = value;
                                            temp[value.houseNum] = value;
                                        }
                                    })
                                }

                            }
                        })
                    }
                    this.rowRoomShow = true;
                    this.$forceUpdate()
                    console.log(this.dates);
                }
            );
        },
        //当房间被添加
        rowRoomCurrentListItemAdd(room) {
            this.$emit('rowRoomCurrentListItemAdd', room)
        },
        //排房确定
        db_row_houses() {
            this.$emit('db_row_houses')
            this.rowRoomShow = false;
        },

        checkIsSelect(item) {
            if (this.rowRoomCurrentItem.roomsArr && this.rowRoomCurrentItem.roomsArr.length) {
                for (let k in this.rowRoomCurrentItem.roomsArr) {
                    if (item.id == this.rowRoomCurrentItem.roomsArr[k].id) {
                        return true;
                    }
                }
                return false;
            }
            return false;
        },


        getDateStr(startTime, endTime, dayLength) {
            let startTimeDate = new Date(startTime);
            let endTimeDate = new Date(endTime);
            var month = startTimeDate.getMonth() + 1 < 10 ? "0" + (startTimeDate.getMonth() + 1) : startTimeDate.getMonth() + 1;
            var day = startTimeDate.getDate() < 10 ? "0" + startTimeDate.getDate() : startTimeDate.getDate();
            startTime = month + '/' + day;
            month = endTimeDate.getMonth() + 1 < 10 ? "0" + (endTimeDate.getMonth() + 1) : endTimeDate.getMonth() + 1;
            day = endTimeDate.getDate() < 10 ? "0" + endTimeDate.getDate() : endTimeDate.getDate();
            endTime = month + '/' + day;
            var tempArray = [startTime];
            for (var i = 0 ;; i++) {
                var getDate = this.getTargetDate(startTime, dayLength);
                startTime = getDate;
                if (getDate < endTime) {
                    tempArray.push(getDate);
                } else {
                    break;
                }
            }
            return tempArray;
        },

        // startTime: 开始时间；dayLength：每隔几天，0-代表获取每天，1-代表日期间隔一天
        getTargetDate(date, dayLength) {
            dayLength = dayLength + 1;
            var tempDate = new Date(date);
            tempDate.setDate(tempDate.getDate() + dayLength);
            var year = tempDate.getFullYear();
            var month = tempDate.getMonth() + 1 < 10 ? "0" + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1;
            var day = tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
            return month + "/" + day;
        },

        initRoomPlan() {
            this.dates = [''];
            let tempArray = this.getDateStr(this.startTime, this.endTime, 0);
            tempArray.forEach((value, index) => {
                let array = value.split('-').splice(1)
                this.dates.push({
                    date: array.join('/'),
                    week: this.$F.getWeekNumber(this, value)
                });
            })
            //TODO 调用后续接口
        },

        dateLater14() {
            this.startTime = this.endTime;
            this.endTime = this.$F.formatDate('yyyy-MM-dd', 14, this.endTime);
            this.initRoomPlan();
        },

        dateBefore14() {
            this.endTime = this.startTime;
            this.startTime = this.$F.formatDate('yyyy-MM-dd',-14, this.startTime);
            this.initRoomPlan();
        },
    },
};
</script>

<style lang='less' scoped>
.otherStyle {
    margin-top: 15px;
}

.infoTitle {
    color: rgba(30, 30, 30, 100);
    font-weight: 600;
}

.el-row {
    margin: 8px 0;
}
.timeBox {
    display: flex;
    //justify-content: center;
    align-items: center;
    margin: 10px 0;
    .middleTime {
        color: #999;
        font-size: 14px;
        margin: 0 10px;
    }
}

    .riliBox {
    margin: 10px auto;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .itemRi {
        &.border-body {
            border-bottom: 1px solid #D5D5D5;
        }
        &.last {
            border-right: 1px solid #D5D5D5;
        }
        .riTop {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 90px;
            height: 40px;
            border-top: 1px solid #D5D5D5;
            border-left: 1px solid #D5D5D5;

            &.riHeader {
                background: #D9DDE2;
                margin-bottom: 10px;
                border: 0;
                color: #000;
                font-size: 15px;
                height: 55px;
            }
        }
        .riBottom {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 60px;
            background-color: rgba(255, 255, 255, 1);
            border: 1px solid rgba(218, 218, 218, 1);

        }
    }
}
    .rowRoomDia {
        .eackTitle {
            font-size: 16px;
            color: #1e1e1e;
            padding: 0 5px;
        }
    }
</style>
