<template>
	<div class="purchase">
		<div class="header-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ name: 'HeTong' }">进行中的合同</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name: 'PlanDetail' }">合同文本</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="content-body">
			<div class="body-item">
				<div class="item-title">
					<div class="item-tip">已上传附件</div>
					<div class="item-tip"> <el-button type="primary" size="mini"  round>上传附件</el-button></div>
				</div>
				<div class="item-body">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;padding: 8px 0 ! important;" @selection-change="handleSelectionChange">
						<el-table-column prop="title" label="文件" show-overflow-tooltip></el-table-column>
						<el-table-column prop="create_time" label="上传时间" show-overflow-tooltip></el-table-column>
						<el-table-column prop="b_co_name" label="文件大小" show-overflow-tooltip></el-table-column>
						<el-table-column label="操作" width="150">
							<template slot-scope="scope">
								<i class="el-icon-delete"></i>
								<i class="el-icon-download"></i>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="body-item">
				<div class="item-title">合同要素文本</div>
				<div class="item-body">
					<div class="tag-item">
						<div class="tag-title">供货方</div>
						<div class="tag-info-row">
							<div class="tag-name">供货方</div>
							<div class="tag-info">供货方</div>
						</div>
					</div>
					<div class="tag-item">
						<div class="tag-title">供货方</div>
						<div class="tag-info-row">
							<div class="tag-name">供货方</div>
							<div class="tag-info">供货方</div>
						</div>
					</div>
					<div class="tag-item">
						<div class="tag-title">产品信息</div>
						<div class="tag-info-row">
							<el-table :data="goodsInfo" style="width: 100%" height="250">
								<el-table-column type="index" label="序号"></el-table-column>
								<el-table-column prop="name" label="产品名称">
								</el-table-column>
								<el-table-column label="规格" width="200">
									<template slot-scope="scope">
										<div class="size" v-for="(value,index) in scope.row.sizeList" :key="index">
											<div class="kinds">
												{{ value.color }};{{ value.generation }}
											</div>
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="price" label="产品单价（元）" width="100">
								</el-table-column>
								<el-table-column prop="price" label="产品数量（件）" width="100">
								</el-table-column>
								<el-table-column prop="all_price" label="合计（元）">
								</el-table-column>
							</el-table>
							<div class="all-money">
								<div class="money-item">总价</div>
								<div class="money-item-r">5555510525</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				tableData: [],
				goodsInfo: []
			}
		},
		created() {
			this.getTableDataList();
		},
		methods: {
			//获取合同要素详情
			getTableDataList() {
				this.$http({
					url: this.$http.adornUrl("/purchase/contract_info/get_contract_info"),
					method: "post",
					data: this.$http.adornData({
						contract_id: this.$route.query.row.id,
						list_id:this.$route.query.row.list_id,
						info_id:1
					})
				}).then((res) => {
					let {
						data,
					} = res;

					let {
						data: rows,
						code,
						msg
					} = data;

					switch(code) {
						case 200:
							this.info = rows;
							break;
					}
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
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
		.header-title {
			padding: 20px 20px;
			font-size: 16px;
			color: #999999;
			border-bottom: 1px #f7f7f7 solid;
			span {
				font-size: 17px;
				color: #333333;
			}
		}
		.content-body {
			background-color: #F5F7F9;
			padding: 10px 10px;
			.body-item {
				border-radius: 10px;
				background-color: #FFFFFF;
				padding: 15px 20px;
				.item-title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 16px;
					font-weight: bold;
					padding-left: 15px;
					.item-tip {
						padding-right: 15px;
					}
				}
				.item-body {
					border: 1px solid #bfbfbf;
					margin: 15px;
					padding: 20px;
					.tag-item {
						padding-bottom: 15px;
						.tag-title {
							font-size: 15px;
							font-weight: bold;
						}
						.tag-info-row {
							display: flex;
							flex-direction: column;
							padding: 5px 0px;
							.tag-name {
								font-size: 14px;
								color: #969896;
								width: 80px;
							}
							.tag-info {
								flex: 1;
								font-size: 14px;
							}
							.all-money {
								display: flex;
								justify-content: space-between;
								padding: 15px 20px;
								.money-item {
									flex: 1;
								}
								.money-item-r {
									display: flex;
									justify-content: flex-end;
								}
							}
						}
					}
					.tag-item+.tag-item {
						border-top: 2px solid #F5F7F9;
						padding-top: 15px;
					}
				}
			}
		}
	}
</style>