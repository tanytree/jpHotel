/*
* @Author: Dana 管理部
* @Date: 2020-05-24 13:45:16
* @Last Modified by: Dana
* @Last Modified time: 2020-05-24 16:59:58
*/
<template>
  <div>
    <div class="yun-edit">
      <el-form :model="form" class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="请输入管理员名称" v-model="userNameFilter" class="input-with-select" style="width: 300px">
            <el-button slot="append" @click="queryUserList()">查询</el-button>
          </el-input>
          <el-button size="medium" class="add-others" @click="handleUser(null, 'add', '添加子管理')">添加子管理</el-button>
        </el-form-item>
        <el-button size="small" class="del-selected" @click="userDelete(delSelected, 2)" :disabled="delSelected.length == 0 || user.userType != 1">删除选中</el-button>
        <label class="had-selected">已选<span>({{delSelected.length}})</span></label>
      </el-form>

      <div class="components-edit">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          size="small"
          v-loading="dataListLoading"
          height="100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" :selectable='authDeleteAble'></el-table-column>
          <el-table-column prop="name" width="120"  label="管理员名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="userName" width="120"  label="管理员账号" show-overflow-tooltip></el-table-column>
          <el-table-column label="登录密码" width="120"  show-overflow-tooltip>******</el-table-column>
          <el-table-column label="管理等级" width="120" >
            <template slot-scope="scope">
              <span v-if="scope.row.userType == 1">主管理</span>
              <span v-else>子管理</span>
            </template>
          </el-table-column>

          <el-table-column label="管理范围"  show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.userAuthDesc">{{scope.row.userAuthDesc}}</span>
              <span v-else>全部</span>
            </template>
          </el-table-column>
          <!--          <el-table-column label="管理状态">-->
          <!--            <template slot-scope="{scope}">-->
          <!--              <span v-if="scope.row.status==1 || scope.row.status == null">启用</span>-->
          <!--              <span v-else>禁用</span>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button v-if="user.userType == 1 || (user.userType != 1 && user.userId == scope.row.userId)" type="text" size="mini" @click="handleUser(scope.row, 'edit', '编辑')">编辑</el-button>
              <el-button v-if="user.userType == 1 || (user.userType != 1 && user.userId == scope.row.userId)" type="text" size="mini" @click="handleUser(scope.row, 'show', '查看')">查看</el-button>
              <!--              v-if="scope.row.userType == 1"-->
              <el-button type="text" size="mini" @click="assertDialogShow(scope.row, scope.$index)" v-if="user.userType == 1">权限设置</el-button>
              <el-button v-if="user.userType == 1 && scope.row.userType != 1" type="text" size="mini" @click="userDelete(scope.row, 1)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
        <div class="block">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 50]" :page-size="pageSize" :total="totalPage" layout="total, prev, pager, next, jumper"></el-pagination>
        </div>
      </div>

      <el-dialog :title="title" :visible.sync="userManagerVisible" @close="userManagerClose('userManagerForm')">
        <el-form ref="userManagerForm" :model="userManagerForm" :rules="rules" label-width="120px">
          <el-form-item required label="管理名称" prop="name">
            <el-input v-model.trim="userManagerForm.name" :class="action == 'show' ? 'show' : ''" :readonly="action == 'show'"></el-input>
          </el-form-item>
          <el-form-item required label="登录账号" prop="userName">
            <el-input minlength="8" maxlength="16" v-model.trim="userManagerForm.userName" :class="action == 'show' ? 'show' : ''" :readonly="action == 'show' || action == 'edit'" @keyup.native="toTrim('userName')"></el-input>
          </el-form-item>
          <el-form-item required label="登录密码" prop="userPwd">
            <el-input minlength="8" maxlength="16" v-model.trim="userManagerForm.userPwd" :class="action == 'show' ? 'show' : ''" :readonly="action == 'show'"  @keyup.native="toTrim('userPwd')"></el-input>
          </el-form-item>
          <el-form-item v-if="action == 'show'" label="操作权限">
            <el-input v-model="userManagerForm.userAuthDesc" :class="action == 'show' ? 'show' : ''" :readonly="action == 'show'"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="action != 'show'" @click="userManagerClose">取消</el-button>
          <el-button type="primary" v-if="action != 'show'" @click="userManagerSubmit('userManagerForm')">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="权限设置" :visible.sync="assertVis" @close="assertClose">
        <div v-for="(permissionTop, topIndex) in routerMap" :key="topIndex">
          <el-checkbox v-model="permissionTop.checked" @change="handleTopCheckAllChange(permissionTop)">{{permissionTop.name}}</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="permissionTop.routerArray" @change="handleCheckedRoutersChange(permissionTop)">
            <el-checkbox v-for="permissionSon in permissionTop.children"
                         :label="permissionSon.id" :key="permissionSon.id" :value="permissionSon.id">{{permissionSon.name}}
            </el-checkbox>
          </el-checkbox-group>
          <div style="margin: 20px 0;"></div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="assertSave">保存</el-button>
          <el-button @click="assertClose">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import merge from 'lodash/merge'

    export default {
        computed: {
            ...mapState({
                user: state => state.user,
                routermsg: state => state.routermsg.routermsg,
            })
        },
        data () {
            return {
                // 分页要素
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,

                selectedIndex: '',
                selectedRecord: {}, //当前选中的操作记录
                accessRouterArray: [],
                routerMap: [],
                assertVis: false,
                delSelected: [],
                title: '',  //dialog title
                action: '', //查看/添加子管理/编辑
                userNameFilter: '',
                userManagerForm: {
                    name: '',
                    userName: '',
                    password: ''
                },
                userManagerVisible: false,
                form: {
                    keywords: ''
                },
                tableData: [],
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false,
                checkAll: false,
                checkedRouters: [],
                cities: [],
                rules: {
                    name: [
                        { required: true, message: '请输入管理名称', trigger: 'change' }
                    ],
                    userName: [
                        { required: true, message: '请输入登录账号', trigger: 'change' },
                        { validator: (rule, value, callback)=> {
                            if (! (value && value.length >= 8 && value.length <= 16)) {
                                callback(new Error('登录账号长度限制8-16位'));
                            } else
                                callback()
                        }, trigger: 'blur' }
                    ],
                    userPwd: [
                        { required: true, message: '请输入登录密码', trigger: 'change' },
                        { validator: (rule, value, callback)=> {
                            if (!(value && value.length >= 8 && value.length <= 16)) {
                                callback(new Error('登录密码长度限制8-16位'));
                            } else
                                callback()
                        }, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'change' },
                        { validator: (rule, value, callback)=> {
                            if (! (value && value.length >= 8 && value.length <= 16)) {
                                callback(new Error('登录密码长度限制8-16位'));
                            } else
                                callback()
                        }, trigger: 'blur' }
                    ]
                }
            }
        },
        created () {
            var a = this
            this.routermsg.forEach(item => {
                item.routerArray = []
                a.accessRouterArray.push(item.id)
                a.accessRouterArray.push(item.name)
                if (item.children.length > 0) {
                    const array = []
                    item.children.forEach(cTemp => {
                        array.push(cTemp.id)
                        a.accessRouterArray.push(cTemp.id)
                        a.accessRouterArray.push(cTemp.name)
                    })
                    item.childrenRouter = array
                }
            })
            this.routerMap = this.$F.deepClone(this.routermsg)
            this.fetchUserList()
            // 绑定enter事件
            this.enterKeyup()
            // this.$forceUpdate();
        },
        methods: {
            toTrim(key) {
                this.userManagerForm[key] = this.userManagerForm[key].replace(/[\W]_.!@/g,"");
            },

            queryUserList () {
                this.pageIndex = 1;
                this.pageSize = 10;
                this.fetchUserList();
            },
            /*过滤主管理不能选中删除*/
            authDeleteAble (row, rowIndex) {
                return row.userType != 1 && this.user.userType == 1
            },
            assertClose () {
                this.assertVis = false
            },
            assertDialogShow (params, index) {
                this.selectedRecord = params
                this.selectedIndex = index
                this.assertVis = true
                const authArray = params.userAuth ? params.userAuth.split(',') : []
                this.routermsg.forEach(item => {
                    item.routerArray = []
                    item.checked = false
                    if (authArray.indexOf(item.id) != -1) {
                        item.checked = true
                        if (item.children.length > 0) {
                            item.children.forEach(temp => {
                                if (authArray.indexOf(temp.id) != -1) {
                                    item.routerArray.push(temp.id)
                                }
                            })
                        }
                    }
                })
                this.routerMap = this.$F.deepClone(this.routermsg)
                this.$forceUpdate()
            },
            /*权限设置提交保存*/
            assertSave () {
                var assertArray = []
                this.routerMap.forEach(item => {
                    if (item.routerArray && item.routerArray.length > 0) {
                        assertArray = assertArray.concat([item.id]).concat(item.routerArray)
                    }
                })
                this.assertClose()
                this.$F.doRequest(this, '/edt/workuseradmin/edt_user_auth', { userId: this.selectedRecord.userId, userAuth: assertArray.join(',') }, (data) => {
                    this.selectedRecord.userAuth = assertArray.join(',')
                    this.selectedRecord.userAuthDesc = this.getUserAuthDesc(this.selectedRecord.userAuth)
                    this.tableData[this.selectedIndex] = this.selectedRecord
                    this.$set(this.tableData, this.selectedIndex, this.selectedRecord)
                    this.$message.success({
                        message: '权限设置成功',
                        duration: 1300
                    })
                })
            },

            getUserAuthDesc (userAuth, callback) {
                if (userAuth == null) {
                    return '全部'
                }
                const a = this, descArray = []
                userAuth.split(',').forEach(item => {
                    let index = a.accessRouterArray.indexOf(item)
                    descArray.push(a.accessRouterArray[index + 1])
                })
                // if (callback)
                //   callback(descArray.join(','))
                return descArray.join(',')
            },

            handleTopCheckAllChange (object) {
                if (object.checked) {
                    object.routerArray = object.childrenRouter
                } else {
                    object.routerArray = []
                }
            },
            handleCheckedRoutersChange (object) {
                object.checked = (object.routerArray.length > 0)
                this.$forceUpdate()
            },
            // handleCheckAllChange(val) {
            //   this.checkedRouters = val ? this.accessRouterArray : [];
            // },
            /*选中子管理删除*/
            handleSelectionChange (val) {
                this.delSelected = val
            },
            userDelete (params, deleteType) {
                const userIdArray = [], userDesc = []
                if (Array.isArray(params)) {
                    params.forEach(item => {
                        userDesc.push(item.name)
                        userIdArray.push(item.userId)
                    })
                    params = { userId: userIdArray.join(','), name: userDesc.join(',') }
                }
                this.$confirm('确定删除子管理【 ' + params.name + '】?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$F.doRequest(this, '/edt/workuseradmin/edt_user_delete', { userId: params.userId, deleteType: deleteType }, (data) => {
                        this.$message.success({
                            message: '删除子管理【 ' + params.name + '】成功',
                            duration: 1300,
                            onClose: (data) => {
                                this.pageIndex = 1;
                                this.fetchUserList()
                            }
                        })
                    })
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消删除' })
                })
            },

            /*处理dialog操作*/
            handleUser (row, action, title) {
                this.title = title
                this.action = action
                if (action != 'add') {
                    this.$F.doRequest(this, '/edt/workuseradmin/edt_user_detail', { userId: row.userId }, (data) => {
                        this.userManagerForm = data
                        this.userManagerForm.userAuthDesc = this.getUserAuthDesc(this.userManagerForm.userAuth)
                        this.userManagerVisible = true
                    })
                } else {
                    this.userManagerVisible = true
                }
            },

            /*添加子管理相关操作*/
            userManagerSubmit (formName) {
                this.$refs['userManagerForm'].validate((valid) => {
                    debugger
                    if (valid) {
                        this.userManagerForm.password = this.userManagerForm.userPwd
                        // delete this.userManagerForm['userPwd']
                        if (this.action == 'edit') {
                            this.$F.doRequest(this, '/edt/workuseradmin/edt_admin_update', this.userManagerForm, (data) => {
                                this.userManagerClose()
                                this.$message.success({
                                    message: '更新用户成功',
                                    duration: 1200,
                                    onClose: (data) => {
                                        // this.fetchUserList();
                                    }
                                })
                            })
                        } else {
                            this.$F.doRequest(this, '/edt/workuseradmin/edt_admin_save', this.userManagerForm, (data) => {
                                this.userManagerClose()
                                this.$message.success({
                                    message: '新增子管理成功',
                                    duration: 1200,
                                    onClose: (data) => {
                                        this.fetchUserList()
                                    }
                                })
                            })
                        }
                    }
                })
            },

            userManagerClose () {
                this.userManagerVisible = false
                this.userManagerForm = {}
                this.$refs['userManagerForm'].resetFields()
            },

            enterKeyup () {
                document.addEventListener('keyup', (event) => {
                    const code = event.keyCode
                        ? event.keyCode
                        : event.which
                            ? event.which
                            : event.charCode
                    if (code == 13) {
                        this.fetchUserList()
                    }
                })
            },

            fetchUserList () {
                const params = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }
                if (this.userNameFilter) {
                    merge(params, { contents: this.userNameFilter })
                }
                this.$F.doRequest(this, '/edt/workuseradmin/edt_user_list', params, (data) => {
                    this.totalPage = data.totalSize
                    this.tableData = data.userList
                    this.tableData.forEach(item => {
                        item.userAuthDesc = this.getUserAuthDesc(item.userAuth)
                    })
                })
            },

            // 每页数
            handleSizeChange (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.fetchUserList()
            },
            // 当前页
            handleCurrentChange (val) {
                this.pageSize = 10
                this.pageIndex = val
                this.fetchUserList()
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .yun-edit {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;

    .demo-form-inline {
      padding: 20px 20px 10px;

      .add-others {
        border: 1px solid #4D92FF;
        color: #4D92FF;
        border-radius: 6px;
      }
    }
    .components-edit {
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      flex: 1;

      .block {
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .show .el-input__inner {
    border-width: 0 !important;
  }


</style>
