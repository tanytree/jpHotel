
<!--

 * @LastEditors: 董林

 * 
 -->
<template>
  <div>
    <el-tabs class="pageTab" v-model="activeName">
      <!-- 房间动态 -->
      <el-tab-pane label="房间动态" name="one">
          <Roomstate />

      </el-tab-pane>
      <!-- 开票申请 -->
      <el-tab-pane label="开票申请" name="two" class="font" style="text-align: center;">
            <Openapply />

      </el-tab-pane>
      <!-- 留言管理 -->
      <el-tab-pane label="留言管理" name="three">

          <Messageman />
      </el-tab-pane>


      <!-- 物品寄存 -->
      <el-tab-pane label="物品寄存" name="four">
          <Goods />


      </el-tab-pane>
      <!-- 员工管理 -->
      <el-tab-pane label="员工管理" name="five">
          <Employee />

      </el-tab-pane>
        



    </el-tabs>
  </div>
</template>

<script>
import Roomstate from "./home/roomstate";
import Openapply from "./home/openapply";
import Messageman from "./home/messageman";
import Goods from "./home/goods";
import Employee from "./home/employee";
export default {
  components: { Roomstate, Openapply, Messageman, Goods,Employee },
  data() {
     return {
      activeName: "one" ,//第一个默认启动
     }
  },
  methods:{

}
};
</script>

<style lang="less" scoped>

</style>