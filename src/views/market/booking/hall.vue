<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-10 17:36:45
 * @FilePath: \jiudian\src\views\market\booking\hall.vue
 -->

<template>
  <div class="boss-index">
      <normal :operCheckinType="activeName"></normal>
<!--    <el-tabs class="tabCenter" v-model="activeName" @tab-click="handleClick">-->
<!--      <el-tab-pane :label="$t('desk.book_venueBook')" name="b3">-->
<!--        -->
<!--      </el-tab-pane>-->
<!--      &lt;!&ndash; <el-tab-pane :label="$t('desk.book_meetVerification')" name="second">-->
<!--        <c2></c2>-->
<!--      </el-tab-pane> &ndash;&gt;-->
<!--    </el-tabs>-->
  </div>
</template>
<script>
import normal from "@/views/market/reception/checkin/normal";

import c1 from "./venue/c1";
import c2 from "./venue/c2";

export default {
  components: { c1, c2, normal },
  data() {
    return {
      activeName: "b3",
    };
  },
  mounted() {
    this.activeName = this.$store.state.taozi.bookingSubName;
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
