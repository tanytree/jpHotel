<!--
 * @Date: 2020-03-20 12:12:21
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-13 14:23:40
 * @FilePath: /cloudAdmin/src/views/finance/account/accountzj.vue
 -->
<template>
  <div>
    <el-card>
      <div class="cardhead">信誉保证金，您可以使用余额账户或者其他支付方式缴纳。缴纳信誉保证金，有利于提高您的自身竞争力</div>
      <div class="panBox">
        <div class="panItem">
          <div class="item1">账户余额(元):</div>
          <div class="item2">{{balance}}</div>
          <div class="item3">
            <router-link to="/accountbill">
              <el-button type="primary" plain>余额账单</el-button>
            </router-link>
            <el-button style="margin-left:10px" type="primary" plain @click="toRecharge">充值</el-button>
          </div>
        </div>
        <div style="width:50px"></div>
        <div class="panItem">
          <div class="item1">保证金(元)：</div>
          <div class="item2">
            {{total_price}}
            <el-button plain>缴纳</el-button>
          </div>
          <div class="item3">
            <el-button plain>缴纳记录</el-button>
          </div>
        </div>
      </div>
    </el-card>
    <recharge v-if="showRecharge" ref="rechargeRef" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { get_security_sum, get_balance } from "@/utils/api/finance";
import recharge from "./recharge";
export default {
  components: { recharge },
  data() {
    return {
      showRecharge: false,
      balance: "0.00",
      total_price: "0.00"
    };
  },
  activated() {
    this.getbalance();
  },
  methods: {
    getbalance() {
      get_security_sum().then(res => {
        console.log(res);
        if (res.code == 200) {
          this.total_price = res.data.total_price || "0.00";
        }
        get_balance({ money_type: 2 }).then(res1 => {
          if (res1.code == 200) {
            this.balance = res1.data.balance || "0.00";
          }
        });
      });
    },
    toRecharge() {
      this.showRecharge = true;
      this.$nextTick(() => {
        this.$refs.rechargeRef.initData(this.balance);
      });
    }
  }
};
</script>

<style lang="less">
.cardhead {
  margin-bottom: 30px;
  background-color: #e5f2ff;
  border: 1px solid #126eff;
  padding: 15px 20px;
  color: #969896;
}
.panBox {
  padding: 30px 20px;
  border: 1px solid #e6e6e6;
  display: flex;
  .panItem {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px 30px;
    &:first-child {
      border-right: 1px solid #e6e6e6;
    }
    .item1 {
      font-size: 14px;
      color: #666666;
      line-height: 30px;
    }
    .item2 {
      font-size: 20px;
      color: #000000;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
    }
    .item3 {
      margin-top: 10px;
    }
  }
}
</style>
