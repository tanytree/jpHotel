<template>
  <div class>
    <el-card>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="level_id" placeholder="分销等级">
            <el-option v-for="item in levelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="keywords" class="input-with-select">
            <el-button slot="append" @click="pageIndex=1;getDataList()">查询</el-button>
          </el-input>
        </el-form-item>
        <el-button style="float:right" type="primary" @click="toAdd">新增分销商</el-button>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        v-loading="dataListLoading"
      >
        <el-table-column prop="agent_name" label="分销商" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" label="加入时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="level_name" label="等级" show-overflow-tooltip></el-table-column>
        <el-table-column prop="buy_number" label="购买商品数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="total_price" label="购买总金额" show-overflow-tooltip></el-table-column>
        <el-table-column prop="use_num" label="累计奖励" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="{row}">
            <el-button size="mini" @click="lookDetail(row.id)">详情</el-button>
            <el-button size="mini" @click="levleEdit(row)">等级修改</el-button>
            <el-button size="mini" @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px"></div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>

      <!-- 等级修改 -->
      <el-dialog title="等级修改" :close-on-click-modal="false" :visible.sync="visible">
        <el-form ref="addform" :model="addform" label-width="120px">
          <el-form-item required label="当前等级">{{editLevel}}</el-form-item>
          <el-form-item required label="选择等级">
            <el-select v-model="targetLevel" placeholder="分销等级">
              <el-option
                v-for="item in levelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="levelChange()">确定</el-button>
        </span>
      </el-dialog>
      <!-- 等级修改 --> 
      <!-- 新增分销商 -->
      <el-dialog title="新增" :close-on-click-modal="false" :visible.sync="addVisible">
        <el-form ref="addform" :model="addform" label-width="120px">
          <el-form-item required label="分销商名称">
            <el-input v-model="addform.name"></el-input>
          </el-form-item>
          <el-form-item required label="登录账号">
            <el-input v-model="addform.account"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取消</el-button>
          <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
      </el-dialog>
      <!-- 新增分销商 -->
      <!-- 详情 -->
      <detail ref="detailModal" dataType="3" v-if="detailVisible" />
    </el-card>
  </div>
</template>

<script>
import detail from "../detail";
import { mapState, mapActions } from "vuex";

export default {
  components: { detail },
  data() {
    return {
      input3: "",
      editId: "",
      levelList: [],
      tableData: [],
      level_id: "",
      visible: false,
      addVisible: false,
      detailVisible: false,
      addform: {
        name: "",
        account: ""
      },
      editLevel: "",
      targetLevel: "",
      keywords: "",
      start_time: "",
      end_time: "",
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  created() {
    this.getDataList();
    this.getLevellist();
  },
  methods: {
    getLevellist() {
      this.$http({
        url: this.$http.adornUrl("/market/agent_set/get_users_level_List"),
        method: "post",
        data: this.$http.adornData({
          type: "2"
        })
      }).then(data => {
        console.log(data);
        if (data.code == 200) {
          this.levelList = data.data;
        }
      });
    },
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/market/agent/get_agent_list"),
        method: "post",
        data: this.$http.adornData({
          type: "4",
          page: this.pageIndex,
          page_num: this.pageSize,
          level_id: this.level_id,
          keywords: this.keywords
        })
      })
        .then(data => {
          this.dataListLoading = false;
          if (data.code == 200) {
            this.tableData = data.data.list;
            this.totalPage = data.data.total;
          } else {
            this.tableData = [];
            this.totalPage = 0;
          }
        })
        .catch(() => {
          this.dataListLoading = false;
          this.$message.error("服务器错误，请联系管理员");
        });
    },
    dataFormSubmit() {
      this.$http({
        url: this.$http.adornUrl("/market/goods/edit_use_price"),
        method: "post",
        data: this.$http.adornData({
          use_price: this.editPrice,
          id: this.editId
        })
      }).then(data => {
        this.visible = false;
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
      });
    },
    levleEdit(row) {
      this.editId = row.id;
      this.editLevel = row.level_name;
      this.visible = true;
    },
    levelChange() {
      this.$http({
        url: this.$http.adornUrl("/market/agent/edit_agent_info"),
        method: "post",
        data: this.$http.adornData({
          id: this.editId,
          users_type: 1,
          level_id: this.targetLevel
        })
      }).then(data => {
        this.targetLevel = "";
        this.visible = false;
        if (data && data.code == 200) {
          this.getDataList();
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500,
            onClose: () => {}
          });
        } else {
          this.$message.error(data.message);
        }
      });
    },
    lookDetail(id) {
      this.detailVisible = true;
      this.$nextTick(() => {
        this.$refs.detailModal.init(id);
      });
    },
    editPriceF(row) {},
    toAdd() {
      this.addVisible = true;
    },
    // 给表单的表头添加背景颜色

    // 每页数
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle(id) {
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
            url: this.$http.adornUrl("/market/agent/del_agent_info"),
            method: "post",
            data: this.$http.adornData({ id: id })
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>