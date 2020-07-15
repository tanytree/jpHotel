<template>
  <div class>
    <el-card>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="searchForm.level_id" placeholder="等级">
            <el-option v-for="item in levelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="searchForm.keywords" class="input-with-select">
            <el-button slot="append" @click="searchForm.pageIndex=1;getDataList()">查询</el-button>
          </el-input>
        </el-form-item>
        <el-button style="float:right" v-if="searchForm.type==2" type="primary" @click="toAdd">新增{{titleName}}</el-button>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        v-loading="dataListLoading"
        size="mini"
      >
        <el-table-column prop="agent_name" :label="titleName" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" label="加入时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="level_name" label="等级" show-overflow-tooltip></el-table-column>
        <el-table-column prop="buy_number" label="购买商品数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="total_price" label="购买总金额" show-overflow-tooltip></el-table-column>
        <el-table-column prop="use_num" label="累计奖励" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="{row}">
            <el-button type="text" size="mini" @click="lookDetail(row.id)">详情</el-button>
            <el-button type="text" size="mini" @click="levleEdit(row)">等级修改</el-button>
            <el-button type="text" size="mini" @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px"></div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="searchForm.pageSize"
        :total="searchForm.totalPage"
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
        <el-form ref="addform" v-if="searchForm.type==2" :model="addform" label-width="120px">
          <el-form-item required :label="titleName+'名称'">
            <el-input v-model="addform.agent_phone"></el-input>
          </el-form-item>
          <el-form-item required label="登录账号">
            <el-input v-model="addform.agent_name"></el-input>
          </el-form-item>
        </el-form>
        <el-form ref="addform" v-if="searchForm.type==3" :model="addform" label-width="120px">
          <el-form-item required label="代理商类型">
            <el-radio-group v-model="addform.users_type">
              <el-radio :label="2">企业</el-radio>
              <el-radio :label="1">个人</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item required label="企业名称">
            <el-input v-model="addform.agent_name"></el-input>
          </el-form-item>
          <el-form-item required label="企业识别码">
            <el-input v-model="addform.co_code"></el-input>
          </el-form-item>
          <el-form-item required label="选择等级">
            <el-input v-model="addform.agent_name"></el-input>
          </el-form-item>
          <el-form-item required label="联系人">
            <el-input v-model="addform.agent_name"></el-input>
          </el-form-item>
          <el-form-item required label="联系电话">
            <el-input v-model="addform.agent_name"></el-input>
          </el-form-item>
          <!-- <el-form-item required label="所属合伙人">
            <el-input v-model="addform.agent_name"></el-input>
          </el-form-item>-->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取消</el-button>
          <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
      </el-dialog>
      <!-- 新增分销商 -->
      <!-- 详情 -->
      <detail ref="detailModal" :datatypes="searchForm.type" v-if="detailVisible" />
    </el-card>
  </div>
</template>

<script>
import detail from "../detail";
import { mapState, mapActions } from "vuex";

export default {
  props: ["pageType"],
  components: { detail },
  data() {
    return {
      titleName: "",

      editId: "",
      searchForm: {
        type: "2",
        pageIndex: 1,
        pageSize: 10,
        level_id: "",
        keywords: "",
        totalPage: 0
      },
      levelList: [],
      tableData: [],

      visible: false,
      addVisible: false,
      detailVisible: false,
      addform: {
        agent_phone: "",
        agent_name: ""
      },
      editLevel: "",
      targetLevel: "",

      start_time: "",
      end_time: "",

      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  created() {
    if (this.pageType) {
      this.searchForm.type = this.pageType;
      if (this.pageType == 2) {
        this.titleName = "分销商";
      } else if (this.pageType == 3) {
        this.titleName = "代理商";
      } else if (this.pageType == 4) {
        this.titleName = "合伙人";
      }
    }
    this.getDataList();
    this.getLevellist();
  },
  methods: {
    getLevellist() {
      this.$http({
        url: this.$http.adornUrl("/market/agent_set/get_users_level_List"),
        method: "post",
        data: this.$http.adornData({
          type: this.searchForm.type
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
        data: this.$http.adornData(this.searchForm)
      })
        .then(data => {
          this.dataListLoading = false;
          if (data.code == 200) {
            this.tableData = data.data.list;
            this.searchForm.totalPage = data.data.total;
          } else {
            this.tableData = [];
            this.searchForm.totalPage = 0;
          }
        })
        .catch(() => {
          this.dataListLoading = false;
          this.$message.error("服务器错误，请联系管理员");
        });
    },
    dataFormSubmit() {
      this.$http({
        url: this.$http.adornUrl("/market/agent/edit_agent_info"),
        method: "post",
        data: this.$http.adornData(this.addform)
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
      this.searchForm.pageSize = val;
      this.searchForm.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    handleCurrentChange(val) {
      this.searchForm.pageIndex = val;
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