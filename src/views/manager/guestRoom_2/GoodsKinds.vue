<template>
	<div class="boss-index">
		<!-- 具体参照黄工的营销部-产品管理部-店铺产品分类 -->
		<div class="goodsType">
			<div class="goodsTop" style="margin-bottom: 20px;">
				<el-button class="cancel" icon="fas fa-caret-right" @click="expanded">折叠全部</el-button>
				<el-button class="cancel" @click="addCategory">新增一级分组</el-button>
			</div>
			<div class="accountBtm">
				<el-tree :props="treeProps" :data="treeData" node-key="id" ref="treeType" default-expand-all>
					<span class="custom-tree-node" slot-scope="{node, data}">
						<span>{{ node.label }}</span>
						<span>
							<el-button class="btn-text" type="text" v-if="data.categoryLevel == 1" size="mini" @click="() => addSecond(node, data)" @click.stop>新增二级分类</el-button>
							<el-button class="btn-text" type="text" v-if="data.categoryLevel == 2" size="mini" @click="() => addThird(node, data)" @click.stop>新增三级分类</el-button>
							<el-button class="btn-text" type="text" size="mini" @click="() => editNode(node, data)" @click.stop>编辑</el-button>
							<el-button class="btn-text" type="text" size="mini" @click="() => deleteNode(data)" @click.stop>删除</el-button>
						</span>
					</span>
				</el-tree>
			</div>
		</div>
		<!-- 新增分类 -->
		<el-dialog :title="cateTitle" :visible.sync="cateVisible" top="0" :close-on-click-modal="false">
			<el-form label-position="right" label-width="50px" size='medium'>
				<el-form-item label="一级分类名称：">
					<el-input :disabled="category.categoryLevel==2 || category.categoryLevel==3 ? true: false" v-model="category.province"></el-input>
				</el-form-item>
				<el-form-item v-if="category.categoryLevel==2 || category.categoryLevel==3" label="二级分类名称：">
					<el-input :disabled="category.categoryLevel==3 ? true: false" v-model="category.city"></el-input>
				</el-form-item>
				<el-form-item v-if="category.categoryLevel==3" label="三级级分类名称：">
					<el-input v-model="category.county"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" class="blueBtn mini" @click="submit">确认</el-button>
				<el-button class="defaultBtn mini" @click="cateVisible = false">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				areaActive: 'category',
				treeProps: {children: 'child', label: 'name'},
				treeData: [], isexpand: true, allTree: [],
				cateVisible: false,
				cateTitle: '', add: true,
				category: {id: '', categoryLevel: '', province: '', city: '', county: ''},
			};
		},
		mounted() {
			this.queryCategory()
		},
		methods: {
			queryCategory: function() {
				var a = this;
				this.$F.doRequest(this, '/pms/hotelcategory/list', {}, (res) => {
					a.allTree = res.list;
					a.treeData = a.getTreeItem(res.list);
				})
			},
			getTreeItem: function (arr) {
				let newarr = []
				arr.sort(this.compare('categoryOrder'))
				newarr = arr.filter(father => {
					const branchArr = arr.filter((child) => {
						if (father.id == child.pCategoryId ) child._hasParent = true;
						return father.id == child.pCategoryId;
					});
					if (branchArr.length > 0) father.child = branchArr;
					return !father._hasParent;
				})

				newarr = newarr.filter((item) => {
					return !item._hasParent;
				})
				return newarr;
			},
			compare: function (attr, rev){
				if(rev ==  undefined){
					rev = 1;
				} else {
					rev = (rev) ? 1 : -1;
				}
				return function(a,b){
					a = a[attr];
					b = b[attr];
					if(a < b){
						return rev * -1;
					}
					if(a > b){
						return rev * 1;
					}
					return 0;
				}
			},
			addCategory() {
				this.cateVisible = true;
				this.category.categoryLevel = 1;
				this.cateTitle = '新增一级分类';
				this.add = true;
			},
			addSecond(node, data) {
				this.cateVisible = true;
				this.category.categoryLevel = 2;
				this.category.province = data.name;
				this.category.id = data.id;
				this.cateTitle = '新增二级分类';
				this.add = true;
			},
			addThird(node, data) {
				this.cateVisible = true;
				this.category.categoryLevel = 3;
				this.category.province = node.parent.data.name;
				this.category.city = data.name;
				this.category.id = data.id;
				this.cateTitle = '新增三级分类';
				this.add = true;
			},
			expanded: function() {
				this.isexpand = !this.isexpand;
				for(var i = 0; i < this.$refs.treeType.store._getAllNodes().length; i++){
					this.$refs.treeType.store._getAllNodes()[i].expanded = this.isexpand;
				}
			},
			editNode: function(node, data) {
				this.cateVisible = true;
				this.cateTitle = '修改分类';
				if(data.categoryLevel == 1) {
					this.category = {id: data.id, categoryLevel: data.categoryLevel, province: data.name, city: '**', county: '**'}
				} else if (data.categoryLevel == 2) {
					this.category = {id: data.id, categoryLevel: data.categoryLevel, province: node.parent.data.name, city: data.name, county: '**'}
				} else {
					this.category = {id: data.id, categoryLevel: data.categoryLevel, province: node.parent.parent.data.name, city: node.parent.data.name, county: data.name}
				}
				this.add = false;
			},

			//删除
			deleteNode: function(data) {
				var a = this;

				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					$.ajax({
						url: serverName + '/region/address/delete',
						type: 'post',
						data: {
							token: token, id: data.id,
						},
						dataType: 'json',
						success: function(res) {
							if(res.code === 0) {
								a.$message.success('删除轮地区成功');
								a.queryCategory();
							} else {
								a.$message.error(res.message);
							}
						}
					})
				})
			},
			submit: function () {
				var a = this;
				var name = a.category.categoryLevel==1 ? a.category.province : a.category.categoryLevel == 2 ? a.category.city : a.category.county;
				if(a.add) {
					$.ajax({
						url: serverName + '/region/address/add',
						type: 'post',
						data: {token: token, name: name, parentid: a.category.id, type: ''},
						dataType: 'json',
						success: function(res) {
							if(res.code === 0) {
								a.$message.success('添加地区成功');
								a.queryCategory();
								a.cateVisible = false;
								a.category = {};
							} else {
								a.$message.error(res.message);
							}
						},
					})
				} else {
					$.ajax({
						url: serverName + '/region/address/edit',
						type: 'post',
						data: {token: token, id: a.category.id, name: name, type: ''},
						dataType: 'json',
						success: function(res) {
							if(res.code === 0) {
								a.$message.success('修改地区成功');
								a.queryCategory();
								a.cateVisible = false;
								a.category = {};
							} else {
								a.$message.error(res.message);
							}
						},
					})
				}

			},
		}
	};
</script>

<style lang="less">

	.goodsType {
		display: flex;
		flex-direction: column;
		background-color: #E4E7EA;
		border-radius: 8px;
		padding: 20px;
		margin: 0 20px;
		max-height: 100%;

		.el-tree {
			background: transparent;

			& > .el-tree-node {
				background-color: #fff;
				margin-bottom: 20px;
				border-radius: 6px;
			}

			.custom-tree-node {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 14px;
				padding-right: 8px;
			}

			.el-tree-node__content {
				height: 54px;
				border-bottom: 1px solid #dfdfdf;
				color: #333;
			}
		}

		.goodsTop {
			padding: 20px;
			display: flex;
			flex-direction: row;
			background-color: #fff;
			border-radius: 6px;
			margin-bottom: 20px;
		}

		.accountBtm {
			padding: 0;
			overflow: auto;
		}
	}
</style>
