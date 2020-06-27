<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'purchasePlan' }">采购计划</el-breadcrumb-item>
          <el-breadcrumb-item>计划详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form inline size="small">
        <el-form-item>
          <el-input v-model="searchForm.keyword">
            <el-button slot="append" @click="getDataList">查询</el-button>
          </el-input>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="addGoods()">添加产品</el-button>
          <!-- <el-button type="primary" @click="fastCkeck()">一键询盘</el-button> -->
        </el-form-item>
      </el-form>
      <el-button
        style="margin: 10px 0px;"
        type="danger"
        size="mini"
        :disabled="dataListSelections.length <= 0"
        @click="delateSelect()"
      >批量删除</el-button>

      <div style="margin-top:10px"></div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="title" label="产品名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="category_name" label="分类" show-overflow-tooltip></el-table-column>
        <el-table-column label="规格种类" show-overflow-tooltip>
          <template slot-scope="{row}">{{row.option.length}} 种</template>
        </el-table-column>
        <el-table-column prop="number" label="采购数量" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="toSelect(row)">详情</el-button>
            <!-- <el-button type="text" size="small" @click="toEdit(row)">编辑</el-button> -->
            <el-button type="text" size="small" @click="delateSelect(row.id)">删除</el-button>
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
    <!--详情-->
    <el-dialog :visible.sync="dialogDetailVisible">
      <el-table ref="multipleTable" :data="goodsDeatil.option" size="mini" border>
        <el-table-column prop="title" label="产品名称"></el-table-column>
        <el-table-column label="产品规格">
          <template slot-scope="{row}">
            <span v-for="item in row.spec" :key="item.id">{{item.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="采购数量"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import detail from "./planComponents/detail";
export default {
  components: {
    detail
  },
  data() {
    return {
      searchForm: {},
      field: {
        keyword: "",
        page: 1,
        page_num: 10
      },
      num: 0,
      currentPage1: 1,
      tableData: [],
      dataListSelections: [],
      dialogDetailVisible: false,
      title: "添加方式",
      formLabelWidth: "120px",
      form: {
        name: "",
        people: "",
        time: ""
      },
      radio_status: 0,
      selectIndex: "",
      selectList: [],
      planId: "",

      listTotal: 0,
      goodsDeatil: []
    };
  },
  created() {},
  activated() {
    this.planId = this.$route.query.id;

    this.checkQuery();
  },
  methods: {
    //查询计划
    checkQuery() {
      this.searchForm = {
        page: 1, //当前页
        page_num: 10, //页数
        keywords: "", //关键字
        start_time: "", //考试时件
        end_time: "", //结束时间
        plan_id: this.planId
      };
      this.getDataList();
    },
    //添加计划
    addGoods() {
      this.$router.push({
        path: "/planDetailEdit",
        query: { planId: this.planId }
      });
    },

    //一键询盘
    fastCkeck() {},

    //批量删除
    delateSelect(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$http({
            url: this.$http.adornUrl("/purchase/goods_info/del_goods_info"),
            method: "post",
            data: this.$http.adornData({ id: ids })
          })
            .then(data => {
              if (data && data.code == 200) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.getDataList();
                  }
                });
              } else {
                this.$message.error(data.message);
              }
            })
            .catch(() => {
              this.$message.error("系统错误");
            });
        })
        .catch(() => {
          // this.$message.error("系统错误");
        });
    },
    //获取计划列表
    getDataList() {
      this.$http({
        url: this.$http.adornUrl("/purchase/goods_info/get_goods_list"),
        method: "post",
        data: this.$http.adornData(this.searchForm)
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list;
        }
      });
    },

    toSelect(item) {
      this.goodsDeatil = item;
      this.dialogDetailVisible = true;
    },
    toEdit(item) {
      sessionStorage.planGoods = JSON.stringify(item);
      this.$router.push({
        path: "/planDetailEdit"
      });
    },
    //tab选中那条数据
    handleSelectionChange(val) {
      this.dataListSelections = val;
      this.num = this.dataListSelections.length;
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>