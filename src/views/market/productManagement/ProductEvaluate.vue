
<template>
  <div class="accountBox">
    <el-form :model="form" :inline="true" size="small" label-width="80px">
      <el-form-item label="商品名称">
        <el-input clearable v-model="form.keywords" style="width:180px" placeholder="请输入">
          <el-button slot="append" @click="searchComm">查询</el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <!-- <el-button size="small" class="pull-right defaultBtn" @click="deleteComm">删除评论</el-button> -->
    <div class="accountBtm">
      <el-table size="mini" :data="tableList" class="goods">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="商品">
          <template slot-scope="scope">
            <el-image :src="scope.row.thumb" fit="fill" class="goodImg">
              <div slot="error" class="image-slot">
                <el-image src="../images/error.png" fit="fill" />
              </div>
            </el-image>
            <span style="vertical-align: top; margin-left: 10px;">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="评价用户"></el-table-column>
        <el-table-column prop="message" label="评价内容"></el-table-column>

        <el-table-column prop="create_time" label="评价时间"></el-table-column>
        <!-- <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button
              class="accountBtn"
              size="mini"
              :class="scope.row.type ? 'black' : 'blue'"
              @click="editState(scope.row.id)"
              v-text="scope.row.type ? '隐藏' : '显示'"
            ></el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </div>
  </div>
</template>

<script>
import { get_evaluation_list } from "@/utils/api/market";
export default {
  data() {
    //商品咨询
    return {
      form: {
        keywords: "",
        categoryid: "",
        star_score: "",
        start_time: "",
        end_time: "",
        page: "",
        page_num: ""
      },
      tableList: [],

      allComm: [],
      commData: [],
      commSelect: []
    };
  },
  created() {
    this.queryComment(1);
  },
  methods: {
    //商品咨询
    queryComment: function() {
      var a = this;
      let data = {};
      this.$http({
        url: this.$http.newApi("/market/evaluation/get_evaluation_list"),
        method: "post",
        data: this.$http.adornData(this.form)
      }).then(res => {
        a.allComm = [];
        console.log(res);
        if (res.code == 200) {
          if (this.form.page > 1) {
            this.tableList = this.tableList.concat(res.data.list);
          } else {
            this.tableList = res.data.list;
          }
        } else {
          a.$message.error(res.message);
        }
      });
    },
    clearComm: function() {
      this.searchcomm = "";
      this.commData = this.allComm;
    },
    searchComm: function() {
      this.queryComment(1);
    },
    selectComChange: function(selection) {
      this.commSelect = selection;
    },
    deleteComm: function() {
      var a = this;
      if (a.commSelect.length == 0) {
        a.$message.error("请选择一条记录");
        return;
      } else {
        var ids = [];
        a.commSelect.map(item => {
          ids.push(item.id);
        });
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$http({
              url: this.$http.adornUrl("/goods/Consultation/delete"),
              method: "post",
              data: this.$http.adornData({
                "zid[]": ids
              })
            }).then(res => {
              if (res.code === 0) {
                a.$message.success("删除评论成功");
                a.queryComment(1);
              } else {
                a.$message.error(res.message);
              }
            });
          })
          .catch(() => {
            a.$message.info("已取消删除");
          });
      }
    },
    editState: function(id) {
      var a = this;
      this.$http({
        url: this.$http.adornUrl("/goods/Consultation/delete"),
        method: "post",
        data: this.$http.adornData({
          zid: id
        })
      }).then(res => {
        a.allComm = [];
        if (res.code === 0) {
          a.$message.success("更新成功");
          a.queryComment(1);
        } else {
          a.$message.error(res.message);
        }
      });
    }
  }
};
</script>

<style>
.goodImg {
  width: 40px;
  height: 41px;
}
</style>