<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-15 21:11:07
 * @FilePath: \jiudian\src\views\market\reception\reporting\c2.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking flex_column">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small">
        <el-form-item :label="$t('desk.serve_businessHours')">
          <el-date-picker
            v-model="searchForm.startTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 140px"
            :placeholder="$t('desk.serve_chooseDate')"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getDataList">{{
            $t("commons.queryBtn")
          }}</el-button>
          <el-button type="primary" @click="initForm">{{
            $t("commons.resetBtn")
          }}</el-button>
          <el-button type="primary">{{ $t("commons.exportBtn") }}</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据 -->
      <h3 style="text-align: center">{{ $t("desk.serve_tableDetail") }}</h3>
      <el-row style="font-size: 12px; color: #666; margin-bottom: 10px"
        >{{ $t("desk.serve_businessHours") + ":" }}2020-04-26 00:00:0
        {{ $t("desk.serve_to") }} 2020-04-26 23:59:9</el-row
      >
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        @selection-change="handleSelectionChange"
        height="100%"
        header-row-class-name="default"
        size="small"
      >
        <el-table-column
          prop="enterStatus"
          :label="$t('desk.serve_business')"
        ></el-table-column>
        <el-table-column
          prop="enterName"
          :label="$t('desk.serve_todayHeppen')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('desk.serve_monthCumulative')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="enterStatus"
          :label="$t('desk.serve_nextMonth')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="enterStatus"
          :label="$t('desk.serve_nextYear')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="enterStatus"
          :label="$t('desk.serve_nowYear')"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <!--分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        :page-size="searchForm.pageSize"
        layout="  prev, pager, next, jumper"
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
      loading: false,
      showEdit: false,
      showDetail: false,
      searchForm: {
        searchType: 1,
        content: "",
        enterStatus: "",
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        startTime: "", //考试时件
        endTime: "", //结束时间
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
    };
  },

  mounted() {
    // this.initForm();
  },
  methods: {
    initForm() {
      this.searchForm = {
        searchType: 1,
        content: "",
        enterStatus: "",
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        startTime: "", //考试时件
        endTime: "", //结束时间
      };
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      this.searchForm.token = this.token;
      this.searchForm.plat_source = this.plat_source;
      this.searchForm.userId = this.userId;
      console.log(JSON.stringify(this.searchForm));
      this.loading = true;
      enterprise_list(this.searchForm).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.tableData = res.data;
          this.listTotal = res.data.total;
        }
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
    // handleSizeChange(val) {
    //     this.searchForm.page_num = val;
    //     this.searchForm.page = 1;
    //     this.getDataList();
    // },
    /**当前页 */
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.getDataList();
    },
  },
};
</script>
