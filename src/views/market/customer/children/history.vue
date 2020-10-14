<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-13 11:42:04
 * @FilePath: \jiudian\src\views\market\customer\children\history.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div>
    <el-card>
      <!-- 头部导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/customer' }"
            >客史档案</el-breadcrumb-item
          >
          <el-breadcrumb-item>客史</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="headerTitle" v-if="tableData.length > 0">
        客史记录-{{ tableData[0].name }}
      </div>
      <!-- 查询部分 -->
      <el-form inline size="small" label-width="100px">
        <el-form-item label="发生门店：">
          <el-input v-model="searchForm.content" class="width150"></el-input>
        </el-form-item>
        <el-form-item label="房类：">
          <el-select v-model="searchForm.roomTypeId" class="width150">
            <el-option label="全部" value="">全部</el-option>
            <el-option label="会场" :value="1"></el-option>
            <el-option label="客房" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="入住人：">
                <el-input v-model="searchForm.content" class="width150"></el-input>
            </el-form-item> -->
        <br />
        <el-form-item label="入住日期：">
          <el-date-picker
            v-model="searchForm.inStartTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 140px"
            placeholder="选择日期"
          ></el-date-picker>
          <span style="margin: 0 5px">至</span>
          <el-date-picker
            v-model="searchForm.inEndTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 140px"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="离店日期：">
          <el-date-picker
            v-model="searchForm.outStartTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 140px"
            placeholder="选择日期"
          ></el-date-picker>
          <span style="margin: 0 5px">至</span>
          <el-date-picker
            v-model="searchForm.outEndTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 140px"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList">查询</el-button>
          <el-button type="primary" @click="initForm">重置</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据 -->
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
        size="mini"
      >
        <el-table-column
          prop="name"
          label="入住人"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="" label="入住-离店日期" width="200">
          <template slot-scope="{ row }">
            <div class="box">
              <div class="item">
                <div>
                  <span class="text-blue">抵</span>{{ row.checkinTime }}
                </div>
                <div>
                  <span class="text-red">离</span>{{ row.checkoutTime }}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="checkinDays"
          label="天数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="enterType"
          label="房类"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="operCheckinType"
          label="入住方式"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ F_operCheckinType(row.operCheckinType) }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="房间号" show-overflow-tooltip>
          <template slot-scope="{ row }">
            {{ row.hotelCheckInRoom.houseNum }}
          </template>
        </el-table-column>
        <el-table-column prop="enterType" label="房型" show-overflow-tooltip>
          <template slot-scope="{ row }">
            {{ row.hotelCheckInRoom.roomTypeId }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="总房价" show-overflow-tooltip>
          <template slot-scope="{ row }">
            {{ row.hotelCheckInRoom.realPrice }}
          </template>
        </el-table-column>
        <el-table-column prop="enterType" label="总消费" show-overflow-tooltip>
          <template slot-scope="{ row }">
            {{ row.hotelCheckInRoom.totalRoomPrice }}
          </template>
        </el-table-column>
        <el-table-column
          prop="enterType"
          label="发生门店"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ F_storeName(row.hotelCheckInRoom.storesNum) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="订单号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="enterType"
          label="同来宾客"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini" @click="handelDetail(row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px"></div>
      <!--分页 -->
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
    <!-- 编辑or详情弹窗 -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import myMixin from "@/utils/filterMixin";
export default {
  mixins: [myMixin],
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
      setMemberFormVisible: false,
      searchForm: {
        mobile: "",
        idcard: "",
        name: "",
        searchType: 3,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        paging: true,
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
      storeList: [],
      detailForm: {
        name: "",
      },
      setBlackForm: {
        remark: "",
      },
      setBlackShow: false,
      setBlackRules: {
        blackRemark: [
          {
            required: true,
            message: "not emply",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    this.initForm();
    this.stores_list();
  },
  methods: {
    initForm() {
      this.searchForm = {
        mobile: "",
        idcard: "",
        name: "",
        searchType: 1,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        paging: true,
      };
      console.log(this.$route.query);
      this.searchForm.idcard = this.$route.query.idcard || "";
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      this.loading = true;
      this.$F.doRequest(
        this,
        "/pms/checkin/guest_history",
        this.searchForm,
        (res) => {
          this.loading = false;
          this.tableData = res.roomPersonList;
          console.log(this.tableData);
          this.listTotal = res.page.count;
        }
      );
    },
    stores_list() {
      this.$F.doRequest(this, "/pms/freeuser/stores_list", {}, (data) => {
        this.storeList = data;
      });
    },
    handelblacklist(row) {
      this.setBlackForm.id = row.id;
      this.setBlackShow = true;
    },
    addblacklist() {
      if (!this.setBlackForm.remark) {
        this.$message.error("请输入备注信息");
        return;
      }
      this.$F.doRequest(
        this,
        "/pms/hotelmember/addblacklist",
        this.setBlackForm,
        (data) => {
          this.setBlackShow = false;
          this.getDataList();
          this.$message({
            message: "success",
            type: "success",
          });
        }
      );
    },
    handelDetail(item) {
      this.$router.push("/orderdetail");
    },
    handleDetail(item) {
      this.$router.push({
        name: "historydetail",
      });
    },
    handleHistory(item) {
      this.$router.push({
        name: "customerhistory",
      });
    },
    handleEdit(item) {
      this.$router.push({
        name: "customeredit",
      });
    },

    F_storeName(v) {
      let that = this;
      for (let k in that.storeList) {
        if (that.storeList[k].storesNum == v) {
          return that.storeList[k].storesName;
        }
      }
      return "未知门店";
    },
    /**多选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**每页数 */
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.searchForm.pageIndex = 1;
      this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.searchForm.pageIndex = val;
      this.getDataList();
    },
  },
};
</script>
<style lang="less" scoped>
.headerTitle {
  color: rgba(51, 51, 51, 100);
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(225, 225, 225, 1);
  margin-bottom: 15px;
}
</style>
