<!--
 * @Date: 2020-03-10 13:58:24
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-13 09:13:50
 * @FilePath: /jiudian/src/views/sale/main.vue
 -->
<template>
    <div id="page1">
        <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                         :name="item.path"
                         :key="item.path"
                         v-if="$F.filterThirdMenu('sale', item.path, true)">
                <!-- 中央预定-->
                <Centralres v-if="item.path == 'central-reservation'"/>
                <!-- 员工权限-->
                <EmployeeRights v-if="item.path == 'staff-rights'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Centralres from './centralRes'
import EmployeeRights from '@/components/employeeRights'

export default {
    components: {Centralres, EmployeeRights},
    data() {
        return {
            menuList: [],
            activeName: ''
        }
    },
    created() {
        this.$F.handleThirdMenu(this);
        // for (let i = 0; i < this.menuList.length; i++) {
        //     if (this.menuList[i].path == 'central-reservation') {
        //         this.menuList.splice(i, 1)
        //         break;
        //     }
        // }
        // this.activeName = 'staff-rights';

    },

    methods: {
        //二级tab切片
        handleClick(tab, event) {
            console.log(tab, event)
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
