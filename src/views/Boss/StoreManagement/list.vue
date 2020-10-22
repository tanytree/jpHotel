<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-16 14:59:17
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
                        <el-button type="primary" @click="addItem">{{ $t('boss.store_createStore') }}</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
            <!--表格数据 -->
            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="tableData"
                :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
                size="medium"
            >
                <el-table-column
                    prop="storesName"
                    :label="$t('boss.store_storeName')"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="userName"
                    :label="$t('boss.store_storeManagers')"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="storesAddress"
                    :label="$t('boss.store_address')"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column :label="$t('commons.operating')" width="220">
                    <template slot-scope="{row}">
                        <el-button type="text" size="mini" @click="editItem(row)">{{ $t('commons.modify') }}</el-button>
                        <el-button type="text" size="mini" @click="deleteItem(row)">{{ $t('commons.delete') }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top:10px"></div>
            <!--分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchForm.pageIndex"
                :page-sizes="[10, 50, 100, 200]"
                :page-size="searchForm.pageIndex"
                layout=" sizes, prev, pager, next, jumper"
                :total="listTotal"
            ></el-pagination>
        </el-card>
        <!-- 编辑or详情弹窗 -->
        <el-dialog
            top="0"
            :title="addUserForm.type=='add'? $t('boss.store_addStore'):$t('boss.store_resetStore')"
            :visible.sync="setUserFormVisible"
            class="setUserForm"
            width="600px"
        >
            <el-form ref="editForm" :model="addUserForm" :rules="rules" label-width="100px" size="mini">
                <el-row class="row">
                    <el-row class="cell">
                        <el-col :span="18" class="col">
                            <el-form-item :label="$t('boss.store_storeName')+':'" prop="storesName" class>
                                <el-input v-model="addUserForm.storesName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="cell">
                        <el-col :span="18" class="col">
                            <el-form-item :label="$t('boss.store_storeManagers')+':'" prop="userName" class>
                                <el-input v-model="addUserForm.userName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="cell">
                        <el-col :span="18" class="col">
                            <el-form-item :label="$t('boss.store_loginAccount')+':'" prop="account" class>
                                <el-input v-model="addUserForm.account"
                                          :disabled="addUserForm.type != 'add'"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="cell">
                        <el-col :span="18" class="col">
                            <el-form-item :label="$t('boss.store_loginPassword')+':'" prop="password" class>
                                <el-input v-model="addUserForm.password" type="password"
                                          @input="passwordChange"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="cell">
                        <el-col :span="18" class="col">
                            <el-form-item :label="$t('boss.store_address')+':'" prop="storesAddress" class>
                                <el-input type="textarea" v-model="addUserForm.storesAddress"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="setUserFormVisible=false">{{ $t('commons.close') }}</el-button>
                <el-button type="primary" @click="submitItem" v-loading="loading">{{ $t('commons.confirm') }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {
    stores_list,
    freeuserlogin,
    edit_stores_user,
    delete_stores_user,
} from "@/utils/api/boss";

export default {
    computed: {
        ...mapState({
            token: (state) => state.user.token,
            userId: (state) => state.user.id,
            msgKey: (state) => state.config.msgKey,
            plat_source: (state) => state.config.plat_source,
        }),
    },
    data() {
        return {
            loading: false,
            setUserFormVisible: false,
            searchForm: {
                searchType: 2,
                pageIndex: 1,
                pageSize: 20,
            },
            addUserForm: {
                type: "add", //区分是添加还是编辑
                userName: "",
                account: "",
                password: "",
                storesName: "",
                storesAddress: "",
                departmentIds: "",
            },
            rules: {
                userName: [
                    {
                        required: true,
                        message: this.$t('commons.mustInput'),
                        trigger: "change",
                    },
                ],
                account: [
                    {
                        required: true,
                        message: this.$t('commons.mustInput'),
                        trigger: "change",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: this.$t('commons.mustInput'),
                        trigger: "change",
                    },
                ],
                storesName: [
                    {
                        required: true,
                        message: this.$t('commons.mustInput'),
                        trigger: "change",
                    },
                ],
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [{}], //表格数据
        };
    },

    mounted() {
        this.initForm();
    },
    methods: {
        passwordChange() {
            this.addUserForm.passwordChange = true;
        },
        initForm() {
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            console.log(JSON.stringify(this.searchForm))
            this.loading = true
            this.$F.doRequest(this, '/pms/workuser/login_user_list', this.searchForm, (res) => {
                console.log(res)
                this.loading = false
                this.tableData = res.hotelUserList
            })
        },
        /**添加项目 */
        submitItem() {
            this.$refs.editForm.validate((valid) => {
                console.log(valid);
                if (valid) {
                    console.log(this.addUserForm);
                    this.addUserForm.userType = 3;
                    if (this.addUserForm.type == "add") {
                        this.$F.doRequest(
                            this,
                            "/pms/workuser/add_login_user",
                            this.addUserForm,
                            (res) => {
                                this.setUserFormVisible = false;
                                this.initForm();
                            }
                        );
                    } else {
                        let params = this.$F.deepClone(this.addUserForm);
                        if (!params.passwordChange) {
                            delete params["password"];
                        }
                        this.addUserForm.passwordChange = false;
                        this.$F.doRequest(
                            this,
                            "/pms/workuser/edit_stores_user",
                            params,
                            (res) => {
                                this.setUserFormVisible = false;
                                this.initForm();
                            }
                        );
                    }
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

        retForm() {
            this.$refs["editForm"].resetFields();
        },
        /**新增 */
        addItem(row) {
            this.setUserFormVisible = true;
            this.$nextTick(() => {
                this.retForm();
                this.addUserForm = {
                    type: "add", //区分是添加还是编辑
                    userName: "",
                    account: "",
                    password: "",
                    storesNum: this.$F.getHQCode(),
                    storesName: "",
                    storesAddress: "",
                    departmentIds: "",
                };
                this.addUserForm.type = "add";
            });
        },
        /**新增 */
        editItem(row) {
            this.setUserFormVisible = true;
            this.$nextTick(() => {
                this.retForm();
                for (let k in this.addUserForm) {
                    console.log(k);
                    this.addUserForm[k] = row[k] ? row[k] : "";
                }
                this.addUserForm.accountId = row.id;
                this.addUserForm.type = "edit";
            });
        },
        deleteNow(id) {
            this.$F.doRequest(
                this,
                "/pms/workuser/delete_stores_user",
                {
                    accountId: id,
                },
                (res) => {
                    this.loading = false;
                    this.initForm();
                }
            );
        },
        deleteItem(row) {
            this.$confirm("请确认删除此用户?", this.$t('commons.tip_desc'), {
                confirmButtonText: this.$t('commons.confirm'),
                cancelButtonText: this.$t('commons.cancel'),
                type: "warning",
            })
                .then(() => {
                    this.deleteNow(row.id);

                })
                .catch(() => {

                });
        },

        /**多选 */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /**每页数 */
        handleSizeChange(val) {
            this.searchForm.pageSize = val;
            this.searchForm.page = 1;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.pageIndex = val;
            this.getDataList();
        },
    },
};
</script>
