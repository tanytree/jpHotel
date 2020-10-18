<template>
  <div class="sec1">
    <el-card>
      <el-form size="mini" :inline="true" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" style="width:180px" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList">查询</el-button>
          <!-- <el-button>重置</el-button> -->
        </el-form-item>
      </el-form>
      <el-button
        style="margin:10px 0;width:100px"
        @click="importPrice"
        size="small"
        :disabled="dataListSelections.length <= 0"
      >导入价格</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        size="mini"
        v-loading="dataListLoading"
        @selection-change="selectionChangeHandle"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品" show-overflow-tooltip width="180">
          <template slot-scope="scope">
            <img :src="scope.row.thumb" class="goodsImg" />
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="old_price" label="零售价" show-overflow-tooltip></el-table-column>
        <el-table-column prop="partner_price" label="代理价" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price" label="一口价" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cost_price" label="成本价" show-overflow-tooltip></el-table-column>
        <el-table-column prop="use_num" label="cost_price" show-overflow-tooltip></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="addOrUpdateHandle(scope.row.id)">编辑产品</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
      <priceEdit v-if="priceEditvsible" ref="priceEdit" @refreshDataList="getDataList" />
      <priceImport v-if="priceImportisible" ref="priceExportImport" @refreshDataList="getDataList" />
    </el-card>
  </div>
</template>

<script>
import priceEdit from "./priceEdit";
import priceImport from "./priceImport";
export default {
  components: { priceImport, priceEdit },
  data() {
    return {
      priceImportisible: false,
      priceEditvsible: false,

      showTop: false,
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      uploadMeg: "",
      uploadDone: false,
      uploadSuccess: false,
      form: {
        status: "",
        saleMax: "",
        saleMin: "",
        name: "",
        region: "",
        small_num: "",
        big_num: ""
      }
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    // 导入文件
    importPrice() {
      this.priceImportisible = true;
      this.$nextTick(() => {
        this.$refs.priceExportImport.init(this.dataListSelections);
      });
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.priceEditvsible = true;
      this.$nextTick(() => {
        this.$refs.priceEdit.init(id);
      });
    },

    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/market/goods/get_goods_list"),
        method: "post",
        data: this.$http.adornData({
          page: this.pageIndex,
          page_num: this.pageSize
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

    // 查询
    onSubmit() {
      console.log("submit!");
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

    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.roleId;
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
            if (data && data.code ==200) {
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
.goodsImg {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.top-close {
  display: flex;
  align-items: center;
  float: right;
  cursor: pointer;
  padding-right: 10px;
  padding-top: 20px;
}
.top-body {
  background-color: #f2f2f2;
  padding: 2px 10px;
}
</style>
