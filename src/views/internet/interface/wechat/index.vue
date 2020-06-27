<!--
 * @Date: 2020-04-21 12:23:30
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-21 12:36:22
 * @FilePath: /cloudAdmin/src/views/internet/interface/wechat/index.vue
 -->
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="小程序" name="first">
        <miniapp />
      </el-tab-pane>
      <el-tab-pane label="公众号" name="two">
        <official />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import miniapp from "./miniapp";
import official from "./official";
export default {
  components: { official, miniapp },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick() {}
  }
};
</script>

<style>
</style>
