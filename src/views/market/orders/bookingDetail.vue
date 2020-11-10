<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-09 15:54:59
 * @FilePath: \jiudian\src\views\market\orders\bookingDetail.vue
 -->
<template>
    <div class="boss-index ov-y">
        <div class="el-card" style="height: auto">
            <div class="el-card__header">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/orders?type=booking'}"
                    >{{ $t('desk.order_bookOrder') }}
                    </el-breadcrumb-item
                    >
                    <el-breadcrumb-item>{{ $t('commons.detail') }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="bodyInfo margin-t-10" v-loading="loading">
            <div class="aside">
                <ul>
                    <li @click="isOrder = true; currentRoom = {};" :class="isOrder ? 'active' : ''">
                        <p>{{ $t('desk.order_bookOrderInfo') }}</p>
                    </li>
                    <li v-for="(item, index) of detailData.inRoomList" :key="index" :class="currentRoom.id == item.id ? 'active' : ''" @click="showRoomInfo(item)">
                        <p>{{ item.houseNum }} {{ $t('desk.home_roomType') }}：{{ item.roomTypeName }}</p>
                        <span class="ok" v-if="detailData.checkIn.state <= 2">{{ $t('desk.hadRowHouses') }}</span>
                        <span class="ok" v-if="detailData.checkIn.state > 2">{{ $t('commons.reserveState')[detailData.checkIn.state + ''] }}</span>
                        <span class="no" v-if="!item.roomId">{{ $t('desk.noRowHouses') }}</span>
                    </li>
                </ul>
            </div>
            <div class="rightContent">
                <el-row v-if="isOrder">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane :label="$t('desk.serve_basicInfo')" name="first">
                            <div class="tabWrap">
                                <!-- 基本信息--->
                                <sbase v-if="detailData.checkIn.id" :checkinInfo="detailData.checkIn" :inRoomList="detailData.inRoomList" @baseInfoChange="baseInfoChange"> </sbase>
                            </div>
                        </el-tab-pane>
                        <!--- 客人信息-->
                        <!--            <el-tab-pane :label="$t('desk.order_guestInfo')" name="second">-->
                        <!--              <div class="tabWrap">-->
                        <!--                <customer type="detail" :detailData="detailData"></customer>-->
                        <!--              </div>-->
                        <!--            </el-tab-pane>-->

                        <el-tab-pane :label="$t('desk.financialDetails')" name="third">
                            <div class="tabWrap">
                                <!-- 财务明细--->
                                <finance v-if="detailData.checkIn.id" :detailData="detailData"></finance>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-row>
                <el-row v-else>
                    <roominfo v-if="detailData.checkIn.id && currentRoom.id" :currentRoom="currentRoom" :checkinInfo="detailData.checkIn" @baseInfoChange="baseInfoChange"></roominfo>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import roominfo from "./bookingcoms/roominfo";
import sbase from "./bookingcoms/base";
import customer from "@/components/front/customer";
import finance from "./bookingcoms/finance";
import myMixin from "@/utils/filterMixin";

export default {
    mixins: [myMixin],
    components: {
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
            this.$F.doRequest(this, "/pms/checkin/reserve_check_in_detail", { reserveId: id}, (res) => {
                    this.detailData = res;
                    this.$forceUpdate();
                }
            );
        },
        baseInfoChange(v) {
            this.getDetail(this.id);
        },
        handleClick() {
        },
        showRoomInfo(item) {
            this.isOrder = false;
            console.log(item);
            console.log(this.detailData);
            this.currentRoom = item;
        },
    },
};
</script>

<style scoped>
.detailTab {
    border: 0;
}

.detailTab >>> .el-tabs__header {
    margin: 0;
}
</style>
<style lang="less" scoped>
.bodyInfo {
    height: 80%;
    overflow: hidden;

    .tabWrap {
        padding: 0 20px;
    }

    .aside {
        background: #fff;
        min-height: 800px;
        float: left;
        margin-bottom: -5000px;
        padding-bottom: 5000px;
        width: 280px;
        margin-right: 10px;

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
        padding: 0 10px;
        background: #fff;
        overflow: hidden;
        margin-bottom: -5000px;
        padding-bottom: 5000px;
    }
}

</style>
