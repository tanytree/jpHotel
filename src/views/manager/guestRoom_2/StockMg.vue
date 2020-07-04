<template>
	<div>
		<el-row>
			<el-tabs v-model="activName">
				<el-tab-pane label="商品库存统计" name="a">
					<el-row :gutter="20">
						<el-row>
							<el-form class="demo-form-inline" inline size="small">
								<el-form-item label="商品名称:">
									<el-input v-model="ruleForm.name" class="row-width"></el-input>
								</el-form-item>
								<el-form-item label="库存状态:" class="margin-l">
									<el-select v-model="ruleForm.name" placeholder="请选择部门" class="row-width">
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" style="width: 100px;" size="mini">查询</el-button>
									<el-button type="primary" style="width: 100px;" size="mini">重置</el-button>
								</el-form-item>
								<el-form-item style="display: flex;justify-content: flex-end;flex: 1;">
									<el-row>
										<el-button @click="popup('add')" style="width: 100px;" size="mini">导出</el-button>
									</el-row>
								</el-form-item>
							</el-form>
						</el-row>
						<div class="components-edit">
							<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
							 @selection-change="handleSelectionChange">
								<el-table-column prop="name" label="商品名称"></el-table-column>
								<el-table-column prop="time" label="库存预警数量"></el-table-column>
								<el-table-column prop="job_status" label="库存量"></el-table-column>
								<el-table-column label="操作" width="100">
									<template slot-scope="scope">
										<el-button type="text" size="small" @click="popup('changeA')">修改库存</el-button>
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
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="入库审核" name="b">
					<el-row :gutter="20" style="display: flex;justify-content: center;align-items: center;">
						<div class="btn-click" @click="popup('info')">
							<div style="display: flex;justify-content: center;align-items: center;">
								<i class="el-icon-download"></i>
								<span>商品入库</span>
							</div>
						</div>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</el-row>
		<!-- 修改库存 -->
		<el-dialog title="修改库存" :visible.sync="dialogChangeA" :close-on-click-modal="false">
			<el-row :gutter="20">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
					<el-col :span="18">
						<el-form-item label="库存数量:" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 商品入库 -->
		<el-dialog title="商品入库" :visible.sync="dialogInfo_show" :close-on-click-modal="false">
			<el-row :gutter="20">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="display: flex;justify-content: space-between;align-items: center;">
					<el-col :span="18">
						<el-form-item label="入库类型:" prop="name">
							<el-select v-model="ruleForm.name" placeholder="请选择入库类型">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col style="display: flex;justify-content: flex-end;margin-bottom: 20px;">
						<el-button type="primary" @click="popup('addPi')" size="mini">批量添加商品</el-button>
					</el-col>
				</el-form>
			</el-row>
			<el-row>
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
				 @selection-change="handleSelectionChange">
					<el-table-column prop="name" label="商品名称"></el-table-column>
					<el-table-column prop="time" label="成本价"></el-table-column>
					<el-table-column prop="job_status" label="入库数量">
						<template slot-scope="job_status">
							<el-input v-model="ruleForm.name"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="100">
						<template slot-scope="scope">
							<el-popconfirm title="确定要移除？" @onConfirm="onConfirm">
								<el-button slot="reference" type="text" size="small" @click="deleteRow(scope.row)">移除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row :gutter="22" style="margin-top: 30px;">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
					<el-row :gutter="22">
						<el-col :span="11">
							<el-form-item label="经办人:" prop="name">
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11">
							<el-form-item label="申请日期:" prop="name">
								<el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="22">
						<el-col :span="22">
							<el-form-item label="入库备注:">
								<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.name"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 批量添加商品 -->
		<el-dialog title="批量添加商品" :visible.sync="dialogStock_show" :close-on-click-modal="false">
			<el-row :gutter="20">
				<el-row>
					<el-form class="demo-form-inline" inline size="small">
						<el-form-item label="商品名称:">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="商品分类:" class="margin-l">
							<el-select v-model="ruleForm.name" placeholder="请选择商品分类">
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
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
					 @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="name" label="商品名称"></el-table-column>
						<el-table-column prop="time" label="商品类别"></el-table-column>
						<el-table-column prop="job_status" label="成本价"></el-table-column>
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
				activName: 'a',
				tableData: [{
					name: '',
					time: '2020-5-20',
					job_status: '实习期',
					job: '普通员工',
					number: '11223',
					parts: '销售部'
				}],
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
					}]
				},
				dialogChangeA: false,
				dialogInfo_show: false, //商品入库弹框
				dialogStock_show:false, // 修改库存
			};
		},
		methods: {
			popup(type) {
				debugger
				switch (type) {
					case 'changeA':
						this.dialogChangeA = true;
						break
					case 'info':
						this.dialogInfo_show = true;
						break
					case 'addPi':
						this.dialogStock_show = true;
						break
				}
			},
			// // 切换
			// changeTab(index) {
			// 	let that = this;
			// 	that.currentIndex = index;
			// },
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
