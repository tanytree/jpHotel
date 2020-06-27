<!--
 * @Date: 2020-04-21 12:27:24
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-21 12:34:31
 * @FilePath: /cloudAdmin/src/views/internet/interface/index.vue
 -->
<template>
  <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="微信" name="first">
        <wechat/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import wechat from "./wechat/index"
export default {
    components:{wechat},
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick() {}
  }
};
</script>

<style>
</style>
