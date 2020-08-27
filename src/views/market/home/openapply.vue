<template>
  <div class="boss-index">
    <div class="content">
      <el-form inline :model="formInline" size="small" class="term line demo-form-inline">
        <el-form-item label="开票时间：">
          <el-date-picker type="date" v-model="formInline.startTime"></el-date-picker>
          <span class="line">至</span>
          <el-date-picker type="date" v-model="formInline.endTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="客户名称：">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="queryClick(formInline)">查询</el-button>
          <el-button class="white" @click="resetForm(formInline)">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableDatas"
        border
        height="100%"
        header-row-class-name="default"
        size="small"
      >
        <el-table-column prop="name" label="客户名称" width="140"></el-table-column>
        <el-table-column prop="roomNum" label="房间号" width="100"></el-table-column>
        <el-table-column prop="mobile" label="电话号码" width="140"></el-table-column>
        <el-table-column prop="companyName" label="付款方公司名称" width="200"></el-table-column>
        <el-table-column prop="prices" label="金额" width="100"></el-table-column>
        <el-table-column prop="projectName" label="项目" width="180"></el-table-column>
        <el-table-column prop="createTime" label="日期" width="180"></el-table-column>
        <el-table-column prop="updateTime" label="操作时间" width="180"></el-table-column>
        <el-table-column prop="creatorName" label="操作人" width="130"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 点击详情弹出框 -->
    <el-dialog title="详情" width="880px" top="0" v-if="detailsBill" :visible.sync="detailsBill">
      <el-row style="margin:10px 20px">
        <el-col :span="12">
          <el-col :span="12" style="margin-bottom: 10px;">
            <span style="color:#888888">客户名称：</span>
            {{invoiceDetail.name}}
          </el-col>
          <el-col :span="12" style="margin-bottom: 10px;">
            <span style="color:#888888">房间号:</span>
            {{invoiceDetail.roomNum}}
          </el-col>
          <el-col :span="12" style="margin-bottom: 10px;">
            <span style="color:#888888">电话号码:</span>
            {{invoiceDetail.mobile}}
          </el-col>
          <el-col :span="12" style="margin-bottom: 10px;">
            <span style="color:#888888">付款公司:</span>
            {{invoiceDetail.companyName}}
          </el-col>
          <el-col :span="12" style="margin-bottom: 10px;">
            <span style="color:#888888">金额:</span>
            {{invoiceDetail.prices}}
          </el-col>
          <el-col :span="12" style="margin-bottom: 10px;">
            <span style="color:#888888">日期:</span>
            {{invoiceDetail.createTime}}
          </el-col>
          <el-col :span="12" style="margin-bottom: 10px;">
            <span style="color:#888888">项目:</span>
            {{invoiceDetail.projectName}}
          </el-col>
          <el-col>
            <span style="color:#888888">备注：</span>
            {{invoiceDetail.remark}}
          </el-col>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button class="submit" type="primary" @click="detailsBill = false">关闭</el-button>
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
      tableDatas: [
        //已开票表格
        {
          clientName: "tom",
          roomNum: 12,
          phonenum: 1111111,
          billType: "增值税电子发票",
          invoiceTitle: "全购网络技术有限公司",
          invoiceAmount: 150,
          taxes: 0,
          billNum: 5545554,
          time: "2020/1/10",
          operator: "张三",
        },
        {
          clientName: "lucy",
          roomNum: 16,
          phonenum: 1111111,
          billType: "增值税电子发票",
          invoiceTitle: "李四网络有限公司",
          invoiceAmount: 780,
          taxes: 0,
          billNum: 6666666,
          time: "2020/8/10",
          operator: "李四",
        },
      ],
      formInline: {
        startTime: "",
        endTime: "",
        name: "",
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
    },
    //点击查询
    queryClick(formInline) {
      console.log(formInline);
      this.pageIndex = 1;
      this.getInvoiceList();
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
        this.total = data.page.pageTotal;
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
