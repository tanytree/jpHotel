<!--
 * @Date: 2020-12-04 09:50:32
 * @Author: 陶子
 * @LastEditTime: 2020-12-21 16:58:13
 * @FilePath: \jiudian\src\views\manager\index\consumptionTax.vue
-->
<template>
  <div>
    <el-form
      ref="taxForm"
      :model="taxForm"
      :rules="taxRules"
      label-width="100px"
      inline
    >
      <el-form-item :label="$t('manager.add_taxIn')+':'" prop="consumeTax">
        <el-input
          style="width: 200px"
          size="small"
          v-model.number="taxForm.consumeTax"
          :placeholder="$t('manager.add_maxNum')"
        ></el-input
        ><span style="margin-left: 4px">%</span>
      </el-form-item>
       <el-form-item :label="$t('manager.add_taxOut')+':'" prop="outConsumeTax">
        <el-input
          style="width: 200px"
          size="small"
          v-model.number="taxForm.outConsumeTax"
          :placeholder="$t('manager.add_maxNum')"
        ></el-input
        ><span style="margin-left: 4px">%</span>
      </el-form-item>
      <br/>
      <el-form-item :label="$t('manager.add_serverPrice')+':'" prop="servicePrice">
        <el-input
          style="width: 200px"
          size="small"
          v-model.number="taxForm.servicePrice"
          :placeholder="$t('manager.add_maxNum')"
        ></el-input
        ><span style="margin-left: 4px">%</span>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <div>
      <el-button type="primary" @click="saveInput('taxForm')">{{$t('commons.save')}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      taxForm: {
        consumeTax: "", //in消费税
        outConsumeTax:"",  //out消费税
        servicePrice: "", //服务费
      },
    };
  },
  computed: {
    taxRules() {
      return {
        consumeTax: [
          {
            required: true,
            message: this.$t('commons.mustInput'),
            trigger: "blur",
          },
          {
            type: "number",
            message: this.$t('manager.add_inputNum'),
          },
        ],
         outConsumeTax: [
          {
            required: true,
            message: this.$t('commons.mustInput'),
            trigger: "blur",
          },
          {
            type: "number",
            message: this.$t('manager.add_inputNum'),
          },
        ],
        servicePrice: [
          {
            required: true,
            message: this.$t('commons.mustInput'),
            trigger: "blur",
          },
          {
            type: "number",
            message: this.$t('manager.add_inputNum'),
          },
        ],
      };
    },
  },
  methods: {
    saveInput(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        if(this.taxForm.consumeTax>=0&&this.taxForm.servicePrice>=0&&this.taxForm.outConsumeTax>=0){
           if(this.taxForm.consumeTax<=100&&this.taxForm.servicePrice<=100&&this.taxForm.outConsumeTax<=100){
            this.$F.doRequest(
            this,
            "/pms/hotelparam/manage_consume_tax",
            this.taxForm,
            (res) => {
             this.$message({
             message:this.$t('manager.add_editorSuccess'),
             type:'success'
           })
            }
          );
         }else{
           this.$message({
             message:this.$t('manager.add_moreThanNot'),
             type:'warning'
           })
         }
        }else{
          this.$message({
             message:this.$t('manager.add_inputNumShould'),
             type:'warning'
           })
        }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
