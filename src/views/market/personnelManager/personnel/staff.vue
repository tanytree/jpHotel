<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-21 10:36:30
 * @FilePath: /jiudian/src/views/market/personnelManager/personnel/staff.vue
 -->
 <template>
<div class="sec1">
    <el-form :model="searchForm" :inline="true" class="top-body" size="small" label-width="100px">
        <el-row>
            <el-col :span="5">
                <el-form-item label="所属门店">
                    <el-select v-model="searchForm.storesNum">
                        <el-option label="全部" value="">全部</el-option>
                        <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="员工名称">
                    <el-input v-model="searchForm.content"></el-input>
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

    <!--表格数据 -->
    <div>
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="medium">
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
                    <el-button type="text" size="mini" @click="detailsHandle(row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页 :current-page="searchForm.page"   :page-size="searchForm.page_num"  :total="listTotal"-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.pageSize" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
    </div>
    <!-- 查看资料组件 -->
    <LoginDetail ref="loginDetail"></LoginDetail>
</div>
</template>

<script>
  import LoginDetail from '@/components/employee/loginDetail'
export default {
  components: {
    LoginDetail
  },
    data() {
        return {
            details: false,
            loading: false,
            pageIndex: 1,
            pageSize: 8,
            listTotal: 0,
            showTop: false,
            dataListLoading: false,
            dataListSelections: [],
            status: "",
            storeList: [],
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

            tableData: [{}] //表格数据
        };
    },
    filters: {


    },
    mounted() {
        this.$F.doRequest(null, '/pms/freeuser/stores_list', {
            filterHeader: true
        }, (data) => {
            this.storeList = data;
        })
        this.initForm();

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

        getDetails(item) {
            this.$refs.loginDetail.getDetails('', item.id);
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
