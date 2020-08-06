<template>
	<div class="boss-index">
		<div class="content">
			<div class="radioBox">
				<el-radio-group v-model="tabPosition" size="medium">
					<el-radio-button :label="item.id" v-for="(item, index) in typeList" :disabled="item.hide" :key="index" class="btn-margin">{{item.name}}</el-radio-button>
				</el-radio-group>
				<el-button type="text" @click="manageSale">管理售卖点</el-button>
			</div>
			<!--售卖点-->
			<el-form class="term line demo-form-inline" v-model="form" inline size="small">
				<el-form-item label="商品名称:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="商品分类:">
					<el-cascader v-model="form.category" :options="category" :props="categoryProps" @change="casChange"></el-cascader>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="submit" @click="search">查询</el-button>
					<el-button class="grey" @click="reset">重置</el-button>
				</el-form-item>
				<el-form-item class="form-inline-flex">
					<el-button type="primary" @click="shelf" class="submit">上架商品</el-button>
				</el-form-item>
			</el-form>
			<div class="components-edit">
				<el-table ref="multipleTable" :data="list" height="100%" header-row-class-name="default" size="small">
					<el-table-column prop="name" label="商品名称"></el-table-column>
					<el-table-column prop="retailPrice" label="默认零售价(日元)"></el-table-column>
					<el-table-column prop="employeePrice" label="员工价(日元)"></el-table-column>
					<el-table-column prop="costPrice" label="成本价(日元)"></el-table-column>
					<el-table-column prop="buyCount" label="默认购买数量"></el-table-column>
					<el-table-column prop="inventoryCount" label="库存"></el-table-column>
					<el-table-column label="操作" width="150">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="popup('sale')">修改</el-button>
							<el-button type="text" size="small" @click="offShelf">下架</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
				</div>
			</div>
		</div>

		<!-- 售卖点管理 -->
		<el-dialog top="0" :visible.sync="salePointVisible" width="1000px" :close-on-click-modal="false">
			<div slot="title" class="dialog-header">
				<span class="title">售卖点管理</span>
				<el-button class="submit" size="small" @click="popup('add')">新增</el-button>
			</div>
			<el-table ref="multipleTable" :data="salePoint" height="100%" header-row-class-name="default" size="small">
				<el-table-column prop="name" label="售卖点名称"></el-table-column>
				<el-table-column label="允许签单到房间">
					<template slot-scope="scope">{{scope.row.allowRoom == 1 ? '是' : '否'}}</template>
				</el-table-column>
				<el-table-column label="允许签单到单位">
					<template slot-scope="scope">{{scope.row.allowEnter == 1 ? '是' : '否'}}</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">{{scope.row.state == 1 ? '启用中' : '禁用'}}</template>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="popup('state', scope.row)">{{scope.row.state == 1 ? '禁用' : '启用'}}</el-button>
						<el-button type="text" size="small" @click="popup('edit', scope.row)">修改</el-button>
						<el-popconfirm title="确认删除？" icon="el-icon-warning-outline" iconColor="#FF8C00" @onConfirm="pointDelete(scope.row)">
							<el-button slot="reference" size="small" type="text">删除</el-button>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
			<el-dialog top="0" :title="editPointTitle" :visible.sync="editPointVisible" :close-on-click-modal="false" append-to-body>
				<el-form :model="point" :rules="threerules" ref="ruleForm" label-width="150px">
					<el-form-item label="售卖点名称:" prop="name">
						<el-input v-model="point.name"></el-input>
					</el-form-item>
					<el-form-item label="允许签到到单位:">
						<el-radio-group v-model="point.allowEnter">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="2">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="允许签到到房间:">
						<el-radio-group v-model="point.allowRoom">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="2">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="状态:">
						<el-radio-group v-model="point.state">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="2">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="editPointVisible = false">取 消</el-button>
					<el-button type="primary" @click="submit('point')">确 定</el-button>
				</div>
			</el-dialog>
		</el-dialog>

		<!-- 修改商品上级信息 -->
		<el-dialog top="0" title="修改商品上级信息" :visible.sync="onshelfVisible" :close-on-click-modal="false">
			<el-table ref="multipleTable" :data="shelfData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="name" label="商品名称"></el-table-column>
				<el-table-column prop="time" label="成本价"></el-table-column>
				<el-table-column prop="job_status" label="员工价">
					<template slot-scope="job_status">
						<el-input v-model="threeForm.name"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="job_status" label="零售价">
					<template slot-scope="job_status">
						<el-input v-model="threeForm.name"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="job_status" label="默认购买数量">
					<template slot-scope="job_status">
						<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 上架商品 -->
		<el-dialog top="0" title="上架商品" :visible.sync="shelfVisible" width="1000px" :close-on-click-modal="false">
			<el-form class="demo-form-inline" v-model="form" inline size="small">
				<el-form-item label="商品名称:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="商品分类:">
					<el-cascader v-model="form.category" :options="category" :props="categoryProps" @change="casChange"></el-cascader>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="submit" @click="search">查询</el-button>
					<el-button class="grey" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
			<el-table ref="multipleTable" :data="shelfData" height="100%" header-row-class-name="default" size="small" @selection-change="shelfSelect">
				<el-table-column type="selection" width="70"></el-table-column>
				<el-table-column prop="name" label="商品名称"></el-table-column>
				<el-table-column prop="costPrice" label="成本价" width="200"></el-table-column>
				<el-table-column label="员工价" width="150">
					<template slot-scope="scope">
						<el-input v-model="scope.row.employeePrice" :disabled="scope.row.dis"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="零售价" width="150">
					<template slot-scope="scope">
						<el-input v-model="scope.row.retailPrice" :disabled="scope.row.dis"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="默认购买数量" width="250">
					<template slot-scope="scope">
						<el-input v-model="scope.row.buyCount" :disabled="scope.row.dis" style="width: 200px;"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="shelfVisible = false">取 消</el-button>
				<el-button type="primary" @click="submit('shelf')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				typeList: [],
				tabPosition: 'mini',
				form: {name: '', category: ''},
				categoryProps: {value: 'id', label: 'name', children: 'child'},
				salePoint: [], shelfData: [],
				point: {name: '', allowEnter: 1, allowRoom: 1, state: 1},
				salePointVisible:false,
				editPointVisible:false, editPointTitle: '新增售卖点', pointType: true,
				onshelfVisible:false,
				shelfVisible: false,
				threeForm: {
					name: '',
					kinds: ''
				},
				threerules: {
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}]
				},
				radio: false
			};
		},
		props: {
			list: Array, category: Array, total: Number, pageSize: Number, currentPage: Number, initData: Function
		},
		mounted() {
			this.getManageData();
		},
		methods: {
			getManageData() {
				this.$F.doRequest(this, '/pms/hotelgoodsSelling/list', {}, (res) => {
					this.salePoint = res.list
				})
			},
			manageSale() {
				this.salePointVisible = true;
			},
			pointDelete(row) {
				this.$F.doRequest(this, '/pms/hotelgoodsSelling/delete', {
					id: row.id,
				}, (res) => {
					this.getManageData()
				})
			},
			getShelfData() {
				this.$F.doRequest(this, '/pms/sellinglog/listusable', {
					sellId: ''
				}, (res) => {

				})
			},
			shelf() {
				this.shelfVisible = true;
				this.getShelfData()
			},
			shelfSelect() {

			},
			popup (type, row) {
				if (type == 'sale') {
					this.onshelfVisible = true;
				} else if(type == 'state') {
					this.$F.doRequest(this, '/pms/hotelgoodsSelling/updateSellingState', {
						id: row.id,
						state: row.state == 1 ? 2 : 1
					}, (res) => {
						this.getManageData()
					})
				} else if (type == 'edit') {
					this.editPointVisible = true;
					this.editPointTitle = '修改售卖点';
					this.pointType = false;
					this.point = {name: row.name, allowEnter: row.allowEnter, allowRoom: row.allowRoom, state: row.state}
				} else if (type == 'add') {
					this.editPointVisible = true;
					this.editPointTitle = '新增售卖点';
					this.pointType = true
				}
			},
			offShelf() {},
			search() {
				this.getHotelGoodsData(this.form.name, this.form.category, this.form.status)
			},
			reset() {
				this.form = {name: '', status: 'all', category: ''}
			},
			casChange(value) {
				this.rowData.categoryId = value[value.length-1]
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			submit(type) {
				if (type == 'shself') {
					this.$F.doRequest(this, '/pms/hotelgoods/up_status', {
						id: row.id,
						state: row.state == 1 ? 2 : 1
					}, (res) => {
						this.$message.success('success');
						this.initData()
					})
				} else if (type == 'point') {
					if(this.pointType) {
						this.$F.doRequest(this, '/pms/hotelgoodsSelling/addSelling', this.point, (res) => {
							this.getManageData();
							this.editPointVisible = false;
						})
					} else {
						this.$F.doRequest(this, '/pms/hotelgoodsSelling/updateSelling', this.point, (res) => {
							this.getManageData();
							this.editPointVisible = false;
						})
					}

				}
			}
		}
	};
</script>

<style lang="less">
	.radioBox {
		display: flex;
		justify-content: center;
		margin-bottom: 10px;

		.el-radio-button__orig-radio:checked + .el-radio-button__inner{
			background: transparent;
			border-color: #126EFF;
			color: #126EFF;
			box-shadow: none;
		}

		.el-radio-button:first-child .el-radio-button__inner {
			border-radius: 20px 0 0 20px;
		}
		.el-radio-button:last-child .el-radio-button__inner {
			border-radius: 0 20px 20px 0;
		}
		.el-radio-button__inner {
			border: 1px solid #d0d0d0;
			border-radius: 3px;
		}
	}
	.dialog-header {
		.title {
			margin-right: 16px;
		}
	}

</style>
