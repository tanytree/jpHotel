<template>
	<div class="">
		<el-dialog :title="title" :visible.sync="dialogDetailVisible" :before-close="handleClose" :append-to-body="true">
			<el-table :data="tableData" style="width: 100%" height="300" >
				<el-table-column fixed prop="name" label="产品名称" width="150px">
				</el-table-column>
				<el-table-column label="规格" >
					<template slot-scope="scope">
						<div class="size" v-for="(value,index) in scope.row.sizeList" :key="index">
							<div class="kinds">
								<div class="name">{{ value.color }}</div>
								<div class="list">
									<div class="kinds-item" v-for="(item,i) in value.kindsList" :key="i">
										<div class="kinds-name">{{ item.name }}</div>
									</div>
								</div>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="num" label="采购数量">
					<template slot-scope="scope">
						<div class="size" v-for="(value,index) in scope.row.sizeList" :key="index">
							<div class="kinds">
								<div class="list">
									<div class="kinds-item" v-for="(item,i) in value.kindsList" :key="i">
										<div class="kinds-name">{{ item.num }}</div>
									</div>
								</div>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button type="text" size="small" v-for="(value,index) in scope.row.scope_list" :key="index" @click="toSelect(index)">{{value.name}}</el-button>
					</template>
				</el-table-column>
			</el-table>
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
			dialogDetailVisible: {
				default() {
					return false;
				}
			},
			tableData: {
				default() {
					return [];
				}
			},
		},
		data() {
			return {
				formLabelWidth: "80px"
			}
		},
		created() {

		},
		methods: {
			//before-close 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效
			handleClose(done) {
				this.$emit('update:dialogDetailVisible', false);
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.size {
		.kinds {
			display: inline-flex;
			align-items: center;
			.name {
				display: flex;
				align-items: center;
				padding: 5px 20px;
				border: 1px solid #e6e6e6;
			}
			.list {
				display: flex;
				flex-direction: column;
				flex: 1;
				.kinds-item {
					display: flex;
					align-items: center;
					justify-content: center;
					width:120px;
					.kinds-name {
						text-align: center;
						width:100px;
						padding: 0px 20px;
						border: 1px solid #e6e6e6;
						margin: 10px;
					}
				}
			}
		}
	}
</style>