<template>
    <div class="boss-index">
        <div class="content">
            <div class="btn-item">
                <div v-for="(item,index) in btnList" :key="index" class="btn-default" :class="currentIndex==item.id? 'btn-active':''" @click="changeTab(item)">
                    <div class="name">{{item.name}}</div>
                    <div class="num">{{item.num}}{{$t('manager.grsl_lonly')}}</div>
                </div>
            </div>
            <div class="into">
                <el-form class="term line demo-form-inline" v-model="form" inline size="small">
                    <el-form-item :label="$t('manager.grsl_wareType')+':'">
                        <el-select v-model="form.soteageType">
                            <el-option :label="$t('manager.grsl_procurementWarehousing')" value="1"></el-option>
                            <el-option :label="$t('manager.grsl_putIn')" value="2"></el-option>
                            <el-option :label="$t('manager.grsl_putOther')" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('manager.grsl_makingPeople')+':'">
                        <el-input v-model="form.creatorName"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('manager.grsl_applyDate')+':'">
                        <el-date-picker
                                type="date"
                                :placeholder="$t('commons.selectDate')"
                                v-model="form.startDate"
                        ></el-date-picker>
                        <span class="line">--</span>
                        <el-time-picker :placeholder="$t('manager.grsl_selectTime')" v-model="form.endDate"></el-time-picker>
                    </el-form-item>
                    <el-form-item :label="$t('manager.grsl_storageContent')+':'">
                        <el-input v-model="form.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit" @click="search">{{$t('commons.queryBtn')}}</el-button>
                        <el-button type="primary" class="grey" @click="reset">{{$t('commons.resetBtn')}}</el-button>
                    </el-form-item>
                </el-form>
                <div class="components-edit">
                    <el-table ref="multipleTable" :data="tableList" border height="100%" header-row-class-name="default" size="small">
                        <el-table-column prop="storeageNum" :label="$t('manager.grsl_orderNo')"></el-table-column>
                        <el-table-column prop="applyTime" :label="$t('manager.grsl_applyDate')"></el-table-column>
                        <el-table-column :label="$t('manager.grsl_wareType')">
                            <template slot-scope="scope">{{scope.row.soteageType == 1 ? $t('manage.grsl_procurementWarehousing') : scope.row.soteageType == 2 ? $t('manage.grsl_putIn') : $t('manage.grsl_putOther')}}</template>
                        </el-table-column>
                        <el-table-column prop="creatorName" :label="$t('manager.grsl_makingPeople')"></el-table-column>
                        <el-table-column :label="$t('boss.loginDetail_state')">
                            <template slot-scope="scope">{{scope.row.authStatus == 1 ? $t('manage.grsl_waiteReview') : scope.row.authStatus == 2 ? $t('manage.grsl_reviewPass') : $t('manage.grsl_reviewFail')}}</template>
                        </el-table-column>
                        <el-table-column :label="$t('commons.operating')" width="300">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="popup('detail', scope.row)">{{$t('manager.grsl_theDetail')}}</el-button>
                                <el-button type="text" size="small" @click="popup('change', scope.row)">{{$t('commons.modify')}}</el-button>
                                <el-button type="text" size="small" @click="popup('exam', scope.row)">{{$t('manager.grsl_audit')}}</el-button>
                                <el-popconfirm :title="$t('manager.grsl_sureDelete')+'？'" icon="el-icon-warning-outline" iconColor="#FF8C00" @onConfirm="handleDelete(scope.row)">
                                    <el-button slot="reference" type="text">{{$t('commons.delete')}}</el-button>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @current-change="handleCurrentChange" :current-page="pageForm.pageIndex" :page-size="pageForm.pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- 入库单明细 -->
        <el-dialog
                top="0"
                :title="$t('manager.grsl_entryDetail')"
                width="1000px"
                :visible.sync="entryDetailVisible"
                :close-on-click-modal="false"
        >
            <el-row :gutter="20" style="line-height: 30px;">
                <el-col :span="8" class="demo-form-inline">
                    <el-col :span="9" class="label">{{$t('manager.grsl_entryOrderNum')+':'}}</el-col>
                    <el-col :span="17">{{rowData.storesNum}}</el-col>
                </el-col>
                <el-col :span="8" class="demo-form-inline">
                    <el-col :span="9" class="label">{{$t('manager.grsl_wareType')+':'}}</el-col>
                    <el-col :span="17">{{rowData.soteageTypeDesc}}</el-col>
                </el-col>
                <el-col :span="8" class="demo-form-inline">
                    <el-col :span="9" class="label">{{$t('manager.grsl_applyDate')+':'}}</el-col>
                    <el-col :span="17">{{rowData.createTime}}</el-col>
                </el-col>
                <el-col :span="8" class="demo-form-inline">
                    <el-col :span="9" class="label">{{$t('manager.grsl_makingPeople')+':'}}</el-col>
                    <el-col :span="17">{{rowData.creatorName}}</el-col>
                </el-col>
                <el-col :span="8" class="demo-form-inline">
                    <el-col :span="9" class="label">{{$t('manager.grsl_reviewState')+':'}}</el-col>
                    <el-col :span="17">{{rowData.authStatusDesc}}</el-col>
                </el-col>
                <el-col :span="8" class="demo-form-inline">
                    <el-col :span="9" class="label">{{$t('manager.grsl_reviewTime')+':'}}</el-col>
                    <el-col :span="17">{{rowData.applyTime}}</el-col>
                </el-col>
                <el-col :span="8" class="demo-form-inline">
                    <el-col :span="9" class="label">{{$t('manager.grsl_reviewPeople')+':'}}</el-col>
                    <el-col :span="17">{{rowData.authorName}}</el-col>
                </el-col>
                <el-col :span="8" class="demo-form-inline">
                    <el-col :span="9" class="label">{{$t('manager.grsl_agent')}}:</el-col>
                    <el-col :span="17">{{rowData.agentName}}</el-col>
                </el-col>
                <el-col :span="8" class="demo-form-inline">
                    <el-col :span="9" class="label">{{$t('manager.grsl_treasuryNote')+':'}}</el-col>
                    <el-col :span="17">{{rowData.remark}}</el-col>
                </el-col>
                <el-col :span="8" class="demo-form-inline">
                    <el-col :span="9" class="label">{{$t('manager.grsl_reviewSuccest')+':'}}</el-col>
                    <el-col :span="17">{{rowData.authContent}}</el-col>
                </el-col>
            </el-row>
            <el-table
                    ref="multipleTable"
                    :data="goodsList"
                    border
                    height="100%"
                    header-row-class-name="default"
                    size="small"
            >
                <el-table-column prop="name" :label="$t('manager.grsl_goodsName')"></el-table-column>
                <el-table-column prop="costPrice" :label="$t('manager.grsl_costNoPrice')"></el-table-column>
                <el-table-column prop="inventoryCount" :label="$t('manager.grsl_rukuNum')"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
        <el-button @click="entryDetailVisible = false">{{$t('commons.close')}}</el-button>
      </span>
        </el-dialog>
        <!-- 修改商品入库 和库存管理修改库存一样 -->
        <el-dialog
                top="0"
                :title="$t('manager.grsl_resetEntryGoods')"
                width="800px"
                :visible.sync="changeInfoVisible"
                :close-on-click-modal="false"
        >
            <el-form :model="rowData" label-width="100px" class="demo-form-inline" inline size="small">
                <el-form-item :label="$t('manager.grsl_wareType')+':'" prop="name">
                    <el-select v-model="rowData.soteageType">
                        <el-option :label="$t('manager.grsl_procurementWarehousing')" value="1"></el-option>
                        <el-option :label="$t('manager.grsl_putIn')" value="2"></el-option>
                        <el-option :label="$t('manager.grsl_putOther')" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="form-inline-flex">
                    <el-button type="primary" @click="popup('addPi')">{{$t('manager.grsl_bulkAdd')}}</el-button>
                </el-form-item>
            </el-form>
            <el-table
                    ref="multipleTable"
                    :data="goodsList"
                    border
                    height="100%"
                    header-row-class-name="default"
                    size="small"
            >
                <el-table-column prop="name" :label="$t('manager.grsl_goodsName')"></el-table-column>
                <el-table-column prop="costPrice" :label="$t('manager.grsl_costNoPrice')"></el-table-column>
                <el-table-column :label="$t('manager.grsl_rukuNum')">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.inventoryCount" size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commons.operating')" width="100">
                    <template slot-scope="scope">
                        <el-popconfirm
                                :title="$t('manager.grsl_sureDelete')+'？'"
                                icon="el-icon-warning-outline"
                                iconColor="#FF8C00"
                                onConfirm="handleDelete(scope.row)"
                        >
                            <el-button slot="reference" size="small" type="text">{{$t('manager.grsl_move')}}</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-form :model="rowData" label-width="100px" inline size="small">
                <el-col :span="8">
                    <el-form-item :label="$t('manager.grsl_agent')+':'" prop="person">
                        <el-input v-model="rowData.agentName"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('manager.grsl_applyDate')+':'" prop="date">
                        <el-date-picker
                                v-model="rowData.createTime"
                                type="date"
                                :placeholder="$t('commons.selectDate')"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item :label="$t('manager.grsl_treasuryNote')+':'">
                        <el-input
                                type="textarea"
                                :rows="2"
                                :placeholder="$t('boss.department_placeEnterContent')"
                                v-model="rowData.remark"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changeInfoVisible = false">{{$t('commons.cancel')}}</el-button>
                <el-button type="primary" @click="changeInfoVisible = false">{{$t('commons.determine')}}</el-button>
            </div>
        </el-dialog>
        <!-- 入库审核 -->
        <el-dialog top="0" :title="$t('manager.grsl_warehousingAudit')" width="600px" :visible.sync="inHouseExamVisible" :close-on-click-modal="false">
            <el-form :model="examData" label-width="100px">
                <el-form-item :label="$t('manager.grsl_audit')+':'">
                    <el-radio-group v-model="examData.authStatus">
                        <el-radio :label="1">{{$t('manager.grsl_waiteReview')}}</el-radio>
                        <el-radio :label="2">{{$t('manager.grsl_reviewPass')}}</el-radio>
                        <el-radio :label="3">{{$t('manager.grsl_reviewFail')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('manager.grsl_audit')+':'">
                    <el-input type="textarea" :rows="4" :placeholder="$t('boss.department_placeEnterContent')" v-model="examData.authContent"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="inHouseExamVisible = false">{{$t('commons.cancel')}}</el-button>
                <el-button type="primary" @click="submit('exam')">{{$t('commons.determine')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageForm: {
                    pageIndex: 1,
                    pageSize: 10,
                    paging: true,
                },
                currentIndex: 1,
                btnList: [],
                form: {
                    soteageType: "",
                    creatorName: "",
                    startDate: "",
                    endDate: "",
                    content: "",
                },
                tableList: [],
                rowData: {
                    storesNum: "",
                    soteageType: "",
                    soteageTypeDesc: "",
                    createTime: "",
                    creatorName: "",
                    authStatusDesc: "",
                    applyTime: "",
                    authorName: "",
                    agentName: "",
                    remark: "",
                    authContent: "",
                },
                examData: {authStatus: 1, authContent: ""},
                entryDetailVisible: false,
                changeInfoVisible: false, //修改入库弹框
                batchAddVisible: false, //批量修改库存
                inHouseExamVisible: false, //入库审核
            };
        },
        props: {
            list: Array,
            goodsList: Array,
            category: Array,
            total: Number,
            initData: Function,
        },
        mounted() {
            this.getCountData();
            this.tableList = this.list.filter(
                (item) => (item.authStatus = this.currentIndex)
            );
        },
        computed: {
            waiteReviewOrder: {
                get() {
                    return this.$t("manager.grsl_waiteReviewOrder");
                },
                set() {
                },
            },

            orderPass: {
                get() {
                    return this.$t("manager.grsl_orderPass");
                },
                set() {
                },
            },

            orderFail: {
                get() {
                    return this.$t("manager.grsl_orderFail");
                },
                set() {
                },
            },

            procurementWarehousing: {
                get() {
                    return this.$t("manager.grsl_procurementWarehousing");
                },
                set() {
                },
            },

            putIn: {
                get() {
                    return this.$t("manager.grsl_putIn");
                },
                set() {
                },
            },

            putOther: {
                get() {
                    return this.$t("manager.grsl_putOther");
                },
                set() {
                },
            },

            waiteReview: {
                get() {
                    return this.$t("manager.grsl_waiteReview");
                },
                set() {
                },
            },

            reviewPass: {
                get() {
                    return this.$t("manager.grsl_reviewPass");
                },
                set() {
                },
            },
            reviewFail: {
                get() {
                    return this.$t("manager.grsl_reviewFail");
                },
                set() {
                },
            },
            deleteSuccess: {
                get() {
                    return this.$t("manager.hk_deleteSuccess");
                },
                set() {
                },
            },
        },
        watch: {
            waiteReviewOrder(newValue, oldValue) {
                this.waiteReviewOrder = newValue;
            },

            orderPass(newValue, oldValue) {
                this.orderPass = newValue;
            },

            orderFail(newValue, oldValue) {
                this.orderFail = newValue;
            },

            procurementWarehousing(newValue, oldValue) {
                this.procurementWarehousing = newValue;
            },

            putIn(newValue, oldValue) {
                this.putIn = newValue;
            },

            putOther(newValue, oldValue) {
                this.putOther = newValue;
            },

            waiteReview(newValue, oldValue) {
                this.waiteReview = newValue;
            },

            reviewPass(newValue, oldValue) {
                this.reviewPass = newValue;
            },
            reviewFail(newValue, oldValue) {
                this.reviewFail = newValue;
            },
            deleteSuccess(newValue, oldValue) {
                this.deleteSuccess = newValue;
            },
        },

        methods: {
            getCountData() {
                this.btnList = [];
                this.$F.doRequest(this, "/pms/hotelstorage/countbystate", {}, (res) => {
                    for (let i in res) {
                        const obj = {name: "", id: i, num: res[i]};
                        if (i == 1) {
                            obj.name = this.waiteReviewOrder;
                        } else if (i == 2) {
                            obj.name = this.orderPass;
                        } else {
                            obj.name = this.orderFail;
                        }
                        this.btnList.push(obj);
                    }
                });
            },
            popup(type, row) {
                if (row.soteageType == 1) {
                    row.soteageTypeDesc = this.procurementWarehousing;
                } else if (row.soteageType == 2) {
                    row.soteageTypeDesc = this.putIn;
                } else {
                    row.soteageTypeDesc = this.putOther;
                }
                if (row.authStatus == 1) {
                    row.authStatusDesc = this.waiteReview;
                } else if (row.authStatus == 2) {
                    row.authStatusDesc = this.reviewPass;
                } else {
                    row.authStatusDesc = this.reviewFail;
                }
                switch (type) {
                    case "detail":
                        this.entryDetailVisible = true;
                        this.rowData = row;
                        break;
                    case "change":
                        this.changeInfoVisible = true;
                        this.rowData = row;
                        break;
                    case "addPi":
                        this.batchAddVisible = true;
                        break;
                    case "exam":
                        this.inHouseExamVisible = true;
                        break;
                }
            },
            // 切换
            changeTab(item) {
                this.currentIndex = item.id;
                this.tableList = this.list.filter(
                    (item) => (item.authStatus = this.currentIndex)
                );
            },
            search() {
                this.initData(this.pageForm, this.currentIndex, this.form.soteageType, this.form.creatorName, this.form.startDate, this.form.endDate, this.form.content);
            },
            reset() {
                this.form = {soteageType: "", creatorName: "", startDate: "", endDate: "", content: "",};
                this.initData(this.pageForm, this.currentIndex)
            },
            handleCurrentChange(val) {
                this.pageForm.pageIndex = val;
                this.initData(this.pageForm, this.currentIndex, this.form.soteageType, this.form.creatorName, this.form.startDate, this.form.endDate, this.form.content);
            },
            handleDelete(row) {
                this.$F.doRequest(this, "/pms/hotelstorage/delete", row.id, (res) => {
                    this.$message.success(this.deleteSuccess);
                    this.initData(this.pageForm, this.currentIndex, this.form.soteageType, this.form.creatorName, this.form.startDate, this.form.endDate, this.form.content);
                });
            },
            submit(type) {
                if (type == "exam") {
                    this.$F.doRequest(this, "/pms/hotelstorage/approval", this.examData, (res) => {
                        this.$message.success("success");
                        this.initData(this.pageForm, this.currentIndex, this.form.soteageType, this.form.creatorName, this.form.startDate, this.form.endDate, this.form.content);
                    });
                }
            },
        },
    };
</script>

<style lang="less" scoped>
    .btn-item {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin-bottom: 20px;

        .btn-default {
            flex: 1;
            line-height: 30px;
            background: #f8f8f8;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 30px 20px;

            & + .btn-default {
                margin-left: 20px;
            }

            .num {
                color: #126eff;
                font-weight: bolder;
            }
        }

        .btn-active {
            background-image: linear-gradient(to right, #29a7ff 0%, #126eff 100%);
            color: #ffffff;
            box-shadow: 5px 5px 20px #b3d1ff;

            .num {
                color: #fff;
            }
        }

        .btn-default:active {
            background-color: darken(#126eff, 10%);
        }
    }

    .into {
        flex: 1;
        display: flex;
        flex-direction: column;

        .label {
            color: #898b8e;
        }
    }
</style>
