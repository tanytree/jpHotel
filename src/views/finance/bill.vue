<!--
 * @Date: 2020-03-20 19:11:04
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-13 17:52:16
 * @FilePath: /cloudAdmin/src/views/finance/account/bill.vue
 -->
<template>
    <div class="boss-index">
        <el-tabs class="pageTab" v-model="activeName">
            <el-tab-pane label="录凭证" name="overView">
                <inputEvidence/>
            </el-tab-pane>
            <el-tab-pane label="查凭证" name="record">
                <evidence />
            </el-tab-pane>
            <el-tab-pane label="设置" name="authority">
                <setup />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { get_consume_list, del_consume_info } from '@/utils/api/finance'
    import inputEvidence from './bill/inputEvidence'
    import evidence from './bill/evidence'
    import setup from './bill/setup'

    export default {
        components: { inputEvidence, evidence, setup },
        data () {
            return {
                activeName: 'overView'
            }
        },
    }
</script>

<style lang="scss">

</style>
