<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-30 13:24:37
 * @FilePath: \jiudian\src\views\market\orders\bookingDetail.vue
 -->
<template>
    <div class="boss-index ov-y flex_column">
        <div class="el-card" style="height: auto">
            <div class="el-card__header" style="padding: 10px 20px">
                <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 0">
                    <el-breadcrumb-item @click.native="goBack">{{ $t('desk.order_bookOrder') }}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ $t('commons.detail') }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="bodyInfo margin-t-10 flex_row" v-loading="loading">
            <div class="aside">
                <ul>
                    <li @click="isOrder = true; currentRoom = {};" :class="isOrder ? 'active' : ''">
                        <p>{{ $t('desk.order_bookOrderInfo') }}</p>
                    </li>
                    <li v-for="(item, index) of detailData.inRoomList" :key="index" :class="currentRoom.id == item.id ? 'active' : ''" @click="showRoomInfo(item)">
                        <p>{{ item.houseNum }} {{ $t('desk.home_roomType') }}：{{ item.roomTypeName }}</p>
                        <!--
                        roomId为空 未排房 无房间就是未排房
                        roomId有值 但state不为1 已排房（未入住）
                        state:1 已入住
                        state：2 离店
                        -->
                        <span class="ok" v-if="item.state == 1">{{ $t('commons.checkinState')['1'] }}</span>
                        <span class="ok" v-if="(item.state == 3 && item.roomId) || (item.state == 2 && item.roomId)">{{ $t('desk.hadRowHouses') }}</span>
<!--                        <span class="ok" v-if="detailData.checkIn.state > 2">{{ $t('commons.reserveState')[detailData.checkIn.state + ''] }}</span>-->
                        <span class="no" v-if="!item.roomId">{{ $t('desk.noRowHouses') }}</span>
<!--                        <span class="no" v-if="">{{ $t('food.order_status')[3] }}</span>-->
                    </li>
                </ul>
            </div>
            <div class="rightContent">
                <el-row class="boss-index" v-if="isOrder">
                    <el-tabs class="tabCenter" v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane :label="$t('desk.serve_basicInfo')" name="first">
                            <div class="tabWrap">
                                <!-- 基本信息--->
                                <sbase v-if="detailData.checkIn.id" :detailData="detailData" :checkinInfo="detailData.checkIn" :inRoomList="detailData.inRoomList" @baseInfoChange="baseInfoChange"> </sbase>
                            </div>
                        </el-tab-pane>
<!--                        - 客人信息-->
                        <el-tab-pane :label="$t('desk.order_guestInfo')" name="customer">
<!--                          <div class="tabWrap">-->
<!--                            <customer type="detail" :detailData="detailData"></customer>-->
<!--                          </div>-->
                          <div class="tabWrap">
                            <checkInInfo type="detail" :orderInfo="detailData" ref="checkInInfo"></checkInInfo>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane :label="$t('desk.financialDetails')" name="finance">
                            <div class="tabWrap">
                                <!-- 财务明细--->
                                <finance v-if="detailData.checkIn.id" :detailData="detailData"></finance>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-row>
                <el-row v-else>
                    <roominfo @baseInfoChange="baseInfoChange" ref="roominfo"></roominfo>
                </el-row>
            </div>

        </div>

    </div>
</template>

<script>
import roominfo from "./bookingcoms/roominfo";
import sbase from "./bookingcoms/base";
import customer from "@/components/front/customer";
import checkInInfo from "@/components/front/checkInInfo";   //客人信息
import finance from "./bookingcoms/finance";
import myMixin from "@/utils/filterMixin";

export default {
    mixins: [myMixin],
    components: {
        checkInInfo,
        roominfo,
        sbase,
        customer,
        finance,
    },

    data() {
        return {
            id: "",
            loading: false,
            isOrder: true,
            activeName: "first",
            detailData: {checkIn: {}, inRoomList: []},
            currentRoom: {},
        };
    },

    mounted() {
        this.id = this.$route.query.id;
        this.getDetail(this.id);
    },

    methods: {
        //获取预定单详情信息
        getDetail(id) {
            this.$F.doRequest(this, "/pms/checkin/reserve_check_in_detail", { reserveId: id},
                (res) => {
                    this.detailData = res;
                    this.$forceUpdate();
                }
            );
        },
        baseInfoChange(v) {
            this.getDetail(this.id);
        },
        handleClick() {
            if (this.activeName == 'customer') {
                console.log(this.$refs);
                this.$refs.checkInInfo.init('detail', this.detailData);
            }
        },
        showRoomInfo(item) {
            this.isOrder = false;
            console.log(item);
            console.log(this.detailData);
            this.currentRoom = item;
            setTimeout(() => {
                this.$refs.roominfo.dialogOpen(this.currentRoom, this.detailData.checkIn)
            }, 100)

        },
        goBack(){
          this.$router.go(-1);
        }
    },
};
</script>

<style lang="scss" scoped>
.detailTab {
    border: 0;
}

.detailTab >>> .el-tabs__header {
    margin: 0;
}
</style>
<style lang="less">
.bodyInfo {
    flex: 1;
    height: 0;
    overflow: hidden;

    .tabWrap {
        height: 100%;
        padding: 0 20px;
    }

    .aside {
        background: #fff;
        height: 100%;
        width: 280px;
        margin-right: 20px;

        li {
            width: 100%;
            height: 60px;
            line-height: 60px;
            border-bottom: 1px solid #eee;
            border-right: 3px solid #fff;
            overflow: hidden;
            position: relative;

            p {
                font-size: 14px;
                padding-left: 40px;
                margin: 0;
            }

            span {
                position: absolute;
                top: -20px;
                left: -43px;
                bottom: 0;
                font-size: 12px;
                height: 60px;
                width: 100px;
                text-align: center;
                color: #fff;
                line-height: 8;
                transform: rotate(-45deg);
            }

            span.ok {
                background: #34b069;
            }

            span.no {
                background: #d7552f;
            }

            &:hover,
            &.active {
                background: #e3eeff;
                color: #126eff;
                border-right-color: #126eff;
            }
        }
    }

    .rightContent {
        flex: 1;
        width: 0;
        padding: 0 10px;
        background: #fff;
        overflow: hidden;

        .tabCenter {
            height: 100%;
            display: flex;
            flex-direction: column;

            .el-tabs__nav-scroll {
                justify-content: flex-start;
                padding: 0 0 0 50px;
            }
            .el-tabs__item {
                font-size: 14px;
            }

            .el-tabs__content {
                flex: 1;
                height: 100%;

                .el-tab-pane {
                    height: 100%;
                }
            }
        }

    }
}

</style>
