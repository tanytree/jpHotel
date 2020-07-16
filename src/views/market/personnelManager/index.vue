<!--
 * @Date: 2020-01-04 15:46:19
 * @LastEditors: 魏轩
 * @LastEditTime:
 * @FilePath:
 -->
<template>
  <el-tabs class="pageTab" v-model="activeName">
    <el-tab-pane label="人员查询" name="1">
      <Staff />
    </el-tab-pane>
    <el-tab-pane label="工资查询" name="2">
      <Wage />
    </el-tab-pane>
    <el-tab-pane label="部门管理" name="3">
      <Department />
    </el-tab-pane>
    <el-tab-pane label="员工权限" name="4">
      <employeeRights />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Staff from "./personnel/staff";
import Wage from "./personnel/wage";
import Department from "./personnel/department";
import employeeRights from "@/components/employeeRights";

export default {
  components: { Staff, Wage, Department, employeeRights },
  data() {
    return {
      activeName: "1" //第一个默认启动
    };
  },

  created() {},
  methods: {}
};
</script>
