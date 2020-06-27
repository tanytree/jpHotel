<!--
 * @Date: 2020-03-20 12:12:21
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-16 15:04:29
 * @FilePath: /cloudAdmin/src/views/finance/account/accountjf.vue
 -->
<template>
  <div>
    <el-card>
      <div class="monery-point">
        <div class="title">可用村积分</div>
        <div class="money">{{balance}}</div>
        <div class="point-next">
          <el-button @click="$router.push('/billjf')">村积分账单</el-button>
        </div>
        <el-button-group>
          <!-- <el-button type="primary">购买积分</el-button>
          <el-button type="primary">兑换积分</el-button> -->
        </el-button-group>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { get_security_sum, get_balance } from "@/utils/api/finance";
export default {
  data() {
    return {
      balance: "0.00"
    };
  },
  mounted() {
    get_balance({ money_type: 1 }).then(res => {
      if (res.code == 200) {
        this.balance = res.data.balance;
      }
    });
  }
};
</script>

<style lang="less">
.monery-point {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #f5f2f0;
  padding: 30px 0px;
  .title {
    font-size: 15px;
    font-weight: bold;
  }
  .money {
    font-weight: bold;
    font-size: 25px;
    margin: 50px 0px;
  }
  .point-next {
    margin-bottom: 30px;
  }
  .el-button {
    font-size: 18px;
    width: 200px;
    height: 50px;
  }
}
</style>
