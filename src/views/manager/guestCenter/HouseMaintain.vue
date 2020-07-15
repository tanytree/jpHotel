<template>
	<!-- 房屋维护 -->
	<el-row>
		<el-tabs v-model="tag" v-if="tab_show">
			<el-tab-pane label="客房房型" name="one">
				<el-row :gutter="22">
					<el-col :span="22"  :offset="21">
						<el-button type="primary" style="width: 100px;" size="small" @click="add">新增</el-button>
					</el-col>
				</el-row>
				<el-table ref="multipleTable" :data="four_tableData" tooltip-effect="dark" :header-cell-style="{background:'#e6eaed',color:'#1E1E1E'}"
				 @selection-change="handleSelectionChange">shu
					<el-table-column prop="name" label="房型名称"></el-table-column>
					<el-table-column prop="name" label="门市价"></el-table-column>
					<el-table-column prop="name" label="床位数"></el-table-column>
					<el-table-column prop="name" label="可入住人"></el-table-column>
					<el-table-column prop="name" label="状态"></el-table-column>
					<el-table-column prop="name" label="备注"></el-table-column>
					<el-table-column label="操作" width="300">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="popup_kinds">禁用</el-button>
							<el-button type="text" size="small" @click="popup_kinds">修改</el-button>
							<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="onConfirm">
								<el-button slot="reference" type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="会客厅房型" name="two">
				<el-row :gutter="20">
					<el-col :span="6" :offset="20">
						<el-button type="primary" style="width: 100px;" size="small" @click="add">新增</el-button>
					</el-col>
				</el-row>
				<el-table ref="multipleTable" :data="four_tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
				 @selection-change="handleSelectionChange">shu
					<el-table-column prop="name" label="房型名称"></el-table-column>
					<el-table-column prop="name" label="门市价"></el-table-column>
					<el-table-column prop="name" label="座位数"></el-table-column>
					<el-table-column prop="name" label="状态"></el-table-column>
					<el-table-column prop="name" label="备注"></el-table-column>
					<el-table-column label="操作" width="300">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="popup_kinds">禁用</el-button>
							<el-button type="text" size="small" @click="popup_kinds">修改</el-button>
							<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="onConfirm">
								<el-button slot="reference" type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		<el-row v-if="!tab_show">
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back" content=""></el-page-header>
			</el-row>
			<el-row style="border-top: 1px solid #e5e5e5;padding: 20px 0px;">
				<el-col style="font-size: 13px; font-weight: bolder;">基本信息</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-form :model="threeForm" :rules="threerules" ref="ruleForm" label-width="100px">
					<el-col :span="8">
						<el-form-item label="房型:" prop="name">
							<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="门市价:" prop="name">
							<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="座位数:" prop="name">
							<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
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
				</el-col>
				<el-dialog top="0" :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-row>
			<el-row :gutter="22" class="demo-form-inline">
				<el-col :span="2" style="font-size: 14px;">备注:</el-col>
				<el-col :span="20">
					<el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="remark" style="width: 100%;"></el-input>
				</el-col>
			</el-row>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;">保存</el-button>
				<el-button style="width: 80px;margin-left: 20px;">返回</el-button>
			</el-row>
		</el-row>
	</el-row>
</template>

<script>
	export default {
	    data () {
	        return {
				tag: 'one',
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
			   tab_show: true,
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
			   remark: ''
	        }
	    },
	    created () {
	    },
	    activated () {
	    },
	    methods: {
			add () {
				this.tab_show = false
			},
			//切换到房屋/会议
			back() {
				this.tab_show = true
			}
	    }
	}
</script>

<style>
</style>
