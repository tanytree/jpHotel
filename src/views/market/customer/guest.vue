<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-09 14:29:22
 * @FilePath: /jiudian/src/views/market/customer/list3.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <el-form-item label="创建门店">
                <el-select v-model="searchForm.enterStatus" class="width150">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="宾客籍贯">
                <el-select v-model="searchForm.enterStatus" class="width150">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="增加" value="1"></el-option>
                    <el-option label="扣除" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="签证种类">
                <el-select v-model="searchForm.enterStatus" class="width150">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="searchForm.content" class="width150"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="手机号">
                <el-input v-model="searchForm.content" class="width150"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
                <el-select v-model="searchForm.enterStatus" class="width150">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号">
                <el-input v-model="searchForm.content" class="width150"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getDataList">查询</el-button>
                <el-button type="primary" @click="initForm">重置</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button type="primary" @click="setForeignFormVisible=true">登记外宾</el-button>
            </el-form-item>
        </el-form>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="enterName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="性别" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="手机号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="宾客籍贯" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="证件类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="证件号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="签证种类" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="登记门店" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="登记时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="累计消费" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="现入住状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="操作" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <el-button type="text" size="mini">客史</el-button>
                    <el-button type="text" size="mini">详情</el-button>
                    <el-button type="text" size="mini">修改</el-button>
                    
                </template>

            </el-table-column>
        </el-table>
        <div style="margin-top:10px"></div>
        <!--分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.page" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.page_num" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
    </el-card>
    <!-- 编辑or详情弹窗 -->
    <el-dialog title="登记外宾" :visible.sync="setForeignFormVisible" class="setForeignForm" width="1200px">
        <el-form :model="foreignForm" label-width="80px" size="mini">
            <el-row class="row">
                <el-row class="cell">
                    <el-col :span="6" class="col">
                        <el-form-item label="外宾姓名" class="require">
                            <el-input v-model="foreignForm.name" class="width150" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                        <el-form-item label="性别" class="require">
                            <el-input v-model="foreignForm.name" class="width150" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                        <el-form-item label="证件类型" class="require">
                            <el-select v-model="foreignForm.name" class="width150" >
                                <el-option label="全部" value="3">全部</el-option>
                                <el-option label="已认证" value="1">已认证</el-option>
                                <el-option label="未认证" value="2">未认证</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                        <el-form-item label="证件类型" class="require">
                            <el-input v-model="foreignForm.name" class="width150" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="6" class="col">
                        <el-form-item label="签证种类" class="require">
                            <el-select v-model="foreignForm.name" class="width150" >
                                <el-option label="全部" value="3">全部</el-option>
                                <el-option label="已认证" value="1">已认证</el-option>
                                <el-option label="未认证" value="2">未认证</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                        <el-form-item label="有效时间" class="require">
                            <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                        <el-form-item label="宾客国籍" class="require">
                            <el-select v-model="foreignForm.name" class="width150" >
                                <el-option label="全部" value="3">全部</el-option>
                                <el-option label="已认证" value="1">已认证</el-option>
                                <el-option label="未认证" value="2">未认证</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                        <el-form-item label="手机号码" class="require">
                            <el-input v-model="foreignForm.name" class="width150" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="24" class="col">
                        <el-form-item label="手机号码" class="require">
                            <el-input type="textarea" v-model="foreignForm.name" style="display:block;width:100%" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="setForeignFormVisible=false">关闭</el-button>
            <el-button type="primary" @click="setForeignFormVisible=false">确认</el-button>
        </div>
    </el-dialog>
    </div>
</template>
<script>
import {
    mapState,
    mapActions
} from "vuex";
export default {
    computed: {
        ...mapState({
            token: state => state.user.token,
            userId: state => state.user.userId,
            msgKey: state => state.config.msgKey,
            plat_source: state => state.config.plat_source
        })
    },
    data() {
        return {
            loading: false,
            showEdit: false,
            showDetail: false,
            searchForm: {
                searchType: 1,
                content: '',
                enterStatus: '',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [], //表格数据
            setForeignFormVisible:false,
            foreignForm:{
                name:''
            }
        };
    },

    mounted() {
        // this.initForm();
    },
    methods: {
        initForm() {
            this.searchForm = {
                searchType: 1,
                content: '',
                enterStatus: '',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.searchForm.token = this.token
            this.searchForm.plat_source = this.plat_source
            this.searchForm.userId = this.userId
            console.log(JSON.stringify(this.searchForm))
            this.loading = true;
            enterprise_list(this.searchForm).then(res => {
                this.loading = false
                if (res.code == 200) {
                    this.tableData = res.data;
                    this.listTotal = res.data.total;
                }
            });
        },
        /**编辑 */
        editRowItem(row) {
            // 加载组件
            this.showEdit = true;
            //   组件加载完成调用组件内initdata 方法
            this.$nextTick(() => {
                //   可能没有详情接口的直接传row显示
                this.refs.editRef.initdata(row.id);
            });
        },

        handelRowItem(row) {
            // 加载组件
            this.showDetail = true;
            //   组件加载完成调用组件内initdata 方法
            this.$nextTick(() => {
                //   可能没有详情接口的直接传row显示
                this.refs.detailRef.initdata(row.id);
            });
        },

        /**多选 */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /**每页数 */
        handleSizeChange(val) {
            this.searchForm.page_num = val;
            this.searchForm.page = 1;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.page = val;
            this.getDataList();
        }
    }
};
</script>
