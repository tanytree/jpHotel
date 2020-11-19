<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-16 16:16:04
 * @FilePath: \jiudian\src\views\market\customer\children\comTaodetail.vue
 -->
<template>
  <div v-loading="loading">
    <el-card>
      <!-- 头部导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item @click.native="danweiClick()" class="point">{{
            $t("desk.customer_unitManage")
          }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t("commons.detail") }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bodyInfo" v-if="!loading">
        <div class="mianInfo">
          <div class="thisOrderInfo">
            <div class="wrap">
              <el-form inline size="small" label-width="80px">
                <el-row class="row">
                  <el-col :span="8" class="col">
                    <el-form-item :label="$t('desk.customer_unitName') + ':'">
                      {{ detailForm.enterName
                      }}<span v-if="detailForm.enterPinyin"
                        >【{{ detailForm.enterPinyin }}】</span
                      >
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" class="col">
                    <el-form-item :label="$t('desk.customer_unitNum') + ':'">{{
                      detailForm.enterNo
                    }}</el-form-item>
                  </el-col>
                </el-row>
                <el-row class="row">
                  <el-col :span="6" class="col">
                    <el-form-item :label="$t('desk.customer_contactA') + ':'">{{
                      detailForm.contactName
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="7" class="col">
                    <el-form-item :label="$t('desk.home_phoneNumA') + ':'">{{
                      detailForm.contactPhone
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8" class="col">
                    <el-form-item label="email:">{{
                      detailForm.email
                    }}</el-form-item>
                  </el-col>
                </el-row>
                <el-row class="row">
                  <el-col :span="6" class="col">
                    <el-form-item
                      :label="$t('desk.customer_unitAddress') + ':'"
                      >{{ detailForm.address }}</el-form-item
                    >
                  </el-col>
                  <el-col :span="7" class="col">
                    <el-form-item
                      :label="$t('desk.customer_unitPhone') + ':'"
                      >{{ detailForm.mobile }}</el-form-item
                    >
                  </el-col>
                  <el-col :span="8" class="col">
                    <el-form-item :label="$t('desk.customer_faxNum') + ':'">{{
                      detailForm.fax
                    }}</el-form-item>
                  </el-col>
                </el-row>
                <el-row class="row">
                  <el-col :span="7" class="col">
                    <el-form-item
                      :label="$t('desk.customer_pricingStrategy') + ':'"
                      >
                      {{checkEnterStrategyId(detailForm.enterStrategyId)}}
                      </el-form-item
                    >
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row class="row">
                  <el-col :span="6" class="col">
                    <el-form-item :label="$t('desk.customer_bankName') + ':'">{{
                      detailForm.bankName
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="7" class="col">
                    <el-form-item :label="$t('desk.customer_bankNo') + ':'">{{
                      detailForm.bankCard
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="8" class="col">
                    <el-form-item
                      :label="$t('desk.customer_branchName') + ':'"
                      >{{ detailForm.branchEnterName }}</el-form-item
                    >
                  </el-col>
                </el-row>
                <el-row class="row">
                  <el-col :span="6" class="col">
                    <el-form-item :label="$t('desk.customer_branchNo') + ':'">{{
                      detailForm.branchEnterNo
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="7" class="col">
                    <el-form-item
                      :label="$t('desk.customer_branchAddress') + ':'"
                      >{{ detailForm.branchEnterAddress }}</el-form-item
                    >
                  </el-col>
                  <el-col :span="8" class="col">
                    <el-form-item
                      :label="$t('desk.customer_branchPhone') + ':'"
                      >{{ detailForm.branchEnterTelephone }}</el-form-item
                    >
                  </el-col>
                </el-row>
                <el-row class="row">
                  <el-col :span="6" class="col">
                    <el-form-item
                      :label="$t('desk.customer_accountNum') + ':'"
                      >{{ detailForm.accountNo }}</el-form-item
                    >
                  </el-col>
                  <el-col :span="7" class="col">
                    <el-form-item :label="$t('desk.customer_accName') + ':'">{{
                      detailForm.accountName
                    }}</el-form-item>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row class="row">
                  <el-col :span="6" class="col">
                    <el-form-item
                      :label="$t('desk.customer_unitHeader') + ':'"
                      label-width="90px"
                      >{{ detailForm.headeName }}
                      <span v-if="detailForm.headePinyin"
                        >【{{ detailForm.headePinyin }}】</span
                      >
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" class="col">
                    <el-form-item
                      :label="$t('desk.customer_amountCapital') + ':'"
                      >{{ detailForm.totalFee }}</el-form-item
                    >
                  </el-col>
                  <el-col :span="8" class="col">
                    <el-form-item
                      :label="$t('desk.customer_employeeNum') + ':'"
                      >{{ detailForm.personNo }}</el-form-item
                    >
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
// import {
//     get_user_enterprise
// } from "@/utils/api/company";

export default {
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
      loading: false,
      type: "edit",
      setCardFormVisible: false,
      formLabelWidth: "120px",
      cardForm: {
        titleName: "",
        type: "",
        name: "",
      },
      detailForm: {
        name: "",
      },
      strategyList: [],
      alldayList: [],
      salesList: [],
    };
  },
  async mounted() {
    console.log(this.$route);
    let id = this.$route.query.id;
    this.hotel_price_enter_strategy_list();
    this.hotel_rule_allday_list();
     await this.findone(id);
    this.$F.commons.fetchSalesList({ salesFlag: 1 }, (data) => {
      this.salesList = data.hotelUserList;
    });
  },
  methods: {
    ...mapMutations({
      resetActive: "resetActive",
    }),
    danweiClick() {
      this.resetActive("company");
      this.$router.go(-1);
    },
    /**单位详情 */
    findone(id) {
      return new Promise((resolve, reject) => {
        this.loading = true;
        this.$F.doRequest(
          this,
          "/pms/hotelenter/findone",
          { id: id },
          (res) => {
            this.loading = false;
            let data = res;
            data.shareFlag = data.shareFlag == 1 ? true : false;
            data.state = data.state == 1 ? true : false;
            this.detailForm = data;
            console.log(this.detailForm);
            resolve(res);
          }
        );
      });
    },
    setCardFormBtnClick(v) {
      let enums = {
        1: this.$t("desk.customer_changeCardOperate"),
        2: this.$t("desk.customer_resetMemType"),
        3: this.$t("desk.customer_memStop"),
        4: this.$t("desk.customer_lossOperate"),
      };
      this.cardForm.type = v;
      this.cardForm.titleName =
        v && enums[v] ? enums[v] : this.$t("desk.serve_other");
      this.setCardFormVisible = true;
    },
    /**价格策略单位列表 */
    hotel_price_enter_strategy_list() {
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_price_enter_strategy_list",
        {},
        (res) => {
          this.strategyList = res;
        }
      );
    },
     checkEnterStrategyId(enterStrategyId){
      for(let i = 0;i < this.strategyList.length;i++){
        if( enterStrategyId == this.strategyList[i].id){
          return this.strategyList[i].ruleName;
        }
      }
    },
    /**计费规则全天房计费列表 */
    hotel_rule_allday_list() {
      let params = {
        ruleName: "",
        priceModel: "",
        state: 1,
        pageIndex: 1,
        pageSize: 999,
      };
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_rule_allday_list",
        params,
        (res) => {
          this.alldayList = res.list;
        }
      );
    },
    setStrategyName(id) {
      for (let k in this.strategyList) {
        if (this.strategyList[k].id == id) {
          return this.strategyList[k].ruleName;
        }
      }
      return "";
    },
    setAlldayName(id) {
      for (let k in this.alldayList) {
        if (this.alldayList[k].id == id) {
          return this.alldayList[k].ruleName;
        }
      }
      return " ";
    },
    setSalesIdName(id) {
      for (let k in this.salesList) {
        if (this.salesList[k].id == id) {
          return this.salesList[k].userName;
        }
      }
      return " ";
    },
  },
};
</script>

<style lang="less" scoped>
.fixedFoot {
  text-align: right;
  position: fixed;
  bottom: 0;
  left: 200px;
  right: 20px;
  background: #fff;
  border-top: 1px solid #eee;
  z-index: 9;
}

.fixedFoot .wrap {
  padding: 10px 20px;
}

.fixedFoot .wrap button {
  margin-left: 20px;
}

.thisOrderInfo {
  background: #fff;
  padding-bottom: 30px;

  .wrap {
    padding: 0 20px;

    h3 {
      margin: 0;
      font-size: 15px;
      color: #333;
    }

    .cell {
      padding: 5px 0;
      font-size: 14px;
      color: #333;
    }

    .topCell {
      .item {
        background: #e2e8f0;
        padding: 30px 0;

        .thisItem {
          display: inline-block;
          text-align: center;
          flex: 1;
        }
      }
    }
  }
}
.point {
  cursor: pointer;
}
</style>
