<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-13 09:11:55
 * @FilePath: /jiudian/src/views/market/nightaudit/index.vue
 -->

<template>
  <div id="page1" class="boss-index">


      <el-tabs class="pageTab" v-model="activeName">
          <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                       :name="item.path"
                       :key="item.path"
                       v-if="$F.filterThirdMenu('frontOffice', item.path, true)">
              <!-- 首页-->
              <total v-if="item.path == 'total'"/>
              <!-- 应到未到订单-->
              <notyet v-if="item.path == 'notyet'"/>
              <!-- 应离未离订单-->
              <notleaving v-if="item.path == 'notleaving'"/>
              <!-- 走结订单-->
              <leave v-if="item.path == 'leave'"/>
              <!-- 房价预审订单-->
              <verify v-if="item.path == 'verify'"/>
          </el-tab-pane>
      </el-tabs>
<!--    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">-->
<!--      <el-tab-pane label="首页" name="first">-->
<!--        <total @getCurrentItem="getCurrentItem" />-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="应到未到订单" name="second">-->
<!--        <notyet />-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="应离未离订单" name="third">-->
<!--        <notleaving />-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="走结订单" name="four">-->
<!--        <leave />-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="房价预审订单" name="five">-->
<!--        <verify />-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->
  </div>
</template>

<script>
import total from "./total";
import notyet from "./notyet";
import notleaving from "./notleaving";
import leave from "./leave";
import verify from "./verify";

export default {
  components: { total, notyet, notleaving, leave, verify },
  data() {
    return {
      activeName: "" //第一个默认启动
    };
  },
  mounted() {},
  created() {
    this.$F.handleThirdMenu(this);
  },
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
