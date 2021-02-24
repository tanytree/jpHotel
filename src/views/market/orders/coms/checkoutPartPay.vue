<!--
 * @Date: 2020-12-28 10:31:06
 * @Author: 陶子
 * @LastEditTime: 2021-02-24 14:02:10
 * @FilePath: \jiudian\src\views\market\orders\coms\checkoutPartPay.vue
-->
  <!-- 结账退房dialog组件-->
  <!--未调-->
  <template>
  <el-dialog top="0" width="60%"  :title="$t('desk.order_partBillA')" :visible.sync="checkoutVisible" append-to-body>
    <div class="innerBoxTop">
      <span>{{$t('desk.home_roomType')}}：{{currentRoom.roomTypeName}} </span>
      <span>{{$t('desk.home_roomNum')}}：{{currentRoom.houseNum}}</span>
      <span>{{$t('desk.customer_livePeople')}}：{{currentRoom.personList && currentRoom.personList[0] && currentRoom.personList[0].name}}</span>
    </div>
    <div class="priceBox">
      <div class="leftPrice" v-if="detailData.payPrice - getRealPayFee.sum < 0"><span>{{$t('desk.order_receivable')}}</span>：
      <!-- {{getFee()}} -->
      {{numFormate(getRealPayFee.sum - detailData.payPrice)}}
      </div>
      <div class="leftPrice" v-else><span>{{$t('desk.order_shouldBack')}}</span>
      <!-- {{detailData.payPrice - getRealPayFee.payFee}} -->
      {{numFormate(getFee())}}
      </div>
      <div class="centerLine"></div>
      <div class="rightPrcie">
        <div class="rightTop">
          {{$t('desk.consumerTotal')}}：<span class="rightTopNum">{{numFormate(getRealPayFee.sum)}}</span>
        </div>
        <div class="rightBottom">
          {{$t('desk.payTotal')}}：<span class="RightBottomNum">{{numFormate(detailData.payPrice)}}</span>
        </div>
      </div>
      <div class="lastRight">
        <img src="~@/assets/images/moreThan.png" class="rightTopImg" />
        <div class="hoverBox">
          <div><span>{{$t('desk.customer_xiaoJi')}}</span><span>¥ {{numFormate(getRealPayFee.total)}}；</span></div>
          <div><span>{{$t('desk.book_serveFee')}}（{{getRealPayFee.consumeTax}}）</span><span>¥{{numFormate(getRealPayFee.taxFee)}}；</span></div>
          <div><span>{{$t('desk.book_costFee')}}（{{getRealPayFee.servicePrice}}）</span><span>¥{{numFormate(getRealPayFee.service)}}；</span></div>
          <div><span>{{$t('desk.book_wenquan')}}</span><span>¥{{numFormate(getRealPayFee.priceType15)}}；</span></div>
          <div><span>{{$t('desk.book_liveFee')}}</span><span>¥{{numFormate(getRealPayFee.priceType16)}}；</span></div>
          <div><span>{{$t('desk.serve_heji')}}</span><span>¥{{numFormate(getRealPayFee.sum)}}；</span></div>
        </div>
      </div>
    </div>
    <!-- {{checkoutForm}} -->
    <el-form ref="checkoutForm" :rules="paymentRules" :model="checkoutForm" label-width="110px">
      <el-form-item :label=" detailData.totalPrice<0 ? $t('desk.customer_refundWay') : $t('desk.customer_payType')" prop="payType">

        <el-radio-group v-model="checkoutForm.payType" v-if="detailData.totalPrice > 0">
          <el-radio v-for="(value, key) in $t('commons.payType')" :label="key" :key="key">{{ value }}</el-radio>
        </el-radio-group>

        <el-radio-group v-model="checkoutForm.payType" v-if="detailData.totalPrice < 0">
          <el-radio v-if="key != 3" v-for="(value, key) in $t('commons.payType')" :label="key" :key="key">{{ value }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item :label="$t('desk.customer_refundWay')" prop="resource" v-if="detailData.totalPrice<0">
        <el-radio-group v-model="checkoutForm.resource">
          <el-radio label="">{{$t('desk.serve_cashA')}}</el-radio>
        </el-radio-group>
      </el-form-item> -->

      <el-form-item :label="$t('desk.book_accountWay')" prop="putUp" v-if="checkoutForm.payType == '3'">
        <el-select v-model="checkoutForm.putUp" :placeholder="$t('desk.book_chooseAway')" @change="getPutUp" style="width: 260px">
          <el-option v-for="(item, index) in $t('commons.paymentWay')" :key="index" :value="index" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('desk.customer_buyerUnitA')" v-if="checkoutForm.payType == '3'" prop="enterId">
        <el-select v-model="checkoutForm.enterId" :placeholder="$t('desk.customer_inputUnitName')" @change="getUnit"  style="width: 260px">
          <el-option v-for="(item, index) in unitList" :key="index" :label="item.enterName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('desk.book_discountAmount')">
        <el-input size="small" type="number" v-model="checkoutForm.preferentialPrice" style="width: 260px" @change="changPreferentialPrice"></el-input>
      </el-form-item>
      <el-form-item :label="$t('desk.customer_sum')" prop="name">
        <!-- <el-input  size="small" v-model="checkoutForm.payPrice" :disabled="true" style="width: 260px"></el-input> -->
            {{numFormate(getRealPayFee.sum - checkoutForm.preferentialPrice)}}

      </el-form-item>
      <el-form-item :label="$t('desk.home_note')">
        <el-input type="textarea" v-model="checkoutForm.remark"></el-input>
      </el-form-item>
      <el-form-item label-width="40px">
        <el-checkbox v-model="checkoutForm.checked">{{$t('desk.book_printDocuments')}}</el-checkbox>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: right">
      <el-button @click="checkoutVisible = false">{{$t('commons.cancel')}}</el-button>
      <el-button type="primary" @click="consume_oper">{{$t('desk.add_sureCount')}}</el-button>
    </div>
  </el-dialog>
  <!--
      1.商店部，餐饮部 2个类型价格不用计算税前税后
   -->
</template>
<script>
import myMixin from '@/utils/filterMixin';
export default {
  mixins: [myMixin],
  props: ["currentRoom"],
  data() {
    return {
      unitList: [],
      checkoutVisible: false, //内层结账退房dialog
      consumePrice:'',
      checkoutForm: {
        checkInId:'',
        priceType:'3',
        payPrice: '',
        payType: "1",
        preferentialPrice:'',
        enterId:'',
        creditName:'',
        putUp:'',
        remark:'',
        checked:true,
      }, //退房结账弹框的表单
      consumeOrderList:[],
      detailData:{},
      taxInfo:{},
      isPartPay:false

    };
  },
  computed: {
    paymentRules(){
      return {
        putUp: [
          {
            required: true,
            message: this.$t("desk.book_chooseAway"),
            trigger: "change",
          }
        ],
        enterName: [
          {
            required: true,
            message: this.$t("desk.customer_inputUnitName"),
            trigger: "change",
          }
        ],
        payType: [
          {
            required: true,
            message: this.$t("commons.placeChoose"),
            trigger: "change",
          }
        ],
      };
    },
    getRealPayFee(){
        //tax
        let list = this.consumeOrderList
        let tax = this.taxInfo
        let consumeTax = tax.consumeTax ?  tax.consumeTax / 100 : 0  //in对应的税率  type:false
        let outConsumeTax = tax.outConsumeTax ?  tax.outConsumeTax / 100 : 0 //out对应的税率 type:true
        let servicePrice = tax.servicePrice ? tax.servicePrice / 100 : 0  //服务费率
        let total = 0 //小计
        let service = 0 //服务费
        let taxFee = 0 //消费税
        let sum = 0 //合计

        let priceType15 = 0 //温泉税
        let priceType16 = 0  //住宿税


        // let priceTypeList = [5,6,7,8,12,14,15,16,17,18]
        //7 赔偿不用计算
        //15，16温泉税和住宿税不需要计算税和服务费
        //餐饮部的消费金额 不需要计算税和服务费
        //商店部的商品消费金额不需要计算税和服务费
        //迷你吧那边计算的时候需要把税算上 未计算需要开发
        //计算 5 6 12三种房费的服务费和税  计算in类型的税率和费率




        list.forEach(element => {
            let priceType = element.priceType
            let consume = element.consumePrice ? element.consumePrice : 0
            total += parseFloat(consume)
            // if(priceType == 5 || priceType == 6 || priceType == 12){
            //     if(element.taxStatus == 1){
            //         taxFee +=  parseFloat(element.realPrice)  * consumeTax
            //     }
            //     if(element.seviceStatus == 1){
            //         service += parseFloat(element.realPrice) * consumeTax
            //     }
            // }
            taxFee +=  parseFloat(element.consumTaxPrice)
                // }
                // if(element.seviceStatus == 1){
            service += parseFloat(element.servicePrice)
            
            if(priceType == 15){
                console.log(priceType +':' +this.F_priceType(priceType))
                priceType15 = parseFloat(consume)
            }
            if(priceType == 16){
                console.log(priceType +':' +this.F_priceType(priceType))
                priceType16 = parseFloat(consume)
            }

            console.log(priceType +':' +this.F_priceType(priceType))
            console.log(consume)
            console.log(element)
        });

        sum = total
        console.log('小计：'+total)
        console.log('合计：'+sum)
        console.log('服务费：'+taxFee)
        console.log('服务费率：'+tax.consumeTax+'%')
        console.log('消费税：'+service)
        console.log('消费税率：'+tax.servicePrice+'%')
        console.log('温泉税：'+ priceType15)
        console.log('住宿税：'+ priceType16)
        let preferentialPrice = this.checkoutForm.preferentialPrice !=''&&this.checkoutForm.preferentialPrice > 0 ? parseFloat(this.checkoutForm.preferentialPrice) : 0
        let obj = {
            total:total,
            sum:sum,
            taxFee:taxFee+service,
            consumeTax:tax.consumeTax+'%',
            service:service,
            servicePrice:tax.servicePrice+'%',
            priceType15:priceType15,
            priceType16:priceType16,
            payFee: this.getPriceStr(sum - this.detailData.payPrice)
        }
        // console.log(obj)
        return obj
    },
  },
  created() {
        this.getUnitList();
        this.get_consume_tax();
  },
  methods: {
    resetVisibel(orderList) {
        this.checkoutVisible = true
        let detailData = {}
        let consumeSum = 0
        let paySum = 0
        for(let i in orderList){
            let element = orderList[i]
            let c = element.consumePrice ? element.consumePrice : 0
            let p = element.payPrice ? element.payPrice : 0
            consumeSum += c
            paySum += p
        }
        // console.log(consumeSum)
        // console.log(paySum)
        // console.log(orderList)
        // console.log(this.currentRoom.checkinId)

        this.detailData = {
            consumePrice:consumeSum,
            payPrice:paySum,
            totalPrice:paySum - consumeSum
        }
        this.consumeOrderList = orderList
        this.checkoutForm.checkInId = this.currentRoom.checkinId
        console.log(this.currentRoom)
    },
    //请求 单位 列表
    getUnitList() {
      this.$F.doRequest(this, "/pms/hotelenter/list", {}, (res) => {
        this.unitList = res.list;
        console.log(this.unitList);
      });
    },
    getPutUp(value){
        this.checkoutForm.putUp = value
    },
    getUnit(value){
        let list = this.unitList
        for(let i in list){
            if(list[i].id == value){
                console.log(list[i])
                this.checkoutForm.enterId = list[i].id
                this.checkoutForm.creditName = list[i].enterName
                break;
            }
        }
    },
    //修改优惠价格
    changPreferentialPrice(){
        let preferentialPrice = this.checkoutForm.preferentialPrice || 0
        this.checkoutForm.payPrice = this.getRealPayFee.sum - preferentialPrice
    },
    //
    getPriceStr(v){
        if(v){
            return Math.abs(v);
        }
    },


    getFee(){
        let preferentialPrice = this.checkoutForm.preferentialPrice
        if(!preferentialPrice || preferentialPrice == '' ){
            preferentialPrice = 0
        }else{
            preferentialPrice = parseFloat(preferentialPrice)
        }
        //消费 1000
        //付款 500
        //优惠 10

        if(this.getRealPayFee.sum - this.detailData.payPrice > 0){
           return  this.getRealPayFee.sum - this.detailData.payPrice
        }else{
           return  this.detailData.payPrice - this.getRealPayFee.sum + preferentialPrice
        }

    },

// 点击确认结账按钮
    consume_oper(){

        console.log(this.detailData)
        console.log(this.consumeOrderList)
        let list = this.consumeOrderList
        let ids = list.map((item) =>{
            return item.id
        })
        let consumeOrders = ids.join(',')
        // console.log(consumeOrders)

        let checkoutForm = this.checkoutForm
        console.log(checkoutForm)
        let params = {
            checkInId:checkoutForm.checkInId,
            priceType:checkoutForm.priceType,
            payPrice:this.getFee(),
            payType: checkoutForm.payType,
            preferentialPrice:checkoutForm.preferentialPrice,
            roomId:this.currentRoom.roomId,
            roomNum:this.currentRoom.houseNum,
            remark:checkoutForm.remark,
            state:2,
            consumeOrders:consumeOrders
        }



        if(checkoutForm.putUp){
            params.putUp = checkoutForm.putUp
        }
        if(checkoutForm.enterId){
            params.enterId = checkoutForm.enterId
            params.creditName = checkoutForm.creditName
        }
        this.$F.doRequest(this, '/pms/consume/consume_oper', params, (res) => {
            console.log(res)
            let transferObj ={
              checked:this.checkoutForm.checked,
              orderId:res.orderId,
            }
            this.getOrderDetail(transferObj)
        })

   },


    set_out_check_in() {
            let params = {}
            params.checkInId = this.checkoutForm.checkInId
            params.billType = 3

            console.log(params)
            // return

            this.$F.doRequest(this, '/pms/checkin/out_check_in', params, (res) => {
            console.log(res)
            // this.$router.replace({
            //   path: "/orders",
            //   query: {
            //     type: 'order',
            //   },
            // });
           })
    },
    //判断数组中的值是否相同
    isArrSame(array,state) {
        return !array.some(function(value, index) {
            return value !== state
        });
    },
    getOrderDetail(transferObj){
        console.log('part')
        this.checkoutVisible = false
        this.$emit('getOrderDetail',transferObj)
    },
    get_consume_tax(){
        let params = {
            userId:this.userId,
            storesNum:this.storesNum,
        }
        this.$F.doRequest(this, "/pms/hotelparam/get_consume_tax", params, (res) => {
            if(res && res.content){
                this.taxInfo = JSON.parse(res.content)
                console.log(this.taxInfo)

            }
        });
    },
  },
};
</script>
<style lang="less" scoped>
.innerBoxTop {
  > span {
    margin-right: 40px;
  }
  margin-bottom: 10px;
}
.priceBox {
  margin: 20px 0;
  box-sizing: border-box;
  padding: 10px 20px;
  width: 100%;
  height: 120px;
  background-color: rgba(250, 250, 250, 1);
  border: 1px solid rgba(239, 239, 239, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .leftPrice {
    color: rgba(220, 62, 62, 100);
    font-size: 32px;
  }
  .centerLine {
    width: 1px;
    height: 60px;
    border: 1px solid rgba(218, 218, 218, 1);
    margin: 0 40px;
  }
  .rightPrcie {
    .rightTop {
      margin-bottom: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      .rightTopNum {
        color: rgba(220, 62, 62, 100);
      }
    }
    .rightBottom {
      font-size: 20px;
      .RightBottomNum {
        color: rgba(41, 182, 75, 100);
      }
    }
  }
  .lastRight {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .rightTopImg {
      position: relative;
      bottom: 15px;
      margin-left: 10px;
      width: 24px;
      height: 24px;
      &:hover + .hoverBox {
        display: block;
      }
    }
    .hoverBox {
      display: none;
      position: absolute;
      top: 20px;
      left: 10px;
      box-sizing: border-box;
      padding: 20px;
      width: 240px;
      z-index: 600;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.7);
      color: rgba(255, 255, 255, 100);
      font-size: 14px;
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
