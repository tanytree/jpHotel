<!--
 * @Date: 2020-04-14 14:50:44
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-17 13:19:34
 * @FilePath: /cloudAdmin/src/views/sale/order/orderInfo.vue
 -->
<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path:'/saleOrder'}">用户订单</el-breadcrumb-item>
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        商品信息
        <table class="table">
          <tr class="trOne">
            <td style="width:30%">产品</td>
            <td>价格</td>
            <td>规格</td>
            <td>数量</td>
          </tr>
          <tr class="trTwo">
            <td style="width:30%">
              <img :src="chooseIcon(orderInfo)" class="img" />
              <span
                v-if="orderInfo.modelType==1&&orderInfo.activityId"
              >{{orderInfo.edtCourse.courseName}}</span>
              <span
                v-if="orderInfo.modelType==1&&!orderInfo.activityId"
              >{{orderInfo.edtCourse.courseName}}</span>
              <span v-if="orderInfo.modelType==2">{{orderInfo.edtReserver.reserverName}}</span>
              <span v-if="orderInfo.modelType==3">{{orderInfo.edtShow.showName}}</span>
            </td>
            <td>￥{{orderInfo.orderPrice}}</td>
            <td>{{orderInfo.userName}}</td>
            <td>{{orderInfo.orderTotal}}</td>
          </tr>
        </table>
        <el-form size="mini">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card :body-style="{ height: '315px' }" style="color:#333333" header="订单信息">
                <el-form-item label="订单编号">{{orderInfo.orderNumber}}</el-form-item>
                <el-form-item label="买家ID">{{orderInfo.edtUser.id}}</el-form-item>
                <el-form-item
                  label="支付状态"
                >{{orderInfo.orderStatus==1?'待支付':orderInfo.orderStatus==2?' 已支付':orderInfo.orderStatus==3?'失效订单':'申请退款'}}</el-form-item>
                <el-form-item label="创建时间">{{orderInfo.createTime}}</el-form-item>
                <el-form-item label="下单时间">{{orderInfo.payTime}}</el-form-item>
                <el-form-item
                  label="订单状态"
                >{{orderInfo.orderStatus==1?'待支付':orderInfo.orderStatus==2?'交易成功':orderInfo.orderStatus==3?'交易失败':'申请退款'}}</el-form-item>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card :body-style="{ height: '315px' }" header="买家付款信息">
                <el-form-item label="订单总价">{{orderInfo.orderPrice}}</el-form-item>
                <!-- 接口字段没有详细抵扣模块 -->
                <el-form-item label="奖学金抵扣">{{orderInfo.awardsMoney}}</el-form-item>
                <el-form-item label="积分抵扣">{{orderInfo.orderDeduction}}</el-form-item>
                <el-form-item label="实付款">{{orderInfo.orderRealPay}}</el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import // get_order_co_list,
// get_order_co_info,
// add_tracking,
// get_order_express
"@/utils/api/sale";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      logisticList: state => state.config.logisticList,
      company: state => state.company,
      users_id: state => state.user.id
    })
  },
  data() {
    return {
      orderInfo: []
    };
  },
  activated() {
    // console.log();
    this.getOrderInfo(this.$route.query.index);
  },
  methods: {
    getOrderInfo(index) {
      this.orderInfo = index;
      console.log(this.orderInfo);
    },
    //选择产品图片
    chooseIcon(row) {
      console.log(row);
      
      if (row.modelType == 1) {
        return row.edtCourse.courseIcon;
      }
      if (row.modelType == 2) {
        return row.edtReserver.reserverIcon;
      }
      if (row.modelType == 3) {
        return row.edtShow.showIcon;
      }
    }
  }
};
</script>

<style>
.el-table th {
  background-color: rgba(247, 247, 247, 1);
  color: rgba(30, 30, 30, 1);
  font-family: PingFangSC-Regular;
}
.table {
  width: 100%;
  margin: 20px 0;
  border: none;
  border-collapse: collapse;
  border: 1px solid rgba(205, 205, 205, 1);
}
.trOne {
  background-color: rgba(247, 247, 247, 1);
  font-size: 20px;
  text-align: left;
  font-weight: 400;
  color: rgba(30, 30, 30, 1);
  border-bottom: 1px solid rgba(205, 205, 205, 1);
}
.trTwo {
  font-size: 18px;
  text-align: left;
  color: rgba(51, 51, 51, 1);
  font-weight: 400;
}
.img {
  width: 60px;
  height: 60px;
  vertical-align: middle;
  margin-right: 10px;
}
tr td {
  padding: 16px 36px;
}
</style>
