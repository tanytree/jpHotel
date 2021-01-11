<template>
	<div>
		<el-row v-if="tab1_show">
			<el-row :gutter="20">
				<el-row>
					<el-form class="demo-form-inline" inline size="small">
						<el-form-item :label="$t('manager.ps_ruleName')+':'">
							<el-input v-model="ruleForm.ruleName" class="row-width"></el-input>
						</el-form-item>
						<el-form-item :label="$t('manager.ps_priceModel')+':'" class="margin-l-15">
							<el-select v-model="ruleForm.priceModel" style="width: 120px">
								<el-option :label="value.name" :value="value.key" v-for="(value, index) in priceModelList" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item :label="$t('boss.loginDetail_state')+':'" class="margin-l-15">
							<el-select v-model="ruleForm.state" style="width: 120px">
								<el-option :label="value.name" :value="value.key" v-for="(value, index) in statelList" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="" style="width: 100px;" size="mini" @click="clear">{{$t('commons.resetBtn')}}</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" style="width: 100px;" size="mini" @click="searchBtn">{{$t('commons.queryBtn')}}</el-button>
						</el-form-item>
						<el-form-item class="form-inline-flex">
							<el-row>
								<el-button type="primary" @click="popup('add')" style="width: 100px;" size="mini">{{$t('commons.newAdd')}}</el-button>
							</el-row>
						</el-form-item>
					</el-form>
				</el-row>

				<div class="components-edit">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
						<el-table-column prop="ruleName" :label="$t('manager.ps_ruleName')"></el-table-column>
