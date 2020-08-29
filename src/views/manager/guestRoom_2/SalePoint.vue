<template>
    <div class="boss-index">
        <div class="content">
            <div class="radioBox">
                <el-radio-group v-model="sellId" size="medium" @change="changePoint">
                    <el-radio-button :label="item.id" v-for="(item, index) in salePoint" :disabled="item.state == 2" :key="index" class="btn-margin">{{item.name}}</el-radio-button>
                </el-radio-group>
                <el-button type="text" @click="manageSale">{{$t('manager.grsl_managementSalePoint')}}</el-button>
            </div>
            <!--售卖点-->
            <el-form class="term line demo-form-inline" v-model="form" inline size="small">
                <el-form-item :label="$t('manager.grsl_goodsName')+':'">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('manager.grsl_goodsType')+':'">
                    <el-cascader v-model="form.category" :options="category" :props="categoryProps" @change="casChange"></el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit" @click="search('')">{{$t('commons.queryBtn')}}</el-button>
                    <el-button class="grey" @click="reset('')">{{$t('commons.resetBtn')}}</el-button>
                </el-form-item>
                <el-form-item class="form-inline-flex">
                    <el-button type="primary" @click="shelf" class="submit">{{$t('manager.grsl_goodsShelves')}}</el-button>
                </el-form-item>
            </el-form>
            <div class="components-edit">
                <el-table ref="multipleTable" :data="list" height="100%" header-row-class-name="default" size="small">
                    <el-table-column prop="goodsName" :label="$t('manager.grsl_goodsName')"></el-table-column>
                    <el-table-column prop="retailPrice" :label="$t('manager.grsl_defaultTetailPrice')"></el-table-column>
                    <el-table-column prop="employeePrice" :label="$t('manager.grsl_employeePriceJapen')"></el-table-column>
                    <el-table-column prop="costPrice" :label="$t('manager.grsl_costPrice')"></el-table-column>
                    <el-table-column prop="buyCount" :label="$t('manager.grsl_defaultBuyNum')"></el-table-column>
                    <el-table-column prop="inventoryCount" :label="$t('manager.grsl_inventory')"></el-table-column>
                    <el-table-column :label="$t('commons.operating')" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="popup('sale', scope.row)">{{$t('commons.modify')}}</el-button>
                            <el-button type="text" size="small" @click="offShelf(scope.row)">{{$t('manager.grsl_shelves')}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination @current-change="currentChange" :current-page="pageForm.pageIndex" :page-size="pageForm.pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
                </div>
            </div>
        </div>

        <!-- 售卖点管理 -->
        <el-dialog
                top="0"
                :title="$t('manager.grsl_managementSalePoint')"
                :visible.sync="salePointVisible"
                width="1000px"
                :close-on-click-modal="false"
        >
            <div slot="title" class="dialog-header">
                <span class="title">{{$t('manager.grsl_salePointManagement')}}</span>
                <el-button class="submit" size="small" @click="popup('add')">{{$t('commons.newAdd')}}</el-button>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="salePoint"
                    height="100%"
                    style="min-height: 250px"
                    header-row-class-name="default"
                    size="small"
            >
                <el-table-column prop="name" :label="$t('manager.grsl_salePointName')"></el-table-column>
                <el-table-column :label="$t('manager.grsl_allowedToRoom')">
                    <template
                            slot-scope="scope"
                    >{{scope.row.allowRoom == 1 ? $t('manager.hk_yes') : $t('manager.hk_no')}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('manager.grsl_allowerToUnit')">
                    <template
                            slot-scope="scope"
                    >{{scope.row.allowEnter == 1 ? $t('manager.hk_yes') : $t('manager.hk_no')}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('boss.loginDetail_state')">
                    <template
                            slot-scope="scope"
                    >{{scope.row.state == 1 ? $t('manager.grsl_toEnble') : $t('commons.disable')}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commons.operating')" width="200">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="small"
                                @click="popup('state', scope.row)"
                        >{{scope.row.state == 1 ? $t('commons.disable') : $t('commons.enable')}}
                        </el-button>
                        <el-button
                                type="text"
                                size="small"
                                @click="popup('edit', scope.row)"
                        >{{$t('commons.modify')}}
                        </el-button>
                        <el-popconfirm
                                :title="$t('manager.grsl_sureDelete')+'？'"
                                icon="el-icon-warning-outline"
                                iconColor="#FF8C00"
                                @onConfirm="pointDelete(scope.row)"
                        >
                            <el-button slot="reference" size="small" type="text">{{$t('commons.delete')}}</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                    top="0"
                    :title="editPointTitle"
                    :visible.sync="editPointVisible"
                    :close-on-click-modal="false"
                    append-to-body
            >
                <el-form :model="point" :rules="threerules" ref="ruleForm" label-width="150px">
                    <el-form-item :label="$t('manager.grsl_salePointName')+':'" prop="name">
                        <el-input v-model="point.name"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('manager.grsl_allowedCheckUnit')+':'">
                        <el-radio-group v-model="point.allowEnter">
                            <el-radio :label="1">{{$t('manager.hk_yes')}}</el-radio>
                            <el-radio :label="2">{{$t('manager.hk_no')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="$t('manager.grsl_allowedCheckRoom')+':'">
                        <el-radio-group v-model="point.allowRoom">
                            <el-radio :label="1">{{$t('manager.hk_yes')}}</el-radio>
                            <el-radio :label="2">{{$t('manager.hk_no')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="$t('boss.loginDetail_state')+':'">
                        <el-radio-group v-model="point.state">
                            <el-radio :label="1">{{$t('manager.hk_yes')}}</el-radio>
                            <el-radio :label="2">{{$t('manager.hk_no')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editPointVisible = false">{{$t('commons.cancel')}}</el-button>
                    <el-button type="primary" @click="submit('point')">{{$t('commons.determine')}}</el-button>
                </div>
            </el-dialog>
        </el-dialog>

        <!-- 修改商品上级信息 -->
        <el-dialog top="0" :title="$t('manager.grsl_resetGoodsInfo')" :visible.sync="onshelfVisible" width="800px" :close-on-click-modal="false">
            <div class="flex_1">
                <el-form :model="rowData" size="small" inline :rules="threerules" ref="priceForm" label-position="top" class="price">
                    <el-form-item prop="goodsName" :label="$t('manager.grsl_goodsName')">
                        <span class="row-width">{{rowData.goodsName}}</span>
                    </el-form-item>
                    <el-form-item prop="costPrice" :label="$t('manager.grsl_costNoPrice')">
                        <span class="row-width">{{rowData.costPrice}}</span>
                    </el-form-item>
                    <el-form-item prop="employeePrice" :label="$t('manager.grsl_employeePrice')">
                        <el-input v-model="rowData.employeePrice" class="row-width"></el-input>
                    </el-form-item>
                    <el-form-item prop="inventoryWarning" :label="$t('manager.grsl_retailPrice')">
                        <el-input v-model="rowData.retailPrice" class="row-width"></el-input>
                    </el-form-item>
                    <el-form-item prop="buyCount" :label="$t('manager.grsl_defaultBuyNum')">
                        <el-input v-model="rowData.buyCount" class="row-width"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onshelfVisible = false">{{$t('commons.cancel')}}</el-button>
                <el-button type="primary" @click="submit('onshelf')">{{$t('commons.determine')}}</el-button>
            </div>
        </el-dialog>
        <!-- 上架商品 -->
        <el-dialog top="0" :title="$t('manager.grsl_goodsShelves')" :visible.sync="shelfVisible" width="1000px" :close-on-click-modal="false">
            <el-form class="demo-form-inline" v-model="upshelf" inline size="small">
                <el-form-item :label="$t('manager.grsl_goodsName')+':'">
                    <el-input v-model="upshelf.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('manager.grsl_goodsType')+':'">
                    <el-cascader v-model="upshelf.category" :options="category" :props="categoryProps" @change="casChange"></el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit" @click="search('add')">{{$t('commons.queryBtn')}}</el-button>
                    <el-button class="grey" @click="reset('add')">{{$t('commons.resetBtn')}}</el-button>
                </el-form-item>
            </el-form>
            <el-table ref="multipleTable" :data="shelfData" height="100%" style="min-height: 250px" header-row-class-name="default" size="small" @selection-change="shelfSelect">
                <el-table-column type="selection" width="70"></el-table-column>
                <el-table-column prop="name" :label="$t('manager.grsl_goodsName')"></el-table-column>
                <el-table-column prop="costPrice" :label="$t('manager.grsl_costNoPrice')" width="200"></el-table-column>
                <el-table-column :label="$t('manager.grsl_employeePriceJapen')" width="150">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.employeePrice" :disabled="scope.row.his" size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('manager.grsl_retailPrice')" width="150">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.retailPrice" :disabled="scope.row.his" size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('manager.grsl_defaultBuyNum')" width="250">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.buyCount" :disabled="scope.row.his" size="small" style="width: 200px;"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="shelfChange" :current-page="shelfForm.pageIndex" :page-size="shelfForm.pageSize" :total="shelfTotal" layout="total, prev, pager, next, jumper"></el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="shelfVisible = false">{{$t('commons.cancel')}}</el-button>
                <el-button type="primary" @click="submit('shelf')">{{$t('commons.determine')}}</el-button>
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
                shelfForm: {pageIndex: 1, pageSize: 10, paging: true,},
                sellId: "", total: 0,
                sellName: "",
                form: {name: "", category: ""},
                categoryProps: {value: "id", label: "name", children: "child"},
                salePoint: [],
                shelfData: [],
                point: {name: "", allowEnter: 1, allowRoom: 1, state: 1},
                rowData: {goodsName: ""},
                salePointVisible: false,
                editPointVisible: false,
                editPointTitle: this.addNewPoint,
                pointType: true,
                onshelfVisible: false,
                shelfVisible: false,
                threeForm: {name: "", kinds: ""},
                threerules: {
                    name: [{required: true, message: "请输入活动名称", trigger: "blur"}],
                },
                selection: [], upshelf: {name: "", category: ""}, shelfTotal: 0
            };
        },
        props: {
            list: Array,
            category: Array,
            initData: Function,
        },
        mounted() {
            this.getManageData(() => {
                this.initData(this.pageForm, '', '', this.sellId, (res)=> {
                    this.pageForm.pageIndex = res.pageIndex;
                    this.total = res.count;
                })
            });
        },
        computed: {
            resetSalePoint: {
                get() {
                    return this.$t("manager.grsl_resetSalePoint");
                },
                set() {
                },
            },

            addNewPoint: {
                get() {
                    return this.$t("manager.grsl_addNewPoint");
                },
                set() {
                },
            },
        },
        watch: {
            resetSalePoint(newValue, oldValue) {
                this.resetSalePoint = newValue;
            },
            addNewPoint(newValue, oldValue) {
                this.addNewPoint = newValue;
            },
        },
        methods: {
            getManageData(callback) {
                var a = this;
                this.$F.doRequest(this, "/pms/hotelgoodsSelling/list", {}, (res) => {
                    a.salePoint = res.list.reverse();
                    a.salePoint.some(item => {
                        if (item.state != 2) {
                            a.sellId = item.id;
                            a.sellName = item.name;
                            callback && callback()
                            return true;
                        }
                    })
                });
            },
            manageSale() {
                this.salePointVisible = true;
            },
            pointDelete(row) {
                this.$F.doRequest(this, "/pms/hotelgoodsSelling/delete", {id: row.id,}, (res) => {
                    this.getManageData();
                });
            },
            changePoint(val) {
                this.sellId = val;
                this.salePoint.map(item => {
                    if(item.id == val) {
                        this.sellName = item.name;
                    }
                })
                this.initData(this.pageForm, '', '', val, (res)=> {
                    this.pageForm.pageIndex = res.pageIndex;
                    this.total = res.count;
                })
            },
            getShelfData(categoryId, goodsName) {
                const params = {
                    categoryId: categoryId,
                    goodsName: goodsName,
                    sellId: this.sellId,
                };
                this.$F.merge(params, this.shelfForm);
                this.$F.doRequest(this, "/pms/sellinglog/listusable", params, (res) => {
                    res.list.map((item) => {
                        item.his = true;
                    });
                    this.shelfData = res.list;
                    this.shelfForm.pageIndex = res.page.pageIndex;
                    this.shelfTotal = res.page.count;
                });
            },
            shelf() {
                this.shelfVisible = true;
                this.getShelfData();
            },
            shelfSelect(val) {
                val.map((item) => {
                    item.his = false;
                });
                this.selection = val;
            },
            popup(type, row) {
                if (type == "sale") {
                    this.onshelfVisible = true;
                    this.rowData = row;
                } else if (type == "state") {
                    this.$F.doRequest(
                        this,
                        "/pms/hotelgoodsSelling/updateSellingState",
                        {
                            id: row.id,
                            state: row.state == 1 ? 2 : 1,
                        },
                        (res) => {
                            this.getManageData();
                        }
                    );
                } else if (type == "edit") {
                    this.editPointVisible = true;
                    this.editPointTitle = this.resetSalePoint;
                    this.pointType = false;
                    this.point = {
                        name: row.name,
                        allowEnter: row.allowEnter,
                        allowRoom: row.allowRoom,
                        state: row.state,
                    };
                } else if (type == "add") {
                    this.editPointVisible = true;
                    this.editPointTitle = this.addNewPoint;
                    this.pointType = true;
                    this.point = {name: "", allowEnter: 1, allowRoom: 1, state: 1};
                }
            },
            offShelf(row) {
                this.$F.doRequest(this, "/pms/sellinglog/delete", {id: row.id,}, (res) => {
                    this.initData(this.pageForm, '', '', this.sellId, (res) => {
                        this.pageForm.pageIndex = res.pageIndex;
                        this.total = res.count;
                    });
                });
            },
            search(type) {
                if (type) {
                    const category = this.upshelf.category[this.upshelf.category.length - 1];
                    this.getShelfData(category, this.upshelf.name);
                } else {
                    this.initData(this.pageForm, this.form.name, this.form.category, this.sellId);
                }

            },
            reset(type) {
                if (type) {
                    this.upshelf = {name: "", category: ""};
                    this.getShelfData()
                } else {
                    this.form = {name: "", category: ""};
                    this.initData(this.pageForm, '', '', this.sellId);
                }


            },
            casChange(value) {
                this.rowData.categoryId = value[value.length - 1];
            },

            currentChange(val) {
                this.pageForm.pageIndex = val;
                this.initData(this.pageForm, this.form.name, this.form.category, this.sellId, (res) => {
                    this.total = res.count;
                });
            },
            shelfChange() {
                this.shelfForm.pageIndex = val;
                this.getShelfData(this.upshelf.category, this.upshelf.name)
            },
            submit(type) {
                if (type == "shelf") {
                    const content = [];
                    this.selection.map(item => {
                        var obj = {categoryId: item.categoryId, goodsId: item.id, goodsName: item.name, retailPrice: item.retailPrice, employeePrice: item.employeePrice, buyCount: item.buyCount}
                        content.push(obj);
                    })
                    const params = {
                        sellId: this.sellId,
                        sellName: this.sellName,
                        content: JSON.stringify(content),
                    };
                    this.$F.doRequest(this, "/pms/sellinglog/add", params, (res) => {
                        this.$message.success("success");
                        this.getShelfData();
                        this.initData(this.pageForm, this.form.name, this.form.category, this.sellId, (res) => {
                            this.total = res.count;
                        });
                    });
                } else if (type == "point") {
                    if (this.pointType) {
                        this.$F.doRequest(this, "/pms/hotelgoodsSelling/addSelling", this.point, (res) => {
                            this.getManageData();
                            this.editPointVisible = false;
                        });
                    } else {
                        this.$F.doRequest(this, "/pms/hotelgoodsSelling/updateSelling", this.point, (res) => {
                            this.getManageData();
                            this.editPointVisible = false;
                        });
                    }
                } else if (type == "onshelf") {
                    const params = {
                        id: this.rowData.id,
                        retailPrice: this.rowData.retailPrice,
                        employeePrice: this.rowData.employeePrice,
                        buyCount: this.rowData.buyCount,
                    };
                    this.$F.doRequest(this, "/pms/sellinglog/edit", params, (res) => {
                        this.onshelfVisible = false;
                        this.$message.success("success");
                        this.initData(this.pageForm, this.form.name, this.form.category, this.sellId, (res) => {
                            this.total = res.count;
                        });
                    });
                }
            },
        },
    };
</script>

<style lang="less">
    .el-radio-button + .el-radio-button {
        margin-left: 10px;
    }

    .radioBox {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;

        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            background: transparent;
            border-color: #126eff;
            color: #126eff;
            box-shadow: none;
        }

        .el-radio-button:first-child .el-radio-button__inner {
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
        }

        .el-radio-button:last-child .el-radio-button__inner {
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
        }

        .el-radio-button__inner {
            border: 1px solid #d0d0d0;
            border-radius: 3px;
        }
    }

    .dialog-header {
        .title {
            margin-right: 16px;
        }
    }
</style>
