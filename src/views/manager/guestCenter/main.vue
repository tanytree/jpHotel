<!--
 * @Date: 2020-02-15 21:08:27
 * @LastEditors: 何丽梅
 * @LastEditTime: 2020-04-27 11:14:21
 * @FilePath: /cloudAdmin/src/views/market/productManagement/index.vue
 -->
<template>
    <div id="page1" class="boss-index">
        <el-tabs class="pageTab" v-model="activeName">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                         :name="item.path"
                         :key="item.path"
                         v-if="$F.filterThirdMenu('finance', item.path, true)">
                <!-- 房型维护-->
                <HouseMaintain v-if="item.path == 'HouseMaintain'"/>
                <!-- 楼栋楼层-->
                <BuildingFloor v-if="item.path == 'BuildingFloor'"/>
                <!-- 房屋信息-->
                <RoomNews v-if="item.path == 'RoomNews'"/>
                <!-- 房锁维护-->
                <RoomLock v-if="item.path == 'RoomLock'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import HouseMaintain from './HouseMaintain'
    import BuildingFloor from './BuildingFloor'
    import RoomNews from './RoomNews'
	import RoomLock from './RoomLock'
    import { mapState, mapActions } from "vuex";
    export default {
        components: { HouseMaintain,BuildingFloor,RoomNews,RoomLock},
        computed: {
            ...mapState({
                user: state => state.user
            }),
        },
        data () {
            return {
                activeName: '' //第一个默认启动
            }
        },
        created() {
          this.$F.handleThirdMenu(this);
        },
        activated () {
        },
        methods: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
