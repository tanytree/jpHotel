<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-17 17:04:11
 * @FilePath: \jiudian\src\views\market\customer\companylist.vue
 -->

<template>
  <div class="boss-index">
    <el-tabs v-model="activeName" class="tabCenter" @tab-click="handleClick">
      <el-tab-pane :label="$t('desk.customer_unitManage')" name="first">
        <company footer='footer'></company>
      </el-tab-pane>
       <el-tab-pane :label="$t('desk.customer_accountQuery')" name="five">
        <service souracePage='footer'></service>
      </el-tab-pane>
      <!-- <el-tab-pane :label="$t('desk.customer_receivingQuery')" name="second">
        <collection></collection>
      </el-tab-pane> -->
      <!-- 请款管理 -->
      <el-tab-pane :label="$t('desk.customer_zhangSet')" name="third">
        <bill souracePage='footer'></bill>
      </el-tab-pane>
      <!-- 入账管理 -->
      <el-tab-pane :label="$t('desk.customer_accounting')" name="four">
        <accounts></accounts>
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
      activeName: "first",
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
