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
                        <el-date-picker type="date" :placeholder="$t('commons.selectDate')" v-model="form.startDate"></el-date-picker>
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
                            <template slot-scope="scope">{{scope.row.soteageType == 1 ? $t('manager.grsl_procurementWarehousing') : scope.row.soteageType == 2 ? $t('manager.grsl_putIn') : $t('manager.grsl_putOther')}}</template>
                        </el-table-column>
                        <el-table-column prop="creatorName" :label="$t('manager.grsl_makingPeople')" width="160"></el-table-column>
                        <el-table-column :label="$t('boss.loginDetail_state')" width="160">
                            <template slot-scope="scope">{{scope.row.authStatus == 1 ? $t('manager.grsl_waiteReview') : scope.row.authStatus == 2 ? $t('manager.grsl_reviewPass') : $t('manager.grsl_reviewFail')}}</template>
                        </el-table-column>
                        <el-table-column :label="$t('commons.operating')" width="200">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="popup('detail', scope.row)">{{$t('manager.grsl_theDetail')}}</el-button>
                                <el-button type="text" v-if="scope.row.authStatus == 1" size="small" @click="popup('change', scope.row)">{{$t('commons.modify')}}</el-button>
                                <el-button type="text" v-if="scope.row.authStatus == 1" size="small" @click="popup('exam', scope.row)">{{$t('manager.grsl_audit')}}</el-button>
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
        <el-dialog top="0" :title="$t('manager.grsl_entryDetail')" width="1000px" :visible.sync="entryDetailVisible" :close-on-click-modal="false">
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
                    <el-col :span="17">{{rowData.updateTime}}</el-col>
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
            <el-table ref="multipleTable" :data="detailChildList" border height="100%" style="min-height: 300px" header-row-class-name="default" size="small">
                <el-table-column prop="goodsName" :label="$t('manager.grsl_goodsName')"></el-table-column>
                <el-table-column prop="costPrice" :label="$t('manager.grsl_costNoPrice')"></el-table-column>
                <el-table-column prop="goodsCount" :label="$t('manager.grsl_rukuNum')"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="entryDetailVisible = false">{{$t('commons.close')}}</el-button>
            </div>
        </el-dialog>
        <!-- 修改商品入库 和库存管理修改库存一样 -->
        <el-dialog top="0" :title="$t('manager.grsl_resetEntryGoods')" width="1000px" :visible.sync="changeInfoVisible" :close-on-click-modal="false" class="into_audit">
            <el-form :model="rowData" label-width="100px" class="demo-form-inline" inline size="small">
                <el-form-item :label="$t('manager.grsl_wareType')+':'" prop="name">
                    <el-select v-model="rowData.soteageType">
                        <el-option :label="$t('manager.grsl_procurementWarehousing')" :value="1"></el-option>
                        <el-option :label="$t('manager.grsl_putIn')" :value="2"></el-option>
                        <el-option :label="$t('manager.grsl_putOther')" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="form-inline-flex">
                    <el-button class="submit" type="primary" @click="popup('addPi')">{{$t('manager.grsl_bulkAdd')}}</el-button>
                </el-form-item>
            </el-form>
            <el-card shadow="never">
                <el-table ref="multipleTable" :data="realDetailList" border height="100%" header-row-class-name="default" size="small">
                    <el-table-column prop="name" :label="$t('manager.grsl_goodsName')"></el-table-column>
                    <el-table-column prop="costPrice" :label="$t('manager.grsl_costNoPrice')"></el-table-column>
                    <el-table-column :label="$t('manager.grsl_rukuNum')">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.inventoryCount" size="small"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('commons.operating')" width="100">
                        <template slot-scope="scope">
                            <el-popconfirm :title="$t('manager.grsl_sureDelete')+'？'" icon="el-icon-warning-outline" iconColor="#FF8C00" @onConfirm="Delete(scope.row)">
                                <el-button slot="reference" size="small" type="text">{{$t('manager.grsl_move')}}</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <el-form :model="rowData" size="small" ref="goodInForm" label-width="100px">
                <el-col :span="8">
                    <el-form-item :label="$t('manager.grsl_agent')+':'" prop="person">
                        <el-input v-model="rowData.agentName"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('manager.grsl_applyDate')+':'" prop="date">
                        <el-date-picker v-model="rowData.createTime" type="date" :placeholder="$t('commons.selectDate')"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item :label="$t('manager.grsl_treasuryNote')+':'">
                        <el-input type="textarea" :rows="2" :placeholder="$t('boss.department_placeEnterContent')" v-model="rowData.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changeInfoVisible = false">{{$t('commons.cancel')}}</el-button>
                <el-button type="primary" @click="submit('edit')">{{$t('commons.determine')}}</el-button>
            </div>
        </el-dialog>
        <!-- 批量添加商品 -->
        <el-dialog top="0" :title="$t('manager.grsl_bulkAdd')" width="1000px" :visible.sync="batchAddVisible" :close-on-click-modal="false">
            <div class="components-edit">
                <el-table ref="multipleTable" :data="goodsList" tooltip-effect="dark" height="250px" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" @selection-change="addSelection">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="name" :label="$t('manager.grsl_goodsName')"></el-table-column>
                    <el-table-column prop="categoryName" :label="$t('manager.grsl_goodsKind')"></el-table-column>
                    <el-table-column prop="costPrice" :label="$t('manager.grsl_costNoPrice')"></el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination @current-change="currentChange" :current-page="pageForm.pageIndex" :page-size="pageForm.pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addGoodsVisible = false">{{$t('commons.cancel')}}</el-button>
                <el-button type="primary" @click="submit('batchIn')">{{$t('commons.determine')}}</el-button>
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
                detailChildList: [],realDetailList: [],
                addGoodsSec: []
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
            // this.getCountData();
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
                if (type == 'exam') {
                    this.examData = {id: row.id, authStatus: row.authStatus, authContent: row.authContent};
                    this.inHouseExamVisible = true;
                } else if(type == 'detail') {
                    this.entryDetailVisible = true;
                    this.detail(row)
                } else if(type == 'change') {
                    this.changeInfoVisible = true;
                    this.detail(row)
                } else if(type == 'addPi') {
                    this.batchAddVisible = true;
                }
            },
            //详情
            detail(row) {
                this.$F.doRequest(this, "/pms/hotelstorage/findone", {id: row.id}, (res) => {
                    if (res.data.soteageType == 1) {
                        res.data.soteageTypeDesc = this.procurementWarehousing;
                    } else if (res.data.soteageType == 2) {
                        res.data.soteageTypeDesc = this.putIn;
                    } else {
                        res.data.soteageTypeDesc = this.putOther;
                    }
                    if (res.data.authStatus == 1) {
                        res.data.authStatusDesc = this.waiteReview;
                    } else if (res.data.authStatus == 2) {
                        res.data.authStatusDesc = this.reviewPass;
                    } else {
                        res.data.authStatusDesc = this.reviewFail;
                    }
                    this.rowData = res.data;
                    this.detailChildList = res.childlist;
                });
            },
            addSelection(val) {
                this.addGoodsSec = val;
            },
            // 切换
            changeTab(item) {
                this.currentIndex = item.id;
                this.tableList = this.list.filter(
                    (item) => (item.authStatus == this.currentIndex)
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
            currentChange(val) {
                this.pageForm.pageIndex = val;
                this.initData(this.pageForm, this.currentIndex, this.form.soteageType, this.form.creatorName, this.form.startDate, this.form.endDate, this.form.content);
            },
            handleDelete(row) {
                this.$F.doRequest(this, "/pms/hotelstorage/delete", {id: row.id}, (res) => {
                    this.$message.success(this.deleteSuccess);
                    this.initData(this.pageForm, this.currentIndex, this.form.soteageType, this.form.creatorName, this.form.startDate, this.form.endDate, this.form.content);
                    this.getCountData()
                });
            },
            Delete(row){
                this.realDetailList = this.realDetailList.filter(i => i.id != row.id);
            },
            submit(type) {
                if (type == "exam") {
                    this.$F.doRequest(this, "/pms/hotelstorage/approval", this.examData, (res) => {
                        this.$message.success("success");
                        this.initData(this.pageForm, this.currentIndex, this.form.soteageType, this.form.creatorName, this.form.startDate, this.form.endDate, this.form.content);
                        this.tableList = this.list.filter(
                            (item) => (item.authStatus = this.currentIndex)
                        );
                        this.inHouseExamVisible = false;
                        this.getCountData();
                    });
                } else if (type == 'batchIn') {
                    this.realDetailList = this.addGoodsSec;
                    this.batchAddVisible = false;
                } else if(type == 'edit') {
                    const content = [];
                    this.realDetailList.map((item) => {
                        let obj = {
                            goodsId: item.id,
                            costPrice: item.costPrice,
                            goodsCount: item.inventoryCount,
                        };
                        content.push(obj);
                    });
                    const params = {
                        id: this.rowData.id,
                        soteageType: this.rowData.soteageType,
                        agentName: this.rowData.agentName,
                        applyTime: this.rowData.applyTime,
                        remark: this.rowData.remark,
                        content: JSON.stringify(content),
                    };
                    this.$F.doRequest(
                        this,
                        "/pms/hotelstorage/applyStorage",
                        params,
                        (res) => {
                            this.changeInfoVisible = false;
                            this.initData(this.pageForm, this.currentIndex, this.form.soteageType, this.form.creatorName, this.form.startDate, this.form.endDate, this.form.content);
                        }
                    );
                }
            },
        },
    };
</script>

<style lang="scss">
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

    .into_audit {
        .el-dialog__body {
            display: flex;
            flex-direction: column;
        }

        .el-card {
            border: 1px solid #c2c2c2;
            margin-bottom: 20px;

            .el-table {
                min-height: 200px;
                max-height: 400px;
            }
        }
    }
</style>
