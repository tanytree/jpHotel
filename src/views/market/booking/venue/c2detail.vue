<!--
 * @Date: 2020-09-14 10:55:10
 * @Author: 陶子
 * @LastEditTime: 2020-10-15 11:04:51
 * @FilePath: \jiudian\src\views\market\booking\venue\c2detail.vue
-->
<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          @click.native="meetBooking"
          style="font-weight: 700; cursor: pointer"
          >会场预订</el-breadcrumb-item
        >
        <el-breadcrumb-item
          @click.native="meetCancel"
          style="font-weight: 700; cursor: pointer"
          >会议核销</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{$t('commons.detail')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20" class="rowRoot">
      <el-col :span="6" style="height: 563px">
        <el-card>
          <div class="clearfix">
            <span style="font-weight: bold">{{ $t('desk.order_guestInfo') }}</span>
<!--            <el-button size="mini" style="float: right" type="primary"-->
<!--              >办理会员</el-button-->
<!--            >-->
          </div>
          <div class="box_box">
            <div class="box_item">
                {{ $t('desk.order_guestName') }}：
              <span>{{ checkIn.name }}</span>
            </div>
            <div>
              手机号：
              <span>{{ checkIn.mobile }}</span>
            </div>
            <div>
              客源类型：
              <span v-if="checkIn.guestType == 1">散客</span>
              <span v-if="checkIn.guestType == 2">会员</span>
              <span v-if="checkIn.guestType == 3">单位</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card style="height: 203px">
          <div slot="header" class="card_header">
            <span>会议信息（房间：A001 {{ checkSource() }}）</span>
            <div>
                {{ $t('desk.book_orderNum') }}：
              <span>{{ checkIn.reserveOrderNum }}</span>
            </div>
          </div>
          <el-form
            ref="form"
            label-position="left"
            :model="form"
            label-width="90px"
            inline
          >
            <el-row>
              <el-col :span="7">
                <el-form-item label="会议厅：">大型会议厅</el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="会议名称：">{{
                  checkIn.meetingName
                }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="会议时间："
                  >{{ checkIn.checkinTime }} 至
                  {{ checkIn.checkoutTime }}</el-form-item
                >
              </el-col>
              <el-col :span="7">
                <el-form-item label="单位名称：">{{
                  checkIn.enterName
                }}</el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="房价合计：">{{
                  checkIn.totalRoomPrice
                }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注：">{{ checkIn.remark }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card style="margin-top: 10px; height: 350px">
          <div class="clearfix" style="margin-bottom: 10px">
            <span>会议登记</span>
            <el-button size="mini" @click="meetClick()" style="float: right"
              >会议登记</el-button
            >
          </div>
          <!--表格数据 -->
          <el-table
            ref="multipleTable"
            v-loading="loading"
            :data="tableData"
            :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
            size="mini"
          >
            <el-table-column
              prop="enterName"
              label="姓名"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="性别"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="enterType"
              :label="$t('commons.idCardTypeDesc')"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="enterType"
              label="证件号"
              show-overflow-tooltip
              width="150px"
            ></el-table-column>
            <el-table-column
              prop="enterType"
              label="登记时间"
              show-overflow-tooltip
              width="150px"
            ></el-table-column>
            <el-table-column
              prop="enterType"
              :label="$t('desk.order_moblePhone')"
              show-overflow-tooltip
              width="150px"
            ></el-table-column>
            <el-table-column :label="$t('commons.operating')">
              <template slot-scope="{ row }">
                <el-button type="text" @click="goDetail(row)" size="mini"
                  >移除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
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
        <el-form-item :label="$t('desk.order_moblePhone')">
          <el-input
            v-model="addCompanyForm.mobile"
            style="width: 180px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button @click="dialogMeet_cancle">{{ $t('commons.cancel') }}</el-button>
        <el-button type="primary" @click="dialogMeet_sure('addCompanyForm')"
          >{{ $t('commons.confirm') }}</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

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
      form: {},
      tableData: [],
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
            // message: "请输入来客姓名",
              message: this.$t('commons.mustInput'),
            trigger: "blur",
          },
        ],
        idcard: [
          {
            required: true,
            // message: "请输入证件号",
              message: this.$t('commons.mustInput'),
            trigger: "blur",
          },
        ],

        idcardType: [
          {
              required: true,
              message: this.$t('commons.placeChoose'),
            trigger: "change",
          },
        ],
      },
      dialogMeet: false,
      alldayList: [],
      hotelenterAddAndEdit: false,
      /****** */
      checkIn: {},
      consumePrice: null,
      totalPrice: null,
      payPrice: null,
      inRoomList: [],
    };
  },
  created() {
    this.getOrderDetail();
  },

  methods: {
    ...mapMutations({
      resetBookingName: "resetBookingName",
      resetBookSub: "resetBookSub",
    }),
    getOrderDetail(params = {}) {
      this.$F.merge(params, {
        reserveId: this.$route.query.id,
      });
      this.$F.doRequest(
        this,
        "/pms/checkin/reserve_check_in_detail",
        params,
        (data) => {
          console.log(data);
          this.checkIn = data.checkIn;
          this.consumePrice = data.consumePrice;
          this.totalPrice = data.totalPrice;
          this.payPrice = data.payPrice;
          this.inRoomList = data.inRoomList;
          this.getData();
        }
      );
    },
    //点击会议签到  确认 按钮
    dialogMeet_sure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {};
          this.$F.merge(params, {
            checkInReserveId: this.$route.query.id,
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
                  this.getData();
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
    //会议登记列表
    getData(params = {}) {
      this.$F.merge(params, {
        checkinId: this.checkIn.id,
      });
      this.$F.doRequest(
        this,
        "/pms/meeting/person_register_list",
        params,
        (data) => {
          console.log(data);
          this.tableData = data.registerList;
        }
      );
    },

    checkSource() {
      let text = "";
      switch (this.checkIn.orderSource) {
        case 1:
          text = "前台";
          break;
        case 2:
          text = this.$t('desk.book_saleTo');
          break;
        case 3:
          text = "渠道订单";
          break;
        case 10:
          text = "其他";
          break;
      }
      return text;
    },
    //点击  会议登记 按钮
    meetClick() {
      if (this.checkIn.state == 6) {
        this.dialogMeet = true;
      } else {
        this.$message({
          showClose: true,
          message: "当前订单还未入住，暂不可登记",
          type: "warning",
        });
      }
    },
    //点击会议核销
    meetCancel() {
      this.resetBookingName("hall");
      this.resetBookSub("second");
      this.$router.go(-1);
    },
    //点击会场预订
    meetBooking() {
      this.resetBookingName("hall");
      this.resetBookSub("b3");
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.breadcrumb {
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #ffffff;
}
.rowRoot {
  margin-top: 18px;
  .box_box {
    background-color: rgba(243, 243, 243, 1);
    margin-top: 10px;
    padding: 20px;
    left: 200px;
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
    > div {
      color: rgba(102, 102, 102, 1);
      margin-bottom: 20px;
      > span {
        margin-left: 16px;
      }
      &:nth-child(2) > span {
        margin-left: 30px;
      }
    }
  }
  .card_header {
    display: flex;
    > span {
      margin-right: 10px;
      font-weight: bold;
    }
    > div {
      color: rgba(153, 153, 153, 1);
      font-size: 16px;
      > span {
        color: rgba(18, 110, 255, 1);
      }
    }
  }
}
.clearfix {
  line-height: 28px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
