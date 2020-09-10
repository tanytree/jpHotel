                        <!-- 前台部 > 订单管理 > 赔偿记录-->
<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form
        class="term line demo-form-inline"
        inline
        size="small"
        v-model="searchForm"
        label-width="80px"
      >
        <el-form-item label="房间号:">
          <el-input v-model="searchForm.roomNum" class="width150"></el-input>
        </el-form-item>
        <el-form-item label="客人姓名:">
          <el-input v-model="searchForm.cname" class="width150"></el-input>
        </el-form-item>
        <el-form-item label="商品类别:">
          <el-select v-model="searchForm.damageTypeId" class="width150">
            <el-option label="全部" value>全部</el-option>
            <el-option v-for="item in goodsKind" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input v-model="searchForm.damageName" class="width150"></el-input>
        </el-form-item>
        <el-form-item class="form-inline-flex">
          <el-button type="primary" @click="getDataList">查询</el-button>
          <el-button type="primary" @click="initForm">重置</el-button>
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
        <el-table-column prop="checkInPerson.houseNum" label="房间号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="checkInPerson.checkIn.name" label="客人姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="damageTypeName" label="商品类别" show-overflow-tooltip></el-table-column>
        <el-table-column prop="damageName" label="商品名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="damageCount" label="数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="damageInfo.damagePrice" label="单价" show-overflow-tooltip></el-table-column>
        <el-table-column label="总价" show-overflow-tooltip>
          <template slot-scope="{row}">
            <div>{{allPrice(row)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="payTime" label="赔偿日期" show-overflow-tooltip></el-table-column>
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
      goodsKind: [],
      loading: false,
      pageIndex: 1, //当前页
      pageSize: 10, //页数
      searchForm: {
        roomNum: "",
        cname: "",
        damageTypeId: "",
        damageName: "",
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
    };
  },

  created() {
    this.goodsType();
    this.getDataList();
  },
  methods: {
    //计算商品总价
    allPrice(row) {
      if (row.damageCount && row.damageInfo.damagePrice) {
        return row.damageCount * row.damageInfo.damagePrice;
      }
    },
    //商品类别接口
    goodsType() {
      this.$F.doRequest(this, "/pms/hoteldamagetype/list", {}, (res) => {
        console.log(res);
        this.goodsKind = res.list;
      });
    },
    initForm() {
      this.searchForm = {
        roomNum: "",
        cname: "",
        damageTypeId: "",
        damageName: "",
      };
      this.pageIndex = 1; //当前页
      this.pageSize = 10; //页数
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList(params = {}) {
      this.$F.merge(params, {
        paging: true,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        priceType: 7,
      });
      this.$F.merge(params, this.searchForm);
      this.$F.doRequest(
        this,
        "/pms/consume/consume_order_list",
        params,
        (data) => {
          console.log(data);
          this.tableData = data.consumeOrderList;
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
      this.pageSize = 10;
      this.pageIndex = val;
      this.getDataList();
    },
  },
};
</script>
