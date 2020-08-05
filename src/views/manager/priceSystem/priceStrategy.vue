<template>
	<div>
		<el-row v-if="tab1_show && tab2_show && unit_show">
			<el-tabs v-model="activName">
				<el-tab-pane label="会员" name="a">
					<el-row :gutter="20">
						<el-row>
							<el-form class="demo-form-inline" inline size="small">
								<!-- 设计图有前15天和后15天的快捷日期方式,可以利用日期组件里的改成ui图一样的设计 -->
								<el-form-item label="选择时间:">
									<el-date-picker v-model="ruleForm.name" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
									</el-date-picker>
								</el-form-item>
								<el-form-item style="display: flex;justify-content: flex-end;flex: 1;">
									<el-row>
										<el-button type="primary" @click="popup('adjust')" style="width: 100px;" size="mini">批量调价</el-button>
									</el-row>
								</el-form-item>
							</el-form>
						</el-row>
						<div class="components-edit member-price">
							<el-table :data="memberTableData.memberTypeList" style="width: 100%;margin-bottom: 20px;"row-key="id"
                                      default-expand-all
                                      header-row-class-name="default"
                                      :tree-props="{children: 'roomTypeList', hasChildren: 'hasChildren'}">
                                <el-table-column v-for="(item, index) in memberTableHeads" :key="index" :label="item.dateStr + '' + item.weekDay">
                                    <template slot-scope="{row, $index}">
                                        <span v-if="index === 0">{{row.name || row.houseName}}</span>
                                        <span v-if="index > 0 && row.houseName" style=" cursor: pointer !important;" @click="priceClick(row, item)">
                                            {{row.marketPrice}}
                                        </span>
                                    </template>
                                </el-table-column>
							</el-table>
						</div>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="单位" name="b">
					<el-row>
						<el-form class="demo-form-inline" inline size="small">
							<el-form-item label="规则名称:">
								<el-input v-model="ruleForm.ruleName" class="row-width"></el-input>
							</el-form-item>
							<el-form-item label="状态:" class="margin-l">
								<el-select v-model="ruleForm.state" placeholder="请选择状态" class="row-width">
									<el-option label="1" value="启用"></el-option>
									<el-option label="2" value="禁用"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" style="width: 100px;" size="mini" @click="get_price_enter_strategy_list">查询</el-button>
							</el-form-item>
							<el-form-item style="display: flex;justify-content: flex-end;flex: 1;">
								<el-row style="display: flex;justify-content: flex-end;flex: 1;">
									<el-button type="primary" @click="popup('add')" style="width: 100px;" size="mini">新增</el-button>
								</el-row>
							</el-form-item>
						</el-form>
					</el-row>
					<div class="components-edit">
						<el-table ref="multipleTable" :data="tableData_b" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
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
						<!-- <div class="block">
							<div class="page-all">
								共
								<span style="font-weight:600;font-size: 14px;">400</span>条记录
							</div>
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1"
							 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout=" sizes, prev, pager, next, jumper" :total="400"></el-pagination>
						</div> -->
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-row>
		<!-- 批量调价 -->
		<el-row v-if="!tab1_show">
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back_1" content=""></el-page-header>
			</el-row>
			<el-row :gutter="20">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
					<el-col :span="20">
						<el-form-item label="会员类型:" prop="name">
							<el-checkbox-group v-model="checkedKinds" @change="handleCheckedCitiesChange">
								<el-checkbox v-for="(item, index) in memberTableData.memberTypeList" :label="item.id" :key="index">{{item.name}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="渠道:" prop="name">
							<el-button plain size="mini">线下</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="选择时间:" prop="name">
							<el-date-picker v-model="batchEditPriceForm.time" type="daterange" align="right" unlink-panels range-separator="至"
							 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="选择星期:" prop="name">
							<el-checkbox-group v-model="weekDayKinds" @change="handleWeekDayChange">
								<el-checkbox v-for="(item, index) in weekDays" :label="item.value" :key="index">{{item.label}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
					<el-col :span="20">
						<el-form-item label="折扣率:" prop="name">
							<el-radio-group v-model="batchEditPriceForm.discounts">
								<el-radio :label="1">向上取整</el-radio>
								<el-radio :label="2">向下取整</el-radio>
								<el-radio :label="3">四舍五入(取整)</el-radio>
								<el-radio :label="4">保持不变</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<el-table ref="multipleTable" :data="memberTableData.memberTypeList[0].roomTypeList" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
				<el-table-column prop="houseName" label="房型"></el-table-column>
				<el-table-column prop="marketPrice" label="门市价"></el-table-column>
				<el-table-column prop="name" label="调价方式">
					<template slot-scope="name">
						<el-row class="demo-form-inline">
							<el-select v-model="value" placeholder="请选择" style="width: 150px;">
								<el-option label="折扣率" value="1"></el-option>
								<el-option label="一口价" value="2"></el-option>
							</el-select>
							<el-input v-model="value" style="width: 100px;margin-right: 5px;"></el-input> 日元
						</el-row>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="调价后">
					<template slot-scope="name">
						<el-input v-model="value" :disabled="true"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<el-row style="padding: 20px 0px;">
				<el-button type="primary" style="width: 80px;">保存</el-button>
				<el-button style="width: 80px;margin-left: 20px;">返回</el-button>
			</el-row>
		</el-row>
		<!-- 价格日历 -->
		<el-row v-if="!tab2_show">
			<el-row style="padding: 20px 0px;">
				<el-page-header @back="back_2" content=""></el-page-header>
			</el-row>
			<el-row :gutter="20">
				<el-row>
					<el-form class="demo-form-inline" inline size="small">
						<!-- 设计图有前15天和后15天的快捷日期方式,可以利用日期组件里的改成ui图一样的设计 -->
						<el-form-item label="选择时间:">
							<el-date-picker v-model="ruleForm.name" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
							</el-date-picker>
						</el-form-item>
					</el-form>
				</el-row>
				<!-- 点击直接议价 -->
				<div class="components-edit">
					<el-table ref="multipleTable" :data="tableData_other" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
					 @selection-change="handleSelectionChange">
						<el-table-column prop="date" label="房型/房价">
						</el-table-column>
						<el-table-column prop="name" label="4-18 周三">
							<template slot-scope="name">
								<el-input v-model="value" :disabled="true"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="4-19 周四">
						</el-table-column>
						<el-table-column prop="name" label="4-19 周四">
						</el-table-column>
						<el-table-column prop="name" label="4-19 周四">
						</el-table-column>
						<el-table-column prop="name" label="4-19 周四">
						</el-table-column>
					</el-table>
				</div>
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

        <el-dialog top="0" title="修改房价" :visible.sync="editPriceDialog" :close-on-click-modal="false" width="30%" class="editPriceDialog">
            <el-form ref="discountForm" :model="editPriceForm" label-width="120px">
                <el-form-item label="当前选中:">
                    <span>{{editPriceForm.name + '  ' + editPriceForm.houseName}}</span>
                </el-form-item>
                <el-form-item label="当前日期">
                    <span>{{editPriceForm.dateStr}}</span>
                </el-form-item>
                <el-form-item label="门市价">
                    <span>{{editPriceForm.marketPrice}}</span>
                </el-form-item>
                <el-form-item label="会员价">
                    <span>{{editPriceForm.prices}} <span class="tip">(折扣为{{editPriceForm.discount}})</span></span>
                </el-form-item>
                <el-form-item label="新会员价">
                    <el-input v-model="editPriceForm.prices" style="width:200px"></el-input> <span class="tip">如果没有新会员价就按会员价</span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="editPriceDialog = false">取 消</el-button>
				<el-button type="primary" @click="editPriceDialog = false">确 定</el-button>
			</span>
        </el-dialog>
	</div>
</template>

<script>
	export default {

		data() {
			return {
			  batchEditPriceForm: {
			    time: '', //开始日期跟结束日期在一起
                memberTypeId: '',
                channel: '',
                startTime: '',
                endTime: '',
                weeks:'',
                discounts: 4,
                roomStrategyJson: [],
              },
              weekDayKinds: ['1'],
              dictChannels: [], //渠道
              editPriceDialog: false,  //修改房价dialog
              editPriceForm: {},
			  memberTableHeads: [],
              memberTableData: {memberTypeList: [], dateList: []},
				dialogDetail: false, //查看弹窗
				activName: 'a',
				tab1_show: true, //切片一的跳转
				tab2_show: true, //切片二的跳转
				unit_show : true, // 单位-添加
				tableData_a: [],
				tableData_b: [],
				tableData: [],
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
                      text: '前十五天',
                      onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 15);
                        picker.$emit('pick', date);
                      }
                    }, {
                      text: '后十五天',
                      onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24 * 15);
                        picker.$emit('pick', date);
                      }
                    }]
				},
				tableData_other: [{
					date: '标准间'
				}, {
					date: '单间'
				}, {
					date: '小型会议室'
				}],
				ruleForm: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				dialogChangeA: false,
				dialogInfo_show: false, //商品入库弹框
				dialogStock_show: false, // 修改库存
				kinds: ['全选', '白金卡', '黄金卡', '白银卡'],
				checkedKinds: ['白金卡'],
                weekDays: [
                  {label: '全部',value: ''},
                  {label: '周一',value: '1'},
                  {label: '周二',value: '2'},
                  {label: '周三',value: '3'},
                  {label: '周四',value: '4'},
                  {label: '周五',value: '5'},
                  {label: '周六',value: '6'},
                  {label: '周日',value: '7'},
                  ],

				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: '',
				selectInfo: {}
			}
		},
        mounted() {
		  this.get_hotel_price_room_type_list();
		  //获取渠道
          // this.$F.getPublicDictByType(null, 1, (res) => {
          //   this.dictChannels = res;
          //   debugger
          // })
		  // this.$F.fetchMemberTypeList({}, (res) => {
          //
          // })
          // this.get_price_enter_strategy_list()
        },
		watch: {
			activName() {
				switch (this.activName) {
					case 'a':
						// this.get_hotel_rule_allday_list()
						break
					case 'b':
						this.get_price_enter_strategy_list()
						break
					case 'c':
						// this.get_hotel_rule_hour_list()
						break
				}
			}
		},


		methods: {
		  //选择日期change事件
          handleWeekDayChange(value) {
            this.weekDayKinds = value;
            debugger
            if (value.length == 0)
              this.weekDayKinds = [];

            if (value.length == 8 || value[value.length - 1] === '') {
              this.weekDayKinds = [];
              this.weekDays.forEach(week => {
                this.weekDayKinds.push(week.value);
              })

            } else {
              let $index = 999;
              this.weekDayKinds.forEach((week, index) => {
                if (week === '') {
                  $index = index;
                }
              })
              if ($index != 999) {
                this.weekDayKinds.splice($index, 1);
              }
            }
          },
		  //点击修改房价
          priceClick(row, item, params = {}) {
            let memberTypeObject = {}, roomObject = {}, flag = true;
            for (let i = 0; i < this.memberTableData.memberTypeList.length; i++) {
              if (! flag)
                break;
              let member = this.memberTableData.memberTypeList[i];
              for (let j = 0; j < member.roomTypeList.length; j++) {
                let room = member.roomTypeList[j];
                if (room.id == row.id) {
                  roomObject = room;
                  memberTypeObject = member;
                  flag = false
                  break;
                }
              }
            }
            this.$F.merge(this.editPriceForm, memberTypeObject);
            this.$F.merge(this.editPriceForm, roomObject);
            this.editPriceForm.dateStr = item.dateStr;
            this.editPriceDialog = true;
          },

          // 会员 价格策略单位列表
          get_hotel_price_room_type_list() {
            let params = {
              strategyTime: '2020-08-04',
              priceCalend:1,  // 检索类型 1会员价格日历 2单位价格日历
              timeType:1,  // 检索类型 1会员价格日历 2单位价格日历
            }
            this.$F.doRequest(this, '/pms/hotel/hotel_price_room_type_list', params, (res) => {
              this.memberTableData = res;
              this.memberTableHeads = res.dateList;
              this.memberTableHeads.unshift({
                "dateStr":"房价",
                "weekDay":""
              });
              this.$forceUpdate();
            })
          },
			popup(type, value) {
				switch (type) {
					case 'adjust':
						this.tab1_show = false;
						break
					case 'detail':
						this.dialogDetail = true;
						break
					case 'changerili':
						this.tab2_show = false;
						break
					case 'add':
						this.tab1_show = false;
						break
				}
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
					status:1
				}
				this.$F.doRequest(this, '/pms/hotel/hotel_price_enter_strategy_list', params, (res) => {
					if (res.length != 0) {
						this.tableData_b = res
					}
				})
			},
			back_1() {
				this.tab1_show = true;
			},
			back_2() {
				this.tab2_show = true;
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
    .editPriceDialog .tip {
        font-size: 12px;
        color: #b1b1b1;
    }
	.margin-l {
		margin-left: 15px;
	}

	.row-width {
		width: 120px;
	}

	.padding-item {
		padding-bottom: 5px;
	}

	.demo-form-inline {
		display: flex;
		align-items: center;
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
