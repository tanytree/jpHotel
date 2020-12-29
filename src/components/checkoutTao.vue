<!--
 * @Date: 2020-12-28 10:31:06
 * @Author: 陶子
 * @LastEditTime: 2020-12-29 14:41:48
 * @FilePath: \jiudian\src\components\checkoutTao.vue
-->
  <!-- 结账退房dialog组件-->
  <template>
    <el-dialog top="0" width="60%" title="结账退房" :visible.sync="checkoutVisible" append-to-body>
        <div class="innerBoxTop">
            <span>房型：{{currentRoom.roomTypeName}} </span>
            <span>房间号：{{currentRoom.houseNum}}</span>
            <span>入住人：{{currentRoom.personList && currentRoom.personList[0] && currentRoom.personList[0].name}}</span>
        </div>
        <div class="priceBox">
            <div class="leftPrice" v-if="detailData.totalPrice>0"><span>应收</span>：{{detailData.totalPrice}}</div>
            <div class="leftPrice" v-if="detailData.totalPrice<0"><span>应退</span>：{{-detailData.totalPrice}}</div>
            <div class="centerLine"></div>
            <div class="rightPrcie">
                <div class="rightTop">
                    消费合计：<span class="rightTopNum">{{detailData.consumePrice}}</span>
                </div>
                <div class="rightBottom">
                    付款合计：<span class="RightBottomNum">{{detailData.payPrice}}</span>
                </div>
            </div>
            <div class="lastRight">
                <img src="~@/assets/images/moreThan.png" class="rightTopImg" />
                <div class="hoverBox">
                    <div><span>小计</span><span>¥200；</span></div>
                    <div><span>服务费（15%）</span><span>¥100；</span></div>
                    <div><span>消费税（12%）</span><span>¥100；</span></div>
                    <div><span>温泉税</span><span>¥100；</span></div>
                    <div><span>住宿税</span><span>¥100；</span></div>
                    <div><span>合计</span><span>¥400；</span></div>
                </div>
            </div>
        </div>
        <el-form ref="checkoutForm" :rules="paymentRules" :model="checkoutForm" label-width="110px">
            <el-form-item label="支付方式" prop="resource" v-if="detailData.totalPrice>0">
                <el-radio-group v-model="checkoutForm.resource">
                    <el-radio label="现金"></el-radio>
                    <el-radio label="信用卡"></el-radio>
                    <el-radio label="挂账"></el-radio>
                    <el-radio label="其他"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="退款方式" prop="resource" v-if="detailData.totalPrice<0">
                <el-radio-group v-model="checkoutForm.resource">
                    <el-radio label="现金"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="挂账方式" v-if="checkoutForm.resource == '挂账'" prop="region">
                <el-select v-model="checkoutForm.region" placeholder="请选择活动区域" style="width: 260px">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="挂账单位" v-if="checkoutForm.resource == '挂账'" prop="date1">
                <el-select v-model="checkoutForm.date1" placeholder="请选择活动区域" style="width: 260px">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="优惠金额">
                <el-input v-model="checkoutForm.name" style="width: 260px"></el-input>
            </el-form-item>
            <el-form-item label="金额" prop="name">
                <el-input v-model="checkoutForm.consumePrice" :disabled="true" style="width: 260px"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="checkoutForm.remark"></el-input>
            </el-form-item>
            <el-form-item label-width="40px">
                <el-checkbox v-model="checkoutForm.checked">打印单据</el-checkbox>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right">
            <el-button @click="checkoutVisible = false">取消</el-button>
            <el-button type="primary" @click="checkoutVisible = false">结账并退房</el-button>
        </div>
    </el-dialog>
</template>
  <script>
export default {
    props: ["detailData", "currentRoom"],
    data() {
        return {
            checkoutVisible: false, //内层结账退房dialog
            checkoutForm: {
                consumePrice: null,
                resource: "现金",
            }, //退房结账弹框的表单
        };
    },
    computed: {
        paymentRules() {
            return {
                name: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur",
                    },
                ],
                region: [
                    {
                        required: true,
                        message: "请选择活动区域",
                        trigger: "change",
                    },
                ],
                date1: [
                    {
                        required: true,
                        message: "请选择活动区域",
                        trigger: "change",
                    },
                ],
                resource: [
                    {
                        required: true,
                        message: "请选择活动区域",
                        trigger: "change",
                    },
                ],
            };
        },
    },
    created() {},
    methods: {
        resetVisibel() {
            this.checkoutVisible = true;
            if (this.detailData.totalPrice > 0) {
                this.checkoutForm.consumePrice = this.detailData.totalPrice;
            } else {
                this.checkoutForm.consumePrice = -this.detailData.totalPrice;
            }
            console.log(this.detailData);
            console.log(this.currentRoom);
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
</style>