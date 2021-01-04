<!--
 * @Date: 2020-03-10 13:58:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-04 10:33:31
 * @FilePath: \jiudian\src\views\sale\contract\index.vue
 -->
<template>
    <div class="boss-index" id="page1">
        <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                         :name="item.path"
                         :key="item.path"
                         v-if="$F.filterThirdMenu('sale1', item.path, true)">
                <!-- 单位查询-->
                <Unitquery v-if="item.path == 'Unitquery'" isHeader="1"/>
                <!-- 财务查询 -->
                <service v-if="item.path == 'accountingQuery'" souracePage='header'></service>
                <!-- 请款管理 -->
                <bill v-if="item.path == 'accountingManagement'" souracePage='header'></bill>
                <!-- 入账管理 -->
                <accounts v-if="item.path == 'inAccountingManagement'" souracePage='header'></accounts>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

import Unitquery from '@/components/unitManager/com';
import bill from "@/views/market/customer/company/bill";
import accounts from "@/views/market/customer/company/accounts";
import service from "@/views/market/customer/company/service";
// import UnitPrice from '@/components/unitManager/unitList';
// import UnitPrice from './unit/unitPrice'
// import UnitQuery from './unit/unitquery'
  export default {
    components: { Unitquery, bill, accounts, service },
    data () {
      return {
        activeName: ''
      }
    },
    created() {
      if (sessionStorage.subMenul) {
        this.menuList = JSON.parse(sessionStorage.subMenul).childList || [];
        this.$forceUpdate()
      }
      this.activeName = this.$F.filterThirdMenu(null, null, false, true).path;
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
