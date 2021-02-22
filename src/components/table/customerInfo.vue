<!--
 * @Date: 2021-02-22 14:24:59
 * @Author: 陶子
 * @LastEditTime: 2021-02-22 17:55:36
 * @FilePath: \jiudian\src\components\table\customerInfo.vue
 * @pageName: 这是--（打印客户资讯 组件）--页面
-->

<template>
  <el-dialog top="0" title="印刷レビュー" style="text-align: left" width="70%" v-if="printDialog" :visible.sync="printDialog">
    <div>
      <div class="dialog_headBox">
        <img src="~@/assets/images/print/good_print.png" alt="">
        <div>https://okura-club-hotels.com</div>
      </div>
      <div class="tableTitle">
        <div>レジストレーションカード</div>
        <div>Registration Card</div>
      </div>

      <table border="1">
        <tr>
          <td>部屋番号</td>
          <td></td>
          <td>ご利用日</td>
          <td colspan="2"></td>
          <td>泊数</td>
          <td></td>
          <td colspan="2">ご出発日～時間</td>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td>フリガナ</td>
          <td colspan="6"></td>
          <td rowspan="2" colspan="2">国籍</td>
          <td rowspan="2" colspan="4"></td>
        </tr>
        <tr>
          <td>お名前</td>
          <td colspan="6"></td>
        </tr>
        <tr>
          <td>証明書種類</td>
          <td colspan="2"></td>
          <td colspan="2">証明書番号</td>
          <td colspan="2"></td>
          <td colspan="2">会員番号</td>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td>ご住所</td>
          <td colspan="6"></td>
          <td colspan="2">電話番号</td>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td>予約経路</td>
          <td colspan="6"></td>
          <td colspan="2">電話番号</td>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td>D　M</td>
          <td colspan="12" class="checkBox" style="text-align:left">
            <label><input type='checkbox'>自宅郵送</label>
            <label><input type='checkbox'>勤務先郵送</label>
            <label><input type='checkbox'>E－Mail</label>
            <label><input type='checkbox'>不要</label>
          </td>
        </tr>
        <tr>
          <td>ご利用人数</td>
          <td>男</td>
          <td>女</td>
          <td>小学以上</td>
          <td>小学以下</td>
          <td>幼児</td>
          <td>ペット</td>
          <td colspan="3">夕 食</td>
          <td colspan="3">朝 食</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td colspan="3"></td>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td colspan="7">ご利用内容</td>
          <td colspan="6">料　金</td>
        </tr>
        <tr>
          <td colspan="7"></td>
          <td colspan="6"></td>
        </tr>
        <tr>
          <td colspan="2">メールアドレス</td>
          <td colspan="5"></td>
          <td colspan="2" rowspan="2">（備考）</td>
          <td colspan="4" rowspan="2"></td>
        </tr>
        <tr>
          <td colspan="2">（団体名）</td>
          <td colspan="5"></td>
        </tr>
      </table>
      <div style="margin-top:10px">ご記入いただいた個人情報は、お客様へのサービスのご提供のために使用するものであり、それ以外の目的で使用することはございません。</div>
      <div class="responsible">
        <div class="innerBox">ご署名</div>
      </div>
      <div class="bottomImg">
        <img src="~@/assets/images/print/good_print.png" alt="">
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
       printDialog:false,
    };
  },
  mounted() {},
  methods: {
    openDialog(){
      this.printDialog = true;
    }
  },
};
</script>
<style scoped lang='less'>
.dialog_headBox {
  margin-top: -35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 260px;
    height: 73px;
  }
}
.tableTitle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  padding: 20px 0;
}
table {
  margin-top: 20px;
  border-collapse: collapse;
  width: 100%;
  tr {
    td {
      width: 80px;
      height: 40px;
      text-align: center;
    }
    .checkBox {
      label {
        margin-left: 20px;
      }
    }
  }
}
.responsible {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  .innerBox {
    width: 400px;
    font-weight: 600;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid black;
  }
}
.bottomImg {
  text-align: right;
  img {
    width: 260px;
    height: 73px;
  }
}
</style>