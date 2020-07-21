<template>
	<!-- 房型维护 -->
	<el-row>
		<el-tabs v-model="active_tag" v-if="tab_show">
			<el-tab-pane label="客房房型" name="one">
				<el-row :gutter="20">
					<el-col style="display: flex;justify-content: flex-end;margin: 10px 0px;">
						<el-button type="primary" style="width: 100px;" size="small" @click="addHouse('house','')">新增</el-button>
					</el-col>
				</el-row>
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#e6eaed',color:'#1E1E1E'}">
					<el-table-column prop="houseName" label="房型名称"></el-table-column>
					<el-table-column prop="marketPrice" label="门市价"></el-table-column>
					<el-table-column prop="bedNum" label="床位数"></el-table-column>
					<el-table-column prop="checkinNum" label="可入住人"></el-table-column>
					<el-table-column prop="status" label="状态"></el-table-column>
					<el-table-column prop="remark" label="备注"></el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button type="text" size="small">禁用</el-button>
							<el-button type="text" size="small" @click="addHouse('change', scope.row)">修改</el-button>
							<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="houseConfirm_delete">
								<el-button slot="reference" type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="form.pageIndex"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="form.pageSize"
                    :total="form.totalSize"
                    layout="total, sizes, prev, pager, next, jumper"
                ></el-pagination>
			</el-tab-pane>
			<el-tab-pane label="会客厅房型" name="two">
				<el-row :gutter="20">
					<el-col :span="6" :offset="20">
						<el-button type="primary" style="width: 100px;" size="small" @click="addHouse('house', '')">新增</el-button>
					</el-col>
				</el-row>
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
					<el-table-column prop="houseName" label="房型名称"></el-table-column>
					<el-table-column prop="marketPrice" label="门市价"></el-table-column>
					<el-table-column prop="bedNum" label="座位数"></el-table-column>
					<el-table-column prop="status" label="状态"></el-table-column>
					<el-table-column prop="remark" label="备注"></el-table-column>
					<el-table-column label="操作" width="250">
						<template slot-scope="scope">
							<el-button type="text" size="small">禁用</el-button>
							<el-button type="text" size="small" @click="addHouse('change', scope.row)">修改</el-button>
							<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="houseConfirm_delete">
								<el-button slot="reference" type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="form.pageIndex"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="form.pageSize"
                    :total="form.totalSize"
                    layout="total, sizes, prev, pager, next, jumper"
                ></el-pagination>
			</el-tab-pane>
		</el-tabs>
		<div class="infinite-list-wrapper" style="height: 500px; overflow-y:auto; overflow-x: hidden;" v-if="!tab_show">
			<el-row>
				<el-row style="padding: 20px 0px;">
					<el-page-header @back="back" content=""></el-page-header>
				</el-row>
				<el-row style="border-top: 1px solid #e5e5e5;padding: 20px 0px;">
					<el-col style="font-size: 13px; font-weight: bolder;">基本信息</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
						<el-col :span="6">
							<el-form-item label="房型:" prop="houseName">
								<el-input v-model="ruleForm.houseName" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="门市价:" prop="marketPrice">
								<el-input v-model="ruleForm.marketPrice" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="9" v-if="active_tag == 'one'">
							<el-form-item label="优惠价:" prop="discountPrice">
								<el-row style="display: flex;align-items: center;">
									<el-input v-model="ruleForm.discountPrice" style="width: 200px;"></el-input>
									<el-col style="color: #999999;margin-left: 10px;">优惠价用于网上酒店预订(H5)</el-col>
								</el-row>
							</el-form-item>
						</el-col>
						<el-col :span="6" v-if="active_tag == 'one'">
							<el-form-item label="可入住数:" prop="checkinNum">
								<el-input v-model="ruleForm.checkinNum" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
						<!-- 床位数/座位 -->
						<el-col :span="6" v-if="active_tag == 'one'">
							<el-form-item label="床位数:" prop="bedNum">
								<el-input v-model="ruleForm.bedNum" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6" v-if="active_tag == 'two'">
							<el-form-item label="座位数:" prop="bedNum">
								<el-input v-model="ruleForm.bedNum" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" v-if="active_tag == 'one'">
							<el-form-item label="床宽(cm):" prop="bedSizeH">
								<el-row style="display: flex;align-items: center;">
									<el-input v-model="ruleForm.bedSizeW" placeholder="纵向宽" style="width: 100px;" />
									<el-col style="width: 30px;height: 1px; background: #CCCCCC;margin: 0px 10px;"></el-col>
									<el-input v-model="ruleForm.bedSizeH" placeholder="横向宽" style="width: 100px;" />
								</el-row>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="active_tag == 'one'">
							<el-form-item label="房屋面积(㎡):" prop="houseSizeW">
								<el-row style="display: flex;align-items: center;">
									<el-input v-model="ruleForm.houseSizeW" placeholder="房屋面积纵向" style="width: 100%;" />
									<el-col style="width: 30px;height:  1px; background: #CCCCCC;margin: 0px 10px;"></el-col>
									<el-input v-model="ruleForm.houseSizeH" placeholder="房屋面积横向" style="width: 100%;" />
								</el-row>
							</el-form-item>
						</el-col>
						<el-col :span="6" v-if="active_tag == 'one'">
							<el-form-item label="床型:" prop="bedType">
								<el-input v-model="ruleForm.bedType" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
					</el-form>
				</el-row>
				<el-row>
					<el-col style="font-size: 13px; font-weight: bolder;">其他信息</el-col>
				</el-row>
				<el-row :gutter="22" style="padding: 20px 0px;">
					<el-col :span="2" style="font-size: 14px;">房型图片:</el-col>
					<el-col :span="20">
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
					</el-col>
					<el-dialog top="0" :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-row>
				<el-row :gutter="22" class="demo-form-inline">
					<el-col :span="2" style="font-size: 14px;">备注:</el-col>
					<el-col :span="20">
						<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="ruleForm.remark" style="width: 100%;"></el-input>
					</el-col>
				</el-row>
				<el-row style="padding: 20px 0px;">
					<el-button type="primary" style="width: 80px;" @click="saveInfo('ruleForm')">保存</el-button>
					<el-button style="width: 80px;margin-left: 20px;" @click="tab_show = true">返回</el-button>
				</el-row>
			</el-row>
		</div>
	</el-row>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				tab_show: true,
				active_tag: 'one',
				tableData: [],
				form: {
					pageIndex: 1,
					pageSize: 10,
					totalSize: '',
					roomType: 1 //房屋类型  1客房类型  2会议室房型
				},
				ruleForm: {
					roomType: 1, //房屋类型  1客房类型  2会议室房型
					houseName: '',
					marketPrice: '',
					discountPrice: '',
					checkinNum: '',
					bedNum: '',
					bedSizeW: '',
					bedSizeH: '',
					bedSize:'',
					houseSizeW: '',
					houseSizeH: '',
					houseSize:'',
					bedType: '',
					houseIcon: '',
					remark: ''
				},
				rules: {
					houseName: [{
						required: true,
						message: '请输入房型',
						trigger: 'blur'
					}],
					marketPrice: [{
						required: true,
						message: '请输入门市价',
						trigger: 'blur'
					}],
					discountPrice: [{
						required: true,
						message: '请输入优惠价',
						trigger: 'blur'
					}],
					checkinNum: [{
						required: true,
						message: '请输入可入住数',
						trigger: 'blur'
					}],
					bedNum: [{
						required: true,
						message: '请输入床位数/座位',
						trigger: 'blur'
					}],
					bedSizeH: [{
						required: true,
						message: '请输入床宽',
						trigger: 'blur'
					}],
					houseSizeW: [{
						required: true,
						message: '请输入房屋面积',
						trigger: 'blur'
					}],
					houseSizeH: [{
						required: true,
						message: '请输入房屋面积',
						trigger: 'blur'
					}],
					bedType: [{
						required: true,
						message: '请输入床型',
						trigger: 'blur'
					}]
				},
				selectedInfo:{}, // 选中的某条
				formData: {},
				files: {},
				fileList: [],
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false
			}
		},
		watch: {
			active_tag() {
				if (this.active_tag == 'one') {
					this.form.roomType = 1
					this.ruleForm.roomType = 1
					this.get_house_list()
				} else {
					this.form.roomType = 2
					this.ruleForm.roomType = 2
					this.get_house_list()
				}
			},
		},
		created() {
			this.get_house_list()
		},
		methods: {
			addHouse(type, value) {
				debugger
				switch (type) {
					case 'house':
						this.ruleForm = {}
						this.tab_show = false
						break;
					case 'change':
						this.tab_show = false
						this.ruleForm = value
						let img_list = value.houseIcon.split(',')
						break;
				}
			},
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
			// 房屋/会议 删除
			houseConfirm_delete(value) {
				let params = {
					roomTypeId: this.selectedInfo.id
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_room_type_delete', params, (res) => {
					this.$message({
					  message: '删除成功',
					  type: 'success'
					});
				})
			},
			// 保存
			saveInfo(ruleForm) {
				if (this.ruleForm.id) {
					this.ruleForm.roomTypeId = this.ruleForm.id
				}
				if (this.active_tag == 'one') {
					this.form.roomType = 1
					this.ruleForm.roomType = 1
					this.get_house_list()
				} else {
					this.form.roomType = 2
					this.ruleForm.roomType = 2
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
							this.ruleForm.houseIcon = data
							let params = Object.assign({}, this.ruleForm)
							this.$F.doRequest(this, '/pms/hotel/hotel_room_type_save', params, (res) => {
								this.$message({
								  message: '增加成功',
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
			// 获取 房间类型类型列表
			get_house_list() {
				let params = Object.assign({}, this.form)
				this.$F.doRequest(this, '/pms/hotel/hotel_room_type_list', params, (res) => {
					this.tableData = res.list
					this.form.totalSize = res.totalSize
				})
			},
			deleteRow(value) {
				this.selectedInfo = value
			},
			//切换到房屋/会议
			back() {
				this.tab_show = true
				this.ruleForm = {}
				this.get_house_list()
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

<style>
</style>
