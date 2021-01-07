/*
* @Author: Dana 统计分析管理
* @Date: 2020-03-10 13:45:16
* @Last Modified by: Dana
* @Last Modified time: 2020-03-11 16:59:58
*/
<template>
  <div class="boss-index">
    <el-tabs class="pageTab" v-model="activeName">
      <el-tab-pane
        v-for="item in menuList"
        :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
        :name="item.path"
        :key="item.path"
        v-if="$F.filterThirdMenu('finance', item.path, true)"
      >
        <!-- 报表-->
        <div class="invoiceBox" v-if="item.path == 'invoice' ">
          <el-form size="small" inline :model="invoiceForm" class="term line">
            <div class="margin-b-20">
              <el-form-item :label="$t('manager.finance_invoiceType')+':'">
                <el-radio-group v-model="invoiceForm.cate">
                  <el-radio-button value="all" label="all">{{$t('manager.finance_noLimit')}}</el-radio-button>
                  <el-radio-button
                    value="speVat"
                    label="speVat"
                  >{{$t('manager.finance_vatInvoice')}}</el-radio-button>
                  <el-radio-button
                    value="defVat"
                    label="defVat"
                  >{{$t('manager.finance_ordinaryInvoice')}}</el-radio-button>
                  <el-radio-button
                    value="eleVat"
                    label="eleVat"
                  >{{$t('manager.finance_electronicInvoice')}}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </div>
            <el-form-item :label="$t('manager.ps_startDate')+':'">
              <el-date-picker type="date" v-model="invoiceForm.strDate"></el-date-picker>
              <span class="line">{{$t('boss.report_toText')}}</span>
              <el-time-picker type="date" v-model="invoiceForm.endDate"></el-time-picker>
            </el-form-item>
            <el-form-item :label="$t('manager.finance_customerName')+':'">
              <el-input v-model="invoiceForm.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="submit">{{$t('commons.queryBtn')}}</el-button>
              <el-button type="primary" class="submit">{{$t('commons.resetBtn')}}</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="tableData"
            size="small"
            border
            height="100%"
            header-row-class-name="default"
          >
            <el-table-column
              header-align="center"
              prop="customer"
              :label="$t('manager.finance_customerName')"
              width="120"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="roomNum"
              :label="$t('manager.hk_roomNumber')"
              width="120"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="phone"
              :label="$t('manager.finance_phone')"
              width="160"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="type"
              :label="$t('manager.finance_invoiceType')"
              width="180"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="invoiceTitle"
              :label="$t('manager.finance_invoiceHeader')"
              width="180"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="invoiceAmount"
              :label="$t('manager.finance_c')"
              width="120"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="taxes"
              :label="$t('manager.finance_tax')"
              width="120"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="invoiceNum"
              :label="$t('manager.finance_invoiceNum')"
              width="180"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="billTime"
              :label="$t('manager.finance_invoiceTime')"
              width="180"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="operator"
              :label="$t('manager.finance_operationOf')"
              width="120"
            ></el-table-column>
            <el-table-column header-align="center" :label="$t('commons.operating')" width="200">
              <template slot-scope="scope">
                <el-button type="text" @click="detail(scope.row)">{{$t('commons.detail')}}</el-button>
                <el-popconfirm
                  :title="$t('manager.grsl_sureDelete')+'？'"
                  icon="el-icon-warning-outline"
                  iconColor="#FF8C00"
                  @confirm="handleDelete(scope.row)"
                >
                  <el-button slot="reference" type="text">{{$t('commons.delete')}}</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {
      activeName: "invoice",
      invoiceForm: { cate: "all", strDate: "", endDate: "", name: "" },
      tableData: [
        {
          customer: "欧阳楠楠",
          roomNum: "A001",
          phone: "18677890922",
          type: "增值税电子发票",
          invoiceTitle: "全购网络有限公司",
          invoiceAmount: "100",
          taxes: "0",
          invoiceNum: "91430102687415586A",
          billTime: "2020/04/22 12:24",
          operator: "张三",
        },
      ],
      detailVisible: false,
      detailForm: {},
    };
  },
  created() {
    this.$F.handleThirdMenu(this);
  },
  methods: {
    detail(row) {
      this.detailForm = row;
      this.detailForm.eMail = "18055016808@qq.com";
      this.detailForm.taxNum = "937527037047650";
      this.detailForm.serviceType = "客人账务";
      this.detailForm.remarks = "";
      this.detailVisible = true;
    },
    handleDelete(row) {},
    handleClose() {
      this.detailVisible = false;
    },
  },
};
</script>
<style lang="scss">
.invoiceBox {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.detailBox .el-form-item {
  width: 50%;
  margin-bottom: 10px;
  margin-right: 0;
}
</style>
