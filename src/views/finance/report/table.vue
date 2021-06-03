<!--
 * @Date: 2020-08-27 13:25:04
 * @Author: 陶子
 * @LastEditTime: 2021-05-17 13:36:26
 * @FilePath: \jiudian\src\views\finance\report\table.vue
-->
<template>
  <div>
    <el-card class="box-card" :body-style="{ padding: '10px  20px 0px' }">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item style="cursor: pointer; font-weight: 600" @click.native="backLastStack">{{$t('boss.report_reportTitle')}}</el-breadcrumb-item>
        <el-breadcrumb-item style="font-weight: 700">{{$t('commons.detail')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <div style="margin-top: 10px" v-loading="loading">
      <el-card class="box-card2" :body-style="{ height: 'min: 600px' }">
        <el-form ref="searchForm" :model="searchForm" inline :rules="rules">
          <!-- 日计表-->
          <el-form-item :label="$t('boss.report_businessHours')+':'" v-if="searchForm.reportNum == '1001'||reportType == '31'||reportType == '32'||reportType == '33'">
            <el-date-picker v-model="searchForm.startTime" type="date" value-format="yyyy-MM-dd" :placeholder="$t('boss.report_businessHours')"></el-date-picker>
          </el-form-item>
          <!-- 月报账表-->
          <el-form-item :label="$t('boss.report_businessHours')+':'" v-if="searchForm.reportNum == '1003'">
            <el-date-picker v-model="searchForm.startTime" type="month" value-format="yyyy-MM" :placeholder="$t('boss.report_businessHours')"></el-date-picker>
          </el-form-item>
          <!-- 选择多个日期 -->
          <el-form-item :label="$t('commons.selectDate')+':'" v-if="
              reportType == '11' ||
              reportType == '12' ||
              reportType == '37' ||
              reportType == '38'||
              reportType == '24' ||
              reportType == '30'
            ">
            <el-date-picker v-model="searchForm.startTime" type="date" value-format="yyyy-MM-dd" :placeholder="$t('manager.hp_startTime')"></el-date-picker>
            <span style="margin: 0 5px">-</span>
            <el-date-picker v-model="searchForm.endTime" type="date" value-format="yyyy-MM-dd" :placeholder="$t('manager.hp_endTime')"></el-date-picker>
          </el-form-item>
          <!-- 选择单个日期 -->
          <el-form-item :label="$t('commons.selectDate')+':'" v-if="
              reportType == '13' ||
              reportType == '35' ||
              reportType == '14' ||
              reportType == '39' ||
              reportType == '40' ||
              reportType == '42' ||
              reportType == '25' ||
              reportType == '28' ||
              reportType == '26' ||
              reportType == '27' ||
              reportType == '29'
            ">
            <el-date-picker v-model="searchForm.startTime" type="date" value-format="yyyy-MM-dd" :placeholder="$t('commons.selectDate')"></el-date-picker>
          </el-form-item>
          <!-- 选择单个月份 -->
          <el-form-item :label="$t('boss.report_selectMonth')+':'" v-if="reportType == '34'">
            <el-date-picker v-model="searchForm.startTime" type="month" value-format="yyyy-MM" :placeholder="$t('boss.report_selectMonth')"></el-date-picker>
          </el-form-item>
          <!-- 选择多个月份 -->
          <el-form-item :label="$t('boss.report_selectMonth')+':'" v-if="reportType == '36'">
            <el-date-picker v-model="searchForm.startTime" type="month" value-format="yyyy-MM" :placeholder="$t('boss.report_selectMonth')"></el-date-picker>
            <span style="margin: 0 5px">-</span>
            <el-date-picker v-model="searchForm.endTime" type="month" value-format="yyyy-MM" :placeholder="$t('boss.report_selectMonth')"></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('desk.customer_chooseUnit')+':'" style="margin: 0 20px" v-if="
              reportType == '11' || reportType == '12' || reportType == '13'
            ">
            <el-select v-model="searchForm.enterId" filterable clearable>
              <el-option v-for="(item, index) in unitList" :key="index" :label="item.enterName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('desk.home_customerName')+':'" style="margin: 0 20px" v-if="
              reportType == '13' ||
              reportType == '14' ||
              reportType == '39' ||
              reportType == '40'
            ">
            <el-autocomplete v-model="searchForm.guestName" :fetch-suggestions="remoteMethod" :placeholder="$t('commons.pleaseEnter')" @select="changeName"></el-autocomplete>
          </el-form-item>
          <el-form-item :label="$t('desk.order_teamName')+':'" style="margin: 0 20px" v-if="reportType == '42'">
            <el-autocomplete v-model="searchForm.teamName" :fetch-suggestions="remoteMethod" :placeholder="$t('commons.pleaseEnter')" @select="changeName"></el-autocomplete>
          </el-form-item>
          <!-- 总部门店 -->
          <el-form-item :label="$t('boss.add_chooseStore')+':'" style="margin: 0 20px" v-if="reportType == '24'">
            <el-select v-model="searchForm.selectStoresNums " multiple>
              <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('boss.add_queryText')+':'" v-if="reportType == '24'">
            <el-select v-model="searchForm.idCardTypes" multiple>
              <el-option v-for="(value,key) in $t('commons.queryText')" :key="key" :label="value" :value="key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryReport" v-if="reportType != '41'">{{$t('commons.queryBtn')}}</el-button>
            <!--            <el-button type="primary">打印</el-button>-->
            <el-button type="primary" @click="exportReport">{{$t('commons.exportBtn')}}</el-button>
          </el-form-item>
        </el-form>
        <div class="task-list">
          <table border="1px solid black" v-if="content !== ''">
            <!-- 设置居中,如果没获取到内容则不显示 -->
            <tr>
              <!-- <th style="background:#938965;" v-for="h in content[0]" :key="h.id" :colspan="content.slice(1).length">{{ h }}</th> -->
              <th style="background:#938965;fontSize:24px;" v-for="h in content[0]" :key="h.id" :colspan="content.slice(1)[content.slice(1).length-2].length">{{ h }}</th>
            </tr>
            <!-- 循环读取数据并显示 -->
            <tr v-for="(row, topIndex) in content.slice(1)" :key="topIndex">
              <td v-for="item in row" :key="item.id">{{ valueFormat(item)}}</td>
            </tr>
          </table>
        </div>
      </el-card>

    </div>
  </div>
</template>

<script>
import { getLanguage, setLanguage } from "@/utils/auth";
import axios from "axios";
import XLSX from "xlsx";

export default {
  data() {
    return {
        rules: {
            startTime: [{ required: true, message: this.$t('commons.lostParams'), trigger: "blur" }],
            endTime: [{ required: true, message: this.$t('commons.lostParams'), trigger: "blur" }],
        },
      loading: false,
      reportType: "", //报表类型  reportNum 的子集
      currentReport: {}, //当前report
      exportPrintShow: false,
      content: "", //excel显示的内容
      searchForm: {},
      sourcePage: null,
      unitList: null,
      options: [],
      storeList: [],
    };
  },
  mounted() {
    this.searchForm = {
      languageType: getLanguage() == "ri" ? 2 : 1, //语言类型  1中文  2日文
      reportNum: "", //报表模板种类
      reportType: "", //报表类型  reportNum 的子集
      startTime: "",
      endTime: "",
      enterId: "", //单位id
      guestName: "", //客户名称
      teamName: "", //团队名称
    };
    this.content = "";
    this.sourcePage = this.$route.params.sourcePage; //判定是总办的页面还是前台部的页面
    this.searchForm.reportNum = this.$route.params.reportNum; //接收报表的reportNum
    this.reportType = this.$route.params.reportType || 1; //接收报表的reportType
    if (
      this.reportType == "11" ||
      this.reportType == "12" ||
      this.reportType == "13"
    ) {
      this.getUnitList();
    }
    if (this.reportType == "41") {
      let date = new Date();
      let nowDate = date.toLocaleDateString();
      let array = nowDate.split("/");
      let wantTime = array.join("-");
      this.searchForm.startTime = wantTime;
      this.searchForm.endTime = wantTime;
      this.queryReport();
    }
    if (this.reportType == "24") {
      this.stores_list();
    }
  },
  methods: {
      valueFormat(value) {
          if (value) {
              console.log(value);
              value = value.toString();
              if (value.length >= 10 ) {
                  var r = new RegExp("^[1-2]\\d{3}-(0?[1-9]||1[0-2])-(0?[1-9]||[1-2][1-9]||3[0-1])$");
                  let tempValue = value.substring(0, 10)
                  console.log("tempValue:" + tempValue + " r.test(tempValue):" + r.test(tempValue));
                  if (r.test(tempValue)) {
                      return value;
                  }
              }
          }
          return this.$F.numFormate(value);
      },
    stores_list() {
      this.$F.doRequest(this, "/pms/freeuser/stores_list", {}, (data) => {
        this.storeList = data;
        console.log(this.storeList);
      });
    },
    exportReport() {
      if (this.currentReport.reportHttpUrl) {
        location.href = this.currentReport.reportHttpUrl;
      } else {
        this.$message({
          message: this.$t("boss.report_firstQuery"),
          type: "warning",
        });
      }
    },
    backLastStack() {
      this.$router.go(-1);
    },
    remoteMethod(query, cb) {
      let params = {
        name: query,
        searchType: 1,
        pageIndex: 1,
        pageSize: 999,
        paging: false,
      };
      this.$F.doRequest(
        this,
        "/pms/checkin/checkin_order_list",
        params,
        (res) => {
          this.options = res.roomPersonList || [];
          console.log(this.options);
          if (this.reportType == "42") {
            this.options.forEach((item) => {
              item.value = item.teamName;
            });
          } else {
            this.options.forEach((item) => {
              item.value = item.name;
            });
          }
          cb(this.options);
        }
      );
    },
    changeName(e) {
      console.log(e);
    },
    monthStartTime(year, month) {
      //一个月的开始时间
      var firstDay = new Date(year, month - 1, 1); //这个月的第一天
      var currentMonth = firstDay.getMonth(); //取得月份数
      var lastDay = new Date(firstDay.getFullYear(), currentMonth + 1, 0); //是0而不是-1
      firstDay = firstDay.Format("yyyy-MM-dd"); //格式化
      lastDay = lastDay.Format("yyyy-MM-dd"); //格式化
      return firstDay;
    },
    monthEndTime(year, month) {
      //一个月的结束时间
      var firstDay = new Date(year, month - 1, 1); //这个月的第一天
      var currentMonth = firstDay.getMonth(); //取得月份数
      var lastDay = new Date(firstDay.getFullYear(), currentMonth + 1, 0); //是0而不是-1
      firstDay = firstDay.Format("yyyy-MM-dd"); //格式化
      lastDay = lastDay.Format("yyyy-MM-dd"); //格式化
      return lastDay;
    },
    //请求 单位 列表
    getUnitList() {
      this.$F.doRequest(this, "/pms/hotelenter/list", {}, (res) => {
        this.unitList = res.list;
      });
    },
    queryReport() {
      //组织报表入参 需要根据不同得reportType做判断
      this.content = "";
      this.searchForm.languageType = getLanguage() == "ri" ? 2 : 1; //语言类型  1中文  2日文
      this.searchForm.reportType = this.reportType;
      if (
        this.searchForm.reportNum == 1001 ||
        this.reportType == 13 ||
        this.reportType == 14 ||
        this.reportType == 35 ||
        this.reportType == 39 ||
        this.reportType == 40 ||
        this.reportType == 42 ||
        this.reportType == 25 ||
        this.reportType == 26 ||
        this.reportType == 27 ||
        this.reportType == 29 ||
        this.reportType == 28
      ) {
          if (!this.searchForm.startTime) {
              return this.$message.warning(this.$t('commons.lostParams'));
          }
        //日计表
        this.searchForm.endTime = this.searchForm.startTime;
      }
      if (this.searchForm.reportNum == 1003 || this.reportType == 34) {
        //月度报表
          if (!this.searchForm.startTime) {
              return this.$message.warning(this.$t('commons.lostParams'));
          }
        let year = this.searchForm.startTime.substr(0, 4);
        let month = this.searchForm.startTime.substr(-2, 2);
        this.searchForm.startTime = this.monthStartTime(year, month);
        this.searchForm.endTime = this.monthEndTime(year, month);
      }
      if (this.reportType == 36) {
          if (!this.searchForm.startTime) {
              return this.$message.warning(this.$t('commons.lostParams'));
          }
        let yearA = this.searchForm.startTime.substr(0, 4);
        let monthA = this.searchForm.startTime.substr(-2, 2);
        let yearB = this.searchForm.endTime.substr(0, 4);
        let monthB = this.searchForm.endTime.substr(-2, 2);
        this.searchForm.startTime = this.monthStartTime(yearA, monthA);
        this.searchForm.endTime = this.monthEndTime(yearB, monthB);
      }
      //总部门店
      if (this.reportType == 24) {
        this.searchForm.selectStoresNums = this.searchForm.selectStoresNums.join(
          ","
        );
        console.log(this.searchForm.selectStoresNums);
      }

      this.$F.doRequest(
        this,
        "/pms/report/select_report",
        this.searchForm,
        (res) => {
          if (res.logList && res.logList.length > 0) {
            let array = res.logList.filter((item) => {
              return item.reportNum == this.searchForm.reportNum;
            });
            this.currentReport = array[0];
            this.showReport(array[0]);
          }
          this.exportPrintShow = true;
        }
      );
    },
    showReport(item) {
      // var url = "https://pms-api-dev.sgi-smacha.tokyo/report/fs/20201202123355.xlsx" //放在public目录下的文件可以直接访问
      //               https://pms-api-dev.sgi-smacha.tokyo/report/fs/1001/20201203/%E6%97%A5%E8%A8%88%E8%A1%A8201203.xlsx
      //读取二进制excel文件,参考https://github.com/SheetJS/js-xlsx#utility-functions
        var reportHttpUrl = item.reportHttpUrl;
        var reportLocalUrl = item.reportLocalUrl;
        let url = "/pms-server/pms/system/download?platSource=1005&fileName=" + reportLocalUrl;
        axios
        .get(url, { responseType: "arraybuffer" })
        .then((res) => {
          var data = new Uint8Array(res.data);
          var wb = XLSX.read(data, { type: "array" });
          var sheets = wb.Sheets;
          this.content = this.transformSheets(sheets);
        })
        .catch((err) => {
          this.err = err;
        });
    },

    transformSheets(sheets) {
      let a = this;
      var content = [];
      var content1 = [];
      var tmplist = [];
      let index = 1;
      for (let key in sheets) {
        //读出来的workbook数据很难读,转换为json格式,参考https://github.com/SheetJS/js-xlsx#utility-functions
        tmplist.push(XLSX.utils.sheet_to_json(sheets[key]).length);
        content1.push(XLSX.utils.sheet_to_json(sheets[key]));
        break;
      }
      var maxLength = Math.max.apply(Math, tmplist);
      //进行行列转换
      for (let y in [...Array(maxLength)]) {
        content.push([]);
        for (let x in [...Array(tmplist.length)]) {
          try {
            for (let z in content1[x][y]) {
              content[y].push(content1[x][y][z]);
            }
          } catch (error) {
            content[y].push(" ");
          }
        }
      }

      content.unshift([]);
      for (let key in sheets) {
        content[0].push(key);
      }
      return content;
    },
  },
};
</script>

<style lang='less' scoped>
.box-card {
  width: 100%;
}

.el-card .el-card__body {
  padding: 0 20px;
}

.box-card2 {
  height: 100%;
}

.overLine {
  width: 100%;
  border: 1px solid rgba(225, 225, 225, 1);
  margin-bottom: 20px;
}
/*** */
table {
  // border-collapse: collapse;
  // margin: 0 auto;
  border-spacing: 0;
  text-align: center;
}
table td,
table th {
  width: 100px;
  border: 1px solid #cad9ea;
  color: #666;
  height: 30px;
}
table th {
  background-color: red;
}
table thead th {
  background-color: #cce8eb;
  width: 100px;
}
table tr:nth-child(odd) {
  background: #fff;
}
table tr:nth-child(even) {
  background: #f5fafa;
}
</style>
