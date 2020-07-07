<!--
 * @Date: 2020-03-10 13:58:24
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-28 16:15:46
 * @FilePath: /cloudAdmin/src/views/sale/order/index.vue
 -->
<template>
  <div id="page1">
    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="会员管理类型" name="first">
        <Personer   />
      </el-tab-pane>
      <el-tab-pane label="会员变更规则" name="second">
        <Aftersale />
      </el-tab-pane>
      <el-tab-pane label="会员价格" name="thirdly">
        <Memberprice />
      </el-tab-pane>
      <el-tab-pane label="会员查询" name="forth">
        <Vipquery />
      </el-tab-pane>
      <el-tab-pane label="积分设置" name="fifth">
        <Intergtal />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Personer from "./member/Personer";
import Aftersale from "./member/changeRules";
import Memberprice from "./member/memberPrice";
import Vipquery  from "./member/vipquery"
import Intergtal from "./member/integtal"

export default {
  components: { Personer, Aftersale,Memberprice,Vipquery,Intergtal },
  data() {
    return {
      activeName: "first" //第一个默认启动
    };
  },
  methods: {
    //二级tab切片
    handleClick(tab, event) {
      console.log(tab, event);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
</style>
