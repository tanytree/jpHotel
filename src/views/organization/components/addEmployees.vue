<!--
 * @Date: 2020-03-23 14:32:36
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-09 11:07:19
 * @FilePath: /jiudian/src/views/organization/components/addEmployees.vue
 -->
<template>
  <div>
    <el-dialog :visible.sync="chooseRoleShow" :title="employeesSettingTit" class="chooseRole">
      <div class="hdTip">
        <p>风险提示：以下角色信息请务必保证准确性，否则将可能承担法律责任，还请务必认真对待，务必核对清楚再进行提交操作</p>
      </div>
      <div class="diaWrap">
        <el-checkbox-group v-model="selectRole">
          <el-checkbox
            v-for="(item,index) in roleArray"
            :key="index"
            :label="item.eName"
            :disabled="compareRoleCanCheck(item)"
          >
            {{item.name}}
            <div class="moreInfo" v-if="selectRole.includes(item.eName)">
              <div class="row" :key="index" v-if="item.eName=='one_sharehodlers'">
                <div class="contentWrap">
                  <div class="wrap">
                    <el-form ref="form" :model="form" label-width="80px">
                      <br />
                      <el-form-item label="所占股份" class="require">
                        <el-input
                          style="width:200px"
                          type="number"
                          v-model="shares"
                          @change="chooseRoleInputChange($event,index)"
                        ></el-input>
                      </el-form-item>
                      <el-form-item
                        :label="innerItem.name"
                        class="require"
                        v-for="innerItem in item.childList"
                        :key="innerItem.dictNum"
                      >
                        <el-radio-group
                          v-model="innerItem.check"
                          @change="chooseRoleRadioChange($event,index,innerItem,item)"
                        >
                          <el-radio
                            :label="op"
                            v-for="op in innerItem.childList"
                            :key="op.dictNum"
                          >{{op.name}}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div class="hideMod" v-if="false">
                        <el-form-item label="选择企业" class="require">
                          <el-button
                            type="primary"
                            size="mini"
                            @click="selectEnterpriseShow = true"
                          >去选择</el-button>
                          <span
                            v-if="enterpriseIds.enterName"
                            class="padding-10 margin-lr-20 bg-eee"
                          >{{enterpriseIds.enterName}}</span>
                        </el-form-item>
                        <el-form-item label="代表人">
                          <el-button
                            type="primary"
                            plain
                            size="mini"
                            :disabled="!enterpriseIds"
                            @click="selectRepresentativeShow=true"
                          >去选择</el-button>
                          <span
                            class="padding-10 margin-lr-20 bg-eee"
                            v-if="representative"
                          >{{representative.name}}</span>
                        </el-form-item>
                      </div>
                      <div class="padding-10"></div>
                    </el-form>
                  </div>
                </div>
              </div>
              <div class="row" :key="index" v-else-if="item.eName=='one_director'">
                <div class="contentWrap">
                  <div class="wrap">
                    <el-form label-width="80px">
                      <el-form-item
                        :label="innerItem.name"
                        class="require"
                        v-for="innerItem in item.childList"
                        :key="innerItem.dictNum"
                      >
                        <el-radio-group
                          v-model="innerItem.check"
                          @change="chooseRoleRadioChange($event,index,innerItem,item)"
                        >
                          <el-radio
                            :label="op"
                            v-for="op in innerItem.childList"
                            :key="op.dictNum"
                            :disabled="compareDirectorCanCheck(op)"
                          >{{op.name}}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="任期">
                        <el-col :span="16">
                          <el-date-picker
                            v-model="term"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="chooseRoleDateChange($event,index)"
                          ></el-date-picker>
                        </el-col>
                      </el-form-item>
                      <div class="padding-10"></div>
                    </el-form>
                  </div>
                </div>
              </div>
              <div class="row" :key="index" v-else>
                <template>
                  <div class="contentWrap">
                    <div class="wrap">
                      <el-form label-width="80px">
                        <el-form-item
                          :label="innerItem.name"
                          class="require"
                          v-for="innerItem in item.childList"
                          :key="innerItem.dictNum"
                        >
                          <el-radio-group
                            v-model="innerItem.check"
                            @change="chooseRoleRadioChange($event,index,innerItem,item)"
                          >
                            <el-radio
                              :label="op"
                              v-for="op in innerItem.childList"
                              :key="op.dictNum"
                            >{{op.name}}</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </el-checkbox>
        </el-checkbox-group>

        <div class="employeesInfo" v-if="employeesSetting.action=='add'||employeesSetting.action=='distribute'">
          <h3 style="width:100px;text-align:right">身份信息填写</h3>

          <el-form label-width="100px" size="mini" :model="employeeInfo">
            <el-form-item label="真实姓名" class="require">
              <el-input style="width:300px" v-model="employeeInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="证件类型" class="require">
              <el-select  v-model="employeeInfo.idCardType" placeholder="请选择" style="width:300px">
                            <el-option
                v-for="(item,index) in cardTypeArry"
                :label="item.name"
                :value="item.dictNum"
                :key="index"
              ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码" class="require">
              <el-input type="input" style="width:300px" v-model="employeeInfo.idCard"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" class="require">
              <el-input type="input" style="width:300px" v-model="employeeInfo.phone"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="chooseRoleShow = false">取消</el-button>
        <el-button size="small" type="primary" @click="dataFormSubmit('join')">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="selectEnterpriseShow"
      title="选择企业"
      width="600px"
      class="claimRoleList"
    >
      <div class="hdTip">
        <p>提示：您是法定代表人，进入公司管理页面前需要添加自己的角色，请你务必核对清楚再添加，避免出现错误。如果你填写有误，你可以进入后在组织架构修改自己的角色。</p>
      </div>
      <el-form>
        <el-radio-group v-model="enterpriseIds">
          <template v-for="(item,index) in enterpriseList">
            <div class="padding-tb-20 bg-eee" :key="index" style="width:300px;margin-top:15px">
              <el-radio :key="index" :label="item">{{item.enterName}}</el-radio>
            </div>
          </template>
        </el-radio-group>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="selectEnterpriseShow = false">取消</el-button>
        <el-button size="small" type="primary" @click="chooseRoleEntChange()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="selectRepresentativeShow"
      title="选择代表人"
      width="600px"
      class="claimRoleList"
    >
      <!-- <div class="hdTip">
        <p>提示：您是法定代表人，进入公司管理页面前需要添加自己的角色，请你务必核对清楚再添加，避免出现错误。如果你填写有误，你可以进入后在组织架构修改自己的角色。</p>
      </div>-->
      <el-form>
        <el-radio-group v-model="representative">
          <template v-for="(item,index) in representativeList">
            <div class="padding-tb-20 bg-eee" :key="index" style="width:300px;margin-top:15px">
              <el-radio :key="index" :label="item">{{item.name}}</el-radio>
            </div>
          </template>
        </el-radio-group>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="selectRepresentativeShow = false">取消</el-button>
        <el-button size="small" type="primary" @click="chooseRoleRepChange()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import {
