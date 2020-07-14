<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-13 17:41:12
 * @FilePath: /jiudian/src/views/market/reception/index.vue
 -->

<template>
  <div id="page1">
    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="入住办理" name="first">
        <checkin />
      </el-tab-pane>
      <el-tab-pane label="前台报表" name="second">
        <reportform />
      </el-tab-pane>
      <el-tab-pane label="前台交班" name="third">
        <shiftover />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import checkin from "./checkin";
import reportform from "./reportform";
import shiftover from "./shiftover";

export default {
  components: { checkin, reportform, shiftover },
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