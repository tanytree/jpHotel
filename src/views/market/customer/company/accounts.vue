<!--  前台部 > 客户管理 > 单位管理 > 入账管理   -->
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
        <el-form-item :label="$t('desk.customer_unitName')">
          <el-select v-model="searchForm.enterName" class="width150">
            <el-option :label="$t('commons.all')" value=""></el-option>
            <el-option
              v-for="(item, index) in unitList"
              :key="index"
              :label="item.enterName"
              :value="item.enterName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_billState')">
          <el-select v-model="searchForm.intoStatus" class="width150">
            <el-option :label="$t('commons.all')" value=""></el-option>
            <el-option label="已结" value="3"></el-option
            ><el-option label="未结" value="1"></el-option
            ><el-option label="部分结账" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">{{
            $t("commons.queryBtn")
          }}</el-button>
          <el-button type="primary" class="grey" @click="initForm">{{
            $t("commons.resetBtn")
          }}</el-button>
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
        <el-table-column
          prop="enterName"
          :label="$t('desk.customer_unitName')"
          show-overflow-tooltip
          width="100px"
        ></el-table-column>
        <el-table-column
          :label="$t('desk.customer_arage')"
          show-overflow-tooltip
          width="120px"
        >
          <template slot-scope="{ row }">
            <div><span style="color: #F11717">开</span>{{ row.startTime }}</div>
            <div><span style="color: #1A3BF1">结</span>{{ row.endTime }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="requestNum"
          :label="$t('desk.customer_paragraphNum')"
          width="150"
        >
        </el-table-column>
        <el-table-column
          :label="$t('desk.customer_areadyPrice')"
          prop="requestPrice"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="intoPrice"
          :label="$t('desk.customer_areadyBookPrice')"
          width="100"
        >
        </el-table-column>
        <el-table-column
          :label="$t('desk.customer_waiteBookPrice')"
          width="100"
        >
          <template slot-scope="{ row }">
            <div>{{ row.requestPrice - row.intoPrice }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('desk.customer_creativeTime')"
          width="160"
        >
        </el-table-column>
        <el-table-column :label="$t('desk.customer_billState')" width="80">
          <template slot-scope="{ row }">
            <div v-if="row.intoStatus == 1">未结</div>
            <div v-if="row.intoStatus == 2">部分结账</div>
            <div v-if="row.intoStatus == 3">已结</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" width="220">
          <template slot-scope="{ row }">
            <!-- 查看挂账明细 -->
            <el-button type="text" @click="advancePayments(row)" size="mini">{{
              $t("desk.customer_lookBuyDetail")
            }}</el-button>
            <!-- 入账 -->
            <el-button type="text" v-if="row.requestPrice > row.intoPrice" @click="settlement(row)" size="mini">{{
              $t("desk.enterAccount")
            }}</el-button>
            <!-- 入账记录 -->
            <el-button type="text" @click="bookRecord(row)" size="mini">{{
              $t("desk.customer_bookRecord")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-size="pageSize"
          :total="listTotal"
          layout="total, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <!-- 查看挂账明细dialog -->
    <el-dialog
      :title="$t('desk.customer_lookBuyDetail')"
      v-if="advanceDialog"
      :visible.sync="advanceDialog"
      width="900px"
      top="0"
    >
      <div class="flexBox">
        <div><span>总挂账金额：120000</span> <span>挂账记录：3条</span></div>
        <el-button type="primary">导出EXCEL</el-button>
      </div>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="buyTable"
        height="100%"
        header-row-class-name="default"
        size="small"
      >
        <el-table-column
          prop="createTime"
          :label="$t('desk.customer_spendTime')"
          show-overflow-tooltip
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="onAccountTotal"
          :label="$t('desk.customer_amountPrice')"
          width="150"
        >
        </el-table-column>
        <el-table-column
          :label="$t('desk.home_name')"
          prop="requestPrice"
          width="100"
        >
         
        </el-table-column>
        <el-table-column
          prop="intoPrice"
          :label="$t('desk.customer_originOrderNum')"
          width="100"
        >
        </el-table-column>
        <el-table-column :label="$t('desk.customer_roomKind')" width="100">
          <template slot-scope="{ row }">
            <div>{{ row.requestPrice - row.intoPrice }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('desk.order_checkinDateA')"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('desk.customer_checkoutTime')"
          width="160"
        >
        </el-table-column>
      </el-table>
      <!--分页 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-size="pageSize"
          :total="detailListTotal"
          layout="total, prev, pager, next, jumper"
        ></el-pagination>
      </div>
      <div slot="footer">
        <div class="dialog-footer">
          <el-button type="primary" @click="advanceDialog = false">{{
            $t("commons.close")
          }}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 入账记录dialog -->
    <el-dialog
      :title="$t('desk.customer_bookRecord')"
      v-if="bookDialog"
      :visible.sync="bookDialog"
      top="0"
    >
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="recordList"
        height="100%"
        header-row-class-name="default"
        size="small"
      >
        <el-table-column
          prop="creatorName"
          :label="$t('desk.home_operator')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('desk.customer_operateTime')"
        >
        </el-table-column>
        <el-table-column
          :label="$t('desk.enterAccountMoney')"
          prop="operPrice"
        >
        </el-table-column>
      </el-table>
      <div slot="footer">
        <div class="dialog-footer">
          <el-button type="primary" @click="bookDialog = false">{{
            $t("commons.close")
          }}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 入账 dialog -->
    <el-dialog
      :title="$t('desk.enterAccount')"
      v-if="settlementDialog"
      :visible.sync="settlementDialog"
      width="600px"
      top="0"
    >
      <div style="margin-left: 60px">
        <span
          >{{ $t("desk.customer_placeMoney") + ":"
          }}{{ itemInfo.requestPrice }}；</span
        >
        <span style="margin-left: 6px">
          {{ $t("desk.customer_areadyBookPrice") + ":"
          }}{{ itemInfo.intoPrice }}
        </span>
      </div>
      <el-form
        class="term demo-form-inline"
        inline
        size="small"
        v-model="enterForm"
        label-width="80px"
        :rules="enterRules"
      >
        <el-form-item :label="$t('desk.customer_billState')" prop="">
          <el-input v-model="enterForm.name"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("desk.customer_inputExpectPrice")));
      } else {
        if (value <= 0) {
          callback(new Error(this.$t("desk.customer_expectPriceShould")));
        } else {
          callback();
        }
      }
    };
    return {
      advanceRuleForm: {
        payType: "1",
        payPrice: "0",
        remark: "",
      },
      rules: {
        payPrice: [
          { validator: validatePass, trigger: "blur", required: true },
        ],
      },

      settlementDialog: false, //入账 dialog
      itemInfo: null,
      advanceDialog: false,  //查看挂账明细 dialog
      bookDialog:false,  //入账记录 dialog
      pageIndex: 1, //当前页
      pageSize: 10, //页数
      loading: false,
      unitList: null,
      searchForm: {
        enterName: "",
        intoStatus: "",
      },
      listTotal: 0, //总条数
      detailListTotal:0, //查看账务明细dialog总条数
      tableData: [], //表格数据
      buyTable: [], //挂账明细dialog表格数据
      recordList:[], // 入账记录dialog表格数据
      pageIndex: 1,
      pageSize: 10,
      enterForm: {
        //入账form表单
      },
    };
  },
  created() {
    this.getUnitList();
    this.initForm();
  },

  methods: {
    //点击重置按钮
    initForm() {
      this.searchForm = {
        enterName: "",
        intoStatus: "",
      };
      this.pageIndex = 1;
      this.pageSize = 10;
      this.getDataList();
    },
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
        "/pms/request/request_account_list",
        params,
        (data) => {
          console.log(data);
          this.tableData = data.list;
          this.listTotal = data.page.count;
        }
      );
    },
    //请求 单位 列表
    getUnitList() {
      this.$F.doRequest(this, "/pms/hotelenter/list", {}, (res) => {
        this.unitList = res.list;
        console.log(this.unitList);
      });
    },
    //点击 入账 按钮
    settlement(row) {
      this.itemInfo = row;
      console.log(this.itemInfo);
      if (this.itemInfo) {
        this.settlementDialog = true;
      }
    },
    //点击 入账记录 按钮
    bookRecord(row) {
      let params = {
        enterId: row.enterId,
        searchType: 1,
      };
      this.$F.doRequest(this, "/pms/request/request_account_log_list", params, (res) => {
        this.recordList = res.list;
        this.bookDialog = true;
      });
    },
    //预收款弹框 点击确定按钮
    advanceDialog_sure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            enterId: this.itemInfo.id,
            priceType: 1,
          };
          this.$F.merge(params, this.advanceRuleForm);
          this.$F.doRequest(
            this,
            "/pms/consume/enter_consume_oper",
            params,
            (data) => {
              this.advanceRuleForm = {
                payType: "1",
                payPrice: "0",
                remark: "",
              };
              this.advanceDialog = false;
              this.getDataList();
            }
          );
        } else {
          return false;
        }
      });
    },
    //点击 挂账明细 按钮
    advancePayments(row) {
      console.log(row);
      this.itemInfo = row;
      if (this.itemInfo) {
        let params = {
          enterId: row.enterId,
          startTime: row.startTime,
          endTime: row.endTime,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          paging: true,
        };
        this.$F.doRequest(
          this,
          "/pms/consume/enter_credit_order_list",
          params,
          (res) => {
            this.buyTable = res.consumeOrderList;
            // this.detailListTotal = res.page.count;
            this.advanceDialog = true;
          }
        );
      }
    },
    /**每页条数（即每一页要显示的数据条数） */
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    /**当前页改变（即当前页是第几页） */
    handleCurrentChange(val) {
      this.pageSize = 10;
      this.pageIndex = val;
      this.getDataList();
    },
  },
};
</script>
<style lang="less" scoped>
.dialog-footer {
  text-align: center;
}
.flexBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
