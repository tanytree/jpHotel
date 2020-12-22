<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-15 19:43:31
 * @FilePath: \jiudian\src\views\market\reception\shiftover\c1.vue
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
      <h3>预交班基本信息</h3>
      <el-row>
        <el-col :span="12">
          <div class="item">
            班次时间：{{info.workStarTime}} 至 {{info.workEndTime}}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="item">班次号：{{info.handoveNum}}</div>
        </el-col>
        <el-col :span="12">
          <div class="item">交班操作员：张三</div>
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
      <h3>本班账务汇总信息</h3>
      <div class="total">收入总计：{{info.income}}日元</div>
      <el-row class="padding-tb-10">
        <el-col :span="4" v-for="(item,index) in info.orderPriceProjectList">
          <div class="item">{{$t('manager.priceType.'+item.priceType)}}：<span class="red">{{item.total}}</span>日元</div>
        </el-col>
      </el-row>
      <div class="total">结算总计：{{info.settlement}}日元</div>
      <el-row class="padding-tb-10">
        <el-col :span="4" v-for="(item,index) in info.orderPayTypeList">
          <div class="item">{{$t('manager.payType.'+item.payType)}}：<span class="blue">{{item.total}}</span>日元</div>
        </el-col>
      </el-row>
    </el-row>
    <el-row>
      <h3>
        本班现金上交&nbsp;&nbsp;
        <el-tag size="mini">当前交班模式：
            <span v-if="info.handoverStatus == 1">{{$t('manager.hp_cashModel')}}</span>
            <span v-if="info.handoverStatus == 2">{{$t('manager.hp_paidModel')}}</span>
            <span v-if="info.handoverStatus == 3">{{$t('manager.hp_accountsModel')}}</span>
        </el-tag>
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
                <el-input v-model="form.password" :placeholder="$t('food.shift.password')"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="save">{{ $t('commons.confirm') }}</el-button>
            </el-form-item>
         </el-form>
     </el-row>
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
    }),
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
      }
    };
  },

  mounted() {
    this.initForm();
  },
  methods: {
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
            url = '/shop/pms/handover/handover_up'
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
           console.log(res)
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
