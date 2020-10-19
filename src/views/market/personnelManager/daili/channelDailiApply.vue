<template>
  <div class="yun-edit">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append">查询</el-button>
        </el-input>
      </el-form-item>
      <br />
      <el-button
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
      >批量拒绝</el-button>
    </el-form>
    <div class="components-edit">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        v-loading="dataListLoading"
        @selection-change="selectionChangeHandle"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="用户名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" label="申请时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="buy_number" label="商品购买数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="total_price" label="购买总金额" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini">详情</el-button>
            <el-button size="mini">等级修改</el-button>
            <el-button size="mini" @click="editPriceF(scope.row)">{{$t('commons.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <el-dialog top="0" title="修改" :close-on-click-modal="false" :visible.sync="visible">
      <el-input v-model="editPrice" placeholder="请输入"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{ $t('commons.cancel') }}</el-button>
        <el-button type="primary" @click="dataFormSubmit()"{{ $t('commons.confirm') }}/el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input3: "",
      editId: "",
      tableData: [],
      categoryid: "",
      visible: false,
      editPrice: "",
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
  },
  methods: {
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/market/agent/get_apply_list"),
        method: "post",
        data: this.$http.adornData({
          type: "3",
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
            message: this.$t('commons.request_success'),
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
      this.editId = row.id;
      this.editPrice = row.use_price;
      this.visible = true;
    },
    toAdd() {
      // this.$router.push("/@/page/nav6/tab3");
    },

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
          id ? this.$t('commons.delete_single') : this.$t('commons.delete_batch'),
        this.$t('commons.tip_desc'),
        {
          confirmButtonText: this.$t('commons.confirm'),
          cancelButtonText: this.$t('commons.cancel'),
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
                message: this.$t('commons.request_success'),
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
