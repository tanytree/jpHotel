<!--
 * @Date: 2020-04-22 12:52:02
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-22 17:07:42
 * @FilePath: /cloudAdmin/src/views/market/promotion/member/components/activityAddOrUpdate.vue
 -->

<template>
  <!--统一的编辑和新增 -->
  <el-dialog width="600px" :visible.sync="visible" title="编辑">
    <el-form label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="editForm.title"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
        style="width:230px"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          v-model="editForm.start_time"
        ></el-date-picker>
        <span style="margin:0 5px">-</span>
        <el-date-picker
         style="width:230px"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          v-model="editForm.end_time"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="单次抽奖消耗积分">
        <el-input v-model="editForm.score"></el-input>
      </el-form-item>
      <el-form-item label="奖品总数">
        <el-input v-model="editForm.num"></el-input>
      </el-form-item>
      <el-form-item label="抽奖规则">
        <el-input type="textarea" v-model="editForm.content"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer" v-if="pageType==1">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="editFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

 <script>
export default {
  data() {
    return {
      pageType:1,
      visible: false,
      editForm: { id: "" }
    };
  },
  methods: {
    /**初始化数据 */
    initData(id,detail) {
      if(detail){
        this.pageType="2"
      }
      if (id) {
        this.editForm.id = id;
        this.$http({
          url: this.$http.adornUrl("/market/score/get_raffle_info"),
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
        this.editForm = {
          id: "",
          title: "",
          content: "",
          num: 1,
          score: "0.00",
          start_time: "",
          end_time: "",
          status: 1
        };
      }
      this.visible = true;
    },
    /**新增/编辑 数据 */
    editFormSubmit() {
      let url = "market/score/add_raffle";
      if (this.editForm.id) {
        url = "/market/score/edit_raffle";
      }
      this.$http({
        url: this.$http.adornUrl(url),
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
