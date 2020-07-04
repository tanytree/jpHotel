<template>
	<div>
		<el-row>
			<el-tabs v-model="activeFour">
				<el-tab-pane label="损物赔偿类型" name="four_a">
					<el-row :gutter="20">
						<el-col :span="6" :offset="20">
							<el-button type="primary" style="width: 100px;" size="small" @click="popup_kinds">新增类型</el-button>
						</el-col>
					</el-row>
					<el-table ref="multipleTable" :data="four_tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
					 @selection-change="handleSelectionChange">
						<el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
						<el-table-column label="操作" width="300">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="popup_kinds">修改</el-button>
								<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="onConfirm">
									<el-button slot="reference" type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
								</el-popconfirm>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="损物赔偿物品" name="four_b">
					<el-row :gutter="24" class="demo-form-inline">
						<el-col :span="18">
							<el-form class="demo-form-inline" inline size="small">
								<el-form-item label="物品名称:">
									<el-input v-model="fourForm.name" class="row-width"></el-input>
								</el-form-item>
								<el-form-item label="物品类型:" class="margin-l">
									<el-select v-model="fourForm.name" placeholder="请选择状态" class="row-width">
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" style="width: 80px;">查询</el-button>
									<el-button style="width: 80px;">重置</el-button>
								</el-form-item>
							</el-form>
						</el-col>
						<el-col :span="2" :offset="5">
							<el-button type="primary" size="small" style="width: 80px; margin-bottom: 18px;" @click="popup_thing">+ 新增</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-table ref="multipleTable" :data="four_tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
						 @selection-change="handleSelectionChange">
							<el-table-column prop="name" label="物品类型" show-overflow-tooltip></el-table-column>
							<el-table-column prop="name" label="物品名称" show-overflow-tooltip></el-table-column>
							<el-table-column prop="name" label="赔偿单价"></el-table-column>
							<el-table-column prop="name" label="状态" show-overflow-tooltip></el-table-column>
							<el-table-column label="操作" width="150">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click="popup_thing(scope.row)">修改</el-button>
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
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
							 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout=" sizes, prev, pager, next, jumper" :total="400"></el-pagination>
						</div>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</el-row>
		<!-- 损物赔偿-新增/修改类型 -->
		<el-dialog title="新增类型" :visible.sync="dialogAdd_kinds" :close-on-click-modal="false">
			<el-form :model="fourForm" :rules="fourrules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="类型名称" prop="name">
							<el-input v-model="fourForm.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 损物赔偿-新增/修改物品 -->
		<el-dialog title="新增" :visible.sync="dialogAdd_thing" :close-on-click-modal="false">
			<el-form :model="fourForm" :rules="fourrules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row>
					<el-form-item label="物品类型:" prop="name">
						<el-select v-model="fourForm.name" placeholder="请选择物品类型" style="width: 100%;">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="物品名称:" prop="name">
						<el-input v-model="fourForm.name"></el-input>
					</el-form-item>
					<el-form-item label="赔偿单价:" prop="name">
						<el-input v-model="fourForm.name"></el-input>
					</el-form-item>
					<el-form-item label="成本价格">
						<el-input v-model="fourForm.name"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-radio v-model="radio" label="1">启用</el-radio>
						<el-radio v-model="radio" label="2">禁用</el-radio>
					</el-form-item>
					<el-form-item label="状态">
						<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="fourForm.name"></el-input>
					</el-form-item>
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
				activeFour: 'four_a',
				four_tableData: [{
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
				fourForm: {
					name: ''
				},
				fourrules: {
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}]
				},
				dialogAdd_kinds: false,
				dialogAdd_thing: false,
	
				activeFive: 'five_a',
				beiYong_show: true,
				five_redioList: [{
					name: '现金流模式',
					radio: true
				}, {
					name: '实收模式',
					radio: false
				}, {
					name: '应收模式',
					radio: false
				}],
				five_money: '',
	
				seven_redioList: [{
					name: '寄存单',
					radio: true
				}, {
					name: '预收款单',
					radio: false
				}, {
					name: '定金单',
					radio: false
				}, {
					name: '商品消费单',
					radio: true
				}, {
					name: '入住消费单',
					radio: false
				}, {
					name: '餐饮消费单',
					radio: false
				}],
	
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false,
				pickerOptions: {
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
			}
		},
		methods: {
			popup_thing() {
				this.dialogAdd_thing = true;
			},
			popup_kinds() {
				this.dialogAdd_kinds = true;
			},
			// 交班模式选择,非现金流时不显示备用金
			changeRedio_five(value, index) {
				debugger
				this.five_redioList.forEach((value, index) => {
					value.redio = false
				})
				this.five_redioList[index].redio = true
				if (this.five_redioList[0].redio == true) {
					this.beiYong_show = true
				} else {
					this.beiYong_show = false
				}
			},
			//上传图片
			handleRemove(file) {
				console.log(file);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleDownload(file) {
				console.log(file);
			}
		}
	}
</script>

<style>
</style>
