<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-08 15:11:36
 * @FilePath: \jiudian\src\views\manager\index\shiftover\c1.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div class="shiftOver">
    <el-row>
        <el-button v-for="(item,index) in tabs" :key="index"  :type="tabCurr == item.handoverType ? 'primary' : ''" @click="changeTabs(item.handoverType)">
        {{$t('manager.typeNameList.'+item.handoverType)}}
        </el-button>
    </el-row>
    <el-row style="padding-top: 20px;">
      <h3>{{$t('food.shift.tabs_title_1')}}</h3>
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
            <div class="item">
              {{$t('manager.hp_patternsSuccession')}}：
              <span v-if="info.handoverStatus == 1">{{$t('manager.hp_cashModel')}}</span>
              <span v-if="info.handoverStatus == 2">{{$t('manager.hp_paidModel')}}</span>
              <span v-if="info.handoverStatus == 3">{{$t('manager.hp_accountsModel')}}</span>
            </div>
        </el-col>
      </el-row>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <h3>{{$t('food.shift.tabs_title_2')}}</h3>
      <div class="total">{{$t('food.shift.total')}}：{{info.income}}日元</div>
      <el-row class="padding-tb-10">
          <!-- tabCurr 1前台部 2餐饮部 3商店部 -->
        <el-col :span="4" v-for="(item,index) in info.orderPriceProjectList" :key="index">
          <div class="item">{{$t('manager.priceType.'+item.priceType)}}：<span class="red">{{item.total}}</span>日元</div>
        </el-col>
      </el-row>
      <div class="total">{{$t('food.shift.totalFee')}}：{{info.settlement}}日元</div>
      <el-row class="padding-tb-10">
        <!-- tabCurr 1前台部 2餐饮部 3商店部 -->
        <el-col :span="4" v-for="(item,index) in info.orderPayTypeList" :key="index">
          <div class="item">{{$t('manager.payType.'+item.payType)}}：<span class="blue">{{item.total}}</span>日元</div>
        </el-col>
      </el-row>
    </el-row>
    <el-row>
      <h3>
       {{$t('food.shift.tabs_title_3')}} &nbsp;&nbsp;
        <el-tag size="mini">当前交班模式：
            <span v-if="info.handoverStatus == 1">{{$t('manager.hp_cashModel')}}</span>
            <span v-if="info.handoverStatus == 2">{{$t('manager.hp_paidModel')}}</span>
            <span v-if="info.handoverStatus == 3">{{$t('manager.hp_accountsModel')}}</span>
        </el-tag>&nbsp;&nbsp;
        <a @click="show = true" class="el-icon-question" style="color: #126EFF;"></a>
      </h3>
      <div class="handInCash margin-tb-10">
        <el-row class="padding-tb-10">
          <el-col :span="12" class="li">
            <!-- <div class="item">上班现金留存：{{info.upMoneyRetained}}</div> -->
            <div class="item">本班现金上交：{{info.nowMoneyHandin}}</div>
            <div class="item">本班现金留存：{{info.nowMoneyRetained}}</div>
          </el-col>
          <!-- <el-col :span="4" class="li">
            <div class="item">上班微信留存：{{info.upWeixinRetained}}</div>
            <div class="item">本班微信上交：{{info.upWeixinRetained}}</div>
            <div class="item">本班微信留存：{{info.upWeixinRetained}}</div>
          </el-col>
          <el-col :span="4" class="li">
            <div class="item">上班支付宝留存：{{info.upAliRetained}}</div>
            <div class="item">本班支付宝上交：{{info.upAliRetained}}</div>
            <div class="item">本班支付宝留存：{{info.upAliRetained}}</div>
          </el-col> -->
          <el-col :span="12" class="li">
            <div class="item">本班信用卡上交：{{info.nowCreditCardHandin}}</div>
            <!-- <div class="item">本班信用卡留存：{{info.nowCreditCardRetained}}</div> -->
          </el-col>
        </el-row>
        <!-- <el-row class="ftRow">本班走结订单金额：{{info.goSettlement}}</el-row> -->
      </div>
    </el-row>
    <!-- <el-row>
      <h3>本班报表</h3>
      <el-row>
        <el-col :span="4">
          <div class="item">
            交班报表(按班次)&nbsp; &nbsp;<el-button size="mini">预览</el-button>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="item">
            交班报表(按收银员)&nbsp; &nbsp;<el-button size="mini">预览</el-button>
          </div>
        </el-col>
      </el-row>
    </el-row> -->
    <el-row style="text-align: center;margin-top: 20px;">
        <el-divider></el-divider>
        <el-form inline label-width="150px" style="padding-top: 30px;">
            <el-form-item :label="$t('food.shift.selectOnDutyer')">
                <el-select v-model="form.handoveEmployeedId">
                    <el-option
                      v-for="item in employeeList"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.id"
                      >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('food.shift.password')">
                <el-input type="password" v-model="form.password" :placeholder="$t('food.shift.password')"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="save">{{ $t('commons.confirm') }}</el-button>
            </el-form-item>
         </el-form>
     </el-row>

     <el-dialog title="交班详情" :visible.sync="show"  width="700px"  top="0">
        <div class="margin-b-20">
            <span v-if="info.handoverStatus == 1">{{$t('manager.hp_cashModel')}}</span>
            <span v-if="info.handoverStatus == 2">{{$t('manager.hp_paidModel')}}</span>
            <span v-if="info.handoverStatus == 3">{{$t('manager.hp_accountsModel')}}</span>
        </div>
        <div class="margin-b-10">备用金额度=({{info.pettyCash}})</div>
        <div class="margin-b-10">
            {{$t('food.shift.onHas')}} +本班现金收款=
            ({{info.upMoneyRetained}}) + ({{info.nowMoneyRetained}})= ({{getTotal(info.upMoneyRetained,info.nowMoneyRetained)}})
            {{getPriceState(info.upMoneyRetained,info.nowMoneyRetained,info.pettyCash) ? '>' :'<'}}
            ({{info.pettyCash}})
        </div>
        <!-- 展示大于小于等于备用金额度/纯展示 -->
        <div class="margin-b-10">
        本班下放备用金
        {{getPriceStateFlow(info.upMoneyRetained,info.nowMoneyRetained,info.pettyCash)}}
        备用金额度
        =
        ({{ getPriceStateFlow(info.upMoneyRetained,info.nowMoneyRetained,info.pettyCash) == '<' ? getTotal(info.upMoneyRetained,info.nowMoneyRetained) : info.pettyCash}})
        </div>
        <!-- 判断  本班下放备用金 < = > 备用金额度-->
        <!-- 判断  上班留存备用金+本班现金收款的总和和备用金额作比较  > 100或者==100 直接显示100 小于则显示 总和-->
        <div class="margin-b-10">
            本班现金上交=上班留存备用金+本班现金收款-本班下放备用金=
            ({{info.upMoneyRetained}})+({{info.nowMoneyRetained}})-({{ getPriceStateFlow(info.upMoneyRetained,info.nowMoneyRetained,info.pettyCash) == '<' ? getTotal(info.upMoneyRetained,info.nowMoneyRetained) : info.pettyCash}})
            =({{getUpPrice()}})
        </div>
        <!-- <div>本班微信上交=本班微信收款=(0)</div> -->
        <div class="margin-b-10">本班信用卡上交=本班信用卡收款=({{info.nowCreditCardHandin}})</div>
        <div class="margin-b-10"  v-if="tabCurr == 1" >本班挂账上交=本班挂账金额</div>
        <div class="margin-b-10"></div>
     </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props:['tabs','employeeList'],
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    })
  },
  data() {
    return {
      tabCurr:1,
      loading: false,
      searchForm:{},
      info:{},
      form:{
          handoveEmployeedId:'',
          password:''
      },
      show:false,
      account:''
    };
  },

  mounted() {
    this.initForm();
    this.account = sessionStorage.getItem('account')
  },
  methods: {

    getUpPrice(){
        let a = this.info.upMoneyRetained  //上班留存备用金
        let b = this.info.nowMoneyRetained //本班现金收款
        let c = this.info.pettyCash //备用金额度
        let d = 0
        if(this.getPriceState(a,b,c) == false){
            d = this.getTotal(a,b)
        }else{
            d = this.getTotal(a,b,c,1)
        }
        return d
    },


    initForm() {
      this.changeTabs(1);
    },
    changeTabs(v){
       this.tabCurr = v
       if(v == 1){
           this.getManagerInfo();
       }
       if(v == 2){
           this.getDishesInfo();
       }
       if(v == 3){
           this.getShopInfo();
       }
    },
    //计算价格大小
    getPriceState(num1,num2,num3){
        let a = num1 || 0
        let b = num2 || 0
        let c = num3 || 0
        if(parseFloat(a) + parseFloat(b) > parseFloat(c) || parseFloat(a) + parseFloat(b) == parseFloat(c) ){
            return true
        }else{
            return false
        }
    },
    //获取几个值得符号关系
    getPriceStateFlow(num1,num2,num3){
        let a = num1 || 0
        let b = num2 || 0
        let c = num3 || 0
        if(parseFloat(a) + parseFloat(b) > parseFloat(c)){
            return '>'
        }else if(parseFloat(a) + parseFloat(b) == parseFloat(c)){
            return '=='
        }else{
            return '<'
        }
    },
    //计算差额
    getTotal(num1,num2,num3,type){
        let a = num1 || 0
        let b = num2 || 0
        let c = num3 || 0
        let sum = 0
        if(type&&type == 1){
            sum = parseFloat(a) + parseFloat(b) -  parseFloat(c)
            // console.log(1111)
        }else{
            sum = parseFloat(a) + parseFloat(b)
            // console.log(2222)
        }
        return sum
    },



    //前台部交班信息
    getManagerInfo() {
        let params = {}
        params.userId = this.userId
        params.storesNum = this.storesNum
        this.$F.doRequest(this, "/pms/handover/handover_base_info", params, (res) => {
            // console.log(res)
            this.info = res
        });
    },
    //餐饮部交班信息
    getDishesInfo() {
        let params = {}
        params.userId = this.userId
        params.storesNum = this.storesNum
        this.$F.doRequest(this, "/pms/dishes/handover/handover_base_info", params, (res) => {
            console.log(res)
            this.info = res
        });
    },
    //商店部交班信息
    getShopInfo() {
        let params = {}
        params.userId = this.userId
        params.storesNum = this.storesNum
        this.$F.doRequest(this, "/pms/shop/handover/handover_base_info", params, (res) => {
            console.log(res)
            this.info = res
        });
    },

    save(){
        let url = '/pms/handover/handover_up'
        if(this.tabCurr == 1){
           url = '/pms/handover/handover_up'
        }
        if(this.tabCurr == 2){
           url = '/pms/dishes/handover/handover_up'
        }
        if(this.tabCurr == 3){
            url = '/pms/shop/handover/handover_up'
        }
        let params = {
            workStarTime:this.info.workStarTime,
            workEndTime:this.info.workEndTime,
            handoveNum:this.info.handoveNum,
            handoverStatus:this.info.handoverStatus,
            handoveEmployeedId:this.form.handoveEmployeedId,
            password:this.form.password
        }
        params.userId = this.userId
        params.storesNum = this.storesNum
        this.$F.doRequest(this, url, params, (res) => {
           // console.log(res)
           this.$message.success(this.$t('food.common.success'));
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
</style>
