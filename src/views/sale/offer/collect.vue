<!--
 * @Date: 2020-03-23 10:29:03
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-24 17:08:24
 * @FilePath: /cloudAdmin/src/views/sale/offer/collect.vue
 -->


<template>
  <div>
    <el-card>
      <el-form inline size="small">
        <el-form-item>
          <el-input v-model="searchForm.keyword" placeholder="请输入姓名/联系电话"></el-input>
        </el-form-item>
        <el-form-item label="报价日期">
          <el-date-picker
            v-model="searchForm.start_time"
            value-format="yyyy-MM-dd"
            type="date"
            style="width:140px"
            placeholder="选择日期"
          ></el-date-picker>
          <span style="margin:0 5px">-</span>
          <el-date-picker
            v-model="searchForm.end_time"
            value-format="yyyy-MM-dd"
            type="date"
            style="width:140px"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList">查询</el-button>
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
        size="mini"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="co_name" label="采购方" show-overflow-tooltip></el-table-column>
        <el-table-column prop="end_time" label="截止时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="联系人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone	" label="联系电话" show-overflow-tooltip></el-table-column>
        <el-table-column prop="co_province" label="区域" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" label="收藏日期" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="{row}">
            <el-button type="text" size="mini">详情</el-button>
            <el-button type="text" size="mini">立即报价</el-button>
            <el-button type="text" size="mini" @click="deleteHandle(row.id)">{{$t('commons.delete')}}</el-button>
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
import { get_collect_list, del_collect_info } from "@/utils/api/sale";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
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
        is_list: "2",
        page_num: 10, //页数
        keywords: "", //关键字
        start_time: "", //考试时件
        end_time: "" //结束时间
      };
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      get_collect_list(this.searchForm).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.listTotal = res.data.total;
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
          id ? this.$t('commons.delete_single') : this.$t('commons.delete_batch'),
        this.$t('commons.tip_desc'),
        {
          confirmButtonText: this.$t('commons.confirm'),
          cancelButtonText: this.$t('commons.cancel'),
          type: "warning"
        }
      )
        .then(() => {
          del_collect_info({ id: ids }).then(data => {
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
