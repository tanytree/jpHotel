<template>
  <div class>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="分销设置" name="1">
          <channelSettingFx ref="formpaen" />
        </el-tab-pane>
        <el-tab-pane label="代理设置" name="2">
          <channelSettingDl ref="formpaen" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>



<script>
import channelSettingDl from "./channelSettingDl";
import channelSettingFx from "./channelSettingFx";
import { get_agent_set_info } from "@/utils/api/market";

import { mapState, mapActions } from "vuex";
export default {
  components: { channelSettingDl, channelSettingFx },
  data() {
    return {
      switchValue: true,
      activeName: "1",
      showPage: false
    };
  },
  computed: {
    ...mapState({
      channel: state => state.channel,
    
    })
  },

  created() {
    if (!this.channel.id) {
      get_agent_set_info().then(res => {
        if (res.code == 200) {
          this.$store.commit("channel/initMutations", res.data);
        }
      });
    }
  },
  mounted() {},
  methods: {}
};
</script> 
<style scoped>
.cartTit {
  height: 33px;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  text-align: center;
  font-family: PingFangSC-Semibold;
  margin-right: 10px;
}
</style>