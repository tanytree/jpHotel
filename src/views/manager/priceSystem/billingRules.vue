<template>
	<div>
		<el-row v-if="tab1_show && tab2_show">
			<el-tabs v-model="activName">
				<el-tab-pane label="全天房计费" name="a">
					<el-row :gutter="20">
						<el-row>
							<el-form class="demo-form-inline" inline size="small">
								<el-form-item label="规则名称:">
									<el-input v-model="ruleForm.ruleName" class="row-width"></el-input>
								</el-form-item>
								<el-form-item label="计费模式:" class="margin-l">
									<el-select v-model="ruleForm.priceModel" style="width: 120px">
										<el-option :label="value.name" :value="value.key" v-for="(value, index) in priceModelList" :key="index"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="状态:" class="margin-l">
									<el-select v-model="ruleForm.state" style="width: 120px">
										<el-option :label="value.name" :value="value.key" v-for="(value, index) in statelList" :key="index"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" style="width: 100px;" size="mini" @click="searchBtn">查询</el-button>
								</el-form-item>
								<el-form-item style="display: flex;justify-content: flex-end;flex: 1;">
									<el-row>
										<el-button type="primary" @click="popup('addA')" style="width: 100px;" size="mini">新增</el-button>
									</el-row>
								</el-form-item>
							</el-form>
						</el-row>

						<div class="components-edit">
							<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
								<el-table-column prop="name" label="规则名称"></el-table-column>
								<el-table-column prop="time" label="计费模式"></el-table-column>
								<el-table-column prop="job_status" label="规则详情"></el-table-column>
								<el-table-column prop="time" label="状态"></el-table-column>
								<el-table-column prop="job_status" label="备注"></el-table-column>
								<el-table-column label="操作" width="200">
									<template slot-scope="scope">
										<el-button type="text" size="small" @click="popup('changeA')">修改</el-button>
										<el-button type="text" size="small" @click="popup('bin')">禁用</el-button>
										<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteRow(scope.row)">
											<el-button slot="reference" type="text" size="small">删除</el-button>
										</el-popconfirm>
									</template>
								</el-table-column>
							</el-table>
							<div class="block">
								<div class="page-all">
									共
									<span style="font-weight:600;font-size: 14px;">{{ruleForm.totalSize}}</span>条记录
								</div>
								<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="ruleForm.pageIndex"
								 :page-sizes="[100, 200, 300, 400]" :page-size="ruleForm.pageSize" layout=" sizes, prev, pager, next, jumper" :total="ruleForm.totalSize"></el-pagination>
							</div>
						</div>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="时租房计费" name="b">
					<el-row :gutter="20">
						<el-row>
							<el-form class="demo-form-inline" inline size="small">
								<el-form-item label="规则名称:">
									<el-input v-model="ruleForm.name" class="row-width"></el-input>
								</el-form-item>
								<el-form-item label="状态:" class="margin-l">
									<el-select v-model="ruleForm.name" placeholder="请选择部门" class="row-width">
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" style="width: 100px;" size="mini">查询</el-button>
								</el-form-item>
								<el-form-item style="display: flex;justify-content: flex-end;flex: 1;">
									<el-row>
										<el-button type="primary" @click="popup('addB')" style="width: 100px;" size="mini">新增</el-button>
									</el-row>
								</el-form-item>
							</el-form>
						</el-row>
						<div class="components-edit">
							<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
								<el-table-column prop="name" label="规则名称"></el-table-column>
								<el-table-column prop="job_status" label="规则详情"></el-table-column>
								<el-table-column prop="time" label="状态"></el-table-column>
								<el-table-column prop="job_status" label="备注"></el-table-column>
								<el-table-column label="操作" width="200">
									<template slot-scope="scope">
										<el-button type="text" size="small" @click="popup('changeA')">修改</el-button>
										<el-button type="text" size="small" @click="popup('bin')">禁用</el-button>
										<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteRow(scope.row)">
											<el-button slot="reference" type="text" size="small">删除</el-button>
										</el-popconfirm>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="配置计费规则" name="c">
					<el-row :gutter="20">
						<el-row>
							<el-form class="demo-form-inline" inline size="small">
								<el-form-item label="会员类型:">
									<el-select v-model="ruleForm_r.memberId" placeholder="请选择部门" class="row-width">
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" style="width: 100px;" size="mini">查询</el-button>
								</el-form-item>
							</el-form>
						</el-row>
						<div class="components-edit">
							<el-table ref="multipleTable" :data="tableData_a" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
								<el-table-column prop="name" label="会员类型"></el-table-column>
								<el-table-column prop="job_status" label="计费规则"></el-table-column>
								<el-table-column prop="time" label="状态"></el-table-column>
								<el-table-column label="操作" width="200">
									<template slot-scope="scope">
										<el-button type="text" size="small" @click="popup('sit')">设置</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</el-row>
		<!-- 全天房添加 -->
		<el-row v-if="!tab1_show">
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back_1" content=""></el-page-header>
			</el-row>
			<el-row :gutter="20">
				<el-form :model="allForm" :rules="allRules" ref="allForm" label-width="100px">
					<el-col :span="20">
						<el-form-item label="会员类型:">
							<el-radio-group v-model="allForm.priceModel">
								<el-radio label="1">固定时间退房模式</el-radio>
								<el-radio label="2">24小时退房模式</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="规则名称:" prop="ruleName">
							<el-input v-model="allForm.ruleName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="起步收费:" prop="checkinStartHourhouse">
							<el-col>
								入住<el-input v-model="allForm.checkinStartMinute" style="width: 70px;margin: 0px 10px;"></el-input>分钟后收起步费,入住
								<el-input v-model="allForm.checkinStartHourhouse" style="width: 70px;margin: 0px 10px;"></el-input>分钟后收全日租
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="退房时间:" prop="name">
							<el-row style="display: flex;align-items: center;">
								<el-col span="1">次日</el-col>
								<el-time-select v-model="allForm.checkoutTime" :picker-options="{
								    start: '08:30',
								    step: '00:15',
								    end: '18:30'
								  }"
								 placeholder="选择时间">
								</el-time-select>
							</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="超时收费:" prop="name">
							<el-col :span="20">
								超过<el-input v-model="allForm.outtimeMinute" style="width: 70px; margin: 0px 10px;"></el-input>分钟后收费,
								按 <el-radio-group v-model="allForm.outtimeRule" class="margin-l">
									<el-radio label="1">半日租加收</el-radio>
									<el-radio label="2">每小时加收</el-radio>
								</el-radio-group>
								<el-checkbox v-model="allForm.outtimeRuleCaps" class="margin-l">夹收封顶</el-checkbox>
							</el-col>
							<el-col :span="20">
								超过<el-input v-model="allForm.outtimeAllday" style="width: 70px;margin: 0px 10px;"></el-input>分钟后收全日租
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="备注:">
							<el-col>
								<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="allForm.remark"></el-input>
							</el-col>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-table ref="multipleTable" :data="allForm.roomStrategyJson" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="houseName" label="房型"></el-table-column>
				<el-table-column prop="name" label="起步价">
					<template slot-scope="scope">
						<el-row class="demo-form-inline">
							<el-input v-model="scope.row.startPrice"></el-input>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="每小时加收">
					<template slot-scope="scope">
						<el-row class="demo-form-inline">
							<el-input v-model="scope.row.hourAddPrice"></el-input>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="封顶费">
					<template slot-scope="scope">
						<el-input v-model="scope.row.topPrice"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="备注">
					<template slot-scope="scope">
						<el-input v-model="scope.row.remark"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;" @click="saveInfo_d">保存</el-button>
				<el-button style="width: 80px;margin-left: 20px;" @click="back_1">返回</el-button>
			</el-row>
		</el-row>
		<!-- 时租房添加 -->
		<el-row v-if="!tab2_show">
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back_2" content=""></el-page-header>
			</el-row>
			<el-row :gutter="20">
				<el-form :model="ruleForm_h" :rules="rules_h" ref="ruleForm" label-width="200px" style="display: flex;flex-direction: column;align-items: flex-start;">
					<el-col :span="20" style="display: flex;align-items: center;">
						<el-form-item label="规则名称:">
							<el-input v-model="ruleForm_h.ruleName" style="width: 120px" />
							<!-- <el-select v-model="ruleForm_h.ruleName" placeholder="请选择租房规则">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select> -->
						</el-form-item>
						<el-checkbox v-model="ruleForm_h.state" class="margin-l" style="margin-bottom: 20px;">启用</el-checkbox>
					</el-col>
					<el-col :span="20" style="margin-bottom: 20px;">
						<el-checkbox v-model="ruleForm_h.name" class="margin-l">指定办理入住时间段:</el-checkbox>
						<el-date-picker
						      v-model="ruleForm_h.startTime"
						      type="date"
						      placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
						    </el-date-picker>-
							<el-date-picker
							      v-model="ruleForm_h.endTime"
							      type="date"
							      placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
							    </el-date-picker>
					</el-col>
					<el-col :span="20" style="margin-bottom: 20px;">
						<el-form-item label="起步收费:" prop="name">
							<el-col>
								入住<el-input v-model="ruleForm_h.checkinStartMinute" style="width: 70px;margin: 0px 10px;"></el-input>分钟后收起步费,入住
								<el-input v-model="ruleForm_h.checkinStartHourhouse" style="width: 70px;margin: 0px 10px;"></el-input>分钟后收时租房全价
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="超时收费:" prop="name">
							<el-col :span="20">
								超过<el-input v-model="ruleForm_h.outtimeMinute" style="width: 70px; margin: 0px 10px;"></el-input>分钟后收费,
								超过<el-input v-model="ruleForm_h.outtimeAllday" style="width: 70px; margin: 0px 10px;"></el-input>分钟后转全日租
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="超时收费规则:" prop="name">
							<el-radio-group v-model="ruleForm_h.outtimeRule" class="margin-l">
								<el-radio label="1">半日租加收</el-radio>
								<el-radio label="2">每小时加收</el-radio>
							</el-radio-group>
							<el-checkbox v-model="ruleForm_h.outtimeRuleCaps" class="margin-l">夹收封顶</el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="备注:">
							<el-col>
								<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.remark"></el-input>
							</el-col>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-table ref="multipleTable" :data="ruleForm_h.roomStrategyJson" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="houseName" label="房型"></el-table-column>
				<el-table-column  label="全价">
					<template slot-scope="scope">
						<el-row class="demo-form-inline">
							<el-input v-model="scope.row.allPrice"></el-input>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="起步价">
					<template slot-scope="scope">
						<el-row class="demo-form-inline">
							<el-input v-model="scope.row.startPrice"></el-input>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="每小时加收">
					<template slot-scope="scope">
						<el-row class="demo-form-inline">
							<el-input v-model="scope.row.hourAddPrice"></el-input>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="封顶费">
					<template slot-scope="scope">
						<el-input v-model="scope.row.topPrice"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="预收房费">
					<template slot-scope="scope">
						<el-input v-model="scope.row.advancePrice"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="备注">
					<template slot-scope="scope">
						<el-input v-model="scope.row.allPrice"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;" @click="saveInfo_h">保存</el-button>
				<el-button style="width: 80px;margin-left: 20px;" @click="tab2_show = false">返回</el-button>
			</el-row>
		</el-row>
		<!-- 设置 -->
		<el-dialog top="0" title="设置" :visible.sync="dialogsit" :close-on-click-modal="false">
			<el-row :gutter="20">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
					<el-col :span="18">
						<el-form-item label="会员类型:">
							<el-input v-model="ruleForm.name" disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="状态:">
							 <el-radio-group v-model="radio">
							    <el-radio :label="3">启用</el-radio>
							    <el-radio :label="6">禁用</el-radio>
							  </el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="计费规则:" class="margin-l">
							<el-select v-model="ruleForm.name" placeholder="请选择计费规则" style="width: 100%;">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tab1_show: true,
				tab2_show: true,
				activName: 'a',
				tableData_a: [],
				tableData_b: [],
				tableData: [],
				allForm: {
					priceModel: '1',
					ruleName: '',
					checkinStartMinute: '',
					checkinStartHourhouse: '',
					checkoutTime: '',
					outtimeMinute: '',
					outtimeAllday: '',
					outtimeRule: '2',
					outtimeRuleCaps: true,
					remark: '',
					roomStrategyJson: [],
				},
				ruleForm: {
					ruleName: '',
					priceModel: '',
					state: '',
					pageIndex: 1,
					pageSize: 10,
					totalSize: 0
				},
				ruleForm_h:{
					ruleName: 1,
					checkinStartMinute: '',
					checkinStartHourhouse: '',
					outtimeMinute: '',
					outtimeAllday: '',
					startTime: '',
					endTime: '',
					outtimeRule: '2',
					outtimeRuleCaps: true,
					remark: '',
					state: true,
					roomStrategyJson: [],
				},
				rules_h: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				ruleForm_r: {
					memberId: '',
					pageIndex:1,
					pageSize: 10
				},
				dialogsit: false,
				priceModelList: [{
					name: '固定时间退房模式',
					key: '1'
				},{
					name: '24小时退房模式',
					key: '2'
				}],
				statelList: [{
					name: '启动',
					key: '1'
				},{
					name: '禁用',
					key: '2'
				}]
			};
		},
		watch:{
			activName() {
				switch (this.activName) {
					case 'a':
						this.get_hotel_rule_allday_list()
						break
					case 'b':
						this.get_hotel_rule_hour_list()
						break
					case 'c':
						this.get_hotel_rule_hour_list()
						break
				}
			}
		},
		created() {
			this.get_hotel_rule_allday_list()
		},
		methods: {
			popup(type) {
				// debugger
				switch (type) {
					case 'addA':
						this.tab1_show = false;
						this.get_hotel_room_type_list()
						break
					case 'addB':
						this.tab2_show = false;
						this.get_hotel_room_type_list()
						break
					case 'sit':
						this.dialogsit = true;
						break
				}
			},
			// 查询
			searchBtn() {
				this.get_hotel_rule_allday_list()
			},
			// 全天房保存
			saveInfo_d() {
				// let params = Object.assign({} ,this.allForm)
                let params = this.$F.deepClone(this.allForm);
				if (params.outtimeRuleCaps) {
					params.outtimeRuleCaps = 1
				} else {
					params.outtimeRuleCaps = 2
				}
				params.roomStrategyJson = JSON.stringify(params.roomStrategyJson);
				debugger
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_allday_save', params, (res) => {

				})
			},
			// 时租房保存
			saveInfo_h() {
				let params = Object.assign({} ,this.ruleForm_h)
				if (params.outtimeRuleCaps) {
					params.outtimeRuleCaps = 1
				} else {
					params.outtimeRuleCaps = 2
				}
				if (params.state) {
					params.state = 1
				} else {
					params.state = 2
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_hour_save', params, (res) => {

				})
			},
			// 获取 全部房型
			get_hotel_room_type_list() {
				let params = {
					roomType:3,
					paging:false,
					pageIndex:1,
					pageSize:999
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_room_type_list', params, (res) => {
					if (res.list.length != 0) {
						res.list.forEach(item =>{
							item.startPrice = ''
							item.hourAddPrice = ''
							item.topPrice = ''
							item.remark = ''
						})
						this.allForm.roomStrategyJson = res.list
						this.ruleForm_h.roomStrategyJson = res.list
					}
				})
			},
			// 获取 计费规则全天房计费列表
			get_hotel_rule_allday_list() {
				let params = Object.assign({} ,this.ruleForm)
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_allday_list', params, (res) => {
					if (res.list.length != 0) {
						this.tableData_a = res.list
					}
				})
			},
			// 获取 计费规则时租房计费列表
			get_hotel_rule_hour_list() {
				let params = Object.assign({} ,this.ruleForm)
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_hour_list', params, (res) => {
					if (res.list.length != 0) {
						this.tableData_b = res.list
					}
				})
			},
			back_1() {
				this.tab1_show = true;
			},
			back_2() {
				this.tab2_show = true;
			},
			// 分页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	};
</script>

<style lang="less" scoped>
	.margin-l {
		margin-left: 15px;
	}

	.row-width {
		width: 120px;
	}

	.padding-item {
		padding-bottom: 5px;
	}

	.demo-form-inline {
		display: flex;
		align-items: center;
	}

	.btn-click {
		height: 200px;
		width: 300px;
		background: #e5e5e5;
		// background-color: linear-gradient(toright, #e5e5e5, #e5e5e5);
		display: flex;
		justify-content: center;
		align-items: center;

		i {
			font-size: 30px;
		}

		span {
			font-size: 20px;
			color: #666666;
			margin-left: 10px;
		}
	}

	.btn-click:hover {
		height: 200px;
		width: 300px;
		background: #4db8ff;
		// background: linear-gradient(toright, #4db8ff, #1aa3ff);
		display: flex;
		justify-content: center;
		align-items: center;

		i {
			font-size: 30px;
			color: #fff;
		}

		span {
			font-size: 20px;
			color: #fff;
			margin-left: 10px;
		}
	}
</style>
