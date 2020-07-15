<!--
 * @Date: 2020-03-25 09:20:48
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-25 09:32:58
 * @FilePath: /cloudAdmin/src/components/pageEditDemo.vue
 -->
<template>
  <!--统一的编辑和新增 -->
  <el-dialog top="0" :close-on-click-modal="false" :visible.sync="visible" title="编辑" >
    <el-form label-width="80px">
      <el-form-item label="主要内容">
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="editFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

 <script>
export default {
  data() {
    return {
      visible: false,
      editForm: { id: "" }
    };
  },
  methods: {
    /**初始化数据 */
    initData(id) {
      if (id) {
        this.editForm.id = id;
        getdetail({ id: id }).then(res => {
          if (res.code == 200) {
            this.editForm = Object.assign({}, this.editForm, res.data);
            this.visible = true;
          } else {
            this.$message.error(res.message);
          }
        });
      } else {
        /**初始化表单 */
        this.editForm = {};
        this.visible = true;
      }
    },
    /**新增/编辑 数据 */
    editFormSubmit() {
      submitDateForm(this.editForm).then(res => {
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
