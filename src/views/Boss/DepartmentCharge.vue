<template>
	<div class="boss-index">
		<el-tabs class="pageTab" v-model="activeName">
			<el-tab-pane label="负责人授权" name="first">
				<el-table :data="tableData" style="width: 100%" tooltip-effect="dark" :header-cell-style="{background:'#e6eaed',color:'#1E1E1E'}">
					<el-table-column prop="menuTitle" label="部门名称"></el-table-column>
					<el-table-column prop="header_name" label="负责人" width="800">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="selectPeople(scope.row)">设为负责人</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		<el-dialog top="0" title="设为负责人" :visible.sync="dialogTableVisible" :close-on-click-modal="false" @close ="closeDialog">
			<el-col :span="5" class="col-title">{{dialog_info.title}}</el-col>
			<el-row>
				<el-input placeholder="请输入内容" v-model="dialog_info.content" class="input-with-select">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
				<el-row>
					<ul class="infinite-list" style="overflow:auto">
						<el-row class="list" v-for="(value,index) in peopleList " :key='index'>
							<div @click="changeRedio(value,index)">
								<el-col class="item">
									<el-checkbox :value="value.checked"></el-checkbox>
									<img src="../../assets/images/icon02.png" alt="" class="img-head">
									<el-col>{{value.userName}}</el-col>
								</el-col>
								<el-col class="item item-r">
									<el-col>{{value.phone}}</el-col>
								</el-col>
							</div>
						</el-row>
					</ul>
					<el-row>
						<el-col class="selected">已选择: {{dialog_info.selected_name}}</el-col>
					</el-row>
				</el-row>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogTableVisible = false">取 消</el-button>
				<el-button type="primary" @click="defineChange">确 定</el-button>
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
				dialogTableVisible: false,
				dialog_info: {
					header: null,
					title: '',
					content: '',
					selected_name:'',
					selected_id: '',
					departmentId: '',
					searchType: 1, //检索类型  1普通检索  2门店列表用户检索
					pageIndex:1,
					pageSize:6
				},
				peopleList: [], //设为负责人--人员列表
			}
		},
		created() {
			this.get_tableDate()
		},
		methods: {
			//获取负责人列表
			get_tableDate() {
				let params ={
					type:1,
					departmentHeader :true
				}
				this.$F.doRequest(this, '/pms/role/menu_list', params, (res) => {
					if (res) {
						res.forEach((value) =>{
							if (value.header) {
								value.header_name = value.header.userName
							}
						})
					}
					this.tableData = res
				})
			},
			// 弹框 -- 获取人员列表
			get_dialogList() {
				let params = this.dialog_info
				this.$F.doRequest(this, '/pms/workuser/login_user_list', params, (res) => {
					if (res) {
						res.hotelUserList.forEach((value) =>{
							value.checked = false
						})
						this.peopleList = res.hotelUserList
					}
				})
			},
			// 弹框--改变选中的人
			changeRedio(value, index) {
				this.peopleList.forEach((item) =>{
					item.checked = false
				})
				this.peopleList[index].checked = true
				this.dialog_info.selected_name = value.userName
				this.dialog_info.selected_id = value.id
			},
			// 设置负责人--确认
			defineChange() {
				let params = {}
				if (this.dialog_info.header == null) {
					params = {
						disUserId: this.dialog_info.selected_id,
						departmentId:this.dialog_info.departmentId,
						operType: 1,//操作类型   1新设置  2更换
					}
				} else {
					params = {
						disUserId: this.dialog_info.selected_id,
						departmentId:this.dialog_info.departmentId,
						operType: 2,//操作类型   1新设置  2更换
					}
				}
				this.$F.doRequest(this, '/pms/workuser/set_department_user', params, (res) => {
					this.dialogTableVisible = false
					this.$message({
					  message: '设置成功!',
					  type: 'success'
					});
					this.get_tableDate()
				})
			},
			// 设置负责人--关闭弹框
			closeDialog() {
				this.dialog_info.selected_name =''
				this.dialog_info.selected_id =''
				this.dialogTableVisible = false
			},
			// 设置负责人--打开弹框
			selectPeople(value) {
				this.dialog_info.departmentId = value.id
				this.dialog_info.title = value.menuTitle
				this.dialog_info.header = value.header
				this.get_dialogList()
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
