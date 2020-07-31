<!--
 * @Date: 2020-03-10 13:58:24
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-28 16:15:46
 * @FilePath: /cloudAdmin/src/views/sale/order/index.vue
 -->
<template>
    <div id="page1">
        <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                         :name="item.path"
                         :key="item.path"
                         v-if="$F.filterThirdMenu('sale', item.path, true)">
                <!-- 中央预定-->
                <Centralres v-if="item.path == 'central-reservation'"/>
                <!-- 员工权限-->
                <EmployeeRights v-if="item.path == 'staff-rights'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  import Centralres from './centralRes'
  import EmployeeRights from '@/components/employeeRights'

  export default {
    components: { Centralres, EmployeeRights },
    data () {
      return {
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
    mounted () {
      let menu = this.$F.filterThirdMenu(null, null, false, true)
      this.activeName = menu.path;
    },
    methods: {
      //二级tab切片
      handleClick (tab, event) {
        console.log(tab, event)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
