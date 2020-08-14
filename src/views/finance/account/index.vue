/*
* @Author: Dana 统计分析管理
* @Date: 2020-03-10 13:45:16
* @Last Modified by: Dana
* @Last Modified time: 2020-03-11 16:59:58
*/
<template>
    <div class="boss-index">
        <el-tabs class="pageTab" v-model="activeName">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                         :name="item.path"
                         :key="item.path"
                         v-if="$F.filterThirdMenu('finance', item.path, true)">
                <!-- 流水账-->
                <accountRun v-if="item.path == 'accountRun'"/>
                <!-- 总账-->
                <ledger v-if="item.path == 'ledger'"/>
                <!-- 明细账-->
                <detailed v-if="item.path == 'detailed'"/>
                <!-- 科目余额表-->
                <balance v-if="item.path == 'balance'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  import detailed from "./detailed";
  import accountRun from "./accountrun";
  import ledger from "./ledger";
  import balance from "./balance";
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {detailed, accountRun, ledger, balance},
    data() {
      return {
        activeName: 'accountRun',
        menuList: [],
      }
    },
    created() {
      if (sessionStorage.subMenul) {
        this.menuList = JSON.parse(sessionStorage.subMenul).childList || []
        this.$forceUpdate()
      }
      this.activeName = this.$F.filterThirdMenu(null, null, false, true).path
    },
    methods: {

    }
  }
</script>

<style lang="scss">

</style>
