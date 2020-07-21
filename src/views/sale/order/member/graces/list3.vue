<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 魏轩
 * @LastEditTime:
 * @FilePath:
 -->

<template>
 <div>
   <el-form :model="ruleForm"  ref="ruleForm" :rules="rules">
      <el-row>
       <div class="header">房价抵扣</div>
        <el-form-item label="是否开启：" prop="house_discount_flag">
         <el-radio-group v-model="ruleForm.house_discount_flag">
             <el-radio label="1">是</el-radio>
             <el-radio label="2">否</el-radio>
         </el-radio-group>
       </el-form-item>
        <el-form-item label="折扣比例：" prop="house_discount_ratio">
          <el-input style="width:200px" v-model="ruleForm.house_discount_ratio"  placeholder="0到1之间的数"></el-input>
          <span style="color:#666666;margin-left:5px;">抵扣金额=实际房费*抵扣比例</span>
        </el-form-item>
      </el-row>

      <el-row>
       <div class="header">会议厅折扣</div>
        <el-form-item label="是否开启：" prop="chamber_discount_flag">
         <el-radio-group v-model="ruleForm.chamber_discount_flag">
             <el-radio label="1">是</el-radio>
             <el-radio label="2">否</el-radio>
         </el-radio-group>
       </el-form-item>
      </el-row>

      <el-row>
       <div class="header">餐费折扣</div>
        <el-form-item label="是否开启：" prop="meeting_discount_flag">
         <el-radio-group v-model="ruleForm.meeting_discount_flag">
             <el-radio label="1">是</el-radio>
             <el-radio label="2">否</el-radio>
         </el-radio-group>
       </el-form-item>
      </el-row>
      <el-row>
       <div class="header">商品费抵扣</div>
        <el-form-item label="是否开启：" prop="shop_discount_flag ">
         <el-radio-group v-model="ruleForm.shop_discount_flag ">
             <el-radio label="1">是</el-radio>
             <el-radio label="2">否</el-radio>
         </el-radio-group>
       </el-form-item>
        <el-form-item label="折扣比例：" prop="shop_discount_ratio">
          <el-input style="width:200px" v-model="ruleForm.shop_discount_ratio" placeholder="0到1之间的数"></el-input>
          <span style="color:#666666">抵扣金额=实际商品费*抵扣比例</span>
        </el-form-item>
      </el-row>
      <el-form-item>
        <el-button type="primary" v-loading="loading" @click="save('ruleForm')">保存</el-button>
      </el-form-item>
   </el-form>
 </div>
</template>
<script>
export default {
  data() {
   return {
     loading: false,
    ruleForm: {
      chamber_discount_flag: "1",
      house_discount_flag: "1",
      house_discount_ratio: "0.22",
      meeting_discount_flag: "2",
      shop_discount_flag: "2",
      shop_discount_ratio: "0.22"
    },
     rules: {
       house_discount_ratio: [
         { required: true, trigger: 'blur' },
       ],
       shop_discount_ratio: [
         { required: true, trigger: 'blur' },
       ]
     },
   }
  },
  mounted () {
    this.$F.doRequest(this, '/pms/hotelparam/discountfind', {}, (res) => {
      this.$F.merge(this.ruleForm, res);
    })
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$F.doRequest(this, '/pms/hotelparam/integraldiscount', this.ruleForm, (res) => {
            this.$message.success('Success')
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
    .header {
        color: rgba(30, 30, 30, 1);
        font-size: 16px;
        font-weight: 800;
    }
</style>
