<template>
	<div>
		<el-row>
			<el-tabs v-model="activeFive">
				<el-tab-pane label="打印参数" name="five_a">
					<el-row :gutter="20" class="tag-top" style="padding: 20px 0px;">
						<el-row style="padding: 20px 0px;">打印单据选择:</el-row>
						<el-col :span="4" v-for="(value, index) in seven_redioList" :key="index">
							<el-checkbox v-model="value.redio" @change="changeRedio_five(value,index)">{{value.name}}</el-checkbox>
						</el-col>
					</el-row>
					<el-row>
						<el-button type="primary" style="width: 80px;">保存</el-button>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="打印格式" name="five_b">
					<el-row>
						<el-table ref="multipleTable" :data="four_tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
						 @selection-change="handleSelectionChange">
							<el-table-column prop="name" label="单据名称" show-overflow-tooltip></el-table-column>
							<el-table-column prop="name" label="打印份数">
								<template slot-scope="name">
									<el-input v-model="five_money"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="name" label="单据备注">
								<template slot-scope="name">
									<el-input type="textarea" :rows="2" v-model="five_money"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="name" label="打印格式" width="400">
								<template slot-scope="name">
									<el-radio v-model="radio" label="1">A4</el-radio>
									<el-radio v-model="radio" label="2">A4-1/2</el-radio>
									<el-radio v-model="radio" label="3">A4-1/3</el-radio>
									<el-radio v-model="radio" label="4">POS(76mm)</el-radio>
								</template>
							</el-table-column>
						</el-table>
					</el-row>
					<el-row>
						<el-button type="primary" style="width: 80px;">保存</el-button>
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
				activeFive: 'five_a', five_money: '',
				beiYong_show: true, radio: '',
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
				}]
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
			},
			handleSelectionChange() {},
			handleCommand() {},

		}
	}
</script>

<style>
</style>
