<template>
  <el-container class="mainPage">
    <el-header class="mainHeader" height="40px">
      <pageHeader @calRouter="calRouter" :language="language" />
    </el-header>
    <el-container class="main-container">
      <el-aside
        v-if="menul.childList && menul.childList.length > 0 &&routerCompany !== 'company'"
        class="mainAside"
      >
        <div class="side-menu-wrapper">
          <div class="topNav">
            <img :src="require(`@/assets/images/${menul.icon}.png`)" alt />
            {{$i18n.locale == 'ri' ? menul.japanese : (menul.menuAliasTitle || menul.menuTitle)}}
          </div>
          <ul class="el-menu">
            <li
              class="el-menu-item"
              v-for="(item) in menul.childList"
              :key="item.id"
              :class="sectionid == item.id &&routerCompany !== 'company' ? 'is-active':''"
              @click="toSection(item)"
            >
              <img v-if="item.icon" :src="require(`@/assets/images/${item.icon}`)" alt />
              {{$i18n.locale == 'ri' ? item.japanese : (item.menuAliasTitle || item.menuTitle)}}
            </li>
          </ul>
        </div>
      </el-aside>
      <el-container class="mainContainer">
        <el-header class="layHeader">
          <div
            class="header-item"
            v-for="item in menuList"
            :key="item.name"
            @click="menulfuc(item)"
            :class="partmentId == item.id && routerCompany !== 'company' ?'itemactive':''"
          >
            <img :src="require(`@/assets/images/${item.icon}.png`)" alt />
            <div>{{$i18n.locale == 'ri' ? item.japanese : (item.menuAliasTitle || item.menuTitle)}}</div>
          </div>
        </el-header>
        <div class="main-content">
          <div class="main-inner">
            <router-view />
          </div>
          <!-- <keep-alive>
                      <router-view />
          </keep-alive>-->
        </div>
      </el-container>
    </el-container>
    <el-backtop target=".mainContainer .main-content " :bottom="80"></el-backtop>
  </el-container>
</template>
<script>
import { removeToken } from "@/utils/auth";
import esMenu from "./components/sidebar";
import pageHeader from "./components/pageHeader";
import { mapState, mapActions } from "vuex";

