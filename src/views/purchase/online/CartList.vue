<template>
  <div class="online-buy-cart">
    <!--购物车-->
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'OnlineProcurement' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>购物车</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="carts-list-content">
      <div class="delate-item">
        <el-button
          style="margin: 10px 0px;"
          type="danger"
          :disabled="dataListSelections.length <= 0"
          @click="delateSelect()"
        >批量删除</el-button>
        <span class="delate-select">已选（{{ num }}）</span>
        <div class="btn">
          <el-button type="primary" @click="$router.push({name:'ConfirmOrder'})">结算</el-button>
        </div>
      </div>
      <div class="store-name">
        <!--<img :src="info.co_logo" />-->
        <span>co_name</span>
        <div class="store-into">
          <span>进店看看</span>
          <i class="iconfont icon-xiangyou"></i>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        
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
      num: 0,
      dataListSelections: [],
      currentPage1: 1,
      tableData: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    //批量删除
    delateSelect() {
      this.$confirm(
        `设备采购计划里已添加了 ${this.num}个产品，删除后，添加的产品会一起删除，是否确认删除？`,
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
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
  .title {
    padding: 20px 20px;
    font-size: 16px;
    color: #999999;
    border-bottom: 1px #f7f7f7 solid;
  }
  .carts-list-content {
    padding: 20px 0px;
    .store-name {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 20px 30px;
      background-color: #f5f7f9;
      > img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background-color: #f2f2f2;
        margin-right: 15px;
      }
      .store-into {
        font-size: 13px;
        color: #969896;
        margin-left: 20px;
        i {
          font-size: 14px;
        }
      }
    }
    .delate-item {
      display: flex;
      align-items: center;
      .delate {
        padding: 6px 10px;
        border: 1px solid #999999;
        border-radius: 5px;
        margin-right: 10px;
      }
      > .delate-select {
        margin-left: 10px;
      }
      .btn {
        display: flex;
        flex: 1;
        justify-content: flex-end;
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
}
</style>