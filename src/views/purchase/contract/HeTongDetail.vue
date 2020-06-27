<template>
	<div class="purchase">
		<div class="header-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ name: 'HeTong' }">进行中的合同</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name: 'PlanDetail' }">详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="body-title">{{info.title}} <span>创建日期：{{info.create_time}}</span></div>
		<div class="body-item">
			<div class="item-part">
				<div class="part-row">
					<div class="name">甲方</div>
					<div class="info">{{info.a_co_name}}</div>
				</div>
				<div class="part-row">
					<div class="name">联系电话</div>
					<div class="info">{{info.a_phone}}</div>
				</div>
			</div>
		</div>
		<div class="body-item">
			<div class="item-part">
				<div class="part-row">
					<div class="name">乙方</div>
					<div class="info">{{info.b_co_name}}</div>
				</div>
				<div class="part-row">
					<div class="name">联系电话</div>
					<div class="info">{{info.b_phone}}</div>
				</div>
			</div>
		</div>
		<div class="press-title">合同进度</div>
		<div class="body-item">
			<div class="item-part">
				<div class="part-row">
					<div class="name">甲方：</div>
					<div class="info">
						<el-progress :text-inside="true" :stroke-width="20" :percentage="info.a_rate"></el-progress>
					</div>
				</div>
				<div class="part-row">
					<div class="name">乙方：</div>
					<div class="info">
						<el-progress :text-inside="true" :stroke-width="20" :percentage="info.b_rate" status="success"></el-progress>
					</div>
				</div>
			</div>
			<div class="message">说明：进度条代表</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				info:{}
			}
		},
		created() {
			this.getTableDataList();
		},
		methods: {
			//获取合同详情
			getTableDataList() {
				this.$http({
					url: this.$http.adornUrl("/purchase/contract/get_contract_info"),
					method: "post",
					data: this.$http.adornData({
						contract_id: this.$route.query.row.id,
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
		.body-title {
			padding: 15px 15px;
			font-weight: bold;
			span {
				font-weight: 400;
				color: #969896;
				padding-left: 15px;
			}
		}
		.body-item {
			padding: 15px 15px;
			.item-part {
				border: 1px solid #bfbfbf;
				padding: 15px;
				.part-row{
					display: flex;
					padding: 5px 0px;
					.name {
						color: #969896;
						width: 80px;
					}
					.info {
						flex: 1;
					}
				}
			}
			.message {
				font-size: 13px;
				color: #969896;
				padding: 15px 0px;
			}
		}
		.press-title {
			color: #969896;
			padding: 0px 15px;
		}
	}
</style>