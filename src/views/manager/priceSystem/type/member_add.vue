<template>
	<el-row>
		<el-row style="padding: 20px 0px;">
			<el-page-header @back="back_1" content></el-page-header>
		</el-row>
		<el-row :gutter="20">
			<el-form :model="batchEditPriceForm" :rules="bathEditRules" ref="ruleForm" label-width="100px">
				<el-col :span="20">
					<el-form-item :label="$t('desk.customer_memType')" prop="memberTypeId">
						<el-row style="display: flex;align-items: center;">
							<el-checkbox :checked='memberChecked' style="margin-bottom: 10px;margin-right: 30px;" @change="memberCheckedChange">{{$t('desk.home_allSelected')}}</el-checkbox>
							<el-checkbox-group v-model="batchEditPriceForm.memberTypeId">
								<el-checkbox v-for="(item, index) in memberTypeY" :label="item.id" :checked='item.checked'  :key="index">{{item.name}}</el-checkbox>
							</el-checkbox-group>
						</el-row>
					</el-form-item>
				</el-col>
				<el-col :span="20">
					<el-form-item :label="$t('desk.home_channel')" prop="channel">
						<el-button plain size="mini">{{batchEditPriceForm.channel}}</el-button>
					</el-form-item>
				</el-col>
				<el-col :span="20">
					<el-form-item :label="$t('manager.grsl_selectTime')" prop="time">
						<el-date-picker v-model="batchEditPriceForm.time" type="daterange" align="right" value-format="yyyy-MM-dd"
						 :picker-options="expireTimeOption" unlink-panels :range-separator="$t('boss.report_toText')" :start-placeholder="$t('manager.ps_startDate')"
						 :end-placeholder="$t('manager.ps_endDate')"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="20">
					<el-form-item :label="$t('manager.ps_selectWeek')">
						<el-row style="display: flex;align-items: center;">
							<el-checkbox style="margin-bottom: 10px;margin-right: 30px;">{{$t('desk.home_allSelected')}}</el-checkbox>
							<el-checkbox-group v-model="batchEditPriceForm.weeks" @change="handleWeekDayChange">
								<el-checkbox v-for="(item, index) in weekDays" :label="item.value" :key="index">{{item.label}}</el-checkbox>
							</el-checkbox-group>
						</el-row>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>
		<el-table ref="multipleTable" :data="batchEditPriceForm.roomStrategyJson" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
			<el-table-column prop="houseName" :label="$t('desk.home_roomType')" ></el-table-column>
			<el-table-column prop="marketPrice" :label="$t('manager.grsl_doorPri')"></el-table-column>
			<el-table-column prop="name" :label="$t('manager.grsl_newLivePri')">
				<template slot-scope="{row, $index}">
					<el-row class="demo-form-inline">
						<span>
							<el-input v-model.number="row.adjustPrice" style="width: 140px;margin: 0px 15px;"></el-input> {{$t('manager.ps_japanYen')}}
						</span>
					</el-row>
				</template>
			</el-table-column>
			<el-table-column prop="newLivePrice" :label="$t('manager.grsl_newPrice')"></el-table-column>
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
				// batchEditPriceForm: {
				// 	time: "", //开始日期跟结束日期在一起
				// 	memberTypeId: [], //会员类型id  String必填 多个用半角","分割
				// 	channel: "线下",
				// 	startTime: "",
				// 	endTime: "",
				// 	weeks: [],
				// 	roomStrategyJson: [{
				// 		roomTypeId: '',
				// 		marketPrice: '',
				// 		adjustPrice: '',
				// 		newLivePrice: ''
				// 	}],
				// },
				bathEditRules: {
					memberTypeId: [{
						required: true,
						message: this.$t('desk.customer_chooseMemType'),
						trigger: "blur",
					}],
					memberTypeId: [{
						required: true,
						message: this.$t('desk.customer_chooseMemType'),
						trigger: "blur",
					}],
					time: [{
						required: true,
						message: this.$t('manager.add_chooseTime'),
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
						// return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
					},
				},
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
				
				},
				dialogChangeA: false,
				dialogInfo_show: false, //商品入库弹框
				dialogStock_show: false, // 修改库存
				weekDays: [],
			};
		},
		computed: {
	    rules(){
        return {
					name: [{
						required: true,
						// message: "请输入姓名",
						message: this.$t('commons.mustInput'),
						trigger: "blur",
					}, ],
				}
      },
      batchEditPriceForm(){
        return  {
					time: "", //开始日期跟结束日期在一起
					memberTypeId: [], //会员类型id  String必填 多个用半角","分割
					channel:this.$t('desk.customer_offline'),
					startTime: "",
					endTime: "",
					weeks: [],
					roomStrategyJson: [{
						roomTypeId: '',
						marketPrice: '',
						adjustPrice: '',
						newLivePrice: ''
					}],
				}
      }
	
		
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
		methods: { 
			// 前15天
			beforeTap() {
				console.log(this.ruleForm.date)
				let time = this.getBeforeDate(15, this.ruleForm.date)
				this.ruleForm.date = time;
				this.get_hotel_price_room_type_list()
			},
			// 后15天
			afterTap() {
				console.log(this.ruleForm.date)
				let time = this.getBeforeDate(-15, this.ruleForm.date)
				this.ruleForm.date = time;
				this.get_hotel_price_room_type_list()
			},
			// 获取当前日期前后多少天的日期，之前多少天传正数，后面多少天传负数，今天传0，
			//  num为传入的数字， time为传入的指定日期，如果time不传，则默认为当前时间
			getBeforeDate(num, time) {
				// debugger
				let n = num;
				let d = '';
				if (time) {
					d = new Date(time);
				} else {
					d = new Date();
				}
				let year = d.getFullYear();
				let mon = d.getMonth() + 1;
				let day = d.getDate();
				if (day <= n) {
					if (mon > 1) {
						mon = mon - 1;
					} else {
						year = year - 1;
						mon = 12;
					}
				}
				d.setDate(d.getDate() - n);
				year = d.getFullYear();
				mon = d.getMonth() + 1;
				day = d.getDate();
				let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
				return s;
			},
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
						// 
						
						
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
						// 
						this.memberTypeY = arr
			
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
							message: this.$t("manager.hk_deleteSuccess"),
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
