<!--
 * @Date: 2020-02-15 21:08:27
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-27 11:14:21
 * @FilePath: /cloudAdmin/src/views/market/productManagement/index.vue
 -->
<template>
    <div id="page1">
        <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="商品管理" name="first">
                <GoodsMg ref="GoodsMg"/>
            </el-tab-pane>
            <el-tab-pane label="售卖点" name="second" >
                <SalePoint ref="SalePoint"/>
            </el-tab-pane>
            <el-tab-pane label="商品分类" name="third">
                <GoodsKinds ref="GoodsKinds"/>
            </el-tab-pane>
			<el-tab-pane label="库存管理" name="fouth">
			    <StockMg ref="StockMg"/>
			</el-tab-pane>
			<el-tab-pane label="入库审核" name="five">
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
    // import httpRequest from '@/utils/httpRequest'
    import { mapState, mapActions } from "vuex";
    export default {
        components: { GoodsMg,SalePoint,GoodsKinds,StockMg,IntoKuAudit},
        computed: {
            ...mapState({
                user: state => state.user
            }),
        },
        data () {
            return {
                activeName: 'first' //第一个默认启动
            }
        },
        created () {
        },
        activated () {
        },
        methods: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
