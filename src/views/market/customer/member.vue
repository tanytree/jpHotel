<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-10 11:06:35
 * @FilePath: \jiudian\src\views\market\customer\member.vue
 -->

<template>
  <div class="boss-index">
      <info type='footer'></info>
<!--    <el-tabs v-model="activeName" class="tabCenter" @tab-click="handleClick">-->
<!--      <el-tab-pane :label="$t('desk.customer_memInfo')" name="first">-->
<!--        <info></info>-->
<!--      </el-tab-pane>-->
<!--&lt;!&ndash;      <el-tab-pane :label="$t('desk.customer_integralQuery')" name="second">&ndash;&gt;-->
<!--&lt;!&ndash;        <points></points>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-tab-pane>&ndash;&gt;-->
<!--    </el-tabs>-->
  </div>
</template>
<script>
import info from "./vip/info";
import points from "./vip/points";

export default {
  components: { info, points },
  data() {
    return {
      // storeList: [],
      // nationalityList: [],
      // hotelenterList: [],
      // smembertypeList: [],
      activeName: "first",
    };
  },
  mounted() {
    // this.stores_list()
    // this.nationality()
    // this.login_user_list()
    // this.hotelenter_list()
    // this.smembertype_list()
  },
  methods: {
    //二级tab切片
    handleClick(tab, event) {
      // console.log(tab.index);
    },
    smembertype_list() {
      this.$F.commons.fetchMemberTypeList({}, (res) => {
        this.smembertypeList = res.list;
      });
    },
    stores_list() {
      this.$F.doRequest(this, "/pms/freeuser/stores_list", {}, (data) => {
        this.storeList = data;
      });
    },
    nationality() {
      this.$F.commons.fetchNationality((res) => {
        this.nationalityList = res;
      });
    },
    hotelenter_list() {
      let params = {
        id: "",
        enterName: "",
        state: 1,
        shareFlag: "",
        contactName: "",
        contactPhone: "",
        salesId: "",
        startCreditLimit: "",
        endCreditLimit: "",
        paging: false,
        salesFlag: 1,
        pageIndex: 1,
        pageSize: 10,
      };
      this.$F.doRequest(this, "/pms/hotelenter/list", params, (data) => {
        this.hotelenterList = data.list;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
</style>
