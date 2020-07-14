<template>
	<div class="boss-index">
		<el-tabs class="pageTab" v-model="activeName">
			<el-tab-pane label="负责人授权" name="first">
				<el-table :data="tableData" style="width: 100%" tooltip-effect="dark" :header-cell-style="{background:'#e6eaed',color:'#1E1E1E'}">
					<el-table-column prop="name" label="部门名称">
					</el-table-column>
					<el-table-column prop="people" label="负责人" width="800">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="handleClick(scope.row)">设为负责人</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		<el-dialog title="设为负责人" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
			<el-col :span="5" class="col-title">财务部</el-col>
			<el-row>
				<el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
				<el-row>
					<ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
						<el-row class="list" v-for="(value,index) in list " :key='index'>
							<el-col class="item">
								<el-radio v-model="value.radio" label="" style="margin-right: 0;" size="medium "></el-radio>
								<img src="../../assets/images/icon02.png" alt="" class="img-head">
								<el-col>{{value.name}}</el-col>
							</el-col>
							<el-col class="item item-r">
								<el-col>{{value.phone}}</el-col>
							</el-col>
						</el-row>
					</ul>
					<el-row>
						<el-col class="selected">以选择: 张越月</el-col>
					</el-row>
				</el-row>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				tableData: [],
				dialogTableVisible: false
			}
		},
		created() {
			this.get_tableDate()
		},
		methods: {
			get_tableDate() {
				let params ={
					type:1,
					departmentHeader :true
				}
				this.$F.doRequest(this, '/pms/role/menu_list', params, (res) => {
				  
				})
			},
			handleClick() {
				this.dialogTableVisible = true
			}
		}
	}
</script>

<style lang="less" scoped="">
	.col-title {
		padding: 10px 0px;
		font-weight: bolder;
	}
	.infinite-list {
		height: 200px;
		overflow-y: scroll;

		.list {
			display: flex;
			align-items: center;

			.item {
				display: flex;
				align-items: center;
				flex: 1;
				padding-left: 10px;
				.img-head {
					height: 30px;
					width: 30px;
					border-radius: 50%;
					background-color: #8C939D;
					margin: 20px;

				}
			}
			.item-r {
				display: flex;
				align-items: center;
				flex: 2;

			}
		}
	}
	.selected {
		padding: 10px 0px;
		font-size: 13px;
		border-top: 1px solid #E4E7ED;
	}
</style>
