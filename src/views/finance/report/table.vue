<template>
  <div class="boss-index">
    <el-table
      v-if="type=='day'"
      :data="reportData"
      size="small"
      border
      height="100%"
      header-row-class-name="default"
      class="report-table"
    >
      <el-table-column header-align="center" prop="val1" :label="$t('boss.report_profession')"></el-table-column>
      <el-table-column header-align="center" prop="val2" :label="$t('boss.report_happenToday')"></el-table-column>
      <el-table-column
        header-align="center"
        prop="val3"
        :label="$t('boss.report_cumulativeThisMonth')"
      ></el-table-column>
      <el-table-column
        header-align="center"
        prop="val4"
        :label="$t('boss.report_cumulativeLastMonth')"
      ></el-table-column>
      <el-table-column
        header-align="center"
        prop="val5"
        :label="$t('boss.report_cumulativeLastYear')"
      ></el-table-column>
      <el-table-column
        header-align="center"
        prop="val6"
        :label="$t('boss.report_cumulativeThisYear')"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    type: String,
    reportData: Array,
  },
};
</script>

<style scoped>
.boss-index {
  flex: 1;
  height: 0;
}
</style>
