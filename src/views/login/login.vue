<template>
  <div class="pageContent">
    <div class="bodyTop">
      <img class="logPng" src="~@/assets/images/login/log.png" />
      <el-select v-model="language" @change="onLanguageChange" style="width: 100px">
        <el-option :label="$t('login.chinese')" value="zh"></el-option>
        <el-option :label="$t('login.japanese')" value="ri"></el-option>
      </el-select>
    </div>
    <div class="register-index">
      <div class="register-body" v-loading="loading" v-if="loginType == 'login'">
        <el-page-header v-if="forget" @back="
                        () => {
                            this.forget = false;
                            this.forgetStep = 1;
                        }
                    " :title="$t('login.backLogin')"></el-page-header>
        <div class="body-info">
          <div class="body-l" v-if="!forget">
            <div v-if="!forget" class="title">
              {{ $t("login.title") }}
            </div>
            <el-form :model="loginForm" size="small" validate-on-rule-change :rules="dataRule" ref="loginForm">
              <el-form-item prop="storesNum">
                <el-select v-model="loginForm.storesNum" :placeholder="$t('login.sTip')">
                  <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="account">
                <el-input v-focus prefix-icon="el-icon-s-custom" :placeholder="
                                        $t('commons.pleaseEnter') + ' ID'
                                    " v-model="loginForm.account" maxlength="18" @keyup.enter.native="clickLoginBtn()"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" prefix-icon="el-icon-lock" :placeholder="
                                        $t('commons.pleaseEnter') +
                                        $t('commons.passwordDesc')
                                    " v-model.trim="loginForm.password" @keyup.enter.native="clickLoginBtn()"></el-input>
              </el-form-item>
              <el-form-item style="text-align: left">
                <el-checkbox v-model="loginForm.checked" label="0">{{ $t("login.remember") }}</el-checkbox>
              </el-form-item>
              <el-form-item class="login-btns">
                <div class="btn">
                  <el-button type="primary" class="submit" @click="clickLoginBtn()" style="width: 260px">{{
                                            this.$t("login.loginBtn")
                                        }}</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="line"></div>
          <div class="body-l body-r">
            <div class="ma">
              <img src="@/assets/images/login/registerQr.png" alt />
            </div>
            <!--          <div class="detail">扫码二维码，下载指点社区</div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="bodyTop">
      <div class="leftText">HESTA PMS</div>
      <div class="rightText">
        Copyright©2007 ～ 2019 Okura Co.,Ltd All right reserved.
      </div>
    </div>
  </div>
</template>

<script>
import { getLanguage, setLanguage } from "@/utils/auth";
import { mapState, mapActions } from "vuex";
import lang_ri from "element-ui/lib/locale/lang/ja";
import lang_zh from "element-ui/lib/locale/lang/zh-CN";
import locale from "element-ui/lib/locale";

