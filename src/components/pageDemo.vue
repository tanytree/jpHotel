
<template>
  <!-- 统一的列表格式 -->
  <div>
    <el-card>
      <el-form inline size="small">
        <el-form-item>
          <el-input v-model="searchForm.keyword" placeholder="请输入姓名/联系电话"></el-input>
        </el-form-item>
        <el-form-item label="投放时间">
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
      <div style="padding-bottom:10px">
        <el-button
          type="danger"
          size="mini"
          @click="deleteHandle()"
          :disabled="multipleSelection.length <= 0"
        >批量删除</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        @selection-change="handleSelectionChange"
        size="mini"
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
  </div>
</template>

<script>
import { get_agent_list } from "@/utils/api/market";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      searchForm: {}, //查询条件
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [] //表格数据
    };
  },
  created() {
    this.initForm();
  },
  methods: {
    initForm() {
      this.searchForm = {
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
        url: this.$http.adornUrl("/purchase/contract/get_contract_info"),
        method: "post",
        data: this.$http.adornData(this.searchForm)
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.listTotal = res.data.total;
        }
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.multipleSelection.map(item => {
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
            url: this.$http.adornUrl("/purchase/contract/get_contract_info"),
            method: "post",
            data: this.$http.adornData({ id: ids })
          }).then(data => {
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
              this.$message.error(data.msg);
            }
          });
        })
        .catch(() => {});
    },
    /**多选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
 