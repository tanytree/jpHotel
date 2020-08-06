<!-- 房锁维护 -->
<template>
	<div id="page1">
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
			<el-container direction="vertical" class="boss-index">
			<el-row :gutter="20" class="demo-form-inline">
				<el-col :span="10" :offset="14">
					<el-row class="form-inline-flex" style="margin-bottom: 20px;">
						<el-button type="primary" size="mini" @click="popup('addPie')">按列批量修改</el-button>
					</el-row>
				</el-col>
			</el-row>
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
			<div class="block">
				<div class="page-all">
					共
					<span style="font-weight:600;font-size: 14px;">{{form.totalSize}}</span>条记录
				</div>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.pageIndex"
				 :page-sizes="[100, 200, 300, 400]" :page-size="form.pageIndex" layout=" sizes, prev, pager, next, jumper" :total="form.totalSize"></el-pagination>
			</div>
			</el-container>
		</el-row>
		<!-- 按列批量修改 -->
		<el-dialog top="0" title="按列批量修改" :visible.sync="dialogAdd_kinds" :close-on-click-modal="false">
			<el-row class="demo-form-inline">
				<el-checkbox-group v-model="checkList" style="line-height: 30px;">
					<el-checkbox label="硬件"></el-checkbox>
					<el-checkbox label="楼栋"></el-checkbox>
					<el-checkbox label="楼层"></el-checkbox>
					<el-checkbox label="锁号"></el-checkbox>
					<el-checkbox label="接口类型"></el-checkbox>
					<el-checkbox label="门锁配置信息"></el-checkbox>
					<!-- 这是为了显得多，下面的不是ui图上的 -->
					<el-checkbox label="硬件"></el-checkbox>
					<el-checkbox label="楼栋"></el-checkbox>
					<el-checkbox label="楼层"></el-checkbox>
					<el-checkbox label="锁号"></el-checkbox>
					<el-checkbox label="接口类型"></el-checkbox>
					<el-checkbox label="门锁配置信息"></el-checkbox>
				</el-checkbox-group>
			</el-row>
			<el-row>
				<!-- 这里看设计图，因为不一样，根据列不一样展示下拉，输入框，或者单选 -->
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
					<el-table-column prop="name" label="名称" width="150"></el-table-column>
					<el-table-column prop="name" label="设置值">
						<template slot-scope="name">
							<el-input v-model="name"></el-input>
						</template>
					</el-table-column>
				</el-table>
				<div class="block">
					<div class="page-all">
						共
						<span style="font-weight:600;font-size: 14px;">{{form.totalSize}}</span>条记录
					</div>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.pageIndex"
					 :page-sizes="[100, 200, 300, 400]" :page-size="form.pageSize" layout=" sizes, prev, pager, next, jumper" :total="form.totalSize"></el-pagination>
				</div>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改 -->
		<el-dialog top="0" title="修改" :visible.sync="dialogChange_show" :close-on-click-modal="false">
			<el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row class="demo-form-inline">
					<el-col>
						<!-- 得去确认哪些是必填项 -->
						<!-- 详情和修改是一样的，可以将输入框变成不可输入，去掉取消确认按钮 标题变成详情-->
						<el-form-item label="房间号">
							<el-input v-model="ruleForm.houseNum" :disabled="isDisable"></el-input>
						</el-form-item>
						<el-form-item label="楼层">
							<el-input v-model="ruleForm.hotelBuildingFloor.name" :disabled="isDisable"></el-input>
						</el-form-item>
						<el-form-item label="接口类型">
							<el-input v-model="ruleForm.hotelRoomLock.apiType"></el-input>
						</el-form-item>
						<el-form-item label="反开">
							<el-radio-group v-model="ruleForm.hotelRoomLock.openOpposite">
								<el-radio :label="value.status" v-for="(value, index) in is_openOpposite" :key="index">{{value.name}}</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="房间流水号">
							<el-input v-model="ruleForm.hotelRoomLock.roomSerial"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数1">
							<el-input v-model="ruleForm.hotelRoomLock.lockP1"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数3">
							<el-input v-model="ruleForm.hotelRoomLock.lockP3"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数5">
							<el-input v-model="ruleForm.hotelRoomLock.lockP5"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数7">
							<el-input v-model="ruleForm.hotelRoomLock.lockP7"></el-input>
						</el-form-item>
						<el-form-item label="硬件:">
							<el-select v-model="ruleForm.hotelRoomLock.hardware" :placeholder="ruleForm.hotelRoomLock.hardware" style="width: 120px">
								<el-option :label="value.label" :value="value.label"  v-for="(value, index) in hardwareList" :key="index"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col class="margin-l-15">
						<el-form-item label="楼栋">
							<el-input v-model="ruleForm.hotelBuilding.name" :disabled="isDisable"></el-input>
						</el-form-item>
						<el-form-item label="锁号">
							<el-input v-model="ruleForm.hotelRoomLock.lockNum"></el-input>
						</el-form-item>
						<el-form-item label="房间配置信息">
							<el-input v-model="ruleForm.hotelRoomLock.setInfo"></el-input>
						</el-form-item>
						<el-form-item label="锁类型">
							<el-input v-model="ruleForm.hotelRoomLock.lockType"></el-input>
						</el-form-item>
						<el-form-item label="房间序列号">
							<el-input v-model="ruleForm.hotelRoomLock.roomImei"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数2">
							<el-input v-model="ruleForm.hotelRoomLock.lockP2"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数4">
							<el-input v-model="ruleForm.hotelRoomLock.lockP4"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数6">
							<el-input v-model="ruleForm.hotelRoomLock.lockP6"></el-input>
						</el-form-item>
						<el-form-item label="门锁参数8">
							<el-input v-model="ruleForm.hotelRoomLock.lockP8"></el-input>
						</el-form-item>
						<el-form-item label="制卡数">
							<el-input v-model="ruleForm.hotelRoomLock.cardNumber"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
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
				checkList: ['硬件', '楼栋'],
				dialogChange_show: false,
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
				}]
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
						this.dialogAdd_kinds = true
						break
					case 'change':
						this.dialogChange_show = true
						this.isDisable = true
						this.ruleForm = value
						break
				}
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
<style lang="less">
	.row-width {
		width: 120px;
	}
</style>
