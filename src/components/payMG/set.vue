<template>
	<div class="boss-index">
		<!--薪酬设置-->
        <div class="content" v-loading="loading">
            <el-row>
                <el-form class="demo-form-inline" inline size="small">
                    <el-form-item label="员工名称:">
                        <el-input v-model="searchForm.content"></el-input>
                    </el-form-item>
                    <el-form-item label="所在部门:" class="margin-l">
                        <el-select v-model="searchForm.departmentId" placeholder="请选择所在部门">
                            <el-option label="全部" value="">全部</el-option>
                            <el-option :label="value.name" :value="value.id" v-for="(value, index) in departmentList" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="margin-l">
                        <el-button type="primary" @click="getEmployeeList">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
            <div class="components-edit">
                <el-table ref="multipleTable" :data="setTableData" height="100%" tooltip-effect="dark" :header-cell-style="{background:'#e6eaed',color:'#1E1E1E'}">
                    <el-table-column prop="userName" label="员工姓名"></el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            {{$t('commons.userStatus')[scope.row.userStatus || '']}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="position" label="职位"></el-table-column>
                    <el-table-column prop="worknum" label="工号"></el-table-column>
                    <el-table-column prop="department.name" label="所在部门">

                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="{row}">
                            <el-button type="text" size="small" @click="popup('set_detail',row)">查看</el-button>
                            <el-button type="text" size="small" @click="popup('set_change',row)">薪资设置</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <div class="page-all">
                        共
                        <span style="font-weight:600;font-size: 14px;">400</span>条记录
                    </div>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.pageIndex"
                                   :page-sizes="[100, 200, 300, 400]" :page-size="100" layout=" sizes, prev, pager, next, jumper" :total="400"></el-pagination>
                </div>
            </div>
        </div>
        <!-- 薪酬设置 / 查看-->
        <el-dialog :title="salary_set_title" :visible.sync="dialogsalary_set" :close-on-click-modal="false" top="0" class="salary_set">
            <el-form :model="setForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-form-item label="基本工资:" class="type-title"></el-form-item>
                </el-row>
                <el-row class="demo-form-inline">
                    <el-col>
                        <el-form-item label="基本工资:" >
                            <el-input v-model="setForm.baseWage" :disabled="is_disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="其他:">
                            <el-input v-model="setForm.otherWage" :disabled="is_disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="岗位工资:">
                            <el-input v-model="setForm.jobsWage" :disabled="is_disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="奖金:">
                            <el-input v-model="setForm.bonus" :disabled="is_disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="margin-l">
                        <el-form-item label="社保补助:">
                            <el-input v-model="setForm.socialBenefits" :disabled="is_disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="保密工资:">
                            <el-input v-model="setForm.secretWage" :disabled="is_disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="绩效工资:">
                            <el-input v-model="setForm.performance" :disabled="is_disabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="补贴:" class="type-title"></el-form-item>
                </el-row>
                <el-row class="demo-form-inline">
                    <el-col>
                        <el-form-item label="房补:">
                            <el-input v-model="setForm.houseSubsidies" :disabled="is_disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="margin-l">
                        <el-form-item label="餐补:">
                            <el-input v-model="setForm.mealSubsidies" :disabled="is_disabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer" v-if="is_disabled">
				<el-button @click="dialogsalary_set = false">关 闭</el-button>
			</span>
            <span slot="footer" class="dialog-footer" v-else>
				<el-button @click="dialogsalary_set = false">取 消</el-button>
				<el-button type="primary" @click="setSalarySubmit">确 定</el-button>
			</span>
        </el-dialog>
    </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
	export default {
		data() {
			return {
              set_salary_info: {},  //选中信息
              setForm: {},
              is_disabled: false,
              salary_set_title: '',
              dialogsalary_set: false,
              setTableData: [],
              departmentList: [],
              listTotal: 0,
              loading: false,
              searchForm: {
                content: '',
                departmentId: '',
                pageIndex: 1,
                pageSize: 10,
                paging: true
              },
              rules: {

              }
			};
		},

      computed: {
            ...mapState({
              token: state => state.user.token,
              userId: state => state.user.id,
              storesNum: state => state.user.storesInfo.storesNum
            })
        },
		mounted() {
			this.getEmployeeList()
			this.get_department_list()
		},
		methods: {
          // 确认--薪资设置
          setSalarySubmit() {
            debugger
            this.setForm.employeeId = this.set_salary_info.id
            let params = this.setForm
            this.$F.doRequest(this, '/pms/wage/set_employee_wage', params, (res) => {
              this.$message({
                message: '设置成功!',
                type: 'success'
              });
              this.dialogsalary_set = false;
            })
          },

          // 查看员工薪资
          employeeDetails() {
            this.$F.doRequest(this, '/pms/wage/detail_employee_wage', {employeeId: this.set_salary_info.id}, (res) => {
              debugger
              this.setForm = res;
            })
          },
			popup(type, value) {
				switch (type) {
					case 'set_detail': // 薪资设置-查看
						this.salary_set_title = '查看'
						this.is_disabled = true;
						this.dialogsalary_set = true;
						this.set_salary_info = value
                        this.employeeDetails();
						break
					case 'set_change': // 薪资设置-设置
						this.salary_set_title = '薪资设置'
						this.is_disabled = false;
						this.dialogsalary_set = true;
						this.setForm = {};
						this.set_salary_info = value
                        this.employeeDetails();
						break
				}
			},

          getEmployeeList() {
            this.$F.doRequest(this, '/pms/employee/employee_list', this.searchForm, (res) => {
              this.setTableData = res.employeesList;
              this.listTotal = res.page.count
              this.$forceUpdate();
            })
          },

			//获取部门列表
			get_department_list() {
				this.$F.doRequest(this, '/pms/department/department_list', {}, (res) => {
					this.departmentList = res
				})
			},

		}
	};
</script>

<style lang="less" scoped>
	.margin-l {
		margin-left: 15px;
	}

	.row-width {
		width: 120px;
	}

	.demo-form-inline {
		display: flex;
		// align-items: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		background-color: #ffffff;

		.components-edit {
			display: flex;
			flex-direction: column;
			flex: 1;
			.block {
				padding: 10px 20px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.page-all {
					display: flex;
					width: 200px;
					font-size: 12px;
					color: #666666;
					letter-spacing: 2px;
				}
			}
		}

		i {
			font-size: 12px;
		}
	}
    .salary_set .type-title {
        font-size: 16px;
        font-weight: 800;
    }
</style>
