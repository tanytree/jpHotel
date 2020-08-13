<template>
	<div>
		<el-row>
			<el-tabs v-model="activName">
				<el-tab-pane label="全天房计费" name="a">
					<allDay></allDay>
				</el-tab-pane>
				<el-tab-pane label="时租房计费" name="b">
					<timep></timep>
				</el-tab-pane>
				<el-tab-pane label="配置计费规则" name="c">
					<jifei></jifei>
				</el-tab-pane>
			</el-tabs>
		</el-row>
	</div>
</template>

<script>
	import allDay from './rules/allDay';
	import timep from './rules/timep';
	import jifei from './rules/jifei';
	export default {
		components: {
			allDay, timep, jifei
		},
		data() {
			return {
				activName: 'a'
			};
		},
		// watch: {
		// 	activName() {
		// 		switch (this.activName) {
		// 			case 'a':
		// 				this.get_hotel_rule_allday_list()
		// 				break
		// 			case 'b':
		// 				this.get_hotel_rule_hour_list()
		// 				break
		// 			case 'c':
		// 				this.get_hotel_rule_member_price_list()
		// 				break
		// 		}
		// 	}
		// },
		created() {
			// this.get_hotel_rule_allday_list()
		},
		methods: {
			popup(type) {
				// debugger
				// switch (type) {
				// 	case 'addA':
				// 		this.tab1_show = false;
				// 		this.get_hotel_room_type_list()
				// 		break
				// 	case 'addB':
				// 		this.tab2_show = false;
				// 		this.get_hotel_room_type_list()
				// 		break
				// 	case 'sit':
				// 		this.dialogsit = true;
				// 		break
				// }
			}
		}
	};
</script>

<style lang="less" scoped>

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
</style>
