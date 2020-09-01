<!--  前台部 > 客户管理 > 单位管理 > 账务处理  -->
<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form
        class="term demo-form-inline"
        inline
        size="small"
        v-model="searchForm"
        label-width="80px"
      >
        <el-form-item label="挂账单位">
          <el-select v-model="searchForm.enterId" class="width150">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item,index) in selectList"
              :key="index"
              :label="item.enterName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">查询</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据 -->
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        height="100%"
        header-row-class-name="default"
        size="small"
      >
        <el-table-column>
          <el-table-column prop="enterName" label="单位名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="creditLimit" label="挂账额度" show-overflow-tooltip></el-table-column>
        </el-table-column>
        <el-table-column label="未结算" align="center">
          <el-table-column label="挂账总额" width="120">
            <template slot-scope="{row}">
              <div>{{row.finance.onAccountTotal?row.finance.onAccountTotal:0}}</div>
            </template>
          </el-table-column>
          <el-table-column label="未结总额" width="120">
            <template slot-scope="{row}">
              <div>{{row.finance.noSettlementTotal?row.finance.onAccountTotal:0}}</div>
            </template>
          </el-table-column>
          <el-table-column label="挂账剩余总额" width="120">
            <template slot-scope="{row}">
              <div>{{row.creditLimit - row.finance.noSettlementTotal}}</div>
            </template>
          </el-table-column>
          <el-table-column label="预收款余额" width="120">
            <template slot-scope="{row}">
              <div>{{row.totalLimit?row.totalLimit:0}}</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="已结算" align="center">
          <el-table-column prop="createTime" label="已结算" width="80"></el-table-column>
          <el-table-column label="现金" width="80">
            <template slot-scope="{row}">
              <div v-for="(item,index) in row.finance.typeList" :key="index">
                <div v-if="item.payType==1">{{item.payPrice}}</div>
              </div>
              <div v-if="row.finance.typeList.length==0">0</div>
            </template>
          </el-table-column>
          <el-table-column label="银行卡" width="80">
            <template slot-scope="{row}">
              <div v-for="(item,index) in row.finance.typeList" :key="index">
                <div v-if="item.payType==2">{{item.payPrice}}</div>
              </div>
              <div v-if="row.finance.typeList.length==0">0</div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="预收款" width="80"></el-table-column>
          <el-table-column label="微信" width="80">
            <template slot-scope="{row}">
              <div v-for="(item,index) in row.finance.typeList" :key="index">
                <div v-if="item.payType==4">{{item.payPrice}}</div>
              </div>
              <div v-if="row.finance.typeList.length==0">0</div>
            </template>
          </el-table-column>
          <el-table-column label="支付宝" width="80">
            <template slot-scope="{row}">
              <div v-for="(item,index) in row.finance.typeList" :key="index">
                <div v-if="item.payType==3">{{item.payPrice}}</div>
              </div>
              <div v-if="row.finance.typeList.length==0">0</div>
            </template>
          </el-table-column>
          <el-table-column label="免单" width="80">
            <template slot-scope="{row}">
              <div v-for="(item,index) in row.finance.typeList" :key="index">
                <div v-if="item.payType==0">{{item.payPrice}}</div>
              </div>
              <div v-if="row.finance.typeList.length==0">0</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="{row}">
            <el-button type="text" size="mini">预收款</el-button>
            <el-button type="text" size="mini">账务结算</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="searchForm.page"
          :page-size="searchForm.page_num"
          :total="listTotal"
          layout="total, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑or详情弹窗 -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),
  },
  data() {
    return {
      pageIndex: 1, //当前页
      pageSize: 10, //页数
      loading: false,
      showEdit: false,
      showDetail: false,
      selectList: null,
      searchForm: {
        enterId: null,
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
    };
  },
  created() {
    this.getDataList();
  },

  methods: {
    /**获取表格数据 */
    getDataList(params = {}) {
      this.$F.merge(params, {
        paging: true,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.$F.merge(params, this.searchForm);
      this.$F.doRequest(
        this,
        "/pms/consume/enter_finance_deal_list",
        params,
        (data) => {
          console.log(data);
          this.tableData = data.enterList;
          this.selectList = data.enterList;
          this.listTotal = data.page.count;
        }
      );
    },

    handelRowItem(row) {
      // 加载组件
      this.showDetail = true;
      //   组件加载完成调用组件内initdata 方法
      this.$nextTick(() => {
        //   可能没有详情接口的直接传row显示
        this.refs.detailRef.initdata(row.id);
      });
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
    },
  },
};
</script>
