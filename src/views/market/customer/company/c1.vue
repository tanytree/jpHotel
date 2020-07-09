<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-09 17:45:49
 * @FilePath: /jiudian/src/views/market/customer/company/c1.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <el-form-item label="单位名称">
                <el-input v-model="searchForm.content" class="width150"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="searchForm.enterStatus" class="width150">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否共享">
                <el-select v-model="searchForm.enterStatus" class="width150">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系人">
                <el-input v-model="searchForm.content" class="width150"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="searchForm.content" class="width150"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="销售员">
                <el-select v-model="searchForm.enterStatus" class="width150">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="挂账额度">
                <el-input v-model="searchForm.content" class="width150"></el-input>
            </el-form-item>
            <el-form-item label="已用额度">
                <el-input v-model="searchForm.content" class="width150"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getDataList">查询</el-button>
                <el-button type="primary" @click="initForm">重置</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button type="primary" @click="setCompanyFormVisible=true">+新增</el-button>
                <el-button type="primary" @click="setBatchFormVisible=true">批量设置</el-button>
            </el-form-item>
            <el-row>
                <el-form-item>
                    <el-button type="text">开卡总数：999</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="enterName" label="单位名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="所属门店" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="手机号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="价格策略" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="合同号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="挂账额度" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="已用额度" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="总消费" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="预收款余额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="销售员" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="是否共享" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="handleDetail(row)">详情</el-button>
                    <el-button type="text" size="mini">修改</el-button>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            更多<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>禁用</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top:10px"></div>
        <!--分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.page" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.page_num" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
    </el-card>
    <!-- 编辑or详情弹窗 -->
    <el-dialog title="新增单位" :visible.sync="setCompanyFormVisible" class="setCompanyForm">
        <el-form :model="addCompanyForm" label-width="100px" size="mini">
            <el-row class="row">
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="单位名称：">
                            <el-input v-model="addCompanyForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="联系人：">
                            <el-input v-model="addCompanyForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="手机号：">
                            <el-input v-model="addCompanyForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
            <el-row class="row">
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="价格策略：">
                            <el-select v-model="addCompanyForm.name">
                                <el-option label="全部" value="3">全部</el-option>
                                <el-option label="已认证" value="1">已认证</el-option>
                                <el-option label="未认证" value="2">未认证</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
            <el-row class="row">
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="计费规则：">
                            <el-select v-model="addCompanyForm.name">
                                <el-option label="全部" value="3">全部</el-option>
                                <el-option label="已认证" value="1">已认证</el-option>
                                <el-option label="未认证" value="2">未认证</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="挂帐额度：">
                            白金卡
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="" label-width="0">
                            <el-radio-group v-model="radio">
                                <el-radio :label="3">集团共享</el-radio>
                                <el-radio :label="6">停用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
            <el-divider></el-divider>
            <el-row class="row">
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="生效日期：">
                            <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="失效日期：">
                            <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="发展途径：">
                            <el-select v-model="addCompanyForm.name">
                                <el-option label="全部" value="3">全部</el-option>
                                <el-option label="已认证" value="1">已认证</el-option>
                                <el-option label="未认证" value="2">未认证</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="销售员：">
                            <el-select v-model="addCompanyForm.name">
                                <el-option label="全部" value="3">全部</el-option>
                                <el-option label="已认证" value="1">已认证</el-option>
                                <el-option label="未认证" value="2">未认证</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
            <el-divider></el-divider>
            <el-row class="row">
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="银行账号：">
                            <el-input v-model="addCompanyForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="税号：">
                            <el-input v-model="addCompanyForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="电话：">
                            <el-input v-model="addCompanyForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="合同号：">
                            <el-input v-model="addCompanyForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="邮箱：">
                            <el-input v-model="addCompanyForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="地址：">
                            <el-input v-model="addCompanyForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="12" class="col">
                        <el-form-item label="备注：">
                            <el-input type="textarea" v-model="addCompanyForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="setCompanyFormVisible=false">关闭</el-button>
            <el-button type="primary" @click="setCompanyFormVisible=false">确认</el-button>
        </div>
    </el-dialog>
    <el-dialog title="批量设置" :visible.sync="setBatchFormVisible" class="setBatchForm" width="1200px">
        <el-form :model="addCompanyForm" label-width="100px" size="mini">
            <el-row class="row">
                <el-row class="cell">
                    <el-col :span="6" class="col">
                        <el-form-item label="价格策略：">
                            <el-input v-model="addCompanyForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                        <el-form-item label="计费规则：">
                            <el-input v-model="addCompanyForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                        <el-form-item label="挂账额度：">
                            <el-input v-model="addCompanyForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                        <el-form-item label="" label-width="50px">
                            <el-radio-group v-model="radio">
                                <el-radio :label="3">一键启用</el-radio>
                                <el-radio :label="6">一键禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="6" class="col">
                        <el-form-item label="生效日期：">
                            <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                        <el-form-item label="失效日期：">
                            <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                        <el-form-item label="销售员：">
                            <el-select v-model="addCompanyForm.name">
                                <el-option label="全部" value="3">全部</el-option>
                                <el-option label="已认证" value="1">已认证</el-option>
                                <el-option label="未认证" value="2">未认证</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                        <el-form-item label="" label-width="0px">
                            <el-button type="primary">设置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
            <el-divider></el-divider>
            <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" @selection-change="handleSelectionChange" size="mini">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="enterName" label="单价名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTime" label="价格策略" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        <el-select v-model="addCompanyForm.name" size="mini">
                            <el-option label="全部" value="3">全部</el-option>
                            <el-option label="已认证" value="1">已认证</el-option>
                            <el-option label="未认证" value="2">未认证</el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="计费规则" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        <el-select v-model="addCompanyForm.name" size="mini">
                            <el-option label="全部" value="3">全部</el-option>
                            <el-option label="已认证" value="1">已认证</el-option>
                            <el-option label="未认证" value="2">未认证</el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="enterType" label="挂账额度" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        <el-input v-model="addCompanyForm.name" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="enterType" label="姓名" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        <el-input v-model="addCompanyForm.name" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="enterType" label="生效日期" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期" size="mini"></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column prop="enterType" label="发展途径" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        <el-select v-model="addCompanyForm.name" size="mini">
                            <el-option label="全部" value="3">全部</el-option>
                            <el-option label="已认证" value="1">已认证</el-option>
                            <el-option label="未认证" value="2">未认证</el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="enterType" label="销售员" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        <el-select v-model="addCompanyForm.name" size="mini">
                            <el-option label="全部" value="3">全部</el-option>
                            <el-option label="已认证" value="1">已认证</el-option>
                            <el-option label="未认证" value="2">未认证</el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{row}">
                        <el-button type="text" size="mini">启用中</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="setBatchFormVisible=false">关闭</el-button>
            <el-button type="primary" @click="setBatchFormVisible=false">确认</el-button>
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
            tableData: [{}], //表格数据
            setCompanyFormVisible: false,
            setBatchFormVisible: false,
            addCompanyForm: {
                name: ''
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
        handleDetail() {
            this.$router.push('/companydetail')
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
