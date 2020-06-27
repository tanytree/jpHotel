<!--
 * @Date: 2020-03-10 13:58:24
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-28 16:15:46
 * @FilePath: /cloudAdmin/src/views/sale/order/index.vue
 -->
<template>
  <div id="page1">
    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="会员信息" name="first">
        <Personer   />
      </el-tab-pane>
      <el-tab-pane label="会员申请" name="forth">
        <Aftersale />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Personer from "./saleCustomerSon1";
import Aftersale from "./saleCustomerSon2";

export default {
  components: { Personer, Aftersale },
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
