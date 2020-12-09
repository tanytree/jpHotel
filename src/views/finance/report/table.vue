<!--
 * @Date: 2020-08-27 13:25:04
 * @Author: 陶子
 * @LastEditTime: 2020-12-09 17:29:35
 * @FilePath: \jiudian\src\views\finance\report\table.vue
-->
<template>
  <div>
    <el-card class="box-card" :body-style="{ padding: '10px  20px 0px' }">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          style="cursor: pointer; font-weight: 600"
          @click.native="backLastStack"
          >报表</el-breadcrumb-item
        >
        <el-breadcrumb-item style="font-weight: 700">详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <div style="margin-top: 10px">
      <el-card class="box-card2" :body-style="{ height: '600px' }">
        <el-form ref="selectForm" :model="selectForm" inline>
          <el-form-item label="选择报表：">
            <el-select v-model="selectForm.region">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="overLine"></div>
        <el-form ref="searchForm" :model="searchForm" inline>
          <el-form-item label="营业时间：" v-if="sourcePage == 'boss'">
            <el-date-picker
              v-model="searchForm.time"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="选择日期：" v-if="sourcePage == 'desk'">
            <el-date-picker
              v-model="searchForm.time"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            <span style="margin: 0 5px">-</span>
            <el-date-picker
              v-model="searchForm.time"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="选择单位：">
            <el-select v-model="searchForm.region">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button type="primary">打印</el-button>
            <el-button type="primary">导出</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectForm: {
        region: "shanghai",
      },
      searchForm: {
        time: "",
      },
      sourcePage: null,
    };
  },
  mounted() {
    console.log(this.$route);
    this.sourcePage = this.$route.query.sourcePage;
  },
  methods: {
    backLastStack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang='less' scoped>
.box-card {
  width: 100%;
}
.el-card .el-card__body {
  padding: 0 20px;
}
.box-card2 {
  height: 100%;
}
.overLine {
  width: 100%;
  border: 1px solid rgba(225, 225, 225, 1);
  margin-bottom: 20px;
}
</style>
