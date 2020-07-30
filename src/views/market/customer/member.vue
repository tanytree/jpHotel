<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-04 15:27:33
 * @FilePath: /jiudian/src/views/market/customer/list1.vue
 -->

<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="会员信息管理" name="first">
<!--                smembertypeList:storeList="storeList" :nationalityList="nationalityList" :hotelenterList="hotelenterList" :smembertypeList="smembertypeList"-->
                <info ></info>
            </el-tab-pane>
            <el-tab-pane label="积分查询" name="second">
                <points></points>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import info from "./vip/info";
import points from "./vip/points";

export default {
  components: { info, points},
  data() {
    return {
      // storeList: [],
      // nationalityList: [],
      // hotelenterList: [],
      // smembertypeList: [],
      activeName: "first" //第一个默认启动
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
      this.$F.fetchMemberTypeList({}, (res) => {
        this.smembertypeList = res.list;
      })
    },
    stores_list() {
      this.$F.doRequest(this, '/pms/freeuser/stores_list', {}, (data) => {
        this.storeList = data;
      })
    },
    nationality() {
      this.$F.fetchNationality((res) => {
        this.nationalityList = res;
      })
    },
    hotelenter_list() {
      let params = {
        id: '',
        enterName: '',
        state: 1,
        shareFlag: '',
        contactName: '',
        contactPhone: '',
        salesId: '',
        startCreditLimit: '',
        endCreditLimit: '',
        paging: false,
        salesFlag: 1,
        pageIndex: 1,
        pageSize: 10
      }
      this.$F.doRequest(this, '/pms/hotelenter/list', params, (data) => {
        this.hotelenterList = data.list
      })
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
</style>
