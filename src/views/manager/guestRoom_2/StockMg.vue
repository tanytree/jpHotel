<template>
	<div class="boss-index">
		<el-tabs v-model="activeName" class="tabCenter">
			<el-tab-pane label="商品库存统计" name="count">
				<div class="content">
					<el-form class="term line demo-form-inline" inline size="small" v-model="form">
						<el-form-item label="商品名称:">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item label="库存状态:" class="margin-l-15">
							<el-select v-model="form.status">
								<el-option label='启用' value="1"></el-option>
								<el-option label='禁用' value="2"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" class="submit" @click="search">查询</el-button>
							<el-button class="grey" @click="reset">重置</el-button>
						</el-form-item>
						<el-form-item class="form-inline-flex">
							<el-button @click="popup('add')" class="white">导出</el-button>
						</el-form-item>
					</el-form>
					<div class="components-edit">
						<el-table ref="multipleTable" :data="list" height="100%" header-row-class-name="default" size="small">
							<el-table-column prop="name" label="商品名称"></el-table-column>
							<el-table-column prop="inventoryWarning" label="库存预警数量"></el-table-column>
							<el-table-column prop="inventoryCount" label="库存量"></el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click="popup('changeStock', scope.row)">修改库存</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="block">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
						</div>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="入库审核" name="examine">
				<el-row :gutter="20" style="display: flex;justify-content: center;align-items: center;">
					<div class="btn-click" @click="popup('info')">
						<div style="display: flex;justify-content: center;align-items: center;">
							<img src="../../../assets/images/house.png" alt="">
							<span>商品入库</span>
						</div>
					</div>
				</el-row>
			</el-tab-pane>
		</el-tabs>
		<!-- 修改库存 -->
		<el-dialog top="0" title="修改库存" :visible.sync="changeStockVisible" :close-on-click-modal="false">
			<el-form :model="stock" :rules="rules" label-width="150px">
				<el-form-item label="库存数量:" prop="name">
					<el-input v-model="stock.count"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="changeStockVisible = false">取 消</el-button>
				<el-button type="primary" @click="submit('stockNum')">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 商品入库 -->
		<el-dialog top="0" title="商品入库" :visible.sync="goodsInVisible" width="1000px" class="goodin" :close-on-click-modal="false">
			<el-form :model="goodInForm" :rules="rules" size="small" label-width="100px" class="demo-form-inline">
				<el-form-item label="入库类型:" prop="name">
					<el-select v-model="goodInForm.type" placeholder="请选择入库类型">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="form-inline-flex">
					<el-button type="primary" class="submit" @click="popup('addPi')">批量添加商品</el-button>
				</el-form-item>
			</el-form>
			<el-card shadow="never">
				<el-table ref="multipleTable" :data="list" height="100%" header-row-class-name="default" size="small">
					<el-table-column prop="name" label="商品名称"></el-table-column>
					<el-table-column prop="costPrice" label="成本价"></el-table-column>
					<el-table-column label="入库数量">
						<template slot-scope="scope">
							<el-input v-model="scope.row.inventoryCount" size="small"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="100">
						<template slot-scope="scope">
							<el-popconfirm title="确定要移除？" @onConfirm="goodsDelete(scope.row)">
								<el-button slot="reference" type="text" size="small">移除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
			</el-card>

			<el-form :model="goodInForm" size="small" :rules="rules" ref="goodInForm" label-width="100px">
				<el-col :span="8">
					<el-form-item label="经办人:" prop="person">
						<el-input v-model="goodInForm.person"></el-input>
					</el-form-item>
					<el-form-item label="申请日期:" prop="date">
						<el-date-picker v-model="goodInForm.date" type="date" placeholder="选择日期"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="16">
					<el-form-item label="入库备注:">
						<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="goodInForm.remark"></el-input>
					</el-form-item>
				</el-col>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 批量添加商品 -->
		<el-dialog top="0" title="批量添加商品" width="1000px" :visible.sync="addGoodsVisible" :close-on-click-modal="false">
			<el-form v-model="addGoods" class="demo-form-inline" inline size="small">
				<el-form-item label="商品名称:">
					<el-input v-model="addGoods.name"></el-input>
				</el-form-item>
				<el-form-item label="商品分类:" class="margin-l-15">
					<el-cascader v-model="addGoods.category" :options="category" :props="categoryProps" @change="casChange"></el-cascader>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="submit" @click="search">查询</el-button>
				</el-form-item>
			</el-form>
			<div class="components-edit">
				<el-table ref="multipleTable" :data="list" tooltip-effect="dark" height="250px" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="name" label="商品名称"></el-table-column>
					<el-table-column prop="time" label="商品类别"></el-table-column>
					<el-table-column prop="job_status" label="成本价"></el-table-column>
				</el-table>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'count',
				form: {name: '', status: 'all'},
				stock: {count: ''},
				goodInForm: {type: '', person: '', date: '', remark: ''},
				addGoods: {name: '', categoryId: ''},
				categoryProps: {value: 'id', label: 'name', children: 'child'},
				rules: {
					count: [{required: true, message: '请输入库存', trigger: 'blur'}]
				},
				changeStockVisible: false,
				goodsInVisible: false, //商品入库弹框
				addGoodsVisible:false, // 修改库存
			};
		},
		props: {
			list: Array, category: Array, total: Number, pageSize: Number, currentPage: Number, initData: Function
		},
		mounted() {
		},
		methods: {
			popup(type, row) {
				if(type == 'changeStock') {
					this.stock.id = row.id;
					this.stock.count = row.inventoryCount;
					this.changeStockVisible = true;
				}
				switch (type) {
					case 'info':
						this.goodsInVisible = true;
						break
					case 'addPi':
						this.addGoodsVisible = true;
						break
				}
			},
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
				if(type == 'stockNum') {
					this.$F.doRequest(this, '/pms/hotelgoods/upcounts', {
						id: this.stock.id,
						counts: this.stock.count
					}, (res) => {
						this.changeStockVisible = false
						this.initData()
					})
				}
			},
			goodsDelete() {

			},
		}
	};
</script>

<style lang="less" scoped>
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
	.goodin {
		.el-card {
			border: 1px solid #c2c2c2;
			margin-bottom: 20px;
		}
	}
</style>
