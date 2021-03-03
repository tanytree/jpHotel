<template>
  <div>
    <el-row :gutter="20" v-if="tab1_show">
      <el-row>
        <el-form class="demo-form-inline" inline size="small">
          <el-form-item :label="$t('manager.grsl_selectTime')+':'">
            <el-date-picker v-model="ruleForm.date" value-format="yyyy-MM-dd" align="right" type="date" :placeholder="$t('commons.selectDate')" :picker-options="pickerOptions" @blur="get_hotel_price_room_type_list"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-col>
              <el-button type="text" @click="beforeTap" style="margin-left: 20px;">
                &lt;&lt; {{$t('manager.add_lsat15')}}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col>
              <el-button type="text" @click="afterTap">{{$t('manager.add_next15')}} &gt;&gt;</el-button>
            </el-col>
          </el-form-item>
          <el-form-item class="form-inline-flex">
            <el-row style="margin-right: -10px;">
              <el-button type="primary" @click="popup('adjust')" style="width: 100px;" size="mini">{{$t('manager.ps_bulkPrice')}}</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-row>
      <div style="margin:-10px 0 10px">{{$t('manager.pa_explain')}}</div>
      <div class="components-edit member-price" v-loading="loading">
        <el-table :data="memberTypeList" style="width: 100%;margin-bottom: 20px;" row-key="id2" :default-expand-all="false" header-row-class-name="default" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" border>
          <el-table-column v-for="(item, index) in dateList" :key="index" :label="item.dateStr + '\n' + F_weekday(item.weekDay)" :width="index== 0? '160': '106'">
            <template slot-scope="scope">
              <div v-if="index == 0">
                <span>{{scope.row.name || scope.row.houseName}}</span>
              </div>
              <div v-if="index > 0">
                <span>
                  {{getDateP(scope.row, scope.$index, item, index)}}
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>

    <el-row v-if="!tab1_show">
      <el-row style="padding: 20px 0px;">
        <el-page-header @back="back_1" content></el-page-header>
      </el-row>
      <el-row :gutter="20">
        <el-form :model="batchEditPriceForm" :rules="bathEditRules" ref="ruleForm" label-width="100px">
          <el-col :span="20">
            <el-form-item :label="$t('desk.customer_memType')" prop="memberTypeId">
              <el-row style="display: flex;align-items: center;">
                <el-checkbox-group v-model="batchEditPriceForm.memberTypeId" @change="handleMemberChange">
                  <el-checkbox v-for="(item) in selectedRoomtype" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-row>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item :label="$t('manager.grsl_selectTime')" prop="time">
              <el-date-picker v-model="batchEditPriceForm.time" type="daterange" align="right" value-format="yyyy-MM-dd" :picker-options="expireTimeOption" unlink-panels :range-separator="$t('boss.report_toText')" :start-placeholder="$t('manager.ps_startDate')" :end-placeholder="$t('manager.ps_endDate')"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-table ref="multipleTable" :data="allRoomTypeList" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
        <el-table-column prop="houseName" :label="$t('desk.home_roomType')"></el-table-column>
        <el-table-column :label="$t('manager.grsl_doorPri')">
          <template slot-scope="{row}">
            <el-row class="demo-form-inline" v-if="row.roomType == 1">
              <span>
                <el-col>{{$F.numFormate(row.oldOnePrice)}}</el-col>
              </span>
            </el-row>
            <el-row class="demo-form-inline" v-else>
              <span>
                <el-col>{{$F.numFormate(row.oldMarketPrice)}}</el-col>
              </span>
            </el-row>
          </template>
        </el-table-column>

        <!-- 这是输入的住宿价,目的是为了会员享有一定的优惠,这里只展示一人住宿价 -->
        <el-table-column prop="name" :label="$t('manager.grsl_newLivePriA')">
          <template slot-scope="{row}">
            <el-row class="demo-form-inline" v-if="row.roomType == 1">
              <span>
                <el-input v-model.number="row.newLivePrice" style="width: 140px;margin: 0px 15px;"></el-input>
                {{$t('manager.ps_japanYen')}}
              </span>
            </el-row>
            <el-row class="demo-form-inline" v-else>
              <span>
                <el-input v-model.number="row.newMarketPrice" style="width: 140px;margin: 0px 15px;"></el-input>
                {{$t('manager.ps_japanYen')}}
              </span>
            </el-row>
          </template>
        </el-table-column>
        <!-- 这里是前面输入的一人住宿价+早餐+晚餐的总价,如果前面没有输入的话,先展示早餐+晚餐的价格(附餐价) -->
        <el-table-column :label="$t('manager.grsl_resetSoon')">
          <template slot-scope="{row}">
            {{$F.numFormate(row.adjustPrice)}}
          </template>
        </el-table-column>
      </el-table>
      <el-row style="padding: 20px 0px;">
        <el-button type="primary" style="width: 80px;" @click="onSave">{{$t('commons.save')}}</el-button>
        <el-button style="width: 80px;margin-left: 20px; cursor: pointer" @click="back_1">
          {{$t('commons.back')}}</el-button>
      </el-row>
    </el-row>

    <!-- ===================修改单价==================================== -->
    <el-dialog top="0" :title="$t('manager.ps_resetRoomPrice')" :visible.sync="editPriceDialog" :close-on-click-modal="false" width="80%" class="editPriceDialog">
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :span="3">{{$t('manager.add_nowTime')}}: </el-col>
        <el-col :span="16">{{editPriceForm.dayTime}}</el-col>
      </el-row>
      <el-table ref="multipleTable" :data="ruleForm_Pie" tooltip-effect="dark" default-expand-all header-row-class-name="default">
        <el-table-column prop="houseName" :label="$t('manager.hp_room')"></el-table-column>
        <el-table-column prop="personNum" :label="$t('manager.add_onePrice')" v-if="ruleForm.roomType == 1">
          <template>
            <div>
              <div style="padding: 10px 0px;">
                <span>{{roomStrategyJson_p[0].customPrice}}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="newCustomPrice" :label="$t('manager.grsl_newLivePriA')" width="250">
          <template>
            <div style="padding: 10px 0px;" v-for="(value, index) in roomStrategyJson_p" :key="index">
              <el-input v-model="value.newCustomPrice" :placeholder="$t('commons.pleaseEnter')" @input="onInput()"></el-input>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="name" :label="$t('desk.attachedMeal')" v-if="ruleForm.roomType == 1">
          <template slot-scope="scope">
            <el-row v-if="ruleForm.roomType==1">
              <el-row class="demo-form-inline">
                <el-col>{{$t('manager.hk_breakfast')}} [{{scope.row.mealBreakfastObject.mealName}} :
                  {{scope.row.mealBreakfastObject && scope.row.mealBreakfastObject.mealPrice}}]</el-col>
              </el-row>
              <el-row class="demo-form-inline">
                <el-col>{{$t('manager.hk_dinner')}} [{{scope.row.mealDinnerObject.mealName}} :
                  {{scope.row.mealDinnerObject && scope.row.mealDinnerObject.mealPrice}}]</el-col>
              </el-row>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPriceDialog = false">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" @click="editPriceSubmit" v-loading="loading">{{$t('commons.determine')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import myMixin from "@/utils/filterMixin";
export default {
  mixins: [myMixin],
  data() {
    return {
      memberTypeLength: 0,
      star_time: "", // 列表查询的开始时间
      sel_roomTypeId: "",
      sel_memberTypeId: "", // 选中的第三级会员id
      dateList: [],
      dayPriceList: [],
      memberTypeList: [],
      roomTypeList: [], //全部房型
      selectedRoomtype: [], // 批量调价中的会员类型
      allRoomTypeList: [], //全部房型(包括会议厅类型)
      ruleForm_Pie: [], // 单独修改价格的tabble
      roomStrategyJson_p: [],
      newCustomPrice: "",
      all: [],
      tab1_show: true,
      value: "",
      checkbox_value_pie: "", // 会员类型多选
      batchEditPriceForm: {
        time: "", //开始日期跟结束日期在一起
        memberTypeId: [], //会员类型id  String必填 多个用半角","分割
        // channel: "线下",
        startTime: "",
        endTime: "",
        weeks: [],
        roomStrategyJson: [],
      },
      ruleForm: {
        date: new Date().Format("yyyy-MM-dd"),
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      loading: false,
      editPriceDialog: false, //修改房价dialog
      editPriceForm: {
        priceCalend: "", //1会员日历单日定价 2单位日历单日定价 3客房单日价格  4会议厅单日价
        roomTypeId: "",
        dayTime: "",
        newLivePrice: "",
      },
      expireTimeOption: {
        disabledDate(date) {
          //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },

  mounted() {
    this.get_hotel_price_room_type_list();
  },
  computed: {
    bathEditRules() {
      return {
        memberTypeId: [
          {
            required: true,
            message: this.$t("desk.customer_chooseMemType"),
            trigger: "blur",
          },
        ],
        time: [
          {
            required: true,
            message: this.$t("manager.add_chooseTime"),
            trigger: "blur",
          },
        ],
      };
    },
  },
  watch: {
    //监听 newLivePrice 变化时 adjustPrice 的改变
    allRoomTypeList: {
      handler(newValue, oldValue) {
        this.allRoomTypeList.forEach((a, b) => {
          //
          if (a.roomType == 1) {
            //
            a.adjustPrice =
              Number(a.newLivePrice) +
              Number(
                a.mealBreakfastObject && (a.mealBreakfastObject.mealPrice || 0)
              ) +
              Number(a.mealDinnerObject.mealPrice || 0);
          } else {
            a.adjustPrice = Number(a.newMarketPrice || 0);
          }
        });
      },
      deep: true,
    },
  },
  created() {
    this.star_time = this.ruleForm.date;
  },
  methods: {
    onInput() {
      this.$forceUpdate();
    },
    // 前15天
    beforeTap() {
      console.log(this.ruleForm.date);
      this.star_time = this.getBeforeDate(15, this.ruleForm.date);
      this.ruleForm.date = this.star_time;
      this.get_hotel_price_room_type_list();
    },
    // 后15天
    afterTap() {
      console.log(this.ruleForm.date);
      this.star_time = this.getBeforeDate(-15, this.ruleForm.date);
      this.ruleForm.date = this.star_time;
      this.get_hotel_price_room_type_list();
    },
    // 获取当前日期前后多少天的日期，之前多少天传正数，后面多少天传负数，今天传0，
    //  num为传入的数字， time为传入的指定日期，如果time不传，则默认为当前时间
    getBeforeDate(num, time) {
      // debugger
      let n = num;
      let d = "";
      if (time) {
        d = new Date(time);
      } else {
        d = new Date();
      }
      let year = d.getFullYear();
      let mon = d.getMonth() + 1;
      let day = d.getDate();
      if (day <= n) {
        if (mon > 1) {
          mon = mon - 1;
        } else {
          year = year - 1;
          mon = 12;
        }
      }
      d.setDate(d.getDate() - n);
      year = d.getFullYear();
      mon = d.getMonth() + 1;
      day = d.getDate();
      let s =
        year +
        "-" +
        (mon < 10 ? "0" + mon : mon) +
        "-" +
        (day < 10 ? "0" + day : day);
      return s;
    },
    // 客房部操作数据
    getDateP(row, topIndex, item, index) {
      let tempPrice = 0;
      let price = 0;
      let finalIndex = topIndex % this.memberTypeLength;
      if (finalIndex == 0) {
        return "";
      }
      if (topIndex == 5) {
      }
      let memberTypeObject = this.memberTypeList[row.topIndex];
      if (memberTypeObject) {
        if (this.dayPriceList && this.dayPriceList.length > 0) {
          let newArray = this.dayPriceList.filter((dayPrice) => {
            return dayPrice.dayTime == item.dateStr;
          }); //匹配日期
          let newRoomTypeId = newArray.filter((dayPrice) => {
            // debugger
            return (
              dayPrice.memberTypeId == memberTypeObject.id &&
              dayPrice.roomTypeId == row.id
            );
          }); //匹配第三级会员id  和 匹配房型id
          if (newRoomTypeId && newRoomTypeId.length > 0) {
            // debugger
            newRoomTypeId.forEach((temp) => {
              tempPrice = temp.newLivePrice;
            });
          }
        }
        finalIndex -= 1;
        if (item.roomTypePrises[finalIndex]) {
          if (item.roomTypePrises[finalIndex].personPrice && !tempPrice) {
            tempPrice = parseInt(
              item.roomTypePrises[finalIndex].personPrice.split(",")[0]
            );
          }

          price =
            tempPrice +
            (item.roomTypePrises[finalIndex].mealBreakfastObject
              ? item.roomTypePrises[finalIndex].mealBreakfastObject.mealPrice
              : 0) +
            (item.roomTypePrises[finalIndex].mealDinnerObject
              ? item.roomTypePrises[finalIndex].mealDinnerObject.mealPrice
              : 0);
        }
      }

      return "￥" + this.$F.numFormate(price);
    },

    //保存批量修改房价
    onSave() {
      let params = {};
      params.channel = this.batchEditPriceForm.channel;
      params.startTime = this.batchEditPriceForm.time[0];
      params.endTime = this.batchEditPriceForm.time[1];
      params.memberTypeId = this.checkbox_value_pie;
      params.channel = "线下";

      params.weeks = "1,2,3,4,5,6,7";

      let obj = {};
      let arr = [];
      this.allRoomTypeList.forEach((a, b) => {
        obj = {};
        obj.roomTypeId = a.id;

        if (a.roomType == 1) {
          obj.marketPrice = "";
          obj.adjustPrice =
            Number(a.adjustPrice || 0) + Number(a.newLivePrice || 0);
          obj.newLivePrice = Number(a.newLivePrice || 0);
        } else {
          obj.newLivePrice = "";
          obj.adjustPrice = "";
          obj.marketPrice = a.newMarketPrice;
        }
        arr[b] = obj;
      });
      params.roomStrategyJson = JSON.stringify(arr);
      //
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_price_member_strategy_save",
        params,
        (res) => {
          this.$message.success("Save success");
          setTimeout((e) => {
            this.tab1_show = true;
            this.selectedRoomtype = [];
            this.get_hotel_price_room_type_list();
          });
        }
      );
    },
    //选择会员类型复选框事件
    handleMemberChange(value) {
      this.checkbox_value_pie = value.join(",");
    },
    //确认修改单价
    editPriceSubmit() {
      // * @param priceCalend  修改定价位置 1会员日历单日定价 2单位日历单日定价 int必填
      // * @param roomTypeId   房屋类型表id String必填
      // * @param memberTypeId 会员类型id priceCalend=1必填 String选填
      // * @param dayTime      当前时间 yyyy-MM-dd格式 String必填
      // * @param strategyId   单位策略规则id priceCalend=1必填 String必填
      // * @param strategyJson 房型调价策略    注意：为body参数 String 必填
      // *                         eg:[{"personNum":"1","customPrice":200,"newCustomPrice":1}]
      // *                         personNum  人数  int必填
      // *                         customPrice  住宿价格  double必填
      // *                         newCustomPrice 调价后价格  double必填
      // * strategyJson组装参数：通过获取房型详情可以获得人数和住宿价格、早晚餐三个对象，然后根据住宿价格进行拆分分组（通过“,”切分，就变成了多行数据展示）
      console.log(this.editPriceForm);
      var params = {
        priceCalend: 1,
        roomTypeId: this.sel_roomTypeId,
        dayTime: this.editPriceForm.dayTime,
        memberTypeId: this.sel_memberTypeId,
        strategyId: "111",
        newLivePrice: this.roomStrategyJson_p[0].newCustomPrice,
      };
      let strategyJson_arr = [];
      strategyJson_arr.push(this.roomStrategyJson_p[0]);
      params.strategyJson = JSON.stringify(strategyJson_arr);
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_room_day_price_save",
        params,
        (res) => {
          this.editPriceDialog = false;
          this.memberTypeList = [];
          this.dateList = [];
          this.get_hotel_price_room_type_list();
          this.$message.success("success");
        }
      );
    },

    // 会员 价格策略单位列表
    get_hotel_price_room_type_list() {
      let params = {
        strategyTime: this.ruleForm.date || this.star_time,
        priceCalend: 1, // 检索类型 1会员价格日历 2单位价格日历
        timeType: 2, // 检索类型 1会员价格日历 2单位价格日历
      };
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_price_room_type_list",
        params,
        (res) => {
          this.memberTypeList = [];
          this.dayPriceList = res.dayPriceList;
          this.dateList = res.dateList;
          this.dateList.unshift({
            dateStr: this.$t("manager.add_tyepApri"),
            weekDay: "",
          });
          let i = 0;
          res.memberTypeList.forEach((member1, member1Index) => {
            member1.roomTypeList.forEach((m4, m4Index) => {
              i += m4Index;
              m4.id2 = m4.id + i;
            });
            member1.memberTypeList.forEach((member2, member2Index) => {
              member2.memberTypeList.forEach((member3, member2Index) => {
                i += member2Index;
                member3.id2 = member3.id + i;
                this.memberTypeList.push(member3);
                this.memberTypeList.forEach((member4, member4Index) => {
                  this.memberTypeLength = member1.roomTypeList.length + 1;
                  member4.children = member1.roomTypeList;
                  this.dateList.forEach((dat, datIndex) => {
                    dat.roomTypePrises = member1.roomTypeList;
                  });
                });
              });
            });
          });
          this.memberTypeList.forEach((memberType, topIndex) => {
            memberType.topIndex = topIndex;
            let array = this.$F.deepClone(memberType);
            array.children.forEach((item, secondIndex) => {
              item.topIndex = topIndex;
            });
            this.memberTypeList[topIndex] = array;
           
          });
     
          this.$forceUpdate();
        }
      );
    },
    // 获取全部房型列表
    get_hotel_room_type_list() {
      let params = {
        pageIndex: 1,
        pageSize: 999,
        // roomType: 3, // 1客房类型  2会议室房型 3全部
        roomType: 1, // 1客房类型  2会议室房型 3全部
      };
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_room_type_list",
        params,
        (res) => {
          this.allRoomTypeList = [];
          let obj = {};
          res.list.forEach((value, index) => {
            obj = {};
            obj.id = value.id;
            obj.roomTypeId = value.id;
            obj.roomType = value.roomType;
            obj.houseName = value.houseName;

            if (value.roomType == 1) {
              //
              obj.marketPrice = "";
              obj.newLivePrice = "";
              obj.mealBreakfastObject = value.mealBreakfastObject;
              obj.mealDinnerObject = value.mealDinnerObject;

              if (
                value.personPrice !== "" &&
                value.personPrice !== undefined &&
                value.personPrice !== null
              ) {
                let arr = value.personPrice.split(",");
                let arry = arr.filter(function (el) {
                  return el !== "";
                });
                obj.oldOnePrice =
                  Number(arr[0]) +
                  Number(value.mealBreakfastObject.mealPrice || 0) +
                  Number(value.mealDinnerObject.mealPrice || 0);
                obj.adjustPrice =
                  Number(value.newLivePrice || 0) +
                  Number(value.mealBreakfastObject.mealPrice || 0) +
                  Number(value.mealDinnerObject.mealPrice || 0); //新价格
              }
            } else {
              obj.oldMarketPrice = value.marketPrice;
              obj.marketPrice = value.marketPrice;
              obj.newMarketPrice = "";
              obj.newLivePrice = "";
              obj.adjustPrice = obj.oldMarketPrice;
            }
            this.allRoomTypeList.push(obj);
          });

        }
      );
    },
    popup(type, row, item) {
      // debugger
      switch (type) {
        case "adjust":
          this.tab1_show = false;
         
          this.selectedRoomtype = this.memberTypeList;
          this.get_hotel_room_type_list();
          break;
        case "single":
          this.dialogDetail = true;
          break;
      }
    },
    back_1() {
      this.tab1_show = true;
      this.selectedRoomtype = [];
      this.get_hotel_price_room_type_list();
    },
  },
};
</script>

<style lang="less">
.editPriceDialog .tip {
  font-size: 12px;
  color: #b1b1b1;
}

.row-width {
  width: 120px;
}

.padding-item {
  padding-bottom: 5px;
}

.btn-click {
  height: 200px;
  width: 300px;
  background: #e5e5e5;
  // background-color: linear-gradient(toright, #e5e5e5, #e5e5e5);
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    font-size: 30px;
  }

  span {
    font-size: 20px;
    color: #666666;
    margin-left: 10px;
  }
}

.btn-click:hover {
  height: 200px;
  width: 300px;
  background: #4db8ff;
  // background: linear-gradient(toright, #4db8ff, #1aa3ff);
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    font-size: 30px;
    color: #fff;
  }

  span {
    font-size: 20px;
    color: #fff;
    margin-left: 10px;
  }
}

.el-table .cell {
  display: flex;
}
</style>
