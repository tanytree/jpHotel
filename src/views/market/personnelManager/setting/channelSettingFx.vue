 <template>
  <div>
    <el-form ref="form" size="mini" :model="form" label-width="120px">
      <div class="headTop">
        <b>申请设置</b>
        <el-button style="float:right" type="primary" @click="saveApply()">{{ $t('commons.save') }}</el-button>
        <span class="infoBox">
          以下信息3天可修改一次，上次修改时间为：
          <span class="red">{{channel.apply_time}}</span>
        </span>
      </div>

      <el-form-item label="分销入口">
        <el-switch v-model="switchValue"></el-switch>
        <span class="infoBox" v-if="switchValue">关闭后用户将不能再申请成为分销商，也不再享受分销佣金</span>
        <span class="infoBox" v-if="!switchValue">开启后用户可以申请成为分销商，享受佣金奖励</span>
      </el-form-item>
      <el-form-item label="申请条件">
        <el-checkbox-group v-model="form.apply_types">
          <el-checkbox label="1">无条件 (勾选多个条件时，需同时满足；不勾选则全部用户均可申请)</el-checkbox>
          <br />
          <el-checkbox label="2">指定身份</el-checkbox>
          <br />
          <el-checkbox label="3">
            消费次数大于
            <el-input placeholder="大于0的整数" style="width:220PX" v-model="form.apply_number">
              <template slot="append">次</template>
            </el-input>
          </el-checkbox>
          <br />
          <el-checkbox label="4">
            消费金额大于
            <el-input placeholder="大于0的整数" style="width:220PX" v-model="form.apply_price">
              <template slot="append">元</template>
            </el-input>
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="自动成为分销商">
        <el-checkbox v-model="apply_auto">开启 客户满足申请条件后，自动成为分销商</el-checkbox>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-form ref="form" size="mini" :model="form" label-width="120px">
      <div class="headTop">
        <b>下级分销商关系及分佣</b>
        <el-button style="float:right" type="primary" @click="saveRelation()">{{ $t('commons.save') }}</el-button>
        <span class="infoBox">
          以下信息3天可修改一次，上次修改时间为：
          <span class="red">{{channel.lower_time}}</span>
        </span>
      </div>

      <el-form-item label="绑定场景">
        <el-checkbox-group v-model="form.lower_types">
          <el-checkbox label="1">通过链接下单</el-checkbox>
          <el-checkbox label="2">访问链接</el-checkbox>
          <el-checkbox label="3">扫描二维码</el-checkbox>
        </el-checkbox-group>
        <span class="infoBox">用户再未绑定分销商的情况下，符合勾选的任意一个场景即为绑定成功</span>
      </el-form-item>
      <el-form-item label="企业代理商">
        <el-checkbox-group v-model="form.lower_cos">
          <el-checkbox label="1">推荐购买拿奖励</el-checkbox>
          <el-checkbox label="2">购买产品后自动加入他的产品库可修改</el-checkbox>
        </el-checkbox-group>勾选多个时，则企业分销商可以同时享受勾选的权利
      </el-form-item>
      <el-form-item label="个人代理商">
        <el-checkbox v-model="lower_users">推荐购买拿奖励</el-checkbox>
      </el-form-item>
      <el-form-item label="奖励方式">
        <el-radio-group v-model="form.lower_reward_type">
          <el-radio :label="1">奖励现金</el-radio>
          <el-radio :label="2">奖励积分</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div class="formbox">
          <el-form-item label="计算方式">
            <el-radio v-model="lower_reward_status">金额比例 （佣金算法：分账金额×奖励比例）</el-radio>
          </el-form-item>
          <el-form-item label="分账金额">
            <el-radio-group v-model="form.lower_price_type">
              <el-radio :label="1">订单总价</el-radio>
              <el-radio :label="2">实际支付（包含村积分抵扣部分，不包含店铺优惠）</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-divider></el-divider>
    <el-form ref="form" size="mini" :model="form" label-width="120px">
      <div class="headTop">
        <b>结算方式</b>

        <span class="infoBox">
          以下信息3天可修改一次，上次修改时间为：
          <span class="red">{{channel.apply_settle_time}}</span>
        </span>
      </div>

      <el-form-item label="结算方式选择">
        <el-checkbox-group v-model="form.apply_settle_types">
          <el-checkbox label="1">支付宝</el-checkbox>
          <el-checkbox label="2">微信零钱</el-checkbox>
          <el-checkbox label="3">余额</el-checkbox>
          <el-checkbox label="4">银行卡</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

        <el-button  type="primary" @click="setSelllet()">{{ $t('commons.save') }}</el-button>
    </el-form>
  </div>
</template>

 <script>
import { mapState, mapActions } from "vuex";
import { edit_agent_set_info } from "@/utils/api/market";
export default {
  computed: {
    ...mapState({
      channel: state => state.channel,
      apply_price: state => state.channel.apply_price
    })
  },
  watch: {
    apply_price(N, O) {
      console.log(N);
      this.initData();
    }
  },

  data() {
    return {
      switchValue: false,
      apply_auto: false,
      lower_users: false,
      lower_reward_status: false,
      form: {
        apply_types: [],
        lower_types: [],
        apply_settle_types: [],
        lower_cos: [],
        apply_time: "",
        lower_reward_type: 1
      }
    };
  },

  methods: {
    initData() {
      this.switchValue = this.channel.status_1 == 1 ? true : false;
      this.apply_auto = this.channel.apply_auto == 2 ? true : false;
      this.lower_users = this.channel.lower_users == 1 ? true : false;
      this.lower_reward_status =
        this.channel.lower_reward_status == 1 ? true : false;

      this.form = Object.assign({}, this.form, this.channel);
      this.form.apply_types = this.form.apply_type.split(",");
      this.form.lower_types = this.form.lower_type.split(",");

      this.form.lower_cos = this.form.lower_co.split(",");

      this.form.apply_settle_types = this.form.apply_settle_type.split(",");
    },
    saveApply() {
      edit_agent_set_info({
        type: 1,
        status_1: this.switchValue ? 1 : 2,
        apply_auto: this.apply_auto ? 2 : 1,
        apply_number: this.form.apply_number,
        apply_price: this.form.apply_price,
        apply_type: this.form.apply_types.join(",")
      }).then(res => this.resultAction(res));
    },

    /**下级分销商关系 */
    saveRelation() {
      edit_agent_set_info({
        type: 2,
        lower_type: this.form.lower_types.join(","),
        lower_co: this.form.lower_cos.join(","),
        lower_users: this.lower_users ? 1 : 2,
        lower_reward_type: this.form.lower_reward_type,
        lower_reward_status: this.lower_reward_status ? 1 : 2,
        lower_price_type: this.form.lower_price_type
      }).then(res => this.resultAction(res));
    },
    /**结算设置 */
    setSelllet() {
      edit_agent_set_info({
        type: 3,
        apply_settle_type: this.form.apply_settle_types.join(",")
      }).then(res => this.resultAction(res));
    },
    resultAction(res) {
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success",
          duration: 1500,
          onClose: () => {}
        });
      } else {
        this.$message.error(res.message);
      }
    },

    dateFormEdit(type) {
      edit_agent_set_info({
        apply_settle_type: this.form.apply_settle_types.join(","),

        type: type
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
            duration: 1500,
            onClose: () => {}
          });
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>

 <style lang="less">
.infoBox {
  margin-left: 12px;
  color: #999;
  font-size: 12px;
}
.headTop {
  padding: 0 10px 10px;
  b {
    margin-right: 10px;
    font-size: 14px;
  }
  .red {
    color: #d97041;
  }
}
</style>
