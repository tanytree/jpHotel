<template>
  <div class="action" v-loading="loading">

    <div class="margin-t-10">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label-width="30px">
          <el-checkbox v-model="outFlag">{{$t('desk.add_toGo')}}</el-checkbox>
        </el-form-item>
        <el-form-item label-width="0">
          <div class="money">
            <div class=" text-red text-size20">
              {{$t('food.common.consumePrice')}} : {{numFormate(orderTax.sum)}}
              <span class="rel showTax">
                <!-- {{orderTax}} -->
                <el-button size="mini" type="primary" icon="el-icon-more" circle></el-button>
                <div class="taxBox text-size14">
                  <div class="item"><span class="w70">{{$t('desk.customer_xiaoJi')}}</span> <span class="text-right">￥{{numFormate(orderTax.total)}}</span> </div>
                  <div class="item"><span class="w70">{{$t('desk.book_serveFee')}} <span class="text-size12">({{orderTax.servicePrice}})</span></span> <span class="text-right">￥{{orderTax.service == 0 ? '0' :numFormate(orderTax.service)}}</span> </div>
                  <div class="item"><span class="w70">{{$t('desk.book_costFee')}} <span class="text-size12">({{orderTax.type}} {{orderTax.tax}})</span> </span> <span class="text-right">￥{{numFormate(orderTax.taxFee)}}</span> </div>
                  <div class="item"><span class="w70">{{$t('desk.book_costFee2')}}（{{orderTax.tax}}）</span><span>¥{{numFormate(orderTax.taxInFee)}}</span></div>
                  <div class="item"><span class="w70">{{$t('desk.serve_heji')}}</span> <span class="text-right">￥{{numFormate(orderTax.sum)}}</span> </div>
                </div>
              </span>
            </div>
          </div>
        </el-form-item>
        <el-form-item v-if="form.billingType == 1" :label="$t('food.reset.member_card')">
          <el-select size="small" v-model="form.memberCard" filterable :placeholder="$t('food.reset.select_member_card')" @change="getMerberInfo">
            <el-option v-for="(item,index) in memberList" :key="index" :label="item.name +'('+ item.mobile +')'" :value="item.memberCard">
            </el-option>
          </el-select>
          <el-button style="margin-left: 10px;" size="small">{{$t('food.common.read_member_card')}}</el-button>
        </el-form-item>

        <el-form-item :label="$t('shop.yhPrice')" v-if="form.billingType == 1">
          <el-input size="small" type="number" v-model="form.preferentialPrice" :placeholder="$t('shop.yhPrice')" style="width: 180px;"></el-input>
        </el-form-item>
        <el-form-item v-if="form.billingType == 1" :label="$t('food.reset.payPrice')">
          ￥{{numFormate(orderTax.sum - form.preferentialPrice)}}
        </el-form-item>
        <el-form-item :label="$t('food.common.billingType')" prop="billingType">
          <el-radio-group v-model="form.billingType" @change="changeBillingType">
            <el-radio :label="1">{{$t('food.billingType.1')}}</el-radio>
            <!-- <el-radio :label="2">{{$t('food.billingType.2')}}</el-radio> -->
            <el-radio :label="3">{{$t('food.billingType.3')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.billingType == 1" :label="$t('food.common.payType')">
          <el-select size="small" v-model="form.payType">
            <el-option :label="$t('food.payType.1')" :value="1"></el-option>
            <el-option :label="$t('food.payType.2')" :value="2"></el-option>
            <el-option label="payments" :value="100"></el-option>
            <!-- <el-option :label="$t('food.payType.3')" :value="3"></el-option>
                            <el-option :label="$t('food.payType.4')" :value="4"></el-option> -->
            <el-option :label="$t('food.payType.5')" :value="4"></el-option>
          </el-select>
        </el-form-item>

        <!-- 使用积分兑换操作，暂时不要 -->
        <!-- <el-form-item v-if="selectMerberInfo.score && selectMerberInfo.score > 0">
                        <el-checkbox v-model="isUseScore">可用{{jfInfo.jf}}积分抵扣{{jfInfo.discount}}日元</el-checkbox>
                    </el-form-item> -->

        <div v-if="form.billingType == 2">
          <el-form-item :label="$t('food.common.select_company')" prop="signEnterId">
            <el-select size="small" v-model="form.signEnterId" filterable :placeholder="$t('food.common.select_company')" @focus="getSignList" @change="getSignInfo">
              <el-option v-for="(item,index) in signList" :key="index" :label="item.enterName +'('+ item.contactPhone +')'" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('food.common.acount_info')" prop="signUserName" class="signUserBox">
            <el-input size="small" placeholder="姓名" v-model="form.signUserName" style="width: 180px;"></el-input>
            <el-select size="small" v-model="form.signIdcardType" :placeholder="$t('food.common.card_type')" style="width: 120px;">
              <el-option :label="$t('food.card_type.1')" :value="1"></el-option>
              <el-option :label="$t('food.card_type.2')" :value="2"></el-option>
            </el-select>
            <el-input size="small" :placeholder="$t('food.common.card_no')" v-model="form.signIdcard" style="width: 180px;"></el-input>
          </el-form-item>
        </div>

        <div v-if="form.billingType == 3">
          <el-form-item :label="$t('food.common.select_room')" prop="signRoomId">
            <el-select size="small" v-model="form.signRoomId" filterable :placeholder="$t('food.common.select_room')" @focus="getSignRoomList" @change="getSignRoomInfo">
              <el-option v-for="(item,index) in romeList" :key="index" :label="item.houseName + '(' + item.houseNum +')'" :value="item.roomId">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item :label="$t('food.common.remark')">
          <el-input type="textarea" :placeholder="$t('desk.home_noteC')" v-model="form.remark" maxlength="200" show-word-limit></el-input>
        </el-form-item>

        <!-- <el-form-item :label="$t('food.common.order_count')">
          <el-input-number size="mini" v-model="form.docCount" :step="1" step-strictly></el-input-number>
        </el-form-item> -->

        <el-form-item>
          <el-checkbox v-model="isPrint">{{$t('food.common.order_print')}}</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
    <el-divider></el-divider>
    <div class="dialog-footer text-right" style="padding: 0 20px;margin:-10px -20px -15px;">
      <el-button size="small" @click="closeDialog">{{$t('food.common.cancel')}}</el-button>
      <el-button type="primary" size="small" @click="submit">{{$t('food.common.pay_order_deal')}}</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixin from "../mixin";
export default {
  props: ["taxInfo"],
  mixins: [mixin],
  data() {
    return {
      loading: false,
      info: {},
      form: {
        orderId: "", //菜品订单id string必填
        realPayPrice: "", //实付金额  Double必填
        payType: 1, //结算方式 1现金 2银行卡  3支付宝 4支票  5会员卡  Integer选填
        remark: "", //备注  String选填
        memberCard: "", //会员卡卡号  String选填
        docCount: 1, //单据份数  Integer选填
        billingType: 1, // 计费类型 1直接结账 2签单到单位 3签单到房间  Integer必填
        signCheckInId: "", // 入住信息id  billingType=3必填  String选填
        signRoomId: "", //房间id
        signHouseNum: "", //房间号
        signEnterId: "", //签单单位id  billingType=2必填 String选填
        signCreditName: "", //签单单位名称  billingType=2必填  String选填
        signUserName: "", //签单用户名  billingType=2必填  String选填
        signIdcardType: "", //签单证件类型 1身份证 2护照  billingType=2必填   Integer选填
        signIdcard: "", //签单证件号码   billingType=2必填 String选填
        scoresDiscount: "", //积分抵扣分值  Integer选填
        scoresPrice: "", //积分抵扣额度  Double选填
        preferentialPrice: "", //优惠额度
      },
      outFlag: false,
      isUseScore: false,
      isPrint: false,
      memberList: [], //会员列表
      selectMerberInfo: {},

      signList: [], //单位列表
      selectSignInfo: {},

      romeList: [], //房间列表
      selectRomeInfo: {},

      score: {
        shop_discount_ratio: "",
        convert: "",
      },
      jfInfo: {
        jf: "",
        discount: "",
      },
      rules: {},
      orderTax: {},
      orderSubList: [],
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),

    //计算实际价格
    getPayPrice() {
      if (this.form.billingType == 1) {
        let consumePrice = this.info.consumePrice;
        let scoresPrice = this.jfInfo.discount;
        let realPayPrice = 0;
        if (this.isUseScore) {
          realPayPrice = parseFloat(consumePrice) - parseFloat(scoresPrice);
        } else {
          realPayPrice = parseFloat(consumePrice);
        }
        // this.form.realPayPrice = parseFloat(realPayPrice) + parseFloat(this.orderTax.taxBefore)
        let p =
          parseFloat(realPayPrice) +
          parseFloat(this.orderTax.taxBefore) +
          parseFloat(this.orderTax.service);
        return p;
      }
    },
  },
  created() {
    //监听是否外带
    this.$watch("outFlag", (val, oldVal) => {
      this.getOrderTax();
    });
  },
  mounted() {},
  methods: {
    intForm() {
      this.form = {
        orderId: "", //菜品订单id string必填
        realPayPrice: "", //实付金额  Double必填
        payType: 1, //结算方式 1现金 2银行卡  3支付宝 4支票  5会员卡  Integer选填
        remark: "", //备注  String选填
        memberCard: "", //会员卡卡号  String选填
        docCount: 1, //单据份数  Integer选填
        billingType: 1, // 计费类型 1直接结账 2签单到单位 3签单到房间  Integer必填
        signCheckInId: "", // 入住信息id  billingType=3必填  String选填
        signRoomId: "", //房间id
        signHouseNum: "", //房间号
        signEnterId: "", //签单单位id  billingType=2必填 String选填
        signCreditName: "", //签单单位名称  billingType=2必填  String选填
        signUserName: "", //签单用户名  billingType=2必填  String选填
        signIdcardType: "", //签单证件类型 1身份证 2护照  billingType=2必填   Integer选填
        signIdcard: "", //签单证件号码   billingType=2必填 String选填
        scoresDiscount: "", //积分抵扣分值  Integer选填
        scoresPrice: "", //积分抵扣额度  Double选填
        preferentialPrice: "",
      };
      outFlag: false,
        (this.score = {
          shop_discount_ratio: "",
          convert: "",
        });

      this.jfInfo = {
        jf: "",
        discount: "",
      };

      this.isUseScore = false;
      this.isPrint = false;
    },

    //订单各种税后价格
    getOrderTax() {
      this.orderTax = this.getTaxInfo(
        this.taxInfo,
        this.orderSubList,
        this.outFlag
      );
    },
    //获取传过来的值
    getInfo(data) {
      this.intForm();
      this.info = data;
      this.orderSubList = data.orderSubList;
      console.log(data.orderSubList);
      this.getOrderTax();
      // console.log(data)
      // this.form.consumePrice =  parseFloat(consumePrice) + parseFloat(this.orderTax.taxBefore)
      this.form.realPayPrice = parseFloat(this.orderTax.sum);
      // console.log(parseFloat( this.info.consumePrice))
      // console.log(parseFloat(this.orderTax.taxBefore))
      // console.log(parseFloat(this.orderTax.service))

      this.form.orderId = data.id;
      // this.form.scoresDiscount = data.scoresDiscount
      // this.form.scoresPrice = data.scoresPrice
      this.getMemberList();
      this.getScoresDiscount();
    },

    //获取积分换算查询
    getScoresDiscount() {
      let params = {
        storesNum: this.storesNum,
        userId: this.userId,
      };
      this.$F.doRequest(this, "/pms/hotelparam/convertfind", params, (res) => {
        this.score.convert = res;
        // console.log(res)
        this.getScoresPrice();
      });
    },

    //获取积分抵扣比例
    getScoresPrice() {
      let params = {
        storesNum: this.storesNum,
        userId: this.userId,
      };
      this.$F.doRequest(this, "/pms/hotelparam/discountfind", params, (res) => {
        this.score.shop_discount_ratio = res.shop_discount_ratio;
        // console.log(res.shop_discount_ratio)
      });
    },

    changeBillingType(value) {
      // console.log(value)
      this.isUseScore = false;
      this.isPrint = false;
    },

    //获取会员列表
    getMemberList() {
      this.loading = true;
      let params = {
        storesNum: "",
        paging: false,
      };
      this.$F.doRequest(this, "/pms/hotelmember/list", params, (res) => {
        this.memberList = res.list;
        this.loading = false;
      });
    },
    //选择会员
    getMerberInfo() {
      let card = this.form.memberCard;
      let list = this.memberList;
      for (let i in list) {
        if (card == list[i].memberCard) {
          this.selectMerberInfo = list[i];
          this.getScore();
          break;
        }
      }
    },

    //计算当前的积分和抵扣金额
    getScore() {
      // console.log(this.isUseScore)
      // if(this.isUseScore){
      let price = this.info.consumePrice;
      let shop_discount_ratio = this.score.shop_discount_ratio;
      let convert = this.score.convert;
      let score = this.selectMerberInfo.score;
      let jf =
        parseFloat(price) *
        parseFloat(convert) *
        parseFloat(shop_discount_ratio); //当前可有用的积分
      // console.log(jf)
      let discount = 0;
      if (score > jf || score == jf) {
        discount = parseFloat(price) * parseFloat(shop_discount_ratio); //当前最大可抵扣金额
        this.jfInfo = {
          jf: jf,
          discount: discount ? discount.toFixed(2) : "",
        };
      } else {
        discount = parseFloat(score) / parseFloat(convert);
        this.jfInfo = {
          jf: score,
          discount: discount ? discount.toFixed(2) : "",
        };
      }
      // console.log(discount)
      this.form.scoresDiscount = this.jfInfo.jf;
      this.form.scoresPrice = this.jfInfo.discount;
      // console.log(this.jfInfo)

      // }
    },

    //获取单位列表
    getSignList() {
      this.loading = true;
      let params = {
        paging: false,
      };
      this.$F.doRequest(this, "/pms/hotelenter/list", params, (res) => {
        this.signList = res.list;
        this.loading = false;
      });
    },

    //获取房间列表
    getSignInfo() {
      let signEnterId = this.form.signEnterId;
      // console.log(signEnterId)
      let list = this.signList;
      let obj = {};
      for (let i in list) {
        if (signEnterId == list[i].id) {
          obj = list[i];
          break;
        }
      }
      // console.log(obj)
      this.form.signEnterId = obj.id; //签单单位名称  billingType=2必填  String选填
      this.form.signCreditName = obj.enterName; //签单单位名称  billingType=2必填  String选填
    },

    //获取房间详情
    getSignRoomList() {
      this.loading = true;
      let params = {};
      params.userId = this.userId;
      params.storesNum = this.storesNum;
      this.$F.doRequest(
        this,
        "/pms/dishes/living_rooms_list",
        params,
        (res) => {
          this.romeList = res.roomListGroup;
          this.loading = false;
        }
      );
    },

    getSignRoomInfo() {
      let signRoomId = this.form.signRoomId;
      let list = this.romeList;
      let obj = {};
      for (let i in list) {
        if (signRoomId == list[i].roomId) {
          obj = list[i];
          break;
        }
      }
      this.form.signCheckInId = obj.checkinId; // 入住信息id  billingType=3必填  String选填
      this.form.signRoomId = obj.roomId; //房间id
      this.form.signHouseNum = obj.houseNum; //房间号
    },
    //提交结账
    submit() {
      if (this.form.payType == 5 && !this.form.remark) {
        this.$message({
          message: this.$t("desk.customer_inputRemarkA"),
          type: "warning",
        });
        return;
      }
      let params = this.form;
      if (params.billingType == 3) {
        this.form.preferentialPrice = "";
      }
      params.realPayPrice = this.orderTax.sum - this.form.preferentialPrice;
      if (params.billingType == 3 && !this.form.signRoomId) {
        // this.alert(-1,'请选择房间');
        this.alert(-1, this.$t("food.common.select_rooms"));
        return false;
      }

      params.consumTaxPrice = this.orderTax.taxFee;
      params.servicePrice = this.orderTax.service;
      if (this.outFlag) {
        params.outFlag = 1;
      } else {
        params.outFlag = 2;
      }
      params.userId = this.userId;
      params.storesNum = this.storesNum;
      console.log(params);
      // return
      this.$F.doRequest(
        this,
        "/pms/dishes/dishes_place_order_pay",
        params,
        (res) => {
          this.alert(200, this.$t("food.reset.success"));
          this.closeDialog();
        }
      );
    },

    closeDialog() {
      this.info = {};
      this.intForm();
      this.$emit("closeDialog");
    },
  },
};
</script>

<style lang="less" scoped>
.money {
  padding: 20px;
  background-color: #fafafa;
}
.el-form-item {
  margin-bottom: 10px;
}
.signUserBox {
  .el-input,
  .el-select {
    vertical-align: top;
    margin: 0 10px 10px 0;
    display: inline-block;
    width: 100px;
  }
}
.rel {
  position: relative;
}
.taxBox {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 3px;
  padding: 15px;
  color: #fff;
  width: 250px;
  position: absolute;
  left: 0;
  top: 50px;
  z-index: 999;
  display: none;
  div {
    padding-bottom: 0px;
    display: flex;
    span {
      display: inline-block;
    }
    .w70 {
      width: 70%;
    }
    .w30 {
      width: 30%;
    }
  }
}

.showTax:hover .taxBox {
  display: block;
}
</style>
