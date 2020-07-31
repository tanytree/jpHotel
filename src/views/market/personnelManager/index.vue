<!--
 * @Date: 2020-01-04 15:46:19
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-26 22:22:25
 * @FilePath: /jiudian/src/views/market/personnelManager/index.vue
 -->
<template>
    <el-tabs class="pageTab" v-model="activeName">

        <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                     :name="item.path"
                     :key="item.path"
                     v-if="$F.filterThirdMenu('market', item.path, true)">
            <!-- 人员查询-->
            <Staff v-if="item.path == 'query-staff'"/>
            <!-- 工资查询-->
            <Wage v-if="item.path == 'query-wage'"/>
            <!-- 部门管理-->
            <Department v-if="item.path == 'department-manager'"/>
            <!-- 员工权限-->
            <employeeRights v-if="item.path == 'staff-rights'"/>
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
    data () {
      return {
        menuList: [],
        activeName: '' //第一个默认启动
      }
    },
    created() {
      if (sessionStorage.subMenul) {
        this.menuList = JSON.parse(sessionStorage.subMenul).childList || [];
        this.$forceUpdate()
      }
      this.activeName = this.$F.filterThirdMenu(null, null, false, true).path;
    },
    methods: {}
  }
</script>
