<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-08 14:18:12
 * @FilePath: \jiudian\src\views\market\customer\children\detail.vue
 -->
<template>
  <div>
    <el-card v-loading="loading">
      <!-- 头部导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item @click.native="goMemberManag()" style="font-weight: 700; cursor: pointer">{{ $t("desk.customer_memManagement") }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="type != 'add'"><span v-if="type == 'edit'">{{ $t("desk.customer_resetmemInfo") }}-</span>{{ detailForm.memberCard }}-{{ detailForm.name }}</el-breadcrumb-item>
          <el-breadcrumb-item v-else>{{
            $t("desk.customer_addMem")
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bodyInfo">
        <div class="someBox" v-if="type == 'detail'">
          <div>
            {{ $t("desk.customer_totalCharge") + ":"
            }}<span>{{
              detailForm.totalYearFee ? detailForm.totalYearFee : 0
            }}</span>
          </div>
          <div>
            <el-button type="text" @click="yearPrice">{{
              $t("desk.customer_yearPriceDetail")
            }}</el-button>
            <el-button type="text" @click="annualFee = true">{{
              $t("desk.customer_getYearPrice")
            }}</el-button>
          </div>
        </div>
        <div class="mianInfo">
          <div class="thisOrderInfo">
            <div class="wrap">
              <el-form inline size="small" :label-width="type == 'detail' ? '110px' : '90px'" :model="detailForm" ref="detailForm" :rules="type != 'detail' ? rules : {}">
                <!-- 点击 修改按钮 进来后显示的一排按钮 -->
                <el-row v-if="type == 'edit'">
                  <el-form-item label>
                    <!-- 换卡 -->
                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(1)">{{ $t("desk.customer_changeCard") }}</el-button>
                    <!-- 修改类型 -->
                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(2)">{{ $t("desk.customer_resetType") }}</el-button>
                    <!-- 停用 -->
                    <el-button type="primary" v-if="detailForm.state==1" size="mini" @click="setCardFormBtnClick(3)">{{ $t("desk.customer_stopUse") }}</el-button>
                    <!-- 启用 -->
                    <el-button type="primary" size="mini" v-if="detailForm.state==3" @click="useMember">{{$t('desk.customer_enable')}}</el-button>
                    <!-- 挂失补卡 -->
                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(4)">{{ $t("desk.customer_reportLossCard") }}</el-button>
                  </el-form-item>
                </el-row>
                <!-- 点击 新增按钮 进来后显示的内容 -->
                <el-row v-if="type == 'add'">
                  <el-form-item label>
                    <el-button type="primary" size="mini">{{
                      $t("desk.customer_readMemNum")
                    }}</el-button>
                  </el-form-item>
                </el-row>
                <el-row>
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
                  <el-col :span="type != 'detail' ? 8 : 6" class="col">
                    <el-form-item :label="$t('desk.home_name') + ':'" prop="name">
                      <el-input style="width: 120px" v-model="detailForm.name" v-if="type != 'detail'" :placeholder="$t('desk.home_name')"></el-input>
                      <span style="margin-left: 8px"></span>
                      <el-input style="width: 120px" v-model="detailForm.pronunciation" v-if="type != 'detail'" :placeholder="$t('desk.customer_nameSpell')"></el-input>
                      <template v-if="type == 'detail'">{{
                        detailForm.name
                      }}</template>
                      <template v-if="type == 'detail'" style="margin-left: 15px">【{{ detailForm.pronunciation }}】</template>
                    </el-form-item>
                  </el-col>
                  <el-col :span="type != 'detail' ? 8 : 6" class="col" v-if="type != 'detail'">
                    <el-form-item :label="$t('desk.customer_documentTypeA') + ':'">
                      <el-select v-model="detailForm.idcardType">
                        <el-option v-for="(label, value) in $t('commons.idCardType')" :label="label" :value="value" :key="value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="type != 'detail' ? 8 : 6" class="col">
                    <el-form-item :label="$t('desk.home_idCardNumA') + ':'">
                      <template v-if="type == 'detail'">
                        <span v-if="detailForm.idcardType == 1">({{ $t("desk.home_idCard") }})</span>
                        <span v-if="detailForm.idcardType == 2">({{ $t("desk.customer_passport") }})</span>
                        <span>{{ detailForm.idcard }}</span>
                      </template>
                      <template v-if="type != 'detail'">
                        <el-input v-model="detailForm.idcard"></el-input>
                      </template>
                    </el-form-item>
                  </el-col>
                  <el-col :span="type != 'detail' ? 8 : 6" class="col">
                    <el-form-item :label="$t('desk.home_telNum1') + ':'" v-if="type == 'detail'">
                      <template>{{ detailForm.mobile }}</template>
                    </el-form-item>
                  </el-col>
                  <el-col :span="type != 'detail' ? 8 : 6" class="col">
                    <el-form-item :label="$t('desk.home_telNum2') + ':'" v-if="type == 'detail'">
                      <template>{{ detailForm.mobile2 }}</template>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="type != 'detail' ? 8 : 6" class="col">
                    <el-form-item :label="$t('desk.home_telNum1') + ':'" v-if="type != 'detail'">
                      <el-input v-model="detailForm.mobile"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="type != 'detail' ? 8 : 6" class="col">
                    <el-form-item :label="$t('desk.home_telNum2') + ':'" v-if="type != 'detail'">
                      <el-input v-model="detailForm.mobile2"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="type != 'add' && type != 'edit'">
                  <el-col :span="6" class="col">
                    <el-form-item :label="$t('desk.customer_memeberCardNum') + ':'">{{ detailForm.memberCard }}</el-form-item>
                  </el-col>
                  <el-col :span="6" class="col">
                    <el-form-item :label="$t('desk.customer_memType') + ':'">{{
                      F_memberTypeId(detailForm.memberTypeId)
                    }}</el-form-item>
                  </el-col>
                  <el-col :span="6" class="col">
                    <el-form-item :label="$t('desk.home_state') + ':'">
                      <div v-if="detailForm.state == 1">
                        {{ $t("desk.customer_haveCard") }}
                      </div>
                      <div v-if="detailForm.state == 2">
                        {{ $t("desk.customer_haveLoss") }}
                      </div>
                      <div v-if="detailForm.state == 3">
                        {{ $t("desk.customer_waiteUse") }}
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-divider v-if="type == 'detail'"></el-divider>
                <el-row class="cell">
                  <el-col :span="8" class="col">
                    <el-form-item :label="$t('desk.customer_region') + ':'" prop="addressCountries">
                      <el-input v-if="type != 'detail'" :placeholder="$t('desk.customer_inputRegion')" v-model="detailForm.addressCountries"></el-input>
                      <template v-if="type == 'detail'">{{
                        detailForm.addressCountries
                      }}</template>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16" v-if="type != 'detail'">
                    <el-form-item :label="$t('desk.customer_address') + '1:'">
                      <el-input v-model="detailForm.address1C1" minlength="3" maxlength="3" @blur="checkNextcode(detailForm.address1C1)" style="width: 75px" size="small"></el-input>
                      <span style="margin: 0 5px">-</span>
                      <el-input v-model="detailForm.address1C2" minlength="4" maxlength="4" style="width: 75px" @blur="
                          checkAddress(
                            detailForm.address1C1,
                            detailForm.address1C2,
                            'addressA'
                          )
                        " size="small"></el-input>
                      <el-input v-model="detailForm.address" :placeholder="$t('desk.customer_zipcodeTo')" style="width: 160px; margin-left: 5px" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="col">
                    <el-form-item :label="$t('desk.customer_address') + '1:'" v-if="type == 'detail'">
                      <template>{{ detailForm.address }}</template>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="col">
                    <el-form-item :label="$t('desk.customer_address') + '2:'" v-if="type == 'detail'">
                      <template>{{ detailForm.address2 }}</template>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="type != 'detail'">
                  <el-col :span="16">
                    <el-form-item :label="$t('desk.customer_address') + '2:'">
                      <el-input v-model="detailForm.address2C1" minlength="3" maxlength="3" @blur="checkNextcode(detailForm.address1C1)" style="width: 75px" size="small"></el-input>
                      <span style="margin: 0 5px">-</span>
                      <el-input v-model="detailForm.address2C2" minlength="4" maxlength="4" style="width: 75px" @blur="
                          checkAddress(
                            detailForm.address2C1,
                            detailForm.address2C2,
                            'addressB'
                          )
                        " size="small"></el-input>
                      <el-input v-model="detailForm.address2" :placeholder="$t('desk.customer_zipcodeTo')" style="width: 160px; margin-left: 5px" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-divider v-if="type != 'detail'"></el-divider>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="type != 'detail' ? 6 : 8" class="col">
                      <el-form-item :label="$t('desk.customer_sex') + ':'" prop="sex" :label-width="type == 'detail'?'110px':'60px'">
                        <el-radio-group v-model="detailForm.sex" v-show="type != 'detail'">
                          <el-radio v-for="(item, key, index) of $t('commons.F_sex')" :label="key" :key="index">{{ item }}</el-radio>
                        </el-radio-group>
                        <template v-if="type == 'detail'">{{
                          detailForm.sex | F_sex
                        }}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="type != 'detail' ? 6 : 8" class="col">
                      <el-form-item :label="$t('desk.customer_brithday') + ':'" prop="birthday">
                        <el-date-picker style="width: 180px" v-model="detailForm.birthday" value-format="yyyy-MM-dd" type="date" :placeholder="$t('desk.serve_chooseDate')" v-if="type != 'detail'"></el-date-picker>
                        <template v-if="type == 'detail'">{{
                          detailForm.birthday
                        }}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col" v-if="type != 'detail'">
                      <el-form-item :label="$t('desk.customer_email') + ':'">
                        <el-input style="width: 180px" :placeholder="$t('desk.customer_inputEmail')" v-model="detailForm.email"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                     <el-col :span="24" class="col" v-if="type != 'detail'">
                      <el-form-item :label="$t('desk.customer_unitNameA') + ':'">
                        <el-input style="width: 185px" v-model="detailForm.enterName"></el-input>
                        <el-input style="width: 185px; margin-left: 10px" v-model="detailForm.enterPinyin" :placeholder="$t('desk.customer_faying')"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell" v-if="type == 'detail'">
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('desk.editor_age') + ':'">
                        <template>{{ detailForm.age }}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('desk.customer_email') + ':'">
                        <template>{{ detailForm.email }}</template>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="8" class="col" v-if="type == 'detail'">
                      <el-form-item :label="$t('desk.customer_unitNameA') + ':'" prop="email">
                        <template v-if="type == 'detail'">
                          {{ detailForm.enterName
                          }}<span v-if="detailForm.enterPinyin">【{{ detailForm.enterPinyin }}】</span>
                        </template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('frontOffice.enterpriseMobile') + '1' + ':'">
                        <el-input v-model="detailForm.enterMobile1" v-if="type != 'detail'"></el-input>
                        <template v-if="type == 'detail'">{{
                          detailForm.enterMobile1
                        }}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col" v-if="type == 'detail'">
                      <el-form-item :label="$t('frontOffice.enterpriseMobile') + '2' + ':'">
                        {{ detailForm.enterMobile2 }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="16" class="col" v-if="type != 'detail'">
                      <el-form-item :label="$t('frontOffice.enterpriseAddress') + '1' + ':'">
                        <el-input v-model="detailForm.enterAddress1C1" minlength="3" maxlength="3" @blur="checkNextcode(detailForm.enterAddress1C1)" style="width: 75px" size="small"></el-input>
                        <span style="margin: 0 5px">-</span>
                        <el-input v-model="detailForm.enterAddress1C2" minlength="4" maxlength="4" style="width: 75px" @blur="
                            checkAddress(
                              detailForm.enterAddress1C1,
                              detailForm.enterAddress1C2,
                              'addressC'
                            )
                          " size="small"></el-input>
                        <el-input v-model="detailForm.enterAddress1" :placeholder="$t('desk.customer_zipcodeTo')" style="width: 160px; margin-left: 5px" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell" v-if="type != 'detail'">
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('frontOffice.enterpriseMobile') + '2' + ':'">
                        <el-input v-model="detailForm.enterMobile2"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="16" class="col" v-if="type != 'detail'">
                      <el-form-item :label="$t('frontOffice.enterpriseAddress') + '2' + ':'">
                        <el-input v-model="detailForm.enterAddress2C1" minlength="3" maxlength="3" @blur="checkNextcode(detailForm.enterAddress2C1)" style="width: 75px" size="small"></el-input>
                        <span style="margin: 0 5px">-</span>
                        <el-input v-model="detailForm.enterAddress2C2" minlength="4" maxlength="4" style="width: 75px" @blur="
                            checkAddress(
                              detailForm.enterAddress2C1,
                              detailForm.enterAddress2C2,
                              'addressD'
                            )
                          " size="small"></el-input>
                        <el-input v-model="detailForm.enterAddress2" :placeholder="$t('desk.customer_zipcodeTo')" style="width: 160px; margin-left: 5px" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell" v-if="type == 'detail'">
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('desk.customer_unitAddress') + '1:'">
                        <template>{{ detailForm.enterAddress1 }}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('desk.customer_unitAddress') + '2:'">
                        <template>{{ detailForm.enterAddress2 }}</template>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="24" class="col">
                      <el-form-item :label="$t('frontOffice.englishM') + '1' + ':'" label-width="110px">
                        <el-input style="width:600px;" type="textarea" v-model="detailForm.memo1" v-if="type != 'detail'"></el-input>
                        <template v-if="type == 'detail'">{{
                          detailForm.memo1
                        }}</template>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="24" class="col">
                      <el-form-item :label="$t('frontOffice.englishM') + '2' + ':'" label-width="110px">
                        <el-input style="width:600px;" type="textarea" v-model="detailForm.memo2" v-if="type != 'detail'"></el-input>
                        <template v-if="type == 'detail'">{{
                          detailForm.memo2
                        }}</template>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-divider></el-divider>
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
          <el-button type="primary" @click="addItem('detailForm')" v-loading="loading">{{ $t("commons.save") }}</el-button>
          <el-button @click="$router.go(-1)">{{
            $t("commons.back")
          }}</el-button>
        </div>
      </el-row>
    </template>
    <!-- 年费明细dialog -->
    <el-dialog :title="$t('desk.customer_yearPriceDetail')" :visible.sync="yearDetail" width="70%" top="0">
      <div class="searcBox">
        <el-form ref="yearForm" :model="yearForm" label-width="80px" inline>
          <el-form-item :label="$t('desk.customer_feeYear') + ':'">
            <el-date-picker size="small" type="year" :placeholder="$t('desk.customer_selectYears')" v-model="yearForm.year" format="yyyy" value-format="yyyy" style="width: 100%"></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('desk.customer_feeStore') + ':'">
            <el-select v-model="yearForm.storesNum" :placeholder="$t('desk.customer_selectFeeStore')" size="small">
              <el-option v-for="item in storeList" :key="item.value" :label="item.storesName" :value="item.storesNum">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getYearDate" size="small">{{
              $t("commons.queryBtn")
            }}</el-button>
            <el-button size="small" @click="resetYearform">{{
              $t("commons.resetBtn")
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--表格数据 -->
      <el-table ref="multipleTable" v-loading="loading" :data="yearTabel" max-height="400px" header-row-class-name="default" size="small">
        <el-table-column align="center" width="150px;" prop="fee" :label="$t('desk.customer_feePrice')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createDate" :label="$t('desk.customer_feeTime')" align="center" width="200px;">
        </el-table-column>
        <el-table-column :label="$t('desk.customer_feeYear')" prop="year" align="center" width="180px;">
        </el-table-column>
        <el-table-column :label="$t('desk.home_note')" align="center" prop="remark">
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 添加年费记录dialog -->
    <el-dialog :title="$t('desk.customer_addFeeNote')" :visible.sync="annualFee" width="40%" top="0">
      <div class="textBox">
        <span>{{ $t("desk.customer_cardNum") + ":"
          }}{{ detailForm.memberCard }}</span><span>{{ $t("desk.home_name") + ":" }}{{ detailForm.name }}</span><span>{{ $t("desk.customer_memType") + ":"
          }}{{ F_memberTypeId(detailForm.memberTypeId) }}</span>
      </div>
      <el-form ref="addfeeFrom" :model="addfeeFrom" :rules="addfeeRules" label-width="150px">
        <el-form-item :label="$t('desk.customer_selectYears') + ':'" prop="year">
          <el-date-picker type="year" :placeholder="$t('desk.customer_selectYears')" v-model="addfeeFrom.year" format="yyyy" value-format="yyyy" style="width: 270px"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_payType') + ':'" prop="type">
          <el-select v-model="addfeeFrom.type" :placeholder="$t('desk.customer_choosePayType')" style="width: 270px">
            <el-option :label="$t('desk.customer_offlinePayment')" value="1"></el-option>
            <el-option :label="$t('desk.customer_onlinePayment')" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_feeTime') + ':'" prop="createDate">
          <el-date-picker type="date" :placeholder="$t('desk.serve_chooseDate')" value-format="yyyy-MM-dd" v-model="addfeeFrom.createDate" style="width: 270px"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_payPrice') + ':'" prop="fee">
          <el-input v-model="addfeeFrom.fee" style="width: 270px"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_note') + ':'">
          <el-input v-model="addfeeFrom.remark" style="width: 270px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: right">
        <el-button @click="cancelAdd">{{ $t("commons.cancel") }}</el-button>
        <el-button type="primary" @click="sureAdd('addfeeFrom')">{{
          $t("commons.confirm")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- //点击这些的弹框 1、换卡；2、修改类型；3、停用；4、挂失补卡 -->
    <el-dialog top="0" :title="cardForm.titleName" :visible.sync="setCardFormVisible" class="setCardForm">
      <el-form :model="cardForm" ref="cardForm" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label class="require" label-width="80px">
          <span style="margin-right:10px" v-if="cardForm.type != 3">{{ $t("desk.customer_originNum") + ":" }}{{ detailForm.memberCard}}</span>
          <span style="margin-right:10px" v-if="cardForm.type == 3">{{$t('desk.customer_cardNum')}}：{{ detailForm.memberCard}}</span>
          <span style="margin-right:10px"> {{ $t("desk.home_name") + ":" }}{{ detailForm.name }}</span>
          <span>{{ $t("desk.customer_memType") + ":"}}{{ F_memberTypeId(detailForm.memberTypeId)}}</span>
        </el-form-item>
        <template v-if="cardForm.type == 1">
          <el-form-item :label="$t('desk.customer_newCardNum')" class prop="memberCard">
            <el-input style="width: 300px;margin-right:20px;" :disabled='cardForm.systemGen' v-model="cardForm.memberCard" placeholder></el-input>
            <el-checkbox v-model="cardForm.systemGen" @change="handleChange">{{$t('desk.customer_systemPro')}}</el-checkbox>
          </el-form-item>
        </template>
        <template v-if="cardForm.type == 2">
          <el-form-item :label="$t('desk.customer_resetFor')" class prop="memberTypeId">
            <el-select v-model="cardForm.memberTypeId" style="width: 300px" @change="memberTypeIdChange">
              <template v-for="item in smembertypeList">
                <el-option v-if="item.id != detailForm.memberTypeId" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('desk.customer_resetReason')" class prop="remark">
            <el-input style="width: 300px" type="textarea" v-model="cardForm.remark" placeholder></el-input>
          </el-form-item>
        </template>
        <template v-if="cardForm.type == 3">
          <el-form-item :label="$t('desk.home_note')" class prop="remark">
            <el-input style="width: 300px" type="textarea" v-model="cardForm.remark" placeholder></el-input>
          </el-form-item>
        </template>
        <template v-if="cardForm.type == 4">
          <el-form-item :label="$t('desk.customer_operationType')" class prop="operType">
            <el-radio-group v-model="cardForm.operType">
              <el-radio :label="2">{{ $t("desk.customer_lossAadd") }}</el-radio>
              <el-radio :label="3">{{ $t("desk.customer_onlyLoss") }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="cardForm.operType == 2">
            <el-form-item :label="$t('desk.customer_newCardNum')" class>
              <el-input style="width: 300px;margin-right:20px;" :disabled='cardForm.isGen' v-model="cardForm.memberCard" placeholder></el-input>
              <el-checkbox v-model="cardForm.isGen" @change="handleChange">{{$t('desk.customer_systemPro')}}</el-checkbox>
            </el-form-item>
          </template>
          <el-form-item :label="$t('desk.home_note')" class>
            <el-input style="width: 300px" type="textarea" v-model="cardForm.remark" placeholder></el-input>
          </el-form-item>
          <el-form-item :label="$t('desk.customer_creditCard')" class prop="state" v-if="cardForm.operType == 1">
            <el-checkbox v-model="detailForm.state"></el-checkbox>
          </el-form-item>
        </template>
        <!-- type为5是会员启用 -->
        <template v-if="cardForm.type == 5">
          <el-form-item :label="$t('desk.home_note')" class prop="remark">
            <el-input style="width: 300px" type="textarea" v-model="cardForm.remark"></el-input>
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
      yearDetail: false, //年费明细dialog
      yearForm: {
        //年费明细表单
        year: "",
        storesNum: "",
        memberCard: "",
      },
      yearTabel: [], //年费明细表格
      annualFee: false, //收年费dialog
      addfeeFrom: {
        //添加年费表单
        status: 1,
        fee: "",
        year: "",
        remark: "",
        type: "",
        createDate: "",
        ///////
        memberCard: "",
        userName: "",
        memberType: "",
        createrId: "",
      },
      isHeader: false,
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
        operType: 2,
      },
      detailForm: {
        zipCode1: "",
        zipCode2: "",
        addressCountry: "",
        addressCountries: "",
        enterName: "", // 单位名
        pronunciation: "",
        id: "",
        sex: "1",
        state: "1",
        idcardType: "1",
        // idcard: '----'
        name: "",
      },
      options: [],
    };
  },
  computed: {
    addfeeRules() {
      return {
        year: [
          {
            type: "string",
            required: true,
            message: this.$t("desk.customer_pleaseSelectYear"),
            trigger: "change",
          },
        ],
        type: [
          {
            required: true,
            message: this.$t("desk.customer_choosePayType"),
            trigger: "change",
          },
        ],
        createDate: [
          {
            type: "string",
            required: true,
            message: this.$t("desk.customer_chooseFeeTime"),
            trigger: "change",
          },
        ],
        fee: [
          {
            required: true,
            message: this.$t("desk.customer_inputPayFee"),
            trigger: "blur",
          },
        ],
      };
    },
    rules() {
      return {
        addressCountries: [
          {
            required: true,
            message: this.$t("desk.customer_inputRegion"),
            trigger: "blur",
          },
        ],
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
    this.isHeader = this.$route.params.isHeader == 1;
    this.detailForm.id = this.$route.query.id ? this.$route.query.id : "";
    //
    console.log(this.$route.name);
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
    handleChange(value) {
      if (value) {
        this.cardForm.memberCard = "";
      }
    },
    checkNextcode(code1) {
      if (!code1 || code1.length !== 3) {
        this.$message({
          message: this.$t("desk.customer_sureZipcode"),
          type: "warning",
        });
      }
    },
    yearPrice() {
      this.resetYearform();
      this.yearDetail = true;
    },
    // 年费明细dialog，点击重置按钮
    resetYearform() {
      this.yearForm = {
        year: "",
        storesNum: "",
        memberCard: this.detailForm.memberCard,
      };
      this.getYearDate();
    },
    getYearDate() {
      this.$F.doRequest(
        this,
        "/pms/hotelmember/year_fee_log",
        this.yearForm,
        (res) => {
          this.yearTabel = res.list;
        }
      );
    },
    cancelAdd() {
      this.addfeeFrom = {
        status: 1,
        year: "",
        type: "",
        createDate: "",
        fee: "",
        remark: "",

        memberCard: "",
        userName: "",
        memberType: "",
        userId: "",
      };
      this.annualFee = false;
    },
    sureAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addfeeFrom.memberCard = this.detailForm.memberCard;
          this.addfeeFrom.userName = this.detailForm.name;
          this.addfeeFrom.memberType = this.detailForm.memberTypeId;
          this.addfeeFrom.createrId = this.detailForm.id;
          this.$F.doRequest(
            this,
            "/pms/hotelmember/add_fee",
            this.addfeeFrom,
            (res) => {
              this.annualFee = false;
              this.findone(this.$route.query.id);
            }
          );
        } else {
          return false;
        }
      });
    },
    // 输入邮编检索地址
    checkAddress(code1, code2, type) {
      if (code1 && code2) {
        if (code1.length == 3 && code2.length == 4) {
          this.$F.commons.zipCode(code1, code2, (res) => {
            if (res.results.length > 0) {
              switch (type) {
                case "addressA":
                  this.detailForm.address =
                    res.results[0].address1 +
                    res.results[0].address2 +
                    res.results[0].address3;
                  break;
                case "addressB":
                  this.detailForm.address2 =
                    res.results[0].address1 +
                    res.results[0].address2 +
                    res.results[0].address3;
                  break;
                case "addressC":
                  this.detailForm.enterAddress1 =
                    res.results[0].address1 +
                    res.results[0].address2 +
                    res.results[0].address3;
                  break;
                case "addressD":
                  this.detailForm.enterAddress2 =
                    res.results[0].address1 +
                    res.results[0].address2 +
                    res.results[0].address3;
                  break;
              }
            }
          });
        } else {
          this.$message({
            message: this.$t("desk.customer_sureZipcode"),
            type: "warning",
          });
        }
      } else {
        this.$message({
          message: this.$t("desk.customer_sureZipcode"),
          type: "warning",
        });
      }
    },
    //跳转  会员信息管理
    goMemberManag() {
      this.resetActive("member");
      this.$router.push("/customer");
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
    // 点击 启用 按钮
    useMember() {
      this.cardForm.titleName = this.$t("desk.customer_memberAble");
      this.cardForm.type = 5;
      this.setCardFormVisible = true;
    },
    setCardFormBtnClick(v) {
      let enums = {
        // 1、换卡；2、修改类型；3、停用；4、挂失补卡
        1: this.$t("desk.customer_changeCardOperate"),
        2: this.$t("desk.customer_resetMemType"),
        3: this.$t("desk.customer_memStop"),
        4: this.$t("desk.customer_lossOperate"),
      };
      this.cardForm.type = v;
      this.cardForm.titleName =
        v && enums[v] ? enums[v] : this.$t("desk.serve_other");
      if (this.cardForm.type == 4 && this.detailForm.state == 2) {
        this.$message.warning(this.$t("desk.customer_memberCardLoss"));
      } else {
        this.setCardFormVisible = true;
      }
    },
    setCardFrormChange(formName) {
      if (this.cardForm.type == 1 && this.cardForm.systemGen) {
        let params = {},
          url = "/pms/hotelmember/changecard";
        params = {
          id: this.detailForm.id,
          remark: this.$t("desk.order_noText"),
          memberCard: this.cardForm.memberCard,
          state: 1,
          systemGen: this.cardForm.systemGen ? "1" : "2",
        };
        this.$F.doRequest(this, url, params, (data) => {
          if (this.cardForm.type != 3 && this.cardForm.type != 4) {
            this.setCardFormVisible = false;
            this.findone(this.detailForm.id);
          } else {
            this.$router.go(-1);
          }
        });
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {},
              url = "";
            if (this.cardForm.type == 1) {
              url = "/pms/hotelmember/changecard";
              params = {
                id: this.detailForm.id,
                remark: this.$t("desk.order_noText"),
                memberCard: this.cardForm.memberCard,
                state: 1,
                systemGen: this.cardForm.systemGen ? "1" : "2",
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
                payWay: 0,
                payPrices: 0,
                  isGen:2,
              };
            }
            if (this.cardForm.type == 3) {
              url = "/pms/hotelmember/enable_disable";
              params = {
                id: this.detailForm.id,
                remark: this.cardForm.remark,
                state: 3,
              };
            }
            if (this.cardForm.type == 5) {
              url = "/pms/hotelmember/enable_disable";
              params = {
                id: this.detailForm.id,
                remark: this.cardForm.remark,
                state: 1,
              };
            }
            if (this.cardForm.type == 4) {
              if (!this.cardForm.remark) {
                this.cardForm.remark = this.$t("desk.order_noText");
              }
              if (this.cardForm.operType == 2) {
                if (!this.cardForm.memberCard) {
                  this.cardForm.memberCard = this.detailForm.memberCard;
                }
                params = {
                  memberId: this.detailForm.id,
                  remark: this.cardForm.remark,
                  oldTypeId: this.detailForm.memberTypeId,
                  newTypeId: this.detailForm.memberTypeId,
                  operType: 2,
                  oldCardNum: this.detailForm.memberCard,
                  cardNum: this.cardForm.memberCard,
                  payWay: 0,
                  payPrices: 0,
                  isGen: this.cardForm.isGen ? "1" : "2",
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
              if (
                this.cardForm.type != 3 &&
                this.cardForm.type != 5 
              ) {
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
      }
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
      let params = {
        filterHeader: true,
      };
      this.$F.doRequest(this, "/pms/freeuser/stores_list", params, (data) => {
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
.someBox {
  margin-bottom: 20px;

  span {
    margin-left: 10px;
    color: rgba(18, 110, 255, 100);
  }
  padding: 20px;
  height: 80px;
  background-color: rgba(239, 239, 239, 1);
}
.searcBox {
  height: 76px;
  box-sizing: border-box;
  padding: 20px;
  background-color: rgba(248, 248, 248, 1);
}
.textBox {
  color: rgba(30, 30, 30, 100);
  font-size: 16px;
  box-sizing: border-box;
  padding-left: 65px;
  margin-bottom: 20px;
  span {
    margin-right: 15px;
  }
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 10px;
}
.el-row[data-v-b37f780e] {
  margin-bottom: 10px;
}
</style>
