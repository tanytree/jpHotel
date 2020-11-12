<!--
 * @Date: 2020-03-23 15:49:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-12 15:09:53
 * @FilePath: \jiudian\src\views\organization\index.vue
 -->
<template>
    <div class="organization" v-loading="loading">
        <div class="fl leftPart">
            <div class="hd">
                <h2>{{user.storesInfo.storesName}}</h2>
            </div>
            <div class="wrap">
                <div class="innerWrap">
                    <ul v-if="departmentList.length">
                        <template v-for="(item,index) of departmentList">
                            <li :key="index" @click="departClick(item)" :class="{on:activeLeftDepartMent.id==item.id}">
                                <p> {{ $i18n.locale == 'ri' ? item.japanese : (item.menuAliasTitle || item.menuTitle) }}</p>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <div class="displayPart">
            <div class="warp">
                <div class="hd">
                    <div class="hdWrap">
                        <div class="fr btns">
                            <el-button plain  @click="addItemHandle">{{$t('boss.add_addMembers')}}</el-button>
                        </div>
                        <div class="searchInfo">
                            <div class="flex">
                                <h3>
                                    <span>{{ $i18n.locale == 'ri' ? activeLeftDepartMent.japanese : (activeLeftDepartMent.menuAliasTitle || activeLeftDepartMent.menuTitle) }}
                                    </span>
                                    <span class="nums">
                                    <em class="text-red">{{employeesList.length}}</em>/{{storesUserCount}}
                                </span>
                                </h3>
                                <div>
                                    <el-input @keyup.native="employees_list(activeLeftDepartMent.id)"
                                              v-model="employeesForm.content" prefix-icon="el-icon-search"></el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="collapseWrap">
                    <!-- <collapse :employeesList="employeesList"></collapse> -->
                    <employees :employee="employeesList"
                               @getDetails="getDetails"
                               @getEmployeesDetailsEdit="getEmployeesDetailsEdit"
                               @getEmployeesDelete="getEmployeesDelete"></employees>
                </div>
                <div class="bottomPage">
                    <el-pagination class="" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="employeesForm.pageIndex" :page-sizes="[20, 50, 100, 200]"
                                   :page-size="employeesForm.pageIndex" layout=" sizes, prev, pager, next, jumper"
                                   :total="listTotal"></el-pagination>
                </div>
            </div>

        </div>
        <el-dialog top="0" :visible.sync="addChildDepartShow" :title="$t('boss.add_addSub')" width="600px">
            <el-form :model="departMentForm">
                <el-form-item :label="$t('boss.add_superior')" class="require" v-if="isAddChild">
                    <el-input style="width:200px" disabled v-model="departMentForm.fartherName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('boss.department_name')" class="require">
                    <el-input style="width:200px" v-model="departMentForm.departmentName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="addChildDepartShow = false">{{ $t('commons.cancel') }}</el-button>
            <el-button size="small" type="primary" @click="departMentAddNow" v-loading="loading">{{ $t('commons.confirm') }}</el-button>
        </span>
        </el-dialog>

        <!-- 查看资料组件 -->
        <LoginDetail ref="loginDetail"></LoginDetail>

        <el-dialog top="0" :visible.sync="departSetAndAddShow" :title="departSetAndAddTitle" width="800px">
            <el-form :model="departMentForm">
                <el-form-item :label="$t('boss.add_superior')" class="require" v-if="isAddChild">
                    <el-input style="width:200px" disabled v-model="departMentForm.fartherName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('boss.department_name')" class="require">
                    <el-input style="width:200px" v-model="departMentForm.departmentName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('boss.add_departmentIcon')" class="iconLabel" :class="{require:!isAddChild}">
                    <i class="el-icon-full-screen" @click="selectIconAndColorShow=true"></i>
                    <!-- <img
                v-if="departMentForm.departmentIcon"
                :src="iconSrc+departMentForm.departmentIcon+'_g.png'"
              /> -->
                    <img v-if="departMentForm.departmentIcon" :src="checkImgNameSrc(departMentForm.departmentIcon)"/>
                </el-form-item>
                <el-form-item :label="$t('boss.add_departmentType')" class="require" v-if="setDepartmentList.length" prop="setDepartmentType">
                    <el-checkbox-group v-model="setDepartmentType" @change="departTypeSelectChange">
                        <el-checkbox :label="item" v-for="(item,index) of setDepartmentList" :key="index" :disabled="false" style="display:inline-block">{{item.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <div class="hideMod">
                    <div class="wrap">
                        <div class="flex">
                            <template v-for="(item,index) of setDepartmentList">
                                <div class="cell" :key="index" v-show="departmentENameSelectCheck(item)">
                                    <div class="cellWrap" style="display:block;width:100%;height:100%">
                                        <el-checkbox-group v-model="selectAll"
                                                           @change="addPartmentTypeLevel2All($event,item)">
                                            <el-checkbox :label="item.eName"
                                                         style="display:block;width:100%;height:100%">
                                                <div>{{item.name}}</div>
                                                <div style="display:block">
                                                    <el-checkbox-group v-model="childSelect"
                                                                       @change="childSelectChange($event,item)">
                                                        <el-checkbox v-for="(op,i) in item.childList" :key="i"
                                                                     :label="op.eName" style="display:block"
                                                                     :checked="checkPartmentTypeLevel2selectChild(item,op)">
                                                            {{op.name}}
                                                        </el-checkbox>
                                                    </el-checkbox-group>
                                                </div>
                                            </el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="clearDepartMentForm;departSetAndAddShow = false">{{ $t('commons.cancel') }}</el-button>
            <el-button size="small" type="primary" @click="departMentAddNow" v-loading="loading">{{ $t('commons.confirm') }}</el-button>
        </span>
        </el-dialog>
        <el-dialog top="0" :visible.sync="selectIconAndColorShow" :title="$t('boss.add_selectIcon')" width="600px">
            <div class="iconAndColorDia">
                <div class="row">
                    <h3>{{$t('boss.add_icon')}}</h3>
                    <div class="pool clearfix">
                        <ul>
                            <li v-for="(item,index) of iconList" :key="index" class="iconPoolLi"
                                @click="iconSelectFn(item)" :class="{on:selectIcon==item.eName}">
                                <img :src="item.name"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <h3>{{$t('boss.add_color')}}</h3>
                    <div class="pool clearfix">
                        <ul>
                            <li class="colorPoolLi" v-for="(item,index) of colorList" :key="index"
                                :style="{backgroundColor:'#'+item.name}" @click="selectColor=item.name"
                                :class="{on:selectColor==item.name}">
                                <i class="el-icon-check"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="selectIconAndColorShow = false">{{ $t('commons.cancel') }}</el-button>
            <el-button size="small" type="primary" @click="iconAndColorChange()">{{ $t('commons.confirm') }}</el-button>
        </span>
        </el-dialog>
        <el-dialog top="0" :visible.sync="employeesDetailsShow" :title="$t('boss.report_checkingData')" width="600px">
            <el-form :model="employeesDetails" label-width="100px">
                <el-form-item :label="$t('boss.loginDetail_name')" class>
                    <el-input style="width:300px" disabled v-model="employeesDetails.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.order_moblePhone')" class>
                    <el-input style="width:300px" disabled v-model="employeesDetails.phone"></el-input>
                </el-form-item>
                <el-form-item :label="$t('boss.add_position')" class>
                    <el-input style="width:300px" disabled v-model="employeesDetails.roleCName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('boss.loginDetail_department')" class>
                    <el-input style="width:300px" disabled v-model="employeesDetails.departCName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('boss.loginDetail_workTime')" class>
                    <el-input style="width:300px" disabled v-model="employeesDetails.createTime"></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.home_note')" class>
                    <el-input type="textarea" style="width:300px" disabled></el-input>
                </el-form-item>
            </el-form>

            <!-- <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="employeesDetailsShow = false">{{ $t('commons.cancel') }}</el-button>
            <el-button size="small" type="primary" @click="iconAndColorChange()">{{ $t('commons.confirm') }}</el-button>
          </span>-->
        </el-dialog>
        <el-dialog top="0" :visible.sync="employeesDetailsEditShow"
                   :title="addAndEditForm.type=='add'?this.$t('boss.add_addMembers'): (addAndEditForm.editType == 2 ? this.$t('boss.personnel_editDepart') : this.$t('boss.add_editorEmpe'))"
                   width="600px" @close="itemClose()">
            <el-form :model="addAndEditForm" label-width="100px" size="small">
                <template v-if="addAndEditForm.type=='add'||(addAndEditForm.editType && addAndEditForm.editType==1)">
                            <el-form-item :label="$t('boss.add_peopleName')+':'" class="require">
                                <el-input style="width:300px"  v-model="addAndEditForm.userName"></el-input>
                            </el-form-item>
                        <!-- <el-col :span="14" >
                            <el-form-item label="销售人员：" class="">
                                <el-radio-group v-model="addAndEditForm.salesFlag">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="2">否</el-radio>
                                </el-radio-group>
                            </el-form-item>

                        </el-col> -->
                    <el-form-item :label="$t('boss.add_peopleAccount')+':'" class="require">
                        <el-input style="width:300px" v-model="addAndEditForm.account" :disabled="addAndEditForm.type !='add'"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('boss.add_loginPass')+':'" class="require">
                        <el-input style="width:300px" v-model="addAndEditForm.password" type="password"
                                  @input="passwordChange"></el-input>
                    </el-form-item>
                    <el-divider></el-divider>
                </template>

                <template v-if="addAndEditForm.type == 'add'||(addAndEditForm.editType == 2)">
                    <h3 style="width:100%;text-align:right;font-size:14px;text-align:left;font-weight:normal">
                        {{$t('boss.add_selectLimit')}}：<span style="color:#999">{{$t('boss.add_canLook')}}</span></h3>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{$t('boss.add_selectAll')}}
                    </el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-form-item label="" class prop="phone" label-width="20px">
                        <el-checkbox-group v-model="addAndEditForm.departmentIds" @change="handleCheckedDeptsChange">
                            <el-checkbox :label="item.id" v-for="(item,index) in departmentList" :key="index">
                                {{item.menuTitle}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </template>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="employeesDetailsEditChange()" v-loading="loading">{{ $t('boss.add_save') }}</el-button>
            <el-button size="small" @click="itemClose">{{ $t('boss.add_cancel') }}</el-button>
        </span>
        </el-dialog>
        <!-- <add-employees :employeesSetting="employeesSetting" @getInviteShow="getInviteShow" @enterprise_department_distributionFn="enterprise_department_distributionFn"></add-employees> -->
    </div>
</template>

<script>
  import employees from './components/employees'
  import LoginDetail from '@/components/employee/loginDetail'
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    components: {
      employees,
      LoginDetail
    },
    data () {
      return {
        isPersonnelManager: false,
        detailsData: {},
        details: false,
        deptOptions: [],
        checkAll: false,
        isIndeterminate: true,
        loading: false,
        listTotal: 0,
        departmentList: [],
        employeesList: [],
        departMentForm: {
          departmentLevel: 1,
          departmentId: '',
          departmentName: '',
          departmentEName: '',
          departmentCName: '',
          departmentParent: '',
          departmentJsonStr: [],
          departmentIcon: '',
          departmentColor: ''
        },
        employeesForm: {
          departmentId: '',
          searchType: 1,
          content: '',
          pageIndex: 1,
          pageSize: 20,
          paging: true
        },
        departSetAndAddTitle: '',
        departSetAndAddShow: false,
        selectIconAndColorShow: false,
        addChildDepartShow: false,
        employeesDetailsShow: false, //员工详情窗口状态
        employeesDetailsEditShow: false, //员工编辑窗口状态
        employeesDetails: '', //当前选中的员工数据
        activeDepartMent: '', //右键选项备用数据
        activeLeftDepartMent: '', //右侧视图数据
        iconList: [], //图标列表
        colorList: [], //颜色列表
        setDepartmentList: [], //部门列表数据
        setDepartmentListNum: {},
        setDepartmentType: [],
        selectIcon: '',
        selectColor: '',
        iconSrc: '',
        //无意义
        selectAll: [],
        childSelect: [],
        isAddChild: false,
        //邀请弹窗
        employeesSetting: {
          isShow: false,
          action: 'add'
        },
        addAndEditForm: {
          type: 'add',
          accountId: '',
          userName: '',
          account: '',
          password: '',
          userType: 1,
          salesFlag: 1,
          departmentIds: []
        },
        //门店下总人数
        storesUserCount: 0,
      }
    },
    computed: {
      ...mapState({
        token: state => state.user.token,
        user: state => state.user,
        userId: state => state.user.id,
      })
    },
    created () {
    },
    mounted () {
      this.department_list()
      this.fetchStoresUserCount()
      if (this.$route.name == 'employeeList') {
        this.isPersonnelManager = true
      } else {
        this.isPersonnelManager = false
      }
    },
    methods: {
      getDetails(item) {
        this.$refs.loginDetail.getDetails(item.account);
      },
      passwordChange () {
        this.addAndEditForm.passwordChange = true
      },
      //部门全选
      handleCheckAllChange (val) {
        this.addAndEditForm.departmentIds = val ? this.deptOptions : []
        this.isIndeterminate = false
      },
      handleCheckedDeptsChange (value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.deptOptions.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.deptOptions.length
      },
      checkImgNameSrc (v) {
        for (let k in this.iconList) {
          if (this.iconList[k].eName == v) {
            return this.iconList[k].name
          }
        }
        return ''
      },
      enterprise_department_distributionFn (item) {
        let params = {}
        params.token = this.token
        params.userId = this.userId
        params.employeesId = item.id
        params.departmentId = this.activeLeftDepartMent.id

        enterprise_department_distribution(params).then(async res => {
          if (res.code == 200) {
            params.roleStatus = 1
            params.roleDetailJson = item.roleDetailJson
            params.phone = item.phone
            params.name = item.name
            params.idCard = item.idCard
            params.idCardType = item.idCardType
            params.plat_source = this.plat_source
            params.enterpriseId = this.company.id
            await this.enterprise_edit_role(params)
            this.employees_list(this.activeLeftDepartMent.id)
            this.$forceUpdate()
          } else {
            this.$message.error(res.message)
          }
        })
          .catch(err => {
            this.$message.error(err.message)
          })
      },
      enterprise_edit_role (data) {
        return new Promise((resolve, reject) => {
          enterprise_edit_role(data).then(res => {
            if (res.code == 200) {
              this.$message.success(res.message)
              resolve(res)
            } else {
              this.$message.error(res.message)
              reject('err')
            }
          })
            .catch(err => {
              this.$message.error(err.message)
              reject('err')
            })
        })

      },
      inviteEmployee () {
        this.employeesSetting.action = 'add'
        this.employeesSetting.isShow = true
      },
      highRise () {
        this.$router.push('/highRise')
      },
      applyEmployees () {

        this.$router.push('/applyEmployees')

      },
      getInviteShow (v) {
        this.employeesSetting.isShow = v
      },

      getEmployeesDetails() {

      },
      getEmployeesDetailsEdit (item) {
        this.getUser_role(item.id)
        for (let k in this.addAndEditForm) {
          this.addAndEditForm[k] = item[k] ? item[k] : ''
        }

        if (item.departmentIds) {
          this.addAndEditForm.departmentIds = item.departmentIds
        } else {
          this.addAndEditForm.departmentIds = []
        }
        this.addAndEditForm.userType = 1
        this.addAndEditForm.accountId = item.id
        this.addAndEditForm.type = 'edit'
        this.addAndEditForm.salesFlag = item.salesFlag
        this.addAndEditForm.editType = item.editType
        this.employeesDetailsEditShow = true
        console.log(this.addAndEditForm)
      },
      getEmployeesDelete (item) {
        let params = {
          accountId: item.id
        }
        this.$F.doRequest(this, '/pms/workuser/delete_login_user', params, (res) => {
          this.employees_list(this.activeLeftDepartMent.id)
          this.$forceUpdate()
        })
      },
      employeesDetailsEditChange () {
        let url = ''
        if (this.addAndEditForm.type == 'add') {

          if (!this.addAndEditForm.userName) {
            this.$message.error(this.$t('boss.add_inputName'))
            return
          }
          if (!this.addAndEditForm.account) {
            this.$message.error(this.$t('boss.add_inputAccount'))
            return
          }
          if (!this.addAndEditForm.password) {
            this.$message.error(this.$t('boss.add_inputPassword'))
            return
          }
          if (!this.addAndEditForm.departmentIds.length) {
            this.$message.error(this.$t('boss.staff_selectDepartment'))
            return
          }
          url = '/pms/workuser/add_login_user'
        } else {
          if (this.addAndEditForm.editType == 1) {
            if (!this.addAndEditForm.userName) {
              this.$message.error(this.$t('boss.add_inputName'))
              return
            }
            if (!this.addAndEditForm.account) {
              this.$message.error(this.$t('boss.add_inputAccount'))
              return
            }
            if (!this.addAndEditForm.password) {
              this.$message.error(this.$t('boss.add_inputPassword'))
              return
            }
          }
          if (this.addAndEditForm.editType == 2) {
            if (!this.addAndEditForm.departmentIds.length) {
              this.$message.error(this.$t('boss.staff_selectDepartment'))
              return
            }
          }
          // this.addAndEditForm.passwordChange = false;
          url = '/pms/workuser/edit_login_user'
        }
        let params = this.$F.deepClone(this.addAndEditForm)
        params.departmentIds = params.departmentIds.toString()
        if (!params.passwordChange) {
          delete params['password']
        }
        this.addAndEditForm.passwordChange = false
        this.$F.doRequest(this, url, params, (res) => {
          this.employees_list(this.activeLeftDepartMent.id)
          this.employeesDetailsEditShow = false
          this.checkAll = false
          this.isIndeterminate = true
          this.$forceUpdate()
        })

      },

      getUser_role (id) {
        let that = this
        this.$F.doRequest(null, '/pms/freeuser/user_role', {
          userId: id
        }, (res) => {
          this.addAndEditForm.departmentIds = []
          res.menuList.forEach(item => {
            this.addAndEditForm.departmentIds.push(item.id)
          })
        })
      },
      getdepartmentIds (v) {
        console.log(v)
      },
      getDepartInfo (item) {
        this.activeDepartMent = item
        console.log(item)
      },
      departClick (item) {
        console.log(item)
        this.employeesForm.content = ''
        this.activeLeftDepartMent = item

        this.employees_list(item.id)
      },

      fetchStoresUserCount () {
        this.$F.doRequest(this, '/pms/workuser/stores_user_count', { departmentId: '3213' }, (res) => {
          this.storesUserCount = res.userCount;
          this.$forceUpdate();
        })
      },

      department_list () {
        let that = this
        let params = {
          // storesNum:'00000000',
          type: 3,
        }
        this.$F.doRequest(this, '/pms/role/menu_list', params, (res) => {
          this.deptOptions = []
          res.forEach(item => {
            this.deptOptions.push(item.id)
          })
          this.departmentList = res

          console.log(this.departmentList)
          if (res.length) {
            this.activeLeftDepartMent = this.departmentList[0]
            this.employeesForm.content = ''
            this.employees_list(res[0].id)
          }
          that.$forceUpdate()
        })
      },
      employees_list (id) {
        let that = this
        this.employeesForm.departmentId = id
          this.$F.commons.fetchSalesList(this.employeesForm, (data)=> {
              this.employeesList = data.hotelUserList
          });
      },
      department_delete () {
        let item = this.activeDepartMent
        if (item.type == 1) {
          this.$message.error(this.$t('boss.add_noCancel'))
          return
        }
        let that = this
        let params = {
          token: this.token,
          userId: this.userId,
          departmentId: item.id
        }
        department_delete(params)
          .then(res => {
            if (res.code == 200) {
              this.$message({
                message: this.$t('commons.request_success'),
                type: 'success'
              })
              this.department_list()
            } else {
              this.$message.error(res.message)
            }
          })
          .catch(err => {
            this.$message.error(err.message)
          })
      },

      itemInit() {
        this.addAndEditForm = {
          accountId: '',
          userName: '',
          account: '',
          password: '',
          userType: 1,
          departmentIds: [],
          salesFlag: 1
        }
      },

      itemClose() {
        this.employeesDetailsEditShow = false;
        this.itemInit();
      },

      addItemHandle () {
        this.checkAll = false;
        this.isIndeterminate = true;
        this.employeesDetailsEditShow = true
        this.addAndEditForm.type = 'add'
      },

      iconSelectFn (item) {
        this.iconSrc = item.name.substring(0, item.name.lastIndexOf('/') + 1)
        this.selectIcon = item.eName
      },
      iconAndColorChange () {
        this.departMentForm.departmentIcon = this.selectIcon
        this.departMentForm.departmentColor = this.selectColor
        this.selectIconAndColorShow = false
        this.selectIcon = ''
        this.selectColor = ''
      },
      departmentAddAndEditShow (type, isChild) {
        this.isAddChild = false
        this.departMentForm.plat_source = this.plat_source
        this.departMentForm.token = this.token
        this.departMentForm.operUserId = this.userId
        this.departMentForm.enterpriseId = this.company.id
        this.clearDepartMentForm()
        if (type == 'add') {
          if (isChild) {
            this.isAddChild = true
            let obj = {
              ...this.activeDepartMent
            }
            this.departSetAndAddTitle = this.$t('boss.add_addSub')
            this.departMentForm.departmentLevel = 2
            this.departMentForm.departmentParent = obj.id
            this.departMentForm.fartherName =
              this.activeDepartMent.departmentName ||
              this.activeDepartMent.departmentCName
            // this.addChildDepartShow = true;
            this.departSetAndAddShow = true
          } else {
            this.departMentForm.departmentParent = ''
            this.departMentForm.departmentLevel = 1
            this.departSetAndAddTitle = this.$t('boss.add_addPart')
            this.departSetAndAddShow = true
          }
        } else {

          let obj = {
            ...this.activeDepartMent
          }
          this.departMentForm = obj
          this.departMentForm.departmentId = obj.id

          let params = {
            token: this.token,
            userId: this.userId,
            departmentId: obj.id
          }

          department_detail(params).then(res => {
            if (res.code == 200) {
              let departmentJsonStr = []
              this.childSelect = []
              let setDepartmentListNum = {}
              for (let k in res.data.departmentMenuList) {
                let obj = {
                  departmentEName: res.data.departmentMenuList[k].departmentTypeId,
                  menuEName: res.data.departmentMenuList[k].menuEName,
                  menuCName: res.data.departmentMenuList[k].menuCName
                }
                this.childSelect.push(res.data.departmentMenuList[k].menuEName)
                departmentJsonStr.push(obj)
                if (setDepartmentListNum[obj.departmentEName]) {
                  setDepartmentListNum[obj.departmentEName] = ++setDepartmentListNum[obj.departmentEName]
                } else {
                  setDepartmentListNum[obj.departmentEName] = 1
                }

              }
              console.log(setDepartmentListNum)
              console.log(this.setDepartmentListNum)

              for (let k in setDepartmentListNum) {
                console.log(k + ':' + setDepartmentListNum[k])
                console.log(k + ':' + this.setDepartmentListNum[k])
                if (setDepartmentListNum[k] === this.setDepartmentListNum[k]) {
                  this.selectAll.push(k)
                }
              }

              this.departMentForm.departmentJsonStr = departmentJsonStr
              let arr = res.data.departmentEName.split(',')
              for (let k in this.setDepartmentList) {
                for (let i in arr) {
                  if (arr[i] == this.setDepartmentList[k].eName) {
                    this.setDepartmentType.push(this.setDepartmentList[k])
                  }
                }
              }
              console.log(this.setDepartmentType)

              this.departSetAndAddTitle = this.$t('boss.add_partSet')

              this.departSetAndAddShow = true
              this.$forceUpdate()

              //console.log(JSON.stringify(this.setDepartmentList))
            } else {
              this.$message.error(res.message)
            }
          })
            .catch(err => {
              this.$message.error(err.message)
            })

        }
      },
      departMentAddNow () {
        this.department_edit()
        this.addChildDepartShow = false
        this.departSetAndAddShow = false
      },
      department_edit () {
        let obj = JSON.parse(JSON.stringify(this.departMentForm))
        obj.departmentJsonStr = JSON.stringify(obj.departmentJsonStr)
        department_edit(obj)
          .then(res => {
            if (res.code == 200) {
              this.clearDepartMentForm()
              this.department_list()
              this.$forceUpdate()
              this.$message({
                message: this.$t('commons.request_success'),
                type: 'success'
              })
              //console.log(JSON.stringify(this.setDepartmentList))
            } else {
              this.$message.error(res.message)
            }
          })
          .catch(err => {
            this.$message.error(err.message)
          })
      },

      //清除临时数据
      clearDepartMentForm () {
        this.selectAll = []
        this.childSelect = []
        this.setDepartmentType = [];
        (this.departMentForm.departmentId = ''),
          (this.departMentForm.departmentName = ''),
          (this.departMentForm.departmentEName = ''),
          (this.departMentForm.departmentCName = ''),
          (this.departMentForm.departmentParent = ''),
          (this.departMentForm.departmentJsonStr = []),
          (this.departMentForm.departmentIcon = ''),
          (this.departMentForm.departmentColor = '')
        this.$forceUpdate()
      },
      //部门类型第一层选择
      departTypeSelectChange (e) {
        let arr = this.setDepartmentType
        let departmentEName = []
        let departmentCName = []
        for (let k in e) {
          departmentEName.push(e[k].eName)
          departmentCName.push(e[k].name)
        }
        this.departMentForm.departmentEName = departmentEName.toString()
        this.departMentForm.departmentCName = departmentCName.toString()
        console.log(this.departMentForm)
      },
      //计算部门类型的二级选项是否全选
      checkPartmentTypeLevel2selectAll (item) {
        let that = this
        let i = 0
        for (let k in this.departMentForm.departmentJsonStr) {
          if (
            this.departMentForm.departmentJsonStr[k].departmentEName == item.eName
          ) {
            i++
          }
        }
        if (i == item.childList) {
          that.selectAll.push('item.eName')
          return true
        } else {
          var newArr = []
          for (let k in that.selectAll) {
            if (that.selectAll[k] != item.eName) {
              newArr.push(item.eName)
            }
          }
          that.selectAll = newArr
          return false
        }
      },
      checkPartmentTypeLevel2selectChild (farther, item) {
        for (let k in this.departMentForm.departmentJsonStr) {
          let obj = this.departMentForm.departmentJsonStr
          if (
            obj[k].menuEName == item.eName &&
            obj[k].departmentEName == farther.eName
          ) {
            return true
          }
        }
        return false
      },
      addPartmentTypeLevel2All (e, item) {
        console.log(this.selectAll)
        if (this.selectAll.includes(item.eName)) {
          for (let k in item.childList) {
            let obj = {
              departmentEName: item.eName,
              menuEName: item.childList[k].eName,
              menuCName: item.childList[k].name
            }
            let flag = false
            for (let ii in this.departMentForm.departmentJsonStr) {
              if (
                this.departMentForm.departmentJsonStr[ii].menuEName ==
                obj.menuEName &&
                this.departMentForm.departmentJsonStr[ii].departmentEName ==
                obj.departmentEName
              ) {
                flag = true //如果已存在，就返回true,后边将不会再次添加
              }
            }
            console.log(flag)
            if (!flag) {
              this.departMentForm.departmentJsonStr.push(obj)
            }

            if (!this.childSelect.includes(item.childList[k].eName)) {
              this.childSelect.push(item.childList[k].eName)
            }
          }
        } else {
          console.log(1234)
          var newArr = []
          for (let k in this.departMentForm.departmentJsonStr) {
            if (
              this.departMentForm.departmentJsonStr[k].departmentEName !==
              item.eName
            ) {
              newArr.push(this.departMentForm.departmentJsonStr[k])
            }
          }
          var newChild = []
          for (let k in newArr) {
            newChild.push(newArr[k].menuEName)
          }
          this.childSelect = newChild
          this.departMentForm.departmentJsonStr = newArr
          // console.log(this.childSelect)
        }
        console.log(this.departMentForm.departmentJsonStr)

        this.$forceUpdate()
      },

      departmentENameSelectCheck (item) {
        if (this.departMentForm.departmentEName.indexOf(item.eName) != -1) {
          return true
        }
        return false
      },
      childSelectChange (e, item) {
        let that = this
        let arr = []
        let newDepartmentJsonStr = []
        for (let k in that.departMentForm.departmentJsonStr) {
          let thisObj = that.departMentForm.departmentJsonStr[k]
          if (item.eName !== thisObj.departmentEName) {
            console.log(item.eName)
            console.log(thisObj.departmentEName)
            newDepartmentJsonStr.push(thisObj)
          }
        }
        that.departMentForm.departmentJsonStr = newDepartmentJsonStr

        for (let k in item.childList) {
          for (let i in e) {
            if (e[i] == item.childList[k].eName) {
              arr.push(item.childList[k])
            }
          }
        }
        if (arr.length == item.childList.length) {
          this.selectAll.push(item.eName)
        } else {
          let newSelectArr = []
          for (let i in this.selectAll) {
            if (this.selectAll[i] != item.eName) {
              newSelectArr.push(this.selectAll[i])
            }
          }
          this.selectAll = newSelectArr
        }

        for (let i in arr) {
          let obj = {
            departmentEName: item.eName,
            menuEName: arr[i].eName,
            menuCName: arr[i].name
          }
          console.log(obj)
          if (
            JSON.stringify(that.departMentForm.departmentJsonStr).indexOf(
              obj.menuEName
            ) < 0
          ) {
            that.departMentForm.departmentJsonStr.push(obj)
          }
        }
        console.log(that.departMentForm.departmentJsonStr)
      },
      next () {
        if (this.active++ > 2) this.active = 0
      },

      getLoginDetails(item) {
        let params = {
          // employeeId: item.id,
          account: item.id
        }
        this.$F.doRequest(this, '/pms/employee/detail_employee', params, (res) => {
          this.detailsData = res
          this.addAndEditForm = res
          this.addAndEditForm.employeeId = res.id
          this.$forceUpdate();
        })
      },
      dataFormSubmit () {
        user_enterprise({
          plat_source: this.plat_source,
          token: this.token,
          userId: this.userId,
          enterCode: this.form.enterCode,
          enterName: this.form.enterName,
          tradeLevelOne: this.form.tradeLevelOne[0] || '',
          tradeLevelTwo: this.form.tradeLevelOne[1] || '',
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
            this.active = 2
          } else {
            this.$message.error(res.message)
          }
        })
      },
      /**每页数 */
      handleSizeChange (val) {
        this.employeesForm.pageSize = val
        this.employeesForm.page = 1
        this.employees_list(this.activeLeftDepartMent.id)
      },
      /**当前页 */
      handleCurrentChange (val) {
        this.employeesForm.pageIndex = val
        this.employees_list(this.activeLeftDepartMent.id)
      }
    }
  }
