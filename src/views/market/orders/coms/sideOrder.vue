<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-24 14:26:36
 * @FilePath: \jiudian\src\views\market\orders\coms\sideOrder.vue
 -->
<template>
  <el-dialog top="0" :title="$t('desk.side_sideBooked')" :visible.sync="visible" :lock-scroll="false" width="800px">
    <div class="topBox">
      <span>{{$t('desk.home_roomNum')}}：{{ currentRoom2.houseNum }}</span><span>{{$t('desk.customer_livePeople')}}：{{ detailData.checkIn.name }}</span>
    </div>
    <div class="title_one">{{$t('desk.add_bookSelect')}}：</div>
    <div class="flexBox" v-for="(data, i) in tableData" :key="i">
      <div class="name">{{ data.name }}</div>
      <div class="breakfast">{{ $t('manager.hk_breakfast') }}-{{ data.mealName ? `【${data.mealName}￥ ${data.mealPrice} 】` : $t('manager.hk_toward_malu')}}</div>
      <div class="dinner">{{ $t('manager.hk_dinner') }}-{{ data.mealNameDinner ? `【${data.mealNameDinner}￥ ${data.mealPriceDinner} 】` : $t('manager.hk_toward_malu')}}</div>
    </div>

    <!--    <div class="title_one" style="margin-bottom:10px">{{$t('desk.add_billSide')}}：{{$t('desk.add_notDo')}}</div>-->
    <el-form :model="sideForm" ref="sideForm" label-width="100px" class="demo-ruleForm">
      <el-row v-if="currentRoom2.personList&&currentRoom2.personList.length>0">
        <el-form-item :label="$t('desk.order_addDayPrice')+':'">
          <el-input size="small" style="width:215px" type="number" @input="updeInputNum" v-model="roomPrice"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item :label="$t('desk.editor_asideBreakfast')+':'" prop="region">
            <el-select v-model="sideForm.attachMealIdBreatfast" size="small" @change="hotelattaChmealChange(sideForm.attachMealIdBreatfast, 1)">
              <el-option v-for="item in hotelattaChmealList" :key="item.id" :label="item.mealName" :value="item.id" v-if="item.mealTime == 1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="10px">
            <el-input-number size="small" v-model="currentHotelAttaChamealBreakfast.attachMealCount" :min="1" @change="attachMealCountChange(1)"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('desk.customer_sum') + ':'" prop="desc">
            <el-input disabled v-model="currentHotelAttaChamealBreakfast.consumePrice" size="small" style="width:120px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item :label="$t('desk.editor_asideDinner')+':'" prop="region">
            <el-select v-model="sideForm.attachMealIdDinner" size="small" @change="hotelattaChmealChange(sideForm.attachMealIdDinner, 2)">
              <el-option v-for="item in hotelattaChmealList" :key="item.id" :label="item.mealName" :value="item.id" v-if="item.mealTime == 2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="10px">
            <el-input-number size="small" v-model="currentHotelAttaChamealDinner.attachMealCount" :min="1" @change="attachMealCountChange(2)"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('desk.customer_sum') + ':'" prop="desc">
            <el-input disabled v-model="currentHotelAttaChamealDinner.consumePrice" size="small" style="width:120px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item :label="$t('desk.add_bookProject')+':'">
          <el-select size="small" v-model="sideForm.reserveId">
            <el-option v-for="item in detailData.checkIn.reserveProjectList" :key="item.id" :label="item.projectName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item :label="$t('desk.home_note') + ':'" prop="desc">
          <el-input type="textarea" v-model="sideForm.remark" style="width:350px"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible=false">{{ $t('commons.close') }}</el-button>
      <el-button type="primary" @click="consumeOper">{{$t('desk.enterAccountC')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import myMixin from "@/utils/filterMixin";

export default {
  mixins: [myMixin],
  props: ["detailData", "currentRoom", "tax"],
  data() {
    return {
      currentHotelAttaChameal: {},
      currentHotelAttaChamealBreakfast: {
        attachMealCount: 1,
        consumePrice: 0,
      },
      currentHotelAttaChamealDinner: {
        attachMealCount: 1,
        consumePrice: 0,
      },
      currentRoom2: {},
      roomId: "",
      hotelattaChmealList: [],
      visible: false,
      sideForm: {
        attachMealIdBreatfast: "",
        attachMealIdDinner: "",
        priceType: "1", //项目类型 需要确定
        payType: "1", //结算方式 1现金 2银行卡 3支付宝 4微信 5会员卡  7信用卡 0其他类型（比如挂账和免单等无需支付类型）
        consumePrice: 0,
        attachMealId: "",
        attachMealCount: 1,
        roomId: "",
        roomNum: "",
        remark: "",
      },
      checkInId: "",

      tableData: [],
      roomPrice:0,    //这是房费，可以输入的

    };
  },
  created() {
    this.fetchHotelattaChmealList();
  },
  methods: {
    updeInputNum(){
      this.$forceUpdate();
    },
    init(checkInId) {
      this.sideForm = {
        attachMealIdBreatfast: "",
        attachMealIdDinner: "",
        priceType: "1", //项目类型 需要确定
        payType: "1", //结算方式 1现金 2银行卡 3支付宝 4微信 5会员卡  7信用卡 0其他类型（比如挂账和免单等无需支付类型）
        consumePrice: 0,
        attachMealId: "",
        attachMealCount: 1,
        roomId: "",
        roomNum: "",
        remark: "",
      };
      this.currentHotelAttaChamealBreakfast = {
        attachMealCount: 1,
        consumePrice: 0,
      };
      this.currentHotelAttaChamealDinner = {
        attachMealCount: 1,
        consumePrice: 0,
      };
      // console.log(this.currentRoom);
      this.currentRoom2 = this.currentRoom;
      //如果没有当前房间 默认到主账房
      if (this.currentRoom && this.currentRoom.roomId) {
        this.roomId = this.currentRoom.roomId;
      } else {
        this.currentRoom2 = this.detailData.inRoomList[0];
        this.roomId = this.detailData.inRoomList[0].roomId;
      }
      this.checkInId = checkInId;
      console.log(this.currentRoom2);
      if (this.currentRoom2.personList&&this.currentRoom2.personList.length > 0) {
          let tempArray = this.currentRoom2.personList.filter(person => {
             return person.personType == 2
            }) || [];

          // this.sideForm.consumePrices = tempArray[0].housePrice
          this.roomPrice = tempArray[0].housePrice;
          }
      this.getData();
      this.visible = true;

    },
    clickDelete() {
      this.$confirm(
        this.$t("manager.grsl_ifSureDeleteA"),
        this.$t("commons.tip_desc"),
        {
          confirmButtonText: this.$t("commons.confirm"),
          cancelButtonText: this.$t("commons.cancel"),
          type: "warning",
        }
      )
        .then(() => {})
        .catch(() => {});
    },

    //加载附餐记录
    getData() {
      let params = {
        checkInId: this.checkInId,
      };
      this.$F.doRequest(
        this,
        "/pms/hotelattachmeal/check_in_meal_order_list",
        params,
        (res) => {
          this.tableData =
            res.filter((item) => {
              return item.roomId == this.currentRoom2.roomId;
            }) || [];
          this.$forceUpdate();
        }
      );
    },

    //计算附餐种类的消费税和服务费
    getTaxServerFee(obj) {
      // console.log(obj)

      let tax = this.tax;
      let consumeTax = tax.consumeTax ? tax.consumeTax / 100 : 0; //in对应的税率  type:false
      // let outConsumeTax = tax.outConsumeTax ?  tax.outConsumeTax / 100 : 0 //out对应的税率 type:true
      let servicePrice = tax.servicePrice ? tax.servicePrice / 100 : 0;
      let service = 0; //服务费
      let taxFee = 0; //消费税
      let total = 0;
      if (obj.taxStatus == 1) {
        if (obj.seviceStatus == 1) {
          //不包含服务税
          //  1,1,fasle,in
          taxFee +=
            (obj.consumePrice + obj.consumePrice * servicePrice) * consumeTax;
          // taxFee += ( element.totalPrice + element.totalPrice * servicePrice ) * consumeTax
        } else {
          //1,2,false,in
          taxFee += obj.consumePrice * consumeTax;
        }
      }
      //不包含服务税
      if (obj.seviceStatus == 1) {
        //不包含消费税
        if (obj.taxStatus == 1) {
          service += obj.consumePrice * servicePrice;
        } else {
          //包含消费税
          let f = 1.0 + consumeTax;
          service += (obj.consumePrice / f) * servicePrice;
        }
      }
      let pms = {
        service: service ? parseFloat(service) : 0,
        taxFee: taxFee ? parseFloat(taxFee) : 0,
        total: service + taxFee,
      };
      // console.log(pms)
      return pms;
    },


    consumeOper(params = {}) {
      // if (!this.currentHotelAttaChameal.id) {
      //   return this.$message({
      //     type: "warning",
      //     message: this.$t("commons.request_success"),
      //   });
      // }
        if(!!this.sideForm.attachMealIdDinner || !!this.sideForm.attachMealIdBreatfast){
          params = this.sideForm;
          params.checkInId = this.checkInId;
          params.roomId = this.currentRoom2.roomId;
          params.roomNum = this.currentRoom2.houseNum;
          params.state = 1;
          // params.consumePrice = this.currentRoom2.personList[0].housePrice;
          params.consumePrice = this.roomPrice;
          // 加收全天房费
          let info = {
             checkInId:this.checkInId,
             roomId:this.currentRoom2.roomId,
             roomNum:this.currentRoom2.houseNum,
             state:1
          }
          let tax = this.tax
          let consumeTax = tax.consumeTax ?  tax.consumeTax / 100 : 0  //in对应的税率
          let servicePrice = tax.servicePrice ? tax.servicePrice / 100 : 0
          let consumePrices = params.consumePrice
          let priceType =  5
          let service = 0 //服务费
          let taxFee = 0 //消费税
          if(priceType == 5){
              if(this.currentRoom2.taxStatus == 1){
                  if(this.currentRoom2.seviceStatus == 1){
                     //不包含服务税
                     //  1,1,fasle,in
                      taxFee += ( parseFloat(consumePrices) + parseFloat(consumePrices * servicePrice) ) * consumeTax
                  }else{
                     //1,2,false,in
                     taxFee += parseFloat(consumePrices * consumeTax)
                  }
              }
              //不包含服务税
              if(this.currentRoom2.seviceStatus == 1){
                  //不包含消费税
                  if(this.currentRoom2.taxStatus == 1){
                      service += parseFloat(consumePrices * servicePrice)
                  }else{
                      //包含消费税
                      let f = 1.00 + consumeTax
                      service += parseFloat((consumePrices / f) * servicePrice)
                  }
              }
              let pms = {
                  service: service ? parseFloat(service).toFixed(0) :0,
                  taxFee:taxFee ? parseFloat(taxFee).toFixed(0) : 0
              }
          }
          info.consumTaxPrice  =  parseFloat(taxFee).toFixed(0)
          info.servicePrice  = parseFloat(service).toFixed(0)
          let p = parseFloat(consumePrices || 0)  +  parseFloat(service) +  parseFloat(taxFee)
          info.consumePrice =  parseFloat(p).toFixed(0)
          info.priceType = priceType
          info.payPrice = ''
          this.$F.doRequest(this, "/pms/consume/consume_oper", info, (res) => {
          // this.$emit("getOrderDetail"); //暂时不执行回调订单详情等附餐选择接口完毕后重新刷新接口即可
          });
          // 加收全天房费


          params = this.sideForm;
          params.checkInId = this.checkInId;
          params.roomId = this.currentRoom2.roomId;
          params.roomNum = this.currentRoom2.houseNum;
          params.state = 1;
          // params.consumePrice = this.currentRoom2.personList[0].housePrice;
          params.consumePrice = this.roomPrice;
          // return

          if (this.sideForm.attachMealIdBreatfast) {
            let all = this.getTaxServerFee(this.currentHotelAttaChamealBreakfast);
            // console.log('1')
            // console.log(all)
            params.priceType = 17;
            params.attachMealId = this.sideForm.attachMealIdBreatfast;
            params.consumePrice = parseFloat(
              this.currentHotelAttaChamealBreakfast.consumePrice + all.total
            ).toFixed(0);
            params.attachMealCount = this.currentHotelAttaChamealBreakfast.attachMealCount;
            params.consumTaxPrice = parseFloat(all.taxFee).toFixed(0);
            params.servicePrice = parseFloat(all.service).toFixed(0);
            console.log(params);
            // return
            this.$F.doRequest(this, "/pms/consume/consume_oper", params, (res) => {
              this.visible = false;
              this.$emit("getOrderDetail");
            });
          }
          if(this.sideForm.attachMealIdDinner) {
            let att = this.getTaxServerFee(this.currentHotelAttaChamealDinner);
            // console.log('2')
            // console.log(att)
            params.priceType = 18;
            params.attachMealId = this.sideForm.attachMealIdDinner;
            params.consumePrice = parseFloat(
              this.currentHotelAttaChamealDinner.consumePrice + att.total
            ).toFixed(0);
            params.attachMealCount = this.currentHotelAttaChamealDinner.attachMealCount;
            params.consumTaxPrice = parseFloat(att.taxFee).toFixed(0);
            params.servicePrice = parseFloat(att.service).toFixed(0);
            // console.log(params)
            // return
            this.$F.doRequest(this, "/pms/consume/consume_oper", params, (res) => {
              this.visible = false;
              this.$emit("getOrderDetail");
            });
          }
        }else{
            this.$message ('请选择附餐');
            return false
        }
    },

    //加載早餐晚餐
    fetchHotelattaChmealList() {
      this.$F.doRequest(
        this,
        "/pms/hotelattachmeal/list",
        {
          pageIndex: 1,
          pageSize: 999,
          state: 1, //1启用 2禁用
        },
        (res) => {
          // res.list.sort((a, b) => {
          //   if (a.mealTime < b.mealTime) {
          //     return -1;
          //   }
          //   if (b.mealTime < a.mealTime) {
          //     return 1;
          //   }
          //   return 0;
          // });
          // res.list.forEach((item) => {
          //   item.mealName =
          //     (item.mealTime == 1
          //       ? this.$t("manager.hk_breakfast")
          //       : this.$t("manager.hk_dinner")) +
          //     "-" +
          //     item.mealName;
          // });
          console.log(res.list);
          this.hotelattaChmealList = res.list;
          this.$forceUpdate();
        }
      );
    },

    attachMealCountChange(mealTime) {
      if (mealTime == 1 && this.sideForm.attachMealIdBreatfast) {
        this.currentHotelAttaChamealBreakfast.consumePrice =
          this.currentHotelAttaChamealBreakfast.mealPrice *
          this.currentHotelAttaChamealBreakfast.attachMealCount;
      } else if (mealTime == 2 && this.sideForm.attachMealIdDinner) {
        this.currentHotelAttaChamealDinner.consumePrice =
          this.currentHotelAttaChamealDinner.mealPrice *
          this.currentHotelAttaChamealDinner.attachMealCount;
      }
      //   if (this.currentHotelAttaChameal.id) {
      //   this.sideForm.consumePrice =
      //     this.currentHotelAttaChameal.mealPrice *
      //     this.sideForm.attachMealCount;
      // }
    },

    hotelattaChmealChange(id, mealTime) {
      let node = this.hotelattaChmealList.filter((item) => {
        return item.id == id;
      })[0];
      if (mealTime == 1) {
        this.$F.merge(this.currentHotelAttaChamealBreakfast, node);
        this.currentHotelAttaChamealBreakfast.consumePrice =
          node.mealPrice *
          this.currentHotelAttaChamealBreakfast.attachMealCount;
      } else {
        this.$F.merge(this.currentHotelAttaChamealDinner, node);
        this.currentHotelAttaChamealDinner.consumePrice =
          node.mealPrice * this.currentHotelAttaChamealDinner.attachMealCount;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.topBox {
  margin-top: -16px;

  span {
    &:nth-last-child(-n + 1) {
      margin-left: 50px;
    }
  }
}

.title_one {
  font-weight: 600;
  margin-top: 15px;
}

.flexBox {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 12px;

  .name {
    width: 120px;
  }

  .breakfast {
    width: 200px;
  }

  .dinner {
    width: 200px;
  }
}

.dialog-footer {
  text-align: center;
}
</style>
