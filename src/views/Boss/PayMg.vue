<template>
	<div>
		<!--薪酬管理-->
		<el-tabs class="pageTab" v-model="activeName">
			<el-tab-pane label="薪酬管理" name="first">
				<el-tabs v-model="active_second_name" type="card">
					<div class="content">
						<el-row>
							<el-form class="demo-form-inline" inline size="small">
								<el-form-item label="员工名称:">
									<el-input v-model="form.name" class="row-width"></el-input>
								</el-form-item>
								<el-form-item label="工资月份:" class="margin-l">
									<el-col :span="11">
										<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" class="row-width"></el-date-picker>
									</el-col>
								</el-form-item>
								<el-form-item label="员工状态:" class="margin-l">
									<el-select v-model="form.categoryid" placeholder="请选择状态" class="row-width">
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
									<el-button type="primary">查询</el-button>
								</el-form-item>
							</el-form>
						</el-row>
						<div class="components-edit">
							<el-table ref="multipleTable" :data="tableData" style="width: 100%"
    max-height="200" tooltip-effect="dark" :header-cell-style="{background:'#d9d9d9',color:'#1E1E1E'}"
							 @selection-change="handleSelectionChange">
								<!-- <el-table-column prop="name" label="部门" show-overflow-tooltip></el-table-column> -->
								<el-table-column prop="name" label="职位" show-overflow-tooltip></el-table-column>
								<el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
								<el-table-column prop="name" label="员工状态" width="50"></el-table-column>
								<el-table-column prop="name" label="工号" show-overflow-tooltip></el-table-column>
								<el-table-column prop="name" label="工资月份" show-overflow-tooltip></el-table-column>
								<el-table-column label="基本工资">
									<el-table-column prop="name" label="基础工资"></el-table-column>
									<el-table-column prop="name" label="社保补助"></el-table-column>
									<el-table-column prop="name" label="其他"></el-table-column>
									<el-table-column prop="name" label="保密工资"></el-table-column>
								</el-table-column>
								<el-table-column prop="name" label="岗位工资" show-overflow-tooltip></el-table-column>
								<el-table-column type="name" label="绩效工资" width="50"></el-table-column>
								<el-table-column prop="name" label="奖金" show-overflow-tooltip></el-table-column>
								<el-table-column prop="name" label="工资月份" show-overflow-tooltip></el-table-column>
								<el-table-column label="补贴">
									<el-table-column prop="name" label="餐补"></el-table-column>
									<el-table-column prop="name" label="房补"></el-table-column>
								</el-table-column>
								<el-table-column label="出勤">
									<el-table-column prop="name" label="应出勤天数"></el-table-column>
									<el-table-column prop="name" label="实际出勤天数"></el-table-column>
									<el-table-column prop="name" label="出勤工资应发"></el-table-column>
									<el-table-column prop="name" label="保密工资"></el-table-column>
								</el-table-column>
								<el-table-column label="扣款">
									<el-table-column prop="name" label="迟到扣款"></el-table-column>
									<el-table-column prop="name" label="社保扣款"></el-table-column>
									<el-table-column prop="name" label="个税扣款"></el-table-column>
								</el-table-column>
								<el-table-column prop="name" label="应发工资" show-overflow-tooltip></el-table-column>
								<el-table-column type="name" label="实发工资" width="50"></el-table-column>
								<el-table-column prop="name" label="当月报销费用" show-overflow-tooltip></el-table-column>
								<el-table-column prop="name" label="实发工资" show-overflow-tooltip></el-table-column>
								<el-table-column fixed="right" label="操作" width="120">
									<template slot-scope="scope">
										<el-button type="text" size="small" @click="popup('change')">员工详情</el-button>
										<el-button type="text" size="small" @click="popup('change')">修改</el-button>
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
			<!-- 薪酬设置 -->
			<el-tab-pane label="薪酬设置" name="second">
				<el-tabs v-model="active_second_name" type="card">
					<div class="content">
						<el-row>
							<el-form class="demo-form-inline" inline size="small">
								<el-form-item label="员工名称:">
									<el-input v-model="form.name" class="row-width"></el-input>
								</el-form-item>
								<el-form-item label="所在部门:" class="margin-l">
									<el-select v-model="form.categoryid" placeholder="请选择所在部门" class="row-width">
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
							<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
							 @selection-change="handleSelectionChange">
								<!-- <el-table-column type="index" label="序号" width="50"></el-table-column> -->
								<el-table-column prop="name" label="员工姓名" show-overflow-tooltip></el-table-column>
								<el-table-column prop="time" label="状态" show-overflow-tooltip></el-table-column>
								<el-table-column prop="job" label="职位" width="50"></el-table-column>
								<el-table-column prop="job" label="工号" show-overflow-tooltip></el-table-column>
								<el-table-column prop="job" label="所在部门" show-overflow-tooltip></el-table-column>
								<el-table-column label="操作" width="150">
									<template slot-scope="scope">
										<el-button type="text" size="small" @click="popup('detail')">查看</el-button>
										<el-button type="text" size="small">薪资设置</el-button>
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
		<!-- 薪酬修改-->
		<el-dialog title="薪酬修改" :visible.sync="dialogAdd" :close-on-click-modal="false">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row>
					<el-form-item label="基本工资:"></el-form-item>
				</el-row>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="基本工资:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="其他:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="岗位工资:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="奖金:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="社保补助:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="保密工资:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="绩效工资:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="补贴:"></el-form-item>
				</el-row>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="房补:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="餐补:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="出勤天数:"></el-form-item>
				</el-row>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="应出勤天数:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="出勤工资应发:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="实际出勤天数:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="扣款:"></el-form-item>
				</el-row>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="迟到扣款:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="社保扣款:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="个人扣税:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="应发工资:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="实发工资:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="当月报销费用:">
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
		<!-- /查看详情/薪资设置 备注:是一样的内容,查看详情是只要让input变成不可点击, 薪资设置是可以修改输入-->
		<el-dialog title="查看" :visible.sync="dialogDetail" :close-on-click-modal="false" center width="500px">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row>
					<el-form-item label="基本工资:"></el-form-item>
				</el-row>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="基本工资:">
							<el-input v-model="ruleForm.name" ></el-input>
						</el-form-item>
						<el-form-item label="其他:">
							<el-input v-model="ruleForm.name" ></el-input>
						</el-form-item>
						<el-form-item label="岗位工资:">
							<el-input v-model="ruleForm.name" ></el-input>
						</el-form-item>
						<el-form-item label="奖金:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="社保补助:">
							<el-input v-model="ruleForm.name" ></el-input>
						</el-form-item>
						<el-form-item label="保密工资:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="绩效工资:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="补贴:"></el-form-item>
				</el-row>
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="房补:">
							<el-input v-model="ruleForm.name" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="margin-l">
						<el-form-item label="餐补:">
							<el-input v-model="ruleForm.name" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<!-- 查看详情按钮 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">关闭</el-button>
			</span>
			<!-- 薪资设置是按钮 -->
			<!-- <span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button @click="dialogVisible = false" type="primary">确认</el-button>
			</span> -->
		</el-dialog>
		<!-- 办理离职 -->
		<el-dialog title="办理离职" :visible.sync="dialogGone" :close-on-click-modal="false">
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
		<el-dialog title="转正" :visible.sync="dialogZheng" :close-on-click-modal="false">
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
	export default {
		data() {
			return {
				activeName: 'first',
				active_second_name: '',
				form: {
					keyword1: '',
					categoryid: '',
					date1: '',
					date2: '',
				},
				pageIndex: 1,
				pageSize: 10,
				keyword: "",
				currentPage1: 1,

				dialogAdd: false, // 修改薪酬
				dialogDetail: false, //订单详情/查看详情
				dialogGone: false, // 办理离职
				dialogZheng: false, //转正
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
				ruleForm: {
					name: '3000',
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
					}]
				}
			};
		},
		methods: {
			popup(type) {
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
			// 切换
			changeTab(index) {
				let that = this;
				that.currentIndex = index;
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
