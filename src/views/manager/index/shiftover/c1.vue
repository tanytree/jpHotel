<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-27 12:10:11
 * @FilePath: \jiudian\src\views\manager\index\shiftover\c1.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div class="shiftOver">
    <el-row>
      <el-button v-for="(item,index) in tabs" :key="index" :type="tabCurr == item.handoverType ? 'primary' : ''" @click="changeTabs(item.handoverType)">
        {{$t('manager.typeNameList.'+item.handoverType)}}
      </el-button>
    </el-row>
    <el-row style="padding-top: 20px;">
      <h3>{{$t('food.shift.tabs_title_A')}}</h3>
      <el-row>
        <el-col :span="12">
          <div class="item">
            {{$t('food.shift.tabs_time_1')}}：{{info.workStarTime}} {{$t('food.shift.to')}} {{info.workEndTime}}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="item">{{$t('food.shift.tabs_num')}}：{{info.handoveNum}}</div>
        </el-col>
        <el-col :span="12">
          <div class="item">{{$t('food.shift.acter')}}：{{account}}</div>
        </el-col>

      </el-row>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <h3>{{$t('food.shift.tabs_title_2')}}</h3>
      <div class="total">{{$t('manager.hk_constTotal')}}￥：{{$F.numFormate(info.income)}}{{$t('manager.ps_japanYen')}}</div>
      <el-row class="padding-tb-10">
        <!-- tabCurr 1前台部 2餐饮部 3商店部 -->
        <!-- 前台部 -->
        <div v-if="tabCurr == 1" class="flexBox">
          <div>{{$t("manager.deskTab['0']")}}：<span style="color:red">{{$F.numFormate(info.nroomPrice)}}</span>{{$t('manager.ps_japanYen')}}</div>
          <div>{{$t("manager.deskTab['1']")}}：<span style="color:red">{{$F.numFormate(info.nattachMealPrice)}}</span>{{$t('manager.ps_japanYen')}}</div>
          <div>{{$t("manager.deskTab['2']")}}：<span style="color:red">{{$F.numFormate(info.nmeetingPrice)}}</span>{{$t('manager.ps_japanYen')}}</div>
          <div>{{$t("manager.deskTab['3']")}}：<span style="color:red">{{$F.numFormate(info.nlittleShopPrice)}}</span>{{$t('manager.ps_japanYen')}}</div>
          <div>{{$t("manager.deskTab['4']")}}：<span style="color:red">{{$F.numFormate(info.nOtherPrice)}}</span>{{$t('manager.ps_japanYen')}}</div>
          <div>{{$t("manager.deskTab['5']")}}：<span style="color:red">{{$F.numFormate(info.ndishesPrice)}}</span>{{$t('manager.ps_japanYen')}}</div>
          <div>{{$t("manager.deskTab['6']")}}：<span style="color:red">{{$F.numFormate(info.ngoodsPrice)}}</span>{{$t('manager.ps_japanYen')}}</div>
        </div>
        <!-- 餐饮部 -->
        <div v-if="tabCurr == 2" class="flexBox">
          <div>{{$t("manager.deskTab['1']")}}：<span style="color:red">{{$F.numFormate(info.nattachMealPrice)}}</span>{{$t('manager.ps_japanYen')}}</div>
          <div>{{$t('desk.serve_foodPriceA')}}：<span style="color:red">{{$F.numFormate(info.ndishesPrice)}}</span>{{$t('manager.ps_japanYen')}}</div>
        </div>
        <!-- 商店部 -->
        <div v-if="tabCurr == 3" class="flexBox">
          <div v-for="(item,index) in info.sellingList" :key="index">{{item.sellingName+':'}}<span style="color:red">{{$F.numFormate(item.totalPrice)}}</span>{{$t('manager.ps_japanYen')}}</div>
          <div>{{$t("manager.deskTab['3']")}}：<span style="color:red">{{$F.numFormate(info.nlittleShopPrice)}}</span>{{$t('manager.ps_japanYen')}}</div>
        </div>
      </el-row>
      <div class="total">{{$t('food.reset.totalFee')}}￥：{{$F.numFormate(info.settlement)}}{{$t('manager.ps_japanYen')}}</div>
      <el-row class="padding-tb-10">
        <!-- tabCurr 1前台部 2餐饮部 3商店部 -->
        <div v-if="tabCurr==1" class="father">
          <el-col :span="4">
            <div class="item">
              {{$t('desk.charge')}}：<span class="blue">{{$F.numFormate(info.nuploadPrice)}}</span>{{$t('manager.ps_japanYen')}} <a @mouseenter="requestData()" class="el-icon-question AAA" style="color: #126EFF; cursor: pointer;"></a>
              <div class="son">
                <div v-for="(item,index) in billList" :key="index">{{$t(`commons.paymentWay[${item.putUp}]`)}}：￥{{$F.numFormate(item.totalPrice)}}</div>
              </div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item">
              {{$t('manager.add_nowCashGetA')}}：<span class="blue">{{$F.numFormate(info.nmoneyPrice)}}</span>{{$t('manager.ps_japanYen')}}
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item">
              {{$t('manager.add_nowCardGetA')}}：<span class="blue">{{$F.numFormate(info.ncardPrice)}}</span>{{$t('manager.ps_japanYen')}}
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item">
              {{$t('desk.add_otherGetA')}}：<span class="blue">{{$F.numFormate(info.npayOtherPrice)}}</span>{{$t('manager.ps_japanYen')}}
            </div>
          </el-col>
           <el-col :span="5">
            <div class="item">
              {{$t('manager.add_nowPayments')}}：<span class="blue">{{$F.numFormate(info.npayOtherPrice)}}</span>{{$t('manager.ps_japanYen')}}
            </div>
          </el-col>
        </div>
        <div v-if="tabCurr!=1">
          <el-col :span="4">
            <div class="item">{{tabCurr==2?$t('manager.add_nowBillGetA'):$t('manager.add_nowBillGetB')}}：<span style="color:#126eff">{{$F.numFormate(info.nuploadPrice)}}{{$t('manager.ps_japanYen')}}</span></div>
          </el-col>
          <el-col :span="5">
            <div class="item">{{$t('manager.add_nowCashGetA')}}：<span style="color:#126eff">{{$F.numFormate(info.nmoneyPrice)}}{{$t('manager.ps_japanYen')}}</span></div>
          </el-col>
          <el-col :span="5">
            <div class="item">{{$t('manager.add_nowCardGetA')}}：<span style="color:#126eff">{{$F.numFormate(info.ncardPrice)}}{{$t('manager.ps_japanYen')}}</span></div>
          </el-col>
          <el-col :span="5">
            <div class="item">{{$t('desk.add_otherGetA')}}：<span style="color:#126eff">{{$F.numFormate(info.npayOtherPrice)}}{{$t('manager.ps_japanYen')}}</span></div>
          </el-col>
           <el-col :span="5">
            <div class="item">
            {{$t('manager.add_nowPayments')}}：<span class="blue">{{$F.numFormate(info.npayOtherPrice)}}</span>{{$t('manager.ps_japanYen')}}
            </div>
          </el-col>
        </div>
      </el-row>
    </el-row>
    <el-row>
      <h3>
        {{$t('manager.add_nowGet')}}
      </h3>
      <div class="handInCash margin-tb-10">
        <el-row class="padding-tb-10">
          <el-col :span="6" class="li">
            <div class="item">{{$t('manager.add_pettyCash')}}={{$F.numFormate(info.pettyCash)}}</div>
          </el-col>
          <el-col :span="6" class="li">
            <div class="item">{{$t('manager.add_lastHold')}}：{{$F.numFormate(info.pettyCash)}}</div>
          </el-col>
          <el-col :span="6" class="li">
            <div class="item">{{$t('manager.add_nowDownPri')}}：{{$F.numFormate(info.pettyCash)}}</div>
          </el-col>
        </el-row>
      </div>
      <div class="item">{{$t('desk.home_note')}}：<el-input type="textarea" v-model="remark"></el-input>
      </div>
    </el-row>

    <el-row style="text-align: center;margin-top: 20px;">
      <el-divider></el-divider>
      <el-form inline label-width="150px" ref="form" style="padding-top: 30px;" :model="form" :rules="rules">
        <el-form-item :label="$t('food.shift.selectOnDutyerA')" prop="handoveEmployeedId">
          <el-select v-model="form.handoveEmployeedId">
            <el-option v-for="item in filterEmployeeList" :key="item.id" :label="item.userName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('food.shift.password')" prop="password">
          <el-input type="password" v-model="form.password" :placeholder="$t('food.shift.password')"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="sureButton('form')">{{ $t('commons.confirm') }}</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- 现金统计dialog -->
    <el-dialog :title="$t('manager.add_cashStatistics')" :visible.sync="dialogVisible" width="80%" top="0">
      <div class="dialog_top">{{$t('desk.serve_systemInA')}}：￥<span>{{$F.numFormate(info.nmoneyPrice)}}</span>{{$t('manager.ps_japanYen')}}</div>
      <div>
        <el-row>
          <el-col :span="8">
            <el-checkbox @change="changeList('myriadNuber',checkBox.checked_one)" v-model="checkBox.checked_one">{{$t('desk.money.myriadNuber')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange('myriadNuber')" v-model="getMoney.myriadNuber" :disabled='checkBox.checked_one?false:true' size="small">
              <template slot="append">{{$t('desk.serve_zhang')}}</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-checkbox @change="changeList('fiveHundred',checkBox.checked_nine)" v-model="checkBox.checked_nine">{{$t('desk.money.fiveHundred')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange('fiveHundred')" v-model="getMoney.fiveHundred" :disabled='checkBox.checked_nine?false:true' size="small">
              <template slot="append">{{$t('desk.serve_ge')}}</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-checkbox @change="changeList('ten',checkBox.checked_six)" v-model="checkBox.checked_six">{{$t('desk.money.ten')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange('ten')" v-model="getMoney.ten" :disabled='checkBox.checked_six?false:true' size="small">
              <template slot="append">{{$t('desk.serve_ge')}}</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-checkbox @change="changeList('fiveThousand',checkBox.checked_three)" v-model="checkBox.checked_three">{{$t('desk.money.fiveThousand')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange('fiveThousand')" v-model="getMoney.fiveThousand" :disabled='checkBox.checked_three?false:true' size="small">
              <template slot="append">{{$t('desk.serve_zhang')}}</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-checkbox @change="changeList('oneHundred',checkBox.checked_two)" v-model="checkBox.checked_two">{{$t('desk.money.oneHundred')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange('oneHundred')" v-model="getMoney.oneHundred" :disabled='checkBox.checked_two?false:true' size="small">
              <template slot="append">{{$t('desk.serve_ge')}}</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-checkbox @change="changeList('five',checkBox.checked_eight)" v-model="checkBox.checked_eight">{{$t('desk.money.five')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange('five')" v-model="getMoney.five" :disabled='checkBox.checked_eight?false:true' size="small">
              <template slot="append">{{$t('desk.serve_ge')}}</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-checkbox @change="changeList('oneThousand',checkBox.checked_seven)" v-model="checkBox.checked_seven">{{$t('desk.money.oneThousand')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange('oneThousand')" v-model="getMoney.oneThousand" :disabled='checkBox.checked_seven?false:true' size="small">
              <template slot="append">{{$t('desk.serve_zhang')}}</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-checkbox @change="changeList('fifty',checkBox.checked_four)" v-model="checkBox.checked_four">{{$t('desk.money.fifty')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange('fifty')" v-model="getMoney.fifty" :disabled='checkBox.checked_four?false:true' size="small">
              <template slot="append">{{$t('desk.serve_ge')}}</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-checkbox @change="changeList('one',checkBox.checked_ten)" v-model="checkBox.checked_ten">{{$t('desk.money.one')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange('one')" v-model="getMoney.one" :disabled='checkBox.checked_ten?false:true' size="small">
              <template slot="append">{{$t('desk.serve_ge')}}</template>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="contentBox">{{$t('desk.customer_banlance')}} = <span>{{$F.numFormate(checkget_Balance)}}</span>{{$t('desk.customer_banJi')}}</div>
      <!-- 上面选框 -->
      <el-divider></el-divider>
      <!-- 下面选框 -->
      <div class="dialog_top" style="margin-top:20px">{{$t('manager.add_nowDownPriA')}}：￥<span>{{$F.numFormate(info.nowMoneyRetained)}}</span>{{$t('manager.ps_japanYen')}}</div>
      <div>
        <el-row>
          <el-col :span="8">
            <el-checkbox @change="changeList_down('myriadNuber',checkBox2.checked_one)" v-model="checkBox2.checked_one">{{$t('desk.money.myriadNuber')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('myriadNuber')" v-model="putDown.myriadNuber" :disabled='checkBox2.checked_one?false:true' size="small">
              <template slot="append">{{$t('desk.serve_zhang')}}</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-checkbox @change="changeList_down('fiveHundred',checkBox2.checked_nine)" v-model="checkBox2.checked_nine">{{$t('desk.money.fiveHundred')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('fiveHundred')" v-model="putDown.fiveHundred" :disabled='checkBox2.checked_nine?false:true' size="small">
              <template slot="append">{{$t('desk.serve_ge')}}</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-checkbox @change="changeList_down('ten',checkBox2.checked_six)" v-model="checkBox2.checked_six">{{$t('desk.money.ten')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('ten')" v-model="putDown.ten" :disabled='checkBox2.checked_six?false:true' size="small">
              <template slot="append">{{$t('desk.serve_ge')}}</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-checkbox @change="changeList_down('fiveThousand',checkBox2.checked_three)" v-model="checkBox2.checked_three">{{$t('desk.money.fiveThousand')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('fiveThousand')" v-model="putDown.fiveThousand" :disabled='checkBox2.checked_three?false:true' size="small">
              <template slot="append">{{$t('desk.serve_zhang')}}</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-checkbox @change="changeList_down('oneHundred',checkBox2.checked_two)" v-model="checkBox2.checked_two">{{$t('desk.money.oneHundred')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('oneHundred')" v-model="putDown.oneHundred" :disabled='checkBox2.checked_two?false:true' size="small">
              <template slot="append">{{$t('desk.serve_ge')}}</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-checkbox @change="changeList_down('five',checkBox2.checked_eight)" v-model="checkBox2.checked_eight">{{$t('desk.money.five')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('five')" v-model="putDown.five" :disabled='checkBox2.checked_eight?false:true' size="small">
              <template slot="append">{{$t('desk.serve_ge')}}</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-checkbox @change="changeList_down('oneThousand',checkBox2.checked_seven)" v-model="checkBox2.checked_seven">{{$t('desk.money.oneThousand')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('oneThousand')" v-model="putDown.oneThousand" :disabled='checkBox2.checked_seven?false:true' size="small">
              <template slot="append">{{$t('desk.serve_zhang')}}</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-checkbox @change="changeList_down('fifty',checkBox2.checked_four)" v-model="checkBox2.checked_four">{{$t('desk.money.fifty')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('fifty')" v-model="putDown.fifty" :disabled='checkBox2.checked_four?false:true' size="small">
              <template slot="append">{{$t('desk.serve_ge')}}</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-checkbox @change="changeList_down('one',checkBox2.checked_ten)" v-model="checkBox2.checked_ten">{{$t('desk.money.one')}}</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('one')" v-model="putDown.one" :disabled='checkBox2.checked_ten?false:true' size="small">
              <template slot="append">{{$t('desk.serve_ge')}}</template>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="contentBox">{{$t('desk.customer_banlance')}} = <span>{{$F.numFormate(checkput_Balance)}}</span> {{$t('desk.customer_banJiA')}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelClick">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" @click="save">{{$t('commons.determine')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["tabs", "employeeList"],
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),
    rules() {
      return {
        handoveEmployeedId: [
          {
            required: true,
            message: this.$t("commons.placeChoose"),
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: this.$t("login.passwordEnterTip"),
            trigger: "blur",
          },
        ],
      };
    },
    checkget_Balance() {
      this.totalMoney = 0;
      for (let i in this.getMoney) {
        if (this.getMoney[i] > 0) {
          switch (i) {
            case "myriadNuber":
              this.totalMoney += this.getMoney[i] * 10000;
              break;
            case "oneHundred":
              this.totalMoney += this.getMoney[i] * 100;
              break;
            case "fiveThousand":
              this.totalMoney += this.getMoney[i] * 5000;
              break;
            case "fifty":
              this.totalMoney += this.getMoney[i] * 50;
              break;
            case "ten":
              this.totalMoney += this.getMoney[i] * 10;
              break;
            case "oneThousand":
              this.totalMoney += this.getMoney[i] * 1000;
              break;
            case "five":
              this.totalMoney += this.getMoney[i] * 5;
              break;
            case "fiveHundred":
              this.totalMoney += this.getMoney[i] * 500;
              break;
            case "one":
              this.totalMoney += this.getMoney[i] * 1;
              break;
          }
        }
      }
      return this.totalMoney - this.info.nmoneyPrice;
    },
    checkput_Balance() {
      this.totalMoney_putDown = 0;
      for (let i in this.putDown) {
        if (this.putDown[i] > 0) {
          switch (i) {
            case "myriadNuber":
              this.totalMoney_putDown += this.putDown[i] * 10000;
              break;
            case "oneHundred":
              this.totalMoney_putDown += this.putDown[i] * 100;
              break;
            case "fiveThousand":
              this.totalMoney_putDown += this.putDown[i] * 5000;
              break;
            case "fifty":
              this.totalMoney_putDown += this.putDown[i] * 50;
              break;
            case "ten":
              this.totalMoney_putDown += this.putDown[i] * 10;
              break;
            case "oneThousand":
              this.totalMoney_putDown += this.putDown[i] * 1000;
              break;
            case "five":
              this.totalMoney_putDown += this.putDown[i] * 5;
              break;
            case "fiveHundred":
              this.totalMoney_putDown += this.putDown[i] * 500;
              break;
            case "one":
              this.totalMoney_putDown += this.putDown[i] * 1;
              break;
          }
        }
      }
      return this.totalMoney_putDown - this.info.nowMoneyRetained;
    },
    // 去除当前员工
    filterEmployeeList() {
      let newEmployeeList = this.employeeList.filter((item) => {
        return item.account != this.account;
      });
      return newEmployeeList;
    },
  },
  data() {
    return {
      tabCurr: 1,
      searchForm: {},
      info: {},
      form: {
        handoveEmployeedId: "",
        password: "",
      },
      show: false,
      account: "",
      remark: "",
      billList: [], //挂账列表
      dialogVisible: false, //现金统计dialog
      // 下面是PMS统计本班收入现金
      getMoney: {
        myriadNuber: 0, //一万日元
        oneHundred: 0, //一百日元
        fiveThousand: 0, //五千日元
        fifty: 0, //五十日元
        ten: 0, //十日元
        oneThousand: 0, //一千日元
        five: 0, //五日元
        fiveHundred: 0, // 五百日元
        one: 0, //一日元
        name: "getMoney",
      },
      checkBox: {
        checked_one: false,
        checked_two: false,
        checked_three: false,
        checked_four: false,
        checked_six: false,
        checked_seven: false,
        checked_eight: false,
        checked_nine: false,
        checked_ten: false,
      },
      //下面是下放备用金
      putDown: {
        myriadNuber: 0, //一万日元
        oneHundred: 0, //一百日元
        fiveThousand: 0, //五千日元
        fifty: 0, //五十日元
        ten: 0, //十日元
        oneThousand: 0, //一千日元
        five: 0, //五日元
        fiveHundred: 0, // 五百日元
        one: 0, //一日元
        name: "putDown",
      },
      checkBox2: {
        checked_one: false,
        checked_two: false,
        checked_three: false,
        checked_four: false,
        checked_six: false,
        checked_seven: false,
        checked_eight: false,
        checked_nine: false,
        checked_ten: false,
      },
      moneyList: [],
      totalMoney: 0, //现金实收数
      totalMoney_putDown: 0, //备用金实收数
    };
  },

  mounted() {
    this.initForm();
    this.account = sessionStorage.getItem("account");
  },
  methods: {
    // PMS统计本班收入 输入0转1
    blurChange(item) {
      let num = this.getMoney[item];
      if (num == 0) {
        this.getMoney[item] = 1;
      }
    },
    //本班下放备用金 输入0转1
    blurChange_down(item) {
      let num = this.putDown[item];
      if (num == 0) {
        this.putDown[item] = 1;
      }
    },
    // PMS统计本班收入 选择或者不选择
    changeList(number, type) {
      if (type) {
        this.getMoney[number] = 1;
      } else {
        this.getMoney[number] = 0;
      }
    },
    //本班下放备用金 选择或者不选择
    changeList_down(number, type) {
      if (type) {
        this.putDown[number] = 1;
      } else {
        this.putDown[number] = 0;
      }
    },
    initForm() {
      this.changeTabs(1);
    },
    changeTabs(v) {
      if (v == 1) {
        this.getManagerInfo(v);
      }
      if (v == 2) {
        this.getDishesInfo(v);
      }
      if (v == 3) {
        this.getShopInfo(v);
      }
      this.remark = "";
      this.form = {
        handoveEmployeedId: "",
        password: "",
      };
    },

    //前台部交班信息
    getManagerInfo(v) {
      let params = {};
      params.userId = this.userId;
      params.storesNum = this.storesNum;
      this.$F.doRequest(
        this,
        "/pms/handover/handover_base_info",
        params,
        (res) => {
          console.log(res);
          this.info = res;
          this.tabCurr = v;
        }
      );
    },
    //餐饮部交班信息
    getDishesInfo(v) {
      let params = {};
      params.userId = this.userId;
      params.storesNum = this.storesNum;
      this.$F.doRequest(
        this,
        "/pms/dishes/handover/handover_base_info",
        params,
        (res) => {
          console.log(res);
          this.info = res;
          this.tabCurr = v;
        }
      );
    },
    //商店部交班信息
    getShopInfo(v) {
      let params = {};
      params.userId = this.userId;
      params.storesNum = this.storesNum;
      this.$F.doRequest(
        this,
        "/pms/shop/handover/handover_base_info",
        params,
        (res) => {
          console.log(res);
          this.info = res;
          this.tabCurr = v;
        }
      );
    },
    // 鼠标移动到问号的请求
    requestData() {
      let workStarTime = this.$F.formatTime(this.info.workStarTime)[0];
      let workEndTime = this.$F.formatTime(this.info.workEndTime)[0];
      let params = {
        workStarTime,
        workEndTime,
      };
      this.$F.doRequest(
        this,
        "/pms/handover/handover_putup_group",
        params,
        (res) => {
          console.log(res);
          this.billList = res.upGroupCount;
        }
      );
    },
    // 点击确定按钮
    sureButton(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = true;
        } else {
          return false;
        }
      });
    },
    // 点击弹框确定按钮
    save() {
      this.publicMethod(this.getMoney);
      this.publicMethod(this.putDown);
      let url = "/pms/handover/handover_up";
      if (this.tabCurr == 1) {
        url = "/pms/handover/handover_up";
      }
      if (this.tabCurr == 2) {
        url = "/pms/dishes/handover/handover_up";
      }
      if (this.tabCurr == 3) {
        url = "/pms/shop/handover/handover_up";
      }
      let params = {
        workStarTime: this.info.workStarTime,
        workEndTime: this.info.workEndTime,
        handoveNum: this.info.handoveNum,
        handoverStatus: this.info.handoverStatus,
        handoveEmployeedId: this.form.handoveEmployeedId,
        password: this.form.password,
        remark: this.remark,
        realMoneyIncome: this.totalMoney,
        balancePrice: this.checkget_Balance,
        standbyMoney: this.totalMoney_putDown,
        standbyBalancePrice: this.checkput_Balance,
        pmsMoneyJson: JSON.stringify(this.moneyList),
      };
      params.userId = this.userId;
      params.storesNum = this.storesNum;
      this.$F.doRequest(this, url, params, (res) => {
        // console.log(res)
        this.$message.success(this.$t("food.common.success"));
        this.cancelClick();
      });
    },
    publicMethod(objectName) {
      for (let i in objectName) {
        if (objectName[i] > 0) {
          switch (i) {
            case "myriadNuber":
              let objA = {
                amount: 10000,
                amount_name: this.$t("desk.money.myriadNuber"),
                amount_count: objectName[i],
                project_type: objectName["name"] == "getMoney" ? 1 : 2,
              };
              this.moneyList.push(objA);
              break;
            case "oneHundred":
              let objB = {
                amount: 100,
                amount_name: this.$t("desk.money.oneHundred"),
                amount_count: objectName[i],
                project_type: objectName["name"] == "getMoney" ? 1 : 2,
              };
              this.moneyList.push(objB);
              break;
            case "fiveThousand":
              let objC = {
                amount: 5000,
                amount_name: this.$t("desk.money.fiveThousand"),
                amount_count: objectName[i],
                project_type: objectName["name"] == "getMoney" ? 1 : 2,
              };
              this.moneyList.push(objC);
              break;
            case "fifty":
              let objD = {
                amount: 50,
                amount_name: this.$t("desk.money.fifty"),
                amount_count: objectName[i],
                project_type: objectName["name"] == "getMoney" ? 1 : 2,
              };
              this.moneyList.push(objD);
              break;
            case "ten":
              let objE = {
                amount: 10,
                amount_name: this.$t("desk.money.ten"),
                amount_count: objectName[i],
                project_type: objectName["name"] == "getMoney" ? 1 : 2,
              };
              this.moneyList.push(objE);
              break;
            case "oneThousand":
              let objF = {
                amount: 1000,
                amount_name: this.$t("desk.money.oneThousand"),
                amount_count: objectName[i],
                project_type: objectName["name"] == "getMoney" ? 1 : 2,
              };
              this.moneyList.push(objF);
              break;
            case "five":
              let objG = {
                amount: 5,
                amount_name: this.$t("desk.money.five"),
                amount_count: objectName[i],
                project_type: objectName["name"] == "getMoney" ? 1 : 2,
              };
              this.moneyList.push(objG);
              break;
            case "fiveHundred":
              let objH = {
                amount: 500,
                amount_name: this.$t("desk.money.fiveHundred"),
                amount_count: objectName[i],
                project_type: objectName["name"] == "getMoney" ? 1 : 2,
              };
              this.moneyList.push(objH);
              break;
            case "one":
              let objI = {
                amount: 1,
                amount_name: this.$t("desk.money.one"),
                amount_count: objectName[i],
                project_type: objectName["name"] == "getMoney" ? 1 : 2,
              };
              this.moneyList.push(objI);
              break;
          }
        }
      }
      console.log(this.moneyList);
    },
    //点击弹框取消
    cancelClick() {
      for (let i in this.checkBox) {
        this.checkBox[i] = false;
      }
      for (let k in this.checkBox2) {
        this.checkBox2[k] = false;
      }
      for (let a in this.getMoney) {
        if (a != "name") {
          this.changeList(a, false);
        }
      }
      for (let b in this.putDown) {
        if (b != "name") {
          this.changeList_down(b, false);
        }
      }
      this.moneyList = [];
      this.totalMoney = 0;
      this.totalMoney_putDown = 0;
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0 0 10px;
}

.shiftOver h3 {
  margin: 0;
  font-size: 16px;
  line-height: 40px;
}

.shiftOver .red {
  color: red;
}

.shiftOver .blue {
  color: #126eff;
}

.shiftOver .total {
  background: #f7f7f7;
  color: #333;
  padding: 10px 10px;
}

.shiftOver .item {
  font-size: 14px;
  padding: 10px 0;
}

.shiftOver .handInCash {
  border: 1px solid #eee;

  .el-row {
    width: auto;
  }
}
.dialog-footer {
  text-align: right;
}

.shiftOver .handInCash .li {
  border-right: 1px solid #eee;
  padding: 0 10px;
}

.shiftOver .handInCash .li:last-child {
  border: 0;
}

.shiftOver .handInCash .ftRow {
  background: #f6f7f7;
  color: #333;
  padding: 10px 10px;
}
.father {
  position: relative;
  .son {
    position: absolute;
    box-sizing: border-box;
    padding: 20px;
    width: 200px;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    z-index: 2;
    left: 80px;
    top: 30px;
    display: none;
  }
  .AAA:hover + .son {
    display: block;
  }
}
.dialog_top {
  margin-top: -20px;
  margin-bottom: 20px;
  font-weight: 600;
  span {
    color: #3968ab;
  }
}
.width180 {
  width: 180px;
  margin-left: 20px;
}
.el-col {
  margin-bottom: 20px;
  .el-checkbox {
    width: 80px;
  }
}
.contentBox {
  margin-bottom: 20px;
  font-weight: 600;
  span {
    color: red;
    margin-right: 20px;
  }
}
.flexBox {
  font-size: 15px;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  div {
    margin-right: 30px;
  }
}
</style>
