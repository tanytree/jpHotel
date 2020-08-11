
<template>
    <div class="boss-index" id="page1">
        <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="房间动态" name="a">
                <roomStatus ref="roomStatus"/>
            </el-tab-pane>
            <el-tab-pane label="夜审设置" name="b" >
                <nightSite ref="nightSite" :findOne="findOne" :initData="getFindOneData"/>
            </el-tab-pane>
			<!--<el-tab-pane label="发票维护" name="c" >
			    <billMainten ref="billMainten"/>
			</el-tab-pane>-->
			<el-tab-pane label="损物赔偿" name="d" >
			    <damageCompensate ref="damageCompensate" :list="damageData" :initData="getDamageTypeData"/>
			</el-tab-pane>
			<el-tab-pane label="交班设置" name="e" >
			    <shiftSite ref="shiftSite" />
			</el-tab-pane>
			<el-tab-pane label="酒店服务" name="hotel" >
			    <hotelServices ref="hotelServices" :hotelData="hotelData" :initData="getHotelServiceData"/>
			</el-tab-pane>
			<el-tab-pane label="打印管理" name="print" >
			    <printingMg ref="printingMg" :printData="printData" :initData="getPrintParamData"/>
			</el-tab-pane>
            <!-- 员工权限-->
            <el-tab-pane :label="$F.filterThirdMenu('manager', 'staff-rights').thirdMenu"
                         v-if="$F.filterThirdMenu('manager', 'staff-rights', true)">
                <EmployeeRights/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import roomStatus from './roomStatus'
	import nightSite from './nightSite'
	import billMainten from './billMainten'
	import damageCompensate from './damageCompensate'
	import shiftSite from './shiftSite'
	import hotelServices from './hotelServices'
	import printingMg from './printingMg'
    import EmployeeRights from '@/components/employeeRights'
    import { mapState, mapActions } from "vuex";
    export default {
        components: { roomStatus,nightSite,billMainten,damageCompensate,shiftSite,hotelServices,printingMg,EmployeeRights},
        computed: {
            ...mapState({
                user: state => state.user
            }),
        },
        data () {
            return {
				pageForm: {
					pageIndex: 1,
					pageSize: 10,
					paging: true
				},
                activeName: 'a', //第一个默认启动
				findOne: {arriveStatus: 1, leaveStatus: 2, leaveOrder: 1, isOd: 1, trialType: 1, state: 1, trialStartTime: "", trialEndTime: "", trialAutoTime: ""},
				damageData: [],
                hotelData: {imgPath: '', name: '', address: '', phone: '', startTime: '', endTime: '', remark: ''},
                printData: [],
            }
        },
        created () {
        },
        activated () {
        },
        methods: {
			handleClick(tab) {
				this.activeName = tab.name;
				if(tab.name == 'b') {
					this.getFindOneData();
				} else if (tab.name == 'd') {
					this.getDamageTypeData();
				} else if (tab.name == 'hotel') {
				    this.getHotelServiceData()
				} else if (tab.name == 'print') {
				    this.getPrintParamData()
                }
			},
			getFindOneData() {
				this.$F.doRequest(this, '/pms/nighttrial/findone', {}, (res) => {
					res.arriveStatus = res.arriveStatus == 1 ? true : false;
					res.leaveStatus = res.leaveStatus == 1 ? true : false;
					res.leaveOrder = res.leaveOrder == 1 ? true : false;
					res.isOd = res.isOd == 1 ? true : false;
					res.trialType = res.trialType == 1 ? true : false;
					this.findOne = res;
				})
			},
			getDamageTypeData(id, name, status) {
				const params = {
					id: id,
					name: name,
					status: status,
				}
				this.$F.merge(params, this.pageForm);
				this.$F.doRequest(this, '/pms/hoteldamagetype/list', params, (res) => {
					this.damageData = res.list
				})
			},
            getHotelServiceData() {
                this.$F.doRequest(this, '/pms/hotelservice/findone', {}, (res) => {
                    this.hotelData = res;
                })
            },
            getPrintParamData() {
                this.$F.doRequest(this, '/pms/documentsparams/list', {}, (res) => {
                    this.printData = res.list;
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.tag-width {
		width: 80px;
		display: flex;
		justify-content: center;
	}

	.tag-margin {
		margin-right: 8px;
		margin-top: 8px;
	}

	.row-width {
		width: 120px;
	}

	.font {
		font-size: 13px;
	}

	.tag-top {
		padding: 10px;
		display: flex;

		.label {
			line-height: 30px;
			margin-right: 20px;

			.el-checkbox {
				color: #1e1e1e;
				font-size: 16px;

				.el-checkbox__label {
					font-size: 16px;
				}
			}
		}
		.value {
			margin-right: 20px;
		}
		.tips {
			line-height: 30px;
			font-size: 16px;
			color: #888888;
		}
	}

	.tag-group {
		display: flex;
		align-items: center;
		margin-bottom: 18px;
	}

	.box-card {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 350px;
		height: auto;
		padding: 10px 20px;
	}

	.fix-circle {
		height: 45px;
		width: 45px;
		position: absolute;
		bottom: -20px;
		right: -20px;
	}

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
</style>
