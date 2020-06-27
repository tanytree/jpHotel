<template>
	<div class="">
		<el-dialog :title="title" :visible.sync="dialogInviteVisible" :before-close="handleClose" :append-to-body="true">
			<div class="tag-list">
				<el-radio v-model="radio" label="1">接受 <span>(接受后，报价将进入合同管理页面，进行双方审批)</span></el-radio>
				<el-radio v-model="radio" label="2">拒绝</el-radio>
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
			dialogInviteVisible: {
				default() {
					return false;
				}
			},
			radio: {
				default() {
					return '1';
				}
			}
		},
		data() {
			return {
				formLabelWidth: "80px",
			}
		},
		created() {

		},
		methods: {
			toTag(index) {
				this.$router.push({
					name: "",
				})
			},
			//before-close 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效
			handleClose(done) {
				this.$emit('update:dialogInviteVisible', false);
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.tag-list {
		padding: 20px 20px;
		font-size: 15px;
		span {
			color: #969896;
		}
	}
</style>