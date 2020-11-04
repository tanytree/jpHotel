<template>
	<div>
		<el-row :gutter="20" v-if="tab1_show">
			<el-row>
				<el-form class="demo-form-inline" inline size="small">
					<!-- 设计图有前15天和后15天的快捷日期方式,可以利用日期组件里的改成ui图一样的设计 -->
					<el-form-item :label="$t('manager.grsl_selectTime')+':'">
						<el-date-picker v-model="ruleForm.date" value-format="yyyy-MM-dd" align="right" type="date" :placeholder="$t('commons.selectDate')"
						 :picker-options="pickerOptions" @blur="get_hotel_price_room_type_list"></el-date-picker>
					</el-form-item>
					<el-form-item class="form-inline-flex">
						<el-row>
							<el-button type="primary" @click="popup('adjust')" style="width: 100px;" size="mini">{{$t('manager.ps_bulkPrice')}}</el-button>
						</el-row>
					</el-form-item>
				</el-form>
			</el-row>
			<div class="components-edit member-price">
				<!-- <el-table :data="memberTableData.memberTypeList" style="width: 100%;margin-bottom: 20px;" row-key="id2"
				 default-expand-all header-row-class-name="default" :tree-props="{children: 'roomTypeList', hasChildren: 'hasChildren'}">
					<el-table-column width="130px" v-for="(item, index) in memberTableHeads" :key="index" :label="item.dateStr + '' + item.weekDay">
						<template slot-scope="{row, $index}">
							<span v-if="index === 0">{{row.name || row.houseName}}</span>
							<span v-if="index > 0 && row.houseName" style=" cursor: pointer !important;" @click="priceClick(row, item, index)">{{row.marketPrice}}</span>
						</template>
					</el-table-column>
				</el-table> -->
			</div>
		</el-row>

		<el-row v-if="!tab1_show">
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back_1" content></el-page-header>
			</el-row>
			<el-row :gutter="20">
				<el-form :model="batchEditPriceForm" :rules="bathEditRules" ref="ruleForm" label-width="100px">
					<el-col :span="20">
						<el-form-item label="会员类型" prop="memberTypeId">
							<el-row style="display: flex;align-items: center;">
								<el-checkbox-group v-model="batchEditPriceForm.memberTypeId" @change="handleMemberChange">
									<el-checkbox v-for="(item, index) in memberTypeY" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
								</el-checkbox-group>

							</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="渠道" prop="channel">
							<el-button plain size="mini">{{batchEditPriceForm.channel}}</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="选择时间" prop="time">
							<el-date-picker v-model="batchEditPriceForm.time" type="daterange" align="right" value-format="yyyy-MM-dd"
							 :picker-options="expireTimeOption" unlink-panels :range-separator="$t('boss.report_toText')" :start-placeholder="$t('manager.ps_startDate')"
							 :end-placeholder="$t('manager.ps_endDate')"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="选择星期">
							<el-row style="display: flex;align-items: center;">
								<el-checkbox-group v-model="batchEditPriceForm.weeks" @change="handleWeekDayChange">
									<el-checkbox v-for="(item, index) in weekDays" :label="item.value" :key="index">{{item.label}}</el-checkbox>
								</el-checkbox-group>
							</el-row>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-table ref="multipleTable" :data="batchEditPriceForm.roomStrategyJson" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="houseName" label="房型"></el-table-column>
				<el-table-column prop="marketPrice" label="门市价(一人住宿+附餐费)"></el-table-column>
				
				<!-- 这是输入的住宿价,目的是为了会员享有一定的优惠,这里只展示一人住宿价 -->
				<el-table-column prop="name" label="新住宿价格(一人住宿)"> 
					<template slot-scope="{row, $index}">
						<el-row class="demo-form-inline">
							<span>
								<el-input v-model.number="row.adjustPrice" style="width: 140px;margin: 0px 15px;"></el-input> 日元
							</span>
						</el-row>
					</template>
				</el-table-column>
				<!-- 这里是前面输入的一人住宿价+早餐+晚餐的总价,如果前面没有输入的话,先展示早餐+晚餐的价格(附餐价) -->
				<el-table-column prop="newLivePrice" label="新价格(一人住宿+附餐费)"></el-table-column>
			</el-table>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;" @click="onSave">{{$t('commons.save')}}</el-button>
				<el-button style="width: 80px;margin-left: 20px; cursor: pointer" @click="back_1">
					{{$t('commons.back')}}</el-button>
			</el-row>
		</el-row>

		<el-dialog top="0" :title="$t('manager.ps_resetRoomPrice')" :visible.sync="editPriceDialog" :close-on-click-modal="false"
		 width="30%" class="editPriceDialog">
			<el-form ref="discountForm" :model="editPriceForm" label-width="120px">
				<el-form-item :label="$t('manager.ps_nowSelect')+':'">
					<span>{{editPriceForm.member.name + ' ' + editPriceForm.room.houseName}}</span>
				</el-form-item>
				<el-form-item :label="$t('manager.ps_nowDate')">
					<span>{{editPriceForm.dateStr}}</span>
				</el-form-item>
				<el-form-item :label="$t('manager.hk_doorPrice')">
					<span>{{editPriceForm.room.marketPrice}}</span>
				</el-form-item>
				<el-form-item :label="$t('manager.ps_memberPrice')">
					<span>
						{{editPriceForm.room.discountPrice}}
						<span class="tip">({{$t('manager.ps_discountFor')}}{{editPriceForm.discount}})</span>
					</span>
				</el-form-item>
				<el-form-item :label="$t('manager.ps_newMemberPrice')">
					<el-input v-model="editPriceForm.customPrice" style="width:200px"></el-input>
					<span class="tip">{{$t('manager.ps_memberContent')}}</span>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editPriceDialog = false">{{$t('commons.cancel')}}</el-button>
				<el-button type="primary" @click="editPriceSubmit" v-loading="loading">{{$t('commons.determine')}}</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				memberChecked: false, // 会员类型全选
				checkAll: false,
				checkedMembers: [], //会员类型列表
				memberTypeY: [],
				isIndeterminate: true,
				roomTypeList: [], //全部房型

				tab1_show: true,
				value: "",
				batchEditPriceForm: {
					time: "", //开始日期跟结束日期在一起
					memberTypeId: [], //会员类型id  String必填 多个用半角","分割
					channel: "线下",
					startTime: "",
					endTime: "",
					weeks: [],
					roomStrategyJson: [{
						roomTypeId: '',
						marketPrice: '',
						adjustPrice: '',
						newLivePrice: ''
					}],
				},
				bathEditRules: {
					memberTypeId: [{
						required: true,
						message: '请选择会员类型',
						trigger: "blur",
					}],
					channel: [{
						required: true,
						message: '请选择渠道',
						trigger: "blur",
					}],
					memberTypeId: [{
						required: true,
						message: '请选择会员类型',
						trigger: "blur",
					}],
					time: [{
						required: true,
						message: '请选择时间',
						trigger: "blur",
					}],
				},
				ruleForm: {
					date: new Date().Format("yyyy-MM-dd"),
					region: "",
					date1: "",
					date2: "",
					delivery: false,
					type: [],
					resource: "",
					desc: "",
				},
				loading: false,
				editPriceDialog: false, //修改房价dialog
				editPriceForm: {
					member: {},
					room: {},
					priceCalend: 1, // 修改定价位置  1会员日历单日定价  2单位日历单日定价  String必填
					customPrice: "",
				},
				memberTableHeads: [], // 日历列表
				memberTableData: {
					memberTypeList: [],
					dateList: []
				},
				expireTimeOption: {
					disabledDate(date) {
						//disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
						return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
					},
				},
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
							text: "今天",
							onClick(picker) {
								picker.$emit("pick", new Date());
							},
						},
						{
							text: "前十五天",
							onClick(picker) {
								const date = new Date();
								date.setTime(date.getTime() - 3600 * 1000 * 24 * 15);
								picker.$emit("pick", date);
								this.get_hotel_price_room_type_list();
							},
						},
						{
							text: "后十五天",
							onClick(picker) {
								const date = new Date();
								date.setTime(date.getTime() + 3600 * 1000 * 24 * 15);
								picker.$emit("pick", date);
								this.get_hotel_price_room_type_list();
							},
						},
					],
				},
				rules: {
					name: [{
						required: true,
						// message: "请输入姓名",
						message: this.$t('commons.mustInput'),
						trigger: "blur",
					}, ],
				},
				weekDays: [],
			};
		},

		mounted() {
			this.weekDays.push({
				label: this.$t('commons.all'),
				value: ""
			});
			this.$t('commons.weeks').forEach((item, i) => {
				this.weekDays.push({
					label: item,
					value: (i + 1)
				});
			})
			this.get_hotel_price_room_type_list();
			this.get_hotel_room_type_list()
		},
		computed: {
			roomPrice: {
				get() {
					return this.$t("manager.ps_roomPrice");
				},
				set() {},
			},

			deleteSuccess: {
				get() {
					return this.$t("manager.hk_deleteSuccess");
				},
				set() {},
			},
		},
		watch: {
			roomPrice(newValue, oldValue) {
				this.roomPrice = newValue;
			},

			deleteSuccess(newValue, oldValue) {
				this.deleteSuccess = newValue;
			},
		},
		methods: {
			// 会员类型全选/反选


			//保存批量修改房价
			onSave() {
				console.log(this.batchEditPriceForm);
				let params = this.$F.deepClone(this.batchEditPriceForm);
				params.startTime = params.time[0];
				params.endTime = params.time[1];
				params.memberTypeId = params.memberTypeId.join(",");
				params.weeks.forEach((item, index) => {
					if (!item) {
						params.weeks.splice(index, 1);
					}
				});
				params.weeks = params.weeks.join(",");
				params.roomStrategyJson.forEach((item) => {
					item.adjustType = parseInt(item.adjustType);
				});
				params.roomStrategyJson = JSON.stringify(params.roomStrategyJson);
				//
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_price_member_strategy_save",
					params,
					(res) => {
						this.$message.success("Save success");
					}
				);
			},
			priceBlur(row, index) {
				if (row.adjustType == 1) {
					row.adjustPrice = (
						(row.marketPrice * (100 - row.content)) /
						100
					).toFixed(2);
				} else {
					row.adjustPrice = row.content;
				}
				// this.$set(memberTableData.memberTypeList[0].roomTypeList, index, row);
				this.$forceUpdate();
			},
			change(row) {},
			//选择会员类型复选框事件
			handleMemberChange(value) {
			
				this.batchEditPriceForm.memberTypeId = value;
				if (value.length == 0)
					this.batchEditPriceForm.memberTypeId = [];

				if (value.length == this.memberTypeY.length || value == "") {

					if (value.length == this.memberTypeY.length) {
						this.batchEditPriceForm.memberTypeId = [];
					} else {
						this.batchEditPriceForm.memberTypeId = value;
						this.memberTypeY.forEach(week => {
							this.batchEditPriceForm.memberTypeId.push(week.id);
						})
					}
				} else {
					let $index = 999;
					this.batchEditPriceForm.memberTypeId.forEach((week, index) => {
						if (week === '') {
							$index = index;
						}
					})
					if ($index != 999) {
						this.batchEditPriceForm.memberTypeId.splice($index, 1);
					}
				}
			},
			//选择周几ichange事件
			handleWeekDayChange(value) {

				this.batchEditPriceForm.weeks = value;
				if (value.length == 0)
					this.batchEditPriceForm.weeks = [];
				// console.log(value== "")
				//
				// let i = typeof(value)
				if (value.length == 8 || value == "") {
					//
					if (value.length == 8) {
						this.batchEditPriceForm.weeks = [];
					} else {
						this.batchEditPriceForm.weeks = value;
						this.weekDays.forEach(week => {
							this.batchEditPriceForm.weeks.push(week.value);
						})
					}
				} else {
					let $index = 999;
					this.batchEditPriceForm.weeks.forEach((week, index) => {
						if (week === '') {
							$index = index;
						}
					})
					if ($index != 999) {
						this.batchEditPriceForm.weeks.splice($index, 1);
					}
				}
			},
			//点击修改房价
			priceClick(row, item, index) {
				let memberTypeObject = {},
					roomObject = {},
					flag = true;
				for (let i = 0; i < this.memberTableData.memberTypeList.length; i++) {
					if (!flag) break;
					let member = this.memberTableData.memberTypeList[i];
					for (let j = 0; j < member.roomTypeList.length; j++) {
						let room = member.roomTypeList[j];
						if (room.id == row.id) {
							//
							roomObject = room;
							memberTypeObject = member;
							flag = false;
							break;
						}
					}
				}

				this.editPriceForm.member.price = row.discountPrice;
				this.editPriceForm.member.discount = row.discountPrice;
				this.editPriceForm.room = roomObject;

				var myDate = new Date();
				this.editPriceForm.dateStr = myDate.toLocaleDateString().split('/').join('-');
				//
				let array = this.memberTableData.dayPriceList.filter((item) => {
					// this.editPriceForm.dateStr = new Date().getFullYear() + "-" + item.dateStr;
					return (
						item.memberTypeId == this.editPriceForm.member.id &&
						item.roomTypeId == this.editPriceForm.room.id
					);
				});
				// this.editPriceForm.customPrice = array[0].newCustomPrice || array[0].customPrice || "";
				this.editPriceDialog = true;
			},

			editPriceSubmit() {
				// * @param priceCalend       修改定价位置  1会员日历单日定价  2单位日历单日定价  String必填
				//   * @param roomTypeId       房屋类型表id  String必填
				//   * @param memberTypeId     会员类型id  priceCalend=1必填 String选填
				//   * @param customPrice       新会员价  Double必填
				//   * @param dayTime         当前时间  yyyy-MM-dd格式 String必填
				//   * @param strategyId       单位策略规则id  priceCalend=1必填  String必填
				var params = {
					priceCalend: 1,
					roomTypeId: this.editPriceForm.room.id,
					memberTypeId: this.editPriceForm.member.id,
					customPrice: this.editPriceForm.customPrice,
					dayTime: this.editPriceForm.dateStr,
					strategyId: 1,
				};
				// ;
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_room_day_price_save",
					params,
					(res) => {
						this.editPriceDialog = false;
						this.$message.success("success");
					}
				);
			},

			// 会员 价格策略单位列表
			get_hotel_price_room_type_list() {
				let params = {
					strategyTime: this.ruleForm.date,
					priceCalend: 1, // 检索类型 1会员价格日历 2单位价格日历
					timeType: 1, // 检索类型 1会员价格日历 2单位价格日历
				};
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_price_room_type_list",
					params,
					(res) => {
						// let index = 1;
						// res.memberTypeList.forEach((memberType) => {
						// 	index += 1;
						// 	memberType.id2 = index;
						// 	memberType.roomTypeList.forEach((roomType) => {
						// 		index += 1;
						// 		roomType.id2 = index;
						// 	});
						// })
						// debugger


						// 获取会员类型列表
						this.memberTypeY = []
						this.memberTypeY.push({
							name: this.$t('commons.all'),
							id: ""
						});
						res.memberTypeList.forEach((item, i) => {
							this.memberTypeY.push({
								name: item.name,
								id: item.id
							});
						})
						console.log(this.memberTypeY)
						
						

						// this.memberTableData = res;


						// this.memberTableHeads = res.dateList; // 日历列表
						// this.memberTableHeads.unshift({
						// 	dateStr: this.roomPrice,
						// 	weekDay: "",
						// });
						// this.$forceUpdate();
					}
				);
			},
			// 获取全部房型列表
			get_hotel_room_type_list() {
				let params = {
					pageIndex:1,
					pageSize: 999,
					roomType: 3, // 1客房类型  2会议室房型 3全部
				};
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_room_type_list",
					params,
					(res) => {
						this.roomTypeList = res.list
					}
				);
			},
			popup(type, value) {
				switch (type) {
					case "adjust":
						this.tab1_show = false;
						break;
					case "detail":
						this.dialogDetail = true;
						break;
					case "changerili":
						this.tab2_show = false;
						break;
					case "add":
						this.tab1_show = false;
						break;
				}
			},
			// 单位列表-删除
			get_price_enter_strategy_delete(value) {
				let params = {
					id: value.id,
				};
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_price_enter_strategy_delete",
					params,
					(res) => {
						this.get_price_enter_strategy_list();
						this.$message({
							message: this.deleteSuccess,
							type: "success",
						});
					}
				);
			},
			back_1() {

				this.tab1_show = true;
				this.get_hotel_price_room_type_list()
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
		},
	};
</script>

<style lang="less" scoped>
	.editPriceDialog .tip {
		font-size: 12px;
		color: #b1b1b1;
	}

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

	.member-price .el-table .cell {
		cursor: pointer !important;
	}
</style>
