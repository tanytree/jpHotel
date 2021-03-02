<!--
 * @Date: 2021-03-02 10:00:25
 * @Author: 陶子
 * @LastEditTime: 2021-03-02 11:03:30
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
          <div class="title_centerBox">
            <div style="text-align: center">
              <span>お控え</span><br /><span>Payments</span>
            </div>
          </div>
          <div class="title_rightBox">
            <div> No.：PAY123456</div>
            <div>Rsv.934286904286</div>
            <div>Date：2021.02.10</div>
            <div>担当者：张三</div>
          </div>
        </div>
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
            <tr>
              <td>
                <div>部屋</div>
                <div>Room No.</div>
              </td>

              <td>
                <div>ご利用明細</div>
                <div>Description</div>
              </td>
            </tr>
            <tr>
              <td>202</td>
              <td>宿泊料（平日）一泊2食</td>
            </tr>
          </table>
        </div>
        <div class="thirdTable">
          <table border="1">
            <tr>
              <td>现金</td>
              <td>￥100</td>
            </tr>
          </table>
          <div class="third_bottom">毎度ご愛顧賜りましてありがとう御座います。</div>
        </div>
        <div class="lastBox">
          <img src="~@/assets/images/print/good_print.png" alt="">
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
          }
        }
      }
      .secondTable {
        margin-top: 20px;
        table {
          border-collapse: collapse;
          width: 100%;
          text-align: center;
          tr{
            width: 100%;
            &:nth-child(1){
              background: #EDEDED;
            }
            &:nth-child(n+1){
              td{
                padding: 8px 0;
                margin-bottom: 10px;
              }
            }
            td{
              &:nth-child(1){
                width:20%;
              }
            }
          }
        }
      
      }
      .thirdTable {
        margin-top: 20px;
        table {
          border-collapse: collapse;
          width: 100%;
          text-align: center;
          tr{
            width:100%;
           td{
             padding: 8px 0;
              &:nth-child(1){
                width:20%;
              }
          }
        }
        .third_bottom {
          margin-top: 5px;
        }
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
