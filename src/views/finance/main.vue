/*
* @Author: Dana 广告管理
* @Date: 2020-03-10 13:45:16
* @Last Modified by: Dana
* @Last Modified time: 2020-03-11 16:59:58
*/
<template>
    <div>
        <el-tabs class="pageTab padding bg" v-model="activeName">
            <el-tab-pane label="收入图表" name="chart">
                <incomeStatus/>
            </el-tab-pane>
            <el-tab-pane label="收入账单" name="check">
                <bill/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import incomeStatus from './incomeStatus'
    import bill from './bill'
    import { mapState, mapActions } from 'vuex'

    export default {
        components: { incomeStatus, bill },
        data () {
            return {
                activeName: 'chart'
            }
        },
        methods: {}
    }
</script>

<style lang="scss">
    .income {
        height: 100%;
    }
    .bg {
        .el-tab-pane {
            background: #E2E2E2;
            border-radius: 6px;
        }
    }
</style>
