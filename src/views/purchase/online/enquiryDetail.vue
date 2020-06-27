<!--
 * @Date: 2020-04-23 16:11:59
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-23 16:40:41
 * @FilePath: /cloudAdmin/src/views/purchase/online/enquiryDetail.vue
 -->
<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/onlineEnquiry' }">在线询盘</el-breadcrumb-item>
          <el-breadcrumb-item>新增询盘</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form size="mini" label-width="80px">
        <el-form-item label="询盘方式">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="截止日期">
          <el-date-picker
            placeholder="请选择"
            style="width:200px"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            class="dateBox"
            v-model="editForm.end_time"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="交货地">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="采购方">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editForm: {
        id: "",
        title: "",
        end_time: "",
        type: "",
        delivery_address: "",
        co_name: "",
        name: "",
        phone: "",
        goods: []
      }
    };
  }
};
</script>

<style>
</style>
