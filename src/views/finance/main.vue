/*
* @Author: Dana 广告管理
* @Date: 2020-03-10 13:45:16
* @Last Modified by: Dana
* @Last Modified time: 2020-03-11 16:59:58
*/
<template>
    <div class="boss-index">
        <el-tabs class="pageTab" v-model="activeName">
            <el-tab-pane label="财务慨览" name="overView">
                <incomeStatus/>
            </el-tab-pane>
            <el-tab-pane label="记一笔" name="record">
                <record />
            </el-tab-pane>
            <el-tab-pane label="员工权限" name="authority">
                <employeeRights />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import incomeStatus from './index/incomeStatus'
    import authority from './index/authority'
    import record from './index/record'
    import employeeRights from "@/components/employeeRights";
    import { mapState, mapActions } from 'vuex'

    export default {
        components: { incomeStatus, authority, record, employeeRights },
        data () {
            return {
                activeName: 'overView'
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
