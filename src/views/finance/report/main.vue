<template>
  <div class="boss-index">
    <!-- 总部报表 -->
    <!-- <div style="margin-bottom: 20px" v-if="shopNo==number">
      <div class="diaryTable">{{$t('desk.book_HQtable')}}</div>
      <el-divider></el-divider>
      <div class="reportHome">
        <div class="listBox">
          <ul v-for="(item, index) in headquartersList" :key="index">
            <li v-for="(each, i) in item" :key="index + '_' + i" @click="addReport(each)">
              <img src="../../../assets/images/star.png" alt width="20" />
              <span>{{ each.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div> -->
    <!-- 总部销售日报 -->
    <div style="margin-bottom: 20px" v-if="shopNo==number">
      <div class="diaryTable">总部销售日报</div>
      <el-divider></el-divider>
      <div class="reportHome">
        <div class="listBox">
          <ul v-for="(item, index) in headSealList" :key="index">
            <li v-for="(each, i) in item" :key="index + '_' + i" @click="addReport(each)">
              <img src="../../../assets/images/star.png" alt width="20" />
              <span>{{ each.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 估价单 请款单 消费明细 收据 -->
    <!-- <div style="margin-bottom: 20px" v-if="sourcePage == 'desk'">
      <div class="diaryTable">
        {{ $t("boss.report_valueBill") }}
        {{ $t("boss.report_pleaseInvoice") }} {{ $t("boss.report_constDetail") }} {{ $t("boss.report_receipt") }}
      </div>
      <el-divider></el-divider>
      <div class="reportHome">
        <div class="listBox">
          <ul v-for="(item, index) in valueBill" :key="index">
            <li v-for="(each, i) in item" :key="index + '_' + i" @click="addReport(each)">
              <img src="../../../assets/images/star.png" alt width="20" />
              <span>{{ each.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div> -->
    <!-- 预约相关表 -->
    <div style="margin-bottom: 20px">
      <div class="diaryTable">{{$t('boss.report_reservation')}}</div>
      <el-divider></el-divider>
      <div class="reportHome">
        <div class="listBox">
          <ul v-for="(item, index) in bookList" :key="index">
            <li v-for="(each, i) in item" :key="index + '_' + i" @click="addReport(each)">
              <img src="../../../assets/images/star.png" alt width="20" />
              <span>{{ each.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 前台报表 -->
    <!-- <div style="margin-bottom: 20px" v-if="sourcePage == 'desk'">
      <div class="diaryTable">{{$t('boss.report_deskForm')}}</div>
      <el-divider></el-divider>
      <div class="reportHome">
        <div class="listBox">
          <ul v-for="(item, index) in deskList" :key="index">
            <li v-for="(each, i) in item" :key="index + '_' + i" @click="addReport(each)">
              <img src="../../../assets/images/star.png" alt width="20" />
              <span>{{ each.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div> -->
    <!-- 日计表 -->
    <div style="margin-bottom: 20px">
      <div class="diaryTable">{{$t('boss.report_dailyAccount')}}</div>
      <el-divider></el-divider>
      <div class="reportHome">
        <div class="listBox">
          <ul v-for="(item, index) in dayList" :key="index">
            <li v-for="(each, i) in item" :key="index + '_' + i" @click="addReport(each)">
              <img src="../../../assets/images/star.png" alt width="20" />
              <span>{{ each.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 月度报表 -->
    <div style="margin-bottom: 20px">
      <div class="diaryTable">{{$t('boss.report_monthReport')}}</div>
      <el-divider></el-divider>
      <div class="reportHome">
        <div class="listBox">
          <ul v-for="(item, index) in monthList" :key="index">
            <li v-for="(each, i) in item" :key="index + '_' + i" @click="addReport(each)">
              <img src="../../../assets/images/star.png" alt width="20" />
              <span>{{ each.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 菜品准备 -->
    <div style="margin-bottom: 20px">
      <div class="diaryTable">菜品准备</div>
      <el-divider></el-divider>
      <div class="reportHome">
        <div class="listBox">
          <ul v-for="(item, index) in goodList" :key="index">
            <li v-for="(each, i) in item" :key="index + '_' + i" @click="addReport(each)">
              <img src="../../../assets/images/star.png" alt width="20" />
              <span>{{ each.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["sourcePage", "shopNo"],
  computed: {
    //估价单 请款单 消费明细 收据
    valueBill() {
      return [
        [
          {
            title: this.$t("boss.report_valueBill"),
            reportType: 11,
            reportNum: 1002,
          },
        ],
        [
          {
            title: this.$t("boss.report_pleaseInvoice"),
            reportType: 12,
            reportNum: 1002,
          },
        ],
        [
          {
            title: this.$t("boss.report_constDetail"),
            reportType: 13,
            reportNum: 1002,
          },
        ],
        [
          {
            title: this.$t("boss.report_receipt"),
            reportType: 14,
            reportNum: 1002,
          },
        ],
      ];
    },
    // 预约相关表
    bookList() {
      return [
        [
          {
            title: this.$t("boss.report_bookSale"),
            reportType: 34,
            reportNum: 1007,
          },
          {
            title: this.$t("boss.report_dayHappen"),
            reportType: 38,
            reportNum: 1007,
          },
          // {
          //   title: this.$t("boss.report_teamForm"),
          //   reportType: 42,
          //   reportNum: 1007,
          // },
        ],
        [
          {
            title: this.$t("boss.report_bookDayPer"),
            reportType: 35,
            reportNum: 1007,
          },
          // {
          //   title: this.$t("boss.report_bookSureBook"),
          //   reportType: 39,
          //   reportNum: 1007,
          // },
        ],
        // [
        //   {
        //     title: this.$t("boss.report_threeMonth"),
        //     reportType: 36,
        //     reportNum: 1007,
        //   },
        //   {
        //     title: this.$t("boss.report_bookCard"),
        //     reportType: 40,
        //     reportNum: 1007,
        //   },
        // ],
        [
          {
            title: this.$t("boss.report_individual"),
            reportType: 37,
            reportNum: 1007,
          },
          // {
          //   title: this.$t("boss.report_liveCard"),
          //   reportType: 41,
          //   reportNum: 1007,
          // },
        ],
      ];
    },
    //前台报表
    deskList() {
      return [
        [
          {
            title: this.$t("boss.report_deskForm"),
            reportType: 25,
            reportNum: 1005,
          },
          {
            title: this.$t("boss.report_banquetReport"),
            reportType: 28,
            reportNum: 1005,
          },
        ],
        [
          {
            title: this.$t("boss.report_guestRoom"),
            reportType: 26,
            reportNum: 1005,
          },
        ],
        [
          {
            title: this.$t("boss.report_dayBack"),
            reportType: 27,
            reportNum: 1005,
          },
        ],
        [
          {
            title: this.$t("boss.report_clearBook"),
            reportType: 29,
            reportNum: 1005,
          },
        ],
      ];
    },
    //日计表
    dayList() {
      return [
        [
          {
            title: this.$t("boss.report_dailyAccount"),
            reportType: 1,
            reportNum: 1001,
          },
          // {
          //   title: this.$t("boss.report_saleLook"),
          //   reportType: 5,
          //   reportNum: 1001,
          // },
          {
            title: this.$t("boss.report_constDetailSure"),
            // reportType: 7,
            reportType: 9,
            reportNum: 1001,
          },
          {
            title: this.$t("boss.report_goodAserve"),
            reportType: 43,
            reportNum: 1001,
          },
        ],
        [
          {
            title: this.$t("boss.report_saleDaily"),
            reportType: 2,
            reportNum: 1001,
          },
          {
            title: this.$t("boss.report_notGet"),
            reportType: 6,
            reportNum: 1001,
          },
          {
            title: this.$t("boss.report_miniBar"),
            reportType: 10,
            reportNum: 1001,
          },
        ],
        [
          {
            title: this.$t("boss.report_freshType"),
            reportType: 3,
            reportNum: 1001,
          },
          {
            title: this.$t("boss.report_accountBalance"),
            reportType: 7,
            reportNum: 1001,
          },
        ],
        [
          {
            title: this.$t("boss.report_paymentDetail"),
            reportType: 4,
            reportNum: 1001,
          },
          // {
          //   title: this.$t("boss.report_confirmation"),
          //   reportType: 8,
          //   reportNum: 1001,
          // },
        ],
      ];
    },
    //月度报表
    monthList() {
      return [
        [
          {
            title: this.$t("boss.report_monthForm"),
            reportType: 15,
            reportNum: 1003,
          },
          {
            title: this.$t("boss.report_freshClass"),
            // reportType: 19,
            reportType: 45,
            reportNum: 1003,
          },
          {
            title: this.$t("boss.report_roomLive"),
            reportType: 23,
            reportNum: 1003,
          },
        ],
        [
          // {
          //   title: this.$t("boss.report_weekLook"),
          //   reportType: 16,
          //   reportNum: 1003,
          // },
           {
            title: this.$t("boss.report_monthDepartment"),
            reportType: 18,
            reportNum: 1003,
          },
          {
            title: this.$t("boss.report_everyShui"),
            reportType: 20,
            reportNum: 1003,
          },
          {
            title: this.$t("boss.report_goodsKinds"),
            // reportType: 19,
            reportType: 45,
            reportNum: 1003,
          },
        ],
        [
          {
            title: this.$t("boss.report_departmentClass"),
            reportType: 17,
            reportNum: 1003,
          },
          // {
          //   title: this.$t("boss.report_printedPaper"),
          //   reportType: 21,
          //   reportNum: 1003,
          // },
        ],
        [
         
          {
            title: this.$t("boss.report_roomType"),
            reportType: 22,
            reportNum: 1003,
          },
        ],
      ];
    },
    //总部报表
    headquartersList() {
      return [
        [
          {
            title: this.$t("desk.book_HQsale"),
            reportType: 24,
            reportNum: 1004,
          },
        ],
      ];
    },
    //总部销售日报
    headSealList() {
      return [
        [
          {
            title: "总部销售日报表",
            reportType: 44,
            reportNum: 1001,
          },
        ],
      ];
    },
    //菜品准备
    goodList() {
      return [
        [
          {
            title: "10日間料理通し",
            reportType: 30,
            reportNum: 1006,
          },
        ],
        [
          {
            title: "料理通し（夕食）",
            reportType: 31,
            reportNum: 1006,
          },
        ],
        [
          {
            title: "料理通し（朝食）",
            reportType: 32,
            reportNum: 1006,
          },
        ],
        [
          {
            title: "料金通し（日替わり）",
            reportType: 33,
            reportNum: 1006,
          },
        ],
      ];
    },
  },

  data() {
    return {
      number: "0000000000",
    };
  },
  created() {
    console.log(this.shopNo);
    console.log(this.sourcePage);
  },
  methods: {
    addReport(item) {
      console.log(item);
      let params = {
        sourcePage: this.sourcePage,
        reportNum: item.reportNum,
        reportType: item.reportType,
      };
      this.$router.push({
        name: "browseReport",
        params: params,
      });
    },
  },
};
</script>

<style lang="scss">
.reportHome {
  display: flex;
  flex-direction: column;

  .title {
    padding: 0 0 20px;
    font-size: 16px;
    color: #333;
    border-bottom: 1px solid #efefef;
  }

  .listBox {
    flex: 1;
    overflow: auto;
    display: flex;
    font-size: 15px;
    ul {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      padding: 0px 30px;
      min-width: 220px;

      & :first-child {
        padding-left: 0;
      }

      li {
        line-height: 30px;
        display: flex;
        align-items: center;
        cursor: pointer;

        img {
          margin-right: 10px;
        }
      }
    }
  }
}

.report {
  height: 100%;
  display: flex;
  flex-direction: column;

  .term {
    background: transparent;
    padding: 0;
    margin-bottom: 10px;

    .el-form-item {
      margin-bottom: 0;
    }

    .inline {
      display: inline-block;
    }
  }

  .reportTitle {
    font-size: 18px;
    line-height: 36px;
    color: #333;
    text-align: center;
    font-weight: 600;
  }

  .subTip {
    line-height: 26px;
    font-size: 14px;
    color: #666;
  }

  .report-table {
    flex: 1;
  }

  .formula {
    padding: 0 16px;
    font-size: 14px;
    color: #666;

    .red {
      color: #d52121;
      margin: 10px 0;
    }
  }
}

.diaryTable {
  color: rgba(51, 51, 51, 100);
  font-size: 16px;
  font-weight: 500;
}
</style>
