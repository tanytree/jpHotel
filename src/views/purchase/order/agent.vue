<!--
 * @Date: 2020-03-23 10:12:48
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-23 11:02:55
 * @FilePath: /cloudAdmin/src/views/purchase/order/agent.vue
 -->
<template>
  <div class="membership-management">
    <!--采购订单-->

    <div class="content">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="签订时间">
          <el-date-picker
            type="date"
            placeholder="请选择"
            value-format="yyyy-MM-dd"
            class="dateBox"
            v-model="start_time"
          ></el-date-picker>
          <span>-</span>
          <el-date-picker
            type="date"
            placeholder="请选择"
            value-format="yyyy-MM-dd"
            class="dateBox"
            v-model="end_time"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="margin-left: 40px;margin-right: 0px;">
          <el-select v-model="categoryid" placeholder="订单编号" style="width: 120px;">
            <el-option label="分类1" value="shanghai"></el-option>
            <el-option label="分类2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="search-part">
            <input type="text" v-model="keyword" placeholder="请输入关键字" />
            <span>搜索</span>
          </div>
        </el-form-item>
      </el-form>
      <el-tabs v-model="second_activeName" style="margin-top: 20px;" v-if="currentIndex==0">
        <el-tab-pane label="全部" name="one"></el-tab-pane>
        <el-tab-pane label="进行中" name="two"></el-tab-pane>
        <el-tab-pane label="已完成" name="three"></el-tab-pane>
      </el-tabs>
      <el-tabs v-model="third_activeName" style="margin-top: 20px;" v-if="currentIndex==1">
        <el-tab-pane label="全部" name="all_0"></el-tab-pane>
        <el-tab-pane label="待付款" name="all_1"></el-tab-pane>
        <el-tab-pane label="待发货" name="all_2"></el-tab-pane>
        <el-tab-pane label="待收货" name="all_3"></el-tab-pane>
        <el-tab-pane label="售后" name="all_4"></el-tab-pane>
      </el-tabs>
      <div class="components-edit" v-if="currentIndex==0">
        <el-table
          ref="multipleTable"
          :data="tableData"
           :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="goods_kinds" label="订单编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_kinds" label="签订时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_price" label="付款方式" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_price" label="供应商" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_price" label="合计(元)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_time" label="已打款" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small">订单详情</el-button>
              <el-button type="text" size="small">物流信息</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <div class="page-all">
            共
            <span style="font-weight:600;font-size: 14px;">400</span>条记录
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout=" sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </div>
      <div class="components-edit" v-if="currentIndex==1">
        <el-table
          ref="multipleTable"
          :data="tableData"
         :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="goods_kinds" label="产品" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_kinds" label="单价" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_price" label="数量" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small">订单详情</el-button>
              <el-button type="text" size="small">物流信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="goods_price" label="实付款" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_price" label="交易状态" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_time" label="交易操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="time">还剩9天</div>
              <el-button type="primary">确认收货</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <div class="page-all">
            共
            <span style="font-weight:600;font-size: 14px;">400</span>条记录
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout=" sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statusList: [
        {
          name: "合同订单"
        },
        {
          name: "企业订单"
        }
      ],
      currentIndex: 0,
      start_time: "",
      end_time: "",
      pageIndex: 1,
      pageSize: 10,
      categoryid: "",
      dataListSelections: [],

      keyword: "",
      currentPage1: 1,
      options: [],
      value: "",

      second_activeName: "one",
      third_activeName: "all_0",
      tableData: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 切换
    changeTab(index) {
      let that = this;
      that.currentIndex = index;
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

<style lang="less" scoped>
.membership-management {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
  .top-status {
    padding: 30px 20px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    font-size: 16px;
    .default {
      padding: 15px 30px;
      font-size: 13px;
      color: #333333;
    }
    .active {
      padding: 15px 30px;
      font-size: 13px;
      color: #ffffff;
      background-color: #126eff;
      border-radius: 4px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #ffffff;
    margin-top: 10px;
    border-radius: 10px;
    padding: 20px 20px 0px 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .components-edit {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-top: 20px;
      .delate-item {
        display: flex;
        align-items: center;
        .delate {
          padding: 6px 10px;
          border: 1px solid #999999;
          border-radius: 5px;
          margin: 20px 0px;
          margin-right: 10px;
        }
      }
      .block {
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .page-all {
          font-size: 12px;
          color: #666666;
          letter-spacing: 2px;
        }
      }
    }
    .dateBox {
      width: 140px;
    }
    i {
      font-size: 12px;
    }
    .search-part {
      display: flex;
      align-items: center;
      border: 1px solid #999999;
      border-radius: 5px;
      height: 40px;
      input {
        border: none;
        border-radius: 5px;
        padding: 10px 10px;
      }
      span {
        background-color: #dfdfdf;
        height: 100%;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        width: 50px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .el-select {
        width: 120px;
      }
    }
  }
}
</style>
