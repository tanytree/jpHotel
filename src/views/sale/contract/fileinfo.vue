<!--
 * @Date: 2020-03-25 13:54:15
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-25 14:16:49
 * @FilePath: /cloudAdmin/src/views/sale/contract/fileinfo.vue
 -->

<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: backpath }">{{backTitle}}</el-breadcrumb-item>
        <el-breadcrumb-item>合同文本</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <div style="padding-bottom:10px">
        <div class="contraItem">
          <label>供货方</label>
          <span>{{detailForm.b_co_name}}</span>
        </div>
        <div class="contraItem">
          <label>法定代表</label>
          <span>{{detailForm.b_fa_name}}</span>
        </div>
        <div class="contraItem">
          <label>联系人</label>
          <span>{{detailForm.b_name}}</span>
        </div>
        <div class="contraItem">
          <label>联系电话</label>
          <span>{{detailForm.b_phone}}</span>
        </div>
        <div class="contraItem">
          <label>开户银行</label>
          <span>{{detailForm.b_bank_name}}</span>
        </div>
        <div class="contraItem">
          <label>银行卡号</label>
          <span>{{detailForm.b_bank_number}}</span>
        </div>
        <el-divider></el-divider>
        <div class="contraItem">
          <label>采购方</label>
          <span>{{detailForm.a_co_name}}</span>
        </div>
        <div class="contraItem">
          <label>法定代表</label>
          <span>{{detailForm.a_fa_name}}</span>
        </div>
        <div class="contraItem">
          <label>联系人</label>
          <span>{{detailForm.a_name}}</span>
        </div>
        <div class="contraItem">
          <label>联系电话</label>
          <span>{{detailForm.a_phone}}</span>
        </div>
        <el-divider></el-divider>
        <div class="contraItem">
          <label>交货期</label>
          <span>{{detailForm.delivery_time}}</span>
        </div>
        <div class="contraItem">
          <label>交货方式</label>
          <span>{{detailForm.delivery_type=='1'?'物流':"其他"}}</span>
        </div>
        <div class="contraItem">
          <label>交货地址</label>
          <span>{{detailForm.delivery_address}}</span>
        </div>
        <el-divider></el-divider>
        <div class="contraItem">
          <label>验收方式</label>
          <span>{{detailForm.check_type=="1"?"当面验收":"其他"}}</span>
        </div>
        <div class="contraItem">
          <label>质量要求</label>
          <span>{{detailForm.quality}}</span>
        </div>
        <el-divider></el-divider>
        <div class="contraItem">
          <label>不合格处理</label>
          <span>{{detailForm.irrational}}</span>
        </div>
        <el-divider></el-divider>
        <div class="contraItem">
          <label>付款方方式</label>
          <span>{{detailForm.a_phone}}</span>
        </div>
        <div class="contraItem">
          <label>分期次数</label>
          <span>{{detailForm.pay_num}}</span>
        </div>
        <div class="contraItem">
          <label>分期还款总额</label>
          <span>{{detailForm.pay_price}}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { get_contract_file } from "@/utils/api/sale";
export default {
  data() {
    return {
      backpath: "/contracting",
      backTitle: "进行中的合同",
      detailForm: {}
    };
  },
  created() {
    console.log(this.$route.query.id);
    get_contract_file({ list_id: this.$route.query.id }).then(res => {
      if (res.code == 200) {
        this.detailForm = res.data;
      } else {
        this.$message.error(res.message);
      }
    });
  }
};
</script>

<style lang="less">
.contraItem {
  display: flex;
  padding: 2px 0;
  label {
    width: 120px;
  }
}
</style>
