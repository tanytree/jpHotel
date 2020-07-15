<template>
  <div>
    <el-card>
      <el-form inline size="small">
        <el-form-item>
          <el-input v-model="searchForm.keyword" placeholder="请输入计划名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList">查询</el-button>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="addPlan()">添加计划</el-button>
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
        size="medium"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="采购计划" show-overflow-tooltip></el-table-column>
        <el-table-column prop="user_name" label="负责人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="purchase_time" label="采购时间" show-overflow-tooltip sortable></el-table-column>
        <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip sortable></el-table-column>
        <el-table-column prop="goods_count" label="商品数量" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="datail(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="editPlan(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
    <el-dialog top="0" :title="title" :visible.sync="dialogFormVisible" :append-to-body="true">
      <el-form :model="editForm" label-width="80px" size="small">
        <el-form-item label="计划名称">
          <el-input v-model="editForm.title" autocomplete="off" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="采购时间">
          <el-date-picker
            v-model="editForm.purchase_time"
            type="date"
            placeholder="选择采购日期"
            style="width: 400px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="editForm.user_id" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savePlan()">确定</el-button>
        <el-button @click="dialogFormVisible=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  get_plan_list,
  del_plan_info,
  edit_plan_info
} from "@/utils/api/purchase";
import addplan from "./planComponents/addPlan";
export default {
  components: { addplan },
  data() {
    return {
      title: "编辑",
      dialogFormVisible: false,
      editForm: {},
      searchForm: {}, //查询条件
      listTotal: 0, //总条数
      options: [], //人员列表
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

    //添加计划
    addPlan() {
      this.editForm = {
        title: "",
        purchase_time: "",
        user_id: "",
        user_name: ""
      };

      this.dialogFormVisible = true;
    },
    //编辑计划
    editPlan(row) {
      this.editForm = {
        id: row.id,
        title: row.title,
        purchase_time: row.purchase_time,
        user_id: row.user_id,
        user_name: row.user_name
      };
      this.dialogFormVisible = true;
    },

    /**保存编辑 */
    savePlan() {
      this.$http({
        url: this.$http.adornUrl("/purchase/plan/edit_plan_info"),
        method: "post",
        data: this.$http.adornData(this.editForm)
      }).then(res => {
        if (res.code == 200) {
          this.getDataList();
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
          this.dialogFormVisible = false;
      });
    },
    //批量删除
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
          del_plan_info({ id: ids }).then(data => {
            if (data && data.code === 200) {
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
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //获取计划列表
    getDataList() {
      get_plan_list(this.searchForm).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.listTotal = res.data.total;
        }
      });
    },
    //跳转到计划详情页面
    datail(row) {
      this.selectInfo = row;
      this.$router.push({
        name: "planDetail",
        query: {
          id: row.id
        }
      });
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
