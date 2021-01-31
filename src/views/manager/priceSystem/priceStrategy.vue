<template>
	<div>
		<el-row>
			<el-tabs v-model="activName">
				<el-tab-pane :label="$t('manager.ps_member')" name="member">
					<Member :tab1_show= 'tab1_show'></Member>
				</el-tab-pane>
				<el-tab-pane :label="$t('desk.book_travelerA')" name="houseMaintain">
					<HouseMaintain type="strategy"></HouseMaintain>
				</el-tab-pane>
			</el-tabs>
		</el-row>
	</div>
</template>

<script>
    import HouseMaintain from '../guestCenter/HouseMaintain'
	import Member from './type/member_list';
	import unitList from './type/unitList';
	export default {
		components: {
			Member, unitList, HouseMaintain
		},
		data() {
			return {
				activName: 'member',
				tab1_show: true
			}
		},
		watch:{
			activName() {
				//
				switch (this.activName) {
					case 'a':
					break;
					case 'b':
					// this.unit_show = true
					break;
				}
			}
		},
		mounted() {
		},
		methods: {
			backMember() {
				this.activName = 'member'
			}
		}
	};
</script>

<style lang="less" scoped>
	.editPriceDialog .tip {
		font-size: 12px;
		color: #b1b1b1;
	}

	.row-width {
		width: 120px;
	}

	.padding-item {
		padding-bottom: 5px;
	}

	.btn-click {
		height: 200px;
		width: 300px;
		background: #e5e5e5;
		// background-color: linear-gradient(toright, #e5e5e5, #e5e5e5);
		display: flex;
		justify-content: center;
		align-items: center;

		i {
			font-size: 30px;
		}

		span {
			font-size: 20px;
			color: #666666;
			margin-left: 10px;
		}
	}

	.btn-click:hover {
		height: 200px;
		width: 300px;
		background: #4db8ff;
		// background: linear-gradient(toright, #4db8ff, #1aa3ff);
		display: flex;
		justify-content: center;
		align-items: center;

		i {
			font-size: 30px;
			color: #fff;
		}

		span {
			font-size: 20px;
			color: #fff;
			margin-left: 10px;
		}
	}

	.member-price .el-table .cell {
		cursor: pointer !important;
	}
</style>
