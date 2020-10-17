<template>
	<div>
		<el-row v-if="tab_show">
			<el-row :gutter="20">
				<el-row>
					<el-form class="demo-form-inline" inline size="small">
						<el-form-item :label="$t('manager.ps_ruleName')+':'">
							<el-input v-model="ruleForm.ruleName" class="row-width"></el-input>
						</el-form-item>
						<!-- <el-form-item :label="$t('manager.ps_priceModel')+':'" class="margin-l-15">
							<el-select v-model="ruleForm.priceModel" class="row-width">
								<el-option label="固定时间退房模式" value="1"></el-option>
								<el-option label="24小时退房模式" value="2"></el-option>
							</el-select>
						</el-form-item> -->
						<el-form-item>
							<el-button type="primary" style="width: 100px;" size="mini" @click="searchBtn">{{$t('commons.queryBtn')}}</el-button>
						</el-form-item>
						<el-form-item class="form-inline-flex">
							<el-row>
								<el-button type="primary" @click="popup('add', '')" style="width: 100px;" size="mini">{{$t('commons.newAdd')}}</el-button>
							</el-row>
						</el-form-item>
					</el-form>
				</el-row>
				<div class="components-edit">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
						<el-table-column prop="ruleName" :label="$t('manager.ps_ruleName')"></el-table-column>
						<el-table-column prop="ruleName" :label="$t('manager.ps_ruleDetail')" width="500">
							<template slot-scope="{row}">
								<span>
									{{$t('manager.ps_specifiedTime')}}{{row.startTime}}-{{row.endTime}}
									{{$t('manager.ps_inLive')}}{{row.outtimeMinute}}{{$t('manager.ps_minterGet')}}{{row.checkinStartHourhouse}}{{$t('manager.ps_letterGetAllMoney')}}
									{{$t('manager.ps_moreThen')}}{{row.outtimeMinute}}{{$t('manager.ps_letterMin')}}
									{{$t('manager.ps_moreThen')}}{{row.outtimeAllday}}{{$t('manager.ps_minLetterChange')}}
									{{row.outtimeRule==1 ? $t('manager.ps_addHalf'):$t('manager.ps_everyHourAdd')}}
									{{row.outtimeRuleCaps==true?$t('manager.ps_addSky') : ''}}
								</span>
							</template>
						</el-table-column>
						<el-table-column :label="$t('boss.loginDetail_state')">
							<template slot-scope="{row}">
								<span>{{row.state == 1 ? $t('commons.enable'):$t('commons.disable')}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="remark" :label="$t('boss.loginDetail_note')"></el-table-column>
						<el-table-column :label="$t('commons.operating')" width="200">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="popup('change', scope.row)">{{$t('commons.modify')}}</el-button>
								<el-button type="text" size="small" @click="stop_h(scope.row)">{{scope.row.state==1? $t('commons.disable'):$t('commons.enable')}}</el-button>
								<el-popconfirm :title="$t('manager.hp_bulletTitle')" @onConfirm="deleteRow_h(scope.row)">
									<el-button slot="reference" type="text" size="small">{{$t('commons.delete')}}</el-button>
								</el-popconfirm>
							</template>
						</el-table-column>
					</el-table>
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="ruleForm.pageIndex"
						 :page-sizes="[10, 20, 30, 40]" :page-size="ruleForm.pageSize" layout=" sizes, prev, pager, next, jumper" :total="ruleForm.totalSize"></el-pagination>
					</div>
				</div>
			</el-row>
		</el-row>

		<!-- 时租房添加 -->
		<el-row v-if="!tab_show">
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back" content></el-page-header>
			</el-row>
			<el-row :gutter="20">
				<el-form :model="ruleForm_h" :rules="rules_h" ref="ruleForm" style="display: flex;flex-direction: column;align-items: flex-start;">
					<el-col :span="20" style="display: flex;align-items: center;">
						<el-form-item :label="$t('manager.ps_ruleName')+':'" style="display: flex;align-items: center;">
							<el-input v-model="ruleForm_h.ruleName" />
						</el-form-item>
						<el-checkbox v-model="ruleForm_h.state" class="margin-l-15" style="margin-bottom: 20px;">{{$t('commons.enable')}}</el-checkbox>
					</el-col>
					<el-col :span="20" style="margin-bottom: 20px;">
						<el-row :gutter="20" style="display: flex;align-items: center;">
							<el-col style="width: 200px; padding: 0;">
								<el-checkbox v-model="ruleForm_h.name" class="margin-l-15" style="margin-right: 15px;">{{$t('manager.ps_specifiedTime')+':'}}</el-checkbox>
							</el-col>
							<el-col>
								<el-date-picker v-model="ruleForm_h.time" type="daterange" align="right" value-format="yyyy-MM-dd"
								 unlink-panels :range-separator="$t('boss.report_toText')" :start-placeholder="$t('manager.ps_startDate')"
								 :end-placeholder="$t('manager.ps_endDate')"></el-date-picker>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="20" style="margin-bottom: 20px;">
						<el-form-item :label="$t('manager.ps_startPrice')+':'" prop="checkinStartMinute" style="display: flex;align-items: center;">
							<el-col>
								{{$t('manager.ps_inLive')}}
								<el-input v-model="ruleForm_h.checkinStartMinute" style="width: 70px;margin: 0px 10px;"></el-input>
								{{$t('manager.ps_minterGet')}}
								<el-input v-model="ruleForm_h.checkinStartHourhouse" style="width: 70px;margin: 0px 10px;"></el-input>
								{{$t('manager.ps_letterGetAllMoney')}}
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item :label="$t('manager.ps_thenTime')+':'" prop="outtimeMinute">
							<el-col :span="20">
								{{$t('manager.ps_moreThen')}}
								<el-input v-model="ruleForm_h.outtimeMinute" style="width: 70px; margin: 0px 10px;"></el-input>
								{{$t('manager.ps_letterMin')}}
								{{$t('manager.ps_moreThen')}}
								<el-input v-model="ruleForm_h.outtimeAllday" style="width: 70px; margin: 0px 10px;"></el-input>
								{{$t('manager.ps_minLetterChange')}}
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item :label="$t('manager.ps_thenTimeRule')+':'">
							<el-radio-group v-model="ruleForm_h.outtimeRule" class="margin-l-15">
								<el-radio label="1">{{$t('manager.ps_addHalf')}}</el-radio>
								<el-radio label="2">{{$t('manager.ps_everyHourAdd')}}</el-radio>
							</el-radio-group>
							<el-checkbox v-model="ruleForm_h.outtimeRuleCaps" class="margin-l-15">{{$t('manager.ps_addSky')}}</el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item :label="$t('boss.loginDetail_note')+':'">
							<el-col>
								<el-input type="textarea" :rows="2" :placeholder="$t('boss.department_placeEnterContent')" v-model="ruleForm_h.remark"></el-input>
							</el-col>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-table ref="multipleTable" :data="ruleForm_h.roomStrategyJson" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="houseName" :label="$t('manager.hp_room')"></el-table-column>
				<el-table-column :label="$t('manager.ps_fullPrice')">
					<template slot-scope="scope">
						<el-row class="demo-form-inline">
							<el-input v-model="scope.row.allPrice"></el-input>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column prop="name" :label="$t('manager.ps_startAt')">
					<template slot-scope="scope">
						<el-row class="demo-form-inline">
							<el-input v-model="scope.row.startPrice"></el-input>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column prop="name" :label="$t('manager.ps_everyHourAdd')">
					<template slot-scope="scope">
						<el-row class="demo-form-inline">
							<el-input v-model="scope.row.hourAddPrice"></el-input>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column prop="name" :label="$t('manager.ps_skyPrice')">
					<template slot-scope="scope">
						<el-input v-model="scope.row.topPrice"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="name" :label="$t('manager.ps_advanceRoomPay')">
					<template slot-scope="scope">
						<el-input v-model="scope.row.advancePrice"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="name" :label="$t('boss.loginDetail_note')">
					<template slot-scope="scope">
						<el-input v-model="scope.row.remark"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;" @click="saveInfo_h">{{$t('commons.save')}}</el-button>
				<el-button style="width: 80px;margin-left: 20px;" @click="back">{{$t('commons.back')}}</el-button>
			</el-row>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tab_show: true,
				tableData: [],
				type: "",
				ruleForm: {
					ruleName: "",
					priceModel: "", //收费模式 1固定时间退房模式  2 24小时退房模式
					state: "",
					pageIndex: 1,
					pageSize: 10,
					totalSize: 0,
				},
				ruleForm_h: {
					ruleName: "",
					checkinStartMinute: "",
					checkinStartHourhouse: "",
					outtimeMinute: "",
					outtimeAllday: "",
					time: [],
					startTime: "",
					endTime: "",
					outtimeRule: "2",
					outtimeRuleCaps: true,
					remark: "",
					state: true,
					roomStrategyJson: [],
				},
				rules_h: {
					checkinStartMinute: [{
						required: true,
						message: "请输入起步收费",
						trigger: "blur"
					}, ],
					outtimeMinute: [{
						required: true,
						message: "请输入超时收费",
						trigger: "blur"
					}, ],
				},
				ruleForm_r: {
					memberId: "",
					pageIndex: 1,
					pageSize: 10,
				},
				statelList: [{
						name: "启动",
						key: "1",
					},
					{
						name: "禁用",
						key: "2",
					},
				],
			};
		},
		created() {
			//
			this.get_hotel_rule_hour_list();
		},
		computed: {
			deleteSuccess: {
				get() {
					return this.$t("manager.hk_deleteSuccess");
				},
				set() {},
			},
			success: {
				get() {
					return this.$t("manager.hk_success");
				},
				set() {},
			},
		},
		watch: {
			deleteSuccess(newValue, oldValue) {
				this.deleteSuccess = newValue;
			},
			success(newValue, oldValue) {
				this.success = newValue;
			},
		},
		methods: {
			popup(type, value) {
				this.type = type
				switch (type) {
					case "add":
						this.tab_show = false;
						this.get_hotel_room_type_list();
						break;
					case "change":
						this.tab_show = false;
						this.ruleForm_h = value;
						let time = [];
						time.push(value.startTime);
						time.push(value.endTime);
						this.ruleForm_h.time = time
						this.ruleForm_h.roomStrategyJson = value.hotelRuleRoomTypeList
						if(value.state ==1) {
							value.state = true;
						} else {
							value.state = false;
						}
						if(value.outtimeRuleCaps ==1) {
							value.outtimeRuleCaps = true;
						} else {
							value.outtimeRuleCaps = false;
						}
						// this.get_hotel_room_type_list();
						break;
				}
			},
			// 查询
			searchBtn() {
				this.ruleForm.pageIndex = 1;
				this.tableData = [];
				this.get_hotel_rule_hour_list();
			},
			// 时租房保存
			saveInfo_h() {
				let roomStrategyJson = [];
				let obj = {};
				this.ruleForm_h.roomStrategyJson.forEach((item) => {
					// debugger;
					obj = {};
					if(this.type == "change") {
						obj.id = item.id;
						obj.roomTypeId = item.roomTypeId;
					} else {
						obj.roomTypeId = item.id;
					}
					obj.allPrice = item.allPrice;
					obj.startPrice = item.startPrice;
					obj.hourAddPrice = item.hourAddPrice;
					obj.topPrice = item.topPrice;
					obj.advancePrice = item.advancePrice;
					obj.remark = item.remark;
					roomStrategyJson.push(obj);
				});
				this.ruleForm_h.roomStrategyJson = roomStrategyJson;
				debugger
				let params = this.$F.deepClone(this.ruleForm_h);
				params.startTime = params.time[0];
				params.endTime = params.time[1];
				if (params.outtimeRuleCaps) {
					params.outtimeRuleCaps = 1;
				} else {
					params.outtimeRuleCaps = 2;
				}
				if (params.state) {
					params.state = 1;
				} else {
					params.state = 2;
				}
				// debugger;
				params.roomStrategyJson = JSON.stringify(params.roomStrategyJson);
				debugger
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_rule_hour_save",
					params,
					(res) => {
						this.$message({
							message: this.success,
							type: "success",
						});
						this.get_hotel_room_type_list()
					}
				);
			},
			deleteRow_h(item) {
				let params = {
					id: item.id,
					status: 2,
				};
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_rule_hour_delete",
					params,
					(res) => {
						this.tableData = [];
						this.get_hotel_rule_hour_list();
						this.$message({
							message: this.deleteSuccess,
							type: "success",
						});
					}
				);
			},
			stop_h(item) {
				// debugger;
				let params = {
					id: item.id,
				};
				if (item.state === 1) {
					params.state = 2;
				} else {
					params.state = 1;
				}
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_rule_hour_delete",
					params,
					(res) => {
						this.tableData = [];
						this.get_hotel_rule_hour_list();
					}
				);
			},
			// 获取 全部房型
			get_hotel_room_type_list() {
				let params = {
					roomType: 3,
					paging: false,
					pageIndex: 1,
					pageSize: 999,
				};
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_room_type_list",
					params,
					(res) => {
						if (res.list.length != 0) {
							res.list.forEach((item) => {
								item.startPrice = "";
								item.hourAddPrice = "";
								item.topPrice = "";
								item.remark = "";
							});
							this.ruleForm_h.roomStrategyJson = res.list;
						}
					}
				);
			},
			// 获取 计费规则时租房计费列表
			get_hotel_rule_hour_list() {
				// debugger
				let params = Object.assign({}, this.ruleForm);
				params.status = 1;
				let arr_list = [];

				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_rule_hour_list",
					params,
					(res) => {
						// debugger;
						if (res.list.length != 0) {
							res.list.forEach((item) => {
								if (item.status != 2) {
									this.tableData.push(item);
								}
							});
							// this.tableData = res.list
							this.ruleForm.totalSize = res.totalSize
						}
					}
				);
			},
			back() {
				this.tableData = [];
				this.ruleForm_h.ruleName= "",
				this.ruleForm_h.checkinStartMinute= "",
				this.ruleForm_h.checkinStartHourhouse= "",
				this.ruleForm_h.outtimeMinute= "",
				this.ruleForm_h.outtimeAllday= "",
				this.ruleForm_h.time= [],
				this.ruleForm_h.startTime= "",
				this.ruleForm_h.endTime= "",
				this.ruleForm_h.outtimeRule= "2",
				this.ruleForm_h.outtimeRuleCaps= true,
				this.ruleForm_h.remark= "",
				this.ruleForm_h.state= true,
				this.ruleForm_h.roomStrategyJson= [],
				this.type = '';
				this.get_hotel_rule_hour_list();
				this.tab_show = true;
			},
			// 分页
			handleSizeChange(val) {
				this.ruleForm.pageSize = val;
				this.ruleForm.pageIndex = 1;
				this.get_hotel_rule_hour_list();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.ruleForm.pageIndex = val;
				this.get_hotel_rule_hour_list();
			},
		},
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
