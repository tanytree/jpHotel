<template>
  <div class>
    <el-card class="box-card">
      <el-form size="small" label-width="100px" :inline="true" class="demo-ruleForm">
        <el-form-item label="选择时间">
          <el-date-picker
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始日期"
            v-model="form.start_time"
          ></el-date-picker>
          <span style="margin:0 5px">-</span>
          <el-date-picker
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择结束日期"
            v-model="form.end_time"
          ></el-date-picker>
          <el-button style="margin-left:10px" @click="getDataList">查询</el-button>
        </el-form-item>
        <!-- <el-form-item style="float:right">
          <el-select v-model="form.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
    </el-card>
    <el-card header="广告效果统计">
      <el-card style="margin-bottom:8px;">
        <el-row type="flex" class="row-bg" align="middle">
          <el-col :span="4">
            <div class="grid-content">本店{{dataType=='2'?'分销商':dataType=='3'?'代理商':'合伙人'}}</div>
          </el-col>
          <el-col :span="20">
            <el-row type="flex" class="row-bg">
              <el-col :span="6">
                <div class="grid-content">增量</div>
                <div class="grid-content">
                  <el-input size="medium" :value="add_num" :disabled="true"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">成交单数</div>
                <div class="grid-content">
                  <el-input size="medium" :value="pay_price" :disabled="true"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">成交金额</div>
                <div class="grid-content">
                  <el-input size="medium" :value="order_num" :disabled="true"></el-input>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <el-row type="flex" class="row-bg" align="middle">
          <el-col :span="4">
            <div class="grid-content bg-purple">转化</div>
          </el-col>
          <el-col :span="20">
            <el-row type="flex" class="row-bg">
              <el-col :span="6">
                <div class="grid-content">下级增量</div>
                <div class="grid-content">
                  <el-input size="medium" :value="add_num1" :disabled="true"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">成交单数</div>
                <div class="grid-content">
                  <el-input size="medium" :value="order_num1" :disabled="true"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">成交金额</div>
                <div class="grid-content">
                  <el-input size="medium" :value="pay_price1" :disabled="true"></el-input>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "channel-status",
  data() {
    return {
      input: "",
      dataType: "2", //2 分销商 3 代理商 4 合伙人
      add_num: "0",
      add_num1: "0",
      pay_price: 0,
      pay_price1: 0,
      order_num: 0,
      order_num1: 0,

      currentIndex: 0,
      form: {
        //选择时间
        type:"2",
        end_time: "",
        start_time: ""
      }
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.$http({
        url: this.$http.adornUrl("/market/count/get_agent_count"),
        method: "post",
        data: this.$http.adornData(this.form)
      }).then(data => {
        console.log(data);
        if (data && data.code == 200) {
          this.add_num = data.data.add_num;
          this.order_num = data.data.order_num;
          this.pay_price = data.data.pay_price;
        }
      });
      this.$http({
        url: this.$http.adornUrl("/market/count/get_lower_count"),
        method: "post",
        data: this.$http.adornData({
          type: this.dataType,
          start_time: this.form.date1,
          end_time: this.form.date2
        })
      }).then(data => {
        console.log(data);
        if (data && data.code == 200) {
          this.add_num1 = data.data.add_num;
          this.order_num1 = data.data.order_num;
          this.pay_price1 = data.data.pay_price;
        }
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.box-card {
  margin-bottom: 10px;
}
.box-card .el-card__body {
  padding: 0;
}
.grid-content {
  text-align: center;
}
.grid-content input {
  width: 60%;
  margin-top: 10px;
}
</style>