export default {
  name: "Main",
  inject: ["reload"],
  components: {
    esMenu,
    pageHeader,
  },

  computed: {
    ...mapState({
      menuList: (state) => state.routermsg.routermsg,
      token: (state) => state.user.token,
      userId: (state) => state.user.id,
      storeList: (state) => state.user.storeList,
    }),
  },
  data() {
    return {
      routerCompany: "",
      modelShow: false,
      partmentId: "", //部门ID
      sectionid: "", //左侧导航ID
      pageId: "", //页面ID
      theme: "light",
      menul: [],
      subMenul: [],
      parentMenu: {},
      siderflg: false,

      language: "zh",
    };
  },
  onShow() {},
  methods: {
    ...mapActions({
      routeractions: "routermsg/routeractions",
    }),

    refresh() {
      this.reload();
    },

    menulfuc(item) {
      if (item.childList && item.childList.length > 0) {
        this.menul = item;
        this.routerCompany = "";
        sessionStorage.menul = JSON.stringify(item);
        this.partmentId = item.id;
        this.sectionid = "";
        sessionStorage.partmentId = item.id;
        this.toSection(this.menul.childList[0]);
        this.$forceUpdate();
      } else {
        this.$message.warning("暂未开放");
      }
    },
    //点击左侧导航
    toSection(item) {
      if (item.path) {
        this.subMenul = item;
        sessionStorage.sectionid = item.id;
        sessionStorage.subMenul = JSON.stringify(item);
        this.sectionid = item.id;
        if (item.childList && item.childList.length > 0) {
          this.pageId = item.childList[0].id;
          sessionStorage.pageId = item.childList[0].id;
        }
        sessionStorage.pagePath = item.path;
        if (this.$route.name == item.path) {
          return false;
        } else {
          sessionStorage.currentPath = item.path;
          this.$router.push({
            name: item.path,
          });
        }
      } else {
        this.$message.error("Request does not exist");
      }
    },

    // 注销
    logout() {
      this.modelShow = false;
      removeToken();
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push("/");
    },
    // 处理路由
    calRouter(language) {
      this.language = language;
      this.$forceUpdate();
      this.partmentId = sessionStorage.partmentId || "";
      this.sectionid = sessionStorage.sectionid || "";
      this.pageId = sessionStorage.pageId || "";
      if (sessionStorage.subMenul) {
        this.subMenul = JSON.parse(sessionStorage.subMenul) || {};
      }
      if (sessionStorage.menul) {
        this.menul = JSON.parse(sessionStorage.menul) || {};
      }
      if (sessionStorage.pagePath) {
        // this.$router.push(sessionStorage.pagePath);
      }
      this.routerCompany = "";

      if (this.$route.meta) {
        if (this.$route.meta.title) {
          this.routerCompany = this.$route.meta.title;
        }
        if (this.$route.meta.pid) {
          this.sectionid = this.$route.meta.pid;
          sessionStorage.sectionid = this.sectionid;
        }
      }
    },
  },
  created() {
    this.calRouter();
    this.$forceUpdate();
  },
  // mounted () {
  //   this.menulfuc(this.routermsg[0])
  //   this.toSection(this.menul.childList[0])
  // },
  mounted() {
    if (sessionStorage.menul && sessionStorage.menul != "undefined") {
      this.menulfuc(JSON.parse(sessionStorage.menul));
      this.toSection(JSON.parse(sessionStorage.subMenul));
    } else {
      this.menulfuc(this.menuList[0]);
      this.toSection(this.menul.childList[0]);
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "main" || to.name == "organization") {
        this.calRouter();
        if (to.name == "main") {
          this.$nextTick(() => {
            if (this.routermsg) {
              this.menulfuc(this.routermsg[0]);
            }
            this.toSection(this.menul.childList[0]);
            this.$forceUpdate();
          });
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.mainPage {
  height: 100%;
  width: 100%;
  min-width: 1200px;

  .mainAside {
    background-color: rgba(67, 71, 92, 1);
    width: 180px;
    min-width: 180px;
    max-width: 180px;
    flex: 0 0 180px;
    overflow-y: auto;
  }

  .mainContainer {
    flex-direction: column;
    height: 100%;
    flex: 1;
    position: relative;
  }

  .main-container {
    flex: 1;
    height: 100%;
  }
}

.log {
  width: 155px;
  float: left;
  text-align: center;
}

a {
  color: #0083b0;
}

.mainHeader {
  width: 100%;
  min-width: 1150px;
  background-color: #2b2e3f;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.layHeader {
  width: 100%;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  min-width: 1150px;
  background-color: #fff;
  color: #2b2e3f;
  font-size: 14px;
  font-weight: bold;
  padding: 0;
  display: flex;
}

.ivu-layout-header {
  height: 40px;
  line-height: 40px;
  padding: 0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  background: #f8fbfb;
}

.header > div {
  float: left;
}

.header-item {
  height: 60px;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  width: 140px;
}

.header-item img {
  width: 32px;
  height: 32px;
  margin-bottom: 3px;
}

.login_exit {
  float: right;
  padding: 0 20px;
}

.main-content {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  display: block;

  > .main-inner {
    width: 100%;
    height: 100%;
    padding: 20px;
    margin-bottom: 10px;

    &.pageTab {
      padding-bottom: 0;
      margin-bottom: 0;

      .el-tabs__header {
        margin: 0;
      }
    }
  }
}

.itemactive {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(212, 225, 246, 1) 100%
  );
}

.side-menu-wrapper {
  width: 100%;
}

.topNav {
  width: 100%;
  height: 60px;
  background: rgba(52, 53, 63, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.topNav img {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  margin-right: 10px;
  border-radius: 50%;
}

.ivu-menu {
  height: 100%;
  width: 100% !important;
  font-size: 13px;
  background-color: transparent;
}

.side-menu-wrapper .el-menu-item {
  width: 180px;
  background-color: #43475c;
  color: #fff;
  display: flex;
  align-items: center;
}

.el-menu-item img {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  vertical-align: middle;
}

.side-menu-wrapper .el-menu-item.is-active {
  background-color: #606685;
  color: #fff;
  border-right: 3px solid #fff;
}
//main-content是为了  前台部 > 客户管理 > 会员管理 > 会员信息管理——修改 页面
.main-content {
  overflow: auto;
}
</style>
