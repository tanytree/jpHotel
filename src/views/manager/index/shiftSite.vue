<template>
  <div class="boss-index">
    <el-tabs v-model="activeName" @tab-click="changeTab" class="tabCenter">
      <el-tab-pane :label="$t('manager.shiftOver')" name="shiftOver">
        <c1 :tabs="tabLists" :employeeList="employeeList"></c1>
      </el-tab-pane>
      <el-tab-pane :label="$t('desk.serve_changeRecord')" name="changeRecord">
        <c2 :tabs="tabLists" :employeeList="employeeList"></c2>
      </el-tab-pane>
      <!-- 备用金设定 -->
      <el-tab-pane :label="$t('manager.hp_patternsSuccession')" name="handover">
        <div class="content">
          <div class="manage">
            <div class="manage-item" v-for="(item, index) in handData" :key="index">
              <el-form size="small" inline label-position="left">
                <el-form-item :label="item.handoverType == 1 ? $t('manager.hp_lockerA') : item.handoverType == 2 ? $t('manager.hp_lockerB') : $t('manager.hp_lockerC')+':'">
                  <el-input v-model="item.pettyCash">
                    <template slot="append">{{$t('manager.ps_japanYen')}}</template>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('manager.hp_modelSpecification')+':'" class="inline">
                  <el-input type="textarea" :placeholder="$t('commons.pleaseEnterB')" resize="none" :rows="3" v-model="item.remark"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="footer">
            <el-button type="primary" class="submit" @click="submit('hand')">{{$t('commons.save')}}</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import c1 from "./shiftover/c1";
import c2 from "./shiftover/c2";
export default {
  components: { c1, c2 },
  data() {
    return {
      activeName: "shiftOver",
      handType: {},
      pageForm: {
        pageIndex: 1,
        pageSize: 10,
        paging: true,
      },
      loading: false,
      total: 0,
      manageData: [],
      addTypeVisible: false,
      typeData: {},
      addTypeTitle: "",
      startPicker: { start: "00:00", end: "24:00" },
      endPicker: { start: "00:00", end: "24:00" },
      tabLists: [], //部门列表
      employeeList: [], //员工列表
    };
  },
  props: {
    handData: Array,
    initData: Function,
  },
  computed: {
    editore: {
      get() {
        return this.$t("manager.hp_editor");
      },
      set() {},
    },
    newAdd: {
      get() {
        return this.$t("commons.newAdd");
      },
      set() {},
    },
    saveSuccess: {
      get() {
        return this.$t("commons.saveSuccess");
      },
      set() {},
    },
  },
  watch: {
    editore(newValue, oldValue) {
      this.editore = newValue;
    },
    newAdd(newValue, oldValue) {
      this.newAdd = newValue;
    },
    saveSuccess(newValue, oldValue) {
      this.saveSuccess = newValue;
    },
  },
  mounted() {
    this.getTabsList();
    this.getEmployeelist();
  },
  methods: {
    changeTab(tab) {
      if (this.activeName == "handover") {
        this.initData();
      } else {
        this.handType = this.$F.deepClone(this.handData[0]);
        this.getDamageData();
      }
    },
    radioChange(val) {
      this.handType = this.$F.deepClone(
        this.handData.find((item) => item.id === val)
      );
      this.getDamageData();
    },
    getDamageData() {
      const params = {
        handoverType: this.handType.handoverType,
      };
      this.$F.merge(params, this.pageForm);
      this.$F.doRequest(this, "/pms/handoverlog/list", params, (res) => {
        this.manageData = res.list;
        this.pageForm = {
          pageIndex: res.page.pageIndex,
          pageSize: res.page.pageSize,
          paging: true,
        };
        this.total = res.page.count;
      });
    },
    popup_thing(row) {
      this.addTypeVisible = true;
      if (row.id) {
        this.typeData = row;
        this.addTypeTitle = this.editore;
      } else {
        this.typeData = { name: "", startTime: "", endTime: "" };
        this.addTypeTitle = this.newAdd;
      }
    },
    saveInfo() {
      const params = {
        id: this.typeData.id,
        name: this.typeData.name,
        handoverType: this.handType.handoverType,
        startTime: this.typeData.startTime,
        endTime: this.typeData.endTime,
      };
      this.$F.doRequest(this, "/pms/handoverlog/edit", params, (res) => {
        this.addTypeVisible = false;
        this.getDamageData();
      });
    },
    popup_kinds() {
      this.dialogAdd_kinds = true;
    },
    currentChange(val) {
      this.pageForm.pageIndex = val;
      this.getDamageData();
    },
    onConfirm(row) {
      this.$F.doRequest(
        this,
        "/pms/handoverlog/delete",
        { id: row.id },
        (res) => {
          this.getDamageData();
        }
      );
    },
    submit(type) {
      if (type == "hand") {
        let arr = [];
        //
        // this.handData.map(item => {
        // 	const obj = {handoverStatus: item.handoverStatus, pettyCash: item.pettyCash, handoverType: item.handoverType}
        // 	arr.push(obj);
        // })
        const params = {
          content: JSON.stringify(this.handData),
        };
        this.$F.doRequest(this, "/pms/handover/edit", params, (res) => {
          this.initData();
          this.$message({ message: this.saveSuccess, type: "success" });
        });
      } else {
      }
    },
    /**获取部门列表 */
    getTabsList() {
      // this.loading = false
      let params = {};
      params.userId = this.userId;
      params.storesNum = this.storesNum;
      this.$F.doRequest(this, "/pms/handover/list", params, (res) => {
        this.tabLists = res;
      });
    },

    getEmployeelist() {
      let params = {
        searchType: 1,
        paging: false,
        pageIndex: 1, //当前页
        // pageSize: 10, //页数
        pageSize: 999, //页数
      };
      params.userId = this.userId;
      params.storesNum = this.storesNum;
      this.$F.doRequest(
        this,
        "/pms/workuser/login_user_list",
        params,
        (res) => {
          console.log(res);
          this.employeeList = res.hotelUserList;
        }
      );
    },

    // startFocus(e) {
    //     let start = '00:00', end = '24:00'
    //     if(this.manageData.length > 0) {
    //         this.manageData.map(item => {
    //             if(start < item.endTime) {
    //                 start = item.endTime
    //             }
    //             if(end > item.startTime) {
    //                 end = item.startTime
    //             }
    //         })
    //     }
    //     if(start == '24:00') {
    //         start = '00:00'
    //     }
    //     if(start < end) {}
    //     this.startPicker = {start: '00:00', end: '24:00'}
    // },
    // endFocus(e) {
    //     let end = '24:00';
    //     if(this.manageData.length > 0) {
    //         this.manageData.map(item => {
    //             if(end > item.startTime) {
    //                 end = item.startTime
    //             }
    //         })
    //     }
    //     this.endPicker = {start: this.typeData.startTime, end: '48:00'}
    // },
  },
};
</script>

<style lang="scss">
.tabCenter {
  padding: 10px;

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;

    .demo-form-inline {
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .manage {
      flex: 1;
      height: 0;
      overflow: auto;

      .handTitle {
        color: #1e1e1e;
        margin-bottom: 12px;

        .square {
          height: 13px;
          width: 3px;
          border-radius: 5px;
          background: #126eff;
          display: inline-block;
          margin-right: 10px;
        }
      }

      .el-form-item.inline {
        width: 100%;
        margin-right: 0;

        .el-form-item__content {
          width: 1000px;
        }
      }
    }

    .footer {
      border-top: 1px solid #e2e2e2;
      line-height: 60px;
      padding: 0 20px;
    }
  }
}
</style>
