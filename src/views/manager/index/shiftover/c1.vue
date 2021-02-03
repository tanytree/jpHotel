<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-03 17:56:42
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
        <el-col :span="12">
          <div class="item">当前模式：现金流模式</div>
        </el-col>
      </el-row>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <h3>{{$t('food.shift.tabs_title_2')}}</h3>
      <div class="total">消费总计：{{$F.numFormate(info.income)}}{{$t('manager.ps_japanYen')}}</div>
      <el-row class="padding-tb-10">
        <!-- tabCurr 1前台部 2餐饮部 3商店部 -->
        <el-col :span="6" v-for="(item,index) in info.orderPriceProjectList" :key="index">
          <div class="item">
            <span v-if="tabCurr == 1">{{$t('manager.priceType.'+item.priceType)}}：</span>
            <span v-if="tabCurr == 2">{{$t('desk.serve_foodPrice')}}：</span>
            <span v-if="tabCurr == 3">{{$t('desk.serve_goodsPrice')}}：</span>
            <span class="red">{{$F.numFormate(item.total)}} {{$t('manager.ps_japanYen')}}</span>
          </div>
        </el-col>
      </el-row>
      <div class="total">{{$t('food.reset.totalFee')}}￥：{{$F.numFormate(info.settlement)}}{{$t('manager.ps_japanYen')}}</div>
      <el-row class="padding-tb-10">
        <!-- tabCurr 1前台部 2餐饮部 3商店部 -->
        <div v-if="tabCurr==1" class="father">
          <el-col :span="4">
            <div class="item">
              挂账：<span class="blue">20000</span>{{$t('manager.ps_japanYen')}} <a class="el-icon-question AAA" style="color: #126EFF;"></a>
              <div class="son">
                <div>单位挂账：￥2000</div>
                <div>商品券：￥2000</div>
                <div>住宿券：￥2000</div>
                <div>折价券：￥2000</div>
                <div>点数：￥2000</div>
                <div>招待券：￥2000</div>
                <div>其他：￥2000</div>
                <div>其他：￥2000</div>
                <div>辅助金：￥2000</div>
              </div>
            </div>
          </el-col>

          <el-col :span="4">
            <div class="item">
              现金：<span class="blue">20000</span>{{$t('manager.ps_japanYen')}}
            </div>
          </el-col>
          <el-col :span="4">
            <div class="item">
              信用卡：<span class="blue">20000</span>{{$t('manager.ps_japanYen')}}
            </div>
          </el-col>
          <el-col :span="4">
            <div class="item">
              其他：<span class="blue">20000</span>{{$t('manager.ps_japanYen')}}
            </div>
          </el-col>
        </div>

        <div v-if="tabCurr!=1">
          <el-col :span="6">
            <div class="item">{{$t('manager.add_nowCashGetA')}}：<span style="color:#126eff">{{$F.numFormate(info.nowMoneyHandin)}}{{$t('manager.ps_japanYen')}}</span></div>
          </el-col>
          <el-col :span="6">
            <div class="item">{{$t('manager.add_nowCardGetA')}}：<span style="color:#126eff">{{$F.numFormate(info.nowCreditCardHandin)}}{{$t('manager.ps_japanYen')}}</span></div>
          </el-col>
          <el-col :span="6">
            <div class="item">{{$t('manager.add_nowBillGet')}}：<span style="color:#126eff">{{$F.numFormate(0)}}{{$t('manager.ps_japanYen')}}</span></div>
          </el-col>
          <el-col :span="6">
            <div class="item">{{$t('desk.add_otherGetA')}}：<span style="color:#126eff">{{$F.numFormate(0)}}{{$t('manager.ps_japanYen')}}</span></div>
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
      <el-form inline label-width="150px" style="padding-top: 30px;">
        <el-form-item :label="$t('food.shift.selectOnDutyerA')">
          <el-select v-model="form.handoveEmployeedId">
            <el-option v-for="item in employeeList" :key="item.id" :label="item.userName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('food.shift.password')">
          <el-input type="password" v-model="form.password" :placeholder="$t('food.shift.password')"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="dialogVisible=true">{{ $t('commons.confirm') }}</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- 现金统计dialog -->
    <el-dialog title="现金统计" :visible.sync="dialogVisible" width="60%" top="0">
      <div class="dialog_top">PMS统计本班收入现金：<span>1000</span>日元</div>
      <div>
        <el-row>
          <el-col :span="11">
            <el-checkbox @change="changeList('myriadNuber',checkBox.checked_one)" v-model="checkBox.checked_one">1万日元</el-checkbox>
            <el-input class="width180" @blur="blurChange('myriadNuber')" v-model="getMoney.myriadNuber" :disabled='checkBox.checked_one?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-checkbox @change="changeList('oneHundred',checkBox.checked_two)" v-model="checkBox.checked_two">一百日元</el-checkbox>
            <el-input class="width180" @blur="blurChange('oneHundred')" v-model="getMoney.oneHundred" :disabled='checkBox.checked_two?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-checkbox @change="changeList('fiveThousand',checkBox.checked_three)" v-model="checkBox.checked_three">五千日元</el-checkbox>
            <el-input class="width180" @blur="blurChange('fiveThousand')" v-model="getMoney.fiveThousand" :disabled='checkBox.checked_three?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-checkbox @change="changeList('fifty',checkBox.checked_four)" v-model="checkBox.checked_four">五十日元</el-checkbox>
            <el-input class="width180" @blur="blurChange('fifty')" v-model="getMoney.fifty" :disabled='checkBox.checked_four?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-checkbox @change="changeList('twoThousand',checkBox.checked_five)" v-model="checkBox.checked_five">两千日元</el-checkbox>
            <el-input class="width180" @blur="blurChange('twoThousand')" v-model="getMoney.twoThousand" :disabled='checkBox.checked_five?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-checkbox @change="changeList('ten',checkBox.checked_six)" v-model="checkBox.checked_six">十日元</el-checkbox>
            <el-input class="width180" @blur="blurChange('ten')" v-model="getMoney.ten" :disabled='checkBox.checked_six?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-checkbox @change="changeList('oneThousand',checkBox.checked_seven)" v-model="checkBox.checked_seven">一千日元</el-checkbox>
            <el-input class="width180" @blur="blurChange('oneThousand')" v-model="getMoney.oneThousand" :disabled='checkBox.checked_seven?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-checkbox @change="changeList('five',checkBox.checked_eight)" v-model="checkBox.checked_eight">五日元</el-checkbox>
            <el-input class="width180" @blur="blurChange('five')" v-model="getMoney.five" :disabled='checkBox.checked_eight?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-checkbox @change="changeList('fiveHundred',checkBox.checked_nine)" v-model="checkBox.checked_nine">五百日元</el-checkbox>
            <el-input class="width180" @blur="blurChange('fiveHundred')" v-model="getMoney.fiveHundred" :disabled='checkBox.checked_nine?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-checkbox @change="changeList('one',checkBox.checked_ten)" v-model="checkBox.checked_ten">一日元</el-checkbox>
            <el-input class="width180" @blur="blurChange('one')" v-model="getMoney.one" :disabled='checkBox.checked_ten?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="contentBox">平衡数 = <span>0</span> (平衡数=实际收入现金 - PMS统计收入现金)</div>
      <!-- 上面选框 -->
      <el-divider></el-divider>
      <!-- 下面选框 -->
      <div class="dialog_top" style="margin-top:20px">本班下放备用金：<span>100000</span>日元</div>
      <div>
        <el-row>
          <el-col :span="11">
            <el-checkbox @change="changeList_down('myriadNuber',checkBox2.checked_one)" v-model="checkBox2.checked_one">1万日元</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('myriadNuber')" v-model="putDown.myriadNuber" :disabled='checkBox2.checked_one?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-checkbox @change="changeList_down('oneHundred',checkBox2.checked_two)" v-model="checkBox2.checked_two">一百日元</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('oneHundred')" v-model="putDown.oneHundred" :disabled='checkBox2.checked_two?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-checkbox @change="changeList_down('fiveThousand',checkBox2.checked_three)" v-model="checkBox2.checked_three">五千日元</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('fiveThousand')" v-model="putDown.fiveThousand" :disabled='checkBox2.checked_three?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-checkbox @change="changeList_down('fifty',checkBox2.checked_four)" v-model="checkBox2.checked_four">五十日元</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('fifty')" v-model="putDown.fifty" :disabled='checkBox2.checked_four?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-checkbox @change="changeList_down('twoThousand',checkBox2.checked_five)" v-model="checkBox2.checked_five">两千日元</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('twoThousand')" v-model="putDown.twoThousand" :disabled='checkBox2.checked_five?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-checkbox @change="changeList_down('ten',checkBox2.checked_six)" v-model="checkBox2.checked_six">十日元</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('ten')" v-model="putDown.ten" :disabled='checkBox2.checked_six?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-checkbox @change="changeList_down('oneThousand',checkBox2.checked_seven)" v-model="checkBox2.checked_seven">一千日元</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('oneThousand')" v-model="putDown.oneThousand" :disabled='checkBox2.checked_seven?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-checkbox @change="changeList_down('five',checkBox2.checked_eight)" v-model="checkBox2.checked_eight">五日元</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('five')" v-model="putDown.five" :disabled='checkBox2.checked_eight?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-checkbox @change="changeList_down('fiveHundred',checkBox2.checked_nine)" v-model="checkBox2.checked_nine">五百日元</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('fiveHundred')" v-model="putDown.fiveHundred" :disabled='checkBox2.checked_nine?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-checkbox @change="changeList_down('one',checkBox2.checked_ten)" v-model="checkBox2.checked_ten">一日元</el-checkbox>
            <el-input class="width180" @blur="blurChange_down('one')" v-model="putDown.one" :disabled='checkBox2.checked_ten?false:true' size="small">
              <template slot="append">张</template>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="contentBox">平衡数 = <span>0</span> (平衡数=实际下放备用金 - 备用金额度)</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
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
      dialogVisible: false, //现金统计dialog
      // 下面是收入日元
      getMoney: {
        myriadNuber: 0, //一万日元
        oneHundred: 0, //一百日元
        fiveThousand: 0, //五千日元
        fifty: 0, //五十日元
        twoThousand: 0, //两千日元
        ten: 0, //十日元
        oneThousand: 0, //一千日元
        five: 0, //五日元
        fiveHundred: 0, // 五百日元
        one: 0, //一日元
      },
      putDown: {
        myriadNuber: 0, //一万日元
        oneHundred: 0, //一百日元
        fiveThousand: 0, //五千日元
        fifty: 0, //五十日元
        twoThousand: 0, //两千日元
        ten: 0, //十日元
        oneThousand: 0, //一千日元
        five: 0, //五日元
        fiveHundred: 0, // 五百日元
        one: 0, //一日元
      },
      checkBox: {
        checked_one: false,
        checked_two: false,
        checked_three: false,
        checked_four: false,
        checked_five: false,
        checked_six: false,
        checked_seven: false,
        checked_eight: false,
        checked_nine: false,
        checked_ten: false,
      },
      checkBox2: {
        checked_one: false,
        checked_two: false,
        checked_three: false,
        checked_four: false,
        checked_five: false,
        checked_six: false,
        checked_seven: false,
        checked_eight: false,
        checked_nine: false,
        checked_ten: false,
      },
    };
  },

  mounted() {
    this.initForm();
    this.account = sessionStorage.getItem("account");
  },
  methods: {
    blurChange(item) {
      let num = this.getMoney[item];
      if (num == 0) {
        this.getMoney[item] = 1;
      }
    },
    blurChange_down(item) {
      let num = this.putDown[item];
      if (num == 0) {
        this.putDown[item] = 1;
      }
    },
    changeList(number, type) {
      if (type) {
        this.getMoney[number] = 1;
      } else {
        this.getMoney[number] = 0;
      }
    },
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

    save() {
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
        remark: this.remark,
        workStarTime: this.info.workStarTime,
        workEndTime: this.info.workEndTime,
        handoveNum: this.info.handoveNum,
        handoverStatus: this.info.handoverStatus,
        handoveEmployeedId: this.form.handoveEmployeedId,
        password: this.form.password,
      };
      params.userId = this.userId;
      params.storesNum = this.storesNum;
      this.$F.doRequest(this, url, params, (res) => {
        // console.log(res)
        this.$message.success(this.$t("food.common.success"));
        this.dialogVisible = false
      });
    },

    /**多选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**每页数 */
    handleSizeChange(val) {
      this.searchForm.page_num = val;
      this.searchForm.page = 1;
      this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.getDataList();
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
    height: 210px;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    z-index: 2;
    left: 100px;
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
</style>
