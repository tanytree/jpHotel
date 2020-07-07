<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-06 21:14:13
 * @FilePath: /jiudian/src/views/market/booking/index.vue
 -->

<template>
  <div id="page1">
    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="普通预订" name="first">
        <list1 />
      </el-tab-pane>
      <el-tab-pane label="时租房预订" name="second">
        <list2 />
      </el-tab-pane>
      <el-tab-pane label="会场预订" name="third">
        <list3 />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import list1 from "./list1";
import list2 from "./list2";
import list3 from "./list3";

export default {
  components: { list1, list2, list3 },
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