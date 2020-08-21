<template>
	<div>
		<el-row>
			<el-row :gutter="20">
				<el-row>
					<el-form class="demo-form-inline" inline size="small">
						<el-form-item label="会员类型:">
							<el-input v-model="ruleForm_r.name" class="row-width"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" style="width: 100px;" size="mini" @click="get_hotel_rule_member_price_list">查询</el-button>
						</el-form-item>
					</el-form>
				</el-row>
				<div class="components-edit">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
						<el-table-column prop="name" label="会员类型"></el-table-column>
						<el-table-column label="计费规则">
							<template slot-scope="{row}">
								<span>{{row.hotelRuleMemberPrice.alldayRuleName}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="time" label="状态">
							<template slot-scope="{row}">
								<span>{{row.state ? '启用':'禁用'}}</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="popup('sit', scope.row)">设置</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
					    @size-change="handleSizeChange"
					    @current-change="handleCurrentChange"
					    :current-page="ruleForm_r.pageIndex"
					    :page-sizes="[10, 20, 50, 100]"
					    :page-size="ruleForm_r.pageSize"
					    :total="ruleForm_r.totalSize"
					    layout="total, sizes, prev, pager, next, jumper"
					></el-pagination>
				</div>
			</el-row>
		</el-row>
		
		<!-- 设置 -->
		<el-dialog top="0" title="设置" :visible.sync="dialogsit" :close-on-click-modal="false">
			<el-row :gutter="20">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
					<el-col :span="18">
						<el-form-item label="会员类型:">
							<el-input v-model="ruleForm.name" disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="状态:">
							<el-radio-group v-model="ruleForm.state">
								<el-radio :label="1">启用</el-radio>
								<el-radio :label="2">禁用</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="计费规则:" class="margin-l-15">
							<el-select v-model="ruleForm.alldayRuleId" :placeholder="ruleForm.alldayRuleName" style="width: 100%;">
								<el-option :label="value.ruleName" :value="value.id" v-for="(value, index) in ruleList" :key="index"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogsit = false">取 消</el-button>
				<el-button type="primary" @click="saveInfo">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tab_show: true,
				tableData: [],
				ruleForm_r: {
					name: '',
					pageIndex: 1,
					pageSize: 10,
					totalSize: 0
				},
				ruleForm: {},
				dialogsit: false,
				alldayRuleId: '',
				alldayRuleId_name: '',
				ruleList: []// 全天房计费规则
			};
		},
		created() {
			this.get_hotel_rule_member_price_list()
		},
		methods: {
			popup(type, value) {
				// debugger
				switch (type) {
					case 'sit':
						this.dialogsit = true;
						this.ruleForm = value;
						this.ruleForm.alldayRuleId = this.ruleForm.hotelRuleMemberPrice.alldayRuleId
						this.ruleForm.alldayRuleName = this.ruleForm.hotelRuleMemberPrice.alldayRuleName
						this.get_hotel_rule_allday_list()
						break
				}
			},
			// 查询
			searchBtn() {
				this.tableData = []
				this.get_hotel_rule_member_price_list()
			},
			saveInfo() {
				let params = {
					id: this.ruleForm.hotelRuleMemberPrice.id,
					memberId: this.ruleForm.hotelRuleMemberPrice.memberId,
					alldayRuleId: this.ruleForm.alldayRuleId,
					state: this.ruleForm.state,
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_member_price_save', params, (res) => {
					this.tableData = []
					this.dialogsit = false;
					this.get_hotel_rule_member_price_list()
					this.$message({
					  message: '设置成功',
					  type: 'success'
					});
				})
			},
			// 获取 计费规则全天房计费列表
			get_hotel_rule_allday_list() {
				let params = {
					pageIndex: 1,
					pageSize: 999,
					totalSize: 0
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_allday_list', params, (res) => {
					if (res.list.length != 0) {
						res.list.forEach(item =>{
							if (item.status != 2) {
								this.ruleList.push(item)
							}
						})
					}
				})
			},
			// 获取 全部房型
			get_hotel_room_type_list() {
				let params = {
					roomType: 3,
					paging: false,
					pageIndex: 1,
					pageSize: 999
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_room_type_list', params, (res) => {
					if (res.list.length != 0) {
						res.list.forEach(item => {
							item.startPrice = ''
							item.hourAddPrice = ''
							item.topPrice = ''
							item.remark = ''
						})
						debugger
						this.allForm.roomStrategyJson = res.list
						this.ruleForm_h.roomStrategyJson = res.list
					}
				})
			},
			// 获取 计费规则时租房计费列表
			get_hotel_rule_member_price_list() {
				let params = Object.assign({}, this.ruleForm_r)
				this.$F.doRequest(this, '/pms/hotel/hotel_rule_member_price_list', params, (res) => {
					if (res.list.length != 0) {
						this.tableData = res.list
						this.ruleForm_r.totalSize = res.totalSize
					}
				})
			},
			back() {
				this.tab_show = true;
			},
			// 分页
			handleSizeChange(val) {
				this.ruleForm_r.pageSize = val;
				this.ruleForm_r.pageIndex = 1;
				this.get_hotel_rule_member_price_list();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.ruleForm_r.pageIndex = val;
				this.get_hotel_rule_member_price_list();
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
