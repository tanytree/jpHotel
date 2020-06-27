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
            <div class="grid-content">活动曝光</div>
          </el-col>
          <el-col :span="20">
            <el-row type="flex" class="row-bg">
              <el-col :span="6">
                <div class="grid-content">广告展示量</div>
                <div class="grid-content">
                  <el-input size="medium" :value="browse_num" :disabled="true"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">用户点击次数</div>
                <div class="grid-content">
                  <el-input size="medium" :value="click_num" :disabled="true"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">消耗村积分</div>
                <div class="grid-content">
                  <el-input size="medium" :value="total_price" :disabled="true"></el-input>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <el-row type="flex" class="row-bg" align="middle">
          <el-col :span="4">
            <div class="grid-content bg-purple">活动转化</div>
          </el-col>
          <el-col :span="20">
            <el-row type="flex" class="row-bg">
              <el-col :span="6">
                <div class="grid-content">用户支付单数</div>
                <div class="grid-content">
                  <el-input size="medium" :value="pay_num" :disabled="true"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">订单总金额</div>
                <div class="grid-content">
                  <el-input size="medium" :value="pay_price" :disabled="true"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">转化率</div>
                <div class="grid-content">
                  <el-input size="medium" :value="rate" :disabled="true"></el-input>
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
      browse_num: "0",
      click_num: 0,
      total_price: 0,
      pay_num: 0,
      pay_price: 0,
      rate: 0,
      currentIndex: 0,
      form: {
        //选择时间
        start_time: "",
        end_time: ""
      }
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.$http({
        url: this.$http.adornUrl("/market/count/get_advert_count"),
        method: "post",
        data: this.$http.adornData(this.form)
      }).then(({ data }) => {
        console.log(data);
        if (data && data.code == 200) {
          this.click_num = data.data.click_num;
          this.browse_num = data.data.browse_num;
          this.total_price = data.data.total_price;
          this.pay_num = data.data.pay_num;
          this.pay_price = data.data.pay_price;
          this.rate = data.data.rate;
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
<style lang="less">
.box-card {
  margin-bottom: 10px;
  .el-form-item {
    margin: 10px 0;
  }
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