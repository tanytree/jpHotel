<template>
	<div class="">
		<el-dialog :title="title" :visible.sync="dialogLookVisible" :before-close="handleClose" :append-to-body="true">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<div class="message">
					<div class="title">供货方信息</div>
					<div class="message-item">
						<div class="name">
							<div class="name-title">供货方</div>
							<div class="name-info">全网购科技</div>
						</div>
						<div class="name">
							<div class="name-title">联系人</div>
							<div class="name-info">主语</div>
						</div>
						<div class="name">
							<div class="name-title">法定代表</div>
							<div class="name-info">张三</div>
						</div>
						<div class="name">
							<div class="name-title">联系电话</div>
							<div class="name-info">1575556394</div>
						</div>
						<div class="name">
							<div class="name-title">开户银行</div>
							<div class="name-info">工商银行</div>
						</div>
						<div class="name">
							<div class="name-title">开户账号</div>
							<div class="name-info">5555566666651</div>
						</div>
					</div>
				</div>
				<div class="message">
					<div class="title">采购方信息</div>
					<div class="message-item">
						<div class="name">
							<div class="name-title">公司名称</div>
							<div class="name-info">智联科技</div>
						</div>
						<div class="name">
							<div class="name-title">法定代表</div>
							<div class="name-info">李四</div>
						</div>
						<div class="name">
							<div class="name-title">联系人</div>
							<div class="name-info">李四</div>
						</div>
						<div class="name">
							<div class="name-title">联系电话</div>
							<div class="name-info">15755566844</div>
						</div>
					</div>
				</div>
				<div class="message">
					<div class="title">采购条件</div>
					<div class="message-item">
						<div class="name">
							<div class="name-title">交货期</div>
							<div class="name-info">智联科技</div>
						</div>
						<div class="name">
							<div class="name-title">交货方式</div>
							<div class="name-info">李四</div>
						</div>
						<div class="name">
							<div class="name-title">交货地点</div>
							<div class="name-info">李四</div>
						</div>
					</div>
				</div>
				<div class="message">
					<div class="title">采购方要求</div>
					<div class="message-item">
						<div class="name">
							<div class="name-title">验收方式</div>
							<div class="name-info">智联科技</div>
						</div>
						<div class="name">
							<div class="name-title">质量要求</div>
							<div class="name-info">李四</div>
						</div>
					</div>
				</div>
				<div class="message">
					<div class="title">不合格产品处理</div>
					<div class="message-item">
						<div class="name">
							<div class="name-info">不合格产品处理退回，产生的费用由卖方</div>
						</div>
					</div>
				</div>
				<div class="message">
					<div class="title">付款</div>
					<div class="message-item">
						<div class="name">
							<div class="name-title">付款方式</div>
							<div class="name-info">李四</div>
						</div>
						<div class="name">
							<div class="name-title">分期次数</div>
							<div class="name-info">李四</div>
						</div>
						<div class="name">
							<div class="name-title">第一期</div>
							<div class="name-info">李四</div>
						</div>
						<div class="name">
							<div class="name-title">付款条件</div>
							<div class="name-info">李四</div>
						</div>
						<div class="name">
							<div class="name-title">付款日期</div>
							<div class="name-info">李四</div>
						</div>
					</div>
				</div>
				<div class="message">
					<div class="title">产品报价</div>
					<el-table :data="tableData" style="width: 100%" height="250">
						<el-table-column type="index" label="序号"></el-table-column>
						<el-table-column prop="name" label="产品">
						</el-table-column>
						<el-table-column label="规格" width="200">
							<template slot-scope="scope">
								<div class="size" v-for="(value,index) in scope.row.sizeList" :key="index">
									<!--<el-checkbox label="" v-model="checked"></el-checkbox>-->
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
						<div class="money-item">总报价</div>
						<div class="money-item-r">5555510525</div>
					</div>
				</div>
			</el-form>
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
			dialogLookVisible: {
				default() {
					return false;
				}
			}
		},
		data() {
			return {
				tableData: [],
				ruleForm: {
					name: "",
					user_name: "",
					user_phone: "",
					region: "",
					way: "",
					address: "",
					deal: "",
					pay_way: ""
				},
				rules: {}
			}
		},
		created() {
			this.getTableDataList();
		},
		methods: {
			//获取计划列表
			getTableDataList() {
				this.$http({
					url: this.$http.adornUrl("/purchase/get_purchase_edit_list/list"),
					method: "post",
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
							this.tableData = rows.list;
							break;
					}
				})
			},
			//before-close 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效
			handleClose(done) {
				this.$emit('update:dialogLookVisible', false);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	>.title {
		padding: 20px 20px;
		font-size: 16px;
		color: #999999;
		border-bottom: 1px #f7f7f7 solid;
	}
	
	.padd-line {
		padding: 10px 0px;
	}
	
	.info {
		.info-item {
			display: flex;
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
	
	.el-dialog__body {
		padding: 0px !important;
	}
	
	.message {
		padding: 10px 0px;
		.input {
			display: flex;
		}
		.goods-img {
			height: 30px;
			width: 30px;
		}
		>.title {
			font-size: 16px;
			font-weight: bold;
			padding: 10px 20px 15px 20px;
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
		.message-item {
			display: flex;
			flex-direction: column;
			font-size: 15px;
			.name {
				display: flex;
				flex: 1;
				padding: 10px 20px;
				.name-title {
					width: 100px;
					color: #969896;
				}
				.name-info {}
			}
		}
	}
	
	.message+.message {
		border-top: 1px #f7f7f7 solid;
	}
</style>