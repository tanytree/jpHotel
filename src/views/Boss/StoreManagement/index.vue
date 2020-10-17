<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-13 09:50:14
 * @FilePath: /jiudian/src/views/Boss/StoreManagement/index.vue
 -->

<template>
  <div id="page1">
    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                     :name="item.path"
                     :key="item.path"
                     v-if="$F.filterThirdMenu('boss', item.path, true)">
            <list />
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import list from "./list";


export default {
  components: { list },
  data() {
    return {
      activeName: ""
    };
  },
  created() {
    if (sessionStorage.subMenul) {
      this.menuList = JSON.parse(sessionStorage.subMenul).childList || [];
      this.$forceUpdate()
    }
    this.activeName = this.$F.filterThirdMenu(null, null, false, true).path;
  },
  mounted() {
    this.activeName = this.$F.filterThirdMenu('boss', 'storeManagement', false, true).path;
  },
  methods: {
    //二级tab切片
    handleClick(tab, event) {
      // console.log(tab.index);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
</style>
