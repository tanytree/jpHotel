<!-- 房屋信息 -->
<template>
	<div id="page1" class="boss-index">
		<el-row v-if="!add_show" style="height: 100%">
			<el-row :gutter="20" style="font-size: 14px; font-weight: bolder">
				<el-col :span="2.5">{{ hotel_name || "" }}</el-col>
				<el-col :span="2">{{ $t("manager.hk_total") }}{{ dongList.length || ""
                    }}{{ $t("manager.hk_building") }}</el-col>
			</el-row>
			<el-row style="padding: 20px 0px">
				<el-radio-group v-model="selectRedio">
					<el-radio-button :label="value.id" v-for="(value, index) in dongList" :key="index">{{ value.name }}</el-radio-button>
				</el-radio-group>
			</el-row>
			<el-row style="height: 100%">
				<el-row :gutter="20" class="demo-form-inline">
					<el-col :span="14">
						<el-form class="demo-form-inline" inline size="small">
							<el-form-item :label="$t('manager.hk_floorName') + ':'" class="margin-l-15">
								<el-select v-model="form.buildingFloorId" style="width: 120px">
									<el-option :label="value.name" :value="value.id" v-for="(value, index) in cengList" :key="index"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item :label="$t('manager.hp_roomB') + ':'">
								<el-cascader v-model="form.roomTypeId" :options="roomType" @change="handleChange" style="width: 180px"></el-cascader>
							</el-form-item>
							<el-form-item :label="$t('manager.hk_roomNumber') + ':'" class="margin-l-15">
								<el-input v-model="form.houseNum" :placeholder="form.houseNum_name" style="width: 120px"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" size="mini" style="width: 80px" @click="search_list()">{{ $t("commons.queryBtn") }}</el-button>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="10">
						<el-row class="form-inline-flex" style="margin-bottom: 20px">
							<el-button type="primary" size="mini" @click="addRoom('add', '')">{{ $t("manager.hk_newRoom") }}</el-button>
							<el-button type="primary" size="mini" @click="stop_p('qyong')">{{ $t("manager.hk_batchEnable") }}</el-button>
							<el-button type="primary" size="mini" @click="stop_p('jyong')">{{ $t("manager.hk_batchDisabled") }}</el-button>

							<!--                            <el-button-->
							<!--                                 v-if="1==2"-->
							<!--                                type="primary"-->
							<!--                                size="mini"-->
							<!--                                @click="stop('gaowen')"-->
							<!--                                >{{-->
							<!--                                    $t("manager.hk_batchTemperature")-->
							<!--                                }}</el-button-->
							<!--                            >-->
						</el-row>
					</el-col>
				</el-row>
				<el-container direction="vertical" class="boss-index">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="100%" @selection-change="handleSelectionChange"
					 :header-cell-style="{
                            background: '#F7F7F7',
                            color: '#1E1E1E',
                        }">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="houseNum" :label="$t('manager.hk_roomNumber')"></el-table-column>
						<el-table-column prop="roomTypeId_name" :label="$t('manager.hk_roomNameB')"></el-table-column>
						<el-table-column :label="$t('manager.hp_storiedBuildingA')">
							<template slot-scope="scope">
								<el-col>{{
                                    scope.row.hotelBuilding.name
                                }}</el-col>
							</template>
						</el-table-column>
						<el-table-column prop="buildingFloorId" :label="$t('manager.hp_floor')">
							<template slot-scope="scope">
								<el-col>{{
                                    scope.row.hotelBuildingFloor.name
                                }}</el-col>
							</template>
						</el-table-column>
						<el-table-column prop="extension" :label="$t('manager.hk_ext')"></el-table-column>
						<el-table-column prop="toward" :label="$t('manager.hk_towardA')">
							<template slot-scope="{ row }">
								<span>{{
                                    $t("commons.toward")[row.toward]
                                }}</span>
							</template>
						</el-table-column>
						<el-table-column v-if="1==2" prop="roadFlag" :label="$t('manager.hk_byRoad')">
							<template slot-scope="{ row }">
								<span v-if="row.roadFlag == 1">{{
                                    $t("manager.hk_yes")
                                }}</span>
								<span v-if="row.roadFlag == 2">{{
                                    $t("manager.hk_no")
                                }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="windowFlag" :label="$t('manager.hk_ifWindow')">
							<template slot-scope="{ row }">
								<span v-if="row.windowFlag == 1">{{
                                    $t("manager.hk_have")
                                }}</span>
								<span v-if="row.windowFlag == 2">{{
                                    $t("manager.hk_donot")
                                }}</span>
							</template>
						</el-table-column>
						<el-table-column v-if="1==2" :label="$t('manager.hk_ifNoiseRoom')">
							<template slot-scope="{ row }">
								<span v-if="row.noiseFlag == 1">{{
                                    $t("manager.hk_yes")
                                }}</span>
								<span v-if="row.noiseFlag == 2">{{
                                    $t("manager.hk_no")
                                }}</span>
							</template>
						</el-table-column>
						<el-table-column v-if="1==2" :label="$t('manager.hk_ifTemperatureRoom')">
							<template slot-scope="{ row }">
								<span v-if="row.temperatureFlag == 1">{{
                                    $t("manager.hk_yes")
                                }}</span>
								<span v-if="row.temperatureFlag == 2">{{
                                    $t("manager.hk_no")
                                }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="state" :label="$t('boss.loginDetail_state')">
							<template slot-scope="{ row }">
								<span v-if="row.state == 1">{{
                                    $t("manager.hk_enable")
                                }}</span>
								<span v-if="row.state == 2">{{
                                    $t("manager.hk_disable")
                                }}</span>
							</template>
						</el-table-column>
						<el-table-column :label="$t('commons.operating')" width="200">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="stop_d(scope.row)">{{
                                        scope.row.state == 1
                                            ? $t("commons.disable")
                                            : $t("commons.enable")
                                    }}</el-button>
								<el-button type="text" size="small" @click="addRoom('change', scope.row)">{{ $t("commons.modify") }}</el-button>
								<el-popconfirm :title="$t('manager.hp_bulletTitleD')" @confirm="houseConfirm_delete(scope.row)">
									<el-button slot="reference" type="text" size="small">{{ $t("commons.delete") }}</el-button>
								</el-popconfirm>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.pageIndex"
					 :page-sizes="[10, 20, 50, 100]" :page-size="form.pageSize" :total="form.totalSize" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
				</el-container>
			</el-row>
		</el-row>
		<el-row v-if="add_show">
			<AddRoom ref="AddRoom" :selectRedio="selectRedio" :currentDong="currentDong" :selectFrom="selectFrom" :roomType="roomType"
			 :dongList="dongList" :add_show="add_show" @changeShow="changeShow"></AddRoom>
		</el-row>
	</div>
</template>

<script>
	import HouseMaintain from "./HouseMaintain";
	import BuildingFloor from "./BuildingFloor";
	import AddRoom from "./AddRoom";
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		components: {
			HouseMaintain,
			BuildingFloor,
			AddRoom,
		},
		computed: {
			...mapState({
				user: (state) => state.user,
			}),
			guide: {
				get() {
					return this.$t("manager.hk_guide");
				},
				set() {},
			},
			designRule: {
				get() {
					return this.$t("manager.hk_designRule");
				},
				set() {},
			},
			consistent: {
				get() {
					return this.$t("manager.hk_consistent");
				},
				set() {},
			},
			guestRooms: {
				get() {
					return this.$t("manager.hk_guestRooms");
				},
				set() {},
			},
			chamber: {
				get() {
					return this.$t("manager.hk_chamberA");
				},
				set() {},
			},
			note: {
				get() {
					return this.$t("boss.loginDetail_note");
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
		data() {
			return {
				hotel_name: "",
				selectRedio: 0,
				currentDong: "",
				form: {
					buildingFloorId: "",
					roomTypeId: "",
					houseNum: "",
					pageIndex: 1,
					pageSize: 10,
					totalSize: 0,
				},
				dongList: [], //楼栋列表
				cengList: [], // 楼层列表
				tableData: [],
				options: [{
					value: "zhinan",
					label: this.guide,
					children: [{
						value: "shejiyuanze",
						label: this.designRule,
						children: [{
							value: "yizhi",
							label: this.consistent,
						}, ],
					}, ],
				}, ],
				selectFrom: {},
				add_show: false,
				roomType: [{
						label: this.guestRooms,
						value: "1",
						children: [],
					},
					{
						label: this.chamber,
						value: "2",
						children: [],
					},
				],
				multipleSelection: [],
			};
		},
		watch: {
			selectRedio() {
				this.form.buildingFloorId = "";
				this.form.roomTypeId = "";
				this.form.pageIndex = 1;
				this.get_ceng_list();
				this.get_room_list();
			},
			guide(newValue, oldValue) {
				this.guide = newValue;
			},
			designRule(newValue, oldValue) {
				this.designRule = newValue;
			},
			consistent(newValue, oldValue) {
				this.consistent = newValue;
			},
			guestRooms(newValue, oldValue) {
				this.guestRooms = newValue;
			},
			chamber(newValue, oldValue) {
				this.chamber = newValue;
			},
			note(newValue, oldValue) {
				this.note = newValue;
			},

			deleteSuccess(newValue, oldValue) {
				this.deleteSuccess = newValue;
			},
		},
		created() {
			this.hotel_name = JSON.parse(
				sessionStorage.getItem("userData")
			).storesInfo.storesName;
			this.get_dong_list();
			// this.get_room_type_list();
		},
		mounted() {
			this.get_room_type_list();
		},
		methods: {
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			addRoom(type, value) {
				// debugger
				switch (type) {
					case "add":
						this.selectFrom = {
							name: "",
							buildingId: "",
							buildingId_name: "",
							buildingFloorId: "",
							buildingFloorId_name: "",
							roomTypeId: "",
							roomTypeId_name: "",
							houseNum: "",
							extension: "",
							roomIcon: "",
							toward: 1,
							roadFlag: 1,
							state: 1,
							windowFlag: 1,
							smokeFlag: 1,
							noiseFlag: 1,
							temperatureFlag: 1,
							remark: this.note, //为什么备注是必选
						};
						// this.get_room_type_list()
						this.add_show = true;
						break;
					case "change":
						this.add_show = true;
						this.selectFrom = value;
						break;
				}
			},
			search_list() {
				this.tableData = [];
				this.get_room_list();
			},
			stop_p(type) {
				let params = {};
				let roomId = "";
				if (this.multipleSelection.length !== 0) {
					this.multipleSelection.forEach((item) => {
						roomId = roomId + "," + item.id;
					});
					if (roomId.substr(0, 1) === ",") {
						roomId = roomId.substr(1);
					}
				} else {
					this.$message({
						message: this.$t("manager.batchSelectTip"),
						type: "warning",
					});
					return;
				}
				params.roomId = roomId;
				if (type == "qyong") {
					params.state = 1;
				} else {
					params.state = 2;
				}
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_room_oper",
					params,
					(res) => {
						this.tableData = [];
						this.get_room_list();
					}
				);
			},
			stop(type) {
				let params = {};
				let roomId = "";
				if (this.multipleSelection.length !== 0) {
					this.multipleSelection.forEach((item) => {
						roomId = roomId + "," + item.id;
					});
					if (roomId.substr(0, 1) === ",") {
						roomId = roomId.substr(1);
					}
				} else {
					this.$message({
						message: this.pleaseSelect,
						type: "warning",
					});
					return;
				}
				params.roomIds = roomId;
				if (type == "zaoyin") {
					params.operType = 2;
				} else {
					params.operType = 1;
				}
				params.flag = 1;
				this.$F.doRequest(
					this,
					"/pms/hotel/oper_room_flag",
					params,
					(res) => {
						this.tableData = [];
						this.get_room_list();
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
				params.roomId = item.id;
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_room_oper",
					params,
					(res) => {
						this.tableData = [];
						this.get_room_list();
					}
				);
			},
			// 获取联级选择--房屋类型
			handleChange(value) {
				this.form.roomTypeId = value[1];
			},
			// 获取 楼层房间列表
			get_room_list() {
				this.form.buildingId = this.selectRedio;
				let params = this.form;
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_room_list",
					params,
					(res) => {
						res.list.forEach((item, index) => {
							item.buildingId_name = item.hotelBuilding.name;
							item.buildingFloorId_name =
								item.hotelBuildingFloor.name;
							item.roomTypeId_name = item.hotelRoomType.houseName;
						});
						this.tableData = res.list;
						this.form.totalSize = res.totalSize;
					}
				);
			},
			// 获取 楼层列表
			get_ceng_list() {
				let params = {
					buildingId: this.selectRedio,
				};
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_building_floor_list",
					params,
					(res) => {
						this.cengList = res;
					}
				);
			},
			// 获取 楼栋列表
			get_dong_list() {
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_building_list", {},
					(res) => {
						if (res.length != 0) {
							this.dongList = res;
							this.selectRedio = this.dongList[0].id;
							this.currentDong = this.dongList[0].name;
							this.get_ceng_list();
							this.get_room_list();
						}
					}
				);
			},
			// 选择--获取房型
			get_room_type_list() {
				// debugger
				// this.roomType = []
				this.$F.doRequest(this, "/pms/hotel/room_type_list", {}, (res) => {
					res.roomtype.forEach((item, index) => {
						item.label = item.houseName;
						item.value = item.id;
						this.roomType[0].children.push(item);
					});
					this.roomType[0].label = this.guestRooms;
					res.meetingtype.forEach((item, index) => {
						item.label = item.houseName;
						item.value = item.id;
						this.roomType[1].children.push(item);
					});
					this.roomType[1].label = this.chamber;
					console.log('this.roomType====', this.roomType);
				});
			},
			houseConfirm_delete(value) {
				// debugger
				let params = {
					roomId: value.id,
				};
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_room_delete",
					params,
					(res) => {
						// debugger
						if(res) {
							this.$message({
								message: res,
								type: "warning",
							});
						} else {
							this.$message({
								message: '操作成功',
								type: "success",
							});
						}
						
						this.get_room_list();
					}
				);
			},
			changeShow(e) {
				this.add_show = e;
				this.get_room_list();
			},
			handleSizeChange(val) {
				this.form.pageSize = val;
				this.form.pageIndex = 1;
				this.get_room_list();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.form.pageIndex = val;
				this.get_room_list();
			},
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.row-width {
		width: 120px;
	}

	.boss-index {
		height: 100%;
	}
</style>
