<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-03 11:57:31
 * @FilePath: \jiudian\src\views\market\orders\coms\sideOrder.vue
 -->
<template>
    <el-dialog top="0" :title="$t('desk.side_sideBooked')" :visible.sync="visible" :lock-scroll="false" width="50%">
        <div class="topBox">
            <span>房间号：{{ currentRoom2.houseNum }}</span><span>入住人：{{ detailData.checkIn.name }}</span>
        </div>
        <div class="title_one">预订时选择的套餐：</div>
        <div class="flexBox" v-for="data in tableData" :key="i">
            <div class="name">{{ data.name }}</div>
            <div class="breakfast">{{ $t('manager.hk_breakfast') }}-{{ data.mealName ? `【${data.mealName}￥ ${data.mealPrice} 】` : $t('manager.hk_toward_malu')}}</div>
            <div class="dinner">{{ $t('manager.hk_dinner') }}-{{ data.mealNameDinner ? `【${data.mealNameDinner}￥ ${data.mealPriceDinner} 】` : $t('manager.hk_toward_malu')}}</div>
        </div>
        <div class="title_one" style="margin-bottom:10px">入账附餐：</div>
        <el-form :model="sideForm" ref="sideForm" label-width="100px" style="margin-left:-30px;" class="demo-ruleForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="收费套餐:" prop="region">
                        <el-select v-model="sideForm.attachMealId" size="small" @change="hotelattaChmealChange">
                            <el-option v-for="item in hotelattaChmealList" :key="item.id" :label="item.mealName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label-width="10px">
                        <el-input-number size="small" v-model="sideForm.attachMealCount" :min="1" @change="attachMealCountChange"></el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item :label="$t('desk.customer_sum') + ':'" prop="desc">
                    <el-input disabled v-model="sideForm.consumePrice" size="small" style="width:120px"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item :label="$t('desk.home_note') + ':'" prop="desc">
                    <el-input type="textarea" v-model="sideForm.remark" style="width:350px"></el-input>
                </el-form-item>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible=false">{{ $t('commons.close') }}</el-button>
            <el-button type="primary" @click="consumeOper">{{$t('desk.enterAccount')}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
import myMixin from "@/utils/filterMixin";

export default {
    mixins: [myMixin],
    props: ["detailData", "currentRoom"],
    data() {
        return {
            currentHotelAttaChameal: {},
            currentRoom2: {},
            roomId: '',
            hotelattaChmealList: [],
            visible: false,
            sideForm: {
                priceType: '1', //项目类型 需要确定
                payType: '1',  //结算方式 1现金 2银行卡 3支付宝 4微信 5会员卡  7信用卡 0其他类型（比如挂账和免单等无需支付类型）
                consumePrice: 0,
                attachMealId: '',
                attachMealCount: 1,
                roomId: '',
                roomNum: '',
                remark: '',
            },
            checkInId: "",

            tableData: [],
        };
    },
    created() {
        this.fetchHotelattaChmealList();
    },
    methods: {
        init(checkInId) {
            console.log(this.currentRoom);
            this.currentRoom2 = this.currentRoom;
            //如果没有当前房间 默认到主账房
            if (this.currentRoom && this.currentRoom.roomId ) {
                this.roomId = this.currentRoom.roomId;
            } else {
                this.currentRoom2 = this.detailData.inRoomList[0];
                this.roomId = this.detailData.inRoomList[0].roomId;
            }
            this.checkInId = checkInId;
            this.getData();
            this.visible = true;
        },
        clickDelete() {
            this.$confirm(
                this.$t("manager.grsl_ifSureDeleteA"),
                this.$t("commons.tip_desc"),
                {
                    confirmButtonText: this.$t("commons.confirm"),
                    cancelButtonText: this.$t("commons.cancel"),
                    type: "warning",
                }
            ).then(() => {}).catch(() => {});
        },

        //加载附餐记录
        getData() {
            let params = {
                checkInId: this.checkInId,
            };
            this.$F.doRequest(this, "/pms/hotelattachmeal/check_in_meal_order_list", params,
                (res) => {
                    this.tableData = res.filter((item) => {
                        return item.roomId == this.currentRoom2.roomId;
                    }) || []
                    this.$forceUpdate();
                }
            );
        },

        consumeOper(params = {}) {
            if (!this.currentHotelAttaChameal.id) {
                return this.$message({
                    type: 'warning',
                    message: this.$t('commons.request_success'),
                });
            }
            params = this.sideForm;
            params.checkInId = this.checkInId;
            params.roomId = this.currentRoom2.roomId;
            params.roomNum = this.currentRoom2.houseNum;
            params.state = 1;
            params.priceType = this.currentHotelAttaChameal.mealTime == 1 ? 17 : 18;
            debugger
            this.$F.doRequest(this, "/pms/consume/consume_oper", params, (res) => {
                this.visible = false;
                this.$emit('getOrderDetail');
            });
        },

        //加載早餐晚餐
        fetchHotelattaChmealList() {
            this.$F.doRequest(this,
                "/pms/hotelattachmeal/list",
                {
                    pageIndex: 1,
                    pageSize: 999,
                    state: 1, //1启用 2禁用
                },
                (res) => {
                    res.list.sort((a, b)=> {
                        if (a.mealTime < b.mealTime) {return -1;}if (b.mealTime < a.mealTime) {return 1;}return 0;
                    })
                    res.list.forEach(item => {
                        item.mealName = (item.mealTime == 1 ? this.$t('manager.hk_breakfast') : this.$t('manager.hk_dinner'))+ '-' + item.mealName;
                    })
                    this.hotelattaChmealList = res.list;
                    this.$forceUpdate();
                }
            );
        },

        attachMealCountChange() {
            if (this.currentHotelAttaChameal.id) {
                this.sideForm.consumePrice = this.currentHotelAttaChameal.mealPrice * this.sideForm.attachMealCount;
            }
        },

        hotelattaChmealChange(id) {
            let node = this.hotelattaChmealList.filter((item) => {
                return item.id == id;
            })[0];
            this.currentHotelAttaChameal = node;
            this.sideForm.consumePrice = node.mealPrice * this.sideForm.attachMealCount
        },
    },
};
</script>

<style lang='less' scoped>
.topBox {
    margin-top: -16px;

    span {
        &:nth-last-child(-n + 1) {
            margin-left: 50px;
        }
    }
}

.title_one {
    font-weight: 600;
    margin-top: 15px;
}

.flexBox {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 12px;

    .name {
        width: 120px;
    }

    .breakfast {
        width: 200px;
    }

    .dinner {
        width: 200px;
    }
}

.dialog-footer {
    text-align: center;
}
</style>
