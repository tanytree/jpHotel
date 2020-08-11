<template>
	<div>
        <el-row :gutter="20" v-if="tab1_show">
            <el-row>
                <el-form class="demo-form-inline" inline size="small">
                    <!-- 设计图有前15天和后15天的快捷日期方式,可以利用日期组件里的改成ui图一样的设计 -->
                    <el-form-item label="选择时间:">
                        <el-date-picker v-model="ruleForm.name" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="form-inline-flex">
                        <el-row>
                            <el-button type="primary" @click="popup('adjust')" style="width: 100px;" size="mini">批量调价</el-button>
                        </el-row>
                    </el-form-item>
                </el-form>
            </el-row>
            <div class="components-edit member-price">
<!--                row-key="id"-->
                <el-table :data="memberTableData.memberTypeList" style="width: 100%;margin-bottom: 20px;" row-key="id"
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

        <el-row v-if="!tab1_show">
            <el-row style="padding: 20px 0px;">
                <el-page-header @back="back_1" content=""></el-page-header>
            </el-row>
            <el-row :gutter="20">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-col :span="20">
                        <el-form-item label="会员类型:" prop="name">
                            <el-checkbox-group v-model="batchEditPriceForm.memberTypeId">
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
                        <el-form-item label="选择时间:">
                            <el-date-picker v-model="batchEditPriceForm.time" type="daterange" align="right" value-format="yyyy-MM-dd" unlink-panels range-separator="至"
                                            start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item label="选择星期:" prop="name">
                            <el-checkbox-group v-model="batchEditPriceForm.weeks" @change="handleWeekDayChange">
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
            <el-table ref="multipleTable" :data="batchEditPriceForm.roomStrategyJson" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}">
                <el-table-column prop="houseName" label="房型"></el-table-column>
                <el-table-column prop="marketPrice" label="门市价"></el-table-column>
                <el-table-column prop="name" label="调价方式">
                    <template slot-scope="{row, $index}">
                        <el-row class="demo-form-inline">
                            <el-select v-model="row.adjustType" placeholder="请选择" style="width: 150px;" @change="change(row)">
                                <el-option label="折扣率" value="1"></el-option>
                                <el-option label="一口价" value="2"></el-option>
                            </el-select>
                            <span v-if="row.adjustType == 1">
                                <el-input v-model.number="row.content" min=1 max=100 style="width: 140px;margin: 0px 15px;" @input="priceBlur(row, $index)"></el-input> %
                            </span>
                            <span v-if="row.adjustType == 2">
                                <el-input v-model.number="row.content" min=1 max=100 style="width: 140px;margin: 0px 15px;" @input="priceBlur(row, $index)"></el-input> 日元
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

        <el-dialog top="0" title="修改房价" :visible.sync="editPriceDialog" :close-on-click-modal="false" width="30%" class="editPriceDialog">
            <el-form ref="discountForm" :model="editPriceForm" label-width="120px">
                <el-form-item label="当前选中:">
                    <span>{{editPriceForm.member.name + '  ' + editPriceForm.room.houseName}}</span>
                </el-form-item>
                <el-form-item label="当前日期">
                    <span>{{editPriceForm.dateStr}}</span>
                </el-form-item>
                <el-form-item label="门市价">
                    <span>{{editPriceForm.room.marketPrice}}</span>
                </el-form-item>
                <el-form-item label="会员价">
                    <span>{{editPriceForm.member.prices}} <span class="tip">(折扣为{{editPriceForm.discount}})</span></span>
                </el-form-item>
                <el-form-item label="新会员价">
                    <el-input v-model="editPriceForm.customPrice" style="width:200px"></el-input> <span class="tip">如果没有新会员价就按会员价</span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="editPriceDialog = false">取 消</el-button>
				<el-button type="primary" @click="editPriceSubmit" v-loading="loading">确 定</el-button>
			</span>
        </el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
              tab1_show: true,
			  radio: '',
              value: '',
              batchEditPriceForm: {
                time: '', //开始日期跟结束日期在一起
                memberTypeId: [],  //会员类型id  String必填 多个用半角","分割
                channel: '1',
                startTime: '',
                endTime: '',
                weeks: [],
                discounts: 4,
                roomStrategyJson: [],
              },
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
			  loading: false,
              editPriceDialog: false,  //修改房价dialog
              editPriceForm: {
                member: {},
                room: {},
                priceCalend: 1, // 修改定价位置  1会员日历单日定价  2单位日历单日定价  String必填
                customPrice: '',
              },
			  memberTableHeads: [],
              memberTableData: {memberTypeList: [], dateList: []},
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
			}
		},
        mounted() {
		  this.get_hotel_price_room_type_list();
        },

		methods: {
		  //保存批量修改房价
          onSave() {
            console.log(this.batchEditPriceForm);
            let params = this.$F.deepClone(this.batchEditPriceForm);
            params.startTime = params.time[0];
            params.endTime = params.time[1];
            params.memberTypeId = params.memberTypeId.join(',');
            params.weeks.forEach((item, index) => {
              if (!item) {
                params.weeks.splice(index, 1);
              }
            })
            params.weeks = params.weeks.join(',');
            params.roomStrategyJson.forEach(item => {
              item.adjustType = parseInt(item.adjustType);
            })
            params.roomStrategyJson = JSON.stringify(params.roomStrategyJson);
            this.$F.doRequest(this, '/pms/hotel/hotel_price_member_strategy_save', params, (res) => {
            })
          },
          priceBlur(row, index) {
            if (row.adjustType == 1) {
              row.adjustPrice = ((row.marketPrice * (100 - row.content))/100).toFixed(2) ;
            } else {
              row.adjustPrice = row.content;
            }
            // this.$set(memberTableData.memberTypeList[0].roomTypeList, index, row);
            this.$forceUpdate()
          },
          change(row) {
          },
		  //选择日期change事件
          handleWeekDayChange(value) {
            this.batchEditPriceForm.weeks = value;
            if (value.length == 0)
              this.batchEditPriceForm.weeks = [];

            if (value.length == 8 || value[value.length - 1] === '') {
              this.batchEditPriceForm.weeks = [];
              this.weekDays.forEach(week => {
                  this.batchEditPriceForm.weeks.push(week.value);
              })

            } else {
              let $index = 999;
              this.batchEditPriceForm.weeks.forEach((week, index) => {
                if (week === '') {
                  $index = index;
                }
              })
              if ($index != 999) {
                this.batchEditPriceForm.weeks.splice($index, 1);
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
            this.editPriceForm.member = memberTypeObject;
            this.editPriceForm.room = roomObject;
            this.editPriceForm.dateStr = item.dateStr;
            this.editPriceDialog = true;
          },

          editPriceSubmit() {
          // * @param priceCalend       修改定价位置  1会员日历单日定价  2单位日历单日定价  String必填
          //   * @param roomTypeId       房屋类型表id  String必填
          //   * @param memberTypeId     会员类型id  priceCalend=1必填 String选填
          //   * @param customPrice       新会员价  Double必填
          //   * @param dayTime         当前时间  yyyy-MM-dd格式 String必填
          //   * @param strategyId       单位策略规则id  priceCalend=1必填  String必填
            var params = {
              priceCalend: 1,
              roomTypeId: this.editPriceForm.room.id,
              memberTypeId: this.editPriceForm.member.id,
              customPrice: this.editPriceForm.customPrice,
              dayTime: this.editPriceForm.dateStr,
              strategyId: 1,
            }
            this.$F.doRequest(this, '/pms/hotel/hotel_room_day_price_save', params, (res) => {
              this.editPriceDialog = false;
              this.$message.success('success');
            })
          },

          // 会员 价格策略单位列表
          get_hotel_price_room_type_list() {
            let params = {
              strategyTime: '2020-08-11',
              priceCalend:1,  // 检索类型 1会员价格日历 2单位价格日历
              timeType:1,  // 检索类型 1会员价格日历 2单位价格日历
            }
            this.$F.doRequest(this, '/pms/hotel/hotel_price_room_type_list', params, (res) => {
              this.memberTableData = res;
              debugger
              this.batchEditPriceForm.roomStrategyJson = [];
              this.memberTableData.memberTypeList[0].roomTypeList.forEach(item => {
                this.batchEditPriceForm.roomStrategyJson.push({
                  roomTypeId: item.id,
                  marketPrice: item.marketPrice,
                  adjustType: '1',
                  houseName: item.houseName,
                  content: '',
                  adjustPrice: ''
                })
              })
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
