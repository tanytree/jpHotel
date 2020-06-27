<!--
 * @Date: 2020-03-23 16:32:55
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-31 17:00:57
 * @FilePath: /cloudAdmin/src/views/company/list.vue
 -->
<template>
  <el-card class="wrapper">
    <el-page-header @back="$router.push('/company')" title="返回企业选择"></el-page-header>
    <el-col :span="20" :offset="2">
      <div style="padding:30px 0">我的企业列表</div>

      <el-row :gutter="10">
        <el-col
          style=" margin-bottom: 10px;"
          :span="8"
          v-for="(item,index) in enterpriseList"
          :key="index"
        >
          <el-card>
            <div class="combox">
              <div class="logox">
                <img :src="item.businessLicense" alt />
              </div>
              <div class="comInfo">
                <span class="comName">{{item.enterName}}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-card>
</template>

<script>
import { enterprise_list } from "@/utils/api/login";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      enterpriseList: []
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      userId: state => state.user.id,
      plat_source: state => state.config.plat_source
    })
  },
  created() {
    this.getEnterprise();
  },
  methods: {
    ...mapActions({
      companyInit: "company/companyInit"
    }),
    getEnterprise() {
      enterprise_list({
        plat_source: this.plat_source,
        token: this.token,
        userId: this.userId,
        searchType: 2,
        pageIndex: "1",
        pageSize: "10"
      }).then(res => {
        if (res.code == 200) {
          this.enterpriseList = res.data;
        }
      });
    }
  }
};
</script>

<style lang="less">
.wrapper {
  height: 100%;
  width: 100%;
  background-color: #fff;
  padding: 30px;
  .combox {
    display: flex;
    height: 100px;

    .comInfo {
      flex: 1;
      padding-left: 10px;
      font-size: 14px;
    }
  }
  .logox {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-content: center;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
    }
  }
}
.tips {
  text-align: center;
  padding: 30px;
  font-size: 14px;
  color: #666;
}
</style>
