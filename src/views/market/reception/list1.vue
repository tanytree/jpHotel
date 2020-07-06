<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-06 09:47:28
 * @FilePath: /jiudian/src/views/market/reception/list1.vue
 -->

<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="普通入住" name="first">
                <list1></list1>
            </el-tab-pane>
            <el-tab-pane label="时租入住" name="second">
                <list2></list2>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import list1 from "./checkin/list1";
import list2 from "./checkin/list2";

export default {
  components: { list1, list2},
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