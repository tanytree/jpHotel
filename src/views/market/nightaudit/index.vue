<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-04 23:10:49
 * @FilePath: /jiudian/src/views/market/nightaudit/index.vue
 -->

<template>
  <div id="page1">
    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="首页" name="first">
        <list1 @getCurrentItem="getCurrentItem" />
      </el-tab-pane>
      <el-tab-pane label="应到未到订单" name="second">
        <list2 />
      </el-tab-pane>
      <el-tab-pane label="应离未离订单" name="third">
        <list3 />
      </el-tab-pane>
      <el-tab-pane label="走结订单" name="four">
        <list4 />
      </el-tab-pane>
      <el-tab-pane label="房价预审订单" name="five">
        <list5 />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import list1 from "./list1";
import list2 from "./list2";
import list3 from "./list3";
import list4 from "./list4";
import list5 from "./list5";

export default {
  components: { list1, list2, list3, list4, list5 },
  data() {
    return {
      activeName: "first" //第一个默认启动
    };
  },
  mounted() {},
  methods: {
    getCurrentItem(v){
      this.activeName = v
    },
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