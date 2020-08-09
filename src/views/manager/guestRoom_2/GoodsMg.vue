<template>
	<div class="boss-index">
		<!--商品管理-->
		<div class="content" v-if="tab_show">
			<el-form class="term line demo-form-inline" v-model="form" inline size="small">
				<el-form-item label="商品名称:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="商品状态:">
					<el-select v-model="form.status">
						<el-option label='启用' value="1"></el-option>
						<el-option label='禁用' value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品分类:">
					<el-cascader v-model="form.category" :options="category" :props="categoryProps" @change="casChange"></el-cascader>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="submit" @click="search">查询</el-button>
					<el-button class="grey" @click="reset">重置</el-button>
				</el-form-item>
				<el-form-item class="form-inline-flex">
					<el-row class="form-inline-flex">
						<el-button class="white" @click="downModel('dynamicValidateForm')">下载模板</el-button>
						<el-button class="white" @click="importModel">导入</el-button>
						<el-button @click="popup('add')" class="submit">添加商品</el-button>
					</el-row>
				</el-form-item>
			</el-form>
			<div class="components-edit">
				<el-table ref="multipleTable" :data="list" border height="100%" header-row-class-name="default" size="small">
					<el-table-column prop="name" label="商品名称"></el-table-column>
					<el-table-column prop="retailPrice" label="默认零售价(日元)"></el-table-column>
					<el-table-column prop="costPrice" label="成本价(日元)"></el-table-column>
					<el-table-column prop="inventoryWarning" label="库存预警数量"></el-table-column>
					<el-table-column label="操作" width="350">
						<template slot-scope="scope">
							<el-button type="text" size="small" :disabled="scope.row.status == 2" @click="popup('bin', scope.row)">{{scope.row.state == 1 ? '禁用' : '启用'}}</el-button>
							<el-button type="text" size="small" :disabled="scope.row.status == 2" @click="popup('change', scope.row)">修改</el-button>
							<el-popconfirm v-if="scope.row.status == 1" title="确认删除？" icon="el-icon-warning-outline" iconColor="#FF8C00" @onConfirm="handleDelete(scope.row)">
								<el-button slot="reference" type="text">删除</el-button>
							</el-popconfirm>
							<el-button v-if="scope.row.status == 2" type="text" size="small" disabled>已失效</el-button>
							<el-button type="text" size="small" disabled @click="openDetail(scope.row)">详情</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
				</div>
			</div>
		</div>
		<div class="content" v-if="!tab_show">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item><a @click="back">商品管理</a></el-breadcrumb-item>
				<el-breadcrumb-item>修改商品</el-breadcrumb-item>
			</el-breadcrumb>
			<el-form :model="rowData" size="small" :rules="threerules" ref="rowForm" label-width="100px">
				<el-col :span="8">
					<el-form-item label="商品名称:" prop="name">
						<el-input v-model="rowData.name"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="所属分类:" prop="categoryId">
						<el-cascader v-model="rowData.categoryId" :options="category" :props="categoryProps" @change="casChange"></el-cascader>
					</el-form-item>
				</el-col>
				<el-col :span="16">
					<el-form-item label="商品描述:">
						<el-input type="textarea" :rows="3" v-model="rowData.remark"></el-input>
					</el-form-item>
				</el-col>
			</el-form>
			<div class="flex_1">
				<el-form :model="rowData" size="small" inline :rules="threerules" ref="priceForm" label-position="top" class="price">
					<el-form-item prop="retailPrice" label="默认零售价">
						<el-input v-model="rowData.retailPrice" class="row-width"></el-input>
					</el-form-item>
					<el-form-item prop="costPrice" label="成本价">
						<el-input v-model="rowData.costPrice" class="row-width"></el-input>
					</el-form-item>
					<el-form-item prop="employeePrice" label="默认员工价">
						<el-input v-model="rowData.employeePrice" class="row-width"></el-input>
					</el-form-item>
					<el-form-item prop="buyCount" label="默认购买数量">
						<el-input v-model="rowData.buyCount" class="row-width"></el-input>
					</el-form-item>
					<el-form-item prop="inventoryWarning" label="库存预警数量">
						<el-input v-model="rowData.inventoryWarning" class="row-width"></el-input>
					</el-form-item>
				</el-form>
			</div>

			<div class="footer">
				<el-button type="primary" v-if="edit" size="small" class="submit" @click="submit">修改</el-button>
				<el-button type="primary" v-if="!edit" size="small" class="submit" @click="submit">保存并继续添加</el-button>
				<el-button size="small" class="cancel" @click="back">返回</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '', status: '', category: []
				},
				categoryProps: {value: 'id', label: 'name', children: 'child'},
				rowData: {name: '', categoryId: '', remark: '', retailPrice: '', costPrice: '', employeePrice: '', buyCount: '', inventoryWarning: ''},
				threerules: {
					name: [{required: true, message: '请输入产品名称', trigger: 'blur'}],
					categoryId: [{required: true, message: '请选择产品分类', trigger: 'change'}],
					retailPrice: [{required: true, message: '请输入产品零售价', trigger: 'blur'}],
					costPrice: [{required: true, message: '请输入产品成本价', trigger: 'blur'}],
					employeePrice: [{required: true, message: '请输入产品员工价', trigger: 'blur'}],
					buyCount: [{required: true, message: '请输入产品购买数量', trigger: 'blur'}],
					inventoryWarning: [{required: true, message: '请输入产品预警数量', trigger: 'blur'}],
				},
				tab_show: true, edit: true,
			};
		},
		props: {
			list: Array, category: Array, total: Number, pageSize: Number, currentPage: Number, initData: Function
		},
		mounted() {
		},
		methods: {
			search() {
				this.initData(this.form.name, this.form.category, this.form.status)
			},
			reset() {
				this.form = {name: '', status: '', category: ''}
			},
			casChange(value) {
				this.rowData.categoryId = value[value.length-1]
			},
			hideRow({row, rowIndex}) {
				if(row.status !== 1) {
					return {display: 'none'}
				}
			},
			popup(type, row) {
				if(type == 'add') {
					this.edit = false
					this.tab_show = false
				} else if (type == 'bin') {
					this.$F.doRequest(this, '/pms/hotelgoods/up_status', {
						id: row.id,
						state: row.state == 1 ? 2 : 1
					}, (res) => {
						this.$message.success('success');
						this.initData()
					})
				} else if (type == 'change') {
					this.edit = true;
					this.tab_show = false;
					this.rowData = row;
				}
			},
			//切换到商品管理
			back() {
				this.tab_show = true;
				this.initData();
			},
			submit () {
				const param = {name: this.rowData.name, categoryId: this.rowData.categoryId, remark: this.rowData.remark, retailPrice: this.rowData.retailPrice, costPrice: this.rowData.costPrice, employeePrice: this.rowData.employeePrice, buyCount: this.rowData.buyCount, inventoryWarning: this.rowData.inventoryWarning}
				if(this.edit) {
					param.id = this.rowData.id
				}
				this.$F.doRequest(this, '/pms/hotelgoods/edit', param, (res) => {
					this.initData();
					if(this.edit) {
						this.tab_show = true;
					} else {
						this.tab_show = false;
						this.rowData = {name: '', categoryId: '', remark: '', retailPrice: '', costPrice: '', employeePrice: '', buyCount: '', inventoryWarning: ''};
					}
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			downModel() {
				this.$F.doRequest(this, '/pms/hotelgoods/download', {}, (res) => {
					this.$message.success('下载成功');
				})
			},
			importModel() {
				this.$F.doRequest(this, '/pms/hotelgoods/upload', {filename: ''}, (res) => {
					this.$message.success('导入成功');
				})
			},
			handleDelete(row) {
				this.$F.doRequest(this, '/pms/hotelgoods/up_status', {
					id: row.id,
					state: ''
				}, (res) => {
					this.$message.success('success');
					this.initData()
				})
			},
			openDetail(row) {
				this.$F.doRequest(this, '/pms/hotelgoods/list', {
					id: row.id,
				}, (res) => {
				})
			}
		}
	};
</script>

<style lang="less">
	.row-width {
		width: 120px;
	}

	.content {
		height: 100%;
		padding: 10px;
		display: flex;
		flex-direction: column;
		background-color: #ffffff;

		.components-edit {
			display: flex;
			flex-direction: column;
			flex: 1;

			.block {
				display: flex;
				align-items: center;
			}
		}

		.footer {
			padding-top: 20px;
			border-top: 1px solid #E2E2E2;
		}
	}
</style>
