<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-14 15:50:15
 * @FilePath: /jiudian/src/views/market/orders/orderlist.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small" label-width="100px">
        <el-row>
          <el-form-item label="订单类型">
            <div class="tagList">                
              <template v-for="(item,key,index) of $t('frontOffice.orderType')">
                <el-tag
                  class="tag"
                  :type="searchForm.orderType==key?'':'info'"
                  style=" cursor: pointer;"
                  :key="index"
                  @click="orderTypeClick(key)"
                >{{item}}</el-tag>
              </template>
            </div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="预离日期">
            <div class="tagList" style="display:inline-block">
              <template v-for="(item,key,index) of $t('frontOffice.leaveDate')">
                <el-tag
                  style=" cursor: pointer;"
                  class="tag"
                  :type="searchForm.leaveDate==key?'':'info'"
                  :key="index"
                  @click="leaveDateClick(key)"
                >{{item}}</el-tag>
              </template>
            </div>
            <el-form-item label v-if="searchForm.leaveDate==10">
              <el-date-picker
                v-model="searchForm.outStartTime"
                value-format="yyyy-MM-dd"
                type="date"
                style="width:140px"
                placeholder="选择日期"
              ></el-date-picker>
              <span style="margin:0 5px">-</span>
              <el-date-picker
                v-model="searchForm.outEndTime"
                value-format="yyyy-MM-dd"
                type="date"
                style="width:140px"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="入住方式">
            <div class="tagList" style="display:inline-block">
              <template v-for="(item,key,index) of $t('frontOffice.checkInRoomType')">
                <el-tag
                  style=" cursor: pointer;"
                  class="tag"
                  :type="searchForm.checkInRoomType==key?'':'info'"
                  :key="index"
                  @click="checkInRoomTypeClick(key)"
                >{{item}}</el-tag>
              </template>
            </div>
            <el-form-item label="入住日期">
              <el-date-picker
                v-model="searchForm.inStartTime"
                value-format="yyyy-MM-dd"
                type="date"
                style="width:140px"
                placeholder="选择日期"
              ></el-date-picker>
              <span style="margin:0 5px">-</span>
              <el-date-picker
                v-model="searchForm.inEndTime"
                value-format="yyyy-MM-dd"
                type="date"
                style="width:140px"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="订单来源">
            <el-select v-model="searchForm.orderSource" class="width150">
              <el-option
                :value="key"
                v-for="(item,key,index) of $t('commons.orderSource')"
                :label="item"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客源类别">
            <el-select v-model="searchForm.guestType" class="width150">
              <el-option
                :value="key"
                v-for="(item,key,index) of $t('commons.guestType')"
                :label="item"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房型">
            <el-select v-model="searchForm.roomTypeId" class="width150">
              <el-option label="全部" value>全部</el-option>
              <el-option
                :value="item.id"
                v-for="(item,index) of roomTypeList"
                :label="item.houseName"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="外部订单">
            <el-input v-model="searchForm.thirdOrdernum" class="width150"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="姓名">
            <el-input v-model="searchForm.name" class="width150"></el-input>
          </el-form-item>
          <el-form-item label="房间号">
            <el-input v-model="searchForm.roomNum" class="width150"></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="searchForm.orderNum" class="width150"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getDataList">查询</el-button>
            <el-button type="primary" @click="initForm">重置</el-button>
            <el-button type="primary" @click="initForm">导出</el-button>
          </el-form-item>
          <el-form-item style="float:right">
            <el-button type="text" icon="el-icon-arrow-up">收起</el-button>
          </el-form-item>
        </el-row>
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
        <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mobile" label="手机号码"></el-table-column>
        <el-table-column prop="checkinTime" label="入住时间" width="160"></el-table-column>
        <el-table-column prop="checkoutTime" label="预离时间" width="160"></el-table-column>
        <el-table-column prop="enterType" label="房间号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="enterType" label="房型" show-overflow-tooltip></el-table-column>
        <el-table-column prop label="客源类别" width="120">
          <template slot-scope="{row}">{{F_guestType(row.guestType)}}</template>
        </el-table-column>
        <el-table-column prop label="订单来源" width="120">
          <template slot-scope="{row}">{{F_orderSource(row.orderSource)}}</template>
        </el-table-column>
        <el-table-column prop label="在住状态" width="120">
          <template slot-scope="{row}">{{F_checkinState(row.state)}}</template>
        </el-table-column>
        <el-table-column prop label="结账状态" width="100">
          <template slot-scope="{row}">{{F_billType(row.billType)}}</template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="{row}">
            <el-button type="text" size="mini" @click="handelDetail(row)">详情</el-button>
            <el-button type="text" size="mini">结账</el-button>
            <el-button type="text" size="mini">开发票</el-button>
            <el-dropdown style="margin-left: 10px;font-size: 12px">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>撤销退房</el-dropdown-item>
                <el-dropdown-item>开发票</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px"></div>
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
      searchForm: {
        orderType: "",
        mobile: "",
        idcard: "",
        name: "",
        searchType: 1,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        paging: true,
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
      roomTypeList: [],
    };
  },
  mounted() {
    this.initForm();
    this.room_type_list();
  },
  methods: {
    initForm() {
      this.searchForm = {
        leaveDate: "",
        checkInRoomType: "",
        orderType: "",
        mobile: "",
        idcard: "",
        name: "",
        searchType: 1,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        paging: true,
      };
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      this.loading = true;
      this.$F.doRequest(
        this,
        "/pms/checkin/checkin_order_list",
        this.searchForm,
        (res) => {
          this.loading = false;
          this.tableData = res.roomPersonList;
          this.listTotal = res.page.count;
        }
      );
    },
    /**房型下拉框 */
    room_type_list() {
      this.loading = true;
      this.$F.doRequest(
        this,
        "/pms/hotel/room_type_list",
        this.searchForm,
        (res) => {
          this.loading = false;
          this.roomTypeList = res.meetingtype;
        }
      );
    },
    handelDetail(item) {
      this.$router.push("/orderdetail?id=" + item.id);
    },
    orderTypeClick(key) {
      this.searchForm.orderType = key ? key : "";
    },
    checkInRoomTypeClick(key) {
      this.searchForm.checkInRoomType = key ? key : "";
    },
    leaveDateClick(key) {
      let that = this;
      let date = "";
      this.searchForm.leaveDate = key;

      function getCalcDate(v = 0) {
        var datetime = new Date();
        datetime.setDate(datetime.getDate() + v);
        console.log(datetime);
        var year = datetime.getFullYear();
        var month =
          datetime.getMonth() + 1 < 10
            ? "0" + (datetime.getMonth() + 1)
            : datetime.getMonth() + 1;
        var date =
          datetime.getDate() < 10
            ? "0" + datetime.getDate()
            : datetime.getDate();
        return year + "-" + month + "-" + date;
      }

      switch (key * 1) {
        case 0:
          that.searchForm.outStartTime = "";
          that.searchForm.outEndTime = "";
          break;
        case 1:
          date = getCalcDate(0);
          that.searchForm.outStartTime = date;
          that.searchForm.outEndTime = date;
          alert(that.searchForm.outStartTime);
          break;
        case 2:
          date = getCalcDate(-1);
          that.searchForm.outStartTime = date;
          that.searchForm.outEndTime = date;
          break;
        case 3:
          date = getCalcDate(1);
          that.searchForm.outStartTime = date;
          that.searchForm.outEndTime = date;
          break;
        case 4:
          that.searchForm.outStartTime = getCalcDate(1);
          that.searchForm.outEndTime = getCalcDate(3);
          break;
        case 5:
          that.searchForm.outStartTime = getCalcDate(-2);
          that.searchForm.outEndTime = getCalcDate(0);
          break;
        case 6:
          that.searchForm.outStartTime = getCalcDate(-6);
          that.searchForm.outEndTime = getCalcDate(0);
          break;
        case 7:
          (function prevMonth() {
            var nowdays = new Date();
            var year = nowdays.getFullYear();
            var month = nowdays.getMonth();
            if (month == 0) {
              month = 12;
              year = year - 1;
            }
            if (month < 10) {
              month = "0" + month;
            }
            var myDate = new Date(year, month, 0);
            that.searchForm.outStartTime = year + "-" + month + "-01"; //上个月第一天
            that.searchForm.outEndTime =
              year + "-" + month + "-" + myDate.getDate(); //上个月最后一天
          })();
          break;
        case 8:
          (function prevMonth() {
            var nowdays = new Date();
            var year = nowdays.getFullYear();
            var month = nowdays.getMonth() + 1;
            if (month == 0) {
              month = 12;
              year = year - 1;
            }
            if (month < 10) {
              month = "0" + month;
            }
            var myDate = new Date(year, month, 0);
            that.searchForm.outStartTime = year + "-" + month + "-01"; //上个月第一天
            that.searchForm.outEndTime =
              year + "-" + month + "-" + myDate.getDate(); //上个月最后一天
          })();
          break;
        case 9:
          (function prevMonth() {
            var nowdays = new Date();
            var year = nowdays.getFullYear();
            var month = nowdays.getMonth() + 2;
            if (month == 0) {
              month = 12;
              year = year - 1;
            }
            if (month < 10) {
              month = "0" + month;
            }
            var myDate = new Date(year, month, 0);
            that.searchForm.outStartTime = year + "-" + month + "-01"; //上个月第一天
            that.searchForm.outEndTime =
              year + "-" + month + "-" + myDate.getDate(); //上个月最后一天
          })();
          break;
        case 10:
          //不操作，手动输入日期
          // that.searchForm.outStartTime = ''
          // that.searchForm.outEndTime = ''
          break;
        default:
          this.searchForm.outStartTime = "";
          this.searchForm.outEndTime = "";
      }
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
.tagList .tag {
  margin-right: 5px;
}
</style>
