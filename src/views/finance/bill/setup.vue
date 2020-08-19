<template>
    <div class="boss-index">
        <el-card shadow="never">
            <el-tabs v-model="activeName" @tab-click="tabChange" class="tabCenter incomes">
                <el-tab-pane v-for="item in paneArr" :key="item.name" :label="item.label" :name="item.name">
                    <div class="setup-top">
                        <el-form ref="form" size="small" inline label-width="60px" class="term line">
                            <el-form-item label="类别：" v-if="item.name!='certificate'">
                                <el-radio-group v-model="cate" @change="radioChange">
                                    <el-radio-button v-for="(c, i) in cates" :key="i" :label="c.id">{{c.name}}</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <div class="export">
                                <el-button size="small" class="submit" @click="addNew">新增</el-button>
                                <el-button size="small" class="submit" v-if="item.name=='sub'">导出</el-button>
                            </div>
                        </el-form>
                        <el-table v-if="item.name=='sub'" :data="subData" size="small" border height="100%" header-row-class-name="default" @selection-change="selectionChange" row-key="code" default-expand-all :tree-props="{children: 'childList', hasChildren: 'hasChildList'}">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column header-align="center" prop="subjectsCode" label="编码" width="180"></el-table-column>
                            <el-table-column header-align="center" prop="accountName" label="名称"></el-table-column>
                            <el-table-column header-align="center" prop="typeId" label="类别"></el-table-column>
                            <el-table-column header-align="center" label="余额方向" width="180">
                                <template slot-scope="scope">{{scope.row.direction == 1 ? '借' : '贷'}}</template>
                            </el-table-column>
                            <el-table-column header-align="center" label="状态" width="180">
                                <template slot-scope="scope">{{scope.row.status == 1 ? '正常' : '已删除'}}</template>
                            </el-table-column>
                            <el-table-column align="center" label="操作" width="240">
                                <template slot-scope="scope">
                                    <el-button type="text" v-if="scope.row.level==1" @click="addNew('add', scope.row)">添加下级</el-button>
                                    <el-button type="text" @click="addNew('edit', scope.row)">修改</el-button>
                                    <el-popconfirm title="确认删除？" icon="el-icon-warning-outline" iconColor="#FF8C00" @onConfirm="handleDelete('sub', scope.row)">
                                        <el-button slot="reference" type="text">删除</el-button>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-table v-if="item.name=='certificate'" :data="cateData" size="small" border height="100%" header-row-class-name="default">
                            <el-table-column header-align="center" prop="credentailWord" label="凭证字" width="180"></el-table-column>
                            <el-table-column header-align="center" prop="printTitle" label="打印标题"></el-table-column>
                            <el-table-column header-align="center" label="是否默认">
                                <template slot-scope="scope">{{scope.row.state == 1 ? '是' : '否'}}</template>
                            </el-table-column>
                            <el-table-column align="center" label="操作" width="240">
                                <template slot-scope="scope">
                                    <el-button type="text" v-if="scope.row.state==2" @click="addNew('edit', scope.row)">设为默认</el-button>
                                    <el-button type="text" @click="addNew('edit', scope.row)">修改</el-button>
                                    <el-popconfirm title="确认删除？" icon="el-icon-warning-outline" iconColor="#FF8C00" @onConfirm="handleDelete('cate', scope.row)">
                                        <el-button slot="reference" type="text">删除</el-button>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-table v-if="item.name=='account'" :data="accountData" size="small" border height="100%" header-row-class-name="default">
                            <el-table-column prop="accountCode" label="账户编码"></el-table-column>
                            <el-table-column align="center" prop="accountName" label="账户名称"></el-table-column>
                            <el-table-column align="center" prop="account" label="账号"></el-table-column>
                            <el-table-column header-align="center" prop="subjectsId" label="科目"></el-table-column>
                            <el-table-column align="center" label="操作" width="140">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="addNew('edit', scope.row)">修改</el-button>
                                    <el-popconfirm title="确认删除？" icon="el-icon-warning-outline" iconColor="#FF8C00" @onConfirm="handleDelete('account', scope.row)">
                                        <el-button slot="reference" type="text">删除</el-button>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <el-dialog top="0" :title="subTitle" :visible.sync="subVisible" width="30%" :before-close="handleClose" class="editBox">
            <el-form size="small" ref="addForm" :model="addForm" label-width="100px" :rules="addRule">
                <el-form-item label="科目编码：" prop="subjectsCode">
                    <el-input v-model="addForm.subjectsCode"></el-input>
                </el-form-item>
                <el-form-item label="科目名称：" prop="accountName">
                    <el-input v-model="addForm.accountName"></el-input>
                </el-form-item>
                <el-form-item label="上级科目：">{{addForm.pDesc}}</el-form-item>
                <el-form-item label="科目类别：" prop="typeId">
                    <el-select v-model="addForm.typeId" clearable placeholder="请选择">
                        <el-option v-for="(item, index) in cates" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="方向：">
                    <el-radio-group v-model="addForm.direction">
                        <el-radio :label="1">借</el-radio>
                        <el-radio :label="2">贷</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="subVisible = false">取 消</el-button>
                <el-button type="primary" class="submit" @click="submit('sub')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog top="0" :title="cateTitle" :visible.sync="cateVisible" width="30%" :before-close="handleClose" class="editBox">
            <el-form size="small" ref="cateForm" :model="cateForm" label-width="100px" :rules="cateRule">
                <el-form-item label="凭证字：" prop="credentailWord">
                    <el-input v-model="cateForm.credentailWord"></el-input>
                </el-form-item>
                <el-form-item label="打印标题：" prop="printTitle">
                    <el-input v-model="cateForm.printTitle"></el-input>
                </el-form-item>
                <el-form-item label="是否默认：">
                    <el-radio-group v-model="cateForm.state">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cateVisible = false">取 消</el-button>
                <el-button type="primary" class="submit" @click="submit('cate')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog top="0" :title="accountTitle" :visible.sync="accountVisible" width="30%" :before-close="handleClose" class="editBox">
            <el-form size="small" ref="accountForm" :model="accountForm" label-width="100px" :rules="accountRule">
                <el-form-item label="编码：" prop="accountCode">
                    <el-input v-model="accountForm.accountCode"></el-input>
                </el-form-item>
                <el-form-item label="账户名称：" prop="accountName">
                    <el-input v-model="accountForm.accountName"></el-input>
                </el-form-item>
                <el-form-item label="账号：" prop="account">
                    <el-input v-model="accountForm.account"></el-input>
                </el-form-item>
                <el-form-item label="会计科目：" prop="subjectsId">
                    <el-input v-model="accountForm.subjectsId" readonly>
                        <el-button slot="append" icon="el-icon-more" @click="selectSub"></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <el-dialog top="0" width="25%" title="选择科目" :visible.sync="innerVisible" append-to-body>
                <el-form size="small" inline ref="innerForm" :model="innerForm">
                    <el-form-item>
                        <el-input v-model="innerForm.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="submit">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-tree :data="subData" :props="defaultProps" default-expand-all @node-click="handleNodeClick"></el-tree>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="accountVisible = false">取 消</el-button>
                <el-button type="primary" class="submit" @click="">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                pageForm: {
                    pageIndex: 1,
                    pageSize: 10,
                    paging: true
                },
                activeName: 'sub', cate: '',
                paneArr: [{label: '科目', name: 'sub'}, {label: '凭证字', name: 'certificate'}, {label: '账户', name: 'account'}],
                cates: [],
                subTitle: '', subVisible: false,
                cateTitle: '', cateVisible: false,
                accountTitle: '', accountVisible: false, innerVisible: false,
                addForm: {subjectsCode: '', accountName: '', pid: '', pDesc: '', typeId: '', direction: 1},
                cateForm: {credentailWord: '', printTitle: '', state: 2},
                accountForm: {accountCode: '', accountName: '', account: '', subjectsId: ''},
                innerForm: {name: ''},
                addRule: {
                    subjectsCode: [{ required: true, message: '请填写编码', trigger: 'blur' }],
                    accountName: [{ required: true, message: '请填写名称', trigger: 'blur' }],
                    typeId: [{ required: true, message: '请选择类别', trigger: 'blur' }]
                },
                cateRule: {
                    credentailWord: [{ required: true, message: '请填写编码', trigger: 'change' }],
                    printTitle: [{ required: true, message: '请填写名称', trigger: 'blur' }],
                },
                accountRule: {
                    accountCode: [{ required: true, message: '请填写编码', trigger: 'blur' }],
                    accountName: [{ required: true, message: '请填写名称', trigger: 'blur' }],
                    subjectsId: [{ required: true, message: '请选择科目', trigger: 'blur' }]
                },
                subData: [], cateData: [],accountData: [],
                defaultProps: {children: 'childList', label: 'accountName'}
            }
        },
        mounted() {
            this.tabChange()
        },
        methods: {
            tabChange() {
                if(this.activeName == 'sub') {
                    this.$F.doRequest(this, '/pms/system/public_dict', {type: 25}, (res) => {
                        this.cates = res;
                        this.cate = res[0].id;
                        this.getSubjectData();
                    })
                } else if (this.activeName == 'account') {
                    this.cates = [{name: '现金', value: '1'}, {name: '银行存款', value: '2'}];
                    this.cate = 1;
                    this.getAccountData()
                } else {
                    this.getWordData()
                }
            },
            getSubjectData() {
                this.$F.doRequest(this, '/pms/credentailsubjects/list', {typeId: this.cate}, (res) => {
                    this.subData = res.list
                })
            },
            getWordData() {
                this.$F.doRequest(this, '/pms/hotelCredentailWord/list', this.pageForm, (res) => {
                    this.cateData = res.list
                })
            },
            getAccountData() {
                const params = {
                    accountType: this.cate
                }
                this.$F.merge(params, this.pageForm);
                this.$F.doRequest(this, '/pms/hotelCredentailAccount/list', params, (res) => {
                    this.accountData = res.list
                })
            },
            radioChange() {
                this.getSubjectData()
            },
            addNew(type, row) {
                if(this.activeName == 'sub') {
                    if(this.$refs && this.$refs['addForm']) {
                        this.$refs['addForm'].clearValidate();
                    }
                    if(type=='edit') {
                        this.subTitle = '编辑科目';
                        this.addForm = row;
                    } else if(type=='add') {
                        this.refs['addForm'].clearValidate();
                        this.subTitle = '添加下级科目';
                        this.addForm = {subjectsCode: '', accountName: '', pid: '', typeId: '', upDesc: '', direction: 1}
                    } else {
                        this.subTitle = '新增科目';
                        this.addForm = {subjectsCode: '', accountName: '', pid: '', typeId: '', upDesc: '', direction: 1}
                    }
                    this.subVisible = true;
                } else if (this.activeName == 'certificate') {
                    if(type=='edit') {
                        this.subTitle = '修改凭证字';
                        this.cateForm = row;
                    } else {
                        this.subTitle = '新增凭证字';
                        this.cateForm = {credentailWord: '', printTitle: '', state: 2}
                    }
                    this.cateVisible = true
                } else {
                    if(type=='edit') {
                        this.accountTitle = '修改现金账户';
                        this.accountForm = row;
                    } else {
                        this.accountTitle = '新增现金账户';
                        this.accountForm = {accountCode: '', accountName: '', account: '', subjectsId: ''}
                    }
                    this.accountVisible = true
                }
            },
            selectionChange(val) {
            },
            handleDelete(type, row) {
                if(type == 'sub') {
                    this.$F.doRequest(this, '/pms/credentailsubjects/delete', {id: row.id}, (res) => {
                        this.getSubjectData()
                    })
                } else if (type == 'cate') {
                    this.$F.doRequest(this, '/pms/hotelCredentailWord/delete', {id: row.id}, (res) => {
                        this.getWordData()
                    })
                } else {
                    this.$F.doRequest(this, '/pms/hotelCredentailAccount/delete', {id: row.id}, (res) => {
                        this.getAccountData()
                    })
                }
            },
            handleClose () {
                this.subVisible = false;
                this.cateVisible = false;
                this.accountVisible = false;
            },
            selectSub () {
                this.innerVisible = true;
            },
            handleNodeClick () {

            },
            submit(type) {
                if(type == 'sub') {
                    const params = {
                        id: this.addForm.id,
                        accountName: this.addForm.accountName,
                        subjectsCode: this.addForm.subjectsCode,
                        typeId: this.addForm.typeId,
                        upTypeId: this.addForm.upTypeId,
                        pid: this.addForm.pid,
                        direction: this.addForm.direction,
                    }
                    this.$F.doRequest(this, '/pms/credentailsubjects/edit', params, (res) => {
                        this.getSubjectData();
                        this.subVisible = false;
                    })
                } else if (type == 'cate') {
                    const params = {
                        id: this.cateForm.id,
                        credentailWord: this.cateForm.credentailWord,
                        printTitle: this.cateForm.printTitle,
                        state: this.cateForm.state
                    }
                    this.$F.doRequest(this, '/pms/hotelCredentailWord/edit', params, (res) => {
                        this.getWordData();
                        this.cateVisible = false;
                    })
                } else {
                    const params = {
                        id: this.accountForm.id,
                        accountType: this.cate,
                        accountCode: this.accountForm.accountCode,
                        accountName: this.accountForm.accountName,
                        account: this.accountForm.account,
                        subjectsId: this.accountForm.subjectsId,
                    }
                    this.$F.doRequest(this, '/pms/hotelCredentailAccount/edit', params, (res) => {
                        this.getAccountData();
                        this.accountVisible = false;
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    .setup-top {
        height: 100%;
        display: flex;
        flex-direction: column;

        .term {
            background: transparent;
            padding: 0;
        }
    }
</style>
