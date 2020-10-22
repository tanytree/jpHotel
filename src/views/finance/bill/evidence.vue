<!--
 * @Date: 2020-03-20 19:11:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-16 16:59:47
 * @FilePath: \jiudian\src\views\finance\bill\evidence.vue
 -->
<template>
  <div class="boss-index">
    <el-card shadow="never">
      <el-form ref="form" inline :model="form" size="small" label-width="100px" class="term line">
        <el-form-item :label="$t('commons.selectDate')+':'">
          <el-date-picker type="date" v-model="form.strDate"></el-date-picker>
          <span class="line">{{$t('boss.report_toText')}}</span>
          <el-time-picker type="date" v-model="form.endDate"></el-time-picker>
        </el-form-item>
        <el-form-item :label="$t('manager.grsl_reviewState')+':'">
          <el-select v-model="form.status" clearable :placeholder="$t('manager.hk_pleaseSelect')">
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
          <el-button size="small" class="submit">{{$t('manager.grsl_audit')}}</el-button>
          <el-button size="small" class="submit">{{$t('manager.finance_theAudit')}}</el-button>
          <el-button size="small" class="submit">{{$t('manager.finance_batchDelete')}}</el-button>
<!--          <el-button size="small" class="submit">{{ $t('commons.exportBtn')}}</el-button>-->
        </div>
      </el-form>
      <el-table
        :data="tableData"
        size="small"
        :span-method="objectSpanMethod"
        border
        height="100%"
        header-row-class-name="default"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          header-align="center"
          prop="code"
          :label="$t('manager.finance_date')"
          width="160"
        ></el-table-column>
        <el-table-column
          header-align="center"
          prop="name"
          :label="$t('manager.finance_proofWords')"
          width="120"
        ></el-table-column>
        <el-table-column
          header-align="center"
          prop="direct"
          :label="$t('manager.finance_abstract')"
        ></el-table-column>
        <el-table-column header-align="center" prop="direct" :label="$t('manager.finance_project')"></el-table-column>
        <el-table-column
          header-align="center"
          prop="direct"
          :label="$t('manager.finance_debitBalance')"
        >width="180"></el-table-column>
        <el-table-column
          header-align="center"
          prop="direct"
          :label="$t('manager.finance_creditBalance')"
          width="180"
        ></el-table-column>
        <el-table-column
          header-align="center"
          prop="direct"
          :label="$t('manager.grsl_makingPeople')"
          width="180"
        ></el-table-column>
        <el-table-column
          header-align="center"
          prop="direct"
          :label="$t('manager.grsl_reviewPeople')"
          width="120"
        ></el-table-column>
        <el-table-column header-align="center" :label="$t('commons.operating')" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >{{$t('commons.modify')}}</el-button>
            <el-popconfirm
              :title="$t('manager.grsl_sureDelete')+'？'"
              icon="el-icon-warning-outline"
              iconColor="#FF8C00"
              onConfirm="handleDelete(scope.row)"
            >
              <el-button slot="reference" type="text">{{$t('commons.delete')}}</el-button>
            </el-popconfirm>
            <el-button
              type="text"
              icon="el-icon-shopping-cart-full"
              @click="handleExamine(scope.$index, scope.row)"
            >{{$t('manager.finance_sterilisation')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { get_consume_list, del_consume_info } from "@/utils/api/finance";

export default {
  data() {
    return {
      form: {
        strDate: "",
        endDate: "",
        status: "",
      },
      type: [{ value: 1, label: "2020年第4期" }],
      tableData: [],
    };
  },
  mounted() {
    this.getEvidenceData();
  },
  methods: {
    getEvidenceData() {
      this.$F.doRequest(
        this,
        "/pms/credentail/list",
        {
          startTime: this.form.strDate,
          endTime: this.form.endDate,
          auditStatus: this.form.status,
        },
        (res) => {
          this.tableData = res;
        }
      );
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    selectionChange(val) {},
    handleEdit(index, row) {},

    handleDelete(row) {},
    handleExamine(index, row) {},
  },
};
</script>

<style>
</style>
