<!--
 * @Date: 2021-02-22 14:24:59
 * @Author: 陶子
 * @LastEditTime: 2021-02-24 11:19:47
 * @FilePath: \jiudian\src\components\table\customerInfo.vue
 * @pageName: 这是--（打印客户资讯 组件）--页面
-->



<template>
  <div v-if="printDialog" class="dialogBox">
    <div class="innerDialogBox">
      <div class="headerTitle">
        <div class="header_leftTitle">印刷レビュー</div>
        <div class="header_rightTitle" @click="printDialog = false">X</div>
      </div>
      <div class="contentBox">
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
      <div class="bottomBox">
        <div class="bottomBox_left" @click="printDialog = false">{{$t("commons.cancel")}}</div>
        <div class="bottomBox_right">印刷</div>
      </div>
    </div>
  </div>
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
<style lang="less" scoped>
.flex(@justify:center,@align:center,@direction:row) {
  display: flex;
  justify-content: @justify;
  align-items: @align;
  flex-direction: @direction;
}
.dialogBox {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 900;
  .flex();
  .innerDialogBox {
    border-radius: 6px;
    width: 75%;
    height: 84%;
    overflow: auto;
    background-color: #fff;
    .headerTitle {
      width: 75%;
      background-color: rgb(200, 216, 241);
      padding: 10px 20px;
      position: fixed;
      top: 7%;
      .flex(space-between,center);
      .header_leftTitle {
        font-weight: 600;
      }
      .header_rightTitle {
        font-size: 14px;
        color: rgba(176, 176, 176, 1);
        cursor: default;
      }
    }
    .contentBox {
      margin-top: 20px;
      box-sizing: border-box;
      padding: 20px;
      .dialog_headBox {
        .flex(space-between,center);
        img {
          width: 260px;
          height: 73px;
        }
      }
      .tableTitle {
        .flex(center,center,column);
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
      .bottomImg {
        text-align: right;
        img {
          width: 260px;
          height: 73px;
        }
      }
      .responsible {
        .flex(flex-start,center);
        margin-top: 30px;
        .innerBox {
          width: 400px;
          font-weight: 600;
          font-size: 18px;
          padding-bottom: 10px;
          border-bottom: 1px solid black;
        }
      }
    }
    .bottomBox {
      .flex();
      padding: 20px;
      border-top: 1px solid rgb(223, 226, 232);
      .bottomBox_left {
        padding: 10px 30px;
        border: 1px solid rgb(223, 226, 232);
        border-radius: 6px;
      }
      .bottomBox_right {
        padding: 10px 30px;
        background-color: rgb(64, 158, 255);
        border-radius: 6px;
        margin-left: 15px;
        color: #fff;
      }
    }
  }
}
</style>
