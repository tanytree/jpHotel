<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isRouterAlive" />
    </keep-alive>
  </div>
</template>
<style lang='less'>
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
@media print {
  .noprint {
    display: none;
  }
  .flex(@justify:center,@align:center,@direction:row) {
    display: flex;
    justify-content: @justify;
    align-items: @align;
    flex-direction: @direction;
  }
  .customerInfoBox {
  width: 100vw;
  // height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 900;
  .flex();
  .innerDialogBox {
    border-radius: 6px;
    width: 75%;
    height: 84%;
    // overflow: auto;
    background-color: #fff;
    .headerTitle {
      width: 75%;
      background-color: rgb(200, 216, 241);
      padding: 10px 20px;
      position: fixed;
      top: 7%;
      .flex(space-between,center);
      .header_leftTitle {
        font-size: 22px;
        font-weight: 600;
      }
      .header_rightTitle {
        font-size: 14px;
        color: rgba(176, 176, 176, 1);
        cursor: default;
      }
    }
    .contentBox {
      margin-top: 20px;
      box-sizing: border-box;
      padding: 20px;
      .dialog_headBox {
        .flex(space-between,center);
        img {
          width: 260px;
          height: 73px;
        }
      }
      .tableTitle {
        .flex(center,center,column);
        background-color: #d9d9d9;
        padding: 20px 0;
      }
      table {
        margin-top: 20px;
        border-collapse: collapse;
        width: 100%;
        tr {
          td {
            width: 80px;
            height: 40px;
            text-align: center;
          }
          .checkBox {
            label {
              margin-left: 20px;
            }
          }
        }
      }
      .bottomImg {
        text-align: right;
        img {
          width: 260px;
          height: 73px;
        }
      }
      .responsible {
        .flex(flex-start,center);
        margin-top: 30px;
        .innerBox {
          width: 400px;
          font-weight: 600;
          font-size: 18px;
          padding-bottom: 10px;
          border-bottom: 1px solid black;
        }
      }
    }
    .bottomBox {
      .flex();
      padding: 20px;
      border-top: 1px solid rgb(223, 226, 232);
      .bottomBox_left {
        padding: 10px 30px;
        border: 1px solid rgb(223, 226, 232);
        border-radius: 6px;
      }
      .bottomBox_right {
        padding: 10px 30px;
        background-color: rgb(64, 158, 255);
        border-radius: 6px;
        margin-left: 15px;
        color: #fff;
      }
    }
  }
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
.flex(@justify:center,@align:center,@direction:row) {
    display: flex;
    justify-content: @justify;
    align-items: @align;
    flex-direction: @direction;
  }
   .innerDialogBox {
  border-radius: 6px;
  width: 1000px;
  background-color: #fff;
  .headerTitle {
    box-sizing: border-box;
    width: 1000px;
    background-color: rgb(200, 216, 241);
    padding: 10px 20px 0 20px;
    .flex(space-between,center);
    .header_leftTitle {
      font-size: 22px;
      font-weight: 600;
    }
    .header_rightTitle {
      font-size: 14px;
      color: rgba(176, 176, 176, 1);
      cursor: default;
    }
  }
  .contentBox {
    // margin-top: 15px;
    box-sizing: border-box;
    padding: 20px;
    .dialog_headBox {
      .flex(space-between,center);
      img {
        width: 260px;
        height: 73px;
      }
    }
    .flexBox {
      .flex(flex-start,center);
      .flexBox_left {
        flex: 1;
      }
      .flexBox_right {
        flex: 1;
      }
    }
    .responsible {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 20px;
      .innerBox {
        width: 400px;
        font-weight: 600;
        font-size: 18px;
        padding-bottom: 10px;
        border-bottom: 1px solid black;
      }
    }
    .imgBox {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img {
        width: 260px;
        height: 73px;
      }
    }
  }
  
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
  data() {
    return {
      isRouterAlive: true,
      isRefresh: false,
    };
  },
  methods: {
    reload() {
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
