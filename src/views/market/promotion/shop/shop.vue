/* * @Author: Dana     *@Date: 2020-03-16 10:51:26  * @Last Modified by:   Dana  * @Last Modified time: 2020-03-16 10:51:26  */
<template>
  <div>
    <el-card>
      <div class="store-list">
        <router-link class="store-tag" :to="item.value"  v-for="(item,index) in storeList" :key="index">
          <div class="imgBox">
            <img :src="require(`@/assets/images/market/promotion/tab${index+1}.png`)" alt />
          </div>
          <div>{{item.name}}</div>
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storeList: [
        {
          icon: "",
          name: "奖学金管理",
          value: "scholarship"
        },
        {
          icon: "",
          name: "证书管理",
          value: "cert"
        },
        {
          icon: "",
          name: "活动项目",
          value: "activesEvents"
        }
      ]
    };
  }
};
</script>

<style lang="less">
.store-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 14px;
  .store-tag {
    height: 150px;
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    border: 1px solid rgba(209, 209, 209, 1);
    margin-right: 10px;
    cursor: pointer;
    .imgBox {
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-width: 60px;
        max-height: 40px;
      }
    }
  }
}
</style>
