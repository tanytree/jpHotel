<!--
 * @Date: 2020-11-13 16:09:32
 * @Author: 陶子
 * @LastEditTime: 2020-12-17 14:01:23
 * @FilePath: \jiudian\src\views\market\customer\children\hsitorydetailTao.vue
-->
<template>
  <div>
    <el-card>
      <!-- 头部导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item @click.native="goBack" style="cursor: pointer">{{
            $t("desk.customer_resetguestInfo")
          }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ itemInfo.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bodyInfo">
        <div class="mianInfo">
          <div class="thisOrderInfo">
            <div class="wrap">
              <el-form
                inline
                size="small"
                label-width="90px"
                :model="editorForm"
                ref="editorForm"
                :rules="rulese"
              >
                <el-row>
                  <el-col :span="8" class="col">
                    <el-form-item
                      :label="$t('desk.home_name') + ':'"
                      prop="name"
                    >
                      <el-input
                        style="width: 120px"
                        v-model="editorForm.name"
                        :placeholder="$t('desk.home_name')"
                      ></el-input>
                      <span style="margin-left: 8px"></span>
                      <el-input
                        style="width: 120px"
                        v-model="editorForm.pronunciation"
                        :placeholder="$t('desk.customer_nameSpell')"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="col">
                    <el-form-item
                      :label="$t('desk.customer_documentType') + ':'"
                    >
                      <el-select v-model="editorForm.idcardType">
                        <el-option
                          v-for="(label, value) in $t('commons.idCardType')"
                          :label="label"
                          :value="value"
                          :key="value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="col">
                    <el-form-item :label="$t('desk.home_idCardNum') + ':'">
                      <el-input v-model="editorForm.idcard"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" class="col">
                    <el-form-item :label="$t('desk.home_telNum1') + ':'">
                      <el-input v-model="editorForm.mobile"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="col">
                    <el-form-item :label="$t('desk.home_telNum2') + ':'">
                      <el-input v-model="editorForm.mobile2"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="cell">
                  <el-col :span="8" class="col">
                    <el-form-item
                      :label="$t('desk.customer_region') + ':'"
                      prop="addressCountries"
                    >
                      <el-input
                        :placeholder="$t('desk.customer_inputRegion')"
                        v-model="editorForm.addressCountries"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item :label="$t('desk.customer_address') + '1:'">
                      <el-input
                        v-model="editorForm.address1C1"
                        minlength="3"
                        maxlength="3"
                        @input="change($event)"
                        @blur="checkNextcode(editorForm.address1C1)"
                        style="width: 75px"
                        size="small"
                      ></el-input>
                      <span style="margin: 0 5px">-</span>
                      <el-input
                        @input="change($event)"
                        v-model="editorForm.address1C2"
                        minlength="4"
                        maxlength="4"
                        style="width: 75px"
                        @blur="
                          checkAddress(
                            editorForm.address1C1,
                            editorForm.address1C2,
                            'addressA'
                          )
                        "
                        size="small"
                      ></el-input>
                      <el-input
                        v-model="editorForm.address"
                        :placeholder="$t('desk.customer_zipcodeTo')"
                        style="width: 160px; margin-left: 5px"
                        size="small"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item :label="$t('desk.customer_address') + '2:'">
                      <el-input
                        @input="change($event)"
                        v-model="editorForm.address2C1"
                        minlength="3"
                        maxlength="3"
                        @blur="checkNextcode(editorForm.address1C1)"
                        style="width: 75px"
                        size="small"
                      ></el-input>
                      <span style="margin: 0 5px">-</span>
                      <el-input
                        @input="change($event)"
                        v-model="editorForm.address2C2"
                        minlength="4"
                        maxlength="4"
                        style="width: 75px"
                        @blur="
                          checkAddress(
                            editorForm.address2C1,
                            editorForm.address2C2,
                            'addressB'
                          )
                        "
                        size="small"
                      ></el-input>
                      <el-input
                        v-model="editorForm.address2"
                        :placeholder="$t('desk.customer_zipcodeTo')"
                        style="width: 160px; margin-left: 5px"
                        size="small"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_sex') + ':'"
                        label-width="60px"
                      >
                        <el-radio-group v-model="editorForm.sex">
                          <el-radio
                            v-for="(item, key, index) of $t('commons.F_sex')"
                            :label="key"
                            :key="index"
                            >{{ item }}</el-radio
                          >
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_brithday') + ':'"
                        prop="birthday"
                      >
                        <el-date-picker
                          style="width: 180px"
                          v-model="editorForm.birthday"
                          value-format="yyyy-MM-dd"
                          type="date"
                          :placeholder="$t('desk.serve_chooseDate')"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item :label="$t('desk.customer_email') + ':'">
                        <el-input
                          style="width: 180px"
                          :placeholder="$t('desk.customer_inputEmail')"
                          v-model="editorForm.email"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_unitNameA') + ':'"
                      >
                        <el-input
                          style="width: 85px"
                          v-model="editorForm.enterName"
                        ></el-input>
                        <el-input
                          style="width: 85px; margin-left: 10px"
                          v-model="editorForm.enterPinyin"
                          :placeholder="$t('desk.customer_faying')"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item
                        :label="$t('frontOffice.enterpriseMobile') + '1' + ':'"
                      >
                        <el-input v-model="editorForm.enterMobile1"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="16" class="col">
                      <el-form-item
                        :label="$t('frontOffice.enterpriseAddress') + '1' + ':'"
                      >
                        <el-input
                          @input="change($event)"
                          v-model="editorForm.enterAddress1C1"
                          minlength="3"
                          maxlength="3"
                          @blur="checkNextcode(editorForm.enterAddress1C1)"
                          style="width: 75px"
                          size="small"
                        ></el-input>
                        <span style="margin: 0 5px">-</span>
                        <el-input
                          @input="change($event)"
                          v-model="editorForm.enterAddress1C2"
                          minlength="4"
                          maxlength="4"
                          style="width: 75px"
                          @blur="
                            checkAddress(
                              editorForm.enterAddress1C1,
                              editorForm.enterAddress1C2,
                              'addressC'
                            )
                          "
                          size="small"
                        ></el-input>
                        <el-input
                          v-model="editorForm.enterAddress1"
                          :placeholder="$t('desk.customer_zipcodeTo')"
                          style="width: 160px; margin-left: 5px"
                          size="small"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item
                        :label="$t('frontOffice.enterpriseMobile') + '2' + ':'"
                      >
                        <el-input v-model="editorForm.enterMobile2"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="16" class="col">
                      <el-form-item
                        :label="$t('frontOffice.enterpriseAddress') + '2' + ':'"
                      >
                        <el-input
                          @input="change($event)"
                          v-model="editorForm.enterAddress2C1"
                          minlength="3"
                          maxlength="3"
                          @blur="checkNextcode(editorForm.enterAddress2C1)"
                          style="width: 75px"
                          size="small"
                        ></el-input>
                        <span style="margin: 0 5px">-</span>
                        <el-input
                          @input="change($event)"
                          v-model="editorForm.enterAddress2C2"
                          minlength="4"
                          maxlength="4"
                          style="width: 75px"
                          @blur="
                            checkAddress(
                              editorForm.enterAddress2C1,
                              editorForm.enterAddress2C2,
                              'addressD'
                            )
                          "
                          size="small"
                        ></el-input>
                        <el-input
                          v-model="editorForm.enterAddress2"
                          :placeholder="$t('desk.customer_zipcodeTo')"
                          style="width: 160px; margin-left: 5px"
                          size="small"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row class="cell">
                    <el-col :span="24" class="col">
                      <el-form-item
                        :label="$t('frontOffice.englishM') + '1' + ':'"
                      >
                        <el-input
                          style="width: 800px"
                          type="textarea"
                          v-model="editorForm.memo1"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="24" class="col">
                      <el-form-item
                        :label="$t('frontOffice.englishM') + '2' + ':'"
                      >
                        <el-input
                          style="width: 800px"
                          type="textarea"
                          v-model="editorForm.memo2"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-divider></el-divider>
              </el-form>
            </div>
            <div style="text-align: right">
              <el-button type="primary" @click="saveEditor('editorForm')">{{
                $t("commons.save")
              }}</el-button>
              <el-button @click="goBack()">{{ $t("commons.back") }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
    rulese() {
      return {
        name: [
          {
            required: true,
            message: this.$t("desk.customer_inputName"),
            trigger: "blur",
          },
        ],
        pronunciation: [
          {
            required: true,
            message: this.$t("desk.customer_inputPY"),
            trigger: "blur",
          },
        ],
        addressCountries: [
          {
            required: true,
            message: this.$t("desk.customer_inputRegion"),
            trigger: "blur",
          },
        ],
      };
    },
  },
  data() {
    return {
      editorForm: {
        address: null,
        address2: null,
        addressCountries: null,
        addressCountry: null,
        age: null,
        birthday: null,
        carNum: null,
        checkInId: null,
        consumTotal: null,
        createTime: null,
        email: null,
        enterAddress1: null,
        enterAddress2: null,
        enterMobile1: null,
        enterMobile2: null,
        enterName: null,
        enterPinyin: null,
        guestNum: null,
        guestType: 1,
        hobby: null,
        id: null,
        idcard: null,
        idcardType: null,
        isBlacklist: null,
        memberCard: null,
        memberTypeId: null,
        memberTypeName: null,
        memo1: null,
        memo2: null,
        mobile: null,
        mobile2: null,
        name: null,
        nationality: null,
        pronunciation: null,
        remark: null,
        sex: "1",
        status: null,
        storesNum: null,
        updateTime: null,
        zipCode1: null,
        zipCode2: null,
      },

      itemInfo: null,
      options: [],
    };
  },
  created() {
    this.itemInfo = this.$route.query.item;
    for (let i in this.itemInfo) {
      this.editorForm[i] = this.itemInfo[i];
    }
    this.$set(this.editorForm, "guestId", this.itemInfo.id);
    if (this.editorForm.sex) {
      this.editorForm.sex = this.editorForm.sex.toString();
    }
    if (this.editorForm.idcardType) {
      this.editorForm.idcardType = this.editorForm.idcardType.toString();
    }
  },
  mounted() {},

  methods: {
    change() {
      this.$forceUpdate();
    },
    checkNextcode(code1) {
      if (!code1 || code1.length !== 3) {
        this.$message({
          message: this.$t("desk.customer_sureZipcode"),
          type: "warning",
        });
      }
    },
    // 输入邮编检索地址
    checkAddress(code1, code2, type) {
      if (code1 && code2) {
        if (code1.length == 3 && code2.length == 4) {
          this.$F.commons.zipCode(code1, code2, (res) => {
            if (res.results.length > 0) {
              switch (type) {
                case "addressA":
                  this.editorForm.address =
                    res.results[0].address1 +
                    res.results[0].address2 +
                    res.results[0].address3;
                  break;
                case "addressB":
                  this.editorForm.address2 =
                    res.results[0].address1 +
                    res.results[0].address2 +
                    res.results[0].address3;
                  break;
                case "addressC":
                  this.editorForm.enterAddress1 =
                    res.results[0].address1 +
                    res.results[0].address2 +
                    res.results[0].address3;
                  break;
                case "addressD":
                  this.editorForm.enterAddress2 =
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
    //点击保存按钮
    saveEditor(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$F.doRequest(
            this,
            "/pms/guestarchives/dishes_manage_edit",
            this.editorForm,
            (data) => {
              this.$message({
                message: this.$t("desk.customer_resetSuccess"),
                type: "success",
              });
              setTimeout(() => {
                this.goBack();
              }, 300);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    goBack() {
      this.$router.history.go(-1);
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
  padding: 10px 0px;
}

.fixedFoot .wrap button {
  margin-left: 20px;
}

.bodyInfo {
  .mianInfo {
  }
}

.thisOrderInfo {
  background: #fff;
  padding-bottom: 30px;

  .wrap {
    padding: 0 0px;

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
.lineThrough {
  border: 1px solid rgba(227, 227, 227, 1);
  margin: 5px 0 15px 0;
}
</style>
