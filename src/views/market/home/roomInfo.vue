<!--
 * @Date: 2020-12-10 11:22:33
 * @Author: 陶子
 * @LastEditTime: 2021-02-08 14:22:47
 * @FilePath: \jiudian\src\views\market\home\roomInfo.vue
-->
<template>
    <div :visible.sync="hosteldis">
        <el-dialog
            top="0"
            width="90%"
            :visible.sync="hosteldis"
            :title=" `${currentRoom.houseNum}` + '  ' + `${ currentRoom.hotelRoomType ? currentRoom.hotelRoomType.houseName : '' }` + `${currentRoom.checkIn ? '-' : ''}` +
      checkTitleEnd()">
            <!-- 查看预订信息dialog -->
            <el-dialog top="0" width="70%" :title="$t('desk.order_lookOrderInfo')" :visible.sync="lookBookVisible" append-to-body>
                <div class="infoBox">
                    <!--            房间信息展示  包含订单信息 入住人同来宾客-->
                    <checkInInfo ref="checkInInfo" showOrderInfo="true"></checkInInfo>
                </div>
                <div slot="footer" class="dialog-footer" style="text-align: center">
                    <el-button type="primary" @click="lookBookVisible = false">{{$t('commons.close')}}</el-button>
                </div>
            </el-dialog>
            <el-tabs type="border-card" v-model="activeName">
                <!-- 基本信息 -->
                <el-tab-pane :label="$t('desk.serve_basicInfo')" name="first">
                    <div class="buttonBox">
                        <el-button type="primary" size="small" plain @click="goRoomStatus()" v-if="currentRoom.roomStatus != 5">
                            {{ (this.currentRoom.roomStatus == 3 || this.currentRoom.roomStatus == 1) ? $t('desk.home_putDirtyA') : $t('desk.home_buyNet') }}
                        </el-button>
                        <el-button type="primary" @click="goRoomStatus(5)" size="small" plain :disabled="currentRoom.checkInRoomType == 1">{{this.currentRoom.roomStatus != 5 ? $t('desk.home_service') : $t('desk.home_cannel_service')}}</el-button>
                        <el-button type="primary" size="small" plain @click="goFinance" :disabled="this.currentRoom.checkInRoomType != 1 && this.currentRoom.checkInRoomType != 2">{{$t('desk.customer_accountingTextA')}}</el-button>
                        <el-button type="primary" @click="paymentVisible" size="small" plain :disabled="this.currentRoom.checkInRoomType != 1">{{$t('desk.charge')}}</el-button>
                        <el-button type="primary" @click="checkoutRoom" size="small" plain :disabled="this.currentRoom.checkInRoomType != 1">{{$t('desk.order_checkout')}}</el-button>
                        <el-button type="primary" @click="psInLive" size="small" plain :disabled="this.currentRoom.checkInRoomType != 2">{{$t('manager.ps_inLive')}}</el-button>
                    </div>
                    <div class="infoBox">
                        <!--            入住人信息展示-->
                        <checkInInfo type="home" :orderInfo="orderInfo" ref="checkInInfo" showOrderInfo="true"></checkInInfo>
                    </div>
                </el-tab-pane>
                <!-- 房间信息 -->
                <el-tab-pane :label="$t('desk.roomInfoDesc')" name="second">
                    <div class="timeBox">
                        <el-button type="primary" :disabled="startTime <= nowDateString" size="small" plain @click="dateBefore21">&lt;&lt;{{$t('desk.order_go21')}}</el-button>
                        <div class="middleTime">{{ startTime }}——{{ endTime }}</div>
                        <el-button type="primary" size="small" plain @click="dateLater21">{{$t('desk.order_back21')}}&gt;&gt;</el-button>
                    </div>
                    <div class="riliBox">
                        <div v-for="date in dates" :key="date.date" class="itemRi">
                            <div class="riTop">
                                <span>{{date.date}}</span>
                                <br>
                                <span>{{date.week}}</span>
                            </div>

                            <div class="riBottom" @click="lookRoomClick(date)" v-if="date.reserveObj" style="background: #A3E5FD">
                                <div>{{date.reserveObj.name}}</div>
                                <!-- <span v-if="date.reserveObj.pronunciation">【{{date.reserveObj.pronunciation}}】</span> -->
                                <div>{{$t('commons.guestType')[date.reserveObj.guestType + '']}}</div>
                            </div>
                            <div class="riBottom" v-else>{{$t('desk.order_blankText')}}</div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <!-- 内层挂账dialog -->
            <cardTao ref="cardTao" :currentRoom="currentRoom" ></cardTao>
            <!-- 内层结账退房dialog -->
            <CheckoutTao ref="checkoutTao" :detailData = "orderInfo" :currentRoom="currentRoom"></CheckoutTao>
        </el-dialog>
