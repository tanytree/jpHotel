<!--  前台部 > 客户管理 > 会员管理 > 积分查询  -->
<template>
  <!-- 统一的列表格式 -->
  <div>
    <el-card>
      <!-- 查询部分 -->
      <el-form inline size="small" label-width="80px">
        <el-form-item label="消费时间">
          <el-radio-group v-model="searchForm.timeType">
            <el-radio-button label="" style="margin-right:10px">不限</el-radio-button>
            <el-radio-button label="1" style="margin-right:10px">今日</el-radio-button>
            <el-radio-button label="2" style="margin-right:10px">昨日</el-radio-button>
            <el-radio-button label="6" style="margin-right:10px">本周</el-radio-button>
            <el-radio-button label="5" style="margin-right:10px">本月</el-radio-button>
            <el-radio-button label="自定义" style="margin-right:10px">自定义</el-radio-button>
          </el-radio-group>
          <el-form-item v-if="searchForm.timeType==6">
            <el-date-picker
              v-model="searchForm.startTime"
              value-format="yyyy-MM-dd"
              type="date"
              style="width:140px"
              placeholder="选择日期"
            ></el-date-picker>
            <span style="margin:0 5px">至</span>
            <el-date-picker
              v-model="searchForm.endTime"
              value-format="yyyy-MM-dd"
              type="date"
              style="width:140px"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <br />
        <el-form-item label="发生门店">
          <el-select v-model="searchForm.storesNum" class="width150">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item,index) in storeList"
              :key="index"
              :label="item.storesName"
              :value="item.storesNum"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作类型">
          <el-select v-model="searchForm.enterStatus" class="width150">
            <el-option label="全部" value="3">全部</el-option>
            <el-option label="增加" value="1"></el-option>
            <el-option label="扣除" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员类型">
          <el-select v-model="searchForm.memberTypeId" class="width150">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="item in smembertypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.content" class="width150"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="卡号">
          <el-input v-model="searchForm.content" class="width150"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.content" class="width150"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList">查询</el-button>
          <el-button type="primary" @click="initForm">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain>读会员卡</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据 -->
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        size="mini"
      >
        <el-table-column prop="enterName" label="卡号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="memberTypeName" label="会员类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mobile" label="手机号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="enterType" label="增加" show-overflow-tooltip></el-table-column>
        <el-table-column prop="enterType" label="扣除" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="发生日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="storesName" label="发生门店" show-overflow-tooltip></el-table-column>
        <el-table-column prop="creatorName" label="操作员" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
      </el-table>
      <div style="margin-top:10px"></div>
      <!--分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="searchForm.page_num"
        layout=" total,sizes, prev, pager, next, jumper"
        :total="listTotal"
      ></el-pagination>
    </el-card>
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
      smembertypeList: [],
      pageIndex: 1, //当前页
      pageSize: 10, //页数
      smembertypeList: [],
      storeList: null,
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
      this.searchForm = {};
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
