<!-- 房屋信息 -->
<template>
	<div id="page1" class="boss-index">
		<el-row v-if="!add_show">
			<el-row :gutter="20" style="font-size: 14px; font-weight: bolder;">
				<el-col :span="2.5">{{hotel_name || ''}}</el-col>
				<el-col :span="2">共有{{dongList.length || ''}}栋楼</el-col>
			</el-row>
			<el-row style="padding: 20px 0px;">
				<el-radio-group v-model="selectRedio">
					<el-radio-button :label="value.id" v-for="(value, index) in dongList" :key="index">{{value.name}}</el-radio-button>
				</el-radio-group>
			</el-row>
			<el-row>
				<el-row :gutter="20" class="demo-form-inline">
					<el-col :span="14">
						<el-form class="demo-form-inline" inline size="small">
							<el-form-item label="楼层全称:" class="margin-l-15">
								<el-select v-model="form.buildingFloorId" style="width: 120px">
                                    <el-option label="全部" value="">全部</el-option>
									<el-option :label="value.name" :value="value.id" v-for="(value, index) in cengList" :key="index"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="房型:">
								<el-cascader v-model="form.roomTypeId" :options="roomType" @change="handleChange" style="width: 180px"></el-cascader>
							</el-form-item>
							<el-form-item label="房间号:" class="margin-l-15">
								<el-input v-model="form.houseNum" :placeholder="form.houseNum_name" style="width: 120px"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" size="mini" style="width: 80px;" @click="search_list()">查询</el-button>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="10">
						<el-row class="form-inline-flex" style="margin-bottom: 20px;">
							<el-button type="primary" size="mini" @click="addRoom('add', '')">新增房间</el-button>
							<el-button type="primary" size="mini">批量启用</el-button>
							<el-button type="primary" size="mini" @click="popup('change')">批量禁用</el-button>
							<el-button type="primary" size="mini">批量噪音房</el-button>
							<el-button type="primary" size="mini">批量高温房</el-button>
						</el-row>
					</el-col>
				</el-row>
				<el-container direction="vertical" class="boss-index">
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="100%" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="houseNum" label="房间号"></el-table-column>
					<el-table-column prop="roomTypeId_name" label="房型名称"></el-table-column>
					<el-table-column prop="buildingId" label="楼栋">
                        <template slot-scope="{row}">
                            <span>
                                {{dongList.filter((item)=>{
                                  return item.id == row.buildingId
                                })[0].name}}
                            </span>
                        </template>
                    </el-table-column>
					<el-table-column prop="buildingFloorId" label="楼层">
                        <template slot-scope="{row}">
                            <span>
                                {{cengList.filter((item)=>{
                                  return item.id == row.buildingFloorId
                                })[0].name}}
                            </span>
                        </template>
                    </el-table-column>
					<el-table-column prop="extension" label="电话分机"></el-table-column>
					<el-table-column prop="toward" label="朝向">
                        <template slot-scope="{row}">
                            <span>{{$t('commons.toward')[row.toward]}}</span>
                        </template>
                    </el-table-column>
					<el-table-column prop="roadFlag" label="是否靠马路">
                        <template slot-scope="{row}">
                            <span v-if="row.roadFlag == 1">是</span>
                            <span v-if="row.roadFlag == 0">否</span>
                        </template>
                    </el-table-column>
					<el-table-column prop="windowFlag" label="是否有窗">
                        <template slot-scope="{row}">
                            <span v-if="row.windowFlag == 1">是</span>
                            <span v-if="row.windowFlag == 0">否</span>
                        </template>
                    </el-table-column>
					<el-table-column prop="state" label="状态">
                        <template slot-scope="{row}">
                            <span v-if="row.state == 1">启用</span>
                            <span v-if="row.state == 0">禁用</span>
                        </template>
                    </el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="popup('detail')">禁用</el-button>
							<el-button type="text" size="small" @click="addRoom('change', scope.row)">修改</el-button>
							<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="houseConfirm_delete(scope.row)">
								<el-button slot="reference" type="text" size="small">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
				<!-- <div class="block">
					<div class="page-all">
						共
						<span style="font-weight:600;font-size: 14px;">400</span>条记录
					</div>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1"
					 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout=" sizes, prev, pager, next, jumper" :total="400"></el-pagination>
				</div> -->
				</el-container>
			</el-row>
		</el-row>
		<el-row v-if="add_show">
			<AddRoom ref="AddRoom" :selectRedio="selectRedio" :currentDong="currentDong" :selectFrom="selectFrom" :roomType="roomType" :dongList="dongList" :add_show="add_show"
			 @changeShow="changeShow"></AddRoom>
		</el-row>
	</div>
