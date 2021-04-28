<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-28 18:50:18
 * @FilePath: \jiudian\src\views\market\customer\index.vue
 -->

<template>
  <div id="page1" class="boss-index">
    <el-tabs class="pageTab" v-model="activeName" @tab-click='changeSelect'>
      <el-tab-pane
        v-for="item in menuList"
        :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
        :name="item.path"
        :key="item.path"
        v-if="$F.filterThirdMenu('frontOffice', item.path, true)"
      >
        <!-- 会员管理-->
        <member v-if="item.path == 'member'" />
        <!-- 普通用户管理-->
        <history v-if="item.path == 'history'" />
        <!-- 外宾管理-->
        <guest v-if="item.path == 'guest'" />
        <!-- 单位管理-->
        <company v-if="item.path == 'company'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
import member from "./member";
import history from "./history";
import guest from "./guest";
import company from "./companylist";
export default {
  components: { member, history, guest, company },
  data() {
    return {
      activeName: "",
    };
  },
  mounted() {

  },
  created() {
    this.$F.handleThirdMenu(this);
      this.activeName = this.$store.state.taozi.activeName;
  },
  methods: {
    ...mapMutations({
      resetActive:'taozi/resetActive',
    }),
    //二级tab切片
    handleClick(tab, event) {
      // console.log(tab.index);
    },
    changeSelect(){
      this.resetActive(this.activeName)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
</style>
