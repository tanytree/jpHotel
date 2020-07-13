<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-13 17:47:42
 * @FilePath: /jiudian/src/views/market/reception/checkin.vue
 -->

<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="普通入住" name="first">
                <normal></normal>
            </el-tab-pane>
            <el-tab-pane label="时租入住" name="second">
                <hour></hour>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import normal from "./checkin/normal";
import hour from "./checkin/hour";

export default {
  components: { normal, hour},
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