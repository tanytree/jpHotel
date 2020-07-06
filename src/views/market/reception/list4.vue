<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-04 21:31:29
 * @FilePath: /jiudian/src/views/market/customer/list4.vue
 -->

<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="单位管理" name="first">
                <c1></c1>
            </el-tab-pane>
            <el-tab-pane label="收款查询" name="second">
                <c2></c2>
            </el-tab-pane>
            <el-tab-pane label="账套管理" name="third">
                <c3></c3>
            </el-tab-pane>
            <el-tab-pane label="账务处理" name="four">
                <c4></c4>
            </el-tab-pane>
            <el-tab-pane label="服务查询" name="five">
                <c5></c5>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import c1 from "./company/c1";
import c2 from "./company/c2";
import c3 from "./company/c3";
import c4 from "./company/c4";
import c5 from "./company/c5";

export default {
  components: { c1, c2,c3,c4,c5},
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