<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-03 14:26:32
 * @FilePath: /jiudian/src/components/employee/employeeManager.vue
 -->
 <template>
<div class="sec1 boss-index">
    <el-form :model="form" :inline="true" class="top-body" size="small" label-width="100px">
        <el-form-item label="所属门店" v-if="storesNum == $F.getHQCode()">
            <el-select v-model="searchForm.storesNum">
                <el-option label="全部" value="">全部</el-option>
                <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="员工名称">
            <el-input v-model="searchForm.content"></el-input>
        </el-form-item>
        <el-form-item label="入职日期">
            <el-date-picker v-model="searchForm.inStartTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
            <span style="margin:0 5px">-</span>
            <el-date-picker v-model="searchForm.inEndTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="所属部门:" v-if="!isPersonnelManager">
            <el-select v-model="searchForm.departmentId" placeholder="请选择部门" class="width200">
                <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="getDataList(searchForm)" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item style="float:right">
            <el-button type="primary">下载模板</el-button>
            <el-button type="primary">批量导入</el-button>
            <el-button type="primary" @click="addItem">添加员工</el-button>

        </el-form-item>
    </el-form>
    <div>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" tooltip-effect="dark" header-row-class-name="default" size="medium">
            <el-table-column prop="storesNum" label="所属门店" show-overflow-tooltip>
                <template slot-scope="scope" v-if="scope.row.storesNum">
                    {{F_storeName(scope.row.storesNum)}}
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="员工姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="inTime" label="入职时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="position" label="在职状态 " show-overflow-tooltip>
                <template slot-scope="scope">
                    {{$t('commons.userStatus')[scope.row.userStatus || '']}}
                </template>
            </el-table-column>
            <el-table-column prop="position" label="职位 " show-overflow-tooltip></el-table-column>
            <el-table-column prop="worknum" label="工号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="department.name" label="所在部门" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="editItem(row)">修改</el-button>
                    <el-button type="text" size="mini" @click="detailsHandle(row)">详情</el-button>
                    <el-button type="text" size="mini" @click="dimissionClick(row)">办理离职</el-button>
                    <el-button type="text" size="mini" @click="becoming(row)" v-if="row.userStatus!=1">转正</el-button>
                    <el-button type="text" size="mini" @click="deleteItem(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页 :current-page="searchForm.page"   :page-size="searchForm.page_num"  :total="listTotal"-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.pageSize" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
    </div>
    <div>
        <!-- 添加员工 -->
        <el-dialog top="0" :title="addAndEditForm.employeeId?'编辑员工':'添加员工'" :visible.sync="adddstaff" @close="addAndEditFormClose">
            <el-form ref="addAndEditForm" :model="addAndEditForm" :rules="rules" :inline="true" :required="true" class="top-body" label-width="100px" size="small">
                <el-row>
                    <el-col :span="12" v-if="isPersonnelManager" class="">
                        <el-form-item label="所属门店:" prop="storesNum" v-if="storesNum == $F.getHQCode()">
                            <el-select v-model="addAndEditForm.storesNum" class="width200" @change="changeStore($event)">
                                <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="员工状态:" prop="userStatus">
                            <el-radio-group v-model="addAndEditForm.userStatus">
                                <el-radio  v-for="(label, value) in $t('commons.userStatus')" :label="value" :key="value">{{label}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名:" class="" prop="userName">
                            <el-input class="width200" placeholder="请输入姓名" autocomplete="off" v-model="addAndEditForm.userName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话:">
                            <el-input class="width200" autocomplete="off" v-model="addAndEditForm.userPhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="证件类型:">
                            <el-select v-model="addAndEditForm.idcardType" placeholder="请选择证件类型" class="width200">
                                <el-option v-for="(label, value) in $t('commons.idCardType')" :label="label" :value="value" :key="value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="证件号:">
                            <el-input v-model="addAndEditForm.idcard" class="width200" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属部门:" class="" prop="departmentId">
                            <el-select v-model="addAndEditForm.departmentId" placeholder="请选择部门" class="width200">
                                <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职位:">
                            <el-input v-model="addAndEditForm.position" class="width200" placeholder="请填写职位" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="工号:">
                            <el-input v-model="addAndEditForm.worknum" class="width200" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="银行卡号:">
                            <el-input v-model="addAndEditForm.bankcard" class="width200" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业邮箱:">
                            <el-input v-model="addAndEditForm.email" class="width200" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分机号:">
                            <el-input v-model="addAndEditForm.extension" class="width200" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="入职时间:">
                                <el-date-picker v-model="addAndEditForm.inTime" value-format="yyyy-MM-dd" type="date" style="width:200px" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="关联后台账号:">
                            <el-select v-model="addAndEditForm.associatedAccount" filterable remote reserve-keyword placeholder="请输入正确的后台账号" :remote-method="remoteMethod" :loading="vloading">
                                <el-option v-for="item in options" :key="item.id" :label="item.userName + '-' + item.account" :value="item.account">
                                </el-option>
                            </el-select>
                            <!-- <el-input v-model="addAndEditForm.associatedAccount" class="width200" placeholder="请输入正确的后台账号" autocomplete="off"></el-input> -->
                        </el-form-item>
                    </el-col>

                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addAndEditFormClose()">取 消</el-button>
                <el-button type="primary" @click="addAndEditPost">确定</el-button>
            </div>
        </el-dialog>
    </div>

    <div>
        <!-- 办理离职 -->
        <el-dialog top="0" title="办理离职" :visible.sync="dimission" width="500px" class="dimission">
            <el-form>
                <el-row>
                    <el-col>
                        <div class="grid-content">
                            <el-form-item label="离职时间:">
                                <el-date-picker v-model="itemCtrlForm.outTime" value-format="yyyy-MM-dd" type="date" style="width:305px" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="离职原因:">
                            <el-input style="width:305px" v-model="itemCtrlForm.outReason" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="离职文件:">
                            <el-input v-model="itemCtrlForm.outDataUrl" placeholder="离职文件" :disabled="true" style="width:300px">
                                <template slot="append">
                                    <el-upload class="upload-demo"
                                               :action='action'
                                               :data="uploadData"
                                               :show-file-list="false"
                                               :on-success="handleSuccess"
                                               :before-upload="beforeUpload">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dimission = false">关闭</el-button>
                <el-button type="primary" @click="dimissionPost">确定</el-button>

            </div>
        </el-dialog>
    </div>

    <div>
        <!-- 转正 -->
        <el-dialog top="0" title="转正" :visible.sync="correct" width="500px">
            <el-form>

                <el-row>
                    <el-col>
                        <div class="grid-content">
                            <el-form-item label="转正时间:">
                                <el-date-picker v-model="itemCtrlForm.positiveTime" value-format="yyyy-MM-dd" type="date" style="width:305px" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="correct = false">关闭</el-button>
                <el-button type="primary" @click="becomingPost">确定</el-button>
            </div>
        </el-dialog>
    </div>
    <!-- 查看资料组件 -->
    <LoginDetail ref="loginDetail"></LoginDetail>

</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import httpRequest from "@/utils/httpRequest";
import LoginDetail from '@/components/employee/loginDetail'
export default {
  components: {
    LoginDetail
  },
    data() {
        return {
            isPersonnelManager: true,
            correct: false,
            dimission: false,
            editstaff: false,
            adddstaff: false,
            details: false,
            loading: false,
            vloading: false,
            pageIndex: 1,
            pageSize: 8,
            totalPage: 0,
            showTop: false,
            dataListLoading: false,
            dataListSelections: [],
            status: "",
            action: httpRequest.systemUrl("/pms/upload/upload_img"),
            uploadData: {
                imgModel: 2,
                platSource: 1005
            },
            fileList: [],
            listTotal: 0,
            storeList: [],
            departmentList: [],
            detailsData: {},
            searchForm: {
                storesNum: '',
                content: '',
                workingState: '',
                departmentId: '',
                inStartTime: '',
                inEndTime: '',
                paging: true,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
            },
            form: {
                orderType: '',
                name: '',
                startTime: '',
                endTime: ''
            },
            itemCtrlForm: {
                employeeId: '',
                operType: '',
                positiveTime: '',
                outTime: '',
                outReason: '',
                outDataUrl: ''
            },
            addAndEditForm: {
                storesNum: '',
                userStatus: '',
                userName: '',
                userPhone: '',
                idcardType: '',
                idcard: '',
                departmentId: '',
                position: '',
                worknum: '',
                bankcard: '',
                email: '',
                extension: '',
                inTime: '',
                associatedAccount: '',
                remark: '',
                employeeId: ''
            },
            rules: {
                storesNum: [{
                    required: true,
                    trigger: 'blur',
                    message: '请选择门店',
                }, ],
                userName: [{
                    required: true,
                    trigger: 'blur',
                    message: '请输入员工名称',
                }, ],
                departmentId: [{
                    required: true,
                    trigger: 'blur',
                    message: '请选择部门',
                }, ],
                userStatus: [{
                    required: true,
                    trigger: 'blur',
                    message: '请选择员工状态',
                }, ]
            },
            options: [],
            optionsSearchForm: {
                searchType: 1,
                pageIndex: 1,
                pageSize: 20,
                paging: false
            },
            tableData: [{}] //表格数据
        };
    },

    computed: {
        ...mapState({
            token: state => state.user.token,
            userId: state => state.user.id,
            storesNum: state => state.user.storesInfo.storesNum
        })
    },
    mounted() {

        if (this.$route.name == 'employeeList') {
            this.isPersonnelManager = true
        } else {
            this.isPersonnelManager = false
        }
        this.uploadData.userId = this.userId
        this.uploadData.accessToken = this.token
        this.uploadData.token = this.token
        this.uploadData.storesNum = this.storesNum
        this.$F.doRequest(this, '/pms/freeuser/stores_list', {
            filterHeader: true
        }, (data) => {
            this.storeList = data;
            this.initForm();
            this.department_list()
        })
    },
    methods: {
        initForm() {
            this.searchForm = {
                storesNum: '',
                content: '',
                workingState: '',
                departmentId: '',
                inStartTime: '',
                inEndTime: '',
                paging: true,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
            };
            this.getDataList();
        },
        department_list(storesNum = this.storesNum) {
            this.$F.doRequest(null, '/pms/department/department_list', {storesNum: storesNum}, (res) => {
            this.departmentList = res;
            this.$forceUpdate();
          })
        },
        getDataList() {
            let that = this;
            if (this.storesNum != this.$F.getHQCode())
              this.searchForm.storesNum = this.storesNum;
            this.$F.doRequest(this, '/pms/employee/employee_list', this.searchForm, (res) => {
                this.tableData = res.employeesList;
                this.listTotal = res.page.count
                that.$forceUpdate();
            })
        },
        F_storeName(v) {
            let that = this
            for (let k in that.storeList) {
                if (that.storeList[k].storesNum == v) {
                    return that.storeList[k].storesName
                }
            }
            return '未知门店'
        },
        deleteItem(item) {
            let params = {
                employeeId: item.id,
                operType: 3,
            }
            this.$confirm('请确认是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.itemCtrlHandle(params)
            }).catch(() => {

            });
        },
        becoming(item) {
            this.itemCtrlForm.employeeId = item.id
            this.itemCtrlForm.operType = 1;
            this.correct = true;
        },
        becomingPost() {
            let params = {
                employeeId: this.itemCtrlForm.employeeId,
                operType: this.itemCtrlForm.operType,
                positiveTime: this.itemCtrlForm.positiveTime
            }
            if (!this.itemCtrlForm.positiveTime) {
                this.$message.error('请选择转正日期');
                return
            }
            this.itemCtrlHandle(params)
        },
        dimissionClick(item) {
            this.itemCtrlForm.employeeId = item.id
            this.itemCtrlForm.operType = 2;
            this.dimission = true;
        },
        dimissionPost() {
            let params = {
                employeeId: this.itemCtrlForm.employeeId,
                operType: this.itemCtrlForm.operType,
                outTime: this.itemCtrlForm.outTime,
                outReason: this.itemCtrlForm.outReason,
                outDataUrl: this.itemCtrlForm.outDataUrl
            }
            if (!this.itemCtrlForm.outTime) {
                this.$message.error('请选择离职日期');
                return
            }
            if (!this.itemCtrlForm.outReason) {
                this.$message.error('请填写离职原因');
                return
            }
            if (!this.itemCtrlForm.outDataUrl) {
                this.$message.error('请上传离职文件');
                return
            }
            this.itemCtrlHandle(params)
        },
        itemCtrlHandle(params) {
            this.$F.doRequest(this, '/pms/employee/oper_employee', params, (res) => {
                this.getDataList()
                this.dimission = false;
                this.correct = false;
                this.$forceUpdate();
            })
        },

        addAndEditFormClose() {
            this.$refs['addAndEditForm'].resetFields();
            this.adddstaff = false;
        },

        addAndEditPost() {
            this.$refs.addAndEditForm.validate((valid) => {
                if (valid) {
                    this.$F.doRequest(this, '/pms/employee/edit_employee', this.addAndEditForm, (res) => {
                        this.getDataList();
                        this.addAndEditFormClose();
                        this.$forceUpdate();
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getDetails(item) {
            let params = {
                employeeId: item.id,
                account: item.associatedAccount
            }
            this.$F.doRequest(this, '/pms/employee/detail_employee', params, (res) => {
                this.detailsData = res
                this.addAndEditForm = res
                this.addAndEditForm.userStatus = this.addAndEditForm.userStatus.toString();
                this.addAndEditForm.employeeId = res.id
                this.$forceUpdate();
            })
        },
        detailsHandle(item) {
            this.$refs.loginDetail.getDetails(item.associatedAccount, item.id);
        },

        editItem(item) {
            this.getDetails(item)
            setTimeout(() => {
                this.adddstaff = true
            }, 300)
        },
        addItem() {
            for (let k in this.addAndEditForm) {
                this.addAndEditForm[k] = ''
            }
            this.addAndEditForm.userStatus = '1';
            this.addAndEditForm.storesNum = this.storesNum;
            this.adddstaff = true;
        },
        changeStore(v) {
            this.department_list(v);
            this.addAndEditForm.associatedAccount = '';
            this.addAndEditForm.departmentId = ''
            this.options = [];
            this.optionsSearchForm.storesNum = v;
        },
        remoteMethod(content) {
            if (content !== '') {
                this.optionsSearchForm.content = content;
                if (!this.optionsSearchForm.storesNum)
                    this.optionsSearchForm.storesNum = this.storesNum
                this.vloading = true;
                this.$F.doRequest(null, '/pms/workuser/login_user_list', this.optionsSearchForm, (res) => {
                    this.vloading = false;
                    this.options = res.hotelUserList;
                })
            } else {
                this.options = [];
            }
        },
        /**每页数 */
        handleSizeChange(val) {
            this.searchForm.pageSize = val;
            this.searchForm.pageIndex = 1;
            this.getDataList();
            console.log(11111)
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.pageIndex = val;
            this.getDataList();
            console.log(222)
        },
        handleSuccess(res, file) {
            this.itemCtrlForm.outDataUrl = res.data;
        },
        changeHandleSuccess(res, file) {
            this.itemCtrlForm.outDataUrl = res.data;
        },
        beforeUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 8;
            if (!isLt2M) {
                this.$message.error("上传文件大小不能超过 8MB!");
            }
            return isLt2M;
        },

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
.goodsImg {
    width: 30px;
    height: 30px;
    vertical-align: middle;
}

.top-close {
    display: flex;
    align-items: center;
    float: right;
    cursor: pointer;
    padding-right: 10px;
    padding-top: 20px;
    font-size: 14px;

    i {
        margin-left: 8px;
    }
}

.shopStatus {
    color: rgba(9, 109, 217, 1);
    font-size: 12px;
}

.top-body {
    background-color: #f2f2f2;
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(250, 250, 250, 1);
}

.components-edit {
    margin-top: 10px;

    .components-table {
        border: 1px solid #e6e6e6;
    }

    .block {
        padding: 10px 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .page-all {
            font-size: 12px;
            color: #666666;
            letter-spacing: 2px;
        }
    }
}
</style>
<style scoped>
.dimission>>>.el-upload {
    overflow: initial;
    outline: none;
}

.dimission>>>.el-upload-list {
    display: none;
}
</style>
