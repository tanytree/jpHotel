<template>
  <div class="mainheader" height="40px">
    <div class="leftHead">
      <!--      <el-dropdown>-->
              <span class="el-dropdownBox">
                <span class="enterName">{{user.storesInfo.storesName}}</span>
<!--                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
              </span>
      <!--        <el-dropdown-menu slot="dropdown">-->
      <!--          <el-dropdown-item-->
      <!--            class="itemel"-->
      <!--            v-for="(item,index) in storeList"-->
      <!--            :key="index"-->
      <!--            @click.native="selectCompany(item)"-->
      <!--          >-->
      <!--            <div class="itemComang" :class="[item.enterCode==company.enterCode?'activeC':'']">-->
      <!--              <span-->
      <!--                class="itemSpam"-->
      <!--                :class="[item.default==1?'active':'']"-->
      <!--              >{{item.default==1?"默认":""}}</span>-->
      <!--              {{item.enterName}}-->
      <!--            </div>-->
      <!--          </el-dropdown-item>-->
      <!--          <el-dropdown-item @click.native="joinCompany">-->
      <!--            <span class="itemSpam"></span>-->
      <!--            <i class="el-icon-plus"></i>创建/加入企业-->
      <!--          </el-dropdown-item>-->
      <!--        </el-dropdown-menu>-->
      <!--      </el-dropdown>-->
      <!--      <span class="itemTxt" @click="toNext('companyInfo')">企业管理</span>-->
    </div>

    <div class="header_right">
      <!--
      <span class="itemTxt rightItem">
        <img src="@/assets/images/topBanner/shengpi.png" alt />
        审批
      </span>
      <span class="itemTxt rightItem">
        <img src="@/assets/images/topBanner/xiaoxi.png" alt />
        消息
      </span>
      <span class="itemTxt rightItem">
        <img src="@/assets/images/topBanner/gonggao.png" alt />
        公告
      </span>-->
      <span class="itemTxt rightItem">
				<el-dropdown>
					<span class="el-dropdown-link">
						{{language}}<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="toggleLang('zh')" :disabled="$i18n.locale == 'zh'">中文</el-dropdown-item>
						<el-dropdown-item @click.native="toggleLang('ri')" :disabled="$i18n.locale == 'ri'">日本語</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
        <!-- <el-select v-model="language" placeholder="请选择" @change="languageChange">
          <el-option label="中文" value="zh"> </el-option>
          <el-option label="日文" value="ri"> </el-option>
        </el-select> -->
			</span>
      <span class="itemTxt rightItem" @click="itemClick('organization')">
        <img src="@/assets/images/topBanner/zuzhi.png" alt />
        人员管理
      </span>
      <span class="itemTxt logoout">
				<el-dropdown>
					<span class="userInfo">
						<img :src="user.headimgurl" alt />
						{{user.userName}}
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<!--             <el-dropdown-item @click.stop="modelShowfuc">我的资料</el-dropdown-item>-->
						<el-dropdown-item @click.native="modelShowfuc">退出系统</el-dropdown-item>
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
  } from "vuex";

  export default {
    // props:['language'],
    computed: {
      ...mapState({
        user: state => state.user,
      })
    },
    data() {
      return {
        language: '日本語',
      }
    },
    watch: {
    },
    activated() {
      this.language = this.$F.getLangDesc(localStorage.getItem('locale') || 'ri');
    },
    methods: {
      ...mapActions({}),
      toggleLang(lang) {
        this.$i18n.locale = lang;
        localStorage.setItem('locale', lang)
        let langDesc = this.$F.getLangDesc(lang);
        this.language = langDesc;
        this.$forceUpdate();
        this.$message({
          message: `切换为${langDesc}成功`,
          type: 'success'
        })
        // this.$emit('calRouter', lang)
      },

      modelShowfuc() {
        this.$confirm("是否确认退出系统？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(res => {
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push("/login");
          })
          .catch(res => {});
      },
      itemClick(name){
      this.$router.push('/' + name)
    },
    }
  };
</script>

<style lang="less">
  .itemComang {
    &.activeC {
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

    &.active {
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
      width: 140px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .enterName {
        width: 100px;
        text-overflow: ellipsis;
        display: inline-block;
        overflow: hidden;
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
