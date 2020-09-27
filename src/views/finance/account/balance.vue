<template>
  <div class="boss-index">
    <el-card shadow="never">
      <el-form ref="form" inline :model="form" label-width="80px" class="term line">
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
        <div class="export">
          <el-button type="primary" class="submit">{{$t('commons.exportBtn')}}</el-button>
        </div>
      </el-form>
      <el-table
        :data="tableData"
        size="small"
        border
        height="100%"
        header-row-class-name="default"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          header-align="center"
          prop="code"
          :label="$t('manager.finance_projectNum')"
          width="120"
        ></el-table-column>
        <el-table-column
          header-align="center"
          prop="name"
          :label="$t('manager.finance_projectName')"
          width="180"
        ></el-table-column>
        <el-table-column
          header-align="center"
          prop="direct"
          :label="$t('manager.finance_direction')"
          width="180"
        ></el-table-column>
        <el-table-column header-align="center" :label="$t('manager.finance_beginning')">
          <el-table-column
            header-align="center"
            prop="province"
            :label="$t('manager.finance_borrower')"
            width="140"
          ></el-table-column>
          <el-table-column
            header-align="center"
            prop="city"
            :label="$t('manager.finance_lender')"
            width="140"
          ></el-table-column>
        </el-table-column>
        <el-table-column header-align="center" :label="$t('manager.finance_current')">
          <el-table-column
            header-align="center"
            prop="province"
            :label="$t('manager.finance_borrower')"
            width="140"
          ></el-table-column>
          <el-table-column
            header-align="center"
            prop="city"
            :label="$t('manager.finance_lender')"
            width="140"
          ></el-table-column>
        </el-table-column>
        <el-table-column header-align="center" :label="$t('manager.finance_nowYear')">
          <el-table-column
            header-align="center"
            prop="province"
            :label="$t('manager.finance_borrower')"
            width="140"
          ></el-table-column>
          <el-table-column
            header-align="center"
            prop="city"
            :label="$t('manager.finance_lender')"
            width="140"
          ></el-table-column>
        </el-table-column>
        <el-table-column header-align="center" :label="$t('manager.finance_end')">
          <el-table-column
            header-align="center"
            prop="province"
            :label="$t('manager.finance_borrower')"
            width="140"
          ></el-table-column>
          <el-table-column
            header-align="center"
            prop="city"
            :label="$t('manager.finance_lender')"
            width="140"
          ></el-table-column>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { get_recharge_info, pay_weixinpc } from "@/utils/api/finance";

export default {
  data() {
    return {
      form: { type: 1 },
      type: [{ value: 1, label: "2020年第4期" }],
      tableData: [{ code: "1001", name: "库存现金", direct: "借" }],
    };
  },
  mounted() {
    this.getDamageData();
  },
  methods: {
    getBalanceData() {
      this.$F.doRequest(
        this,
        "/pms/orderanls/running_account_subject",
        { monthTime: this.form.type },
        (res) => {
          this.tableData = res;
        }
      );
    },
  },
};
</script>

<style lang="less">
.centerBox {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

  img {
    width: 100px;
    height: 100px;
  }
}
</style>
