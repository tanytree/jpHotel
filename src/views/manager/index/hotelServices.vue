<template>
	<div class="boss-index">
		<div class="content">
			<div class="hotelTitle">酒店图片</div>
			<div class="box uploadBox">
				<el-upload list-type="picture-card" action="aa" ref="upload" :auto-upload="false" :http-request="uploadFile" multiple accept="image/png,image/gif,image/jpg,image/jpeg">
					<i slot="default" class="el-icon-plus"></i>
					<div slot="file" slot-scope="{file}">
						<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
						<span class="el-upload-list__item-actions">
							<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
								<i class="el-icon-zoom-in"></i>
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
			</div>
			<div class="hotelTitle">酒店信息</div>
			<el-form :model="hotelData" :rules="hotelRule" class="box" inline size="small" ref="ruleForm" label-width="100px">
				<el-form-item label="酒店名称：" prop="name">
					<el-input v-model="hotelData.name"></el-input>
				</el-form-item>
				<el-form-item label="酒店地址：" prop="address">
					<el-input v-model="hotelData.address"></el-input>
				</el-form-item>
				<el-form-item label="前台电话：" prop="phone">
					<el-input v-model="hotelData.phone"></el-input>
				</el-form-item>
				<el-form-item label="入住时间：" prop="startTime">
					<el-date-picker v-model="hotelData.startTime" type="datetime"></el-date-picker>
				</el-form-item>
				<el-form-item label="退房时间：" prop="endTime">
					<el-date-picker v-model="hotelData.endTime" type="datetime"></el-date-picker>
				</el-form-item>
			</el-form>
			<div class="hotelTitle">酒店简介</div>
			<el-form :model="hotelData" :rules="hotelRule" class="box" size="small" ref="ruleForm" label-width="100px">
				<el-form-item label="酒店简介：" prop="remark">
					<el-input type="textarea" :rows="5" placeholder="请输入简介" v-model="hotelData.remark"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="footer">
			<el-button type="primary" class="submit" @click="submit">保存</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				hotelRule: {
					name: [{ required: true, message: '请输入酒店名称', trigger: 'blur' }],
					address: [{ required: true, message: '请输入酒店地址', trigger: 'blur' }],
					phone: [{ type: 'date', required: true, message: '请输入电话', trigger: 'blur' }],
					startTime: [{ type: 'date', required: true, message: '请选择入住时间', trigger: 'change' }],
					endTime: [{ type: 'date', required: true, message: '请选择离店时间', trigger: 'change' }],
					remark: [{ required: true, message: '请输入酒店简介', trigger: 'blur' }],
				},
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false,
			}
		},
		props: {hotelData: Object, initData: Function},
		methods: {
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
			submit() {
				if (this.hotelData.id) {
					this.hotelData.roomId = this.hotelData.id
				}
				this.formData = new FormData()
				let imgList = this.$refs.upload.uploadFiles || [];
				if (imgList.length == 0) {
					return this.$message({
						message: '请选择房屋图片',
						type: 'warn'
					});
				}
				this.$refs['hotelRule'].validate((valid) => {
					if (valid) {
						this.$F.doUploadBatch(this, imgList, (data) => {
							this.hotelData.imgPath = data
							let params = Object.assign({}, this.hotelData)
							this.$F.doRequest(this, '/pms/hotelservice/edit', params, (res) => {
								this.initData()
								this.$message({message: '保存成功', type: 'success'});
							})
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.boss-index {
		padding: 10px;
		display: flex;
		flex-direction: column;

		.content {
			flex: 1;

			.hotelTitle {
				font-size: 16px;
				font-weight: bold;
				color: #333333;
				line-height: 30px;
				margin-bottom: 20px;
			}
			.box + .hotelTitle {
				border-top: 1px solid #e2e2e2;
				padding-top: 20px;
			}
		}

		.footer {
			border-top: 1px solid #e2e2e2;
			line-height: 60px;
			padding: 0 20px;
		}
	}
</style>
