<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-13 17:21:17
 * @FilePath: /jiudian/src/views/market/customer/companylist.vue
 -->

<template>
  <div class="boss-index">
    <el-tabs v-model="activeName" class="tabCenter" @tab-click="handleClick">
      <el-tab-pane label="单位管理" name="first">
        <company></company>
      </el-tab-pane>
      <el-tab-pane label="收款查询" name="second">
        <collection></collection>
      </el-tab-pane>
      <el-tab-pane label="账套管理" name="third">
        <bill></bill>
      </el-tab-pane>
      <el-tab-pane label="账务处理" name="four">
        <accounts></accounts>
      </el-tab-pane>
      <el-tab-pane label="账务查询" name="five">
        <service></service>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import company from "@/components/unitManager/com";
import collection from "./company/collection";
import bill from "./company/bill";
import accounts from "./company/accounts";
import service from "./company/service";

export default {
  components: { company, collection, bill, accounts, service },
  data() {
    return {
      activeName: "first", //第一个默认启动
    };
  },
  mounted() {},
  methods: {
    //二级tab切片
    handleClick(tab, event) {
      // console.log(tab.index);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
