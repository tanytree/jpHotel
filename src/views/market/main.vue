<!--
 * @LastEditors: 董林
 *
 -->
<template>
    <div class="boss-index">
        <el-tabs class="pageTab" v-model="activeName">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                         :name="item.path"
                         :key="item.path"
                         v-if="$F.filterThirdMenu('frontOffice', item.path, true)">
                <!-- 房间动态-->
                <Roomstate v-if="item.path == 'Roomstate'"/>
                <!-- 收据记录-->
                <Openapply v-if="item.path == 'Openapply'"/>
                <!-- 留言管理-->
                <Messageman v-if="item.path == 'Messageman'"/>
                <!-- 物品寄存-->
                <Goods v-if="item.path == 'Goods'"/>
                <!-- 员工权限-->
                <EmployeeRights v-if="item.path == 'staff-rights'"/>
            </el-tab-pane>
        </el-tabs>

<!--        <el-tabs class="pageTab noBg" v-model="activeName">-->
<!--            &lt;!&ndash; 房间动态 &ndash;&gt;-->
<!--            <el-tab-pane label="房间动态" name="one">-->
<!--                <Roomstate/>-->
<!--            </el-tab-pane>-->
<!--            &lt;!&ndash; 开票申请 &ndash;&gt;-->
<!--            <el-tab-pane label="收据记录" name="two" class="bg">-->
<!--                <Openapply/>-->
<!--            </el-tab-pane>-->
<!--            &lt;!&ndash; 留言管理 &ndash;&gt;-->
<!--            <el-tab-pane label="留言管理" name="three" class="bg">-->
<!--                <Messageman/>-->
<!--            </el-tab-pane>-->
<!--            &lt;!&ndash; 物品寄存 &ndash;&gt;-->
<!--            <el-tab-pane label="物品寄存" name="four" class="bg">-->
<!--                <Goods/>-->
<!--            </el-tab-pane>-->
<!--            &lt;!&ndash; 员工权限&ndash;&gt;-->
<!--            <el-tab-pane :label="$F.filterThirdMenu('frontOffice', 'staff-rights').thirdMenu"-->
<!--                         v-if="$F.filterThirdMenu('frontOffice', 'staff-rights', true)" class="bg">-->
<!--                <EmployeeRights/>-->
<!--            </el-tab-pane>-->
<!--        </el-tabs>-->
    </div>
</template>

<script>
    import Roomstate from "./home/roomstate";
    import Openapply from "./home/openapply";
    import Messageman from "./home/messageman";
    import Goods from "./home/goods";
    import EmployeeRights from '@/components/employeeRights'

    export default {
        components: {Roomstate, Openapply, Messageman, Goods, EmployeeRights},
        data() {
            return {
                activeName: "",//第一个默认启动
            }
        },
        created() {
            this.$F.handleThirdMenu(this);
        },
        methods: {}
    };
</script>

<style lang="less" scoped>

</style>
