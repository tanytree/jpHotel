<!--
 * @Date: 2020-01-04 15:46:19
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-14 16:52:29
 * @FilePath: /jiudian/src/views/market/personnelManager/employeeList.vue
 -->
<template>
  <el-tabs class="pageTab" v-model="activeName">
    <el-tab-pane label="人员管理" name="1">
      <Peopleman />
    </el-tab-pane>
    <el-tab-pane label="已离职员工" name="2">
      <Dimission />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Peopleman from "./peopleman/peopleman";
import Dimission from "./peopleman/dimission";

export default {
  components: { Peopleman, Dimission },
  data() {
    return {
      activeName: "1" //第一个默认启动
    };
  },

  created() {},
  methods: {}
};
</script>
