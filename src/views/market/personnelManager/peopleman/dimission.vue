<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-14 17:24:17
 * @FilePath: /jiudian/src/views/market/personnelManager/peopleman/dimission.vue
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
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="details=true">详情</el-button>
                    <el-button type="text" size="mini">重新入职</el-button>
                    <el-button type="text" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页 :current-page="searchForm.page"   :page-size="searchForm.page_num"  :total="listTotal"-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.pageSize" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>

    </div>
    <!-- 查看资料 -->
    <div>
        <el-dialog title="查看资料" :visible.sync="details" width="500px">
            <el-from>
                <el-row style="margin:10px 0">
                    <el-col :span="8">姓名:</el-col>
                    <el-col :span="14">张三</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">联系电话:</el-col>
                    <el-col :span="14">111111</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">所属门店:</el-col>
                    <el-col :span="14">大仓集团第一酒店</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">所属部门:</el-col>
                    <el-col :span="14">总办</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">职位:</el-col>
                    <el-col :span="14">总经理</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">银行账户:</el-col>
                    <el-col :span="14">999999999999</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">企业邮箱:</el-col>
                    <el-col :span="14">111@qq.com</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">后台账号:</el-col>
                    <el-col :span="14">8888888888</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">工号:</el-col>
                    <el-col :span="14">0933</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">分机号:</el-col>
                    <el-col :span="14">77777</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">入职时间:</el-col>
                    <el-col :span="14">3019-7-1</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">证件类型:</el-col>
                    <el-col :span="14">护照</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">证件号:</el-col>
                    <el-col :span="14">8888</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">转正日期:</el-col>
                    <el-col :span="14">大仓集团第一酒店</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">备注:</el-col>
                    <el-col :span="14">暂无</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">离职时间:</el-col>
                    <el-col :span="14">22222</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">离职原因:</el-col>
                    <el-col :span="14">暂无</el-col>
                </el-row>
                <el-row style="margin:10px 0">
                    <el-col :span="8">离职文件:</el-col>
                    <el-col :span="14">
                        <el-button>预览 </el-button>
                    </el-col>
                </el-row>
            </el-from>

            <div slot="footer" class="dialog-footer">
                <el-button @click="details = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>

</div>
</template>

<script>
// import {
//   get_goods_list,
//   edit_goods_status,
//   del_goods_info
// } from "@/utils/api/market";
export default {
    data() {
        return {
            details: false,
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
                workingState: 1,
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
                workingState: 1,
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
//  .el-dialog__header {
//     background: red;
// }

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
