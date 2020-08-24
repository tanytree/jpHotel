<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="isRouterAlive" />
        </keep-alive>
    </div>
</template>
<style>
#app {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
}

.loading {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both;
}

@keyframes ani-spin {
    from {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(360deg);
    }
}
html {
    width: 100%;
    height: 100%;
}

body {
    width: 100%;
    height: 100%;
}
</style>
<script>
import { getRouterKey, removeToken } from "@/utils/auth";

import { mapState, mapActions } from "vuex";
export default {
    name: "app",
    provide() {
        return {
            reload: this.reload,
        };
    },
    created() {},
    data() {
        return {
            isRouterAlive: true,
            isRefresh: false,
        };
    },
    methods: {
        ...mapActions({
            saveuser: "user/saveuser",
            companyInit: "company/companyInit",
        }),
        fetchData: function () {
            // let RouterKey = getRouterKey() ? JSON.parse(getRouterKey()) : [-2];
            // if (RouterKey.includes(+this.$route.meta.roles)) {
            // } else {
            //   // this.$router.push({
            //   //   path: '/@/views/noaccess/noaccess'
            //   // })
            // }
        },

        reload() {
            debugger;
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true;
            });
        },

        refresh() {
            this.isRouterAlive = false;
            setTimeout(() => {
                // 强制重新渲染
                //this.isRefresh = true;
                //this.isRouterAlive = true;
                //this.$router.go(0);
            }, 1000);
        },
    },
    created() {
        // let userData = sessionStorage.userData;
        // let companyInfo = sessionStorage.companyInfo;
        // if (companyInfo && JSON.parse(companyInfo)) {
        //   this.companyInit(JSON.parse(companyInfo));
        // }
        // if (userData && JSON.parse(userData)) {
        //   let data = JSON.parse(userData);
        //   this.saveuser({ data: data });
        // }
        // 在页面加载时读取sessionStorage
        if (sessionStorage.getItem("store")) {
            this.$store.replaceState(
                Object.assign(
                    {},
                    this.$store.state,
                    JSON.parse(sessionStorage.getItem("store"))
                )
            );
        }
        // 在页面刷新时将store保存到sessionStorage里
        window.addEventListener("beforeunload", () => {
            sessionStorage.setItem("store", JSON.stringify(this.$store.state));
        });
    },
    watch: {
        $route(to, from) {
            // if (to && to.params && to.params.action) {
            //   this.refresh();
            // }
            // if (from.name == "login" && to.name != "login") {
            //
            // } else {
            //   this.fetchData();
            // }
        },
    },
};
</script>
