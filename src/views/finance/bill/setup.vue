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
                                    <el-button type="text" v-if="scope.row.level==1" @click="addCate('add', scope.row)">设为默认</el-button>
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
            <el-form size="small" :model="addForm" label-width="100px" :rules="addRule">
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
            <el-form size="small" :model="cateForm" label-width="100px" :rules="cateRule">
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
                addForm: {code: '', name: '', subject: '', type: '', direct: 1},
                cateForm: {code: '', name: '', type: 1,},
                addRule: {
                    code: [{ required: true, message: '请填写编码', trigger: 'change' }],
                    name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
                    type: [{ required: true, message: '请选择类别', trigger: 'blur' }]
                },
                cateRule: {
                    code: [{ required: true, message: '请填写编码', trigger: 'change' }],
                    name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
                },
                account: [],
                cateData: [],accountData: []
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
                if(type=='edit') {
                    this.subTitle = '编辑科目';
                    this.addForm = {code: row.code, name: row.name, subject: '', type: row.type, direct: row.direct == '借' ? 0 : 1}
                } else if(type=='add') {
                    this.subTitle = '添加下级科目';
                    this.addForm = {code: '', name: '', subject: '', type: '', direct: 1}
                } else {
                    this.subTitle = '新增科目';
                    this.addForm = {code: '', name: '', subject: '', type: '', direct: 1}
                }
                this.subVisible = true;
            },
            selectionChange(val) {
            },
            handleDelete(row) {

            },
            handleExamine(row) {

            },
            addCate() {},
            handleClose () {}
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
