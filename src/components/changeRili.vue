<template>
	<div>
		<el-row :gutter="20" v-if="tab1_show">
			<el-row style="padding: 10px 15px;">
				<el-form class="demo-form-inline" inline size="small">
					<!-- 设计图有前15天和后15天的快捷日期方式,可以利用日期组件里的改成ui图一样的设计 -->
					<el-form-item :label="$t('manager.grsl_selectTime')+':'">
						<el-date-picker v-model="search_d.strategyTime" value-format="yyyy-MM-dd" align="right" type="date" :placeholder="$t('commons.selectDate')"
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
				<el-table :data="roomType" style="width: 100%;margin-bottom: 20px;" row-key="id2" default-expand-all
				 header-row-class-name="default">
					<el-table-column :render-header="customFieldColumn" v-for="(item, index) in dateList" :key="index" :label="item.dateStr + '' + item.weekDay">
						<template slot-scope="{row, $index}">
							<span v-if="index === 0">{{row.name || row.houseName}}</span>
							<span v-if="index > 0 && row.houseName" style=" cursor: pointer !important;" @click="priceClick(row, item, index)">{{row.onePrice}}</span>
						</template>
					</el-table-column>

				</el-table>
			</div>
		</el-row>

		<!-- ===================批量调价==================================== -->
		<el-dialog top="0" title="批量调价" :visible.sync="PieDialog" :close-on-click-modal="false"
		 width="70%" class="editPriceDialog">
			
			<el-row :gutter="20">
				<el-form :model="ruleForm_Pie" :rules="rules" ref="ruleForm_Pie" label-width="100px">
					<el-col :span="20">
						<el-form-item :label="$t('manager.grsl_selectTime')+':'">
							<el-date-picker v-model="ruleForm_Pie.time" type="daterange" align="right" value-format="yyyy-MM-dd"
							 :picker-options="expireTimeOption" unlink-panels :range-separator="$t('boss.report_toText')" :start-placeholder="$t('manager.ps_startDate')"
							 :end-placeholder="$t('manager.ps_endDate')"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item :label="$t('manager.ps_selectWeek')+':'" prop="name">
							<el-checkbox-group v-model="ruleForm_Pie.weeks" @change="handleWeekDayChange">
								<el-checkbox v-for="(item, index) in weekDays" :label="item.value" :key="index">{{item.label}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-table ref="multipleTable" :data="ruleForm_Pie.roomStrategyJson" tooltip-effect="dark" default-expand-all
				 header-row-class-name="default">
				<el-table-column prop="houseName" :label="$t('manager.hp_room')"></el-table-column>
				<el-table-column prop="personNum" label="人数"></el-table-column>
				<el-table-column prop="customPrice" label="价格 (住宿价)"></el-table-column>
				
				<el-table-column prop="newCustomPrice" label="调改价" width="250">
					<template slot-scope="scope">
						<el-input v-model="scope.row.newCustomPrice"></el-input>
					</template>
				</el-table-column>
				
				<el-table-column prop="name" label="附餐">
					<template slot-scope="{row, $index}">
						<el-row class="demo-form-inline">
							<el-col>早餐 [A========]</el-col>
						</el-row>
						<el-row class="demo-form-inline">
							<el-col>晚餐 [A========]</el-col>
						</el-row>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;" @click="onSave">{{$t('commons.save')}}</el-button>
				<el-button style="width: 80px;margin-left: 20px; cursor: pointer" @click="back_1">
					{{$t('commons.back')}}</el-button>
			</el-row>
		</el-dialog>

		<!-- ===================修改单价==================================== -->
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
		props: ['ruleForm'],
		data() {
			return {
				tab1_show: true,
				search_d: {
					strategyTime: new Date().Format("yyyy-MM-dd"),
					priceCalend: '',
					timeType: 1,
					roomTypeId: ''
				},
				roomType: [],
				dateList: [],
				
				PieDialog: false,

				ruleForm_Pie: {
					time: '',
					weeks: [],
					roomStrategyJson: [],
				},
				loading: false,
				editPriceDialog: false, //修改房价dialog
				editPriceForm: {
					member: {},
					room: {},
					priceCalend: 1, // 修改定价位置  1会员日历单日定价  2单位日历单日定价  String必填
					customPrice: "",
				},
				memberTableHeads: [],
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
				dialogChangeA: false,
				dialogInfo_show: false, //商品入库弹框
				dialogStock_show: false, // 修改库存
				weekDays: [],
			};
		},



		mounted() {
			// debugger
			this.search_d.priceCalend = this.ruleForm.roomType == 1 ? '3' : '4';
			this.search_d.roomTypeId = this.ruleForm.id

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
			//选择日期change事件
			handleWeekDayChange(value) {
				// this.batchEditPriceForm.weeks = value;
				// if (value.length == 0) this.batchEditPriceForm.weeks = [];

				// if (value.length == 8 || value[value.length - 1] === "") {
				//   this.batchEditPriceForm.weeks = [];
				//   this.weekDays.forEach((week) => {
				//     this.batchEditPriceForm.weeks.push(week.value);
				//   });
				// } else {
				//   let $index = 999;
				//   this.batchEditPriceForm.weeks.forEach((week, index) => {
				//     if (week === "") {
				//       $index = index;
				//     }
				//   });
				//   if ($index != 999) {
				//     this.batchEditPriceForm.weeks.splice($index, 1);
				//   }
				// }

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
				// @param userId       登录者id String必填
				//  * @param storesNum    门店编号 String 必填
				//  * @param priceCalend  检索类型 3客房日历 4会议厅日历
				//  * @param strategyTime 时间筛选 yyyy-MM-dd格式 String必填 默认当前时间
				//  * @param timeType     时间前推后推类别 1前推15天 2后推15天 int必填
				//  * @param roomTypeId   客房或会议厅房型id  string必填
				let params = this.search_d;
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_price_guest_chamber_list",
					params,
					(res) => {

						this.roomType.push(res.roomType)
						this.roomType.forEach((value, index) =>{
							if(value.personPrice !== '' && value.personPrice !== undefined && value.personPrice !== null) {
								let arr = value.personPrice.split(',')
								let arry = arr.filter(function(el) {
									return el !== '';
								});
								
								if (value.mealBreakfastObject) {
									value.onePrice = Number(arr[0]) + Number(value.mealBreakfastObject.mealPrice)
								}
								if (value.mealDinnerObject) {
									value.onePrice = Number(arr[0]) + Number(value.mealDinnerObject.mealPrice)
								}
								if (value.mealDinnerObject && value.mealBreakfastObject) {
									value.onePrice = Number(arr[0]) + Number(value.mealBreakfastObject.mealPrice) + Number(value.mealDinnerObject.mealPrice)
								}
								
								if (!value.mealDinnerObject && !value.mealBreakfastObject) {
									value.onePrice = Number(arr[0])
								}
							}
							
						})
						this.dateList = res.dateList
						this.dateList.unshift({
							dateStr: '房型/房价',
							weekDay: "",
						});

						this.$forceUpdate();
					}
				);
			},
			popup(type, value) {
				switch (type) {
					case "adjust":
						this.PieDialog = true;
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
