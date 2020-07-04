<template>
	<div>
		<el-row>
			<el-tabs v-model="activeFive">
				<el-tab-pane label="交班模式" name="five_a">
					<el-row :gutter="20" class="tag-top" style="padding: 20px 0px;">
						<el-col :span="3">交班模式:</el-col>
						<el-col :span="4" v-for="(value, index) in five_redioList" :key="index">
							<el-checkbox v-model="value.redio" @change="changeRedio_five(value,index)">{{value.name}}</el-checkbox>
						</el-col>
					</el-row>
					<el-row :gutter="18" class="demo-form-inline" style="padding: 20px 0px;" v-if="beiYong_show">
						<el-col :span="3">备用金:</el-col>
						<el-col :span="8">
							<el-input v-model="five_money" placeholder="请输入备用金"></el-input>
						</el-col>
						<el-col :span="8" offset="0.5" style="color: #888888;">日元</el-col>
					</el-row>
					<el-row :gutter="18" class="demo-form-inline" style="padding: 20px 0px;">
						<el-col :span="3">模式说明:</el-col>
						<el-col :span="8">
							<el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="five_money"></el-input>
						</el-col>
					</el-row>
					<el-row>
						<el-button type="primary" style="width: 80px;">保存</el-button>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="班次管理" name="five_b">
					<el-row :gutter="24" class="demo-form-inline">
						<el-col :span="2" :offset="22">
							<!-- 直接添加一行表格 -->
							<el-button type="primary" size="small" style="width: 80px; margin-bottom: 18px;" @click="popup_thing">+ 新增</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-table ref="multipleTable" :data="four_tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
						 @selection-change="handleSelectionChange">
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
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
							 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout=" sizes, prev, pager, next, jumper" :total="400"></el-pagination>
						</div>
					</el-row>
					<el-row>
						<el-button type="primary" style="width: 80px;">保存</el-button>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'one',
				roomStatus: {
					dong: '', //楼栋
					tag: '' //楼层
				},
				items: [{
						type: '',
						label: '全部(200)'
					},
					{
						type: 'success',
						label: '空净(20)'
					},
					{
						type: 'info',
						label: '空脏(20)'
					},
					{
						type: 'danger',
						label: '空脏(20)'
					},
					{
						type: 'warning',
						label: '空脏(20)'
					},
					{
						type: 'warning',
						label: '空脏(20)'
					}
				],
				roomList: [{
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#27ae76'
					},
					{
						hao: 'A001',
						status: 1,
						status_name: '单间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '单间',
						bgColor: '#b07b2e'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#c0512b'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#c0512b'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}
				],
				checked: true,
				two: {
					time: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
				},
				activeThree: 'a',
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
				activeFour: 'four_a',
				four_tableData: [{
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
				}],
				fourForm: {
					name: ''
				},
				fourrules: {
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}]
				},
				dialogAdd_kinds: false,
				dialogAdd_thing: false,
	
				activeFive: 'five_a',
				beiYong_show: true,
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
	
				seven_redioList: [{
					name: '寄存单',
					radio: true
				}, {
					name: '预收款单',
					radio: false
				}, {
					name: '定金单',
					radio: false
				}, {
					name: '商品消费单',
					radio: true
				}, {
					name: '入住消费单',
					radio: false
				}, {
					name: '餐饮消费单',
					radio: false
				}],
	
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false,
				pickerOptions: {
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
			}
		},
		methods: {
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
			}
		}
	}
</script>

<style>
</style>
