<template>
    <div class="boss-index">
        <el-tabs v-model="activeName" @tab-click="changeTab" class="tabCenter">
            <el-tab-pane :label="$t('manager.hp_patternsSuccession')" name="handover">
                <div class="content">
                    <div class="manage">
                        <div class="manage-item" v-for="(item, index) in handData" :key="index">
                            <div class="handTitle">
                                <span class="square"></span>
                                {{item.handoverType == 1 ? $t('manager.hp_deskDepartment') : item.handoverType == 2 ? $t('manager.hp_foodDepartment') : $t('manager.hp_storeDepartment')}}{{$t('manager.hp_setSuccession')}}
                            </div>
                            <el-form size="small" inline label-position="left">
                                <div>
                                    <el-form-item :label="$t('manager.hp_patternsSuccession')+':'">
                                        <el-radio-group v-model="item.handoverStatus">
                                            <el-radio :label="1">{{$t('manager.hp_cashModel')}}</el-radio>
                                            <el-radio :label="2">{{$t('manager.hp_paidModel')}}</el-radio>
                                            <el-radio :label="3">{{$t('manager.hp_accountsModel')}}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item :label="$t('manager.hp_locker')+':'" v-if="item.handoverStatus == 1">
                                        <el-input v-model="item.pettyCash">
                                            <template slot="append">{{$t('manager.ps_japanYen')}}</template>
                                        </el-input>
                                    </el-form-item>
                                </div>
                                <el-form-item :label="$t('manager.hp_modelSpecification')+':'" class="inline">
                                    <el-input type="textarea" resize="none" :rows="3" v-model="item.remark"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="footer">
                        <el-button type="primary" class="submit" @click="submit('hand')">{{$t('commons.save')}}</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('manager.hp_flightManagement')" name="handManage">
                <div class="content">
                    <div class="demo-form-inline">
                        <el-radio-group v-model="handType.id" size="small" @change="radioChange">
                            <el-radio-button v-for="(item, index) in handData" :key="index" :label="item.id">{{item.handoverType == 1 ? $t('manager.hp_deskDepartment') : item.handoverType == 2 ? $t('manager.hp_foodDepartment') : $t('manager.hp_storeDepartment')}}{{$t('manager.hp_shift')}}
                            </el-radio-button>
                        </el-radio-group>
                        <el-button type="primary" class="submit" size="small" @click="popup_thing">{{$t('commons.newAdd')}}</el-button>
                    </div>
                    <el-table ref="multipleTable" :data="manageData" border height="100%" header-row-class-name="default" size="small" v-loading="loading">
                        <el-table-column prop="name" :label="$t('manager.hp_shiftName')"></el-table-column>
                        <el-table-column prop="startTime" :label="$t('manager.hp_startTime')"></el-table-column>
                        <el-table-column prop="endTime" :label="$t('manager.hp_endTime')"></el-table-column>
                        <el-table-column :label="$t('commons.operating')" width="150">
                            <template slot-scope="scope">
                                <el-button
                                        type="text"
                                        size="small"
                                        @click="popup_thing(scope.row)"
                                >{{$t("manager.hp_editor")}}
                                </el-button>
                                <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="onConfirm(scope.row)">
                                    <el-button slot="reference" type="text" size="small">{{$t('commons.delete')}}</el-button>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @current-change="currentChange" :current-page="pageForm.pageIndex" :page-size="pageForm.pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
                    </div>
                </div>
                <el-dialog top="0" :title="addTypeTitle" :visible.sync="addTypeVisible" :close-on-click-modal="false">
                    <el-form :model="typeData" label-width="100px" class="demo-ruleForm">
                        <el-form-item :label="$t('manager.hp_shiftName')" prop="name">
                            <el-input v-model="typeData.name"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('manager.hp_startTime')" prop="startTime">
                            <el-time-select v-model="typeData.startTime" format="HH:mm" value-format="HH:mm" :picker-options="{start: '00:00', end: '24:00'}"></el-time-select>
                        </el-form-item>
                        <el-form-item :label="$t('manager.hp_endTime')" prop="endTime">
                            <el-time-select v-model="typeData.endTime" format="HH:mm" value-format="HH:mm" :picker-options="{start: '00:00', end: '24:00', minTime: typeData.startTime}"></el-time-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button class="white" @click="addTypeVisible = false">{{$t('commons.cancel')}}</el-button>
                        <el-button class="submit" type="primary" @click="saveInfo">{{$t('commons.determine')}}</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeName: "handover",
                handType: {},
                pageForm: {
                    pageIndex: 1,
                    pageSize: 10,
                    paging: true,
                },
                loading: false,
                total: 0,
                manageData: [],
                addTypeVisible: false,
                typeData: {},
                addTypeTitle: "",
            };
        },
        props: {
            handData: Array,
            initData: Function,
        },
        computed: {
            editore: {
                get() {
                    return this.$t("manager.hp_editor");
                },
                set() {
                },
            },
            newAdd: {
                get() {
                    return this.$t("commons.newAdd");
                },
                set() {
                },
            },
            saveSuccess: {
                get() {
                    return this.$t("commons.saveSuccess");
                },
                set() {
                },
            },
        },
        watch: {
            editore(newValue, oldValue) {
                this.editore = newValue;
            },
            newAdd(newValue, oldValue) {
                this.newAdd = newValue;
            },
            saveSuccess(newValue, oldValue) {
                this.saveSuccess = newValue;
            },
        },
        methods: {
            changeTab(tab) {
                if (this.activeName == "handover") {
                    this.initData();
                } else {
                    this.handType = this.$F.deepClone(this.handData[0]);
                    this.getDamageData();
                }
            },
            radioChange(val) {
                this.handType = this.$F.deepClone(
                    this.handData.find((item) => item.id === val)
                );
                this.getDamageData();
            },
            getDamageData() {
                const params = {
                    handoverType: this.handType.handoverType,
                };
                this.$F.merge(params, this.pageForm);
                this.$F.doRequest(this, "/pms/handoverlog/list", params, (res) => {
                    this.manageData = res.list;
                    this.pageForm = {
                        pageIndex: res.page.pageIndex,
                        pageSize: res.page.pageSize,
                        paging: true,
                    };
                    this.total = res.page.count;
                });
            },
            popup_thing(row) {
                this.addTypeVisible = true;
                if (row.id) {
                    this.typeData = row;
                    this.addTypeTitle = this.editore;
                } else {
                    this.typeData = {name: "", startTime: "", endTime: ""};
                    this.addTypeTitle = this.newAdd;
                }
            },
            saveInfo() {
                const params = {
                    id: this.typeData.id,
                    name: this.typeData.name,
                    handoverType: this.handType.handoverType,
                    startTime: this.typeData.startTime,
                    endTime: this.typeData.endTime,
                };
                this.$F.doRequest(this, "/pms/handoverlog/edit", params, (res) => {
                    this.addTypeVisible = false;
                    this.getDamageData();
                });
            },
            popup_kinds() {
                this.dialogAdd_kinds = true;
            },
            currentChange(val) {
                this.pageForm.pageIndex = val;
                this.getDamageData()
            },
            onConfirm(row) {
                this.$F.doRequest(
                    this,
                    "/pms/handoverlog/delete",
                    {id: row.id},
                    (res) => {
                        this.getDamageData();
                    }
                );
            },
            submit(type) {
                if (type == "hand") {
                    let arr = [];
                    // debugger
                    // this.handData.map(item => {
                    // 	const obj = {handoverStatus: item.handoverStatus, pettyCash: item.pettyCash, handoverType: item.handoverType}
                    // 	arr.push(obj);
                    // })
                    const params = {
                        content: JSON.stringify(this.handData),
                    };
                    this.$F.doRequest(this, "/pms/handover/edit", params, (res) => {
                        this.initData();
                        this.$message({message: this.saveSuccess, type: "success"});
                    });
                } else {
                }
            },
        },
    };
</script>

<style lang="scss">
    .tabCenter {
        padding: 10px;

        .content {
            height: 100%;
            display: flex;
            flex-direction: column;

            .demo-form-inline {
                justify-content: space-between;
                margin-bottom: 20px;
            }

            .manage {
                flex: 1;
                height: 0;
                overflow: auto;

                .handTitle {
                    color: #1e1e1e;
                    margin-bottom: 12px;

                    .square {
                        height: 13px;
                        width: 3px;
                        border-radius: 5px;
                        background: #126eff;
                        display: inline-block;
                        margin-right: 10px;
                    }
                }

                .el-form-item.inline {
                    width: 100%;
                    margin-right: 0;

                    .el-form-item__content {
                        width: 1000px;
                    }
                }
            }

            .footer {
                border-top: 1px solid #e2e2e2;
                line-height: 60px;
                padding: 0 20px;
            }
        }
    }
</style>
