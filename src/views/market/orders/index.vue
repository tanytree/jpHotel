<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-13 09:12:02
 * @FilePath: /jiudian/src/views/market/orders/index.vue
 -->

<template>
  <div id="page1" class="boss-index">

      <el-tabs class="pageTab" v-model="activeName">
          <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                       :name="item.path"
                       :key="item.path"
                       v-if="$F.filterThirdMenu('frontOffice', item.path, true)">
              <!-- 预订单-->
              <booking v-if="item.path == 'booking'"/>
              <!-- 订单查询-->
              <order v-if="item.path == 'order'"/>
              <!-- 赔偿记录-->
              <compensate v-if="item.path == 'compensate'"/>
          </el-tab-pane>
      </el-tabs>
<!--    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">-->
<!--      <el-tab-pane label="预订单" name="first">-->
<!--        <booking />-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="订单查询" name="second">-->
<!--        <order />-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="赔偿记录" name="third">-->
<!--        <compensate />-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->
  </div>
</template>

<script>
import booking from "./booking";
import order from "./orderlist";
import compensate from "./compensate";

export default {
  components: { booking, order, compensate },
  data() {
    return {
      activeName: "" //第一个默认启动
    };
  },
  created() {
    this.$F.handleThirdMenu(this);
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
<style lang="scss">

</style>
