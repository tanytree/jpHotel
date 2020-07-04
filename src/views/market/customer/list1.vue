<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-04 15:27:33
 * @FilePath: /jiudian/src/views/market/customer/list1.vue
 -->

<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="会员信息管理" name="first">
                <info></info>
            </el-tab-pane>
            <el-tab-pane label="积分查询" name="second">
                <points></points>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import info from "./vip/info";
import points from "./vip/points";

export default {
  components: { info, points},
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