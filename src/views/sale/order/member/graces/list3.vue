<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 魏轩
 * @LastEditTime:
 * @FilePath: 
 -->

<template>
 <div>
   <el-form :model="ruleForm"  ref="ruleForm">
      <el-row>
       <h3>房价抵扣</h3>
        <el-form-item label="是否开启：" prop="resource">
         <el-radio-group v-model="ruleForm.resource">
           <el-radio label="是"></el-radio>
           <el-radio label="否"></el-radio>
         </el-radio-group>
       </el-form-item>
        <el-form-item label="折扣比例：" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name"  placeholder="0到1之间的数"></el-input>
          <span style="color:#666666;margin-left:5px;">抵扣金额=实际房费*抵扣比例</span>
        </el-form-item>
      </el-row>

      <el-row>
       <h3>会议厅折扣</h3>
        <el-form-item label="是否开启：" prop="resource">
         <el-radio-group v-model="ruleForm.resource">
           <el-radio label="是"></el-radio>
           <el-radio label="否"></el-radio>
         </el-radio-group>
       </el-form-item>
      </el-row>

      <el-row>
       <h3>餐费折扣</h3>
        <el-form-item label="是否开启：" prop="resource">
         <el-radio-group v-model="ruleForm.resource">
           <el-radio label="是"></el-radio>
           <el-radio label="否"></el-radio>
         </el-radio-group>
       </el-form-item>
      </el-row> 
      <el-row>
       <h3>商品费抵扣</h3>
        <el-form-item label="是否开启：" prop="resource">
         <el-radio-group v-model="ruleForm.resource">
           <el-radio label="是"></el-radio>
           <el-radio label="否"></el-radio>
         </el-radio-group>
       </el-form-item>
        <el-form-item label="折扣比例：" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0到1之间的数"></el-input>
          <span style="color:#666666">抵扣金额=实际商品费*抵扣比例</span>
        </el-form-item>
      </el-row>
      <el-form-item>
        <el-button type="primary">保存</el-button>
      </el-form-item>
   </el-form>
 </div>
</template>
<script>
export default {
  data() {
   return {
    ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
   }
  },
  methods:{

  }
}
</script>
<style lang="less" scoped>

</style>