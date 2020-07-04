<template>
	<div>
		<el-row>
			<div class="btn-item">
				<div v-for="(value,index) in btnList" :key="index" :class="currentIndex==index? 'btn-active':'btn-default'" @click="changeTab(value,index)">
					<div class="name">{{value.name}}</div>
					<div class="num">{{value.num}}单</div>
				</div>
			</div>
		</el-row>
		<el-row style="margin-top: 30px;" v-if="currentIndex ==0">
			<el-row>
				<el-form class="demo-form-inline" inline size="small">
					<el-form-item label="入库类型:">
						<el-select v-model="form.keyword1" placeholder="请选择部门" class="row-width">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="商品状态:" class="margin-l">
						<el-input v-model="form.keyword1" class="row-width"></el-input>
					</el-form-item>
					<el-form-item label="申请日期:" class="margin-l">
						<el-col :span="11">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.keyword1" class="row-width"></el-date-picker>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="11">
							<el-time-picker placeholder="选择时间" v-model="form.keyword1" class="row-width"></el-time-picker>
						</el-col>
					</el-form-item>
					<el-form-item label="入库内容:" class="margin-l">
						<el-input v-model="form.keyword1" class="row-width"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" style="width: 100px;" size="mini">查询</el-button>
						<el-button type="primary" style="width: 100px;" size="mini">重置</el-button>
					</el-form-item>
				</el-form>
			</el-row>
			<div class="components-edit">
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
				 @selection-change="handleSelectionChange">
					<el-table-column prop="name" label="单号"></el-table-column>
					<el-table-column prop="name" label="申请日期"></el-table-column>
					<el-table-column prop="name" label="入库仓库"></el-table-column>
					<el-table-column prop="name" label="入库类型"></el-table-column>
					<el-table-column prop="name" label="供应商"></el-table-column>
					<el-table-column prop="name" label="制单人"></el-table-column>
					<el-table-column prop="name" label="状态"></el-table-column>
					<el-table-column label="操作" width="300">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="popup('detail')">明细</el-button>
							<el-button type="text" size="small" @click="popup('change')">修改</el-button>
							<el-button type="text" size="small" @click="popup('exam')">审核</el-button>
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
		</el-row>
		<el-row style="margin-top: 30px;" v-if="currentIndex ==1">
			<el-row>
				<el-form class="demo-form-inline" inline size="small">
					<el-form-item label="入库类型:">
						<el-select v-model="form.keyword1" placeholder="请选择部门" class="row-width">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="制单人:" class="margin-l">
						<el-input v-model="form.keyword1" class="row-width"></el-input>
					</el-form-item>
					<el-form-item label="申请日期:" class="margin-l">
						<el-col :span="11">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.keyword1" class="row-width"></el-date-picker>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="11">
							<el-time-picker placeholder="选择时间" v-model="form.keyword1" class="row-width"></el-time-picker>
						</el-col>
					</el-form-item>
					<el-form-item label="入库内容:" class="margin-l">
						<el-input v-model="form.keyword1" class="row-width"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" style="width: 100px;" size="mini">查询</el-button>
						<el-button type="primary" style="width: 100px;" size="mini">重置</el-button>
					</el-form-item>
				</el-form>
			</el-row>
			<div class="components-edit">
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
				 @selection-change="handleSelectionChange">
					<el-table-column prop="name" label="单号"></el-table-column>
					<el-table-column prop="time" label="申请日期"></el-table-column>
					<el-table-column prop="job" label="入库类型"></el-table-column>
					<el-table-column prop="job_status" label="制单人"></el-table-column>
					<el-table-column prop="job" label="状态"></el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="popup('detail')">明细</el-button>
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
		</el-row>
		<!-- 切片三设计图上没有显示 -->
		<el-row style="margin-top: 30px;" v-if="currentIndex ==2">
		</el-row>
		<!-- 入库单明细 -->
		<el-dialog title="入库单明细" :visible.sync="dialogDetail_show01" :close-on-click-modal="false">
			<el-row :gutter="20" style="line-height: 30px;">
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" style="color: #898B8E;">入库单号:</el-col>
					<el-col :span="17">9876665554</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" style="color: #898B8E;">入库类型:</el-col>
					<el-col :span="17">采购入库</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" style="color: #898B8E;">申请日期:</el-col>
					<el-col :span="17">2020-4-10</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" style="color: #898B8E;">制单人:</el-col>
					<el-col :span="17">张三</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" style="color: #898B8E;">审核状态:</el-col>
					<el-col :span="17">采购入库</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" style="color: #898B8E;">审核时间:</el-col>
					<el-col :span="17">2020-4-10</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" style="color: #898B8E;">审核人:</el-col>
					<el-col :span="17">张三</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" style="color: #898B8E;">经办人:</el-col>
					<el-col :span="17">采购入库</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" style="color: #898B8E;">入库备注:</el-col>
					<el-col :span="17">2020-4-10</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" style="color: #898B8E;">审核意见:</el-col>
					<el-col :span="17">张三</el-col>
				</el-col>
			</el-row>
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
			 @selection-change="handleSelectionChange">
				<el-table-column prop="name" label="商品名称"></el-table-column>
				<el-table-column prop="time" label="成本价"></el-table-column>
				<el-table-column prop="job" label="入库数量"></el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">关闭</el-button>
			</span>
		</el-dialog>
		<!-- 修改商品入库 和库存管理修改库存一样 -->
		<el-dialog title="修改商品入库" :visible.sync="dialogInfo_show" :close-on-click-modal="false">
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
		<!-- 入库审核 -->
		<el-dialog title="入库审核" :visible.sync="dialogExam_show" :close-on-click-modal="false">
			<el-row :gutter="20">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
					<el-col :span="20">
						<el-form-item label="审核:">
							<el-radio v-model="radio" label="1">是</el-radio>
							<el-radio v-model="radio" label="2">否</el-radio>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="审核:">
							<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.name">
							</el-input>
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
				currentIndex: 0,
				btnList: [{
					name: '待审核入库单',
					num: '2'
				}, {
					name: '待审核不通过入库单',
					num: '2'
				}, {
					name: '待审核通过入库单',
					num: '2'
				}],
				form: {
					keyword1: '',
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
				dialogDetail_show01: false,
				dialogInfo_show: false, //修改入库弹框
				dialogStock_show: false, //批量修改库存
				dialogExam_show: false, //入库审核
				radio: 1
			};
		},
		methods: {
			popup(type) {
				switch (type) {
					case 'detail':
						this.dialogDetail_show01 = true;
						break
					case 'change':
						this.dialogInfo_show = true;
						break
					case 'addPi':
						this.dialogStock_show = true;
						break
					case 'exam':
						this.dialogExam_show = true;
						break
				}
			},
			// 切换
			changeTab(value, index) {
				this.currentIndex = index;
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
	.row-width {
		width: 120px;
	}

	.margin-l {
		margin-left: 15px;
	}

	.demo-form-inline {
		display: flex;
		align-items: center;
	}

	.btn-item {
		display: flex;
		justify-content: space-between;
		width: 100%;

		.btn-default {
			width: 33.3%;
			line-height: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding: 20px 0px;

			.num {
				color: #126EFF;
				font-weight: bolder;
			}
		}

		.btn-active {
			width: 33.3%;
			line-height: 30px;
			background: #126EFF;
			color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding: 20px 0px;
			box-shadow: 5px 5px 20px #b3d1ff;

			.num {
				font-weight: bolder;
			}
		}

		.btn-default:active {
			background-color: darken(#126EFF, 10%);
		}
	}
</style>
