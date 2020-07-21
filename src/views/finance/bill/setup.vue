<template>
    <div class="boss-index">
        <el-card shadow="never">
            <el-tabs v-model="activeName" @tab-click="tabChange" class="incomes">
                <el-tab-pane v-for="item in paneArr" :key="item.name" :label="item.label" :name="item.name">
                    <div class="setup-top">
                        <el-form ref="form" inline :model="form" label-width="60px" class="term line">
                            <el-form-item label="类别：" v-if="item.name!='certificate'">
                                <el-radio-group v-model="form.cate">
                                    <el-radio-button v-for="c in cates" :key="c.value" :value="c.value" :label="c.label"></el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <div class="export">
                                <el-button type="primary" class="submit" @click="addNew">新增</el-button>
                                <el-button type="primary" class="submit" v-if="item.name=='sub'">导出</el-button>
                            </div>
                        </el-form>
                        <el-table v-if="item.name=='sub'" :data="tableData" size="small" border height="100%" header-row-class-name="default" @selection-change="selectionChange" row-key="code" default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column header-align="center" prop="code" label="编码" width="180"></el-table-column>
                            <el-table-column header-align="center" prop="name" label="名称"></el-table-column>
                            <el-table-column header-align="center" prop="type" label="类别"></el-table-column>
                            <el-table-column header-align="center" prop="direct" label="余额方向" width="180"></el-table-column>
                            <el-table-column header-align="center" prop="status" label="状态" width="180"></el-table-column>
                            <el-table-column header-align="center" label="操作" width="240">
                                <template slot-scope="scope">
                                    <el-button type="text" v-if="scope.row.level==1" @click="addNew('add', scope.row)">添加下级</el-button>
                                    <el-button type="text" @click="addNew('edit', scope.row)">修改</el-button>
                                    <el-popconfirm title="确认删除？" icon="el-icon-warning-outline" iconColor="#FF8C00" onConfirm="handleDelete(scope.row)">
                                        <el-button slot="reference" type="text">删除</el-button>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-table v-if="item.name=='certificate'" :data="cateData" size="small" border height="100%" header-row-class-name="default">
                            <el-table-column header-align="center" prop="code" label="凭证字" width="180"></el-table-column>
                            <el-table-column header-align="center" prop="name" label="打印标题"></el-table-column>
                            <el-table-column header-align="center" prop="type" label="是否默认"></el-table-column>
                            <el-table-column header-align="center" label="操作" width="240">
                                <template slot-scope="scope">
                                    <el-button type="text" v-if="scope.row.level==1">设为默认</el-button>
                                    <el-button type="text" @click="addCate('edit', scope.row)">修改</el-button>
                                    <el-popconfirm title="确认删除？" icon="el-icon-warning-outline" iconColor="#FF8C00" onConfirm="handleDelete(scope.row)">
                                        <el-button slot="reference" type="text">删除</el-button>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-table v-if="item.name=='account'" :data="accountData" size="small" border height="100%" header-row-class-name="default">
                            <el-table-column header-align="center" prop="code" label="编码"></el-table-column>
                            <el-table-column header-align="center" prop="name" label="账户名称"></el-table-column>
                            <el-table-column header-align="center" prop="account" label="账号"></el-table-column>
                            <el-table-column header-align="center" prop="subject" label="科目"></el-table-column>
                            <el-table-column header-align="center" label="操作" width="240">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="addCate('edit', scope.row)">修改</el-button>
                                    <el-popconfirm title="确认删除？" icon="el-icon-warning-outline" iconColor="#FF8C00" onConfirm="handleDelete(scope.row)">
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
                <el-form-item label="科目编码：" prop="code">
                    <el-input v-model="addForm.code"></el-input>
                </el-form-item>
                <el-form-item label="科目名称：" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="上级科目：">{{addForm.subject}}</el-form-item>
                <el-form-item label="科目类别：" prop="type">
                    <el-select v-model="addForm.type" clearable placeholder="请选择">
                        <el-option v-for="item in account" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="方向：">
                    <el-radio-group v-model="addForm.direct">
                        <el-radio :label="0">借</el-radio>
                        <el-radio :label="1">贷</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="subVisible = false">取 消</el-button>
                <el-button type="primary" class="submit" @click="">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog top="0" :title="cateTitle" :visible.sync="cateVisible" width="30%" :before-close="handleClose" class="editBox">
            <el-form size="small" ref="cateForm" :model="cateForm" label-width="100px" :rules="cateRule">
                <el-form-item label="凭证字：" prop="code">
                    <el-input v-model="cateForm.code"></el-input>
                </el-form-item>
                <el-form-item label="打印标题：" prop="name">
                    <el-input v-model="cateForm.name"></el-input>
                </el-form-item>
                <el-form-item label="是否默认：">
                    <el-radio-group v-model="cateForm.type">
                        <el-radio :label="0">是</el-radio>
                        <el-radio :label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cateVisible = false">取 消</el-button>
                <el-button type="primary" class="submit" @click="">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog top="0" :title="accountTitle" :visible.sync="accountVisible" width="30%" :before-close="handleClose" class="editBox">
            <el-form size="small" ref="accountForm" :model="accountForm" label-width="100px" :rules="accountRule">
                <el-form-item label="编码：" prop="code">
                    <el-input v-model="accountForm.code"></el-input>
                </el-form-item>
                <el-form-item label="账户名称：" prop="name">
                    <el-input v-model="accountForm.name"></el-input>
                </el-form-item>
                <el-form-item label="账号：" prop="account">
                    <el-input v-model="accountForm.account"></el-input>
                </el-form-item>
                <el-form-item label="会计科目：" prop="subject">
                    <el-input v-model="accountForm.subject">
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
                <el-tree :data="tableData" :props="defaultProps" default-expand-all @node-click="handleNodeClick"></el-tree>
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
                activeName: 'sub', form: {cate: '1'},
                paneArr: [{label: '科目', name: 'sub'}, {label: '凭证字', name: 'certificate'}, {label: '账户', name: 'account'}],
                cates: [{label: '资产', value: '1'}, {label: '负债', value: '2'}, {label: '权益', value: '3'}, {label: '成本', value: '4'}, {label: '损益', value: '5'}],
                tableData: [{level: 1, code: '1001', name: '库存现金', type: '流动资产', direct: '借', status: '已开启', children: [{level: 2, code: '100101', name: '日常现金', type: '流动资产', direct: '借', status: '已开启'}]}],
                subTitle: '新增科目', subVisible: false,
                cateTitle: '新增科目', cateVisible: false,
                accountTitle: '新增科目', accountVisible: false, innerVisible: false,
                addForm: {code: '', name: '', subject: '', type: '', direct: 1},
                cateForm: {code: '', name: '', type: 1},
                accountForm: {code: '', name: '', account: '', subject: ''},
                innerForm: {name: ''},
                addRule: {
                    code: [{ required: true, message: '请填写编码', trigger: 'blur' }],
                    name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
                    type: [{ required: true, message: '请选择类别', trigger: 'blur' }]
                },
                cateRule: {
                    code: [{ required: true, message: '请填写编码', trigger: 'change' }],
                    name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
                },
                accountRule: {
                    code: [{ required: true, message: '请填写编码', trigger: 'blur' }],
                    name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
                    subject: [{ required: true, message: '请选择科目', trigger: 'blur' }]
                },
                account: [],
                cateData: [],accountData: [],
                defaultProps: {children: 'children', label: 'name'}
            }
        },
        mounted() {
            this.activeName = 'sub'
        },
        methods: {
            tabChange(tab) {
                if(tab.name == 'sub') {
                    this.cates = [{label: '资产', value: '1'}, {label: '负债', value: '2'}, {label: '权益', value: '3'}, {label: '成本', value: '4'}, {label: '损益', value: '5'}];
                } else if (tab.name == 'account') {
                    this.cates = [{label: '现金', value: '1'}, {label: '银行存款', value: '2'}];
                }
            },
            addNew(type, row) {
                if(this.activeName == 'sub') {
                    if(this.$refs && this.$refs['addForm']) {
                        this.$refs['addForm'].clearValidate();
                    }
                    if(type=='edit') {
                        this.subTitle = '编辑科目';
                        this.addForm = {code: row.code, name: row.name, subject: '', type: row.type, direct: row.direct == '借' ? 0 : 1}
                    } else if(type=='add') {
                        this.refs['addForm'].clearValidate();
                        this.subTitle = '添加下级科目';
                        this.addForm = {code: '', name: '', subject: '', type: '', direct: 1}
                    } else {
                        this.subTitle = '新增科目';
                        this.addForm = {code: '', name: '', subject: '', type: '', direct: 1}
                    }
                    this.subVisible = true;
                } else if (this.activeName == 'certificate') {
                    if(type=='edit') {
                        this.subTitle = '修改凭证字';
                        this.cateForm = {code: row.code, name: row.name, type: row.type}
                    } else {
                        this.subTitle = '新增凭证字';
                        this.cateForm = {code: '', name: '', type: ''}
                    }
                    this.cateVisible = true
                } else {
                    this.accountVisible = true
                }
            },
            selectionChange(val) {
            },
            handleDelete(row) {

            },
            handleExamine(row) {

            },
            addCate() {},
            handleClose () {
                this.subVisible = false;
                this.cateVisible = false;
                this.accountVisible = false;
            },
            selectSub () {
                this.innerVisible = true;
            },
            handleNodeClick () {

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
