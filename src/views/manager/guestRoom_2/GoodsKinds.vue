<template>
	<div>
		<!-- 具体参照黄工的营销部-产品管理部-店铺产品分类 -->
		<div class="goodsType">
			<div class="accountTop goodsTop" style="margin-bottom: 20px;">
				<el-button class="defaultBtn" icon="fas fa-caret-right" @click="expanded">折叠全部</el-button>
				<el-button class="defaultBtn" @click="addFirst">新增一级分组</el-button>
			</div>
			<div class="accountBtm">
				<el-tree :props="treeProps" :data="tableData" node-key="id" ref="treeType" :default-expand-all="expand_all">
					<span class="custom-tree-node" slot-scope="{node, data}">
						<span>
							{{ node.label }}
							<!-- <img v-if="data.thumb" class="thumb" :src="data.thumb" /> -->
						</span>
						<span>
							<el-button class="btn-text" type="text" v-if="data.level == 1" size="mini" @click="() => addSecond(node, data)" @click.stop>新增二级分组</el-button>
							<el-button class="btn-text" type="text" size="mini" @click="() => editNode(node, data)" @click.stop>编辑</el-button>
							<el-button class="btn-text" type="text" size="mini" @click="() => deleteNode(data)" @click.stop>删除</el-button>
						</span>
					</span>
				</el-tree>
			</div>
		</div>
		<!-- 新增一级分类 -->
		<el-dialog title="新增一级分类" :visible.sync="first_show" :close-on-click-modal="false">
			<el-row :gutter="20">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
					<el-col :span="20">
						<el-form-item label="一级分类名称:" prop="name">
							<el-input placeholder="请输入内容" v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 新增二级分类 -->
		<el-dialog title="新增一级分类" :visible.sync="second_show" :close-on-click-modal="false">
			<el-row :gutter="20">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
					<el-col :span="20">
						<el-form-item label="上级分类:">
							<el-input placeholder="请输入内容" v-model="ruleForm.name" disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="二级分类名称:" prop="name">
							<el-input placeholder="请输入内容" v-model="ruleForm.name" disabled="true"></el-input>
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
				first_show:false,
				second_show:false,
				expand_all: true,
				tableData: [{
					id: 1,
					label: '零食',
					children: [{
						id: 4,
						label: '二级 1-1',
						children: [{
							id: 9,
							label: '三级 1-1-1'
						}, {
							id: 10,
							label: '三级 1-1-2'
						}]
					}]
				}, {
					id: 2,
					label: '纸巾',
					children: [{
						id: 5,
						label: '二级 2-1'
					}, {
						id: 6,
						label: '二级 2-2'
					}]
				}, {
					id: 3,
					label: '冰箱饮料',
					children: [{
						id: 7,
						label: '二级 3-1'
					}, {
						id: 8,
						label: '二级 3-2'
					}]
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
			};
		},
		methods: {
			addFirst() {
				this.first_show =true
			},
			addSecond() {
				this.second_show =true
			},
			expanded() {
				for (
				  var i = 0;
				  i < this.$refs.treeType.store._getAllNodes().length;
				  i++
				) {
				  this.$refs.treeType.store._getAllNodes()[i].expanded = !this.expand_all;
				  // this.expand_all = !this.expand_all
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.goodsType .el-tree .el-tree-node {
		background-color: #fff;
		margin-bottom: 0;
		border-radius: 6px;
	}

	.goodsType .custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}

	.custom-tree-node span {
		display: flex;
		align-items: center;
	}

	.goodsType .el-tree-node__content {
		height: 54px;
		border-bottom: 1px solid #dfdfdf;
		color: #333;
	}
	.btn-text {
		font-size: 13px;
		font-weight: bolder;
	}

	.el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409eff;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 40px;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}

	.avatar {
		width: 40px;
		height: 40px;
		display: block;
	}
</style>
