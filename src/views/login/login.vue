<template>
    <div class="register-index">
        <div class="register-body" v-if="loginType=='login'">
            <div v-if="!forget" class="title">欢迎登录管理后台</div>
            <el-page-header v-if="forget" @back="forget=false;forgetStep=1" title="返回登录"></el-page-header>
            <div class="body-info">
                <div class="body-l" v-if="!forget">
                    <el-form
                            :model="loginForm"
                            size="small"
                            validate-on-rule-change
                            :rules="dataRule"
                            ref="loginForm"
                    >
                        <el-form-item prop="storesNum">
                            <el-select v-model="loginForm.storesNum" placeholder="请选择门店列表">
                                <el-option
                                    v-for="item in storeList"
                                    :key="item.storesNum"
                                    :label="item.storesName"
                                    :value="item.storesNum">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="account">
                            <el-input
                                    prefix-icon="el-icon-s-custom"
                                    placeholder="请输入账号"
                                    v-model="loginForm.account"
                                    maxlength="18"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                    type="password"
                                    prefix-icon="el-icon-lock"
                                    placeholder="请输入密码，长度为6 - 18个字符"
                                    v-model.trim="loginForm.password"
                                    @keyup.enter.native="clickLoginBtn()"
                            ></el-input>
                        </el-form-item>
                        <!--            <el-form-item>-->
                        <!--              <div class="tag">-->
                        <!--                <el-button type="text" @click="loginType='register'">注册</el-button>-->
                        <!--                <el-button type="text" @click="forget=true">忘记密码</el-button>-->
                        <!--              </div>-->
                        <!--            </el-form-item>-->
                        <el-form-item>
                            <el-button style="width:100%" type="primary" @click="clickLoginBtn()" v-loading="loading">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="body-l" v-if="forget">
                    <div class="body-l" v-if="forgetStep==1">
                        <p style="font-size:12px;">找回密码</p>
                        <el-form
                                :model="forgetForm"
                                size="small"
                                validate-on-rule-change
                                :rules="dataRule"
                                ref="forgetForm"
                        >
                            <el-form-item prop="phoneNumber">
                                <el-input maxlength="11" placeholder="请输入手机号" v-model="forgetForm.phoneNumber"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input
                                        type="password"
                                        placeholder="设置登录密码，不少于6位"
                                        v-model.trim="forgetForm.password"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
<!--                                <el-button style="width:100%" type="primary" @click="forgetNext()">下一步</el-button>-->
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="body-l" v-if="forgetStep==2">
                        <p style="font-size:12px;margin-bottom:30px">为了安全，我们会向你的手机发送短信验证码</p>
                        <el-row :gutter="20">
                            <el-col :span="14">
                                <el-input size="small" maxlength="6" placeholder="填写验证码" v-model="verify"></el-input>
                            </el-col>
                            <el-col :span="10">
                                <el-button
                                        size="small"
                                        style="width:100%"
<!--                                        @click="getVertify"-->
                                        v-if="sendAuthCode"
                                >获取验证码
                                </el-button>
                                <el-button
                                        size="small"
                                        style="width:100%"
                                        disabled
                                        v-if="!sendAuthCode"
                                >{{auth_time}}秒
                                </el-button>
                            </el-col>
                        </el-row>
<!--                        <el-button style="margin-top:30px" type="primary" @click="checkVertify()">登录</el-button>-->
                    </div>
                </div>
                <div class="line"></div>
                <div class="body-l body-r">
                    <div class="ma">
                        <img src="@/assets/images/login/registerQr.png" alt/>
                    </div>-->
                    <!--          <div class="detail">扫码二维码，下载指点社区</div>-->
                </div>
            </div>
        </div>
        <div class="register-body" v-else>
            <div class="contentR">
                <p style="margin:5px 0 30px">注册</p>
                <el-form
                        style="width:80%"
                        :model="forgetForm"
                        validate-on-rule-change
                        :rules="dataRule"
                        ref="forgetForm"
                >
                    <el-form-item prop="nickname">
                        <el-input maxlength="18" placeholder="请输入用户名" v-model="forgetForm.nickname"></el-input>
                    </el-form-item>
                    <el-form-item prop="phoneNumber">
                        <el-input maxlength="11" placeholder="请输入手机号" v-model="forgetForm.phoneNumber"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="设置登录密码，不少于6位" v-model.trim="forgetForm.password"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-input maxlength="6" placeholder="填写验证码" v-model="verify">
                            <div slot="append">
                                <el-button
                                        size="small"
                                        style="width:100%"
                                        v-if="sendAuthCode"
                                >获取验证码
                                </el-button>
                                <el-button
                                        size="small"
                                        style="width:100%"
                                        disabled
                                        v-if="!sendAuthCode"
                                >{{auth_time}}秒
                                </el-button>
                            </div>
                        </el-input>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                        <el-checkbox v-model="isCheck">同意指点地球村用户协议和隐私政策</el-checkbox>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                        <el-button type="primary" style="width:70%">注册</el-button>
                    </el-form-item>
                </el-form>
                <p style="margin:5px 0 5px">
                    <span style="font-size:14px">已有账号，</span>
                    <el-button @click="loginType='login'" type="text">立即登陆</el-button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
  import { request } from '@/utils/request'
  import { mapState, mapActions } from 'vuex'
  import routermsg from '../../store/modules/routermsg'

