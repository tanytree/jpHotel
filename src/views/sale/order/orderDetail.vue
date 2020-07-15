<!--
 * @Date: 2020-04-14 12:56:55
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-14 14:51:08
 * @FilePath: /cloudAdmin/src/views/sale/order/orderDetail.vue
 -->

<template>
  <!--统一的编辑和新增 -->
  <el-dialog top="0" :close-on-click-modal="false" :visible.sync="visible" title="详情">
    <el-form size="small" label-width="80px">
      <el-row v-for="item in formData.list" :key="item.order_id">
        <el-col :span="8">
          <el-image
            style="width: 100px; height: 100px"
            :src="item.thumb"
            :preview-src-list="[item.thumb]"
            fit="cover"
          ></el-image>
        </el-col>
        <el-col :span="16">
          <div>{{item.title}}</div>
          <div>{{item.goods_option}}</div>
          <div>{{item.price}}</div>
        </el-col>
      </el-row>
      <el-form-item label="买家名称">{{formData.buyer_name}}</el-form-item>
      <el-form-item label="退款图片">
        <el-image
          style="width: 100px; height: 100px"
          :src="formData.image_url"
          :preview-src-list="[formData.image_url]"
          fit="cover"
        ></el-image>
      </el-form-item>
      <el-form-item label="退回方式">{{formData.pay_type==1?'微信支付':'支付宝支付'}}</el-form-item>
      <el-form-item
        label="退款类型"
      >{{formData.refund_type==1?"仅退款":formData.refund_type==2? "退款退货" : "换货"}}</el-form-item>
      <el-form-item label="商品状态 ">{{formData.goods_status==1?"已收到货" : "未收到货"}}</el-form-item>
      <el-form-item label="退款理由">{{formData.refund_reason}}</el-form-item>
      <el-form-item label="退款金额">{{formData.refund_price}}</el-form-item>
    </el-form>
  </el-dialog>
</template>

 <script>
export default {
  data() {
    return {
      visible: false,
      formData: { id: "" }
    };
  },
  methods: {
    /**初始化数据 */
    initData(data,type) {
      this.formData = data;
      this.visible = true;
    }
  }
};
</script>

 <style>
</style>
