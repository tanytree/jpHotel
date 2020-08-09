<template>
	<div class="boss-index">
		<div class="content">
			<div class="btn-item">
				<div v-for="(item,index) in btnList" :key="index" class="btn-default" :class="currentIndex==item.id? 'btn-active':''" @click="changeTab(item)">
					<div class="name">{{item.name}}</div>
					<div class="num">{{item.num}}单</div>
				</div>
			</div>
			<div class="into">
				<el-form class="term line demo-form-inline" v-model="form" inline size="small">
					<el-form-item label="入库类型:">
						<el-select v-model="form.soteageType">
							<el-option label="采购入库" value="1"></el-option>
							<el-option label="手动入库" value="2"></el-option>
							<el-option label="其他入库" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="制单人：">
						<el-input v-model="form.creatorName"></el-input>
					</el-form-item>
					<el-form-item label="申请日期:">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.startDate"></el-date-picker>
						<span class="line">--</span>
						<el-time-picker placeholder="选择时间" v-model="form.endDate"></el-time-picker>
					</el-form-item>
					<el-form-item label="入库内容:">
						<el-input v-model="form.content"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="submit" @click="search">查询</el-button>
						<el-button type="primary" class="grey" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
				<div class="components-edit">
					<el-table ref="multipleTable" :data="tableList" border height="100%" header-row-class-name="default" size="small">
						<el-table-column prop="storeageNum" label="单号"></el-table-column>
						<el-table-column prop="applyTime" label="申请日期"></el-table-column>
						<el-table-column prop="soteageType" label="入库类型"></el-table-column>
						<el-table-column prop="creatorName" label="制单人"></el-table-column>
						<el-table-column prop="authStatus" label="状态"></el-table-column>
						<el-table-column label="操作" width="300">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="popup('detail', scope.row)">明细</el-button>
								<el-button type="text" size="small" @click="popup('change', scope.row)">修改</el-button>
								<el-button type="text" size="small" @click="popup('exam', scope.row)">审核</el-button>
								<el-popconfirm title="确认删除？" icon="el-icon-warning-outline" iconColor="#FF8C00" @onConfirm="handleDelete(scope.row)">
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
		</div>
		<!-- 入库单明细 -->
		<el-dialog top="0" title="入库单明细" width="1000px" :visible.sync="entryDetailVisible" :close-on-click-modal="false">
			<el-row :gutter="20" style="line-height: 30px;">
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" class="label">入库单号:</el-col>
					<el-col :span="17">{{rowData.storesNum}}</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" class="label">入库类型:</el-col>
					<el-col :span="17">{{rowData.soteageTypeDesc}}</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" class="label">申请日期:</el-col>
					<el-col :span="17">{{rowData.createTime}}</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" class="label">制单人:</el-col>
					<el-col :span="17">{{rowData.creatorName}}</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" class="label">审核状态:</el-col>
					<el-col :span="17">{{rowData.authStatusDesc}}</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" class="label">审核时间:</el-col>
					<el-col :span="17">{{rowData.applyTime}}</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" class="label">审核人:</el-col>
					<el-col :span="17">{{rowData.authorName}}</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" class="label">经办人:</el-col>
					<el-col :span="17">{{rowData.agentName}}</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" class="label">入库备注:</el-col>
					<el-col :span="17">{{rowData.remark}}</el-col>
				</el-col>
				<el-col :span="8" class="demo-form-inline">
					<el-col :span="9" class="label">审核意见:</el-col>
					<el-col :span="17">{{rowData.authContent}}</el-col>
				</el-col>
			</el-row>
			<el-table ref="multipleTable" :data="goodsList" border height="100%" header-row-class-name="default" size="small">
				<el-table-column prop="name" label="商品名称"></el-table-column>
				<el-table-column prop="costPrice" label="成本价"></el-table-column>
				<el-table-column prop="inventoryCount" label="入库数量"></el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="entryDetailVisible = false">关闭</el-button>
			</span>
		</el-dialog>
		<!-- 修改商品入库 和库存管理修改库存一样 -->
		<el-dialog top="0" title="修改商品入库" width="800px" :visible.sync="changeInfoVisible" :close-on-click-modal="false">
			<el-form :model="rowData" label-width="100px" class="demo-form-inline" inline size="small">
				<el-form-item label="入库类型:" prop="name">
					<el-select v-model="rowData.soteageType">
						<el-option label="采购入库" value="1"></el-option>
						<el-option label="手动入库" value="2"></el-option>
						<el-option label="其他入库" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="form-inline-flex">
					<el-button type="primary" @click="popup('addPi')">批量添加商品</el-button>
				</el-form-item>
			</el-form>
			<el-table ref="multipleTable" :data="goodsList" border height="100%" header-row-class-name="default" size="small">
				<el-table-column prop="name" label="商品名称"></el-table-column>
				<el-table-column prop="costPrice" label="成本价"></el-table-column>
				<el-table-column label="入库数量">
					<template slot-scope="scope">
						<el-input v-model="scope.row.inventoryCount" size="small"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-popconfirm title="确认删除？" icon="el-icon-warning-outline" iconColor="#FF8C00" onConfirm="handleDelete(scope.row)">
							<el-button slot="reference" size="small" type="text">移除</el-button>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
			<el-form :model="rowData" label-width="100px" inline size="small">
				<el-col :span="8">
					<el-form-item label="经办人:" prop="person">
						<el-input v-model="rowData.agentName"></el-input>
					</el-form-item>
					<el-form-item label="申请日期:" prop="date">
						<el-date-picker v-model="rowData.createTime" type="date" placeholder="选择日期"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="16">
					<el-form-item label="入库备注:">
						<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="rowData.remark"></el-input>
					</el-form-item>
				</el-col>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="changeInfoVisible = false">取 消</el-button>
				<el-button type="primary" @click="changeInfoVisible = false">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 入库审核 -->
		<el-dialog top="0" title="入库审核" width="600px" :visible.sync="inHouseExamVisible" :close-on-click-modal="false">
			<el-form :model="examData" label-width="100px">
				<el-form-item label="审核:">
					<el-radio-group v-model="examData.authStatus">
						<el-radio :label="1">待审核</el-radio>
						<el-radio :label="2">审核通过</el-radio>
						<el-radio :label="3">审核失败</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="审核:">
					<el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="examData.authContent"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="inHouseExamVisible = false">取 消</el-button>
				<el-button type="primary" @click="submit('exam')">确 定</el-button>
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
				currentIndex: 1,
				btnList: [],
				form: {soteageType: '', creatorName: '', startDate: '', endDate: '', content: ''},
				tableList: [],
				rowData: {storesNum: '', soteageType: '', soteageTypeDesc: '', createTime: '', creatorName: '', authStatusDesc: '', applyTime: '', authorName: '', agentName: '', remark: '', authContent: ''},
				examData: {authStatus: 1, authContent: ''},
				entryDetailVisible: false,
				changeInfoVisible: false, //修改入库弹框
				batchAddVisible: false, //批量修改库存
				inHouseExamVisible: false, //入库审核
			};
		},
		props: {
			list: Array, goodsList: Array, category: Array, total: Number, pageSize: Number, currentPage: Number, initData: Function
		},
		mounted() {
			this.getCountData();
			this.tableList = this.list.filter(item => item.authStatus = this.currentIndex)
		},
		methods: {
			getCountData() {
				this.btnList = [];
				this.$F.doRequest(this, '/pms/hotelstorage/countbystate', {}, (res) => {
					for(let i in res) {
						const obj = {name: '', id: i, num: res[i]};
						if(i == 1) {
							obj.name = '待审核入库单'
						} else if (i == 2) {
							obj.name = '审核通过入库单'
						} else {
							obj.name = '审核不通过入库单'
						}
						this.btnList.push(obj);
					}
				})
			},
			popup(type, row) {
				if(row.soteageType == 1) {
					row.soteageTypeDesc = '采购入库';
				} else if(row.soteageType == 2) {
					row.soteageTypeDesc = '手动入库';
				} else {
					row.soteageTypeDesc = '其他入库';
				}
				if(row.authStatus == 1) {
					row.authStatusDesc = '待审核';
				} else if(row.authStatus == 2) {
					row.authStatusDesc = '审核通过';
				} else {
					row.authStatusDesc = '审核失败';
				}
				switch (type) {
					case 'detail':
						this.entryDetailVisible = true;
						this.rowData = row;
						break
					case 'change':
						this.changeInfoVisible = true;
						this.rowData = row;
						break
					case 'addPi':
						this.batchAddVisible = true;
						break
					case 'exam':
						this.inHouseExamVisible = true;
						break
				}
			},
			// 切换
			changeTab(item) {
				this.currentIndex = item.id;
				this.tableList = this.list.filter(item => item.authStatus = this.currentIndex)
			},
			search() {
				this.initData(this.pageForm, this.currentIndex, this.form.soteageType, this.form.creatorName, this.form.startDate, this.form.endDate, this.form.content)
			},
			reset() {
				this.form = {soteageType: '', creatorName: '', startDate: '', endDate: '', content: ''}
			},
			// 分页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			handleDelete(row) {
				this.$F.doRequest(this, '/pms/hotelstorage/delete', row.id, (res) => {
					this.$message.success('删除成功');
					this.initData()
				})
			},
			submit(type) {
				if(type == 'exam') {
					this.$F.doRequest(this, '/pms/hotelstorage/approval', this.examData, (res) => {
						this.$message.success('success');
						this.initData()
					})
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.btn-item {
		display: flex;
		justify-content: space-around;
		width: 100%;
		margin-bottom: 20px;

		.btn-default {
			flex: 1;
			line-height: 30px;
			background: #F8F8F8;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding: 30px 20px;

			& + .btn-default {
				margin-left: 20px;
			}

			.num {
				color: #126EFF;
				font-weight: bolder;
			}
		}

		.btn-active {
			background-image: linear-gradient(to right, #29A7FF 0%, #126EFF 100%);
			color: #FFFFFF;
			box-shadow: 5px 5px 20px #b3d1ff;

			.num {
				color: #fff;
			}
		}

		.btn-default:active {
			background-color: darken(#126EFF, 10%);
		}
	}

	.into {
		flex: 1;
		display: flex;
		flex-direction: column;

		.label {
			color: #898B8E;
		}
	}
</style>
