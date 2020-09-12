
<template>
    <div class="boss-index" id="page1">
<!--        <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">-->
<!--            <el-tab-pane label="房间动态" name="a">-->
<!--                <roomStatus ref="roomStatus"/>-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane label="夜审设置" name="b" >-->
<!--                <nightSite ref="nightSite" :findOne="findOne" :initData="getFindOneData"/>-->
<!--            </el-tab-pane>-->
<!--            &lt;!&ndash;<el-tab-pane label="发票维护" name="c" >-->
<!--                <billMainten ref="billMainten"/>-->
<!--            </el-tab-pane>&ndash;&gt;-->
<!--            <el-tab-pane label="损物赔偿" name="d" >-->
<!--                <damageCompensate ref="damageCompensate" :list="damageData" :initData="getDamageTypeData"/>-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane label="交班设置" name="hand" >-->
<!--                <shiftSite ref="shiftSite" :handData="handData" :initData="getHandOverData" />-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane label="酒店服务" name="hotel" >-->
<!--                <hotelServices ref="hotelServices" :hotelData="hotelData" :initData="getHotelServiceData"/>-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane label="打印管理" name="print" >-->
<!--                <printingMg ref="printingMg" :printData="printData" :initData="getPrintParamData"/>-->
<!--            </el-tab-pane>-->
<!--            &lt;!&ndash; 员工权限&ndash;&gt;-->
<!--            <el-tab-pane :label="$F.filterThirdMenu('manager', 'staff-rights').thirdMenu"-->
<!--                         v-if="$F.filterThirdMenu('manager', 'staff-rights', true)">-->
<!--                <EmployeeRights/>-->
<!--            </el-tab-pane>-->
<!--        </el-tabs>-->

        <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                         :name="item.path"
                         :key="item.path"
                         v-if="$F.filterThirdMenu('finance', item.path, true)">
                <!-- 房间动态-->
                <roomStatus v-if="item.path == 'roomStatus'"/>
                <!-- 夜审设置-->
                <nightSite v-if="item.path == 'nightSite'" ref="nightSite" :findOne="findOne" :initData="getFindOneData"/>
                <!-- 损物赔偿-->
                <damageCompensate v-if="item.path == 'damageCompensate'" ref="damageCompensate" :list="damageData" :typeTotal="typeTotal" :initData="getDamageTypeData"/>
                <!-- 交班设置-->
                <shiftSite v-if="item.path == 'shiftSite'"  ref="shiftSite" :handData="handData" :initData="getHandOverData" />
                <!-- 酒店服务-->
                <hotelServices v-if="item.path == 'hotelServices'" ref="hotelServices" :hotelData="hotelData" :initData="getHotelServiceData"/>
                <!-- 打印管理-->
                <printingMg v-if="item.path == 'printingMg'"  ref="printingMg" :printData="printData" :initData="getPrintParamData"/>
                <!-- 员工权限-->
                <EmployeeRights v-if="item.path == 'staff-rights'"/>
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
                activeName: 'damageCompensate', //第一个默认启动
				findOne: {arriveStatus: 1, leaveStatus: 2, leaveOrder: 1, isOd: 1, trialType: 1, state: 1, trialStartTime: "", trialEndTime: "", trialAutoTime: ""},
				damageData: [],
                hotelData: { imgPath: '', name: '', address: '', phone: '', startTime: '', endTime: '', remark: ''},
                printData: [],handData: [], typeTotal: 0,
            }
        },
          created() {
            this.$F.handleThirdMenu(this);
            this.activeName = 'damageCompensate'; //第一个默认启动
          },
        activated () {
        },
        methods: {
			handleClick(tab) {
				this.activeName = tab.name;
				if(tab.name == 'nightSite') {
					this.getFindOneData();
				} else if (tab.name == 'damageCompensate') {
					this.getDamageTypeData('', '', '', this.pageForm);
				} else if (tab.name == 'hotelServices') {
				    this.getHotelServiceData()
				} else if (tab.name == 'printingMg') {
				    this.getPrintParamData()
                } else if (tab.name == 'shiftSite') {
				    this.getHandOverData()
                }
			},
			getFindOneData() {
				this.$F.doRequest(this, '/pms/nighttrial/findone', {}, (res) => {
					res.arriveStatus = res.arriveStatus == 1;
					res.leaveStatus = res.leaveStatus == 1;
					res.leaveOrder = res.leaveOrder == 1;
					res.isOd = res.isOd == 1;
					res.trialType = res.trialType == 1;
					this.findOne = res;
				})
			},
			getDamageTypeData(id, name, status, form, callback) {
				const params = {
					id: id,
					name: name,
					status: status,
				}
				this.$F.merge(params, form);
				this.$F.doRequest(this, '/pms/hoteldamagetype/list', params, (res) => {
					this.damageData = res.list;
					this.typeTotal = res.page.count;
					callback && callback(res.page)
				})
			},
            getHotelServiceData() {
                this.$F.doRequest(this, '/pms/hotelservice/findone', {}, (res) => {
                    this.hotelData = res;
                    if (res && Object.keys(res).length > 0) {
                      this.hotelData.files = []
                      const arr = this.hotelData.imgPath.split(',')
                      arr.map(i => {
                        this.hotelData.files.push( {url: i})
                      })
                    } else
                      this.hotelData.files = []
                })
            },
            getPrintParamData() {
                this.$F.doRequest(this, '/pms/documentsparams/list', {}, (res) => {
                    this.printData = res.list;
                })
            },
            getHandOverData() {
                this.$F.doRequest(this, '/pms/handover/list', {}, (res) => {
                    this.handData = res;
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
