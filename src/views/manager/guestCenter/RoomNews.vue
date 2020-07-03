<!-- 楼栋楼层 -->
<template>
	<div id="page1">
		<el-row v-if="!add_show">
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
					<el-col :span="14">
						<el-form class="demo-form-inline" inline size="small">
							<el-form-item label="楼层全称:" class="margin-l">
								<el-select v-model="form.name" placeholder="请选择部门" style="width: 120px">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="房型:">
								<el-input v-model="form.name" style="width: 120px"></el-input>
							</el-form-item>
							<el-form-item label="房间号:" class="margin-l">
								<el-cascader :options="options" clearable style="width: 120px"></el-cascader>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" size="mini" style="width: 80px;">查询</el-button>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="10">
						<el-row style="display: flex;justify-content: flex-end;flex: 1;margin-bottom: 20px;">
							<el-button type="primary" size="mini" @click="addRoom()">新增房间</el-button>
							<el-button type="primary" size="mini" @click="addDomain">批量启用</el-button>
							<el-button type="primary" size="mini" @click="popup('change')">批量禁用</el-button>
							<el-button type="primary" size="mini">批量噪音房</el-button>
							<el-button type="primary" size="mini">批量高温房</el-button>
						</el-row>
					</el-col>
				</el-row>
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
				 @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="name" label="房间号"></el-table-column>
					<el-table-column prop="time" label="房型名称"></el-table-column>
					<el-table-column prop="job_status" label="楼栋"></el-table-column>
					<el-table-column prop="job" label="楼层"></el-table-column>
					<el-table-column prop="number" label="电话分机"></el-table-column>
					<el-table-column prop="part" label="朝向"></el-table-column>
					<el-table-column prop="job" label="是否靠马路"></el-table-column>
					<el-table-column prop="number" label="是否有窗"></el-table-column>
					<el-table-column prop="part" label="状态"></el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="popup('detail')">禁用</el-button>
							<el-button type="text" size="small" @click="popup('change')">修改</el-button>
							<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="onConfirm">
								<el-button slot="reference" type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
							</el-popconfirm>
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
		</el-row>
		<el-row>
			<AddRoom ref="AddRoom" :add_show="add_show" @changeShow="changeShow"></AddRoom>
		</el-row>
	</div>
</template>

<script>
	import HouseMaintain from './HouseMaintain'
	import BuildingFloor from './BuildingFloor'
	import AddRoom from './AddRoom'
	// import httpRequest from '@/utils/httpRequest'
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		components: {
			HouseMaintain,
			BuildingFloor,
			AddRoom
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
				}],
				add_show: false
			}
		},
		created() {},
		activated() {},
		methods: {
			addRoom() {
				this.add_show = true
			},
			changeShow(e) {
				console.log('e---',e)
				this.add_show = e
			}
		}
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
