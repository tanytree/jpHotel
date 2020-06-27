<!--
 * @Date: 2020-01-04 15:46:19
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-31 15:52:19
 * @FilePath: /cloudAdmin/src/views/market/channel/fenxiao/ChannelFenxiao.vue
 -->
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="titleName" name="1">
      <channelFenList :pageType="pageType" />
    </el-tab-pane>
    <el-tab-pane :label="titleName+'申请'" name="2">
      <channelFenApply :pageType="pageType" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import channelFenList from "./channelFenList";
import channelFenApply from "./channelFenApply";

export default {
  components: { channelFenList, channelFenApply },
  props: {
    pageType: {
      default: "2"
    }
  },
  data() {
    return {
      titleName: "",
      activeName: "1" //第一个默认启动
    };
  },

  created() {
    let valN = this.pageType;

    if (valN == 2) {
      this.titleName = "分销商";
    } else if (valN == 3) {
      this.titleName = "代理商";
    } else if (valN == 4) {
      this.titleName = "合伙人";
    }
  },
  methods: {}
};
</script>
