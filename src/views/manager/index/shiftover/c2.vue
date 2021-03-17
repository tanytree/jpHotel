<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-17 13:37:45
 * @FilePath: \jiudian\src\views\manager\index\shiftover\c2.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking flex_column" style="padding:0;margin:0 -10px;">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small">
        <el-row style="margin-bottom:10px;">
          <el-form-item :label="$t('manager.add_allDepartment')">
            <el-button v-for="(item,index) in tabs" :key="index" :type="tabCurr == item.handoverType ? 'primary' : ''" @click="changeTabs(item.handoverType)">
              {{$t('manager.typeNameList.'+item.handoverType)}}
            </el-button>
          </el-form-item>
        </el-row>
        <el-form-item :label="$t('manager.add_flightTime')">
          <el-date-picker v-model="searchForm.workStarTime" value-format="yyyy-MM-dd" type="date" style="width: 200px" :placeholder="$t('manager.add_chooseDate')"></el-date-picker>
          <span> {{ $t("desk.serve_to") }} </span>
          <el-date-picker v-model="searchForm.workEndTime" value-format="yyyy-MM-dd" type="date" style="width: 200px" :placeholder="$t('manager.add_chooseDate')"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('desk.serve_peopleDuty')">
          <el-input v-model="searchForm.employer" class="width200"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">{{
            $t("commons.queryBtn")
          }}</el-button>
          <el-button type="primary" class="white" @click="initForm">{{
            $t("commons.resetBtn")
          }}</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" class="submit">{{
            $t("desk.serve_heji")
          }}</el-button>
          <el-button type="primary" class="submit">{{
            $t("desk.serve_patch")
          }}</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据 -->
      <el-table ref="multipleTable" v-loading="loading" :data="tableData" :key="tabCurr" height="100%" header-row-class-name="default" size="small">
        <!-- 基本信息 -->
        <el-table-column :label="$t('desk.serve_basicInfo')" align="center">
          <el-table-column prop="handoveNum" :label="$t('desk.serve_flightA')" width="120px"></el-table-column>
          <el-table-column :label="$t('desk.serve_startAend')" width="180px">
            <template slot-scope="{ row }">
              <div>
                <span style="color: #126eff; margin-right: 2px">{{
                  $t("desk.serve_open")
                }}</span>{{ row.workStarTime }}
              </div>
              <div>
                <span style="color: #df1e1e; margin-right: 2px">{{
                  $t("desk.serve_tie")
                }}</span>{{ row.workEndTime }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="creatorName" :label="$t('desk.serve_peopleDuty')"></el-table-column>
        </el-table-column>
        <!-- 消费总计 -->
        <el-table-column :label="$t('manager.hk_constTotal')" align="center">
          <template v-if="tabCurr==1">
            <el-table-column :label="$t('manager.deskTab[0]')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[0]">{{row.subList[0].amount?row.subList[0].amount:0}}</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('manager.deskTab[1]')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[1]">{{row.subList[1].amount?row.subList[1].amount:0}}</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('manager.deskTab[2]')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[2]">{{row.subList[2].amount?row.subList[2].amount:0}}</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('manager.deskTab[3]')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[3]">{{row.subList[3].amount?row.subList[3].amount:0}}</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('manager.deskTab[4]')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[4]">{{row.subList[4].amount?row.subList[4].amount:0}}</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('desk.serve_goodsPrice')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[5]">{{row.subList[5].amount?row.subList[5].amount:0}}</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('desk.serve_foodPrice')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[6]">{{row.subList[6].amount?row.subList[6].amount:0}}</div>
              </template>
            </el-table-column>
          </template>
          <template v-if="tabCurr==2">
            <el-table-column :label="$t('manager.deskTab[1]')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[0]">{{row.subList[0].amount?row.subList[0].amount:0}}</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('desk.serve_foodPriceA')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[1]">{{row.subList[1].amount?row.subList[1].amount:0}}</div>
              </template>
            </el-table-column>
          </template>
          <template v-if="tabCurr==3">
            <el-table-column v-for="(item,index) in sellingList" :key="index" :label="item.sellingName" :prop="item.totalPrice">
            </el-table-column>
            <el-table-column :label="$t('manager.deskTab[3]')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[0]">{{row.subList[0].amount?row.subList[0].amount:0}}</div>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
        <!-- 结算总计 -->
        <el-table-column :label="$t('food.reset.totalFee')" align="center">
          <template v-if="tabCurr==1">
            <el-table-column :label="$t('manager.add_nowCashGetA')">
              <template slot-scope="{ row }">
                <div v-if="row.subList.length>0&&row.subList[7]">{{row.subList[7].amount?row.subList[7].amount:0}} <span @click="lookDetail('cashDialog',row)"><i class="el-icon-view"></i></span></div>
              </template>
            </el-table-column>
            <el-table-column  :label="$t('desk.serve_thisCard')">
              <template slot-scope="{ row }">
                <div v-if="row.subList.length>0&&row.subList[8]">{{row.subList[8].amount?row.subList[8].amount:0}} <span @click="lookDetail('cardDailog',row)"><i class="el-icon-view"></i></span></div>
              </template>
            </el-table-column>
            <el-table-column  :label="$t('manager.add_nowCardGetA')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[9]">{{row.subList[9].amount?row.subList[9].amount:0}}</div>
              </template>
            </el-table-column>
            <el-table-column  :label="$t('desk.add_otherGetA')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[10]">{{row.subList[10].amount?row.subList[10].amount:0}}</div>
              </template>
            </el-table-column>
             <el-table-column  label="本班payments收款">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[10]">{{row.subList[10].amount?row.subList[10].amount:0}}</div>
              </template>
            </el-table-column>
          </template>
          <template v-if="tabCurr==2">
            <el-table-column :label="$t('manager.add_nowCashGetA')" width="100px ">
              <template slot-scope="{ row }">
                <div v-if="row.subList.length>0&&row.subList[2]">
                  {{ row.subList[2].amount?row.subList[2].amount:0}}
                  <span @click="lookDetail('cashDialog',row)"><i class="el-icon-view"></i></span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('manager.add_nowBillGet')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[3]">{{row.subList[3].amount?row.subList[3].amount:0}}</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('manager.add_nowCardGetA')" width="100px">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[4]">{{row.subList[4].amount?row.subList[4].amount:0}}</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('desk.add_otherGetA')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[5]">{{row.subList[5].amount?row.subList[5].amount:0}}</div>
              </template>
            </el-table-column>
            <el-table-column label="本班payments收款">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[5]">{{row.subList[5].amount?row.subList[5].amount:0}}</div>
              </template>
            </el-table-column>
          </template>
          <template v-if="tabCurr==3">
            <el-table-column :label="$t('manager.add_nowCashGetA')" width="100px ">
              <template slot-scope="{ row }">
                <div v-if="row.subList.length>0&&row.subList[1]">
                  {{ row.subList[1].amount?row.subList[1].amount:0}}
                  <span @click="lookDetail('cashDialog',row)"><i class="el-icon-view"></i></span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('manager.add_nowBillGetB')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[2]">{{row.subList[2].amount?row.subList[2].amount:0}}</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('manager.add_nowCardGetA')" width="100px">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[3]">{{row.subList[3].amount?row.subList[3].amount:0}}</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('desk.add_otherGetA')">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[4]">{{row.subList[4].amount?row.subList[4].amount:0}}</div>
              </template>
            </el-table-column>
            <el-table-column label="本班payments收款">
              <template slot-scope="{row}">
                <div v-if="row.subList.length>0&&row.subList[4]">{{row.subList[4].amount?row.subList[4].amount:0}}</div>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
        <!-- 备用金 -->
        <el-table-column :label="$t('manager.add_nowGet')" align="center">
          <el-table-column prop="upMoneyRetained" :label="$t('manager.add_lastHold')" width="120px">
          </el-table-column>
          <el-table-column prop="nowMoneyRetained" :label="$t('manager.add_nowDownPri')" width="120px">
            <template slot-scope="{ row }">
              <div>
                {{ row.nowMoneyRetained }}
                <span @click="lookDetail('pettyCashDialog',row)"><i class="el-icon-view"></i></span>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <el-pagination @current-change="handleCurrentChange" :current-page="searchForm.page" layout="total, prev, pager, next, jumper" :page-size="searchForm.pageSize" :total="listTotal"></el-pagination>
    </div>
    <!-- 现金dialog -->
    <el-dialog top="0" :visible.sync="cashDialog" v-if="cashDialog" class="liveInPersonDia" :title="$t('desk.serve_cashView')" width="50%">
      <div class="dialog_top" v-if="tabCurr==1">
        {{ $t("desk.serve_systemIn") + ":" }}<span v-if="itemInfo&&itemInfo.subList">{{$F.numFormate(itemInfo.subList[7].amount)}}</span>{{ $t("desk.serve_yen") }}
      </div>
      <div class="dialog_top" v-if="tabCurr==2">
        {{ $t("desk.serve_systemIn") + ":" }}<span v-if="itemInfo&&itemInfo.subList">{{$F.numFormate(itemInfo.subList[2].amount)}}</span>{{ $t("desk.serve_yen") }}
      </div>
      <div class="dialog_top" v-if="tabCurr==3">
        {{ $t("desk.serve_systemIn") + ":" }}<span v-if="itemInfo&&itemInfo.subList">{{$F.numFormate(itemInfo.subList[1].amount)}}</span>{{ $t("desk.serve_yen") }}
      </div>
      <div class="dialog_middle" v-if="itemInfo">
        <div class="middle_text" v-for="(item,index) in itemInfo.moneyList" :key="index">
          <template v-if="item.projectType==1">
            {{ item.amountName + ":" }}<span>{{item.amountCount}}</span>{{ $t("desk.serve_zhang") }}
          </template>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="dialog_bot" v-if="itemInfo">
        {{ $t("desk.serve_balanceNum") }}<span>{{$F.numFormate(itemInfo.balancePrice)}}</span>{{ $t("desk.serve_parentheses") }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cashDialog = false">{{
          $t("commons.close")
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 挂账dialog -->
    <el-dialog top="0" :visible.sync="cardDailog" :title="$t('manager.add_viewThisCard')" width="50%">
      <div class="dialog_top">
        {{$t('manager.add_paymentOfTotal')}}：<span style="color:#0067ff">{{checkTotal()}}</span>{{ $t("desk.serve_yen") }}
      </div>
      <div class="dialog_middle">
        <div class="middle_text2">
          {{$t('commons.paymentWay[1]')}}：￥{{checkMoney('1')}}
        </div>
        <div class="middle_text2">
          {{$t('commons.paymentWay[2]')}}：￥{{checkMoney('2')}}
        </div>
        <div class="middle_text2">
          {{$t('commons.paymentWay[3]')}}：￥{{checkMoney('3')}}
        </div>
        <div class="middle_text2">
          {{$t('commons.paymentWay[4]')}}：￥{{checkMoney('4')}}
        </div>
        <div class="middle_text2">
          {{$t('commons.paymentWay[5]')}}：￥{{checkMoney('5')}}
        </div>
        <div class="middle_text2">
          {{$t('commons.paymentWay[6]')}}：￥{{checkMoney('6')}}
        </div>
        <div class="middle_text2">
          {{$t('commons.paymentWay[7]')}}：￥{{checkMoney('7')}}
        </div>
        <div class="middle_text2">
          {{$t('commons.paymentWay[8]')}}：￥{{checkMoney('8')}}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cardDailog = false">{{
          $t("commons.close")
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 本班下放备用金dialog -->
    <el-dialog top="0" :visible.sync="pettyCashDialog" class="liveInPersonDia" :title="$t('manager.add_viewPettyCash')" width="50%">
      <div class="dialog_top">
        {{$t('manager.add_nowDownPriA')}}：<span v-if="itemInfo">{{$F.numFormate(itemInfo.nowMoneyRetained)}}</span>{{ $t("desk.serve_yen") }}
      </div>
      <div class="dialog_middle" v-if="itemInfo">
        <div class="middle_text" v-for="(item,index) in itemInfo.moneyList" :key="index">
          <template v-if="item.projectType==2">
            {{ item.amountName + ":" }}<span>{{item.amountCount}}</span>{{ $t("desk.serve_zhang") }}
          </template>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="dialog_bot">
        {{ $t("desk.serve_balanceNum") }}<span v-if="itemInfo">{{$F.numFormate(itemInfo.standbyBalancePrice)}}</span>{{$t('desk.customer_banJiA')}}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="pettyCashDialog = false">{{
          $t("commons.close")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["tabs", "employeeList"],
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
      tabCurr: "1",
      cashDialog: false, //现金dialog
      cardDailog: false, //挂账dialog
      pettyCashDialog: false, //本班下放备用金dialog
      loading: false,
      searchForm: {
        workStarTime: "",
        workEndTime: "",
        employer: "",
        paging: true,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
      },
      listTotal: 0, //总条数
      tableData: [], //表格数据
      itemInfo: null,
      cardDailogInfo: [], //点击挂账眼睛 显示的信息
      sellingList: [],
    };
  },

  mounted() {
    this.initForm();
  },
  methods: {
    checkTotal() {
      if (this.cardDailogInfo.length > 0) {
        let totalPrice = 0;
        for (let item of this.cardDailogInfo) {
          totalPrice += item.totalPrice;
        }
        return this.$F.numFormate(totalPrice);
      } else {
        return 0;
      }
    },
    checkMoney(num) {
      if (this.cardDailogInfo.length > 0) {
        for (let item of this.cardDailogInfo) {
          if (item.putUp == num) {
            return this.$F.numFormate(item.totalPrice);
          }
        }
        return 0;
      } else {
        return 0;
      }
    },
    checkEmployee(handoveEmployeedId) {
      console.log(this.employeeList);
      for (let item of this.employeeList) {
        if (item.id == handoveEmployeedId) {
          return item.account;
        }
      }
    },
    initForm() {
      this.tabCurr = "1";
      this.searchForm = {
        workStarTime: "",
        workEndTime: "",
        employer: "",
        paging: true,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
      };
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      let url = "";
      if (this.tabCurr == 1) {
        url = "/pms/handover/handover_list_list";
      } else if (this.tabCurr == 2) {
        url = "/pms/dishes/handover/handover_list_list";
      } else {
        url = "/pms/shop/handover/handover_list_list";
      }
      this.$F.doRequest(this, url, this.searchForm, (res) => {
        console.log(res.handoverListList);
        this.tableData = res.handoverListList;
        this.sellingList = res.handoverListList.sellingList || [];
        this.listTotal = res.page.count;
      });
    },
    changeTabs(v) {
      this.tabCurr = v;
      this.getDataList();
    },
    //点击眼睛图标
    lookDetail(type, row) {
      this.itemInfo = row;
      switch (type) {
        case "cashDialog":
          this.cashDialog = true;
          break;
        case "cardDailog":
          let startTime = this.$F.formatTime(row.workStarTime)[0];
          let endTime = this.$F.formatTime(row.workEndTime)[0];
          let params = {
            workStarTime: startTime,
            workEndTime: endTime,
          };
          this.$F.doRequest(
            this,
            "/pms/handover/handover_putup_group",
            params,
            (res) => {
              this.cardDailogInfo = res.upGroupCount;
              console.log(this.cardDailogInfo);
            }
          );

          this.cardDailog = true;
          break;
        case "pettyCashDialog":
          this.pettyCashDialog = true;
          break;
      }
    },
    /**每页数 */
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.searchForm.pageIndex = 1;
      this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.searchForm.pageIndex = val;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
  },
};
</script>
<style lang="less" scoped>
.dialog_top {
  color: rgba(51, 51, 51, 100);
  font-size: 16px;
  font-weight: 500;
  span {
    color: #1872ff;
  }
  margin-bottom: 25px;
}
.dialog_middle {
  color: rgba(30, 30, 30, 100);
  font-size: 16px;
  .middle_text {
    margin-bottom: 15px;
    span {
      color: #1872ff;
      margin-left: 20px;
    }
  }
  .middle_text2 {
    margin-bottom: 5px;
  }
}
.dialog_bot {
  color: rgba(51, 51, 51, 100);
  font-size: 16px;
  font-weight: 500;
  span {
    color: red;
    margin-right: 12px;
  }
}
</style>
