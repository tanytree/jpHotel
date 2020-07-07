<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-07 09:50:02
 * @FilePath: /jiudian/src/views/market/booking/list3.vue
 -->

<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="会场预订" name="first"> 
                <c1></c1>
            </el-tab-pane>
            <el-tab-pane label="会议核销" name="second">
                <c2></c2>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import c1 from "./venue/c1";
import c2 from "./venue/c2";

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