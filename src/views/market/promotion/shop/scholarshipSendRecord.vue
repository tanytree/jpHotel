<!--
 * @Date: 2020-03-16 11:36:13
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-22 09:42:05
 * @FilePath: /cloudAdmin/src/views/market/promotion/shop/coupon1.vue
 -->
<template>
  <el-form :model="form" :inline="true" class="top-body" size="small" label-width="80px">
    <el-form-item label="奖学金">
      <el-input v-model="form.awardsMoney" style="width:150px" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="发放日期">
      <el-date-picker
        type="date"
        placeholder="请选择"
        style="width:140px"
        value-format="yyyy-MM-dd"
        class="dateBox"
        v-model="form.startTime"
      ></el-date-picker>
      <span>--</span>
      <el-date-picker
        type="date"
        placeholder="请选择"
        style="width:140px"
        value-format="yyyy-MM-dd"
        class="dateBox"
        v-model="form.endTime"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="相关课程">
      <el-input v-model="form.courseName" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="fetchScholarshipRecordList()" type="primary">查询</el-button>
      <el-button @click="resetForm(true)">重置</el-button>
    </el-form-item>
    <el-table
      size="medium"
      :data="tableData"
      v-loading="dataListLoading"
      :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
    >
      <el-table-column prop="awardsRange" label="奖学金标题"></el-table-column>
      <el-table-column prop="userName" label="获得人"></el-table-column>
      <el-table-column prop="createTime" label="发放日期"></el-table-column>
      <el-table-column prop="courseName" label="相关课程"></el-table-column>
      <el-table-column width="160px" label="操作">
        <template slot-scope="{row}">
<!--          <el-button @click="addCoupon(row.id)" v-if="row.status==1" type="text">查看</el-button>-->
          <el-button @click="deleteRecord(row)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:10px"></div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
        // 分页要素
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        form: {

        },
        dataListLoading: false,
        dataListSelections: [],
        editForm: {},
        tableData: [],
        visible: false,
    };
  },
    activated() {
        this.fetchScholarshipRecordList()
        this.enterKeyup();
    },
  methods: {
      resetForm(query) {
        this.form = {};
        this.pageIndex = 1;
        this.pageSize = 10;
        this.totalPage = 0;
        if (query)
            this.fetchScholarshipRecordList();
      },
    /**显示 */
    handleScholarship(id) {

      this.visible = true;
    },

      deleteRecord(row) {
        debugger
          this.$confirm(
              `确定删除`,
              "提示",
              {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
              }
          ).then(() => {
              this.$F.doRequest(this, '/edt/Admincourse/edt_awards_give_delete', {edtCourseAwardId: row.id}, (data) => {
                  this.$message.success(`删除成功`);
                  this.pageIndex = 1;
                  this.fetchScholarshipRecordList()
              })
          });
      },
      enterKeyup () {
          document.addEventListener('keyup', (event) => {
              const code = event.keyCode
                  ? event.keyCode
                  : event.which
                      ? event.which
                      : event.charCode
              if (code == 13) {
                  this.fetchScholarshipRecordList()
              }
          })
      },

      fetchScholarshipRecordList () {
          const params = {
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
          }
          this.$F.merge(params, this.form);
          this.$F.doRequest(this, '/edt/Admincourse/edt_awards_give', params, (data) => {
              this.totalPage = data.totalSize
              this.tableData = data.list
          })
      },

      // 每页数
      handleSizeChange (val) {
          this.pageSize = val
          this.pageIndex = 1
          this.fetchScholarshipRecordList()
      },
      // 当前页
      handleCurrentChange (val) {
          this.pageSize = 10
          this.pageIndex = val
          this.fetchScholarshipRecordList()
      },
  }
};
</script>

<style>
.line {
  text-align: center;
  vertical-align: bottom;
}
</style>
