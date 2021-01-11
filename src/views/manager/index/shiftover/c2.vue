<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-11 17:46:38
 * @FilePath: \jiudian\src\views\manager\index\shiftover\c2.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking flex_column" style="padding:0;margin:0 -10px;">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small" label-width="80px">
        <el-row style="margin-bottom:10px;">
            <el-button type="text" style="color: #333;font-size: 14px;">{{$t('manager.add_allDepartment')}}</el-button>
            <el-button v-for="(item,index) in tabs" :key="index"  :type="tabCurr == item.handoverType ? 'primary' : ''" @click="changeTabs(item.handoverType)">
            {{$t('manager.typeNameList.'+item.handoverType)}}
            </el-button>
        </el-row>
        <el-form-item :label="$t('desk.serve_flightTime')">
          <el-date-picker
            v-model="searchForm.workStarTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 200px"
            :placeholder="$t('desk.serve_chooseDate')"
          ></el-date-picker>
          <span> {{ $t("desk.serve_to") }} </span>
          <el-date-picker
            v-model="searchForm.workEndTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 200px"
            :placeholder="$t('desk.serve_chooseDate')"
          ></el-date-picker>
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
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        height="100%"
        header-row-class-name="default"
        size="small"
      >
        <el-table-column
          :label="$t('desk.serve_basicInfo')"
          fixed="left"
          align="center"
          width="255px"
        >
          <el-table-column prop="createTime" :label="$t('desk.serve_flight')">
          </el-table-column>
          <el-table-column :label="$t('desk.serve_startAend')" width="100px">
            <template slot-scope="{ row }">
              <div>
                <span style="color: #126eff; margin-right: 2px">{{
                  $t("desk.serve_open")
                }}</span
                >{{ row.workStarTime }}
              </div>
              <div>
                <span style="color: #df1e1e; margin-right: 2px">{{
                  $t("desk.serve_tie")
                }}</span
                >{{ row.workEndTime }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="handoveEmployeedId"
            :label="$t('desk.serve_peopleDuty')"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('desk.serve_flightDuty')" align="center">
          <el-table-column :label="$t('desk.serve_cash')"
            ><template slot-scope="{ row }">
              <div>
                {{ row.nowMoneyRetained }}
                <span @click="lookDetail(row)"
                  ><i class="el-icon-view"></i
                ></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('desk.serve_thisCard')">
          </el-table-column>
          <el-table-column
            prop="nowWeixinRetained"
            :label="$t('desk.serve_wechat')"
          >
          </el-table-column>
          <el-table-column
            prop="nowAliRetained"
            :label="$t('desk.serve_alipay')"
          >
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('desk.serve_other')">
          </el-table-column>
          <el-table-column
            prop="createTime"
            :label="$t('desk.serve_roomPrice')"
          >
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('desk.serve_miniPub')">
          </el-table-column>
          <el-table-column
            prop="createTime"
            :label="$t('desk.serve_memCardPrice')"
            width="100px "
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            :label="$t('desk.serve_foodPrice')"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            :label="$t('desk.serve_goodsPrice')"
          >
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('desk.serve_otherIn')">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('desk.serve_cashModel')" align="center">
          <el-table-column
            prop="nowMoneyHandin"
            :label="$t('desk.serve_flightCashUp')"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="nowWeixinHandin"
            :label="$t('desk.serve_flightWeUp')"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="nowAliHandin"
            :label="$t('desk.serve_flightAliUp')"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="goSettlement"
            :label="$t('desk.serve_flightGoOrder')"
            width="140px"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            :label="$t('desk.serve_actralAmount')"
            width="140px"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            :label="$t('desk.serve_drowPrice')"
            width="120px"
          >
          </el-table-column>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        layout="total, prev, pager, next, jumper"
        :page-size="searchForm.pageSize"
        :total="listTotal"
      ></el-pagination>
    </div>
    <!-- 现金统计查看dialog -->

    <el-dialog
      top="0"
      :visible.sync="lookMoney"
      class="liveInPersonDia"
      :title="$t('desk.serve_cashView')"
      width="80%"
    >
      <div class="dialog_top">
        {{ $t("desk.serve_systemIn") + ":" }}<span>1000.00</span
        >{{ $t("desk.serve_yen") }}
      </div>
      <div class="dialog_middle">
        <div class="middle_text">
          {{ $t("desk.serve_wuYen") + ":" }}<span>1</span
          >{{ $t("desk.serve_zhang") }}
        </div>
        <div class="middle_text">
          {{ $t("desk.serve_yiYen") + ":" }}<span>4</span
          >{{ $t("desk.serve_zhang") }}
        </div>
        <div class="middle_text">
          {{ $t("desk.serve_yiYen") + ":" }}<span>2</span
          >{{ $t("desk.serve_zhang") }}
        </div>
      </div>
      <el-divider></el-divider>
      <div class="dialog_bot">
        {{ $t("desk.serve_balanceNum") }}<span>0</span
        >{{ $t("desk.serve_parentheses") }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="lookMoney = false">{{
          $t("commons.close")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props:['tabs'],
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
      tabCurr:'1',
      lookMoney: false,
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
    initForm() {
      this.tabCurr = '1'
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
        let url = ''
        if(this.tabCurr == 1){
            url = '/pms/handover/handover_list_list'
        }else if(this.tabCurr == 2){
            url = '/pms/dishes/handover/handover_list_list'
        }else{
            url = '/pms/shop/handover/handover_list_list'
        }


        this.$F.doRequest(this,url,this.searchForm,(res) => {
          // console.log(res);
          this.tableData = res.handoverListList;
          this.listTotal = res.page.count;
        }
      );
    },
    changeTabs(v){
        console.log(v)
      this.tabCurr = v
      this.getDataList();
    },
    //点击眼睛图标
    lookDetail(row) {
      this.itemInfo = row;
      this.lookMoney = true;
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
