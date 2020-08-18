<!-- 房锁维护 -->
<template>
	<div id="page1" class="boss-index">
		<el-row :gutter="20" style="font-size: 14px; font-weight: bolder;">
			<el-col :span="2.5">{{hotel_name || ''}}</el-col>
			<el-col :span="2">共有{{dongList.length || ''}}栋楼</el-col>
		</el-row>
		<el-row style="padding: 20px 0px;">
			<el-radio-group v-model="selectRedio">
				<el-radio-button :label="value.id" v-for="(value, index) in dongList" :key="index">{{value.name}}</el-radio-button>
			</el-radio-group>
		</el-row>
		<el-row :gutter="20" class="demo-form-inline">
			<el-col :span="10" :offset="14">
				<el-row class="form-inline-flex" style="margin-bottom: 20px;">
					<el-button type="primary" size="mini" @click="popup('addPie')">按列批量修改</el-button>
				</el-row>
			</el-col>
		</el-row>
		<el-container direction="vertical" class="boss-index">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="100%" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="houseNum" label="房间号"></el-table-column>
				<el-table-column prop="time" label="硬件">
					<template slot-scope="{row}">
						<span>{{row.hotelRoomLock.hardware}}</span>
					</template>
				</el-table-column>
				<el-table-column label="楼栋">
					<template slot-scope="{row}">
						<span>{{row.hotelBuilding.name}}</span>
					</template>
				</el-table-column>
				<el-table-column label="楼层">
					<template slot-scope="{row}">
						<span>{{row.hotelBuildingFloor.name}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="number" label="锁号">
					<template slot-scope="{row}">
						<span>{{row.hotelRoomLock.lockNum}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="part" label="接口类型">
					<template slot-scope="{row}">
						<span>{{row.hotelRoomLock.apiType}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="job" label="房锁配置信息">
					<template slot-scope="{row}">
						<span>{{row.hotelRoomLock.setInfo}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="number" label="制卡数">
					<template slot-scope="{row}">
						<span>{{row.hotelRoomLock.cardNumber}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="part" label="反开">
					<template slot-scope="{row}">
						<span v-if="row.hotelRoomLock.openOpposite">是</span>
						<span v-else>否</span>
					</template>
				</el-table-column>
				<el-table-column prop="setInfo" label="锁类型">
					<template slot-scope="{row}">
						<span>{{row.hotelRoomLock.lockType}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="number" label="房间流水号">
					<template slot-scope="{row}">
						<span>{{row.hotelRoomLock.roomSerial}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="part" label="房间序列号">
					<template slot-scope="{row}">
						<span>{{row.hotelRoomLock.roomImei}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="popup('change', scope.row)">修改</el-button>
						<el-button type="text" size="small" @click="popup('detail', scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-container>
		<div class="block">
			<div class="page-all">
				共
				<span style="font-weight:600;font-size: 14px;">{{form.totalSize}}</span>条记录
			</div>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.pageIndex"
			 :page-sizes="[100, 200, 300, 400]" :page-size="form.pageIndex" layout=" sizes, prev, pager, next, jumper" :total="form.totalSize"></el-pagination>
		</div>
		<!-- 按列批量修改 -->
		<el-dialog top="0" title="按列批量修改" :visible.sync="dialogAdd_kinds" :close-on-click-modal="false">
			<el-row class="demo-form-inline">
				<el-checkbox-group v-model="checkList" style="line-height: 30px;">
					<el-checkbox label="a">硬件</el-checkbox>
					<!-- <el-checkbox label="b">楼栋</el-checkbox>
					<el-checkbox label="c">楼层</el-checkbox> -->
					<el-checkbox label="d">锁号</el-checkbox>
					<el-checkbox label="e">接口类型</el-checkbox>
					<el-checkbox label="f">门锁配置信息</el-checkbox>

					<el-checkbox label="g">制卡数</el-checkbox>
					<el-checkbox label="h">反开</el-checkbox>
					<el-checkbox label="i">锁类型</el-checkbox>
					<el-checkbox label="j">房间流水号</el-checkbox>
					<el-checkbox label="k">房间序列号</el-checkbox>
					<el-checkbox label="l">参数1</el-checkbox>
					
					<el-checkbox label="m">参数2</el-checkbox>
					<el-checkbox label="n">参数3</el-checkbox>
					<el-checkbox label="o">参数4</el-checkbox>
					<el-checkbox label="p">参数5</el-checkbox>
					<el-checkbox label="q">参数6</el-checkbox>
					<el-checkbox label="r">参数7</el-checkbox>
					<el-checkbox label="s">参数8</el-checkbox>
				</el-checkbox-group>
			</el-row>
			<el-row>
				<!-- 这里看设计图，因为不一样，根据列不一样展示下拉，输入框，或者单选 -->
				<el-table ref="multipleTable" :data="tableData_select" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
						<el-table-column label="名称" width="200">
							<template slot-scope="{row, $index}">
								<div v-for="(value, index) in checkList" :key="index">
									<el-row class="demo-flex"   v-if="value =='a'">
										<el-col :span="8" class="title-co">硬件</el-col>
									</el-row>
									<!-- <el-row class="demo-flex"   v-if="value =='b'">
										<el-col :span="8" class="title-co">楼栋</el-col>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='c'">
										<el-col :span="8" class="title-co">楼层</el-col>
									</el-row> -->
									<el-row class="demo-flex"   v-if="value =='d'">
										<el-col :span="8" class="title-co">锁号</el-col>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='e'">
										<el-col :span="8" class="title-co">接口类型</el-col>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='f'">
										<el-col :span="8" class="title-co">门锁配置信息</el-col>
									</el-row>
									
									<el-row class="demo-flex"   v-if="value =='g'">
										<el-col :span="8" class="title-co">制卡数</el-col>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='h'">
										<el-col :span="8" class="title-co">反开</el-col>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='i'">
										<el-col :span="8" class="title-co">锁类型</el-col>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='j'">
										<el-col :span="8" class="title-co">房间流水号</el-col>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='k'">
										<el-col :span="8" class="title-co">房间序列号</el-col>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='l'">
										<el-col :span="8" class="title-co">参数1</el-col>
									</el-row>
									
									<el-row class="demo-flex"   v-if="value =='m'">
										<el-col :span="8" class="title-co">参数2</el-col>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='n'">
										<el-col :span="8" class="title-co">参数3</el-col>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='o'">
										<el-col :span="8" class="title-co">参数4</el-col>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='p'">
										<el-col :span="8" class="title-co">参数5</el-col>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='q'">
										<el-col :span="8" class="title-co">参数6</el-col>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='r'">
										<el-col :span="8" class="title-co">参数7</el-col>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='s'">
										<el-col :span="8" class="title-co">参数8</el-col>
									</el-row>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="设置值">
							<template slot-scope="{row, $index}">
								<div v-for="(value, index) in checkList" :key="index">
									<el-row class="demo-flex"   v-if="value =='a'">
										<el-select v-model="row.hardware" :placeholder="row.hourAddPrice" style="width: 100%;">
											<el-option :label="value.label" :value="value.label"  v-for="(value, index) in hardwareList" :key="index"></el-option>
										</el-select>
									</el-row>
									<!-- <el-row class="demo-flex"   v-if="value =='b'">
										<el-input v-model="row.hourAddPrice"></el-input>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='c'">
										<el-input v-model="row.hourAddPrice"></el-input>
									</el-row> -->
									<el-row class="demo-flex"   v-if="value =='d'">
										<el-input v-model="row.lockNum"></el-input>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='e'">
										<el-input v-model="row.apiType"></el-input>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='f'">
										<el-input v-model="row.setInfo"></el-input>
									</el-row>
									
									<el-row class="demo-flex"   v-if="value =='g'">
										<el-input v-model="row.cardNumber"></el-input>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='h'">
										<el-radio-group v-model="row.openOpposite">
											<el-radio :label="1">是</el-radio>
											<el-radio :label="0">否</el-radio>
										</el-radio-group>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='i'">
										<el-input v-model="row.lockType"></el-input>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='j'">
										<el-input v-model="row.roomSerial"></el-input>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='k'">
										<el-input v-model="row.roomImei"></el-input>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='l'">
										<el-input v-model="row.lockP1"></el-input>
									</el-row>
									
									<el-row class="demo-flex"   v-if="value =='m'">
										<el-input v-model="row.lockP2"></el-input>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='n'">
										<el-input v-model="row.lockP3"></el-input>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='o'">
										<el-input v-model="row.lockP4"></el-input>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='p'">
										<el-input v-model="row.lockP5"></el-input>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='q'">
										<el-input v-model="row.lockP6"></el-input>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='r'">
										<el-input v-model="row.lockP7"></el-input>
									</el-row>
									<el-row class="demo-flex"   v-if="value =='s'">
										<el-input v-model="row.lockP8"></el-input>
									</el-row>
								</div>
							</template>
						</el-table-column>
				</el-table>
				<!-- <div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.pageIndex"
					 :page-sizes="[100, 200, 300, 400]" :page-size="form.pageSize" layout=" sizes, prev, pager, next, jumper" :total="form.totalSize"></el-pagination>
				</div> -->
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="savePi">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改 -->
		<el-dialog top="0" :title="dia_title" :visible.sync="dialogChange_show" :close-on-click-modal="false">
			<el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row class="demo-form-inline">
					<el-col>
						<!-- 得去确认哪些是必填项 -->
						<!-- 详情和修改是一样的，可以将输入框变成不可输入，去掉取消确认按钮 标题变成详情-->
						<el-form-item label="房间号">
							<el-input v-model="ruleForm.houseNum" :disabled="isDisable || detail_show"></el-input>
						</el-form-item>
						<el-form-item label="楼层">
							<el-input v-model="ruleForm.hotelBuildingFloor.name" :disabled="isDisable || detail_show"></el-input>
						</el-form-item>
						<el-form-item label="接口类型">
							<el-input v-model="ruleForm.hotelRoomLock.apiType" :disabled="detail_show"></el-input>
						</el-form-item>
						<el-form-item label="反开">
							<el-radio-group v-model="ruleForm.hotelRoomLock.openOpposite">
								<el-radio :label="value.status" v-for="(value, index) in is_openOpposite" :key="index">{{value.name}}</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="房间流水号">
							<el-input v-model="ruleForm.hotelRoomLock.roomSerial" :disabled="detail_show"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数1">
							<el-input v-model="ruleForm.hotelRoomLock.lockP1" :disabled="detail_show"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数3">
							<el-input v-model="ruleForm.hotelRoomLock.lockP3" :disabled="detail_show"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数5">
							<el-input v-model="ruleForm.hotelRoomLock.lockP5" :disabled="detail_show"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数7">
							<el-input v-model="ruleForm.hotelRoomLock.lockP7" :disabled="detail_show"></el-input>
						</el-form-item>
						<el-form-item label="硬件:">
							<el-select v-model="ruleForm.hotelRoomLock.hardware" :placeholder="ruleForm.hotelRoomLock.hardware" style="width: 120px" :disabled="detail_show">
								<el-option :label="value.label" :value="value.label"  v-for="(value, index) in hardwareList" :key="index"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col class="margin-l-15">
						<el-form-item label="楼栋">
							<el-input v-model="ruleForm.hotelBuilding.name" :disabled="isDisable || detail_show"></el-input>
						</el-form-item>
						<el-form-item label="锁号">
							<el-input v-model="ruleForm.hotelRoomLock.lockNum" :disabled="detail_show"></el-input>
						</el-form-item>
						<el-form-item label="房间配置信息">
							<el-input v-model="ruleForm.hotelRoomLock.setInfo" :disabled="detail_show"></el-input>
						</el-form-item>
						<el-form-item label="锁类型">
							<el-input v-model="ruleForm.hotelRoomLock.lockType" :disabled="detail_show"></el-input>
						</el-form-item>
						<el-form-item label="房间序列号">
							<el-input v-model="ruleForm.hotelRoomLock.roomImei" :disabled="detail_show"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数2">
							<el-input v-model="ruleForm.hotelRoomLock.lockP2" :disabled="detail_show"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数4">
							<el-input v-model="ruleForm.hotelRoomLock.lockP4" :disabled="detail_show"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数6">
							<el-input v-model="ruleForm.hotelRoomLock.lockP6" :disabled="detail_show"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数8">
							<el-input v-model="ruleForm.hotelRoomLock.lockP8" :disabled="detail_show"></el-input>
						</el-form-item>
						<el-form-item label="制卡数">
							<el-input v-model="ruleForm.hotelRoomLock.cardNumber" :disabled="detail_show"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer" v-if="!detail_show">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="defineSingle">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		computed: {
			...mapState({
				user: state => state.user
			}),
		},
		data() {
			return {
				hotel_name: '',
				dongList: [], //楼栋列表
				selectRedio: 0,
				form: {
					pageIndex: 1,
					pageSize: 10,
					buildingId: '',
					totalSize: 0
				},
				tableData: [],
				dialogAdd_kinds: false,
				checkList: [],
				tableData_select: [{
					roomIds: '',
					lockNum: '',
					apiType: '',
					setInfo: '',
					openOpposite: '',
					lockType: '',
					roomSerial: '',
					roomImei: '',
					lockP1: '',
					lockP2: '',
					lockP3: '',
					lockP4: '',
					lockP5: '',
					lockP6: '',
					lockP7: '',
					lockP8: '',
					hardware: '',
					cardNumber: ''
				}],
				dialogChange_show: false,
				dia_title: '修改',
				isDisable: false,
				ruleForm: { //列表选中的行
					houseNum: '',
					hotelBuilding: {
						name: ''
					},
					hotelBuildingFloor: {
						name: ''
					},
					hotelRoomLock: {
						roomIds: '',
						lockNum: '',
						apiType: '',
						setInfo: '',
						openOpposite: '',
						lockType: '',
						roomSerial: '',
						roomImei: '',
						lockP1: '',
						lockP2: '',
						lockP3: '',
						lockP4: '',
						lockP5: '',
						lockP6: '',
						lockP7: '',
						lockP8: '',
						hardware: '',
						cardNumber: ''
					}
				},
				is_openOpposite: [{ // 是否反开
					name: '是',
					status: 1
				}, {
					name: '否',
					status: 2
				}],
				hardwareList: [{ // 硬件类型列表
					label: '双峰'
				}],
				detail_show: false //展示详情时的
			}
		},
		watch: {
			selectRedio() {
				this.hotel_room_lock_list()
			},
		},
		created() {
			this.hotel_name = JSON.parse(sessionStorage.getItem('userData')).storesInfo.storesName
			this.get_dong_list()
		},
		methods: {
			popup(type, value) {
				switch (type) {
					case 'addPie':
						this.checkList = []
						this.dialogAdd_kinds = true
						break
					case 'change':
						this.dialogChange_show = true
						this.isDisable = true
						this.ruleForm = value
						this.detail_show = false
						this.dia_title = '修改'
						break
					case 'detail':
						this.dialogChange_show = true
						this.isDisable = true
						this.ruleForm = value
						this.detail_show = true
						this.dia_title = '详情'
						break
				}
			},
			// 批量修改--保存
			savePi() {
				let params = {}
				let roomIds = ''
				this.tableData_select.forEach(item =>{
					params = item
				})
				this.tableData.forEach(item =>{
					roomIds = roomIds + ',' + item.id
				})
				if (roomIds.substr(0, 1) === ',') {
				  roomIds = roomIds.substr(1)
				}
				params.roomIds = roomIds
				params.status = 1
				debugger
				this.$F.doRequest(this, '/pms/hotel/hotel_room_lock_save', params, (res) => {
					this.$message({
					  message: '保存成功',
					  type: 'success'
					});
					this.dialogAdd_kinds = false
				})
			},
			// 修改
			defineSingle() {
				let params =  Object.assign({},this.ruleForm.hotelRoomLock)
				params.roomIds = this.ruleForm.id
				params.status = 1
				this.$F.doRequest(this, '/pms/hotel/hotel_room_lock_save', params, (res) => {
					this.$message({
					  message: '保存成功',
					  type: 'success'
					});
					this.dialogChange_show = false
				})
			},
			// 获取 楼栋列表
			get_dong_list() {
				this.$F.doRequest(this, '/pms/hotel/hotel_building_list', {}, (res) => {
					if (res.length != 0) {
						this.dongList = res
						this.selectRedio = this.dongList[0].id
						this.hotel_room_lock_list()
					}
				})
			},
			// 获取 房间门锁列表
			hotel_room_lock_list() {
				// debugger
				this.form.buildingId = this.selectRedio
				let params = Object.assign({}, this.form)
				this.$F.doRequest(this, '/pms/hotel/hotel_room_lock_list', params, (res) => {
					if (res.length != 0) {
						this.tableData = res.list
					}
				})
			},
			handleSizeChange(val) {
				this.form.pageSize = val;
				this.form.pageIndex = 1;
				this.hotel_room_lock_list();
			},
			handleCurrentChange(val) {
				this.form.pageIndex = 1;
				this.hotel_room_lock_list();
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.row-width {
		width: 120px;
	}
	.boss-index {
		height: 100%;
	}
	.demo-flex {
		display: flex;
		align-items: center;
		margin-top: 10px;
	}
	.title-co {
		color: #126EFF;
		width: 100%;
	}
</style>
