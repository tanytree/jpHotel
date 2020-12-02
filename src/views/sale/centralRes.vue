<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-form
          ref="centerForm"
          inline
          size="small"
          :model="centerForm"
          label-width="100px"
        >
          <el-col :span="8">
            <el-form-item label="酒店名称:">
              <el-select
                v-model="centerForm.storesNum"
                :placeholder="$t('login.sTip')"
              >
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="item in storeList"
                  :key="item.storesNum"
                  :label="item.storesName"
                  :value="item.storesNum"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button
                type="primary"
                style="margin-left: 25px"
                @click="onSubmit"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>

    <!-- 酒店信息表格 -->
    <el-row>
      <h4>酒店信息:</h4>
      <el-row
        v-for="(item, index) in infoArray"
        :key="index"
        style="margin-top: 30px"
      >
        <div>
          <span>{{ item.name }}</span>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%; margin-top: 10px"
          :header-cell-style="{ background: '#D9DDE2', color: '#606266' }"
        >
          <el-table-column :label="$t('desk.home_roomType')" width="130" fixed>
            <template>
              <el-row>房间详情</el-row>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(each, index) in item.array"
            :key="index"
            :label="each.roomTypeName"
            width="160"
          >
            <template>
              <el-row>可订数：{{ each.reserveTotal }}</el-row>
              <el-row v-if="each.personPrice"
                >1人总价：{{ each.personPrice.split(",")[0] }}</el-row
              >
              <el-row
                v-if="
                  each.personPrice && each.personPrice.split(',').length > 1
                "
                >2人总价：{{ each.personPrice.split(",")[1] }}</el-row
              >
            </template>
          </el-table-column>
          <el-table-column :label="$t('commons.operating')" fixed="right">
            <template>
              <el-button
                :disabled="item.array.length > 0 ? false : true"
                size="mini"
                type="text"
                @click="handleEdit()"
                >普通预订</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-row>
    <!-- 预定 -->
    <el-dialog
      top="0"
      title="预订"
      :visible.sync="dialogFormVisible"
      width="90%"
    >
      <div>
        <el-row>
          <el-form
            inline
            size="small"
            label-width="100px"
            :model="checkInForm"
            ref="checkInForm"
            :rules="rules"
          >
            <el-row>
              <el-form-item :label="$t('desk.customer_guestType') + ':'">
                <el-radio-group v-model="checkInForm.guestType">
                  <el-radio
                    v-for="(item, key, index) of $t('commons.guestType')"
                    :label="key"
                    :key="index"
                  >
                    {{ item }}
                  </el-radio>
                </el-radio-group>
                <el-select
                  v-if="checkInForm.guestType == 2"
                  style="margin-left: 10px"
                  v-model="vipname"
                  filterable
                  placeholder="请输入会员名/手机号/卡号"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-if="checkInForm.guestType == 3"
                  style="margin-left: 10px"
                  v-model="unitname"
                  filterable
                  placeholder="请输入单位名称/手机号"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <template v-if="checkInForm.guestType == 4">
                  <el-form-item label="导游姓名：">
                    <el-input
                      placeholder="导游姓名"
                      style="width: 100px"
                    ></el-input>
                    <el-input
                      placeholder="发音"
                      style="width: 100px; margin-left: 5px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="领队姓名：">
                    <el-input
                      placeholder="领队姓名"
                      style="width: 100px"
                    ></el-input>
                    <el-input
                      placeholder="发音"
                      style="width: 100px; margin-left: 5px"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    :label="$t('desk.arrivalTime')"
                    prop="checkinTime"
                  >
                    <el-date-picker
                      style="width: 200px"
                      v-model="checkInForm.checkinTime"
                      type="datetime"
                      :placeholder="$t('desk.serve_chooseDate')"
                      :picker-options="startTime"
                      format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      @change="startTimeChange"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item :label="$t('desk.checkInDays')" prop="name">
                    <el-input-number
                      style="width: 200px"
                      v-model="checkInForm.checkinDays"
                      :step="1"
                      :min="1"
                      @change="checkinDaysChange"
                    ></el-input-number>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    :label="$t('desk.order_departureTime')"
                    prop="checkoutTime"
                  >
                    <el-date-picker
                      v-model="checkInForm.checkoutTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      :picker-options="leaveTime"
                      @change="endTimeChange"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item :label="$t('desk.keepTime')" prop="keepTime">
                    <el-date-picker
                      style="width: 200px"
                      v-model="checkInForm.keepTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      :picker-options="leaveTime"
                      @change="endTimeChange"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item :label="$t('desk.home_bookPeople')" prop="name">
                    <el-input
                      style="width: 200px"
                      v-model="checkInForm.content"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item :label="$t('commons.mobile')">
                    <el-input
                      style="width: 200px"
                      v-model="checkInForm.content"
                    ></el-input
                    >&nbsp;&nbsp;
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <el-form-item label="订单来源" prop="name">
                  <el-select
                    style="width: 200px"
                    v-model="checkInForm.enterStatus"
                  >
                    <el-option
                      :label="$t('desk.home_all')"
                      value="3"
                    ></el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item :label="$t('desk.order_salesman') + '：'">
                    <el-select
                      style="width: 200px"
                      v-model="checkInForm.enterStatus"
                    >
                      <el-option label="正常" value="1"></el-option>
                      <el-option label="不正常" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item :label="$t('desk.order_outOrder') + '：'">
                    <el-input
                      style="width: 200px"
                      v-model="checkInForm.content"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <div class="grid-content">
                  <el-form-item :label="$t('desk.orderMarkInfo') + '：'">
                    <el-input
                      v-model="checkInForm.content"
                      style="width: 740px"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col :span="3">
                <el-form-item label="房间信息" prop="name">
                  <el-select
                    style="width: 200px; margin-left: 30px"
                    v-model="checkInForm.enterStatus"
                  >
                    <el-option
                      :label="$t('desk.home_all')"
                      value="3"
                    ></el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="17">
              <div class="grid-content">
                <el-row>
                  <el-col :span="8" v-for="v in 9" :key="v">
                    <div class="grid-content rooms">
                      <div class="grid-cell">
                        <div class="wrap">
                          <el-row class="row">
                            <el-col :span="14">
                              <span>标准间</span>
                            </el-col>
                            <el-col :span="10">
                              <div style="text-align: right">
                                <el-input-number
                                  @change="handleChange"
                                  :min="1"
                                  :max="10"
                                  label
                                  size="mini"
                                  style="width: 100px"
                                ></el-input-number>
                              </div>
                            </el-col>
                          </el-row>
                          <el-row class="row">
                            <el-col :span="14">
                              <el-button type="text" size="mini"
                                >可订12</el-button
                              >
                            </el-col>
                            <el-col :span="10">
                              <div style="text-align: right">
                                <el-input
                                  placeholder
                                  size="mini"
                                  style="width: 60px"
                                ></el-input>
                                <em>666</em>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content">
                <el-row>
                  <el-button>{{ $t("desk.autoRowHouse") }}</el-button
                  >&nbsp;&nbsp;
                </el-row>
                <br />
                <el-row class="roomSelect">
                  <ul>
                    <li v-for="v in 2" :key="v">
                      <div class="grid-content rooms">
                        <div class="grid-cell">
                          <div class="wrap">
                            <el-row class="row">
                              <el-col :span="14">
                                <span>标准间</span>
                              </el-col>
                              <el-col :span="10">
                                <div style="text-align: right">
                                  <el-button type="primary" size="mini">{{
                                    $t("desk.rowHouse")
                                  }}</el-button>
                                </div>
                              </el-col>
                            </el-row>
                            <el-row class="row">
                              <el-button size="mini">A101</el-button>
                            </el-row>
                            <el-row class="row">
                              <el-col :span="14">
                                <el-button type="text" size="mini"
                                  >可订12</el-button
                                >
                              </el-col>
                              <el-col :span="10">
                                <div style="text-align: right">
                                  <el-input-number
                                    @change="handleChange"
                                    :min="1"
                                    :max="10"
                                    label
                                    size="mini"
                                    style="width: 100px"
                                  ></el-input-number>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-row>
      </div>

      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >预订</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

