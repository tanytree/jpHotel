<template>
  <div class="boss-index">
    <div class="content">
      <el-form class="demo-form-inline" inline size="small">
        <el-form-item
          :label="$t('boss.loginDetail_stores')"
          v-if="storesNum == $F.getHQCode()"
          class="margin-l"
        >
          <el-select
            v-model="payManagerForm.storesNum"
            :placeholder="$t('boss.compensation_selectState')"
          >
            <el-option :label="$t('commons.all')" value>{{$t('commons.all')}}</el-option>
            <el-option
              :label="item.storesName"
              :value="item.storesNum"
              :key="index"
              v-for="(item, index) in storeList"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('boss.staff_name')+'：'" class="margin-l">
          <el-input v-model="payManagerForm.content"></el-input>
        </el-form-item>
        <el-form-item :label="$t('boss.compensation_payMonth')+'：'" class="margin-l">
          <el-date-picker
            v-model="payManagerForm.payTime"
            type="month"
            :placeholder="$t('boss.compensation_selectMonth')"
            value-format="yyyy-MM"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('boss.staff_staffState')" class="margin-l">
          <el-select
            v-model="payManagerForm.userStatus"
            :placeholder="$t('boss.compensation_selectState')"
          >
            <el-option :label="$t('commons.all')" value>{{$t('commons.all')}}</el-option>
            <el-option
              :label="label"
              :value="value"
              :key="value"
              v-for="(label, value) in $t('commons.userStatus')"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="get_salary_mg_list">{{$t('commons.queryBtn')}}</el-button>
        </el-form-item>
      </el-form>
      <div class="components-edit">
        <el-table
          ref="multipleTable"
          :data="payManagerTableData"
          height="100%"
          tooltip-effect="dark"
          :header-cell-style="{background:'#e6eaed',color:'#1E1E1E'}"
        >
          <el-table-column prop="employee.position" :label="$t('boss.loginDetail_position')"></el-table-column>
          <el-table-column prop="employee.userName" :label="$t('boss.loginDetail_name')"></el-table-column>
          <el-table-column :label="$t('boss.staff_staffState')">
            <template
              slot-scope="scope"
            >{{$t('commons.userStatus')[scope.row.employee.userStatus || '']}}</template>
          </el-table-column>
          <el-table-column prop="employee.worknum" :label="$t('boss.loginDetail_workNumber')"></el-table-column>
          <el-table-column prop="payTime" :label="$t('boss.compensation_payMonth')"></el-table-column>
          <el-table-column :label="$t('boss.compensation_basicSalary')">
            <el-table-column prop="wage.baseWage" :label="$t('boss.compensation_baseSalary')"></el-table-column>
            <el-table-column prop="wage.socialBenefits" label="社保补助"></el-table-column>
            <el-table-column prop="wage.otherWage" label="其他"></el-table-column>
            <el-table-column prop="wage.secretWage" label="保密工资"></el-table-column>
          </el-table-column>
          <el-table-column prop="wage.jobsWage" label="岗位工资"></el-table-column>
          <el-table-column prop="wage.performance" label="绩效工资"></el-table-column>
          <el-table-column prop="wage.bonus" label="奖金"></el-table-column>
          <el-table-column label="补贴">
            <el-table-column prop="wage.mealSubsidies" label="餐补"></el-table-column>
            <el-table-column prop="wage.houseSubsidies" label="房补"></el-table-column>
          </el-table-column>
          <el-table-column label="出勤">
            <el-table-column prop="demandJobDay" label="应出勤天数"></el-table-column>
            <el-table-column prop="realJobDay" label="实际出勤天数"></el-table-column>
            <el-table-column prop="jobsDemandWage" label="出勤工资应发"></el-table-column>
          </el-table-column>
          <el-table-column label="扣款">
            <el-table-column prop="lateDeductions" label="迟到扣款"></el-table-column>
            <el-table-column prop="socialDeduction" label="社保扣款"></el-table-column>
            <el-table-column prop="taxDeduction" label="个税扣款"></el-table-column>
          </el-table-column>
          <el-table-column prop="shouldPay" label="应发工资"></el-table-column>
          <el-table-column prop="realPay" label="实发工资"></el-table-column>
          <el-table-column prop="submitMoney" label="当月报销费用"></el-table-column>
          <el-table-column prop="realPay" label="总实发工资"></el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="popup('ch_detail', scope)">员工详情</el-button>
              <el-button type="text" size="small" @click="popup('ch_change', scope)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <div class="page-all">
            共
            <span style="font-weight:600;font-size: 14px;">400</span>条记录
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="payManagerForm.pageIndex"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout=" sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 薪酬修改 / 查看-->
    <el-dialog
      :title="salary_change_title"
      :visible.sync="dialogAdd"
      :close-on-click-modal="false"
      top="0"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row class="main-menu">
          <el-form-item label="基本工资" style="font-size: 16px; font-weight: 800"></el-form-item>
        </el-row>
        <el-row class="demo-form-inline">
          <el-col>
            <el-form-item label="基本工资:">
              <el-input v-model="ruleForm.wage.baseWage" :disabled="iss_disabled"></el-input>
            </el-form-item>
            <el-form-item label="其他:">
              <el-input v-model="ruleForm.wage.otherWage" :disabled="iss_disabled"></el-input>
            </el-form-item>
            <el-form-item label="岗位工资:">
              <el-input v-model="ruleForm.wage.jobsWage" :disabled="iss_disabled"></el-input>
            </el-form-item>
            <el-form-item label="奖金:">
              <el-input v-model="ruleForm.wage.bonus" :disabled="iss_disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="margin-l">
            <el-form-item label="社保补助:">
              <el-input v-model="ruleForm.wage.socialBenefits" :disabled="iss_disabled"></el-input>
            </el-form-item>
            <el-form-item label="保密工资:">
              <el-input v-model="ruleForm.wage.secretWage" :disabled="iss_disabled"></el-input>
            </el-form-item>
            <el-form-item label="绩效工资:">
              <el-input v-model="ruleForm.wage.performance" :disabled="iss_disabled"></el-input>
            </el-form-item>
            <el-form-item label="工资月份:" prop="payTime">
              <el-date-picker
                v-model="ruleForm.payTime"
                type="month"
                :placeholder="$t('boss.compensation_selectMonth')"
                :disabled="iss_disabled"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="main-menu">
          <el-form-item label="补贴" style="font-size: 16px; font-weight: 800"></el-form-item>
        </el-row>
        <el-row class="demo-form-inline">
          <el-col>
            <el-form-item label="房补:">
              <el-input v-model="ruleForm.wage.houseSubsidies" :disabled="iss_disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="margin-l">
            <el-form-item label="餐补:">
              <el-input v-model="ruleForm.wage.mealSubsidies" :disabled="iss_disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="main-menu">
          <el-form-item label="出勤天数" style="font-size: 16px; font-weight: 800"></el-form-item>
        </el-row>
        <el-row class="demo-form-inline">
          <el-col>
            <el-form-item label="应出勤天数:">
              <el-input v-model="ruleForm.demandJobDay" :disabled="iss_disabled"></el-input>
            </el-form-item>
            <el-form-item label="出勤工资应发:">
              <el-input v-model="ruleForm.jobsDemandWage" :disabled="iss_disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="margin-l">
            <el-form-item label="实际出勤天数:">
              <el-input v-model="ruleForm.realJobDay" :disabled="iss_disabled"></el-input>
            </el-form-item>
            <el-form-item label="发放日期:">
              <el-date-picker v-model="ruleForm.sendTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="main-menu">
          <el-form-item label="扣款" style="font-size: 16px; font-weight: 800"></el-form-item>
        </el-row>
        <el-row class="demo-form-inline">
          <el-col>
            <el-form-item label="迟到扣款:">
              <el-input v-model="ruleForm.lateDeductions" :disabled="iss_disabled"></el-input>
            </el-form-item>
            <el-form-item label="社保扣款:">
              <el-input v-model="ruleForm.socialDeduction" :disabled="iss_disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="margin-l">
            <el-form-item label="个人扣税:">
              <el-input v-model="ruleForm.taxDeduction" :disabled="iss_disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="demo-form-inline">
          <el-col>
            <el-form-item label="应发工资:">
              <el-input v-model="ruleForm.shouldPay" :disabled="iss_disabled"></el-input>
            </el-form-item>
            <el-form-item label="实发工资:">
              <el-input v-model="ruleForm.realPay" :disabled="iss_disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="margin-l">
            <el-form-item label="当月报销费用:">
              <el-input v-model="ruleForm.submitMoney" :disabled="iss_disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="iss_disabled">
        <el-button @click="dialogAdd = false">关 闭</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-else>
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="changeSalaryDefine('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Set from "./set";
export default {
  components: { Set },
  data() {
    return {
      storeList: [],
      searchForm: {},
      activeName: "first",
      payManagerForm: {
        storesNum: "",
        content: "",
        userStatus: "",
        payTime: new Date().toJSON(),
        pageIndex: 1,
        pageSize: 10,
        paging: true,
      },

      payManagerTableData: [],
      setTableData: [
        {
          position: "",
        },
      ],
      dialogAdd: false, // 修改薪酬
      salary_change_title: "", // 薪酬修改/查看弹框标题
      iss_disabled: false, //判断是修改还是查看,查看就是true,不可修改模式
      change_salary_info: {},
      ruleForm: {
        employeeId: "",
        payTime: "",
        sendTime: "",
        demandJobDay: "",
        realJobDay: "",
        jobsDemandWage: "",
        lateDeductions: "",
        socialDeduction: "",
        taxDeduction: "",
        shouldPay: "",
        realPay: "",
        submitMoney: "",
        baseWage: "",
        socialBenefits: "",
        otherWage: "",
        secretWage: "",
        jobsWage: "",
        performance: "",
        bonus: "",
        houseSubsidies: "",
        mealSubsidies: "",
        wage: {},
      },
      rules: {
        payTime: [
          {
            required: true,
            message: "请选择发放月份",
            trigger: "blur",
          },
        ],
      },
      departmentList: [],
      dialogsalary_set: false, // 薪资设置
      salary_set_title: "", // 薪酬设置/查看弹框标题
      is_disabled: false, //判断是修改还是查看,查看就是true,不可修改模式
      set_salary_info: {},
      setFrom: {
        employeeId: "",
        baseWage: "",
        socialBenefits: "",
        otherWage: "",
        secretWage: "",
        jobsWage: "",
        performance: "",
        bonus: "",
        houseSubsidies: "",
        mealSubsidies: "",
      },
    };
  },
  watch: {
    // activeName() {
    // 	if (this.activeName == 'first') {
    // 		this.get_salary_mg_list()
    // 	} else {
    // 		this.get_salary_set_list()
    // 	}
    // }
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.id,
      storesNum: (state) => state.user.storesInfo.storesNum,
    }),
  },
  mounted() {
    this.get_salary_mg_list();
    this.get_department_list();
    //如果是总部账号登录的 需要有门店列表刷选
    if (this.storesNum == this.$F.getHQCode()) {
      this.$F.doRequest(
        this,
        "/pms/freeuser/stores_list",
        {
          filterHeader: true,
        },
        (data) => {
          this.storeList = data;
        }
      );
    }
  },
  methods: {
    popup(type, value) {
      switch (type) {
        case "ch_detail":
          this.salary_change_title = "查看";
          this.iss_disabled = true;
          this.dialogAdd = true;
          this.change_salary_info = value;
          this.ruleForm = value.row;
          debugger;
          break;
        case "ch_change":
          this.salary_change_title = "薪资修改";
          this.iss_disabled = false;
          this.dialogAdd = true;
          this.change_salary_info = value;
          this.ruleForm = value.row;
          break;
      }
    },

    getEmployeeList() {
      if (this.storesNum != this.$F.getHQCode())
        this.searchForm.storesNum = this.storesNum;
      this.$F.doRequest(
        this,
        "/pms/employee/employee_list",
        this.searchForm,
        (res) => {
          this.setTableData = res.employeesList;
          this.listTotal = res.page.count;
          this.$forceUpdate();
        }
      );
    },

    //获取部门列表
    get_department_list() {
      this.$F.doRequest(this, "/pms/department/department_list", {}, (res) => {
        this.departmentList = res;
      });
    },
    //薪资管理列表
    get_salary_mg_list() {
      this.payManagerForm.payTime = this.payManagerForm.payTime.substring(0, 7);
      if (this.storesNum != this.$F.getHQCode())
        this.payManagerForm.storesNum = this.storesNum;
      this.$F.doRequest(
        this,
        "/pms/wage/month_wage_list",
        this.payManagerForm,
        (res) => {
          // res.wageList = [ { "id": "2c918aee732df5d901732df76b5e0000", "createTime": "2020-07-08 18:27:35", "updateTime": "2020-07-08 22:39:10", "employeeId": "40288383732a017901732a13c05e0004", "wageId": null, "payTime": "2020-06", "sendTime": "2020-07-10", "demandJobDay": 30, "realJobDay": 22, "jobsDemandWage": 3800, "lateDeductions": 1000, "socialDeduction": 200, "taxDeduction": 180, "shouldPay": 12000, "realPay": 8000, "submitMoney": 2000, "employee": { "id": "40288383732a017901732a13c05e0004", "createTime": "2020-07-08 00:20:04", "updateTime": "2020-07-08 00:20:25", "storesNum": "0000000000", "userStatus": 3, "userName": "李斯", "userPhone": "1562145778", "idcardType": 1, "idcard": "31212119951222154", "departmentId": "40288383732a017901732a059d9c0000", "position": "员工", "worknum": "0002", "bankcard": "32665723411445", "email": "442354122@quangou.com", "extension": "3001", "inTime": "2020-01-23", "positiveTime": null, "outTime": null, "outReason": null, "outDataUrl": null, "associatedAccount": null, "remark": null, "department": { "id": "40288383732a017901732a059d9c0000", "createTime": "2020-07-08 00:04:38", "updateTime": "2020-07-08 00:05:11", "storesNum": "0000000000", "name": "财务部" } }, "wage": { "id": "40288383732ed34301732edbc5610001", "createTime": "2020-07-08 22:37:02", "updateTime": "2020-07-08 22:37:02", "employeeId": "40288383732a017901732a13c05e0004", "baseWage": 2500, "socialBenefits": 200, "otherWage": 1300, "secretWage": 1800, "jobsWage": 3800, "performance": 4000, "bonus": 2000, "houseSubsidies": 2000, "mealSubsidies": 220 } } ];
          this.payManagerTableData = res.wageList;
          // res.wageList.forEach((value) => {
          // 	value = Object.assign(value.employee, value.wage, value.employee.department)
          // })
          // this.tableData = res
        }
      );
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
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

    .delate-item {
      display: flex;
      align-items: center;
      padding: 10px 0px;

      .delate {
        padding: 6px 10px;
        border: 1px solid #999999;
        border-radius: 5px;
        margin-right: 10px;
      }

      .delate-select {
        margin-left: 20px;
      }
    }

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

  .dateBox {
    width: 140px;
  }

  i {
    font-size: 12px;
  }

  .search-part {
    display: flex;
    align-items: center;
    border: 1px solid #999999;
    border-radius: 5px;
    height: 40px;

    input {
      border: none;
      border-radius: 5px;
      padding: 10px 10px;
    }

    span {
      background-color: #dfdfdf;
      height: 100%;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      width: 50px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .el-select {
      width: 120px;
    }
  }
}
</style>
