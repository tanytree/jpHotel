<template>
	<div class="membership-management">
		<div class="message">可以设置每个应用的适用范围，也可以在工作台上进行功能和使用人员设置，有权限的员工会获的操作权限</div>
		<div class="title">已启用微应用授权</div>
		<div class="parts">
			<div class="part-item" v-for="(value,index) in tagList" :key="index">
				<div class="img">
					<img :src="value.icon" alt="" />
				</div>
				<div class="name">{{ value.name }}</div>
				<div class="see">{{value.num }}部门可见</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

	export default {
		data() {
			return {
				tagList:[{
					icon:require("@/assets/images/icon04.png"),
					name:"财务部",
					num:"3"
				},{
					icon:require("@/assets/images/icon05.png"),
					name:"人事部",
					num:"3"
				},{
					icon:require("@/assets/images/icon06.png"),
					name:"营销部",
					num:"3"
				},{
					icon:require("@/assets/images/icon07.png"),
					name:"云库存",
					num:"3"
				},{
					icon:require("@/assets/images/icon08.png"),
					name:"采购部",
					num:"3"
				},{
					icon:require("@/assets/images/icon09.png"),
					name:"销售部",
					num:"3"
				},{
					icon:require("@/assets/images/icon07.png"),
					name:"审批",
					num:"3"
				},{
					icon:require("@/assets/images/icon07.png"),
					name:"公告",
					num:"3"
				},{
					icon:require("@/assets/images/icon07.png"),
					name:"任务",
					num:"3"
				}]
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
		.message {
			padding: 20px;
			color: #969896;
		}
		.title {
			padding: 0px 20px;
			font-size: 18px;
			font-weight: bold;
		}
		.parts {
			display: flex;
			flex-wrap: wrap;
			padding: 20px;
			.part-item {
				display: inline-flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				line-height: 170%;
				border:1px solid #F5F2F0;
				background-color: #FFFFFF;
				box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);
				padding:20px;
				margin :20px;
				.img {
					height: 50px;
					width: 50px;
					img {
						height: 100%;
						width: 100%;
					}
				}
				.name {
					font-size: 14px;
					color: #969896;
				}
				.see {
					color: #126EFF;
					font-size: 14px;
				}
			}
			.part-item + .part-item {
				/*margin-left: 30px;*/
			}
		}
	}
</style>