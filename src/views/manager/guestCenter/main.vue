<!--
 * @Date: 2020-02-15 21:08:27
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-27 11:14:21
 * @FilePath: /cloudAdmin/src/views/market/productManagement/index.vue
 -->
<template>
    <div id="page1">
        <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="房屋维护" name="first">
                <HouseMaintain ref="HouseMaintain"/>
            </el-tab-pane>
            <el-tab-pane label="楼栋楼层" name="second" >
                <BuildingFloor ref="BuildingFloor"/>
            </el-tab-pane>
            <el-tab-pane label="房屋信息" name="third">
                <RoomNews ref="RoomNews"/>
            </el-tab-pane>
			<el-tab-pane label="房锁维护" name="fouth">
			    <RoomLock ref="RoomLock"/>
			</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import HouseMaintain from './HouseMaintain'
    import BuildingFloor from './BuildingFloor'
    import RoomNews from './RoomNews'
	import RoomLock from './RoomLock'
    // import httpRequest from '@/utils/httpRequest'
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
                activeName: 'second' //第一个默认启动
            }
        },
        created () {
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
