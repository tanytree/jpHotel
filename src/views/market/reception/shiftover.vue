<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-06 15:15:01
 * @FilePath: /jiudian/src/views/market/reception/list3.vue
 -->

<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="前台交班" name="first"> 
                <c1></c1>
            </el-tab-pane>
            <el-tab-pane label="交班记录" name="second">
                <c2></c2>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import c1 from "./shiftover/c1";
import c2 from "./shiftover/c2";

export default {
  components: { c1, c2},
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