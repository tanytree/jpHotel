<template>
    <div class="mainheader" height="40px">
        <div class="leftHead">
            <!--      <el-dropdown>-->
            <span class="el-dropdownBox">
                <span class="enterName">{{user.storesInfo.storesName}}</span>
              </span>
        </div>

        <div class="header_right">
            <span class="itemTxt rightItem">
				<el-dropdown>
					<span class="el-dropdown-link">
						{{language}}<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="toggleLang('zh')"
                                          :disabled="$i18n.locale == 'zh'">{{$t('login.chinese')}}</el-dropdown-item>
						<el-dropdown-item @click.native="toggleLang('ri')"
                                          :disabled="$i18n.locale == 'ri'">{{$t('login.japanese')}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</span>
            <span class="itemTxt rightItem" @click="itemClick('organization')" v-if="(user.userType == 3 && user.storesNum != $F.getHQCode()) || (user.account == 'admin' && user.storesNum == $F.getHQCode())">
                <img src="@/assets/images/topBanner/zuzhi.png" alt/>
                {{$t('commons.staffManagerDesc')}}
              </span>
            <span class="itemTxt logoout">
				<el-dropdown>
					<span class="userInfo">
						<img v-if="user.headimgurl" :src="user.headimgurl || '../../../assets/images/nav01.png'" alt/>
						{{user.userName}}
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<!--             <el-dropdown-item @click.stop="modelShowfuc">我的资料</el-dropdown-item>-->
						<el-dropdown-item @click.native="modelShowfuc">{{$t('login.backLogin')}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</span>
        </div>
    </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import { getLanguage, setLanguage } from '@/utils/auth'
  import lang_zh from 'element-ui/lib/locale/lang/zh-CN'
  import locale from 'element-ui/lib/locale'
  import lang_ri from "element-ui/lib/locale/lang/ja";
  export default {
    // props:['language'],
    computed: {
      ...mapState({
        user: state => state.user,
      })
    },
    inject: ['reload'],
    data () {
      return {
        language: '日本語',
      }
    },

    mounted () {
      let locale = getLanguage() || 'zh';
      this.language = this.$F.getLangDesc(locale);
      sessionStorage.locale = locale;
      this.$i18n.locale = locale;
      console.log(this.user);
    },
    methods: {
      ...mapActions({}),
      toggleLang (lang) {
          if (lang == 'zh') {
              // 设置语言
              locale.use(lang_zh)
          } else
              locale.use(lang_ri)
        setLanguage(lang)
        this.$i18n.locale = lang
        sessionStorage.locale = lang
        let langDesc = this.$F.getLangDesc(lang)
        this.language = langDesc
        this.$forceUpdate()
        this.$message({
          message: this.$t('commons.request_success'),
          type: 'success'
        })
        this.reload()
        // this.$router.go(0)
        // window.location.reload()
      },

      modelShowfuc () {
        this.$confirm('是否确认退出系统？', this.$t('commons.tip_desc'), {
          confirmButtonText: this.$t('commons.confirm'),
          cancelButtonText: this.$t('commons.cancel'),
          type: 'warning'
        })
          .then(res => {
            localStorage.clear()
            sessionStorage.clear()
            this.$router.push('/login')
          })
          .catch(res => {
          })
      },
      itemClick (name) {
        this.$router.push('/' + name)
      },
    }
  }
</script>

<style lang="less">
    .itemComang {

    &
    .activeC {
        color: rgba(59, 135, 255, 1);
    }

    }

    .itemSpam {
        width: 35px;
        height: 24px;
        border-radius: 2px;
        display: inline-block;
        margin-right: 5px;
        text-align: center;
        line-height: 24px;
        font-size: 12px;

    &
    .active {
        background-color: rgba(59, 135, 255, 1);
        font-family: PingFangSC-Regular;
        color: #fff;
    }

    }

    .itemel {
        display: flex;
        align-items: center;
    }

    .mainheader {
        width: 100%;
        min-width: 1150px;
        background-color: #2b2e3f;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: space-between;

    .el-dropdownBox {
        color: #fff;
        padding-right: 20px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;

    .enterName {
        text-overflow: ellipsis;
        display: inline-block;
        height: 30px;
        line-height: 30px;
    }

    }

    .leftHead {
        display: flex;
        align-items: center;
    }

    }

    .itemTxt {
        cursor: pointer;
        margin: 0 8px;
        color: #ffffff;
    }

    .header_right {
        display: flex;
        align-items: center;
        line-height: 1;

    .rightItem {
        display: flex;
        align-items: center;
        line-height: 1;

    img {
        width: 22px;
        height: 22px;
        margin: 0 10px;
    }

    }

    .logoout {
        margin-left: 40px;
    }

    .userInfo {
        color: #ffffff;
        display: flex;
        align-items: center;

    img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 10px;
    }

    }
    }
</style>