<!--        <mainView ref="mainView"> </mainView>-->
        <mainView style="height: 0;width: 0" ref="mainView" v-show="mainViewShow"> </mainView>
    </div>

</template>

<script>
import myMixin from "@/utils/filterMixin";
import checkInInfo from "@/components/front/checkInInfo";
import cardTao from "@/components/cardTao";
import CheckoutTao from '@/components/checkoutTao';
import mainView from '@/components/main/mainView';
export default {
    components: {
        checkInInfo,
        cardTao,
        CheckoutTao,
        mainView
    },
    mixins: [myMixin],
    data() {
        return {
            mainViewShow: false,
            detailData: {},
            currentRoom: {},
            dates: [],
            startTime: '',
            endTime: '',
            hosteldis: false, //最外层入住弹框
            checkoutVisible: false, //内层结账退房dialog
            lookBookVisible: false, //内层查看预订信息dialog
            paymentForm: {}, //挂账弹框的表单
            checkInPersonList: [],
            inputMessage: false,
            nowDateString: '',
            orderInfo: {}, //需要展示订单的信息
            activeName: 'first',

        };
    },
    mounted() {
        this.nowDateString= this.$F.formatDate('yyyy-MM-dd');

    },
    methods: {

        //点击挂账按钮
        paymentVisible(){
          console.log(this.currentRoom);
            this.$refs.cardTao.resetVisibel(this.currentRoom.checkInObj.id);
        },
        //点击入住按钮
        psInLive() {
            if (this.currentRoom.checkInRoomType == 2) {
                let id = this.currentRoom.reseverCheckInObj.id;
                this.$router.push("/bookingDetail?id=" + id);
            }
            // let item = {"id":"a367289c90e34614a308917f5726bd31","createTime":"2020-07-05 15:01:00","updateTime":"2020-12-02 14:35:29","menuTitle":"预订/入住","menuAliasTitle":null,"japanese":"予約受付","parentMenuId":"a367289c90e34614a308917f5726bd06","icon":"market/nav03.png","path":"booking","menuLevel":2,"menuType":3,"status":1,"menuorder":31,"childList":[{"id":"a367289c90e34614a308917f5726bd101","createTime":"2020-07-05 15:01:00","updateTime":"2020-12-04 11:46:21","menuTitle":"普通预订","menuAliasTitle":null,"japanese":"一般予約","parentMenuId":"a367289c90e34614a308917f5726bd31","icon":null,"path":"normal","menuLevel":3,"menuType":3,"status":1,"menuorder":101,"childList":null,"header":null},{"id":"a367289c90e34614a308917f5726bd102","createTime":"2020-07-05 15:01:00","updateTime":"2020-12-04 11:46:33","menuTitle":"当日回预订","menuAliasTitle":null,"japanese":"日帰り予約","parentMenuId":"a367289c90e34614a308917f5726bd31","icon":null,"path":"dayBack","menuLevel":3,"menuType":3,"status":1,"menuorder":102,"childList":null,"header":null},{"id":"a367289c90e34614a308917f5726bd103","createTime":"2020-07-05 15:01:00","updateTime":"2020-12-04 11:46:40","menuTitle":"会场预订","menuAliasTitle":null,"japanese":"会場予約","parentMenuId":"a367289c90e34614a308917f5726bd31","icon":null,"path":"hall","menuLevel":3,"menuType":3,"status":1,"menuorder":103,"childList":null,"header":null}],"header":null};
            // this.$refs.mainView.toSection(item);
            // sessionStorage.sectionid = 'a367289c90e34614a308917f5726bd31';
            // // sessionStorage.subMenul = JSON.stringify(item);
            // sessionStorage.pageId = 'a367289c90e34614a308917f5726bd101';
            // sessionStorage.pagePath = 'booking';
            // sessionStorage.currentPath = 'booking';
            // this.$router.push({
            //     name: "normal",
            // });

        },
          //点击结账退房按钮
        checkoutRoom(){
            // this.$refs.CheckoutTao.resetVisibel();
            let id = this.currentRoom.checkInObj.id;
            this.$router.push("/orderdetail?id=" + id);
        },
        lookRoomClick(data) {
            let a = this;
            this.lookBookVisible = true;
            setTimeout(()=> {
                a.$refs.checkInInfo.init('home', {checkIn: data.reserveObj, personList: []}, this.currentRoom);
            }, 100)
        },
        dateLater21() {
            this.startTime = this.endTime;
            this.endTime = this.$F.formatDate('yyyy-MM-dd', 21, this.endTime);
            this.initRoomPlan();
        },

        dateBefore21() {
            this.endTime = this.startTime;
            this.startTime = this.$F.formatDate('yyyy-MM-dd',-21, this.startTime);
            this.initRoomPlan();
        },
        initRoomPlan() {
            this.dates = [];
            let tempArray = this.getDateStr(this.startTime, this.endTime, 0);
            tempArray.forEach( (value, index) => {
                this.dates.push({
                    date: value,
                    week: this.$F.getWeekNumber(this, value)
                });
            })
            console.log(this.dates);
            console.log(this.startTime);
            console.log(this.currentRoom);
            this.$F.doRequest(this, "/pms/reserve/reserve_room_list", {
                    roomId: this.currentRoom.id,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    searchType: this.currentRoom.omType || 2,
                    checkinTime: this.startTime,
                    checkoutTime: this.endTime,
                }, (res) => {
                    if (res && res.roomCheckInCalendarList.length > 0) {
                        res.roomCheckInCalendarList.forEach( (value, index) => {
                            if (value.reserveObj) {
                                let checkinTime = this.$F.formatDate('yyyy-MM-dd', 0, value.reserveObj.checkinTime);
                                let checkoutTime = this.$F.formatDate('yyyy-MM-dd', 0, value.reserveObj.checkoutTime);
                                let tempArray = this.getDateStr(checkinTime, checkoutTime, 0);
                                console.log(tempArray)
                                if (tempArray.length > 0) {
                                    this.dates.forEach( (temp, index) => {
                                        if (tempArray.includes(temp.date)) {
                                            value.reserveObj.checkInRoomType = 2; //预定
                                            temp.reserveObj = value.reserveObj;
                                        }
                                    })
                                }
                                console.log(this.dates);
                            }
                        })
                    }
                    this.$forceUpdate()
                }
            );
        },
        resetMessage(inputMessage) {
            if (inputMessage) {
                this.inputMessage = false;
            } else {
                this.inputMessage = true;
            }
        },

        //获取订单详情
        getOrderDetail(id, callback) {
            this.$F.doRequest(this,"/pms/checkin/check_in_detail", {checkInId: id,}, (res) => {
                    callback(res);
                }
            );
        },

        //获取预订单详情
        getReserveDetail(id, callback) {
            this.$F.doRequest(this,"/pms/checkin/reserve_check_in_detail", {reserveId: id,}, (res) => {
                    callback(res);
                }
            );
        },
        changeVisible(currentRoom) {
            console.log(currentRoom);
            this.orderInfo = {};
            this.startTime = this.$F.formatDate('yyyy-MM-dd');
            this.endTime = this.$F.formatDate('yyyy-MM-dd', 21);
            this.currentRoom = currentRoom;
            this.initRoomPlan();
            this.currentRoom.label = this.currentRoom.checkInRoomType == 1 ? this.$t('frontOffice.checkInfoDesc') : this.$t('desk.order_bookOrderInfo')
            if (this.currentRoom.checkInRoomType == 1) {   //订单详情
                if (this.currentRoom.checkInObj) {
                    let id = this.currentRoom.checkInObj.id;
                    this.$F.merge(this.orderInfo, this.currentRoom.checkInObj);
                    this.getOrderDetail(id, res => {
                        this.detailData = res;
                        this.$F.merge(this.orderInfo, res);
                        this.$F.merge(this.orderInfo, {checkInRoomType: this.currentRoom.checkInRoomType});
                        this.showCheckinInfo();
                    })
                } else {
                    this.orderInfo.checkInRoomType = '';
                    this.showCheckinInfo();
                }
            } else if (this.currentRoom.checkInRoomType == 2) {  //预订单详情
                if (this.currentRoom.reseverCheckInObj) {
                    let id = this.currentRoom.reseverCheckInObj.id;
                    this.orderInfo = this.currentRoom.reseverCheckInObj;
                    this.getReserveDetail(id, res => {
                        this.detailData = res;
                        this.$F.merge(this.orderInfo, res);
                        this.$F.merge(this.orderInfo, {checkInRoomType: this.currentRoom.checkInRoomType});
                        this.hosteldis = true;
                        this.showCheckinInfo();
                    })
                } else {
                    this.orderInfo.checkInRoomType = '';
                    this.showCheckinInfo();
                }
            } else {
                this.showCheckinInfo();
            }

        },

        //改变房间状态 置脏置净

        goRoomStatus(status) {
            let roomStatus = 5;
            if (status) {
                if (this.currentRoom.roomStatus == 5) {
                    roomStatus = 1;
                } else {
                    roomStatus = status;
                }
            } else {
                console.log(this.currentRoom.roomStatus)
                if (this.currentRoom.roomStatus == 1) {
                    roomStatus = 2;
                } else if (this.currentRoom.roomStatus == 2) {
                    roomStatus = 1;
                } else if (this.currentRoom.roomStatus == 3) {
                    roomStatus = 2;
                } else if (this.currentRoom.roomStatus == 4) {
                    roomStatus = 1;
                }
            }

            this.$F.doRequest(this, '/pms/hotel/oper_room_status', {
                roomIds: this.currentRoom.id,
                roomStatus: roomStatus
            }, (res) => {
                this.currentRoom.roomStatus = roomStatus;
                this.$emit('init');
            });
        },

        //点击财务跳转到订单
        goFinance() {
            if (this.currentRoom.checkInRoomType == 1) {
                this.$router.push("/orderdetail?id=" + (this.detailData.checkIn.id));
            } else {
                this.$router.push("/bookingDetail?id=" + this.detailData.checkIn.id);
            }
        },

        showCheckinInfo() {
            this.hosteldis = true;
            setTimeout(()=> {
                this.$refs.checkInInfo.init('home', this.orderInfo, this.currentRoom);
            }, 100)
        },
        checkTitleEnd() {
            if (this.currentRoom.checkIn && this.currentRoom.checkIn.operCheckinType) {
                switch (this.currentRoom.checkIn.operCheckinType) {
                    case 1:
                        return this.$t('desk.order_ordinaryLive');
                        break;
                    case 2:
                        return this.$t('desk.order_clockLive');
                        break;
                    case 3:
                        return this.$t('desk.order_meetingLive');
                        break;
                }
            } else {
                return "";
            }
        },
        handleOperRoomStatus(status, item) {
            // console.log(s) // ; // let status = ''; // if (s == 1 || s == null || s == 'null') { //     status = 2 // } // if (s == 3) { //     status = 4 // } // if (s == 2) { //     status = 1 // } // if (s == 4) { //     status = 1 // }
            item.roomStatus = status;
            this.$F.doRequest(
                this,
                "/pms/hotel/oper_room_status",
                {
                    roomIds: item.id,
                    roomStatus: status,
                },
                (res) => {
                    this.hosteldis = false;
                    this.$message({
                        message: this.$t("commons.request_success"),
                        type: "success",
                    });
                    // this.getDataList()
                }
            );
        },
        //将房间设置为维修状态
        handleFix(item) {
            this.$confirm(
                this.$t("desk.home_sureService"),
                this.$t("commons.tip_desc"),
                {
                    confirmButtonText: this.$t("commons.confirm"),
                    cancelButtonText: this.$t("commons.cancel"),
                    type: "warning",
                }
            ).then(() => {
                    this.$F.doRequest(
                        this,
                        "/pms/hotel/oper_room_status",
                        {
                            roomStatus: 5,
                            roomIds: item.id,
                        },
                        (res) => {
                            this.$message({
                                message: this.$t("commons.request_success"),
                                type: "success",
                            });
                            this.hosteldis = false;
                        }
                    );
                })
                .catch(() => {});
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
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.buttonBox {
    box-sizing: border-box;
    padding: 10px;
}

.infoBox {
    box-sizing: border-box;
    padding: 10px;
    padding-top: 0;
    .public {
        margin-bottom: 20px;
        .infoTitle {
            font-weight: 600;
            margin-bottom: 10px;
        }
        .itemDetail {
            .el-row {
                margin-bottom: 10px;
            }
        }
    }
    .otherStyle {
        margin-bottom: 10px;
    }
}
.messageBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.innerBoxTop {
    > span {
        margin-right: 40px;
    }
    margin-bottom: 10px;
}
.priceBox {
    margin: 20px 0;
    box-sizing: border-box;
    padding: 10px 20px;
    width: 100%;
    height: 120px;
    background-color: rgba(250, 250, 250, 1);
    border: 1px solid rgba(239, 239, 239, 1);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .leftPrice {
        color: rgba(220, 62, 62, 100);
        font-size: 32px;
    }
    .centerLine {
        width: 1px;
        height: 60px;
        border: 1px solid rgba(218, 218, 218, 1);
        margin: 0 40px;
    }
    .rightPrcie {
        .rightTop {
            margin-bottom: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            .rightTopNum {
                color: rgba(220, 62, 62, 100);
            }
        }
        .rightBottom {
            font-size: 20px;
            .RightBottomNum {
                color: rgba(41, 182, 75, 100);
            }
        }
    }
    .lastRight {
        display: flex;
        justify-content: center;
        align-items: center;
        .rightTopImg {
            position: relative;
            bottom: 15px;
            margin-left: 10px;
            width: 24px;
            height: 24px;
            &:hover + .hoverBox {
                display: block;
            }
        }
        .hoverBox {
            display: none;
            position: relative;
            top: 50px;
            left: 10px;
            box-sizing: border-box;
            padding: 20px;
            width: 240px;
            border-radius: 4px;
            background-color: rgba(0, 0, 0, 0.7);
            color: rgba(255, 255, 255, 100);
            font-size: 14px;
            > div {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}
.timeBox {
    display: flex;
    justify-content: center;
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
    width: 92%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .itemRi {
      width: 14.28%;
        .riTop {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
           width: 100%;
            height: 80px;
            background-color: rgba(234, 234, 234, 1);
            border: 1px solid rgba(218, 218, 218, 1);
        }
        .riBottom {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100px;
            background-color: rgba(255, 255, 255, 1);
            border: 1px solid rgba(218, 218, 218, 1);

        }
    }
}
</style>
