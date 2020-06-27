<!--
 * @Date: 2020-03-20 19:11:04
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-16 15:01:19
 * @FilePath: /cloudAdmin/src/views/finance/account/billjf.vue
 -->
<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/account' }">村积分</el-breadcrumb-item>
          <el-breadcrumb-item>村积分账单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form inline size="small">
        <el-form-item label="交易时间">
          <el-date-picker
            v-model="form.start_time"
            value-format="yyyy-MM-dd"
            type="date"
            style="width:140px"
            placeholder="选择日期"
          ></el-date-picker>
          <span style="margin:0 5px">-</span>
          <el-date-picker
            v-model="form.end_time"
            value-format="yyyy-MM-dd"
            type="date"
            style="width:140px"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList">查询</el-button>
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
        :data="tableList"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        size="mini"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="交易分类">
          <template slot-scope="{row}">{{row.consume_type==1?'支出':'收入'}}</template>
        </el-table-column>
        <el-table-column prop="title" label="产品说明"></el-table-column>
        <el-table-column prop="create_time" label="交易时间"></el-table-column>
        <!-- <el-table-column prop="money_type" label="交易类型"></el-table-column> -->
        <el-table-column label="金额">
          <template slot-scope="{row}">{{row.consume_type==1?'-':'+'}} {{row.money}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="text" size="mini" @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px"></div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.page"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="form.page_num"
        layout=" sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { get_consume_list, del_consume_info } from "@/utils/api/finance";

export default {
  data() {
    return {
      tableList: [],
      multipleSelection: [], //多选
      total: 0,
      form: {
        money_type: 1,
        start_time: "",
        end_time: "",
        page: 1,
        page_num: 10
      }
    };
  },
  created() {
    console.log(this.$route)
    this.getDataList();
  },
  methods: {
    getDataList() {
      get_consume_list(this.form).then(res => {
        if (res.code == 200) {
          this.tableList = res.data.list;
          this.total = res.data.total;
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
          del_consume_info({ id: ids })
            .then(data => {
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
            })
            .catch(() => {
              this.$message.error("系统错误");
            });
        })
        .catch(() => {
          // this.$message.error("系统错误");
        });
    },
    /**多选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**每页数 */
    handleSizeChange(val) {
      this.form.page_num = val;
      this.form.page = 1;
      this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.form.page = val;
      this.getDataList();
    }
  }
};
</script>

<style>
</style>
