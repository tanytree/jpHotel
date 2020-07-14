<!--
 * @Date: 2020-01-04 15:46:19
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-31 15:47:45
 * @FilePath: /cloudAdmin/src/views/market/channel/index.vue
 -->
<template>
  <el-tabs class="pageTab" v-model="activeName">
    <el-tab-pane label="人员管理" name="1">
      <Peopleman />
    </el-tab-pane>
    <el-tab-pane label="已离职员工" name="2">
      <Dimission />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Peopleman from "./peopleman/peopleman";
import Dimission from "./peopleman/dimission";

export default {
  components: { Peopleman, Dimission },
  data() {
    return {
      activeName: "1" //第一个默认启动
    };
  },

  created() {},
  methods: {}
};
</script>
