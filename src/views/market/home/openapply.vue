<template>
  <div class="boss-index">
    <div class="content">
      <el-form inline :model="formInline" size="small" class="term line demo-form-inline">
        <el-form-item :label="$t('desk.home_invoiceTime') + ':'">
          <el-date-picker type="date" v-model="formInline.startTime"></el-date-picker>
          <span class="line"> {{ $t("desk.serve_to") }} </span>
          <el-date-picker type="date" v-model="formInline.endTime"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('desk.home_customerName') + ':'">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
         <el-form-item :label="$t('desk.add_receiptNo')+':'">
          <el-input v-model="formInline.receiptNumber"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="queryClick(formInline)">{{ $t("commons.queryBtn") }}</el-button>
          <el-button class="white" @click="resetForm(formInline)">{{
                        $t("commons.resetBtn")
                    }}</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableDatas" border height="100%" header-row-class-name="default" size="small">
        <el-table-column prop="name" :label="$t('desk.home_customerName')" width="140"></el-table-column>
        <el-table-column prop="roomNum" :label="$t('desk.home_roomNum')" width="100"></el-table-column>
         <el-table-column prop="receiptNumber" :label="$t('desk.add_receiptNo')" width="150"></el-table-column>
        <el-table-column prop="companyName" :label="$t('desk.home_payCompanyName')" width="120"></el-table-column>
        <el-table-column  :label="$t('desk.customer_sum')" width="100">
          <template slot-scope="{row}">
            {{$F.numFormate(row.prices)}}
          </template>
        </el-table-column>
        <el-table-column prop="projectName" :label="$t('desk.order_constProject')" width="180"></el-table-column>
        <el-table-column prop="createTime" :label="$t('desk.order_receiptTime')" width="180"></el-table-column>
        <el-table-column prop="updateTime" :label="$t('commons.operatingTime')" width="180"></el-table-column>
        <el-table-column prop="creatorName" :label="$t('desk.home_operator')" width="130"></el-table-column>
        <el-table-column :label="$t('commons.operating')" width="140">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">{{ $t("commons.detail") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="total,prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>
    <!-- 点击详情弹出框 -->
    <el-dialog :title="$t('commons.detail')" width="55%" top="0" v-if="detailsBill" :visible.sync="detailsBill">
      <el-row style="margin: 10px 20px">
          <el-col :span="8" style="margin-bottom: 10px">
            <span style="color: #888888">{{
                            $t("desk.home_customerName") +  "："
                        }}</span>
            {{ invoiceDetail.name }}
          </el-col>
          <el-col :span="12" style="margin-bottom: 10px">
            <span style="color: #888888">{{ $t("desk.home_roomNum") }}：</span>
            {{ invoiceDetail.roomNum }}
          </el-col>
            <el-col :span="8" style="margin-bottom: 10px">
            <span style="color: #888888">{{$t('desk.add_receiptNo')}}：</span>{{ invoiceDetail.receiptNumber }}
          </el-col>
          <el-col :span="12" style="margin-bottom: 10px">
            <span style="color: #888888">{{
                            $t("desk.order_payCompanyName") + "："
                        }}</span>
            {{ invoiceDetail.companyName }}
          </el-col>
          <el-col :span="8" style="margin-bottom: 10px">
            <span style="color: #888888">{{
                            $t("desk.customer_sum") +  "："
                        }}</span>
            {{ $F.numFormate(invoiceDetail.prices) }}
          </el-col>
          <el-col :span="12" style="margin-bottom: 10px">
            <span style="color: #888888">{{
                            $t("desk.order_receiptTime") +  "："
                        }}</span>
            {{ invoiceDetail.createTime }}
          </el-col>
          <el-col :span="8" style="margin-bottom: 10px">
            <span style="color: #888888">{{
                            $t("desk.order_constProject") + "："
                        }}</span>
            {{ invoiceDetail.projectName }}
          </el-col>
           <el-col :span="12" style="margin-bottom: 10px">
            <span style="color: #888888">{{$t('desk.order_invoicedAmount')}}：</span>{{ $F.numFormate(invoiceDetail.invoicePrice) }}
          </el-col>
           <el-col :span="8" style="margin-bottom: 10px">
            <span style="color: #888888">{{$t('desk.customer_constPrice')}}：</span>{{ $F.numFormate(invoiceDetail.consumePrice) }}
          </el-col>
          <el-col :span="12">
            <span style="color: #888888">{{
                            $t("desk.home_note") +  "："
                        }}</span>
            {{ invoiceDetail.remark }}
          </el-col>
      
      </el-row>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button class="submit" type="primary" @click="detailsBill = false">{{ $t("commons.close") }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createLogger } from "vuex";
export default {
  data() {
    return {
      detailsBill: false, //dialog 弹框
      pageIndex: 1,
      pageSize: 10,
      num: 1,
      total: 0,
      //已开票表格
      tableDatas: [],
      formInline: {
        startTime: "",
        endTime: "",
        name: "",
        receiptNumber:'',
      },
      currentPage3: 1,
      invoiceDetail: null, //发票详情
    };
  },
  created() {
    this.getInvoiceList();
  },
  methods: {
    //点击详情按钮
    handleDelete(index, row) {
      console.log(index);
      console.log(row);
      this.detailsBill = true;
      this.invoiceDetail = row;
    },
    //点击重置
    resetForm(formInline) {
      formInline.startTime = "";
      formInline.endTime = "";
      formInline.name = "";
      formInline.receiptNumber = "";
      this.pageIndex = 1;
      this.getInvoiceList();
    },
    //点击查询
    queryClick(formInline) {
      console.log(formInline);
      if (formInline.startTime) {
        if (formInline.endTime) {
          this.pageIndex = 1;
          this.getInvoiceList();
        } else {
          this.$message.error(this.$t("desk.home_timeInfo"));
        }
      } else {
        if (formInline.endTime) {
          this.$message.error(this.$t("desk.home_timeInfo"));
        } else {
          this.pageIndex = 1;
          this.getInvoiceList();
        }
      }
    },

    /**获取开票记录 列表数据 */
    getInvoiceList(params = {}) {
      this.$F.merge(params, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.$F.merge(params, this.formInline);
      this.$F.doRequest(this, "/pms/invoice/invoice_list", params, (data) => {
        console.log(data);
        this.tableDatas = data.invoiceList;
        this.total = data.page.count;
      });
    },
    // 每页数
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getInvoiceList();
    },
    // 当前页
    handleCurrentChange(val) {
      this.pageSize = 10;
      this.pageIndex = val;
      this.getInvoiceList();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
</style>
