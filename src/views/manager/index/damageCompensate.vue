<template>
	<div class="boss-index">
		<el-tabs v-model="activeFour"  @tab-click="changeTab" class="tabCenter">
			<el-tab-pane label="损物赔偿类型" name="type">
				<div class="content">
					<div class="right">
						<el-button type="primary" class="submit" size="small" @click="popup_kinds('add')">新增类型</el-button>
					</div>
					<el-table ref="multipleTable" :data="list" border height="100%" header-row-class-name="default" size="small">
						<el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
						<el-table-column label="操作" width="300">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="popup_kinds('edit', scope.row)">修改</el-button>
								<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="onConfirm(scope.row)">
									<el-button slot="reference" type="text" size="small">删除</el-button>
								</el-popconfirm>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-tab-pane>
			<el-tab-pane label="损物赔偿物品" name="goods">
				<div class="content">
					<el-form v-model="form" class="term line demo-form-inline" inline size="small">
						<el-form-item label="物品名称:">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item label="物品类型:">
							<el-select v-model="form.category" placeholder="请选择状态">
								<el-option v-for="(item, index) in list" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" class="submit" @click="search">查询</el-button>
							<el-button class="grey" @click="reset">重置</el-button>
						</el-form-item>
						<el-form-item class="form-inline-flex">
							<el-button type="primary" class="submit" @click="popup_thing">+ 新增</el-button>
						</el-form-item>
					</el-form>
					<el-table ref="multipleTable" :data="damageData" border height="100%" header-row-class-name="default" size="small">
						<el-table-column prop="damageTypeName" label="物品类型"></el-table-column>
						<el-table-column prop="name" label="物品名称"></el-table-column>
						<el-table-column prop="damagePrice" label="赔偿单价"></el-table-column>
						<el-table-column prop="state" label="状态"></el-table-column>
						<el-table-column label="操作" width="150">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="popup_thing(scope.row)">修改</el-button>
								<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="onDeleteData(scope.row)">
									<el-button slot="reference" type="text" size="small">删除</el-button>
								</el-popconfirm>
							</template>
						</el-table-column>
					</el-table>
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageForm.pageIndex" :page-size="pageForm.pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
		<!-- 损物赔偿-新增/修改类型 -->
		<el-dialog top="0" :title="addTypeTitle" :visible.sync="addTypeVisible" :close-on-click-modal="false">
			<el-form :model="typeData" label-width="100px" class="demo-ruleForm">
				<el-form-item label="类型名称" prop="name">
					<el-input v-model="typeData.name"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="white" @click="addTypeVisible = false">取 消</el-button>
				<el-button class="submit" type="primary" @click="submit('addType')">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 损物赔偿-新增/修改物品 -->
		<el-dialog top="0" :title="addGoodsTitle" :visible.sync="addGoodsVisible" :close-on-click-modal="false">
			<el-form :model="goodsData" :rules="fourrules" size="small" label-width="100px" class="demo-ruleForm">
				<el-form-item label="物品类型:" prop="type">
					<el-select v-model="goodsData.damageTypeId" placeholder="请选择状态">
						<el-option v-for="(item, index) in list" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="物品名称:" prop="name">
					<el-input v-model="goodsData.name"></el-input>
				</el-form-item>
				<el-form-item label="赔偿单价:" prop="name">
					<el-input v-model="goodsData.damagePrice"></el-input>
				</el-form-item>
				<el-form-item label="成本价格">
					<el-input v-model="goodsData.costPrice"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="goodsData.state">
						<el-radio :label="1">启用</el-radio>
						<el-radio :label="2">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="goodsData.remark"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="white" @click="addGoodsVisible = false">取 消</el-button>
				<el-button type="primary" class="submit" @click="submit('addGoods')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pageForm: {
					pageIndex: 1,
					pageSize: 10,
					paging: true
				},
				activeFour: 'type', radio: '',
				typeData: {name: ''},
				damageData: [],
				form: {name: '', category: ''},
				total: 1,
				fourrules: {
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}]
				},
				addTypeVisible: false, addTypeTitle: '新增类型',
				addGoodsVisible: false, addGoodsTitle: '新增',
				goodsData: {damageTypeId: '', name: '', damagePrice: '', costPrice: '', state: '', remark: ''}
			}
		},
		props: {list: Array, initData: Function},
		methods: {
			changeTab(tab) {
				if(tab.name == 'type') {
					this.initData()
				} else {
					this.getDamageData()
				}
			},
			getDamageData(id, name) {
				const params = {
					damageTypeId: id,
					name: name,
				}
				this.$F.merge(params, this.pageForm);
				this.$F.doRequest(this, '/pms/hoteldamage/list', params, (res) => {
					this.damageData = res.list;
					this.total = res.page.count;
				})
			},
			search() {
				this.getDamageData(this.form.category, this.form.name)
			},
			reset() {
				this.form = {name: '', category: ''}
			},
			popup_thing(type, row) {
				this.addGoodsVisible = true;
				if(type == 'edit') {
					this.goodsData = row;
					this.addGoodsTitle = '编辑'
				} else {
					this.goodsData = {damageTypeId: '', name: '', damagePrice: '', costPrice: '', state: '', remark: ''};
					this.addGoodsTitle = '新增'
				}
			},
			popup_kinds(type, row) {
				this.addTypeVisible = true;
				if(type == 'edit') {
					this.typeData = row;
					this.addTypeTitle = '编辑'
				} else {
					this.typeData = {name: ''};
					this.addTypeTitle = '新增类型'
				}
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
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			onConfirm(row) {
				this.$F.doRequest(this, '/pms/hoteldamagetype/delete', {id: row.id}, (res) => {
					this.initData()
				})
			},
			onDeleteData(row) {
				this.$F.doRequest(this, '/pms/hoteldamage/delete', {id: row.id}, (res) => {
					this.getDamageData()
				})
			},
			submit(type) {
				if(type == 'addType') {
					const params = {
						id: this.typeData.id,
						name: this.typeData.name
					}
					this.$F.doRequest(this, '/pms/hoteldamagetype/edit', params, (res) => {
						this.initData();
						this.addTypeVisible = false;
					})
				} else if (type == 'addGoods') {
					const params = {
						id: this.goodsData.id,
						damageTypeId : this.goodsData.damageTypeId,
						name: this.goodsData.name,
						damagePrice: this.goodsData.damagePrice,
						state: this.goodsData.state,
						costPrice: this.goodsData.costPrice,
						remark: this.goodsData.remark
					}
					this.$F.doRequest(this, '/pms/hoteldamage/edit', params, (res) => {
						this.getDamageData();
						this.addGoodsVisible = false;
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabCenter {
		padding: 10px;

		.content {
			height: 100%;
			display: flex;
			flex-direction: column;

			.right {
				text-align: right;
				margin-bottom: 20px;
			}
		}
	}
</style>
