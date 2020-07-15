<template>
	<div class="">
		<el-dialog top="0" :title="title" :visible.sync="dialogFormVisible" :before-close="handleClose" :append-to-body="true">
			<el-form :model="form">
				<el-form-item label="计划名称" :label-width="formLabelWidth">
					<el-input v-model="form.title" autocomplete="off" style="width: 400px;"></el-input>
				</el-form-item>
				<el-form-item label="采购时间" :label-width="formLabelWidth" style="margin: 15px 0px;">
					<el-date-picker v-model="form.purchase_time" type="date" placeholder="选择采购日期" style="width: 400px;">
					</el-date-picker>
				</el-form-item>
				<!--<el-form-item label="负责人" :label-width="formLabelWidth">
					<el-select v-model="form.people" placeholder="请选择负责人" style="width: 400px;">
						<el-option v-for="(value,index) in peopleList" :key="index" :label="value.people" :value="value.people"></el-option>
					</el-select>
				</el-form-item>-->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="isSave()" v-if="edit_show">保存</el-button>
				<el-button type="primary" @click="isDefine()" v-else>创建</el-button>
				<el-button @click="isCancel()">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				default() {
					return "";
				}
			},
			dialogFormVisible: {
				default() {
					return false;
				}
			},
			form: {
				default() {
					return {};
				}
			},
			peopleList: {
				type: Array,
				default() {
					return [];
				}
			},
			edit_show: {
				type: Boolean,
				default() {
					return false;
				}
			}
		},
		data() {
			return {
				formLabelWidth: "80px"
			}
		},
		created() {

		},
		methods: {
			isDefine() {
				this.$emit('update:dialogFormVisible', false);
				this.$emit('isDefine', this.form);
			},
			isCancel() {
				this.$emit('update:dialogFormVisible', false);
			},
			//before-close 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效
			handleClose(done) {
				this.$emit('update:dialogFormVisible', false);
			},
			//编辑变成保存
			isSave() {
				this.$emit('update:dialogFormVisible', false);
				this.$emit('isSave', this.form);

			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.purchase {}
</style>
