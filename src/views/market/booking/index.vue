<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-13 09:11:35
 * @FilePath: /jiudian/src/views/market/booking/index.vue
 -->

<template>
  <div id="page1" class="boss-index">
    <el-tabs class="pageTab noBg" v-model="activeName">
      <el-tab-pane
        v-for="item in menuList"
        :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
        :name="item.path"
        :key="item.path"
        v-if="$F.filterThirdMenu('frontOffice', item.path, true)"
        class="inRoom"
      >
        <!-- 普通预订-->
        <normal v-if="item.path == 'normal'" operCheckinType="b1" />
        <!-- 时租房预订-->
        <normal v-if="item.path == 'hour'" operCheckinType="b2" />
        <!-- 会场预订-->
        <hall v-if="item.path == 'hall'" operCheckinType="b3" />
      </el-tab-pane>
    </el-tabs>
    <!--          <el-tabs class="pageTab" v-model="activeName">-->
    <!--            <el-tab-pane label="普通预订" name="b1">-->
    <!--              <normal :operCheckinType="activeName" />-->
    <!--            </el-tab-pane>-->
    <!--            <el-tab-pane label="时租房预订" name="b2">-->
    <!--              <normal :operCheckinType="activeName" />-->
    <!--            </el-tab-pane>-->
    <!--            <el-tab-pane label="会场预订" name="b3">-->
    <!--              <normal :operCheckinType="activeName"/>-->
    <!--            </el-tab-pane>-->
    <!--          </el-tabs>-->
  </div>
</template>

<script>
import normal from "@/views/market/reception/checkin/normal";
import hall from "./hall";

export default {
  components: { normal, hall },
  data() {
    return {
        menuList: [],
        activeName: "normal",
    };
  },
  mounted() {
  },
  created() {
    this.$F.handleThirdMenu(this);
    for(let i = 0; i < this.menuList.length; i++) {
        if (this.menuList[i].path == 'hour') {
            this.menuList.splice(i, 1)
            break;
        }
    }
  },
  methods: {
    //二级tab切片
    handleClick(tab, event) {
      // console.log(tab.index);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
</style>
