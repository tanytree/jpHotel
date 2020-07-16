<!--
 * @Date: 2020-03-20 19:11:04
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-13 17:52:16
 * @FilePath: /cloudAdmin/src/views/finance/account/bill.vue
 -->
<template>
    <div class="boss-index">
        <el-card shadow="never">
            <div class="titleBox">
                <span class="title">记账凭证</span>
                <span class="tip">2020年第5期</span>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {get_consume_list, del_consume_info} from "@/utils/api/finance";

    export default {
        data() {
            return {};
        },
        methods: {}
    };
</script>

<style lang="scss">
    .titleBox {
        text-align: center;
        color: #1e1e1e;

        .title {
            font-size: 26px;
        }

        .tip {
            font-size: 14px;
            margin-left: 30px;
        }
    }
</style>
