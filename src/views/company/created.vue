<!--
 * @Date: 2020-03-23 15:49:21
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-24 11:26:23
 * @FilePath: /cloudAdmin/src/views/company/created.vue
 -->
<template>
  <el-card class="wrapper">
    <el-page-header @back="$router.back()" title="返回企业选择"></el-page-header>
    <el-col :span="20" :offset="2">
      <div class="stepBox">
        <el-steps :active="active" align-center>
          <el-step title="企业类型"></el-step>
          <el-step title="企业信息"></el-step>
          <el-step title="认证完成"></el-step>
        </el-steps>
      </div>
      <div class="stepBox1" v-if="active==0">
        <el-form label-width="120px">
          <el-form-item label="企业类型" required>
            <el-cascader
              style="width:450px"
              :props="enterProps"
              v-model="form.enterType"
              :options="enterprisesTypes"
            ></el-cascader>

            <!-- <el-select style="width:450px" v-model="form.enterType">
              <el-option
                v-for="(item,index) in enterprisesTypes"
                :label="item.name"
                :value="item.id"
                :key="index"
              ></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="企业规模" required>
            <el-select style="width:450px" v-model="form.enterSize">
              <el-option
                v-for="(item,index) in enterprisesScales"
                :label="item.name"
                :value="item.dictNum"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业所在地" required>
            <el-input type="textarea" v-model="form.enterAddress" style="width:450px"></el-input>
          </el-form-item>
          <el-form-item label="所在行业" required>
            <el-cascader
              style="width:450px"
              :props="indusProps"
              v-model="form.tradeLevelOne"
              :options="industryList"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button @click="active--">上一步</el-button>
            <el-button @click="next">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="stepBox1" v-if="active==1">
        <el-form label-width="150px">
          <el-form-item label="企业名称" required>
            <el-input v-model="form.enterName" style="width:450px"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码" required>
            <el-input v-model="form.enterCode" style="width:450px"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人姓名" required>
            <el-input v-model="form.legalIdcardName" style="width:450px"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人证件类型" required>
            <el-select style="width:450px" v-model="form.cardType">
              <el-option
                v-for="(item,index) in cardTypeArry"
                :label="item.name"
                :value="item.dictNum"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法定代表人证件号" required>
            <el-input v-model="form.legalIdcardCode" style="width:450px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="active--">上一步</el-button>
            <el-button @click="dataFormSubmit">完成</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="stepBox1" v-if="active==2">
        <p style="text-align:center">
          <i style="color:#2EC385;font-size:100px" class="el-icon-success"></i>
        </p>
        <h3 style="text-align:center">创建完成</h3>
        <p
          style="text-align:center;margin:20px 0;"
        >企业资料已提交，工作人员会尽快完成企业资质审核，审核成功后我们会以短信的形式通知你，你也可以登录查看审核状态</p>
        <div style="text-align:center">
          <el-button style="width:150px" @click="$router.push('/storeList')" plain>完成</el-button>
        </div>
      </div>
    </el-col>
  </el-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

import {
  user_enterprise,
  public_dict_list,
  tissue_list,
  industry_list
} from "@/utils/api/login";
export default {
  data() {
    return {
      enterProps: {
        label: "name",
        value: "id",
        children: "childList"
      },
      indusProps: {
        label: "name",
        value: "industryNum",
        children: "childList"
      },
      active: 0,
      form: {
        enterType: "",
        businessLicense: "",
        idcardPositive: "",
        idcardReverse: "",
        tradeLevelTwo: ""
      }
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      userId: state => state.user.id,
      plat_source: state => state.config.plat_source,
      cardTypeArry: state => state.config.cardTypeArry,
      industryList: state => state.config.industryList,
      enterprisesScales: state => state.config.enterprisesScales,
      enterprisesTypes: state => state.config.enterprisesTypes
    })
  },
  created() {
    // tissue_list({ plat_source: this.plat_source }).then(res => {
    //   console.log(res.data);
    // });
    // industry_list({ plat_source: this.plat_source }).then(res => {
    //   console.log(res);
    // });
    // public_dict_list({
    //   plat_source: this.plat_source,
    //   dictNum: "12"
    // }).then(res => {
    //   console.log(res);
    // });
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    dataFormSubmit() {
      user_enterprise({
        plat_source: this.plat_source,
        token: this.token,
        userId: this.userId,
        enterCode: this.form.enterCode,
        enterName: this.form.enterName,
        tradeLevelOne: this.form.tradeLevelOne[0] || "",
        tradeLevelTwo: this.form.tradeLevelOne[1] || "",
        enterType: this.form.enterType,
        legalIdcardName: this.form.legalIdcardName,
        legalIdcardCode: this.form.legalIdcardCode,
        idcardReverse: this.form.idcardReverse,
        idcardPositive: this.form.idcardPositive,
        businessLicense: this.form.businessLicense,
        // legalIdcardPhone: this.form.legalIdcardPhone,
        enterSize: this.form.enterSize,
        enterAddress: this.form.enterAddress,
        cardType: this.form.cardType
      }).then(res => {
        if (res.code == 200) {
          this.active = 2;
        } else {
          this.$message.error(res.message);
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
  .stepBox1 {
    width: 600px;
    margin: 0 auto;
  }
  .stepBox {
    padding: 20px;
    display: flex;
    justify-content: center;
    .el-steps {
      width: 400px;
    }
  }
}
</style>
