<template>
  <div>
    <el-tabs class="pageTab" v-model="activeName">
      <el-tab-pane label="店铺概况" name="1">
        <Tab6Se1 />
      </el-tab-pane>
      <el-tab-pane label="广告效果" name="2">
        <Tab6Se2 />
      </el-tab-pane>
      <el-tab-pane label="渠道统计" name="3">
        <tab6Se3 />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
 
<script>
import Tab6Se2 from "./tab6Se2";
import Tab6Se1 from "./tab6Se1";
import tab6Se3 from "./tab6Se3";

export default {
  components: { Tab6Se2, Tab6Se1, tab6Se3 },
  data() {
    return {
      input: "",
      currentIndex: "",
      activeName: "1" //第一个默认启动
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background-color: #ffffff;
  padding: 10px;
}
.body-main {
  background-color: #ffffff;
}
.top-status {
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
}
.default {
  padding: 10px;
  font-size: 13px;
  color: #333333;
}
.active {
  padding: 10px;
  font-size: 13px;
  color: #ffffff;
  background-color: #126eff;
  border-radius: 4px;
}

.top-main {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0px 20px;
  background-color: #ffffff;
}
.demo-ruleForm {
  width: 100%;
}
.el-dropdown {
  margin-left: 30px;
}
.top-r {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background-color: #126eff;
  font-size: 14px;
  border-radius: 5px;
  width: 120px;
  height: 40px;
}
.demo-form-inline {
  width: 50%;
  display: inline-flex;
  margin-left: 40px;
}
.line {
  text-align: center;
}
.block {
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.page-all {
  font-size: 12px;
  color: #666666;
  letter-spacing: 2px;
}
.top {
  display: flex;
  background-color: #ffffff;
}
.input {
  width: 150px;
  padding-left: 20px;
  border: none;
  background: #f2f2f2;
  color: #202124;
  font-size: 12px;
  line-height: 35px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.top-xun {
  display: flex;
  align-self: center;
  justify-content: center;
  width: 60px;
  font-size: 12px;
  font-weight: 600;
  background-color: #ffffff;
}
.top-check {
  height: 45px;
  display: flex;
  border-radius: 8px;
  border: 1px solid rgba(153, 153, 153, 1);
}
.top-xun-r {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 34px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  border: 1px solid rgba(18, 110, 255, 1);
  color: rgba(18, 110, 255, 1);
  font-size: 12px;
  font-weight: 600;
}

.delate-item {
  padding: 0px 20px 20px 20px;
}
.delate {
  font-size: 12px;
  color: #333333;
  border-radius: 4px;
  border: 1px solid rgba(220, 220, 220, 1);
  padding: 8px 20px;
}
.delate-select {
  font-size: 10px;
  color: #666666;
  padding-left: 15px;
}
</style>
