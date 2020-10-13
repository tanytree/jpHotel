<template>
    <div class="boss-index">
        <el-tabs v-model="activeName" class="tabCenter">
            <el-tab-pane :label="$t('manager.grsl_inventoryStatistical')" name="count">
                <div class="content">
                    <el-form class="term line demo-form-inline" inline size="small" v-model="form">
                        <el-form-item :label="$t('manager.grsl_goodsName')+':'">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('manager.grsl_inventoryState')+':'" class="margin-l-15">
                            <el-select v-model="form.status">
                                <el-option :label="$t('manager.grsl_inventoryYes')" value="1"></el-option>
                                <el-option :label="$t('manager.grsl_inventoryNo')" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="submit" @click="search('form')">{{$t('commons.queryBtn')}}</el-button>
                            <el-button class="grey" @click="reset">{{$t('commons.resetBtn')}}</el-button>
                        </el-form-item>
                        <el-form-item class="form-inline-flex">
                            <el-button class="white" @click="exportcount">{{$t('commons.exportBtn')}}</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="components-edit">
                        <el-table ref="multipleTable" :data="list" height="100%" header-row-class-name="default" size="small">
                            <el-table-column prop="name" :label="$t('manager.grsl_goodsName')"></el-table-column>
                            <el-table-column prop="inventoryWarning" :label="$t('manager.grsl_warningQuantity')"></el-table-column>
                            <el-table-column prop="inventoryCount" :label="$t('manager.grsl_inventoryNum')"></el-table-column>
                            <el-table-column :label="$t('commons.operating')" width="100">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="popup('changeStock', scope.row)">{{$t('manager.grsl_resetInventory')}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination @current-change="currentChange" :current-page="pageForm.pageIndex" :page-size="pageForm.pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('manager.grsl_warehousingAudit')" name="examine">
                <el-row :gutter="20" style="display: flex;justify-content: center;align-items: center;">
                    <div class="btn-click" @click="popup('info')">
                        <div style="display: flex;justify-content: center;align-items: center;">
                            <img src="../../../assets/images/house.png" alt/>
                            <span>{{$t('manager.grsl_commodityWarehousing')}}</span>
                        </div>
                    </div>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <!-- 修改库存 -->
        <el-dialog top="0" :title="$t('manager.grsl_resetInventory')" :visible.sync="changeStockVisible" :close-on-click-modal="false">
            <el-form :model="stock" :rules="rules" label-width="150px">
                <el-form-item :label="$t('manager.grsl_inventoryQuantity')+':'" prop="name">
                    <el-input v-model="stock.count"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changeStockVisible = false">{{$t('commons.cancel')}}</el-button>
                <el-button type="primary" @click="submit('stockNum')">{{$t('commons.determine')}}</el-button>
            </div>
        </el-dialog>
        <!-- 商品入库 -->
        <el-dialog top="0" :title="$t('manager.grsl_commodityWarehousing')" :visible.sync="goodsInVisible" width="1000px" class="goodin" :close-on-click-modal="false">
            <el-form :model="goodInForm" :rules="rules" size="small" inline label-width="100px">
                <el-form-item :label="$t('manager.grsl_wareType')+':'" prop="name">
                    <el-select v-model="goodInForm.type" :placeholder="$t('manager.grsl_selectWareType')">
                        <el-option :label="$t('manager.grsl_procurementWarehousing')" :value="1"></el-option>
                        <el-option :label="$t('manager.grsl_putIn')" :value="2"></el-option>
                        <el-option :label="$t('manager.grsl_putOther')" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="form-inline-flex">
                    <el-button type="primary" class="submit" @click="popup('addPi')">{{$t('manager.grsl_bulkAdd')}}
                    </el-button>
                </el-form-item>
            </el-form>
            <el-card shadow="never">
                <el-table ref="multipleTable" :data="goodsInList" height="100%" style="min-height: 300px" border header-row-class-name="default" size="small">
                    <el-table-column prop="name" :label="$t('manager.grsl_goodsName')"></el-table-column>
                    <el-table-column prop="costPrice" :label="$t('manager.grsl_costNoPrice')"></el-table-column>
                    <el-table-column :label="$t('manager.grsl_rukuNum')">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.inventoryCount" size="small"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('commons.operating')" width="100">
                        <template slot-scope="scope">
                            <el-popconfirm :title="$t('manager.grsl_sureToMove')" @onConfirm="goodsDelete(scope.row)">
                                <el-button slot="reference" type="text" size="small">{{$t('manager.grsl_move')}}</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>

            <el-form :model="goodInForm" size="small" :rules="rules" ref="goodInForm" label-width="100px">
                <el-col :span="8">
                    <el-form-item :label="$t('manager.grsl_agent')+':'" prop="person">
                        <el-input v-model="goodInForm.person"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('manager.grsl_applyDate')+':'" prop="date">
                        <el-date-picker v-model="goodInForm.date" type="date" :placeholder="$t('commons.selectDate')"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item :label="$t('manager.grsl_treasuryNote')+':'">
                        <el-input type="textarea" :rows="2" :placeholder="$t('boss.department_placeEnterContent')" v-model="goodInForm.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="goodsInVisible = false">{{$t('commons.cancel')}}</el-button>
                <el-button type="primary" @click="submit('goodsin')">{{$t('commons.determine')}}</el-button>
            </div>
        </el-dialog>
        <!-- 批量添加商品 -->
        <el-dialog top="0" :title="$t('manager.grsl_bulkAdd')" width="1000px" :visible.sync="addGoodsVisible" :close-on-click-modal="false">
            <el-form v-model="addGoods" class="demo-form-inline" inline size="small">
                <el-form-item :label="$t('manager.grsl_goodsName')+':'">
                    <el-input v-model="addGoods.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('manager.grsl_goodsType')+':'" class="margin-l-15">
                    <el-cascader v-model="addGoods.category" :options="category" :props="categoryProps" @change="casChange"></el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit" @click="search('addGoods')">{{$t('commons.queryBtn')}}</el-button>
                </el-form-item>
            </el-form>
            <div class="components-edit">
                <el-table ref="multipleTable" :data="list" tooltip-effect="dark" height="250px" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" @selection-change="addSelection">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="name" :label="$t('manager.grsl_goodsName')"></el-table-column>
                    <el-table-column prop="categoryName" :label="$t('manager.grsl_goodsKind')"></el-table-column>
                    <el-table-column prop="costPrice" :label="$t('manager.grsl_costNoPrice')"></el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination @current-change="currentChange" :current-page="currentPage" :page-size="pageForm.pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addGoodsVisible = false">{{$t('commons.cancel')}}</el-button>
                <el-button type="primary" @click="submit('batchIn')">{{$t('commons.determine')}}</el-button>
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
                    paging: true
                },
                activeName: "count",
                form: {name: "", status: ""},
                stock: {count: ""},
                goodInForm: {type: "", person: "", date: "", remark: ""},
                addGoods: {name: "", categoryId: ""},
                categoryProps: {value: "id", label: "name", children: "child"},
                rules: {
                    count: [{required: true, message: "请输入库存", trigger: "blur"}],
                },
                changeStockVisible: false,
                goodsInVisible: false, //商品入库弹框
                addGoodsVisible: false, // 修改库存
                section: [], currentPage: 1,
                goodsInList: [], addGoodsSec: [],
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
        methods: {
            popup(type, row) {
                if (type == "changeStock") {
                    this.stock.id = row.id;
                    this.stock.count = row.inventoryCount;
                    this.changeStockVisible = true;
                } else if(type == 'addPi') {
                    this.addGoods = {name: "", categoryId: ""};
                    this.addGoodsVisible = true;
                } else if(type == 'info') {
                    this.goodsInList = [];
                    this.goodInForm = {type: "", person: "", date: "", remark: ""};
                    this.goodsInVisible = true;
                }
            },
            search(type) {
                if(type == 'form') {
                    this.initData(this.pageForm, this.form.name, this.form.category, '', this.form.status);
                } else {
                    this.initData(this.pageForm, this.addGoods.name, this.addGoods.category);
                }
            },
            reset() {
                this.form = {name: "", status: "", category: ""};
                this.initData(this.pageForm);
            },
            casChange(value) {
                this.addGoods.category = value[value.length - 1];
            },
            currentChange(val) {
                this.pageForm.pageIndex = val;
                this.initData(this.pageForm, this.form.name, this.form.category, this.form.status);
            },
            submit(type) {
                if (type == "stockNum") {
                    this.$F.doRequest(
                        this,
                        "/pms/hotelgoods/upcounts",
                        {
                            id: this.stock.id,
                            counts: this.stock.count,
                        },
                        (res) => {
                            this.changeStockVisible = false;
                            this.initData(this.pageForm, this.form.name, this.form.category, this.form.status);
                        }
                    );
                } else if (type == "goodsin") {
                    const content = [];
                    this.goodsInList.map((item) => {
                        let obj = {
                            goodsId: item.id,
                            costPrice: item.costPrice,
                            goodsCount: item.buyCount,
                        };
                        content.push(obj);
                    });
                    const params = {
                        id: "",
                        soteageType: this.goodInForm.type,
                        agentName: this.goodInForm.person,
                        applyTime: this.goodInForm.date,
                        remark: this.goodInForm.remark,
                        content: JSON.stringify(content),
                    };
                    this.$F.doRequest(
                        this,
                        "/pms/hotelstorage/applyStorage",
                        params,
                        (res) => {
                            this.goodsInVisible = false;
                            this.$message.success('success');
                            this.initData(this.pageForm, this.form.name, this.form.category, this.form.status);
                        }
                    );
                } else if (type == 'batchIn') {
                    this.goodsInList = this.addGoodsSec;
                    this.addGoodsVisible = false;
                }
            },
            goodsDelete(row) {
                this.goodsInList = this.goodsInList.filter(item => item.id != row.id)
            },
            exportcount() {
                this.$F.commons.downloadTemplate("/pms/hotelgoods/upcounts");
            },
            addSelection(val) {
                this.addGoodsSec = val;
            },
        },
    };
</script>

<style lang="less" scoped>
    .btn-click {
        height: 200px;
        width: 300px;
        background: #e5e5e5;
        // background-color: linear-gradient(toright, #e5e5e5, #e5e5e5);
        display: flex;
        justify-content: center;
        align-items: center;

        i {
            font-size: 30px;
        }

        span {
            font-size: 20px;
            color: #666666;
            margin-left: 10px;
        }
    }

    .btn-click:hover {
        height: 200px;
        width: 300px;
        background: #4db8ff;
        // background: linear-gradient(toright, #4db8ff, #1aa3ff);
        display: flex;
        justify-content: center;
        align-items: center;

        i {
            font-size: 30px;
            color: #fff;
        }

        span {
            font-size: 20px;
            color: #fff;
            margin-left: 10px;
        }
    }

    .goodin {
        .el-card {
            border: 1px solid #c2c2c2;
            margin-bottom: 20px;
        }
    }
</style>
