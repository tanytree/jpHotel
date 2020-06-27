<template>
	<div class="membership-management">
		<!--在线采购-->
		<div class="content">
			<div class="title">在线采购</div>
			<div class="selected-tag">
				<div class="selected-item">
					<div class="item" @click="$router.push({name:'CartList'})">
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
		<div class="goods">
			<div class="goods-item" v-for="(value,index) in goodsList" :key="index" @click="$router.push({name:'OnlineGoodsDetail',query:{value}})">
				<div class="img">
					<img :src="value.thumb" alt="" />
				</div>
				<div class="price">
					￥{{value.min_price}} <span>￥{{value.max_price}}</span>
				</div>
				<div class="title">{{value.title}}</div>
				<div class="name">
					<img :src="value.co_logo"/>
					<span>{{value.co_name}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				field:{
					keywords:"",
					to_co_id:"",
					categoryid:"",
					page:1,
					page_num:10
				},
				goodsList:[]
			}
		},
		created() {
			this.getGoodsList();
		},
		methods:{
			getGoodsList() {
				this.$http({
					url: this.$http.adornUrl("/mallpc/goods/get_goods_list"),
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
						this.goodsList = rows.list
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
		.goods {
			display: flex;
			flex-wrap: wrap;
			padding: 15px;
			
			.goods-item {
				background-color: #FFFFFF;
				border: 1px solid #B1B1B1;
				border-radius: 5px;
				width:220px;
				margin: 10px 10px;
				.img {
					height: 200px;
					width:100%;
					background-color:#B1B1B1;
					img {
						display: block;
						height: 100%;
						width: 100%;
						border-top-left-radius: 5px;
						border-top-right-radius: 5px;
					}
				}
				.price {
					padding: 5px 10px;
					font-size: 16px;
					color: #ff3300;
					font-weight: bold;
					span {
						color: #969896;
						font-size: 15px;
						padding-left: 10px;
					}
				}
				.title {
					overflow: hidden;
					font-size: 15px;
					padding: 5px 15px;
				}
				.name {
					display: flex;
					align-items: center;
					padding: 5px 10px;
					padding-bottom: 20px;
					font-size: 14px;
					overflow: hidden;
					img {
						height: 30px;
						width: 30px;
						border-radius: 50%;
						background-color: #F2F2F2;
						margin-right: 10px;
					}
					span {
						text-decoration: underline;
						color: #969896;
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