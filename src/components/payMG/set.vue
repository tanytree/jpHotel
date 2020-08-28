<template>
  <div class="boss-index">
    <!--薪酬设置-->
    <div class="content" v-loading="loading">
      <el-row>
        <el-form class="demo-form-inline" inline size="small">
          <el-form-item :label="$t('boss.staff_name')+':'">
            <el-input v-model="searchForm.content"></el-input>
          </el-form-item>
          <el-form-item :label="$t('boss.loginDetail_department')+':'" class="margin-l">
            <el-select
              v-model="searchForm.departmentId"
              :placeholder="$t('boss.compensation_selectDepartment')"
            >
              <el-option :label="$t('commons.all')" value>{{$t('commons.all')}}</el-option>
              <el-option
                :label="value.name"
                :value="value.id"
                v-for="(value, index) in departmentList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="margin-l">
            <el-button type="primary" @click="getEmployeeList">{{$t('commons.queryBtn')}}</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <div class="components-edit">
        <el-table
          ref="multipleTable"
          :data="setTableData"
          height="100%"
          tooltip-effect="dark"
          :header-cell-style="{background:'#e6eaed',color:'#1E1E1E'}"
        >
          <el-table-column prop="userName" :label="$t('boss.staff_theName')"></el-table-column>
          <el-table-column :label="$t('boss.loginDetail_state')">
            <template slot-scope="scope">{{$t('commons.userStatus')[scope.row.userStatus || '']}}</template>
          </el-table-column>
          <el-table-column prop="position" :label="$t('boss.loginDetail_position')"></el-table-column>
          <el-table-column prop="worknum" :label="$t('boss.loginDetail_workNumber')"></el-table-column>
          <el-table-column prop="department.name" :label="$t('boss.loginDetail_department')"></el-table-column>
          <el-table-column :label="$t('commons.operating')" width="200">
            <template slot-scope="{row}">
              <el-button
                type="text"
                size="small"
                @click="popup('set_detail',row)"
              >{{$t("boss.compensation_toView")}}</el-button>
              <el-button
                type="text"
                size="small"
                @click="popup('set_change',row)"
              >{{$t("boss.compensation_wageSetting")}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <div class="page-all">
            {{$t('boss.compensation_general')}}
            <span style="font-weight:600;font-size: 14px;">{{listTotal}}</span>
            {{$t('boss.compensation_records')}}
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchForm.pageIndex"
            :page-size="10"
            layout=" sizes, prev, pager, next, jumper"
            :total="listTotal"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 薪酬设置 / 查看-->
    <el-dialog
      :title="salary_set_title"
      :visible.sync="dialogsalary_set"
      :close-on-click-modal="false"
      top="0"
      class="salary_set"
    >
      <el-form
        :model="setForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-form-item :label="$t('boss.compensation_basicSalary')+':'" class="type-title"></el-form-item>
        </el-row>
        <el-row class="demo-form-inline">
          <el-col>
            <el-form-item :label="$t('boss.compensation_basicSalary')+':'">
              <el-input v-model="setForm.baseWage" :disabled="is_disabled"></el-input>
            </el-form-item>
            <el-form-item :label="$t('commons.other')+':'">
              <el-input v-model="setForm.otherWage" :disabled="is_disabled"></el-input>
            </el-form-item>
            <el-form-item :label="$t('boss.compensation_postSalary')+':'">
              <el-input v-model="setForm.jobsWage" :disabled="is_disabled"></el-input>
            </el-form-item>
            <el-form-item :label="$t('boss.compensation_bonus')+':'">
              <el-input v-model="setForm.bonus" :disabled="is_disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="margin-l">
            <el-form-item :label="$t('boss.compensation_benefits')+':'">
              <el-input v-model="setForm.socialBenefits" :disabled="is_disabled"></el-input>
            </el-form-item>
            <el-form-item :label="$t('boss.compensation_confidentialSalary')+':'">
              <el-input v-model="setForm.secretWage" :disabled="is_disabled"></el-input>
            </el-form-item>
            <el-form-item :label="$t('boss.compensation_meritPay')+':'">
              <el-input v-model="setForm.performance" :disabled="is_disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item :label="$t('boss.compensation_subsides')+':'" class="type-title"></el-form-item>
        </el-row>
        <el-row class="demo-form-inline">
          <el-col>
            <el-form-item :label="$t('boss.compensation_housingAllowances')+':'">
              <el-input v-model="setForm.houseSubsidies" :disabled="is_disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="margin-l">
            <el-form-item :label="$t('boss.compensation_subsidizedMeals')+':'">
              <el-input v-model="setForm.mealSubsidies" :disabled="is_disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="is_disabled">
        <el-button @click="dialogsalary_set = false">{{$t('commons.close')}}</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-else>
        <el-button @click="dialogsalary_set = false">{{$t('commons.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="setSalarySubmit"
          v-loading="loading"
        >{{$t('commons.determine')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      set_salary_info: {}, //选中信息
      setForm: {},
      is_disabled: false,
      salary_set_title: "",
      dialogsalary_set: false,
      setTableData: [],
      departmentList: [],
      listTotal: 0,
      loading: false,
      searchForm: {
        content: "",
        departmentId: "",
        pageIndex: 1,
        pageSize: 10,
        paging: true,
      },
      rules: {},
    };
  },

  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.id,
      storesNum: (state) => state.user.storesInfo.storesNum,
    }),
    toView: {
      get() {
        return this.$t("boss.compensation_toView");
      },
      set() {},
    },
    wageSetting: {
      get() {
        return this.$t("boss.compensation_wageSetting");
      },
      set() {},
    },
    setSuccess: {
      get() {
        return this.$t("boss.compensation_setSuccess");
      },
      set() {},
    },
  },
  watch: {
    toView(newValue, oldValue) {
      this.toView = newValue;
    },
    wageSetting(newValue, oldValue) {
      this.wageSetting = newValue;
    },
    setSuccess(newValue, oldValue) {
      this.setSuccess = newValue;
    },
  },
  mounted() {
    this.getEmployeeList();
    this.get_department_list();
  },
  methods: {
    // 确认--薪资设置
    setSalarySubmit() {
      this.setForm.employeeId = this.set_salary_info.id;
      let params = this.setForm;
      this.$F.doRequest(this, "/pms/wage/set_employee_wage", params, (res) => {
        this.$message({
          message: this.setSuccess,
          type: "success",
        });
        this.dialogsalary_set = false;
      });
    },

    // 查看员工薪资
    employeeDetails(type) {
      this.$F.doRequest(
        this,
        "/pms/wage/detail_employee_wage",
        { employeeId: this.set_salary_info.id },
        (res) => {
          if (type == "show" && (!res || JSON.stringify(res) == "{}")) {
            this.$message.info("no set");
            return;
          }
          this.dialogsalary_set = true;
          this.setForm = res;
        }
      );
    },
    popup(type, value) {
      switch (type) {
        case "set_detail": // 薪资设置-查看
          this.salary_set_title = this.toView;
          this.is_disabled = true;
          this.set_salary_info = value;
          this.employeeDetails("show");
          break;
        case "set_change": // 薪资设置-设置
          this.salary_set_title = this.wageSetting;
          this.is_disabled = false;
          this.setForm = {};
          this.set_salary_info = value;
          this.employeeDetails();
          break;
      }
    },

    getEmployeeList() {
      this.$F.doRequest(
        this,
        "/pms/employee/employee_list",
        this.searchForm,
        (res) => {
            debugger
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
