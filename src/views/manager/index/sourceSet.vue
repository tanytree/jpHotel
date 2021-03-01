<!--
 * @Date: 2020-12-21 13:51:39
 * @Author: 陶子
 * @pageName:渠道来源设置页面
 * @LastEditTime: 2021-03-01 18:10:36
 * @FilePath: \jiudian\src\views\manager\index\sourceSet.vue
-->
<template>
  <div>
    <div class="topButton">
      <el-button type="primary" @click="addPlateBtn">{{$t('commons.newAddA')}}</el-button>
    </div>
    <el-table
      ref="platformList"
      :data="platformList"
      header-row-class-name="default"
      size="small"
    >
      <el-table-column prop="otaName" :label="$t('manager.hk_oatName')"></el-table-column>
      <el-table-column :label="$t('commons.operating')" width="200px">
        <template slot-scope="{ row }">
          <el-button @click="resetOta(row)" type="text">{{$t('commons.modify')}}</el-button>
          <el-button @click="deletePlat(row)" type="text">{{$t('commons.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增dialog -->
    <el-dialog
      top="0"
      :title="newAdd ? $t('commons.newAdd') : $t('commons.modify')"
      style="text-align: left"
      :visible.sync="newPlat"
      width="40%"
    >
      <el-form
        ref="addPlatForm"
        :model="addPlatForm"
        :rules="addRule"
        label-width="100px"
      >
        <el-form-item :label="$t('manager.hk_oatName')+':'" prop="otaName">
          <el-input
            style="width: 260px"
            v-model="addPlatForm.otaName"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddplat">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" @click="sureAddpalt('addPlatForm')"
          >{{$t('commons.confirm')}}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  computed: {
    addRule() {
      return {
        otaName: [
          { required: true, message: this.$t('manager.hk_inputOat'), trigger: "blur" },
        ],
      };
    },
  },
  data() {
    return {
      newPlat: false, // 新增弹框
      platformList: [],
      newAdd: true,
      addPlatForm: {
        //新增、修改表单
        otaName: "",
        otaId: "",
      },
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
        this.$F.commons.fetchOtaList({}, (list)=> {
            this.platformList = list;
            this.$forceUpdate();
        })
    },
    //点击删除按钮
    deletePlat(row) {
      this.$confirm(this.$t('commons.confirm_deleteD'), this.$t('commons.tip_desc'), {
        confirmButtonText: this.$t('commons.confirm'),
        cancelButtonText:this.$t('commons.cancel'),
        type: "warning",
      })
        .then(() => {
          let params = {
            otaId: row.id,
          };
          this.$F.doRequest(this, "/pms/oat/oat_delete", params, (res) => {
            this.getDataList();
            this.$message({
              type: "success",
              message: this.$t('commons.delete_success'),
            });
          });
        })
        .catch(() => {
        });
    },
    //点击修改按钮
    resetOta(row) {
      this.newAdd = false;
      this.addPlatForm.otaName = row.otaName;
      this.addPlatForm.otaId = row.id;
      this.newPlat = true;
    },
    //点击新增按钮
    addPlateBtn() {
      this.newAdd = true;
      this.addPlatForm = {
        otaName: "",
        otaId: "",
      };
      this.newPlat = true;
    },
    //新增dialog点击 取消
    cancelAddplat() {
      this.addPlatForm = {
        otaName: "",
        otaId: "",
      };
      this.newPlat = false;
    },
    //新增dialog点击 确认
    sureAddpalt(fromName) {
      this.$refs[fromName].validate((valid) => {
        if (valid) {
          this.$F.doRequest(
            this,
            "/pms/oat/oat_manage_edit",
            this.addPlatForm,
            (res) => {
              this.cancelAddplat();
              this.getDataList();
              if (this.newAdd) {
                this.$message({
                  message: this.$t('manager.hk_newSuccess'),
                  type: "success",
                });
              } else {
                   this.$message({
                  message: this.$t('manager.hk_resetSuccess'),
                  type: "success",
                });
              }
            }
          );
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.topButton {
  text-align: right;
  margin-bottom: 10px;
}
</style>