export default {
  computed: {
    ...mapState({
      msgKey: (state) => state.config.msgKey,
      routermsg: (state) => state.routermsg.routermsg,
      plat_source: (state) => state.config.plat_source,
    }),
    dataRule() {
      return {
        storesNum: {
          required: true,
          message: this.$t("login.sTip"),
          trigger: "change",
        },
        account: {
          required: true,
          message: this.$t("login.inputId"),
          trigger: "change",
        },
        password: [
          {
            required: true,
            message: this.$t("login.passwordEnterTip"),
            trigger: "change",
          },
        ],
      };
    },
  },
  //input框自动聚焦功能
  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function (el) {
        // 聚焦元素
        el.querySelector("input").focus();
      },
    },
  },
  data() {
    return {
      language: "ri", //语言类型  zh中文  ri日文
      loading: false,
      storeList: [],
      isCheck: false,
      forgetStep: 1, // 忘记密码步骤
      forget: false, // 忘记密码
      loginType: "login", // 登录-注册
      loginForm: {
        storesNum: "",
        account: "",
        password: "",
        checked: false, //是否记住密码   默认不记住
      },
    };
  },

  mounted() {
    this.language = getLanguage();
    this.onLanguageChange();
    this.$i18n.locale = this.language;
    // this.$refs.loginForm.clearValidate();
    this.$F.doRequest(
      this,
      "/pms/freeuser/stores_list",
      {
        filterHeader: true,
      },
      (data) => {
        this.storeList = data;
      }
    );
    this.getCookie(); //取得cookie方法
  },

  methods: {
    ...mapActions({
      saveuser: "user/saveuser",
      routeractions: "routermsg/routeractions",
    }),

    onLanguageChange() {
      if (this.language == "zh") locale.use(lang_zh);
      else locale.use(lang_ri);
      setLanguage(this.language);
      this.$i18n.locale = this.language;
      sessionStorage.locale = this.language;
    },

    userIsLogin(data) {
      data.data.storesInfo = this.storeList.filter((item) => {
        return item.storesNum == this.loginForm.storesNum;
      })[0];
      sessionStorage.storesNum = data.data.storesInfo.storesNum;
      this.saveuser(data);
      this.onLanguageChange(); //保存选中语言
      if (this.loginForm.account == "admin" || data.data.user.userType == 3) {
        var array = {
          id: "menuAssert",
          menuTitle: "维护菜单（开发用）",
          menuAliasTitle: "维护菜单",
          japanese: "メニュー管理",
          parentMenuId: null,
          icon: "icon06",
          path: "",
          menuLevel: 1,
          menuType: 1,
          status: 1,
          menuorder: 1,
          childList: [
            {
              id: "menuAssert2",
              createTime: "2020-07-05 15:01:00",
              updateTime: "2020-07-05 15:01:00",
              menuTitle: "首页",
              menuAliasTitle: null,
              japanese: "ホームページ",
              parentMenuId: "menuAssert",
              icon: "boss/nav01.png",
              path: "menuAssert",
            },
          ],
        };
        data.data.menuList.push(array);
      }
      for (let i = 0; i < data.data.menuList.length; i++) {
        let item = data.data.menuList[i];
        if (item.id == "a367289c90e34614a308917f5726bd03") {
          data.data.menuList.splice(i, 1);
          break;
        }
      }
      if (this.loginForm.storesNum == this.$F.getHQCode()) {
        document.title = this.$t("desk.book_HQ");
      } else {
        let tempArray =
          this.storeList.filter((item) => {
            return item.storesNum == this.loginForm.storesNum;
          }) || [];
        document.title = tempArray[0].storesName;
      }
      this.routeractions(data.data.menuList);
      this.$forceUpdate();
      this.$router.push({
        path: "/main",
      });
    },

    loginAction() {
      this.$router.push({
        name: "main",
      });
    },

    clickLoginBtn(
      params = {
        loginType: 5,
      }
    ) {
      // 判断复选框是否被勾选 勾选则调用配置cookie方法
      if (this.loginForm.checked == true) {
        //传入账号名，密码，门店，和保存天数3个参数
        this.setCookie(
          this.loginForm.account,
          this.loginForm.password,
          this.loginForm.storesNum,
          this.loginForm.checked,
          7
        );
      } else {
        //清空Cookie
        this.clearCookie();
      }
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.$F.merge(params, this.loginForm);
          this.$F.doRequest(this, "/pms/freeuser/login", params, (res) => {
            sessionStorage.account = this.loginForm.account;
            sessionStorage.password = this.loginForm.password;
            this.userIsLogin({
              data: res,
            });
          });
        }
      });
    },
    // 涉及cookie的方法

    //设置cookie
    setCookie(c_name, c_pwd, c_storesNum, c_checked, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie = //账户名
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie = //密码
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie = //门店名
        "storesNum" +
        "=" +
        c_storesNum +
        ";path=/;expires=" +
        exdate.toGMTString();
      window.document.cookie = //是否勾选
        "checked" + "=" + c_checked + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.loginForm.account = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.loginForm.password = arr2[1];
          } else if (arr2[0] == "storesNum") {
            this.loginForm.storesNum = arr2[1];
          } else if (arr2[0] == "checked") {
            this.loginForm.checked = true;
          }
        }
      }
    },
    //清除cookie
    clearCookie: function () {
      this.setCookie("", "", "", false, -1); //修改2值都为空，天数为负1天就好了
    },

    // 涉及cookie的方法
  },
};
</script>


<style lang="less" scoped>
.pageContent {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .bodyTop {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 73px 0 63px;
    background-color: #fff;
    height: 100px;
    .logPng {
      width: 150px;
      height: 60px;
    }
    .leftText {
      color: rgba(10, 64, 139, 100);
      font-size: 35px;
      font-weight: bold;
    }
    .rightText {
      color: rgba(102, 102, 102, 100);
      font-size: 14px;
    }
  }
}
.login-btns .btn {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.body-r {
  color: #ffffff;
  font-size: 30px;
  line-height: 200%;
  letter-spacing: 3px;
  .room-name {
    font-size: 25px;
  }
  .room-title {
    color: rgba(255, 255, 255, 100);
    font-size: 60px;
  }
}
.register-index {
  background: url(../../assets/images/login/background.png) no-repeat;
  position: relative;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  flex: 9;

  > .register-body {
    background-color: #ffffff;
    width: 650px;
    padding: 50px;
    text-align: center;
    min-height: 360px;
    border-radius: 6px;

    > .body-info {
      display: flex;
      height: 225px;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.register-body .body-info .body-l {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.body-l {
  .el-form {
    padding: 10px 0 20px;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    padding-top: 40px;
  }
  // .el-form-item {
  // margin-bottom: 10px;
  // }
}

.register-body .body-info .line {
  height: 120px;
  width: 1px;
  background-color: #d1d1d1;
  margin-left: 40px;
  margin-bottom: 20px;
}

.contentR {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .img {
    width: 160px;

    height: 160px;
  }
}

.register-body .body-info .body-l .tag {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.register-body .body-info .body-l .tag button {
  border: none;
  background-color: inherit;
}

.register-body .body-info .body-r {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.register-body .body-info .body-l .ma {
  background-color: #fff;
  height: 120px;
  width: 120px;
  margin-bottom: 10px;
  display: flex;
}

img {
  width: 100%;
  height: 100%;
}

.register-body .body-info .body-l .detail {
  font-size: 15px;
  padding-top: 10px;
}

.body-info .el-form .el-select {
  width: 100%;
}
</style>
