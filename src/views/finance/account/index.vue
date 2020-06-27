<!--
 * @Date: 2020-04-10 10:22:53
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-13 17:48:45
 * @FilePath: /cloudAdmin/src/views/finance/account/index.vue
 -->

<template>
  <div id="page1">
    <el-tabs class="pageTab" v-model="activeName"  >
      <el-tab-pane label="资金状况" name="first">
        <accountzj />
      </el-tab-pane>
      <el-tab-pane label="提现" name="second">
        <accounttx ref="publishRef"   />
      </el-tab-pane>
      <el-tab-pane label="村积分" name="third">
        <accountjf ref="productList"   />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import accountjf from "./accountjf";
import accounttx from "./accounttx";
import accountzj from "./accountzj";

export default {
  components: { accountjf, accounttx, accountzj },
  data() {
    return {
      activeName: "first" //第一个默认启动
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
</style>
