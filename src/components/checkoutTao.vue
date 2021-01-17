<!--
 * @Date: 2020-12-28 10:31:06
 * @Author: 陶子
 * @LastEditTime: 2021-01-11 15:30:52
 * @FilePath: \jiudian\src\components\checkoutTao.vue
-->
  <!-- 结账退房dialog组件-->
  <!--未调-->
  <template>
  <el-dialog top="0" width="60%" :title="$t('desk.order_checkoutA')" :visible.sync="checkoutVisible" append-to-body>
    <div class="innerBoxTop">
      <span>{{$t('desk.home_roomType')}}：{{currentRoom.roomTypeName}} </span>
      <span>{{$t('desk.home_roomNum')}}：{{currentRoom.houseNum}}</span>
      <span>{{$t('desk.customer_livePeople')}}：{{currentRoom.personList && currentRoom.personList[0] && currentRoom.personList[0].name}}</span>
    </div>
    <div class="priceBox">
      <div class="leftPrice" v-if="detailData.totalPrice>0"><span>{{$t('desk.order_receivable')}}</span>：{{detailData.totalPrice}}</div>
      <div class="leftPrice" v-if="detailData.totalPrice<0"><span>{{$t('desk.order_shouldBack')}}</span>：{{getPriceStr(detailData.totalPrice)}}</div>
      <div class="centerLine"></div>
      <div class="rightPrcie">
        <div class="rightTop">
          {{$t('desk.consumerTotal')}}：<span class="rightTopNum">{{detailData.consumePrice}}</span>
        </div>
        <div class="rightBottom">
          {{$t('desk.payTotal')}}：<span class="RightBottomNum">{{detailData.payPrice}}</span>
        </div>
      </div>
      <div class="lastRight">
        <img src="~@/assets/images/moreThan.png" class="rightTopImg" />
        <div class="hoverBox">
          <div><span>{{$t('desk.customer_xiaoJi')}}</span><span>¥200；</span></div>
          <div><span>{{$t('desk.book_serveFee')}}（15%）</span><span>¥100；</span></div>
          <div><span>{{$t('desk.book_costFee')}}（12%）</span><span>¥100；</span></div>
          <div><span>{{$t('desk.book_wenquan')}}</span><span>¥100；</span></div>
          <div><span>{{$t('desk.book_liveFee')}}</span><span>¥100；</span></div>
          <div><span>{{$t('desk.serve_heji')}}</span><span>¥400；</span></div>
        </div>
      </div>
    </div>
    <el-form ref="checkoutForm" :rules="paymentRules" :model="checkoutForm" label-width="110px">
      <el-form-item :label="$t('desk.customer_payType')" prop="payType" v-if="detailData.totalPrice>0">
        <el-radio-group v-model="checkoutForm.payType">
          <el-radio v-for="(value, key) in $t('commons.payType')" :label="key" :key="key">{{ value }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('desk.customer_refundWay')" prop="resource" v-if="detailData.totalPrice<0">
        <el-radio-group v-model="checkoutForm.resource">
          <el-radio label="">{{$t('desk.serve_cashA')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('desk.book_accountWay')" v-if="checkoutForm.resource == '3'" prop="region">
        <el-select v-model="checkoutForm.region" :placeholder="$t('desk.book_chooseAway')" style="width: 260px">
          <el-option v-for="(item, index) in $t('commons.paymentWay')" :key="index" :value="index" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('desk.customer_buyerUnitA')" v-if="checkoutForm.resource == '3'" prop="enterName">
        <el-select v-model="checkoutForm.enterName" :placeholder="$t('desk.customer_inputUnitName')" style="width: 260px">
          <el-option v-for="(item, index) in unitList" :key="index" :label="item.enterName" :value="item.enterName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('desk.book_discountAmount')">
        <el-input v-model="checkoutForm.name" style="width: 260px"></el-input>
      </el-form-item>
      <el-form-item :label="$t('desk.customer_sum')" prop="name">
        <el-input v-model="checkoutForm.consumePrice" :disabled="true" style="width: 260px"></el-input>
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
      <el-button type="primary" @click="saveOrder">{{$t('desk.book_billAback')}}</el-button>
    </div>
  </el-dialog>
</template>
  <script>
export default {
  props: ["detailData", "currentRoom"],
  data() {
    return {
      unitList: [],
      checkoutVisible: false, //内层结账退房dialog
      checkoutForm: {
        consumePrice: null,
        resource: "",
        
        
        
      }, //退房结账弹框的表单
    };
  },
  computed: {
    paymentRules() {
      return {
        payType: [
          {
            required: true,
            message: this.$t("desk.customer_choosePayType"),
            trigger: "change",
          },
        ],
        region: [
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
        resource: [
          {
            required: true,
            message: this.$t("commons.placeChoose"),
            trigger: "change",
          },
        ],
      };
    },
  },
  created() {
    this.getUnitList();
  },
  methods: {
    resetVisibel() {
      this.checkoutVisible = true;
      // if (this.detailData.totalPrice > 0) {
      //   this.checkoutForm.consumePrice = this.detailData.totalPrice;
      // } else {
      //   this.checkoutForm.consumePrice = -this.detailData.totalPrice;
      // }
      console.log(this.detailData);
      console.log(this.currentRoom);
    },



    //请求 单位 列表
    getUnitList() {
      this.$F.doRequest(this, "/pms/hotelenter/list", {}, (res) => {
        this.unitList = res.list;
        console.log(this.unitList);
      });
    },
    getPriceStr(v){
        if(v){
            return Math.abs(v);
        }
    },
    saveOrder(){

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
      position: relative;
      top: 50px;
      left: 10px;
      box-sizing: border-box;
      padding: 20px;
      width: 240px;
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
