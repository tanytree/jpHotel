<template>
    <el-container class="mainPage">
        <el-header class="mainHeader" height="40px">
            <pageHeader @calRouter="calRouter" :language='language'/>
        </el-header>
        <el-container class="main-container">
            <el-aside v-if="menul.children && menul.children.length > 0&&routerCompany!=='company'" class="mainAside">
                <div class="side-menu-wrapper">
                    <div class="topNav">
                        <img :src="require(`@/assets/images/${menul.icon}.png`)" alt/>
                        {{menul.name}}
                    </div>
                    <ul class="el-menu">
                        <li class="el-menu-item" v-for="(item) in menul.children" :key="item.id" :class="sectionid==item.id?'is-active':''"
                            @click="toSection(item)">
                            <img v-if="item.icon" :src="require(`@/assets/images/${item.icon}`)" alt/>
                            {{item.name}}
                        </li>
                    </ul>
                </div>
            </el-aside>
            <el-container class="mainContainer">
                <el-header class="layHeader">
                    <div class="header-item" v-for="item in routesmap" :key="item.name" @click="menulfuc(item)" :class="partmentId == item.id?'itemactive':''">
                        <img :src="require(`@/assets/images/${item.icon}.png`)" alt/>
                        <div>{{item.name}}</div>
                    </div>
                </el-header>
                <div class="main-content">
                    <div class="pageTab el-tabs el-tabs--top" v-if="subMenul.children&&subMenul.children.length > 0">
                        <div class="el-tabs__header is-top">
                            <div class="el-tabs__nav-wrap is-top">
                                <div class="el-tabs__nav-scroll">
                                    <div class="el-tabs__nav is-top">
                                        <div class="el-tabs__item is-top" :class="pageId==item.id?'is-active':''" v-for="(item,index) in subMenul.children" :key="index" @click="toPage(item)">{{item.name}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-inner">
                        <router-view/>
                    </div>
                    <!-- <keep-alive>
                      <router-view />
                    </keep-alive> -->
                </div>
            </el-container>
        </el-container>
        <el-backtop target=".mainContainer .main-content " :bottom="80"></el-backtop>
    </el-container>
</template>
<script>
    import {removeToken} from "@/utils/auth";
    import esMenu from "./components/sidebar";
    import pageHeader from "./components/pageHeader";
    import {mapState, mapActions} from "vuex";

    export default {
        name: "Main",
        components: {
            esMenu,
            pageHeader
        },

        computed: {
            ...mapState({
                routesmap: state => state.routermsg.routermsg,
                token: state => state.user.token,
                userId: state => state.user.id,
                storeList: state => state.user.storeList,
            })
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

                language: 'zh'
            };
        },
        onShow() {
        },
        methods: {
            ...mapActions({
                routeractions: "routermsg/routeractions",
            }),

            menulfuc(item) {
                this.routerCompany = "";
                this.menul = item;
                sessionStorage.menul = JSON.stringify(item);
                this.partmentId = item.id;
                this.sectionid = "";
                sessionStorage.partmentId = item.id;
                this.$forceUpdate();
                this.toSection(this.menul.children[0])
            },
            //点击左侧导航
            toSection(item) {
                console.log('item----', item)
                this.subMenul = item;
                sessionStorage.sectionid = item.id;
                sessionStorage.subMenul = JSON.stringify(item);
                this.sectionid = item.id;
                this.$router.push({name: item.value});
                console.log('item.value------', this.$router.push({name: item.value}))
                if (item.children && item.children.length > 0) {
                    this.pageId = item.children[0].id;
                    // console.log(this.pageId);
                    sessionStorage.pageId = item.children[0].id;
                }
                if (item.value) { //单级导航
                    if (this.$route.name == item.value) {
                        return false;
                    }
                    this.$router.push({name: item.value});
                    console.log('value====', this.$route.name, item.value)
                } else { //如果导航有多级
                    if (item.children && item.children.length > 0) {
                        if (this.$route.name == item.children[0].value) {
                            return false;
                        }
                        this.$router.push(item.children[0].value);
                    }
                }
                sessionStorage.pagePath = item.value;
            },
            toPage(item) {
                console.log('item====', item)
                this.pageId = item.id;
                sessionStorage.pageId = item.id;
                if (this.$route.name == item.value) {
                    return false;
                }
                this.$router.push(item.value);
                sessionStorage.pagePath = item.value;
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
                this.language = language
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
            }
        },
      created () {
        this.calRouter()
        this.$forceUpdate()
      },
      // mounted () {
      //   this.menulfuc(this.routermsg[0])
      //   this.toSection(this.menul.children[0])
      // },
        activated() {
            //   debugger
          this.routeractions([
            {
              name: this.$t('tabName[0].name'), // 总办
              icon: "icon06",
              value: "product",
              id: 'a367289c90e34614a308917f5726bd01',
              children: [
                {name: this.$t('tabName[0].children[0].name'), id: "10", icon: "sales/nav01.png", value: "bossIndex"},
                {name: this.$t('tabName[0].children[1].name'), id: "11", icon: "market/nav02.png", value: "DepartmentCharge"},
                {name: this.$t('tabName[0].children[2].name'), id: "12", icon: "market/nav03.png", value: "PersonMg"},
                {name: this.$t('tabName[0].children[3].name'), id: "13", icon: "market/nav04.png", value: "PayMg",},
                {name: this.$t('tabName[0].children[4].name'), id: "14", icon: "market/nav05.png", value: "storeManagement",}
              ]
            },
            {
              name: this.$t('tabName[1].name'), // 管理部
              icon: "icon09",
              value: "product",
              id: 'a367289c90e34614a308917f5726bd05',
              children: [
                {name: this.$t('tabName[1].children[0].name'), id: "20", icon: "market/nav01.png", value: "managerIndex"},
                {name: this.$t('tabName[1].children[1].name'), id: "21", icon: "market/nav02.png", value: "guestCenter"},
                {name: this.$t('tabName[1].children[2].name'), id: "22", icon: "market/nav03.png", value: "guestRoom_2"},
                {name: this.$t('tabName[1].children[3].name'), id: "23", icon: "market/nav04.png", value: "priceSystem"},
                {name: this.$t('tabName[1].children[4].name'), id: "24", icon: "market/nav04.png", value: "advert",}
              ]
            },
            {
              name: this.$t('tabName[2].name'), // 财务部
              icon: "icon08",
              value: "product",
              id: 'a367289c90e34614a308917f5726bd03',
              children: [
                {name: this.$t('tabName[2].children[0].name'), id: "30", icon: "market/nav01.png", value: "finance"},
                {name: this.$t('tabName[2].children[1].name'), id: "31", icon: "market/nav02.png", value: "product"},
                {name: this.$t('tabName[2].children[2].name'), id: "32", icon: "market/nav03.png", value: "promotion"},
                {name: this.$t('tabName[2].children[3].name'), id: "33", icon: "market/nav04.png", value: "advert"},
                {name: this.$t('tabName[2].children[4].name'), id: "34", icon: "market/nav04.png", value: "advert",},
                {name: this.$t('tabName[2].children[5].name'), id: "35", icon: "market/nav04.png", value: "advert",}
              ]
            },
            {
              name: this.$t('tabName[3].name'), // 前台部
              icon: "icon04",
              value: "product",
              id: 'a367289c90e34614a308917f5726bd06',
              children: [
                { name: this.$t('tabName[3].children[0].name'), id: "40", icon: "market/nav01.png", value: "market" },
                { name: this.$t('tabName[3].children[1].name'), id: "41", icon: "market/nav02.png", value: "reception" },
                { name: this.$t('tabName[3].children[2].name'), id: "42", icon: "market/nav03.png", value: "booking" },
                { name: this.$t('tabName[3].children[3].name'), id: "43", icon: "market/nav04.png", value: "orders"},
                { name: this.$t('tabName[3].children[4].name'), id: "44", icon: "market/nav04.png", value: "customer", },
                { name: this.$t('tabName[3].children[5].name'), id: "45", icon: "market/nav04.png", value: "nightaudit", },
                { name: this.$t('tabName[3].children[6].name'), id: "46", icon: "market/nav04.png", value: "advert", }
              ]
            },
            {
              name: this.$t('tabName[4].name'), // 企划部
              icon: "icon04",
              value: "product",
              id: 'a367289c90e34614a308917f5726bd02',
              children: [
                {name: this.$t('tabName[4].children[0].name'), id: "47", icon: "market/nav01.png", value: "salemain"},
                {name: this.$t('tabName[4].children[1].name'), id: "48", icon: "market/nav02.png", value: "saleOrder"},
                {name: this.$t('tabName[4].children[2].name'), id: "49", icon: "market/nav03.png", value: "saleContract"},
                {name: this.$t('tabName[4].children[3].name'), id: "50", icon: "market/nav03.png", value: "contracted"}
              ]
            },
            {
              name: this.$t('tabName[5].name'), // 人事部
              icon: "icon05",
              value: "product",
              id: 'a367289c90e34614a308917f5726bd04',
              children: [
                {name: this.$t('tabName[5].children[0].name'), id: "51", icon: "market/nav01.png", value: "personnelManager"},
                {name: this.$t('tabName[5].children[1].name'), id: "52", icon: "market/nav02.png", value: "employeeList"},
                {name: this.$t('tabName[5].children[2].name'), id: "53", icon: "market/nav03.png", value: "channelDaili"},
                {name: this.$t('tabName[5].children[3  ].name'), id: "54", icon: "market/nav03.png", value: "channelSetting"}
              ]
            }
          ]);
            // this.$i18n.locale = 'zh';
            this.menulfuc(this.routesmap[0])
            this.toSection(this.menul.children[0])


        },
        watch: {
            $route(to, from) {
              if (to.name == 'main' || to.name == 'organization') {
                this.calRouter();
                this.$nextTick(()=> {
                  this.menulfuc(this.routermsg[0])
                  this.toSection(this.menul.children[0])
                  this.$forceUpdate()
                })
              }
            }
        }
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
        overflow-y: auto;
        background-color: #f5f5f5;
        display: block;
        border: 1px solid transparent;

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
        background: linear-gradient(180deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(212, 225, 246, 1) 100%);
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
</style>
