<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-11 14:00:42
 * @FilePath: \jiudian\src\views\market\reception\checkin.vue
 -->

<template>
    <div class="boss-index inRoom">
<!--        <normal :operCheckinType="activeName"></normal>-->
        <el-tabs v-model="activeName" class="tabCenter" @tab-click="handleClick">
            <el-tab-pane :label="$t('desk.order_ordinaryLive')" name="a1">
                <normal :operCheckinType="activeName"></normal>
            </el-tab-pane>
            <el-tab-pane :label="$t('desk.order_todayBack')" name="a2">
                <normal :operCheckinType="activeName"></normal>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import normal from "./checkin/normal";
    // import hour from "./checkin/hour";

    export default {
        components: {normal},
        data() {
            return {
                activeName: "a1"
            };
        },
        mounted() {
        },
        methods: {
            //二级tab切片
            handleClick(tab, event) {
                // console.log(tab.index);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .normal {
        padding: 0 10px 10px !important;
    }
</style>
