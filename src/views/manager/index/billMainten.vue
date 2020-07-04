<template>
	<div>
		<el-row>
			<el-tabs v-model="activeThree">
				<el-tab-pane label="开票信息设置" name="a">
					<el-row :gutter="20">
						<el-form :model="threeForm" :rules="threerules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
							<el-col :span="8">
								<el-form-item label="纳税人识别号:" prop="name">
									<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="税控盘口令:" prop="name">
									<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="税务数字证书密码:" prop="name">
									<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="电子设备类型:" prop="name">
									<el-select v-model="threeForm.kinds" placeholder="请电子设备类型" style="width: 200px;">
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="电子税控盘编号:" prop="name">
									<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="电子开票点编号:" prop="name">
									<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="纸质设备类型:" prop="name">
									<el-select v-model="threeForm.kinds" placeholder="请电子设备类型" style="width: 200px;">
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="纸质开票点编码:" prop="name">
									<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="国家商品编码:" prop="name">
									<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="税率:" prop="name">
									<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="开票人:" prop="name">
									<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="是否允许:" prop="name">
									<el-checkbox v-model="checked">是否允许开票金额超过消费金额</el-checkbox>
								</el-form-item>
							</el-col>
						</el-form>
					</el-row>
					<el-row>
						<el-button type="primary" style="width: 80px;">保存</el-button>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="扫描开票" name="b">
					<el-row style="display: flex;justify-content: center;">
						<el-card class="box-card">
							<el-button type="primary" icon="el-icon-search" style="width: 200px;background-color: #126EFF;display: flex;align-items: center;justify-content: center;">微信扫码开票</el-button>
							<el-col style="height: 200px; width: 200px;background-color: #CCCCCC;display: flex;align-items: center;margin-top: 20px;"></el-col>
						</el-card>
						<el-row>
							<el-button type="warning" icon="el-icon-star-off" circle class="fix-circle"></el-button>
						</el-row>
					</el-row>
					<el-row :gutter="20" style="display: flex;justify-content: center;">
						<el-col :span="20">
							<el-steps active="0" finish-status="success" align-center style="padding: 40px 0px;">
								<el-step description="请顾客使用手机微信扫描以上二维码"></el-step>
								<el-step description="请顾客填写开票信息 并提交开票申请"></el-step>
								<el-step description="进入前台部 > 首页 >发票申请 完成开票"></el-step>
							</el-steps>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeThree: 'a',
				threeForm: {
					name: '',
					kinds: ''
				},
				threerules: {
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}]
				},
				activeFour: 'four_a',
				four_tableData: [{
					name: '张十三',
					time: '2020-5-20',
					job_status: '实习期',
					job: '普通员工',
					number: '11223',
					parts: '销售部'
				}, {
					name: '张十三',
					time: '2020-5-20',
					job_status: '实习期',
					job: '普通员工',
					number: '11223',
					parts: '销售部'
				}],
				fourForm: {
					name: ''
				},
				fourrules: {
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}]
				},
				dialogAdd_kinds: false,
				dialogAdd_thing: false,
	
				activeFive: 'five_a',
				beiYong_show: true,
				five_redioList: [{
					name: '现金流模式',
					radio: true
				}, {
					name: '实收模式',
					radio: false
				}, {
					name: '应收模式',
					radio: false
				}],
				five_money: '',
	
				seven_redioList: [{
					name: '寄存单',
					radio: true
				}, {
					name: '预收款单',
					radio: false
				}, {
					name: '定金单',
					radio: false
				}, {
					name: '商品消费单',
					radio: true
				}, {
					name: '入住消费单',
					radio: false
				}, {
					name: '餐饮消费单',
					radio: false
				}],
	
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false,
				pickerOptions: {
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
			}
		},
		methods: {
			popup_thing() {
				this.dialogAdd_thing = true;
			},
			popup_kinds() {
				this.dialogAdd_kinds = true;
			},
			// 交班模式选择,非现金流时不显示备用金
			changeRedio_five(value, index) {
				debugger
				this.five_redioList.forEach((value, index) => {
					value.redio = false
				})
				this.five_redioList[index].redio = true
				if (this.five_redioList[0].redio == true) {
					this.beiYong_show = true
				} else {
					this.beiYong_show = false
				}
			},
			//上传图片
			handleRemove(file) {
				console.log(file);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleDownload(file) {
				console.log(file);
			}
		}
	}
</script>

<style>
</style>
