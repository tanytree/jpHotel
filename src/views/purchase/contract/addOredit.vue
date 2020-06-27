<!--
 * @Date: 2020-04-23 15:05:17
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-23 15:53:55
 * @FilePath: /cloudAdmin/src/views/purchase/contract/addOredit.vue
 -->
<template>
  <!--统一的编辑和新增 -->
  <el-dialog :close-on-click-modal="false" :visible.sync="visible" title="编辑">
    <el-form label-width="80px">
      <el-form-item label="合同标题">
        <el-input v-model="editForm.title"></el-input>
      </el-form-item>
      <el-form-item label="合同文件">
        <el-image
          style="width:40px;height:40px"
          v-if="editForm.contract_url"
          :src="editForm.contract_url"
        ></el-image>
        <el-upload
          class="avatar-uploader"
          :action="action"
          :data="uploadData"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="付款方式">
        <el-radio-group v-model="editForm.pay_type">
          <el-radio :label="1">收货前付款</el-radio>
          <el-radio :label="2">收货后付款</el-radio>
          <el-radio :label="3">分期付款</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分期次数" v-if="editForm.pay_type==3">
        <el-input v-model="editForm.pay_num"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="editFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

 <script>
import httpRequest from "@/utils/httpRequest";
export default {
  data() {
    return {
      visible: false,
      action: httpRequest.adornUrl("/market/upload/upload"),
      uploadData: { type: "2" },
      editForm: { id: "", origin: "" }
    };
  },
  methods: {
    /**初始化数据 */
    initData(id, origin) {
      this.editForm = {
        origin: origin ? origin : "",
        list_id: id ? id : "",
        pay_type: 1,
        pay_num: 1,
        title: "",
        contract_url: "",
        contract_url_1: ""
      };
      if (id) {
        this.$http({
          url: this.$http.adornUrl("/purchase/contract/get_contract_info"),
          method: "post",
          data: this.$http.adornData({ id: id })
        }).then(res => {
          if (res.code == 200) {
            this.editForm = Object.assign({}, this.editForm, res.data);
            this.visible = true;
          } else {
            this.$message.error(res.message);
          }
        });
      } else {
        /**初始化表单 */
      }
      this.visible = true;
    },
    handleSuccess(res, file) {
      if (res.code == 200) {
        this.editForm.contract_url = res.data.file_url;
      } else {
        this.$message.error(res.message);
      }
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 20MB!");
      }
      return isLt2M;
    },
    /**新增/编辑 数据 */
    editFormSubmit() {
      this.$http({
        url: this.$http.adornUrl("/purchase/detailed_list/add_list_status_y"),
        method: "post",
        data: this.$http.adornData(this.editForm)
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
            duration: 1000,
            onClose: () => {
              this.visible = false;
              this.$emit("refreshDataList");
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
</style>
