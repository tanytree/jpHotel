/*
* @Author: 何丽梅 员工权限
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
								<span>前台部报表</span>
								<!-- <span>{{$t('boss.test')}}</span> -->
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
						<span>{{select_title}}</span>
					</div>
					<div class="row-body">
						<div class="row-line" v-for="(value, index) in peopleList" :key="index">
							<div class="row-item">
								<img class="row-img" src="../../assets/images/caigou/kuai01.png" alt="">
								<span class="default-text">{{value.userName}}</span>
								<!-- <span class="active-facus">{{value.userName}}</span> -->
							</div>
							<div class="row-item" @click="routerPath(value, index)">
								<el-dropdown trigger="click" @command="handleCommand">
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
		<!-- 订单详情/查看详情 -->
		<el-dialog top="0" title="查看资料" :visible.sync="dialogDetail" :close-on-click-modal="false" center width="500px">
			<el-row class="padding-item">
				<el-col span="8">姓名:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">状态:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">联系电话:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">所属部门:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">职位:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">银行账户:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">联系电话:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">企业邮箱:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">后台账号:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">工号:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">分机号:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">入职时间:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">证件类型:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">证件号:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">转正日期:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<el-row class="padding-item">
				<el-col span="8">备注:</el-col><el-col span="14">张三</el-col>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				boss_first_title: '报表',
				active_second_name: 'one',
				first_title: '首页',
				boss_second_title: '员工权限',
				select_title:'',
				peopleList:[],
				dialogDetail:false,
				select_info: {}, //点击中的选中信息
				detailInfo: {}, //点击选中项的详情
			}
		},
		created() {
			this.select_title = JSON.parse(sessionStorage.getItem('menul')).name
			this.get_tableDate()
		},
		methods: {
			//获取各部门人员列表
			get_tableDate() {
				let params ={
					departmentId:JSON.parse(sessionStorage.getItem('menul')).id,
					pageIndex:1,
					pageSize:10
				}
				this.$F.doRequest(this, '/pms/employee/employee_list', params, (res) => {
					if (res.hotelUserList != null && res.hotelUserList != '') {
						res.hotelUserList.forEach((value) =>{
							if (value.header != null && value.header != '') {
								value.header_name = value.header.userName
							}
						})
					}
					this.peopleList = res.hotelUserList
				})
			},
			//获取人员信息资料
			get_peopleInfo() {
				let params ={
					employeeId:this.select_info.id
				}
				this.$F.doRequest(this, '/pms/employee/detail_employee', params, (res) => {
					this.detailInfo = res
				})
			},
			// 作用是--ab分别跳到哪
			handleCommand(command) {
				if (command == 'a') {
					this.dialogDetail = true
					this.get_peopleInfo()
				} else {
					this.$router.push({name:"indexDesign"})
				}
			},
			// 作用是--点击获取当前点击的信息
			routerPath(value,index) {
				this.select_info = value
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.padding-item {
		padding-bottom: 8px;
	}
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
