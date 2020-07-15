<template>
	<div>
		<el-row>
			<el-col style="font-size: 13px; font-weight: bolder;">酒店图片</el-col>
		</el-row>
		<el-row style="padding: 20px 0px;">
			<el-upload action="#" list-type="picture-card" :auto-upload="false" :multiple="true">
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
		<el-row style="border-top: 1px solid #e5e5e5;padding: 20px 0px;">
			<el-col style="font-size: 13px; font-weight: bolder;">酒店信息</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-form :model="threeForm" :rules="threerules" ref="ruleForm" label-width="100px">
				<el-col :span="8">
					<el-form-item label="酒店名称:" prop="name">
						<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="酒店地址:" prop="name">
						<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="前台电话:" prop="name">
						<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="入住时间:" prop="name">
						<el-date-picker v-model="threeForm.name" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions"
						 style="width: 200px;"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="退房时间:" prop="name">
						<el-date-picker v-model="threeForm.name" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions"
						 style="width: 200px;"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>
		<el-row style="border-top: 1px solid #e5e5e5;padding: 20px 0px;">
			<el-col style="font-size: 13px; font-weight: bolder;">酒店简介</el-col>
		</el-row>
		<el-row :gutter="22" class="demo-form-inline">
			<el-col :span="2" style="font-size: 14px;">酒店简介:</el-col>
			<el-col :span="20">
				<el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="five_money" style="width: 100%;"></el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-button type="primary" style="width: 80px;">保存</el-button>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
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
