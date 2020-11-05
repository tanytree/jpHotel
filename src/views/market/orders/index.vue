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
              <bookingList v-if="item.path == 'booking'" ref="booking"/>
              <!-- 订单查询-->
              <order v-if="item.path == 'order'" ref="order"/>
              <!-- 赔偿记录-->
              <compensate v-if="item.path == 'compensate'" ref="compensate"/>
<!--              <mainView v-show="mainShow" ref="mainView"/>-->
          </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import bookingList from "./bookingList";
import order from "./orderlist";
import compensate from "./compensate";
import mainShow from '@/components/main/mainView'

export default {
  components: { bookingList, order, compensate, mainShow },
  data() {
    return {
        mainShow: false,
      activeName: ""
    };
  },
  created() {
      // debugger
      // let menuList = JSON.parse(sessionStorage.subMenul) || [];
      // this.$refs.mainView.resetMenu(menuList);
      this.$F.handleThirdMenu(this);
      let type = this.$route.query.type;
      if (type) {
          this.activeName = type || 'booking';
      }
  },
  mounted() {
      // let type = this.$route.query.type;
      // debugger
      // this.activeName = type || 'booking';
  },
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
