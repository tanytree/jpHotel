/*
* @Author: 黄栋 广告管理
* @Date: 2020-03-10 13:45:16
* @Last Modified by: cindy
* @Last Modified time: 2020-03-11 16:59:58
*/
<template>
	<div class="boss-index">
		<el-tabs class="pageTab" v-model="activeName">
			<el-tab-pane :label="boss_first_title" name="first">
				<el-tabs v-model="active_second_name" type="card">
					<el-tab-pane :label="first_title" name="one">
						<div class="first-body">
							<div class="title">
<!--								<span>前台部报表</span>-->
								<span>{{$t('boss.test')}}</span>
							</div>
							<div class="content-body">
								<div class="body-item">
									<div class="item-tag">
										<div class="item">营业日报</div>
										<div class="item">营业月报</div>
										<div class="item">营业年报</div>
										<div class="item">现金流明细表</div>
										<div class="item">迷你吧销售报表</div>
									</div>
									<div class="item-tag">
										<div class="item">会员卡积分明细报表</div>
										<div class="item">交班报表(前台部)</div>
										<div class="item">结账汇总报表</div>
										<div class="item">结账明细报表</div>
										<div class="item">宾客账务余额报表</div>
									</div>
									<div class="item-tag">
										<div class="item">会员卡积分兑换报表</div>
										<div class="item">单位挂账明细表</div>
										<div class="item">单位挂账汇总表</div>
										<div class="item">销售员业绩明细表</div>
										<div class="item">销售员业绩汇总表</div>
									</div>
								</div>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-tab-pane>
			<el-tab-pane :label="boss_second_title" name="second">
				<div class="second-body">
					<div class="title">
						<span>总办部</span>
					</div>
					<div class="row-body">
						<div class="row-line">
							<div class="row-item">
								<img class="row-img" src="../../assets/images/caigou/kuai01.png" alt="">
								<span class="default-text">章欣</span>
								<span class="active-facus">总经理</span>
							</div>
							<div class="row-item">
								<el-dropdown @command="handleCommand">
									<span class="el-dropdown-link">
										操作<i class="el-icon-arrow-down el-icon--right"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item command="a">查看资料</el-dropdown-item>
										<el-dropdown-item command="b">权限设置</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				boss_first_title: '报表',
				boss_second_title: '员工权限',
				active_second_name: 'one',
				first_title: '首页'
			}
		},
		methods: {
			handleCommand(command) {
				debugger
				this.$router.push({name:"indexDesign"})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.boss-index {
		height: 100%;

		.el-dropdown-link {
			cursor: pointer;
			color: #409EFF;
		}

		.el-icon-arrow-down {
			font-size: 12px;
		}

		// ========
		.first-body {
			.title {
				border-bottom: 1px solid #E4E7ED;
				margin-bottom: 15px;

				span {
					display: flex;
					padding: 15px 0px;
					font-weight: bolder;
				}
			}

			.content-body {
				.body-item {
					display: flex;

					.item-tag {
						width: 200px;
						font-size: 12px;
						display: flex;
						//flex: 1;
						flex-direction: column;
						justify-content: space-between;

						.item {
							padding: 5px 0px;
							line-height: 15px;
						}
					}
				}
			}
		}

		.second-body {
			.title {
				border-bottom: 1px solid #E4E7ED;
				span {
					display: flex;
					padding: 15px 0px;
					font-weight: bolder;
				}
			}
			.row-body {
				.row-line {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 15px 0px;
					border-bottom: 1px solid #e5e5e5;
					.row-item {
						display: flex;
						align-items: center;
						font-size: 12px;
						.row-img {
							height: 40px;
							width: 40px;
							border-radius: 50%;
							background-color: #F2F2F2;
						}
						.default-text {
							padding: 0px 15px;
						}
						.active-facus {
							border: 1px solid #126eff;
							padding: 3px 15px;
							border-radius: 5px;
							color: #126eff;
						}
					}
				}
			}
		}
	}
</style>
