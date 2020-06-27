<!--
 * @Date: 2020-03-25 13:24:31
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-25 13:51:15
 * @FilePath: /cloudAdmin/src/views/sale/contract/detail.vue
 -->
<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: backpath }">{{backTitle}}</el-breadcrumb-item>
        <el-breadcrumb-item>详情页面</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <div style="padding-bottom:10px">
        <div>
          <span style="font-size:16px;color:#000;margin-right:8px">{{detailForm.title}}</span>
          <span style="font-size:13px">创建时间：{{detailForm.create_time}}</span>
        </div>
        <div class="contraBox">
          <div class="contraItem">
            <label>甲方</label>
            <span>{{detailForm.a_co_name}}</span>
          </div>
          <div class="contraItem">
            <label>联系电话</label>
            <span>{{detailForm.a_phone}}</span>
          </div>
        </div>
        <div class="contraBox">
          <div class="contraItem">
            <label>乙方</label>
            <span>{{detailForm.b_co_name}}</span>
          </div>
          <div class="contraItem">
            <label>联系电话</label>
            <span>{{detailForm.b_phone}}</span>
          </div>
        </div>
        <div class="contraBox">
          合同进度
          <div class="contraItem">
            <label>甲方</label>
            <div style="width:400px">
              <el-progress :text-inside="true" :stroke-width="20" :percentage="detailForm.a_rate"></el-progress>
            </div>
          </div>
          <div class="contraItem" style="margin-top:8px">
            <label>乙方</label>
            <div style="width:400px">
              <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="detailForm.b_rate"
                status="success"
              ></el-progress>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { get_contract_info } from "@/utils/api/sale";
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
    get_contract_info({ contract_id: this.$route.query.id }).then(res => {
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
.contraBox {
  width: 100%;
  padding: 10px;
  background-color: rgba(250, 250, 250, 1);
  border: 1px solid rgba(197, 197, 197, 1);
  margin-top: 10px;
  .contraItem {
    display: flex;
    padding: 2px 0;
    label {
      width: 120px;
    }
  }
}
</style>
