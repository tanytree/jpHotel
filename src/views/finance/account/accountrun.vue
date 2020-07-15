<template>
    <div class="boss-index">
        <el-card shadow="never">
            <el-form ref="form" inline size="small" :model="form" label-width="90px" class="term">
                <el-form-item label="日期：">
                    <el-select v-model="form.type" clearable placeholder="请选择">
                        <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账户：">
                    <el-select v-model="form.account" clearable placeholder="请选择">
                        <el-option v-for="item in account" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="方向：">
                    <el-select v-model="form.direction" placeholder="请选择到账时间">
                        <el-option v-for="item in direction" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <el-date-picker type="date" v-model="form.strDate"></el-date-picker>
                    <span class="line">至</span>
                    <el-time-picker type="date" v-model="form.endDate"></el-time-picker>
                </el-form-item>
                <el-form-item label="来源：">
                    <el-select v-model="form.source" clearable placeholder="请选择">
                        <el-option v-for="item in source" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态：">
                    <el-select v-model="form.status" clearable placeholder="请选择">
                        <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="营业项目：">
                    <el-select v-model="form.project" clearable placeholder="请选择">
                        <el-option v-for="item in project" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit">查询</el-button>
                    <el-button type="primary" class="submit">导出</el-button>
                </el-form-item>
            </el-form>
            <div class="flex-col">
                <el-table :data="tableData" size="small" :span-method="objectSpanMethod" border height="100%" header-row-class-name="default">
                    <el-table-column header-align="center" prop="date" label="支付时间" width="120"></el-table-column>
                    <el-table-column header-align="center" prop="from" label="来源" width="120"></el-table-column>
                    <el-table-column header-align="center" prop="direct" label="方向" width="120"></el-table-column>
                    <el-table-column header-align="center" prop="detailed" label="明细" width="120"></el-table-column>
                    <el-table-column header-align="center" prop="price" label="金额(日元)" width="120"></el-table-column>
                    <el-table-column header-align="center" prop="account" label="账户"></el-table-column>
                    <el-table-column header-align="center" prop="record" label="记账备注"></el-table-column>
                    <el-table-column header-align="center" prop="examine" label="审核备注"></el-table-column>
                    <el-table-column header-align="center" prop="examineStatus" label="审核状态" width="120"></el-table-column>
                    <el-table-column header-align="center" prop="time" label="创建时间" width="140"></el-table-column>
                    <el-table-column header-align="center" label="操作" width="130">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                            <el-button type="text" size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></el-button>
                            <el-button type="text" size="mini" @click="handleExamine(scope.$index, scope.row)">审核</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" label="凭证" width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini">生成凭证</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="total">
                    收入： {{income}} 日元   支出：{{expand}} 日元   利润：{{profit}}日元（只统计已审核数据）
                </div>
            </div>
        </el-card>
        <el-dialog top="0" title="修改流水账" :visible.sync="editVisible" width="30%" :before-close="handleClose" class="editBox">
            <el-form size="small" :model="edit" label-width="100px" :rules="editRule">
                <el-form-item label="账户：" prop="account">
                    <el-select v-model="edit.type" clearable placeholder="请选择">
                        <el-option v-for="item in account" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发生金额：" prop="price">
                    <el-input v-model="edit.price"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input type="textarea" v-model="edit.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" class="submit" @click="">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog top="0" title="审核" :visible.sync="examineVisible" width="30%" :before-close="handleClose" class="editBox">
            <el-form size="small" :model="examine" label-width="90px" :rules="examineRule">
                <el-form-item label="审核：" prop="account">
                    <el-radio-group v-model="examine.type">
                        <el-radio :label="1">通过</el-radio>
                        <el-radio :label="0">不通过</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input type="textarea" v-model="examine.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="examineVisible = false">取 消</el-button>
                <el-button type="primary" class="submit" @click="">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import {withdraw} from "@/utils/api/finance";

    export default {
        data() {
            return {
                form: {type: 1, account: '1', direction: '1', strDate: '', endDate: '', source: '1', status: '1', project: '1'},
                type: [{value: 1, label: '2020年第4期'}],
                account: [{value: 1, label: '全部'}],
                direction: [{value: 1, label: '全部'}],
                source: [{value: 1, label: '全部'}],
                status: [{value: 1, label: '全部'}],
                project: [{value: 1, label: '全部'}],
                tableData: [
                    {date: '2020-05-20', from: 'PMS产生', direct: '支出', detailed: '现金退款', price: '-8888.00', account: '库存现金', record: '', examine: '', examineType: '', examineStatus: '', time: '2020-05-22 09:23'}
                ], income: '49758695867.88', expand: '8937585.00', profit: '457889458.88',
                editVisible: false, examineVisible: false,
                edit: {account: '', price: 1, remark: ''},
                editRule: {
                    account: [{ required: true, message: '请选择账户类型', trigger: 'change' }],
                    price: [{ required: true, message: '请输入金额', trigger: 'blur' }],
                    remark: [{ required: true, message: '请填写备注', trigger: 'blur' }]
                },
                examine: {type: 1, remark: ''},
                examineRule: {
                    type: [{ required: true, message: '请选择审核状态', trigger: 'change' }],
                    remark: [{ required: true, message: '请填写备注', trigger: 'blur' }]
                }
            };
        },
        computed: {
            ...mapState({
                company: state => state.company
            })
        },
        methods: {
            handleEdit(index, row) {
                this.editVisible = true;
                this.edit = row
            },

            handleDelete(index, row) {

            },
            handleExamine(index, row) {
                this.examineVisible = true;
                this.examine = row
            },
            //折叠面板
            handleChange(val) {
                console.log(val);
            },
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },
            handleClose() {
                this.editVisible = false;
                this.examineVisible = false;
            }
        }
    };
</script>

<style lang="less">

</style>
