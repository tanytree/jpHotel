<template>
	<div class="boss-index">
		<div class="tag-top">
			<span class="label">
				<el-checkbox v-model="findOne.arriveStatus">处理应到未到</el-checkbox>
			</span>
			<span class="tips">如果勾选,则不处理应到未到订单将无法处理</span>
		</div>
		<div class="tag-top">
			<span class="label">
				<el-checkbox v-model="findOne.leaveStatus">处理应离未离</el-checkbox>
			</span>
			<span class="tips">如果勾选,则不处理应到未到订单将无法处理</span>
		</div>
		<div class="tag-top">
			<span class="label">
				<el-checkbox v-model="findOne.leaveOrder">处理走结订单</el-checkbox>
			</span>
			<span class="tips">如果勾选,则不处理应到未到订单将无法处理</span>
		</div>
		<div class="tag-top">
			<span class="label">
				<el-checkbox v-model="findOne.isOd">夜审房间状态OD</el-checkbox>
			</span>
			<span class="tips">如果勾选,则不处理应到未到订单将无法处理</span>
		</div>
		<div class="tag-top">
			<span class="label">
				<el-checkbox v-model="findOne.trialType">夜审自动交班</el-checkbox>
			</span>
			<span class="tips">如果勾选,则不处理应到未到订单将无法处理</span>
		</div>
		<div class="tag-top">
			<span class="label">夜审方式:</span>
			<span class="tips">
				<el-radio-group v-model="findOne.state">
					<el-radio :label="1">手动夜审+自动夜审</el-radio>
					<el-radio :label="2">手动夜审</el-radio>
					<el-radio :label="3">自动夜审</el-radio>
			  	</el-radio-group>
			</span>
		</div>
		<div class="tag-top">
			<span class="label">允许夜审时间段:</span>
			<span class="value">
				<el-time-picker size="small" v-model="findOne.trialStartTime" value-format="HH-mm" clearable></el-time-picker>
				<span class="line">--</span>
				<el-time-picker size="small" v-model="findOne.trialEndTime" value-format="HH-mm" clearable></el-time-picker>
			</span>
		</div>
		<div class="tag-top">
			<span class="label">自动夜审时间:</span>
			<span class="value">
				<el-time-picker size="small" v-model="findOne.trialAutoTime" value-format="HH-mm" clearable></el-time-picker>
			</span>
			<span class="tips">系统将在设定的夜审时间五分钟内自动执行夜审</span>
		</div>
		<div class="tag-top"><el-button type="primary" class="submit" size="small" @click="submit">保存</el-button></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
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
		props: {findOne: Object, initData: Function},
		methods: {
			submit() {
				const param = {
					arriveStatus: this.findOne.arriveStatus ? 1 : 2,
					leaveStatus: this.findOne.leaveStatus ? 1 : 2,
					leaveOrder: this.findOne.leaveOrder ? 1 : 2,
					isOd: this.findOne.isOd ? 1 : 2,
					trialType: this.findOne.trialType ? 1 : 2,
					state: this.findOne.state,
					trialStartTime: this.findOne.trialStartTime,
					trialEndTime: this.findOne.trialEndTime,
					trialAutoTime: this.findOne.trialAutoTime
				}
				this.$F.doRequest(this, '/pms/nighttrial/edit', param, (res) => {
					this.initData()
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
