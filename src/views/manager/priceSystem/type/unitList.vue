<template>
	<div>
		<el-row :gutter="20" v-if="tab1_show && rili_show == false">
			<el-row>
				<el-form class="demo-form-inline" inline size="small">
					<el-form-item :label="$t('manager.ps_ruleName')+':'">
						<el-input v-model="searchForm.ruleName" class="row-width"></el-input>
					</el-form-item>
					<el-form-item :label="$t('boss.loginDetail_state')+':'" class="margin-l-15">
						<el-select v-model="searchForm.state" :placeholder="$t('boss.compensation_selectState')" class="row-width">
							<el-option :label="$t('commons.enable')" value="1"></el-option>
							<el-option :label="$t('commons.disable')" value="2"></el-option>
							<el-option :label="$t('commons.all')" value=""></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" style="width: 100px;" size="mini" @click="search">{{$t('commons.queryBtn')}}</el-button>
					</el-form-item>
					<el-form-item class="form-inline-flex">
						<el-row class="form-inline-flex">
							<el-button type="primary" @click="popup('add')" style="width: 100px;" size="mini">{{$t('commons.newAdd')}}</el-button>
						</el-row>
					</el-form-item>
				</el-form>
			</el-row>
			<div class="components-edit">
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
					<el-table-column prop="ruleName" :label="$t('manager.ps_ruleName')"></el-table-column>
					<el-table-column :label="$t('boss.loginDetail_state')">
						<template slot-scope="{row}">
							<span>{{row.state == '1' ? $t('commons.enable'):$t('commons.disable')}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="ruleName" :label="$t('boss.loginDetail_note')"></el-table-column>
					<el-table-column :label="$t('commons.operating')" width="350">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="popup('see', scope.row)">{{$t("boss.compensation_toView")}}</el-button>
							<el-button type="text" size="small" @click="popup('change', scope.row)">{{$t('commons.modify')}}</el-button>
							<el-popconfirm :title="$t('manager.hp_bulletTitle')" @confirm="get_price_enter_strategy_delete(scope.row)">
								<el-button slot="reference" type="text" size="small">{{$t('commons.delete')}}</el-button>
							</el-popconfirm>
							<el-button type="text" size="small" @click="popup('changerili', scope.row)">{{$t('manager.ps_modifyCalendar')}}</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-row>

		<el-row v-if="!tab1_show">
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back_1" content></el-page-header>
			</el-row>
			<el-row :gutter="20">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
					<el-row>
						<el-col :span="5">
							<el-form-item :label="$t('manager.ps_ruleName')+':'" prop="ruleName" style="display: flex;align-items: center;">
								<el-input v-model="ruleForm.ruleName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item :label="$t('boss.loginDetail_state')+':'">
								<el-radio-group v-model="ruleForm.state">
									<el-radio :label="1">{{$t('commons.enable')}}</el-radio>
									<el-radio :label="0">{{$t('commons.disable')}}</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-col :span="20">
						<el-form-item :label="$t('manager.grsl_selectTime')+':'" prop="time">
							<el-date-picker v-model="ruleForm.time" type="datetimerange" range-separator="至" start-placeholder="开始日期"
							 end-placeholder="结束日期" @change="changeTime" :picker-options="expireTimeOption" value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item :label="$t('manager.ps_selectWeek')+':'" prop="name">
							<el-checkbox-group v-model="ruleForm.weeks" @change="handleWeekDayChange">
								<el-checkbox v-for="(item, index) in weekDays" :label="item.value" :key="index">{{item.label}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-table ref="multipleTable" :data="roomStrategyJson" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="houseName" :label="$t('manager.hp_room')"></el-table-column>
				<el-table-column prop="marketPrice" label="门市价(一人住宿价+附餐价)">
					<template slot-scope="scope">
						<div>
							<div style="padding: 10px 0px;">{{scope.row.marketPrice}}</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="新价格(一人住宿价+附餐价)" width="400">
					<template slot-scope="scope">
						<div>
							<div style="padding: 10px 0px;display: flex;align-items: center;">
								<el-input v-model="scope.row.adjustPrice" placeholder="请输入新价格" style="width: 200px;"></el-input>
								<span style="padding-left: 20px;">日元</span>
							</div>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;" @click="onSave">{{$t('commons.save')}}</el-button>
				<el-button style="width: 80px;margin-left: 20px; cursor: pointer" @click="back_1">{{$t('commons.back')}}</el-button>
			</el-row>
		</el-row>
		<!-- 查看 -->
		<el-dialog top="0" title="查看" :visible.sync="dialogDetail" :close-on-click-modal="false">
			<el-row style="line-height: 30px;">
				<el-row>
					<el-col :span="4" style="color: #898B8E;">规则名称:</el-col>
					<el-col :span="14">{{detail_info.ruleName}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="4" style="color: #898B8E;">{{ $t('boss.loginDetail_state') }}:</el-col>
					<el-col :span="14">{{detail_info.state==1? '启用':'禁用'}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="4" style="color: #898B8E;">时间:</el-col>
					<el-col :span="14">{{detail_info.startTime}}至{{detail_info.endTime}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="4" style="color: #898B8E;">星期:</el-col>
					<el-col :span="14">
						<span v-for="(value,index) in detail_info.weeks">{{value}},</span>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="4" style="color: #898B8E;">折扣率:</el-col>
					<el-col :span="14">{{detail_info.discounts_name}}</el-col>
				</el-row>
			</el-row>
			<el-table ref="multipleTable" :data="detail_info.hotelPriceRoomTypeList" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="houseName" :label="$t('desk.home_roomType')"></el-table-column>
				<el-table-column prop="marketPrice" :label="$t('manager.hk_doorPrice')"></el-table-column>
				<el-table-column prop="job_status" label="调价方式">
					<template slot-scope="{row}">
						<span>{{row.adjustType==1 ? '折扣率':'一口价'}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="adjustPrice" label="调价后"></el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogDetail = false">关 闭</el-button>
			</span>
		</el-dialog>


		<el-row v-if="rili_show">
			<div class="back">
				<el-page-header @back="backTop"></el-page-header>
			</div>
			<el-row>
				<unitListRili :selectInfo="selectInfo"></unitListRili>
			</el-row>
		</el-row>
	</div>
</template>

<script>
	import unitListRili from "./unitListRili.vue"
	export default {
		components: {
			unitListRili
		},
		data() {
			return {
				rili_show: false,
				tab1_show: true,
				searchForm: { // 搜索列表参数
					ruleName: '',
					state: '',
					status: 1
				},
				tableData: [],
				checkAll: false,
				isIndeterminate: true,
				ruleForm: {
					ruleName: '',
					time: [],
					startTime: '',
					endTime: '',
					weeks: '',
					discounts: '1',
					state: 1,
					roomStrategyJson: []
				},
				rules: {
					ruleName: [{
						required: true,
						// message: '请输入规格名称',
						message: this.$t('commons.mustInput'),
						trigger: 'blur'
					}],
					time: [{
						required: true,
						message: '请选择时间',
						trigger: 'blur'
					}]
				},
				roomStrategyJson: [],
				weekDays: [],
				dialogDetail: false,
				detail_info: {
					ruleName: '',
					time: '',
					startTime: '',
					endTime: '',
					weeks: [],
					discounts: 1,
					state: 1,
					roomStrategyJson: []
				},
				expireTimeOption: {
					disabledDate(date) {
						//disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
						return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
					},
				},

				type: '',
				selectInfo: {}
			}
		},
		mounted() {
			// this.weekDays.push({
			// 	label: this.$t('commons.checkAll'),
			// 	value: ""
			// });
			this.$t('commons.weeks').forEach((item, i) => {
				this.weekDays.push({
					label: item,
					value: JSON.stringify(i + 1)
				});
			})
			this.tableData = []
			this.ruleForm.roomStrategyJson = []
			this.get_price_enter_strategy_list();
		},

		methods: {
			search() {
				this.tableData = []
				this.get_price_enter_strategy_list();
			},
			//单位-增加-修改
			onSave() {
				console.log(this.ruleForm);

				let params = {};
				params.ruleName = this.ruleForm.ruleName;
				params.state = this.ruleForm.state;
				params.startTime = this.ruleForm.time[0];
				params.endTime = this.ruleForm.time[1];
				params.weeks = this.ruleForm.weeks.join(',');
				this.roomStrategyJson.forEach((value) => {
					if (value.marketPrice == null) {
						value.marketPrice = ''
					}
					if (value.adjustPrice == null) {
						value.adjustPrice = ''
					}
				})
				params.roomStrategyJson = JSON.stringify(this.roomStrategyJson);

				this.$F.doRequest(this, '/pms/hotel/hotel_price_enter_strategy_save', params, (res) => {
					return this.$message({
						message: this.$t('commons.request_success'),
						type: 'success'
					});
				})
			},
			priceBlur(row, index) {
				if (row.adjustType == 1) {
					row.adjustPrice = ((row.marketPrice * (100 - row.content)) / 100).toFixed(2);
				} else {
					row.adjustPrice = row.content;
				}
				// this.$set(memberTableData.memberTypeList[0].roomTypeList, index, row);
				this.$forceUpdate()
			},
			change(row) {},
			//选择日期change事件
			handleWeekDayChange(value) {
				this.ruleForm.weeks = value;
				if (value.length == 0)
					this.ruleForm.weeks = [];

				if (value.length == 8 || value == "") {
					//
					if (value.length == 8) {
						this.ruleForm.weeks = [];
					} else {
						this.ruleForm.weeks = value;
						this.weekDays.forEach(week => {
							this.ruleForm.weeks.push(week.value);
						})
					}
				} else {
					let $index = 999;
					this.ruleForm.weeks.forEach((week, index) => {
						if (week === '') {
							$index = index;
						}
					})
					if ($index != 999) {
						this.ruleForm.weeks.splice($index, 1);
					}
				}
			},
			popup(type, value) {
				this.type = type;
				switch (type) {
					case 'add':
						this.tab1_show = false;
						this.get_hotel_price_room_type_list()
						break
					case 'see':
						this.dialogDetail = true;
						this.hotel_price_enter_strategy_detail(value)
						break
					case 'change':
						this.tab1_show = false;
						this.ruleForm.roomStrategyJson = []
						this.hotel_price_enter_strategy_detail(value)
						break
					case 'changerili':
						this.selectInfo = value;

						this.tab1_show = true
						this.rili_show = true
						break
				}
			},
			// 单位--房型
			get_hotel_price_room_type_list() {
				//
				let params = {
					pageIndex: 1,
					pageSize: 99,
					totalSize: 0,
					roomType: 3, // 房屋类型  1客房类型  2会议室房型 3全部
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_room_type_list', params, (res) => {
					res.list.forEach(item => {
						this.roomStrategyJson.push({
							roomTypeId: item.id,
							marketPrice: item.marketPrice,
							houseName: item.houseName,
							adjustPrice: ''
						})
					})
					console.log(this.roomStrategyJson)

					this.$forceUpdate();
				})
			},
			// 单位列表-查看-修改详情
			hotel_price_enter_strategy_detail(value) {
				let params = {
					id: value.id
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_price_enter_strategy_detail', params, (res) => {

					if (this.type == 'see') {
						this.detail_info = res;
						this.detail_info.weeks = res.weeks.split(',')
					} else {
						this.ruleForm = res
						let time_arr = []
						time_arr.push(res.startTime)
						time_arr.push(res.endTime)
						this.ruleForm.time = time_arr
						this.ruleForm.weeks = res.weeks.split(',')
						res.hotelPriceRoomTypeList.forEach((value, index) =>{
							value.adjustPrice = value.newLivePrice
						})
						this.roomStrategyJson = res.hotelPriceRoomTypeList

						console.log('this.ruleForm---', this.ruleForm)

					}

				})
			},
			// 单位列表-删除
			get_price_enter_strategy_delete(value) {
				let params = {
					id: value.id
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_price_enter_strategy_delete', params, (res) => {
					this.get_price_enter_strategy_list()
					this.$message({
						message: this.$t('commons.delete_success'),
						type: 'success'
					});
				})
			},
			// 获取 价格策略单位列表
			get_price_enter_strategy_list() {
				let params = this.searchForm
				this.$F.doRequest(this, '/pms/hotel/hotel_price_enter_strategy_list', params, (res) => {
					if (res.length != 0) {
						this.tableData = res
					}
				})
			},
			back_1() {
				this.get_price_enter_strategy_list()
				this.ruleForm.ruleName = ''
				this.ruleForm.time = ''
				this.ruleForm.startTime = ''
				this.ruleForm.endTime = ''
				this.ruleForm.weeks = []
				this.ruleForm.discounts = '1'
				this.ruleForm.state = 1
				this.roomStrategyJson = []

				this.detail_info.ruleName = ''
				this.detail_info.time = ''
				this.detail_info.startTime = ''
				this.detail_info.endTime = ''
				this.detail_info.weeks = []
				this.detail_info.discounts = '1'
				this.detail_info.state = 1
				this.detail_info.roomStrategyJson = []
				this.tab1_show = true;
			},
			backTop() {
				this.rili_show = false
				this.tab1_show = true
				this.tableData = []

				this.get_price_enter_strategy_list();
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	};
</script>
