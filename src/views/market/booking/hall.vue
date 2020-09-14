<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-28 13:24:42
 * @FilePath: /jiudian/src/views/market/booking/hall.vue
 -->

<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="会场预订" name="b3">
        <normal :operCheckinType="activeName"></normal>
      </el-tab-pane>
      <el-tab-pane label="会议核销" name="second">
        <c2></c2>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import normal from "@/views/market/reception/checkin/normal";

import c1 from "./venue/c1";
import c2 from "./venue/c2";

export default {
  components: { c1, c2, normal },
  data() {
    return {
      activeName: "b3", //第一个默认启动
    };
  },
  mounted() {
    this.activeName = this.$store.state.taozi.bookingSubName;
  },
  methods: {
    //二级tab切片
    handleClick(tab, event) {
      // console.log(tab.index);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
</style>