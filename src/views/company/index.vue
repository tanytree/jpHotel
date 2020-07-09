<!--
 * @Date: 2020-03-23 14:32:36
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-20 17:05:27
 -->
<template>
  <el-card class="wrapper">
    <el-col :span="20" :offset="2">
      <el-form inline>
        <el-form-item>
          <el-input
            v-model="enterName"
            prefix-icon="el-icon-search"
            style="width:360px"
            placeholder="请输入企业名称或者企业号"
          >
            <template slot="append">
              <el-button @click="getEnterprise">搜索</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="text" @click="$router.push('/storeList')">我的企业列表</el-button>
        </el-form-item>
      </el-form>
      <div style="padding-bottom:20px">相关企业</div>
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
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.enterName"
                  placement="top-start"
                >
                  <span class="comName">{{item.enterName}}</span>
                </el-tooltip>
                <p style="margin:5px">
                  <!-- <span class="enterStatus" v-if="item.enterStatus==1">审核中</span>
                  <span class="enterStatus" v-if="item.enterStatus==2">审核通过</span>
                  -->
                  <span class="enterStatus" v-if="item.enterStatus==1">审核中</span>
                  <span class="enterStatus" v-if="item.enterStatus==2">已认证</span>
                  <span class="enterStatus" v-else-if="item.enterStatus==3">审核失败</span>
                  <span class="enterStatus" v-else>未认证</span>
                </p>
              </div>
            </div>
            <div>
              <!-- roleStatus 0法人认证 1已加入 2申请中 3申请加入（非员工非法人） 4认领（员工） 5申请失败 -->
              <el-button
                style="width:100%"
                type="primary"
                v-if="item.roleStatus==0"
                @click="indentClick(item)"
              >法人认证</el-button>
              <el-button style="width:100%" type="text" v-if="item.roleStatus==1">已加入</el-button>
              <el-button style="width:100%" type="text" v-if="item.roleStatus==2">申请中</el-button>
              <el-button
                style="width:100%"
                type="primary"
                @click="showJoin(item)"
                v-if="item.roleStatus==3"
              >申请加入</el-button>
              <el-button
                style="width:100%"
                type="primary"
                v-if="item.roleStatus==4"
                @click="applyPosition(item)"
              >认领</el-button>
              <el-button style="width:100%" v-if="item.roleStatus==5">申请失败</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="tips">
        没有你要加入的企业？
        <el-button type="text" @click="$router.push('/created')">立即创建</el-button>
      </div>
    </el-col>
    <el-dialog :visible.sync="JoinShow" title="加入企业">
      <el-form >
        <el-form-item label="姓名">
          <el-input type="text" v-model="joinForm.name" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input type="text" v-model="joinForm.phone" />
        </el-form-item>
         <el-form-item label="身份证号">
          <el-input type="text" v-model="joinForm.idCard" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="JoinShow = false">取消</el-button>
        <el-button size="small" type="primary" @click="applyJob()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :visible.sync="applyShow" title="详情">
      <el-checkbox-group v-model="employeesId">
        <el-checkbox v-for="(item,index) in roleArray" :key="index" :label="item.dictNum">
          {{item.name}}
          <div class="moreInfo" v-if="employeesId.includes(item.dictNum)">
            <div class="moreItem" v-for="(items,index) in item.childList" :key="index">
              {{items.name}}
              <el-radio-group v-model="items.value">
                <el-radio
                  v-for="(itemc,index) in items.childList"
                  :key="index"
                  :label="itemc.dictNum"
                >{{itemc.name}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="applyShow = false">取消</el-button>
        <el-button size="small" type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
    <indent v-if="showIndent" ref="indentEle" />
  </el-card>
</template>

<script>
import {
  enterprise_list,
  enterprise_role_claim,
  enterprise_edit_role,
  login,
  employees_edit
} from "@/utils/api/login";
import { mapState, mapActions } from "vuex";
import indent from "./indent";
import applyPosition from "./applyPosition";

export default {
  components: { indent },
  data() {
    return {
      roleStatus: "1",
      enterName: "",
      showIndent: false,
      applyShow: false,
      JoinShow: false,
      enterpriseList: [],
      employeesId: [],
      joinForm: {},
      roleArray: []
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      userId: state => state.user.id,
      user: state => state.user,
      plat_source: state => state.config.plat_source,
      roleList: state => state.config.roleList
    })
  },
  created() {
    this.roleArray = this.roleList;
    this.roleArray.forEach(item => {
      item.childList.forEach(Element => {
        this.$set(Element, "value", Element.childList[0].dictNum);
      });
    });
    this.getEnterprise();
  },
  methods: {
    ...mapActions({
      saveuser: "user/saveuser",
      companyInit: "company/companyInit"
    }),
    userIsLogin(data) {
      this.saveuser(data);
      if (data.data && data.data.belongTo.length > 0) {
        this.companyInit(data.data.belongTo[0]);
      }
    },
    getEnterprise() {
      enterprise_list({
        plat_source: this.plat_source,
        token: this.token,
        userId: this.userId,
        content: this.enterName,
        searchType: "1",
        pageIndex: "1",
        pageSize: "10"
      }).then(res => {
        if (res.code == 200) {
          this.enterpriseList = res.data;
          // roleStatus 0法人认证 1已加入 2申请中 3申请加入（非员工非法人） 4认领（员工） 5申请失败
          this.enterpriseList.forEach(item => {
            if (item.enterPriseRoleList && item.enterPriseRoleList.length > 0) {
              let macthList = item.enterPriseRoleList.filter(
                items => items.userId == this.userId
              );
              if (macthList.length > 0) {
                if (macthList[0].roleStatus == 1) {
                  //等待认领
                  this.$set(item, "roleStatus", 4);
                } else if (macthList[0].roleStatus == 2) {
                  //申请加入
                  this.$set(item, "roleStatus", 2);
                } else if (macthList[0].roleStatus == 2) {
                  //正常状态
                  this.$set(item, "roleStatus", 1);
                } else if (macthList[0].roleStatus == 4) {
                  //审核失败
                  this.$set(item, "roleStatus", 5);
                }
              } else {
                /***没有监测到匹配自己的角色 */
                if (item.userId == this.userId) {
                  this.$set(item, "roleStatus", 0);
                } else {
                  this.$set(item, "roleStatus", 3);
                }
              }
            } else {
              /**没有角色 自己的企业认领法人 */
              if (item.userId == this.userId) {
                this.$set(item, "roleStatus", 0);
              } else {
                this.$set(item, "roleStatus", 3);
              }
            }
          });

          console.log(this.enterpriseList);
        }
      });
    },

    indentClick(data) {
      this.showIndent = true;
      this.$nextTick(() => {
        this.$refs.indentEle.initData(data);
      });
    },
    showJoin(item) {
      this.joinForm = {
        enterpriseId: item.id,
        userId: this.user.id,
        phone: this.user.phoneNumber,
        name: this.user.userName,
        idCard: this.user.idCard,
        idCardType: this.user.idCardType | ""
      };
      this.JoinShow = true;
    },
    applyJob() {
      employees_edit(this.joinForm).then(res => {
        if (res.code == 200) {
          this.getEnterprise();
          this.reLogin();
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
        this.JoinShow=false;
      });
    },
    applyPosition() {
      // this.applyShow = true;
    },
    reLogin() {
      login({
        plat_source: this.plat_source,
        loginType: "2",
        account: sessionStorage.account,
        password: sessionStorage.password
      }).then(res => {
        if (res.code == 200) {
          this.userIsLogin(res);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    dataFormSubmit() {
      console.log(this.roleArray);
      let roleStatus = this.roleStatus;
      let arrList = this.roleArray.filter(item =>
        this.employeesId.includes(item.dictNum)
      );
      let roleDetailJson = [
        {
          roleEName: "one_sharehodlers",
          roleCName: "股东",
          position: "sharehodlers_position_priority",
          status: "sharehodlers_status_normal",
          type: "sharehodlers_position_priority",
          shares: "80%", // 股份
          enterpriseIds: "",
          representativeIds: "",
          term: ""
        }
      ];

      enterprise_edit_role({
        enterpriseId: "",
        roleStatus: this.roleStatus,
        roleDetailJson: JSON.stringify(roleDetailJson)
      }).then(res => {
        console.log("---");
      });
      // enterprise_role_claim({
      //   plat_source: this.plat_source,
      //   token: this.token,
      //   userId: this.userId,
      //   employeesId: "23"
      // }).then(res => {
      //   console.log(res);
      // });
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
      overflow: hidden;
      .comName {
        cursor: pointer;
        width: 100%;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
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
.moreInfo {
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0 10px;
  .moreItem {
    padding: 8px 5px;
  }
}
.tips {
  text-align: center;
  padding: 30px;
  font-size: 14px;
  color: #666;
}
.el-checkbox {
  display: block;
  .el-checkbox__input {
    vertical-align: top;
    margin-top: 4px;
  }
}
</style>
