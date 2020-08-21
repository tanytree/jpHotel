<template>
	<div>
		<el-row v-if="tab1_show">
			<el-row :gutter="20">
				<el-row>
					<el-form class="demo-form-inline" inline size="small">
						<el-form-item label="规则名称:">
							<el-input v-model="ruleForm.ruleName" class="row-width"></el-input>
						</el-form-item>
						<el-form-item label="计费模式:" class="margin-l-15">
							<el-select v-model="ruleForm.priceModel" style="width: 120px">
								<el-option :label="value.name" :value="value.key" v-for="(value, index) in priceModelList" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="状态:" class="margin-l-15">
							<el-select v-model="ruleForm.state" style="width: 120px">
								<el-option :label="value.name" :value="value.key" v-for="(value, index) in statelList" :key="index"></el-option>
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
						<el-table-column prop="priceModel" label="计费模式"></el-table-column>
						<el-table-column  label="规则详情" width="500">
							<template slot-scope="{row}">
								<span>
								{{row.priceModel==1 ? '固定时间退房模式':'24小时退房模式'}}
								入住{{row.checkinStartMinute}}分钟后收起步费,入住{{row.checkinStartHourhouse}}分钟后收全日租
								次日{{row.checkoutTime}}超过{{row.outtimeMinute}}分钟后收费,{{row.outtimeRule==1 ? '半日租加收':'按每小时加收'}}{{row.outtimeAllday==true?'加收封顶' : ''}}
								超过{{row.outtimeAllday}}分钟后收全日租
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="time" label="状态">
							<template slot-scope="{row}">
								<span>{{row.state ? '启用':'禁用'}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="remark" label="备注"></el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="popup('change', scope.row)">修改</el-button>
								<el-button type="text" size="small" @click="stop_d(scope.row)">{{scope.row.state==1? '禁用':'启用'}}</el-button>
								<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteRow_d(scope.row)">
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
		<!-- 全天房添加 -->
		<el-row v-if="!tab1_show">
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back_1" content=""></el-page-header>
			</el-row>
			<el-row :gutter="20">
				<el-form :model="allForm" :rules="rules" ref="allForm" label-width="100px">
					<el-col :span="20">
						<el-form-item label="计费类型:">
							<el-radio-group v-model="allForm.priceModel">
								<el-radio :label="1">固定时间退房模式</el-radio>
								<el-radio :label="2">24小时退房模式</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="规则名称:" prop="ruleName">
							<el-input v-model="allForm.ruleName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="起步收费:" prop="checkinStartMinute">
							<el-col>
								入住<el-input v-model="allForm.checkinStartMinute" style="width: 70px;margin: 0px 10px;"></el-input>分钟后收起步费,入住
								<el-input v-model="allForm.checkinStartHourhouse" style="width: 70px;margin: 0px 10px;"></el-input>分钟后收全日租
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="退房时间:" prop="name">
							<el-row style="display: flex;align-items: center;">
								<el-col span="1">次日</el-col>
								<el-time-select v-model="allForm.checkoutTime" :picker-options="{
								    start: '08:30',
								    step: '00:15',
								    end: '18:30'
								  }"
								 placeholder="选择时间">
								</el-time-select>
							</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="超时收费:" prop="name">
							<el-col :span="20">
								超过<el-input v-model="allForm.outtimeMinute" style="width: 70px; margin: 0px 10px;"></el-input>分钟后收费,
								按 <el-radio-group v-model="allForm.outtimeRule" class="margin-l-15">
									<el-radio :label="1">半日租加收</el-radio>
									<el-radio :label="2">每小时加收</el-radio>
								</el-radio-group>
								<el-checkbox v-model="allForm.outtimeRuleCaps" class="margin-l-15">夹收封顶</el-checkbox>
							</el-col>
							<el-col :span="20">
								超过<el-input v-model="allForm.outtimeAllday" style="width: 70px;margin: 0px 10px;"></el-input>分钟后收全日租
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="备注:">
							<el-col>
								<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="allForm.remark"></el-input>
							</el-col>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-table ref="multipleTable" :data="allForm.roomStrategyJson" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="houseName" label="房型"></el-table-column>
				<el-table-column prop="name" label="起步价">
					<template slot-scope="{row, $index}">
						<el-row class="demo-form-inline">
							<el-input v-model="row.startPrice"></el-input>
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
				<el-table-column prop="name" label="备注">
					<template slot-scope="scope">
						<el-input v-model="scope.row.remark"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;" @click="saveInfo_d">保存</el-button>
				<el-button style="width: 80px;margin-left: 20px;" @click="back_1">返回</el-button>
			</el-row>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tab1_show: true,
				tableData: [],
				allForm: {
					priceModel: 1,
					ruleName: '',
					checkinStartMinute: '',
					checkinStartHourhouse: '',
					checkoutTime: '',
					outtimeMinute: '',
					outtimeAllday: '',
					outtimeRule: 2,
					outtimeRuleCaps: true,
					remark: '',
					roomStrategyJson: [],
					state: 1
				},
				ruleForm: {
					ruleName: '',
					priceModel: '',
					state: '',
					pageIndex: 1,
					pageSize: 10,
					totalSize: 0
				},
				rules: {
					ruleName: [{required: true,message: '请输入规格名称',trigger: 'blur'}],
					checkinStartMinute: [{required: true,message: '请输入起步收费',trigger: 'blur'}],
					checkoutTime: [{required: true,message: '请选择退房时间',trigger: 'blur'}],
					outtimeMinute: [{required: true,message: '请输入超时收费:',trigger: 'blur'}],
				},
				dialogsit: false,
				priceModelList: [{
					name: '固定时间退房模式',
					key: '1'
				}, {
					name: '24小时退房模式',
					key: '2'
				}],
				statelList: [{
					name: '启动',
					key: '1'
				}, {
					name: '禁用',
					key: '2'
				}]
			};
		},
		watch: {
		},
		created() {
			this.get_hotel_rule_allday_list()
		},
		methods: {
			popup(type, value) {
				// debugger
				switch (type) {
					case 'add':
						this.tab1_show = false;
						this.allForm.id = null
						this.get_hotel_room_type_list()
						break
					case 'change':
					debugger
						this.tab1_show = false;
						this.allForm = value;
						if (this.allForm.outtimeRuleCaps == 1) {
							this.allForm.outtimeRuleCaps = true
						} else {
							this.allForm.outtimeRuleCaps = false
						}
						this.allForm.roomStrategyJson = value.hotelRuleRoomTypeList
						break
				}
			},
			// 查询
			searchBtn() {
				this.tableData = []
				this.get_hotel_rule_allday_list()
			},
			// 全天房保存
			saveInfo_d() {
				let roomStrategyJson = []
				let obj = {}
				debugger
				this.allForm.roomStrategyJson.forEach(item => {
					obj = {}
					obj.houseName = item.houseName
					obj.roomTypeId = item.id
					obj.startPrice = item.startPrice
					obj.hourAddPrice = item.hourAddPrice
					obj.topPrice = item.topPrice
					obj.remark = item.remark
					roomStrategyJson.push(obj)
				})
				this.allForm.hotelRuleRoomTypeList = null
				this.allForm.roomStrategyJson = roomStrategyJson
				let params = this.$F.deepClone(this.allForm);
				if (params.outtimeRuleCaps) {
					params.outtimeRuleCaps = 1
				} else {
					params.outtimeRuleCaps = 2
				}
				params.roomStrategyJson = JSON.stringify(params.roomStrategyJson);
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_allday_save', params, (res) => {
					this.$message({
					  message: '成功',
					  type: 'success'
					});
				})
			},
			deleteRow_d(item) {
				let params =  {
					id: item.id,
					status:2
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_allday_delete', params, (res) => {
					this.tableData = []
					this.get_hotel_rule_allday_list()
					this.$message({
					  message: '删除成功',
					  type: 'success'
					});
				})
			},
			stop_d(item) {
				debugger
				let params =  {
					id: item.id
				}
				if (item.state ===1) {
					params.state = 2
				} else {
					params.state = 1
				}
				debugger
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_allday_delete', params, (res) => {
					this.tableData = []
					this.get_hotel_rule_allday_list()
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
						debugger
						this.allForm.roomStrategyJson = res.list
					}
				})
			},
			// 获取 计费规则全天房计费列表
			get_hotel_rule_allday_list() {
				let params = Object.assign({}, this.ruleForm)
				// params.status = 2
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_allday_list', params, (res) => {
					if (res.list.length != 0) {
						res.list.forEach(item =>{
							if (item.status != 2) {
								this.tableData.push(item)
							}
						})
						// this.ruleForm.totalSize = res.totalSize
					}
				})
			},
			back_1() {
				this.tab1_show = true;
				this.tableData = []
				this.get_hotel_rule_allday_list()
			},
			// 分页
			handleSizeChange(val) {
				this.ruleForm.pageSize = val;
				this.ruleForm.pageIndex = 1;
				this.get_hotel_rule_allday_list();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.ruleForm.pageIndex = val;
				this.get_hotel_rule_allday_list();
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
