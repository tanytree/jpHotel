<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-13 09:12:02
 * @FilePath: /jiudian/src/views/market/orders/index.vue
 -->

<template>
  <div id="page1" class="boss-index">
    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="预订单" name="first">
        <booking />
      </el-tab-pane>
      <el-tab-pane label="订单查询" name="second">
        <order />
      </el-tab-pane>
      <el-tab-pane label="赔偿记录" name="third">
        <compensate />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import booking from "./booking";
import order from "./orderlist";
import compensate from "./compensate";

export default {
  components: { booking, order, compensate },
  data() {
    return {
      activeName: "first" //第一个默认启动
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