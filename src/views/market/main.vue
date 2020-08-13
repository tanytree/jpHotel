<!--
 * @LastEditors: 董林
 *
 -->
<template>
    <div class="boss-index">
        <el-tabs class="pageTab noBg" v-model="activeName">
            <!-- 房间动态 -->
            <el-tab-pane label="房间动态" name="one">
                <Roomstate/>
            </el-tab-pane>
            <!-- 开票申请 -->
            <el-tab-pane label="开票申请" name="two" class="bg">
                <Openapply/>
            </el-tab-pane>
            <!-- 留言管理 -->
            <el-tab-pane label="留言管理" name="three" class="bg">
                <Messageman/>
            </el-tab-pane>
            <!-- 物品寄存 -->
            <el-tab-pane label="物品寄存" name="four" class="bg">
                <Goods/>
            </el-tab-pane>
            <!-- 员工权限-->
            <el-tab-pane :label="$F.filterThirdMenu('frontOffice', 'staff-rights').thirdMenu"
                         v-if="$F.filterThirdMenu('frontOffice', 'staff-rights', true)" class="bg">
                <EmployeeRights/>
            </el-tab-pane>
        </el-tabs>
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
                activeName: "one",//第一个默认启动
            }
        },
        methods: {}
    };
</script>

<style lang="less" scoped>

</style>
