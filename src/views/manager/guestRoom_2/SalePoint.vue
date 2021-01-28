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
                <el-form-item :label="$t('manager.grsl_goodsNameB')+':'">
                    <el-input v-model="form.name" :placeholder="$t('manager.grsl_goodsNameC')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('manager.hk_goodsTypeA')+':'">
                    <el-select  v-model="form.categoryType" :placeholder="$t('commons.placeChoose')" @change="geProductType">
                        <el-option :label="$t('manager.grsl_matter')" :value="1"></el-option>
                        <el-option v-if="serviceVisible" :label="$t('manager.grsl_service')" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="form.categoryType == 2" :label="$t('manager.grsl_goodsType')+':'">
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
              <!-- 表格数据 -->
                <el-table ref="multipleTable" :data="list" height="100%" header-row-class-name="default" size="small">
                    <el-table-column prop="goodsName" :label="$t('manager.grsl_goodsNameA')"></el-table-column>
                    <el-table-column :label="$t('manager.grsl_defaultTetailPriceA')">
                        <template slot-scope="scope">
                            ¥ {{$F.numFormate(scope.row.retailPrice)}}
                        </template>
                    </el-table-column>
<!--                    <el-table-column prop="employeePrice" :label="$t('manager.grsl_employeePriceJapen')"></el-table-column>-->
                    <el-table-column :label="$t('manager.grsl_costPrice')">
                        <template slot-scope="scope">
                            ¥ {{$F.numFormate(scope.row.costPrice)}}
                        </template>
                    </el-table-column>
<!--                    <el-table-column prop="buyCount" :label="$t('manager.grsl_defaultBuyNum')"></el-table-column>-->
<!--                    <el-table-column prop="inventoryCount" :label="$t('manager.grsl_inventory')"></el-table-column>-->
                    <el-table-column :label="$t('commons.operating')" align="center" width="200">
                        <template slot-scope="scope">
