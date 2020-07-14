 <template>
  <div>
    <el-form ref="form" size="mini" :model="form" label-width="120px">
      <div class="headTop">
        <b>申请设置</b>
        <el-button style="float:right" type="primary" @click="saveApply()">保存</el-button>
        <span class="infoBox">
          以下信息3天可修改一次，上次修改时间为：
          <span class="red">{{channel.agent_apply_time}}</span>
        </span>
      </div>

      <el-form-item label="代理入口">
        <el-switch v-model="switchValue"></el-switch>
        <span class="infoBox" v-if="switchValue">关闭后用户将不能再申请成为分销商，也不再享受分销佣金</span>
        <span class="infoBox" v-if="!switchValue">开启后用户可以申请成为分销商，享受佣金奖励</span>
      </el-form-item>
      <el-form-item label="申请条件">
        <el-checkbox-group v-model="form.agent_apply_types">
          <el-checkbox label="1">
            单笔金额超过
            <el-input placeholder="大于0的整数" style="width:220PX" v-model="form.agent_apply_price_one">
              <template slot="append">元</template>
            </el-input>
          </el-checkbox>
          <br />
          <el-checkbox label="2">
            累计消费金额大于
            <el-input placeholder="大于0的整数" style="width:220PX" v-model="form.agent_apply_price">
              <template slot="append">元</template>
            </el-input>
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="合伙人发展代理">
        <el-checkbox v-model="is_partner_agent">开启</el-checkbox>
        <span class="infoBox">开启后合伙人可以通过二维码发展符合上面条件的代理商</span>
        <div>
          <el-checkbox-group v-model="form.partner_agent_types">
            <el-checkbox label="1">访问链接</el-checkbox>
            <el-checkbox label="2">扫描专属二维码</el-checkbox>
          </el-checkbox-group>
          <span class="infoBox">用户再未成为代理商的情况下，符合勾选的任意一个场景即为绑定成功</span>
        </div>
      </el-form-item>
      <el-form-item label="代理商可申请">
        <el-checkbox v-model="is_agent_apply">开启</el-checkbox>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-form ref="form" size="mini" :model="form" label-width="120px">
      <div class="headTop">
        <b>代理方式</b>
        <el-button style="float:right" type="primary" @click="saveRelation()">保存</el-button>
        <span class="infoBox">
          以下信息3天可修改一次，上次修改时间为：
          <span class="red">{{channel.agent_time}}</span>
        </span>
      </div>

      <el-form-item label="代理方式">
        <el-checkbox-group v-model="form.agent_types">
          <el-checkbox label="1">差价代理</el-checkbox>
          <el-checkbox label="2">折扣模式代理（代理价=商品价×折扣比例）</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="扣税方式">
        <el-radio-group v-model="form.agent_tax_type">
          <el-radio :label="1">不扣税</el-radio>
          <el-radio :label="2">扣税</el-radio>
        </el-radio-group>
        <el-form-item label="税费比例">
          <el-input placeholder="请填写" style="width:220PX" v-model="form.agent_tax">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="代理政策">
        <el-checkbox-group v-model="form.agent_models">
          <el-checkbox label="1">只采购</el-checkbox>
          <el-checkbox label="2">代发货</el-checkbox>
        </el-checkbox-group>
        <span class="infoBox">勾选多个时，则代理商采购时可以自主选择代理政策</span>
      </el-form-item>
      <el-form-item label="只采购运费">
        <el-radio-group v-model="form.agent_postage_type_1">
          <el-radio :label="1">免运费</el-radio>
          <el-radio :label="2">固定运费</el-radio>
        </el-radio-group>
        <el-form-item label="运费">
          <el-input placeholder="请填写" style="width:220PX" v-model="form.agent_postage_1">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="代发货运费">
        <el-radio-group v-model="form.agent_postage_type_2">
          <el-radio :label="1">免运费</el-radio>
          <el-radio :label="2">固定运费</el-radio>
        </el-radio-group>
        <el-form-item label="运费">
          <el-input placeholder="请填写" style="width:220PX" v-model="form.agent_postage_2">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-divider></el-divider>
  </div>
</template>
 
 <script>
import { mapState, mapActions } from "vuex";
import { edit_agent_set_info } from "@/utils/api/market";
export default {
  computed: {
    ...mapState({
      channel: state => state.channel,
      agent_apply_type: state => state.channel.agent_apply_type
    })
  },
  watch: {
    agent_apply_type(N, O) {
      console.log(N);
      this.initData();
    }
  },

  data() {
    return {
      switchValue: false,
      is_partner_agent: false,
      lower_users: false,
      lower_reward_status: false,
      is_agent_apply: false,
      form: {
        agent_models: [],
        lower_types: [],
        agent_type: "",
        partner_agent_types: [],
        lower_cos: [],
        agent_apply_types: [],
        agent_types: [],
        apply_time: "",
        lower_reward_type: 1
      }
    };
  },

  methods: {
    initData() {
      this.switchValue = this.channel.status_2 == 1 ? true : false;
      this.is_agent_apply = this.channel.is_agent_apply == 1 ? true : false;
      this.form = Object.assign({}, this.form, this.channel);

      this.form.agent_apply_types = this.form.agent_apply_type.split(",");
      this.form.partner_agent_types = this.form.partner_agent_type.split(",");
      this.form.agent_types = this.form.agent_type.toString().split(",");

      this.form.agent_models = this.form.agent_model.split(",");

      this.is_partner_agent = this.channel.is_partner_agent == 2 ? true : false;
      this.lower_users = this.channel.lower_users == 1 ? true : false;
      this.lower_reward_status =
        this.channel.lower_reward_status == 1 ? true : false;

      this.form.lower_cos = this.form.lower_co.split(",");
    },
    saveApply() {
      edit_agent_set_info({
        type: 4,
        status_2: this.switchValue ? 1 : 2,
        agent_apply_type: this.form.agent_apply_types.join(","),
        agent_apply_price: this.form.agent_apply_price,
        agent_apply_price_one: this.form.agent_apply_price_one,
        is_partner_agent: this.is_partner_agent ? 2 : 1,
        partner_agent_type: this.form.partner_agent_types.join(","),
        is_agent_apply: this.is_agent_apply ? 1 : 2
      }).then(res => this.resultAction(res));
    },

    /**代理方式 */
    saveRelation() {
      edit_agent_set_info({
        type: 5,
        agent_type: this.form.agent_types.join(","),
        agent_model: this.form.agent_models.join(","),
        agent_tax_type: this.form.agent_tax_type,
        agent_tax: this.form.agent_tax,
        agent_postage_1: this.form.agent_postage_1,
        agent_postage_type_1: this.form.agent_postage_type_1,
        agent_postage_type_2: this.form.agent_postage_type_2,
        agent_postage_2: this.form.agent_postage_2
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