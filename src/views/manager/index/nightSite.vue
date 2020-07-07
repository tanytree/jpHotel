<template>
	<div>
		<el-row :gutter="20" class="tag-top">
			<el-col :span="2">
				<el-checkbox v-model="checked">处理应到未到</el-checkbox>
			</el-col>
			<el-col :span="8" :offset="1" style="color: #888888;">如果勾选,则不处理应到未到订单将无法处理</el-col>
		</el-row>
		<el-row :gutter="20" class="tag-top">
			<el-col :span="2">
				<el-checkbox v-model="checked">处理应离未离</el-checkbox>
			</el-col>
			<el-col :span="8" :offset="1" style="color: #888888;">如果勾选,则不处理应到未到订单将无法处理</el-col>
		</el-row>
		<el-row :gutter="20" class="tag-top">
			<el-col :span="2">
				<el-checkbox v-model="checked">处理走结订单</el-checkbox>
			</el-col>
			<el-col :span="8" :offset="1" style="color: #888888;">如果勾选,则不处理应到未到订单将无法处理</el-col>
		</el-row>
		<el-row :gutter="20" class="tag-top">
			<el-col :span="2">
				<el-checkbox v-model="checked">夜审房间状态OD</el-checkbox>
			</el-col>
			<el-col :span="8" :offset="1" style="color: #888888;">如果勾选,则不处理应到未到订单将无法处理</el-col>
		</el-row>
		<el-row :gutter="20" class="tag-top">
			<el-col :span="2">
				<el-checkbox v-model="checked">夜审自动交班</el-checkbox>
			</el-col>
			<el-col :span="8" :offset="1" style="color: #888888;">如果勾选,则不处理应到未到订单将无法处理</el-col>
		</el-row>
		<el-row :gutter="20" class="tag-top" style="padding: 20px 0px;">
			<el-col :span="2">夜审方式:</el-col>
			<el-col :span="4">
				<el-radio v-model="radio" label="1">手动夜审+自动夜审</el-radio>
			</el-col>
			<el-col :span="3">
				<el-radio v-model="radio" label="1" :offset="1">手动夜审</el-radio>
			</el-col>
			<el-col :span="3">
				<el-radio v-model="radio" label="1" :offset="1">自动夜审</el-radio>
			</el-col>
		</el-row>
		<el-row :gutter="18" class="demo-form-inline" style="padding: 20px 0px;">
			<el-col :span="2.5">允许夜审时间段:</el-col>
			<el-col :span="6">
				<el-time-picker is-range v-model="two.time" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
				 placeholder="选择时间范围" style="width: 400px;">
				</el-time-picker>
			</el-col>
		</el-row>
		<el-row :gutter="18" class="demo-form-inline" style="padding: 20px 0px;">
			<el-col :span="2.5">自动夜审时间:</el-col>
			<el-col :span="4.5">
				<el-time-picker v-model="two.time" :picker-options="{selectableRange: '18:30:00 - 20:30:00'}" placeholder="任意时间点">
				</el-time-picker>
			</el-col>
			<el-col :span="8" :offset="0.5" style="color: #888888;">系统将在设定的夜审时间五分钟内自动执行夜审</el-col>
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
				checked: true, radio: '',
				two: {
					time: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
				},
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
