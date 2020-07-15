<!--
 * @Date: 2020-03-23 10:09:38
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-24 17:48:08
 * @FilePath: /cloudAdmin/src/views/purchase/contract/waiting.vue
 -->

<template>
  <div>
    <el-card>
      <el-form inline size="small">
        <el-form-item>
          <el-input v-model="searchForm.keyword" placeholder="请输入合同名称"></el-input>
        </el-form-item>
        <el-form-item label="建立时间">
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
      <!-- <div style="padding-bottom:10px">
        <el-button
          type="danger"
          size="mini"
          @click="deleteHandle()"
          :disabled="multipleSelection.length <= 0"
        >批量删除</el-button>
      </div>-->
      <el-table
        ref="multipleTable"
        :data="tableData"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        @selection-change="handleSelectionChange"
        size="medium"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="title" label="合同名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" label="建立时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="b_rate" label="合同进度" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>甲方: {{row.b_rate}}% &nbsp; &nbsp;</span>
            <span>乙方: {{row.b_rate}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="公司名称" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>甲方: {{row.a_co_name}} &nbsp; &nbsp;</span>
            <span>乙方: {{row.b_co_name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="origin" label="来源" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.origin==1?'供应商':row.origin==2?'清单':row.origin==3?'商机客户':"询盘报价"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="text" size="mini">详情</el-button>
            <el-button type="text" size="mini">合同文本</el-button>
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
import { get_contract_list } from "@/utils/api/sale";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      company: state => state.company
    })
  },
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
        a_co_id: this.company.id,
        order_type: "2",
        page_num: 10, //页数
        keywords: "", //关键字
        start_time: "", //考试时件
        end_time: "" //结束时间
      };
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      get_contract_list(this.searchForm).then(res => {
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
        `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          deleteAction({ id: ids }).then(data => {
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


