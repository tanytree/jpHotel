<template>
  <div class="yun-edit">
    <el-form :inline="true" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append">查询</el-button>
        </el-input>
      </el-form-item>
      <br />
      <!-- <el-button
        :disabled="dataListSelections.length <= 0"
        type="primary"
        plain
        size="mini"
        @click="toAdd"
      >批量同意</el-button>
      <el-button
        :disabled="dataListSelections.length <= 0"
        type="danger"
        plain
        size="mini"
        @click="toAdd"
      >批量拒绝</el-button>-->
    </el-form>
    <div style="margin-top:15px"></div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      size="mini"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="用户名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="create_time" label="申请时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buy_number" label="商品购买数量" show-overflow-tooltip></el-table-column>
      <el-table-column prop="total_price" label="购买总金额" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="getDetail(scope.row)">详情</el-button>
          <el-button size="mini" type="text" @click="agreeApply(scope.row,2)">同意</el-button>
          <el-button size="mini" type="text" @click="status(scope.row,3)">拒绝</el-button>
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
    <el-dialog title="修改" :close-on-click-modal="false" :visible.sync="visible">
      <el-input v-model="editPrice" placeholder="请输入"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="详情" :close-on-click-modal="false" :visible.sync="detailVisible">
      <el-form size="small" label-width="80px">
        <el-form-item label="用户类型">{{detailInfo.users_type==1?"个人":"公司"}}</el-form-item>
        <el-form-item label="用户名">{{detailInfo.name}}</el-form-item>

        <el-form-item label="电话">{{detailInfo.phone_number}}</el-form-item>
        <el-form-item label="消费金额">{{detailInfo.total_price}}</el-form-item>
        <el-form-item label="消费单数">{{detailInfo.buy_number}}</el-form-item>
        <el-form-item v-if="pageType==1" label="等级">{{detailInfo.menmber_level_name}}</el-form-item>
        <el-form-item v-if="pageType==2" label="等级">{{detailInfo.fen_level_name}}</el-form-item>
        <el-form-item v-if="pageType==3" label="等级">{{detailInfo.agent_level_name}}</el-form-item>
        <el-form-item v-if="pageType==4" label="等级">{{detailInfo.partner_level_name}}</el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { edit_apply_agree } from "@/utils/api/market";
export default {
  props: {
    pageType: {
      default: "2"
    }
  },
  data() {
    return {
      input3: "",
      editId: "",
      tableData: [],
      categoryid: "",
      visible: false,
      detailVisible: false,
      editPrice: "",
      start_time: "",
      end_time: "",
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      detailInfo: {}
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/market/agent/get_apply_list"),
        method: "post",
        data: this.$http.adornData({
          type: this.pageType,
          page: this.pageIndex,
          page_num: this.pageSize,
          start_time: this.start_time,
          end_time: this.end_time,
          categoryid: this.categoryid
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
        if (data && data.data.code == 200) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.getDataList();
            }
          });
        } else {
          this.$message.error(data.data.message);
        }
      });
    },
    editPriceF(row) {
      // this.editId = row.id;
      // this.editPrice = row.use_price;
      // this.visible = true;
      this.$message.error("暂无接口");
    },
    /**获取详情 */
    getDetail(row) {
      this.$http({
        url: this.$http.adornUrl("/market/agent/get_apply_info"),
        method: "post",
        data: this.$http.adornData({
          id: row.id
        })
      }).then(res => {
        if (res.code == 200) {
          this.detailInfo = res.data;
          this.detailVisible = true;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    /**同意申请 */
    agreeApply(row,status) {
      // this.$message.error("暂无接口");
      edit_apply_agree({ id: row.id, status: status }).then(res => {
        if (res.code == 200) {
          this.getDataList();
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    
    toAdd() {
      this.$router.push("/@/page/nav6/tab3");
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
            url: this.$http.adornUrl("/sys/role/delete"),
            method: "post",
            data: this.$http.adornData(ids, false)
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
.yun-edit {
  padding: 10px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  .dateBox {
    width: 140px;
  }
  .goodsImg {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }

  .components-edit {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    flex: 1;
    .block {
      padding: 10px 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .page-all {
        font-size: 12px;
        color: #666666;
        letter-spacing: 2px;
      }
    }
  }
}
</style>