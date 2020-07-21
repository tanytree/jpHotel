<!--
 * @Date: 2020-03-10 13:58:24
 * @LastEditors:魏轩
 * @LastEditTime:
 * @FilePath:
 -->
<template>
  <div id="page1">
    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="会员类型管理" name="first">
        <Personer :memberTypeList="memberTypeList"/>
      </el-tab-pane>
      <el-tab-pane label="会员变更规则" name="second">
        <Aftersale :memberTypeList="memberTypeList" />
      </el-tab-pane>
      <el-tab-pane label="会员价格" name="thirdly">
        <Memberprice  :memberTypeList="memberTypeList"/>
      </el-tab-pane>
      <el-tab-pane label="会员查询" name="forth">
        <Vipquery  :memberTypeList="memberTypeList"/>
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
      memberTypeList: [],
      activeName: "first" //第一个默认启动
    };
  },

  mounted() {
    this.getMemberTypeList();
  },

  methods: {
    //二级tab切片
    handleClick(tab, event) {
      this.getMemberTypeList();
    },

    getMemberTypeList() {
      this.$F.doRequest(this, '/pms/membertype/list', {pageIndex: 1, pageSize: 10, paging: false}, (res) => {
        this.memberTypeList = res.list;
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
</style>
