<!--
 * @Date: 2020-01-04 16:56:06
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-31 15:05:08
 * @FilePath: /cloudAdmin/src/views/market/channel/detail.vue
 -->
<template>
  <el-dialog title="详情" :visible.sync="visible">
    <el-form size="mini" label-width="110px">
      <el-form-item :label="titleName+'名称'">
        <el-input v-model="dataForm.agent_name"></el-input>
      </el-form-item>
      <el-form-item :label="titleName+'电话'">
        <el-input v-model="dataForm.agent_phone"></el-input>
      </el-form-item>
      <el-form-item :label="titleName+'身份证号'">
        <el-input v-model="dataForm.agent_idcard"></el-input>
      </el-form-item>
      <el-form-item :label="titleName+'公司代码'" v-if="dataForm.co_code">
        <el-input v-model="dataForm.co_code"></el-input>
      </el-form-item>
      <!-- <el-form-item label="分销商等级">
        <el-input v-model="dataForm.level_name"></el-input>
      </el-form-item>-->
      <el-form-item label="消费金额">
        <el-input v-model="dataForm.total_price"></el-input>
      </el-form-item>
      <el-form-item label="消费单数">
        <el-input v-model="dataForm.buy_number"></el-input>
      </el-form-item>
      <el-form-item label="会员等级" v-if="dataForm.menmber_level_name">
        <el-input v-model="dataForm.menmber_level_name"></el-input>
      </el-form-item>
      <el-form-item label="分销商等级名称" v-if="datatypes==2">
        <el-input v-model="dataForm.fen_level_name"></el-input>
      </el-form-item>
      <el-form-item label="代理商等级名称" v-if="datatypes==3">
        <el-input v-model="dataForm.agent_level_name"></el-input>
      </el-form-item>
      <el-form-item label="合伙人等级名称" v-if="datatypes==4">
        <el-input v-model="dataForm.partner_level_name"></el-input>
      </el-form-item>
      <el-form-item label="	上级合伙人" v-if="dataForm.partner_name">
        <el-input v-model="dataForm.partner_name"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    datatypes: ""
  },
  data() {
    return {
      visible: false,
      titleName: "",
      dataForm: {}
    };
  },
  watch: {
    datatypes(valN, valO) {
      if (valN == 2) {
        this.titleName = "分销商";
      } else if (valN == 3) {
        this.titleName = "代理商";
      } else if (valN == 4) {
        this.titleName = "合伙人";
      }
    }
  },
  methods: {
    init(id) {
      this.visible = true;
      this.$http({
        url: this.$http.adornUrl("/market/agent/get_agent_info"),
        method: "post",
        data: this.$http.adornData({ id: id })
      }).then(data => {
        if (data.code == 200) {
          this.dataForm = Object.assign({}, this.dataForm, data.data);
        }
      });
    }
  }
};
</script>

<style>
</style>