<!--                            <el-button type="text" size="small" @click="popup('sale', scope.row)">{{$t('commons.modify')}}</el-button>-->
                            <el-popconfirm :title="$t('manager.grsl_sureShelves')" icon="el-icon-warning-outline" iconColor="#FF8C00" @confirm="offShelf(scope.row)">
                                <el-button slot="reference" type="text" size="small">{{$t('manager.grsl_shelves')}}</el-button>
                            </el-popconfirm>
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
                width="600px"
                :close-on-click-modal="false"
        >
            <div slot="title" class="dialog-header">
                <span class="title">{{$t('manager.grsl_salePointManagement')}}</span>
                <el-button class="submit" size="small" @click="popup('add')">{{$t('commons.newAdd')}}</el-button>
            </div>
            <el-table ref="multipleTable" :data="salePoint" height="100%" style="min-height: 250px" header-row-class-name="default" size="small">
                <el-table-column prop="name" :label="$t('manager.grsl_salePointName')"></el-table-column>
                <!--<el-table-column :label="$t('manager.grsl_allowedToRoom')">
                    <template slot-scope="scope">{{scope.row.allowRoom == 1 ? $t('manager.hk_yes') : $t('manager.hk_no')}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('manager.grsl_allowerToUnit')">
                    <template slot-scope="scope">{{scope.row.allowEnter == 1 ? $t('manager.hk_yes') : $t('manager.hk_no')}}
                    </template>
                </el-table-column>-->
                <el-table-column :label="$t('boss.loginDetail_state')">
                    <template
                            slot-scope="scope"
                    >{{scope.row.state == 1 ? $t('manager.grsl_toEnble') : $t("desk.customer_disableIng")}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commons.operating')" width="200">
                    <template slot-scope="scope">
                        <el-popconfirm :title="$t('manager.surePoint')" icon="el-icon-warning-outline" iconColor="#FF8C00" @confirm="popup('state', scope.row)">
                            <el-button type="text" size="small">{{scope.row.state == 1 ? $t('commons.disableA') : $t('commons.enable')}}</el-button>
                        </el-popconfirm>
                        <el-button v-if="scope.row.delFlag != 2" type="text" size="small" @click="popup('edit', scope.row)">{{$t('commons.modify')}}</el-button>
                        <el-popconfirm v-if="scope.row.delFlag != 2" :title="$t('manager.grsl_sureDeleteC')" icon="el-icon-warning-outline" iconColor="#FF8C00" @confirm="pointDelete(scope.row)">
                            <el-button slot="reference" size="small" type="text">{{$t('commons.delete')}}</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog top="0" :title="editPointTitle" width="600px" :visible.sync="editPointVisible" :close-on-click-modal="false" append-to-body>
                <el-form :model="point" :rules="threerules" ref="ruleForm" label-width="150px">
                    <el-form-item :label="$t('manager.grsl_salePointName')+':'" prop="name">
                        <el-input v-model="point.name"></el-input>
                    </el-form-item>
                    <!--<el-form-item :label="$t('manager.grsl_allowedCheckUnit')+':'">
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
                    </el-form-item>-->
                    <el-form-item v-if="pointType" :label="$t('manager.grsl_allowDelete')+':'">
                        <el-radio-group v-model="point.delFlag">
                            <el-radio :label="1">{{$t('manager.hk_yes')}}</el-radio>
                            <el-radio :label="2">{{$t('manager.hk_no')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="$t('manager.hp_loginDetail_state')+':'">
                        <el-radio-group v-model="point.state">
                            <el-radio :label="1">{{$t('manager.hk_yes')}}</el-radio>
                            <el-radio :label="2">{{$t('manager.hk_noA')}}</el-radio>
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
                        <span class="row-width">¥ {{$F.numFormate(rowData.costPrice)}}</span>
                    </el-form-item>
                    <el-form-item prop="employeePrice" :label="$t('manager.grsl_employeePrice')">
                        <el-input v-model="rowData.employeePrice" class="row-width">
                            <svg slot="prefix" t="1611640798495" class="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3317" width="128" height="128"><path d="M798.848 512C817.216 512 832.064 497.728 832 480 832.064 462.336 817.216 448 798.848 448L576 448 576 429.248l246.016-246.016c12.992-12.992 13.376-33.6 0.896-46.08-12.352-12.544-33.152-12.096-46.144 0.832L544 370.688 311.232 137.984c-12.928-12.928-33.664-13.376-46.08-0.832-12.48 12.416-12.16 33.088 0.896 46.08L512 429.248 512 448 289.152 448C270.848 448 255.936 462.336 256 480 256 497.6 270.784 512 289.216 512L512 512l0 128L289.152 640C270.848 640 255.936 654.4 256 672 256 689.6 270.784 704 289.216 704L512 704l0 158.848C512 881.152 526.272 896 544 896 561.6 896 576 881.152 576 862.848L576 704l222.848 0c18.304 0 33.216-14.272 33.152-32 0.064-17.6-14.784-32-33.152-32L576 640 576 512 798.848 512z" p-id="3318"></path></svg>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="inventoryWarning" :label="$t('manager.grsl_retailPrice')">
                        <el-input v-model="rowData.retailPrice" class="row-width">
                            <svg slot="prefix" t="1611640798495" class="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3317" width="128" height="128"><path d="M798.848 512C817.216 512 832.064 497.728 832 480 832.064 462.336 817.216 448 798.848 448L576 448 576 429.248l246.016-246.016c12.992-12.992 13.376-33.6 0.896-46.08-12.352-12.544-33.152-12.096-46.144 0.832L544 370.688 311.232 137.984c-12.928-12.928-33.664-13.376-46.08-0.832-12.48 12.416-12.16 33.088 0.896 46.08L512 429.248 512 448 289.152 448C270.848 448 255.936 462.336 256 480 256 497.6 270.784 512 289.216 512L512 512l0 128L289.152 640C270.848 640 255.936 654.4 256 672 256 689.6 270.784 704 289.216 704L512 704l0 158.848C512 881.152 526.272 896 544 896 561.6 896 576 881.152 576 862.848L576 704l222.848 0c18.304 0 33.216-14.272 33.152-32 0.064-17.6-14.784-32-33.152-32L576 640 576 512 798.848 512z" p-id="3318"></path></svg>
                        </el-input>
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
        <el-dialog top="0" :title="$t('manager.grsl_goodsShelves')" :visible.sync="shelfVisible" width="1100px" :close-on-click-modal="false">
            <el-form class="demo-form-inline" v-model="upshelf" inline size="small">
                <el-form-item :label="$t('manager.grsl_goodsNameB')+':'">
                    <el-input v-model="upshelf.name" :placeholder="$t('manager.grsl_goodsNameC')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('manager.hk_goodsTypeA')+':'">
                    <el-select  v-model="upshelf.categoryType" :placeholder="$t('commons.placeChoose')" @change="geProductType">
                        <el-option :label="$t('manager.grsl_matter')" :value="1"></el-option>
                        <el-option v-if="serviceVisible" :label="$t('manager.grsl_service')" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="upshelf.categoryType == 2" :label="$t('manager.grsl_goodsTypeA')+':'">
                    <el-cascader v-model="upshelf.category" :options="category" :props="categoryProps" @change="casChange"></el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit" @click="search('add')">{{$t('commons.queryBtn')}}</el-button>
                    <el-button class="grey" @click="reset('add')">{{$t('commons.resetBtn')}}</el-button>
                </el-form-item>
            </el-form>
            <el-table ref="multipleTable" :data="shelfData" height="100%" style="min-height: 250px" header-row-class-name="default" size="small" @selection-change="shelfSelect">
                <el-table-column type="selection" width="70"></el-table-column>
                <el-table-column prop="name" :label="$t('manager.grsl_goodsNameA')"></el-table-column>
                <el-table-column prop="categoryName" :label="$t('manager.grsl_goodsModeA')"></el-table-column>
                <!--<el-table-column prop="costPrice" :label="$t('manager.grsl_costNoPrice')" width="200"></el-table-column>
                <el-table-column :label="$t('manager.grsl_employeePriceJapen')" width="150">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.employeePrice" :disabled="scope.row.his" size="small"></el-input>
                    </template>
                </el-table-column>-->
                <el-table-column :label="$t('manager.grsl_retailPriceA')" width="150">
                    <template slot-scope="scope">¥ {{$F.numFormate(scope.row.retailPrice)}}{{$t('manager.ps_japanYen')}}
<!--                        <el-input v-model="" :disabled="scope.row.his" size="small"></el-input>-->
                    </template>
                </el-table-column>
                <!--<el-table-column :label="$t('manager.grsl_defaultBuyNum')" width="250">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.buyCount" :disabled="scope.row.his" size="small" style="width: 200px;"></el-input>
                    </template>
                </el-table-column>-->
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
                sellId: "",
                sellName: "",
                form: {name: "", categoryType: '', category: ""},
                categoryProps: {value: "id", label: "name", children: "child"},
                salePoint: [],
                shelfData: [],
                point: {name: "", allowEnter: 1, allowRoom: 1, state: 1, delFlag: 1},
                rowData: {goodsName: ""},
                salePointVisible: false,
                editPointVisible: false,
                editPointTitle: this.addNewPoint,
                pointType: true,
                onshelfVisible: false,
                shelfVisible: false,
                threeForm: {name: "", kinds: ""},
                threerules: {
                    name: [{required: true, message: this.$t('commons.mustInput'), trigger: "blur"}],
                },
                selection: [], upshelf: {name: "", categoryType: '', category: ""}, shelfTotal: 0, category: [],

                //是否可以上架服务类商品
                serviceVisible: true
            };
        },
        props: {
            list: Array,
            cateList: Array,
            serviceList: Array,
            total: Number,
            initData: Function,
            cateData: Function,
        },
        mounted() {
            this.cateData(2);
            this.category = this.serviceList;
            this.getManageData(() => {
                this.initData(this.pageForm, '', '', this.sellId, '', (res)=> {
                    this.pageForm.pageIndex = res.pageIndex;
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

                    console.log(res)
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
                        if(item.ename && item.ename == 'littleShop') {
                            this.serviceVisible = false;
                        } else {
                            this.serviceVisible = true;
                        }
                        this.sellName = item.name;
                    }
                })
                this.initData(this.pageForm, '', '', val, '', (res)=> {
                    this.pageForm.pageIndex = res.pageIndex;
                })
            },
            getShelfData(categoryId, goodsName, type) {
                const params = {
                    categoryId: categoryId,
                    goodsName: goodsName,
                    sellId: this.sellId,
                    state: 1,
                    categoryType: this.serviceVisible ? type : '1',
                };
                this.$F.merge(params, this.shelfForm);
                this.$F.doRequest(this, "/pms/sellinglog/listusable", params, (res) => {
                    // res.list.map((item) => {
                    //     item.his = true;
                    // });
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
                // this.shelfData.map(item => {
                //     item.his = true;
                // })
                // val.map((item) => {
                //     item.his = false;
                // });
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
                        id: row.id,
                        name: row.name,
                        allowEnter: row.allowEnter,
                        allowRoom: row.allowRoom,
                        state: row.state,
                    };
                } else if (type == "add") {
                    this.editPointVisible = true;
                    this.editPointTitle = this.addNewPoint;
                    this.pointType = true;
                    this.point = {name: "", allowEnter: 1, allowRoom: 1, state: 1, delFlag: 1};
                }
            },
            offShelf(row) {
                this.$F.doRequest(this, "/pms/sellinglog/delete", {id: row.id,}, (res) => {
                    this.initData(this.pageForm, '', '', this.sellId, '', (res) => {
                        this.pageForm.pageIndex = res.pageIndex;
                    });
                });
            },
            search(type) {
                if (type) {
                    const category = this.upshelf.category[this.upshelf.category.length - 1];
                    this.getShelfData(category, this.upshelf.name, this.upshelf.categoryType);
                } else {
                    this.initData(this.pageForm, this.form.name, this.form.category, this.sellId, this.form.categoryType);
                }

            },
            reset(type) {
                if (type) {
                    this.upshelf = {name: "", category: ""};
                    this.getShelfData()
                } else {
                    this.form = {name: "", categoryType: '', category: ""};
                    this.initData(this.pageForm, '', '', this.sellId, '');
                }
                // this.category = [];
            },
            casChange(value) {
                this.rowData.categoryId = value[value.length - 1];
            },
            currentChange(val) {
                this.pageForm.pageIndex = val;
                this.initData(this.pageForm, this.form.name, this.form.category, this.sellId, this.form.categoryType);
            },
            shelfChange(val) {
                this.shelfForm.pageIndex = val;
                this.getShelfData(this.upshelf.category, this.upshelf.name, this.upshelf.categoryType)
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
                        this.initData(this.pageForm, this.form.name, this.form.category, this.sellId, this.form.categoryType);
                        this.shelfVisible = false;
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
                        this.initData(this.pageForm, this.form.name, this.form.category, this.sellId, this.form.categoryType);
                    });
                }
            },
            geProductType(v){
                this.cateData(v);
                this.category = this.serviceList;
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
