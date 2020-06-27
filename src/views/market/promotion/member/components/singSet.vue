<!--
 * @Date: 2020-04-22 14:03:56
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-22 15:35:47
 * @FilePath: /cloudAdmin/src/views/market/promotion/member/components/singSet.vue
 -->
<template>
  <!--统一的编辑和新增 -->
  <el-dialog width="700px" :close-on-click-modal="false" :visible.sync="visible" title="签到送积分" class="signset">
    <el-form label-width="130px" size="small">
      <el-form-item label="每日签到积分">
        <el-input v-model="form.everydayScores"></el-input>
      </el-form-item>
      <el-form-item label="连续签到奖励">
        <el-radio-group v-model="form.successionStatus">
          <el-radio :label="0">开启</el-radio>
          <el-radio :label="1">暂不开启</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-card v-if="form.successionStatus === 0">
        <el-form label-width="100px" size="mini" inline>
          <el-form-item label="连续签到天数">
            <el-input v-model="form.successionDay"></el-input>
          </el-form-item>
          <el-form-item label="奖励积分">
            <el-input v-model="form.successionScores"></el-input>
          </el-form-item>
        </el-form>
        <span>说明：连续签到n天后，第n天开始往后每天奖励y个积分。连续间断（且未补签）则连续天数再从头开始</span>
      </el-card>
      <el-form-item label="累计签到奖励">
        <el-radio-group v-model="form.addStatus">
          <el-radio :label="0">开启</el-radio>
          <el-radio :label="1">暂不开启</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-card v-if="form.addStatus  === 0" style="margin: 10px 0">
        <el-form size="small" label-width="100px" inline>
          <div v-for="(item,index) in form.addScores" :key="index">
            <el-form-item label="累计签到天数">
              <el-input style="width:150px" v-model="item.day"></el-input>
            </el-form-item>
            <el-form-item label="奖励积分">
              <el-input style="width:150px" v-model="item.scores"></el-input>
            </el-form-item>
            <el-button style="float:right" size="small" @click="form.addScores.splice(index, 1 )">删除</el-button>
          </div>
          <el-button class="cancel" size="mini" icon="el-icon-plus" @click="form.addScores.push({})">添加</el-button>
        </el-form>
      </el-card>
      <el-form-item label="特殊节日签到奖励">
        <el-radio-group v-model="form.holidaysStatus">
          <el-radio :label="0">开启</el-radio>
          <el-radio :label="1">暂不开启</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-card v-if="form.holidaysStatus === 0" style="margin: 10px 0">
        <el-form size="small" label-width="100px" inline>
          <div v-for="(item, index) in form.holidaysScores" :key="index">
            <el-form-item label="特殊日期">
              <el-date-picker
                :name="item.day + index"
                style="width:150px"
                v-model="item.day"
                :clearable="false"
                format="yyyy-MM-dd"
                type="date"
                @change="holidaysScoresChange(item, index)"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="奖励积分">
              <el-input style="width:150px" v-model="item.scores"></el-input>
            </el-form-item>
            <el-button style="float:right" size="small" @click="form.holidaysScores.splice(index,1 )">删除</el-button>
          </div>
          <el-button class="cancel" size="mini" icon="el-icon-plus"  @click="form.holidaysScores.push({})">添加</el-button>
        </el-form>
      </el-card>
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
        form: {
            everydayScores: '',  //每日签到积分
            successionScores: '',  //连续签到积分
            successionDay: '',  //连续签到天数
            successionStatus: 1,  //连续敲到状态 0开启 1关闭 int
            addScores: [],  //累计签到积分 String eg[{"day":"20","scores":"100"}]
            addStatus: 1,  //累计签到状态 0开启 1关闭 int
            holidaysScores: [],  //节假日签到积分 String eg[{"day":"05/01","scores":"200"}]
            holidaysStatus: 1,  //节假日签到状态 0开启 1关闭 int
        },
        visible: false,
    };
  },

  methods: {
      holidaysScoresChange(item, index) {
          debugger
      },
      initData(data = {}) {
          this.visible = true;
          this.$F.doRequest(this, '/edt/workuser/user_signup_rule_details', {}, (data) => {
              this.$F.parseObjectBykey(data, 'addScores');
              this.$F.parseObjectBykey(data, 'holidaysScores');
              debugger
              this.$F.merge(this.form, data);
          })
          this.$forceUpdate();
      },
      visClose() {
          this.visible = false;
      },
      editFormSubmit() {
          var params = {};
          this.$F.merge(params, this.form);
          params.addScores = JSON.stringify(this.form.addScores);
          params.holidaysScores = JSON.stringify(this.form.holidaysScores);
          this.$F.doRequest(this, '/edt/workuser/user_signup_rule_save', params, (data) => {
              this.visClose();
              this.$message.success('签到设置成功');
          })
      }
  }
};
</script>

 <style>
   .signset .el-button {
     font-size: 16px;
     border-radius: 8px;
     width: 81px;
   }
</style>
