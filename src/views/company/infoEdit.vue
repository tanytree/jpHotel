<!--
 * @Date: 2020-03-31 09:18:24
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-10 11:36:20
 * @FilePath: /cloudAdmin/src/views/company/infoEdit.vue
 -->

<template>
  <!--统一的编辑和新增 -->
  <el-dialog :close-on-click-modal="false" :visible.sync="visible" title="编辑">
    <el-form label-width="110px">


      <el-form-item label="企业名称">
        <el-input v-model="editForm.enterName"></el-input>
      </el-form-item>
      <el-form-item label="企业所在地">
        <el-input v-model="editForm.enterAddress"></el-input>
      </el-form-item>
      <el-form-item label="企业联系人">
        <el-input v-model="editForm.contactName"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="editForm.contactMobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="editFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

 <script>
import { mapState, mapActions } from "vuex";
import { user_enterprise, industry_list } from "@/utils/api/login";
export default {
  data() {
    return {
      visible: false,
      editForm: { id: "", contactName: "", contactMobile: "" }
    };
  },
  computed: {
    ...mapState({
      company: state => state.company
    })
  },
  created() {
    this.editForm = Object.assign({}, this.editForm, this.company);
  },
  methods: {
    /**初始化数据 */
    initData(id) {
      this.visible = true;
    },
    /**新增/编辑 数据 */
    editFormSubmit() {
      user_enterprise({
        enterCode: this.editForm.enterCode,
        enterAddress: this.editForm.enterAddress,
        enterName: this.editForm.enterName,

        contactName: this.editForm.contactName,
        contactMobile: this.editForm.contactMobile
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
            duration: 1000,
            onClose: () => {
              this.visible = false;
              // this.$emit("refreshDataList");
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
