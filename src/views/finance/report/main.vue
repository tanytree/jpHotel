<template>
  <div class="boss-index">
    <div style="margin-bottom: 20px" v-if="sourcePage == 'desk'" >
      <div class="diaryTable">估价单 请款单 消费明细 收据</div>
      <el-divider></el-divider>
      <div class="reportHome">
        <div class="listBox">
          <ul v-for="(item, index) in valueBill" :key="index">
            <li
              v-for="(each, i) in item"
              :key="index + '_' + i"
              @click="addReport(each)"
            >
              <img src="../../../assets/images/star.png" alt width="20" />
              <span>{{ each.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 20px"  v-if="sourcePage == 'desk'">
      <div class="diaryTable">预约相关表</div>
      <el-divider></el-divider>
      <div class="reportHome">
        <div class="listBox">
          <ul v-for="(item, index) in bookList" :key="index">
            <li
              v-for="(each, i) in item"
              :key="index + '_' + i"
              @click="addReport(each)"
            >
              <img src="../../../assets/images/star.png" alt width="20" />
              <span>{{ each.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 20px"  v-if="sourcePage == 'desk'">
      <div class="diaryTable">前台报表</div>
      <el-divider></el-divider>
      <div class="reportHome">
        <div class="listBox">
          <ul v-for="(item, index) in deskList" :key="index">
            <li
              v-for="(each, i) in item"
              :key="index + '_' + i"
              @click="addReport(each)"
            >
              <img src="../../../assets/images/star.png" alt width="20" />
              <span>{{ each.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 20px">
      <div class="diaryTable">日计表</div>
      <el-divider></el-divider>
      <div class="reportHome">
        <div class="listBox">
          <ul v-for="(item, index) in dayList" :key="index">
            <li
              v-for="(each, i) in item"
              :key="index + '_' + i"
              @click="addReport(each)"
            >
              <img src="../../../assets/images/star.png" alt width="20" />
              <span>{{ each.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 20px">
      <div class="diaryTable">月报账表</div>
      <el-divider></el-divider>
      <div class="reportHome">
        <div class="listBox">
          <ul v-for="(item, index) in monthList" :key="index">
            <li
              v-for="(each, i) in item"
              :key="index + '_' + i"
              @click="addReport(each)"
            >
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
import { mapState, mapActions } from "vuex";

export default {
  props: ["sourcePage"],
  computed: {
    //估价单 请款单 消费明细 收据
    valueBill() {
      return [
        [
          {
            title: "估价单",
            reportType: 11,
            reportNum: 1002,
          },
        ],
        [
          {
            title: "单位请款单",
            reportType: 12,
            reportNum: 1002,
          },
        ],
        [
          {
            title: "消费明细",
            reportType: 13,
            reportNum: 1002,
          },
        ],
        [
          {
            title: "收据",
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
            title: "预约销售状况表",
            reportType: 34,
            reportNum: 1007,
          },
          {
            title: "日别状况表",
            reportType: 38,
            reportNum: 1007,
          },
          {
            title: "团体排房表",
            reportType: 42,
            reportNum: 1007,
          },
        ],
        [
          {
            title: "预约日报",
            reportType: 35,
            reportNum: 1007,
          },
          {
            title: "预约确认书",
            reportType: 39,
            reportNum: 1007,
          },
        ],
        [
          {
            title: "3个月预约状况表",
            reportType: 36,
            reportNum: 1007,
          },
          {
            title: "预约卡",
            reportType: 40,
            reportNum: 1007,
          },
        ],
        [
          {
            title: "个别状况表",
            reportType: 37,
            reportNum: 1007,
          },
          {
            title: "住宿登记卡",
            reportType: 41,
            reportNum: 1007,
          },
        ],
      ];
    },
    //前台报表
    deskList() {
      return [
        [
          {
            title: "前台报表",
            reportType: 25,
            reportNum: 1005,
          },
          {
            title: "宴会场报表",
            reportType: 28,
            reportNum: 1005,
          },
        ],
        [
          {
            title: "客房报表",
            reportType: 26,
            reportNum: 1005,
          },
        ],
        [
          {
            title: "日归报表",
            reportType: 27,
            reportNum: 1005,
          },
        ],
        [
          {
            title: "清扫指示书",
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
            title: "日计表",
            reportType: 1,
            reportNum: 1001,
          },
          {
            title: "收据别销售一览",
            reportType: 5,
            reportNum: 1001,
          },
          {
            title: "消费明细确认表",
            reportType: 7,
            reportNum: 1001,
          },
        ],
        [
          {
            title: "分类别销售一览表 日报",
            reportType: 2,
            reportNum: 1001,
          },
          {
            title: "应收未收款一览",
            reportType: 4,
            reportNum: 1001,
          },
          {
            title: "Mini Bar消费明细",
            reportType:10,
            reportNum:1001
          },
        ],
        [
          {
            title: "菜品级别销售一览",
            reportType: 1,
            reportNum: 1001,
          },
          {
            title: "挂账余额明细",
            reportType: 4,
            reportNum: 1001,
          },
        ],
        [
          {
            title: "付款明细",
            reportType: 4,
            reportNum: 1001,
          },
          {
            title: "付款明细确认表",
            reportType: 8,
            reportNum: 1001,
          },
        ],
      ];
    },
    //月度报表
    monthList(){
         return [
        [
          {
            title: "月报",
            reportType: 15,
            reportNum: 1003,
          },{
            title: "菜品级别销售一览月次",
            reportType: 19,
            reportNum: 1003,
          },{
            title: "房间别入住状况",
            reportType: 23,
            reportNum: 1003,
          },
        ],
        [
          {
            title: "星期别销售一览",
            reportType: 16,
            reportNum: 1003,
          },{
            title: "消费税·入汤税·宿泊税",
            reportType: 20,
            reportNum: 1003,
          },
        ],
        [
          {
            title: "部门别·科目分类消费一览（月次）",
            reportType: 17,
             reportNum: 1003,
          },{
            title: "印纸",
            reportType: 21,
            reportNum: 1003,
          },
        ],
        [
          {
            title: "月别部门·科目类消费一览（月次）",
            reportType: 18,
            reportNum: 1003,
          },{
            title: "房型别入住状况",
            reportType: 22,
            reportNum: 1003,
          },
        ],
      ];
    }
  },

  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    addReport(item) {
      console.log(item);
      this.$router.push({
        name: "browseReport",
        params: {
          sourcePage: this.sourcePage,
          reportNum: item.reportNum || 1001,
          reportType: item.reportType || 1,
        },
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
        line-height: 40px;
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
