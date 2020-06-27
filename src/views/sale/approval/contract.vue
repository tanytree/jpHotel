<template>
  <div class="membership-management">
    <!--销售审批-->

    <div class="content">
      <div class="radio">
        <el-radio v-model="radio" label="1">从我的报价中选择</el-radio>
        <el-radio v-model="radio" label="2">手动输入</el-radio>
        <el-radio v-model="radio" label="3">从Excel导入</el-radio>
      </div>
      <div class="btn">
        <el-button type="primary">创建审批</el-button>
        <!--<button>创建审批</button>-->
      </div>
    </div>
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

<style lang="less" scoped>
.membership-management {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
  .radio {
    padding: 20px 0px;
  }
  .tab {
    padding: 20px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    > .el-tabs__item {
      padding: 0px;
      height: 40px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: 40px;
      display: inline-block;
      list-style: none;
      font-size: 14px;
      font-weight: 500;
      color: #303133;
      position: relative;
      justify-content: center;
      text-align: center;
      width: 120px;
    }
    > .el-tabs__item.is-active {
      color: #ffffff;
      background-color: #409eff;
      border-radius: 5px;
      text-align: center;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #ffffff;
    margin-top: 10px;
    border-radius: 10px;
    padding: 20px 20px 0px 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .btn {
      /*padding: 20px 0px;
				button {
					font-size: 15px;
					padding: 10px 20px;
					border: 1px solid #126EFF;
					background-color: #FFFFFF;
					border-radius: 5px;
					color: #126EFF;
				}*/
    }
  }
}
</style>