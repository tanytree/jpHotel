<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-13 17:37:28
 * @FilePath: /jiudian/src/views/market/booking/index.vue
 -->

<template>
  <div id="page1">
    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="普通预订" name="first">
        <normal />
      </el-tab-pane>
      <el-tab-pane label="时租房预订" name="second">
        <hour />
      </el-tab-pane>
      <el-tab-pane label="会场预订" name="third">
        <hall />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import normal from "./normal";
import hour from "./hour";
import hall from "./hall";

export default {
  components: { normal, hour, hall },
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