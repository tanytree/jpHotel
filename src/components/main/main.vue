<template>
    <el-container class="mainpage">
        <el-header class="mainheader" height="40px">
            <pageHeader ref="pageHeader" @calRouter="calRouter" :user="user"/>
        </el-header>
        <el-container class="main-container">
            <el-aside
                    v-if="menul.children && menul.children.length>0 &&routerCompany!=='company'"
                    class="mainAside"
            >
                <div class="side-menu-wrapper">
                    <div class="topNav">
                        <img :src="require(`@/assets/images/${menul.icon}.png`)" alt/>
                        {{menul.name}}
                    </div>
                    <ul class="el-menu">
                        <li
                                class="el-menu-item"
                                v-for="(item) in menul.children"
                                :key="item.id"
                                :class="sectionid==item.id?'is-active':''"
                                @click="toSection(item)"
                        >
                            <img v-if="item.icon" :src="require(`@/assets/images/${item.icon}`)" alt/>
                            {{item.name}}
                        </li>
                    </ul>
                    <!-- <el-menu>
                      <template>
                        <el-menu-item
                          :key="item.id"
                          :class="sectionid==item.id?'is-active':''"
                          @click="toSection(item)"
                        >{{item.name}}</el-menu-item>
                      </template>
                    </el-menu>-->
                </div>
            </el-aside>
            <el-container class="mainContainer">
                <el-header class="layheader">
                    <div
                            class="header-item"
                            v-for="item in routermsg"
                            :key="item.id"
                            @click="menulfuc(item)"
                            :class="partmentId==item.id?'itemactive':''"
                    >
                        <img :src="require(`@/assets/images/${item.icon}.png`)" alt/>
                        <div>{{item.name}}</div>
                    </div>
                </el-header>
                <div class="main-content">
                    <div
                            class="pageTab el-tabs el-tabs--top"
                            v-if="subMenul.children&&subMenul.children.length>0&&routerCompany!=='company'"
                    >
                        <div class="el-tabs__header is-top">
                            <div class="el-tabs__nav-wrap is-top">
                                <div class="el-tabs__nav-scroll">
                                    <div class="el-tabs__nav is-top">
                                        <div
                                                class="el-tabs__item is-top"
                                                :class="pageId==item.id?'is-active':''"
                                                v-for="(item,index) in subMenul.children"
                                                :key="index"
                                                @click="toPage(item)"
                                        >{{item.name}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <keep-alive>
                        <router-view/>
                    </keep-alive>
                </div>
            </el-container>
        </el-container>
        <el-backtop target=".mainContainer .main-content " :bottom="80"></el-backtop>
    </el-container>
</template>
<script>
    import { removeToken } from '@/utils/auth'
    import esMenu from './components/sidebar'
    import pageHeader from './components/pageHeader'
    import { mapState, mapActions } from 'vuex'
    import { get_user_enterprise } from '@/utils/api/login'

    export default {
        name: 'Main',
        components: {
            esMenu,
            pageHeader
        },
        computed: {
            ...mapState({
                routermsg: state => state.routermsg.routermsg,
                token: state => state.user.token,
                user: state => state.user
            })
        },
        data () {
            return {
                routerCompany: '',
                modelShow: false,
                partmentId: '', //部门ID
                sectionid: '', //左侧导航ID
                pageId: '', //页面ID
                theme: 'light',
                menul: [],
                subMenul: [],
                parentMenu: {},
                company: {},
                siderflg: false
            }
        },
        mounted () {
            this.menulfuc(this.routermsg[0])
            this.toSection(this.menul.children[0])
        },
        methods: {
            ...mapActions({
                routeractions: 'routermsg/routeractions',
            }),
            menulfuc (item) {
                this.routerCompany = ''
                this.menul = item
                sessionStorage.menul = JSON.stringify(item)
                this.partmentId = item.id
                this.sectionid = ''
                sessionStorage.partmentId = item.id
                this.$forceUpdate()
                this.toSection(this.menul.children[0])
            },
            //点击左侧导航
            toSection (item) {
                this.subMenul = item
                sessionStorage.sectionid = item.id
                sessionStorage.subMenul = JSON.stringify(item)
                this.sectionid = item.id
                if (item.children && item.children.length > 0) {
                    this.pageId = item.children[0].id
                    // console.log(this.pageId);
                    sessionStorage.pageId = item.children[0].id
                }
                if (item.value) {
                    if (this.$route.name == item.value) {
                        return false
                    }
                    this.$router.push(item.value)
                } else {
                    if (item.children && item.children.length > 0) {
                        if (this.$route.name == item.children[0].value) {
                            return false
                        }
                        this.$router.push(item.children[0].value)
                    }
                }

                sessionStorage.pagePath = item.value
            },
            toPage (item) {
                this.pageId = item.id
                sessionStorage.pageId = item.id
                if (this.$route.name == item.value) {
                    return false
                }
                this.$router.push(item.value)
                sessionStorage.pagePath = item.value
            },
            // 注销
            logout () {
                this.modelShow = false
                removeToken()
                localStorage.clear()
                sessionStorage.clear()
                this.$router.push('/')
            },
            // 处理路由
            calRouter () {
                // this.$refs.pageHeader.init();
                this.partmentId = sessionStorage.partmentId || ''
                this.sectionid = sessionStorage.sectionid || ''
                this.pageId = sessionStorage.pageId || ''
                if (sessionStorage.subMenul) {
                    this.subMenul = JSON.parse(sessionStorage.subMenul) || {}
                }
                if (sessionStorage.menul) {
                    this.menul = JSON.parse(sessionStorage.menul) || {}
                }
                if (sessionStorage.pagePath) {
                    // this.$router.push(sessionStorage.pagePath);
                }
                this.routerCompany = ''

                if (this.$route.meta) {
                    if (this.$route.meta.title) {
                        this.routerCompany = this.$route.meta.title
                    }
                    if (this.$route.meta.pid) {
                        this.sectionid = this.$route.meta.pid
                        sessionStorage.sectionid = this.sectionid
                    }
                }
            },
            /**
             * 深度克隆
             * @param   origin 被拷贝的原对象
             * @param   target 拷贝出来的对象
             * @return         拷贝出来的对象
             */
            deepClone (obj) {
                var str, newobj = obj.constructor === Array ? [] : {}
                if (typeof obj !== 'object') {
                    return
                } else if (window.JSON) {
                    str = JSON.stringify(obj), //序列化对象
                        newobj = JSON.parse(str) //还原
                } else {
                    for (var i in obj) {
                        newobj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
                    }
                }
                return newobj
            },
        },
        created () {
            // const routeArray = this.$F.handleTree(this.user.userAuth, this.routermsg);
            // this.routeractions(routeArray);
            // this.routermsg = routeArray;

            this.$forceUpdate()
            this.calRouter()
        },
        // mounted() {
        // this.$refs.slidBar.getRouter();
        // this.company = this.companyList[0];
        // get_user_enterprise({
        //   token: this.token,
        //   userId: this.userId,
        //   userId: this.plat_source,
        //   enterCode: this.company.enterCode
        // }).then(res => {});
        // },
        watch: {
            // $route(to, from) {
            //   this.calRouter();
            // }
        }
    }
</script>
<style lang="less" scoped>
    .mainpage {
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
    }

    .layheader {
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

        > div {
            width: 100%;
            padding: 20px;
            height: 100%;

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
        height: 80px;
        background: rgba(52, 53, 63, 1);
        padding: 0 15px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);

        img {
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 1);
            margin-right: 12px;
            border-radius: 50%;
        }
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
