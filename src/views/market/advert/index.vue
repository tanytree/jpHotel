/*
 * @Author: Dana 广告管理
 * @Date: 2020-03-10 13:45:16
 * @Last Modified by: Dana
 * @Last Modified time: 2020-03-11 16:59:58
 */
<template>
  <div>
    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="广告管理" name="first">
        <advertList />
      </el-tab-pane>
      <el-tab-pane label="投放广告" name="second">
        <advertSet v-if="activeName=='second'" />
      </el-tab-pane>
      <el-tab-pane label="村入驻管理" name="thred">
        <groupManage/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import advertList from "./advertList";
import advertSet from "./advertSet";
import groupManage from "./groupManage";
import { mapState, mapActions } from "vuex";


export default {
  components: { advertList, advertSet,groupManage },
  data() {
    return {
      input: "",
      currentIndex: "",
      form: {
        //选择时间
        date1: "",
        date2: ""
      },
      formInline: {
        user: "",
        region: ""
      },
      activeName: "first",
      currentPage1: 1,
      tableData: [
        {
          haonumber: "29067474098237893",
          builddate: "2016-05-03",
          way: "分期(3期)",
          press: "甲方90%",
          bossName: "全购网络科技有限公司",
          allmoney: "999999.00",
          paymoney: "888888.00"
        },
        {
          haonumber: "29067474098237893",
          builddate: "2016-05-03",
          way: "分期(3期)",
          press: "甲方90%",
          bossName: "全购网络科技有限公司",
          allmoney: "999999.00",
          paymoney: "888888.00"
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 切换
    change(index) {
      let that = this;
      that.currentIndex = index;
    },
    // 查询
    onSubmit() {
      console.log("submit!");
    },
    //二级tab切片
    handleClick(tab, event) {
      console.log(tab, event);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background-color: #ffffff;
  padding: 10px;
}
/* 切片2 */
.demo-second {
  display: flex;
  justify-content: space-between;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
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
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 20px 20px;
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
/* 搜索 */

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
/* end */
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
/* 已选 */
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
/* end */
</style>
