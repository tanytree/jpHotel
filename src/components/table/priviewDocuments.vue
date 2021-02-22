<!--
 * @Date: 2021-02-22 17:56:42
 * @Author: 陶子
 * @LastEditTime: 2021-02-22 18:22:02
 * @FilePath: \jiudian\src\components\table\priviewDocuments.vue
 * @pageName: 这是--（单据预览 组件）--页面
-->
<template>
  <el-dialog top="0" title="印刷レビュー" style="text-align: left" width="70%" v-if="printDialog" :visible.sync="printDialog">
    <div>
      <div class="headBox">
        <div class="dialog_headBox">
          <img src="~@/assets/images/print/good_print.png" alt="">
          <div class="urlPath">https://okura-club-hotels.com</div>
        </div>
        <div class="centerBox">
          <div class="weight">お控え</div>
          <div>Payments</div>
        </div>
        <div class="rightBox">
          <div>No.：karu -PAY20201119-001</div>
          <div>Rsv.934286904286</div>
          <div>Date：2021.02.10</div>
          <div>担当者：张三</div>
        </div>
      </div>
      <div class="tableBox">
        <div>お名前</div>
        <div>Name 田中太朗様</div>
        <el-row>
          <el-col :span="14"></el-col>
          <el-col :span="10"></el-col>
        </el-row>
      </div>
    </div>

    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button style="width: 80px" @click="printDialog = false">{{
          $t("commons.cancel")
        }}</el-button>
      <el-button style="width:80px;" type="primary">印刷</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      printDialog: false,
    };
  },
  mounted() {},
  methods: {
    openDialog() {
      this.printDialog = true;
    },
  },
};
</script>
<style scoped lang='less'>
.headBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .dialog_headBox {
    margin-top: -45px;
    img {
      width: 260px;
      height: 73px;
    }
    .urlPath {
      margin-left: 20px;
    }
  }
  .centerBox {
    margin-bottom: -90px;
    font-size: 18px;
    .weight {
      font-weight: 600;
    }
  }
  .rightBox {
    margin-top: 20px;
  }
}
.tableBox{
  margin-top: 40px;
  font-weight: 600;
}
</style>
