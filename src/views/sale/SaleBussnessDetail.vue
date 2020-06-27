<!--
 * @Date: 2020-03-25 11:10:48
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-25 13:03:17
 * @FilePath: /cloudAdmin/src/views/sale/SaleBussnessDetail.vue
 -->
<template>
  <!--统一的编辑和新增 -->
  <el-dialog :close-on-click-modal="false" width="700px" :visible.sync="visible" title="编辑">
    <div style="padding-bottom:8px">
      <div style="font-size:16px;color:#000;">{{editForm.co_name}}</div>
      <span>{{editForm.industry_name}}</span>
    </div>
    <div style="margin:5px 0">联系人1</div>
    <el-row>
      <el-col :span="8">姓名: {{editForm.name}}</el-col>
      <el-col :span="8">电话: {{editForm.phone}}</el-col>
      <el-col :span="8">职位: {{editForm.position}}</el-col>
    </el-row>
    <div style="margin:10px 0;height: 1px;background-color: #DCDFE6;"></div>
    <div style="margin:5px 0">联系人2</div>
    <el-row>
      <el-col :span="8">姓名: {{editForm.name_2}}</el-col>
      <el-col :span="8">电话: {{editForm.phone_2}}</el-col>
      <el-col :span="8">职位: {{editForm.position_2}}</el-col>
    </el-row>
    <div style="margin:10px 0;height: 1px;background-color: #DCDFE6;"></div>
    <div>公司地址:{{editForm.address}}</div>
    <div style="margin:10px 0;height: 1px;background-color: #DCDFE6;"></div>
    <div>
      <div style="padding:8px 0;color:#000">商机客户</div>
      <div style="padding:5px 0">上次沟通：{{editForm.last_connect_time}}</div>
      <div style="padding:5px 0">沟通情况：{{editForm.last_connect}}</div>
      <div style="padding:5px 0">商机保护：{{editForm.add_cus_users_name}}</div>
      <div style="padding:5px 0">到期时间：{{editForm.add_cus_end_time}}</div>
    </div>
    <div style="padding:8px 0;color:#000">关联状态</div>
    <div>{{editForm.link_co_name}}</div>
  </el-dialog>
</template>

 <script>
import {
  get_customer_info,
  addOredit_customer,
  get_company_list,
  add_customer_co
} from "@/utils/api/sale";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      visible: false,
      editForm: { id: "" },
      companyName: "",
      companyList: [],
      enterProps: {
        label: "name",
        value: "id",
        children: "childList"
      }
    };
  },
  computed: {
    ...mapState({
      enterprisesTypes: state => state.config.enterprisesTypes
    })
  },
  methods: {
    /**初始化数据 */
    initData(id) {
      if (id) {
        this.editForm.id = id;
        get_customer_info({ id: id }).then(res => {
          if (res.code == 200) {
            this.editForm = Object.assign({}, this.editForm, res.data);
            this.visible = true;
          } else {
            this.$message.error(res.message);
          }
        });
      } else {
        /**初始化表单 */
        this.editForm = {};
        this.visible = true;
      }
    }
  }
};
</script>

 <style>
</style>
