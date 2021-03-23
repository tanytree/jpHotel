<!--
 * @Date: 2021-03-02 10:00:25
 * @Author: 陶子
 * @LastEditTime: 2021-03-23 14:18:12
 * @FilePath: \jiudian\src\components\table\articleCollection.vue
 * @pageName: 这是--（收款条  组件）--页面
-->
<template>
  <div v-if="printDialog" class="dialogBox" id="articleCollection">
    <div class="innerDialogBox">
      <div class="headerTitle">
        <div class="header_leftTitle">印刷レビュー</div>
        <div class="header_rightTitle" @click="printDialog = false">X</div>
      </div>
      <div class="contentBox">
        <div class="titleBox">
          <div class="title_leftBox">
            <img src="~@/assets/images/print/good_print.png" alt="">
            <div class="urlPath">https://okura-club-hotels.com</div>
          </div>
        </div>
        <div class="firstTable">
          <div class="first_topBox">
            <div class="nameInfo">
              <div>お名前</div>
              <div>Name 田中太朗様</div>
            </div>
            <div class="titleConter">
              <div class="titleText">受領書</div>
              <div>Receipt</div>
            </div>
          </div>
          <div class="firstBox">
            <table border="1">
              <tr class="row_one">
                <td>
                  <div>現金</div>
                </td>
                <td>
                  <div>¥1,000</div>
                </td>
              </tr>
            </table>
            <div class="rightOfTable">
              <div>No.karu -PAY20201119-001　</div>
              <div>Rsv.934286904286</div>
              <div>Date：2021.02.10</div>
              <div>担当者：张三</div>
            </div>
          </div>
          <div class="showMoney">
            <div class="showLeft">
              <div class='moneyNum'>￥　1,000円</div>
              <div class='explain'>上記の通り、正に受領いたしました。</div>
            </div>
            <div class="showRight">
              <div>ホテル名：小圆客商大酒店</div>
              <div>ホテル住所：安徽</div>
              <div>ホテル電話：888888</div>
            </div>
          </div>
        </div>

        <div class="lastBox">
          <img src="~@/assets/images/print/good_print.png" alt="">
          <div class="urlPath">https://okura-club-hotels.com</div>
        </div>
      </div>
      <div class="bottomBox">
        <div class="bottomBox_left  noprint" @click="printDialog = false">{{$t("commons.cancel")}}</div>
        <div class="bottomBox_right noprint" @click="printCollection">印刷</div>
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
    printCollection() {
      this.$F.doPrint("articleCollection");
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
    width: 55%;
    height: 80%;
    overflow: auto;
    background-color: #fff;
    .headerTitle {
      width: 55%;
      background-color: rgb(200, 216, 241);
      padding: 10px 20px;
      position: fixed;
      top: 10%;
      .flex(space-between,center);
      .header_leftTitle {
        font-size: 22px;
        font-weight: 600;
      }
      .header_rightTitle {
        font-size: 14px;
        color: rgba(31, 31, 31, 0.8);
        cursor: default;
      }
    }
    .contentBox {
      box-sizing: border-box;
      padding: 30px;
      margin-top: 6px;
      .titleBox {
        .flex(space-between,center);
        .title_leftBox {
          img {
            width: 260px;
            height: 73px;
          }
          .urlPath {
            margin-left: 10px;
            font-size: 14px;
          }
        }
      }
      .firstTable {
        margin-top: 30px;
        .first_topBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .nameInfo {
            font-weight: 500;
          }
          .titleConter {
            margin-right: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .titleText {
              font-weight: bold;
              font-size: 24px;
            }
          }
        }
        .firstBox {
          margin-top: 5px;
          .flex(flex-start,flex-start);
          table {
            border-collapse: collapse;
            text-align: left;
            width: 400px;
            .row_one {
              td {
                box-sizing: border-box;
                padding: 15px;
                word-break: break-all;
                &:nth-child(1) {
                  width: 260px;
                }
              }
            }
          }
          .rightOfTable {
            margin-left: 55px;
          }
        }
      }
      .showMoney {
        margin-top: 20px;
        .flex(flex-start,flex-start);
        .showLeft {
          width: 400px;
          .moneyNum {
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(95, 95, 95, 1);
          }
          .explain {
            margin-top: 5px;
            color: rgba(51, 51, 51, 100);
            font-size: 14px;
          }
        }
        .showRight {
          margin-left: 55px;
        }
      }
      .lastBox {
        text-align: right;
        img {
          width: 260px;
          height: 73px;
        }
        .urlPath {
          margin-right: 10px;
          font-size: 14px;
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
        cursor: pointer;
      }
      .bottomBox_right {
        padding: 10px 30px;
        background-color: rgb(64, 158, 255);
        border-radius: 6px;
        margin-left: 15px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
