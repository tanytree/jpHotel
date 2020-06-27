<!--
 * @Date: 2020-04-21 12:32:13
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-30 11:37:07
 * @FilePath: /cloudAdmin/src/views/internet/interface/wechat/miniapp.vue
 -->
<template>
  <div>
    <el-card shadow="never">
      <div style="text-align:center;padding:20px 0 30px">绑定微信小程序</div>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="never">
            <h5>已有小程序</h5>
<!--            <p>为保证所有功能的正常使用，授权时请把所有权限统一授权给云管理</p>-->
            <!-- <el-button type="primary" @click="getAuthCode">立即绑定</el-button> -->
            <a :href="ursl">立即绑定</a>
            <!-- <div v-html="elementHtml"></div> -->
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <h5>已有小程序</h5>
            <p>请在微信公众平台申请新的小程序，或者由我们代申请，点击下方按钮进行选择操作</p>
            <el-button>立即申请</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ursl:""
    };
  },
  created() {
    this.getAuthCode()
  },
  methods: {
    getAuthCode() {
      this.$http({
        url: this.$http.adornUrl("/account/Auth/getLoginpage"),
        method: "post",
        data: this.$http.adornData({
          auth_type: 2
        })
      }).then(res => {
       this.ursl=res;

      });
    }
  }
};
</script>

<style>
</style>
