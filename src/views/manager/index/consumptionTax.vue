<!--
 * @Date: 2020-12-04 09:50:32
 * @Author: 陶子
 * @LastEditTime: 2020-12-04 11:04:36
 * @FilePath: \jiudian\src\views\manager\index\consumptionTax.vue
-->
<template>
  <div>
    <el-form
      ref="taxForm"
      :model="taxForm"
      :rules="taxRules"
      label-width="80px"
    >
      <el-form-item label="消费税:" prop="consumeTax">
        <el-input
          style="width: 200px"
          size="small"
          v-model.number="taxForm.consumeTax"
          placeholder="最大不超过100"
        ></el-input
        ><span style="margin-left: 4px">%</span>
      </el-form-item>
      <el-form-item label="服务费:" prop="servicePrice">
        <el-input
          style="width: 200px"
          size="small"
          v-model.number="taxForm.servicePrice"
          placeholder="最大不超过100"
        ></el-input
        ><span style="margin-left: 4px">%</span>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <div>
      <el-button type="primary" @click="saveInput('taxForm')">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      taxForm: {
        consumeTax: "", //消费税
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
            message: "必须输入",
            trigger: "blur",
          },
          {
            type: "number",
            message: "请输入数字",
          },
        ],
        servicePrice: [
          {
            required: true,
            message: "必须输入",
            trigger: "blur",
          },
          {
            type: "number",
            message: "请输入数字",
          },
        ],
      };
    },
  },
  methods: {
    saveInput(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        if(this.taxForm.consumeTax>=0&&this.taxForm.servicePrice>=0){
           if(this.taxForm.consumeTax<=100&&this.taxForm.servicePrice<=100){
            this.$F.doRequest(
            this,
            "/pms/hotelparam/manage_consume_tax",
            this.taxForm,
            (res) => {
             this.$message({
             message:'编辑成功',
             type:'success'
           })
            }
          );
         }else{
           this.$message({
             message:'最大输入数值不超过100',
             type:'warning'
           })
         }
        }else{
          this.$message({
             message:'输入数值不小于0',
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
