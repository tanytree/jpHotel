<template>
  <div class>
    <el-card class="box-card">
      <el-row type="flex" class="row-bg" justify="space-between" align="middle">
        <el-col :span="16">
          <div style="padding:0 10px">
            <span
              style="font-size:14px;color:#666"
            >今日店铺实时数据更新： {{ nowDate + ' ' + nowTime + ' ' + nowWeek }}</span>
            <span style="margin-left:10px">
              <el-button size="small" @click="getdataList" type="text">刷新</el-button>
            </span>
          </div>
        </el-col>
        <el-col :span="8">
          <el-form ref="form" :model="form" label-width="80px" style="padding:0 20px">
            <el-form-item label="选择时间" style=" margin: 8px 0;">
              <el-col :span="11">
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择开始日期" v-model="form.date1"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>我的看板</span> 
        <el-radio-group style="float: right; padding: 3px 0" v-model="dataType">
          <el-radio-button label="3">按天</el-radio-button>
          <el-radio-button label="2">按月</el-radio-button>
          <el-radio-button label="1">按年</el-radio-button>
        </el-radio-group>
      </div>
      <div class="kan-tag">
        <div
          class="kan-item"
          v-for="(value,index) in newsList"
          :key="index"
          :class="currentIndex==index?'kan-active':'kan-item'"
          @click="change(index)"
        >
          <div class="kan-num">{{value.num}}</div>
          <div>{{value.name}}</div>
        </div>
      </div>
      <div class="chart-box" style="margin-top:40px">
        <div id="J_chartLineBox" class="chart-box"></div>
      </div>
    </el-card>
    <!-- 我的看板 -->
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      nowDate: "", // 当前日期
      nowTime: "", // 当前时间
      nowWeek: "", // 当前星期
      input: "",
      currentIndex: 0,
      lineChart: {},
      form: {
        //选择时间
        date1: "",
        date2: ""
      },
      timeType: "",
      chartLine: null,
      year: "",
      month: "",
      day: "",
      hour: "",
      dataType: 1,
      newsList: [
        {
          num: "0",
          name: "浏览量"
        },
        {
          num: "0",
          name: "访客量"
        },
        {
          num: "0",
          name: "支付客数"
        },
        {
          num: "0",
          name: "支付单数"
        },
        {
          num: "0",
          name: "支付转化率"
        },
        {
          num: "0",
          name: "复购率"
        },
        {
          num: "0",
          name: "新增会员数"
        },
        {
          num: "0",
          name: "加购人数"
        },
        {
          num: "0",
          name: "获得新客"
        }
      ]
    };
  },
  created() {
    this.getdataList();
  },
  mounted() {
    // this.initChartLine();
    
  },
  beforeDestroy: function() {
    if (this.getDate) {
      console.log("销毁定时器");
      clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
    }
  },
  methods: {
   
    getDate: function() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let week = new Date().getDay();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();

      _this.nowTime = hh + ":" + mf;
      _this.nowDate = yy + "/" + mm + "/" + dd;
    },
    // 折线图
    initChartLine() {
      var option = {
        title: {
          text: "折线图堆叠"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      this.chartLine = echarts.init(document.getElementById("J_chartLineBox"));
      this.chartLine.setOption(option);
      window.addEventListener("resize", () => {
        this.chartLine.resize();
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 切换
    change(index) {
      let that = this;
      that.currentIndex = index;
    },
    // 查询
    onSubmit() {
      console.log("submit!");
    },
    //二级tab切片
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getdataList() {
      this.getDate();
      this.$http({
        url: this.$http.adornUrl("/market/count/get_co_count"),
        method: "post",
        data: this.$http.adornData({
          type: this.dataType, //1 按年 2 按月 3 按日 4 按小时 默认1
          year: this.year,
          month: this.month,
          day: this.day,
          hour: this.hour
        })
      }).then(data => {
        console.log(data);
        if (data && data.code == 200) {
          if (data.data.length == 1) {
            this.newsList[0].num = data.data[0].browse_num - 0;
            this.newsList[0].num = data.data[0].click_num - 0;
            this.newsList[2].num = data.data[0].order_users_num;
            this.newsList[3].num = data.data[0].order_num;
            this.newsList[4].num = data.data[0].rate;
            this.newsList[5].num = data.data[0].fu_rate;
            this.newsList[6].num = data.data[0].card_num;
            this.newsList[7].num = data.data[0].cart_users_num;
            this.newsList[8].num = data.data[0].new_users_num;
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 90%;
  margin: 15px 15px 0px 15px;
  border-radius: 10px;
}
.chart-box {
  height: 300px;

  margin-top: 15px;
}
/* 我的看板 */

.kan-part {
  padding: 20px 20px;
}

.kan-title {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  padding-bottom: 15px;
  border-bottom: 1px solid #dedede;
}

.kan-tag {
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
}

.kan-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 88px;
  width: 88px;
  border-radius: 4px;
  border: 1px solid rgba(236, 236, 236, 1);
  font-size: 12px;
  color: #888888;
  line-height: 180%;
}

.kan-num {
  font-size: 28px;
  color: #333333;
}

.kan-active {
  background: rgba(243, 249, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(9, 109, 217, 0.5);
}
/* end */

.body-main {
  background-color: #ffffff;
}

.top-status {
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.default {
  padding: 10px;
  font-size: 13px;
  color: #333333;
}

.active {
  padding: 10px;
  font-size: 13px;
  color: #ffffff;
  background-color: #126eff;
  border-radius: 4px;
}

.top-main {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0px 20px;
  background-color: #ffffff;
}

.demo-ruleForm {
  width: 100%;
}

.el-dropdown {
  margin-left: 30px;
}

.top-r {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #666666;
  font-size: 14px;
  border-radius: 5px;
  height: 40px;
}

.demo-form-inline {
  width: 50%;
  display: inline-flex;
  margin-left: 40px;
}

.line {
  text-align: center;
}

.block {
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-all {
  font-size: 12px;
  color: #666666;
  letter-spacing: 2px;
}

.top {
  display: flex;
  background-color: #ffffff;
}

.input {
  width: 150px;
  padding-left: 20px;
  border: none;
  background: #f2f2f2;
  color: #202124;
  font-size: 12px;
  line-height: 35px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.top-xun {
  display: flex;
  align-self: center;
  justify-content: center;
  width: 60px;
  font-size: 12px;
  font-weight: 600;
  background-color: #ffffff;
}

.top-check {
  height: 45px;
  display: flex;
  border-radius: 8px;
  border: 1px solid rgba(153, 153, 153, 1);
}

.top-xun-r {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 34px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  border: 1px solid rgba(18, 110, 255, 1);
  color: rgba(18, 110, 255, 1);
  font-size: 12px;
  font-weight: 600;
}

.delate-item {
  padding: 0px 20px 20px 20px;
}

.delate {
  font-size: 12px;
  color: #333333;
  border-radius: 4px;
  border: 1px solid rgba(220, 220, 220, 1);
  padding: 8px 20px;
}

.delate-select {
  font-size: 10px;
  color: #666666;
  padding-left: 15px;
}
</style>