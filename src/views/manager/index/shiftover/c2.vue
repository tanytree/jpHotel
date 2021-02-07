<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-07 10:56:36
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
        <el-form-item :label="$t('desk.serve_flightTime')">
          <el-date-picker v-model="searchForm.workStarTime" value-format="yyyy-MM-dd" type="date" style="width: 200px" :placeholder="$t('desk.serve_chooseDate')"></el-date-picker>
          <span> {{ $t("desk.serve_to") }} </span>
          <el-date-picker v-model="searchForm.workEndTime" value-format="yyyy-MM-dd" type="date" style="width: 200px" :placeholder="$t('desk.serve_chooseDate')"></el-date-picker>
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
      <el-table ref="multipleTable" v-loading="loading" :data="tableData" height="100%" header-row-class-name="default" size="small">
        <el-table-column :label="$t('desk.serve_basicInfo')" align="center">
          <el-table-column prop="createTime" :label="$t('desk.serve_flight')" width="100px">
            <template slot-scope="{row}">
              <div v-for="(item,index) in $F.formatTime(row.createTime)" :key="index">{{item}}</div>
            </template>
          </el-table-column>
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
          <el-table-column prop="handoveEmployeedId" :label="$t('desk.serve_peopleDuty')">
            <template slot-scope="{row}">
              {{checkEmployee(row.handoveEmployeedId)}}
            </template>
          </el-table-column>
        </el-table-column>
        <!-- 本班全责汇总 前台部 tabCurr==1 -->
        <el-table-column :label="$t('desk.serve_flightDuty')" align="center" v-if="tabCurr==1" :key="tabCurr">
          <el-table-column prop="createTime" :label="$t('desk.serve_roomPrice')">
          </el-table-column>
          <el-table-column prop="createTime" label="附餐费">
          </el-table-column>
          <el-table-column prop="createTime" label="会议室">
          </el-table-column>
          <el-table-column prop="createTime" label="迷你吧商品">
          </el-table-column>
          <el-table-column prop="createTime" label="其他">
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('desk.serve_goodsPrice')">
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('desk.serve_foodPrice')">
          </el-table-column>
          <el-table-column :label="$t('desk.serve_cash')">
            <template slot-scope="{ row }">
              <div>
                {{ row.nowMoneyRetained }}
                <span @click="lookDetail('cashDialog',row)"><i class="el-icon-view"></i></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('desk.serve_thisCard')">
            <template slot-scope="{ row }">
              <div>
                {{ row.nowMoneyRetained }}
                <span @click="lookDetail('cardDailog',row)"><i class="el-icon-view"></i></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="nowAliRetained" :label="$t('desk.add_creditCard')">
          </el-table-column>
          <el-table-column prop="createTime" label="其他">
          </el-table-column>
          <el-table-column prop="nowMoneyHandin" label="上班留存备用金" width="120px">
          </el-table-column>
          <el-table-column prop="nowWeixinHandin" label="本班下放备用金" width="120px">
            <template slot-scope="{ row }">
              <div>
                {{ row.nowMoneyRetained }}
                <span @click="lookDetail('pettyCashDialog',row)"><i class="el-icon-view"></i></span>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <!-- 本班全责汇总 餐饮部 tabCurr==2 -->
        <el-table-column :label="$t('desk.serve_flightDuty')" align="center" v-if="tabCurr==2" :key="tabCurr">
          <el-table-column prop="createTime" label="餐饮费">
          </el-table-column>
          <el-table-column prop="createTime" label="附餐费">
          </el-table-column>
          <el-table-column label="现金" width="100px ">
            <template slot-scope="{ row }">
              <div>
                {{ row.nowMoneyRetained }}
                <span @click="lookDetail('cashDialog',row)"><i class="el-icon-view"></i></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="挂账到房间">
          </el-table-column>
          <el-table-column prop="createTime" label="信用卡" width="100px">
          </el-table-column>
          <el-table-column prop="createTime" label="其他">
          </el-table-column>
          <el-table-column prop="nowMoneyHandin" label="上班留存备用金" width="120px">
          </el-table-column>
          <el-table-column prop="nowWeixinHandin" label="本班下放备用金" width="120px">
            <template slot-scope="{ row }">
              <div>
                {{ row.nowMoneyRetained }}
                <span @click="lookDetail('pettyCashDialog',row)"><i class="el-icon-view"></i></span>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <!-- 本班全责汇总 商店部 tabCurr==3 -->
        <el-table-column :label="$t('desk.serve_flightDuty')" align="center" v-if="tabCurr==3" :key="tabCurr">
          <el-table-column prop="createTime" label="迷你吧">
          </el-table-column>
          <el-table-column prop="createTime" label="售卖点1">
          </el-table-column>
          <el-table-column label="现金" width="100px ">
            <template slot-scope="{ row }">
              <div>
                {{ row.nowMoneyRetained }}
                <span @click="lookDetail('cashDialog',row)"><i class="el-icon-view"></i></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="挂账到房间">
          </el-table-column>
          <el-table-column prop="createTime" label="信用卡" width="100px">
          </el-table-column>
          <el-table-column prop="createTime" label="其他">
          </el-table-column>
          <el-table-column prop="nowMoneyHandin" label="上班留存备用金" width="120px">
          </el-table-column>
          <el-table-column prop="nowWeixinHandin" label="本班下放备用金" width="120px">
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
    <el-dialog top="0" :visible.sync="cashDialog" class="liveInPersonDia" :title="$t('desk.serve_cashView')" width="50%">
      <div class="dialog_top">
        {{ $t("desk.serve_systemIn") + ":" }}<span>1000.00</span>{{ $t("desk.serve_yen") }}
      </div>
      <div class="dialog_middle">
        <div class="middle_text">
          {{ $t("desk.serve_wuYen") + ":" }}<span>1</span>{{ $t("desk.serve_zhang") }}
        </div>
        <div class="middle_text">
          {{ $t("desk.serve_yiYen") + ":" }}<span>4</span>{{ $t("desk.serve_zhang") }}
        </div>
        <div class="middle_text">
          {{ $t("desk.serve_yiYen") + ":" }}<span>2</span>{{ $t("desk.serve_zhang") }}
        </div>
      </div>
      <el-divider></el-divider>
      <div class="dialog_bot">
        {{ $t("desk.serve_balanceNum") }}<span>0</span>{{ $t("desk.serve_parentheses") }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cashDialog = false">{{
          $t("commons.close")
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 挂账dialog -->
    <el-dialog top="0" :visible.sync="cardDailog" title="挂账统计查看" width="50%">
      <div class="dialog_top">
        总挂账：<span style="color:#0067ff">{{$F.numFormate(1000)}}</span>日元
      </div>
      <div class="dialog_middle">
        <div class="middle_text2">
          单位挂账：￥{{$F.numFormate(2000)}}
        </div>
        <div class="middle_text2">
          商品券：￥{{$F.numFormate(2000)}}
        </div>
        <div class="middle_text2">
          住宿券：￥{{$F.numFormate(2000)}}
        </div>
        <div class="middle_text2">
          折价券：￥{{$F.numFormate(2000)}}
        </div>
        <div class="middle_text2">
          点数：￥{{$F.numFormate(2000)}}
        </div>
        <div class="middle_text2">
          招待券：￥{{$F.numFormate(2000)}}
        </div>
        <div class="middle_text2">
          其他：￥{{$F.numFormate(2000)}}
        </div>
        <div class="middle_text2">
          辅助金：￥{{$F.numFormate(2000)}}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cardDailog = false">{{
          $t("commons.close")
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 本班下放备用金dialog -->
    <el-dialog top="0" :visible.sync="pettyCashDialog" class="liveInPersonDia" title="本班下放备用金统计查看" width="50%">
      <div class="dialog_top">
        本班下放备用金<span>{{$F.numFormate(10000)}}</span>{{ $t("desk.serve_yen") }}
      </div>
      <div class="dialog_middle">
        <div class="middle_text">
          {{ $t("desk.serve_wuYen") + ":" }}<span>1</span>{{ $t("desk.serve_zhang") }}
        </div>
        <div class="middle_text">
          {{ $t("desk.serve_yiYen") + ":" }}<span>4</span>{{ $t("desk.serve_zhang") }}
        </div>
        <div class="middle_text">
          {{ $t("desk.serve_yiYen") + ":" }}<span>2</span>{{ $t("desk.serve_zhang") }}
        </div>
      </div>
      <el-divider></el-divider>
      <div class="dialog_bot">
        {{ $t("desk.serve_balanceNum") }}<span>0</span>(平衡数=实际下放备用金-备用金额度)
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
    };
  },

  mounted() {
    this.initForm();
  },
  methods: {
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
        // console.log(res);
        this.tableData = res.handoverListList;
        this.listTotal = res.page.count;
      });
    },
    changeTabs(v) {
      console.log(v);
      this.tabCurr = v;
      this.getDataList();
    },
    //点击眼睛图标
    lookDetail(type, row) {
      switch (type) {
        case "cashDialog":
          this.cashDialog = true;
          break;
        case "cardDailog":
          this.cardDailog = true;
          break;
        case "pettyCashDialog":
          this.pettyCashDialog = true;
          break;
      }
      this.itemInfo = row;
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
