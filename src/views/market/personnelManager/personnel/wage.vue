<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-21 10:36:38
 * @FilePath: /jiudian/src/views/market/personnelManager/personnel/wage.vue
 -->
 <template>
<div class="sec1">
    <el-form :model="searchForm" :inline="true" class="top-body" size="small" label-width="80px">
        <el-row>
            <el-col :span="6">
                <el-form-item label="所属门店">
                    <el-select v-model="searchForm.storesNum" class="width200">
                        <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="员工名称">
                    <el-input class="width200" v-model="searchForm.content"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="工资月份">
                    <el-date-picker v-model="searchForm.payTime" type="month" value-format="yyyy-MM" placeholder="选择月" style="width:200px">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-form-item>
                <el-button @click="getDataList" type="primary">查询</el-button>

            </el-form-item>
        </el-row>

    </el-form>

    <!--表格数据 -->
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="所属门店">
            <template slot-scope="scope" >
                {{scope.row.employee.storesNum}}
            </template>
        </el-table-column>
        <el-table-column prop="employee.department.name" label="部门">
            <template slot-scope="scope">
                {{scope.row.employee.department.name}}
            </template>
        </el-table-column>
        <el-table-column label="职位">
            <template slot-scope="scope">
                {{scope.row.employee.position}}
            </template>

        </el-table-column>
        <el-table-column label="姓名">
            <template slot-scope="scope">
                {{scope.row.employee.userName}}
            </template>
        </el-table-column>
        <el-table-column label="员工状态">
            <template slot-scope="scope">
                {{scope.row.employee.userStatus | F_userStatus}}
            </template>
        </el-table-column>
        <el-table-column prop="payTime" label="工资月份">
        </el-table-column>
        <el-table-column label="基本工资">
            <el-table-column label="基础工资">
                <template slot-scope="scope">
                    {{scope.row.wage.baseWage}}
                </template>
            </el-table-column>
            <el-table-column label="社保补助">
                <template slot-scope="scope">
                    {{scope.row.wage.socialBenefits}}
                </template>
            </el-table-column>
            <el-table-column prop="otherWage" label="其他">
                <template slot-scope="scope">
                    {{scope.row.wage.otherWage}}
                </template>
            </el-table-column>
            <el-table-column prop="secretWage" label="保密工资">
                <template slot-scope="scope">
                    {{scope.row.wage.secretWage}}
                </template>
            </el-table-column>
        </el-table-column>
        <el-table-column prop="jobsWage" label="岗位工资">
            <template slot-scope="scope">
                {{scope.row.wage.jobsWage}}
            </template>
        </el-table-column>
        <el-table-column label="绩效工资">
            <template slot-scope="scope">
                {{scope.row.wage.performance}}
            </template>
        </el-table-column>
        <el-table-column label="奖金">
            <template slot-scope="scope">
                {{scope.row.wage.bonus}}
            </template>
        </el-table-column>
        <el-table-column label="补贴">
            <el-table-column label="餐补">
                <template slot-scope="scope">
                    {{scope.row.wage.mealSubsidies}}
                </template>
            </el-table-column>
            <el-table-column label="房补">
                <template slot-scope="scope">
                    {{scope.row.wage.houseSubsidies}}
                </template>
            </el-table-column>
        </el-table-column>
        <el-table-column label="出勤天数">
            <el-table-column prop="demandJobDay" label="应出勤天数">
            </el-table-column>
            <el-table-column prop="realJobDay" label="实出勤天数">
            </el-table-column>
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="{row}">
                <el-button type="text" size="mini" @click="detailsHandle(row)">员工详情</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!--分页 :current-page="searchForm.page"   :page-size="searchForm.page_num"  :total="listTotal"-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.pageSize" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
    <!-- 查看资料 -->
    <el-dialog top="0" title="查看资料" :visible.sync="details" width="500px">
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
            <el-row style="margin:10px 0">
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
function doHandleDate() {
    var myDate = new Date();
    var tYear = myDate.getFullYear();
    var tMonth = myDate.getMonth();

    var m = tMonth + 1;
    if (m.toString().length == 1) {
        m = "0" + m;
    }
    return tYear + '-' + m;
}
export default {
    data() {
        return {
            loading: false,
            details: false,
            pageIndex: 1,
            pageSize: 8,
            totalPage: 0,
            showTop: false,
            dataListLoading: false,
            dataListSelections: [],
            status: "",
            listTotal:0,
            storeList: [],
            detailsData: '',
            searchForm: {
                content: '',
                userStatus: '',
                payTime: '',
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
            tableData: [] //表格数据
        };
    },
    filters: {
        

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
                userStatus: '',
                payTime: doHandleDate(),
                paging: true,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
            };
            this.getDataList();
        },
        getDataList() {
            let that = this;
            this.$F.doRequest(null, '/pms/wage/month_wage_list', this.searchForm, (res) => {
              console.log(res)
                this.tableData = res.wageList;
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