export default {
  computed: {
    ...mapState({
      msgKey: state => state.config.msgKey,
      routermsg: state => state.routermsg.routermsg,
      plat_source: state => state.config.plat_source
    })
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error('密码长度为6 - 18个字符'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      storeList: [],
      isCheck: false,
      forgetStep: 1, // 忘记密码步骤
      forget: false, // 忘记密码
      loginType: 'login', // 登录-注册
      verify: '', // 验证码
      sendAuthCode: true /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
      auth_time: 0 /* 倒计时 计数器 */,
      loginForm: {
        storesNum: '0000000000',
        account: 'admin',
        password: 'admin123456'
      },
      forgetForm: {
        nickname: '',
        regType: '1',
        password: '',
        phoneNumber: ''
      },

      dataRule: {
        storesNum: {
          required: true,
          message: '请先选择门店',
          trigger: 'blur'
        },
        nickname: {
          required: true,
          message: '账号不得为空',
          trigger: 'blur'
        },
        account: {
          required: true,
          message: '账号不得为空',
          trigger: 'blur'
        },
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }
        ]
      }
    }
  },

  created() {
    this.$F.doRequest(this, '/pms/freeuser/stores_list', {filterHeader: true}, (data) => {
      this.storeList = data;
      // this.storeList = [{storesNum: '0000000000', storesName: '总部后台'}]
      this.loginForm.storesNum = data[0].storesNum
    })
  },
  methods: {
    ...mapActions({
      saveuser: 'user/saveuser',
      routeractions: 'routermsg/routeractions',
      companyInit: 'company/companyInit'
    }),

    userIsLogin (data) {
      data.data.storesInfo = this.storeList.filter((item) => {
        return item.storesNum == this.loginForm.storesNum
      })[0];
      this.saveuser(data)
      debugger
      // const routeArray = this.$F.handleTree(data.data.user.userAuth, this.routermsg)

      var array = {
        "id":"menuAssert",
        "menuTitle":"维护菜单（开发用）",
        "menuAliasTitle":"维护菜单",
        "japanese":"维护菜单",
        "parentMenuId":null,
        "icon":"icon06",
        "path":"",
        "menuLevel":1,
        "menuType":1,
        "status":1,
        "menuorder":1,
        "childList":[
          {
            "id": "menuAssert2",
            "createTime": "2020-07-05 15:01:00",
            "updateTime": "2020-07-05 15:01:00",
            "menuTitle": "首页",
            "menuAliasTitle": null,
            "japanese": "ホームページ",
            "parentMenuId": "menuAssert",
            "icon": "boss/nav01.png",
            "path": "menuAssert",
          }
        ]
      }
      data.data.menuList.push(array);
      this.routeractions(data.data.menuList);
      let url = 'main'
      // if (data.data && data.data.belongTo.length > 0) {
      //   this.companyInit(data.data.belongTo[0]);
      //   url = "main";
      // }
      this.$forceUpdate()
      this.$router.push({ path: '/main' })
      // this.$router.push({
      //   name: url
      // });
    },

    loginAction () {
      this.$router.push({
        name: 'main'
      })
    },

    clickLoginBtn (params = {loginType: 5}) {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.$F.merge(params, this.loginForm)
          this.$F.doRequest(this, '/pms/freeuser/login', params, (res) => {
            sessionStorage.account = this.loginForm.account
            sessionStorage.password = this.loginForm.password
            this.userIsLogin({
              data: res
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .register-index {
        background: url(../../assets/images/login.png) no-repeat;
        width: 100%;
        height: 100%;
        position: relative;
        background-size: cover;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;

        > .register-body {
            background-color: #ffffff;
            width: 650px;
            padding: 50px;
            text-align: center;
            min-height: 360px;
            border-radius: 6px;

            > .title {
                font-size: 18px;
                font-weight: bold;
                padding-bottom: 10px;
            }

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
            padding: 20px 0;
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

    .register-body .body-info .body-l .submit {
        display: flex;
        // padding: 20px 0px;
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
