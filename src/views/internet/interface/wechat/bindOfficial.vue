<!--
 * @Date: 2020-04-21 13:01:53
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-21 14:30:40
 * @FilePath: /cloudAdmin/src/views/internet/interface/wechat/bindOfficial.vue
 -->
<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/interface' }">公众号</el-breadcrumb-item>
          <el-breadcrumb-item>手动添加</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form label-width="120px">
        <el-form-item label="公众号名称">
          <el-input v-model="editForm.nick_name"></el-input>
        </el-form-item>
        <el-form-item label="公众号描述">
          <el-input v-model="editForm.signature"></el-input>
        </el-form-item>
        <el-form-item label="Appld">
          <el-input v-model="editForm.AppId"></el-input>
        </el-form-item>
        <el-form-item label="AppSecret">
          <el-input v-model="editForm.AppSecret"></el-input>
        </el-form-item>
        <el-form-item label="Oauth 2.0">
          <el-input v-model="editForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="百家号头像">
          <el-input v-model="editForm.head_img"></el-input>
        </el-form-item>
        <el-form-item label="二维码">
          <el-input v-model="editForm.qrcode_url"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="applyBind">立即绑定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      uniacid: state => state.company.id
    })
  },
  data() {
    return {
      editForm: {
        uniacid: "",
        nick_name: "",
        signature: "",
        user_name: "",
        service_type_info: "",
        AppId: "",
        AppSecret: "",
        head_img: "",
        qrcode_url: ""
      }
    };
  },
  activated() {
    this.editForm = {
      uniacid: this.uniacid,
      nick_name: "",
      signature: "",
      user_name: "",
      service_type_info: 0,
      AppId: "",
      AppSecret: "",
      head_img: "",
      qrcode_url: ""
    };
  },
  methods: {
    applyBind() {
      this.$http({
        url: this.$http.adornUrl("/account/Auth/registered"),
        method: "post",
        data: this.$http.adornData(this.editForm)
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
            duration: 1000
          });
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>

<style>
</style>
