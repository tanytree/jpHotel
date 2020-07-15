<template>
	<div class="">
		<el-dialog top="0" :title="title" :visible.sync="dialogFormVisible" :before-close="handleClose" :append-to-body="true">
			<div class="tag-list">
				<div class="tag-item" v-for="(value,index) in tagList" :key="index" @click="toTag(index)">
					<div class="name">
						<div class="item">{{ value.name }}</div><i class="iconfont icon-xiangyou"></i>
					</div>
					<div class="message">{{ value.message }}</div>
				</div>
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
			tagList: {
				default() {
					return [];
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
					name:"",
				})
			},
			//before-close 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效
			handleClose(done) {
				this.$emit('update:dialogFormVisible', false);
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.tag-list {
		padding: 20px 20px;
		.tag-item {
			border: 1px solid #B1B1B1;
			border-radius: 5px;
			background-color: #FFFFFF;
			padding: 20px;
			.name {
				display: flex;
				align-items: center;
				.item {
					font-size: 18px;
					color: #126EFF;
				}
				i {
					font-size: 18px;
					color: #B1B1B1;
					margin-left: 10px;
				}
			}
			.message {
				color: #B1B1B1;
				font-size: 13px;
				padding-top: 10px;
			}
		}
		.tag-item +.tag-item {
			margin-top: 10px;
		}
	}
	.tag-list :hover {
		background-color: #DCDFE6;
	}
</style>
