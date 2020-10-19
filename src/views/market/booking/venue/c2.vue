<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 陶子修改于2020/9/14
 * @LastEditTime: 2020-10-16 13:27:11
 * @FilePath: \jiudian\src\views\market\booking\venue\c2.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking flex_column" style="background: #fff">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small" label-width="80px">
        <el-form-item :label="$t('desk.book_meetTime') + ':'">
          <el-radio-group v-model="searchForm.timeType">
            <el-radio-button label style="margin-right: 10px">{{
              $t("desk.home_noLimit")
            }}</el-radio-button>
            <el-radio-button label="1" style="margin-right: 10px">{{
              $t("desk.book_inTheDay")
            }}</el-radio-button>
            <el-radio-button label="8" style="margin-right: 10px">{{
              $t("desk.book_tomorrow")
            }}</el-radio-button>
            <el-radio-button label="9" style="margin-right: 10px">{{
              $t("desk.book_afterTomorrow")
            }}</el-radio-button>
            <el-radio-button label="7" style="margin-right: 10px">{{
              $t("desk.book_week")
            }}</el-radio-button>
            <el-radio-button label="defined" style="margin-right: 10px">{{
              $t("desk.book_theCustom")
            }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="searchForm.timeType == 'defined'">
          <el-date-picker
            v-model="searchForm.cstartTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 140px"
            :placeholder="$t('desk.serve_chooseDate')"
          ></el-date-picker>
          <span style="margin: 0 5px"> {{ $t("desk.serve_to") }} </span>
          <el-date-picker
            v-model="searchForm.cendTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 140px"
            :placeholder="$t('desk.serve_chooseDate')"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('desk.book_dateRegistration') + ':'">
          <el-date-picker
            v-model="searchForm.startTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 200px"
            :placeholder="$t('desk.serve_chooseDate')"
          ></el-date-picker>
          <span style="margin: 0 5px">-</span>
          <el-date-picker
            v-model="searchForm.endTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 200px"
            :placeholder="$t('desk.serve_chooseDate')"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('desk.book_orderSoutce') + ':'">
          <el-select v-model="searchForm.orderSource" class="width150">
            <el-option value :label="$t('desk.home_all')"></el-option>
            <el-option
              :value="key"
              v-for="(item, key, index) of $t('commons.orderSource')"
              :label="item"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.home_customersCategory') + ':'">
          <el-select v-model="searchForm.guestType" class="width150">
            <el-option value :label="$t('desk.home_all')"></el-option>
            <el-option
              :value="key"
              v-for="(item, key, index) of $t('commons.guestType')"
              :label="item"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.home_bookPeople') + ':'">
          <el-input v-model="searchForm.name" class="width200"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_bookPeople') + ':'">
          <el-input v-model="searchForm.houseNum" class="width200"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.book_orderNum') + ':'">
          <el-input v-model="searchForm.orderNum" class="width200"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">{{
            $t("commons.queryBtn")
          }}</el-button>
          <el-button type="primary" class="white" @click="initForm">{{
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
          prop="name"
          :label="$t('desk.book_name')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="enterName"
          :label="$t('desk.book_unit')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="meetingName"
          :label="$t('desk.book_meetName')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :label="$t('desk.book_MeetstartAend')"
          show-overflow-tooltip
          width="150px"
        >
          <template slot-scope="{ row }">
            <div>
              <span style="color: #126eff">{{ $t("desk.serve_open") }}</span>
              {{ row.checkinTime }}
            </div>
            <div>
              <span style="color: #d32b2b">{{ $t("desk.serve_tie") }}</span>
              {{ row.checkoutTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('desk.home_roomNum')"
          width="120px"
        ></el-table-column>
        <el-table-column
          :label="$t('desk.book_chamber')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :label="$t('desk.home_customersCategory')"
          align="center"
          width="100px"
        >
          <template slot-scope="{ row }">
            <div v-if="row.guestType == 1">{{ $t("desk.book_traveler") }}</div>
            <div v-if="row.guestType == 2">{{ $t("desk.book_member") }}</div>
            <div v-if="row.guestType == 3">{{ $t("desk.book_unit") }}</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('desk.book_orderSoutce')"
          align="center"
          width="140px"
        >
          <template slot-scope="{ row }">
            <div v-if="row.orderSource == 1">{{ $t("desk.book_desk") }}</div>
            <div v-if="row.orderSource == 2">{{ $t("desk.book_saleTo") }}</div>
            <div v-if="row.orderSource == 3">
              {{ $t("desk.book_channelOrder") }}
            </div>
            <div v-if="row.orderSource == 10">{{ $t("desk.book_other") }}</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('desk.book_meetState')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div v-if="row.state == 1">{{ $t("desk.book_waiteSure") }}</div>
            <div v-if="row.state == 2">{{ $t("desk.book_sureBook") }}</div>
            <div v-if="row.state == 3">{{ $t("desk.book_reject") }}</div>
            <div v-if="row.state == 4">NOSHOW</div>
            <div v-if="row.state == 5">{{ $t("desk.book_notCheckin") }}</div>
            <div v-if="row.state == 6">{{ $t("desk.book_checkin") }}</div>
            <div v-if="row.state == 7">{{ $t("desk.book_leaveStore") }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" width="140">
          <template slot-scope="{ row }">
            <el-button type="text" @click="goDetail(row)" size="mini">{{
              $t("commons.detail")
            }}</el-button>
            <el-button
              type="text"
              v-if="row.state == 6"
              @click="meetClick(row)"
              size="mini"
              >{{ $t("desk.book_meetConference") }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px"></div>
      <!--分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="searchForm.pageIndex"
        :page-size="searchForm.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="listTotal"
      ></el-pagination>
      <!-- 会议签到dialog -->
      <el-dialog
        top="0"
        title="会议签到"
        :visible.sync="dialogMeet"
        class="setCompanyForm"
      >
        <el-form
          :model="addCompanyForm"
          ref="addCompanyForm"
          :rules="rules"
          label-width="100px"
          size="mini"
        >
          <el-row class="row">
            <el-col :span="11">
              <el-form-item label="来客姓名:" prop="name">
                <el-input
                  v-model="addCompanyForm.name"
                  style="width: 180px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别:">
                <el-radio-group v-model="addCompanyForm.sex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="11" class="col">
              <el-form-item :label="$t('commons.idCardTypeDesc')" prop="idcardType">
                <el-select
                  v-model="addCompanyForm.idcardType"
                  style="width: 180px"
                  :placeholder="$t('commons.selectIdCardType')"
                >
                  <el-option label="身份证" value="1"></el-option>
                  <el-option label="护照" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item label="证件号:" prop="idcard">
                <el-input
                  v-model="addCompanyForm.idcard"
                  style="width: 180px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="手机号:">
            <el-input
              v-model="addCompanyForm.mobile"
              style="width: 180px"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right">
          <el-button class="white" @click="dialogMeet_cancle">{{ $t('commons.cancel') }}</el-button>
          <el-button
            type="primary"
            class="submit"
            @click="dialogMeet_sure('addCompanyForm')"
            >确认</el-button
          >
        </div>
      </el-dialog>
    </div>
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
      dialogMeet: false,
      loading: false,
      searchForm: {
        timeType: "",
        cstartTime: "",
        cendTime: "",
        startTime: "",
        endTime: "",
        orderSource: "",
        guestType: "",
        name: "",
        houseNum: "",
        orderNum: "",
        operCheckinType: 3,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
      },
      listTotal: 0, //总条数
      tableData: [], //表格数据
      addCompanyForm: {
        name: "",
        sex: "1",
        idcardType: "1",
        idcard: "",
        mobile: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入来客姓名",
            trigger: "blur",
          },
        ],
        idcard: [
          {
            required: true,
            message: "请输入证件号",
            trigger: "blur",
          },
        ],

        idcardType: [
          {
            required: true,
            message: "请选择证件类型",
            trigger: "change",
          },
        ],
      },
      itemInfo: null,
    };
  },

  created() {
    this.initForm();
  },
  methods: {
    //点击会议签到  确认 按钮
    dialogMeet_sure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.itemInfo);
          let params = {};
          this.$F.merge(params, {
            checkInReserveId: this.itemInfo.id,
          });
          this.$F.doRequest(
            this,
            "/pms/reserve/reserve_to_checkin",
            params,
            (data) => {
              this.$F.merge(this.addCompanyForm, {
                checkinId: data.checkinId,
              });
              this.$F.doRequest(
                this,
                "/pms/meeting/person_register",
                this.addCompanyForm,
                (data) => {
                  this.$message({
                      message: this.$t('commons.request_success'),
                      type: "success",
                  });
                  this.dialogMeet_cancle();
                }
              );
            }
          );
        } else {
          return false;
        }
      });
    },
    //点击会议签到  取消  按钮
    dialogMeet_cancle() {
      this.dialogMeet = false;
      this.addCompanyForm = {
        name: "",
        sex: "1",
        idcardType: "1",
        idcard: "",
        mobile: "",
      };
    },
    //点击  会议登记 按钮
    meetClick(row) {
      console.log(row);
      return false;
      this.itemInfo = row;
      this.dialogMeet = true;
    },
    //点击  详情  按钮
    goDetail(row) {
      this.$router.push({
        name: "c2detail",
        query: {
          id: row.id,
        },
      });
    },
    initForm() {
      this.searchForm = {
        timeType: "",
        cstartTime: "",
        cendTime: "",
        startTime: "",
        endTime: "",
        orderSource: "",
        guestType: "",
        name: "",
        houseNum: "",
        orderNum: "",
        operCheckinType: 3,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
      };
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList(params = {}) {
      this.$F.merge(params, {
        paging: true,
      });
      this.$F.merge(params, this.searchForm);
      if (params.timeType == "defined") delete params["timeType"];
      this.$F.doRequest(
        this,
        "/pms/reserve/reserve_order_list",
        params,
        (data) => {
          console.log(data);
          this.tableData = data.resreveList;
          this.listTotal = data.page.count;
        }
      );
    },

    /**每页数据 */
    // handleSizeChange(val) {
    //   this.searchForm.pageSize = val;
    //   this.searchForm.pageIndex = 1;
    //   this.getDataList();
    // },
    /**当前页 */
    handleCurrentChange(val) {
      this.searchForm.pageIndex = val;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
  },
};
</script>
