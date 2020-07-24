<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-21 10:36:23
 * @FilePath: /jiudian/src/views/market/personnelManager/peopleman/peopleman.vue
 -->
 <template>
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
             <el-row style="margin:10px 0" v-if="isPersonnelManager">
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
                 <el-col :span="14">{{$t('commons.idCardType')[detailsData.idcardType || '']}}</el-col>
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
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import httpRequest from "@/utils/httpRequest";
export default {
    props: ['loginInfo'],
    data() {
        return {
          details: false
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
            let that = this;
            this.$F.doRequest(null, '/pms/department/department_list', {storesNum: storesNum}, (res) => {
                this.departmentList = res;
                that.$forceUpdate();
            })
        },
        getDataList() {
            let that = this;

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
