<!--
 * @Date: 2020-01-04 15:46:19
 * @LastEditors: 魏轩
 * @LastEditTime:
 * @FilePath:
 -->
<template>
    <el-tabs class="pageTab" v-model="activeName">
        <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                     :name="item.path"
                     :key="item.path"
                     v-if="$F.filterThirdMenu('employee', item.path, true)">
            <!-- 薪酬管理-->
            <salaryAdministration v-if="item.path == 'salaryAdministration'"/>
            <!-- 酬薪设置-->
            <SalarySet v-if="item.path == 'salarySet'"/>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
  import salaryAdministration from './compensationman'
  import SalarySet from './payingset'

  export default {
    components: { salaryAdministration, SalarySet },
    data () {
      return {
        activeName: '',
        menuList: [],
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
