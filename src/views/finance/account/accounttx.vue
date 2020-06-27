<!--
 * @Date: 2019-12-25 22:12:46
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-13 17:47:58
 * @FilePath: /cloudAdmin/src/views/finance/account/accounttx.vue
 -->
<template>
  <div>
    <el-card>
      <el-form ref="form" :model="form" label-width="80px" style="padding: 20px 0px;flex: 1;">
        <el-form-item label="提现账户">
          <span>余额账户</span>
        </el-form-item>
        <el-form-item label="提现金额">
          <el-input style="width:200px" v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="到账时间">
          <el-select v-model="form.type" placeholder="请选择到账时间">
            <el-option label="当天到账" value="2"></el-option>
            <el-option label="隔天到账" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对公账户">
          <span>{{company.bank_number}}</span>
        </el-form-item>
        <div class="submit">
          <el-button type="primary" @click="drawCrash">提现</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { withdraw } from "@/utils/api/finance";

export default {
  data() {
    return {
      form: {
        price: "",
        type: ""
      }
    };
  },
  computed: {
    ...mapState({
      company: state => state.company
    })
  },
  methods: {
    drawCrash() {
      withdraw(this.form).then(res => {
        if (res.code == 200) {
          this.$message.success(res.message);
          this.form = {
            price: "",
            type: ""
          };
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //折叠面板
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="less" scoped>
.submit {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  .el-button {
    width: 150px;
  }
}
</style>
