<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-13 17:33:10
 * @FilePath: /jiudian/src/views/market/nightaudit/index.vue
 -->

<template>
  <div id="page1">
    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="首页" name="first">
        <total @getCurrentItem="getCurrentItem" />
      </el-tab-pane>
      <el-tab-pane label="应到未到订单" name="second">
        <notyet />
      </el-tab-pane>
      <el-tab-pane label="应离未离订单" name="third">
        <notleaving />
      </el-tab-pane>
      <el-tab-pane label="走结订单" name="four">
        <leave />
      </el-tab-pane>
      <el-tab-pane label="房价预审订单" name="five">
        <verify />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import total from "./total";
import notyet from "./notyet";
import notleaving from "./notleaving";
import leave from "./leave";
import verify from "./verify";

export default {
  components: { total, notyet, notleaving, leave, verify },
  data() {
    return {
      activeName: "first" //第一个默认启动
    };
  },
  mounted() {},
  methods: {
    getCurrentItem(v){
      this.activeName = v
    },
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