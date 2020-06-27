<!--
 * @Date: 2019-12-25 22:12:46
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-24 16:50:44
 * @FilePath: /cloudAdmin/src/views/sale/approval/preSale.vue
 -->
<template>
  <div>
    <el-card>
      <div style="padding:10px 0 30px 0">
        <el-radio-group v-model="radio">
          <el-radio :label="1">从我的报价中选择</el-radio>
          <el-radio :label="2">手动输入</el-radio>
          <el-radio :label="3">从Excel导入</el-radio>
        </el-radio-group>
      </div>
      <el-button size="small" type="primary">创建审批</el-button>
    </el-card>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first", //第一个默认启动
      radio: 1,
      tableData: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>




