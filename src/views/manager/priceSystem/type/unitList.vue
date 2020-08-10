<template>
	<div>
		<el-row :gutter="20" v-if="tab1_show">
			<el-row>
				<el-form class="demo-form-inline" inline size="small">
					<el-form-item label="规则名称:">
						<el-input v-model="searchForm.ruleName" class="row-width"></el-input>
					</el-form-item>
					<el-form-item label="状态:" class="margin-l-15">
						<el-select v-model="searchForm.state" placeholder="请选择状态" class="row-width">
							<el-option label="1" value="启用"></el-option>
							<el-option label="2" value="禁用"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" style="width: 100px;" size="mini" @click="get_price_enter_strategy_list">查询</el-button>
					</el-form-item>
					<el-form-item class="form-inline-flex">
						<el-row class="form-inline-flex">
							<el-button type="primary" @click="popup('add')" style="width: 100px;" size="mini">新增</el-button>
						</el-row>
					</el-form-item>
				</el-form>
			</el-row>
			<div class="components-edit">
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
					<el-table-column prop="ruleName" label="规则名称"></el-table-column>
					<el-table-column label="状态">
						<template slot-scope="{row}">
							<span>{{row.state ? '启用':'禁用'}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="ruleName" label="备注"></el-table-column>
					<el-table-column label="操作" width="350">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="popup('detail')">查看</el-button>
							<el-button type="text" size="small" @click="popup('change')">修改</el-button>
							<el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="get_price_enter_strategy_delete(scope.row)">
								<el-button slot="reference" type="text" size="small">删除</el-button>
							</el-popconfirm>
							<el-button type="text" size="small" @click="popup('changerili')">修改日历</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-row>

		<el-row v-if="!tab1_show">
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back_1" content=""></el-page-header>
			</el-row>
			<el-row :gutter="20">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
					<el-row>
						<el-col :span="5">
							<el-form-item label="规则名称:" prop="ruleName">
								<el-input v-model="ruleForm.ruleName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item label="状态:">
								<el-radio-group v-model="ruleForm.state">
								   <el-radio label="1">启用</el-radio>
								   <el-radio label="0">禁用</el-radio>
								 </el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-col :span="20">
						<el-form-item label="选择时间:" prop="time">
							<el-date-picker v-model="ruleForm.time" type="daterange" align="right" value-format="yyyy-MM-dd" unlink-panels range-separator="至"
							                start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="选择星期:" prop="name">
							<el-checkbox-group v-model="ruleForm.weeks" @change="handleWeekDayChange">
								<el-checkbox v-for="(item, index) in weekDays" :label="item.value" :key="index">{{item.label}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="折扣率:" prop="name">
							<el-radio-group v-model="ruleForm.discounts">
								<el-radio label="1">向上取整</el-radio>
								<el-radio label="2">向下取整</el-radio>
								<el-radio label="3">四舍五入(取整)</el-radio>
								<el-radio label="4">保持不变</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-table ref="multipleTable" :data="ruleForm.roomStrategyJson" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="houseName" label="房型"></el-table-column>
				<el-table-column prop="marketPrice" label="门市价"></el-table-column>
				<el-table-column label="调价方式">
					<template slot-scope="{row, $index}">
						<el-row class="demo-form-inline">
							<el-select v-model="row.adjustType" placeholder="请选择" style="width: 150px;" @change="change(row)">
								<el-option label="折扣率" value="1"></el-option>
								<el-option label="一口价" value="2"></el-option>
							</el-select>
							<span v-if="row.adjustType == 1">
								<el-input v-model.number="row.content" min=1 max=100 style="width: 120px;margin: 0px 15px;" @input="priceBlur(row, $index)"></el-input>
								%
							</span>
							<span v-if="row.adjustType == 2">
								<el-input v-model.number="row.content" min=1 max=100 style="width: 120px;margin: 0px 15px;" @input="priceBlur(row, $index)"></el-input>
								日元
							</span>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="调价后">
					<template slot-scope="{row}">
						<el-input v-model="row.adjustPrice" :disabled="true"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;" @click="onSave">保存</el-button>
				<el-button style="width: 80px;margin-left: 20px; cursor: pointer">返回</el-button>
			</el-row>
		</el-row>

		<!-- 查看 -->
		<el-dialog top="0" title="查看" :visible.sync="dialogDetail" :close-on-click-modal="false">
			<el-row style="line-height: 30px;">
				<el-row>
					<el-col span="4" style="color: #898B8E;">规则名称:</el-col>
					<el-col span="14">张三</el-col>
				</el-row>
				<el-row>
					<el-col span="4" style="color: #898B8E;">状态:</el-col>
					<el-col span="14">张三</el-col>
				</el-row>
				<el-row>
					<el-col span="4" style="color: #898B8E;">时间:</el-col>
					<el-col span="14">张三</el-col>
				</el-row>
				<el-row>
					<el-col span="4" style="color: #898B8E;">星期:</el-col>
					<el-col span="14">张三</el-col>
				</el-row>
				<el-row>
					<el-col span="4" style="color: #898B8E;">折扣率:</el-col>
					<el-col span="14">张三</el-col>
				</el-row>
			</el-row>
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="name" label="房型"></el-table-column>
				<el-table-column prop="time" label="门市价"></el-table-column>
				<el-table-column prop="job_status" label="调价方式"></el-table-column>
				<el-table-column prop="job" label="调价后"></el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tab1_show: true,
				searchForm: { // 搜索列表参数
					ruleName: '',
					state: ''
				},
				tableData: [],
				ruleForm: {
					ruleName: '',
					time: '',
					startTime: '',
					endTime: '',
					weeks: [],
					discounts: '1',
					state: '1',
					roomStrategyJson: []
				},
				rules: {
					ruleName: [{required: true,message: '请输入规格名称',trigger: 'blur'}],
					time: [{required: true,message: '请选择时间',trigger: 'blur'}]
				},
				weekDays: [
				  {label: '全选',value: ''},
				  {label: '周一',value: '1'},
				  {label: '周二',value: '2'},
				  {label: '周三',value: '3'},
				  {label: '周四',value: '4'},
				  {label: '周五',value: '5'},
				  {label: '周六',value: '6'},
				  {label: '周日',value: '7'},
				  ],
				  dialogDetail: false
			}
		},
		mounted() {
			this.get_price_enter_strategy_list();
		},

		methods: {
			//保存批量修改房价
			onSave() {
				console.log(this.ruleForm);
				let params = this.$F.deepClone(this.ruleForm);
				debugger
				params.startTime = params.time[0];
				params.endTime = params.time[1];
				params.weeks = params.weeks.join(',');
				params.roomStrategyJson = JSON.stringify(params.roomStrategyJson);
				debugger
				this.$F.doRequest(this, '/pms/hotel/hotel_price_enter_strategy_save', params, (res) => {
					return this.$message({
					  message: '添加成功',
					  type: 'warn'
					});
				})
			},
			priceBlur(row, index) {
				if (row.adjustType == 1) {
					row.adjustPrice = ((row.marketPrice * (100 - row.content)) / 100).toFixed(2);
				} else {
					row.adjustPrice = row.content;
				}
				// this.$set(memberTableData.memberTypeList[0].roomTypeList, index, row);
				this.$forceUpdate()
			},
			change(row) {},
			//选择日期change事件
			handleWeekDayChange(value) {
				this.ruleForm.weeks = value;
				if (value.length == 0)
					this.ruleForm.weeks = [];

				if (value.length == 8 || value[value.length - 1] === '') {
					this.ruleForm.weeks = [];
					this.weekDays.forEach(week => {
						this.ruleForm.weeks.push(week.value);
					})

				} else {
					let $index = 999;
					this.ruleForm.weeks.forEach((week, index) => {
						if (week === '') {
							$index = index;
						}
					})
					if ($index != 999) {
						this.ruleForm.weeks.splice($index, 1);
					}
				}
			},
			popup(type, value) {
				debugger
				switch (type) {
					case 'add':
						this.tab1_show = false;
						this.get_hotel_price_room_type_list()
						break
				}
			},
			// 单位--房型
			get_hotel_price_room_type_list() {
			  let params = {
			    strategyTime: '2020-08-04',
			    priceCalend:1,  // 检索类型 1会员价格日历 2单位价格日历
			    timeType:1,  // 检索类型 1会员价格日历 2单位价格日历
			  }
			  this.$F.doRequest(this, '/pms/hotel/hotel_price_room_type_list', params, (res) => {
			    res.memberTypeList[0].roomTypeList.forEach(item => {
			      this.ruleForm.roomStrategyJson.push({
			        roomTypeId: item.id,
			        marketPrice: item.marketPrice,
			        adjustType: '1',
			        houseName: item.houseName,
			        content: '',
			        adjustPrice: ''
			      })
			    })
			    // this.memberTableHeads = res.dateList;
			    // this.memberTableHeads.unshift({
			    //   "dateStr":"房价",
			    //   "weekDay":""
			    // });
			    this.$forceUpdate();
			  })
			},
			// 单位列表-删除
			get_price_enter_strategy_delete(value) {
				let params = {
					id: value.id
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_price_enter_strategy_delete', params, (res) => {
					this.get_price_enter_strategy_list()
					this.$message({
						message: '删除成功',
						type: 'success'
					});
				})
			},
			// 获取 价格策略单位列表
			get_price_enter_strategy_list() {
				let params = {
					status: 1
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_price_enter_strategy_list', params, (res) => {
					if (res.length != 0) {
						this.tableData = res
					}
				})
			},
			back_1() {
				this.get_price_enter_strategy_list()
				this.tab1_show = true;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	};
</script>

<style lang="less" scoped>
	.demo-form-inline {
		display: flex;
		align-items: center;
	}
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
