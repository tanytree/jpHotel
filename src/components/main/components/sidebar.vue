<template>
  <div class="side-menu-wrapper">
    <div class="topNav">
      <img :src="require(`@/assets/images/${childrenroutemsg.icon}.png`)" alt />
      {{childrenroutemsg.name}}
    </div>
    <el-menu router>
      <template v-for="item in childrenroutemsg.children">
        <el-menu-item :index="item.id" :route="item.value">{{item.name}}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "esMenu",
  props: ["childrenroutemsg"],
  data() {
    return {
      theme: "dark",
      childroute: [],
      roleskey: [],
      showTab: "",
      showOpen: "",
    };
  },
  methods: {
    getRouter() {},
    routerfuc: function (data) {},
  },
  watch: {
    childrenroutemsg: {
      handler(oldvalue, newValue) {
        let arrrouter = this.childrenroutemsg;
      },
      deep: true,
    },
    $route(to, from) {
      this.showTab = to.path;
      sessionStorage.showTab = to.path;
      this.getRouter();
    },
  },
  created() {},
};
</script>
<style scoped>
</style>
