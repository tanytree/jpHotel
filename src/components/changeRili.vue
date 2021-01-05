<template>
	<div>
		<el-row :gutter="20" v-if="tab1_show">
			<el-row style="padding: 10px 15px;">
				<el-form class="demo-form-inline" inline size="small">
					<!-- 设计图有前15天和后15天的快捷日期方式,可以利用日期组件里的改成ui图一样的设计 -->
					<el-form-item :label="$t('manager.grsl_selectTime')+':'" style="display: flex;">
						<el-date-picker v-model="search_d.strategyTime" value-format="yyyy-MM-dd" align="right" type="date" :placeholder="$t('commons.selectDate')"
						 :picker-options="pickerOptions"></el-date-picker>
						 
					</el-form-item>
					<el-form-item>
						<el-col > <el-button type="text"  @click="beforeTap" style="border-bottom: 2rpx solid #409EFF; margin-left: 20rpx;"><< 前15天</el-button></el-col>
					</el-form-item>
					<el-form-item>
						<el-col> <el-button type="text"  @click="afterTap">后15天 >></el-button></el-col>
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
					<el-table-column v-for="(item, index) in dateList" :key="index" :label="item.dateStr + '' + item.weekDay" :width="index== 0? '150': ''">
						<template slot-scope="scope">
							<div v-if="index == 0">
								<span v-if="scope.row.roomType.roomType == 1">{{scope.row.name || scope.row.houseName}}</span>
								<span v-else>{{scope.row.houseName}}</span>
							</div>
							<div v-if="index > 0" >
								<span style=" cursor: pointer !important;" @click="popup('single', scope.row, item)" v-if="scope.row.roomType.roomType == 1" v-html="getDateP(item, scope.$index)">
								</span>
								<span style=" cursor: pointer !important;" @click="popup('single', scope.row, item)"  v-html="getDateT(item, scope.$index)" v-else>
								    <!-- {{item.onePrice}} -->
								</span>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-row>

		<!-- ===================批量调价==================================== -->
		<el-dialog top="0" title="批量调价" :visible.sync="PieDialog" :close-on-click-modal="false" width="80%" class="editPriceDialog">

			<el-row :gutter="20">
				<el-form :model="ruleForm_Pie" :rules="rules" ref="ruleForm_Pie" label-width="100px">
					<el-col :span="20">
						<el-form-item :label="$t('manager.grsl_selectTime')+':'" prop="time">
							<el-date-picker v-model="ruleForm_Pie.time" type="daterange" align="right" value-format="yyyy-MM-dd"
							 unlink-panels :range-separator="$t('boss.report_toText')" :start-placeholder="$t('manager.ps_startDate')"
							 :end-placeholder="$t('manager.ps_endDate')"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item :label="$t('manager.ps_selectWeek')+':'">
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
				<el-table-column prop="personNum" label="人数/座位数" v-if="ruleForm.roomType == 1">
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">
								<span v-if="value.roomType == 1">{{value.personNum}}</span>
								<span v-else>{{value.bedNum}}</span>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="customPrice" :label="$t('manager.hk_livePrice')" v-if="ruleForm.roomType == 1">
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">{{value.customPrice}}</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="customPrice" label="门市价" v-else>
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">{{value.marketPrice}}</div>
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="newCustomPrice" label="调改价" width="250" v-if="ruleForm.roomType == 1">
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">
								<el-input v-model="value.newCustomPrice"></el-input>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="newCustomPrice" label="新门市价" width="250" v-else>
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">
								<el-input v-model="value.newCustomPrice"></el-input>
							</div>
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="name" :label="$t('desk.attachedMeal')" v-if="ruleForm.roomType == 1">
					<template slot-scope="scope">
						<el-row v-if="ruleForm.roomType==1">
							<el-row class="demo-form-inline">
								<el-col>早餐 [{{scope.row.mealBreakfastObject.mealName}} : {{scope.row.mealBreakfastObject.mealPrice}}]</el-col>
							</el-row>
							<el-row class="demo-form-inline">
								<el-col>晚餐 [{{scope.row.mealDinnerObject.mealName}} : {{scope.row.mealDinnerObject.mealPrice}}]</el-col>
							</el-row>
						</el-row>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;" @click="onSave">{{$t('commons.save')}}</el-button>
				<el-button style="width: 80px;margin-left: 20px; cursor: pointer" @click="PieDialog = false">
					{{$t('commons.cancel')}}</el-button>
			</el-row>
		</el-dialog>

		<!-- ===================修改单价==================================== -->
		<el-dialog top="0" :title="$t('manager.ps_resetRoomPrice')" :visible.sync="editPriceDialog" :close-on-click-modal="false"
		 width="80%" class="editPriceDialog">
			<el-row :gutter="20" style="margin-bottom: 20px;">
				<el-col :span="3">当前时间: </el-col>
				<el-col :span="16">{{editPriceForm.dayTime}}</el-col>
			</el-row>
			<el-table ref="multipleTable" :data="editPriceForm.roomStrategyJson" tooltip-effect="dark" default-expand-all
			 header-row-class-name="default">
				<el-table-column prop="houseName" :label="$t('manager.hp_room')"></el-table-column>
				<el-table-column prop="personNum" label="人数/座位数" v-if="ruleForm.roomType == 1">
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">
								<span v-if="value.roomType == 1">{{value.personNum}}</span>
								<span v-else>{{value.bedNum}}</span>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="customPrice" :label="$t('manager.hk_livePrice')" v-if="ruleForm.roomType == 1">
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">{{value.customPrice}}</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="customPrice" label="门市价" v-else>
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">{{value.marketPrice}}</div>
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="newCustomPrice" label="调改价" width="250" v-if="ruleForm.roomType == 1">
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">
								<el-input v-model="value.newCustomPrice"></el-input>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="newCustomPrice" label="新门市价" width="250" v-else>
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">
								<el-input v-model="value.newCustomPrice"></el-input>
							</div>
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="name" :label="$t('desk.attachedMeal')" v-if="ruleForm.roomType == 1">
					<template slot-scope="scope">
						<el-row v-if="ruleForm.roomType==1">
							<el-row class="demo-form-inline">
								<el-col>早餐 [{{scope.row.mealBreakfastObject.mealName}} : {{scope.row.mealBreakfastObject.mealPrice}}]</el-col>
							</el-row>
							<el-row class="demo-form-inline">
								<el-col>晚餐 [{{scope.row.mealDinnerObject.mealName}} : {{scope.row.mealDinnerObject.mealPrice}}]</el-col>
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
		props: ['ruleForm'],
		data() {
			return {
                mealBreakfastObject: {},
                mealDinnerObject: {},
                dayPriceList: [],
				tab1_show: true,
				search_d: {
					strategyTime: new Date().Format("yyyy-MM-dd"),
					priceCalend: '',
					timeType: 2,
					roomTypeId: ''
				},
				roomType: [],
				dateList: [],
				weekDays: [],

				PieDialog: false,

				ruleForm_Pie: {
					time: [],
					weeks: [],
					roomStrategyJson: [],
				},
				roomStrategyJson_p: [],
				loading: false,

				memberTypeList: [],
				editPriceDialog: false, //修改房价dialog
				editPriceForm: {
					priceCalend: '', //1会员日历单日定价 2单位日历单日定价 3客房单日价格  4会议厅单日价
					roomTypeId: '',
					dayTime: '',
					newLivePrice: "",
				},

				pickerOptions: {
					disabledDate(time) {
						// return time.getTime() > Date.now();
					},
					// shortcuts: [{
					// 		text: "今天",
					// 		onClick(picker) {
					// 			picker.$emit("pick", new Date());
					// 		},
					// 	},
					// 	{
					// 		text: "前十五天",
					// 		onClick(picker) {
					// 			// this.getBeforeDate(-15, '2021-01-05')
					// 			const date = new Date();
					// 			let num = 0;
					// 			num++;
					// 			date.setTime(date.getTime() - 3600 * 1000 * 24 * 15 * num);
					// 			picker.$emit("pick", date);
					// 		},
					// 	},
					// 	{
					// 		text: "后十五天",
					// 		onClick(picker) {
					// 			const date = new Date();
					// 			date.setTime(date.getTime() + 3600 * 1000 * 24 * 15 * num);
					// 			picker.$emit("pick", date);
					// 		},
					// 	},
					// ],
				},
				rules: {
					rules: [{
						required: true,
						message: '请选择时间',
						trigger: "blur",
					}, ],
				}
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
			strategyTime: {
				get() {
					return this.search_d.strategyTime
				},
				set() {},
			}
		},
		watch: {
			strategyTime() {
				this.dateList = []
				this.roomType = [];
				this.get_hotel_price_room_type_list()
			},

			// deleteSuccess(newValue, oldValue) {
			// 	this.deleteSuccess = newValue;
			// },
		},
		methods: {
			// 前15天
			beforeTap() {
				console.log(this.search_d.strategyTime)
				let time = this.getBeforeDate(15, this.search_d.strategyTime)
				this.search_d.strategyTime = time;
				this.get_hotel_price_room_type_list()
			},
			// 后15天
			afterTap() {
				console.log(this.search_d.strategyTime)
				let time = this.getBeforeDate(-15, this.search_d.strategyTime)
				this.search_d.strategyTime = time;
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
		    getDateP(item, topIndex) {
		        // item 是dateList里面时间
                if (this.dayPriceList && this.dayPriceList.length > 0) {
                    let newArray = this.dayPriceList.filter(dayPrice => {
                        return dayPrice.dayTime == item.dateStr;
                    }); //匹配日期
                    if (newArray && newArray.length > 0) {
                        let priseList = []; //[100,200]
                        newArray.forEach(temp => {
                            priseList.push(temp.newCustomPrice);
                        })
                        let result = '';
                        priseList.forEach((c, d) => {
                            if(topIndex == 0) { //纯住宿
                                result += `${d+1}人价` + Number(priseList[d])+ '<br/>'
                            } else if(topIndex== 1) {  //住宿+早
                                result += `${d+1}人价` + Number(Number(priseList[d]) + Number(this.mealBreakfastObject.mealPrice || 0)) + '<br/>'
                            } else if (topIndex== 2) {  //住宿+晚餐
                                result += `${d+1}人价` + Number(Number(priseList[d]) + Number(this.mealDinnerObject.mealPrice || 0))  + '<br/>'
                            } else if (topIndex== 3) { //住宿+晚餐+早餐
                                result += `${d+1}人价` + Number(Number(priseList[d]) + Number(this.mealBreakfastObject.mealPrice || 0) + Number(this.mealDinnerObject.mealPrice || 0))  + '<br/>'
                            }
                        })
                        return result;
                    }
                }
                return item.roomTypePrises[topIndex]
            },
			// 会议厅操作数据
			getDateT(item, topIndex) {
				// debugger
			    //item 是dateList里面时间
			    if (this.dayPriceList && this.dayPriceList.length > 0) {
					let result = ''
			        let newArray = this.dayPriceList.filter(dayPrice => {
						if(dayPrice.dayTime == item.dateStr) {
							result = dayPrice.newCustomPrice
						}
			            return dayPrice.dayTime == item.dateStr;
			        }); //匹配日期
			        if (newArray && newArray.length > 0) {
			            return result;
			        }
			    }
			    return item.roomTypePrises[0].marketPrice
			},

			//保存批量修改房价
			onSave() {
				console.log(this.ruleForm);

				let week = ''
				this.ruleForm_Pie.weeks.forEach((value, index) => {
					week = week + ',' + value
				})
				if (week.substr(0, 1) === ',') {
					week = week.substr(1)
				}
				let params = {
					roomTypeId: this.ruleForm.id,
					priceCalend: this.ruleForm.roomType == 1 ? '3' : '4',
					startTime: this.ruleForm_Pie.time[0],
					endTime: this.ruleForm_Pie.time[1],
					weeks: week,
					strategyJson: JSON.stringify(this.roomStrategyJson_p)
				}
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_price_roomtype_strategy_save",
					params,
					(res) => {
						this.PieDialog = false;
						this.dateList = [];
						this.roomType = [];
						// this.search_d.roomTypeId = this.roomType.id;
						// debugger
						this.get_hotel_price_room_type_list()
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
			//选择日期change事件
			handleWeekDayChange(value) {
				// debugger
				this.ruleForm_Pie.weeks = value;
				if (value.length == 0)
					this.ruleForm_Pie.weeks = [];

				if (value.length == 8 || value == "") {
					//
					if (value.length == 8) {
						this.ruleForm_Pie.weeks = [];
					} else {
						this.ruleForm_Pie.weeks = value;
						this.weekDays.forEach(week => {
							this.ruleForm_Pie.weeks.push(week.value);
						})
					}
				} else {
					let $index = 999;
					this.ruleForm_Pie.weeks.forEach((week, index) => {
						if (week === '') {
							$index = index;
						}
					})
					if ($index != 999) {
						this.ruleForm_Pie.weeks.splice($index, 1);
					}
				}
			},
			//修改单日房价
			editPriceSubmit() {
				//@param priceCalend  修改定价位置 1会员日历单日定价 2单位日历单日定价 3客房单日价格  4会议厅单日价格 int必填
				// * @param roomTypeId   房屋类型表id String必填
				// * @param memberTypeId 会员类型id priceCalend=1必填 String选填
				//* @param newCustomPrice新会员/单位价格  Double选填
				// * @param dayTime      当前时间 yyyy-MM-dd格式 String必填
				// * @param newLivePrice 新住宿价格(会员和单位) double选填
				// * @param strategyId   单位策略规则id priceCalend=1必填 String必填
				var params = {
					priceCalend: this.search_d.priceCalend,
					roomTypeId: this.ruleForm.id,
					dayTime: this.editPriceForm.dayTime,
					strategyJson: JSON.stringify(this.roomStrategyJson_p)
				};
				// ;
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_room_day_price_save_t",
					params,
					(res) => {
						this.roomType = []
						this.dateList = []
						this.get_hotel_price_room_type_list()
						this.editPriceDialog = false;
						this.$message.success("success");
					}
				);
			},

			// 客房-会议厅修改价格日历列表
			get_hotel_price_room_type_list() {
				// @param userId       登录者id String必填
				//  * @param storesNum    门店编号 String 必填
				//  * @param priceCalend  检索类型 3客房日历 4会议厅日历
				//  * @param strategyTime 时间筛选 yyyy-MM-dd格式 String必填 默认当前时间
				//  * @param timeType     时间前推后推类别 1前推15天 2后推15天 int必填
				//  * @param roomTypeId   客房或会议厅房型id  string必填
				let params = this.search_d;
				params.roomTypeId = this.ruleForm.id
				params.roomTypeId =
					this.$F.doRequest(
						this,
						"/pms/hotel/hotel_price_guest_chamber_list",
						params,
						(res) => {
						    // debugger
                            this.dayPriceList = res.dayPriceList;
							this.dateList = res.dateList
							this.dateList.unshift({
								dateStr: '类型',
								weekDay: "",
							});
							if(res.roomType.roomType == 1) {
								this.roomType = [{
									name: '纯住宿'
								}, {
									name: '住宿+早'
								}, {
									name: '住宿+晚'
								}, {
									name: '住宿+早+晚'
								}]
								let stay = ''; // 纯住宿
								let stayX = ''; // 住宿+早
								let stayY = ''; // 住宿+晚
								let stayXY = ''; // 住宿+早+晚
								this.roomType.forEach((value, index) => {
                                    value.roomType = res.roomType
                                    this.mealBreakfastObject = value.roomType.mealBreakfastObject
                                    this.mealDinnerObject = value.roomType.mealDinnerObject
                                    // debugger
									let roomTypePrises = [];
									if (value.roomType.roomType == 1) {
										if (value.roomType.personPrice) {
											let arr = value.roomType.personPrice.split(',')
											let arry = arr.filter(function(el) { //多人价格
												return el !== '';
											});
                                            arry.forEach((c, d) => {
                                                if(index == 0) { //纯住宿
                                                    stay += `${d+1}人价` + Number(arr[d]) + '<br/>'
                                                } else if(index== 1) {  //住宿+早
                                                    stayX += `${d+1}人价` + Number(Number(arr[d]) + Number(value.roomType.mealBreakfastObject.mealPrice || 0))  + '<br/>'
                                                } else if (index== 2) {  //住宿+晚餐
                                                    stayY += `${d+1}人价` + Number(Number(arr[d]) + Number(value.roomType.mealDinnerObject.mealPrice || 0))  + '<br/>'
                                                } else if (index== 3) { //住宿+晚餐+早餐
                                                    stayXY += `${d+1}人价` + Number(Number(arr[d]) + Number(value.roomType.mealBreakfastObject.mealPrice || 0) + Number(value.roomType.mealDinnerObject.mealPrice || 0))  + '<br/>'
                                                }
                                            })
											roomTypePrises.push(stay);
											roomTypePrises.push(stayX);
											roomTypePrises.push(stayY);
											roomTypePrises.push(stayXY);
											this.dateList.forEach((a, b) => {
											    a.roomTypePrises = roomTypePrises;
											})
										}
									}
								})
							} 
							else {
								this.roomType.push(res.roomType)
								console.log('this.roomType=====', this.roomType)
								this.dateList.forEach((a, b) => {
									a.roomTypePrises = this.roomType
								})
							}


							// console.log('this.roomType=====', this.roomType)
							// console.log('this.dateList========', this.dateList)
							// debugger

							this.$forceUpdate();
						}
					);
			},
			popup(type, row, item, index) {
				// console.log(this.ruleForm)
				// debugger
				this.roomStrategyJson_p = []
				this.ruleForm_Pie.roomStrategyJson = [] // 批量
				this.editPriceForm.roomStrategyJson = [] // 单日

				// this.roomType.forEach((x, indexX) =>{
				// 	this.ruleForm_Pie.roomStrategyJson.push(x.roomType)
				// 	this.editPriceForm.roomStrategyJson.push(x.roomType)
				// })
				if(this.ruleForm.roomType == 1) {
					this.ruleForm_Pie.roomStrategyJson.push(this.roomType[0].roomType)
					this.editPriceForm.roomStrategyJson.push(this.roomType[0].roomType)
				} else {
					this.ruleForm_Pie.roomStrategyJson = this.roomType
					this.editPriceForm.roomStrategyJson = this.roomType
				}
				// debugger

				this.ruleForm_Pie.roomStrategyJson.forEach((value, j) => {
					// debugger
					let obj = {}
					let arr = []
					// debugger
					if (value.roomType == 1) {
						// debugger
						let personList = value.personPrice.split(',')
						let arry = personList.filter(function(el) {
							return el !== '';
						});

						arry.forEach((valueA, indexA) => {
							// debugger
							obj = {}
							obj.houseName = value.houseName;
							obj.roomType = value.roomType;
							obj.personNum = indexA + 1;
							obj.customPrice = valueA;
							obj.newCustomPrice = '';
							this.roomStrategyJson_p.push(obj)
						})
					} else {
						obj = {};
						obj.houseName = value.houseName;
						obj.roomType = value.roomType;
						obj.personNum = 0;
						obj.marketPrice = value.marketPrice;
						obj.customPrice = ''
						obj.newCustomPrice = '';
						this.roomStrategyJson_p.push(obj)
					}
					// debugger
					console.log('this.roomStrategyJson_p====', this.roomStrategyJson_p)
				})
				console.log('this.ruleForm_Pie.roomStrategyJson====', this.ruleForm_Pie.roomStrategyJson)
				switch (type) {
					case "adjust":
						// 批量调价
						this.PieDialog = true;
						break;
					case "single":
						// 修改单个日历价格
						this.editPriceForm.dayTime = item.dateStr;
						this.editPriceDialog = true;
						break;
					case "add":
						this.tab1_show = false;
						break;
				}
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
