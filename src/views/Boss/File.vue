<template>
  <div class="membership-management">
    <!--文件-->
    <div class="top-status">
      <span
        v-for="(value,index) in statusList"
        :key="index"
        :class="currentIndex==index?'active':'default'"
        @click="changeTab(index)"
      >{{value.name}}</span>
    </div>
    <div class="content">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <div class="search-part">
            <input type="text" v-model="keyword" placeholder="搜索合同名称" />
            <span>查询</span>
          </div>
        </el-form-item>
      </el-form>
      <div class="components-edit">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="goods_kinds" label="文件名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_kinds" label="审批机构" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_price" label="批复状态" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_price" label="递交人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_price" label="递交日期" show-overflow-tooltip></el-table-column>
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
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      statusList: [
        {
          name: "对内文件/起草"
        },
        {
          name: "对外文件/起草"
        }
      ],
      currentIndex: 0,
      start_time: "",
      end_time: "",
      pageIndex: 1,
      pageSize: 10,
      dataListSelections: [],

      keyword: "",
      currentPage1: 1,
      options: [],
      value: "",

      second_activeName: "one",
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