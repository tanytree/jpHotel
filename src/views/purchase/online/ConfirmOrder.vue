<template>
  <div class="online-buy-cart">
    <!--确认订单-->

    <el-card class="box-card">
      <div class="box-card">
        <div class="address-title">收货地址:</div>
        <div class="address-info">
          <div class="info">
            张三
            <span>157555686120</span>
          </div>
          <div class="info">
            安徽省合肥市蜀山区
            <el-button type="text">更改</el-button>
          </div>
        </div>
      </div>
    </el-card>

    <div class="carts-list-content">
      <el-table
        :data="tableData"
        style="width: 100%"
         :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="产品">
          <template slot-scope="scope">
            <div class="goods-item">
              <img src="../../../../build/logo.png" />
              <span>{{scope.row.s_co_name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="400">
          <template slot-scope="scope">
            <div class="size" v-for="(value,index) in scope.row.sizeList" :key="index">
              <!--<el-checkbox label="" v-model="checked"></el-checkbox>-->
              <div class="kinds">{{ value.color }};{{ value.generation }}</div>
              <div class="num">
                <el-input-number v-model="value.num" size="mini" :min="1" :max="10" label="描述文字"></el-input-number>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" width="100"></el-table-column>
        <el-table-column prop="all_price" label="合计"></el-table-column>
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
</template>

<script>
export default {
  data() {
    return {
      currentPage1: 1,
      tableData: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http({
        url: this.$http.adornUrl("/mallpc/cart/get_order_list"),
        method: "post",
        data: this.$http.adornData(this.field)
      }).then(res => {
        let { data } = res;

        let { data: rows, code, message } = data;

        switch (code) {
          case 200:
            this.tableData = rows.list;
            break;
        }
      });
    },
    //tab选中那条数据
    handleSelectionChange(val) {
      this.dataListSelections = val;
      this.num = this.dataListSelections.length;
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
.online-buy-cart {
  margin: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  .box-card {
    display: flex;
    align-items: center;
    .address-title {
      font-size: 16px;
      color: #969896;
      width: 100px;
    }
    .address-info {
      font-size: 15px;
    }
  }
  .carts-list-content {
    padding: 20px 0px;
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
}
</style>