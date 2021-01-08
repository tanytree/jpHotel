<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-08 16:20:48
 * @FilePath: \jiudian\src\views\market\reception\index.vue
 -->

<template>
    <div id="page1" class="boss-index">
        <el-tabs class="pageTab noBg" v-model="activeName">
            <el-tab-pane
                v-for="item in menuList"
                :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                :name="item.path"
                :key="item.path"
                v-if="$F.filterThirdMenu('frontOffice', item.path, true)"
                :class="item.path !== 'checkin' ? 'bg' : ''"
            >
                <!-- 入住办理-->
<!--                <checkin v-if="item.path == 'checkin'"/>-->
                <!-- 前台报表-->
<!--                <reportform v-if="item.path == 'reportform'"/>&lt;!&ndash; 报表&ndash;&gt;-->
                <Report v-if="item.path == 'reportform'"  sourcePage='desk' :shopNo='shopNo'/>
                <!-- 前台交班-->
<!--                <shiftover v-if="item.path == 'shiftover'"/>-->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import checkin from "./checkin";
import reportform from "./reportform";
import shiftover from "./shiftover";
import Report from "@/views/finance/report/main";


export default {
    components: {checkin, reportform, shiftover, Report},
    data() {
        return {
            activeName: ""
        };
    },
      computed:{
      ...mapState({
        shopNo:(state)=>state.user.storesInfo.storesNum
      })
    },
    created() {
        this.$F.handleThirdMenu(this);
        // for (let i = 0; i < this.menuList.length; i++) {
        //     if (this.menuList[i].path == 'reportform') {
        //         this.menuList.splice(i, 1)
        //         break;
        //     }
        // }
        // for (let i = 0; i < this.menuList.length; i++) {
        //     if (this.menuList[i].path == 'shiftover') {
        //         this.menuList.splice(i, 1)
        //         break;
        //     }
        // }
    },
    mounted() {
    },
    methods: {
        //二级tab切片
        handleClick(tab, event) {
            // console.log(tab.index);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
