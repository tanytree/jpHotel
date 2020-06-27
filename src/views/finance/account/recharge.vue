<!--
 * @Date: 2020-04-10 11:07:38
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-13 15:22:11
 * @FilePath: /cloudAdmin/src/views/finance/account/recharge.vue
 -->
<template>
  <!--统一的编辑和新增 -->
  <el-dialog :close-on-click-modal="false" :visible.sync="visible" title="编辑">
    <el-form label-width="80px" v-if="chargeStep==1">
      <el-form-item label="当前余额">
        <el-input disabled v-model="editForm.balance"></el-input>
      </el-form-item>
      <el-form-item label="充值金额">
        <el-input v-model="editForm.price"></el-input>
      </el-form-item>
      <el-form-item label="付款方式">
        <el-radio-group>
          <el-radio>支付宝</el-radio>
          <el-radio>微信</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="centerBox" v-if="chargeStep==2">
      <p>
        充值金额：
        <b>¥{{editForm.price}}</b>
      </p>
      <img :src="qcodeUrl" alt />
    </div>
    <div v-if="chargeStep==3"></div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" v-if="chargeStep==1" type="primary" @click="editFormSubmit()">下一步</el-button>
      <el-button size="small" v-if="chargeStep==2" type="primary" @click="chargeStep = 1">上一步</el-button>
      <el-button size="small" v-if="chargeStep==1" @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

 <script>
import { get_recharge_info, pay_weixinpc } from "@/utils/api/finance";

export default {
  data() {
    return {
      visible: false,
      editForm: { id: "" },
      chargeStep: 1,
      qcodeUrl: ""
    };
  },
  methods: {
    /**初始化数据 */
    initData(balance) {
      this.editForm = {

        balance: balance,
        price: 0
      };
      this.visible = true;
    },
    /**新增/编辑 数据 */
    editFormSubmit() {

      get_recharge_info(this.editForm).then(res => {
        if (res.code == 200) {
          pay_weixinpc({ id: res.data.id }).then(res1 => {
            if (res1.code == 200) {
              this.qcodeUrl = res1.data.weixin_url;
              this.queryReqult(res.data.id);
            } else {
              this.$message.error(res1.message);
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    queryReqult(id) {
      quertPayInfo({ id: id }).then(res => {
        this.chargeStep = 3;
      });
    }
  }
};
</script>

 <style lang="less">
.centerBox {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  img {
    width: 100px;
    height: 100px;
  }
}
</style>
