<template>
  <div class="boss-index">
    <el-card shadow="never">
      <el-form ref="form" inline :model="form" size="small" class="term line">
        <el-form-item :label="$t('manager.finance_date')+':'">
          <el-select v-model="form.type" clearable :placeholder="$t('manager.hk_pleaseSelect')">
            <el-option
              v-for="item in type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit">{{$t('commons.queryBtn')}}</el-button>
        </el-form-item>
<!--        <div class="export">-->
<!--          <el-button type="primary" size="small" class="submit">{{$t('commons.exportBtn')}}</el-button>-->
<!--        </div>-->
      </el-form>
      <div class="detailed">
        <div class="flex-col left">
          <div class="top">{{$t('manager.finance_project')+':'}} {{subject}}</div>
          <el-table
            :data="tableData"
            size="small"
            border
            height="100%"
            header-row-class-name="default"
          >
            <el-table-column
              header-align="center"
              prop="date"
              :label="$t('manager.finance_date')"
              width="200"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="abs"
              :label="$t('manager.finance_abstract')"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="debit"
              :label="$t('manager.finance_borrower')"
              width="200"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="credit"
              :label="$t('manager.finance_lender')"
              width="200"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="direct"
              :label="$t('manager.finance_direction')"
              width="150"
            ></el-table-column>
            <el-table-column
              header-align="center"
              align="right"
              prop="balance"
              :label="$t('manager.finance_balance')"
              width="200"
            ></el-table-column>
          </el-table>
        </div>
        <div class="flex-col right">
          <div class="top">{{$t('manager.finance_change')}}</div>
          <el-tree
            :data="treeData"
            :props="defaultProps"
            @node-click="nodeClick"
            default-expand-all
            highlight-current
          ></el-tree>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { get_security_sum, get_balance } from "@/utils/api/finance";

export default {
  data() {
    return {
      form: { type: 1 },
      subject: "",
      type: [{ value: 1, label: "2020年第4期" }],
      tableData: [
        {
          date: "2020-04-01",
          abs: "期初余额",
          debit: "",
          credit: "",
          direct: "借",
          balance: "1000.00",
        },
      ],
      treeData: [
        {
          label: "1001库存现金",
          children: [
            { label: "100101日常现金" },
            { label: "100102微信现金" },
            { label: "100103支付宝现金" },
          ],
        },
        {
          label: "1002银行存款",
          children: [
            { label: "100101日常现金" },
            { label: "100102微信现金", children: [{ label: "三级 2-2-1" }] },
          ],
        },
        {
          label: "1001库存现金",
          children: [
            { label: "100102微信现金", children: [{ label: "三级 3-1-1" }] },
            { label: "100103支付宝现金" },
          ],
        },
      ],
      defaultProps: { children: "children", label: "label" },
    };
  },
  mounted() {},
  methods: {
    getDetailData() {
      this.$F.doRequest(
        this,
        "/pms/orderanls/running_account_detail",
        { monthTime: this.form.type, subjectsId: "" },
        (res) => {
          this.tableData = res.credentailList;
        }
      );
    },
    nodeClick() {},
  },
};
</script>

<style lang="less">
.detailed {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: row;

  .left {
    width: 0;
  }

  .right {
    width: 300px;
    margin-left: 20px;
    flex: none;

    .top {
      text-align: center;
    }

    .el-tree {
      flex: 1;
      height: 0;
      overflow: auto;
      padding: 20px;
      border: 1px solid #ebeef5;

      .el-tree-node__content {
        height: 30px;
      }
    }
  }

  .top {
    border: 1px solid #ebeef5;
    border-bottom: 0;
    line-height: 50px;
    padding: 0 20px;
  }
}
</style>
