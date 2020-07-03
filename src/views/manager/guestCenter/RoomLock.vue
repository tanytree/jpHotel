<!-- 楼栋楼层 -->
<template>
	<div id="page1">
		<el-row :gutter="20" style="font-size: 14px; font-weight: bolder;">
			<el-col :span="2.5">大仓集团**酒店</el-col>
			<el-col :span="2">共有2间酒店</el-col>
		</el-row>
		<el-row style="padding: 20px 0px;">
			<el-radio-group v-model="radio1">
				<el-radio-button label="楼栋1"></el-radio-button>
				<el-radio-button label="楼栋2"></el-radio-button>
			</el-radio-group>
		</el-row>
		<el-row>
			<el-row :gutter="20" class="demo-form-inline">
				<el-col :span="10" :offset="14">
					<el-row style="display: flex;justify-content: flex-end;flex: 1;margin-bottom: 20px;">
						<el-button type="primary" size="mini">按列批量修改</el-button>
					</el-row>
				</el-col>
			</el-row>
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
			 @selection-change="handleSelectionChange">
				<!-- <el-table-column type="selection" width="55"></el-table-column> -->
				<el-table-column prop="name" label="房间号"></el-table-column>
				<el-table-column prop="time" label="硬件"></el-table-column>
				<el-table-column prop="job_status" label="楼栋"></el-table-column>
				<el-table-column prop="job" label="楼层"></el-table-column>
				<el-table-column prop="number" label="锁号"></el-table-column>
				<el-table-column prop="part" label="接口类型"></el-table-column>
				<el-table-column prop="job" label="房锁配置信息"></el-table-column>
				<el-table-column prop="number" label="刷卡数"></el-table-column>
				<el-table-column prop="part" label="反开"></el-table-column>
				<el-table-column prop="job" label="锁类型"></el-table-column>
				<el-table-column prop="number" label="房间流水号"></el-table-column>
				<el-table-column prop="part" label="房间序列号"></el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="popup('detail')">修改</el-button>
						<el-button type="text" size="small" @click="popup('change')">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<div class="page-all">
					共
					<span style="font-weight:600;font-size: 14px;">400</span>条记录
				</div>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1"
				 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout=" sizes, prev, pager, next, jumper" :total="400"></el-pagination>
			</div>
		</el-row>
	</div>
</template>

<script>
	import HouseMaintain from './HouseMaintain'
	import BuildingFloor from './BuildingFloor'
	// import ProductCategory from './ProductCategory'
	// import httpRequest from '@/utils/httpRequest'
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		components: {
			HouseMaintain,
			BuildingFloor
		},
		computed: {
			...mapState({
				user: state => state.user
			}),
		},
		data() {
			return {
				activeName: 'second', //第一个默认启动
				radio1: '楼栋1',
				form: {
					keyword1: '',
					categoryid: '',
					date1: '',
					date2: '',
				},
				tableData: [{
					name: '张十三',
					time: '2020-5-20',
					job_status: '实习期',
					job: '普通员工',
					number: '11223',
					parts: '销售部'
				}, {
					name: '张十三',
					time: '2020-5-20',
					job_status: '实习期',
					job: '普通员工',
					number: '11223',
					parts: '销售部'
				}],
				options: [{
					value: 'zhinan',
					label: '指南',
					children: [{
						value: 'shejiyuanze',
						label: '设计原则',
						children: [{
							value: 'yizhi',
							label: '一致'
						}]
					}]
				}]
			}
		},
		created() {},
		activated() {},
		methods: {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.demo-form-inline {
		display: flex;
		align-items: center;
	}

	.row-width {
		width: 120px;
	}
</style>
