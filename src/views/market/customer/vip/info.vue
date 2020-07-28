<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-21 15:19:42
 * @FilePath: /jiudian/src/views/market/customer/vip/info.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card v-if="showPageType == 'main'">
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <el-form-item label="开卡门店">
                <el-select v-model="searchForm.storesNum" class="width150">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发展途径">
                <el-select v-model="searchForm.getWay" class="width150">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(label, value) in $t('frontOffice.getWay')" :label="label" :value="value" :key="value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="会员类型">
                <el-select v-model="searchForm.memberTypeId" class="width150">
                       <el-option label="全部" value=""></el-option>
                       <el-option v-for="item in smembertypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="searchForm.mobile" class="width150"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="卡号">
                <el-input v-model="searchForm.memberCard" class="width150"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="searchForm.name" class="width150"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="searchForm.state" class="width150">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(label, value) in $t('frontOffice.state')" :label="label" :value="value" :key="value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="黑名单">
                <el-select v-model="searchForm.isBlacklist" class="width150">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(label, value) in $t('frontOffice.isBlacklist')" :label="label" :value="value" :key="value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getDataList">查询</el-button>
                <el-button type="primary" @click="initForm">重置</el-button>
            </el-form-item>
            <el-row>
                <el-form-item>
                    <el-button plain>读会员卡</el-button>
                    <el-button type="primary" @click="handleAdd">新增会员</el-button>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item>
                    <el-button type="text">开卡总数：999</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="idcard" label="卡号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column label="会员类型" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_memberTypeId(row.memberTypeId)}}
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="score" label="剩余积分" show-overflow-tooltip></el-table-column>
            <el-table-column prop="state" label="状态" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{row.state | F_cardState}}
                </template>
            </el-table-column>
            <el-table-column prop="storesNum" label="开卡门店" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_storeName(row.storesNum)}}
                </template>
            </el-table-column>
            <el-table-column prop="getWay" label="发展途径" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{row.getWay==1?'线上':'线下'}}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="开卡日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isBlacklist" label="是否黑名单" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{row.isBlacklist==2?'是':'否'}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="handleDetail(row)">详情</el-button>
                    <el-button type="text" size="mini" @click="handleEdit(row)">修改</el-button>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            更多<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>收卡费</el-dropdown-item>
                            <el-dropdown-item @click.native="handelblacklist(row)" v-if="row.isBlacklist!=2">拉黑</el-dropdown-item>
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
    <el-dialog title="新增客人黑名单" :visible.sync="setBlackShow">
        <el-form :model="setBlackForm">
            <el-form-item label="拉黑备注：" class="require">
                <el-input type="textarea" v-model="setBlackForm.remark" autocomplete="off" style="width:400px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="setBlackShow = false">取 消</el-button>
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
            showPageType: 'main',   //页面显示类型
            loading: false,
            showEdit: false,
            showDetail: false,
            searchForm: {

            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [{}], //表格数据
            storeList: '',
            smembertypeList: [],
            setBlackForm: {
                remark: ''
            },
            setBlackShow: false
        };
    },

    mounted() {
        this.initForm();
        this.stores_list()
        this.$F.fetchMemberTypeList({}, (res) => {
          this.smembertypeList = res.list;
        })
    },
    methods: {
        initForm() {
            this.searchForm = {
                // storesNum: '',
                id: '',
                getWay: '',
                memberTypeId: '',
                mobile: '',
                memberCard: '',
                name: '',
                state: '',
                isBlacklist: '',
                paging: true,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.loading = true;
            this.$F.doRequest(this, '/pms/hotelmember/list', this.searchForm, (res) => {
                this.loading = false
                this.tableData = res.list;
                this.listTotal = res.page.count
            })
        },
        stores_list() {
            this.$F.doRequest(this, '/pms/freeuser/stores_list', {}, (data) => {
                this.storeList = data;
            })
        },

        handleAdd(item) {
            this.$router.push({
                name: 'customeradd'
            })
        },
        handleDetail(item) {
            this.$router.push({
                name: 'customerdetails',
                query: {
                    id: item.id
                }
            })
        },
        handleEdit(item) {
            this.$router.push({
                name: 'customeredit',
                query: {
                    id: item.id
                }
            })
        },
        handelblacklist(row) {
            this.setBlackForm.id = row.id
            this.setBlackShow = true
        },
        addblacklist() {
            if (!this.setBlackForm.remark) {
                this.$message.error('请输入备注信息');
                return
            }
            this.$F.doRequest(this, '/pms/hotelmember/addblacklist', this.setBlackForm, (data) => {
                this.setBlackShow = false
                this.getDataList()
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });
            })
        },

        F_memberTypeId(v) {
            let that = this
            for (let k in that.smembertypeList) {
                if (that.smembertypeList[k].id == v) {
                    return that.smembertypeList[k].name
                }
            }
            return ''
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
        F_nationality(v) {
            let that = this
            for (let k in that.nationalityList) {
                if (that.nationalityList[k].id == v) {
                    return this.$i18n.locale == 'ri' ? that.nationalityList[k].jName : that.nationalityList[k].cName
                }
            }
            return '未知'
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
