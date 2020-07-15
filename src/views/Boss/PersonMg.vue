<template>
	<div class="boss-index">
		<!--员工管理-->
		<el-tabs class="pageTab" v-model="activeName">
			<el-tab-pane label="人员管理" name="first">
				<el-tabs v-model="active_second_name" type="card">
					<div class="content">
						<el-row>
							<el-form class="demo-form-inline" inline size="small">
								<el-form-item label="员工名称:">
									<el-input v-model="form.content" class="row-width"></el-input>
								</el-form-item>
								<el-form-item label="入职时间:" class="margin-l">
									<el-col :span="11">
										<el-date-picker type="date" placeholder="选择日期" v-model="form.inStartTime" class="row-width"></el-date-picker>
									</el-col>
									<el-col class="line" :span="2">-</el-col>
									<el-col :span="11">
										<el-time-picker placeholder="选择时间" v-model="form.inEndTime" class="row-width"></el-time-picker>
									</el-col>
								</el-form-item>
								<el-form-item label="所在部门:" class="margin-l">
									<el-select v-model="form.departmentId_name" placeholder="请选择部门" class="row-width">
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" style="width: 100px;">查询</el-button>
								</el-form-item>
								<el-form-item style="display: flex;justify-content: flex-end;flex: 1;">
									<el-row style="display: flex;justify-content: flex-end;flex: 1;">
										<el-button type="primary" @click="submitForm('dynamicValidateForm')" style="width: 100px;">下载模板</el-button>
										<el-button @click="addDomain" style="width: 100px;">批量导入</el-button>
										<el-button @click="popup('change')" style="width: 100px;">添加员工</el-button>
									</el-row>
								</el-form-item>
							</el-form>
						</el-row>
						<div class="components-edit">
							<el-table ref="multipleTable" :data="tableData" height="100%" tooltip-effect="dark" :header-cell-style="{background:'#e6eaed',color:'#1E1E1E'}"
							 @selection-change="handleSelectionChange">
								<el-table-column prop="name" label="员工姓名"></el-table-column>
								<el-table-column prop="time" label="入职时间"></el-table-column>
								<el-table-column prop="job_status" label="在职状态"></el-table-column>
								<el-table-column prop="job" label="职位"></el-table-column>
								<el-table-column prop="number" label="工号"></el-table-column>
								<el-table-column prop="part" label="所在部门"></el-table-column>
								<el-table-column label="操作" width="350">
									<template slot-scope="scope">
										<el-button type="text" size="small" @click="popup('change')">修改</el-button>
										<el-button type="text" size="small" @click="popup('detail')">详情</el-button>
										<el-button type="text" size="small" @click="popup('gone')">办理离职</el-button>
										<el-button type="text" size="small" @click="popup('zheng')">转正</el-button>
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
						</div>
					</div>
				</el-tabs>
			</el-tab-pane>
			<!-- 已离职员工 -->
			<el-tab-pane label="已离职员工" name="second">
				<el-tabs v-model="active_second_name" type="card">
					<div class="content">
						<el-row>
							<el-form class="demo-form-inline" inline size="small">
								<el-form-item label="员工名称:">
									<el-input v-model="form.name" class="row-width"></el-input>
								</el-form-item>
								<el-form-item label="离职时间:" class="margin-l">
									<el-col :span="11">
										<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" class="row-width"></el-date-picker>
									</el-col>
									<el-col class="line" :span="2">-</el-col>
									<el-col :span="11">
										<el-time-picker placeholder="选择时间" v-model="form.date2" class="row-width"></el-time-picker>
									</el-col>
								</el-form-item>
								<el-form-item class="margin-l">
									<el-button type="primary">查询</el-button>
								</el-form-item>
							</el-form>
						</el-row>
						<div class="components-edit">
							<el-table ref="multipleTable" :data="tableData" height="100%" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
							 @selection-change="handleSelectionChange">
								<!-- <el-table-column type="index" label="序号" width="50"></el-table-column> -->
								<el-table-column prop="name" label="员工姓名"></el-table-column>
								<el-table-column prop="time" label="入职时间"></el-table-column>
								<el-table-column prop="job" label="职位"></el-table-column>
								<el-table-column prop="number" label="工号"></el-table-column>
								<el-table-column prop="part" label="离职时间"></el-table-column>
								<el-table-column label="操作" width="250">
									<template slot-scope="scope">
										<el-button type="text" size="small"  @click="popup('detail')">详情</el-button>
										<el-button type="text" size="small">重新入职</el-button>
										<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="onConfirm">
											<el-button slot="reference" type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
										</el-popconfirm>
										<!-- <el-button type="text" size="small">删除</el-button> -->
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
						</div>
					</div>
				</el-tabs>
			</el-tab-pane>
		</el-tabs>
		<!-- 添加员工 -->
		<el-dialog top="0" title="添加员工" :visible.sync="dialogAdd" :close-on-click-modal="false" center>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="员工状态">
					<el-radio-group v-model="ruleForm.userStatus" @change="changeRedio">
						<el-radio label="1">正式工</el-radio>
						<el-radio label="2">实习工</el-radio>
						<el-radio label="3">试用期</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="姓名" prop="userName">
							<el-input v-model="ruleForm.userName"></el-input>
						</el-form-item>
						<el-form-item label="证件类型">
							<el-select v-model="ruleForm.idcardType" placeholder="请选择证件类型" style="width: 100%;" @change="select_idcardType">
								<el-option label="身份证" value="1"></el-option>
								<el-option label="护照" value="2"></el-option>
								<el-option label="驾驶证" value="3"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所属部门" prop="name">
							<el-select v-model="ruleForm.departmentId" placeholder="请选择所属部门" style="width: 100%;" @change="select_departmentId">
								<el-option label="身份证" value="1"></el-option>
								<el-option label="护照" value="2"></el-option>
								<el-option label="驾驶证" value="3"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="工号">
							<el-input v-model="ruleForm.worknum"></el-input>
						</el-form-item>
						<el-form-item label="企业邮箱">
							<el-input v-model="ruleForm.email"></el-input>
						</el-form-item>
						<el-form-item label="入职时间">
						    <el-col :span="24">
						      <el-form-item>
						        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.inTime" style="width: 100%;"></el-date-picker>
						      </el-form-item>
						    </el-col>
						  </el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="联系电话">
							<el-input v-model="ruleForm.userPhone"></el-input>
						</el-form-item>
						<el-form-item label="证件号">
							<el-input v-model="ruleForm.idcard"></el-input>
						</el-form-item>
						<el-form-item label="职位">
							<el-input v-model="ruleForm.position"></el-input>
						</el-form-item>
						<el-form-item label="银行账户">
							<el-input v-model="ruleForm.bankcard"></el-input>
						</el-form-item>
						<el-form-item label="分机号">
							<el-input v-model="ruleForm.extension"></el-input>
						</el-form-item>
						<el-form-item label="关联后台账号">
							<el-input v-model="ruleForm.associatedAccount"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="centerDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			  </span>
		</el-dialog>
		<!-- 订单详情/查看详情 -->
		<el-dialog top="0" title="查看资料" :visible.sync="dialogDetail" :close-on-click-modal="false" center width="500px">
			<el-row class="padding-item">
				<el-col span="8">姓名</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">状态</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">联系电话</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">所属部门</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">职位</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">银行账户</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">联系电话</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">企业邮箱</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">后台账号</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">工号</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">分机号</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">入职时间</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">证件类型</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">证件号</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">转正日期</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">备注</el-col><el-col span="14">张三</el-col>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">关闭</el-button>
			</span>
		</el-dialog>
		<!-- 办理离职 -->
		<el-dialog top="0" title="办理离职" :visible.sync="dialogGone" :close-on-click-modal="false">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="离职时间" prop="name">
						    <el-col :span="24">
						      <el-form-item>
						        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
						      </el-form-item>
						    </el-col>
						  </el-form-item>
						<el-form-item label="离职原因">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="离职文件">
						    <el-select v-model="ruleForm.region" placeholder="请选择文件" style="width: 85%;"></el-select>
							<el-button @click.prevent="removeDomain(domain)" style="width: 15%;">选择文件</el-button>
						  </el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="centerDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			  </span>
		</el-dialog>
		<!-- 转正 -->
		<el-dialog top="0" title="转正" :visible.sync="dialogZheng" :close-on-click-modal="false">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="转正时间" prop="name">
						    <el-col :span="24">
						      <el-form-item>
						        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
						      </el-form-item>
						    </el-col>
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
	import { request } from '@/utils/request'
	export default {
		data() {
			return {
				activeName: 'first',
				active_second_name: '',
				form: {
					content: '', //检索关键字 支持姓名、账户、手机号、工号、邮箱查询
					departmentId: '', //部门id 通过“人事部”-“部门管理”--“部门列表”接口获取id
					departmentId_name: '',
					workingState: '2', // 工作状态  1离职  2在职  int选填
					inStartTime: '',
					inEndTime: '',
					pageIndex:1,
					pageSize: 5,
					paging:true
				},
				pageIndex: 1,
				pageSize: 10,
				keyword: "",
				currentPage1: 1,

				dialogAdd: false, // 添加员工
				dialogDetail: false, //订单详情/查看详情
				dialogGone: false, // 办理离职
				dialogZheng: false, //转正
				tableData: [],
				ruleForm: {
					userStatus: '1', // 1正式工 2实习期 3试用期  int必填
					userName: '',
					userPhone: '',
					idcardType: '',
					idcard: '',
					departmentId: '',
					position:'',
					worknum:'',
					bankcard:'',
					email:'',
					extension:'',
					inTime:'',
					associatedAccount:'',
					remark:'',
					employeeId:'' //员工id，改值不为空视为编辑
				},
				rules: {
					userName: [{
							required: true,
							message: '请选择姓名',
							trigger: 'blur'
						}
					]
				}
			};
		},
		watch:{
			//人员管理和离职状态切换
			activeName() {
				switch (this.activeName) {
					case 'second':
						this.form.workingState = 1 //离职状态
						this.form.departmentId =  ''
						this.form.departmentId_name =  ''
						this.tableData = []
						this.form.page = 1
						this.getTabList()
					break
					default:
						this.form.workingState = 2 //全职状态
						this.tableData = []
						this.form.page = 1
						this.getTabList()
					break
				}
			}
		},
		computed:{
		},
		created() {
			this.getTabList()
		},
		methods: {
			popup (type) {
				switch (type) {
					case 'change':
					this.dialogAdd = true;
					break
					case 'detail':
					this.dialogDetail = true;
					break
					case 'zheng':
					this.dialogZheng = true;
					break
					case 'gone':
					this.dialogGone = true;
					break
				}
			},
			// 选择证件类型
			select_idcardType(e) {
				this.ruleForm.idcardType = e
			},
			// 人员管理 - 获取列表
			getTabList () {
				let params = this.form
				params.storesNum = JSON.parse(sessionStorage.getItem('userData')).menuList[0].id,
				request('/pms/employee/employee_list', params, 'post', false).then((res) => {
				  if (res.code == 200) {
				  } else {
				    this.$message.error(res.message)
				  }
				})
			},
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

	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
        height: 0;
		background-color: #ffffff;

		.components-edit {
			display: flex;
			flex-direction: column;
			flex: 1;
            height: 0;
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
