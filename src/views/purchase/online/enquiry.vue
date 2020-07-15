<!--
 * @Date: 2020-03-23 10:14:19
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-26 21:21:14
 * @FilePath: /cloudAdmin/src/views/purchase/online/enquiry.vue
 -->
<template>
  <div>
    <el-card>
      <el-form size="small" inline>
        <el-form-item>
          <el-input placeholder="请输入询盘标题">
            <el-button slot="append">查询</el-button>
          </el-input>
        </el-form-item>

        <el-form-item style="float:right">
          <el-button @click="addNewList('')">新增</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-top:10px"></div>
      <el-button
        type="danger"
        size="medium"
        @click="deleteHandle()"
        :disabled="multipleSelection.length <= 0"
      >批量删除</el-button>
      <div style="margin-top:10px"></div>
      <el-table
        size="medium"
        ref="multipleTable"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        :data="tableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="goods_kinds" label="询盘标题" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goods_time" label="询盘日期" show-overflow-tooltip sortable></el-table-column>
        <el-table-column prop="goods_people" label="截止日期" show-overflow-tooltip sortable></el-table-column>
        <el-table-column prop="goods_people" label="采购产品数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goods_price" label="报价数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goods_price" label="发布" show-overflow-tooltip>
          <template>
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small">详情</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">续期</el-button>
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
export default {
  data() {
    return {
      editIsShow:false,
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
    getDataList() {
      this.$http({
        url: this.$http.adornUrl("/purchase/enquiry/get_enquiry_list"),
        method: "post",
        data: this.$http.adornData(this.searchForm)
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.listTotal = res.data.total;
        }
      });
    },
    addNewList(id){
       this.$router.push({path:"/enquiryDetail",query:{id:id}})

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
            url: this.$http.adornUrl("/purchase/enquiry/del_enquiry_info"),
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

<style lang="less" scoped>
.membership-management {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
  > .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px 20px 0px 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .components-edit {
      display: flex;
      flex-direction: column;
      flex: 1;
      .delate-item {
        display: flex;
        align-items: center;
        margin: 15px 0px;
        .delate {
          padding: 6px 10px;
          border: 1px solid #999999;
          border-radius: 5px;
          margin-right: 10px;
        }
        > .delate-select {
          margin-left: 10px;
        }
      }
      .block {
        padding: 10px 20px;
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
    > .search {
      display: flex;
      justify-content: space-between;
      > .search-item {
        display: flex;
        .search-part {
          display: flex;
          align-items: center;
          border: 1px solid #999999;
          border-radius: 5px;
          height: 40px;
          input {
            border: none;
            border-radius: 5px;
            padding: 10px 10px;
          }
          span {
            background-color: #dfdfdf;
            height: 100%;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            width: 50px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .el-select {
            width: 120px;
          }
        }
        > .kinds {
          display: flex;
          align-items: center;
          margin-left: 20px;
          i {
            font-size: 12px;
          }
        }
      }
      > .add-item {
        display: flex;
        align-items: center;
        padding-right: 20px;
        > .add {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          width: 100px;
          color: #126eff;
          border-radius: 6px;
          border: 1px solid #126eff;
          margin-right: 20px;
        }
        .el-button--small,
        .el-button--small.is-round {
          height: 40px;
        }
      }
    }
  }
}
</style>