<!--						<el-table-column prop="priceModel" :label="$t('manager.ps_priceModel')">-->
<!--							<template slot-scope="{rowceModel==1}">-->
<!--								<span>{{row.priceModel==1 ? '固定时间退房模式':'24小时退房模式'}}</span>-->
<!--							</template>-->
<!--						</el-table-column>-->
						<el-table-column :label="$t('manager.ps_ruleDetail')" width="500">
							<template slot-scope="{row}">
								<span>
									{{row.priceModel==1 ? $t('manager.ps_fixedTime'):$t('manager.ps_everyTime')}}
									{{$t('manager.ps_inLive')+':'}}{{row.checkinStartMinute}}{{$t('manager.ps_minterGet')}}{{row.checkinStartHourhouse}}{{$t('manager.ps_getAll')}}
									{{$t('manager.ps_nextDay')}}{{row.checkoutTime}}{{$t('manager.ps_moreThen')}}{{row.outtimeMinute}}{{$t('manager.ps_letterMin')}}{{row.outtimeRule==1 ? $t('manager.ps_addHalf'):$t('manager.ps_addHour')}}{{row.outtimeAllday==true?$t('manager.ps_addSky') : ''}}
									{{$t('manager.ps_moreThen')}}{{row.outtimeAllday}}{{$t('manager.ps_getAll')}}
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="time" :label="$t('boss.loginDetail_state')">
							<template slot-scope="scope">
								<span>{{scope.row.state==1 ? $t('commons.enable'):$t('commons.disable')}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="remark" :label="$t('boss.loginDetail_note')"></el-table-column>
						<el-table-column :label="$t('commons.operating')" width="200">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="popup('change', scope.row)">{{$t('commons.modify')}}</el-button>
								<el-button type="text" size="small" @click="stop_d(scope.row)">{{scope.row.state==1? $t('commons.disable'):$t('commons.enable')}}</el-button>
								<el-popconfirm :title="$t('manager.hp_bulletTitle')" @confirm="deleteRow_d(scope.row)">
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
		<!-- 全天房添加 -->
		<el-row v-if="!tab1_show">
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back_1" content></el-page-header>
			</el-row>
			<el-row :gutter="20">
				<el-form :model="allForm" :rules="rules" ref="allForm" label-width="100px">
					<el-col :span="20">
						<el-form-item :label="$t('manager.ps_billingType')+':'">
							<el-radio-group v-model="allForm.priceModel">
								<el-radio :label="1">{{$t('manager.ps_fixedTime')}}</el-radio>
								<el-radio :label="2">{{$t('manager.ps_everyTime')}}</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item :label="$t('manager.ps_ruleName')+':'" prop="ruleName">
							<el-input v-model="allForm.ruleName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item :label="$t('manager.ps_startPrice')+':'" prop="checkinStartMinute">
							<el-col>
								{{$t('manager.ps_inLive')+':'}}
								<el-input v-model="allForm.checkinStartMinute" style="width: 70px;margin: 0px 10px;"></el-input>
								{{$t('manager.ps_minterGet')}}
								<el-input v-model="allForm.checkinStartHourhouse" style="width: 70px;margin: 0px 10px;"></el-input>
								{{$t('manager.ps_getAll')}}
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item :label="$t('manager.hp_checkOutTime')+':'" prop="name">
							<el-row style="display: flex;align-items: center;">
								<el-col span="1">{{$t('manager.ps_nextDay')}}</el-col>
								<el-time-select v-model="allForm.checkoutTime" :picker-options="{
								    start: '08:30',
								    step: '00:15',
								    end: '18:30'
								  }"
								 :placeholder="$t('manager.grsl_selectTime')"></el-time-select>
							</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item :label="$t('manager.ps_thenTime')+':'" prop="name">
							<el-col :span="20">
								{{$t('manager.ps_moreThen')}}
								<el-input v-model="allForm.outtimeMinute" style="width: 70px; margin: 0px 10px;"></el-input>
								{{$t('manager.ps_minGetMoney')}}
								<el-radio-group v-model="allForm.outtimeRule" class="margin-l-15">
									<el-radio :label="1">{{$t('manager.ps_addHalf')}}</el-radio>
									<el-radio :label="2">{{$t('manager.ps_addHour')}}</el-radio>
								</el-radio-group>
								<el-checkbox v-model="allForm.outtimeRuleCaps" class="margin-l-15">{{$t('manager.ps_addSky')}}</el-checkbox>
							</el-col>
							<el-col :span="20">
								{{$t('manager.ps_moreThen')}}
								<el-input v-model="allForm.outtimeAllday" style="width: 70px;margin: 0px 10px;"></el-input>
								{{$t('manager.ps_getAll')}}
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item :label="$t('boss.loginDetail_note')+':'">
							<el-col>
								<el-input type="textarea" :rows="2" :placeholder="$t('boss.department_placeEnterContent')" v-model="allForm.remark"></el-input>
							</el-col>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-table ref="multipleTable" :data="allForm.roomStrategyJson" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="houseName" :label="$t('manager.hp_room')"></el-table-column>
				<el-table-column prop="name" :label="$t('manager.ps_startAt')">
					<template slot-scope="{row, $index}">
						<el-row class="demo-form-inline">
							<el-input v-model="row.startPrice"></el-input>
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
				<el-table-column prop="name" :label="$t('boss.loginDetail_note')">
					<template slot-scope="scope">
						<el-input v-model="scope.row.remark"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;" @click="saveInfo_d">{{$t('commons.save')}}</el-button>
				<el-button style="width: 80px;margin-left: 20px;" @click="back_1">{{$t('commons.back')}}</el-button>
			</el-row>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tab1_show: true,
				tableData: [],
				allForm: {
					priceModel: 1,
					ruleName: "",
					checkinStartMinute: "",
					checkinStartHourhouse: "",
					checkoutTime: "",
					outtimeMinute: "",
					outtimeAllday: "",
					outtimeRule: 2,
					outtimeRuleCaps: true,
					remark: "",
					roomStrategyJson: [],
					state: 1,
				},
				ruleForm: {
					ruleName: "",
					priceModel: "",
					state: "",
					pageIndex: 1,
					pageSize: 10,
					totalSize: 0,
				},
				rules: {
					ruleName: [{
						required: true,
						// message: "请输入规格名称",
                        message: this.$t('commons.mustInput'),
						trigger: "blur"
					}, ],
					checkinStartMinute: [{
						required: true,
						// message: "请输入起步收费",
                        message: this.$t('commons.mustInput'),
						trigger: "blur"
					}, ],
					checkoutTime: [{
                        required: true,
                        message: this.$t('commons.placeChoose'),
						trigger: "blur"
					}, ],
					outtimeMinute: [{
						required: true,
						// message: "请输入超时收费:",
                        message: this.$t('commons.mustInput'),
						trigger: "blur"
					}, ],
				},
        dialogsit: false,
        
			};
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
      priceModelList(){
        return [{
						name: this.$t('manager.ps_fixedTime'),
						key: "1",
					},
					{
						name: this.$t('manager.ps_everyTime'),
						key: "2",
					}]
      },
      statelList(){
        return [{
						name: this.$t('manager.add_start'),
						key: "1",
					},
					{
						name: this.$t('manager.hk_disable'),
						key: "2",
					},
				]
      }

		},
		watch: {
			deleteSuccess(newValue, oldValue) {
				this.deleteSuccess = newValue;
			},
			success(newValue, oldValue) {
				this.success = newValue;
			},
		},
		created() {
			this.get_hotel_rule_allday_list();
		},
		methods: {
			popup(type, value) {
				switch (type) {
					case "add":
						this.tab1_show = false;
						this.allForm.id = null;
						this.get_hotel_room_type_list();
						break;
					case "change":
						this.tab1_show = false;
						this.allForm = value;
						if (this.allForm.outtimeRuleCaps == 1) {
							this.allForm.outtimeRuleCaps = true;
						} else {
							this.allForm.outtimeRuleCaps = false;
						}
						this.allForm.roomStrategyJson = value.hotelRuleRoomTypeList;
						break;
				}
			},

			// 重置
			clear() {
				this.ruleForm.ruleName = ''
				this.ruleForm.priceModel = ''
				this.ruleForm.state = ''
			},
			// 查询
			searchBtn() {
				this.tableData = [];
				this.get_hotel_rule_allday_list();
			},
			// 全天房保存
			saveInfo_d() {
				let roomStrategyJson = [];
				let obj = {};
				this.allForm.roomStrategyJson.forEach((item) => {
					obj = {};
					obj.houseName = item.houseName;
					obj.roomTypeId = item.id;
					obj.startPrice = item.startPrice;
					obj.hourAddPrice = item.hourAddPrice;
					obj.topPrice = item.topPrice;
					obj.remark = item.remark;
					roomStrategyJson.push(obj);
				});
				this.allForm.hotelRuleRoomTypeList = null;
				this.allForm.roomStrategyJson = roomStrategyJson;
				let params = this.$F.deepClone(this.allForm);
				if (params.outtimeRuleCaps) {
					params.outtimeRuleCaps = 1;
				} else {
					params.outtimeRuleCaps = 2;
				}
				params.roomStrategyJson = JSON.stringify(params.roomStrategyJson);
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_rule_allday_save",
					params,
					(res) => {
						this.$message({
							message: this.success,
							type: "success",
						});
					}
				);
			},
			deleteRow_d(item) {
				let params = {
					id: item.id,
					status: 2,
				};
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_rule_allday_delete",
					params,
					(res) => {
						this.tableData = [];
						this.get_hotel_rule_allday_list();
						this.$message({
							message: this.deleteSuccess,
							type: "success",
						});
					}
				);
			},
			stop_d(item) {
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
					"/pms/hotel/hotel_rule_allday_delete",
					params,
					(res) => {
						this.tableData = [];
						this.get_hotel_rule_allday_list();
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
							this.allForm.roomStrategyJson = res.list;
						}
					}
				);
			},
			// 获取 计费规则全天房计费列表
			get_hotel_rule_allday_list() {
				let params = Object.assign({}, this.ruleForm);
				// params.status = 2
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_rule_allday_list",
					params,
					(res) => {
						if (res.list.length != 0) {
							res.list.forEach((item) => {
								if (item.status != 2) {
									this.tableData.push(item);
								}
							});
							// this.ruleForm.totalSize = res.totalSize
						}
					}
				);
			},
			back_1() {
				this.tab1_show = true;
				this.tableData = [];
				this.get_hotel_rule_allday_list();
			},
			// 分页
			handleSizeChange(val) {
				this.ruleForm.pageSize = val;
				this.ruleForm.pageIndex = 1;
				this.get_hotel_rule_allday_list();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.ruleForm.pageIndex = val;
				this.get_hotel_rule_allday_list();
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
