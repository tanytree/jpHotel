<!--
 * @Date: 2020-01-04 15:46:19
 * @LastEditors: 魏轩
 * @LastEditTime:
 * @FilePath:
 -->
<template>
    <el-tabs class="pageTab" v-model="activeName">
        <!--人员查询-->
        <el-tab-pane :label="$F.filterThirdMenu('personnelManager', 'query-staff').thirdMenu" name="query-staff"
                     v-if="$F.filterThirdMenu('personnelManager', 'query-staff', true)">
            <Staff/>
        </el-tab-pane>
        <!--工资查询-->
        <el-tab-pane :label="$F.filterThirdMenu('personnelManager', 'query-wage').thirdMenu" name="query-wage"
                     v-if="$F.filterThirdMenu('personnelManager', 'query-wage', true)">
            <Wage/>
        </el-tab-pane>
        <!--部门管理    -->
        <el-tab-pane :label="$F.filterThirdMenu('personnelManager', 'department-manager').thirdMenu" name="department-manager"
                     v-if="$F.filterThirdMenu('personnelManager', 'department-manager', true)">
            <Department/>
        </el-tab-pane>
        <!--员工权限-->
        <el-tab-pane :label="$F.filterThirdMenu('personnelManager', 'staff-rights').thirdMenu" name="staff-rights"
                     v-if="$F.filterThirdMenu('personnelManager', 'staff-rights', true)">
            <employeeRights/>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
  import Staff from './personnel/staff'
  import Wage from './personnel/wage'
  import Department from './personnel/department'
  import employeeRights from '@/components/employeeRights'

  export default {
    components: { Staff, Wage, Department, employeeRights },
    mounted () {
      this.activeName = this.$F.filterThirdMenu(null, null, false, true).path;
    },
    data () {
      return {
        activeName: '1' //第一个默认启动
      }
    },

    created () {
    },
    methods: {}
  }
</script>
