
<template>
    <div id="page1">
        <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="房间动态" name="a">
                <roomStatus ref="roomStatus"/>
            </el-tab-pane>
            <el-tab-pane label="夜审设置" name="b" >
                <nightSite ref="nightSite"/>
            </el-tab-pane>
			<el-tab-pane label="发票维护" name="c" >
			    <billMainten ref="billMainten"/>
			</el-tab-pane>
			<el-tab-pane label="损物赔偿" name="d" >
			    <damageCompensate ref="damageCompensate"/>
			</el-tab-pane>
			<el-tab-pane label="交班设置" name="e" >
			    <shiftSite ref="shiftSite"/>
			</el-tab-pane>
			<el-tab-pane label="酒店服务" name="f" >
			    <hotelServices ref="hotelServices"/>
			</el-tab-pane>
			<el-tab-pane label="打印管理" name="g" >
			    <printingMg ref="printingMg"/>
			</el-tab-pane>
			<el-tab-pane label="员工权限" name="h" >
			    <personAuth ref="personAuth"/>
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
    import personAuth from './personAuth'
    import { mapState, mapActions } from "vuex";
    export default {
        components: { roomStatus,nightSite,billMainten,damageCompensate,shiftSite,hotelServices,printingMg,personAuth},
        computed: {
            ...mapState({
                user: state => state.user
            }),
        },
        data () {
            return {
                activeName: 'a', //第一个默认启动

            }
        },
        created () {
        },
        activated () {
        },
        methods: {
			handleClick() {}
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

	.margin-l {
		margin-left: 8px;
	}

	.tag-margin {
		margin-right: 8px;
		margin-top: 8px;
	}

	.row-width {
		width: 120px;
	}

	.demo-form-inline {
		display: flex;
		align-items: center;
	}

	.font {
		font-size: 13px;
	}

	.tag-top {
		margin-top: 10px;
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
