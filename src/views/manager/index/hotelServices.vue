<template>
	<div class="boss-index">
		<div class="content">
			<div class="hotelTitle">酒店图片</div>
			<div class="hotelBox uploadBox">
				<el-upload list-type="picture-card" action="aa"
                           ref="upload"
                           :file-list="hotelData.files"
                           :auto-upload="false"
                           multiple
                           accept="image/png,image/gif,image/jpg,image/jpeg">
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
				<el-dialog title="图片" top="0" :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>
			<div class="hotelTitle">酒店信息</div>
			<el-form :model="hotelData" :rules="hotelRule" class="hotelBox" size="small" ref="ruleForm" label-width="100px">
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
			<el-form :model="hotelData" :rules="hotelRule" class="hotelBox area" size="small" ref="ruleForm" label-width="100px">
				<el-form-item label="酒店简介：" prop="remark">
					<el-input type="textarea" resize="none" :rows="5" placeholder="请输入简介" v-model="hotelData.remark"></el-input>
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
					startTime: [{ type: 'date', required: true, message: '请选择入住时间', trigger: 'blur' }],
					endTime: [{ type: 'date', required: true, message: '请选择离店时间', trigger: 'blur' }],
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
				// this.formData.append('uploadFile', file.file);
			},
			// 选择图片--放大
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleRemove(file) {
				this.hotelData.files = this.hotelData.files.filter(item => item.url != file.url);
				this.$refs.upload.uploadFiles = this.$F.deepClone(this.hotelData.files);
			},
			// 保存
			submit() {
				const a = this;
				if (a.hotelData.id) {
					a.hotelData.roomId = a.hotelData.id
				}
				a.formData = new FormData()
				let imgList = a.$refs.upload.uploadFiles || [];
				if (imgList.length == 0) {
					return a.$message.warning('请选择房屋图片');
				}
				a.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						a.$F.doUploadBatch(a, imgList, (data) => {
							a.hotelData.imgPath = data
							let params = Object.assign({}, a.hotelData)
							a.$F.doRequest(a, '/pms/hotelservice/edit', params, (res) => {
								a.initData()
								a.$message({message: '保存成功', type: 'success'});
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
				margin-bottom: 20px;
			}
			.hotelBox + .hotelTitle {
				border-top: 1px solid #e2e2e2;
				padding-top: 20px;
			}
			.hotelBox {
				margin-bottom: 20px;

				&.area .el-form-item {
					width: 100%;
					display: block;
				}

				.el-form-item {
					width: 30%;
					display: inline-block;
					margin-right: 10px;

					.el-input {
						display: block;
						width: 240px;
					}
					.el-textarea {
						display: block;
					}
				}
			}
		}

		.footer {
			border-top: 1px solid #e2e2e2;
			line-height: 60px;
			padding: 0 20px;
		}
	}
</style>
