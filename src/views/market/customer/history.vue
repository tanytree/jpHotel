<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-06 18:19:40
 * @FilePath: /jiudian/src/views/market/customer/history.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <el-form-item label="创建门店">
                <el-select v-model="searchForm.storesNum" class="width150">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客人类型">
                <el-radio-group v-model="searchForm.guestType" class="width300">
                    <el-radio v-for="(item,key,index) of $t('commons.guestType')" :label="key" :key="index">{{item}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="黑名单">
                <el-select v-model="searchForm.isBlacklist" class="width150">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(label, value) in $t('frontOffice.isBlacklist')" :label="label" :value="value" :key="value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="searchForm.name" class="width150"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="手机号">
                <el-input v-model="searchForm.mobile" class="width150"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
                <el-select v-model="searchForm.idcardType" placeholder="请选择证件类型" class="width300">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(label, value) in $t('commons.idCardType')" :label="label" :value="value" :key="value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号">
                <el-input v-model="searchForm.idcard" class="width150"></el-input>
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
            <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sex" label="性别" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{row.sex | F_sex}}
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="idcardType" label="证件类型" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{row.idcardType | F_idcardType}}
                </template>
            </el-table-column>
            <el-table-column prop="idcard" label="证件号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="生日" show-overflow-tooltip></el-table-column>
            <el-table-column prop="guestType" label="客人类型" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_guestType(row.guestType)}}
                </template>
            </el-table-column>
            <el-table-column prop="memberCard" label="会员卡卡号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="storesNum" label="所属门店" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_storeName(row.storesNum)}}
                </template>
            </el-table-column>
            <el-table-column prop="cumulativePrice" label="累计消费" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isBlacklist" label="是否黑名单" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{row.isBlacklist==2?'是':'否'}}
                </template>
            </el-table-column>
            <el-table-column prop="" label="操作" width="200">
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
                            <el-dropdown-item @click.native="handelblacklist(row)" v-if="row.isBlacklist!= 2">拉黑</el-dropdown-item>
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
    <el-dialog top="0" title="转为会员" :visible.sync="setMemberFormVisible" class="setMemberForm" width="60%">
        <el-form :model="detailForm" label-width="80px" size="mini">
            <el-row class="row">
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="姓名" class="require">
                            <el-input v-model="detailForm.name" class="width200"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="电话" class="require">
                            <el-input v-model="detailForm.name" class="width200"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="证件类型" class="require">
                            <el-select v-model="detailForm.name" class="width200">
                                <el-option label="全部" value="3">全部</el-option>
                                <el-option label="已认证" value="1">已认证</el-option>
                                <el-option label="未认证" value="2">未认证</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="证件号" class="require">
                            <el-input v-model="detailForm.name" class="width200"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8" class="col">
                        <el-form-item label="会员卡号" class="require">
                            <el-input v-model="detailForm.name" class="width200"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="会员类型" class="require">
                            <el-select v-model="detailForm.name" class="width200">
                                <el-option label="全部" value="3">全部</el-option>
                                <el-option label="已认证" value="1">已认证</el-option>
                                <el-option label="未认证" value="2">未认证</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                   
                    
                </el-row>
            </el-row>
            <el-divider></el-divider>
            <el-row class="row">
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="性别">
                            <el-input v-model="detailForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="生日">
                            <el-input v-model="detailForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="邮箱">
                            <el-input v-model="detailForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="国籍">
                            <el-input v-model="detailForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="地址">
                            <el-input v-model="detailForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="车牌号">
                            <el-input v-model="detailForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="爱好">
                            <el-input v-model="detailForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="所属单位">
                            <el-input v-model="detailForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="备注">
                            <el-input v-model="detailForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
            <el-divider></el-divider>
            <el-row class="row">
                <el-row class="cell">
                    <el-col :span="8" class="col">
                        <el-form-item label="销售员">
                            <el-input v-model="detailForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                        <el-form-item label="发展途径">
                            <el-select v-model="detailForm.name">
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
    <el-dialog title="新增客人黑名单" :visible.sync="setBlackShow" top="0">
        <el-form :model="setBlackForm" ref="setBlackForm">
            <el-form-item label="拉黑备注：" prop="blackRemark">
                <el-input type="textarea" v-model="setBlackForm.remark" autocomplete="off" style="width:80%"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addblacklist">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import myMixin from '@/utils/filterMixin';
