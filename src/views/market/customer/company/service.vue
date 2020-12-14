<!--  前台部 > 客户管理 > 单位管理 > 账务查询     -->
<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small" label-width="80px" v-model="searchForm">

        <el-form-item :label="$t('desk.customer_buyerUnit')+':'">
          <el-select v-model="searchForm.enterId" class="width150" :placeholder="$t('commons.placeChoose')">
            <el-option :label="$t('commons.all')" value=""></el-option>
            <el-option v-for="(item, index) in unitList" :key="index" :label="item.enterName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_settlementStatus')+':'">
          <el-select v-model="searchForm.state" class="width150">
            <el-option :label="$t('commons.all')" value=""></el-option>
            <el-option :label="$t('desk.customer_closeAccount')" value="2"></el-option>
            <el-option :label="$t('desk.customer_outStand')" value="1"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item :label="$t('desk.home_consumerNames')+':'">
          <el-input v-model="searchForm.name" class="width150"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_constDate')+':'">
          <el-date-picker
            v-model="searchForm.startTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 140px"
            :placeholder="$t('desk.serve_chooseDate')"
          ></el-date-picker>
          <span style="margin: 0 5px">-</span>
          <el-date-picker
            v-model="searchForm.endTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 140px"
            :placeholder="$t('desk.serve_chooseDate')"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="onSubmit">{{ $t("commons.queryBtn") }}</el-button>
          <el-button type="primary" class="grey" @click="resetForm">{{ $t("commons.resetBtn") }}</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据 -->
      <el-table ref="multipleTable" v-loading="loading" :data="tableData" height="100%" header-row-class-name="default" size="small">
        <el-table-column prop="createTime" :label="$t('desk.customer_spendTime')" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="creditName"
          :label="$t('desk.customer_buyerUnit')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :label="$t('desk.customer_amountPrice')"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            {{row.onAccountTotal || row.consumePrice || 0}}
          </template>
        </el-table-column>
        <el-table-column
          prop="checkInPerson.checkIn.name"
          :label="$t('desk.home_consumerNames')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="checkinId"
          :label="$t('desk.customer_originOrderNum')"
          show-overflow-tooltip
          width="300"
        ></el-table-column>
        <el-table-column
          :label="$t('desk.customer_roomKind')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div v-if="row.checkInPerson">
              {{ row.checkInPerson.houseName }}/{{ row.checkInPerson.houseNum }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="checkInPerson.checkIn.checkinTime"
          :label="$t('desk.order_checkinDate')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="checkInPerson.checkIn.checkoutTime"
          :label="$t('desk.customer_checkoutTime')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :label="$t('desk.customer_settlementStatus')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div v-if="row.state == 1">{{ $t("desk.customer_outStand") }}</div>
            <div v-if="row.state == 2">
              {{ $t("desk.customer_closeAccount") }}
            </div>
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
      unitList: null,
      storeList: null,
      pageIndex: 1, //当前页
      pageSize: 10, //页数
      loading: false,
      showEdit: false,
      showDetail: false,
      searchForm: {
        // storesNum: "",
        enterId: "",
        state: "",
        startTime: "", //考试时件
        endTime: "", //结束时间
        name: "",

      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
    };
  },

  created() {
    this.getDataList();
    this.getStoreList();
    this.getUnitList();
  },
  methods: {
    //请求 单位 列表
    getUnitList() {
      this.$F.doRequest(this, "/pms/hotelenter/list", {}, (res) => {
        this.unitList = res.list;
        console.log(this.unitList);
      });
    },
    //请求门店列表
    getStoreList() {
      this.$F.doRequest(this, "/pms/freeuser/stores_list", {}, (data) => {
        this.storeList = data;
      });
    },
    // 查询按钮
    onSubmit() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 重置
    resetForm() {
      this.searchForm = {
        storesNum: "",
        enterId: "",
        state: "",
        startTime: "", //考试时件
        endTime: "", //结束时间
        name: "",
      };
      this.pageIndex = 1;
      this.getDataList();
    },
    //请求 账务列表 接口
    getDataList(params = {}) {
      this.$F.merge(params, {
        paging: true,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.$F.merge(params, this.searchForm);
      this.$F.doRequest(
        this,
        "/pms/consume/enter_finance_order_list",
        params,
        (data) => {
          console.log(data);
          this.tableData = data.enterOrderLogList;
          this.listTotal = data.page.count;
        }
      );
    },

    /**每页数 */
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.pageSize = 10;
      this.getDataList();
    },
  },
};
</script>
