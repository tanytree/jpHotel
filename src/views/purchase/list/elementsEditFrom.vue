<template>
	<div class="purchase">
		<div class="title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ name: 'DetailedList' }">采购清单</el-breadcrumb-item>
				<el-breadcrumb-item>待接受合同</el-breadcrumb-item>
				<el-breadcrumb-item>合同要素编辑</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="content-show">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="合同名称" prop="name" class="padd-line">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
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
					</div>
					<div class="message-item">
						<div class="name">
							<div class="name-title">法定代表</div>
							<div class="name-info">张三</div>
						</div>
						<div class="name">
							<div class="name-title">联系电话</div>
							<div class="name-info">1575556394</div>
						</div>
					</div>
					<div class="message-item">
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
					</div>
					<div class="message-item">
						<div class="name">
							<div class="name-title">法定代表</div>
							<div class="name-info">李四</div>
						</div>
					</div>
					<el-form-item label="联系人" prop="name" class="padd-line">
						<el-input v-model="ruleForm.user_name"></el-input>
					</el-form-item>
					<el-form-item label="联系电话" prop="name" class="padd-line">
						<el-input v-model="ruleForm.user_phone"></el-input>
					</el-form-item>
				</div>
				<div class="message">
					<div class="title">采购条件</div>
					<el-form-item label="交货期" prop="name" class="padd-line">
						<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="交货方式" prop="name" class="padd-line">
						<el-select v-model="ruleForm.way" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="交货地点" prop="name" class="padd-line">
						<el-input v-model="ruleForm.address"></el-input>
					</el-form-item>
				</div>
				<div class="message">
					<div class="title">采购方要求</div>
					<el-form-item label="验收方式" prop="name" class="padd-line">
						<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="质量要求" prop="name" class="padd-line">
						<el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.addres" maxlength="100" show-word-limit></el-input>
					</el-form-item>
				</div>
				<div class="message">
					<div class="title">不合格产品处理</div>
					<el-form-item label="" prop="name" class="padd-line">
						<el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.deal" maxlength="300" show-word-limit></el-input>
					</el-form-item>
				</div>
				<div class="message">
					<div class="title">付款</div>
					<el-form-item label="付款方式" prop="name" class="padd-line">
						<el-select v-model="ruleForm.pay_way" placeholder="请选择付款方式">
							<el-option label="分期付款" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="分期次数" prop="name" class="padd-line">
						<el-select v-model="ruleForm.pay_way_num" placeholder="请选择分期次数">
							<el-option label="2次" value="shanghai"></el-option>
							<el-option label="6次" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<div class="info">
						<div class="info-item">
							<el-form-item label="第一期" prop="name" class="padd-line">
								<div class="input">
									<el-input v-model="ruleForm.address"></el-input><span>元</span>
								</div>
							</el-form-item>
							<el-form-item label="付款条件" prop="name" class="padd-line">
								<el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.deal" maxlength="300" show-word-limit></el-input>
							</el-form-item>
							<el-form-item label="付款日期" prop="name" class="padd-line" style="width: 100px;">
								<el-select v-model="ruleForm.pay_way" placeholder="请选择付款日期">
									<el-option label="分期付款" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
						</div>
					</div>
				</div>
				<div class="message">
					<div class="title">违约条款</div>
					<el-form-item label="买方违约金" prop="name" class="padd-line">
						<el-input placeholder="请输入内容" v-model="ruleForm.deal"></el-input>
					</el-form-item>
					<el-form-item label="卖方违约金" prop="name" class="padd-line">
						<el-input placeholder="请输入内容" v-model="ruleForm.deal"></el-input>
					</el-form-item>
				</div>
				<div class="message">
					<div class="title">产品报价</div>
					<el-table :data="tableData" style="width: 100%" height="250">
						<el-table-column type="index" label="序号"></el-table-column>
						<el-table-column prop="name" label="产品">
						</el-table-column>
						<el-table-column label="图片">
							<template slot-scope="scope">
								<img class="goods-img" src="../../../../build/logo.png" />
							</template>
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
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button type="text" size="small" v-for="(value,index) in scope.row.scope_list" :key="index" @click="toSelect(index)">{{value.name}}</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="all-money">
						<div class="money-item">总报价</div>
						<div class="money-item-r">5555510525</div>
					</div>
				</div>
			</el-form>
		</div>
		<div class="content-btn">
			<el-button>取消</el-button>
			<el-button type="primary" @click="onSave">提交</el-button>
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
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					]
				}
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
		>.title {
			padding: 20px 20px;
			font-size: 16px;
			color: #999999;
			border-bottom: 1px #f7f7f7 solid;
		}
		.padd-line {
			padding: 10px 0px;
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
			flex-direction: column;
			flex: 1;
			.demo-ruleForm {
				.info {
					.info-item {
						display: flex;
					}
				}
				>.message {
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
						padding: 30px 20px 15px 20px;
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
			}
			.content-title {
				padding: 15px 0px;
				font-size: 14px;
				color: #606266;
			}
			.size {
				display: flex;
				align-items: center;
				.kinds {
					display: inline-flex;
					align-items: center;
					flex: 1;
					padding-left: 10px;
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