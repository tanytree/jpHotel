<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-19 15:19:22
 * @FilePath: \jiudian\src\views\market\customer\children\history.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div>
    <el-card>
      <!-- 头部导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item  @click.native="goBack" style="cursor:pointer">{{
            $t("desk.customer_guestHistoryRecord")
          }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            $t("desk.customer_guestHistory")
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="headerTitle" v-if="tableData.length > 0">
        {{ $t("desk.customer_historyGuest") }}-{{ tableData[0].name }}
      </div>
      <!-- 查询部分 -->
      <el-form inline size="small" label-width="100px">
        <el-form-item :label="$t('desk.customer_occurrenceStore') + ':'">
          <!-- <el-input v-model="searchForm.content" class="width150"></el-input> -->
          <el-select v-model="searchForm.storesNum" placeholder="请选择">
            <el-option
            v-for="item in storeList"
            :key="item.value"
            :label="item.storesName"
            :value="item.storesNum">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_roomType') + ':'">
          <el-select v-model="searchForm.roomTypeId" class="width150">
            <el-option :label="$t('desk.home_all')" value="">{{
              $t("desk.home_all")
            }}</el-option>
            <el-option
              :label="$t('desk.customer_venue')"
              :value="1"
            ></el-option>
            <el-option
              :label="$t('desk.customer_guestRoom')"
              :value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="入住人：">
                <el-input v-model="searchForm.content" class="width150"></el-input>
            </el-form-item> -->
        <br />
        <el-form-item :label="$t('desk.order_checkinTime') + ':'">
          <el-date-picker
            v-model="searchForm.inStartTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 140px"
            :placeholder="$t('desk.serve_chooseDate')"
          ></el-date-picker>
          <span style="margin: 0 5px"> {{ $t("desk.serve_to") }} </span>
          <el-date-picker
            v-model="searchForm.inEndTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 140px"
            :placeholder="$t('desk.serve_chooseDate')"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_leaveStoreDate') + ':'">
          <el-date-picker
            v-model="searchForm.outStartTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 140px"
            :placeholder="$t('desk.serve_chooseDate')"
          ></el-date-picker>
          <span style="margin: 0 5px">{{ $t("desk.serve_to") }}</span>
          <el-date-picker
            v-model="searchForm.outEndTime"
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
          :label="$t('desk.customer_livePeople')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="" :label="$t('desk.customer_liveToleave')" width="200">
          <template slot-scope="{ row }">
            <div class="box">
              <div class="item">
                <div>
                  <span class="text-blue">{{$t('desk.customer_arrived')}}</span>{{ row.checkinTime }}
                </div>
                <div>
                  <span class="text-red">{{$t('desk.customer_leave')}}</span>{{ row.checkoutTime }}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="checkinDays"
          :label="$t('desk.customer_dayNum')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="enterType"
          :label="$t('desk.customer_roomType')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="operCheckinType"
          :label="$t('desk.order_checkinWay')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ F_operCheckinType(row.operCheckinType) }}
          </template>
        </el-table-column>
        <el-table-column prop=""  :label="$t('desk.home_roomNum')" show-overflow-tooltip>
          <template slot-scope="{ row }">
            {{ row.hotelCheckInRoom?row.hotelCheckInRoom.houseNum:'' }}
          </template>
        </el-table-column>
        <el-table-column prop="enterType" :label="$t('desk.home_roomType')" show-overflow-tooltip>
          <template slot-scope="{ row }">
             {{ row.hotelCheckInRoom?row.hotelCheckInRoom.roomTypeId:'' }}
          </template>
        </el-table-column>
        <el-table-column prop="" :label="$t('desk.customer_totalRoomPrice')" show-overflow-tooltip>
          <template slot-scope="{ row }">
            {{ row.hotelCheckInRoom?row.hotelCheckInRoom.realPrice:'' }}
          </template>
        </el-table-column>
        <el-table-column prop="enterType" :label="$t('desk.customer_totalConsum')" show-overflow-tooltip>
          <template slot-scope="{ row }">
             {{ row.hotelCheckInRoom?row.hotelCheckInRoom.totalRoomPrice:'' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="enterType"
          :label="$t('desk.customer_occurrenceStore')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ F_storeName(row.hotelCheckInRoom?row.hotelCheckInRoom.storesNum:'') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="orderNum"
          :label="$t('desk.book_orderNum')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="enterType"
          :label="$t('desk.customer_toTheGuest')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" width="220" >
          <template slot-scope="{ row }">
            <el-button type="text" size="mini" @click="handelDetail(row)"
              >{{
              $t("commons.detail")
            }}</el-button
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
import { mapState, mapActions,mapMutations } from "vuex";
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
    ...mapMutations({
       resetActive: "resetActive",
    }),
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
    //点击 客史档案
    goBack(){
       if(this.$route.query.form=='member'){
      this.resetActive("member");
       this.$router.replace('/customer')
       }else{
          this.resetActive("history");
        this.$router.replace('/customer')
       }
    },
    //获取门店列表
    getStoreList(){
        this.$F.doRequest(
        this,
        "/pms/department/department_store_list",
        {},
        (res) => {
        console.log(res);
        }
      );
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
          console.log(data);
        this.storeList = data;
      });
    },
    handelblacklist(row) {
      this.setBlackForm.id = row.id;
      this.setBlackShow = true;
    },
    addblacklist() {
      if (!this.setBlackForm.remark) {
        this.$message.error(this.$t("desk.customer_inputRemark"));
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
    //   this.$router.push("/orderdetail?id=" + item.hotelCheckInRoom.checkinId);
      this.$router.push({
          path:'orderdetail',
          query:{
              id: item.hotelCheckInRoom.checkinId,
              member:'member'
          }
      });
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
      return  this.$t('desk.customer_unknowStore');
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
