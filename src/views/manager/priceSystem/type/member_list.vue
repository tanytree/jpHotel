<template>
	<div>
		<el-row :gutter="20" v-if="tab1_show">
			<el-row>
				<el-form class="demo-form-inline" inline size="small">
					<el-form-item :label="$t('manager.grsl_selectTime')+':'">
						<el-date-picker v-model="ruleForm.date" value-format="yyyy-MM-dd" align="right" type="date" :placeholder="$t('commons.selectDate')"
						 :picker-options="pickerOptions" @blur="get_hotel_price_room_type_list"></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-col>
							<el-button type="text" @click="beforeTap" style="margin-left: 20px;">
								&lt;&lt; {{$t('manager.add_lsat15')}}</el-button>
						</el-col>
					</el-form-item>
					<el-form-item>
						<el-col>
							<el-button type="text" @click="afterTap">{{$t('manager.add_next15')}} &gt;&gt;</el-button>
						</el-col>
					</el-form-item>
					<el-form-item class="form-inline-flex">
						<el-row style="margin-right: -10px;">
							<el-button type="primary" @click="popup('adjust')" style="width: 100px;" size="mini">{{$t('manager.ps_bulkPrice')}}</el-button>
						</el-row>
					</el-form-item>
				</el-form>
			</el-row>
			<div class="components-edit member-price" v-loading="loading">
				<el-table :data="memberTypeList" style="width: 100%;margin-bottom: 20px;" row-key="id2" :default-expand-all="false"
				 header-row-class-name="default" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" border>
					<el-table-column v-for="(item, index) in dateList" :key="index" :label="item.dateStr + '' + item.weekDay" :width="index== 0? '160': ''">
						<template slot-scope="scope">
							<div v-if="index == 0">
								<span>{{scope.row.name || scope.row.houseName}}</span>
							</div>
							<div v-if="index > 0">
								<span @click="changePopup(scope.row, scope.$index, item, index)">
									{{getDateP(scope.row, scope.$index, item, index)}}
								</span>
							</div>
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
				<el-form :model="batchEditPriceForm" :rules="bathEditRules" ref="ruleForm" label-width="100px">
					<el-col :span="20">
						<el-form-item :label="$t('desk.customer_memType')" prop="memberTypeId">
							<el-row style="display: flex;align-items: center;">
								<el-checkbox-group v-model="batchEditPriceForm.memberTypeId" @change="handleMemberChange">
									<el-checkbox v-for="(item) in selectedRoomtype" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
								</el-checkbox-group>
							</el-row>
						</el-form-item>
					</el-col>
					<!-- <el-col :span="20">
						<el-form-item :label="$t('desk.home_channel')" prop="channel">
							<el-button type="primary" plain size="mini">{{batchEditPriceForm.channel}}</el-button>
						</el-form-item>
					</el-col> -->
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
								<el-checkbox-group v-model="batchEditPriceForm.weeks" @change="handleWeekDayChange">
									<el-checkbox v-for="(item, index) in weekDays" :label="item.value" :key="index">{{item.label}}</el-checkbox>
								</el-checkbox-group>
							</el-row>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-table ref="multipleTable" :data="allRoomTypeList" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="houseName" :label="$t('desk.home_roomType')"></el-table-column>
				<el-table-column :label="$t('manager.grsl_doorPri')">
					<template slot-scope="{row}">
						<el-row class="demo-form-inline" v-if="row.roomType == 1">
							<span>
								<el-col>{{row.oldOnePrice}}</el-col>
							</span>
						</el-row>
						<el-row class="demo-form-inline" v-else>
							<span>
								<el-col>{{row.oldMarketPrice}}</el-col>
							</span>
						</el-row>
					</template>
				</el-table-column>

				<!-- 这是输入的住宿价,目的是为了会员享有一定的优惠,这里只展示一人住宿价 -->
				<el-table-column prop="name" :label="$t('manager.grsl_newLivePriA')">
					<template slot-scope="{row}">
						<el-row class="demo-form-inline" v-if="row.roomType == 1">
							<span>
								<el-input v-model.number="row.newLivePrice" style="width: 140px;margin: 0px 15px;"></el-input>
								{{$t('manager.ps_japanYen')}}
							</span>
						</el-row>
						<el-row class="demo-form-inline" v-else>
							<span>
								<el-input v-model.number="row.newMarketPrice" style="width: 140px;margin: 0px 15px;"></el-input>
								{{$t('manager.ps_japanYen')}}
							</span>
						</el-row>
					</template>
				</el-table-column>
				<!-- 这里是前面输入的一人住宿价+早餐+晚餐的总价,如果前面没有输入的话,先展示早餐+晚餐的价格(附餐价) -->
				<el-table-column prop="adjustPrice" :label="$t('manager.grsl_resetSoon')"></el-table-column>
			</el-table>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;" @click="onSave">{{$t('commons.save')}}</el-button>
				<el-button style="width: 80px;margin-left: 20px; cursor: pointer" @click="back_1">
					{{$t('commons.back')}}</el-button>
			</el-row>
		</el-row>

		<!-- ===================修改单价==================================== -->
		<el-dialog top="0" :title="$t('manager.ps_resetRoomPrice')" :visible.sync="editPriceDialog" :close-on-click-modal="false"
		 width="80%" class="editPriceDialog">
			<el-row :gutter="20" style="margin-bottom: 20px;">
				<el-col :span="3">{{$t('manager.add_nowTime')}}: </el-col>
				<el-col :span="16">{{editPriceForm.dayTime}}</el-col>
			</el-row>
			<el-table ref="multipleTable" :data="ruleForm_Pie" tooltip-effect="dark" default-expand-all header-row-class-name="default">
				<el-table-column prop="houseName" :label="$t('manager.hp_room')"></el-table-column>
				<el-table-column prop="personNum" :label="$t('manager.add_onePrice')" v-if="ruleForm.roomType == 1">
					<template >
						<div>
							<div style="padding: 10px 0px;">
								<span>{{roomStrategyJson_p[0].customPrice}}</span>
							</div>
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="newCustomPrice" :label="$t('manager.grsl_newLivePriA')" width="250">
					<template>
						<div style="padding: 10px 0px;">
							<el-input v-model="newCustomPrice" placeholder="请输入" @input="onInput()"></el-input>
							<!-- <el-input v-model="star_time" placeholder="请输入"></el-input> -->
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="name" :label="$t('desk.attachedMeal')" v-if="ruleForm.roomType == 1">
					<template slot-scope="scope">
						<el-row v-if="ruleForm.roomType==1">
							<el-row class="demo-form-inline">
								<el-col>{{$t('manager.hk_breakfast')}} [{{scope.row.mealBreakfastObject.mealName}} :
									{{scope.row.mealBreakfastObject && scope.row.mealBreakfastObject.mealPrice}}]</el-col>
							</el-row>
							<el-row class="demo-form-inline">
								<el-col>{{$t('manager.hk_dinner')}} [{{scope.row.mealDinnerObject.mealName}} :
									{{scope.row.mealDinnerObject && scope.row.mealDinnerObject.mealPrice}}]</el-col>
							</el-row>
						</el-row>
					</template>
				</el-table-column>
			</el-table>
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
				memberTypeLength: 0,
				rowStyle: {
					display: 'flex',
					// flex:'1'
				},
				star_time: '', // 列表查询的开始时间
				sel_roomTypeId: '',
				sel_memberTypeId: '', // 选中的第三级会员id
				dateList: [],
				dayPriceList: [],
				memberTypeList: [],
				memberChecked: false, // 会员类型全选
				checkAll: false,
				checkedMembers: [], //会员类型列表
				memberTypeY: [],
				roomTypeList: [], //全部房型
				selectedRoomtype: [], // 批量调价中的会员类型
				allRoomTypeList: [], //全部房型(包括会议厅类型)
				ruleForm_Pie: [], // 单独修改价格的tabble
				roomStrategyJson_p: [],
				newCustomPrice: '',
				all: [],
				isIndeterminate: true,

				tab1_show: true,
				value: "",
				checkbox_value_pie: '', // 会员类型多选
				batchEditPriceForm: {
					time: "", //开始日期跟结束日期在一起
					memberTypeId: [], //会员类型id  String必填 多个用半角","分割
					// channel: "线下",
					startTime: "",
					endTime: "",
					weeks: [],
					roomStrategyJson: [],
				},
				bathEditRules: {
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
					priceCalend: '', //1会员日历单日定价 2单位日历单日定价 3客房单日价格  4会议厅单日价
					roomTypeId: '',
					dayTime: '',
					newLivePrice: "",
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
					}
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
			// this.weekDays.push({
			// 	label: this.$t('commons.all'),
			// 	value: ""
			// });
			this.$t('commons.weeks').forEach((item, i) => {
				this.weekDays.push({
					label: item,
					value: (i + 1)
				});
			})
			// console.log(this.weekDays)
			// debugger
			this.get_hotel_price_room_type_list();
			// this.get_hotel_room_type_list()
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
			}
		},
		watch: {
			//监听 newLivePrice 变化时 adjustPrice 的改变
			allRoomTypeList: {
				handler(newValue, oldValue) {

					this.allRoomTypeList.forEach((a, b) => {
						//
						if (a.roomType == 1) {
							//
							a.adjustPrice = Number(a.newLivePrice) + Number(a.mealBreakfastObject && (a.mealBreakfastObject.mealPrice || 0)) +
                                Number(a.mealDinnerObject
								.mealPrice || 0)
						} else {
							a.adjustPrice = Number(a.newMarketPrice || 0)
						}
					})
				},
				deep: true,
			},
			roomPrice(newValue, oldValue) {
				this.roomPrice = newValue;
			},

			deleteSuccess(newValue, oldValue) {
				this.deleteSuccess = newValue;
			},
		},
		created() {
			this.star_time = this.ruleForm.date;
		},
		methods: {
			onInput(){
			     this.$forceUpdate();
			},
			getRowKey(row) {
				// debugger
				return row.id + row.parentId;
			},
			// 前15天
			beforeTap() {
				console.log(this.ruleForm.date)
				this.star_time = this.getBeforeDate(15, this.ruleForm.date)
				this.ruleForm.date = this.star_time;
				this.get_hotel_price_room_type_list()
			},
			// 后15天
			afterTap() {
				console.log(this.ruleForm.date)
				this.star_time = this.getBeforeDate(-15, this.ruleForm.date)
				this.ruleForm.date = this.star_time;
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
			// 客房部操作数据
			getDateP(row, topIndex, item, index) {
				let tempPrice = 0;
				let price = 0;
				let finalIndex = topIndex % this.memberTypeLength;
				if (finalIndex == 0) {
					return '';
				}
				if (topIndex == 5) {
					// debugger
				}
				let memberTypeObject = this.memberTypeList[row.topIndex];
				if (memberTypeObject) {
					console.log('finalIndex：' + finalIndex)
					console.log(this.dayPriceList)
					console.log(memberTypeObject)
					if (this.dayPriceList && this.dayPriceList.length > 0) {
						let newArray = this.dayPriceList.filter(dayPrice => {
							return dayPrice.dayTime == item.dateStr;
						}); //匹配日期
						let newRoomTypeId = newArray.filter(dayPrice => {
							// debugger
							return dayPrice.memberTypeId == memberTypeObject.id && dayPrice.roomTypeId == row.id;
						}); //匹配第三级会员id  和 匹配房型id
						if (newRoomTypeId && newRoomTypeId.length > 0) {
							// debugger
							newRoomTypeId.forEach(temp => {
								tempPrice = temp.newLivePrice;
							})
						}
					}
					finalIndex -= 1;
					if (item.roomTypePrises[finalIndex]) {
						if (item.roomTypePrises[finalIndex].personPrice && !tempPrice) {
							tempPrice = parseInt(item.roomTypePrises[finalIndex].personPrice.split(',')[0])
						}
						console.log(item.roomTypePrises)
						console.log(finalIndex)
						price = tempPrice + (item.roomTypePrises[finalIndex].mealBreakfastObject ? item.roomTypePrises[finalIndex].mealBreakfastObject.mealPrice : 0)
                            + (item.roomTypePrises[finalIndex].mealDinnerObject ? item.roomTypePrises[finalIndex].mealDinnerObject.mealPrice : 0);
					}
				}

				return price
			},

			//保存批量修改房价
			onSave() {

				let params = {}
				params.channel = this.batchEditPriceForm.channel
				params.startTime = this.batchEditPriceForm.time[0];
				params.endTime = this.batchEditPriceForm.time[1];
				params.memberTypeId = this.checkbox_value_pie;
				params.channel = '线下';
				this.batchEditPriceForm.weeks.forEach((item, index) => {
					if (!item) {
						this.batchEditPriceForm.weeks.splice(index, 1);
					}
				});

				let weeks = this.batchEditPriceForm.weeks.join(",");
				if (weeks.substr(0, 1) == ',') {
					weeks = weeks.substr(1);
				}
				params.weeks = weeks

				let obj = {}
				let arr = []
				this.allRoomTypeList.forEach((a, b) => {
					obj = {}
					obj.roomTypeId = a.id;

					if (a.roomType == 1) {
						obj.marketPrice = ''
						obj.adjustPrice = Number(a.adjustPrice || 0) + Number(a.newLivePrice || 0)
						obj.newLivePrice = Number(a.newLivePrice || 0)
					} else {
						obj.newLivePrice = ''
						obj.adjustPrice = ''
						obj.marketPrice = a.newMarketPrice
					}
					arr[b] = obj
				})
				params.roomStrategyJson = JSON.stringify(arr);
				//
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_price_member_strategy_save",
					params,
					(res) => {
						this.$message.success("Save success");
						setTimeout(e =>{
							this.tab1_show = true;
							this.selectedRoomtype = []
							this.get_hotel_price_room_type_list()
						})
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
			//选择会员类型复选框事件
			handleMemberChange(value) {
				this.checkbox_value_pie = value.join(',');
				// this.batchEditPriceForm.memberTypeId = value;
				// if (value.length == 0)
				// 	this.batchEditPriceForm.memberTypeId = [];

				// if (value.length == this.selectedRoomtype.length || value == "") {

				// 	if (value.length == this.selectedRoomtype.length) {
				// 		this.batchEditPriceForm.memberTypeId = [];
				// 	} else {
				// 		this.batchEditPriceForm.memberTypeId = value;
				// 		this.selectedRoomtype.forEach(week => {
				// 			this.batchEditPriceForm.memberTypeId.push(week.id);
				// 		})
				// 	}
				// } else {
				// 	let $index = 999;
				// 	this.batchEditPriceForm.memberTypeId.forEach((week, index) => {
				// 		if (week === '') {
				// 			$index = index;
				// 		}
				// 	})
				// 	if ($index != 999) {
				// 		this.batchEditPriceForm.memberTypeId.splice($index, 1);
				// 	}
				// }

				// this.checkedCities = val ? cityOptions : [];
				//         this.isIndeterminate = false;
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
			// 修改单日价格日历
			changePopup(row, topIndex, item, index) {
				// debugger
				// 第三级会员id
				let memberTypeObject = this.memberTypeList[row.topIndex];
				this.sel_memberTypeId = memberTypeObject.id;
				this.sel_roomTypeId = row.id;

				console.log(this.ruleForm)
				this.ruleForm = row
				// debugger

				this.ruleForm_Pie = [];
				this.roomStrategyJson_p = [];

				this.editPriceForm.dayTime = item.dateStr;
				this.editPriceForm.priceCalend = 1;
				this.editPriceForm.roomTypeId = row.id;
				this.editPriceForm.onePrice = item.onePrice;
				this.editPriceDialog = true;

				this.ruleForm_Pie.push(row)
				console.log(this.ruleForm_Pie)
				// debugger
				this.ruleForm_Pie.forEach((item, j) => {
					// debugger
					let obj = {}
					let arr = []
					if (item.roomType == 1) {
						let personList = item.personPrice.split(',')
						let arry = personList.filter(function(el) {
							return el !== '';
						});

						arry.forEach((a, b) => {
							obj = {}
							obj.houseName = item.houseName;
							obj.roomType = item.roomType;
							obj.personNum = b + 1;
							obj.customPrice = a;
							obj.newCustomPrice = '';
							this.roomStrategyJson_p.push(obj)
						})
					} else {
						obj = {};
						obj.houseName = item.houseName;
						obj.roomType = item.roomType;
						obj.personNum = 0;
						obj.marketPrice = item.marketPrice;
						obj.customPrice = ''
						obj.newCustomPrice = '';
						this.roomStrategyJson_p.push(obj)
					}
					console.log('this.roomStrategyJson_p====', this.roomStrategyJson_p)
					// debugger
				})
			},
			//确认修改单价
			editPriceSubmit() {
				// * @param priceCalend  修改定价位置 1会员日历单日定价 2单位日历单日定价 int必填
				// * @param roomTypeId   房屋类型表id String必填
				// * @param memberTypeId 会员类型id priceCalend=1必填 String选填
				// * @param dayTime      当前时间 yyyy-MM-dd格式 String必填
				// * @param strategyId   单位策略规则id priceCalend=1必填 String必填
				// * @param strategyJson 房型调价策略    注意：为body参数 String 必填
				// *                         eg:[{"personNum":"1","customPrice":200,"newCustomPrice":1}]
				// *                         personNum  人数  int必填
				// *                         customPrice  住宿价格  double必填
				// *                         newCustomPrice 调价后价格  double必填
				// * strategyJson组装参数：通过获取房型详情可以获得人数和住宿价格、早晚餐三个对象，然后根据住宿价格进行拆分分组（通过“,”切分，就变成了多行数据展示）
				console.log(this.editPriceForm)
				// debugger
				var params = {
					priceCalend: 1,
					roomTypeId: this.sel_roomTypeId,
					dayTime: this.editPriceForm.dayTime,
					memberTypeId: this.sel_memberTypeId,
					strategyId: '111',
					newLivePrice: this.roomStrategyJson_p[0].newCustomPrice
				};
				let strategyJson_arr = [];
				strategyJson_arr.push(this.roomStrategyJson_p[0]);
				params.strategyJson = JSON.stringify(strategyJson_arr)
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_room_day_price_save",
					params,
					(res) => {
						this.editPriceDialog = false;
						this.memberTypeList = [];
						this.dateList = [];
						this.get_hotel_price_room_type_list()
						this.$message.success("success");
					}
				);
			},

			// 会员 价格策略单位列表
			get_hotel_price_room_type_list() {
				let params = {
					strategyTime: this.ruleForm.date || this.star_time,
					priceCalend: 1, // 检索类型 1会员价格日历 2单位价格日历
					timeType: 2, // 检索类型 1会员价格日历 2单位价格日历
				};
				// debugger
				this.$F.doRequest(this, "/pms/hotel/hotel_price_room_type_list", params,
					(res) => {
						this.memberTypeList = [];
						this.dayPriceList = res.dayPriceList;
						this.dateList = res.dateList
						this.dateList.unshift({
							dateStr: this.$t('manager.add_tyepApri'),
							weekDay: "",
						});
						let i = 0;
						// this.memberTypeList = res.memberTypeList;
						res.memberTypeList.forEach((member1, member1Index) => {
							member1.roomTypeList.forEach((m4, m4Index) => {
								i += m4Index;
								m4.id2 = m4.id + i;
							})
							member1.memberTypeList.forEach((member2, member2Index) => {
								member2.memberTypeList.forEach((member3, member2Index) => {
									i += member2Index;
									member3.id2 = member3.id + i;

									this.memberTypeList.push(member3);
									this.memberTypeList.forEach((member4, member4Index) => {
										this.memberTypeLength = member1.roomTypeList.length + 1;
										member4.children = member1.roomTypeList
										this.dateList.forEach((dat, datIndex) => {
											dat.roomTypePrises = member1.roomTypeList;
											// dat.memberTypeId =  member3.id2
										})
									})
								})
							})

						})
						console.log('this.dateList----', this.dateList)
						this.memberTypeList.forEach((memberType, topIndex) => {
							memberType.topIndex = topIndex;
							let array = this.$F.deepClone(memberType);
							array.children.forEach((item, secondIndex) => {
								item.topIndex = topIndex;
							})
							this.memberTypeList[topIndex] = array;
							console.log(this.memberTypeList);
							// debugger
						})
						console.log('this.memberTypeList----', this.memberTypeList)
						console.log('this.dateList----', this.dateList)
						console.log('this.memberTypeList----', this.memberTypeList)
						this.$forceUpdate();
					}
				);
			},
			// 获取全部房型列表
			get_hotel_room_type_list() {
				let params = {
					pageIndex: 1,
					pageSize: 999,
					roomType: 3, // 1客房类型  2会议室房型 3全部
				};
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_room_type_list",
					params,
					(res) => {
						this.allRoomTypeList = []
						let obj = {}
						res.list.forEach((value, index) => {
							obj = {}
							obj.id = value.id
							obj.roomTypeId = value.id
							obj.roomType = value.roomType
							obj.houseName = value.houseName

							if (value.roomType == 1) {
								//
								obj.marketPrice = ''
								obj.newLivePrice = ''
								obj.mealBreakfastObject = value.mealBreakfastObject
								obj.mealDinnerObject = value.mealDinnerObject

								if (value.personPrice !== '' && value.personPrice !== undefined && value.personPrice !== null) {

									let arr = value.personPrice.split(',')
									let arry = arr.filter(function(el) {
										return el !== '';
									});
									obj.oldOnePrice = Number(arr[0]) + Number(value.mealBreakfastObject.mealPrice || 0) + Number(value.mealDinnerObject
										.mealPrice || 0);
									obj.adjustPrice = Number(value.newLivePrice || 0) + Number(value.mealBreakfastObject.mealPrice || 0) +
										Number(
											value.mealDinnerObject.mealPrice || 0); //新价格
								}

							} else {
								obj.oldMarketPrice = value.marketPrice
								obj.marketPrice = value.marketPrice
								obj.newMarketPrice = ''
								obj.newLivePrice = ''
								obj.adjustPrice = obj.oldMarketPrice
							}
							this.allRoomTypeList.push(obj)

						})

						console.log('this.allRoomTypeList------', this.allRoomTypeList)
					}
				);
			},
			popup(type, row, item) {
				// debugger
				switch (type) {
					case "adjust":
						this.tab1_show = false;
						// console.log('this.memberTypeList----', this.memberTypeList)
						// debugger
						this.selectedRoomtype = this.memberTypeList;
						this.get_hotel_room_type_list()
						break;
					case "single":
						this.dialogDetail = true;
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
				this.selectedRoomtype = []
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

<style lang="less">
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

	.el-table .cell {
		display: flex;
	}
</style>
