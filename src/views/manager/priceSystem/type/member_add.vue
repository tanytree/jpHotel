<template>
	<el-row>
		<el-row style="padding: 20px 0px;">
			<el-page-header @back="back_1" content></el-page-header>
		</el-row>
		<el-row :gutter="20">
			<el-form :model="batchEditPriceForm" :rules="bathEditRules" ref="ruleForm" label-width="100px">
				<el-col :span="20">
					<el-form-item label="会员类型" prop="memberTypeId">
						<el-row style="display: flex;align-items: center;">
							<el-checkbox :checked='memberChecked' style="margin-bottom: 10px;margin-right: 30px;" @change="memberCheckedChange">全选</el-checkbox>
							<el-checkbox-group v-model="batchEditPriceForm.memberTypeId">
								<el-checkbox v-for="(item, index) in memberTypeY" :label="item.id" :checked='item.checked'  :key="index">{{item.name}}</el-checkbox>
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
							<el-checkbox style="margin-bottom: 10px;margin-right: 30px;">全选</el-checkbox>
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
			<el-table-column prop="name" label="新住宿价格(一人住宿)">
				<template slot-scope="{row, $index}">
					<el-row class="demo-form-inline">
						<span>
							<el-input v-model.number="row.adjustPrice" style="width: 140px;margin: 0px 15px;"></el-input> 日元
						</span>
					</el-row>
				</template>
			</el-table-column>
			<el-table-column prop="newLivePrice" label="新价格(一人住宿+附餐费)"></el-table-column>
		</el-table>
		<el-row style="padding: 20px 0px;">
			<el-button type="primary" style="width: 80px;" @click="onSave">{{$t('commons.save')}}</el-button>
			<el-button style="width: 80px;margin-left: 20px; cursor: pointer" @click="back_1">
				{{$t('commons.back')}}</el-button>
		</el-row>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				memberChecked: false, // 会员类型全选
				memberTypeY: [], //会员类型列表
				
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
				dialogChangeA: false,
				dialogInfo_show: false, //商品入库弹框
				dialogStock_show: false, // 修改库存
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
			memberCheckedChange(e) {
				this.$emit('memberCheckedChange', e)
				// this.memberTypeY.forEach(item =>{
				// 	item.checked = true
				// 	this.$set(item, 'checked', e)
				// })
			},
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
						let arr = []
						let mer = {}
						res.memberTypeList.forEach((item, i) =>{
							mer = {}
							mer.name = item.name
							mer.id = item.id
							mer.checked = false
							arr[i] = mer
						})
						// debugger
						this.memberTypeY = arr
						
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

<style>
</style>
