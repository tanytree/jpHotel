<!--
 * @Date: 2020-03-26 09:30:49
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-22 09:34:13
 * @FilePath: /cloudAdmin/src/views/market/promotion/index.vue
 -->
<template>
  <div id="page1">
    <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="店铺营销" name="first">
        <shop ref="shop" />
      </el-tab-pane>
      <el-tab-pane label="会员营销" name="second">
        <member ref="publishRef" />
      </el-tab-pane>
      <el-tab-pane label="轮播图管理" name="third">
        <slideshow :action="action" :uploadData="uploadData"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import shop from "./shop/shop";
import member from "./member/member";
import slideshow from "./slideshow/slideshow";
import { mapState, mapActions } from "vuex";

export default {
    components: { shop, member, slideshow },
    computed: {
        ...mapState({
            user: state => state.user
        }),
    },
    data() {
      return {
          uploadData:{},
          courseTypes: [],
          action: '',
          activeName: "first" //第一个默认启动
      };
    },
    created() {
        this.action = this.$F.getUploadUrl() + '/edt/upload/upload_img';
        this.uploadData = { imgModel: "1", platSource: 1006, userId: this.user.userId };
    },
  methods: {
      handleClick(){}
  }
};
</script>
