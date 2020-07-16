<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-08 18:05:42
 * @FilePath: /jiudian/src/views/market/customer/list2.vue
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
            <el-form-item label="客人类型">
                <el-select v-model="searchForm.enterStatus" class="width150">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="增加" value="1"></el-option>
                    <el-option label="扣除" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="黑名单">
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
            <el-form-item>
                <el-button plain>读会员卡</el-button>
            </el-form-item>
        </el-form>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="enterName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="性别" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="手机号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="证件类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="证件号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="生日" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="客人类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="会员卡卡号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="所属门店" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="累计消费" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="是否黑名单" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="操作" width="200">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="handleHistory(row)">客史</el-button>
                    <el-button type="text" size="mini" @click="handleDetail(row)">详情</el-button>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            更多<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="handleEdit(row)">修改</el-dropdown-item>
                            <el-dropdown-item @click.native="setMemberFormVisible=true">转为会员</el-dropdown-item>
                            <el-dropdown-item>拉黑</el-dropdown-item>
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
    <el-dialog top="0" title="转为会员" :visible.sync="setMemberFormVisible" class="setMemberForm">
        <el-form :model="detailForm" label-width="80px" size="mini">
            <el-row class="row">
                <el-row class="cell">
                    <el-col :span="6" class="col">
                        <el-form-item label="姓名" class="require">
                            <el-input v-model="detailForm.name" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                        <el-form-item label="电话" class="require">
                            <el-input v-model="detailForm.name" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" class="col">
                        <el-form-item label="证件类型" class="require">
                            <el-select v-model="detailForm.name" class="width100" >
                                <el-option label="全部" value="3">全部</el-option>
                                <el-option label="已认证" value="1">已认证</el-option>
                                <el-option label="未认证" value="2">未认证</el-option>
                            </el-select>
                            <el-input v-model="detailForm.name" class="width150" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="12" class="col">
                        <el-form-item label="会员卡号" class="require">
                            <el-input v-model="detailForm.name" class="width150" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" class="col">
                        <el-form-item label="会员类型" class="require">
                            <el-select v-model="detailForm.name" >
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
                        <el-form-item label="性别">
                            <el-input v-model="detailForm.name" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="生日">
                            <el-input v-model="detailForm.name" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="邮箱">
                            <el-input v-model="detailForm.name" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="国籍">
                            <el-input v-model="detailForm.name" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="地址">
                            <el-input v-model="detailForm.name" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="车牌号">
                            <el-input v-model="detailForm.name" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="爱好">
                            <el-input v-model="detailForm.name" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="所属单位">
                            <el-input v-model="detailForm.name" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="备注">
                            <el-input v-model="detailForm.name" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
            <el-divider></el-divider>
            <el-row class="row">
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="销售员">
                            <el-input v-model="detailForm.name" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="发展途径">
                            <el-select v-model="detailForm.name" >
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
                        <el-form-item label="立即发卡">
                            <el-checkbox v-model="detailForm.name"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="setMemberFormVisible=false">关闭</el-button>
            <el-button type="primary" @click="setMemberFormVisible=false">确认</el-button>
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
            setMemberFormVisible: false,
            searchForm: {
                searchType: 1,
                content: '',
                enterStatus: '',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            },
            detailForm:{
                name:''
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [{}] //表格数据
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
        handleDetail(item) {
            this.$router.push({
                'name': 'historydetail'
            })
        },
        handleHistory(item) {
            this.$router.push({
                'name': 'customerhistory'
            })
        },
        handleEdit(item){
            this.$router.push({name:'customeredit'})
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