</script>

<style lang="less">
    .organization {
        position: absolute;
        top: 10px;
        right: 10px;
        bottom: 10px;
        left: 10px;
        padding: 0;
        margin: 0;

    .iconLabel {

    i {
        font-size: 40px;
        vertical-align: middle;
    }

    img {
        width: 30px;
        margin-left: 20px;
        vertical-align: middle;
    }

    }

    .iconAndColorDia {

    .pool {

    ul {

    li {
        border: 1px solid #fff;
        float: left;
        margin-right: 10px;

    &
    :last-child {
        margin: 0;
    }

    &
    .iconPoolLi {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        margin-bottom: 10px;

    &
    .on {
        border-color: rgb(14, 84, 192);
        border-radius: 2px;
        overflow: hidden;
    }

    }

    &
    .colorPoolLi {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 100%;

    i {
        display: none;
        color: #fff;
        font-weight: 700;
    }

    &
    .on {

    i {
        display: inline-block;
    }

    }
    }
    }
    }
    }
    }

    .displayPart {
        overflow: hidden;
        height: 100%;
        border-radius: 20px;
        background: #fff;
        position: relative;

    .warp {
        position: relative;
        height: 100%;

    .collapseWrap {
        position: absolute;
        top: 80px;
        bottom: 70px;
        width: 100%;
        overflow: auto;
    }

    .hd {
        height: 80px;
        border-bottom: 1px solid #eee;

    .hdWrap {
        padding: 0 20px;

    .btns {
        line-height: 80px;
        height: 100%;
    }

    .searchInfo {
        width: 40%;
        height: 100%;

    h3 {
        font-size: 18px;
        line-height: 80px;
        font-weight: normal;
        padding: 0;
        margin: 0;
        text-align: left;
        display: block;

    .nums {
        font-size: 16px;
        margin-left: 10px;

    em {
        font-style: normal;
    }

    }
    }
    }
    }
    }

    .bottomPage {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 50px;
        text-align: center
    }

    }

    }

    .leftPart {
        width: 350px;
        height: 100%;
        border-radius: 20px;
        background: #fff;
        overflow: hidden;
        position: relative;
        margin-right: 15px;

    .wrap {
        position: absolute;
        top: 81px;
        bottom: 51px;
        overflow: hidden;
        width: 100%;

    .innerWrap {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        overflow: auto;
    }

    ul {
        padding: 0 10px;
    }

    li {
        height: 50px;
        line-height: 50px;
        border-radius: 10px;

    p {
        padding: 0 10px;
    }

    &
    .on {
        background: #eee;
    }

    &
    :active {
        background: #eee;
    }

    &
    :hover {
        background: #eee;
    }

    }
    }

    .hd {
        height: 80px;
        line-height: 80px;
        border-bottom: 1px solid #eee;

    h2 {
        margin: 0 20px;
        font-size: 18px;
        color: #333;
        font-weight: normal;
    }

    }

    .ftBtn {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-top: 1px solid #eee;
    }

    }

    .require label.el-form-item__label::after {
        content: "*";
        color: red;
    }

    .hideMod .el-checkbox {
        display: block;

    .el-checkbox__input {
        vertical-align: top;
        margin-top: 4px;
    }

    }
    }
</style>
