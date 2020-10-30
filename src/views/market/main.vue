<!--
 * @LastEditors: Please set LastEditors
 *
 -->
<template>
    <div class="boss-index">
        <el-tabs class="pageTab noBg" v-model="activeName">
            <el-tab-pane
                v-for="item in menuList"
                :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                :name="item.path"
                :key="item.path"
                v-if="$F.filterThirdMenu('frontOffice', item.path, true)"
                :class="item.path !== 'Roomstate' ? 'bg' : ''"
            >
                <!-- 房间动态-->
                <Roomstate v-if="item.path == 'Roomstate'" />
                <!-- 收据记录-->
                <Openapply v-if="item.path == 'Openapply'" />
                <!-- 留言管理-->
                <Messageman v-if="item.path == 'Messageman'" />
                <!-- 物品寄存-->
                <Goods v-if="item.path == 'Goods'" />
                <!-- 员工权限-->
                <EmployeeRights v-if="item.path == 'staff-rights'" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Roomstate from "./home/roomstate";
import Openapply from "./home/openapply";
import Messageman from "./home/messageman";
import Goods from "./home/goods";
import EmployeeRights from "@/components/employeeRights";

export default {
    components: { Roomstate, Openapply, Messageman, Goods, EmployeeRights },
    data() {
        return {
            activeName: "",
        };
    },
    created() {
        this.$F.handleThirdMenu(this);
    },
    methods: {},
};
</script>

<style lang="less" scoped>
</style>
