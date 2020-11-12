<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-12 16:26:27
 * @FilePath: \jiudian\src\components\employee\loginDetail.vue
 -->
<template>
  <el-dialog
    top="0"
    :title="$t('commons.lookDetail')"
    :visible.sync="details"
    width="500px"
    v-loading="loading"
  >
    <el-form :model="detailsData">
      <el-row style="margin:10px 0">
        <el-col :span="11">{{$t('boss.staff_theNameA')}}</el-col>
        <el-col :span="12">{{detailsData.userName}}</el-col>
      </el-row>
      <el-row style="margin:10px 0" v-if="dimission != 1">
        <el-col :span="11">{{$t('boss.staff_staffStateA')}}</el-col>
        <el-col :span="12">{{detailsData.userStatus | F_userStatus}}</el-col>
      </el-row>
      <el-row style="margin:10px 0">
        <el-col :span="11">{{$t('boss.loginDetail_phoneA')}}</el-col>
        <el-col :span="12">{{detailsData.userPhone || $t('boss.loginDetail_no')}}</el-col>
      </el-row>
      <el-row style="margin:10px 0" v-if="isPersonnelManager && storesNum == $F.getHQCode()">
        <el-col :span="11">{{$t('boss.loginDetail_stores')}}</el-col>
        <el-col :span="12">{{F_storeName(detailsData.storesNum)}}</el-col>
      </el-row>
      <el-row style="margin:10px 0">
        <el-col :span="11">{{$t('boss.staff_department')}}</el-col>
        <el-col
          :span="12"
        >{{detailsData.department?detailsData.department.name:'' || $t('boss.loginDetail_no')}}</el-col>
      </el-row>
      <el-row style="margin:10px 0">
        <el-col :span="11">{{$t('boss.add_workFor')}}</el-col>
        <el-col :span="12">{{detailsData.position || $t('boss.loginDetail_no')}}</el-col>
      </el-row>
      <el-row style="margin:10px 0">
        <el-col :span="11">{{$t('boss.loginDetail_bankAccount')}}</el-col>
        <el-col :span="12">{{detailsData.bankcard || $t('boss.loginDetail_no')}}</el-col>
      </el-row>
      <el-row style="margin:10px 0">
        <el-col :span="11">{{$t('boss.loginDetail_email')}}</el-col>
        <el-col :span="12">{{detailsData.email || $t('boss.loginDetail_no')}}</el-col>
      </el-row>
      <el-row style="margin:10px 0">
        <el-col :span="11">{{$t('boss.loginDetail_backgroundAccount')}}</el-col>
        <el-col :span="12">{{detailsData.associatedAccount || $t('boss.loginDetail_no')}}</el-col>
      </el-row>
      <el-row style="margin:10px 0">
        <el-col :span="11">{{$t('boss.loginDetail_workNumber')}}</el-col>
        <el-col :span="12">{{detailsData.worknum ||$t('boss.loginDetail_no')}}</el-col>
      </el-row>
      <el-row style="margin:10px 0">
        <el-col :span="11">{{$t('boss.add_subPhone')}}</el-col>
        <el-col :span="12">{{detailsData.extension || $t('boss.loginDetail_no')}}</el-col>
      </el-row>
      <el-row style="margin:10px 0">
        <el-col :span="11">{{$t('boss.loginDetail_workTime')}}</el-col>
        <el-col :span="12">{{detailsData.inTime || $t('boss.loginDetail_no')}}</el-col>
      </el-row>
      <el-row style="margin:10px 0">
        <el-col :span="11">{{$t('commons.idCardTypeDesc')}}</el-col>
        <el-col
          :span="12"
        >{{$t('commons.idCardType')[detailsData.idcardType || ''] || $t('boss.loginDetail_no')}}</el-col>
      </el-row>
      <el-row style="margin:10px 0">
        <el-col :span="11">{{$t('boss.loginDetail_documentNumber')}}</el-col>
        <el-col :span="12">{{detailsData.idcard || $t('boss.loginDetail_no')}}</el-col>
      </el-row>
      <el-row style="margin:10px 0">
        <el-col :span="11">{{$t('boss.loginDetail_positiveTime')}}</el-col>
        <el-col :span="12">{{detailsData.positiveTime || $t('boss.loginDetail_no')}}</el-col>
      </el-row>

      <el-row style="margin:10px 0" v-if="dimission == 1">
        <el-col :span="11">{{$t('boss.loginDetail_outTime')}}</el-col>
        <el-col :span="12">{{detailsData.outTime || $t('boss.loginDetail_no')}}</el-col>
      </el-row>

      <el-row style="margin:10px 0" v-if="dimission == 1">
        <el-col :span="11">{{$t('boss.loginDetail_outReason')}}</el-col>
        <el-col :span="12">{{detailsData.outReason || $t('boss.loginDetail_no')}}</el-col>
      </el-row>

      <el-row style="margin:10px 0">
        <el-col :span="11">{{$t('boss.loginDetail_note')}}</el-col>
        <el-col :span="12">{{detailsData.remark || $t('boss.loginDetail_no')}}</el-col>
      </el-row>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="details = false">{{$t('commons.close')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["account", "employeeId", "storeList", "dimission"],
  data() {
    return {
      loading: false,
      isPersonnelManager: false,
      detailsData: {},
      details: false,
      storesNum2: "", //如果是总部后台 可以查看其他门店的员工， 这个时候要传当前门店过来， 如不是总部后台 则门店信息不要显示
    };
  },

  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.id,
      storesNum: (state) => state.user.storesInfo.storesNum,
    }),
    alertContent: {
      get() {
        return this.$t("boss.loginDetail_alertContent");
      },
      set() {},
    },
    alertTitle: {
      get() {
        return this.$t("boss.loginDetail_alertTitle");
      },
      set() {},
    },
    close: {
      get() {
        return this.$t("commons.close");
      },
      set() {},
    },
    unknown: {
      get() {
        return this.$t("boss.loginDetail_unknownStores");
      },
      set() {},
    },
  },
  mounted() {
    this.isPersonnelManager = this.$route.name == "employeeList";
  },
  watch: {
    alertContent(newValue, oldValue) {
      this.alertContent = newValue;
    },
    alertTitle(newValue, oldValue) {
      this.alertTitle = newValue;
    },
    close(newValue, oldValue) {
      this.close = newValue;
    },
    unknown(newValue, oldValue) {
      this.unknown = newValue;
    },
  },
  methods: {
    //当未查询到该成员 提示信息
    getEmployeesDetails(item) {
      this.$alert(
        this.alertContent,
        // "该成员暂无资料（资料需要在员工管理添加，然后绑定该成员的后台账号即可）",
        this.alertTitle,
        {
          confirmButtonText: this.close,
          callback: (action) => {},
        }
      );
    },
    getDetails(account, employeeId, item) {
      if (item) {
        this.details = true;
        this.detailsData = item;
      } else {
        let params = {
          employeeId: employeeId || "",
          account: account || "",
        };
        this.$F.doRequest(
          this,
          "/pms/employee/detail_employee",
          params,
          (res) => {
            if (res) {
              this.details = true;
              this.detailsData = res;
            } else this.getEmployeesDetails();
          }
        );
      }
    },

    F_storeName(v) {
      let that = this;
      for (let k in that.storeList) {
        if (that.storeList[k].storesNum == v) {
          return that.storeList[k].storesName;
        }
      }
      return this.unknown;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
.goodsImg {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}

.top-close {
  display: flex;
  align-items: center;
  float: right;
  cursor: pointer;
  padding-right: 10px;
  padding-top: 20px;
  font-size: 14px;

  i {
    margin-left: 8px;
  }
}

.shopStatus {
  color: rgba(9, 109, 217, 1);
  font-size: 12px;
}

.top-body {
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(250, 250, 250, 1);
}

.components-edit {
  margin-top: 10px;

  .components-table {
    border: 1px solid #e6e6e6;
  }

  .block {
    padding: 10px 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .page-all {
      font-size: 12px;
      color: #666666;
      letter-spacing: 2px;
    }
  }
}
</style>
<style scoped>
.dimission >>> .el-upload {
  overflow: initial;
  outline: none;
}

.dimission >>> .el-upload-list {
  display: none;
}
</style>
