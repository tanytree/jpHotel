<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="15">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>快捷入口</span>
          </div>
          <el-row :gutter="10">
            <el-col :xs="12" :sm="11" :md="6" :lg="4" :xl="3">
              <div
                class="fastItem"
                style="text-align:center"
                @click="$router.push({path:'/product',query:{type:'second'}})"
              >
                <img src="@/assets/images/mainIcon1.png" alt />
                <p style="margin:5px 0;">添加产品</p>
              </div>
            </el-col>
            <el-col :xs="12" :sm="11" :md="6" :lg="4" :xl="3">
              <div
                class="fastItem"
                style="text-align:center"
                @click="$router.push({path:'/advert'})"
              >
                <img src="@/assets/images/mainIcon1.png" alt />
                <p style="margin:5px 0;">广告效果</p>
              </div>
            </el-col>
            <el-col :xs="12" :sm="11" :md="6" :lg="4" :xl="3">
              <div
                class="fastItem"
                style="text-align:center"
                @click="$router.push({path:'/promotion'})"
              >
                <img src="@/assets/images/mainIcon1.png" alt />
                <p style="margin:5px 0;">限时活动</p>
              </div>
            </el-col>
            <el-col :xs="12" :sm="11" :md="6" :lg="4" :xl="3">
              <div
                class="fastItem"
                style="text-align:center"
                @click="$router.push({path:'/promotion'})"
              >
                <img src="@/assets/images/mainIcon1.png" alt />
                <p style="margin:5px 0;">会员营销</p>
              </div>
            </el-col>
            <el-col :xs="12" :sm="11" :md="6" :lg="4" :xl="3">
              <div
                class="fastItem"
                style="text-align:center"
                @click="$router.push({path:'/scholarship'})"
              >
                <img src="@/assets/images/mainIcon1.png" alt />
                <p style="margin:5px 0;">优惠券</p>
              </div>
            </el-col>
            <el-col :xs="12" :sm="11" :md="6" :lg="4" :xl="3">
              <div
                class="fastItem"
                style="text-align:center"
                @click="$router.push({path:'/coupon3'})"
              >
                <img src="@/assets/images/mainIcon1.png" alt />
                <p style="margin:5px 0;">赠品管理</p>
              </div>
            </el-col>

            <!-- <el-col :xs="12" :sm="11" :md="6" :lg="4" :xl="3">
              <div class="fastItem" style="text-align:center">
                <img src="@/assets/images/mainIcon1.png" alt />
                <p style="margin:5px 0;">数据统计</p>
              </div>
            </el-col>-->
          </el-row>
        </el-card>
        <el-card>
          <div slot="header" class="clearfix">
            <span>营销动态</span>
          </div>
          <div>
            <div class="dymList" v-for="item in dynamic_list" :key="item.id">
              <div>
                <span>{{item.title}}</span>
                <br />
                <span>{{item.create_time}}</span>
              </div>
              <span class="el-icon-arrow-right"></span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card class>
          <div slot="header" class="clearfix">
            <span>公司组织架构</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get_dynamic_list } from "@/utils/api/market";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      dynamic_list: []
    };
  },
  created() {
    get_dynamic_list({ type_2: "3" }).then(res => {
      if (res.code == 200) {
        this.dynamic_list = res.data.list;
      }
    });
  }
};
</script>

<style lang="less">
.box-card {
  margin-bottom: 10px;
}
.dymList {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 10px;
  border-bottom: 1px solid #e7e7e7;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
}
.fastItem {
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  border: 1px solid rgba(209, 209, 209, 1);
  padding: 10px 0;
  margin: 10px 0;
  cursor: pointer;
}
.flexRow {
  display: flex;
  flex-wrap: wrap;
  .flexItem {
    margin: 12px;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    border: 1px solid rgba(209, 209, 209, 1);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 16px;
    color: #666;
    img {
      margin-bottom: 10px;
    }
  }
}
</style>
