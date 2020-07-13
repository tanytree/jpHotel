<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-13 10:08:21
 * @FilePath: /jiudian/src/views/Boss/StoreManagement/list.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
        <!-- 查询部分 -->
        <el-form inline size="small">
            <el-row class="clearfix">
                <el-form-item style="float:right">
                    <el-button type="primary" @click="addItem">创建门店</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="storesName" label="门店名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="门店经理" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="门店地址" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="editItem(row)">修改</el-button>
                    <el-button type="text" size="mini" @click="deleteItem(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top:10px"></div>
        <!--分页 -->
        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.page" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.page_num" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination> -->
    </el-card>
    <!-- 编辑or详情弹窗 -->
    <el-dialog :title="addUserForm.type=='add'?'添加门店':'修改门店'" :visible.sync="setUserFormVisible" class="setUserForm" width="600px">
        <el-form :model="addUserForm" label-width="100px" size="mini">
            <el-row class="row">
                <el-row class="cell">
                    <el-col :span="18" class="col">
                        <el-form-item label="门店名称：" class="require">
                            <el-input v-model="addUserForm.storesName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="18" class="col">
                        <el-form-item label="门店经理：" class="require">
                            <el-input v-model="addUserForm.userName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="18" class="col">
                        <el-form-item label="登录账号：" class="require">
                            <el-input v-model="addUserForm.account"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="18" class="col">
                        <el-form-item label="登录密码：" class="require">
                            <el-input v-model="addUserForm.password"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="cell">
                    <el-col :span="18" class="col">
                        <el-form-item label="门店地址：" class="">
                            <el-input type="textarea" v-model="addUserForm.storesAddress"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="setUserFormVisible=false">关闭</el-button>
            <el-button type="primary" @click="submitItem">确认</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import {
    stores_list,
    freeuserlogin,
    edit_stores_user,
    delete_stores_user
} from "@/utils/api/boss";
export default {
    computed: {
        ...mapState({
            token: state => state.user.token,
            userId: state => state.user.id,
            msgKey: state => state.config.msgKey,
            plat_source: state => state.config.plat_source
        })
    },
    data() {
        return {
            loading: false,
            setUserFormVisible: false,
            searchForm: {
                filterHeader: false
            },
            addUserForm: {
                type: 'add', //区分是添加还是编辑
                userName: '',
                account: '',
                password: '',
                storesNum: '0000000000',
                storesName: '',
                storesAddress: '',
                departmentIds: ''
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [{}] //表格数据
        };
    },

    mounted() {
        this.initForm();
    },
    methods: {
        initForm() {
            this.searchForm = {
                filterHeader: false
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.searchForm.filterHeader = false;
            console.log(JSON.stringify(this.searchForm))
            this.loading = true;

            this.$F.doRequest(null, '/pms/freeuser/stores_list', this.searchForm, (res) => {
                console.log(res)
                this.loading = false;
                this.tableData = res;
            })

        },
        /**添加项目 */
        submitItem() {
            console.log(this.addUserForm)
            if (this.addUserForm.type == 'add') {
                this.addUserForm.userType = 3
                this.$F.doRequest(null, '/pms/freeuser/login', this.addUserForm, (res) => {
                    this.setUserFormVisible = false
                    this.initForm()
                })
            } else {
                this.$F.doRequest(null, '/pms/workuser/edit_stores_user', this.addUserForm, (res) => {
                    this.setUserFormVisible = false
                    this.initForm()
                })
            }
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
        /**新增 */
        addItem(row) {
            // 加载组件
            this.addUserForm = {
                type: 'add', //区分是添加还是编辑
                userName: '',
                account: '',
                password: '',
                storesNum: '0000000000',
                storesName: '',
                storesAddress: '',
                departmentIds: ''
            }
            this.addUserForm.type = 'add'
            this.setUserFormVisible = true;
            //   组件加载完成调用组件内initdata 方法

        },
        /**新增 */
        editItem(row) {
            for (let k in this.addUserForm) {
                console.log(k)
                this.addUserForm[k] = row[k] ? row[k] : ''
            }
            // 加载组件
            this.addUserForm.type = 'edit'
            this.setUserFormVisible = true;
            //   组件加载完成调用组件内initdata 方法

        },
        deleteNow(id) {
            this.$F.doRequest(null, '/pms/workuser/delete_stores_user', {
                'accountId': id
            }, (res) => {
                this.loading = false
                this.initForm()
            })
        },
        deleteItem(row) {
            this.$confirm('请确认删除此用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                this.deleteNow(row.accountId)
                // this.$message({
                //   type: 'success',
                //   message: '删除成功!'
                // });
            }).catch(() => {
                // this.$message({
                //   type: 'info',
                //   message: '已取消删除'
                // });          
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
