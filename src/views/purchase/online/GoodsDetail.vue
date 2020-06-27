<template>
	<div class="membership-management">
		<div class="title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ name: 'OnlineProcurement' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>商品详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!--在线采购-->
		<div class="content">
			<div class="selected-tag">
				<div class="selected-item">
					<div class="item"  @click="$router.push({name:'CartList'})">
						<el-badge :value="12">
							<i class="iconfont icon-gouwuche"></i>
						</el-badge>
						<span>购物车</span>
					</div>
					<div class="item" @click="$router.push({name:'DetailedList'})">
						<el-badge :value="12">
							<i class="iconfont icon-gouwucheman"></i>
						</el-badge>
						<span>采购清单</span>
					</div>
				</div>
				<div class="search">
					<input type="text" v-model="keyword" placeholder="请输入商品名称" />
					<button>搜索</button>
				</div>
			</div>
		</div>
		<div class="goods-body">
			<div class="store-name">
				<img :src="info.co_logo" />
				<span>{{info.co_name}}</span>
				<div class="store-into">
					<span>进店看看</span>
					<i class="iconfont icon-xiangyou"></i>
				</div>
			</div>
			<div class="goods-content">
				<div class="goods-img-part">
					<div class="part-l">
						<div class="bg-img">
							<img :src="info.thumb" />
						</div>
						<div class="bg-croup">
							<img v-for="(value,index) in info.thumb_url" :key="index" :src="value" @click="changeImg(value,index)" :class="currentHeadImg==index?'active-img':''" />
						</div>
					</div>
					<div class="part-item">
						<div class="part-title">{{info.title}}</div>
						<div class="part-info">
							<div class="name">价格</div>
							<div class="price">￥{{info.max_price}}</div>
						</div>
						<div class="part-info">
							<div class="name">运费</div>
							<div class="pass-word">￥{{info.postage }}</div>
						</div>
						<div class="part-size">
							<div class="color">
								<div class="name">颜色</div>
								<div class="color-img">
									<img :src="value" v-for="(value,index) in info.thumb_url" :key="index" />
								</div>
								<div class="color-name">白色</div>
							</div>
							<div class="size">
								<div class="name">尺寸</div>
								<div class="size-part">
									<div class="size-list">
										<div class="size-num">S</div>
										<div class="price">价格：329</div>
										<div class="like-price">￥126 <span>代理专属优惠</span></div>
										<el-input-number v-model="num" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number><span>件（库存865件）</span>
									</div>
									<div class="size-list">
										<div class="size-num">S</div>
										<div class="price">价格：329</div>
										<div class="like-price">￥126 <span>代理专属优惠</span></div>
										<el-input-number v-model="num" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number><span>件（库存865件）</span>
									</div>
									<div class="size-list">
										<div class="size-num">S</div>
										<div class="price">价格：329</div>
										<div class="like-price">￥126 <span>代理专属优惠</span></div>
										<el-input-number v-model="num" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number><span>件（库存865件）</span>
									</div>
								</div>
							</div>
						</div>
						<div class="scope-btn">
							<el-button plain>立即购买</el-button>
							<el-button type="primary" @click="addCart()"><i class="iconfont icon-gouwuche"></i>加入购物车</el-button>
							<el-button type="primary"><i class="iconfont icon-gouwucheman"></i>加入采购清单</el-button>
						</div>
					</div>
				</div>
				<div class="goods-params">
					<div class="title">商品参数</div>
					<div class="params-info">
						<div class="info">
							<div class="item"  v-for="(value,index) in params" :key="index">{{value.title}}:{{value.description}}</div>
						</div>
					</div>
				</div>
				<div class="goods-params">
					<div class="title">商品描述</div>
					<div class="params-info">
						<div class="info">产品描述</div>
					</div>
				</div>
				<div class="goods-params">
					<div class="title">商品详情</div>
					<div class="params-info">
						<div class="info">{{info.content}}</div>
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
				currentHeadImg: 0,
				keyword: "",
				field: {
					id: this.$route.query.value.id
				},
				num: 1,
				info: {},
				params:[],//参数
				sizeInfo:[],//商品规格
			}
		},
		created() {
			this.getGoodsInfo();
			this.getGoodsParams();
			this.getGoodsSize();
		},
		methods: {
			//点击切换图片--左边大图
			changeImg(value, index) {
				this.currentHeadImg = index;
				this.info.thumb = value;
			},
			handleChange() {},
			//加入购物车
			addCart() {
				
			},
			getGoodsInfo() {
				this.$http({
					url: this.$http.adornUrl("/market/goods/get_goods_info"),
					method: "post",
					data: this.$http.adornData(this.field)
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
							this.info = rows;
							this.info.thumb_url = rows.thumb_url.split(',');
							break;
					}
				})
			},
			//详情参数
			getGoodsParams() {
				this.$http({
					url: this.$http.adornUrl("/market/goods/get_goods_param"),
					method: "post",
					data: this.$http.adornData({
						goods_id:this.$route.query.value.id
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
							this.params = rows;
							break;
					}
				})
			},
			//详情商品规格
			getGoodsSize() {
				this.$http({
					url: this.$http.adornUrl("/mallpc/goods/get_goods_spec"),
					method: "post",
					data: this.$http.adornData({
						goods_id:this.$route.query.value.id
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
							this.sizeInfo = rows;
							break;
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.membership-management {
		margin: 15px;
		display: flex;
		flex-direction: column;
		flex: 1;
		background-color: #FFFFFF;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		border-radius: 10px;
		>.title {
			padding: 20px 20px;
			font-size: 16px;
			color: #999999;
			border-bottom: 1px #f7f7f7 solid;
		}
		.goods-body {
			padding: 15px;
			.goods-content {
				padding-left: 80px;
				.goods-params {
					>.title {
						font-size: 18px;
						font-weight: bold;
					}
					.params-info {
						margin: 20px 0px;
						border: 1px solid #F2F2F2;
						.info {
							padding: 20px;
							display:flex;
							flex-wrap: wrap;
							width:100%;
							font-size:13px;
							color:#969896;
							.item {
								width: 50%;
								padding: 5px 0px;
							}
						}
					}
				}
				.goods-img-part {
					display: flex;
					padding: 30px 30px;
					.part-item {
						display: flex;
						flex-direction: column;
						flex: 1;
						.part-title {
							font-size: 16px;
							font-weight: bold;
						}
						.part-info {
							display: flex;
							align-items: center;
							margin-top: 20px;
							.name {
								width: 80px;
							}
							.price {
								font-size: 20px;
								font-weight: bold;
								color: red;
							}
							.pass-word {
								font-size: 14px;
							}
						}
						.part-size {
							margin-top: 20px;
							background-color: rgba(244, 244, 244, 0.5);
							;
							border: 1px solid #F2F2F2;
							padding: 20px 0px;
							padding-left: 20px;
							.color {
								display: flex;
								align-items: center;
								.name {
									font-size: 15px;
									width: 80px;
								}
								.color-img {
									display: flex;
									align-items: center;
									>img {
										height: 40px;
										width: 40px;
										margin: 10px 5px;
									}
								}
								.color-name {
									font-size: 15px;
								}
							}
							.size {
								display: flex;
								align-items: center;
								border-top: 1px solid #E9E9E9;
								padding: 20px 0px;
								.name {
									font-size: 15px;
									width: 80px;
								}
								.size-list {
									display: flex;
									align-items: center;
									padding: 10px 0px;
									.size-num {
										font-size: 18px;
										width: 100px;
									}
									.price {
										font-size: 13px;
										color: #969896;
										text-decoration: line-through;
									}
									.like-price {
										font-size: 18px;
										padding: 0px 20px;
										>span {
											font-size: 13px;
											color: orange;
										}
									}
									span {
										color: #969896;
										font-size: 14px;
									}
								}
								.size-list+.size-list {
									border-top: 1px solid #E9E9E9;
								}
							}
						}
					}
					.part-l {
						display: flex;
						flex-direction: column;
						margin-right: 30px;
						.bg-img {
							display: flex;
							flex-shrink: 0;
							>img {
								height: 400px;
								width: 400px;
							}
						}
						.bg-croup {
							display: flex;
							align-items: flex-end;
							flex: 1;
							padding: 20px 0px;
							>img {
								width: 80px;
								height: 80px;
								margin: 0px 5px;
							}
							.active-img {
								border: 2px solid rgba(18, 110, 255, 1);
							}
						}
					}
					.scope-btn {
						display: flex;
						margin-top: 30px;
						i {
							margin-right: 20px;
						}
					}
				}
			}
			.store-name {
				display: flex;
				align-items: center;
				flex: 1;
				padding: 20px 30px;
				background-color: #F5F7F9;
				>img {
					height: 30px;
					width: 30px;
					border-radius: 50%;
					background-color: #F2F2F2;
					margin-right: 15px;
				}
				.store-into {
					font-size: 13px;
					color: #969896;
					margin-left: 20px;
					i {
						font-size: 14px;
					}
				}
			}
		}
		.content {
			background-color: #FFFFFF;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
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
					.item {
						padding-right: 60px;
						i {
							font-size: 20px;
							color: #999999;
						}
						span {
							margin-left: 10px;
						}
					}
					>.item+.item {
						border-left: 1px solid #B1B1B1;
						padding-left: 60px;
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