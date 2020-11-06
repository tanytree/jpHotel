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
                         v-if="$F.filterThirdMenu('sale1', item.path, true)">
                <!-- 单位价格-->
                <Unitquery v-if="item.path == 'Unitquery'" isHeader="1"/>
<!--                &lt;!&ndash; 单位查询&ndash;&gt;-->
<!--                <UnitPrice v-if="item.path == 'UnitPrice'"/>-->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Unitquery from '@/components/unitManager/com';
    // import UnitPrice from '@/components/unitManager/unitList';
  // import UnitPrice from './unit/unitPrice'
  // import UnitQuery from './unit/unitquery'

  export default {
    components: { Unitquery },
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
