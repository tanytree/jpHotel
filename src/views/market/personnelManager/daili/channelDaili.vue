<!--
 * @Date: 2020-01-04 15:46:19
 * @LastEditors: 魏轩
 * @LastEditTime: 
 * @FilePath: 
 -->
<template>
  <el-tabs class="pageTab" v-model="activeName">
    <el-tab-pane label="薪酬管理" name="1">
      <Compensationman />
    </el-tab-pane>
    <el-tab-pane label="酬薪设置" name="2">
      <Payingset />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Compensationman from "./compensationman";
import Payingset from "./payingset";

export default {
  components: {Compensationman, Payingset},
  data() {
    return {
      activeName: "1" //第一个默认启动
    };
  },

  created() {},
  methods: {}
};
</script>
