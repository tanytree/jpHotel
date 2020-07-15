<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-15 15:56:42
 * @FilePath: /jiudian/src/views/market/personnelManager/peopleman/peopleman.vue
 -->
 <template>
<div class="sec1">
    <el-form :model="form" :inline="true" class="top-body" size="small" label-width="100px">
        <el-row>

            <el-col :span="5" v-if="isPersonnelManager">
                <el-form-item label="所属门店">
                    <el-select v-model="searchForm.storesNum" class="width150">
                        <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="员工名称">
                    <el-input class="width150" v-model="searchForm.content"></el-input>
                </el-form-item>
            </el-col>
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
        </el-row>

    </el-form>
    <div>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="medium">
            <el-table-column prop="storesNum" label="所属门店" show-overflow-tooltip>
                <template slot-scope="scope" v-if="scope.row.storesNum">
                    {{F_storeName(scope.row.storesNum)}}
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="员工姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="inTime" label="入职时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="position" label="在职状态 " show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.userStatus | F_userStatus}}
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
        <el-dialog top="0" :title="addAndEditForm.employeeId?'编辑员工':'添加员工'" :visible.sync="adddstaff">
            <el-form ref="addAndEditForm" :model="addAndEditForm" :rules="rules" :inline="true" :required="true" class="top-body" label-width="100px" size="small">
                <el-row>
                    <el-col :span="12"  v-if="isPersonnelManager">
                        <el-form-item label="所属门店:">
                            <el-select v-model="addAndEditForm.storesNum" class="width200">
                                <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属部门:">
                            <el-select v-model="addAndEditForm.departmentId" placeholder="请选择部门" class="width200">
                                <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名:">
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
                                <el-option label="身份证" :value="1"></el-option>
                                <el-option label="护照" :value="2"></el-option>
                                <el-option label="驾驶证" :value="3"></el-option>
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
                        <el-form-item label="员工状态:">
                            <el-select v-model="addAndEditForm.userStatus" placeholder="请选状态" class="width200">
                                <el-option label=正式工 :value="1" :key="1"></el-option>
                                <el-option label="实习期" :value="2" :key="2"></el-option>
                                <el-option label="试用期" :value="3" :key="3"></el-option>
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
                            <el-input v-model="addAndEditForm.associatedAccount" class="width200" placeholder="请输入正确的后台账号" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="adddstaff = false">取 消</el-button>
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
                                    <el-upload class="upload-demo" :action='action' :data="uploadData" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">
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
    <!-- 查看资料 -->
    <el-dialog top="0" title="查看详情" :visible.sync="details" width="500px">
        <el-form :model="detailsData">
            <el-row style="margin:10px 0">
                <el-col :span="8">姓名:</el-col>
                <el-col :span="14">{{detailsData.userName}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">状态:</el-col>
                <el-col :span="14">{{detailsData.userStatus | F_userStatus}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">联系电话:</el-col>
                <el-col :span="14">{{detailsData.userPhone}}</el-col>
            </el-row>
            <el-row style="margin:10px 0"  v-if="isPersonnelManager">
                <el-col :span="8">所属门店:</el-col>
                <el-col :span="14">{{F_storeName(detailsData.storesNum)}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">所属部门:</el-col>
                <el-col :span="14">{{detailsData.department?detailsData.department.name:''}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">职位:</el-col>
                <el-col :span="14">{{detailsData.position}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">银行账户:</el-col>
                <el-col :span="14">{{detailsData.bankcard}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">企业邮箱:</el-col>
                <el-col :span="14">{{detailsData.email}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">后台账号:</el-col>
                <el-col :span="14">{{detailsData.associatedAccount}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">工号:</el-col>
                <el-col :span="14">{{detailsData.worknum}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">分机号:</el-col>
                <el-col :span="14">{{detailsData.extension}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">入职时间:</el-col>
                <el-col :span="14">{{detailsData.inTime}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">证件类型:</el-col>
                <el-col :span="14">{{detailsData.idcardType | F_idcardType}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">证件号:</el-col>
                <el-col :span="14">{{detailsData.idcard}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">转正日期:</el-col>
                <el-col :span="14">{{detailsData.positiveTime}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">备注:</el-col>
                <el-col :span="14">{{detailsData.remark}}</el-col>
            </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="details = false">关闭</el-button>
        </div>
    </el-dialog>

</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import httpRequest from "@/utils/httpRequest";
export default {
    data() {
        return {
            isPersonnelManager: true,
            correct: false,
            dimission: false,
            editstaff: false,
            adddstaff: false,
            details: false,
            loading: false,
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
            detailsData: '',
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
                    message: '请选择部门',
                }, ]
            },
            tableData: [{}] //表格数据
        };
    },
    filters: {
        F_userStatus(value) {
            let enums = {
                '1': '正式工',
                '2': '实习期',
                '3': '试用期'
            }
            return value && enums[value] ? enums[value] : '其它'
        },
        F_idcardType(value) {
            let enums = {
                '1': '身份证',
                '2': '护照',
                '3': '驾驶证'
            }
            return value && enums[value] ? enums[value] : '其它'
        }

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
        this.$F.doRequest(null, '/pms/freeuser/stores_list', {
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
        department_list() {
            let that = this;

            this.$F.doRequest(null, '/pms/department/department_list', '', (res) => {
                this.departmentList = res;
                that.$forceUpdate();
            })
        },
        getDataList() {
            let that = this;

            this.$F.doRequest(null, '/pms/employee/employee_list', this.searchForm, (res) => {
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
            this.$F.doRequest(null, '/pms/employee/oper_employee', params, (res) => {
                this.getDataList()
                this.dimission = false;
                this.correct = false;
                this.$forceUpdate();
            })
        },
        addAndEditPost() {
            this.$refs.addAndEditForm.validate((valid) => {
                if (valid) {
                    this.$F.doRequest(null, '/pms/employee/edit_employee', this.addAndEditForm, (res) => {
                        this.getDataList()
                        this.adddstaff = false
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
            this.$F.doRequest(null, '/pms/employee/detail_employee', params, (res) => {
                this.detailsData = res
                this.addAndEditForm = res
                this.addAndEditForm.employeeId = res.id
                this.$forceUpdate();
            })
        },
        detailsHandle(item) {
            this.getDetails(item)
            this.details = true
        },
        editItem(item) {
            this.getDetails(item)
            setTimeout(() => {
                this.adddstaff = true
            }, 300)
        },
        addItem(){
            for(let k in this.addAndEditForm){
                this.addAndEditForm[k] = ''
            }
            this.adddstaff = true
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
