<template>
    <div class="boss-index">
        <el-card shadow="never">
            <el-form ref="form" inline size="small" :model="form" label-width="90px" class="term">
                <el-form-item :label="$t('manager.finance_date')+':'">
                    <el-select v-model="form.type" clearable>
                        <el-option
                            v-for="(item, index) in type"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('manager.finance_account')+':'">
                    <el-select v-model="form.accountId" clearable>
                        <el-option
                            v-for="(item, index) in account"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('manager.finance_direction')+':'">
                    <el-select v-model="form.payment" :placeholder="$t('manager.finance_chooseInTime')">
                        <el-option :label="1">{{ $t('manager.finance_spending') }}</el-option>
                        <el-option :label="2">{{ $t('manager.finance_income') }}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('manager.finance_creatTime')+':'">
                    <el-date-picker type="date" v-model="form.createStartTime"></el-date-picker>
                    <span class="line">{{ $t('boss.report_toText') }}</span>
                    <el-date-picker type="date" v-model="form.createEndTime"></el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('manager.finance_source')+':'">
                    <el-select
                        v-model="form.financialType"
                        clearable
                        :placeholder="$t('manager.hk_pleaseSelect')"
                    >
                        <el-option :label="1">{{ $t('manager.finance_autoPro') }}</el-option>
                        <el-option :label="2">{{ $t('manager.finance_handPro') }}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('manager.grsl_reviewState')+':'">
                    <el-select
                        v-model="form.auditStatus"
                        clearable
                        :placeholder="$t('manager.hk_pleaseSelect')"
                    >
                        <el-option :label="1">{{ $t('manage.grsl_waiteReview') }}</el-option>
                        <el-option :label="2">{{ $t('manage.grsl_reviewPass') }}</el-option>
                        <el-option :label="3">{{ $t('manage.grsl_reviewFail') }}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('manager.finance_openProject')+':'">
                    <el-select
                        v-model="form.remeberId"
                        clearable
                        :placeholder="$t('manager.hk_pleaseSelect')"
                    >
                        <el-option
                            v-for="item in project"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit" @click="search">{{ $t('commons.queryBtn') }}</el-button>
