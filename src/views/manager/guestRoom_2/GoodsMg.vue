<template>
	<div>
		<!--商品管理-->
		<el-tabs v-model="active_second_name" v-if="tab_show">
			<div class="content">
				<el-row>
					<el-form class="demo-form-inline" inline size="small">
						<el-form-item label="商品名称:">
							<el-input v-model="form.keyword1" class="row-width"></el-input>
						</el-form-item>
						<el-form-item label="商品状态:" class="margin-l">
							<el-select v-model="form.keyword1" placeholder="请选择部门" class="row-width">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="商品分类:" class="margin-l">
							<el-select v-model="form.keyword1" placeholder="请选择部门" class="row-width">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" style="width: 100px;" size="mini">查询</el-button>
							<el-button type="primary" style="width: 100px;" size="mini">重置</el-button>
						</el-form-item>
						<el-form-item style="display: flex;justify-content: flex-end;flex: 1;">
							<el-row style="display: flex;justify-content: flex-end;flex: 1;">
								<el-button @click="submitForm('dynamicValidateForm')" style="width: 100px;" size="mini">下载模板</el-button>
								<el-button @click="addDomain" style="width: 100px;" size="mini">导入</el-button>
								<el-button type="primary" @click="popup('add')" style="width: 100px;" size="mini">添加商品</el-button>
							</el-row>
						</el-form-item>
					</el-form>
				</el-row>
				<div class="components-edit">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
					 @selection-change="handleSelectionChange">
						<el-table-column prop="name" label="商品名称"></el-table-column>
						<el-table-column prop="time" label="默认零售价(日元)"></el-table-column>
						<el-table-column prop="job_status" label="成本价(日元)"></el-table-column>
						<el-table-column prop="job" label="库存预警数量"></el-table-column>
						<el-table-column label="操作" width="350">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="popup('bin')">禁用</el-button>
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
				</div>
			</div>
		</el-tabs>
		<el-row v-if="!tab_show">
				<el-row style="padding: 20px 0px;">
					<el-page-header @back="back" content=""></el-page-header>
				</el-row>
				<el-row :gutter="20">
					<el-form :model="threeForm" :rules="threerules" ref="ruleForm" label-width="100px">
						<el-col :span="8">
							<el-form-item label="商品名称:" prop="name">
								<el-input v-model="threeForm.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="所属分类:" prop="name">
								<el-input v-model="threeForm.name"></el-input>
							</el-form-item>
						</el-col>
					</el-form>
				</el-row>
				<el-row :gutter="20">
					<el-form :model="threeForm" :rules="threerules" ref="ruleForm" label-width="100px">
						<el-col :span="16">
							<el-form-item label="商品描述:">
								<el-input type="textarea" :rows="3" v-model="threeForm.name"></el-input>
							</el-form-item>
						</el-col>
					</el-form>
				</el-row>
				<el-row :gutter="22" style="padding: 20px 0px;">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
					 @selection-change="handleSelectionChange">
						<el-table-column prop="name" label="默认零售价">
							<template slot-scope="name">
								<el-input v-model="name"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="成本价">
							<template slot-scope="name">
								<el-input v-model="name"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="默认员工价">
							<template slot-scope="name">
								<el-input v-model="name"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="默认购买数量">
							<template slot-scope="name">
								<el-input v-model="name"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="库存预警数量">
							<template slot-scope="name">
								<el-input v-model="name"></el-input>
							</template>
						</el-table-column>
					</el-table>
				</el-row>
				<el-row style="padding: 20px 0px;">
					<el-button type="primary" style="width: 80px;" @click="submit('save')">保存</el-button>
					<el-button type="primary" style="width: 150px;" @click="submit('add')">保存并继续添加</el-button>
					<el-button style="width: 80px;margin-left: 20px;" @click="submit('back')">返回</el-button>
				</el-row>
			</el-row>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					keyword1: '',
				},
				pageIndex: 1,
				pageSize: 10,
				keyword: "",
				currentPage1: 1,
				
				tableData: [{
					name: '',
					time: '2020-5-20',
					job_status: '实习期',
					job: '普通员工',
					number: '11223',
					parts: '销售部'
				}],
				threeForm: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				threerules: {
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						}
					]
				},
				tab_show:true,
			};
		},
		methods: {
			popup(type) {
				switch(type) {
					case 'add':
					this.tab_show = false
					break
				}
			},
			//切换到商品管理
			back() {
				this.tab_show = true
			},
			submit (type) {
				debugger
				switch(type) {
					case 'save':
					//数据清空保存
					this.tab_show = true
					break
					case 'add':
					//数据清空继续添加
					this.tab_show = false
					break
					case 'back':
					//数据清空返回
					this.tab_show = true
					break
				}
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
