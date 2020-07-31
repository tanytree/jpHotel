<!--
 * @Date: 2020-01-04 15:46:19
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-14 16:52:29
 * @FilePath: /jiudian/src/views/market/personnelManager/employeeList.vue
 -->
<template>
    <el-tabs class="pageTab" v-model="activeName">
        <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                     :name="item.path"
                     :key="item.path"
                     v-if="$F.filterThirdMenu('employee', item.path, true)">
            <!-- 人员管理-->
            <EmployeeManager v-if="item.path == 'employeeManager'"/>
            <!-- 已离职员工-->
            <Dimission v-if="item.path == 'employeeDimission'"/>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
  import EmployeeManager from '@/components/employee/employeeManager'
  import Dimission from '@/components/employee/dimission'

  export default {
    components: { EmployeeManager, Dimission },
    data () {
      return {
        menuList: [],
        activeName: '' //第一个默认启动
      }
    },

    created () {
      if (sessionStorage.subMenul) {
        this.menuList = JSON.parse(sessionStorage.subMenul).childList || []
        this.$forceUpdate()
      }
      this.activeName = this.$F.filterThirdMenu(null, null, false, true).path
    },
    methods: {}
  }
</script>
