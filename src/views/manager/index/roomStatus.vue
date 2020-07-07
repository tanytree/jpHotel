<template>
	<div>
		<el-row class="demo-form-inline">
			<div class="tag-group">
				<span class="tag-group__title">房态:</span>
				<el-tag v-for="(item, i) in items" :key="i" :type="item.type" effect="plain" class="tag-width margin-l">
					{{ item.label }}
				</el-tag>
			</div>
			<el-form class="demo-form-inline" inline size="small" style="margin-left: 100px;">
				<el-form-item label="楼层楼栋:" class="margin-l">
					<el-select v-model="roomStatus.dong" placeholder="楼栋" class="row-width">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
					<el-select v-model="roomStatus.tag" placeholder="楼层" class="row-width">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
					<el-button plain style="width: 100px;" size="mini">重置</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		<el-row class="demo-form-inline">
			<div class="tag-group">
				<span class="tag-group__title">房型:</span>
				<el-tag v-for="(item, i) in items" :key="i" :type="item.type" effect="plain" class="tag-width margin-l">
					{{ item.label }}
				</el-tag>
			</div>
		</el-row>
		<el-row>
			<el-row :gutter="20" style="margin-top: 10px;">
				<el-col :span="4">大仓集团第一酒店 3层</el-col>
				<el-col :span="1" :offset="0.5" style="color: #999;"><span style="color: #126eff;">9</span>/12</el-col>
			</el-row>
			<el-row :gutter="20" style="margin-top: 10px;">
				<el-col :span="4" class="tag-margin" :style="`height:120px;background:${value.bgColor}`" v-for="(value, index) in roomList"
				 :key="index">
					<el-row style="color: #FFFFFF;font-size: 13px;margin-top: 10px;">
						<el-col :span="3">A001</el-col>
						<el-col :span="8" :offset="2">标准间</el-col>
					</el-row>
					<!-- 清扫图标后期加 -->
				</el-col>
			</el-row>
		</el-row>
		<el-row>
			<el-row :gutter="20" style="margin-top: 10px;">
				<el-col :span="4">大仓集团第一酒店 1层</el-col>
				<el-col :span="1" :offset="0.5" style="color: #999;"><span style="color: #126eff;">9</span>/12</el-col>
			</el-row>
			<el-row :gutter="20" style="margin-top: 10px;">
				<el-col :span="4" class="tag-margin" :style="`height:120px;background:${value.bgColor}`" v-for="(value, index) in roomList"
				 :key="index">
					<el-row style="color: #FFFFFF;font-size: 13px;margin-top: 10px;">
						<el-col :span="3">A001</el-col>
						<el-col :span="8" :offset="2">标准间</el-col>
					</el-row>
					<!-- 清扫图标后期加 -->
				</el-col>
			</el-row>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'one',
				roomStatus: {
					dong: '', //楼栋
					tag: '' //楼层
				},
				items: [{
						type: '',
						label: '全部(200)'
					},
					{
						type: 'success',
						label: '空净(20)'
					},
					{
						type: 'info',
						label: '空脏(20)'
					},
					{
						type: 'danger',
						label: '空脏(20)'
					},
					{
						type: 'warning',
						label: '空脏(20)'
					},
					{
						type: 'warning',
						label: '空脏(20)'
					}
				],
				roomList: [{
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#27ae76'
					},
					{
						hao: 'A001',
						status: 1,
						status_name: '单间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '单间',
						bgColor: '#b07b2e'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#c0512b'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#c0512b'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}
				],
				checked: true,
				two: {
					time: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
				},
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
