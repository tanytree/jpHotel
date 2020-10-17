<!--
 * @Date: 2020-02-15 21:08:27
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-27 11:14:21
 * @FilePath: /cloudAdmin/src/views/market/productManagement/index.vue
 -->
<template>
    <div id="page1" class="boss-index">
        <el-tabs class="pageTab" v-model="activeName">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                         :name="item.path"
                         :key="item.path"
                         v-if="$F.filterThirdMenu('finance', item.path, true)">
                <!-- 价格策略-->
                <priceStrategy v-if="item.path == 'priceStrategy'"/>
                <!-- 计费规则-->
                <billingRules v-if="item.path == 'billingRules'"/>
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
                activeName: 'first'
            }
        },
        created () {
            this.$F.handleThirdMenu(this);
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