export default {
    mixins: [myMixin],
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
            setMemberFormVisible: false,
            searchForm: {
                mobile: '',
                idcard: '',
                name: '',
                searchType: 3,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [], //表格数据
            storeList: [],
            nationalityList: [],
            smembertypeList: '',
            salesList: '',
            hotelenterList: '',
            detailForm: {
                name: ''
            },
            setBlackForm: {
                remark: ''
            },
            setBlackShow: false,
            setBlackRules: {
                blackRemark: [{
                    required: true,
                    message: 'not emply',
                    trigger: 'change'
                }]
            }
        };
    },
    mounted() {
        this.initForm();
        this.stores_list()
    },
    methods: {
        initForm() {
            this.searchForm = {
                mobile: '',
                idcard: '',
                name: '',
                searchType: 1,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.loading = true;
            this.$F.doRequest(this, '/pms/checkin/checkin_order_list', this.searchForm, (res) => {
                this.loading = false
                this.tableData = res.roomPersonList;
                this.listTotal = res.page.count
            })
        },
        stores_list() {
            this.$F.doRequest(this, '/pms/freeuser/stores_list', {}, (data) => {
                this.storeList = data;
            })
        },
        handelblacklist(row) {
            this.setBlackForm.id = row.id
            this.setBlackShow = true
        },
        addblacklist() {
            if (!this.setBlackForm.remark) {
                this.$message.error('请输入备注信息');
                return;
            }
            this.$F.doRequest(this, '/pms/hotelmember/addblacklist', this.setBlackForm, (data) => {
                this.setBlackShow = false
                this.getDataList()
                this.$message({
                    message: 'success',
                    type: 'success'
                });
            })
        },
        smembertype_list() {
            this.$F.fetchMemberTypeList({}, (res) => {
                this.smembertypeList = res.list;
            })
        },
        login_user_list() {
            let params = {
                searchType: 1,
                paging: false,
                salesFlag: 1,
                content: '',
                departmentId: '',
                pageIndex: 1,
                pageSize: 10
            }
            this.$F.doRequest(null, '/pms/workuser/login_user_list', params, (data) => {
                this.salesList = data.hotelUserList;
            })
        },
        hotelenter_list() {
            let params = {
                id: '',
                enterName: '',
                state: 1,
                shareFlag: '',
                contactName: '',
                contactPhone: '',
                salesId: '',
                startCreditLimit: '',
                endCreditLimit: '',
                paging: false,
                salesFlag: 1,
                pageIndex: 1,
                pageSize: 10
            }
            this.$F.doRequest(null, '/pms/hotelenter/list', params, (data) => {
                this.hotelenterList = data.list
            })
        },
        nationality() {
            this.$F.fetchNationality((res) => {
                this.nationalityList = res;
            })
        },
        handleDetail(item) {
            this.$router.push({
                'name': 'historydetail'
            })
        },
        handleHistory(item) {
            this.$router.push({
                'name': 'customerhistory',query:{'idcard':item.idcard}
            })
        },
        handleEdit(item) {
            this.$router.push({
                name: 'customeredit'
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
        /**多选 */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /**每页数 */
        handleSizeChange(val) {
            this.searchForm.pageSize = val;
            this.searchForm.pageIndex = 1;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.pageIndex = val;
            this.getDataList();
        }
    }
};
</script>
<style lang="less" scoped>
.el-select {
    display: inline-block;
}
</style>