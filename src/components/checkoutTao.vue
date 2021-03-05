<!--
 * @Date: 2020-12-28 10:31:06
 * @Author: 陶子
 * @LastEditTime: 2021-03-04 10:57:27
 * @FilePath: \jiudian\src\components\checkoutTao.vue
-->
  <!-- 结账退房dialog组件-->
  <!--未调-->
  <template>
  <div>


    <el-dialog top="0" width="65%" :title="$t('desk.order_checkout')" :visible.sync="checkoutVisible" append-to-body>

    <div class="innerBoxTop">
      <span>{{$t('desk.home_roomType')}}：{{currentRoom.roomTypeName}} </span>
      <span>{{$t('desk.home_roomNum')}}：{{currentRoom.houseNum}}</span>
      <span>{{$t('desk.customer_livePeople')}}：{{currentRoom.personList && currentRoom.personList[0] && currentRoom.personList[0].name}}</span>
    </div>
    <div class="priceBox">
      <div class="leftPrice" v-if="detailData.payPrice - getRealPayFee.sum < 0"><span>{{$t('desk.order_receivableA')}}</span>:
        <!-- {{getFee()}} -->
        ￥{{numFormate(getRealPayFee.sum - detailData.payPrice)}}
      </div>
      <div class="leftPrice" v-else><span>{{$t('desk.order_shouldBack')}}</span>
        <!-- {{detailData.payPrice - getRealPayFee.payFee}} -->
        ￥{{numFormate(getFee())}}
      </div>
      <div class="centerLine"></div>
      <div class="rightPrcie">
        <div class="rightTop">
          {{$t('desk.consumerTotalA')}}：<span class="rightTopNum">￥{{numFormate(getRealPayFee.sum)}}</span>
        </div>
        <div class="rightBottom">
          {{$t('desk.payTotalB')}}：<span class="RightBottomNum">￥{{numFormate(detailData.payPrice)}}</span>
        </div>
      </div>
      <div class="lastRight">
        <img src="~@/assets/images/moreThan.png" class="rightTopImg" />
        <div class="hoverBox">
          <div><span>{{$t('desk.customer_xiaoJi')}}</span><span>¥ {{numFormate(getRealPayFee.total)}}；</span></div>
          <div><span>{{$t('desk.book_serveFee')}}（{{getRealPayFee.consumeTax}}）</span><span>¥{{numFormate(getRealPayFee.taxFee)}}；</span></div>
          <div><span>{{$t('desk.book_costFee')}}（{{getRealPayFee.servicePrice}}）</span><span>¥{{numFormate(getRealPayFee.service)}}；</span></div>
          <div><span>{{$t('desk.book_costFee2')}}（{{getRealPayFee.consumeTax}}）</span><span>¥{{numFormate(getRealPayFee.taxInFee)}}；</span></div>
          <div><span>{{$t('desk.book_wenquan')}}</span><span>¥{{numFormate(getRealPayFee.priceType15)}}；</span></div>
          <div><span>{{$t('desk.book_liveFee')}}</span><span>¥{{numFormate(getRealPayFee.priceType16)}}；</span></div>
          <div><span>{{$t('desk.serve_heji')}}</span><span>¥{{numFormate(getRealPayFee.sum)}}；</span></div>
        </div>
      </div>
    </div>
    <el-form ref="checkoutForm" :rules="paymentRules" :model="checkoutForm" label-width="110px">
      <el-form-item :label-width="detailData.totalPrice<0 ?'140px':'130px'" :label=" detailData.totalPrice<0 ? $t('desk.customer_refundWayA') : $t('desk.customer_refundWayB')" prop="payType">

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
        <el-select v-model="checkoutForm.enterId" :placeholder="$t('desk.customer_inputUnitName')" @change="getUnit" style="width: 260px">
          <el-option v-for="(item, index) in unitList" :key="index" :label="item.enterName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('desk.book_discountAmount')">
        <el-input size="small" type="number" v-model="checkoutForm.preferentialPrice" style="width: 260px" @change="changPreferentialPrice"></el-input>
      </el-form-item>
      <el-form-item :label="$t('desk.customer_sum')" prop="name">
        <!-- <el-input  size="small" v-model="checkoutForm.payPrice" :disabled="true" style="width: 260px"></el-input> -->

        <!-- {{getRealPayFee.sum - detailData.payPrice -  checkoutForm.preferentialPrice}} -->


        ￥{{numFormate(getPriceStr(getRealPayFee.sum - detailData.payPrice  - checkoutForm.preferentialPrice))}}
      </el-form-item>
      <el-form-item :label="$t('desk.home_note')">
        <el-input type="textarea" v-model="checkoutForm.remark" :placeholder="$t('desk.home_noteA')"></el-input>
      </el-form-item>
      <el-form-item label-width="40px">
        <el-checkbox v-model="checkoutForm.checked">{{$t('desk.book_printDocumentsA')}}</el-checkbox>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: right">
      <el-button type="primary" @click="printExpenseDetail">{{$t('desk.add_expenseDetail')}}</el-button>
      <el-button @click="checkoutVisible = false">{{$t('commons.cancel')}}</el-button>
      <el-button type="primary" @click="consume_oper">{{$t('commons.determine')}}</el-button>
    </div>
    <!-- 消费明细预览 -->
    <expenseDetail ref="expenseDetail"/>
  </el-dialog>
  </div>
  <!--
      1.商店部，餐饮部 2个类型价格不用计算税前税后
   -->
