<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-24 16:43:14
 * @FilePath: \jiudian\src\components\front\checkInInfo.vue
 -->
<template>
    <div>
        <div class="item-info" v-if="showOrderInfo">
            <div class="public">
                <div class="itemDetail">
                    <div class="infoTitle">入住信息：</div>
                    <el-row>
                        <el-col :span="6">{{
                                $t("desk.order_bookOrderNum") +
                                ": " +
                                (orderInfo.reserveOrderNum || "")
                            }}
                        </el-col>
                        <el-col :span="6">
              <span>{{
                      $t("desk.book_orderSoutce") +
                      ": " +
                      $t("commons.orderSource")[orderInfo.orderSource + ""]
                  }}</span>
                        </el-col>
                        <el-col :span="6">{{
                                $t("desk.order_outOrder") + ": " + (orderInfo.thirdOrdernum || "")
                            }}
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            {{
                                $t("desk.customer_region") + ": " + (orderInfo.region || "")
                            }}
                        </el-col
                        >
                    </el-row>
                    <el-row>
                        <el-col :span="6">{{
                                $t("desk.order_checkinDate") + ": " + orderInfo.checkinTime
                            }}
                        </el-col>
                        <el-col :span="6">{{
                                $t("desk.order_departureTime") + ": " + orderInfo.checkoutTime
                            }}
                        </el-col>
                        <el-col :span="6">{{
                                $t("desk.checkInDays") + ": " + (orderInfo.checkinDays || "")
                            }}
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="public otherStyle">
                <div class="infoTitle">预约内容/住宿plan：</div>
                <div class="itemDetail">
                    <el-row>
                        <el-col :span="6">消费合计：80000</el-col>
                        <el-col :span="6">付款合计：9000</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="18"
                        >付款方式：现金（2000）；信用卡（4000）；挂账（1000）；其他（2000）
                        </el-col
                        >
                    </el-row>
                    <el-row>
                        <el-col :span="6">{{
                                `${$t("desk.reservePersonDesc")}: ${orderInfo.name}【${
                                    orderInfo.pronunciation
                                }】`
                            }}
                        </el-col>
                        <el-col :span="8"
                        >预约人电话：（手）{{
                                orderInfo.mobile || orderInfo.homeMobile
                            }}
                        </el-col
                        >
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
                    <span>{{}}</span>
                    <br>
                    <span></span>
                </template>
            </el-table-column>
            <el-table-column label="联系方式" align="center">
                <template slot-scope="{ row, $index }">

                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="性别"
                align="center"
                width="120"
            ></el-table-column>
            <el-table-column label="客源类型" prop="amount1" align="center">
            </el-table-column
            >
            <el-table-column
                align="center"
                prop="amount2"
                label="会员号码/单位号码"
            ></el-table-column>
            <el-table-column prop="amount2" label="同来宾客" align="center">
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
            checkinInfo: {},
        };
    },
    mounted() {
        this.checkinInfo = this.$F.deepClone(this.orderInfo);
        if (this.currentRoom) {
            this.checkinInfo.inRoomList = (this.checkinInfo.inRoomList.forEach((item) => {
                return item.roomId == this.currentRoom.roomId
            }) || []) || {};
        }
        this.checkinInfo.inRoomList.forEach(item => {
            if (item.personlist && item.personlist.length > 0) {
                item.personlist.forEach((person, index) => {
                    if (person.personType == 2) {
                        item.header = person;
                        item.personlist.splice(index, 1);
                    }
                })
            } else {
                item.noPerson = true;
                item.personlist = [];
            }
        })
        console.log(this.inRoomList);
    },
    methods: {
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
