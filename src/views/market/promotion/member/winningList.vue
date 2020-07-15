<!--
 * @Date: 2020-04-22 10:25:01
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-22 16:57:32
 * @FilePath: /cloudAdmin/src/views/market/promotion/member/winningList.vue
 -->
<template>
  <el-card>
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/promotion' }">会员营销</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/userIntegral' }">积分管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/userActivity' }">活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>中奖名单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form inline size="small">
      <el-form-item>
        <el-input v-model="searchForm.keyword" placeholder="请输入姓名/联系电话"></el-input>
      </el-form-item>
      <el-form-item label="中奖时间">
        <el-date-picker
          v-model="searchForm.start_time"
          value-format="yyyy-MM-dd"
          type="date"
          style="width:140px"
          placeholder="选择日期"
        ></el-date-picker>
        <span style="margin:0 5px">-</span>
        <el-date-picker
          v-model="searchForm.end_time"
          value-format="yyyy-MM-dd"
          type="date"
          style="width:140px"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDataList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
      @selection-change="handleSelectionChange"
      size="medium"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="goods_kinds" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goods_kinds" label="联系电话" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goods_price" label="会员等级" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goods_time" label="累计消费" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goods_time" label="加入时间" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="text" size="mini">编辑</el-button>
          <el-button type="text" size="mini" @click="deleteHandle(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:10px"></div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchForm.page"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="searchForm.page_num"
      layout=" sizes, prev, pager, next, jumper"
      :total="listTotal"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {}, //查询条件
      listTotal: 0, //总条数
      queryid: "",
      multipleSelection: [], //多选
      tableData: [] //表格数据
    };
  },

  activated() {
    if (this.$route.query.id) {
      this.queryid = this.$route.query.id;
      this.initForm();
    }
  },
  methods: {
    initForm() {
      this.searchForm = {
        id: this.queryid,
        page: 1, //当前页
        page_num: 10, //页数
        keywords: "", //关键字
        start_time: "", //考试时件
        end_time: "" //结束时间
      };
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      this.$http({
        url: this.$http.adornUrl("//market/score/get_raffle_log_list"),
        method: "post",
        data: this.$http.adornData(this.searchForm)
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.listTotal = res.data.total;
        }
      });
    },
    /**每页数 */
    handleSizeChange(val) {
      this.searchForm.page_num = val;
      this.searchForm.page = 1;
      this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.getDataList();
    }
  }
};
</script>

<style>
</style>
