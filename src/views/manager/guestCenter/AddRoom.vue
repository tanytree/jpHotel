<!--
 * @Date: 2020-02-15 21:08:27
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-27 11:14:21
 * @FilePath: /cloudAdmin/src/views/market/productManagement/index.vue
 -->
<template>
    <div id="page1" class="infinite-list-wrapper" style="height: 500px; overflow-y:auto; overflow-x: hidden;">
        <el-row>
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back" content=""></el-page-header>
			</el-row>
			<el-row style="border-top: 1px solid #e5e5e5;padding: 20px 0px;">
				<el-col style="font-size: 13px; font-weight: bolder;">基本信息</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-form :model="selectFrom" :rules="rules" ref="selectFrom" label-width="100px">
					<el-col :span="8">
						<el-form-item label="房型:" prop="roomTypeId">
							<el-select v-model="selectFrom.roomTypeId" placeholder="请选择房型"  style="width: 100%;">
								<el-option :label="value.label" :value="value.value" v-for="(value, index) in roomType" :key="index"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="楼栋:" prop="buildingId">
							<el-select v-model="selectFrom.buildingId" :placeholder="currentDong"  style="width: 100%;">
								<el-option :label="value.name" :value="value.id" v-for="(value, index) in dongList" :key="index"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="楼层:" prop="buildingFloorId">
							<el-select v-model="selectFrom.buildingFloorId" placeholder="请选择楼层"  style="width: 100%;">
								<el-option :label="value.name" :value="value.id" v-for="(value, index) in cengList" :key="index"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="房间号:" prop="houseNum">
							<el-input v-model="selectFrom.houseNum"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="电话分机:" prop="extension">
							<el-input v-model="selectFrom.extension"></el-input>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-row>
				<el-col style="font-size: 13px; font-weight: bolder;">房间构造</el-col>
			</el-row>
			<el-row style="padding: 20px 0px;">
				<el-col style="font-size: 13px;width: 130px;text-align: right;margin-right: 20px;"><span style="color: red;">*</span>房间图片:</el-col>
				<el-upload list-type="picture-card" action="aa" ref="upload" :auto-upload="false" :http-request="uploadFile"
				 multiple :on-preview="handlePictureCardPreview" :on-remove="handleRemove" accept="image/png,image/gif,image/jpg,image/jpeg">
					<i slot="default" class="el-icon-plus"></i>
					<div slot="file" slot-scope="{file}">
						<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
						<span class="el-upload-list__item-actions">
							<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
								<i class="el-icon-zoom-in"></i>
							</span>
							<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
								<i class="el-icon-download"></i>
							</span>
							<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
								<i class="el-icon-delete"></i>
							</span>
						</span>
					</div>
				</el-upload>
				<el-dialog top="0" :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-row>
			<el-row>
				<el-form :model="selectFrom" :rules="rules" ref="selectFrom" label-width="150px">
					<el-form-item label="朝向:" prop="toward">
						<el-row :gutter="20"  class="row-center">
							<el-col :span="20">
								<el-radio-group v-model="selectFrom.toward">
								   <el-radio :label="value.status" v-for="(value, index) in towardList" :key="index">{{value.name}}</el-radio>
								 </el-radio-group>
							 </el-col>
						</el-row>
					</el-form-item>
					<el-form-item label="是否靠近马路:" prop="roadFlag">
						<el-row :gutter="20" class="row-center">
							<el-col :span="20">
								<el-radio-group v-model="selectFrom.roadFlag">
								   <el-radio :label="value.status" v-for="(value, index) in roadFlagList" :key="index">{{value.name}}</el-radio>
								 </el-radio-group>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item label="是否有窗户:" prop="windowFlag">
						<el-row :gutter="20" class="row-center">
							<el-col :span="20">
								<el-radio-group v-model="selectFrom.windowFlag">
								   <el-radio :label="value.status" v-for="(value, index) in windowFlagList" :key="index">{{value.name}}</el-radio>
								 </el-radio-group>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item label="是否无烟房:" prop="smokeFlag">
						<el-row :gutter="20" class="row-center">
							<el-col :span="20">
								<el-radio-group v-model="selectFrom.smokeFlag">
								   <el-radio :label="value.status" v-for="(value, index) in smokeFlagList" :key="index">{{value.name}}</el-radio>
								 </el-radio-group>
							</el-col>
						</el-row>
					</el-form-item>
					<!-- 接口里没有这字段 -->
					<!-- <el-form-item label="状态:" prop="name">
						<el-row :gutter="20" class="row-center">
							<el-col :span="2">
								<el-radio-group v-model="selectFrom.smokeFlag">
								   <el-radio :label="value.status" v-for="(value, index) in smokeFlagList" :key="index">{{value.name}}</el-radio>
								 </el-radio-group>
							</el-col>
						</el-row>
					</el-form-item> -->
					<el-form-item label="是否噪音房:" prop="noiseFlag">
						<el-row :gutter="20" class="row-center">
							<el-col :span="20">
								<el-radio-group v-model="selectFrom.noiseFlag">
								   <el-radio :label="value.status" v-for="(value, index) in noiseFlagList" :key="index">{{value.name}}</el-radio>
								 </el-radio-group>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item label="是否高温房:" prop="temperatureFlag">
						<el-row :gutter="20" class="row-center">
							<el-col :span="20">
								<el-radio-group v-model="selectFrom.temperatureFlag">
								   <el-radio :label="value.status" v-for="(value, index) in temperatureFlagList" :key="index">{{value.name}}</el-radio>
								 </el-radio-group>
							</el-col>
						</el-row>
					</el-form-item>
				</el-form>
			</el-row>
			<el-row>
				<el-button type="primary" style="width: 80px;" @click="saveInfo('selectFrom')">保存</el-button>
				<el-button style="width: 80px;margin-left: 20px;" @click="back">返回</el-button>
			</el-row>
		</el-row>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    export default {
		props:['add_show','selectRedio','currentDong','selectFrom','roomType','dongList'],
        computed: {
            ...mapState({
                user: state => state.user
            }),
        },
        data () {
            return {
				// selectFrom: {
				// 	name: '',
				// 	buildingId: '',
				// 	buildingFloorId:'',
				// 	roomTypeId:'',
				// 	houseNum:'',
				// 	extension:'',
				// 	roomIcon:'',
				// 	toward:1,
				// 	roadFlag:1,
				// 	windowFlag:1,
				// 	smokeFlag:1,
				// 	noiseFlag:1,
				// 	temperatureFlag:1,
				// 	remark:'备注', //为什么备注是必选
				// },
				rules: {
					roomTypeId: [{required: true,message: '请选择房型',trigger: 'blur'}],
					buildingId: [{required: true,message: '请选择楼栋',trigger: 'blur'}],
					buildingFloorId: [{required: true,message: '请选择楼层',trigger: 'blur'}],
					houseNum: [{required: true,message: '请输入房间号',trigger: 'blur'}],
					extension: [{required: true,message: '请输入电话分机',trigger: 'blur'}],
				},
				towardList: [{
					name:'朝南',
					status:1
				},{
					name:'朝北',
					status:2
				},{
					name:'朝东',
					status:3
				},{
					name:'朝西',
					status:4
				}],
				roadFlagList: [{
					name:'是',
					status:1
				},{
					name:'否',
					status:2
				}],
				windowFlagList: [{
					name:'是',
					status:1
				},{
					name:'否',
					status:2
				}],
				smokeFlagList: [{
					name:'是',
					status:1
				},{
					name:'否',
					status:2
				}],
				noiseFlagList: [{
					name:'是',
					status:1
				},{
					name:'否',
					status:2
				}],
				temperatureFlagList: [{
					name:'是',
					status:1
				},{
					name:'否',
					status:2
				}],
				cengList:[],
				formData: {},
				files: {},
				fileList: [],
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false
            }
        },
		watch:{
			buildingId() {
				this.get_ceng_list()
			}
		},
		computed:{
			buildingId() {
				return this.selectFrom.buildingId
			}
		},
        created () {
			this.selectFrom.buildingId = this.selectRedio
        },
        methods: {
			// 选择的图片
			uploadFile(file) {
				this.formData.append('uploadFile', file.file);
			},
			// 选择图片--放大
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			
			},
			handleRemove(file) {
				console.log(file);
			},
			// 保存
			saveInfo(ruleForm) {
				if (this.selectFrom.id) {
					this.selectFrom.roomId = this.selectFrom.id
				}
				this.formData = new FormData()
				let imgList = this.$refs.upload.uploadFiles || [];
				if (imgList.length == 0) {
					return this.$message({
								  message: '请选择房屋图片',
								  type: 'warn'
								});
				}
				this.$refs[ruleForm].validate((valid) => {
					if (valid) {
						this.$F.doUploadBatch(this, imgList, (data) => {
							this.selectFrom.roomIcon = data
							let params = Object.assign({}, this.selectFrom)
							this.$F.doRequest(this, '/pms/hotel/hotel_room_save', params, (res) => {
								this.$message({
								  message: '保存成功',
								  type: 'success'
								});
							})
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//切换到房屋信息
			back() {
				this.add_show = false
				this.$emit('changeShow',this.add_show)
			},
			// 获取 楼层列表
			get_ceng_list() {
				let params = {
					buildingId: this.selectFrom.buildingId
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_building_floor_list', params, (res) => {
					this.cengList = res
				})
			}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.row-center {
		display: flex;
		align-items: center;
	}
</style>
