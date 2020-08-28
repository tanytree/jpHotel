<template>
  <div class="boss-index">
    <el-card shadow="never">
      <el-tabs v-model="reportName" type="card" @tab-remove="removeTab">
        <el-tab-pane :label="$t('boss.report_home')" name="home">
          <div class="reportHome">
            <div class="title">{{report_deskReport}}</div>
            <div class="listBox">
              <ul v-for="(item, index) in arr" :key="index">
                <li v-for="(son, i) in item" :key="index + '_' + i" @click="addReport(son)">
                  <img src="../../../assets/images/star.png" alt width="20" />
                  <span>{{son.title}}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          v-if="reportNav.length > 0"
          v-for="(pane, $index) in reportNav"
          closable
          :key="$index"
          :label="pane.title"
          :name="pane.path"
        >
          <div class="report">
            <el-form ref="form" size="small" inline :model="form" class="term line">
              <div class="inline" v-if="pane.path == 'day'">
                <el-form-item :label="$t('boss.report_businessHours')+'：'">
                  <el-date-picker type="date" v-model="form.date"></el-date-picker>
                </el-form-item>
              </div>
              <div class="inline" v-if="pane.path == 'month'">
                <el-form-item :label="$t('boss.report_businessHours')+'：'">
                  <el-date-picker type="date" v-model="form.strDate"></el-date-picker>
                  <span class="line">{{$t('boss.report_toText')}}</span>
                  <el-time-picker type="date" v-model="form.endDate"></el-time-picker>
                </el-form-item>
                <el-form-item>
                  <el-radio-group v-model="form.cate">
                    <el-radio-button value="curMonth" :label="$t('boss.report_thisMonth')"></el-radio-button>
                    <el-radio-button value="lastMonth" :label="$t('boss.report_lastMonth')"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </div>
              <el-form-item>
                <el-button type="primary" class="submit">{{$t('commons.queryBtn')}}</el-button>
<!--                <el-button type="primary" class="submit">{{$t('commons.print')}}</el-button>-->
                <el-button type="primary" class="submit">{{$t('commons.exportBtn')}}</el-button>
              </el-form-item>
            </el-form>
            <div class="reportTitle">{{pane.title}}</div>
            <div
              class="subTip"
            >{{$t('boss.report_businessHours')+'：'}}{{strTime}} {{$t('boss.report_toText')}} {{endTime}}</div>
            <reportTable :type="pane.path" :reportData="reportData" />
            <div class="formula">
              <div class="red">{{$t('boss.report_computeFormula')}}</div>
              <div>{{$t('boss.report_computeContent')}}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import reportTable from "./table";

export default {
  computed: {
    report_deskReport() {
      return this.$t("boss.report_deskReport");
    },
    reports: {
      get() {
        return [
          { title: this.$t("boss.report_day"), path: "day" },
          { title: this.$t("boss.report_month"), path: "month" },
          { title: this.$t("boss.report_year"), path: "year" },
          { title: this.$t("boss.report_detailed"), path: "detailed" },
          { title: this.$t("boss.report_mini"), path: "mini" },
          { title: this.$t("boss.report_summary"), path: "summary" },
          { title: this.$t("boss.report_sumDetailed"), path: "sumDetailed" },
          { title: this.$t("boss.report_vip"), path: "vip" },
          {
            title: this.$t("boss.report_accountDetailed"),
            path: "accountDetailed",
          },
          { title: this.$t("boss.report_accountUnit"), path: "accountUnit" },
          {
            title: this.$t("boss.report_salesDetailed"),
            path: "salesDetailed",
          },
          { title: this.$t("boss.report_sales"), path: "sales" },
          { title: this.$t("boss.report_classes"), path: "classes" },
          { title: this.$t("boss.report_cashier"), path: "cashier" },
          { title: this.$t("boss.report_expand"), path: "expand" },
          { title: this.$t("boss.report_income"), path: "income" },
        ];
      },
      set() {},
    },
  },

  data() {
    return {
      activeName: "report",
      reportName: "home",
      // reports: [
      //   { title: 'boss.report_day', path: 'day' },
      //   { title: 'boss.report_month', path: 'month' },
      //   { title: 'boss.report_year', path: 'year' },
      //   { title: 'boss.report_detailed', path: 'detailed' },
      //   { title: 'boss.report_mini', path: 'mini' },
      //   { title: 'boss.report_summary', path: 'summary' },
      //   { title: 'boss.report_sumDetailed', path: 'sumDetailed' },
      //   { title: 'boss.report_vip', path: 'vip' },
      //   { title: 'boss.report_accountDetailed', path: 'accountDetailed', },
      //   { title: 'boss.report_accountUnit', path: 'accountUnit' },
      //   { title: 'boss.report_salesDetailed', path: 'salesDetailed' },
      //   { title: 'boss.report_sales', path: 'sales' },
      //   { title: 'boss.report_classes', path: 'classes' },
      //   { title: 'boss.report_cashier', path: 'cashier' },
      //   { title: 'boss.report_expand', path: 'expand' },
      //   { title: 'boss.report_income', path: 'income' },
      // ],
      arr: [],
      reportNav: [],
      form: {},
      strTime: "2020-04-26 00:00:00",
      endTime: "2020-04-26 23:59:59",
      reportData: [
        {
          val1: "一、营收合计",
          val2: "7435",
          val3: "6666.88",
          val4: "8435689",
          val5: "8763578",
          val6: "892758934729.88",
        },
        {
          val1: "一、营收合计",
          val2: "7435",
          val3: "6666.88",
          val4: "8435689",
          val5: "8763578",
          val6: "892758934729.88",
        },
        {
          val1: "一、营收合计",
          val2: "7435",
          val3: "6666.88",
          val4: "8435689",
          val5: "8763578",
          val6: "892758934729.88",
        },
        {
          val1: "一、营收合计",
          val2: "7435",
          val3: "6666.88",
          val4: "8435689",
          val5: "8763578",
          val6: "892758934729.88",
        },
      ],
    };
  },
  components: { reportTable },
  mounted() {
    this.arr = this.group(this.reports, 5);
  },
  watch: {
    reports(newValue, oldValue) {
      this.reports = newValue;
      this.arr = this.group(this.reports, 5);
    },
  },
  methods: {
    removeTab(targetName) {
      const index = this.reportNav.findIndex((s) => s.path == targetName);
      this.reportNav = this.reportNav.filter((s) => s.path != targetName);
      if (this.reportNav.length === 0) {
        this.reportName = "home";
      }
      if (this.reportName == targetName) {
        this.reportName = this.reportNav[index - 1].path;
      }
    },
    group(array, length) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += length)));
      }
      debugger;
      return newArray;
    },
    addReport(item) {
      const bool = this.reportNav.some((s) => item.path == s.path);
      if (!bool) {
        this.reportNav.push(item);
      }
      this.reportName = item.path;
    },
  },
};
</script>

<style lang="scss">
.reportHome {
  height: 100%;
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
    height: 0;
    overflow: auto;
    display: flex;

    ul {
      height: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      padding: 20px 30px;
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
</style>
