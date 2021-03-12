<!--
 * @Date: 2020-02-15 21:08:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-12 11:27:55
 * @FilePath: \jiudian\src\views\manager\guestCenter\main.vue
 -->
<template>
  <div id="page1" class="boss-index">
    <el-tabs class="pageTab" v-model="activeName">
      <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle" :name="item.path" :key="item.path" v-if="$F.filterThirdMenu('finance', item.path, true)">
        <!-- 楼栋楼层-->
        <BuildingFloor v-if="item.path == 'BuildingFloor'" />
        <!-- 附餐管理 -->
        <MealManager v-if="item.path == 'MealManager'" />
        <!-- 房型维护-->
        <HouseMaintain v-if="item.path == 'HouseMaintain'" />
        <!-- 房屋信息-->
        <RoomNews v-if="item.path == 'RoomNews'" />
        <!-- 房锁维护-->
        <RoomLock v-if="item.path == 'RoomLock'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import HouseMaintain from "./HouseMaintain";
import BuildingFloor from "./BuildingFloor";
import RoomNews from "./RoomNews";
import RoomLock from "./RoomLock";
import MealManager from "./MealManager";
import { mapState, mapActions } from "vuex";
export default {
  components: { HouseMaintain, BuildingFloor, RoomNews, RoomLock, MealManager },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  data() {
    return {
      activeName: "",
    };
  },
  created() {
    this.$F.handleThirdMenu(this);
  },
  activated() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
