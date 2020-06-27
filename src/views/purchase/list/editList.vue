<template>
	<div class="purchase">
		<div class="title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ name: 'DetailedList' }">采购清单</el-breadcrumb-item>
				<el-breadcrumb-item>编辑</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="delate-item">
			<el-button style="margin: 10px 0px;" type="danger" :disabled="dataListSelections.length <= 0" @click="delateSelect()">批量删除</el-button>
			<span class="delate-select">已选（{{ num }}）</span>
		</div>
		<div class="content-show">
			<el-table :data="tableData" style="width: 100%" height="100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column type="index" label="序号"></el-table-column>
				<el-table-column  label="产品">
					<template slot-scope="scope">
						<div class="goods-item">
							<img src="../../../../build/logo.png"/>
							<span>{{scope.row.s_co_name}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="数量" width="400">
					<template slot-scope="scope">
						<div class="size" v-for="(value,index) in scope.row.sizeList" :key="index">
							<!--<el-checkbox label="" v-model="checked"></el-checkbox>-->
							<div class="kinds">
								{{ value.color }};{{ value.generation }}
							</div>
							<div class="num">
								<el-input-number  v-model="value.num" size="mini" :min="1" :max="10" label="描述文字"></el-input-number>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="price" label="单价" width="100">
				</el-table-column>
				<el-table-column prop="all_price" label="合计">
				</el-table-column>
			</el-table>
		</div>
		<div class="content-btn">
			<el-button>取消</el-button>
			<el-button type="primary" @click="onSave">保存</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				num: "",
				dataListSelections: [],
				tableData: [],
			}
		},
		created() {
			this.getTableDataList();
		},
		methods: {
			//获取全部清单---清单详情
			getTableDataList() {
				this.$http({
					url: this.$http.adornUrl("/purchase/detailed_list/get_list_info"),
					method: "post",
					data: this.$http.adornData({
						id	: this.$route.query.row.id,
					})
				}).then((res) => {
					let {
						data,
					} = res;

					let {
						data: rows,
						code,
						message
					} = data;

					switch(code) {
						case 200:
							this.tableData.push(rows);
							break;
					}
				})
			},
			//tab选中那条数据
			handleSelectionChange(val) {
				this.dataListSelections = val;
				this.num =this.dataListSelections.length;
			},
			//批量删除
			delateSelect() {
				this.$confirm(`设备采购计划里已添加了 ${this.num}个产品，删除后，添加的产品会一起删除，是否确认删除？`, {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			onSave() {}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.purchase {
		margin: 15px;
		padding: 20px 20px 0px 20px;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		flex: 1;
		border-radius: 20px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		overflow-y: scroll;
		.title {
			padding: 20px 20px;
			font-size: 16px;
			color: #999999;
			border-bottom: 1px #f7f7f7 solid;
		}
		.delate-item {
			display: flex;
			align-items: center;
			.delate {
				padding: 6px 10px;
				border: 1px solid #999999;
				border-radius: 5px;
				margin-right: 10px;
			}
			>.delate-select {
				margin-left: 10px;
			}
		}
		.content-btn {
			display: flex;
			justify-content: center;
			padding: 20px 20px;
			button {
				width: 150px;
			}
		}
		.content-show {
			display: flex;
			flex: 1;
			.content-title {
				padding: 15px 0px;
				font-size: 14px;
				color: #606266;
			}
			.goods-item {
				display: flex;
				font-size: 13px;
				>img {
					max-height: 30px;
					width: 30px;
					margin-right: 10px;
				}
			}
			.size {
				display: flex;
				align-items: center;
				.kinds {
					display: inline-flex;
					align-items: center;
					flex: 1;
					padding-left:10px;
					.name {
						display: flex;
						align-items: center;
						padding: 5px 20px;
					}
					.list {
						display: flex;
						flex-direction: column;
						flex: 1;
						.kinds-item {
							display: flex;
							align-items: center;
							justify-content: center;
							.kinds-name {
								text-align: center;
								padding: 0px 20px;
								margin: 10px;
							}
						}
					}
				}
			}
		}
		.content-update {
			display: flex;
			align-items: center;
			border-top: 1px dashed #B1B1B1;
			border-bottom: 1px dashed #B1B1B1;
			padding: 15px 0px;
			.update-message {
				padding-left: 20px;
			}
		}
		.content-size {
			.ui-form-item {
				padding: 10px 0px;
			}
			.add-size {
				.size-title {}
				.tag {
					display: flex;
					align-items: center;
					.ui-button {
						display: flex;
						align-items: center;
						i {
							font-size: 16px;
							color: #FFFFFF;
						}
					}
					.tag-item {
						margin-right: 20px;
					}
				}
			}
			.add-size+.add-size {
				border-top: 1px solid #F7F7F7;
			}
			.add-btn {
				margin: 20px 0px;
				button {}
			}
		}
		.el-form-item__label {
			text-align: left;
		}
		.el-select {
			min-width: 500px;
		}
		.el-input {
			max-width: 500px;
			min-width: 200px;
		}
	}
</style>