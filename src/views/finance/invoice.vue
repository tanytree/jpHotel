<template>
    <div class="boss-index">
        <el-tabs class="pageTab" v-model="activeName">
            <el-tab-pane label="已开发票" name="invoice">
                <div class="invoiceBox">
                    <el-form size="small" inline :model="invoiceForm" class="term line">
                        <div class="margin-b-20">
                            <el-form-item label="发票类型：">
                                <el-radio-group v-model="invoiceForm.cate">
                                    <el-radio-button value="all" label="all">不限</el-radio-button>
                                    <el-radio-button value="speVat" label="speVat">增值税专用发票</el-radio-button>
                                    <el-radio-button value="defVat" label="defVat">增值税普通发票</el-radio-button>
                                    <el-radio-button value="eleVat" label="eleVat">增值税电子发票</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <el-form-item label="开始日期：">
                            <el-date-picker type="date" v-model="invoiceForm.strDate"></el-date-picker>
                            <span class="line">至</span>
                            <el-time-picker type="date" v-model="invoiceForm.endDate"></el-time-picker>
                        </el-form-item>
                        <el-form-item label="客户名称：">
                            <el-input v-model="invoiceForm.name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="submit">查询</el-button>
                            <el-button type="primary" class="submit">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableData" size="small" border height="100%" header-row-class-name="default">
                        <el-table-column header-align="center" prop="customer" label="客户名称" width="180"></el-table-column>
                        <el-table-column header-align="center" prop="roomNum" label="房间号"></el-table-column>
                        <el-table-column header-align="center" prop="phone" label="电话号码"></el-table-column>
                        <el-table-column header-align="center" prop="type" label="发票类型" width="180"></el-table-column>
                        <el-table-column header-align="center" prop="invoiceTitle" label="发票抬头" width="180"></el-table-column>
                        <el-table-column header-align="center" prop="invoiceAmount" label="开票金额" width="180"></el-table-column>
                        <el-table-column header-align="center" prop="taxes" label="税金" width="180"></el-table-column>
                        <el-table-column header-align="center" prop="invoiceNum" label="发票号码" width="180"></el-table-column>
                        <el-table-column header-align="center" prop="billTime" label="开票时间" width="180"></el-table-column>
                        <el-table-column header-align="center" prop="operator" label="操作人" width="180"></el-table-column>
                        <el-table-column header-align="center" label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button type="text" @click="detail(scope.row)">详情</el-button>
                                <el-popconfirm title="确认删除？" icon="el-icon-warning-outline" iconColor="#FF8C00" onConfirm="handleDelete(scope.row)">
                                    <el-button slot="reference" type="text">删除</el-button>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                activeName: 'invoice', invoiceForm: {cate: 'all', strDate: '', endDate: '', name: ''}, tableData: []
            }
        },
        methods: {
            detail(row) {

            },
            handleDelete(row) {}
        }
    }
</script>

<style lang="scss">
    .invoiceBox {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
