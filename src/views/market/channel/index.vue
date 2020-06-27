<!--
 * @Date: 2020-01-04 15:46:19
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-31 15:47:45
 * @FilePath: /cloudAdmin/src/views/market/channel/index.vue
 -->
<template>
  <el-tabs class="pageTab" v-model="activeName">
    <el-tab-pane label="分销商" name="1">
      <ChannelFenxiao pageType="2" />
    </el-tab-pane>
    <el-tab-pane label="代理商" name="2">
      <channelFenxiao pageType="3" />
    </el-tab-pane>
    <el-tab-pane label="分销/代理设置" name="3">
      <channelSetting />
    </el-tab-pane>
    <el-tab-pane label="合伙人" name="4">
      <channelFenxiao pageType="4" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import ChannelFenxiao from "./fenxiao/channelFenxiao";
import channelDaili from "./daili/channelDaili";
import channelHehuo from "./hehuo/channelHehuo";
import channelSetting from "./setting/channelSetting";

export default {
  components: { channelDaili, ChannelFenxiao, channelSetting, channelHehuo },
  data() {
    return {
      activeName: "1" //第一个默认启动
    };
  },

  created() {},
  methods: {}
};
</script>
