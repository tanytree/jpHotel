<!--
 * @Date: 2020-01-04 15:46:19
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-14 16:52:29
 * @FilePath: /jiudian/src/views/market/personnelManager/employeeList.vue
 -->
<template>
    <el-tabs class="pageTab" v-model="activeName">
        <el-tab-pane label="人员管理" name="employeeManager">
            <EmployeeManager />
        </el-tab-pane>
        <el-tab-pane label="已离职员工" name="dimission">
            <Dimission />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
  import EmployeeManager from "@/components/employee/employeeManager";
  import Dimission from "@/components/employee/dimission";

  export default {
    components: { EmployeeManager, Dimission },
    data() {
      return {
        activeName: "employeeManager"
      };
    },

    created() {},
    methods: {}
  };
</script>
