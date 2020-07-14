<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-14 18:15:21
 * @FilePath: /jiudian/src/views/market/personnelManager/peopleman/peopleman.vue
 -->
 <template>
<div class="sec1">
    <el-form :model="form" :inline="true" class="top-body" size="small" label-width="100px">
        <el-row>

            <el-col :span="5">
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

            <el-form-item>
                <el-button @click="getDataList(searchForm)" type="primary">查询</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button type="primary">下载模板</el-button>
                <el-button type="primary">批量导入</el-button>
                <el-button type="primary" @click="adddstaff=true">添加员工</el-button>

            </el-form-item>
        </el-row>

    </el-form>
    <div>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="storesNum" label="所属门店" show-overflow-tooltip>
                <template slot-scope="scope" v-if="scope.row.storesNum">
                    {{F_storeName(scope.row.storesNum)}}
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="员工姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="inTime" label="入职时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="position" label="职位 " show-overflow-tooltip></el-table-column>
            <el-table-column prop="worknum" label="工号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="department.name" label="所在部门" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="editstaff=true">修改</el-button>
                    <el-button type="text" size="mini">详情</el-button>
                    <el-button type="text" size="mini" @click="dimission=true">办理离职</el-button>
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
        <el-dialog title="添加员工" :visible.sync="adddstaff">
            <el-form :model="form" :inline="true" :required="true" class="top-body" label-width="120px" size="small">
                <el-row>
                    <el-form-item label="所属门店:">
                        <el-select v-model="form.orderType">
                            <el-option label="当前课程" value="1"></el-option>
                            <el-option label="演出" value="3"></el-option>
                            <el-option label="场地预定" value="2"></el-option>
                            <el-option label="活动项目课程" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名:">
                            <el-input style="width:200px" placeholder="请输入姓名" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话:">
                            <el-input style="width:200px" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="证件类型:">
                            <el-select v-model="form.orderType" placeholder="请选择证件类型">
                                <el-option label="当前课程" value="1"></el-option>
                                <el-option label="演出" value="3"></el-option>
                                <el-option label="场地预定" value="2"></el-option>
                                <el-option label="活动项目课程" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="证件号:">
                            <el-input style="width:200px" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属部门:">
                            <el-select v-model="form.orderType" placeholder="请选择证件类型">
                                <el-option label="当前课程" value="1"></el-option>
                                <el-option label="演出" value="3"></el-option>
                                <el-option label="场地预定" value="2"></el-option>
                                <el-option label="活动项目课程" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="  职位:">
                            &nbsp;&nbsp;<el-input style="width:200px" placeholder="请填写职位" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="工号:">
                            <el-input style="width:200px" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="银行卡号:">
                            <el-input style="width:200px" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业邮箱:">
                            <el-input style="width:200px" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分机号:">
                            <el-input style="width:200px" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="入职时间:">
                                <el-date-picker v-model="form.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="关联后台账号:">
                            <el-input style="width:200px" placeholder="请输入正确的后台账号" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="adddstaff = false">取 消</el-button>
                <el-button type="primary">确定</el-button>
            </div>
        </el-dialog>
    </div>

    <div>
        <!-- 添加员工 -->
        <el-dialog title="编辑员工" :visible.sync="editstaff">
            <el-form :model="form" :inline="true" :required="true" class="top-body" label-width="120px" size="small">
                <el-row>
                    <el-form-item label="所属门店:">
                        <el-select v-model="form.orderType">
                            <el-option label="当前课程" value="1"></el-option>
                            <el-option label="演出" value="3"></el-option>
                            <el-option label="场地预定" value="2"></el-option>
                            <el-option label="活动项目课程" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名:">
                            <el-input style="width:200px" placeholder="请输入姓名" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话:">
                            <el-input style="width:200px" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="证件类型:">
                            <el-select v-model="form.orderType" placeholder="请选择证件类型">
                                <el-option label="当前课程" value="1"></el-option>
                                <el-option label="演出" value="3"></el-option>
                                <el-option label="场地预定" value="2"></el-option>
                                <el-option label="活动项目课程" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="证件号:">
                            <el-input style="width:200px" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属部门:">
                            <el-select v-model="form.orderType" placeholder="请选择证件类型">
                                <el-option label="当前课程" value="1"></el-option>
                                <el-option label="演出" value="3"></el-option>
                                <el-option label="场地预定" value="2"></el-option>
                                <el-option label="活动项目课程" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="  职位:">
                            &nbsp;&nbsp;<el-input style="width:200px" placeholder="请填写职位" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="工号:">
                            <el-input style="width:200px" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="银行卡号:">
                            <el-input style="width:200px" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业邮箱:">
                            <el-input style="width:200px" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分机号:">
                            <el-input style="width:200px" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="入职时间:">
                                <el-date-picker v-model="form.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="关联后台账号:">
                            <el-input style="width:200px" placeholder="请输入正确的后台账号" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editstaff = false">取 消</el-button>
                <el-button type="primary">确定</el-button>
            </div>
        </el-dialog>
    </div>

    <div>
        <!-- 办理离职 -->
        <el-dialog title="办理离职" :visible.sync="dimission" width="500px">
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
                            <el-input placeholder="请选择" v-model="itemCtrlForm.outDataUrl" style="width:220px" autocomplete="off"></el-input>
                            <el-button>选择文件</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dimission = false">关闭</el-button>
                <el-button type="primary">确定</el-button>

            </div>
        </el-dialog>
    </div>

    <div>
        <!-- 转正 -->
        <el-dialog title="转正" :visible.sync="correct" width="500px">
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

</div>
</template>

<script>
export default {
    data() {
        return {
            correct: false,
            dimission: false,
            editstaff: false,
            adddstaff: false,
            loading: false,
            pageIndex: 1,
            pageSize: 8,
            totalPage: 0,
            showTop: false,
            dataListLoading: false,
            dataListSelections: [],
            status: "",

            listTotal: 0,
            storeList: [],
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
            tableData: [{}] //表格数据
        };
    },
    created() {
        this.$F.doRequest(null, '/pms/freeuser/stores_list', {
            filterHeader: true
        }, (data) => {
            this.storeList = data;
            this.initForm();
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
        itemCtrlHandle(params) {

            this.$F.doRequest(null, '/pms/employee/oper_employee', params, (res) => {
                this.getDataList()
                this.$forceUpdate();
            })
        },
        getDetails(item) {
            let params = {
                employeeId: item.id,
                account: item.associatedAccount
            }
            this.$F.doRequest(null, '/pms/employee/detail_employee', params, (res) => {
                this.detailsData = res
                this.$forceUpdate();
            })
        },
        detailsHandle(item) {
            this.getDetails(item)
            this.details = true
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
        }

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
