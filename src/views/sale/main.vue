<!--
 * @Date: 2020-03-11 10:59:52
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-25 12:41:46
 * @FilePath: /cloudAdmin/src/views/sale/main.vue
 -->
<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="15">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>快捷入口</span>
          </div>
        </el-card>
        <el-card>
          <div slot="header" class="clearfix">
            <span>销售动态</span>
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
export default {
  data() {
    return {
      dynamic_list: []
    };
  },
  created() {
    get_dynamic_list({ type_2: "1" }).then(res => {
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
  padding: 15px 10px 20px;
  border-bottom: 1px solid #e7e7e7;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
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
