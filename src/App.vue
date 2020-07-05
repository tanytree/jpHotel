<template>
  <div id="app">
    <keep-alive>
      <router-view />
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
  created() {},
  data() {
    return {
      isRouterAlive: true,
      isRefresh: false
    };
  },
  methods: {
    ...mapActions({
      saveuser: "user/saveuser",
      companyInit: "company/companyInit"
    }),
    fetchData: function() {
      let RouterKey = getRouterKey() ? JSON.parse(getRouterKey()) : [-2];
 

      if (RouterKey.includes(+this.$route.meta.roles)) {
      } else {
        // this.$router.push({
        //   path: '/@/views/noaccess/noaccess'
        // })
      }
    },
    refresh() {
      this.isRouterAlive = false;
      setTimeout(() => {
        // 强制重新渲染
        this.isRefresh = true;
        this.isRouterAlive = true;
        this.$router.go(0);
      }, 1000);
    }
  },
  created() {
    let userData = sessionStorage.userData;
    let companyInfo = sessionStorage.companyInfo;
    if (companyInfo && JSON.parse(companyInfo)) {
      this.companyInit(JSON.parse(companyInfo));
    }
    if (userData && JSON.parse(userData)) {
      let data = JSON.parse(userData);
      this.saveuser({ data: data });
    }
  },
  watch: {
    $route(to, from) {
      //console.log(to,from)
      if (from.name == "login" && to.name != "login") {
        // this.refresh();
      } else {
        this.fetchData();
      }
    }
  }
};
</script>
