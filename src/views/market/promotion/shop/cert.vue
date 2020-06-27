<!--
 * @Date: 2020-03-16 15:49:22
 * @LastEditors: Dana
 * @LastEditTime: 2020-05-11 22:01:28
 * @FilePath: /cloudAdmin/src/views/market/promotion/shop/coupon2.vue
 -->

<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/promotion' }">店铺营销</el-breadcrumb-item>
          <el-breadcrumb-item>证书管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form :model="form" :inline="true" class="top-body" size="small" label-width="80px">
        <el-form-item label="获得人">
          <el-input v-model="form.userName" style="width:150px" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="获得日期">
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
          <el-button @click="fetchCertList()" type="primary">查询</el-button>
          <el-button @click="resetForm(true)">重置</el-button>
        </el-form-item>
        <el-table
          size="mini"
          :data="tableData"
          v-loading="dataListLoading"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        >
          <el-table-column prop="userName" label="获得人"></el-table-column>
          <el-table-column prop="updateTime" label="获得日期"></el-table-column>
          <el-table-column prop="courseName" label="相关课程"></el-table-column>
          <el-table-column width="160px" label="操作">
            <template slot-scope="{scope}">
              <el-button @click="addCoupon(scope.row.id)" type="text">查看证书</el-button>
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        form: {

        },
        is_score: false,
        is_coupon: false,
        readOnly: true,
        dataListLoading: false,
        dataListSelections: [],
        editForm: {},
        tableData: [],
        visible: false,
    }
  },

  watch: {
    is_score(newVal, oldVal) {
      this.editForm.is_score = newVal ? "1" : "2";
    },
    is_coupon(newVal, oldVal) {
      this.editForm.is_coupon = newVal ? "1" : "2";
    }
  },
    // activate
  created() {
      this.fetchCertList();
  },
  methods: {
      resetForm(query) {
          this.form = {
              userName: "", //获得人模糊查询
              startTime: "", //交易开始时间
              endTime: "", //交易结束时间
              courseName: "", //相关课程模糊查询
          };
          console.log(this.form);
          this.pageIndex = 1;
          this.pageSize = 8;
          this.totalPage = 0;
          if (query)
            this.fetchCertList();
      },
      enterKeyup () {
          document.addEventListener('keyup', (event) => {
              const code = event.keyCode
                  ? event.keyCode
                  : event.which
                      ? event.which
                      : event.charCode
              if (code == 13) {
                  this.fetchCertList()
              }
          })
      },

      fetchCertList () {
          const params = {
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
          }
          this.$F.merge(params, this.form);
          this.$F.doRequest('', '/edt/Admincourse/awards_list', params, (data) => {
              this.totalPage = data.totalSize
              this.tableData = data.list
          })
      },

      // 每页数
      handleSizeChange (val) {
          this.pageSize = val
          this.pageIndex = 1
          this.fetchCertList()
      },
      // 当前页
      handleCurrentChange (val) {
          this.pageSize = 10
          this.pageIndex = val
          this.fetchCertList()
      },
  }
};
</script>

<style lang="less">
.line {
  text-align: center;
  vertical-align: bottom;
}
.el-rowS {
  .el-row {
    .el-col {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
}

.itemCard {
  .el-card__header {
    padding: 8px 10px;
  }
}
</style>
