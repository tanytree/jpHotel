/*
* @Author: 权限设置
* @Date: 2020-03-10 13:45:16
* @Last Modified by:
* @Last Modified time: 2020-03-11 16:59:58
*/
<template>
	<div>
		<el-tabs class="pageTab" v-model="activeName">
			<el-tab-pane :label="boss_first_title" name="first">
				<el-tabs v-model="active_second_name" type="card">
				</el-tabs>
			</el-tab-pane>
			<el-tab-pane :label="boss_second_title" name="second">
				<div style="padding: 10px 0px;">
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item :to="{ name: 'bossIndex' }">员工权限</el-breadcrumb-item>
						<el-breadcrumb-item>权限设置</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="second-body">
					<div class="body-item">
						<img src="../../assets/images/caigou/kuai01.png" alt="">
						<span>王子文</span>
					</div>
					<div class="body-content">
						<div class="row-line">
							<span class="row-title">具体权限设置（总办部）</span>
							<span class="row-gray">开启后就拥有该项权限</span>
						</div>
						<!-- 报表 -->
						<div class="row-line">
							<div class="top">
								<span>首页</span>
								<div class="select-icon">
									<el-checkbox v-model="open">全部开启</el-checkbox>
								</div>
							</div>
							<div class="content">
								<div class="content-item">
									<div class="r-content">
										<i class="el-icon-more"></i>
										<span>报表</span>
									</div>
									<div class="r-content">
										<el-switch v-model="switch_status" active-color="#409EFF" inactive-color="#999">
										</el-switch>
									</div>
								</div>
							</div>
						</div>
						<!-- 部门负责人 -->
						<div class="row-line">
							<div class="top">
								<span>部门负责人</span>
								<div class="select-icon">
									<el-checkbox v-model="open">全部开启</el-checkbox>
								</div>
							</div>
							<div class="content">
								<div class="content-item">
									<div class="r-content">
										<i class="el-icon-more"></i>
										<span>负责人授权</span>
									</div>
									<div class="r-content">
										<el-switch v-model="switch_status" active-color="#409EFF" inactive-color="#999">
										</el-switch>
									</div>
								</div>
							</div>
						</div>
						<!-- 人员管理 -->
						<div class="row-line">
							<div class="top">
								<span>人员管理</span>
								<div class="select-icon">
									<el-checkbox v-model="open">全部开启</el-checkbox>
								</div>
							</div>
							<div class="content">
								<div class="content-item">
									<div class="r-content">
										<i class="el-icon-more"></i>
										<span>人员管理</span>
									</div>
									<div class="r-content">
										<el-switch v-model="switch_status" active-color="#409EFF" inactive-color="#999">
										</el-switch>
									</div>
								</div>
								<div class="content-item">
									<div class="r-content">
										<i class="el-icon-more"></i>
										<span>已离职员工</span>
									</div>
									<div class="r-content">
										<el-switch v-model="switch_status" active-color="#409EFF" inactive-color="#999">
										</el-switch>
									</div>
								</div>
							</div>
						</div>
						<!-- 薪酬管理 -->
						<div class="row-line">
							<div class="top">
								<span>薪酬管理</span>
								<div class="select-icon">
									<el-checkbox v-model="open">全部开启</el-checkbox>
								</div>
							</div>
							<div class="content">
								<div class="content-item">
									<div class="r-content">
										<i class="el-icon-more"></i>
										<span>薪酬管理</span>
									</div>
									<div class="r-content">
										<el-switch v-model="switch_status" active-color="#409EFF" inactive-color="#999">
										</el-switch>
									</div>
								</div>
								<div class="content-item">
									<div class="r-content">
										<i class="el-icon-more"></i>
										<span>薪酬设置</span>
									</div>
									<div class="r-content">
										<el-switch v-model="switch_status" active-color="#409EFF" inactive-color="#999">
										</el-switch>
									</div>
								</div>
							</div>
						</div>
					</div>
					<el-card class="box-card">
						<div class="btn-icon">
							<div class="btn">
								<el-button>返回</el-button>
								<el-button type="primary">保存</el-button>
							</div>
						</div>
					</el-card>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'second',
				boss_first_title: '报表',
				boss_second_title: '员工权限',
				open: true,
				switch_status: true
			}
		},
		methods: {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	// 下拉标题
	.el-dropdown-link {
		cursor: pointer;
		color: #409EFF;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	// ========
	.second-body {
		position: relative;

		.body-item {
			display: flex;
			align-items: center;
			padding: 20px 15px;
			font-size: 12px;
			border-top: 1px solid #e5e5e5;

			img {
				height: 30px;
				width: 30px;
				border-radius: 50%;
				background-color: #F2F2F2;
				margin-right: 20px;
			}
		}

		.body-content {
			.row-line {
				font-size: 12px;
				line-height: 300%;

				.row-title {
					font-size: 14px;
					font-weight: bolder;
					padding-right: 30px;
				}

				.row-gray {
					font-size: 12px;
					color: #666666;
				}

				.top {
					display: flex;

					span {
						width: 120px;
					}
				}

				.content {
					display: flex;

					.content-item {
						width: 300px;
						border: 1px solid #e5e5e5;
						border-radius: 2px;
						padding: 10px 15px;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.r-content {
							font-size: 12px;

							i {
								background-color: #e5e5e5;
								border-radius: 2px;
								color: #666666;
								margin-right: 10px;
								padding: 5px 5px;
							}

							.el-checkbox__label {
								font-size: 12px !important;
							}
						}
					}

					.content-item+.content-item {
						margin-left: 10px;
					}
				}
			}

			.row-line+.row-line {
				padding-top: 10px;
			}
		}

		.btn-icon {
			background-color: #fff;
			display: flex;
			justify-content: flex-end;
		}
	}
</style>
