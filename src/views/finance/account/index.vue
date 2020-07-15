<!--
 * @Date: 2020-04-10 10:22:53
 * @LastEditors: cindy
 * @LastEditTime: 2020-04-13 17:48:45
 * @FilePath: /cloudAdmin/src/views/finance/account/index.vue
 -->

<template>
    <div class="boss-index" id="page1">
        <el-tabs class="pageTab" v-model="activeName">
            <el-tab-pane label="流水账" name="first">
                <accountRun ref="publishRef"/>
            </el-tab-pane>
            <el-tab-pane label="总账" name="second">
                <ledger />
            </el-tab-pane>
            <el-tab-pane label="明细账" name="third">
                <detailed ref="productList"/>
            </el-tab-pane>
            <el-tab-pane label="科目余额表" name="forth">
                <balance />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import detailed from "./detailed";
    import accountRun from "./accountrun";
    import ledger from "./ledger";
    import balance from "./balance";

    export default {
        components: {detailed, accountRun, ledger, balance},
        data() {
            return {
                activeName: "first" //第一个默认启动
            };
        },
        methods: {}
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .term {
        background: #fafafa;
        border-radius: 4px;
        margin-bottom: 20px;
        padding: 20px;

        &.line {
            .el-form-item {
                margin-bottom: 0;
            }
        }

        .export {
            float: right;
        }

        .el-input, .el-select {
            width: 160px
        }

        .line {
            margin: 0 10px;
        }
    }
    .flex-col {
        flex: 1;
        display: flex;
        flex-direction: column;

        .el-table {
            flex: 1;
            height: 0;
        }
        .total {
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            font-size: 15px;
            border: 1px solid #EBEEF5;
            border-top: 0;
        }
        .top {
            height: 44px;
            line-height: 44px;
            padding: 0 20px;
            font-size: 15px;
            border: 1px solid #EBEEF5;
            border-bottom: 0;
        }
    }
</style>
