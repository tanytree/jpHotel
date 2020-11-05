<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-05 13:36:00
 * @FilePath: \jiudian\src\views\market\customer\children\detail.vue
 -->
<template>
  <div>
    <el-card v-loading="loading">
      <!-- 头部导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item @click.native="goMemberManag()" style="font-weight: 700; cursor: pointer">{{ $t("desk.customer_memManagement") }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="type != 'add'">{{ detailForm.memberCard }}-{{ detailForm.name }}-{{ F_memberTypeId(detailForm.memberTypeId) }}</el-breadcrumb-item>
          <el-breadcrumb-item v-else>{{ $t("desk.customer_addMem") }}</el-breadcrumb-item></el-breadcrumb>
      </div>
      <div class="bodyInfo">
        <div class="mianInfo">
          <div class="thisOrderInfo">
            <div class="wrap">
              <el-form inline size="small" label-width="120px" :model="detailForm" ref="detailForm" :rules="type != 'detail' ? rules : {}">
                <el-row v-if="type == 'edit'">
                  <el-form-item label>
                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(1)">{{ $t("desk.customer_changeCard") }}</el-button>
                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(2)">{{ $t("desk.customer_resetType") }}</el-button>
                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(3)">{{ $t("desk.customer_cancellation") }}</el-button>
                      <el-button type="primary" size="mini" @click="setCardFormBtnClick(4)">{{ $t("desk.customer_reportLossCard") }}</el-button>
                  </el-form-item>
                </el-row>
                <el-row v-if="type == 'add'">
                  <el-form-item label>
                      <el-button type="primary" size="mini">{{ $t("desk.customer_readMemNum") }}</el-button>
                  </el-form-item>
                </el-row>
                <br />
                <el-row class="row">
                  <el-row class="cell">
                    <template v-if="type == 'add'">
                      <el-col :span="8" class="col">
                        <el-form-item :label="$t('desk.customer_memType')" prop="memberTypeId">
                          <el-select v-model="detailForm.memberTypeId" v-if="type != 'detail'" class>
                            <el-option v-for="item in smembertypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8" class="col">
                        <el-form-item :label="$t('desk.customer_memeberCardNum')" prop="memberCard">
                          <el-input v-model="detailForm.memberCard" v-if="type != 'detail'"></el-input>
                        </el-form-item>
                      </el-col>
                    </template>
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('desk.home_name')" prop="name">
                        <el-input v-model="detailForm.name" v-if="type != 'detail'" class="width150" :placeholder="$t('desk.home_name')"></el-input>
                          <span style="margin-left: 8px">  </span>
                        <el-input v-model="detailForm.pronunciation" v-if="type != 'detail'"  class="width150" :placeholder="$t('desk.customer_nameSpell')"></el-input>
                        <template v-if="type == 'detail'">{{detailForm.name}}</template>
                        <template v-if="type == 'detail'" style="margin-left: 15px">{{detailForm.pronunciation}}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('desk.home_telNum1')" prop="mobile">
                        <el-input v-model="detailForm.mobile" v-if="type != 'detail'"></el-input>
                        <template v-if="type == 'detail'">{{ detailForm.mobile }}</template>
                      </el-form-item>
                    </el-col>
                      <el-col :span="8" class="col">
                          <el-form-item :label="$t('desk.home_telNum2')" prop="mobile">
                              <el-input v-model="detailForm.mobile2" v-if="type != 'detail'"></el-input>
                              <template v-if="type == 'detail'">{{ detailForm.mobile2 }}</template>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row class="cell" v-if="type != 'add'">
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('desk.customer_memeberCardNum')">{{ detailForm.memberCard }}</el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('desk.customer_memType')">{{ F_memberTypeId(detailForm.memberTypeId) }}</el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-divider></el-divider>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('desk.customer_sex')" prop="sex">
                        <el-radio-group v-model="detailForm.sex" v-show="type != 'detail'">
                          <el-radio v-for="(item, key, index) of $t('commons.F_sex')" :label="key" :key="index">{{ item }}</el-radio>
                        </el-radio-group>
                        <template v-if="type == 'detail'">{{ detailForm.sex | F_sex }}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item
                        :label="$t('desk.customer_brithday')"
                        prop="birthday"
                      >
                        <el-date-picker
                          v-model="detailForm.birthday"
                          value-format="yyyy-MM-dd"
                          type="date"
                          :placeholder="$t('desk.serve_chooseDate')"
                          v-if="type != 'detail'"
                        ></el-date-picker>
                        <template v-if="type == 'detail'">{{
                          detailForm.birthday
                        }}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <!--这里邮箱改为单位名-->
                      <el-form-item :label="$t('desk.customer_unitName')" prop="email" >
                        <el-input v-model="detailForm.enterName" v-if="type != 'detail'" ></el-input>
                        <template v-if="type == 'detail'">
                            {{  detailForm.enterName }}
                        </template>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                      <el-col :span="8" class="col">
                          <el-form-item :label="$t('frontOffice.enterpriseMobile') + '1'"
                          >
                              <el-input
                                  v-model="detailForm.enterMobile1"
                                  v-if="type != 'detail'"
                              ></el-input>
                              <template v-if="type == 'detail'">{{
                                      detailForm.enterMobile1
                                  }}</template>
                          </el-form-item>
                      </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item
                        :label="$t('frontOffice.enterpriseAddress') + '1'"
                      >
                        <el-input
                          v-model="detailForm.enterAddress1"
                          v-if="type != 'detail'" class="width300"
                        ></el-input>
                        <template v-if="type == 'detail'">{{
                          detailForm.enterAddress1
                        }}</template>
                      </el-form-item>
                    </el-col>
                  </el-row>

                    <el-row class="cell">
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('frontOffice.enterpriseMobile') + '2'"
                            >
                                <el-input
                                    v-model="detailForm.enterMobile2"
                                    v-if="type != 'detail'"
                                ></el-input>
                                <template v-if="type == 'detail'">{{
                                        detailForm.enterMobile2
                                    }}</template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('frontOffice.enterpriseAddress')  + '2'"
                            >
                                <el-input
                                    class="width300"
                                    v-model="detailForm.enterAddress2"
                                    v-if="type != 'detail'"
                                ></el-input>
                                <template v-if="type == 'detail'">{{
                                        detailForm.enterAddress2
                                    }}</template>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row class="cell">
                        <el-col :span="8" class="col">
                            <el-form-item label="memo1"
                            >
                                <el-input
                                    class="width300"
                                    type="textarea"
                                    v-model="detailForm.memo1"
                                    v-if="type != 'detail'"
                                ></el-input>
                                <template v-if="type == 'detail'">{{
                                        detailForm.memo1
                                    }}</template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="col">
                            <el-form-item label="memo2"
                            >
                                <el-input
                                    class="width300"
                                    type="textarea"
                                    v-model="detailForm.memo2"
                                    v-if="type != 'detail'"
                                ></el-input>
                                <template v-if="type == 'detail'">{{
                                        detailForm.memo2
                                    }}</template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-divider></el-divider>
<!--                <el-row class="row">-->
<!--                  <el-row class="cell">-->
<!--                    <el-col :span="8" class="col">-->
<!--                      <el-form-item-->
<!--                        :label="$t('desk.order_salesman')"-->
<!--                        prop="salesId"-->
<!--                      >-->
<!--                        <el-select-->
<!--                          v-model="detailForm.salesId"-->
<!--                          v-if="type != 'detail'"-->
<!--                        >-->
<!--                          <el-option-->
<!--                            v-for="item in salesList"-->
<!--                            :key="item.id"-->
<!--                            :label="item.userName"-->
<!--                            :value="item.id"-->
<!--                          ></el-option>-->
<!--                        </el-select>-->
<!--                        <template v-if="type == 'detail'">{{-->
<!--                          F_salesId(detailForm.salesId)-->
<!--                        }}</template>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8" class="col">-->
<!--                      <el-form-item-->
<!--                        :label="$t('desk.customer_developmentWay')"-->
<!--                        prop="getWay"-->
<!--                      >-->
<!--                        <el-select-->
<!--                          v-model="detailForm.getWay"-->
<!--                          v-if="type != 'detail'"-->
<!--                        >-->
<!--                          <el-option-->
<!--                            v-for="(value, key) in $t('frontOffice.getWay')"-->
<!--                            :label="value"-->
<!--                            :key="value"-->
<!--                            :value="key"-->
<!--                          ></el-option>-->
<!--                        </el-select>-->
<!--                        <template v-if="type == 'detail'">-->
<!--                          <div v-if="detailForm.getWay == 1">-->
<!--                            {{ $t("desk.customer_online") }}-->
<!--                          </div>-->
<!--                          <div v-if="detailForm.getWay == 2">-->
<!--                            {{ $t("desk.customer_offline") }}-->
<!--                          </div>-->
<!--                        </template>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                  </el-row>-->
<!--                </el-row>-->
<!--                <el-row class="row" v-if="type == 'add'">-->
<!--                  <el-row class="cell">-->
<!--                    <el-col :span="8" class="col">-->
<!--                      <el-form-item :label="$t('desk.customer_creditCard')" prop="state">-->
<!--                        <el-select v-model="detailForm.state">-->
<!--                            <el-option :label="$t('desk.customer_yes')" :value="1"></el-option>-->
<!--                            <el-option :label="$t('desk.customer_waiteUse')" :value="2"></el-option>-->
<!--                        </el-select>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                  </el-row>-->
<!--                </el-row>-->
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <template v-if="type != 'detail'">
      <el-row style="height: 60px"></el-row>
      <el-row class="fixedFoot">
        <div class="wrap">
          <el-button
            type="primary"
            @click="addItem('detailForm')"
            v-loading="loading"
            >{{ $t("commons.save")}}</el-button
          >
          <el-button @click="$router.go(-1)">{{
            $t("commons.back")
          }}</el-button>
        </div>
      </el-row>
    </template>

    <el-dialog
      top="0"
      :title="cardForm.titleName"
      :visible.sync="setCardFormVisible"
      class="setCardForm"
    >
      <el-form
        :model="cardForm"
        ref="cardForm"
        :rules="rules"
        :label-width="formLabelWidth"
      >
        <el-form-item label class="require" label-width="80px"
          >{{ $t("desk.customer_originNum") + ":" }}{{ detailForm.memberCard
          }}{{ $t("desk.home_name") + ":" }}{{ detailForm.name }}
          {{ $t("desk.customer_memType") + ":"
          }}{{ F_memberTypeId(detailForm.memberTypeId) }}</el-form-item
        >
        <template v-if="cardForm.type == 1">
          <el-form-item
            :label="$t('desk.customer_newCardNum')"
            class
            prop="memberCard"
          >
            <el-input
              style="width: 300px"
              v-model="cardForm.memberCard"
              placeholder
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('desk.home_note')" class prop="remark">
            <el-input
              style="width: 300px"
              type="textarea"
              v-model="cardForm.remark"
              placeholder
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('desk.customer_creditCard')"
            class
            prop="state"
          >
            <el-checkbox v-model="cardForm.state"></el-checkbox>
          </el-form-item>
        </template>
        <template v-if="cardForm.type == 2">
          <el-form-item
            :label="$t('desk.customer_resetFor')"
            class
            prop="memberTypeId"
          >
            <el-select
              v-model="cardForm.memberTypeId"
              style="width: 300px"
              @change="memberTypeIdChange"
            >
              <template v-for="item in smembertypeList">
                <el-option
                  v-if="item.id != detailForm.memberTypeId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
          <template v-if="cardForm.payPrices">
            <el-form-item
              :label="$t('desk.customer_payType')"
              class
              prop="payWay"
            >
              <el-select v-model="cardForm.payWay" style="width: 300px">
                <el-option
                  :label="$t('desk.serve_cash')"
                  :value="1"
                ></el-option>
                <el-option
                  :label="$t('desk.serve_wechat')"
                  :value="2"
                ></el-option>
                <el-option
                  :label="$t('desk.serve_alipay')"
                  :value="3"
                ></el-option>
                <el-option
                  :label="$t('desk.customer_unionpay')"
                  :value="4"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('desk.customer_payPrice')"
              class
              prop="payPrices"
            >
              <el-input
                style="width: 300px"
                v-model="cardForm.payPrices"
                disabled
                placeholder
              ></el-input>
            </el-form-item>
          </template>
          <el-form-item
            :label="$t('desk.customer_resetReason')"
            class
            prop="remark"
          >
            <el-input
              style="width: 300px"
              type="textarea"
              v-model="cardForm.remark"
              placeholder
            ></el-input>
          </el-form-item>
        </template>
        <template v-if="cardForm.type == 3">
          <el-form-item :label="$t('desk.home_note')" class prop="remark">
            <el-input
              style="width: 300px"
              type="textarea"
              v-model="cardForm.remark"
              placeholder
            ></el-input>
          </el-form-item>
        </template>
        <template v-if="cardForm.type == 4">
          <el-form-item
            :label="$t('desk.customer_operationType')"
            class
            prop="operType"
          >
            <el-radio-group v-model="cardForm.operType">
              <el-radio :label="2">{{ $t("desk.customer_lossAadd") }}</el-radio>
              <el-radio :label="3">{{ $t("desk.customer_onlyLoss") }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="cardForm.operType == 2">
            <el-form-item :label="$t('desk.customer_newCardNum')" class>
              <el-input
                style="width: 300px"
                v-model="cardForm.memberCard"
                placeholder
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('desk.customer_payType')"
              class
              prop="payWay"
            >
              <el-select v-model="cardForm.payWay" style="width: 300px">
                <el-option
                  :label="$t('desk.serve_cash')"
                  :value="1"
                ></el-option>
                <el-option
                  :label="$t('desk.serve_wechat')"
                  :value="2"
                ></el-option>
                <el-option
                  :label="$t('desk.serve_alipay')"
                  :value="3"
                ></el-option>
                <el-option
                  :label="$t('desk.customer_unionpay')"
                  :value="4"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('desk.customer_payPrice')"
              class
              prop="payPrices"
            >
              <el-input
                style="width: 300px"
                v-model="cardForm.payPrices"
                placeholder
              ></el-input>
            </el-form-item>
          </template>
          <el-form-item :label="$t('desk.home_note')" class prop="remark">
            <el-input
              style="width: 300px"
              type="textarea"
              v-model="cardForm.remark"
              placeholder
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('desk.customer_creditCard')"
            class
            prop="state"
            v-if="cardForm.operType == 1"
          >
            <el-checkbox v-model="detailForm.state"></el-checkbox>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setCardFormVisible = false">{{
          $t("commons.close")
        }}</el-button>
        <el-button type="primary" @click="setCardFrormChange('cardForm')">{{
          $t("commons.confirm")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 积分兑换弹窗 -->
    <el-dialog
      :title="$t('desk.customer_pointsFor')"
      :visible.sync="exchangeDialog"
      width="90%"
      top="0"
    >
      <el-row :gutter="20">
        <!-- 左边 -->
        <el-col :span="14">
          <div class="ex_border">
            <div class="ex15_top">
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
              >
                <el-form-item :label="$t('desk.order_goodsName') + ':'">
                  <el-input
                    v-model="formInline.name"
                    size="small"
                    :placeholder="$t('desk.customer_pleaceInput')"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.order_goodsType') + ':'">
                  <el-select
                    v-model="formInline.categoryId"
                    :placeholder="$t('commons.placeChoose')"
                    size="small"
                  >
                    <el-option :label="$t('desk.home_all')" value></el-option>
                    <el-option
                      v-for="item in goodsKind"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="ex_lookFor" size="small">{{
                    $t("commons.queryBtn")
                  }}</el-button>
                  <el-button type="primary" @click="ex_reset" size="small">{{
                    $t("commons.resetBtn")
                  }}</el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-table
              ref="multipleTable"
              v-loading="loading"
              :data="chooseList"
              :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
              size="mini"
            >
              <el-table-column
                prop="name"
                :label="$t('desk.order_goodsName')"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="categoryName"
                :label="$t('desk.order_goodsType')"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="score"
                :label="$t('desk.customer_useDuration')"
                show-overflow-tooltip
                width="280px"
              ></el-table-column>
              <el-table-column
                prop="inventoryCount"
                :label="$t('desk.customer_inventory')"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                :label="$t('commons.operating')"
                show-overflow-tooltip
              >
                <template slot-scope="{ row }">
                  <el-button type="text" size="mini" @click="addGoods(row)">{{
                    $t("desk.customer_add")
                  }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <!-- 右边 -->
        <el-col :span="10">
          <div class="ex_border">
            <div class="ex9_top">{{ $t("desk.customer_chooseGoods") }}</div>
            <el-table
              ref="multipleTable"
              v-loading="loading"
              :data="selectList"
              :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
              size="mini"
            >
              <el-table-column
                prop="goodsName"
                :label="$t('desk.order_goodsName')"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="score"
                :label="$t('desk.customer_useDuration')"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                :label="$t('desk.customer_count')"
                align="center"
                show-overflow-tooltip
                width="120px"
              >
                <template slot-scope="{ row }">
                  <el-input-number
                    v-model="row.number"
                    @change="handleChange"
                    :min="1"
                    :max="row.inventoryCount"
                    style="width: 100px"
                    size="mini"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('desk.serve_heji')"
                show-overflow-tooltip
              >
                <template slot-scope="{ row }">
                  <div>{{ addUpTo(row) }}</div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('commons.operating')"
                show-overflow-tooltip
              >
                <template slot-scope="{ row }">
                  <el-button
                    type="text"
                    size="mini"
                    @click="removeClick(row)"
                    >{{ $t("desk.customer_remove") }}</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div style="margin: 20px 0 40px 0">
              {{ $t("desk.customer_all") }}{{ common(selectList)
              }}{{ $t("desk.customer_each") }}，
              <span class="hejiClass"
                >{{ $t("desk.serve_heji") + ":" }}{{ combined }}</span
              >
            </div>
            <el-button
              type="primary"
              @click="sureExchange"
              style="margin: 0 0 16px 16px"
              >{{ $t("desk.customer_sureChange") }}</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
// import {
//     get_user_enterprise
// } from "@/utils/api/company";

export default {

  data() {
    return {
        isHeader: false,
      combined: 0,
      goodsKind: [],
      chooseList: [],
      selectList: [],
      formInline: {
        name: "",
        categoryId: "",
      },
      exchangeDialog: false,
      loading: false,
      type: "edit",
      setCardFormVisible: false,
      formLabelWidth: "120px",
      nationalityList: [],
      storeList: "",
      smembertypeList: "",
      salesList: "",
      hotelenterList: "",
      cardForm: {
        titleName: "",
        type: "",
        name: "",
      },
      detailForm: {
          enterName: '', // 单位名
          pronunciation: '',
        id: "",
          sex: '1',
          state: '1',
          idcardType:'1',
          // idcard: '----'
        name: "",
      },
    };
  },
  computed: {
    rules() {
      return {
        name: [
          {
            required: true,
            message: this.$t("desk.customer_inputName"),
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: this.$t("desk.customer_chooseSex"),
            trigger: "change",
          },
        ],
        idcardType: [
          {
            required: true,
            message: this.$t("commons.selectIdCardType"),
            trigger: "change",
          },
        ],
        idcard: [
          {
            required: true,
            message: this.$t("desk.customer_inputCardNum"),
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: this.$t("desk.customer_inputPhone"),
            trigger: "blur",
          },
        ],
        memberCard: [
          {
            required: true,
            message: this.$t("desk.customer_inputMemNum"),
            trigger: "blur",
          },
        ],
        memberTypeId: [
          {
            required: true,
            message: this.$t("desk.customer_chooseMemType"),
            trigger: "change",
          },
        ],
        state: [
          {
            required: true,
            message: this.$t("desk.customer_chooseIfcard"),
            trigger: "change",
          },
        ],
        remark: [
          {
            required: true,
            message: this.$t("desk.customer_inputRemark"),
            trigger: "blur",
          },
        ],
        payPrices: [
          {
            required: true,
            message: this.$t("desk.customer_inputPayPrice"),
            trigger: "blur",
          },
        ],
        payWay: [
          {
            required: true,
            message: this.$t("desk.customer_choosePayType"),
            trigger: "change",
          },
        ],
        operType: [
          {
            required: true,
            message: this.$t("desk.customer_chooseOpearType"),
            trigger: "change",
          },
        ],
      };
    },
  },
  mounted() {
      this.isHeader = this.$route.params.isHeader == 1
        this.detailForm.id = this.$route.query.id ? this.$route.query.id : "";
    //
    if (this.$route.name == "customeradd") {
      this.type = "add";
    } else if (this.$route.name == "customeredit") {
      this.type = "edit";
    } else {
      this.type = "detail";
    }
    if (this.$route.query.id) {
      this.findone(this.$route.query.id);
    }
    this.stores_list();
    this.nationality();
    this.$F.commons.fetchSalesList({ salesFlag: 1 }, (data) => {
      this.salesList = data.hotelUserList;
    });
    this.hotelenter_list();
    this.smembertype_list();
  },

  methods: {
    ...mapMutations({
        resetMemberTab: "resetMemberTab",
        resetActive: "resetActive",
    }),

    //计算 共   多少件
    common(selectList) {
      let total = 0;
      let gongji = 0;
      for (let item of selectList) {
        total += item.number;
        gongji += item.heji;
      }
      this.combined = gongji;
      return total;
    },
    //积分兑换  点击 确认兑换
    sureExchange(params = {}) {
      this.$F.merge(params, {
        memberCard: this.detailForm.memberCard,
        content: JSON.stringify(this.selectList),
      });
      this.$F.doRequest(
        this,
        "/pms/hotelmemberscore/get_total_member",
        params,
        (res) => {
          console.log(res);
          this.$message.success(this.$t("desk.customer_changeSuccess"));
          this.exchangeDialog = false;
        }
      );
    },

    //积分兑换  点击查询
    ex_lookFor() {
      let params = {
        name: "",
        categoryId: "",
        state: 1,
        status: 1,
      };
      this.$F.merge(params, this.formInline);
      this.$F.doRequest(this, "/pms/hotelgoods/list", params, (res) => {
        console.log(res);
        this.chooseList = res.list;
      });
    },
    //积分兑换  点击重置
    ex_reset() {
      this.formInline = { name: "", categoryId: "" };
      this.ex_lookFor();
    },
    //点击 积分兑换
    exchangeClick() {
      let params = {
        name: "",
        categoryId: "",
        state: 1,
        status: 1,
      };
      this.$F.doRequest(this, "/pms/hotelgoods/list", params, (res) => {
        console.log(res);
        this.chooseList = res.list;
        this.goodsType();
      });
    },
    //商品分裂接口
    goodsType() {
      this.$F.doRequest(this, "/pms/hotelcategory/list", {}, (res) => {
        console.log(res);
        this.goodsKind = res.list;
        this.exchangeDialog = true;
      });
    },
    //积分兑换  点击移除
    removeClick(row) {
      this.selectList = this.selectList.filter((item) => {
        return item.goodsId != row.goodsId;
      });
      console.log(this.selectList.length);
    },

    //积分兑换  点击添加
    addGoods(row) {
      console.log(row);
      let each = {
        goodsId: row.id,
        goodsName: row.name,
        score: row.score,
        number: row.buyCount,
        inventoryCount: row.inventoryCount,

        heji: 0,
      };
      let id = row.id;
      for (let item = 0; item < this.selectList.length; item++) {
        if (id == this.selectList[item].goodsId) {
          this.selectList[item].number += row.buyCount;
          return false;
        }
      }
      this.selectList.push(each);
    },
    //跳转  会员信息管理
    goMemberManag() {

      if (this.isHeader) {
          this.resetMemberTab("member-query");
          this.$router.push("/saleOrder");
      } else {
          this.resetActive("member");
          this.$router.push("/customer");
      }
    },
    //跳转  积分明细  页面
    toIntegralDetail() {
      if (this.$route.query.buttonName == this.$t("commons.detail")) {
        return false;
      } else {
        this.$router.push({
          path: "/integralDetail",
          query: {
            id: this.detailForm.id,
          },
        });
      }
    },
    //计算合计
    addUpTo(row) {
      let heji = 0;
      heji = row.score * row.number;
      row.heji = heji;
      return heji;
    },
    //计数器改变
    handleChange(value) {
      console.log(value);
    },
    findone(id) {
      this.$F.doRequest(
        this,
        "/pms/hotelmember/findone",
        {
          id: id,
        },
        (res) => {
          for (var key in res) {
            //遍历json对象的每个key/value对,p为key
            if (res[key] && typeof res[key] == "number") {
              res[key] = res[key].toString();
            }
          }
          console.log(res);
          this.detailForm = res;
        }
      );
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
    setCardFrormChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {},
            url = "";
          if (this.cardForm.type == 1) {
            url = "/pms/hotelmember/changecard";
            params = {
              id: this.detailForm.id,
              remark: this.cardForm.remark,
              memberCard: this.cardForm.memberCard,
              state: this.cardForm.state ? 1 : 3,
            };
          }
          if (this.cardForm.type == 2) {
            url = "/pms/hotelmember/change_type";
            params = {
              memberId: this.detailForm.id,
              remark: this.cardForm.remark,
              oldTypeId: this.detailForm.memberTypeId,
              newTypeId: this.cardForm.memberTypeId,
              operType: 1,
              oldCardNum: this.detailForm.memberCard,
              cardNum: this.detailForm.memberCard,
              payWay: this.cardForm.payWay,
              payPrices: this.cardForm.payPrices,
            };
          }
          if (this.cardForm.type == 3) {
            url = "/pms/hotelmember/delete";
            params = {
              id: this.detailForm.id,
              remark: this.cardForm.remark,
            };
          }
          if (this.cardForm.type == 4) {
            if (this.cardForm.operType == 2) {
              params = {
                memberId: this.detailForm.id,
                remark: this.cardForm.remark,
                oldTypeId: this.detailForm.memberTypeId,
                newTypeId: this.detailForm.memberTypeId,
                operType: 2,
                oldCardNum: this.detailForm.memberCard,
                cardNum: this.cardForm.memberCard,
                payWay: this.cardForm.payWay,
                payPrices: this.cardForm.payPrices,
              };
              url = "/pms/hotelmember/change_type";
            } else {
              params = {
                id: this.detailForm.id,
                remark: this.cardForm.remark,
                state: 2,
              };
              url = "/pms/hotelmember/enable_disable";
            }
          }
          this.$F.doRequest(this, url, params, (data) => {
            if (this.cardForm.type != 3 || this.cardForm.type != 4) {
              this.setCardFormVisible = false;
              this.findone(this.detailForm.id);
            } else {
              this.$router.go(-1);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    smembertype_list() {
      this.$F.commons.fetchMemberTypeList({}, (res) => {
        this.smembertypeList = res.list;
      });
    },

    hotelenter_list() {
      let params = {
        id: "",
        enterName: "",
        state: 1,
        shareFlag: "",
        contactName: "",
        contactPhone: "",
        salesId: "",
        startCreditLimit: "",
        endCreditLimit: "",
        paging: false,
        salesFlag: 1,
        pageIndex: 1,
        pageSize: 10,
      };
      this.$F.doRequest(null, "/pms/hotelenter/list", params, (data) => {
        this.hotelenterList = data.list;
      });
    },
    stores_list() {
      this.$F.doRequest(null, "/pms/freeuser/stores_list", {}, (data) => {
        this.storeList = data;
      });
    },
    nationality() {
      this.$F.commons.fetchNationality((res) => {
        this.nationalityList = res;
      });
    },
    addItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$F.doRequest(
            this,
            "/pms/hotelmember/edit",
            this.detailForm,
            (res) => {
              this.$message({
                message: "success",
                type: "success",
              });
              setTimeout(() => {
                this.$router.replace("/customer");
              }, 1200);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    memberTypeIdChange(e) {
      let that = this;
      console.log(e);
      for (let k in that.smembertypeList) {
        if (that.smembertypeList[k].id == e) {
          this.cardForm.payPrices = that.smembertypeList[k].prices || "";
        }
      }
    },
    F_memberTypeId(v) {
      let that = this;
      for (let k in that.smembertypeList) {
        if (that.smembertypeList[k].id == v) {
          return that.smembertypeList[k].name;
        }
      }
      return "";
    },
    F_storeName(v) {
      let that = this;
      for (let k in that.storeList) {
        if (that.storeList[k].storesNum == v) {
          return that.storeList[k].storesName;
        }
      }
      return "";
    },
    F_nationality(v) {
      let that = this;
      for (let k in that.nationalityList) {
        if (that.nationalityList[k].id == v) {
          return this.$i18n.locale == "ri"
            ? that.nationalityList[k].jName
            : that.nationalityList[k].cName;
        }
      }
      return "";
    },
    F_salesId(v) {
      let that = this;
      for (let k in that.salesList) {
        if (that.salesList[k].id == v) {
          return that.salesList[k].userName;
        }
      }
      return "";
    },
    F_enterId(v) {
      let that = this;
      for (let k in that.hotelenterList) {
        if (that.hotelenterList[k].id == v) {
          return that.hotelenterList[k].enterName;
        }
      }
      return "";
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
  }
}
.ex15_top {
  background-color: rgba(250, 250, 250, 1);
  padding-top: 20px;
  margin-bottom: 10px;
}
.ex9_top {
  padding: 15px;
  border-bottom: 1px solid rgba(226, 226, 226, 1);
  margin-bottom: 10px;
}
.hejiClass {
  color: black;
  font-size: 16px;
  font-weight: 500;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.ex_border {
  border-radius: 8px;

  border: 1px solid rgba(211, 211, 211, 1);
}
</style>
