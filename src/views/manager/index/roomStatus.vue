<template>
	<div>
		<el-row class="demo-form-inline">
			<div class="tag-group">
				<span class="tag-group__title">房态:</span>
                <el-tag effect="plain" class="tag-width2 margin-l2">
                    {{ '全部' + '(' + F_roomStatus('', 'total') + ')' }}
                </el-tag>
                <el-tag v-for="(item,index) in $t('commons.roomStatus')" :key="index" :type="item.type" effect="plain" class="tag-width2 margin-l2">
                    {{ item.name + '(' + F_roomStatus(item.value) + ')' }}
                </el-tag>
			</div>
			<el-form class="demo-form-inline" inline size="small" style="margin-left: 100px;">
				<el-form-item label="楼层楼栋:" class="margin-l">
					<el-select v-model="form.buildingId" placeholder="楼层" class="row-width">
						<el-option :label="value.name" :value="value.id" v-for="(value, index) in dongList" :key="index"></el-option>
					</el-select>
					<el-select v-model="form.buildingFloorId" placeholder="楼层" class="row-width" style="margin-left: 10px;">
						<el-option :label="value.name" :value="value.id" v-for="(value, index) in cengList" :key="index"></el-option>
					</el-select>
					<el-button plain style="width: 100px;margin-left: 30px;">重置</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		<el-row class="demo-form-inline">
			<div class="tag-group">
				<span class="tag-group__title">房型:</span>
                <el-tag effect="plain" class="tag-width2 margin-l2">
                    {{ '全部' + '(' + F_roomStatus('roomType', 'total') + ')' }}
                </el-tag>
				<el-tag v-for="(item, i) in roomInfo.roomTypeList" :key="i" :type="item.roomTypeId" effect="plain" class="tag-width2 margin-l2">
                    {{ (item.houseName || '未知') + '(' + item.total + ')' }}
				</el-tag>
			</div>
		</el-row>
		<el-row>
			<div v-for="(item, i) in rooms_list_info.floorList" :key="i">
				<el-row :gutter="20" style="margin-top: 10px;">
					<el-col :span="4">{{item.hotel_name}} {{item.floor}}层</el-col>
					<el-col :span="1" :offset="0.5" style="color: #999;"><span style="color: #126eff;">{{item.reserveFloorRoomCount}}</span>/{{item.floorRoomCount}}</el-col>
				</el-row>
				<el-row :gutter="20" style="margin-top: 10px;">
					<el-col :span="4" class="tag-margin" :style="`height:120px;background:${value.bgColor}`" v-for="(value, index) in item.roomList"
					 :key="index">
						<el-row style="color: #FFFFFF;font-size: 13px;margin-top: 10px;">
							<el-col :span="3">{{value.houseNum}}</el-col>
							<el-col :span="8" :offset="2">{{value.hotelRoomType.houseName}}</el-col>
						</el-row>
						<!-- 清扫图标后期加 -->
					</el-col>
				</el-row>
			</div>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'one',
				form: {
					roomStatus: '',
					roomTypeId: '',
					buildingId: '',
					buildingFloorId: ''
				},
				dongList: [],
				cengList: [],
				selectRedio: '',
				roomInfo: {},  //筛选区 房间信息
				rooms_list_info: {},
				roomList: [{
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#27ae76'
					},
					{
						hao: 'A001',
						status: 1,
						status_name: '单间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '单间',
						bgColor: '#b07b2e'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#c0512b'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#c0512b'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}
				]
			}
		},
		created() {
			this.get_realtime_room_statistics()
			this.get_dong_list()
		},
		methods: {

			// 获取  实时房态
			get_realtime_room_statistics(value) {
				this.$F.doRequest(this, '/pms/realtime/realtime_room_statistics', {}, (res) => {
					// if(res.roomStatusList.length != 0) {
					// 	res.forEach(item => {
					// 		item.info = 'info'
					// 	})
					// }
					this.roomInfo = res
					this.get_realtime_hotel_room_list()
				})
			},
			// 获取 实时房间列表
			get_realtime_hotel_room_list() {
				let params = Object.assign({}, this.form)
				this.$F.doRequest(this, '/pms/realtime/realtime_hotel_room_list', params, (res) => {
				  debugger
					if(res.floorList.length != 0) {
						res.floorList.forEach(item => {
							item.hotel_name = JSON.parse(sessionStorage.getItem('userData')).storesInfo.storesName
							if (item.roomList.length != 0) {
								item.roomList.forEach(value =>{
									switch(value.hotelRoomType.roomType) {
										case 1:
										value.bgColor = '#276bba'
										break
										case 2:
										value.bgColor = '#c0512b'
										break
										case 3:
										value.bgColor = '#b07b2e'
										break
									}
								})
							}
						})
					}
					this.rooms_list_info = res
				})
			},
			// 获取 楼栋列表
			get_dong_list() {
				this.$F.doRequest(this, '/pms/hotel/hotel_building_list', {}, (res) => {
					this.dongList = res
					this.selectRedio = this.dongList[0].id
					this.currentDong = this.dongList[0].name
					this.get_ceng_list()
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

          F_roomStatus(value, type) {
            let enums = this.roomInfo.roomStatusList || [];
            if (type == 'total') {
              var total = 0;
              if (value == 'roomType')
                enums = this.roomInfo.roomTypeList || [];
              enums.forEach((item)=> {
                total += item.total;
              })
              return total;
            } else {
              var array = enums.filter((item)=> {
                return item.roomStatus == value;
              })
              return array.length > 0 ? array[0].total : 0;
            }

          },
		}
	}
</script>

<style lang="less" scoped>
    .tag-width2 {
        width: 80px;
        display: flex;
        justify-content: center;
    }

    .margin-l2 {
         /*margin-left: 8px;*/
    }

    .tag-margin2 {
        margin-right: 8px;
        margin-top: 8px;
    }

    .row-width2 {
        width: 120px;
    }

</style>
