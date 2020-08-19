<!--
 * @Date: 2020-03-20 12:12:21
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-13 14:23:40
 * @FilePath: /cloudAdmin/src/views/finance/account/accountzj.vue
 -->
<template>
    <div class="boss-index">
        <el-card shadow="never">
            <el-form ref="form" inline :model="form" size="small" class="term line demo-form-inline">
                <el-form-item label="日期：">
                    <el-date-picker type="date" v-model="form.type"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit">查询</el-button>
                </el-form-item>
                <el-form-item class="form-inline-flex">
                    <el-button type="primary" class="submit">导出</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" size="small" :span-method="objectSpanMethod" border height="100%" header-row-class-name="default">
                <el-table-column header-align="center" prop="code" label="科目编码" width="120"></el-table-column>
                <el-table-column header-align="center" prop="name" label="科目名称" width="180"></el-table-column>
                <el-table-column header-align="center" prop="period" label="期间" width="180"></el-table-column>
                <el-table-column header-align="center" prop="abstract" label="摘要"></el-table-column>
                <el-table-column header-align="center" prop="debit" label="借方" width="180"></el-table-column>
                <el-table-column header-align="center" prop="credit" label="贷方" width="180"></el-table-column>
                <el-table-column header-align="center" prop="direct" label="方向" width="120"></el-table-column>
                <el-table-column header-align="center" align="right" prop="balance" label="余额" width="180"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import {get_security_sum, get_balance} from "@/utils/api/finance";

    export default {
        // components: {recharge},
        data() {
            return {
                form: {type: ''},
                type: [],
                tableData: [
                    {code: '1001', name: '库存现金', period: '202004', abstract: '期初余额', debit: '', credit: '', direct: '借', balance: '1000.00'}
                ],
            };
        },
        mounted() {
            this.getLedgerData()
        },
        methods: {
            getLedgerData() {
                this.$F.doRequest(this, '/api/user/register', {monthTime: this.form.type}, (res) => {
                    this.tableData = res
                })
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
            toRecharge() {
                this.showRecharge = true;
                this.$nextTick(() => {
                    this.$refs.rechargeRef.initData(this.balance);
                });
            }
        }
    };
</script>

<style lang="less">
    .cardhead {
        margin-bottom: 30px;
        background-color: #e5f2ff;
        border: 1px solid #126eff;
        padding: 15px 20px;
        color: #969896;
    }

    .panBox {
        padding: 30px 20px;
        border: 1px solid #e6e6e6;
        display: flex;

        .panItem {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 10px 30px;

            &:first-child {
                border-right: 1px solid #e6e6e6;
            }

            .item1 {
                font-size: 14px;
                color: #666666;
                line-height: 30px;
            }

            .item2 {
                font-size: 20px;
                color: #000000;
                line-height: 50px;
                display: flex;
                justify-content: space-between;
            }

            .item3 {
                margin-top: 10px;
            }
        }
    }
</style>
