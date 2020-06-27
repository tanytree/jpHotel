<template>
  <div>
    <el-card>
      <el-breadcrumb slot="header" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/market' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限设置</el-breadcrumb-item>
      </el-breadcrumb> 
      <div>具体权限设置（营销部）</div>
      <div>产品管理</div>
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="antuItem">
            <span class="leftSpan">
              <img src="@/assets/images/antuIcon.png" alt />
              添加/编辑产品
            </span>
            <el-switch v-model="value"></el-switch>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      value: false
    };
  }
};
</script>

<style lang="less">
.antuItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid rgba(210, 210, 210, 1);
  .leftSpan {
    display: flex;
    align-items: center;
    img {
      width: 30px;
      margin-right: 8px;
    }
  }
}
</style>