<template>
	<div class="">
		<el-dialog :title="title" :visible.sync="dialogFormVisible " :before-close="Close" :append-to-body ="true">
			<el-radio-group v-model="radio_status">
				<div class="radio-status">
					<el-radio :label="0" v-for="(value,index) in selectList" :key="index" style="padding: 20px;">{{ value.way }}</el-radio>
				</div>
			</el-radio-group>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="isDefine()">确认</el-button>
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
				type: Boolean,
				default() {
					return false;
				}
			},
			selectList: {
				type: Array,
				default() {
					return [];
				}
			},
			radio_status: {
				default() {
					return "";
				}
			}
		},
		data() {
			return {}
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
			Close(done) {
				console.log("===000==")
				this.$emit('update:dialogFormVisible', false);
			},
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.radio_status {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>