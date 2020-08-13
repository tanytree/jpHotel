<template>
	<div>
		<el-row v-if="tab_show">
			<el-row :gutter="20">
				<el-row>
					<el-form class="demo-form-inline" inline size="small">
						<el-form-item label="规则名称:">
							<el-input v-model="ruleForm.ruleName" class="row-width"></el-input>
						</el-form-item>
						<el-form-item label="计费模式:" class="margin-l-15">
							<el-select v-model="ruleForm.priceModel" class="row-width">
								<el-option label="1" value="固定时间退房模式"></el-option>
								<el-option label="2" value="24小时退房模式"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" style="width: 100px;" size="mini" @click="searchBtn">查询</el-button>
						</el-form-item>
						<el-form-item class="form-inline-flex">
							<el-row>
								<el-button type="primary" @click="popup('add')" style="width: 100px;" size="mini">新增</el-button>
							</el-row>
						</el-form-item>
					</el-form>
				</el-row>
				<div class="components-edit">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
						<el-table-column prop="ruleName" label="规则名称"></el-table-column>
						<el-table-column prop="ruleName" label="规则详情"></el-table-column>
						<el-table-column label="状态">
							<template slot-scope="{row}">
								<span>{{row.state == 1 ? '启用':'禁用'}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="remark" label="备注"></el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="popup('change')">修改</el-button>
								<el-button type="text" size="small" @click="stop_h(scope.row)">{{scope.row.state==1? '禁用':'启用'}}</el-button>
								<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteRow_h(scope.row)">
									<el-button slot="reference" type="text" size="small">删除</el-button>
								</el-popconfirm>
							</template>
						</el-table-column>
					</el-table>
					<div class="block">
						<!-- <div class="page-all">
							共
							<span style="font-weight:600;font-size: 14px;">{{ruleForm.totalSize}}</span>条记录
						</div> -->
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="ruleForm.pageIndex"
						 :page-sizes="[10, 20, 30, 40]" :page-size="ruleForm.pageSize" layout=" sizes, prev, pager, next, jumper"
						 :total="ruleForm.totalSize"></el-pagination>
					</div>
				</div>
			</el-row>
		</el-row>
		
		<!-- 时租房添加 -->
		<el-row v-if="!tab_show">
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back" content=""></el-page-header>
			</el-row>
			<el-row :gutter="20">
				<el-form :model="ruleForm_h" :rules="rules_h" ref="ruleForm" style="display: flex;flex-direction: column;align-items: flex-start;">
					<el-col :span="20" style="display: flex;align-items: center;">
						<el-form-item label="规则名称:" style="display: flex;align-items: center;">
							<el-input v-model="ruleForm_h.ruleName" />
						</el-form-item>
						<el-checkbox v-model="ruleForm_h.state" class="margin-l-15" style="margin-bottom: 20px;">启用</el-checkbox>
					</el-col>
					<el-col :span="20" style="margin-bottom: 20px;">
						<el-row :gutter="20" style="display: flex;align-items: center;">
							<el-col style="width: 200px; padding: 0;">
								<el-checkbox v-model="ruleForm_h.name" class="margin-l-15" style="margin-right: 15px;">指定办理入住时间段:</el-checkbox>
							</el-col>
							<el-col>
								<el-date-picker v-model="ruleForm_h.time" type="daterange" align="right" value-format="yyyy-MM-dd" unlink-panels range-separator="至"
								                start-placeholder="开始日期" end-placeholder="结束日期">
								</el-date-picker>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="20" style="margin-bottom: 20px;">
						<el-form-item label="起步收费:" prop="checkinStartMinute" style="display: flex;align-items: center;">
							<el-col>
								入住<el-input v-model="ruleForm_h.checkinStartMinute" style="width: 70px;margin: 0px 10px;"></el-input>分钟后收起步费,入住
								<el-input v-model="ruleForm_h.checkinStartHourhouse" style="width: 70px;margin: 0px 10px;"></el-input>分钟后收时租房全价
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="超时收费:" prop="outtimeMinute">
							<el-col :span="20">
								超过<el-input v-model="ruleForm_h.outtimeMinute" style="width: 70px; margin: 0px 10px;"></el-input>分钟后收费,
								超过<el-input v-model="ruleForm_h.outtimeAllday" style="width: 70px; margin: 0px 10px;"></el-input>分钟后转全日租
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="超时收费规则:">
							<el-radio-group v-model="ruleForm_h.outtimeRule" class="margin-l-15">
								<el-radio label="1">半日租加收</el-radio>
								<el-radio label="2">每小时加收</el-radio>
							</el-radio-group>
							<el-checkbox v-model="ruleForm_h.outtimeRuleCaps" class="margin-l-15">夹收封顶</el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="备注:">
							<el-col>
								<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm_h.remark"></el-input>
							</el-col>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-table ref="multipleTable" :data="ruleForm_h.roomStrategyJson" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="houseName" label="房型"></el-table-column>
				<el-table-column label="全价">
					<template slot-scope="scope">
						<el-row class="demo-form-inline">
							<el-input v-model="scope.row.allPrice"></el-input>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="起步价">
					<template slot-scope="scope">
						<el-row class="demo-form-inline">
							<el-input v-model="scope.row.startPrice"></el-input>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="每小时加收">
					<template slot-scope="scope">
						<el-row class="demo-form-inline">
							<el-input v-model="scope.row.hourAddPrice"></el-input>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="封顶费">
					<template slot-scope="scope">
						<el-input v-model="scope.row.topPrice"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="预收房费">
					<template slot-scope="scope">
						<el-input v-model="scope.row.advancePrice"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="备注">
					<template slot-scope="scope">
						<el-input v-model="scope.row.remark"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;" @click="saveInfo_h">保存</el-button>
				<el-button style="width: 80px;margin-left: 20px;" @click="tab_show = false">返回</el-button>
			</el-row>
		</el-row>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tab_show: true,
				tableData: [],
				ruleForm: {
					ruleName: '',
					priceModel: '', //收费模式 1固定时间退房模式  2 24小时退房模式
					state: '',
					pageIndex: 1,
					pageSize: 10,
					totalSize: 0
				},
				ruleForm_h: {
					ruleName: '',
					checkinStartMinute: '',
					checkinStartHourhouse: '',
					outtimeMinute: '',
					outtimeAllday: '',
					time: '',
					startTime: '',
					endTime: '',
					outtimeRule: '2',
					outtimeRuleCaps: true,
					remark: '',
					state: true,
					roomStrategyJson: [],
				},
				rules_h: {
					checkinStartMinute: [{required: true,message: '请输入起步收费',trigger: 'blur'}],
					outtimeMinute: [{required: true,message: '请输入超时收费',trigger: 'blur'}],
				},
				ruleForm_r: {
					memberId: '',
					pageIndex: 1,
					pageSize: 10
				},
				statelList: [{
					name: '启动',
					key: '1'
				}, {
					name: '禁用',
					key: '2'
				}]
			};
		},
		created() {
			// debugger
			this.get_hotel_rule_hour_list()
		},
		methods: {
			popup(type) {
				// debugger
				switch (type) {
					case 'add':
						this.tab_show = false;
						this.get_hotel_room_type_list()
						break
				}
			},
			// 查询
			searchBtn() {
				this.get_hotel_rule_hour_list()
			},
			// 时租房保存
			saveInfo_h() {
				let roomStrategyJson = []
				let obj = {}
				this.ruleForm_h.roomStrategyJson.forEach(item => {
					debugger
					obj = {}
					obj.roomTypeId = item.id
					obj.allPrice = item.allPrice
					obj.startPrice = item.startPrice
					obj.hourAddPrice = item.hourAddPrice
					obj.topPrice = item.topPrice
					obj.advancePrice = item.advancePrice
					obj.remark = item.remark
					roomStrategyJson.push(obj)
				})
				this.ruleForm_h.roomStrategyJson = roomStrategyJson
				let params = this.$F.deepClone(this.ruleForm_h);
				params.startTime = params.time[0];
				params.endTime = params.time[1];
				if (params.outtimeRuleCaps) {
					params.outtimeRuleCaps = 1
				} else {
					params.outtimeRuleCaps = 2
				}
				if (params.state) {
					params.state = 1
				} else {
					params.state = 2
				}
				debugger
				params.roomStrategyJson = JSON.stringify(params.roomStrategyJson);
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_hour_save', params, (res) => {
					this.$message({
					  message: '成功',
					  type: 'success'
					});
				})
			},
			deleteRow_h(item) {
				let params =  {
					id: item.id,
					status:2
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_hour_delete', params, (res) => {
					this.tableData = []
					this.get_hotel_rule_hour_list()
					this.$message({
					  message: '删除成功',
					  type: 'success'
					});
				})
			},
			stop_h(item) {
				debugger
				let params =  {
					id: item.id
				}
				if (item.state ===1) {
					params.state = 2
				} else {
					params.state = 1
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_hour_delete', params, (res) => {
					this.tableData = []
					this.get_hotel_rule_hour_list()
				})
			},
			// 获取 全部房型
			get_hotel_room_type_list() {
				let params = {
					roomType: 3,
					paging: false,
					pageIndex: 1,
					pageSize: 999
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_room_type_list', params, (res) => {
					if (res.list.length != 0) {
						res.list.forEach(item => {
							item.startPrice = ''
							item.hourAddPrice = ''
							item.topPrice = ''
							item.remark = ''
						})
						this.ruleForm_h.roomStrategyJson = res.list
					}
				})
			},
			// 获取 计费规则时租房计费列表
			get_hotel_rule_hour_list() {
				// debugger
				let params = Object.assign({}, this.ruleForm)
				params.status = 2
				let arr_list = []
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_hour_list', params, (res) => {
					if (res.list.length != 0) {
						res.list.forEach(item =>{
							if (item.status != 2) {
								this.tableData.push(item)
							}
						})
						// this.tableData = res.list
						// this.ruleForm.totalSize = res.totalSize
					}
				})
			},
			back() {
				this.tableData = [];
				 this.get_hotel_rule_hour_list()
				this.tab_show = true;
			},
			// 分页
			handleSizeChange(val) {
				this.ruleForm.pageSize = val;
				this.ruleForm.pageIndex = 1;
				this.get_hotel_rule_hour_list();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.ruleForm.pageIndex = val;
				this.get_hotel_rule_hour_list();
			}
		}
	};
</script>

<style lang="less" scoped>

	.row-width {
		width: 120px;
	}

	.padding-item {
		padding-bottom: 5px;
	}

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
</style>
