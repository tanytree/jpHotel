<template>
  <div class="boss-index">
    <div v-if="listVisible" class="author" v-loading="loading">
      <div
        class="title"
      >{{$i18n.locale == 'ri' ? firstMenuInfo.japanese : (firstMenuInfo.menuAliasTitle || firstMenuInfo.menuTitle)}}</div>
      <ul class="list">
        <li v-for="(item, index) in tableData" :key="index">
          <div class="left">
            <el-avatar :size="40" fit="cover" :src="require('@/assets/images/people.png')"></el-avatar>
            <div class="avatarName">{{item.userName}}</div>
            <el-tag
              v-for="role in $t('commons.userRoleList')"
              :key="role.value"
              :label="role.value"
              v-if="item.userRole && role.value == item.userRole.userStatus && item.userRole.userStatus == 2"
            >{{role.label}}</el-tag>
          </div>
          <el-dropdown trigger="click" @command="(e) => handleCommand(e, item)"  v-if="item.userRole && item.userRole.userStatus != 2 && item.account != user.account">
            <span class="el-dropdown-link">
              {{$t('commons.operating')}}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="see">{{$t('boss.report_checkingData')}}</el-dropdown-item> -->
              <el-dropdown-item
                command="set"
              >{{$t('boss.report_permissionSettings')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <div v-if="!listVisible" class="author setting" v-loading="loading">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <a @click="back">{{$t('boss.report_employeeRights')}}</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('boss.report_permissionSettings')}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="avatar">
        <el-avatar :size="40" fit="cover" :src="require('@/assets/images/people.png')"></el-avatar>
        <div class="avatarName">{{cur.userName}}</div>
      </div>
      <div class="content">
        <div class="title">
          <span>{{$t('boss.report_specificPrivileges')}}（ {{$i18n.locale == 'ri' ? firstMenuInfo.japanese : (firstMenuInfo.menuAliasTitle || firstMenuInfo.menuTitle)}}）</span>
          <span class="tip">{{$t('boss.report_openAccess')}}</span>
        </div>
        <div class="inner">
          <div v-for="(item, index) in menuList" :key="index" class="checkItem">
            <div class="label">
              <span>{{$i18n.locale == 'ri'?item.japanese:item.menuTitle}}</span>
              <el-checkbox
                :indeterminate="item.isIndeterminate"
                v-model="item.checkAll"
                @change="(e) => checkAllChange(e, item)"
              >{{$t('boss.report_openAll')}}</el-checkbox>
            </div>
            <el-row :gutter="20">
              <el-col v-for="(child, i) in item.childList" :key="index + '_' + i" :span="6">
                <div class="child">
                  <div class="left">
                    <i class="icon el-icon-more"></i>
                    <span>{{$i18n.locale == 'ri'?child.japanese:child.menuTitle}}</span>
                  </div>
                  <el-switch
                    v-model="child.choose"
                    active-color="#116EFF"
                    @change="(e) => changeSet(e, item)"
                  ></el-switch>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="setBtn">
        <el-button class="submit" @click="saveChange">{{$t('commons.save')}}</el-button>
        <el-button class="cancel" @click="listVisible=true">{{$t('commons.back')}}</el-button>
      </div>
    </div>
    <!-- 查看资料组件 -->
    <LoginDetail ref="loginDetail"></LoginDetail>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import LoginDetail from "@/components/employee/loginDetail";

function setArr(arr, newArr) {
  newArr = newArr || [];
  arr.forEach((item) => {
    (item.id || item.id == 0) && newArr.push(item.id);
    item.childList && setArr(item.childList, newArr);
  });
  return newArr;
}

function setArrChoose(arr, str) {
  arr.forEach((item) => {
    item.id && str.indexOf(item.id) != -1 && (item.choose = true);
    item.childList && setArrChoose(item.childList, str);
  });
}

export default {
  components: {
    LoginDetail,
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    setSuccess: {
      get() {
        return this.$t("boss.compensation_setSuccess");
      },
      set() {},
    },
  },
  name: "",
  watch: {
    setSuccess(newValue, oldValue) {
      this.setSuccess = newValue;
    },
  },
  data() {
    return {
      loading: false,
      listVisible: true,
      searchForm: {},
      tableData: [],
      listTotal: 0,
      menuList: [],
      firstMenuInfo: [],
      cur: {},
    };
  },
  created() {
    this.initForm();
  },
  methods: {
    initForm() {
      this.firstMenuInfo = JSON.parse(sessionStorage.menul || "{}");
      this.searchForm = {
        departmentId: this.firstMenuInfo.id,
        searchType: 1,
        content: "",
        pageIndex: 1,
        pageSize: 10,
        paging: true,
      };
      this.getDataList();
    },
    getDataList() {
      this.$F.commons.fetchSalesList(this.searchForm, (data) => {
        this.tableData = data.hotelUserList;
        this.listTotal = this.tableData.length;
        this.$forceUpdate();
      });
    },
    getMenu_list() {
      let params = {
        departmentId: sessionStorage.getItem("partmentId"),
        type: 2,
        departmentHeader: false,
      };
      let that = this;
      this.$F.doRequest(this, "/pms/role/menu_list", params, (res) => {
        this.menuList = res;
        for (let i in this.menuList) {
          this.menuList[i].checkAll = false;

          this.menuList[i].isIndeterminate = false;
          for (let k in this.menuList[i].childList) {
            this.menuList[i].childList.choose = false;
          }
        }
        console.log(this.menuList);
        this.getUser_role(this.cur.id);
        that.$forceUpdate();
      });
    },
    getUser_role(id) {
      let that = this;
      this.$F.doRequest(
        this,
        "/pms/freeuser/user_role",
        {
          userId: id,
        },
        (res) => {
          //以下代码请在理解后改动
          let userRole = res.menuList;
          let currentUserRole = [];
          let departmentId = sessionStorage.getItem("partmentId");
          for (let k in userRole) {
            if (departmentId == userRole[k].id) {
              currentUserRole = userRole[k];
              break;
            }
          }
          let ids = [];
          let thisIds = setArr(currentUserRole.childList, ids);
          if (thisIds.length) {
            // console.log(thisIds)
            let str = JSON.stringify(thisIds);
            let newMenuList = setArrChoose(this.menuList, str);
            for (let k in this.menuList) {
              let cItem = this.menuList[k];
              let checkNum = 0;
              for (let i in cItem.childList) {
                cItem.childList[i].choose && checkNum++;
              }
              checkNum > 0 && (cItem.isIndeterminate = true);
              if (checkNum && checkNum == cItem.childList.length) {
                cItem.checkAll = true;
                cItem.isIndeterminate = false;
              }
            }
          }
          // console.log(this.menuList);
          that.$forceUpdate();
        }
      );
    },
    handleCommand(command, item) {
      if (command == "set") {
        this.listVisible = false;
        this.cur = item;

        this.$nextTick(() => {
          this.getMenu_list();
          // this.$refs.authors.initForm();
        });
      } else {
        this.$refs.loginDetail.getDetails(item.account);
      }
    },
    back() {
      this.listVisible = true;
    },
    checkAllChange(val, item) {
      console.log(this.menuList);
      item.childList.map((s) => {
        if (val) {
          s.choose = true;
        } else {
          s.choose = false;
        }
      });
      item.isIndeterminate = false;
      this.$forceUpdate();
      console.log(item);
    },
    changeSet(val, item) {
      let arr = [];
      item.childList.map((i) => {
        if (i.choose) {
          arr.push(i);
        }
      });
      if (arr.length == 0 || arr.length == item.childList.length) {
        item.isIndeterminate = false;
      } else {
        item.isIndeterminate = true;
      }
      if (arr.length == item.childList.length) {
        item.checkAll = true;
      } else {
        item.checkAll = false;
      }
      console.log(item);
      this.$forceUpdate();
    },
    saveChange() {
      let idArr = [];
      for (let k in this.menuList) {
        for (let i in this.menuList[k].childList) {
          if (this.menuList[k].childList[i].choose) {
            idArr.push(this.menuList[k].childList[i].id);
          }
        }
      }
      console.log(idArr);
      let params = {
        disUserId: this.cur.id,
        departmentId: sessionStorage.getItem("partmentId"),
        menuIds: idArr.toString(),
      };
      this.$F.doRequest(this, "/pms/workuser/set_user_menu", params, (res) => {
        this.$message({
          message: this.setSuccess,
          type: "success",
        });
        this.listVisible = true;
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.author {
  height: 100%;
  display: flex;
  flex-direction: column;

  .title {
    padding: 20px 30px;
    color: #333;
    font-size: 18px;
    border-bottom: 1px solid #e7e7e7;
  }

  .list {
    padding: 0 30px;

    li {
      display: flex;
      padding: 15px 10px;
      border-bottom: 1px solid #e7e7e7;
      align-items: center;

      .left {
        flex: 1;
        display: flex;
        align-items: center;
      }

      .el-avatar,
      .avatarName {
        margin-right: 20px;
      }

      .el-dropdown {
        float: right;
      }
    }
  }

  .el-breadcrumb {
    padding: 10px 20px;
  }

  .avatar {
    padding: 20px;
    border-bottom: 1px solid #dfdfdf;
    border-top: 1px solid #e1e1e1;
  }

  .content {
    padding: 20px;
    flex: 1;
    height: 0;
    overflow: auto;

    .title {
      padding: 0 0 20px;
      font-size: 16px;
      border-bottom: 0;
    }

    .tip {
      margin-left: 10px;
      font-size: 14px;
      color: #888;
    }

    .checkItem {
      margin-bottom: 20px;

      .label {
        color: #1e1e1e;
        font-size: 16px;
        margin-bottom: 20px;

        & > span {
          width: 150px;
          display: inline-block;
          text-align: left;
        }

        .el-checkbox .el-checkbox__label {
          font-size: 16px;
          color: #1e1e1e;
        }

        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background-color: #116eff;
          border-color: #116eff;
        }
      }

      .child {
        border: 1px solid #d2d2d2;
        border-radius: 4px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: 70px;

        .left {
          flex: 1;
          display: flex;
          align-items: center;

          .icon {
            font-size: 12px;
            background: #e2e2e2;
            color: #aaa;
            height: 32px;
            line-height: 32px;
            width: 32px;
            text-align: center;
            margin-right: 10px;
            border-radius: 5px;
          }
        }
      }
    }
  }

  .setBtn {
    height: 60px;
    padding: 10px 20px;
    margin: 0 -10px -10px;
    box-shadow: 0px -5px 8px 0px rgba(0, 0, 0, 0.19);
    text-align: right;
  }
}
</style>
