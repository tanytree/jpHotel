<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-01 12:09:40
 * @FilePath: \jiudian\src\views\market\booking\index.vue
 -->

<template>
    <div id="page1" class="boss-index">
        <el-tabs class="pageTab noBg" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
                v-for="item in menuList"
                :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                :name="item.path"
                :key="item.path"
                v-if="$F.filterThirdMenu('frontOffice', item.path, true)"
                class="inRoom"
            >
                <!-- 普通预订-->
                <normal v-if="item.path == 'normal'" operCheckinType="b1"/>
                <!-- 当日回预订-->
                <normal v-if="item.path == 'dayBack'" operCheckinType="b2"/>
                <!-- 会场预订-->
                <hall v-if="item.path == 'hall'" operCheckinType="b3"/>
                <!-- 入住办理-->
                <!--        <checkin v-if="item.path == 'checkin'" operCheckinType="a1" />-->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import normal from "@/views/market/reception/checkin/normal";
import checkin from "@/views/market/reception/checkin";
import hall from "./hall";

export default {
    components: {normal, hall, checkin},
    data() {
        return {
            menuList: [],
            activeName: "normal",
        };
    },
    mounted() {
    },
    created() {
        this.$F.handleThirdMenu(this);
        for (let i = 0; i < this.menuList.length; i++) {
            if (this.menuList[i].path == 'hour') {
                this.menuList.splice(i, 1)
                break;
            }
        }
        console.log(this.menuList);
    },
    methods: {
        //二级tab切片
        handleClick(tab, event) {
            debugger
            // console.log(tab.index);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
