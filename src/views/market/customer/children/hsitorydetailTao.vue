<!--
 * @Date: 2020-11-13 16:09:32
 * @Author: 陶子
 * @LastEditTime: 2020-11-13 17:01:50
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
              <el-form inline size="small" label-width="80px">
                <el-row class="row">
                  <el-form-item :label="$t('desk.home_name') + ':'">
                    <el-input
                      v-model="editorForm.name"
                      style="width: 160px"
                    ></el-input>
                    <el-input
                      v-model="editorForm.name"
                      style="width: 160px; margin-left: 10px"
                    ></el-input>
                  </el-form-item>
                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item label="邮编:">
                        <el-input
                          v-model="editorForm.mobile"
                          style="width: 120px"
                        ></el-input>
                        <span style="margin: 0 5px">-</span>
                        <el-input
                          v-model="editorForm.mobile"
                          style="width: 120px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9" class="col">
                      <el-form-item label="地址:" label-width="45px">
                        <el-select
                          style="width: 160px"
                          v-model="editorForm.mobile"
                          filterable
                          placeholder="选择县"
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
                         v-model="editorForm.mobile"
                          filterable
                          placeholder="选择国"
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
                      <el-form-item label="地址1:" label-width="55px">
                        <el-input v-model="editorForm.mobile"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item label="地址2:">
                        <el-input v-model="editorForm.mobile"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item label="电话号码1:" label-width="80px">
                        <el-input v-model="editorForm.mobile"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item label="电话号码2:" label-width="80px">
                        <el-input v-model="editorForm.mobile"></el-input>
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
                          <el-radio :label="3">其他</el-radio>
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
                      <el-form-item label="单位名:">
                        <el-input v-model="editorForm.email"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="7" class="col">
                      <el-form-item label="单位号码1:">
                        <el-input v-model="editorForm.nationality"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="17" class="col">
                      <el-form-item label="单位地址1:">
                        <el-input
                          v-model="editorForm.address"
                          style="width: 530px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="7" class="col">
                      <el-form-item label="单位号码2:">
                        <el-input v-model="editorForm.carNum"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="17" class="col">
                      <el-form-item label="单位地址2">
                        <el-input
                          v-model="editorForm.hobby"
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
                      placeholder="请输入内容"
                       v-model="editorForm.hobby"
                      style="width:800px;"
                    >
                    </el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="memo1:">
                    <el-input
                    style="width:800px;"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 4 }"
                      placeholder="请输入内容"
                      v-model="editorForm.hobby"
                    >
                    </el-input>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
            <div style="text-align: right">
              <el-button type="primary" @click="saveEditor">{{
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
  },
  data() {
    return {
      editorForm: {
        name: "",
        mobile: "",
        idcardType: "",
        idcard: "",
        sex: "",
        birthday: "",
        email: "",
        nationality: "",
        address: "",
        carNum: "",
        hobby: "",
        enterId: "",
        remark: "",
        memberTypeId: "",
        memberCard: "",
        state: 1,
      },
      hotelenterList: "",
      itemInfo: null,
      options: [],
    };
  },
  created() {
    this.hotelenter_list();
    this.itemInfo = this.$route.query.item;
  },
  mounted() {
    console.log(this.itemInfo);
    this.editorForm.name = this.itemInfo.name;
    this.editorForm.mobile = this.itemInfo.mobile;
    this.editorForm.idcardType = this.itemInfo.idcardType;
    this.editorForm.idcard = this.itemInfo.idcard;
    this.editorForm.sex = this.itemInfo.sex;
    this.editorForm.birthday = this.itemInfo.birthday;
    this.editorForm.email = this.itemInfo.email;
    this.editorForm.nationality = this.itemInfo.nationality;
    this.editorForm.address = this.itemInfo.address;
    this.editorForm.carNum = this.itemInfo.carNum;
    this.editorForm.hobby = this.itemInfo.hobby;
    this.editorForm.enterId = this.itemInfo.enterId;
    this.editorForm.remark = this.itemInfo.remark;
    //以下为非改项
    if (this.itemInfo.memberObject) {
      this.editorForm.memberTypeId = this.itemInfo.memberObject.memberTypeId;
    }
    this.editorForm.memberCard = this.itemInfo.memberCard;
  },

  methods: {
    //点击保存按钮
    saveEditor() {
      console.log(this.editorForm);
      this.$F.doRequest(
        this,
        "/pms/hotelmember/edit",
        this.editorForm,
        (data) => {
          this.$message({
            message: this.$t("desk.customer_resetSuccess"),
            type: "success",
          });
        }
      );
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
      this.$F.doRequest(this, "/pms/hotelenter/list", params, (data) => {
        this.hotelenterList = data.list;
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
