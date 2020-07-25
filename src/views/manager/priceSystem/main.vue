<!--
 * @Date: 2020-02-15 21:08:27
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-27 11:14:21
 * @FilePath: /cloudAdmin/src/views/market/productManagement/index.vue
 -->
<template>
    <div id="page1" class="boss-index">
        <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="价格策略" name="first">
                <priceStrategy ref="priceStrategy"/>
            </el-tab-pane>
            <el-tab-pane label="计费规则" name="second" >
                <billingRules ref="billingRules"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import priceStrategy from './priceStrategy'
    import billingRules from './billingRules'
    import { mapState, mapActions } from "vuex";
    export default {
        components: { priceStrategy,billingRules},
        computed: {
            ...mapState({
                user: state => state.user
            }),
        },
        data () {
            return {
                activeName: 'second' //第一个默认启动
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
