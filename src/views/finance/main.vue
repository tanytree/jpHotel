/*
* @Author: Dana 广告管理
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
                <!-- 财务慨览-->
                <incomeStatus v-if="item.path == 'overView'"/>
                <!-- 记一笔-->
                <record v-if="item.path == ''"/>
                <!-- 员工权限-->
                <employeeRights v-if="item.path == 'staff-rights'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  import incomeStatus from './index/incomeStatus'
  import authority from './index/authority'
  import record from './index/record'
  import employeeRights from '@/components/employeeRights'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: { incomeStatus, authority, record, employeeRights },
    data () {
      return {
        activeName: 'overView'
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

<style lang="scss">
    .income {
        height: 100%;
    }

    .bg {

    .el-tab-pane {
        background: #E2E2E2;
        border-radius: 6px;
    }

    }
</style>
