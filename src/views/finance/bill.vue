/*
* @Author: Dana 凭证
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
                <!-- 录凭证-->
                <inputEvidence v-if="item.path == 'inputEvidence'"/>
                <!-- 查凭证-->
                <evidence v-if="item.path == 'evidence'"/>
                <!-- 设置-->
                <setup v-if="item.path == 'setup'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  import inputEvidence from './bill/inputEvidence'
  import evidence from './bill/evidence'
  import setup from './bill/setup'
  export default {
    components: { inputEvidence, evidence, setup },
    data() {
      return {
        activeName: 'inputEvidence'
      }
    },
    created() {
      if (sessionStorage.subMenul) {
        this.menuList = JSON.parse(sessionStorage.subMenul).childList || []
        this.$forceUpdate()
      }
      this.activeName = this.$F.filterThirdMenu(null, null, false, true).path;
    },
    methods: {

    }
  }
</script>

<style lang="scss">

</style>