</template>

<script>
	import HouseMaintain from './HouseMaintain'
	import BuildingFloor from './BuildingFloor'
	import AddRoom from './AddRoom'
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		components: {
			HouseMaintain,
			BuildingFloor,
			AddRoom
		},
		computed: {
			...mapState({
				user: state => state.user
			}),
		},
		data() {
			return {
				hotel_name: '',
				selectRedio: 0,
				currentDong: '',
				form: {
					buildingFloorId: '',
					roomTypeId: '',
					houseNum: '',
					pageIndex: '1',
					pageSize: '10'
				},
				dongList: [], //楼栋列表
				cengList: [], // 楼层列表
				tableData: [],
				options: [{
					value: 'zhinan',
					label: '指南',
					children: [{
						value: 'shejiyuanze',
						label: '设计原则',
						children: [{
							value: 'yizhi',
							label: '一致'
						}]
					}]
				}],
				selectFrom: {},
				add_show: false,
				roomType: [{
					label:'客房',
					value:'1',
					children:[]
				},{
					label:'会议厅',
					value:'2',
					children:[]
				}]
			}
		},
		watch: {
			selectRedio() {
				this.get_ceng_list()
				this.get_room_list()
			},
		},
		created() {
			this.hotel_name = JSON.parse(sessionStorage.getItem('userData')).storesInfo.storesName
			this.get_dong_list()
			this.get_room_type_list()
		},
		methods: {
			addRoom(type, value) {
				debugger
				switch (type) {
					case 'add':
						this.selectFrom = {
							name: '',
							buildingId: '',
							buildingId_name:'',
							buildingFloorId:'',
							buildingFloorId_name:'',
							roomTypeId:'',
							roomTypeId_name:'',
							houseNum:'',
							extension:'',
							roomIcon:'',
							toward:1,
							roadFlag:1,
							state:1,
							windowFlag:1,
							smokeFlag:1,
							noiseFlag:1,
							temperatureFlag:1,
							remark:'备注', //为什么备注是必选
						}
						this.add_show = true
						break;
					case 'change':
						this.add_show = true
						this.selectFrom = value
						break;
				}
			},
			search_list() {
				this.get_room_list()
			},
			// 获取联级选择--房屋类型
			handleChange(value) {
				this.form.roomTypeId = value[1]
			},
			// 获取 楼层房间列表
			get_room_list() {
				this.form.buildingId = this.selectRedio
				let params = this.form
				this.$F.doRequest(this, '/pms/hotel/hotel_room_list', params, (res) => {
					res.list.forEach((item, index) =>{

						item.buildingId_name = item.hotelBuilding.name
						item.buildingFloorId_name = item.hotelBuildingFloor.name
						item.roomTypeId_name = item.hotelRoomType.houseName
					})
					this.tableData = res.list
				})
			},
			// 获取 楼层列表
			get_ceng_list() {
				let params = {
					buildingId: this.selectRedio
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_building_floor_list', params, (res) => {
					this.cengList = res
				})
			},
			// 获取 楼栋列表
			get_dong_list() {
				this.$F.doRequest(this, '/pms/hotel/hotel_building_list', {}, (res) => {
					if (res.length != 0) {
						this.dongList = res
						this.selectRedio = this.dongList[0].id
						this.currentDong = this.dongList[0].name
						this.get_ceng_list()
						this.get_room_list()
					}
				})
			},
			// 选择--获取房型
			get_room_type_list() {
				// debugger
				this.$F.doRequest(this, '/pms/hotel/room_type_list', {}, (res) => {
					// debugger
					res.roomtype.forEach((item, index) =>{
						item.label = item.houseName
						item.value = item.id
						this.roomType[0].children.push(item)
					})
					res.meetingtype.forEach((item, index) =>{
						item.label = item.houseName
						item.value = item.id
						this.roomType[1].children.push(item)
					})
					console.log(this.roomType)
				})
			},
			houseConfirm_delete(value) {
				let params = {
					roomId: value.id
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_room_delete', params, (res) => {
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.get_room_list()
				})
			},
			changeShow(e) {
				this.add_show = e
				this.get_room_list()
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.row-width {
		width: 120px;
	}
</style>
