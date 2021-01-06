<template>
	<div>
		<div>
			<el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
				<el-table-column v-for="(item,index) in tableList" :key="index" :label="item.label" :prop="item.prop"></el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="primary" size="mini" v-if="!scope.row.date">编辑</el-button>
						<el-button @click="downloadImg(scope.row)" type="text" size="small" v-if="!scope.row.date">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableList: [{
						label: "级别",
						prop: "date"
					},
					{
						label: "名称",
						prop: "name"
					},
					{
						label: "别名",
						prop: "alias"
					},
					{
						label: "操作员",
						prop: "operator"
					},
					{
						label: "状态",
						prop: "state"
					}
				],
				tableData: [{
						id: 1,
						date: "个人",
						children: [{
							id: 11,
							name: "第二根半价套餐",
							alias: "是兄弟就来割",
							operator: "铁手无情",
							state: "无痛"
						}]
					},
					{
						id: 2,
						date: "科室",
						children: []
					},

					{
						id: 3,
						date: "全院",
						children: [{
								id: 31,
								name: "第二根半价套餐",
								alias: "是兄弟就来割",
								operator: "铁手无情",
								state: "无痛"
							},
							{
								id: 41,
								name: "第二根半价套餐",
								alias: "是兄弟就来割",
								operator: "铁手无情",
								state: "无痛"
							}
						]
					}
				]
			};
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
