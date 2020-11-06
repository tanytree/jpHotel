<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-20 14:36:07
 * @FilePath: \jiudian\src\views\market\customer\children\companydetail.vue
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
              <el-form inline size="small" label-width="120px">
                <el-row class="row">
                  <el-row class="topCell" :gutter="20">
                    <el-col :span="6" class="col">
                      <div class="item">
                        <div class="box">
                          <div class="thisItem">
                            {{ $t("desk.customer_totalPayment") }}
                          </div>
                          <div class="thisItem">
                            <span class="text-red">{{
                              detailForm.creditLimit
                            }}</span>
                          </div>
<!--                          <div class="thisItem">-->
<!--                            <span class="text-blue">-->
<!--                              {{ $t("desk.customer_queryDeal") }}</span-->
<!--                            >-->
<!--                          </div>-->
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6" class="col">
                      <div class="item">
                        <div class="box">
                          <div class="thisItem">
                            {{ $t("desk.customer_totalPrice") }}
                          </div>
                          <div class="thisItem">
                            <span class="text-red">{{ detailForm.totalLimit }}</span>
                          </div>
                          <!--<div class="thisItem">
                            <span class="text-blue">{{
                              $t("desk.customer_receivingQuery")
                            }}</span>
                          </div>-->
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6" class="col">
                      <div class="item">
                        <div class="box">
                          <div class="thisItem">
                            {{ $t("desk.customer_advancePayment") }}
                          </div>
                          <div class="thisItem">
                            <span class="text-red">2000</span>
                          </div>
<!--                          <div class="thisItem">-->
<!--                            <span class="text-blue">{{-->
<!--                              $t("desk.customer_creditOperate")-->
<!--                            }}</span>-->
<!--                          </div>-->
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-row>
                <br />
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_unitName') + ':'"
                        >{{ detailForm.enterName }}</el-form-item
                      >
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_contact') + ':'"
                        >{{ detailForm.contactName }}</el-form-item
                      >
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item :label="$t('desk.home_phoneNum') + ':'">{{
                        detailForm.mobile
                      }}</el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_pricingStrategy') + ':'"
                        >{{
                          setStrategyName(detailForm.enterStrategyId)
                        }}</el-form-item
                      >
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item :label="$t('desk.customer_referred') + ':'"
                        >白金卡</el-form-item
                      >
                    </el-col>
                  </el-row>
                </el-row>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_accountRules') + ':'"
                        >{{
                          setAlldayName(detailForm.ruleAlldayId)
                        }}</el-form-item
                      >
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_hangLine') + ':'"
                        >{{ detailForm.creditLimit }}</el-form-item
                      >
                    </el-col>
<!--                    <el-col :span="3" class="col">-->
<!--                      <el-form-item label label-width="0">-->
<!--                        <el-checkbox disabled v-model="detailForm.shareFlag">{{-->
<!--                          $t("desk.customer_groupShare")-->
<!--                        }}</el-checkbox>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
                    <el-col :span="3" class="col">
                      <el-form-item label label-width="0">
                        <el-checkbox disabled v-model="detailForm.state">{{
                          $t("desk.customer_stopUse")
                        }}</el-checkbox>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-divider></el-divider>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_effectiveDate') + ':'"
                        >{{ detailForm.effectiveStartTime }}</el-form-item
                      >
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_expiryDate') + ':'"
                        >{{ detailForm.effectiveEndTime }}</el-form-item
                      >
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_developmentWay') + ':'"
                        >{{
                          detailForm.getWay == 1
                            ? $t("desk.customer_online")
                            : $t("desk.customer_offline")
                        }}</el-form-item
                      >
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item :label="$t('desk.order_salesman') + ':'">{{
                        setSalesIdName(detailForm.salesId)
                      }}</el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-divider></el-divider>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_bankAccount') + ':'"
                        >{{ detailForm.bankCard }}</el-form-item
                      >
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item :label="$t('desk.customer_ein') + ':'">{{
                        detailForm.taxNum
                      }}</el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_telephone') + ':'"
                        >{{ detailForm.mobile }}</el-form-item
                      >
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_contractNo') + ':'"
                        >{{ detailForm.contractNum }}</el-form-item
                      >
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item :label="$t('desk.customer_email') + ':'">{{
                        detailForm.email
                      }}</el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_address') + ':'"
                        >{{ detailForm.address }}</el-form-item
                      >
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item :label="$t('desk.home_note') + ':'">{{
                        detailForm.remark
                      }}</el-form-item>
                    </el-col>
                  </el-row>
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
    await this.findone(id);
    this.hotel_price_enter_strategy_list();
    this.hotel_rule_allday_list();
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
        this.$F.doRequest(this, "/pms/hotelenter/findone", {id: id,},
          (res) => {
            this.loading = false;
            let data = res;
            data.shareFlag = data.shareFlag == 1 ? true : false;
            data.state = data.state == 1 ? true : false;
            this.detailForm = data;
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
