<!--
 * @Date: 2020-04-22 11:13:17
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-23 09:49:19
 * @FilePath: /cloudAdmin/src/views/market/promotion/member/components/moduleDetail.vue
 -->
<template>
  <!--统一的编辑和新增 -->
  <el-dialog :close-on-click-modal="false" :visible.sync="visible" :title="editForm.title">
    <el-form label-width="120px">
      <div v-if="id=='1'">
        <el-form-item label="是否能补签">
          <el-radio v-model="editForm.ruleSetting.ifretroactive" :label="0">可补签</el-radio>
          <el-radio v-model="editForm.ruleSetting.ifretroactive" :label="1">暂不可补签</el-radio>
        </el-form-item>
        <el-form-item label="补签扣除积分">
          <el-input v-model="editForm.ruleSetting.deductScore"></el-input>
          <div>用户每补一次签，扣除一次上面设置的补签积分</div>
        </el-form-item>
        <el-form-item label="签到规则">
          <el-input type="textarea" v-model="editForm.ruleSetting.sginRule"></el-input>
        </el-form-item>
      </div>
      <div v-if="id=='2'">
        <el-form-item label="赠送比例">
          <el-input v-model="editForm.ruleSetting.scoreProportion"></el-input>
          <div>实际赠送积分等于商品价格(按照等价换算成积分)×赠送比例，赠送比例越高赠送积分越多。只限于课程和门票预定赠送积分</div>
        </el-form-item>
      </div>
      <div v-if="id=='3'">
        <el-form-item label="积分等价">
          <el-input v-model="editForm.ruleSetting.scoreEquivalence"></el-input>
          <div>积分等价指的是1元人名币可以等价的积分数量</div>
        </el-form-item>
        <el-form-item label="抵扣比例">
          <el-input v-model="editForm.ruleSetting.deductionEquivalence"></el-input>
          <div>即抵扣金额/订单总金额，抵扣比例越高，抵扣金额越多</div>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="editFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

 <script>
export default {
  data() {
    return {
        selected: {},
        visible: false,
        editForm: { id: "" },
        id: 0,
    };
  },
  methods: {
    /**初始化数据 */
    initData(row, id) {
        this.editForm = row || {};
        this.id = id;
        if (id) {
            this.visible = true;
            if (! this.editForm.ruleSetting)
                this.editForm.ruleSetting = {};
            if (typeof(this.editForm.ruleSetting) == 'string') {
                this.editForm.ruleSetting = JSON.parse(this.editForm.ruleSetting);
            }
        }
    },
    /**新增/编辑 数据 */
    editFormSubmit() {
        this.editForm.ruleSetting = JSON.stringify(this.editForm.ruleSetting);
        this.$F.doRequest(this, '/edt/adminsystem/edt_score_rule_save', this.editForm, (data) => {
            this.visible = false;
            this.$message.success('保存成功')
        })
    }
  }
};
</script>

 <style>
</style>
