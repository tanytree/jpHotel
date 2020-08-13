<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-13 09:11:44
 * @FilePath: /jiudian/src/views/market/customer/index.vue
 -->

<template>
  <div id="page1" class="boss-index">
    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="会员管理" name="first">
        <member />
      </el-tab-pane>
      <el-tab-pane label="客史档案" name="second">
        <history />
      </el-tab-pane>
      <el-tab-pane label="外宾管理" name="third">
        <guest />
      </el-tab-pane>
      <el-tab-pane label="单位管理" name="four">
        <company />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import member from "./member";
import history from "./history";
import guest from "./guest";
import company from "./companylist";

export default {
  components: { member, history, guest, company },
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