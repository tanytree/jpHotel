<!--
 * @Date: 2021-02-23 16:02:48
 * @Author: 陶子
 * @LastEditTime: 2021-03-19 17:13:43
 * @FilePath: \jiudian\src\components\table\checkOutRoom.vue
 * @pageName: 这是--（结账退房单据打印  组件）--页面
-->
<template>
    <div v-if="printDialog" class="dialogBox" id="checkOutRoom">
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
                <div class="fifthTabel">
                    <div class="fifth_titleBox">
                        <div class="fifthTitle_left">
                            <div>お名前</div>
                            <div>Name {{ detailData.checkIn.name }}様</div>
                        </div>
                        <div class=" fifthTitle_right">
                            <div class="boldText">領収書</div>
                            <div>Receipt</div>
                        </div>
                    </div>
                    <div class="fifth_container">
                        <div class='fifth_leftBox'>
                            <div class='boxDiv'>
                                <div class="itemDiv">
                                    <table>
                                        <tr>
                                            <td>合計領収金額</td>
                                            <td>¥{{$F.numFormate(hotTaxPrice + hotelTaxPrice + consumTaxPrice)}}</td>
                                        </tr>
                                        <tr>
                                            <td>内入湯税</td>
                                            <td>（¥{{ $F.numFormate(hotTaxPrice) }}）</td>
                                        </tr>
                                        <tr>
                                            <td>内宿泊税</td>
                                            <td>（¥{{$F.numFormate(hotelTaxPrice)}}）</td>
                                        </tr>
                                        <tr>
                                            <td>内消費税</td>
                                            <td>（¥{{$F.numFormate(consumTaxPrice)}}）</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="itemDiv">
                                    <table>
                                        <tr v-for="(charge, index) in chargeList" :key="index">
                                            <td>{{ $t('commons.paymentWay')[charge.putUp] }}</td>
                                            <td>¥{{$F.numFormate(charge.payPrice)}}</td>
                                        </tr>
<!--                                        <tr>-->
<!--                                            <td>ポイント利用</td>-->
<!--                                            <td>（¥100）</td>-->
<!--                                        </tr>-->
                                    </table>
                                </div>
                                <div class="itemDiv">
                                    <table>
                                        <tr v-for="(pay, index) in payList" :key="index">
                                            <td>{{ $t('commons.payType')[pay.payType] }}</td>
                                            <td>¥{{$F.numFormate(pay.payPrice)}}</td>
                                        </tr>
<!--                                        <tr>-->
<!--                                            <td>クレジットカード</td>-->
<!--                                            <td>（¥100）</td>-->
<!--                                        </tr>-->
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="fifth_rightBox">
                            <div class="fifthRight_top">
                                <div class="rightOfTable">
                                    <div> No.: {{ expenseDetailNum }}</div>
                                    <div>Rsv.: {{ detailData.checkIn.orderNum }}</div>
                                    <div>Date: {{ $F.getCurrentDate() }}</div>
                                    <div>担当者: {{$F.getAccountName()}}</div>
                                </div>
                            </div>
                            <div class="fifthRight_middle">
                                <div>ホテル名：{{ hotelData.name }}</div>
                                <div>ホテル住所：{{ hotelData.address }}</div>
                                <div>ホテル電話：{{ hotelData.phone }}</div>
                            </div>
                            <div class="fifthRight_bottom">
                                <div>印収</div>
                                <div style="margin-top:10px;">紙入</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="inscribeBox">
                    <div class="inscribe_top">￥　{{ $F.numFormate(params.consumeSum) }}円</div>
                    <div class="inscribe_bottom">上記の通り、正に領収いたしました。</div>
                </div>
                <div class="lastBox">
                    <img src="~@/assets/images/print/good_print.png" alt="">
                    <div class="urlPath">https://okura-club-hotels.com</div>
                </div>
            </div>

            <div class="bottomBox">
                <div class="bottomBox_left noprint" @click="printDialog = false">{{ $t("commons.cancel") }}</div>
                <div class="bottomBox_right noprint" @click='printCheckout'>印刷</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            expenseDetailNum: "",
            printDialog: false,
            detailData: {
                checkIn: {},
            },
            currentRoom: {},
            hotelData: {},
            params: {},
            consumeOrderList: [],
            taxList: [],
            consumTaxPrice: 0, //消费税
            hotTaxPrice: 0,   //温泉税
            hotelTaxPrice: 0,//住宿费
            chargeList: [], //挂账列表
            payList: [], // 已经支付的  包括收款跟押金
        };
    },
    mounted() {
    },
    methods: {
        printCheckout() {
            this.$F.doPrint("checkOutRoom");
        },
        openDialog(detailData, currentRoom, params) {
            console.log(JSON.parse(JSON.stringify(params)));
            console.log(JSON.parse(JSON.stringify(detailData)));
            console.log(JSON.parse(JSON.stringify(currentRoom)));
            this.detailData = detailData;
            this.params = params;
            this.currentRoom = currentRoom;
            this.printDialog = true;
            this.$F.getPrintNum('RE', (res) => {
                this.expenseDetailNum = res;
            })
            this.$F.findHotelInfo((res) => {
                this.hotelData = res;
            });
            this.consume_order_list(detailData.checkIn.id);
        },
        printCollection() {
            this.$F.doPrint("articleCollection");
            this.initDetail()
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
                    let a = this;
                    this.chargeList = []; //挂账
                    this.payList = [];
                    for (let i = 0; i < list.length; i++) {
                        let element = list[i];
                        if (element.consumTaxPrice) {
                            a.consumTaxPrice += element.consumTaxPrice
                        }
                        if (element.priceType == 15) {
                            a.hotTaxPrice += element.consumePrice
                        }
                        if (element.priceType == 16) {
                            a.hotelTaxPrice += element.consumePrice
                        }
                        if (element.priceType == 13 && element.putUp != 1) {
                            this.chargeList.push(element);
                        }
                        if (element.priceType == 2 || element.priceType == 3) {
                            this.payList.push(element);
                        }
                    }
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
                    .flex(space-between, center);

                    .fifthTitle_left {
                        text-align: left;
                        font-weight: 500;
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
                    .flex(flex-start, flex-start);

                    .fifth_leftBox {
                        width: 55%;

                        .boxDiv {
                            border: 1px solid #727272;
                            width: 100%;

                            .itemDiv {
                                width: 100%;

                                table {
                                    width: 100%;
                                    border-bottom: 1px solid #727272;
                                    border-spacing: 0;

                                    tr {
                                        margin: 0;
                                        padding: 0;

                                        td {
                                            word-break: break-all;
                                            padding: 5px 0;

                                            &:nth-child(1) {
                                                width: 75%;
                                                border-right: 1px solid #727272;
                                                padding-left: 15px;
                                            }

                                            &:nth-child(2) {
                                                width: 25%;
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
                            .flex(center, center, column);
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
