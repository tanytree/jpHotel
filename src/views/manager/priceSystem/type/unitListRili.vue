<template>
	<div>
		<el-row :gutter="20" v-if="tab1_show">
			<el-row style="padding: 10px 15px;">
				<el-form class="demo-form-inline" inline size="small">
					<!-- 设计图有前15天和后15天的快捷日期方式,可以利用日期组件里的改成ui图一样的设计 -->
					<el-form-item :label="$t('manager.grsl_selectTime')+':'">
						<el-date-picker v-model="search_d.strategyTime" value-format="yyyy-MM-dd" align="right" type="date" :placeholder="$t('commons.selectDate')"
						 :picker-options="pickerOptions"></el-date-picker>
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
					<el-table-column v-for="(item, index) in dateList" :key="index" :label="item.dateStr + '' + item.weekDay" :width="index== 0? '130': ''">
						<template slot-scope="{row, $index}" @click="changePrice(item, index, row)">
							<span v-if="index == 0">{{row.name || row.houseName}}</span>
							<span v-if="index > 0" style=" cursor: pointer !important;" @click="popup('single',row, item, index)">
								<el-col>{{item.onePrice}}</el-col>
								<!-- <el-col v-else>{{row.marketPrice}}</el-col> -->
							</span>
						</template>
					</el-table-column>

				</el-table>
			</div>
		</el-row>

		<!-- ===================修改单价==================================== -->
		<el-dialog top="0" :title="$t('manager.ps_resetRoomPrice')" :visible.sync="editPriceDialog" :close-on-click-modal="false"
		 width="80%" class="editPriceDialog">
			<el-row :gutter="20" style="margin-bottom: 20px;">
				<el-col :span="3">{{$t('manager.add_nowTime')}}: </el-col>
				<el-col :span="16">{{editPriceForm.dayTime}}</el-col>
			</el-row>
			<el-table ref="multipleTable" :data="editPriceForm.roomStrategyJson" tooltip-effect="dark" default-expand-all
			 header-row-class-name="default">
				<el-table-column prop="houseName" :label="$t('manager.hp_room')"></el-table-column>
				<el-table-column prop="personNum" :label="$t('manager.add_peoAsit')"  v-if="selectInfo.roomType == 1">
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">
								<span v-if="value.roomType == 1">{{value.personNum}}</span>
								<span v-else>{{value.bedNum}}</span>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="customPrice" :label="$t('manager.hk_livePrice')" v-if="selectInfo.roomType == 1">
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">{{value.customPrice}}</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="customPrice" :label="$t('manager.hk_doorPriceA')" v-else>
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">{{value.marketPrice}}</div>
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="newCustomPrice" :label="$t('manager.add_resetPrice')" width="250" v-if="selectInfo.roomType == 1">
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">
								<el-input v-model="value.newCustomPrice"></el-input>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="newCustomPrice" :label="$t('manager.add_newDoorPri')" width="250" v-else>
					<template slot-scope="scope">
						<div v-for="(value, index) in roomStrategyJson_p">
							<div style="padding: 10px 0px;">
								<el-input v-model="value.newCustomPrice"></el-input>
							</div>
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="name" :label="$t('desk.attachedMeal')" v-if="selectInfo.roomType == 1">
					<template slot-scope="scope">
						<el-row v-if="selectInfo.roomType==1">
							<el-row class="demo-form-inline">
								<el-col>{{$t('manager.hk_breakfast')}} [{{scope.row.mealBreakfastObject.mealName}} : {{scope.row.mealBreakfastObject.mealPrice}}]</el-col>
							</el-row>
							<el-row class="demo-form-inline">
								<el-col>{{$t('manager.hk_dinner')}} [{{scope.row.mealDinnerObject.mealName}} : {{scope.row.mealDinnerObject.mealPrice}}]</el-col>
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
		props: ['selectInfo'],
		data() {
			return {
				tab1_show: true,
				search_d: {
					strategyTime: new Date().Format("yyyy-MM-dd"),
					priceCalend: 2,
					timeType: 2,
					strategyId: ''
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


				editPriceDialog: false, //修改房价dialog
				editPriceForm: {
					priceCalend: '', //1会员日历单日定价 2单位日历单日定价 3客房单日价格  4会议厅单日价
					roomTypeId: '',
					dayTime: '',
					newLivePrice: "",
				},
				rules: {
					rules: [{
						required: true,
						message:this.$t('manager.add_chooseTime'),
						trigger: "blur",
					}, ],
				}
			};
		},
	computed: {
			strategyTime: {
				get() {
					return this.search_d.strategyTime
				},
				set() {},
      },
      pickerOptions(){
        return {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
							text:this.$t('manager.hp_today'),
							onClick(picker) {
								picker.$emit("pick", new Date());
							},
						},
						{
							text: this.$t('manager.add_last15A'),
							onClick(picker) {
								const date = new Date();
								date.setTime(date.getTime() - 3600 * 1000 * 24 * 15);
								picker.$emit("pick", date);
								this.get_hotel_price_room_type_list();
							},
						},
						{
							text: this.$t('manager.add_next15A'),
							onClick(picker) {
								const date = new Date();
								date.setTime(date.getTime() + 3600 * 1000 * 24 * 15);
								picker.$emit("pick", date);
								this.get_hotel_price_room_type_list();
							},
						},
					],
				}
      }
		},


		mounted() {
			// 
			this.search_d.priceCalend = 2;
			this.search_d.strategyId = this.selectInfo.id

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
	
		watch: {
			strategyTime() {
				this.dateList = []
				this.roomType = [];
				this.get_hotel_price_room_type_list()
			},

		},
		methods: {
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
					priceCalend: this.search_d.roomType == 1? '3': '4',
					roomTypeId: this.selectInfo.id,
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
				// 
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_price_room_type_list",
					params,
					(res) => {
						// 
						this.roomType = res.roomTypeList
						this.roomType.forEach((value, index) => {
							// 
							if (value.roomType == 1) {
								if (value.personPrice !== '' && value.personPrice !== undefined && value.personPrice !== null) {
									let arr = value.personPrice.split(',')
									let arry = arr.filter(function(el) {
										return el !== '';
									});

									if (res.dayPriceList.length == 0) {
										res.dateList.forEach((a, b) => {
											// 
											// a.onePrice = 0;
											a.onePrice = Number(arr[0]) + Number(value.mealBreakfastObject.mealPrice || 0) + Number(value.mealDinnerObject.mealPrice || 0)
										})

									} else {
										// 
										res.dateList.forEach((a, b) => {
											// a.onePrice = 0;
											res.dayPriceList.forEach((c, d) => {
												if (a.dateStr == c.dayTime) {
													// 
													a.onePrice = c.newCustomPrice + Number(value.mealBreakfastObject.mealPrice || 0) + Number(value.mealDinnerObject.mealPrice || 0)
												}
											})
										})
										
									}
									console.log(res.dateList)
									console.log(res.dayPriceList)

								}
							} else {
								if (res.dayPriceList.length == 0) {
									res.dateList.forEach((a, b) => {
										a.onePrice = value.marketPrice
									})
									
								} else {

									res.dateList.forEach((a, b) => {
										a.onePrice = 0;
										res.dayPriceList.forEach((c, d) => {
											if (a.dateStr == c.dayTime) {
												a.onePrice = Number(c.newCustomPrice)
											}
										})
									})
									console.log(res.dateList)
								}
							}

						})
						this.dateList = res.dateList
						this.dateList.unshift({
							dateStr: this.$t('manager.add_tyepApri'),
							weekDay: "",
						});
						console.log('this.dateList-----', this.dateList)
						console.log('this.roomType-----', this.roomType)
						this.$forceUpdate();
					}
				);
			},
			popup(type, row, item, index) {
				// 
				this.roomStrategyJson_p = []
				this.ruleForm_Pie.roomStrategyJson = [] // 批量
				this.editPriceForm.roomStrategyJson = [] // 单日

				this.ruleForm_Pie.roomStrategyJson = this.roomType
				this.editPriceForm.roomStrategyJson = this.roomType

				this.ruleForm_Pie.roomStrategyJson.forEach((item, j) => {

					let obj = {}
					let arr = []
					if (item.roomType == 1) {
						let personList = item.personPrice.split(',')
						let arry = personList.filter(function(el) {
							return el !== '';
						});

						arry.forEach((a, b) => {
							// 
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
					// 
					console.log('this.roomStrategyJson_p====', this.roomStrategyJson_p)
				})
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
