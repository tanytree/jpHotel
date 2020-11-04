<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-04 16:50:36
 * @FilePath: \jiudian\src\views\market\reception\reportform.vue
 -->

<template>
  <div class="boss-index">
    <el-tabs v-model="activeName" type="card" editable @tab-click="handleClick">
            <el-tab-pane :label="$t('commons.home')" name="first">
                <c1></c1>
            </el-tab-pane>
            <el-tab-pane :label="$t('desk.serve_tableDetailA')" name="second">
                <c2></c2>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import c1 from "./reporting/c1";
import c2 from "./reporting/c2";

export default {
  components: { c1, c2},
  data() {
    return {
      activeName: "first"
    };
  },
  mounted() {},
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
