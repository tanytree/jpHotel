<!--  前台部 > 客户管理 > 会员管理 > 积分查询  -->
<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking flex_column">
      <!-- 查询部分 -->
      <el-form
        class="term"
        inline
        size="small"
        label-width="80px"
        v-model="searchForm"
      >
        <el-form-item :label="$t('desk.customer_spendTime') + ':'">
          <el-radio-group v-model="searchForm.timeType">
            <el-radio-button label style="margin-right: 10px">{{
              $t("desk.home_noLimit")
            }}</el-radio-button>
            <el-radio-button label="1" style="margin-right: 10px">{{
              $t("desk.customer_today")
            }}</el-radio-button>
            <el-radio-button label="2" style="margin-right: 10px">{{
              $t("desk.customer_yesterday")
            }}</el-radio-button>
            <el-radio-button label="6" style="margin-right: 10px">{{
              $t("desk.customer_thisWeek")
            }}</el-radio-button>
            <el-radio-button label="5" style="margin-right: 10px">{{
              $t("desk.customer_thisMonth")
            }}</el-radio-button>
            <el-radio-button label="defined" style="margin-right: 10px">{{
              $t("desk.book_theCustom")
            }}</el-radio-button>
          </el-radio-group>
          <el-form-item v-if="searchForm.timeType == 'defined'">
            <el-date-picker
              v-model="searchForm.startTime"
              value-format="yyyy-MM-dd"
              type="date"
              style="width: 140px"
              :placeholder="$t('desk.serve_chooseDate')"
            ></el-date-picker>
            <span style="margin: 0 5px"> {{ $t("desk.serve_to") }} </span>
            <el-date-picker
              v-model="searchForm.endTime"
              value-format="yyyy-MM-dd"
              type="date"
              style="width: 140px"
              :placeholder="$t('desk.serve_chooseDate')"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <br />
        <el-form-item :label="$t('desk.customer_occurrenceStore') + ':'">
          <el-select v-model="searchForm.storesNum" class="width150">
            <el-option :label="$t('desk.home_all')" value></el-option>
            <el-option
              v-for="(item, index) in storeList"
              :key="index"
              :label="item.storesName"
              :value="item.storesNum"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_operationType') + ':'">
          <el-select v-model="searchForm.consumeType" class="width150">
            <el-option :label="$t('desk.home_all')" value></el-option>
            <el-option
              :label="$t('desk.customer_increase')"
              value="2"
            ></el-option>
            <el-option
              :label="$t('desk.customer_deduct')"
              value="1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_memType') + ':'">
          <el-select v-model="searchForm.memberTypeId" class="width150">
            <el-option :label="$t('desk.home_all')" value></el-option>
            <el-option
              v-for="item in smembertypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.home_phoneNum')">
          <el-input v-model="searchForm.mobile" class="width150"></el-input>
        </el-form-item>
        <br />
        <el-form-item :label="$t('desk.customer_cardNum') + ':'">
          <el-input v-model="searchForm.memberCard" class="width150"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_name') + ':'">
          <el-input v-model="searchForm.name" class="width150"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">{{
            $t("commons.queryBtn")
          }}</el-button>
          <el-button type="primary" class="submit" @click="initForm">{{
            $t("commons.resetBtn")
          }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain>{{ $t("desk.customer_readMemCard") }}</el-button>
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
          prop="memberCard"
          :label="$t('desk.customer_cardNum')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="name"
          :label="$t('desk.home_name')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="memberTypeName"
          :label="$t('desk.customer_memType')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          :label="$t('desk.home_phoneNum')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :label="$t('desk.customer_increase')"
          show-overflow-tooltip
          width="80px"
        >
          <template slot-scope="{ row }">
            <div v-if="row.consumeType == 2">{{ row.scores }}</div>
            <div v-else>0</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('desk.customer_deduct')"
          show-overflow-tooltip
          width="80px"
        >
          <template slot-scope="{ row }">
            <div v-if="row.consumeType == 1">{{ row.scores }}</div>
            <div v-else>0</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('desk.customer_inTheDate')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="storesName"
          :label="$t('desk.customer_occurrenceStore')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="creatorName"
          :label="$t('desk.customer_operator')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="remark"
          :label="$t('desk.home_note')"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div style="margin-top: 10px"></div>
      <!--分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        :page-size="searchForm.page_num"
        layout=" total,sizes, prev, pager, next, jumper"
        :total="listTotal"
      ></el-pagination>
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
      smembertypeList: [],
      storeList: null,
      loading: false,
      showEdit: false,
      showDetail: false,
      searchForm: {
        name: "",
        memberCard: "",
        mobile: "",
        memberTypeId: "",
        consumeType: "",
        storesNum: "",
        timeType: "",
        startTime: "",
        endTime: "",
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
    };
  },

  mounted() {
    this.getStoreList();
    this.$F.commons.fetchMemberTypeList({}, (res) => {
      this.smembertypeList = res.list;
    });
    this.getDataList();
  },
  methods: {
    //请求门店列表
    getStoreList() {
      this.$F.doRequest(this, "/pms/freeuser/stores_list", {}, (data) => {
        this.storeList = data;
      });
    },
    initForm() {
      this.searchForm = {
        name: "",
        memberCard: "",
        mobile: "",
        memberTypeId: "",
        consumeType: "",
        storesNum: "",
        timeType: "",
        startTime: "",
        endTime: "",
      };
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
      if (params.timeType == "defined") delete params["timeType"];
      this.$F.doRequest(this, "/pms/hotelmemberscore/list", params, (data) => {
        console.log(data);
        this.tableData = data.list;
        this.listTotal = data.page.count;
      });
    },
    /**编辑 */
    editRowItem(row) {
      // 加载组件
      this.showEdit = true;
      //   组件加载完成调用组件内initdata 方法
      this.$nextTick(() => {
        //   可能没有详情接口的直接传row显示
        this.refs.editRef.initdata(row.id);
      });
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
