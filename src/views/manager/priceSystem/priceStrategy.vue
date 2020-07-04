<template>
	<div>
		<el-row v-if="tab1_show && tab2_show">
			<el-tabs v-model="activName">
				<el-tab-pane label="会员" name="a">
					<el-row :gutter="20">
						<el-row>
							<el-form class="demo-form-inline" inline size="small">
								<!-- 设计图有前15天和后15天的快捷日期方式,可以利用日期组件里的改成ui图一样的设计 -->
								<el-form-item label="选择时间:">
									<el-date-picker v-model="ruleForm.name" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
									</el-date-picker>
								</el-form-item>
								<el-form-item style="display: flex;justify-content: flex-end;flex: 1;">
									<el-row>
										<el-button type="primary" @click="popup('adjust')" style="width: 100px;" size="mini">批量调价</el-button>
									</el-row>
								</el-form-item>
							</el-form>
						</el-row>
						<div class="components-edit">
							<el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
							 :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column prop="date" label="房型/房价">
								</el-table-column>
								<el-table-column prop="name" label="4-18 周三">
								</el-table-column>
								<el-table-column prop="name" label="4-19 周四">
								</el-table-column>
								<el-table-column prop="name" label="4-19 周四">
								</el-table-column>
								<el-table-column prop="name" label="4-19 周四">
								</el-table-column>
								<el-table-column prop="name" label="4-19 周四">
								</el-table-column>
							</el-table>
						</div>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="单位" name="b">
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
								<el-row style="display: flex;justify-content: flex-end;flex: 1;">
									<el-button type="primary" @click="popup('add')" style="width: 100px;" size="mini">新增</el-button>
								</el-row>
							</el-form-item>
						</el-form>
					</el-row>
					<div class="components-edit">
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
						 @selection-change="handleSelectionChange">
							<el-table-column prop="name" label="规则名称"></el-table-column>
							<el-table-column prop="time" label="状态"></el-table-column>
							<el-table-column prop="job_status" label="备注"></el-table-column>
							<el-table-column label="操作" width="350">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click="popup('detail')">查看</el-button>
									<el-button type="text" size="small" @click="popup('change')">修改</el-button>
									<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="onConfirm">
										<el-button slot="reference" type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
									</el-popconfirm>
									<el-button type="text" size="small" @click="popup('changerili')">修改日历</el-button>
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
				</el-tab-pane>
			</el-tabs>
		</el-row>
		<el-row v-if="!tab1_show">
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back_1" content=""></el-page-header>
			</el-row>
			<el-row :gutter="20">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
					<el-col :span="20">
						<el-form-item label="会员类型:" prop="name">
							<el-checkbox-group v-model="checkedKinds" @change="handleCheckedCitiesChange">
								<el-checkbox v-for="(item, index) in kinds" :label="item" :key="item">{{item}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="渠道:" prop="name">
							<el-button plain size="mini">线下</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="选择时间:" prop="name">
							<el-date-picker v-model="rules.name" type="daterange" align="right" unlink-panels range-separator="至"
							 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="选择星期:" prop="name">
							<el-checkbox-group v-model="checkedKinds" @change="handleCheckedCitiesChange">
								<el-checkbox v-for="(item, index) in kinds" :label="item" :key="item">{{item}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="折扣率:" prop="name">
							<el-radio-group v-model="radio">
								<el-radio :label="1">向上取整</el-radio>
								<el-radio :label="2">向下取整</el-radio>
								<el-radio :label="3">四舍五入(取整)</el-radio>
								<el-radio :label="4">保持不变</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
			 @selection-change="handleSelectionChange">shu
				<el-table-column prop="name" label="房型"></el-table-column>
				<el-table-column prop="name" label="门市价"></el-table-column>
				<el-table-column prop="name" label="调价方式">
					<template slot-scope="name">
						<el-row class="demo-form-inline">
							<el-select v-model="value" placeholder="请选择" style="width: 150px;">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							<el-input v-model="value" style="width: 100px;margin-right: 5px;"></el-input> 日元
						</el-row>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="调价后">
					<template slot-scope="name">
						<el-input v-model="value" :disabled="true"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;">保存</el-button>
				<el-button style="width: 80px;margin-left: 20px;">返回</el-button>
			</el-row>
		</el-row>
		<!-- 价格日历 -->
		<el-row v-if="!tab2_show">
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back_2" content=""></el-page-header>
			</el-row>
			<el-row :gutter="20">
				<el-row>
					<el-form class="demo-form-inline" inline size="small">
						<!-- 设计图有前15天和后15天的快捷日期方式,可以利用日期组件里的改成ui图一样的设计 -->
						<el-form-item label="选择时间:">
							<el-date-picker v-model="ruleForm.name" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
							</el-date-picker>
						</el-form-item>
					</el-form>
				</el-row>
				<!-- 点击直接议价 -->
				<div class="components-edit">
					<el-table ref="multipleTable" :data="tableData_other" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
			 @selection-change="handleSelectionChange">
						<el-table-column prop="date" label="房型/房价">
						</el-table-column>
						<el-table-column prop="name" label="4-18 周三">
							<template slot-scope="name">
								<el-input v-model="value" :disabled="true"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="4-19 周四">
						</el-table-column>
						<el-table-column prop="name" label="4-19 周四">
						</el-table-column>
						<el-table-column prop="name" label="4-19 周四">
						</el-table-column>
						<el-table-column prop="name" label="4-19 周四">
						</el-table-column>
					</el-table>
				</div>
			</el-row>
		</el-row>
		<!-- 查看 -->
		<el-dialog title="查看" :visible.sync="dialogDetail" :close-on-click-modal="false">
			<el-row style="line-height: 30px;">
				<el-row>
					<el-col span="4" style="color: #898B8E;">规则名称:</el-col><el-col span="14">张三</el-col>
				</el-row>
				<el-row>
					<el-col span="4" style="color: #898B8E;">状态:</el-col><el-col span="14">张三</el-col>
				</el-row>
				<el-row>
					<el-col span="4" style="color: #898B8E;">时间:</el-col><el-col span="14">张三</el-col>
				</el-row>
				<el-row>
					<el-col span="4" style="color: #898B8E;">星期:</el-col><el-col span="14">张三</el-col>
				</el-row>
				<el-row>
					<el-col span="4" style="color: #898B8E;">折扣率:</el-col><el-col span="14">张三</el-col>
				</el-row>
			</el-row>
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
			 @selection-change="handleSelectionChange">
				<el-table-column prop="name" label="房型"></el-table-column>
				<el-table-column prop="time" label="门市价"></el-table-column>
				<el-table-column prop="job_status" label="调价方式"></el-table-column>
				<el-table-column prop="job" label="调价后"></el-table-column>
			</el-table>
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
				dialogDetail:false, //查看弹窗
				activName: 'a',
				tab1_show: true, //切片一的跳转
				tab2_show:true,//切片二的跳转
				tableData: [{
					name: '',
					time: '2020-5-20',
					job_status: '实习期',
					job: '普通员工',
					number: '11223',
					parts: '销售部'
				}],
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
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
				tableData: [{
					id: 3,
					date: '白金卡',
					name: '',
					address: '',
					children: [{
						id: 31,
						date: '标准房',
						name: '100'
					}, {
						id: 32,
						date: '单间',
						name: '100'
					}, {
						id: 32,
						date: '小型会议',
						name: '100'
					}]
				}, {
					id: 3,
					date: '黄金卡',
					name: '',
					address: '',
					children: [{
						id: 31,
						date: '标准房',
						name: '100'
					}, {
						id: 32,
						date: '单间',
						name: '100'
					}, {
						id: 32,
						date: '小型会议',
						name: '100'
					}]
				}, {
					id: 3,
					date: '黑金卡',
					name: '',
					address: '',
					children: [{
						id: 31,
						date: '标准房',
						name: '100'
					}, {
						id: 32,
						date: '单间',
						name: '100'
					}, {
						id: 32,
						date: '小型会议',
						name: '100'
					}]
				}],
				tableData_other: [{
					date: '标准间'
				},{
					date: '单间'
				},{
					date: '小型会议室'
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
				dialogStock_show: false, // 修改库存
				kinds: ['全选', '白金卡', '黄金卡', '白银卡'],
				checkedKinds: ['白金卡'],
				options: [{
				          value: '选项1',
				          label: '黄金糕'
				        }, {
				          value: '选项2',
				          label: '双皮奶'
				        }, {
				          value: '选项3',
				          label: '蚵仔煎'
				        }, {
				          value: '选项4',
				          label: '龙须面'
				        }, {
				          value: '选项5',
				          label: '北京烤鸭'
				        }],
				        value: ''
			};
		},
		methods: {
			popup(type) {
				debugger
				switch (type) {
					case 'adjust':
						this.tab1_show = false;
						break
					case 'detail':
						this.dialogDetail = true;
						break
					case 'changerili':
						this.tab2_show = false;
						break
				}
			},
			back_1() {
				this.tab1_show = true;
			},
			back_2() {
				this.tab2_show = true;
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
