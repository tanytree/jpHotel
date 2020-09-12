<!--
 * @LastEditors: 董林
 *
 -->
<template>
    <div class="boss-index">
        <el-tabs class="pageTab noBg" v-model="activeName">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                 :name="item.path"
                 :key="item.path"
                 v-if="$F.filterThirdMenu('frontOffice', item.path, true) "
                 class="bg"
            >
                <!-- 沽清管理-->
                <wareHouseList v-if="item.path == 'wareHouseList'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex"
    import wareHouseList from "./warehouse/index/wareHouseList";

    export default {
        components: {wareHouseList},
        data() {
            return {
                activeName: "",//第一个默认启动
            }
        },
        created() {
            this.$F.handleThirdMenu(this);

        },
        computed: {
            ...mapState({
                token: state => state.user.token,
                userId: state => state.user.userId,
                msgKey: state => state.config.msgKey,
                plat_source: state => state.config.plat_source
            })
        },
        methods: {


        }
    };
</script>

<style lang="less" scoped>

</style>
