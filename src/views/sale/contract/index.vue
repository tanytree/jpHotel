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
                <!-- 单位价格-->
                <UnitPrice v-if="item.path == 'UnitPrice'"/>
                <!-- 单位查询-->
                <UnitQuery v-if="item.path == 'Unitquery'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  import UnitPrice from './unit/unitPrice'
  import UnitQuery from './unit/unitquery'

  export default {
    components: { UnitPrice, UnitQuery },
    data () {
      return {
        activeName: 'first' //第一个默认启动
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
