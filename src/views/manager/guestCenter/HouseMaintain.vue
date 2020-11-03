<template>
	<!-- 房型维护 -->
	<el-row class="boss-index">
		<el-row v-if="rili_show" class="boss-index">
			<el-tabs class="tabCenter" v-model="active_tag" v-if="tab_show">
				<el-tab-pane :label="$t('manager.hk_guestRoom')" name="one">
					<el-container direction="vertical" class="boss-index">
						<el-row :gutter="20">
							<el-col style="display: flex;justify-content: flex-end;margin: -10px 0 10px;">
								<el-button type="primary" style="width: 100px;" class="submit" size="small" @click="addHouse('house','')">{{$t('commons.newAdd')}}
								</el-button>
							</el-col>
						</el-row>
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="100%" header-row-class-name="default">
							<el-table-column prop="houseName" :label="$t('manager.hk_roomName')"></el-table-column>
							<el-table-column prop="marketPrice" :label="$t('manager.hk_doorPrice')"></el-table-column>
							<el-table-column prop="bedNum" :label="$t('manager.hk_beds')"></el-table-column>
							<el-table-column prop="checkinNum" :label="$t('manager.hk_availabilityPeople')"></el-table-column>
							<el-table-column prop="status" :label="$t('boss.loginDetail_state')">
								<template slot-scope="scope">
									<span>{{scope.row.state==1? $t('commons.enable'): $t('commons.disable')}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="remark" :label="$t('boss.loginDetail_note')"></el-table-column>
							<el-table-column :label="$t('commons.operating')" width="200">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click="stop('kefang', scope.row)">{{scope.row.state==1? $t('commons.disable'): $t('commons.enable')}}
									</el-button>
									<el-button type="text" size="small" @click="addHouse('change', scope.row)">{{$t('commons.modify')}}
									</el-button>
									<el-button type="text" size="small" @click="addHouse('rili', scope.row)">价格日历
									</el-button>
									<el-popconfirm :title="$t('manager.hp_bulletTitle')" @onConfirm="houseConfirm_delete">
										<el-button slot="reference" type="text" size="small" @click="deleteRow(scope.row)">{{$t('commons.delete')}}
										</el-button>
									</el-popconfirm>
								</template>
							</el-table-column>
						</el-table>
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.pageIndex"
						 :page-size="form.pageSize" :total="form.totalSize" layout="total, prev, pager, next, jumper"></el-pagination>
					</el-container>
				</el-tab-pane>
				<el-tab-pane :label="$t('manager.hk_drawingRoomType')" name="two">
					<el-container direction="vertical" class="boss-index">
						<el-row :gutter="20">
							<el-col style="display: flex;justify-content: flex-end;margin: 10px 0px;">
								<el-button type="primary" style="width: 100px;" size="small" @click="addHouse('house', '')">{{$t('commons.newAdd')}}
								</el-button>
							</el-col>
						</el-row>
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="100%" header-row-class-name="default">
							<el-table-column prop="houseName" :label="$t('manager.hk_roomName')"></el-table-column>
							<el-table-column prop="marketPrice" :label="$t('manager.hk_doorPrice')"></el-table-column>
							<el-table-column prop="bedNum" :label="$t('manager.hk_seating')"></el-table-column>
							<el-table-column prop="status" :label="$t('boss.loginDetail_state')">
								<template slot-scope="scope">
									<span>{{scope.row.state==1? $t('commons.enable'): $t('commons.disable')}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="remark" :label="$t('boss.loginDetail_note')"></el-table-column>
							<el-table-column :label="$t('commons.operating')" width="250">
								<template slot-scope="scope">
									<el-button type="text" @click="stop('huiyi', scope.row)">{{scope.row.state==1? $t('commons.disable'):$t('commons.enable')}}
									</el-button>
									<el-button type="text" size="small" @click="addHouse('change', scope.row)">{{$t('commons.modify')}}
									</el-button>
									<el-popconfirm :title="$t('manager.hp_bulletTitle')" @onConfirm="houseConfirm_delete">
										<el-button slot="reference" type="text" size="small" @click="deleteRow(scope.row)">{{$t('commons.delete')}}
										</el-button>
									</el-popconfirm>
								</template>
							</el-table-column>
						</el-table>
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.pageIndex"
						 :page-size="form.pageSize" :total="form.totalSize" layout="total, prev, pager, next, jumper"></el-pagination>
					</el-container>
				</el-tab-pane>
			</el-tabs>
			<div class="infinite-list-wrappers flex_column" v-if="!tab_show">
				<div class="back">
					<el-page-header @back="back" content="新增房型"></el-page-header>
				</div>
				<div class="infinite">
					<!-- 基本信息 -->
					<div class="intitle">{{$t('manager.hk_basicInformation')}}</div>
					<el-form :model="ruleForm" size="small" inline :rules="rules" ref="ruleForm" class="basicForm" label-width="120px">
						<!-- 房型 -->
						<el-form-item :label="$t('manager.hp_room')+':'" prop="houseName">
							<el-input v-model="ruleForm.houseName" class="input"></el-input>
						</el-form-item>

						<!-- 可入住数 -->
						<el-form-item v-if="active_tag == 'one'" :label="$t('manager.hk_availableNum')+':'" prop="checkinNum">
							<el-input v-model="ruleForm.checkinNum" class="input" maxlength="10" type="number"></el-input>
						</el-form-item>

						<!-- 住宿价格 -->
						<el-form-item label="住宿价格">
							<el-row :gutter="20">
								<el-col :span="6">
									<el-button type="primary" plain @click="addHouse('sit')">设定</el-button>
								</el-col>
								<el-col :span="18" v-for="(value, index) in ruleForm_sit" :key="index">{{index+1}}人住宿【{{value.price}}】</el-col>
								<!-- <el-col :span="18" v-if="ruleForm_sit.two">2人住宿【{{ruleForm_sit.two}}】</el-col> -->
							</el-row>
						</el-form-item>

						<!-- 床宽 -->
						<el-form-item v-if="active_tag == 'one'" :label="$t('manager.hk_bedWidth')+'(cm):'" prop="bedSizeH">
							<div class="flex_row">
								<el-input v-model="ruleForm.bedSizeW" :placeholder="$t('manager.hk_longitudinalWidth')" />
								<div class="hr"></div>
								<el-input v-model="ruleForm.bedSizeH" :placeholder="$t('manager.hk_horizontalWidth')" />
							</div>
						</el-form-item>

						<!-- 床位数/座位1 -->
						<el-form-item v-if="active_tag == 'one'" :label="$t('manager.hk_beds')+':'" prop="bedNum">
							<el-input v-model="ruleForm.bedNum" class="input"></el-input>
						</el-form-item>

						<!-- 门市价 -->
						<!-- <el-form-item :label="$t('manager.hk_doorPrice')+':'" prop="marketPrice">
			                <el-input v-model="ruleForm.marketPrice" class="input"></el-input>
			            </el-form-item> -->

						<!-- 优惠价 -->
						<el-form-item v-if="active_tag == 'one'" :label="$t('manager.hk_preferentialPrice')+':'">
							<el-row style="display: flex;align-items: center;">
								<el-input v-model="ruleForm.discountPrice" class="input"></el-input>
								<el-col style="color: #999999;margin-left: 10px;">{{$t('manager.hk_preferentialUse')}}(H5)</el-col>
							</el-row>
						</el-form-item>

						<!-- 房屋面积 -->
						<el-form-item v-if="active_tag == 'one'" :label="$t('manager.hk_roomArea')+'(㎡):'" prop="houseSizeW">
							<div class="flex_row">
								<el-input v-model="ruleForm.houseSizeW" :placeholder="$t('manager.hk_roomAreaLon')" />
								<div class="hr"></div>
								<el-input v-model="ruleForm.houseSizeH" :placeholder="$t('manager.hk_roomAreaHor')" />
							</div>
						</el-form-item>

						<!-- 床型 -->
						<el-form-item v-if="active_tag == 'one'" :label="$t('manager.hk_bedType')+':'" prop="bedType">
							<el-input v-model="ruleForm.bedType" class="input"></el-input>
						</el-form-item>

						<!-- 早餐 -->
						<el-form-item label="早餐">
							<el-select v-model="ruleForm.mealBreakfast" placeholder="请选择">
								<el-option v-for="item in zaocangList" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>

						<!-- 晚餐 -->
						<el-form-item label="晚餐" prop="mealDinner">
							<el-select v-model="ruleForm.mealDinner" placeholder="请选择">
								<el-option v-for="item in wancangList" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>


						<!-- 床位数/座位2 -->
						<el-form-item v-if="active_tag == 'two'" label="早餐" prop="bedNum">
							<el-input v-model="ruleForm.bedNum" class="input"></el-input>
						</el-form-item>


					</el-form>

					<div class="intitle">OTA价格</div>
					<el-form :model="ruleForm" size="small" inline :rules="rules" ref="ruleForm" class="basicForm" label-width="120px">
						<!-- 飞猪价 -->
						<el-form-item label="飞猪价" prop="houseName">
							<el-input v-model="ruleForm.otaFeizhuPrice" class="input"></el-input>
						</el-form-item>

						<!-- 携程价 -->
						<el-form-item label="携程价" prop="houseName">
							<el-input v-model="ruleForm.otaXiechengPrice" class="input"></el-input>
						</el-form-item>

						<!-- 美团价 -->
						<el-form-item label="美团价" prop="houseName">
							<el-input v-model="ruleForm.otaMeituan" class="input"></el-input>
						</el-form-item>

					</el-form>

					<div class="intitle">{{$t('manager.hk_otherInfomation')}}</div>
					<el-form size="small" label-width="120px">
						<el-form-item :label="$t('manager.hk_roomImg')+':'">
							<el-upload list-type="picture-card" action="aa" ref="upload" :file-list="files" :auto-upload="false" multiple
							 accept="image/png, image/gif, image/jpg, image/jpeg">
								<i slot="default" class="el-icon-plus"></i>
								<div slot="file" slot-scope="{file}">
									<img class="el-upload-list__item-thumbnail" :src="file.url" alt />
									<div class="el-upload-list__item-actions">
										<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
											<i class="el-icon-zoom-in"></i>
										</span>
										<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
											<i class="el-icon-delete"></i>
										</span>
									</div>
								</div>
							</el-upload>
							<el-dialog top="0" :visible.sync="dialogVisible">
								<img width="100%" :src="dialogImageUrl" alt />
							</el-dialog>
						</el-form-item>
						<el-form-item :label="$t('boss.loginDetail_note')+':'">
							<el-input type="textarea" :rows="4" style="width: 800px" resize="none" :placeholder="$t('boss.department_placeEnterContent')"
							 v-model="ruleForm.remark"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div class="footer">
					<el-button size="small" type="primary" class="submit" @click="saveInfo('ruleForm')">{{$t('commons.save')}}
					</el-button>
					<el-button size="small" class="white" @click="tab_show = true">{{$t('commons.back')}}</el-button>
				</div>

				<!-- 价格设定 -->
				<el-dialog top="0" :title="jiageSit_title" :visible.sync="jiageSit_show" :close-on-click-modal="false">
					<el-row :gutter="20">
						<el-row style="padding: 10px 95px;color: #909399;">
							<el-col>这里的价格是纯住宿价格，不包含付餐的价格</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" v-for="(value, index) in ruleForm_sit" :key="index">
								<el-row :span="20" style="display: flex;align-items: center;justify-content: center; margin-bottom: 10px;">
									<el-col :span="4" :offest="2">{{index+1}} 人住宿</el-col>
									<el-col :span="18">
										<el-input v-model="value.price" @change="changeInput(value, index)"></el-input>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
						<!-- <el-form :model="ruleForm_sit" :rules="rules" ref="ruleForm_ceng" label-width="150px">
							<el-col :span="20">
								<el-form-item label="2人住宿:" prop="name">
									<el-input :placeholder="$t('boss.department_placeEnterContent')" v-model="ruleForm_sit.two"></el-input>
								</el-form-item>
							</el-col>
						</el-form> -->
					</el-row>
					<span slot="footer" class="dialog-footer">
						<el-button @click="jiageSit_show = false">{{$t('commons.cancel')}}</el-button>
						<el-button type="primary" @click="jiageSit_show = false">{{$t('commons.determine')}}</el-button>
					</span>
				</el-dialog>
			</div>
		</el-row>
		<!-- 价格日历 -->
		<el-row v-else>
			<div class="back">
				<el-page-header @back="backTop"></el-page-header>
			</div>
			<el-row>
				<changeRili></changeRili>
			</el-row>
		</el-row>
	</el-row>
</template>

<script>
	import changeRili from "@/components/changeRili.vue"
	export default {
		components: {
			changeRili
		},
		data() {
			return {
				tab_show: true,
				active_tag: "one",
				tableData: [],
				form: {
					pageIndex: 1,
					pageSize: 10,
					totalSize: 0,
					roomType: 1, //房屋类型  1客房类型  2会议室房型
				},
				ruleForm: {
					roomType: 1, //房屋类型  1客房类型  2会议室房型
					houseName: "",
					marketPrice: "",
					discountPrice: "",
					checkinNum: "", // 入住人数
					bedNum: "",
					bedSizeW: "",
					bedSizeH: "",
					bedSize: "",
					houseSizeW: "",
					houseSizeH: "",
					houseSize: "",
					bedType: "",
					houseIcon: "",
					remark: "",
					personPrice: '', //住宿价格
					mealBreakfast: '',
					mealDinner: '',
					otaFeizhuPrice: '',
					otaXiechengPrice: '',
					otaMeituan: '',
				},
				rules: {
					houseName: [{
						required: true,
						message: this.$t('commons.mustInput'),
						trigger: "blur",
					}, ],
					marketPrice: [{
						required: true,
						message: this.$t('commons.mustInput'),
						trigger: "blur",
					}, ],
					discountPrice: [{
						required: true,
						message: this.$t('commons.mustInput'),
						trigger: "blur",
					}, ],
					checkinNum: [{
						required: true,
						message: this.$t('commons.mustInput'),
						trigger: "blur",
					}, ],
					// bedNum: [
					//   {
					//     required: true,
					//     message: "请输入床位数/座位",
					//     trigger: "blur",
					//   },
					// ],
					// bedSizeH: [
					//   {
					//     required: true,
					//     message: "请输入床宽",
					//     trigger: "blur",
					//   },
					// ],
					houseSizeW: [{
						required: true,
						message: this.$t('commons.mustInput'),
						trigger: "blur",
					}, ],
					houseSizeH: [{
						required: true,
						message: this.$t('commons.mustInput'),
						trigger: "blur",
					}, ],
				},
				selectedInfo: {}, // 选中的某条
				formData: {},
				files: [],
				fileList: [],
				dialogImageUrl: "",
				dialogVisible: false,
				disabled: false,

				zaocangList: [],
				wancangList: [],
				jiageSit_title: '价格设定',
				jiageSit_show: false,
				// checkinNumList: [],
				ruleForm_sit: [],

				rili_show: true, // 是否显示价格日历
			};
		},
		computed: {
			deleteSuccess: {
				get() {
					return this.$t("manager.hk_deleteSuccess");
				},
				set() {},
			},
			selectRoomImg: {
				get() {
					return this.$t("manager.hp_selectRoomImg");
				},
				set() {},
			},
		},
		watch: {
			active_tag() {
				if (this.active_tag == "one") {
					this.form.roomType = 1;
					this.ruleForm.roomType = 1;
					this.get_house_list();
				} else {
					this.form.roomType = 2;
					this.ruleForm.roomType = 2;
					this.get_house_list();
				}
			},
			deleteSuccess(newValue, oldValue) {
				this.deleteSuccess = newValue;
			},
			selectRoomImg(newValue, oldValue) {
				this.selectRoomImg = newValue;
			},
		},
		created() {
			this.get_house_list();
		},
		methods: {
			changeInput(value, index) {
				debugger
				// this.ruleForm_sit[index].price = value
				// this.ruleForm_sit.splice(index, 1, this.ruleForm_sit[index])
			},
			addHouse(type, value) {
				switch (type) {
					case "house":
						this.ruleForm = {};
						this.tab_show = false;
						this.files = [];
						this.get_zaocang_list()
						this.get_wancang_list()
						break;
					case "change":
						this.tab_show = false;
						this.ruleForm = value;
						this.files = [];
						if (value.houseIcon) {
							const arr = value.houseIcon.split(",");
							arr.map((i) => {
								this.files.push({
									url: i
								});
							});
						}
						break;

					case "sit":
						let arr = []
						let obj = {}
						// this.ruleForm.checkinNum.forEach((value, index) =>{
						// 	obj.price = ''
						// 	obj.sid = index
						// 	arr[i] = obj
						// })
						// for (let i = 0; i < this.ruleForm.checkinNum; i++) {
						// 	obj.price = ''
						// 	obj.sid = i
						// 	arr[i] = obj
						// }
						this.ruleForm_sit = arr
						// debugger
						this.jiageSit_show = true
						break;
					case 'rili':
						this.rili_show = false
						break
				}
			},
			// 客房禁用
			stop(type, item) {
				let params = {
					id: item.id,
				};
				if (item.state === 1) {
					params.state = 2;
				} else {
					params.state = 1;
				}
				params.roomTypeId = item.id;
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_room_type_state",
					params,
					(res) => {
						this.tableData = [];
						this.get_house_list();
					}
				);
			},
			// 选择的图片
			uploadFile(file) {
				this.formData.append("uploadFile", file.file);
			},
			// 选择图片--放大
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleRemove(file) {
				this.files = this.files.filter((item) => item.url != file.url);
				this.$refs.upload.uploadFiles = this.$F.deepClone(this.files);
			},
			// 房屋/会议 删除
			houseConfirm_delete(value) {
				let params = {
					roomTypeId: this.selectedInfo.id,
				};
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_room_type_delete",
					params,
					(res) => {
						this.get_house_list();
						this.$message({
							message: this.deleteSuccess,
							type: "success",
						});
					}
				);
			},
			// 保存
			saveInfo(ruleForm) {
				if (this.ruleForm.id) {
					this.ruleForm.roomTypeId = this.ruleForm.id;
				}
				if (this.active_tag == "one") {
					this.form.roomType = 1;
					this.ruleForm.roomType = 1;
					this.get_house_list();
				} else {
					this.form.roomType = 2;
					this.ruleForm.roomType = 2;
				}
				this.formData = new FormData();
				let imgList = this.$refs.upload.uploadFiles || [];
				if (imgList.length == 0) {
					return this.$message({
						message: this.selectRoomImg,
						type: "warn",
					});
				}
				if (this.ruleForm.roomType == 1) {
					if (this.ruleForm_sit == '' || this.ruleForm_sit == null || this.ruleForm_sit == undefined) {
						return this.$message({
							message: '请设定住宿价格',
							type: "warn",
						});
					} else {
						this.ruleForm.personPrice = this.ruleForm_sit.one + ',' + this.ruleForm_sit.two
						if (this.ruleForm.personPrice[0] == ',') {
							this.ruleForm.personPrice = this.ruleForm.personPrice.substring(1, this.ruleForm.personPrice.length - 1)
						}
					}
				} else {
					this.ruleForm.personPrice = this.ruleForm_sit.one + ',' + this.ruleForm_sit.two
					if (this.ruleForm.personPrice[0] == ',') {
						this.ruleForm.personPrice = this.ruleForm.personPrice.substring(1, this.ruleForm.personPrice.length)
					}
				}
				debugger
				this.$refs[ruleForm].validate((valid) => {
					if (valid) {
						this.$F.doUploadBatch(this, imgList, (data) => {
							this.ruleForm.houseIcon = data;
							let params = Object.assign({}, this.ruleForm);
							this.$F.doRequest(
								this,
								"/pms/hotel/hotel_room_type_save",
								params,
								(res) => {
									this.$message({
										message: "Save success",
										type: "success",
									});
									this.tab_show = true;
									this.get_house_list()
								}
							);
						});
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			// 获取 房间类型类型列表
			get_house_list() {
				let params = Object.assign({}, this.form);
				this.$F.doRequest(
					this,
					"/pms/hotel/hotel_room_type_list",
					params,
					(res) => {
						this.tableData = res.list;
						this.form.totalSize = res.totalSize;
					}
				);
			},
			// 获取 早餐类型
			get_zaocang_list() {
				let params = Object.assign({
					mealTime: 1,
					pageIndex: 1,
					pageSize: 999
				}, this.form);
				this.$F.doRequest(
					this,
					"/pms/hotelattachmeal/list",
					params,
					(res) => {
						this.zaocangList = res.list;
					}
				);
			},
			// 获取 早餐类型
			get_wancang_list() {
				let params = Object.assign({
					mealTime: 2,
					pageIndex: 1,
					pageSize: 999
				}, this.form);
				this.$F.doRequest(
					this,
					"/pms/hotelattachmeal/list",
					params,
					(res) => {
						this.wancangList = res.list;
					}
				);
			},
			deleteRow(value) {
				this.selectedInfo = value;
			},
			//切换到房屋/会议
			back() {
				this.tab_show = true;
				this.ruleForm = {};
				this.get_house_list();
			},
			backTop() {
				this.rili_show = true
				this.ruleForm = {};
				this.get_house_list();
			},
			handleSizeChange(val) {
				this.form.pageSize = val;
				this.form.pageIndex = 1;
				this.get_house_list();
			},
			handleCurrentChange(val) {
				this.form.pageIndex = val;
				this.get_house_list();
			},
		},
	};
</script>

<style lang="scss">
	.infinite-list-wrappers {
		height: 100%;
		padding: 10px;
		overflow-x: hidden;

		.back {
			border-bottom: 1px solid #e5e5e5;
			padding: 0 0 10px;
			margin-bottom: 20px;
		}

		.infinite {
			flex: 1;
			overflow: auto;
		}

		.intitle {
			font-size: 14px;
			font-weight: bolder;
			margin-bottom: 20px;
		}

		.basicForm {
			padding: 0 10px;

			.el-form-item {
				.input {
					width: 250px;
				}

				.hr {
					width: 30px;
					height: 1px;
					background: #979797;
					margin: 0 10px;
				}

				.flex_row {
					align-items: center;

					.el-input {
						width: 100px;
					}
				}
			}

		}

		.footer {
			padding: 20px 20px 0;
			border-top: 1px solid #e2e2e2;

			.el-button {
				width: 100px;
			}
		}
	}
</style>
