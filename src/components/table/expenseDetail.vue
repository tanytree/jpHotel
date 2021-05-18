<!--
 * @Date: 2021-02-22 14:24:59
 * @Author: 陶子
 * @LastEditTime: 2021-05-18 15:59:46
 * @FilePath: \jiudian\src\components\table\expenseDetail.vue
 * @pageName: 这是--（消费明细预览  组件）--页面
-->
<template>
  <div v-if="printDialog" class="dialogBox" id="expenseDetail">
    <div class="innerDialogBox">
      <div class="headerTitle">
        <div class="header_leftTitle">印刷レビュー</div>
        <div class="header_rightTitle" @click="printDialog = false" style="cursor: pointer">X</div>
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
            <div> No.: {{ expenseDetailNum }}</div>
            <div>Rsv.: {{ detailData.checkIn.orderNum }}</div>
            <div>Date: {{ getCurrentDate() }}</div>
            <div>担当者: {{accountName}}</div>
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
                <td>{{ getHouseNums() }}</td>
                <td>{{ $F.formatDate('yyyy.MM.dd', null, detailData.checkIn.checkinTime) }}</td>
                <td>{{detailData.checkIn.checkInDays}}</td>
                <td>{{$F.formatDate('yyyy.MM.dd', null, detailData.checkIn.checkoutTime)}}</td>
                <td>{{getPersons()}}</td>
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
            <tr class="second_roTwo" v-for="(order, orderIndex) in consumeOrderList" :key="orderIndex" v-if="consumeOrderList.length > 0">
              <td>
                <div>{{$F.formatDate('MM-dd', null, order.createTime)}}</div>
              </td>
              <td>
                <div>{{ order.houseNum || (order.checkInPerson && order.checkInPerson.houseNum) }}</div>
              </td>
              <td style="width:30%;">
                <div v-if="order.priceType == 22">
                  <span v-for="(shopOrder, shopOrderIndex) in order.shopOrderSubList" :key="shopOrderIndex">
                    {{shopOrder.goods.categoryName}}
                    <span v-if="shopOrderIndex != order.shopOrderSubList.length - 1">，</span>
                  </span>
                </div>
                <div v-if="order.priceType == 6 || order.priceType == 8 || order.priceType == 14">
                  {{$t('frontOffice.priceType')[order.priceType]}}
                </div>
                <div v-if="order.priceType == 101">
                  {{order.projectName}}
                </div>
              </td>
              <td>
                <div>¥{{ order.price || order.consumePrice || 0}}</div>
              </td>
              <td>
                <div>{{order.projectCount || 1}}</div>
              </td>
              <td>
                <div v-if="order.priceType != 101">¥{{ order.consumePrice || 0}}</div>
                <div v-else>¥{{ order.price * order.projectCount}}</div>
              </td>
              <td style="width:20%;" v-if="orderIndex == 0" :rowspan="consumeOrderList.length">
                <div>{{detailData.payPrice}}</div>
              </td>
            </tr>

          </table>
          <div class="second_bottom">小計：¥{{getConsumeSum()}}</div>
        </div>
        <div class="thirdTable">
          <table border="1">
            <tr class="third_rowOne" v-for="(tax, taxIndex) in taxList" :key="taxIndex" v-if="taxList.length > 0">
              <td>
                <div>{{$F.formatDate('MM-dd', null, tax.createTime)}}</div>
              </td>
              <td>
                <div>{{ tax.houseNum || (tax.checkInPerson && tax.checkInPerson.houseNum) }}</div>
              </td>
              <td style="width:30%;">
                <div> {{$t('frontOffice.priceType')[tax.priceType]}}</div>
              </td>
              <td>
                <div>¥{{tax.unitPrice}}</div>
              </td>
              <td>
                <div>{{tax.taxCount}}</div>
              </td>
              <td>
                <div>¥{{ tax.unitPrice * tax.taxCount }}</div>
              </td>
              <td style="width:20%;" v-if="taxIndex == 0" :rowspan="taxList.length">
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
              <td>¥{{detailData.payPrice + detailData.totalPrice}}</td>
              <td>
                <div>ご入金合計②</div>
                <div>Received</div>
              </td>
              <td>¥{{detailData.payPrice}}</td>
              <td>
                <div>ご請求金額①−②</div>
                <div>Amount Due</div>
              </td>
              <td>¥{{detailData.totalPrice}}</td>
            </tr>
          </table>
        </div>
        <div class="fifthTable">
          <!-- <table border="1">
                      <tr class="fifth_rowOne">
                        <td style="width:20%">ご署名</td>
                        <td></td>
                      </tr>
                      <tr class="fifth_rowTwo">
                        <td style="width:20%">会社名</td>
                        <td></td>
                      </tr>
                    </table> -->
          <div class="fifth_bottom">毎度ご愛顧賜りましてありがとう御座います。</div>
        </div>
        <div class="lastBox">
          <img src="~@/assets/images/print/good_print.png" alt="">
        </div>
      </div>
      <div class="bottomBox">
        <div class="bottomBox_left noprint" @click="printDialog = false">{{ $t("commons.cancel") }}</div>
        <div class="bottomBox_right noprint" @click="printInfo">印刷</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      printDialog: false,
      expenseDetailNum: "",
      accountName: "",
      detailData: {
        checkIn: {},
      },
      currentRoom: {},
      consumeOrderList: [],
      taxList: [],
    };
  },
  mounted() {},
  methods: {
    getConsumeSum() {
      let count = 0;
      this.consumeOrderList.forEach((item) => {
        if (item.priceType == 101) {
          count += item.price * item.projectCount;
        } else {
          count += item.consumePrice;
        }
      });
      return count;
    },
    //获取房间号
    getHouseNums() {
      let rooms = [];
      this.detailData.inRoomList.forEach((item) => {
        rooms.push(item.houseNum);
      });
      return rooms.join(",");
    },
    //获取房间总人数
    getPersons() {
      let count = 0;
      this.detailData.inRoomList.forEach((item) => {
        count += item.personList.length;
      });
      return count;
    },

    getCurrentDate() {
      return this.$F.formatDate("yyyy-MM-dd");
    },

    findHotelInfo() {
      this.$F.doRequest(this, "/pms/hotelservice/findone", {}, (res) => {
        this.hotelData = res;
        console.log(res);
      });
    },
    openDialog(expenseDetailNum, detailData, currentRoom) {
      console.log(JSON.parse(JSON.stringify(detailData)));
      console.log(JSON.parse(JSON.stringify(currentRoom)));
      this.detailData = detailData;
      this.currentRoom = currentRoom;
      this.consume_order_list(detailData.checkIn.id);
      this.accountName = JSON.parse(sessionStorage.userData).user.account;
      this.expenseDetailNum = expenseDetailNum;
      this.printDialog = true;
    },
    printInfo() {
      this.$F.doPrint("expenseDetail");
    },

    consume_order_list(checkInId) {
      this.$F.doRequest(
        this,
        "/pms/consume/consume_order_list",
        {
          checkInId: checkInId,
          pageIndex: 1,
          pageSize: 999,
        },
        (res) => {
          let list = res.consumeOrderList;
          let arr = [];
          for (let i = 0; i < list.length; i++) {
            let element = list[i];
            if ([6, 8, 14, 22].indexOf(element.priceType) != -1) {
              arr.push(element);
            }
          }
          this.consumeOrderList = arr;

          // 把预定项目搞进来
          this.detailData.checkIn.reserveProjectList.forEach((item) => {
            item.priceType = 101;
          });
          this.consumeOrderList = this.consumeOrderList.concat(
            this.detailData.checkIn.reserveProjectList
          );
          console.log(this.consumeOrderList);
          // 把全天房费还有早餐晚餐放一起  搞进来  这里有点歧义  有点麻烦 沟通后再说

          //温泉税 住宿税
          arr = [];
          for (let i = 0; i < list.length; i++) {
            let element = list[i];
            if ([15, 16].indexOf(element.priceType) != -1) {
              arr.push(element);
            }
          }
          this.taxList = arr;
        }
      );
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
  // width: 100vw;
  // height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  // background-color: pink;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 900;
  .flex();

  .innerDialogBox {
    border-radius: 6px;
    width: 95%;
    height: 95%;
    overflow: auto;
    background-color: #fff;

    .headerTitle {
      width: 95%;
      background-color: rgb(200, 216, 241);
      padding: 10px 20px;
      position: fixed;
      top: 2.5%;
      .flex(space-between, center);

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
        .flex(space-between, center);

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
          .flex(flex-start, flex-start);

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
      }

      .fifthTable {
        margin-top: 10px;

        table {
          text-align: center;
          width: 100%;
          border-collapse: collapse;

          .fifth_rowOne {
            td {
              padding: 10px 0;

              &:nth-child(1) {
                background: #ededed;
              }
            }
          }

          .fifth_rowTwo {
            td {
              padding: 10px 0;

              &:nth-child(1) {
                background: #ededed;
              }
            }
          }
        }

        .fifth_bottom {
          margin-top: 5px;
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
        cursor: default;
      }

      .bottomBox_right {
        padding: 10px 30px;
        background-color: rgb(64, 158, 255);
        border-radius: 6px;
        margin-left: 15px;
        color: #fff;
        cursor: default;
      }
    }
  }
}
</style>
