<!--
 * @Date: 2020-02-15 21:08:27
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-27 11:14:21
 * @FilePath: /cloudAdmin/src/views/market/productManagement/index.vue
 -->
<template>
    <div id="page1" class="boss-index">
        <el-tabs class="pageTab" v-model="activeName" @tab-click="tabChange">
            <el-tab-pane label="商品管理" name="first">
                <GoodsMg ref="GoodsMg" :list="goodsList" :category="category" :total="goodsTotal" :pageSize="goodsSize" :currentPage="goodsPage" :initData="getHotelGoodsData"/>
            </el-tab-pane>
            <el-tab-pane label="售卖点" name="second">
                <SalePoint ref="SalePoint" :list="salesList" :category="category" :total="salesTotal" :pageSize="salesSize" :currentPage="salesPage" :initData="getSellingData"/>
            </el-tab-pane>
            <el-tab-pane label="商品分类" name="third">
                <GoodsKinds ref="GoodsKinds" :list="category" :initData="getCategoryData"/>
            </el-tab-pane>
            <el-tab-pane label="库存管理" name="fouth">
                <StockMg ref="StockMg" :list="goodsList" :category="category" :total="goodsTotal" :pageSize="goodsSize" :currentPage="goodsPage" :initData="getHotelGoodsData" />
            </el-tab-pane>
            <el-tab-pane label="入库审核" name="fifth">
                <IntoKuAudit ref="IntoKuAudit"/>
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
                searchForm: {
                    pageIndex: 1,
                    pageSize: 10,
                    paging: true
                },
                activeName: 'first', //第一个默认启动
                goodsList: [], goodsTotal: 0, goodsSize: 0, goodsPage: 1,
                salesList: [], salesTotal: 0, salesSize: 0, salesPage: 1,
                category: [], cateTotal: 0, cateSize: 0, catePage: 1,
            }
        },
        mounted() {
            const obj = {name: 'first'}
            this.tabChange(obj)
        },
        methods: {
            tabChange(tab) {
                this.getCategoryData();
                if(tab.name == 'first' || tab.name == 'fouth') {
                    this.getHotelGoodsData();
                } else if (tab.name == 'second') {
                    this.getSellingData();
                } else if (tab.name == 'fifth') {

                }
            },
            getHotelGoodsData(name, categoryId, state) {
                const params = {
                    goodsName: name,
                    categoryId: categoryId,
                    state: state
                }
                this.$F.merge(params, this.searchForm);
                this.$F.doRequest(this, '/pms/hotelgoods/list', params, (res) => {
                    this.goodsList = res.list;
                    if (res.page) {
                        this.goodsSize = res.page.pageSize;
                        this.goodsPage = res.page.pageIndex;
                        this.goodsTotal = res.page.count;
                    } else {
                        this.goodsSize = 10;
                        this.goodsPage = 1;
                        this.goodsTotal = res.list.length;
                    }
                })
            },
            getCategoryData() {

                this.$F.doRequest(this, '/pms/hotelcategory/list', this.searchForm, (res) => {
                    // this.category = res.list;
                    this.category = this.getTreeItem(res.list);
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
            getSellingData(name, categoryId, sellId) {
                const params = {
                    goodsName: name,
                    categoryId: categoryId,
                    sellId: sellId
                }
                this.$F.doRequest(this, '/pms/sellinglog/list', params, (res) => {
                    this.salesList = res.list;
                    if(res.page) {
                        this.salesSize = res.page.pageSize;
                        this.salesPage = res.page.pageIndex;
                        this.salesTotal = res.page.count;
                    } else {
                        this.salesSize = 10;
                        this.salesPage = 1;
                        this.salesTotal = res.list.length;
                    }

                })
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
