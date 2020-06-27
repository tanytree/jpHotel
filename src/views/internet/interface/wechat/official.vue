<!--
 * @Date: 2020-04-21 12:33:38
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-21 13:55:16
 * @FilePath: /cloudAdmin/src/views/internet/interface/wechat/official.vue
 -->
<template>
  <div>
    <el-card shadow="never">
      <div style="text-align:center;padding:20px 0 30px">绑定微信公众号</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="never">
            <h5>手动添加公众号</h5>
            <p>手动绑定需同步微信接口，在微信后台，基本设置可以获取appid和appsecret，切记：绑定过程中，一定要注意保持接口参数一致）</p>

            <el-button>
              <router-link to="/bindOfficial">立即添加</router-link>
            </el-button>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <h5>授权添加公众号</h5>
            <p>使用授权登录需认证微信开放平台和全网发布，认证微信开放平台和全网发布教程 微信开放平台设置</p>
            <el-button type="primary" @click="getAuthCode">立即绑定</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    getAuthCode() {
      this.$http({
        url: this.$http.adornUrl("/account/Auth/getLoginpage"),
        method: "post",
        data: this.$http.adornData({
          auth_type: 1
        })
      }).then(res => {
        window.open(res);
      });
    }
  }
};
</script>

<style>
</style>
