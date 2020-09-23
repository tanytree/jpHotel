<template>
    <div class="boss-index">
        <!--商品管理-->
        <div class="content" v-if="tab_show">
            <el-form class="term line demo-form-inline" v-model="form" inline size="small">
                <el-form-item :label="$t('manager.grsl_goodsName')+':'">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('manager.grsl_goodsState')+':'">
                    <el-select v-model="form.status">
                        <el-option :label="$t('commons.enable')" :value="1"></el-option>
                        <el-option :label="$t('commons.disable')" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('manager.grsl_goodsType')+':'">
                    <el-cascader v-model="form.category" :options="category" :props="categoryProps" @change="casChange"></el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit" @click="search">{{$t('commons.queryBtn')}}</el-button>
                    <el-button class="grey" @click="reset">{{$t('commons.resetBtn')}}</el-button>
                </el-form-item>
                <el-form-item class="form-inline-flex">
                    <el-row class="form-inline-flex">
                        <el-button class="white" @click="downModel('dynamicValidateForm')">{{$t('commons.downloadTemplate')}}</el-button>
                        <el-upload class="button_upload" ref="upload" action="123" :limit="1" :http-request='importModel'>
                            <el-button class="white">{{$t('manager.grsl_import')}}</el-button>
                        </el-upload>
                        <el-button @click="popup('add')" class="submit">{{$t('manager.grsl_addGoods')}}</el-button>
                    </el-row>
                </el-form-item>
            </el-form>
            <div class="components-edit">
                <el-table ref="multipleTable" :data="list" border height="100%" header-row-class-name="default" size="small">
                    <el-table-column prop="name" :label="$t('manager.grsl_goodsName')"></el-table-column>
                    <el-table-column prop="retailPrice" :label="$t('manager.grsl_defaultTetailPrice')"></el-table-column>
                    <el-table-column prop="costPrice" :label="$t('manager.grsl_costPrice')"></el-table-column>
                    <el-table-column prop="inventoryWarning" :label="$t('manager.grsl_warningQuantity')"></el-table-column>
                    <el-table-column :label="$t('commons.operating')" width="350">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" :disabled="scope.row.status == 2" @click="popup('bin', scope.row)">{{scope.row.state == 1 ? $t('commons.disable') : $t('commons.enable')}}</el-button>
                            <el-button type="text" size="small" :disabled="scope.row.status == 2" @click="popup('change', scope.row)">{{$t('commons.modify')}}</el-button>
                            <el-popconfirm v-if="scope.row.status == 1" :title="$t('manager.grsl_sureDelete')+'？'" icon="el-icon-warning-outline" iconColor="#FF8C00" @onConfirm="handleDelete(scope.row)">
                                <el-button slot="reference" type="text">{{$t('commons.delete')}}</el-button>
                            </el-popconfirm>
                            <el-button v-if="scope.row.status == 2" type="text" size="small" disabled>{{$t('manager.grsl_hasFailure')}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination @current-change="currentChange" :current-page="pageForm.pageIndex" :page-size="pageForm.pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
                </div>
            </div>
        </div>
        <div class="content" v-if="!tab_show">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>
                    <a @click="back">{{$t('manager.grsl_goodsManagerment')}}</a>
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{$t('manager.grsl_resetGoods')}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form :model="rowData" size="small" :rules="threerules" ref="rowForm" label-width="100px">
                <el-col :span="8">
                    <el-form-item :label="$t('manager.grsl_goodsName')+':'" prop="name">
                        <el-input v-model="rowData.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('manager.grsl_belongType')+':'" prop="categoryId">
                        <el-cascader v-model="rowData.categoryId" :options="category" :props="categoryProps" @change="casChange"></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item :label="$t('manager.grsl_goodsDescription')+':'">
                        <el-input type="textarea" :rows="3" v-model="rowData.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <div class="flex_1">
                <el-form :model="rowData" size="small" inline :rules="threerules" ref="priceForm" label-position="top" class="price">
                    <el-form-item prop="retailPrice" :label="$t('manager.grsl_defaultNoPrice')">
                        <el-input v-model="rowData.retailPrice" class="row-width"></el-input>
                    </el-form-item>
                    <el-form-item prop="costPrice" :label="$t('manager.grsl_costNoPrice')">
                        <el-input v-model="rowData.costPrice" class="row-width"></el-input>
                    </el-form-item>
                    <el-form-item prop="employeePrice" :label="$t('manager.grsl_defaultEmployeePrice')">
                        <el-input v-model="rowData.employeePrice" class="row-width"></el-input>
                    </el-form-item>
                    <el-form-item prop="buyCount" :label="$t('manager.grsl_defaultBuyNum')">
                        <el-input v-model="rowData.buyCount" class="row-width"></el-input>
                    </el-form-item>
                    <el-form-item prop="inventoryWarning" :label="$t('manager.grsl_warningQuantity')">
                        <el-input v-model="rowData.inventoryWarning" class="row-width"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class="footer">
                <el-button type="primary" v-if="edit" size="small" class="submit" @click="submit">{{$t('commons.modify')}}
                </el-button>
                <el-button type="primary" v-if="!edit" size="small" class="submit" @click="submit">{{$t('manager.grsl_saveAndAdd')}}
                </el-button>
                <el-button size="small" class="cancel" @click="back">{{$t('commons.back')}}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageForm: {
                    pageIndex: 1,
                    pageSize: 10,
                    paging: true
                },
                form: {
                    name: "",
                    status: "",
                    category: [],
                },
                categoryProps: {value: "id", label: "name", children: "child"},
                rowData: {
                    name: "",
                    categoryId: "",
                    remark: "",
                    retailPrice: "",
                    costPrice: "",
                    employeePrice: "",
                    buyCount: "",
                    inventoryWarning: "",
                },
                threerules: {
                    name: [{required: true, message: "请输入产品名称", trigger: "blur"}],
                    categoryId: [
                        {required: true, message: "请选择产品分类", trigger: "change"},
                    ],
                    retailPrice: [
                        {required: true, message: "请输入产品零售价", trigger: "blur"},
                    ],
                    costPrice: [
                        {required: true, message: "请输入产品成本价", trigger: "blur"},
                    ],
                    employeePrice: [
                        {required: true, message: "请输入产品员工价", trigger: "blur"},
                    ],
                    buyCount: [
                        {required: true, message: "请输入产品购买数量", trigger: "blur"},
                    ],
                    inventoryWarning: [
                        {required: true, message: "请输入产品预警数量", trigger: "blur"},
                    ],
                },
                tab_show: true,
                edit: true,
            };
        },
        props: {
            list: Array,
            category: Array,
            total: Number,
            initData: Function,
        },
        mounted() {
        },
        computed: {
            downloadSuccessful: {
                get() {
                    return this.$t("manager.grsl_downloadSuccessful");
                },
                set() {
                },
            },

            importSuccess: {
                get() {
                    return this.$t("manager.grsl_importSuccess");
                },
                set() {
                },
            },
        },
        watch: {
            downloadSuccessful(newValue, oldValue) {
                this.downloadSuccessful = newValue;
            },
            importSuccess(newValue, oldValue) {
                this.importSuccess = newValue;
            },
        },
        methods: {
            search() {
                this.initData(this.pageForm, this.form.name, this.form.category, this.form.status);
            },
            reset() {
                this.form = {name: "", status: "", category: ""};
                this.initData(this.pageForm, '', '', '');
            },
            casChange(value) {
                if(this.tab_show) {
                    this.form.category = value[value.length - 1];
                } else {
                    this.rowData.categoryId = value[value.length - 1];
                }

            },
            hideRow({row, rowIndex}) {
                if (row.status !== 1) {
                    return {display: "none"};
                }
            },
            popup(type, row) {
                if (type == "add") {
                    this.edit = false;
                    this.tab_show = false;
                } else if (type == "bin") {
                    this.$F.doRequest(
                        this,
                        "/pms/hotelgoods/up_status",
                        {
                            id: row.id,
                            state: row.state == 1 ? 2 : 1,
                        },
                        (res) => {
                            this.$message.success("success");
                            this.initData();
                        }
                    );
                } else if (type == "change") {
                    this.edit = true;
                    this.tab_show = false;
                    this.rowData = row;
                }
            },
            //切换到商品管理
            back() {
                this.tab_show = true;
                this.initData(this.pageForm, this.form.name, this.form.category, this.form.status);
            },
            submit() {
                const param = {
                    name: this.rowData.name,
                    categoryId: this.rowData.categoryId,
                    remark: this.rowData.remark,
                    retailPrice: this.rowData.retailPrice,
                    costPrice: this.rowData.costPrice,
                    employeePrice: this.rowData.employeePrice,
                    buyCount: this.rowData.buyCount,
                    inventoryWarning: this.rowData.inventoryWarning,
                };
                if (this.edit) {
                    param.id = this.rowData.id;
                }
                this.$F.doRequest(this, "/pms/hotelgoods/edit", param, (res) => {
                    this.initData(this.pageForm, this.form.name, this.form.category, this.form.status);
                    if (this.edit) {
                        this.tab_show = true;
                    } else {
                        this.tab_show = false;
                        this.rowData = {
                            name: "",
                            categoryId: "",
                            remark: "",
                            retailPrice: "",
                            costPrice: "",
                            employeePrice: "",
                            buyCount: "",
                            inventoryWarning: "",
                        };
                    }
                });
            },
            currentChange(val) {
                this.pageForm.pageIndex = val;
                this.initData(this.pageForm, this.form.name, this.form.category, this.form.status);
            },
            downModel() {
                // this.$F.doRequest(this, "/pms/hotelgoods/download", {}, (res) => {
                //     this.$message.success(this.downloadSuccessful);
                // });
                this.$F.commons.downloadTemplate("/pms/hotelgoods/download");
            },
            importModel(params) {
                var a = this;

                this.$F.doRequest(this, "/pms/hotelgoods/upload", {filename: params.file.name}, (res) => {
                    // if(res.code > 0) {
                    //     params.onSuccess(res.message + '上传成功');
                    // } else {
                    //     a.$message.error(data.message);
                    //     a.$refs.upload.uploadFiles = [];
                    // }
                    this.$message.success(this.importSuccess);
                });
            },
            handleDelete(row) {
                this.$F.doRequest(
                    this,
                    "/pms/hotelgoods/up_status",
                    {
                        id: row.id,
                        state: "",
                    },
                    (res) => {
                        this.$message.success("success");
                        this.initData(this.pageForm, this.form.name, this.form.category, this.form.status);
                    }
                );
            },
        },
    };
</script>

<style lang="less">
    .row-width {
        width: 120px;
    }

    .content {
        height: 100%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;

        .components-edit {
            display: flex;
            flex-direction: column;
            flex: 1;

            .block {
                display: flex;
                align-items: center;
            }
        }

        .button_upload {
            margin: 0 10px;
            height: 35px;

            .el-upload-list {
                display: none;
            }
        }

        .footer {
            padding-top: 20px;
            border-top: 1px solid #e2e2e2;
        }
    }
</style>
