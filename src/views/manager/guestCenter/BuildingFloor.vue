<!-- 楼栋楼层 -->
<template>
    <div id="page1">
		<el-row :gutter="20" style="font-size: 14px; font-weight: bolder;">
			<el-col :span="2.5">大仓集团**酒店</el-col><el-col :span="2">共有2间酒店</el-col>
		</el-row>
		<el-row style="padding: 20px 0px;">
			<el-radio-group v-model="radio1">
			  <el-radio-button label="楼栋1"></el-radio-button>
			  <el-radio-button label="楼栋2"></el-radio-button>
			</el-radio-group>
		</el-row>
		<el-row :gutter="20" class="demo-form-inline">
			<el-col :span="6">楼层1共有<span style="color: #126EFF;">6</span>层 共有房间: <span style="color: #126EFF;">6</span>间</el-col>
			<el-col :span="6">
				<!-- 这里可以用面包屑,但是面包屑似乎没有点击事件只是路由跳转,需要后面写的人自己研究 -->
				<el-button type="text">修改</el-button>
				<span style="border-left: 1px solid #CCCCCC;height: 15px;"></span>
				<el-button type="text">删除</el-button>
				<span style="border-left: 1px solid #CCCCCC;height: 15px;"></span>
				<el-button type="text">前移</el-button>
				<span style="border-left: 1px solid #CCCCCC;height: 15px;"></span>
				<el-button type="text">后移</el-button>
			</el-col>
			<el-col :span="8" :offset="8">
				<el-button type="primary">新增楼栋</el-button>
				<el-button type="primary">新增楼层</el-button>
			</el-col>
		</el-row>
    </div>
</template>

<script>
    import HouseMaintain from './HouseMaintain'
    import BuildingFloor from './BuildingFloor'
    // import ProductCategory from './ProductCategory'
    // import httpRequest from '@/utils/httpRequest'
    import { mapState, mapActions } from "vuex";
    export default {
        components: { HouseMaintain,BuildingFloor},
        computed: {
            ...mapState({
                user: state => state.user
            }),
        },
        data () {
            return {
                activeName: 'second', //第一个默认启动
				radio1: '楼栋1'
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
	.demo-form-inline {
		display: flex;
		align-items: center;
	}
</style>
