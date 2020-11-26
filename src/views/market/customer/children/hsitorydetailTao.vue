<!--
 * @Date: 2020-11-13 16:09:32
 * @Author: 陶子
 * @LastEditTime: 2020-11-25 12:34:35
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
                ref="editorForm"
                :model="editorForm"
                label-width="80px"
                :rules="rulese"
              >
                <el-row class="row">
                  <el-form-item :label="$t('desk.home_name') + ':'" prop="name">
                    <el-row>
                      <el-col :span="11">
                        <el-form-item
                          prop="name"
                        >
                          <el-input
                            v-model="editorForm.name"
                            style="width: 160px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item
                          prop="pronunciation"
                        >
                          <el-input
                            v-model="editorForm.pronunciation"
                            style="width: 160px; margin-left: 10px"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('desk.customer_zipCode') + ':'">
                        <el-input
                          v-model="editorForm.zipCode1"
                          style="width: 120px"
                        ></el-input>
                        <span style="margin: 0 5px">-</span>
                        <el-input
                          v-model="editorForm.zipCode2"
                          style="width: 120px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9" class="col">
                      <el-form-item :label="$t('desk.customer_address') + ':'" label-width="45px">
                        <el-select
                          style="width: 160px"
                          v-model="editorForm.addressCountry"
                          filterable
                          :placeholder="$t('desk.customer_selectTheCounty')"
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                        <el-select
                          style="width: 160px; margin-left: 10px"
                          v-model="editorForm.addressCountries"
                          filterable
                         :placeholder="$t('desk.customer_selectCity')"
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" class="col">
                      <el-form-item :label="$t('desk.customer_address') +'1'+ ':'" label-width="55px">
                        <el-input v-model="editorForm.address"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('desk.customer_address') +'2'+ ':'">
                        <el-input v-model="editorForm.address2"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('desk.home_telNum1') + ':'" label-width="80px">
                        <el-input v-model="editorForm.mobile"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('desk.home_telNum2') + ':'" label-width="80px">
                        <el-input v-model="editorForm.mobile2"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <div class="lineThrough"></div>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="7" class="col">
                      <el-form-item :label="$t('desk.customer_sex') + ':'">
                        <el-radio-group v-model="editorForm.sex">
                          <el-radio :label="1">{{
                            $t("desk.customer_man")
                          }}</el-radio>
                          <el-radio :label="2">{{
                            $t("desk.customer_woman")
                          }}</el-radio>
                          <el-radio :label="3">{{$t('desk.book_other')}}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" class="col">
                      <el-form-item :label="$t('desk.customer_brithday') + ':'">
                        <el-date-picker
                          type="date"
                          :placeholder="$t('desk.serve_chooseDate')"
                          v-model="editorForm.birthday"
                          style="width: 200px"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" class="col">
                      <el-form-item :label="$t('desk.customer_unitNameA') + ':'">
                        <el-input v-model="editorForm.enterName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="7" class="col">
                      <el-form-item :label="$t('desk.customer_unitPhoneNum')  +'1'+':'">
                        <el-input v-model="editorForm.enterMobile1"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="17" class="col">
                      <el-form-item :label="$t('desk.customer_unitAddress')  +'1'+':'">
                        <el-input
                          v-model="editorForm.enterAddress1"
                          style="width: 530px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="7" class="col">
                      <el-form-item :label="$t('desk.customer_unitPhoneNum')  +'2'+':'">
                        <el-input v-model="editorForm.enterMobile2"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="17" class="col">
                      <el-form-item :label="$t('desk.customer_unitAddress')  +'2'+':'">
                        <el-input
                          v-model="editorForm.enterAddress2"
                          style="width: 530px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-row>
                  <el-form-item label="memo1:">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 4 }"
                      :placeholder="$t('desk.book_inputContent')"
                      v-model="editorForm.memo1"
                      style="width: 800px"
                    >
                    </el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="memo2:">
                    <el-input
                      style="width: 800px"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 4 }"
                      :placeholder="$t('desk.book_inputContent')"
                      v-model="editorForm.memo2"
                    >
                    </el-input>
                  </el-form-item>
                </el-row>
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
          { required: true, message: this.$t('desk.customer_inputName'), trigger: "blur" },
        ],
         pronunciation: [
          { required: true, message: this.$t('desk.customer_inputPY'), trigger: "blur" },
        ],
      };
    },
  },
  data() {
    return {
      editorForm: {
        name: "",
        pronunciation: "",
        zipCode1: "",
        zipCode2: "",
        addressCountry: "", //所属县
        addressCountries: "", //所属国
        address: "",
        address2: "",
        mobile: "",
        mobile2: "",
        sex: "",
        birthday: "",
        enterName: "",
        enterMobile1: "",
        enterMobile2: "",
        enterAddress1: "",
        enterAddress2: "",
        memo1: "",
        memo2: "",
        guestId: "",
      },

      itemInfo: null,
      options: [],
    };
  },
  created() {
    this.itemInfo = this.$route.query.item;
  },
  mounted() {
    console.log(this.itemInfo);
    this.editorForm.name = this.itemInfo.name;
    this.editorForm.pronunciation = this.itemInfo.pronunciation;
    this.editorForm.zipCode1 = this.itemInfo.zipCode1;
    this.editorForm.zipCode2 = this.itemInfo.zipCode2;
    this.editorForm.addressCountry = this.itemInfo.addressCountry;
    this.editorForm.addressCountries = this.itemInfo.addressCountries;
    this.editorForm.address = this.itemInfo.address;
    this.editorForm.address2 = this.itemInfo.address2;
    this.editorForm.mobile = this.itemInfo.mobile;
    this.editorForm.mobile2 = this.itemInfo.mobile2;
    this.editorForm.sex = this.itemInfo.sex;
    this.editorForm.birthday = this.itemInfo.birthday;
    this.editorForm.enterName = this.itemInfo.enterName;
    this.editorForm.enterMobile1 = this.itemInfo.enterMobile1;
    this.editorForm.enterMobile2 = this.itemInfo.enterMobile2;
    this.editorForm.enterAddress1 = this.itemInfo.enterAddress1;
    this.editorForm.enterAddress2 = this.itemInfo.enterAddress2;
    this.editorForm.memo1 = this.itemInfo.memo1;
    this.editorForm.memo2 = this.itemInfo.memo2;
    this.editorForm.guestId = this.itemInfo.id;
  },

  methods: {
    //点击保存按钮
    saveEditor(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.editorForm);
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
