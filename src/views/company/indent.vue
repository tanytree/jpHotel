<!--
 * @Date: 2020-03-24 10:39:55
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-31 17:30:21
 * @FilePath: /cloudAdmin/src/views/company/indent.vue
 -->
<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="editVisibal" title="详情">
    <el-form label-width="150px">
      <el-form-item label="企业名称" required>
        <el-input v-model="form.enterName"></el-input>
      </el-form-item>
      <el-form-item label="统一社会信用代码" required>
        <el-input v-model="form.enterCode"></el-input>
      </el-form-item>
      <el-form-item label="法定代表人姓名" required>
        <el-input v-model="form.legalIdcardName"></el-input>
      </el-form-item>
      <el-form-item label="法定代表人证件类型" required>
        <el-select v-model="form.cardType" style="width:100%">
          <el-option
            v-for="(item,index) in cardTypeArry"
            :label="item.name"
            :value="item.dictNum"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="法定代表人证件号" required>
        <el-input v-model="form.legalIdcardCode"></el-input>
      </el-form-item>

      <el-form-item label="法定代表人证明书" required>
        <el-upload
          class="avatar-uploader"
          :action="action"
          :data="uploadData"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="form.legalCertificateUrl" :src="form.legalCertificateUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="editVisibal = false">取消</el-button>
      <el-button size="small" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { legal_certification, get_user_enterprise } from "@/utils/api/login";
import httpRequest from "@/utils/httpRequest";

export default {
  data() {
    return {
      action: httpRequest.adornUrl("/market/upload/upload"),
      uploadData: { type: "2" },
      editVisibal: false,
      form: {
        legalCertificateUrl: ""
      }
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      userId: state => state.user.id,
      plat_source: state => state.config.plat_source,
      cardTypeArry: state => state.config.cardTypeArry,
      industryList: state => state.config.industryList,
      enterprisesScales: state => state.config.enterprisesScales,
      enterprisesTypes: state => state.config.enterprisesTypes
    })
  },
  methods: {
    initData(data) {
      get_user_enterprise({
        plat_source: this.plat_source,
        token: this.token,
        userId: this.userId,
        enterCode: data.enterCode
      }).then(res => {
        this.form = Object.assign({}, this.form, res.data);
        this.editVisibal = true;
      });
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleSuccess(res, file) {
      this.form.legalCertificateUrl = res.data.file_url;
    },
    dataFormSubmit() {
      legal_certification({
        plat_source: this.plat_source,
        token: this.token,
        userId: this.userId,
        enterpriseId: this.form.id,
        enterName: this.form.enterName,
        enterCode: this.form.enterCode,
        legalIdcardName: this.form.legalIdcardName,
        legalIdcardCode: this.form.legalIdcardCode,
        legalCertificateUrl: this.form.legalCertificateUrl,
        cardType: this.form.cardType
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
            duration: 1000,
            onClose: () => {
              this.editVisibal = false;
            }
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
.avatar {
  width: 50px;
  height: 50px;
}
</style>
