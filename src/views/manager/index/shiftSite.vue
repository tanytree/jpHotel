<template>
	<div class="boss-index">
		<el-tabs v-model="activeName" @tab-click="changeTab" class="tabCenter">
			<el-tab-pane label="交班模式" name="handover">
				<div class="content">
					<div class="manage">
						<div class="tag-top">
							<div class="handTitle"><span class="square"></span> 前台部交班设置</div>
							<el-form v-model="handData" size="small">
								<el-row :gutter="20">
									<el-form-item label="交班模式：">
										<el-radio-group v-model="handData.handoverStatus">
											<el-radio :label="1">现金流模式</el-radio>
											<el-radio :label="2">实收模式</el-radio>
											<el-radio :label="3">应收模式</el-radio>
										</el-radio-group>
									</el-form-item>
									<el-form-item label="备用金：">
										<el-input v-model="handData.pettyCash"></el-input>
									</el-form-item>
								</el-row>
								<el-form-item label="模式说明：">
									<el-input type="textarea" v-model="handData.pettyCash"></el-input>
								</el-form-item>
							</el-form>
						</div>
						<div class="demo-form-inline">
							<div class="handTitle"><span class="square"></span> 前台部交班设置</div>
							<el-col :span="8">
								<el-input v-model="five_money" placeholder="请输入备用金"></el-input>
							</el-col>
							<el-col :span="8" :offset="0.5" style="color: #888888;">日元</el-col>
						</div>
						<div class="demo-form-inline" style="padding: 20px 0px;">
							<el-col :span="3">模式说明:</el-col>
							<el-col :span="8">
								<el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="five_money"></el-input>
							</el-col>
						</div>
					</div>
					<div class="footer">
						<el-button type="primary" class="submit" @click="submit">保存</el-button>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="班次管理" name="handManage">
				<el-row :gutter="24" class="demo-form-inline">
					<el-col :span="2" :offset="22">
						<!-- 直接添加一行表格 -->
						<el-button type="primary" size="small" style="width: 80px; margin-bottom: 18px;" @click="popup_thing">+ 新增</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-table ref="multipleTable" :data="four_tableData" border height="100%" header-row-class-name="default" size="small">
						<el-table-column prop="name" label="班次名称">
							<template slot-scope="name">
								<el-input v-model="five_money"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="开始时间">
							<template slot-scope="name">
								<el-time-select v-model="five_money" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"
								 placeholder="选择时间"></el-time-select>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="结束时间">
							<template slot-scope="name">
								<el-time-select v-model="five_money" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"
								 placeholder="选择时间"></el-time-select>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="150">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="popup_thing(scope.row)">编辑</el-button>
								<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="onConfirm">
									<el-button slot="reference" type="text" size="small">删除</el-button>
								</el-popconfirm>
							</template>
						</el-table-column>
					</el-table>
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
					</div>
				</el-row>
				<el-row>
					<el-button type="primary" style="width: 80px;">保存</el-button>
				</el-row>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'handover',
				handData: {},
				four_tableData: [
					{
						name: '张十三',
						time: '2020-5-20',
						job_status: '实习期',
						job: '普通员工',
						number: '11223',
						parts: '销售部'
					}, {
						name: '张十三',
						time: '2020-5-20',
						job_status: '实习期',
						job: '普通员工',
						number: '11223',
						parts: '销售部'
					}
				],

				five_redioList: [{
					name: '现金流模式',
					radio: true
				}, {
					name: '实收模式',
					radio: false
				}, {
					name: '应收模式',
					radio: false
				}],
				five_money: '',

				dialogImageUrl: '',
				dialogVisible: false,
			}
		},
		props: {
			list: Array, category: Array, total: Number, pageSize: Number, currentPage: Number, initData: Function
		},
		methods: {
			changeTab(tab) {
				if(tab.name == 'type') {
					this.initData()
				} else {
					this.getDamageData()
				}
			},
			popup_thing() {
				this.dialogAdd_thing = true;
			},
			popup_kinds() {
				this.dialogAdd_kinds = true;
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
			//上传图片
			handleRemove(file) {
				console.log(file);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleDownload(file) {
				console.log(file);
			},
			handleSelectionChange() {},
			handleSizeChange() {},
			handleCurrentChange() {},
			onConfirm() {},
			submit() {}
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

			.manage {
				flex: 1;
				height: 0;
			}

			.footer {
				border-top: 1px solid #e2e2e2;
				line-height: 60px;
				padding: 0 20px;
			}
		}
	}
</style>
