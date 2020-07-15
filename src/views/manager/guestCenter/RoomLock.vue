<!-- 房锁维护 -->
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
						<el-button type="primary" size="mini" @click="popup('addPie')">按列批量修改</el-button>
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
						<el-button type="text" size="small" @click="popup('change')">修改</el-button>
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
		<!-- 按列批量修改 -->
		<el-dialog top="0" title="按列批量修改" :visible.sync="dialogAdd_kinds" :close-on-click-modal="false">
			<el-row class="demo-form-inline">
				<el-checkbox-group v-model="checkList" style="line-height: 30px;">
				    <el-checkbox label="硬件"></el-checkbox>
				    <el-checkbox label="楼栋"></el-checkbox>
				    <el-checkbox label="楼层"></el-checkbox>
					<el-checkbox label="锁号"></el-checkbox>
					<el-checkbox label="接口类型"></el-checkbox>
					<el-checkbox label="门锁配置信息"></el-checkbox>
					<!-- 这是为了显得多，下面的不是ui图上的 -->
					<el-checkbox label="硬件"></el-checkbox>
					<el-checkbox label="楼栋"></el-checkbox>
					<el-checkbox label="楼层"></el-checkbox>
					<el-checkbox label="锁号"></el-checkbox>
					<el-checkbox label="接口类型"></el-checkbox>
					<el-checkbox label="门锁配置信息"></el-checkbox>
				  </el-checkbox-group>
			</el-row>
			<el-row>
				<!-- 这里看设计图，因为不一样，根据列不一样展示下拉，输入框，或者单选 -->
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
				 @selection-change="handleSelectionChange">
					<el-table-column prop="name" label="名称" width="150"></el-table-column>
					<el-table-column prop="name" label="设置值">
						<template slot-scope="name">
							<el-input v-model="name"></el-input>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改 -->
		<el-dialog top="0" title="修改" :visible.sync="dialogChange_show" :close-on-click-modal="false">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row class="demo-form-inline">
					<el-col>
						<!-- 得去确认哪些是必填项 -->
						<!-- 详情和修改是一样的，可以将输入框变成不可输入，去掉取消确认按钮 标题变成详情-->
						<el-form-item label="房间号" :disabled="true">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="楼层" :disabled="true">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="接口类型" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="反开">
							<el-radio-group v-model="ruleForm.resource">
								<el-radio label="是"></el-radio>
								<el-radio label="否"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="房间流水号">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数1">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数3">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数5">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数7">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="硬件:">
							<el-select v-model="ruleForm.name" placeholder="请选择硬件" class="row-width">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="楼栋">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="锁号">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="房间配置信息">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="锁类型">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="房间序列号">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数2">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数4">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数6">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数8">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="制卡数">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="centerDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			  </span>
		</el-dialog>
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
				}],
				dialogAdd_kinds : false,
				checkList: ['硬件','楼栋'],
				dialogChange_show: false,
				ruleForm: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						}
					]
				}
			}
		},
		created() {},
		activated() {},
		methods: {
			popup(type) {
				switch (type) {
					case 'addPie':
					this.dialogAdd_kinds = true
					break
					case 'change':
					this.dialogChange_show = true
					break
				}
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