<!--                    <el-button type="primary" class="submit">{{ $t('commons.exportBtn') }}</el-button>-->
                </el-form-item>
            </el-form>
            <div class="flex-col">
                <el-table
                    :data="tableData"
                    size="small"
                    :span-method="objectSpanMethod"
                    border
                    height="100%"
                    header-row-class-name="default"
                >
                    <el-table-column
                        header-align="center"
                        prop="date"
                        :label="$t('manager.finance_payTime')"
                        width="120"
                    ></el-table-column>
                    <el-table-column
                        header-align="center"
                        prop="from"
                        :label="$t('manager.finance_source')"
                        width="120"
                    ></el-table-column>
                    <el-table-column
                        header-align="center"
                        prop="direct"
                        :label="$t('manager.finance_direction')"
                        width="120"
                    ></el-table-column>
                    <el-table-column
                        header-align="center"
                        prop="detailed"
                        :label="$t('manager.grsl_theDetail')"
                        width="120"
                    ></el-table-column>
                    <el-table-column
                        header-align="center"
                        prop="price"
                        :label="$t('manager.finance_price')"
                        width="120"
                    ></el-table-column>
                    <el-table-column
                        header-align="center"
                        prop="account"
                        :label="$t('manager.finance_account')"
                    ></el-table-column>
                    <el-table-column
                        header-align="center"
                        prop="record"
                        :label="$t('manager.finance_accoutRemark')"
                    ></el-table-column>
                    <el-table-column
                        header-align="center"
                        prop="examine"
                        :label="$t('manager.finance_auditRemark')"
                    ></el-table-column>
                    <el-table-column
                        header-align="center"
                        prop="examineStatus"
                        :label="$t('manager.grsl_reviewState')"
                        width="120"
                    ></el-table-column>
                    <el-table-column
                        header-align="center"
                        prop="time"
                        :label="$t('manager.finance_creatTime')"
                        width="140"
                    ></el-table-column>
                    <el-table-column header-align="center" :label="$t('commons.operating')" width="130">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                size="small"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                            ></el-button>
                            <el-button
                                type="text"
                                size="small"
                                icon="el-icon-delete"
                                @click="handleDelete(scope.$index, scope.row)"
                            ></el-button>
                            <el-button
                                type="text"
                                size="small"
                                @click="handleExamine(scope.$index, scope.row)"
                            >{{ $t('manager.grsl_audit') }}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        header-align="center"
                        :label="$t('manager.finance_credentials')"
                        width="100"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                size="small"
                                @click="create(scope.row)"
                            >{{ $t('manager.finance_proCredentials') }}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div
                    class="total"
                >{{ $t('manager.finance_income') + ':' }} {{ income }} {{ $t('manager.ps_japanYen') }}
                    {{ $t('manager.finance_spending') + ':' }}{{ expand }} {{ $t('manager.ps_japanYen') }}
                    {{ $t('manager.finance_profits') + ':' }}{{ profit }}{{ $t('manager.ps_japanYen') }}（{{ $t('manager.finance_only') }}）
                </div>
            </div>
        </el-card>
        <el-dialog
            top="0"
            :title="$t('manager.finance_resetAccount')"
            :visible.sync="editVisible"
            width="30%"
            :before-close="handleClose"
            class="editBox"
        >
            <el-form size="small" :model="edit" label-width="100px" :rules="editRule">
                <el-form-item :label="$t('manager.finance_account')+':'" prop="account">
                    <el-select v-model="edit.type" clearable :placeholder="$t('manager.hk_pleaseSelect')">
                        <el-option
                            v-for="item in account"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('manager.finance_theAmount')+':'" prop="price">
                    <el-input v-model="edit.price"></el-input>
                </el-form-item>
                <el-form-item :label="$t('boss.loginDetail_note')+':'" prop="remark">
                    <el-input type="textarea" v-model="edit.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">{{ $t('commons.cancel') }}</el-button>
                <el-button type="primary" class="submit" @click>{{ $t('commons.determine') }}</el-button>
            </div>
        </el-dialog>
        <el-dialog
            top="0"
            :title="$t('boss.grsl_audit')"
            :visible.sync="examineVisible"
            width="30%"
            :before-close="handleClose"
            class="editBox"
        >
            <el-form size="small" :model="examine" label-width="90px" :rules="examineRule">
                <el-form-item :label="$t('boss.grsl_audit')+':'" prop="account">
                    <el-radio-group v-model="examine.type">
                        <el-radio :label="1">{{ $t('manager.finance_pass') }}</el-radio>
                        <el-radio :label="0">{{ $t('manager.finance_notPass') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('boss.loginDetail_note')+':'" prop="remark">
                    <el-input type="textarea" v-model="examine.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="examineVisible = false">{{ $t('commons.cancel') }}</el-button>
                <el-button type="primary" class="submit" @click>{{ $t('commons.determine') }}</el-button>
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
            form: {
                monthTime: 1,
                accountId: "1",
                payment: "1",
                createStartTime: "",
                createEndTime: "",
                financialType: "1",
                auditStatus: "1",
                remeberId: "1",
            },
            type: [],
            account: [],
            direction: [],
            source: [],
            status: [],
            project: [],
            tableData: [],
            income: "49758695867.88",
            expand: "8937585.00",
            profit: "457889458.88",
            editVisible: false,
            examineVisible: false,
            edit: {account: "", price: 1, remark: ""},
            editRule: {
                account: [
                    {required: true, message: this.$t('commons.placeChoose'), trigger: "change"},
                ],
                price: [{required: true, message: this.$t('commons.mustInput'), trigger: "blur"}],
                remark: [{required: true, message: this.$t('desk.customer_inputRemark'), trigger: "blur"}],
            },
            examine: {type: 1, remark: ""},
            examineRule: {
                type: [
                    {required: true, message: this.$t('commons.placeChoose'), trigger: "change"},
                ],
                remark: [{required: true, message: this.$t('desk.customer_inputRemark'), trigger: "blur"}],
            },
        };
    },
    computed: {
        ...mapState({
            company: (state) => state.company,
        }),
    },
    mounted() {
        this.init();
        this.getAccountData();
    },
    methods: {
        init() {
            this.type = [{value: 1, label: this.$t('commons.all')}];
            this.account = [{value: 1, label: this.$t('commons.all')}];
            this.direction = [{value: 1, label: this.$t('commons.all')}];
            this.source = [{value: 1, label: this.$t('commons.all')}];
            this.status = [{value: 1, label: this.$t('commons.all')}];
            this.project = [{value: 1, label: this.$t('commons.all')}];
        },

        getAccountData() {
            const params = {
                monthTime: this.form.monthTime,
                accountId: this.form.accountId,
                payment: this.form.payment,
                createStartTime: this.form.createStartTime,
                createEndTime: this.form.createEndTime,
                financialType: this.form.financialType,
                auditStatus: this.form.auditStatus,
                remeberId: this.form.remeberId,
            };
            this.$F.doRequest(
                this,
                "/pms/orderanls/running_account_list",
                params,
                (res) => {
                    this.tableData = res.remeberSubList;
                }
            );
        },
        handleEdit(index, row) {
            this.editVisible = true;
            this.edit = row;
        },
        search() {
            this.getAccountData();
        },
        handleDelete(index, row) {
        },
        handleExamine(index, row) {
            this.examineVisible = true;
            this.examine = row;
        },

        objectSpanMethod({row, column, rowIndex, columnIndex}) {
            if (columnIndex === 0) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1,
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0,
                    };
                }
            }
        },
        handleClose() {
            this.editVisible = false;
            this.examineVisible = false;
        },
        create(item) {
            const params = {
                title: item.msg,
                subjectsId: item.accountId,
                debitAmount: item.payment == 1 ? item.amount : "",
                lenderAmount: item.payment == 2 ? item.amount : "",
                credentailTime: item.payTime,
                wordId: item.wordId,
                attachCount: item.attachCount,
                remeberSubId: item.remeberSubId,
                credentailId: item.credentailId,
            };
            this.$F.doRequest(
                this,
                "/pms/orderanls/running_account_list",
                params,
                (res) => {
                    this.tableData = res.remeberSubList;
                }
            );
        },
    },
};
</script>

<style lang="less">
.flex-col {
    flex: 1;
    display: flex;
    flex-direction: column;

    .total {
        margin-top: 10px;
    }
}
</style>
