<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-06 15:15:01
 * @FilePath: /jiudian/src/views/market/reception/list3.vue
 -->

<template>
  <div class="bookOff">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('food.shift.tabs_1')" name="first">
            <c1  ref="c1" ></c1>
        </el-tab-pane>
        <el-tab-pane  :label="$t('food.shift.tabs_2')" name="second">
            <c2  ref="c2"></c2>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import c1 from "./shiftover/c1";
import c2 from "./shiftover/c2";

export default {
  components: { c1, c2},
  data() {
    return {
      activeName: "first"
    };
  },
  mounted() {},
  methods: {
    //二级tab切片
    handleClick(tab, event) {
      console.log(tab.index);
    }
  },
  watch:{
      activeName(val, oldVal){//普通的watch监听
          // console.log(val)
          if(val == 'first'){
              this.$refs.c1.getList();
          }
          // if(val == 'bookOff'){
          //     this.$refs.bookOff[0].getDataList();
          // }
      },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
    .bookOff{background-color: #fff;padding: 20px;}
.bookOff .el-tabs__nav{
    margin-left: 40%;
    .el-tabs__item{
        font-size: 16px;
    }
}
</style>
