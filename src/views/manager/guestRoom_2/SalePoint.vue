<template>
	<div>
		<el-row style="display: flex;justify-content: center;">
			<el-radio-group v-model="tabPosition" style="display: flex;justify-content: center;align-items: center;">
			    <el-radio-button :label="item" v-for="(item, index) in typeList" :key="item" class="btn-margin">{{item}}</el-radio-button>
				<el-button type="text" @click="popup('mg')">管理售卖点</el-button>
			  </el-radio-group>
		</el-row>
		<!--售卖点-->
		<el-row style="margin-top: 30px;">
			<div class="content">
				<el-row>
					<el-form class="term line demo-form-inline" inline size="small">
						<el-form-item label="商品名称:">
							<el-input v-model="form.keyword1" class="row-width"></el-input>
						</el-form-item>
						<el-form-item label="商品分类:" class="margin-l-15">
							<el-select v-model="form.keyword1" placeholder="请选择部门" class="row-width">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="mini" class="submit" @click="search">查询</el-button>
							<el-button type="primary" size="mini" class="cancel" @click="reset">重置</el-button>
						</el-form-item>
						<el-form-item class="form-inline-flex">

						</el-form-item>
					</el-form>
					<el-form class="term line demo-form-inline" v-model="form" inline size="small">
						<el-form-item label="商品名称:">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item label="商品分类:">
							<el-select v-model="form.category">
								<el-option  v-for="(item, index) in category" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" class="submit" @click="search">查询</el-button>
							<el-button class="grey" @click="reset">重置</el-button>
						</el-form-item>
						<el-form-item class="form-inline-flex">
							<el-button type="primary" @click="popup('add')" size="mini" class="submit">上架商品</el-button>
						</el-form-item>
					</el-form>
				</el-row>
				<div class="components-edit">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
						<el-table-column prop="name" label="商品名称"></el-table-column>
						<el-table-column prop="time" label="默认零售价(日元)"></el-table-column>
						<el-table-column prop="job_status" label="员工价(日元)"></el-table-column>
						<el-table-column prop="job" label="成本价(日元)"></el-table-column>
						<el-table-column prop="job" label="默认购买数量"></el-table-column>
						<el-table-column prop="job" label="库存"></el-table-column>
						<el-table-column label="操作" width="150">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="popup('changeTab')">修改</el-button>
								<el-popconfirm title="确认删除？" icon="el-icon-warning-outline" iconColor="#FF8C00" onConfirm="handleDelete(scope.row)">
									<el-button slot="reference" type="text">删除</el-button>
								</el-popconfirm>
							</template>
						</el-table-column>
					</el-table>
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
					</div>
				</div>
			</div>
		</el-row>
		<!-- 售卖点管理 -->
		<el-dialog top="0" title="售卖点管理" :visible.sync="dialogSale_show" :close-on-click-modal="false">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="name" label="售卖点名称"></el-table-column>
				<el-table-column prop="time" label="允许签单到房间"></el-table-column>
				<el-table-column prop="job_status" label="允许签单到单位"></el-table-column>
				<el-table-column prop="job" label="状态"></el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="popup('bin')">禁用</el-button>
						<el-button type="text" size="small" @click="popup('change')">修改</el-button>
						<el-popconfirm title="确认删除？" icon="el-icon-warning-outline" iconColor="#FF8C00" onConfirm="handleDelete(scope.row)">
							<el-button slot="reference" size="small" type="text">删除</el-button>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 新增售卖点 -->
		<el-dialog top="0" title="新增售卖点" :visible.sync="dialogAdd_change" :close-on-click-modal="false">
			<el-row :gutter="20">
				<el-form :model="threeForm" :rules="threerules" ref="ruleForm" label-width="150px">
					<el-col :span="18">
						<el-form-item label="售卖点名称:" prop="name">
							<el-input v-model="threeForm.name"></el-input>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-row :gutter="20">
				<el-form :model="threeForm" :rules="threerules" ref="ruleForm" label-width="150px">
					<el-col :span="18">
						<el-form-item label="允许签到到单位:" prop="name">
							<el-radio v-model="radio" label="1">是</el-radio>
							<el-radio v-model="radio" label="2">否</el-radio>
						</el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="允许签到到房间:" prop="name">
							<el-radio v-model="radio" label="1">是</el-radio>
							<el-radio v-model="radio" label="2">否</el-radio>
						</el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="状态:" prop="name">
							<el-radio v-model="radio" label="1">启用</el-radio>
							<el-radio v-model="radio" label="2">禁用</el-radio>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改商品上级信息 -->
		<el-dialog top="0" title="修改商品上级信息" :visible.sync="dialogTab_change" :close-on-click-modal="false">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
				typeList: ['迷你吧', '商品兑换', '售卖点', '售卖点3'],
				tabPosition: '迷你吧',
				form: {name: '', category: ''},
				total: 0, pageSize: 10, currentPage: 1,
				category: {},
				tableData: [{
					name: '',
					time: '2020-5-20',
					job_status: '实习期',
					job: '普通员工',
					number: '11223',
					parts: '销售部'
				}],
				dialogSale_show:false,
				dialogAdd_change:false,//弹框中修改售卖点
				dialogTab_change:false, //点击tab中的修改
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
		methods: {
			popup (type) {
				switch (type) {
					case 'mg':
					this.dialogSale_show = true;
					break
					case 'change':
					this.dialogAdd_change = true;
					break
					case 'changeTab':
					this.dialogTab_change = true;
					break
				}
			},
			search() {
				this.getHotelGoodsData(this.form.name, this.form.category, this.form.status)
			},
			reset() {
				this.form = {name: '', status: 'all', category: ''}
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			handleDelete(row) {

			}
		}
	};
</script>

<style lang="less" scoped>
	.btn-margin{
		border-top-left-radius: 40px;
		border-bottom-left-radius: 40px;
	}
	.btn-margin +.btn-margin {
		margin-left: 10px;
	}

</style>
