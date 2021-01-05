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
					<el-form-item>
						<el-col > <el-button type="text"  @click="beforeTap" style="border-bottom: 2rpx solid #409EFF; margin-left: 20rpx;"><< 前15天</el-button></el-col>
					</el-form-item>
					<el-form-item>
						<el-col> <el-button type="text"  @click="afterTap">后15天 >></el-button></el-col>
					</el-form-item>
					<el-form-item class="form-inline-flex">
						<el-row style="margin-right: -10px;">
							<el-button type="primary" @click="popup('adjust')" style="width: 100px;" size="mini">{{$t('manager.ps_bulkPrice')}}</el-button>
						</el-row>
					</el-form-item>
				</el-form>
			</el-row>
			<div class="components-edit member-price" v-loading="loading">
				<el-table :data="memberTypeList" style="width: 100%;margin-bottom: 20px;" row-key="id" :default-expand-all="false"
				 :tree-props="{children: 'roomTypeList', hasChildren: 'hasChildren'}" border lazy :load="loadRoomType">
                        <el-table-column v-for="(item, index) in dateList" :key="index" :label="item.dateStr + '' + item.weekDay" :width="index== 0? '150': ''">
                            <template slot-scope="scope">
                                <span v-if="index == 0">{{scope.row.name || scope.row.houseName}}</span>
                                <span v-if="index > 0" style=" cursor: pointer !important;" @click="changePopup(scope.row, item, index)">{{scope.row.discount || item.onePrice}}</span>
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
						<el-form-item label="会员类型" prop="memberTypeId">
							<el-row style="display: flex;align-items: center;">
								<el-checkbox-group v-model="batchEditPriceForm.memberTypeId" @change="handleMemberChange">
									<el-checkbox v-for="(item, index) in selectedRoomtype" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
								</el-checkbox-group>

							</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="渠道" prop="channel">
							<el-button type="primary" plain size="mini">{{batchEditPriceForm.channel}}</el-button>
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
			<el-table ref="multipleTable" :data="allRoomTypeList" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="houseName" label="房型"></el-table-column>
				<el-table-column label="门市价(一人住宿+附餐费)">
					<template slot-scope="{row, $index}">
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
				<el-table-column prop="name" :label="$t('manager.hk_livePrice') + '(一人住宿)'">
					<template slot-scope="{row, $index}">
						<el-row class="demo-form-inline" v-if="row.roomType == 1">
							<span>
								<el-input v-model.number="row.newLivePrice" style="width: 140px;margin: 0px 15px;"></el-input> 日元
							</span>
						</el-row>
						<el-row class="demo-form-inline" v-else>
							<span>
								<el-input v-model.number="row.newMarketPrice" style="width: 140px;margin: 0px 15px;"></el-input> 日元
							</span>
						</el-row>
					</template>
				</el-table-column>
				<!-- 这里是前面输入的一人住宿价+早餐+晚餐的总价,如果前面没有输入的话,先展示早餐+晚餐的价格(附餐价) -->
				<el-table-column prop="adjustPrice" label="新价格(一人住宿+附餐费)"></el-table-column>
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
				<el-col :span="3">当前时间: </el-col>
				<el-col :span="16">{{editPriceForm.dayTime}}</el-col>
			</el-row>
			<el-table ref="multipleTable" :data="ruleForm_Pie" tooltip-effect="dark" default-expand-all
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
		data() {
			return {
				dateList: [],
				memberTypeList: [],
				memberChecked: false, // 会员类型全选
				checkAll: false,
				checkedMembers: [], //会员类型列表
				memberTypeY: [],
				isIndeterminate: true,
				roomTypeList: [], //全部房型
				selectedRoomtype: [], // 批量调价中的会员类型
				allRoomTypeList: [], //全部房型(包括会议厅类型)
				ruleForm_Pie: [],  // 单独修改价格的tabble
				roomStrategyJson_p: [],
				all: [],
				isIndeterminate: true,

				tab1_show: true,
				value: "",
				batchEditPriceForm: {
					time: "", //开始日期跟结束日期在一起
					memberTypeId: [], //会员类型id  String必填 多个用半角","分割
					channel: "线下",
					startTime: "",
					endTime: "",
					weeks: [],
					roomStrategyJson: [],
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
							a.adjustPrice = Number(a.newLivePrice) + Number(a.mealBreakfastObject.mealPrice || 0) + Number(a.mealDinnerObject
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
			loadRoomType(tree, treeNode, resolve) {
				let obj = {}
				let arr = []
				tree.roomTypeList.forEach((value, index) => {
					obj = {}
					obj.name = value.houseName;
					obj.onePrice = ''
					obj.id = value.id
					arr[index] = obj
				})
				// 
				resolve(arr)
			},
			//保存批量修改房价
			onSave() {

				let params = {}
				params.channel = this.batchEditPriceForm.channel
				params.startTime = this.batchEditPriceForm.time[0];
				params.endTime = this.batchEditPriceForm.time[1];
				params.memberTypeId = this.batchEditPriceForm.memberTypeId.join(",");
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

				this.batchEditPriceForm.memberTypeId = value;
				if (value.length == 0)
					this.batchEditPriceForm.memberTypeId = [];

				if (value.length == this.selectedRoomtype.length || value == "") {

					if (value.length == this.selectedRoomtype.length) {
						this.batchEditPriceForm.memberTypeId = [];
					} else {
						this.batchEditPriceForm.memberTypeId = value;
						this.selectedRoomtype.forEach(week => {
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

			editPriceSubmit() {
				// * @param priceCalend       修改定价位置  1会员日历单日定价  2单位日历单日定价  String必填
				//   * @param roomTypeId       房屋类型表id  String必填
				//   * @param memberTypeId     会员类型id  priceCalend=1必填 String选填
				//   * @param customPrice       新会员价  Double必填
				//   * @param dayTime         当前时间  yyyy-MM-dd格式 String必填
				//   * @param strategyId       单位策略规则id  priceCalend=1必填  String必填
				console.log(this.editPriceForm)
				debugger
				var params = {
					priceCalend: 1,
					roomTypeId: this.editPriceForm.id,
					memberTypeId: this.ruleForm.memberTypeObject.id,
					customPrice: this.editPriceForm.customPrice,
					dayTime: this.editPriceForm.dayTime,
					strategyId: 1,
				};
				debugger
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
				this.$F.doRequest(this, "/pms/hotel/hotel_price_room_type_list", params,
                    (res) => {
						this.dateList = res.dateList
						this.dateList.unshift({
							dateStr: '房型/房价',
							weekDay: "",
						});

						// this.selectedRoomtype.push({
						// 	name: '全部',
						// 	id: "0",
						// });

						this.memberTypeList = res.memberTypeList
						this.memberTypeList.forEach((item, i) => {
							this.selectedRoomtype.push({
								name: item.name,
								id: item.id,
								updateName: item.updateName
							});

							// if (item.roomTypeList.length !== 0) {
							// 	item.hasChildren = true
							// 	item.id2 = i
							// }
							item.roomTypeList.forEach((value, j) => {
								value.id2 = j;
                                value.memberTypeObject = item;
								if (value.roomType == 1) {
									// debugger 
									if (res.dayPriceList.length == 0) {
										if (value.personPrice != '' && value.personPrice != null && value.personPrice != undefined) {
											let arr = value.personPrice.split(',')
											res.dateList.forEach((a, b) => {
												a.onePrice = 0;
												a.onePrice = Number(arr[0]) + Number(value.mealBreakfastObject.mealPrice || 0) + Number(value.mealDinnerObject.mealPrice || 0)
											})
										}
									} else {
										res.dateList.forEach((a, b) => {
											a.onePrice = 0;
											res.dayPriceList.forEach((c, d) => {
												// debugger
												if (a.dateStr == c.dayTime) {
													// debugger
													a.onePrice = Number(c.newCustomPrice) + Number(value.mealBreakfastObject.mealPrice) + Number(value.mealDinnerObject.mealPrice)
												}
											})
										})

									}
								}

							})
						})
                        this.$forceUpdate();
                        console.log('this.memberTypeList-----', this.memberTypeList)
                        console.log('this.dateList-----', this.dateList)
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
									obj.adjustPrice = Number(value.newLivePrice || 0) + Number(value.mealBreakfastObject.mealPrice || 0) + Number(
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
			popup(type, value) {
				switch (type) {
					case "adjust":
						this.tab1_show = false;
						this.get_hotel_room_type_list()
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
			// 修改单日价格日历
			changePopup(row, item, index) {
				debugger
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
				})
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
