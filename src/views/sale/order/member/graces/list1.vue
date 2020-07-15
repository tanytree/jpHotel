<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 魏轩
 * @LastEditTime:
 * @FilePath: 
 -->

<template>
 <div>
   <el-form :model="ruleForm" ref="ruleForm">
       <el-row>
          <h3>积分换算</h3>
          <el-form-item label="换算比例：" prop="name">
            <el-input style="width:200px" v-model="ruleForm.name"></el-input>
            <span style="color:#666666;margin-left:5px;">积分=金额*换算比例（例如换算比例是100，那么1日元*100=100积分）</span>
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
        },
   }
  },
  methods:{

  }
}
</script>
<style lang="less" scoped>

</style>