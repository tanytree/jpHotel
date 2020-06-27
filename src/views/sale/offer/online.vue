<template>
	<div class="membership-management">
		<!--在线报价-->
		<div class="content">
			<div class="title">在线报价</div>
			<div class="selected-tag">
				<div class="selected-item">
					<el-dropdown>
						<el-button type="primary">
							已筛选分类<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>黄金糕</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<span>点击这里设置自己想看的询盘分类</span>
				</div>
				<div class="search">
					<input type="text" v-model="keyword" placeholder="请输入商品名称或分类" />
					<button>搜索</button>
				</div>
			</div>
		</div>
		<div class="kinds">
			<div class="kind-list">
				<div class="kind-item">
					<div class="title">
						<i></i>服装
					</div>
					<div class="kind-tip">
						<div class="item">
							<div class="name">男装</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="lately">
			<div class="title">最近</div>
			<div class="goods">
				<div class="goods-item">
					<div class="goods-title">
						<img src="@/assets/images/caigou/icon.png" alt="" />
						<div class="name">智育商贸有限公司
							<span>已认证</span>
						</div>
						<div class="area">安徽</div>
					</div>
					<div class="info">
						<div class="goods-img"><img src="@/assets/images/bg.jpg" /></div>
						<div class="goods-info">
							<div class="name">智能数码采购</div>
							<div class="size">iphone xs、iphone</div>
						</div>
						<div class="offer">5条报价</div>
					</div>
					<div class="goods-btn">
							<div class="btn-item">
								<div class="time">截止日期：2019-08-08</div>
							</div>
							<div class="btn-item">
								<div class="collect">
									<i class=""></i>收藏
								</div>
								<div class="collect consult">
									<i class=""></i>咨询
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
				keyword: ""
			}
		}
	}
</script>

<style lang="less" scoped>
	.membership-management {
		margin: 15px;
		/*padding: 20px 20px 0px 20px;*/
		display: flex;
		flex-direction: column;
		flex: 1;
		background-color: #FFFFFF;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		border-radius: 10px;
		.lately {
			background-color: #FFFFFF;
			padding :0px 15px;
			.title {
				font-size: 20px;
				padding: 20px 0px;
			}
			.goods {
				display: flex;
				.goods-item {
					/*display: flex;*/
					border: 1px solid #B1B1B1;
					border-radius: 10px;
					>.goods-title {
						display: flex;
						align-items: center;
						font-size: 16px;
						padding: 15px;
						>img {
							height: 10px;
							width: 10px;
							margin-right: 10px;
						}
						>.name {
							display: inline-flex;
							align-items: center;
							flex: 1;
							>span {
								display: block;
								font-size: 11px;
								border: 1px solid #096DD9;
								border-radius: 3px;
								padding: 0px 5px;
								margin-left: 10px;
							}
						}
						>.area {
							display: flex;
							justify-content: flex-end;
							color: #969896;
						}
					}
					>.info {
						display: flex;
						padding: 15px;
						>.goods-img {
							width: 100px;
							height: 100px;
							padding-right: 10px;
							>img {
								display: block;
								width: 100px;
								height: 100px;
								border-radius: 10px;
							}
						}
						>.goods-info {
							>.name {
								font-size: 18px;
							}
							>.size {
								flex: 1;
								font-size: 15px;
								color: #969896;
							}
						}
						>.offer {
								display: flex;
								justify-content: flex-end;
								font-size: 16px;
								color: #D32626;
							}
					}
					>.goods-btn {
							display: flex;
							justify-content: space-between;
							align-items: center;
							flex: 1;
							border-top: 1px solid #B1B1B1;
							padding: 15px;
							>.btn-item {
								display: flex;
								align-items: center;
								font-size: 14px;
								color: #969896;
								>.time {}
								>.collect {
									font-size: 15px;
									display: inline-flex;
									align-items: center;
									i {}
								}
								>.consult {}
							}
						}
				}
			}
		}
		>.kinds {
			// background: url(@/assets/images/bg.jpg) no-repeat;
			background-size: cover;
			padding: 20px 15px;
			margin-top: 15px;
			>.kind-list {
				padding: 20px 20px;
				background-color: #FFFFFF;
				>.kind-item {
					>.title {
						font-size: 20px;
						color: #126EFF;
						display: flex;
						align-items: center;
						>i {
							display: block;
							width: 5px;
							height: 20px;
							border-radius: 10px;
							background-color: #126EFF;
							margin: 0px 10px;
						}
					}
					>.kind-tip {
						display: flex;
						flex-wrap: wrap;
						>.item {
							padding: 10px 5px;
							>.name {
								font-size: 14px;
							}
						}
					}
				}
			}
		}
		.content {
			background-color: #FFFFFF;
			>.title {
				font-size: 20px;
				padding: 20px 15px;
				border-bottom: 1px solid #F2F2F2;
			}
			>.selected-tag {
				display: flex;
				justify-content: space-between;
				padding: 20px 15px;
				align-items: center;
				border-bottom: 1px solid #F2F2F2;
				>.selected-item {
					display: flex;
					align-items: center;
					> span {
						font-size: 13px;
						color: #969896;
						margin-left: 10px;
					}
				}
				>.search {
					display: flex;
					input {
						width: 250px;
						padding: 12px 20px;
						border: 1px solid #B1B1B1;
					}
					button {
						font-size: 15px;
						color: #FFFFFF;
						width: 60px;
						border: 2px solid #126EFF;
						background-color: #126EFF;
					}
				}
			}
		}
	}
</style>