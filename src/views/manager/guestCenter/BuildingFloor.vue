<!-- 楼栋楼层 -->
<template>
	<div id="page1">
		<el-row :gutter="20" style="font-size: 14px; font-weight: bolder;">
			<el-col :span="2.5">大仓集团**酒店</el-col>
			<el-col :span="2">共有2间酒店</el-col>
		</el-row>
		<el-row style="padding: 20px 0px;">
			<el-radio-group v-model="selectRedio">
				<el-radio-button :label="value.index" v-for="(value, index) in dongList" :key="index" @change="changeSelect">{{value.name}}</el-radio-button>
			</el-radio-group>
		</el-row>
		<el-row :gutter="20" class="demo-form-inline" style="background-color: #e6eaed;padding: 10px 0px;">
			<el-col :span="6">楼层1共有<span style="color: #126EFF;">6</span>层 共有房间: <span style="color: #126EFF;">6</span>间</el-col>
			<el-col :span="6">
				<!-- 这里可以用面包屑,但是面包屑似乎没有点击事件只是路由跳转,需要后面写的人自己研究 -->
				<el-button type="text">修改</el-button>
				<span style="border-left: 1px solid #CCCCCC;height: 15px;"></span>
				<el-button type="text">删除</el-button>
				<span style="border-left: 1px solid #CCCCCC;height: 15px;"></span>
				<el-button type="text" @click="forward">前移</el-button>
				<span style="border-left: 1px solid #CCCCCC;height: 15px;"></span>
				<el-button type="text" @click="back">后移</el-button>
			</el-col>
			<el-col :span="8" :offset="8">
				<el-button type="primary" @click="popup('addDong')">新增楼栋</el-button>
				<el-button type="primary" @click="popup('addCeng')">新增楼层</el-button>
			</el-col>
		</el-row>
		<el-row style="margin-top: 20px;margin-left: 40px;">
			<el-row v-for="(value, index) in cengList" :key="index">
				<el-popover placement="right" width="400" trigger="hover">
					<el-row>
						<el-row :gutter="20" style="border-bottom: 1px solid #e5e5e5;padding: 10px 0px;">
							<el-col span="10">楼栋1栋{{value}}</el-col>
							<el-col span="14" style="display: flex;justify-content: flex-end;">
								<el-button type="text">修改</el-button>
								<el-button type="text">删除</el-button>
							</el-col>
						</el-row>
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
						 @selection-change="handleSelectionChange">
							<el-table-column prop="name" label="房型"></el-table-column>
							<el-table-column prop="name" label="房间数"></el-table-column>
						</el-table>
						<el-row style="padding:20px 0px 10px 0px;">楼层备注:</el-row>
						<el-row>
							<el-input placeholder="请输入内容" v-model="ruleForm.name"></el-input>
						</el-row>
					</el-row>
					<el-button slot="reference">{{value}}</el-button>
				</el-popover>
			</el-row>
		</el-row>
		<!-- 新增楼栋 -->
		<el-dialog top="0" title="新增楼栋" :visible.sync="addDong_show" :close-on-click-modal="false">
			<el-row :gutter="20">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
					<el-col :span="20">
						<el-form-item label="楼栋名称:" prop="name">
							<el-input placeholder="请输入内容" v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="楼栋备注:">
							<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 新增楼层 -->
		<el-dialog top="0" title="新增楼层" :visible.sync="addCeng_show" :close-on-click-modal="false">
			<el-row :gutter="20">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
					<el-col :span="20">
						<el-form-item label="楼层:" prop="name">
							<el-input placeholder="请输入内容" v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="楼层名称:" prop="name">
							<el-input placeholder="请输入内容" v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="楼栋备注:">
							<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import HouseMaintain from './HouseMaintain'
	import BuildingFloor from './BuildingFloor'
	// import ProductCategory from './ProductCategory'
	// import httpRequest from '@/utils/httpRequest'
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		components: {
			HouseMaintain,
			BuildingFloor
		},
		computed: {
			...mapState({
				user: state => state.user
			}),
		},
		data() {
			return {
				selectRedio: 0,
				activeName: 'second', //第一个默认启动
				addDong_show: false,
				addCeng_show: false,
				ruleForm: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				cengList: ['2层', '3层', '4层', '5层', '6层', '7层'],
				tableData: [{
					name: '会议厅'
				}, {
					name: '标准厅'
				}],
				dongList: [{
					index: 0,
					name: '楼栋1'
				}, {
					index: 1,
					name: '楼栋2'
				}, {
					index: 2,
					name: '楼栋3'
				}, {
					index: 3,
					name: '楼栋4'
				}]
			}
		},
		created() {},
		methods: {
			popup(type) {
				switch (type) {
					case 'addDong':
						this.addDong_show = true
						break
					case 'addCeng':
						this.addCeng_show = true
						break
				}
			},
			// 前移
			forward() {
				if (this.selectRedio >= 0) {
					let temp = this.dongList[this.selectRedio - 1];
					this.dongList.splice(this.selectRedio - 1, 1);
					this.dongList.splice(this.selectRedio, 0, temp);
				}
			},
			// 后退
			back() {
				if (this.selectRedio >= 0) {
					let temp = this.dongList[this.selectRedio + 1];
					this.dongList.splice(this.selectRedio + 1, 1);
					this.dongList.splice(this.selectRedio, 0, temp);
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.demo-form-inline {
		display: flex;
		align-items: center;
	}
</style>
