<!--
 * @Date: 2020-01-14 20:07:10
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-23 14:53:30
 * @FilePath: /cloudAdmin/src/views/purchase/list/index.vue
 -->


<template>
  <div>
    <el-card>
      <el-form inline size="small">
        <el-form-item>
          <el-input placeholder="请输入合同名称" v-model="searchForm.keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList">查询</el-button>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="addList">添加清单</el-button>
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
        <!-- <el-table-column type="index" label="序号"></el-table-column> -->
        <el-table-column prop="s_co_name" label="供应商" show-overflow-tooltip></el-table-column>
        <el-table-column prop="delivery_time" label="到货时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="number" label="采购产品数量" show-overflow-tooltip></el-table-column>

        <el-table-column prop="total_price" label="总价" show-overflow-tooltip></el-table-column>
        <el-table-column prop="co_name" label="采购方式" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.type==1?'平台采购':row.origin==2?'外来采购':"其他"}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="270px">
          <template slot-scope="{row}">
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">详情</el-button>
            <el-button type="text" size="mini">合同邀请</el-button>
            <el-button type="text" size="mini">编辑合同要素</el-button>
            <el-button type="text" size="mini">删除</el-button>
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
    <el-dialog :visible.sync="addShow" title="添加清单">
      <el-card>
        <router-link to="/onlineEnquiry" style="color:#409EFF">
          <h5>前往在线询盘</h5>
          <p>从报价中选取加入清单</p>
        </router-link>
      </el-card>
       <div style="margin-top:10px"></div>
      <el-card>
        <router-link to="/onlineProcurement" style="color:#409EFF">
          <h5>前往在线采购</h5>
          <p>从商城中选取产品加入清单</p>
        </router-link>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { get_list_list } from "@/utils/api/sale";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      company: state => state.company
    })
  },
  data() {
    return {
      addShow: false,
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
        type: 1,
        page_num: 10, //页数
        keywords: "", //关键字
        start_time: "", //考试时件
        end_time: "" //结束时间
      };
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      get_list_list(this.searchForm).then(res => {
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
    addList() {
      this.addShow = true;
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
