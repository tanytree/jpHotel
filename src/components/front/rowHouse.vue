<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-24 16:43:14
 * @FilePath: \jiudian\src\components\front\checkInInfo.vue
 -->
<template>
    <div>
        <el-dialog top="0" :visible.sync="rowRoomShow" class="rowRoomDia" :title="$t('desk.rowHouse')" width="80%">
            <!-- 房间选择块 -->
            <div class="topBigbox">
                <div class="eackBlock">
                    <div>大仓集团第一酒店 3层 4间</div>
                    <div style="margin-top: 10px">
                        <el-checkbox-group v-model="selectList" size="small" :max="maxSelect">
                            <el-checkbox-button style="margin-right: 15px" v-for="(room, index) in rowRoomCurrentList" :label="room.houseNum" :key="index">
                                {{ room.houseNum }}</el-checkbox-button>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <!-- 时间选择块 -->
            <div class="timeBox">
                <el-button type="primary" :disabled="startTime <= nowDateString" size="small" plain @click="dateBefore14">&lt;&lt;往前14天</el-button>
                <div class="middleTime">{{ startTime }}——{{ endTime }}</div>
                <el-button type="primary" size="small" plain @click="dateLater14">往后14天&gt;&gt;</el-button>
            </div>
            <!-- 日历表格块 -->
            <div class="riliBox" v-loading="loading">
                <div v-for="date in dates" :key="date.date" class="itemRi">
                    <div class="riTop">
                        <span>{{date.date}}</span>
                        <br>
                        <span>{{date.week}}</span>
                    </div>
                </div>
<!--                <el-table :data="roominfoList" style="width: 100%; margin-bottom: 20px" border lazy header-row-class-name="default">-->
<!--                    <el-table-column type="index"  width="80px">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                        v-for="(item, index) in dateList"-->
<!--                        :key="index"-->
<!--                        :label="item.dateStr + '' + item.weekDay"-->
<!--                        :width="index == 0 ? '150' : ''"-->
<!--                    >-->
<!--                        <template slot-scope="{ row }">-->
<!--                            <span>{{ checkRoomInfo(row, index) }}</span>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                </el-table>-->
            </div>
            <div slot="footer" class="dialog-footer" style="text-align: right">
                <el-button size="small" @click="rowRoomShow = false">{{ $t("commons.cancel") }}</el-button>
                <el-button size="small" type="primary" @click="submit">{{ $t("commons.confirm") }}</el-button>
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
        };
    },

    methods: {
        //排房确定
        submit() {
            this.$emit('rowHouseCallback', this.selectList)
        },
        init(roomTypeId, num) {
            this.startTime = this.$F.formatDate('yyyy-MM-dd');
            this.endTime = this.$F.formatDate('yyyy-MM-dd', 14);
            let tempArray = this.getDateStr(this.startTime, this.endTime, 0);
            this.dates = [''];
            tempArray.forEach( (value, index) => {
                let array = value.split('-').splice(1)
                this.dates.push({
                    date: array.join('/'),
                    week: this.$F.getWeekNumber(this, value)
                });
            })

            this.nowDateString= this.startTime;
            this.roomTypeId = roomTypeId;
            this.maxSelect = num;
            this.hotel_room_list({
                rowHousesTotal: 999,
                roomTypeId: this.roomTypeId
            });
            this.calendar();

        },

        calendar() {
            this.$F.doRequest(
                this,"/pms/reserve/reserve_room_list", {
                    startTime: this.startTime,
                    endTime: this.endTime,
                    searchType: 2,
                    roomTypeId: this.roomTypeId,
                }, (res) => {
                    console.log(res)
                    debugger
                }
            );
        },
        rowRoomCurrentListItemAdd(item) {
            this.rowRoomCurrentItem.roomsArr = this.rowRoomCurrentItem.roomsArr || [];
            let exist = false;
            for (let k in this.rowRoomCurrentItem.roomsArr) {
                if (item.id == this.rowRoomCurrentItem.roomsArr[k].id) {
                    this.rowRoomCurrentItem.roomsArr.splice(k, 1);
                    exist = true;
                    break;
                }
            }
            if (!exist)
                this.rowRoomCurrentItem.roomsArr.push(item);
            this.$forceUpdate();
            console.log(this.rowRoomCurrentItem);
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
        //获取可排房的房间
        hotel_room_list(params) {
            // params.roadFlag !== "" && (params.roadFlag = params.roadFlag ? 1 : "");
            // params.windowFlag !== "" &&
            //   (params.windowFlag = params.windowFlag ? 1 : "");
            // params.smokeFlag !== "" && (params.smokeFlag = params.smokeFlag ? 1 : "");
            // params.noiseFlag !== "" && (params.noiseFlag = params.noiseFlag ? 1 : "");
            // params.temperatureFlag !== "" &&
            //   (params.temperatureFlag = params.temperatureFlag ? 1 : "");
            this.$F.doRequest(
                this,"/pms/checkin/empty_row_houses", params, (res) => {
                    this.rowRoomCurrentList = [];
                    if (res) {
                        for (let id in res) {
                            this.rowRoomCurrentList = this.rowRoomCurrentList.concat(res[id]);
                        }
                    }
                    console.log(this.rowRoomCurrentList);
                    this.rowRoomShow = true;
                    this.$forceUpdate()
                }
            );
        },

        getDateStr(startTime, endTime, dayLength) {
            var str = startTime, tempArray = [startTime];
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
            return year + "-" + month + "-" + day;
        },

        initRoomPlan() {
            this.dates = [];
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
        color: rgba(51, 51, 51, 100);
        font-size: 16px;
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
        .riTop {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 60px;
            background-color: rgba(234, 234, 234, 1);
            border: 1px solid rgba(218, 218, 218, 1);
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
</style>
