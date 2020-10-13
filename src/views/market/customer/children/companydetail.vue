<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-30 09:55:09
 * @FilePath: /jiudian/src/views/market/customer/children/companydetail.vue
 -->
<template>
  <div v-loading="loading">
    <el-card>
      <!-- 头部导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item @click.native="danweiClick()" class="point">单位管理</el-breadcrumb-item>
          <el-breadcrumb-item>详情</el-breadcrumb-item>
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
                          <div class="thisItem">挂账总额</div>
                          <div class="thisItem">
                            <span class="text-red">{{detailForm.creditLimit}}</span>
                          </div>
                          <div class="thisItem">
                            <span class="text-blue">查询</span>
                            <span class="text-blue">处理</span>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6" class="col">
                      <div class="item">
                        <div class="box">
                          <div class="thisItem">收款总额</div>
                          <div class="thisItem">
                            <span class="text-red">2000</span>
                          </div>
                          <div class="thisItem">
                            <span class="text-blue">收款查询</span>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6" class="col">
                      <div class="item">
                        <div class="box">
                          <div class="thisItem">预收款余额</div>
                          <div class="thisItem">
                            <span class="text-red">2000</span>
                          </div>
                          <div class="thisItem">
                            <span class="text-blue">收款操作</span>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-row>
                <br />
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item label="单位名称：">{{detailForm.enterName}}</el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item label="联系人：">{{detailForm.contactName}}</el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item label="手机号：">{{detailForm.mobile}}</el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item label="价格策略：">{{setStrategyName(detailForm.enterStrategyId)}}</el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item label="简称：">白金卡</el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item label="计费规则：">{{setAlldayName(detailForm.ruleAlldayId)}}</el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item label="挂帐额度：">{{detailForm.creditLimit}}</el-form-item>
                    </el-col>
                    <el-col :span="3" class="col">
                      <el-form-item label label-width="0">
                        <el-checkbox disabled v-model="detailForm.shareFlag">集团共享</el-checkbox>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3" class="col">
                      <el-form-item label label-width="0">
                        <el-checkbox disabled v-model="detailForm.state">停用</el-checkbox>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-divider></el-divider>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item label="生效日期：">{{detailForm.effectiveStartTime}}</el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item label="失效日期：">{{detailForm.effectiveEndTime}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item label="发展途径：">{{detailForm.getWay==1?'线上':'线下'}}</el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item label="销售员：">{{setSalesIdName(detailForm.salesId)}}</el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-divider></el-divider>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item label="银行账号：">{{detailForm.bankCard}}</el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item label="税号：">{{detailForm.taxNum}}</el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item label="电话：">{{detailForm.mobile}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item label="合同号：">{{detailForm.contractNum}}</el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item label="邮箱：">{{detailForm.email}}</el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item label="地址：">{{detailForm.address}}</el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item label="备注：">{{detailForm.remark}}</el-form-item>
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
      resetActive: "taozi/resetActive",
    }),
    danweiClick() {
      console.log(this);
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
          {
            id: id,
          },
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
        "1": "换卡操作",
        "2": "修改会员类型",
        "3": "会员停用",
        "4": "挂失/补卡操作",
      };
      this.cardForm.type = v;
      this.cardForm.titleName = v && enums[v] ? enums[v] : "其它";
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
