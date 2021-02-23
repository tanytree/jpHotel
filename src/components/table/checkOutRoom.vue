<!--
 * @Date: 2021-02-23 16:02:48
 * @Author: 陶子
 * @LastEditTime: 2021-02-23 17:29:31
 * @FilePath: \jiudian\src\components\table\checkOutRoom.vue
 * @pageName: 这是--（结账退房单据打印  组件）--页面
-->
<template>
  <div v-if="printDialog" class="dialogBox">
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
          <div class="title_centerBox">
            <div style="text-align: center">
              <span style="font-weight:bold;">ご利用明細書</span><br /><span>Bill Information</span>
            </div>
          </div>
          <div class="title_rightBox">
            <div> No.：karu -PAY20201119-001</div>
            <div>Rsv.934286904286</div>
            <div>Date：2021.02.10</div>
            <div>担当者：张三</div>
          </div>
        </div>
        <!-- 下面是表格 -->
        <div class="firstTable">
          <div class="nameInfo">
            <div>お名前</div>
            <div>Name 田中太朗様</div>
          </div>
          <div class="firstBox">
            <table border="1">
              <tr class="row_one">
                <td>
                  <div>部屋番号</div>
                  <div>Room No.</div>
                </td>
                <td>
                  <div>ご利用日</div>
                  <div>C/I</div>
                </td>
                <td>
                  <div>泊数</div>
                  <div>Nights</div>
                </td>
                <td>
                  <div>ご出発日</div>
                  <div>C/O</div>
                </td>
                <td>
                  <div>人数</div>
                  <div>Person</div>
                </td>
                <td>
                  <div>ページ数</div>
                  <div>Page</div>
                </td>
              </tr>
              <tr class="row_two">
                <td>202/A002/A004</td>
                <td>2021.02.10</td>
                <td>1</td>
                <td>2021.02.11</td>
                <td>2</td>
                <td>1-1</td>
              </tr>
            </table>
            <div class="rightOfTable">
              <div>ホテル名：小圆客商大酒店</div>
              <div>ホテル住所：安徽</div>
              <div>ホテル電話：888888</div>
            </div>
          </div>
        </div>
        <div class="secondTable">
          <table border="1">
            <tr class="second_rowOne">
              <td>
                <div>日付</div>
                <div>Date</div>
              </td>
              <td>
                <div>部屋</div>
                <div>Room No.</div>
              </td>
              <td>
                <div>ご利用明細</div>
                <div>Description</div>
              </td>
              <td>
                <div>単価（税込）</div>
                <div>Price</div>
              </td>
              <td>
                <div>数量</div>
                <div>Qty</div>
              </td>
              <td>
                <div>金額（税込)</div>
                <div>Amount</div>
              </td>
              <td>
                <div>備考入金</div>
                <div>Note／Received</div>
              </td>
            </tr>
            <tr class="second_roTwo" v-for="i in 3" :key="i">
              <td>
                <div>02/10</div>
              </td>
              <td>
                <div>202</div>
              </td>
              <td style="width:30%;">
                <div>赔偿商品1</div>
              </td>
              <td>
                <div>¥100</div>
              </td>
              <td>
                <div>2</div>
              </td>
              <td>
                <div>¥200</div>
              </td>
              <td style="width:20%;">
                <div>¥2,000</div>
              </td>
            </tr>

          </table>
          <div class="second_bottom">小計：¥40,200</div>
        </div>
        <div class="thirdTable">
          <table border="1">
            <tr class="third_rowOne" v-for="i in 4" :key="i">
              <td>
                <div></div>
              </td>
              <td>
                <div></div>
              </td>
              <td style="width:30%;">
                <div>宿泊税</div>
              </td>
              <td>
                <div>¥300</div>
              </td>
              <td>
                <div>2</div>
              </td>
              <td>
                <div>¥100</div>
              </td>
              <td style="width:20%;">
                <div></div>
              </td>
            </tr>
          </table>
        </div>
        <div class="fourthTable">
          <table border="1">
            <tr>
              <td>
                <div>ご利用合計①</div>
                <div>Total</div>
              </td>
              <td>¥41,500</td>
              <td>
                <div>ご入金合計②</div>
                <div>Received</div>
              </td>
              <td>¥2,000</td>
              <td>
                <div>ご請求金額①−②</div>
                <div>Amount Due</div>
              </td>
              <td>¥39,500</td>
            </tr>
          </table>
          <div class="fourth_bottom">毎度ご愛顧賜りましてありがとう御座います。</div>
        </div>
        <div class="cutOff"></div>
        <div class="fifthTabel">
          <div class="fifth_titleBox">
            <div class="fifthTitle_left">
              <div>お名前</div>
              <div>Name 田中太朗様</div>
            </div>
            <div class=" fifthTitle_right">
              <div class="boldText">領収書</div>
              <div>Receipt</div>
            </div>
          </div>
          <div class="fifth_container">
            <table border="1">
              <tr>
                <table>
                  <tr>
                    <td>合計領収金額</td>
                    <td>¥41,500</td>
                  </tr>
                  <tr>
                    <td>内入湯税</td>
                    <td>（¥100）</td>
                  </tr>
                  <tr>
                    <td>内宿泊税</td>
                    <td>（¥100）</td>
                  </tr>
                  <tr>
                    <td>内消費税</td>
                    <td>（¥100）</td>
                  </tr>
                </table>
              </tr>
              <tr>
                <table>
                  <tr>
                    <td>商品券</td>
                    <td>¥41,500</td>
                  </tr>
                  <tr>
                    <td>ポイント利用</td>
                    <td>（¥100）</td>
                  </tr>
                </table>
              </tr>
              <tr>
                <table>
                  <tr>
                    <td>現金</td>
                    <td>¥41,500</td>
                  </tr>
                  <tr>
                    <td>クレジットカード</td>
                    <td>（¥100）</td>
                  </tr>
                </table>
              </tr>
            </table>
            <div class="fifth_rightBox">
              <div class="fifthRight_top">
                <div> No.：karu -PAY20201119-001</div>
                <div>Rsv.934286904286</div>
                <div>Date：2021.02.10</div>
                <div>担当者：张三</div>
              </div>
              <div class="fifthRight_middle">
                <div>ホテル名：小圆客商大酒店</div>
                <div>ホテル住所：安徽</div>
                <div>ホテル電話：888888</div>
              </div>
              <div class="fifthRight_bottom">
                <div>印収</div>
                <div style="margin-top:10px;">紙入</div>
              </div>
            </div>
          </div>
        </div>
        <div class="inscribeBox">
          <div class="inscribe_top">￥　41,500円</div>
          <div class="inscribe_bottom">上記の通り、正に領収いたしました。</div>
        </div>
        <div class="lastBox">
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
    width: 65%;
    height: 80%;
    overflow: auto;
    background-color: #fff;
    .headerTitle {
      width: 65%;
      background-color: rgb(200, 216, 241);
      padding: 10px 20px;
      position: fixed;
      top: 10%;
      .flex(space-between,center);
      .header_leftTitle {
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
        .title_centerBox {
          align-self: flex-end;
          margin-bottom: -35px;
        }
        .title_rightBox {
          font-size: 14px;
          color: #333333;
          align-self: flex-end;
          margin-bottom: -25px;
        }
      }
      .firstTable {
        margin-top: 50px;
        .nameInfo {
          font-weight: 500;
        }
        .firstBox {
          margin-top: 5px;
          .flex(flex-start,flex-start);
          table {
            border-collapse: collapse;
            text-align: center;
            tr {
              td {
                width: 100px;
              }
            }
            .row_one {
              background: #ededed;
            }
            .row_two {
              td {
                word-break: break-all;
              }
            }
          }
          .rightOfTable {
            margin-left: 25px;
            font-weight: 500;
          }
        }
      }
      .secondTable {
        margin-top: 20px;
        table {
          border-collapse: collapse;
          width: 100%;
          text-align: center;
          tr {
            td {
              width: 10%;
            }
          }
          .second_rowOne {
            background: #ededed;
          }
          .second_roTwo {
            td {
              border-bottom: none;
              border-top: none;
              div {
                margin-bottom: 5px;
                word-break: break-all;
              }
            }
          }
        }
        .second_bottom {
          margin-top: 5px;
        }
      }
      .thirdTable {
        margin-top: 5px;
        table {
          border-collapse: collapse;
          width: 100%;
          text-align: center;
          tr {
            td {
              width: 10%;
            }
          }
          .third_rowOne {
            border-bottom: none;
            td {
              border-bottom: none;
              border-top: none;
              div {
                margin-bottom: 5px;
                word-break: break-all;
              }
            }
          }
        }
      }
      .fourthTable {
        margin-top: 10px;
        table {
          border-collapse: collapse;
          width: 100%;
          text-align: center;
          tr {
            td {
              width: calc(~"100%/6");
              padding: 5px 0;
              &:nth-child(2n + 1) {
                background: #ededed;
              }
            }
          }
        }
        .fourth_bottom {
          margin-top: 5px;
        }
      }
      .cutOff {
        margin-top: 15px;
        margin-left: -30px;
        margin-right: -30px;
        border: 1px dashed rgba(186, 186, 186, 0.5);
      }
      .fifthTabel {
        margin-top: 25px;
        .fifth_titleBox {
          .flex(space-between,center);
          .fifthTitle_left {
            text-align: left;
            font-weight: 500;
            .boldText {
              font-weight: bold;
              font-size: 22px;
            }
          }
          .fifthTitle_right {
            text-align: center;
            font-weight: 500;
            margin-right: 100px;

            .boldText {
              font-weight: bold;
              font-size: 22px;
            }
          }
        }
        .fifth_container {
          margin-top: 10px;
          .flex(flex-start,flex-start);
          table {
            border-collapse: collapse;
            width: 55%;
            tr {
              table {
                width: 100%;
                border-bottom: 1px solid #727272;
                tr {
                  td {
                    padding: 5px 0;
                    &:nth-child(1) {
                      width: 80%;
                      border-right: 1px solid #727272;
                      padding-left: 15px;
                    }
                    &:nth-child(2) {
                      width: 20%;
                      text-align: center;
                    }
                  }
                }
              }
              &:nth-last-child(1) table {
                border: none;
              }
            }
          }
          .fifth_rightBox {
            margin-left: 70px;
            .fifthRight_top {
              font-size: 14px;
              color: #333333;
              margin-top: 10px;
            }
            .fifthRight_middle {
              font-weight: 500;
              margin-top: 20px;
            }
            .fifthRight_bottom {
              margin-top: 15px;
              margin-left: -50px;
              font-size: 14px;
              color: #333333;
              width: 100px;
              height: 100px;
              background: #fefd00;
              border: 1px solid #505050;
              .flex(center,center,column);
            }
          }
        }
      }
      .inscribeBox {
        .inscribe_top {
          width: 55%;
          border-bottom: 1px solid black;
          padding-bottom: 7px;
          padding-left: 15px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .inscribe_bottom {
          font-size: 14px;
          color: #333333;
        }
      }
      .lastBox {
        text-align: right;
        img {
          width: 260px;
          height: 73px;
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
