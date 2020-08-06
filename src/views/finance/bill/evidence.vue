<!--
 * @Date: 2020-03-20 19:11:04
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-16 15:01:19
 * @FilePath: /cloudAdmin/src/views/finance/account/billjf.vue
 -->
<template>
    <div class="boss-index">
        <el-card shadow="never">
            <el-form ref="form" inline :model="form" label-width="100px" class="term line">
                <el-form-item label="选择日期：">
                    <el-date-picker type="date" v-model="form.strDate"></el-date-picker>
                    <span class="line">至</span>
                    <el-time-picker type="date" v-model="form.endDate"></el-time-picker>
                </el-form-item>
                <el-form-item label="审核状态：">
                    <el-select v-model="form.status" clearable placeholder="请选择">
                        <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit">查询</el-button>
                </el-form-item>
                <div class="export">
                    <el-button type="primary" class="submit">审核</el-button>
                    <el-button type="primary" class="submit">反审核</el-button>
                    <el-button type="primary" class="submit">批量删除</el-button>
                    <el-button type="primary" class="submit">导出</el-button>
                </div>
            </el-form>
            <el-table :data="tableData" size="small" :span-method="objectSpanMethod" border height="100%" header-row-class-name="default" @selection-change="selectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column header-align="center" prop="code" label="日期" width="160"></el-table-column>
                <el-table-column header-align="center" prop="name" label="凭证字" width="120"></el-table-column>
                <el-table-column header-align="center" prop="direct" label="摘要"></el-table-column>
                <el-table-column header-align="center" prop="direct" label="科目"></el-table-column>
                <el-table-column header-align="center" prop="direct" label="借方余额" width="180"></el-table-column>
                <el-table-column header-align="center" prop="direct" label="贷方余额" width="180"></el-table-column>
                <el-table-column header-align="center" prop="direct" label="制单人" width="180"></el-table-column>
                <el-table-column header-align="center" prop="direct" label="审核人" width="120"></el-table-column>
                <el-table-column header-align="center" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-popconfirm title="确认删除？" icon="el-icon-warning-outline" iconColor="#FF8C00" onConfirm="handleDelete(scope.row)">
                            <el-button slot="reference" type="text">删除</el-button>
                        </el-popconfirm>
                        <el-button type="text" icon="el-icon-shopping-cart-full" @click="handleExamine(scope.$index, scope.row)">冲销</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import {get_consume_list, del_consume_info} from "@/utils/api/finance";

    export default {
        data() {
            return {
                form: {
                    strDate: '', endDate: '', status: ''
                },
                type: [{value: 1, label: '2020年第4期'}],
                tableData: []
            };
        },
        methods: {
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
            selectionChange(val) {},
            handleEdit(index, row) {

            },

            handleDelete(row) {

            },
            handleExamine(index, row) {

            },
        }
    };
</script>

<style>
</style>
