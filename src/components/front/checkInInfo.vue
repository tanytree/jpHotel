<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-24 16:43:14
 * @FilePath: \jiudian\src\components\front\checkInInfo.vue
 -->
<template>
    <div>
        <div class="item-info" v-if="showOrderInfo">
            <div class="public" v-if="checkinInfo.checkInRoomType == 1 || checkinInfo.checkInRoomType == 2">
                <div class="itemDetail">
                    <div class="infoTitle">入住信息：</div>
                    <el-row>
<!--                        订单号-->
                        <el-col :span="6">{{ $t("desk.book_orderNum") + ": " + (checkinInfo.checkIn.reserveOrderNum || checkinInfo.checkIn.orderNum) }}</el-col>
                        <el-col :span="6">
<!--                            来源-->
                            <span>{{ $t("desk.book_orderSoutce") + ": " +F_orderSource(checkinInfo.checkIn.orderSource)}}</span>
                        </el-col>
<!--                        外部订单号-->
                        <el-col :span="6">{{ $t("desk.order_outOrder") + ": " + (checkinInfo.checkIn.thirdOrdernum || "") }}</el-col>
                    </el-row>
                    <el-row>
<!--                        地区-->
                        <el-col :span="6">{{ $t("desk.customer_region") + ": " + (checkinInfo.checkIn.region || "") }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">{{ $t("desk.order_checkinDate") + ": " + checkinInfo.checkIn.checkinTime }}</el-col>
                        <el-col :span="6">{{ $t("desk.order_departureTime") + ": " + checkinInfo.checkIn.checkoutTime }}</el-col>
                        <el-col :span="6">{{ $t("desk.checkInDays") + ": " + (checkinInfo.checkIn.checkinDays || "") }}</el-col>
                    </el-row>
                </div>
            </div>
            <div class="public otherStyle"  v-if="checkinInfo.checkInRoomType == 1 || checkinInfo.checkInRoomType == 2">
                <div class="infoTitle">预约内容/住宿plan：</div>
                <div class="itemDetail">
                    <el-row>
                        <el-col :span="6">消费合计：{{ checkinInfo.totalPrice }}</el-col>
                        <el-col :span="6">付款合计：{{ checkinInfo.payPrice }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="18"
                        >付款方式：现金（2000）；信用卡（4000）；挂账（1000）；其他（2000）
                        </el-col
                        >
                    </el-row>
                    <el-row>
                        <el-col :span="6">{{ `${$t("desk.reservePersonDesc")}: ${checkinInfo.checkIn.name}【${checkinInfo.checkIn.pronunciation}】` }}</el-col>
                        <el-col :span="8">预约人电话：（手）{{ checkinInfo.checkIn.mobile || checkinInfo.checkIn.homeMobile }}</el-col>
                    </el-row>
                </div>
            </div>
        </div>

        <!--表格数据 -->
        <el-table
            :data="checkinInfo.inRoomList"
            header-row-class-name="default"
            border
            style="width: 100%"
        >
            <el-table-column prop="name" label="入住人/单位名称/团队名">
                <template slot-scope="{ row, $index }">
                    <!--                    显示入住人  入主入住人没有 则显示订单外的订单信息-->
                    <span v-if="row.headerObj">{{row.headerObj.name}}【{{row.headerObj.pronunciation}}】</span>
                    <span v-else>{{ checkinInfo.checkIn.name }}【{{ checkinInfo.checkIn.pronunciation }}】</span>
                    <!--                    显示单位信息-->
                    <br v-if="checkinInfo.checkIn.guestType == 3 && row.headerObj.enterName">
                    <span v-if="checkinInfo.checkIn.guestType == 3 && row.headerObj.enterName" >
                        {{ row.headerObj.enterName }}【{{ row.headerObj.enterPinyin }}】
                    </span>
                    <!--                    显示团体信息-->
                    <br v-if="checkinInfo.checkIn.guestType == 4">
                    <span v-if="checkinInfo.checkIn.guestType == 4">
                        {{ checkinInfo.checkIn.teamName }}【{{ checkinInfo.checkIn.teamPronunciation }}】
                    </span>

                </template>
            </el-table-column>
            <el-table-column label="房间号/房型" align="center">
                <template slot-scope="{ row, $index }">
                    <span>{{row.houseNum}} / {{row.roomTypeName}} </span>
                </template>
            </el-table-column>
            <el-table-column label="证件号码" align="center">
                <template slot-scope="{ row, $index }">
                    <span v-if="row.headerObj">
                        ({{$t('commons.idCardType')[(row.headerObj.idcardType ? (row.headerObj.idcardType + '') : '1')]}}) {{row.headerObj.idcard}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="联系方式" align="center">
                <template slot-scope="{ row, $index }">
                    <div v-if="row.headerObj">
                        <p v-if="row.headerObj.homeMobile">(家) {{row.headerObj.homeMobile}} </p>
                        <p v-if="row.headerObj.enterMobile">(单位) {{row.headerObj.enterMobile}} </p>
                        <p v-if="checkinInfo.checkIn.guestType == 4 && checkinInfo.checkIn.contactPhone">(团体) {{checkinInfo.checkIn.contactPhone}} </p>
                        <p v-if="row.headerObj.mobile">(手机) {{row.headerObj.mobile}} </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="性别" align="center" width="120">
                <template slot-scope="{ row, $index }">
                    <span v-if="row.headerObj && row.headerObj.sex">
                        {{F_sex(row.headerObj.sex)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="客源类型" align="center">
                <template slot-scope="{ row, $index }">
                    <span>
                        {{F_guestType(checkinInfo.checkIn.guestType)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="会员号码/单位号码">
                <template slot-scope="{ row, $index }">
                    <span v-if="row.headerObj && row.headerObj.guestType == 2 && row.headerObj.memberCard">
                        {{row.headerObj.memberCard}}
                    </span>
                    <span v-if="row.headerObj && row.headerObj.guestType == 3 && row.headerObj.enterId">
                        {{row.headerObj.enterId}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="amount2" label="同来宾客" align="center">
                <template slot-scope="{ row, $index }">
                    <p v-for="(person, index) in row.personList" :key-="index" v-if="row.personList">
                        {{person.name}}【{{person.pronunciation}}】 {{F_sex(person.sex)}}   {{F_customerTypes(person.customerType)}}
                    </p>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import myMixin from "@/utils/filterMixin";


export default {
    mixins: [myMixin],
    props: ["currentRoom", "showOrderInfo", "orderInfo"],
    data() {
        return {
            checkinInfo: {
                checkIn: {},
                inRoomList: []
            },
        };
    },

    mounted() {
        this.handleData(this.orderInfo);
        console.log(this.checkinInfo.inRoomList);
    },
    methods: {
        handleData(orderInfo) {
            this.checkinInfo = this.$F.deepClone(orderInfo);
            console.log(JSON.parse(JSON.stringify(this.checkinInfo)));
            debugger
            if (this.currentRoom) {
                // this.checkinInfo.inRoomList = (this.checkinInfo.inRoomList.forEach((item) => {
                //     return item.roomId == this.currentRoom.roomId
                // }) || []) || {};
            }
            this.checkinInfo.inRoomList.forEach(item => {
                if (item.personList && item.personList.length > 0) {
                    item.personList.forEach((person, index) => {
                        if (person.personType == 2) {
                            item.headerObj = person;   //主入住人
                            item.personList.splice(index, 1);
                        }
                    })
                } else {
                    item.noPerson = true;
                    item.personList = [];
                }
            })
        },
        init(type, checkinInfo) {
            this.handleData(checkinInfo);
        },

        arraySpanMethod({row, column, rowIndex, columnIndex}) {
            if (rowIndex === 0) {
                if (columnIndex <= 4) {
                    return {
                        rowspan: 3,
                        colspan: 1,
                    };
                } else {
                    return {
                        rowspan: 1,
                        colspan: 1,
                    };
                }
            }
            if (rowIndex > 2) {
                if (columnIndex > 0) {
                    return {
                        rowspan: 1,
                        colspan: 7,
                    };
                } else {
                    return {
                        rowspan: 1,
                        colspan: 1,
                    };
                }
            }
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
</style>
