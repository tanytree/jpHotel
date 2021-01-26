<!--
 * @Date: 2020-02-15 21:08:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-07 10:04:01
 * @FilePath: \jiudian\src\views\manager\guestRoom_2\main.vue
 -->
<template>
    <div id="page1" class="boss-index">
        <el-tabs class="pageTab" v-model="activeName" @tab-click="tabChange">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                         :name="item.path"
                         :key="item.path"
                         v-if="$F.filterThirdMenu('finance', item.path, true)">
                <!-- 商品管理-->
                <GoodsMg ref="GoodsMg" :list="goodsList" :cateList="category" :serviceList="serviceList" :total="goodsTotal" :initData="getHotelGoodsData" :cateData="getCategoryData" v-if="item.path == 'GoodsMg'"/>
                <!-- 售卖点-->
                <SalePoint ref="SalePoint" :list="salesList" :cateList="category" :serviceList="serviceList" :total="salesTotal" :initData="getSellingData" :cateData="getCategoryData" v-if="item.path == 'SalePoint'"/>
                <!-- 商品分类-->
                <GoodsKinds ref="GoodsKinds" :list="category" :serviceList="serviceList" :initData="getCategoryData" v-if="item.path == 'GoodsKinds'"/>
                <!-- 库存管理-->
                <StockMg ref="StockMg" :list="goodsList" :category="category" :serviceList="serviceList" :total="goodsTotal" :initData="getHotelGoodsData" v-if="item.path == 'StockMg'"/>
                <!-- 入库审核-->
                <IntoKuAudit ref="IntoKuAudit" :list="auditList" :goodsList="goodsList" :category="category" :serviceList="serviceList" :total="auditTotal" :initData="getAuditData" v-if="item.path == 'IntoKuAudit'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import GoodsMg from './GoodsMg'
    import SalePoint from './SalePoint'
    import GoodsKinds from './GoodsKinds'
    import StockMg from './StockMg'
    import IntoKuAudit from './IntoKuAudit'
    import {mapState, mapActions} from "vuex";

    export default {
        components: {GoodsMg, SalePoint, GoodsKinds, StockMg, IntoKuAudit},
        computed: {
            ...mapState({
                user: state => state.user
            }),
        },
        data() {
            return {
                pageForm: {
                    pageIndex: 1,
                    pageSize: 10,
                    paging: true
                },
                activeName: 'GoodsMg',
                goodsList: [], goodsTotal: 0,
                salesList: [], salesTotal: 0, salesSize: 0, salesPage: 1,
                auditList: [], auditTotal: 0,
                category: [], serviceList: [], cateTotal: 0, cateSize: 0, catePage: 1,
            }
        },
        created() {
           this.$F.handleThirdMenu(this);
        },
        mounted() {
            this.getCategoryData(1);
            this.getCategoryData(2);
            this.tabChange()
        },
        methods: {
            tabChange(tab) {
                if(this.activeName == 'GoodsMg' || this.activeName == 'StockMg') {
                    this.getHotelGoodsData(this.pageForm);
                } else if (this.activeName == 'SalePoint') {
                    this.getManageData((item) => {
                        this.getSellingData(this.pageForm, '', '', item.id)
                    })
                    // this.getSellingData(this.pageForm);
                } else if (this.activeName == 'IntoKuAudit') {
                    this.getAuditData(this.pageForm, 1);
                    this.$refs['IntoKuAudit'][0].getCountData();
                }
            },
            getHotelGoodsData(obj, name, categoryId, state, type, haveInventory) {
                const params = {
                    name: name,
                    categoryId: categoryId,
                    state: state,
                    status: 1,
                    haveInventory: haveInventory,
                    categoryType: type
                }
                this.$F.merge(params, obj);
                this.$F.doRequest(this, '/pms/hotelgoods/list', params, (res) => {
                    this.goodsList = res.list;
                    if (res.page) {
                        this.goodsTotal = res.page.count;
                    }
                })
            },
            getCategoryData(type) {
                this.$F.doRequest(this, '/pms/hotelcategory/list', {
                    categoryType: type
                }, (res) => {
                    // this.category = res.list;
                    if(type == 1) {
                        this.category = this.getTreeItem(res.list);
                    } else {
                        this.serviceList = this.getTreeItem(res.list);
                    }
                })
            },
            getTreeItem: function (arr) {
                let newarr = []
                arr.sort(this.compare('categoryOrder'))
                newarr = arr.filter(father => {
                    const branchArr = arr.filter((child) => {
                        if (father.id == child.pCategoryId ) child._hasParent = true;
                        return father.id == child.pCategoryId;
                    });
                    if (branchArr.length > 0) father.child = branchArr;
                    return !father._hasParent;
                })

                newarr = newarr.filter((item) => {
                    return !item._hasParent;
                })
                return newarr;
            },
            compare: function (attr, rev){
                if(rev ==  undefined){
                    rev = 1;
                } else {
                    rev = (rev) ? 1 : -1;
                }
                return function(a,b){
                    a = a[attr];
                    b = b[attr];
                    if(a < b){
                        return rev * -1;
                    }
                    if(a > b){
                        return rev * 1;
                    }
                    return 0;
                }
            },
            getSellingData(obj, name, categoryId, sellId, type, callback) {
                const params = {
                    goodsName: name,
                    categoryId: categoryId,
                    sellId: sellId,
                    categoryType: type
                }
                this.$F.merge(params, obj);
                this.$F.doRequest(this, '/pms/sellinglog/list', params, (res) => {
                    this.salesList = res.list;
                    this.salesTotal = res.page.count;
                    callback && callback(res.page)
                })
            },
            getManageData(callback) {
                var a = this;
                this.$F.doRequest(this, "/pms/hotelgoodsSelling/list", {}, (res) => {
                    a.salePoint = res.list.reverse();
                    a.salePoint.some(item => {
                        if (item.state != 2) {
                            callback && callback(item)
                            return true;
                        }
                    })
                });
            },
            getAuditData(obj, authStatus, soteageType, creatorName, startDate, endDate, content) {
                const params = {
                    authStatus: authStatus,
                    soteageType: soteageType,
                    creatorName: creatorName,
                    startDate: startDate,
                    endDate: endDate,
                    content: content
                }
                this.$F.merge(params, obj);
                this.$F.doRequest(this, '/pms/hotelstorage/list', params, (res) => {
                    this.auditList = res.list;
                    if(res.page) {
                        this.auditTotal = res.page.count;
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .svg-icon {
        height: 20px;
        width: 20px;
        margin-top: 7px;
        fill: #a2a2a2;
    }
</style>