</template>
<script>
import myMixin from "@/utils/filterMixin";
import expenseDetail from "@/components/table/expenseDetail";

export default {
  mixins: [myMixin],
  props: ["detailData", "currentRoom"],
  data() {
    return {
      unitList: [],
      checkoutVisible: false, //内层结账退房dialog
      consumePrice: "",
      checkoutForm: {
        checkInId: "",
        priceType: "3",
        payPrice: "",
        payType: "1",
        preferentialPrice: "",
        enterId: "",
        creditName: "",
        putUp: "",
        remark: "",
        checked:true,
      }, //退房结账弹框的表单
      consumeOrderList: [],
      taxInfo: {},
      isPartPay: false,
    };
  },
  components: {
    expenseDetail,
  },
  computed: {
    paymentRules() {
      return {
        putUp: [
          {
            required: true,
            message: this.$t("desk.book_chooseAway"),
            trigger: "change",
          },
        ],
        enterName: [
          {
            required: true,
            message: this.$t("desk.customer_inputUnitName"),
            trigger: "change",
          },
        ],
        payType: [
          {
            required: true,
            message: this.$t("commons.placeChoose"),
            trigger: "change",
          },
        ],
      };
    },
    getRealPayFee() {
      //tax
      let list = this.consumeOrderList;
      // console.log(list)
      let tax = this.taxInfo;
      let consumeTax = tax.consumeTax ? tax.consumeTax / 100 : 0; //in对应的税率  type:false
      let outConsumeTax = tax.outConsumeTax ? tax.outConsumeTax / 100 : 0; //out对应的税率 type:true
      let servicePrice = tax.servicePrice ? tax.servicePrice / 100 : 0; //服务费率
      let total = 0; //小计
      let service = 0; //服务费
      let taxFee = 0; //消费税
      let sum = 0; //合计
      let taxInFee = 0; //税内消费税综合
      let priceType15 = 0; //温泉税
      let priceType16 = 0; //住宿税
      // let priceTypeList = [5,6,7,8,12,14,15,16,17,18]

      //7 赔偿不用计算
      //15，16温泉税和住宿税不需要计算税和服务费
      //餐饮部的消费金额 不需要计算税和服务费
      //商店部的商品消费金额不需要计算税和服务费
      //迷你吧那边计算的时候需要把税算上 未计算需要开发
      //计算 5 6 12三种房费的服务费和税  计算in类型的税率和费率
      list.forEach((element) => {
        // console.log('消费税' + element.taxStatus)
        // console.log('服务费' +element.seviceStatus)
        // console.log(element)
        if (element.state == 1) {
          let priceType = element.priceType;
          // console.log("财务类型" + priceType);
          total += parseFloat(element.consumePrice ? element.consumePrice : 0);
          //---------------------------
          //计算包含消费税的明细中的商品

          // console.log(element.taxStatus);
          // if(element.taxStatus == 2){
          //迷你吧
          if (priceType == 8) {
            // console.log(element);
            let goodsList = element.goodsList || [];
            goodsList.forEach((v) => {
              if (v.goodsObj.taxStatus == 2) {
                taxInFee += this.getTaxIn(consumeTax, v.totalPrice);
              }
            });
          }
          //餐费
          if (priceType == 14) {
            let disherOrderSubList = element.disherOrderSubList || [];
            disherOrderSubList.forEach((v) => {
              if (v.taxStatus == 2) {
                taxInFee += this.getTaxIn(consumeTax, v.totalPrice);
              }
            });
          }
          //17早餐  //18餐晚
          if (priceType == 17 || priceType == 18) {
            let attachMealObj = element.attachMealObj;
            console.log(attachMealObj)
            if (attachMealObj.taxStatus == 2) {
              taxInFee += this.getTaxIn(consumeTax,attachMealObj.mealPrice);
            }
          }

          //商品
          if (priceType == 22) {
            let shopOrderSubList = element.shopOrderSubList || [];
            shopOrderSubList.forEach((v) => {
              if (v.goods.taxStatus == 2) {
                taxInFee += this.getTaxIn(consumeTax, v.totalPrice);
              }
            });
          }
          // }
          if(priceType == 5 || priceType == 6){
            // console.log('房费')
            // console.log(element)
            // console.log(this.currentRoom)

            if (this.currentRoom.taxStatus == 2) {
              taxInFee += this.getTaxIn(consumeTax, element.consumePrice);
            }


            // console.log('房费')
          }

          //---------------------------
          // if(priceType == 5 || priceType == 6 || priceType == 12){
          // if(element.taxStatus == 1){
          taxFee += parseFloat(element.consumTaxPrice || 0);
          // }
          // if(element.seviceStatus == 1){
          service += parseFloat(element.servicePrice || 0);
          // }
          // }
          if (priceType == 15) {
            // console.log(priceType +':' +this.F_priceType(priceType))
            priceType15 = parseFloat(element.consumePrice);
          }
          if (priceType == 16) {
            // console.log(priceType +':' +this.F_priceType(priceType))
            priceType16 = parseFloat(element.consumePrice);
          }

          console.log(priceType + ":" + this.F_priceType(priceType));
          // console.log(element.consumePrice)
          // console.log(element.servicePrice)
          // console.log(element.consumTaxPrice)
        }
      });

      sum = total;
      console.log("小计：" + total);
      console.log("合计：" + sum);
      console.log("消费税：" + taxFee);
      console.log("税内消费税：" + taxInFee);
      console.log("消费税率：" + tax.consumeTax + "%");
      console.log("服务费：" + service);
      console.log("服务费率：" + tax.servicePrice + "%");
      console.log("温泉税：" + priceType15);
      console.log("住宿税：" + priceType16);
      let preferentialPrice =
        this.checkoutForm.preferentialPrice != "" &&
        this.checkoutForm.preferentialPrice > 0
          ? parseFloat(this.checkoutForm.preferentialPrice)
          : 0;
      let obj = {
        total: total,
        sum: sum,
        taxFee: taxFee + service,
        taxInFee: taxInFee,
        consumeTax: tax.consumeTax + "%",
        service: service,
        servicePrice: tax.servicePrice + "%",
        priceType15: priceType15,
        priceType16: priceType16,
        payFee: this.getPriceStr(sum - this.detailData.payPrice),
      };
      // console.log(obj)
      return obj;
    },
  },
  created() {},
  methods: {
    // 点击消费明细打印按钮
    printExpenseDetail(){
      this.$F.doRequest(
        this,
        "/pms/hotelservice/print_num",
        { typeStr: "SE" },
        (res) => {
         this.$refs.expenseDetail.openDialog(res);
        }
      );

    },
    resetVisibel() {
      this.checkoutVisible = true;

      if (this.detailData.totalPrice > 0) {
        this.consumePrice = this.detailData.totalPrice;
      } else {
        this.checkoutForm.payPrice = this.detailData.consumePrice;
      }
      this.checkoutForm.checkInId = this.$route.query.id;
      this.getConsumeOrderList();
      this.getUnitList();
      this.get_consume_tax();
      // console.log(this.currentRoom)
      console.log(this.detailData);
      // console.log(this.detailData.totalPrice)
    },
    //请求 单位 列表
    getUnitList() {
      this.$F.doRequest(this, "/pms/hotelenter/list", {}, (res) => {
        this.unitList = res.list;
        // console.log(this.unitList);
      });
    },
    getPutUp(value) {
      this.checkoutForm.putUp = value;
    },
    getUnit(value) {
      let list = this.unitList;
      for (let i in list) {
        if (list[i].id == value) {
          console.log(list[i]);
          this.checkoutForm.enterId = list[i].id;
          this.checkoutForm.creditName = list[i].enterName;
          break;
        }
      }
    },
    //修改优惠价格
    changPreferentialPrice() {
      let preferentialPrice = this.checkoutForm.preferentialPrice || 0;
      this.checkoutForm.payPrice = this.getRealPayFee.sum - preferentialPrice;
    },
    //
    getPriceStr(v) {
      if (v) {
        return Math.abs(v);
      }
    },
    getConsumeOrderList() {
      let info = {
        checkInId: this.checkoutForm.checkInId,
        state: "",
        pageIndex: 1,
        pageSize: 100,
      };
      if(localStorage.getItem('roomType') == 'customer'){
          info.roomId = this.currentRoom.roomId
      }else{
          info.roomId = ''
      }
      this.$F.doRequest(
        this,
        "/pms/consume/consume_order_list",
        info,
        (res) => {
          // console.log(res.consumeOrderList)
          let list = res.consumeOrderList;
          let priceTypeList = [5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 22]; //消费类集合
          let arr = [];
          for (let i = 0; i < list.length; i++) {
            // console.log(list[i].priceType)
            let priceType = list[i].priceType;
            if (priceTypeList.indexOf(priceType) > -1) {
              if (list[i].state == 1) {
                //  console.log(list[i].priceType)
                // console.log(list[i].priceType +':' +this.F_priceType(list[i].priceType))

                arr.push(list[i]);
              }
            }
          }
          console.log(arr);
          this.consumeOrderList = arr;
        }
      );
    },
    //退房结账

    getFee() {
      let preferentialPrice = this.checkoutForm.preferentialPrice;
      if (!preferentialPrice || preferentialPrice == "") {
        preferentialPrice = 0;
      } else {
        preferentialPrice = parseFloat(preferentialPrice);
      }
      //消费 1000
      //付款 500
      //优惠 10

      if (this.getRealPayFee.sum - this.detailData.payPrice > 0) {
        return this.getRealPayFee.sum - this.detailData.payPrice - preferentialPrice;
      } else {
        return (
          this.detailData.payPrice - this.getRealPayFee.sum - preferentialPrice
        );
      }
    },
// 退房结账弹框点击确定
    consume_oper() {
      if (this.checkoutForm.payType == 4 && !this.checkoutForm.remark) {
        this.$message({
          message: this.$t("desk.home_noteA"),
          type: "warning",
        });
        return false;
      }

      console.log(this.detailData);
      console.log(this.currentRoom);
      let checkoutForm = this.checkoutForm;
      console.log(checkoutForm);
      let params = {
        checkInId: checkoutForm.checkInId,
        priceType: checkoutForm.priceType,
        // payPrice: this.getFee(),
        payType: checkoutForm.payType,
        preferentialPrice: checkoutForm.preferentialPrice,
        roomId: this.currentRoom.roomId,
        roomNum: this.currentRoom.houseNum,
        remark: checkoutForm.remark,
        state: 2
      };

      // if(localStorage.getItem('roomType') == 'customer'){
      //     params.state = 2
      // }else{
      //     params.state = 1
      // }



      if (checkoutForm.putUp) {
        params.putUp = checkoutForm.putUp;
      }
      if (checkoutForm.enterId) {
        params.enterId = checkoutForm.enterId;
        params.creditName = checkoutForm.creditName;
      }
      // console.log(params);
      // console.log(this.detailData.payPrice);
      // console.log(this.getRealPayFee.sum);

        if(this.detailData.payPrice - this.getRealPayFee.sum < 0){
            params.payPrice = this.getFee()
            // console.log(1)
            // console.log(this.getFee())
        }else{
            params.payPrice = 0 - this.getFee()
            // console.log(2)
            // console.log(0 - this.getFee())
            params.priceType = 4
        }
      console.log(params);


      // return

      this.$F.doRequest(this, "/pms/consume/consume_oper", params, (res) => {
        console.log(res);
        let transferObj ={
          checked:this.checkoutForm.checked,
          orderId:res.orderId,
          type:'checkoutTao'   //退房结账
        }
        this.set_out_check_in(transferObj);
      });
    },

    set_out_check_in(transferObj) {
      // console.log(this.isArrSame(res.consumeOrderList,1)) // 判断是否都为1
      // console.log(this.isArrSame(res.consumeOrderList,2)) //判断是否都为2
      // 未结状态 1
      //已结状态 2
      //判断 state状态全是1 billType =  1  ,state状态全是2 billType =  3, state状态全有1和2 billType =4
      // let array = [1,1,1,1]
      // let array = [2,2,2,2]
      // let array = [1,2,1,2]
      // let array = this..consumeOrderList.map(v=>{
      //    return v.state
      // });
      // console.log(array);
      let params = {};
      params.checkInId = this.checkoutForm.checkInId;
      params.billType = 1;
      let roomIds = [];
      if (this.currentRoom && this.currentRoom.roomId) {
         roomIds.push(this.currentRoom.roomId);
      } else {
        this.detailData.inRoomList.forEach((room) => {
          if (room.state == 1) {
            roomIds.push(room.roomId);
          }
        });
      }
      if(localStorage.getItem('roomType') == 'order'){
        params.roomIds = roomIds.join(',');
      }else{
        params.roomIds =  this.currentRoom.roomId
      }


      //console.log(this.isArrSame(array,1))
      //console.log(this.isArrSame(array,2))
      // if(this.isArrSame(array,1) == true){
      //     params.billType = 1
      // }else if(this.isArrSame(array,2) == true){
      //    params.billType = 3
      // }else{
      //    params.billType = 4
      // }
      console.log(params);
      // return

      this.$F.doRequest(this, "/pms/checkin/out_check_in", params, (res) => {
        console.log(res);
      });
       this.$F.doRequest(
        this,
        "/pms/hotelservice/print_num",
        { typeStr: "ME" },
        (res) => {
          transferObj.checkOutRoomNum = res;
           this.$emit("getOrderDetail",transferObj);
        }
      );
    },
    //判断数组中的值是否相同
    isArrSame(array, state) {
      return !array.some(function (value, index) {
        return value !== state;
      });
    },
    get_consume_tax() {
      let params = {
        userId: this.userId,
        storesNum: this.storesNum,
      };
      this.$F.doRequest(
        this,
        "/pms/hotelparam/get_consume_tax",
        params,
        (res) => {
          if (res && res.content) {
            this.taxInfo = JSON.parse(res.content);
            console.log(this.taxInfo);
          }
        }
      );
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
        margin-bottom: 5px;
      }
    }
  }
}
</style>
