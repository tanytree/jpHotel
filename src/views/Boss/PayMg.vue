<template>
	<div class="boss-index">
		<!--薪酬管理-->
		<el-tabs class="pageTab" v-model="activeName">
			<el-tab-pane label="薪酬管理" name="first">
				<div class="content">
					<el-row>
						<el-form class="demo-form-inline" inline size="small">
							<el-form-item label="员工名称:">
								<el-input v-model="form_1.content" class="row-width"></el-input>
							</el-form-item>
							<el-form-item label="工资月份:" class="margin-l">
								<el-col :span="11">
									<el-date-picker v-model="form_1.payTime" type="month" placeholder="选择月"></el-date-picker>
								</el-col>
							</el-form-item>
							<el-form-item label="员工状态:" class="margin-l">
								<el-select v-model="form_1.userStatus" placeholder="请选择状态" class="row-width">
									<el-option label="正式工" value="1"></el-option>
									<el-option label="实习期" value="2"></el-option>
									<el-option label="试用期" value="3"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="get_salary_mg_list">查询</el-button>
							</el-form-item>
						</el-form>
					</el-row>
					<div class="components-edit">
						<el-table ref="multipleTable" :data="tableData_1" height="100%" tooltip-effect="dark" :header-cell-style="{background:'#e6eaed',color:'#1E1E1E'}">
							<el-table-column prop="position" label="职位"></el-table-column>
							<el-table-column prop="userName" label="姓名"></el-table-column>
							<el-table-column prop="userStatus" label="员工状态"></el-table-column>
							<el-table-column prop="worknum" label="工号"></el-table-column>
							<el-table-column prop="payTime" label="工资月份"></el-table-column>
							<el-table-column label="基本工资">
								<el-table-column prop="baseWage" label="基础工资"></el-table-column>
								<el-table-column prop="socialBenefits" label="社保补助"></el-table-column>
								<el-table-column prop="otherWage" label="其他"></el-table-column>
								<el-table-column prop="secretWage" label="保密工资"></el-table-column>
							</el-table-column>
							<el-table-column prop="jobsWage" label="岗位工资"></el-table-column>
							<el-table-column prop="performance" label="绩效工资"></el-table-column>
							<el-table-column prop="bonus" label="奖金"></el-table-column>
							<el-table-column label="补贴">
								<el-table-column prop="mealSubsidies" label="餐补"></el-table-column>
								<el-table-column prop="houseSubsidies" label="房补"></el-table-column>
							</el-table-column>
							<el-table-column label="出勤">
								<el-table-column prop="demandJobDay" label="应出勤天数"></el-table-column>
								<el-table-column prop="realJobDay" label="实际出勤天数"></el-table-column>
								<el-table-column prop="jobsDemandWage" label="出勤工资应发"></el-table-column>
							</el-table-column>
							<el-table-column label="扣款">
								<el-table-column prop="lateDeductions" label="迟到扣款"></el-table-column>
								<el-table-column prop="socialDeduction" label="社保扣款"></el-table-column>
								<el-table-column prop="taxDeduction" label="个税扣款"></el-table-column>
							</el-table-column>
							<el-table-column prop="shouldPay" label="应发工资"></el-table-column>
							<el-table-column prop="realPay" label="实发工资"></el-table-column>
							<el-table-column prop="submitMoney" label="当月报销费用"></el-table-column>
							<el-table-column prop="name" label="总实发工资"></el-table-column>
							<el-table-column fixed="right" label="操作" width="160">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click="popup('ch_detail', scope)">员工详情</el-button>
									<el-button type="text" size="small" @click="popup('ch_change', scope)">修改</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="block">
							<div class="page-all">
								共
								<span style="font-weight:600;font-size: 14px;">400</span>条记录
							</div>
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form_1.pageIndex"
							 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout=" sizes, prev, pager, next, jumper" :total="400"></el-pagination>
						</div>
					</div>
				</div>
			</el-tab-pane>
			<!-- 薪酬设置 -->
			<el-tab-pane label="薪酬设置" name="second">
				<div class="content">
					<el-row>
						<el-form class="demo-form-inline" inline size="small">
							<el-form-item label="员工名称:">
								<el-input v-model="form_2.content" class="row-width"></el-input>
							</el-form-item>
							<el-form-item label="所在部门:" class="margin-l">
								<el-select v-model="form_2.departmentId" placeholder="请选择所在部门" style="width: 150px;">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item class="margin-l">
								<el-button type="primary">查询</el-button>
							</el-form-item>
						</el-form>
					</el-row>
					<div class="components-edit">
						<el-table ref="multipleTable" :data="tableData_2" height="100%" tooltip-effect="dark" :header-cell-style="{background:'#e6eaed',color:'#1E1E1E'}">
							<el-table-column prop="userName" label="员工姓名"></el-table-column>
							<el-table-column prop="userStatus" label="状态"></el-table-column>
							<el-table-column prop="position" label="职位"></el-table-column>
							<el-table-column prop="worknum" label="工号"></el-table-column>
							<el-table-column prop="name" label="所在部门"></el-table-column>
							<el-table-column label="操作" width="200">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click="popup('set_detail',scope)">查看</el-button>
									<el-button type="text" size="small" @click="popup('set_change',scope)">薪资设置</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="block">
							<div class="page-all">
								共
								<span style="font-weight:600;font-size: 14px;">400</span>条记录
							</div>
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form_2.pageIndex"
							 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout=" sizes, prev, pager, next, jumper" :total="400"></el-pagination>
						</div>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
		<!-- 薪酬修改 / 查看-->
		<el-dialog :title="salary_change_title" :visible.sync="dialogAdd" :close-on-click-modal="false">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row>
					<el-form-item label="基本工资:"></el-form-item>
				</el-row>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="基本工资:">
							<el-input v-model="ruleForm.baseWage" :disabled="iss_disabled"></el-input>
						</el-form-item>
						<el-form-item label="其他:">
							<el-input v-model="ruleForm.otherWage" :disabled="iss_disabled"></el-input>
						</el-form-item>
						<el-form-item label="岗位工资:">
							<el-input v-model="ruleForm.jobsWage" :disabled="iss_disabled"></el-input>
						</el-form-item>
						<el-form-item label="奖金:">
							<el-input v-model="ruleForm.bonus" :disabled="iss_disabled"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="社保补助:">
							<el-input v-model="ruleForm.socialBenefits" :disabled="iss_disabled"></el-input>
						</el-form-item>
						<el-form-item label="保密工资:">
							<el-input v-model="ruleForm.secretWage" :disabled="iss_disabled"></el-input>
						</el-form-item>
						<el-form-item label="绩效工资:">
							<el-input v-model="ruleForm.performance" :disabled="iss_disabled"></el-input>
						</el-form-item>
						<el-form-item label="工资月份:" prop="payTime">
							<el-date-picker v-model="ruleForm.payTime" type="month" placeholder="选择月" :disabled="iss_disabled"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="补贴:"></el-form-item>
				</el-row>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="房补:">
							<el-input v-model="ruleForm.houseSubsidies" :disabled="iss_disabled"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="餐补:">
							<el-input v-model="ruleForm.mealSubsidies" :disabled="iss_disabled"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="出勤天数:"></el-form-item>
				</el-row>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="应出勤天数:">
							<el-input v-model="ruleForm.demandJobDay" :disabled="iss_disabled"></el-input>
						</el-form-item>
						<el-form-item label="出勤工资应发:">
							<el-input v-model="ruleForm.jobsDemandWage" :disabled="iss_disabled"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="实际出勤天数:">
							<el-input v-model="ruleForm.realJobDay" :disabled="iss_disabled"></el-input>
						</el-form-item>
						<el-form-item label="发放日期:">
							<el-date-picker v-model="ruleForm.sendTime" type="date" placeholder="选择日期"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="扣款:"></el-form-item>
				</el-row>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="迟到扣款:">
							<el-input v-model="ruleForm.lateDeductions" :disabled="iss_disabled"></el-input>
						</el-form-item>
						<el-form-item label="社保扣款:">
							<el-input v-model="ruleForm.socialDeduction" :disabled="iss_disabled"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="个人扣税:">
							<el-input v-model="ruleForm.taxDeduction" :disabled="iss_disabled"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="应发工资:">
							<el-input v-model="ruleForm.shouldPay" :disabled="iss_disabled"></el-input>
						</el-form-item>
						<el-form-item label="实发工资:">
							<el-input v-model="ruleForm.realPay" :disabled="iss_disabled"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="当月报销费用:">
							<el-input v-model="ruleForm.submitMoney" :disabled="iss_disabled"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer" v-if="iss_disabled">
				<el-button @click="dialogAdd = false">关 闭</el-button>
			</span>
			<span slot="footer" class="dialog-footer" v-else>
				<el-button @click="dialogAdd = false">取 消</el-button>
				<el-button type="primary" @click="changeSalaryDefine('ruleForm')">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 薪酬设置 / 查看-->
		<el-dialog :title="salary_set_title" :visible.sync="dialogsalary_set" :close-on-click-modal="false">
			<el-form :model="setFrom" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row>
					<el-form-item label="基本工资:"></el-form-item>
				</el-row>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="基本工资:">
							<el-input v-model="setFrom.baseWage" :disabled="is_disabled"></el-input>
						</el-form-item>
						<el-form-item label="其他:">
							<el-input v-model="setFrom.otherWage" :disabled="is_disabled"></el-input>
						</el-form-item>
						<el-form-item label="岗位工资:">
							<el-input v-model="setFrom.jobsWage" :disabled="is_disabled"></el-input>
						</el-form-item>
						<el-form-item label="奖金:">
							<el-input v-model="setFrom.bonus" :disabled="is_disabled"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="社保补助:">
							<el-input v-model="setFrom.socialBenefits" :disabled="is_disabled"></el-input>
						</el-form-item>
						<el-form-item label="保密工资:">
							<el-input v-model="setFrom.secretWage" :disabled="is_disabled"></el-input>
						</el-form-item>
						<el-form-item label="绩效工资:">
							<el-input v-model="setFrom.performance" :disabled="is_disabled"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="补贴:"></el-form-item>
				</el-row>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="房补:">
							<el-input v-model="setFrom.houseSubsidies" :disabled="is_disabled"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="餐补:">
							<el-input v-model="setFrom.mealSubsidies" :disabled="is_disabled"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer" v-if="is_disabled">
				<el-button @click="dialogsalary_set = false">关 闭</el-button>
			</span>
			<span slot="footer" class="dialog-footer" v-else>
				<el-button @click="dialogsalary_set = false">取 消</el-button>
				<el-button type="primary" @click="setSalaryDefine">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				form_1: {
					content: '',
					userStatus: '',
					payTime: '',
					pageIndex: 1,
					pageSize: 10,
					paging: true,
				},
				form_2: {
					content: '',
					departmentId: '',
					pageIndex: 1,
					pageSize: 10,
					paging: true,
				},
				tableData_1: [{
					position: ''
				}],
				tableData_2: [{
					position: ''
				}],
				dialogAdd: false, // 修改薪酬
				salary_change_title: '', // 薪酬修改/查看弹框标题
				iss_disabled: false, //判断是修改还是查看,查看就是true,不可修改模式
				change_salary_info: {},
				ruleForm: {
					employeeId: '',
					payTime: '',
					sendTime: '',
					demandJobDay: '',
					realJobDay: '',
					jobsDemandWage: '',
					lateDeductions: '',
					socialDeduction: '',
					taxDeduction: '',
					shouldPay: '',
					realPay: '',
					submitMoney: '',
					baseWage: '',
					socialBenefits: '',
					otherWage: '',
					secretWage: '',
					jobsWage: '',
					performance: '',
					bonus: '',
					houseSubsidies: '',
					mealSubsidies: ''
				},
				rules: {
					payTime: [{
						required: true,
						message: '请选择发放月份',
						trigger: 'blur'
					}]
				},
				dialogsalary_set: false, // 薪资设置
				salary_set_title: '', // 薪酬设置/查看弹框标题
				is_disabled: false, //判断是修改还是查看,查看就是true,不可修改模式
				set_salary_info: {},
				setFrom: {
					employeeId: '',
					baseWage: '',
					socialBenefits: '',
					otherWage: '',
					secretWage: '',
					jobsWage: '',
					performance: '',
					bonus: '',
					houseSubsidies: '',
					mealSubsidies: ''
				}
			};
		},
		watch: {
			activeName() {
				if (this.activeName == 'first') {
					this.get_salary_mg_list()
				} else {
					this.get_salary_set_list()
				}
			}
		},
		created() {
			this.get_salary_mg_list()
		},
		methods: {
			popup(type, value) {
				switch (type) {
					case 'ch_detail':
						this.salary_change_title = '查看'
						this.iss_disabled = true;
						this.dialogAdd = true;
						this.change_salary_info = value
						break
					case 'ch_change':
						this.salary_change_title = '薪资修改'
						this.iss_disabled = false;
						this.dialogAdd = true;
						this.change_salary_info = value
						break
					case 'set_detail': // 薪资设置-查看
						this.salary_set_title = '查看'
						this.is_disabled = true;
						this.dialogsalary_set = true;
						this.set_salary_info = value
						break
					case 'set_change': // 薪资设置-设置
						this.salary_set_title = '薪资设置'
						this.is_disabled = false;
						this.dialogsalary_set = true;
						this.set_salary_info = value
						break
				}
			},
			// 确定-- 薪酬管理
			changeSalaryDefine(ruleForm) {
				this.setFrom.employeeId = this.set_salary_info.id
				let params = this.setFrom
				this.$refs[ruleForm].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				this.$F.doRequest(this, '/pms/wage/set_month_wage', params, (res) => {
					this.$F.doRequest(this, '/pms/wage/set_employee_wage', params, (res) => {
						this.$message({
							message: '修改成功!',
							type: 'success'
						});
					})
				})
			},
			// 确认--薪资设置
			setSalaryDefine() {
				this.setFrom.employeeId = this.set_salary_info.id
				let params = this.setFrom
				this.$F.doRequest(this, '/pms/wage/set_employee_wage', params, (res) => {
					this.$message({
						message: '设置成功!',
						type: 'success'
					});
				})
			},
			//薪资管理列表
			get_salary_mg_list() {
				let params = this.form_1
				this.$F.doRequest(this, '/pms/wage/month_wage_list', params, (res) => {
					res.wageList.forEach((value) => {
						value = Object.assign(value.employee, value.wage, value.employee.department)
					})
					// this.tableData = res
				})
			},
			//薪资设置列表
			get_salary_set_list() {
				let params = this.form_2
				this.$F.doRequest(this, '/pms/employee/employee_list', params, (res) => {
					res.wageList.forEach((value) => {
						value = Object.assign(value.employee, value.wage, value.employee.department)
					})
					// this.tableData = res
				})
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
		// align-items: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		background-color: #ffffff;

		.components-edit {
			display: flex;
			flex-direction: column;
			flex: 1;

			.delate-item {
				display: flex;
				align-items: center;
				padding: 10px 0px;

				.delate {
					padding: 6px 10px;
					border: 1px solid #999999;
					border-radius: 5px;
					margin-right: 10px;
				}

				.delate-select {
					margin-left: 20px;
				}
			}

			.block {
				padding: 10px 20px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.page-all {
					display: flex;
					width: 200px;
					font-size: 12px;
					color: #666666;
					letter-spacing: 2px;
				}
			}
		}

		.dateBox {
			width: 140px;
		}

		i {
			font-size: 12px;
		}

		.search-part {
			display: flex;
			align-items: center;
			border: 1px solid #999999;
			border-radius: 5px;
			height: 40px;

			input {
				border: none;
				border-radius: 5px;
				padding: 10px 10px;
			}

			span {
				background-color: #dfdfdf;
				height: 100%;
				border-top-right-radius: 5px;
				border-bottom-right-radius: 5px;
				width: 50px;
				display: inline-flex;
				align-items: center;
				justify-content: center;
			}

			.el-select {
				width: 120px;
			}
		}
	}
</style>
