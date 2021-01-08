<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-08 14:25:32
 * @FilePath: \jiudian\src\views\market\customer\children\history.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div>
    <el-card>
      <!-- 头部导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item @click.native="goBack" style="cursor: pointer">{{
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
          <el-select
            v-model="searchForm.storesNum"
            :placeholder="$t('commons.placeChoose')"
          >
            <el-option :label="$t('commons.all')" value="0000000000">
            </el-option>
            <el-option
              v-for="item in storeList"
              :key="item.value"
              :label="item.storesName"
              :value="item.storesNum"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item :label="$t('desk.customer_roomType') + ':'">
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
        </el-form-item> -->
        <el-form-item :label="$t('manager.hp_room') + ':'" label-width="120px">
          <el-cascader
            v-model="searchForm.roomTypeId"
            :options="roomType"
            @change="handleChange"
            style="width: 180px"
          ></el-cascader>
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
        <el-table-column
          prop=""
          :label="$t('desk.customer_liveToleave')"
          width="200"
        >
          <template slot-scope="{ row }">
            <div class="box">
              <div class="item">
                <div>
                  <span class="text-blue">{{
                    $t("desk.customer_arrived")
                  }}</span
                  >{{ row.checkinTime }}
                </div>
                <div>
                  <span class="text-red">{{ $t("desk.customer_leave") }}</span
                  >{{ row.checkoutTime }}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="checkInDays"
          :label="$t('desk.customer_dayNum')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :label="$t('desk.customer_roomType')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div v-if="row.operCheckinType == 1 || 2">
              {{ $t("desk.customer_guestRoom") }}
            </div>
            <div v-if="row.operCheckinType == 3">
              {{ $t("desk.customer_venue") }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="operCheckinType"
          :label="$t('desk.order_checkinWay')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ F_operCheckinType(row.operCheckinType) }}
          </template>
        </el-table-column> -->
        <el-table-column
          prop=""
          :label="$t('desk.home_roomNum')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.hotelCheckInRoom ? row.hotelCheckInRoom.houseNum : "" }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('desk.home_roomType')"
          prop="hotelCheckInRoom.roomTypeName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop=""
          :label="$t('desk.customer_totalRoomPrice')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.hotelCheckInRoom ? row.hotelCheckInRoom.realPrice : "" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="consumeTotalPrice"
          :label="$t('desk.customer_totalConsum')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          :label="$t('desk.customer_occurrenceStore')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{
              F_storeName(
                row.hotelCheckInRoom ? row.hotelCheckInRoom.storesNum : ""
              )
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="orderNum"
          :label="$t('desk.book_orderNum')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :label="$t('desk.customer_toTheGuest')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span
              v-for="(item, index) in checkinPersonList(row)"
              :key="index"
              style="margin-right: 6px"
              >{{ item.name }}</span
            >
          </template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" width="220">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini" @click="handelDetail(row)">{{
              $t("commons.detail")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px"></div>
      <!--分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.pageIndex"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="searchForm.pageSize"
        layout=" sizes, prev, pager, next, jumper"
        :total="listTotal"
      ></el-pagination>
    </el-card>
    <!-- 编辑or详情弹窗 -->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
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
    guestRooms: {
      get() {
        return this.$t("manager.hk_guestRooms");
      },
      set() {},
    },
    chamber: {
      get() {
        return this.$t("manager.hk_chamber");
      },
      set() {},
    },
  },
  watch: {
    guestRooms(newValue, oldValue) {
      this.guestRooms = newValue;
    },
    chamber(newValue, oldValue) {
      this.chamber = newValue;
    },
  },
  data() {
    return {
      itemGuestInfo:null,
      loading: false,
      searchForm: {
        storesNum: "",
        roomTypeId: "",
        inStartTime: "",
        inEndTime: "",
        outStartTime: "",
        outEndTime: "",
        //////////
        pronunciation: "", //入住人发音
        name: "",
        idcard: "",
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        paging: true,
      },
      listTotal: 0, //总条数
      tableData: [], //表格数据
      storeList: [],

      //////
      roomType: [
        {
          label: this.guestRooms,
          value: "1",
          children: [],
        },
        {
          label: this.chamber,
          value: "2",
          children: [],
        },
      ],
    };
  },
  mounted() {
    this.stores_list();
    this.get_room_type_list();
  },
  methods: {
    ...mapMutations({
      resetActive: "resetActive",
    }),
    checkinPersonList(row) {
      console.log(row);
      let newArray = [];
      if (row.hotelCheckInRoom && row.hotelCheckInRoom.personList.length > 0) {
        newArray = row.hotelCheckInRoom.personList.filter((item) => {
          return item.name != row.name;
        });
      }
      return newArray;
    },
    // 选择--获取房型
    get_room_type_list() {
      // this.roomType = []
      this.$F.doRequest(this, "/pms/hotel/room_type_list", {}, (res) => {
        res.roomtype.forEach((item, index) => {
          item.label = item.houseName;
          item.value = item.id;
          this.roomType[0].children.push(item);
        });
        this.roomType[0].label = this.guestRooms;
        res.meetingtype.forEach((item, index) => {
          item.label = item.houseName;
          item.value = item.id;
          this.roomType[1].children.push(item);
        });
        this.roomType[1].label = this.chamber;
        console.log(this.roomType);
      });
    },
    // 获取联级选择--房屋类型
    handleChange(value) {
      this.searchForm.roomTypeId = value[1];
    },
    initForm() {
      this.searchForm = {
        storesNum: "",
        roomTypeId: "",
        inStartTime: "",
        inEndTime: "",
        outStartTime: "",
        outEndTime: "",
        //////////
        pronunciation: "", //入住人发音
        name: "",
        idcard: "",
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        paging: true,
      };
      console.log(this.$route.query);
      this.itemGuestInfo = this.$route.query.item;
      this.searchForm.idcard = this.$route.query.item.idcard || "";
      this.searchForm.name = this.$route.query.item.name;
      this.searchForm.pronunciation = this.$route.query.item.pronunciation;
      this.searchForm.storesNum = sessionStorage.getItem("storesNum");
      this.getDataList();
    },
    //点击 客史档案
    goBack() {
      if (this.$route.query.form == "member") {
        this.resetActive("member");
        this.$router.replace("/customer");
      } else {
        this.resetActive("history");
        this.$router.replace("/customer");
      }
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
      let params = {};
      this.$F.doRequest(this, "/pms/freeuser/stores_list", params, (data) => {
        console.log(data);
        this.storeList = data;
        this.initForm();
      });
    },
    //点击详情
    handelDetail(item) {
      //   this.$router.push("/orderdetail?id=" + item.hotelCheckInRoom.checkinId);
      this.$router.push({
        path: "orderdetail",
        query: {
          id: item.hotelCheckInRoom.checkinId,
          item:this.itemGuestInfo,
          member: "member",
        },
      });
    },
    F_storeName(v) {
      let that = this;
      for (let k in that.storeList) {
        if (that.storeList[k].storesNum == v) {
          return that.storeList[k].storesName;
        }
      }
      return this.$t("desk.customer_unknowStore");
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
