<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          @click.native="meetBooking"
          style=" font-weight: 700;cursor: pointer;"
        >会场预订</el-breadcrumb-item>
        <el-breadcrumb-item
          @click.native="meetCancel"
          style=" font-weight: 700;cursor: pointer;"
        >会议核销</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20" class="rowRoot">
      <el-col :span="6" style=" height: 563px;">
        <el-card>
          <div class="clearfix">
            <span style="font-weight: bold;">客人信息</span>
            <el-button size="mini" style="float:right" type="primary">办理会员</el-button>
          </div>
          <div class="box_box">
            <div class="box_item">
              客人姓名：
              <span>张三</span>
            </div>
            <div>
              手机号：
              <span>18066866505</span>
            </div>
            <div>
              客源类型：
              <span>散客</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card style=" height: 203px;">
          <div slot="header" class="card_header">
            <span>会议信息（房间：A001 前台）</span>
            <div>
              订单号：
              <span>98247690457045976</span>
            </div>
          </div>
          <el-form ref="form" label-position="left" :model="form" label-width="90px" inline>
            <el-row>
              <el-col :span="7">
                <el-form-item label="会议厅：">大型会议厅</el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="会议名称：">会议1</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="会议时间：">2020-04-15 11:00至2020-04-15 12:00</el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="单位名称：">全购网络有限公司</el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="房价合计：">2000</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注：">无</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card style="margin-top:10px;height:350px">
          <div class="clearfix" style="margin-bottom:10px">
            <span>会议登记</span>
            <el-button size="mini" @click="meetClick()" style="float:right">会议登记</el-button>
          </div>
          <!--表格数据 -->
          <el-table
            ref="multipleTable"
            v-loading="loading"
            :data="tableData"
            :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
            size="mini"
          >
            <el-table-column prop="enterName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="性别" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="证件类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="证件号" show-overflow-tooltip width="150px"></el-table-column>
            <el-table-column prop="enterType" label="登记时间" show-overflow-tooltip width="150px"></el-table-column>
            <el-table-column prop="enterType" label="手机号" show-overflow-tooltip width="150px"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{row}">
                <el-button type="text" @click="goDetail(row)" size="mini">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <!-- 会议签到dialog -->
    <el-dialog top="0" title="会议签到" :visible.sync="dialogMeet" class="setCompanyForm">
      <el-form
        :model="addCompanyForm"
        ref="addCompanyForm"
        :rules="rules"
        label-width="100px"
        size="mini"
      >
        <el-row class="row">
          <el-col :span="11">
            <el-form-item label="来客姓名:" prop="enterName">
              <el-input v-model="addCompanyForm.enterName" style="width:180px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别:">
              <el-radio-group v-model="addCompanyForm.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="11" class="col">
            <el-form-item label="证件类型:" prop required>
              <el-select v-model="addCompanyForm.ruleAlldayId" style="width:180px">
                <el-option
                  :label="item.ruleName"
                  :value="item.id"
                  v-for="(item,index) of alldayList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="col">
            <el-form-item label="证件号:" prop="creditLimit">
              <el-input v-model="addCompanyForm.creditLimit" style="width:180px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="手机号:">
          <el-input v-model="addCompanyForm.enterName" style="width:180px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:right">
        <el-button @click="dialogMeet=false">取消</el-button>
        <el-button type="primary" @click="hotelenterAddAndEdit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),
  },
  data() {
    return {
      loading: false,
      form: {},
      tableData: [{}],
      addCompanyForm: {
        id: "",
        type: "",
        enterName: "",
        contactName: "",
        contactPhone: "",
        enterStrategyId: "",
        ruleAlldayId: "",
        creditLimit: "",
        shareFlag: "",
        state: "",
        effectiveStartTime: "",
        effectiveEndTime: "",
        getWay: "",
        salesId: "",
        bankCard: "",
        taxNum: "",
        contractNum: "",
        email: "",
        remark: "",
      },
      rules: {
        enterName: [
          {
            required: true,
            message: "请输入单位名称",
            trigger: "blur",
          },
        ],
        contactName: [
          {
            required: true,
            message: "请填写联系人",
            trigger: "blur",
          },
        ],
        contactPhone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
        enterStrategyId: [
          {
            required: true,
            message: "请选择价格策略",
            trigger: "change",
          },
        ],
        ruleAlldayId: [
          {
            required: true,
            message: "请选择计费规则",
            trigger: "change",
          },
        ],
        creditLimit: [
          {
            required: true,
            message: "请输入挂账额度",
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: "请选择是否停用",
            trigger: "blur",
          },
        ],
      },
      dialogMeet: false,
      alldayList: [],
      hotelenterAddAndEdit: false,
    };
  },
  mounted() {},

  methods: {
    ...mapMutations({
      resetBookingName: "resetBookingName",
      resetBookSub: "resetBookSub",
    }),
    //点击  会议登记 按钮
    meetClick() {
      this.dialogMeet = true;
    },
    //点击会议核销
    meetCancel() {
      this.resetBookingName("hall");
      this.resetBookSub("second");
      this.$router.go(-1);
    },
    //点击会场预订
    meetBooking() {
      this.resetBookingName("hall");
      this.resetBookSub("b3");
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.breadcrumb {
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #ffffff;
}
.rowRoot {
  margin-top: 18px;
  .box_box {
    background-color: rgba(243, 243, 243, 1);
    margin-top: 10px;
    padding: 20px;
    left: 200px;
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
    > div {
      color: rgba(102, 102, 102, 1);
      margin-bottom: 20px;
      > span {
        margin-left: 16px;
      }
      &:nth-child(2) > span {
        margin-left: 30px;
      }
    }
  }
  .card_header {
    display: flex;
    > span {
      margin-right: 10px;
      font-weight: bold;
    }
    > div {
      color: rgba(153, 153, 153, 1);
      font-size: 16px;
      > span {
        color: rgba(18, 110, 255, 1);
      }
    }
  }
}
.clearfix {
  line-height: 28px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