//   enterprise_list,
//   enterprise_role_claim,
//   enterprise_edit_role,
//   login,
//   employees_edit,
//   public_dict_list,
//   employees_list
// } from "@/utils/api/login";
import { mapState, mapActions } from "vuex";

export default {
  props: ["employeesSetting","employee"],
  data() {
    return {
      roleStatus: "1",
      enterName: "",
      joinRoleListShow: false,
      claimRoleListShow: false,
      showIndent: false,
      applyShow: false,
      JoinShow: false,
      chooseRoleShow: false,
      selectEnterpriseShow: false,
      selectRepresentativeShow: false,
      joinPlayRole: [],
      claimPlayRole: [],
      enterpriseList: [],
      employeesId: [],
      myEmployeesId: "",
      claimEmployeesId: [],
      joinForm: {
        roleStatus: 2,
        roleDetailJson: []
      },
      term: "",
      shares: "",
      enterpriseIds: "",
      representative: "",
      representativeList: [], //申请加入里的选择企业后的员工列表
      hideMod: false,
      selectRole: [],
      roleArray: [],
      systemRole: "",
      form: {},
      employeesSettingTit:'',
      employeeInfo:{
        idCardType:'',
        idCard:'',
        phone:'',
        name:''
      }
    };
  },
  watch: {
    employeesSetting: {
      handler: function(val, oldval) {
        console.log(11111)
        this.chooseRoleShow = this.employeesSetting.isShow;
        if(this.employeesSetting.action == 'add'){
          this.employeesSettingTit = '邀请成员'
        }if(this.employeesSetting.action == 'distribute'){
          this.employeesSettingTit = '分配成员'
        }
      },
      deep: true //对象内部的属性监听，也叫深度监听
    },
    employee:{
      handler: function(val, oldval) {
        this.employeeInfo = this.employee
      },
      deep: true //对象内部的属性监听，也叫深度监听
    },
    chooseRoleShow(v) {
      this.$emit("getInviteShow", v);
    }
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      userId: state => state.user.id,
      user: state => state.user,
      plat_source: state => state.config.plat_source,
      roleList: state => state.config.roleList,
      cardTypeArry: state => state.config.cardTypeArry,
      company: state => state.company
    })
  },
  created() {
    this.roleArray = this.roleList;
    this.roleArray.forEach(item => {
      item.childList.forEach(Element => {
        this.$set(Element, "value", Element.childList[0].dictNum);
      });
    });
    // this.getEnterprise();
    // this.publicDictList();
  },
  mounted() {
    console.log(this.roleList);
  },
  methods: {
    ...mapActions({
      saveuser: "user/saveuser",
      companyInit: "company/companyInit"
    }),
    compareRoleCanCheck(item) {
      if (item.eName == "one_supervisors") {
        if (
          this.selectRole.includes("one_sharehodlers") ||
          this.selectRole.includes("one_director") ||
          this.selectRole.includes("one_manager") ||
          this.selectRole.includes("one_financial")
        ) {
          return true;
        }
      }
      if (
        item.eName == "one_sharehodlers" ||
        item.eName == "one_director" ||
        item.eName == "one_manager" ||
        item.eName == "one_financial"
      ) {
        if (this.selectRole.includes("one_supervisors")) {
          return true;
        }
      }
      if (item.eName == "one_financial") {
        if (
          JSON.stringify(this.joinForm).indexOf(
            "director_position_executive"
          ) != -1 ||
          JSON.stringify(this.joinForm).indexOf("director_position_chairman") !=
            -1
        ) {
          if (this.selectRole.includes("one_financial")) {
            let i = this.selectRole.findIndex(item => item === "one_financial");
            this.selectRole.splice(i, 1);
            this.$forceUpdate();
          }
          return true;
        }
      }
      return false;
    },
    compareDirectorCanCheck(item) {
      if (
        item.eName == "director_position_executive" ||
        item.eName == "director_position_chairman"
      ) {
        if (this.selectRole.includes("one_financial")) {
          return true;
        }
      }
      if (
        item.eName == "director_position_executive" ||
        item.eName == "director_position_chairman"
      ) {
        if (
          JSON.stringify(this.joinForm).indexOf(
            "financial_position_director"
          ) != -1 ||
          JSON.stringify(this.joinForm).indexOf("financial_position_head") != -1
        ) {
          return true;
        }
      }
      return false;
    },
    checkChooseRoleShow(item) {
      for (let i in this.joinPlayRole) {
        if (this.joinPlayRole[i] == item.eName) {
          return true;
        }
      }
      return false;
    },
    joinRoleListChange(e) {
      console.log(this.joinPlayRole);
    },
    claimRoleListChange(e) {
      console.log(this.claimEmployeesId);
    },
    joinRoleListConfirm() {
      this.joinRoleListShow = false;
      this.chooseRoleShow = true;
    },
    publicDictList() {
      public_dict_list({
        plat_source: this.plat_source,
        dictNum: "12"
      })
        .then(res => {
          if (res.code == 200) {
            this.systemRole = res.data;
          } else {
            this.$message.error(res.message);
          }
          console.log(res);
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },

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
    async showJoin(item) {
      this.myEmployeesId = "";
      this.joinForm = {
        roleStatus: 2,
        roleDetailJson: [],
        enterpriseId: item.id,
        userId: this.user.id,
        phone: this.user.phoneNumber,
        name: this.user.userName,
        idCard: this.user.idCard,
        idCardType: this.user.idCardType | ""
      };

      // this.JoinShow = true
      await this.employees_listFn(item.id);

      if (this.myEmployeesId) {
        this.chooseRoleShow = true;
      } else {
        this.JoinShow = true;
      }
    },
    applyJob() {
      console.log(this.joinForm);
      employees_edit(this.joinForm).then(res => {
        if (res.code == 200) {
          this.getEnterprise();
          this.reLogin();
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
        this.JoinShow = false;
      });
    },
    dataFormSubmit(type) {
      let roleStatus = this.roleStatus;
      let arrList = this.roleArray.filter(item =>
        this.employeesId.includes(item.dictNum)
      );
      // this.joinForm.employeesId = this.myEmployeesId;
      
      if (type == "join") {
        
        let params = JSON.stringify(this.joinForm);
        params = JSON.parse(params);
        let json = [];
        for (let k in params.roleDetailJson) {
          if (
            params.roleDetailJson[k] &&
            this.selectRole.includes(params.roleDetailJson[k].roleEName)
          ) {
            json.push(params.roleDetailJson[k]);
          }
        }
        params.roleDetailJson = JSON.stringify(json);
        params = Object.assign(params,this.employeeInfo)
        params.token = this.token;
        params.userId = this.userId;
        params.enterpriseId = this.company.id;
        employees_edit(params)
          .then(async res => {
            if (res.code == 200) {
              this.chooseRoleShow = !this.chooseRoleShow;
              this.$message.success(res.message);
              // params.employeesId = res.data.employeesId
              // params.enterpriseId = res.data.enterpriseId
              // params.roleStatus = 1
              // await this.enterprise_edit_role(params)
              let resData =res.data;
              resData.roleDetailJson = params.roleDetailJson;
              resData.phone = params.phone;
              resData.name = params.name;
              resData.idCard = params.idCard;
              resData.idCardType = params.idCardType;


              this.$emit('enterprise_department_distributionFn',resData)
            } else {
              this.$message.error(res.message);
            }
            console.log("---");
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      } else {
        let [...claimEmployeesId] = this.claimEmployeesId;
        enterprise_role_claim({
          plat_source: this.plat_source,
          token: this.token,
          userId: this.userId,
          employeesId: this.myEmployeesId
        })
          .then(res => {
            if (res.code == 200) {
              this.getEnterprise();
              this.reLogin();
              this.$message.success(res.message);
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      }
    },
    enterprise_edit_role(data){
       return new Promise((resolve, reject) => {
      enterprise_edit_role(data).then(res => {
            if (res.code == 200) {
              this.$message.success(res.message);
              resolve(res)
            } else {
              this.$message.error(res.message);
              reject('err')
            }
          })
          .catch(err => {
            this.$message.error(err.message);
            reject('err')
          });
       })

    },
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    chooseRoleRadioChange(e, index, innerItem, item) {
      console.log(index);
      if (this.joinForm.roleDetailJson[index]) {
      } else {
        let obj = {};
        this.joinForm.roleDetailJson[index] = obj;
      }
      this.joinForm.roleDetailJson[index]["roleEName"] = item.eName;
      this.joinForm.roleDetailJson[index]["roleCName"] = item.name;

      if (innerItem.eName.indexOf("_position") != -1) {
        this.joinForm.roleDetailJson[index]["position"] = e.eName;
      }
      if (innerItem.eName.indexOf("_status") != -1) {
        this.joinForm.roleDetailJson[index]["status"] = e.eName;
      }
      if (innerItem.eName.indexOf("_type") != -1) {
        this.joinForm.roleDetailJson[index]["type"] = e.eName;
        if (e.eName == "sharehodlers_type_enterprise") {
          this.hideMod = true;
        } else {
          this.hideMod = false;
          this.enterpriseIds = "";
          this.representative = "";
          this.joinForm.roleDetailJson[index]["enterpriseIds"] = "";
          this.joinForm.roleDetailJson[index]["representativeIds"] = "";
        }
      }
      this.$forceUpdate();
      console.log(this.joinForm);
    },
    chooseRoleInputChange(e, index) {
      if (this.joinForm.roleDetailJson[index]) {
      } else {
        let obj = {};
        this.joinForm.roleDetailJson[index] = obj;
      }
      console.log(e);
      this.joinForm.roleDetailJson[index]["shares"] = e;
    },
    chooseRoleDateChange(e, index) {
      if (this.joinForm.roleDetailJson[index]) {
      } else {
        let obj = {};
        this.joinForm.roleDetailJson[index] = obj;
      }
      this.joinForm.roleDetailJson[index]["term"] = e.toString();
    },
    //选择企业
    chooseRoleEntChange(e) {
      if (this.joinForm.roleDetailJson[1]) {
      } else {
        let obj = {};
        this.joinForm.roleDetailJson[1] = obj;
      }
      this.joinForm.roleDetailJson[1]["enterpriseIds"] = this.enterpriseIds.id;
      this.selectEnterpriseShow = !this.selectEnterpriseShow;

      console.log(this.enterpriseIds);
      this.representativeFn(this.enterpriseIds.id);
      
    },

    chooseRoleRepChange() {
      if (this.joinForm.roleDetailJson[1]) {
      } else {
        let obj = {};
        this.joinForm.roleDetailJson[1] = obj;
      }
      this.joinForm.roleDetailJson[1][
        "representativeIds"
      ] = this.representative.id;
      this.selectRepresentativeShow = !this.selectRepresentativeShow;
    },

    //员工列表
    employees_listFn(id) {
      let that = this;
      let params = {
        plat_source: this.plat_source,
        token: this.token,
        userId: this.userId,
        content: this.enterName,
        departmentId: "",
        enterpriseId: id,
        searchType: "1",
        pageIndex: "1",
        pageSize: "999"
      };

      return new Promise((resolve, reject) => {
        employees_list(params)
          .then(res => {
            if (res.code == 200) {
              for (let i in res.data) {
                if (that.userId == res.data[i].userId) {
                  that.myEmployeesId = res.data[i].id;
                }
              }
              resolve(res);
            } else {
              this.$message.error(res.message);
              reject(res);
            }
          })
          .catch(err => {
            this.$message.error(err.message);
            reject(err);
          });
      });
    },
    representativeFn(id) {
      let that = this;
      let params = {
        plat_source: this.plat_source,
        token: this.token,
        userId: this.userId,
        content: this.enterName,
        departmentId: "",
        enterpriseId: id,
        searchType: "1",
        pageIndex: "1",
        pageSize: "20"
      };
      employees_list(params)
        .then(res => {
          if (res.code == 200) {
            this.representativeList = res.data;
            this.representative = "";
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    }
  }
};
</script>

<style lang="less">
.chooseRole {
  .contentWrap {
    margin-top: 10px;
  }

  .hideMod {
    background: #fff;
    margin: 0 20px 20px;
  }
}

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

.chooseRole .el-checkbox {
  display: block;

  .el-checkbox__input {
    vertical-align: top;
    margin-top: 4px;
  }
}
</style>
<style scoped>
.chooseRole .contentWrap .wrap >>> .require label.el-form-item__label::after {
  content: "*";
  color: red;
}

.chooseRole .contentWrap .el-form-item {
  margin-bottom: 10px;
}

.chooseRole .diaWrap >>> .el-checkbox__label {
  width: 100%;
}

.hdTip {
  background: rgb(241, 199, 199);
  color: rgb(205, 66, 66);
  padding: 8px 10px;
  margin-bottom: 10px;
  margin-top: -20px;
}
.employeesInfo {
  border-top: 1px solid #eee;
  margin-top: 20px;
}
</style>