function getDaysBetween(dateString1, dateString2) {
  var startDate = Date.parse(dateString1);
  var endDate = Date.parse(dateString2);
  var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
  // alert(days);
  return days;
}
import { mapState, mapActions } from "vuex";
// import Reserve from "./reserve"
export default {
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),
  },
  // components: {Reserve },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      vipname: "",
      unitname: "",
      dialogFormVisible: false,
      centerForm: {
        storesNum: "",
      },
      rules: {
        name: [{ required: true, trigger: "blur" }],
        date1: [{ type: "date", trigger: "change" }],
      },
      storeList: [],
      checkInForm: {
        checkInRoomJson: [],
      },
      tableData: [{}], //表格数据
      num: "",
      infoArray: [],
       afterToday: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天
        },
      },
      leaveTime: {
        disabledDate: (time) => {
          if (
            this.checkInForm.checkinTime != "" &&
            this.checkInForm.checkinTime
          ) {
            let timeStr = new Date(
              new Date(this.checkInForm.checkinTime)
                .Format("yyyy-MM-dd")
                .replace(/-/g, "/")
            );
            if (this.operCheckinType == "b2") {
              //时租预订
              return (
                new Date(time.Format("yyyy-MM-dd")).getTime() - 8.64e7 > timeStr
              );
            }
            return (
              new Date(time.Format("yyyy-MM-dd")).getTime() - 8.64e7 < timeStr
            );
          } else if (this.checkInForm.checkinTime == "") {
            return (
              new Date(time.Format("yyyy-MM-dd")).getTime() <
              Date.now() - 8.64e7
            ); //如果没有后面的-8.64e7就是不可以选择今天
          } else {
            return "";
          }
        },
      },
      startTime: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime();
        },
      },
    };
  },
  mounted() {
    let params = {
      filterHeader: false,
    };
    this.$F.doRequest(this, "/pms/freeuser/stores_list", params, (data) => {
      this.storeList = data;
    });
    this.initForm();
    this.getInfoList();
  },

  methods: {
    initForm() {
      this.checkInForm = {
        name: "", //入住人姓名  String必填
        pronunciation: "", // 拼音
        mobile: "", //电话  String选填
        orderSource: "1", //订单来源  1前台 2销售推荐 3渠道订单 10其他  Integer必填
        sex: "1", //    入住人性别 1男 2女 3保密  Integer必填
        idcardType: "1", // 证件类型  1身份证 2护照  Integer必填
        idcard: "", //证件号码  String必填
        memberCard: "", // 会员卡号  String选填
        checkinTime: "", // 预抵时间/到店时间 yyyy-MM-dd hh:mm:ss格式  String必填
        checkoutTime: "", //预离时间 yyyy-MM-dd hh:mm:ss格式  String必填
        keepTime: "", //保留时间 yyyy-MM-dd hh:mm:ss格式  String必填
        checkinDays: 1, //入住天数  int必填
        salesId: "", //销售员id  String选填
        thirdOrdernum: "", //外部订单号  String选填
        ruleHourId: "", //时租房规则id  operCheckinType=2必填  String选填
        guestType: "1", //客户类型  1散客 2会员 3单位  Integer必填
        recommendInfo: "", //推荐人信息（姓名或销售用户id）  String选填
        checkinType: "1", // 入住类型  1正常 2免费  Integer必填
        remark: "", //订单信息备注  String选填
        // checkInId: '2c9f404b73939b040173947c555b000c',
        // checkInReserveId: '2c9f404b738f2f5d017393748ad60009',
        checkInId: "", // 传入改值，将会进行编辑客人信息  String选填
        checkInReserveId: "", //传入改值，将会进行编辑预定客人信息  String选填
        meetingName: "", //会议名称  String选填
        enterName: "", //单位名称 String选填
        checkInRoomJson: [], //排房信息json集合字符串
      };
       this.handleOperCheckinType();
    },
     handleOperCheckinType() {
      let menu = {
        a1: 1,
        a2: 2,
        b1: 1,
        b2: 2,
        b3: 3,
      };
      this.checkInForm.operCheckinType = menu[this.operCheckinType];
      let nowDate = new Date();
      if (this.operCheckinType && this.operCheckinType.startsWith("b")) {
        this.checkInForm.checkinTime = nowDate.Format("yyyy-MM-dd HH:mm:ss");
        if (this.operCheckinType == "b1") {
          this.checkInForm.checkinDays = 1;
          nowDate.setDate(nowDate.getDate() + this.checkInForm.checkinDays);
          this.checkInForm.checkoutTime = nowDate.Format("yyyy-MM-dd HH:mm:ss");
        } else if (
          this.operCheckinType == "b2" ||
          this.operCheckinType == "b3"
        ) {
          this.checkInForm.checkinDays = "";
          nowDate.setDate(nowDate.getDate() + 1);
          nowDate.setHours(12);
          nowDate.setMinutes(0);
          nowDate.setSeconds(0);
          this.checkInForm.checkoutTime = nowDate.Format("yyyy-MM-dd HH:mm:ss");
          // for (let k in this.checkInForm) {
          //     if (k !== 'operCheckinType') {
          //         this.checkInForm[k] = ''
          //     }
          // }
        }
        this.checkInForm.keepTime =
          new Date().Format("yyyy-MM-dd") + " 23:59:00";
      }
      if (this.operCheckinType == "a1" || this.operCheckinType == "a2") {
        this.checkInForm.checkinTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
      }
      //  else {
      //     this.typeText = "预订";
      // }
    },
    /**获取表格数据 */
    getInfoList() {
      this.infoArray = [];
      let params = {
        changeType: 1,
        roomType: 1,
      };
      this.$F.merge(params, this.centerForm);
      this.$F.doRequest(
        this,
        "/pms/checkin/hotel_checkin_roominfo",
        params,
        (res) => {
          if (this.centerForm.storesNum) {
            if (res.roomTypeList.length > 0) {
              let number = res.roomTypeList[0].storesNum;
              let name = res.roomTypeList[0].storesName;
              let object = {};
              object.name = name;
              object.number = number;
              object.array = [];
              for (let y in res.roomTypeList) {
                object.array.push(res.roomTypeList[y]);
              }
              this.infoArray.push(object);
            } else {
              this.$message("改酒店暂无房间信息");
            }
          } else {
            for (let i in this.storeList) {
              let number = this.storeList[i].storesNum;
              let name = this.storeList[i].storesName;
              let object = {};
              object.name = name;
              object.number = number;
              object.array = [];
              for (let t in res.roomTypeList) {
                if (number == res.roomTypeList[t].storesNum) {
                  object.array.push(res.roomTypeList[t]);
                }
              }
              this.infoArray.push(object);
            }
          }
          console.log(this.infoArray);
        }
      );
    },
    startTimeChange(e) {
      let day = 0;
      if (this.checkInForm.checkoutTime != "") {
        day = getDaysBetween(
          new Date(this.checkInForm.checkinTime).Format("yyyy-MM-dd"),
          new Date(this.checkInForm.checkoutTime).Format("yyyy-MM-dd")
        );
        this.checkInForm.checkinDays = day;
      }
    },
    checkinDaysChange(e) {
      console.log(e);
      if (this.checkInForm.checkinTime == "") {
        this.$message.error(this.$t("desk.home_selectToTime"));
        this.checkInForm.checkinDays = 0;
        return;
      } else {
        var date = new Date(this.checkInForm.checkinTime);
        date.setDate(date.getDate() + e);
        this.checkInForm.checkoutTime = date.Format("yyyy-MM-dd HH:mm:ss");
      }
    },
    endTimeChange(e) {
      let day = 0;
      if (this.checkInForm.checkinTime != "") {
        day = getDaysBetween(
          new Date(this.checkInForm.checkinTime).Format("yyyy-MM-dd"),
          new Date(this.checkInForm.checkoutTime).Format("yyyy-MM-dd")
        );
        this.checkInForm.checkinDays = day;
      }
    },
    // 点击查询按钮
    onSubmit() {
      this.getInfoList();
    },
    handleChange(value) {
      console.log(value);
    },
    handleEdit() {
      this.dialogFormVisible = true;
    },
  },
};
</script>
<style lang="less"  scoped>
.rooms {
  margin-right: 10px;
  margin-bottom: 10px;
}

.rooms .grid-cell {
  border: 1px solid #eee;
  border-radius: 5px;
}

.rooms .grid-cell:active {
  background: #e3eeff;
  border-color: #126eff;
}

.rooms .grid-cell .wrap {
  padding: 10px 5px;
}

.rooms .grid-cell .wrap .row:last-child {
  margin-top: 10px;
}

.rooms .grid-cell .wrap em {
  font-style: normal;
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
  margin-left: 5px;
}

.roomSelect {
  background: #f6f7f7;
}

.roomSelect ul li .rooms {
  margin: 0;
}

.roomSelect ul li .rooms .grid-cell {
  border: 0;
}

.roomSelect ul {
  padding: 0 20px;
}

.roomSelect ul li {
  border-bottom: 1px solid #d7d7d7;
  padding: 10px 0;
}

.roomSelect ul li:last-child {
  border-bottom: 0;
}
</style>
