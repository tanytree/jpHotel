/* * @Author: Dana  * @fileName: 广告管理  *@Date: 2020-03-11 14:05:31  * @Last Modified by:   Dana  * @Last Modified time: 2020-03-11 14:05:31  */


<template>
  <div class="yun-edit">
    <el-form :inline="true" size="small" :model="form" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="form.type" placeholder="分销等级">
          <el-option label="投放状态" value></el-option>
          <el-option label="进行中" value="1"></el-option>
          <el-option label="已结束" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.price_type" placeholder="计费方式">
          <el-option label="计费方式" value></el-option>
          <el-option label="时长" value="1"></el-option>
          <el-option label="次数" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-button size="small" type="primary" @click="getDataList">查询</el-button>
      <!-- <el-button size="small" style="float:right" type="primary" @click="toAdd">投放广告</el-button> -->
    </el-form>
    <div class="components-edit">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
         :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        size="small"
        v-loading="dataListLoading"
      >
        <el-table-column prop="group_name" label="村名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="group_popularity_count" label="人气指数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price_type" label="计费方式" show-overflow-tooltip></el-table-column>
        <el-table-column prop="title" label="投放主题" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="投放状态">
          <template slot-scope="{row}">
            <span v-if="row.status==1">进行中</span>
            <span v-if="row.status==2">已结束</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="getDetail(scope.row)">详情</el-button>
            <!-- <el-button type="text" size="mini">统计</el-button> -->
            <el-button
              v-if="scope.row.status==2"
              type="text"
              size="mini"
              @click="cancelAdver(scope.row)"
            >继续投放</el-button>
            <el-button v-if="scope.row.status==1" type="text" size="mini">取消投放</el-button>
            <el-button
              v-if="scope.row.status==2"
              type="text"
              size="mini"
              @click="editPriceF(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="form.page_num"
          :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <el-dialog title="投放详情" :close-on-click-modal="false" :visible.sync="visible">
      <el-form size="small" label-width="110px" :model="detail" class="demo-form-inline">
        <el-form-item label="投放主体">{{detail.title}}</el-form-item>
        <el-form-item label="广告连接">{{detail.link_url}}</el-form-item>
        <el-form-item label="广告图">
          <img style="width:40px;height:40px" :src="detail.image_url" alt />
        </el-form-item>
        <el-form-item label="广告位">{{detail.position}}</el-form-item>
        <el-form-item label="付费方式">{{detail.price_type==1?"时长":"次数"}}</el-form-item>
        <el-form-item label="投放时间">{{detail.number}}</el-form-item>
        <el-form-item label="已消耗积分">{{detail.total_price}}</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  get_advert_list,
  get_advert_info,
  cancel_advert_info
} from "@/utils/api/market";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        page: 1,
        page_num: 10,
        keywords: "",
        status: "", //1 投放车 2 已投放 3 继续投放
        type: "", //1 进行中 2 已结束
        price_type: "" //1 时长 2 次数
      },
      detail: {},
      input3: "",
      editId: "",
      tableData: [],
      categoryid: "",
      visible: false,
      editPrice: "",
      start_time: "",
      end_time: "",
      pageIndex: 1,
      page_num: 10,
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
      get_advert_list(this.form)
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
    getDetail(item) {
      get_advert_info({ id: item.id }).then(res => {
        if (res.code == 200) {
          this.detail = res.data;
          this.visible = true;
        }
      });
    },
    cancelAdver(item) {
      cancel_advert_info({ id: item.id }).then(res => {
        if (res.code == 200) {
          this.getDataList();
        }
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
      this.editId = row.id;
      this.editPrice = row.use_price;
      this.visible = true;
    },
    toAdd() {
      this.$router.push("/@/page/nav6/tab3");
    },

    // 每页数
    handleSizeChange(val) {
      this.form.page_num = val;
      this.form.page = 1;
      this.getDataList();
    },
    // 当前页
    handleCurrentChange(val) {
      this.form.page = val;
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
            if (data && data.code ==200) {
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
