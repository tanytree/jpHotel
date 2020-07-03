<!--
 * @Date: 2020-02-15 21:08:27
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-27 11:14:21
 * @FilePath: /cloudAdmin/src/views/market/productManagement/index.vue
 -->
<template>
    <div id="page1">
        <el-row>
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
							<el-select v-model="threeForm.name" placeholder="请选择房型" class="row-width">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="楼栋:" prop="name">
							<el-select v-model="threeForm.name" placeholder="请选择楼栋" class="row-width">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="楼层:" prop="name">
							<el-select v-model="threeForm.name" placeholder="请选择楼层" class="row-width">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="房间号:" prop="name">
							<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="电话分机:" prop="name">
							<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-row>
				<el-col style="font-size: 13px; font-weight: bolder;">房间构造</el-col>
			</el-row>
			<el-row style="padding: 20px 0px;">
				<el-col style="font-size: 13px;width: 130px;text-align: right;margin-right: 20px;"><span style="color: red;">*</span>房间图片:</el-col>
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
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-row>
			<el-row>
				<el-form :model="threeForm" :rules="threerules" ref="ruleForm" label-width="150px">
					<el-form-item label="朝向:" prop="name">
						<el-row :gutter="20" class="tag-top">
							<el-col :span="2">
								<el-radio v-model="radio" label="1">朝南</el-radio>
							</el-col>
							<el-col :span="2">
								<el-radio v-model="radio" label="1" offset="1">朝北</el-radio>
							</el-col>
							<el-col :span="2">
								<el-radio v-model="radio" label="1" offset="1">朝东</el-radio>
							</el-col>
							<el-col :span="2">
								<el-radio v-model="radio" label="1" offset="1">朝西</el-radio>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item label="是否靠近马路:" prop="name">
						<el-row :gutter="20" class="tag-top">
							<el-col :span="2">
								<el-radio v-model="radio" label="1">是</el-radio>
							</el-col>
							<el-col :span="2">
								<el-radio v-model="radio" label="1" offset="1">否</el-radio>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item label="是否有窗户:" prop="name">
						<el-row :gutter="20" class="tag-top">
							<el-col :span="2">
								<el-radio v-model="radio" label="1">是</el-radio>
							</el-col>
							<el-col :span="2">
								<el-radio v-model="radio" label="1" offset="1">否</el-radio>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item label="是否无烟房:" prop="name">
						<el-row :gutter="20" class="tag-top">
							<el-col :span="2">
								<el-radio v-model="radio" label="1">是</el-radio>
							</el-col>
							<el-col :span="2">
								<el-radio v-model="radio" label="1" offset="1">否</el-radio>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item label="状态:" prop="name">
						<el-row :gutter="20" class="tag-top">
							<el-col :span="2">
								<el-radio v-model="radio" label="1">是</el-radio>
							</el-col>
							<el-col :span="2">
								<el-radio v-model="radio" label="1" offset="1">否</el-radio>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item label="是否噪音房:" prop="name">
						<el-row :gutter="20" class="tag-top">
							<el-col :span="2">
								<el-radio v-model="radio" label="1">是</el-radio>
							</el-col>
							<el-col :span="2">
								<el-radio v-model="radio" label="1" offset="1">否</el-radio>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item label="是否高温房:" prop="name">
						<el-row :gutter="20" class="tag-top">
							<el-col :span="2">
								<el-radio v-model="radio" label="1">是</el-radio>
							</el-col>
							<el-col :span="2">
								<el-radio v-model="radio" label="1" offset="1">否</el-radio>
							</el-col>
						</el-row>
					</el-form-item>
				</el-form>
			</el-row>
			<el-row>
				<el-button type="primary" style="width: 80px;">保存</el-button>
				<el-button style="width: 80px;margin-left: 20px;">返回</el-button>
			</el-row>
		</el-row>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    export default {
		props:['add_show'],
        computed: {
            ...mapState({
                user: state => state.user
            }),
        },
        data () {
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
            }
        },
        created () {
        },
        activated () {
        },
        methods: {
			//切换到房屋信息
			back() {
				this.add_show = false
				this.$emit('changeShow',this.add_show)
			}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
