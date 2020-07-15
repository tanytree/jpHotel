<!--
 * @Date: 2020-03-25 09:56:49
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-25 13:12:04
 * @FilePath: /cloudAdmin/src/views/sale/saleBussnessEdit.vue
 -->

<template>
  <!--统一的编辑和新增 -->
  <el-dialog top="0" :close-on-click-modal="false" width="700px" :visible.sync="visible" title="编辑">
    <el-form ref="editForm" :model="editForm" label-width="80px">
      <el-form-item label="公司名称">
        <el-input v-model="editForm.co_name"></el-input>
      </el-form-item>
      <el-form-item label="企业类型">
        <el-select v-model="editForm.industry" style="width:100%">
          <el-option
            v-for="item in industryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <!-- <el-cascader
          style="width:450px"
          :props="enterProps"
          v-model="editForm.industry"
          :options="industryList"
        ></el-cascader>-->
        <!-- <el-input v-model="editForm.industry"></el-input> -->
      </el-form-item>
      <el-form inline>
        <el-form-item label="联系人1" label-width="80px">
          <el-input style="width:150px" v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input style="width:170px" v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input style="width:150px" v-model="editForm.position"></el-input>
        </el-form-item>
        <el-form-item label="联系人1" label-width="80px">
          <el-input style="width:150px" v-model="editForm.name_2"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input style="width:170px" v-model="editForm.phone_2"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input style="width:150px" v-model="editForm.position_2"></el-input>
        </el-form-item>
      </el-form>

      <el-form-item label="公司地址">
        <el-input v-model="editForm.address"></el-input>
      </el-form-item>
      <el-form-item v-if="editForm.link_co_name" label="关联状态">
        <el-input disabled v-model="editForm.link_co_name"></el-input>
      </el-form-item>
    </el-form>
    <div v-if="!editForm.link_co_name">
      <div style="padding:10px">
        <span style="width:80px;padding-right:10px">建立关联</span>
        <span style="font-size:12px;line-height:1.4">点击建立关联，对方同意后，以上信息会自动更新，你可以直接查看对方店铺也可以直接发起合同邀请</span>
      </div>
      <el-input style="width:400px;margin-right:10px" v-model="companyName" placeholder="请输入公司名称"></el-input>
      <el-button type="primary" @click="searchCompany">查询</el-button>
      <el-row :gutter="10" style="padding:10px">
        <el-col :span="8" style="padding:8px" v-for="(item,index) in storeList" :key="index">
          <label style="margin-right:5px">{{item.co_name}}</label>
          <el-button size="mini" @click="bindCompany(item)">关联</el-button>
        </el-col>
      </el-row>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="editFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

 <script>
import {
  get_customer_info,
  addOredit_customer,
  get_company_list,
  add_customer_co,
  get_classify_list
} from "@/utils/api/sale";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      visible: false,
      editForm: { id: "" },
      companyName: "",
      storeList: [],
      enterProps: {
        label: "name",
        value: "id",
        children: "childList"
      }
    };
  },
  computed: {
    ...mapState({
      industryList: state => state.config.industryList
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
    },
    /**新增/编辑 数据 */
    editFormSubmit() {
      addOredit_customer(this.editForm).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
            duration: 1000,
            onClose: () => {
              this.visible = false;
              this.$emit("refreshDataList");
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    /**查询公司 */
    searchCompany() {
      get_company_list({ co_name: this.companyName }).then(res => {
        if (res.code == 200) {
          this.storeList = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    /**建立关联 */
    bindCompany(data) {
      add_customer_co({
        id: this.editForm.id,
        to_co_id: data.id,
        link_co_name: data.co_name
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
            duration: 1000,
            onClose: () => {
              this.visible = false;
              this.$emit("refreshDataList");
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>

 <style>
</style>
