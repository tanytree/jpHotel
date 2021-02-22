<!--
 * @Date: 2021-02-22 14:24:59
 * @Author: 陶子
 * @LastEditTime: 2021-02-22 16:39:52
 * @FilePath: \jiudian\src\components\table\customerInfo.vue
-->
<template>
  <div>
    <div class="dialog_headBox">
      <img src="~@/assets/images/print/good_print.png" alt="">
      <div>https://okura-club-hotels.com</div>
    </div>
    <div class="tableTitle">
      <div>レジストレーションカード</div>
      <div>Registration Card</div>
    </div>
    <div class="tableBox">
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
          <td colspan="12" class="checkBox">
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
          <td colspan="7" ></td>
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
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
.tableBox {
  margin-top: 20px;
  table {
    border-collapse: collapse;
    width: 100%;
    tr {
      td {
        width: calc(~"100%/13");
        height: 40px;
      }
      .checkBox {
        label {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>