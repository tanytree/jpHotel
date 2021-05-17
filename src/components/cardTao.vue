<!--
 * @Date: 2020-12-24 16:54:56
 * @Author: 陶子
 * @LastEditTime: 2021-01-07 14:12:28
 * @FilePath: \jiudian\src\components\cardTao.vue
-->
<template>
    <!-- 挂账dialog组件-->
    <el-dialog top="0" width="40%" :title="$t('desk.charge')" :visible.sync="paymentVisible" append-to-body>
        <div class="innerBoxTop">
            <span>
                {{$t('desk.home_roomType')}}：{{
                currentRoom.currentRoomData
                ? currentRoom.currentRoomData.roomTypeName
                : currentRoom.roomTypeName
                }}
            </span>
            <span>
                {{$t('desk.home_roomNum')}}：{{
                currentRoom.currentRoomData
                ? currentRoom.currentRoomData.houseNum
                : currentRoom.houseNum
                }}
            </span>
            <span>
                {{$t('desk.customer_livePeople')}}：{{
                currentRoom.currentRoomData
                ? currentRoom.currentRoomData.personList &&
                currentRoom.currentRoomData.personList.length &&
                currentRoom.currentRoomData.personList[0].name
                : currentRoom.personList &&
                currentRoom.personList.length &&
                currentRoom.personList[0].name
                }}
            </span>
        </div>

        <el-form ref="paymentForm" :rules="paymentRules" :model="paymentForm" label-width="110px">
            <el-form-item :label="$t('desk.customer_amountPrice')" prop="payPrice">
                <el-input v-model="paymentForm.payPrice" style="width: 260px"></el-input>
            </el-form-item>
            <el-form-item :label="$t('desk.book_accountWay')" prop="putUp">
                <el-select v-model="paymentForm.putUp" :placeholder="$t('desk.book_chooseAway')" style="width: 260px">
                    <el-option v-for="(item, index) in $t('commons.paymentWay')" :key="index" :value="index" :label="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('desk.customer_buyerUnit')" prop="enterId">
                <el-select v-model="paymentForm.enterId" filterable remote reserve-keyword @change="enterNameChange" style="width: 260px" :placeholder="$t('commons.pleaseEnter')">
                    <el-option v-for="item in hotelenterList" :key="item.id" :value="item.id" :label="item.enterName">
                        {{ item.enterName }}【{{ item.enterPinyin }}】
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('desk.home_note')">
                <el-input type="textarea" v-model="paymentForm.remark" style="width: 260px"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="paymentVisible = false">{{$t("commons.cancel")}}</el-button>
            <el-button type="primary" @click="consume_oper('paymentForm')">{{$t("commons.confirm")}}</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    props: ["detailData", "currentRoom"],
    data() {
        return {
            paymentVisible: false,
            hotelenterList: [], //挂账企业列表
            paymentForm: {
                payPrice: "", //挂账金额
                putUp: "", //挂账方式
                enterId: "", //挂账单位
                priceType: 13, // 13代表挂账
                payType: 0, //挂账无需支付方式
                state: 1, //1未结；2已结
                /////////////
                checkInId: "",
                roomId: "",
                roomNum: "",
            },
        };
    },
    computed: {
        paymentRules() {
            return {
                payPrice: [
                    {
                        required: true,
                        message: this.$t('desk.order_inputMoney'),
                        trigger: "blur",
                    },
                ],
                putUp: [
                    {
                        required: true,
                        message: this.$t('desk.book_chooseAway'),
                        trigger: "change",
                    },
                ],
                enterId: [
                    {
                        required: true,
                        message: this.$t('desk.customer_selectUnit'),
                        trigger: "change",
                    },
                ],
            };
        },
    },
    created() {
        this.hotelenter_list();
    },
    methods: {
        resetVisibel(checkInId) {
            this.paymentForm.checkInId = checkInId;
            this.paymentVisible = true;
            console.log(this.currentRoom);
        },
        consume_oper(formName) {
            if (this.currentRoom.currentRoomData) {
                if (this.currentRoom.currentRoomData.id) {
                    this.paymentForm.roomId = this.currentRoom.currentRoomData.id;
                    this.paymentForm.roomNum = this.currentRoom.currentRoomData.houseNum;
                }
            } else {
                if (this.currentRoom.id) {
                    this.paymentForm.roomId = this.currentRoom.roomId ? this.currentRoom.roomId : this.currentRoom.id;
                    this.paymentForm.roomNum = this.currentRoom.houseNum;
                } else {
                    if (this.detailData.inRoomList.length > 0) {
                        this.paymentForm.roomId = this.detailData.inRoomList[0].id;
                        this.paymentForm.roomNum = this.detailData.inRoomList[0].houseNum;
                    }
                }
            }

            // console.log(this.paymentForm)

            // return

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$F.doRequest(
                        this,
                        "/pms/consume/consume_oper",
                        this.paymentForm,
                        (res) => {
                            this.paymentForm = {
                                payPrice: "", //挂账金额
                                putUp: "", //挂账方式
                                enterId: "", //挂账单位
                                priceType: 13, // 13代表挂账
                                payType: 0, //挂账无需支付方式
                                state: 1, //1未结；2已结
                                /////////////
                                checkInId: "",
                                roomId: "",
                                roomNum: "",
                            };
                            this.paymentVisible = false;
                            this.$message.success(this.$t('desk.book_accountSuccess'));
                            this.$emit("refreshFatherData");
                        }
                    );
                } else {
                    return false;
                }
            });
        },
        enterNameChange(e) {
            console.log(e);
            this.paymentForm.enterId = e;
            this.hotelenterList.forEach((element) => {
                if (e == element.id) {
                    this.paymentForm.creditName = element.enterName;
                }
            });
        },
        /**获取挂账企业 */
        hotelenter_list() {
            let searchForm = {
                id: "",
                state: "",
                shareFlag: "",
                contactName: "",
                contactPhone: "",
                salesId: "",
                startCreditLimit: "",
                endCreditLimit: "",
                paging: false,
                pageIndex: 1,
                pageSize: 10,
            };
            this.loading = true;
            this.$F.doRequest(
                this,
                "/pms/hotelenter/list",
                searchForm,
                (res) => {
                    this.loading = false;
                    console.log(res);
                    this.hotelenterList = res.list;
                }
            );
        },
    },
};
</script>
<style lang="less" scoped>
.innerBoxTop {
    > span {
        margin-right: 40px;
    }

    margin-bottom: 10px;
}
</style>
