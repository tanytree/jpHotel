<!--  前台部 > 客户管理 > 单位管理 > 入账管理   -->
<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form class="term demo-form-inline" inline size="small" v-model="searchForm" label-width="80px">
        <el-form-item :label="$t('boss.store_storeNameB') + ':'" v-if="souracePage=='header'">
          <el-select v-model="searchForm.storesNum" filterable :placeholder="$t('commons.placeChoose')" class="width150">
            <el-option :label='$t("desk.home_allA")' value=''></el-option>
            <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_unitName') + ':'">
          <el-select v-model="searchForm.enterName" class="width150">
            <el-option :label="$t('commons.allA')" value=""></el-option>
            <el-option v-for="(item, index) in unitList" :key="index" :label="item.enterName" :value="item.enterName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_billState') + ':'">
          <el-select v-model="searchForm.intoStatus" class="width150">
            <el-option :label="$t('commons.all')" value=""></el-option>
            <el-option :label="$t('desk.customer_areadyBookA')" value="3"></el-option>
            <el-option :label="$t('desk.customer_notInbill')" value="1"></el-option>
            <el-option :label="$t('desk.customer_partBill')" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">{{ $t("commons.queryBtn") }}</el-button>
          <el-button type="primary" class="grey" @click="initForm">{{ $t("commons.resetBtn") }}</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据 -->
      <el-table ref="multipleTable" border v-loading="loading" :data="tableData" height="100%" header-row-class-name="default" size="small">
        <el-table-column align="center" prop="enterName" :label="$t('desk.customer_unitName')" show-overflow-tooltip width="100px"></el-table-column>
        <el-table-column align="center" :label="$t('boss.store_storeNameA')" show-overflow-tooltip v-if="souracePage=='header'">
          <template slot-scope="{row}">
            <div v-if="row&&row.storesNum">{{checkStores(row.storesNum)}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('desk.customer_arage')" show-overflow-tooltip width="120px">
          <template slot-scope="{ row }">
            <div>
              <span style="color: #f11717">{{ $t("desk.serve_openA") }}</span>{{ row.startTime }}
            </div>
            <div>
              <span style="color: #1a3bf1">{{ $t("desk.serve_tieA") }}</span>
              {{ row.endTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="requestNum" :label="$t('desk.customer_paragraphNum')">
        </el-table-column>
        <el-table-column align="center" :label="$t('desk.customer_areadyPriceA')" prop="requestPrice">
        </el-table-column>
        <el-table-column align="center" prop="intoPrice" :label="$t('desk.customer_areadyBookPrice')">
        </el-table-column>
        <el-table-column align="center" :label="$t('desk.customer_waiteBookPrice')">
          <template slot-scope="{ row }">
            <div>{{ row.requestPrice - row.intoPrice }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" :label="$t('desk.customer_creativeTimeA')">
        </el-table-column>
        <el-table-column align="center" :label="$t('desk.customer_billState')" width="80">
          <template slot-scope="{ row }">
            <div v-if="row.intoStatus==1">
              {{$t('desk.customer_notInbill')}}
            </div>
            <div v-if="row.intoStatus==2">
              {{$t('desk.customer_partBill')}}
            </div>
            <div v-if="row.intoStatus==3">
              {{$t('desk.customer_areadyBookA')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('commons.operating')" width="220">
          <template slot-scope="{ row }">
            <!-- 查看挂账明细 -->
            <el-button type="text" @click="advancePayments(row)" size="mini">{{
                                $t("desk.customer_lookBuyDetailA")
                            }}
            </el-button>
            <!-- 入账 -->
            <el-button type="text" v-if="row.requestPrice > row.intoPrice" @click="settlement(row)" size="mini">{{ $t("desk.enterAccount") }}
            </el-button>
            <!-- 入账记录 -->
            <el-button type="text" @click="bookRecord(row)" size="mini">{{
                                $t("desk.customer_bookRecord")
                            }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" :total="listTotal" layout="total, prev, pager, next, jumper"></el-pagination>
      </div>
    </div>
    <!-- 查看请款明细dialog -->
    <el-dialog :title="$t('desk.customer_lookBuyDetailA')" v-if="advanceDialog" :visible.sync="advanceDialog" width="90%" top="0">
      <div class="flexBox">
        <div class="weight">{{itemInfo.enterName}}</div>
        <div class="weigth">
          <span>{{ $t("desk.customer_totalCreditAmount") + ":"
            }}{{ totalConsumerPrice }}</span>
          <span style="margin-left:  26px">{{ $t("desk.customer_cardRecords") + ":" }}{{ buyTable.length
            }}{{ $t("desk.customer_article") }}</span>
        </div>
        <!--        <el-button type="primary">导出EXCEL</el-button>-->
      </div>
      <el-table ref="multipleTable" v-loading="loading" :data="buyTable" height="100%" border header-row-class-name="default" size="small">
        <el-table-column align="center" :label="$t('desk.home_name')" prop="checkIn.name" width="140">
          <template slot-scope="{ row }">
            {{ row.checkIn.name + `【${row.checkIn.pronunciation || ""}】` }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('desk.customer_payMenttiem')" prop="createTime" show-overflow-tooltip width="160px"></el-table-column>
        <el-table-column align="center" prop="checkIn.orderNum" :label="$t('desk.customer_originOrderNum')" width="150">
        </el-table-column>
        <el-table-column align="center" prop="onAccountTotal" :label="$t('desk.customer_amountPrice')">
        </el-table-column>
        <el-table-column align="center" :label="$t('desk.customer_roomKind')" show-overflow-tooltip width="110px">
          <template slot-scope="{ row }">
            <div>
              {{ row.checkIn.hotelCheckInRoom.roomTypeName || "" }}
              <span>/</span>
              {{ row.checkIn.hotelCheckInRoom.houseNum || "" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('desk.customer_accommodationFees')" width="120" prop="roomPrice"></el-table-column>
        <el-table-column align="center" :label="$t('desk.customer_foodPrice')" width="90">
          <template slot-scope="{row}">
            {{row.dishesPrice+row.shopPrice}}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('desk.customer_checkAlive')" width="160">
          <template slot-scope="{row}">
            <div>{{row.checkIn.checkinTime}}</div>
            <div>{{row.checkIn.checkoutTime}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('desk.customer_spendTime')" width="160" prop="checkIn.checkinTime"></el-table-column>
        <el-table-column align="center" :label="$t('desk.customer_xiaoJi')" prop="onAccountTotal"></el-table-column>
      </el-table>
      <!--分页 -->
      <div class="block">
        <el-pagination @current-change="handlePageIndex" :current-page="innerPageIndex" :page-size="innerPageSize" :total="innnerListTotal" layout="total, prev, pager, next, jumper"></el-pagination>
      </div>
      <div slot="footer">
        <div class="dialog-footer">
          <el-button type="primary" @click="advanceDialog = false">{{
            $t("commons.close")
          }}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 入账记录dialog -->
    <el-dialog :title="$t('desk.customer_bookRecord')" v-if="bookDialog" :visible.sync="bookDialog" top="0" width="80%">
      <el-table ref="multipleTable" v-loading="loading" :data="recordList" height="100%" header-row-class-name="default" size="small">
        <el-table-column prop="creatorName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" :label="$t('desk.customer_operateTime')">
        </el-table-column>
        <el-table-column :label="$t('desk.enterAccountMoney')" prop="operPrice">
        </el-table-column>
        <el-table-column :label="$t('desk.customer_remittanceTime')" prop="remittanceTime">
        </el-table-column>
        <el-table-column :label="$t('desk.customer_remittanceBank')" prop="remittanceBank">
        </el-table-column>
        <el-table-column :label="$t('desk.customer_remittanceAccount')" prop="remittanceAccount">
        </el-table-column>
        <el-table-column :label="$t('desk.home_note')" prop="remark">
        </el-table-column>
      </el-table>
      <div slot="footer">
        <div class="dialog-footer">
          <el-button type="primary" @click="bookDialog = false">{{
                            $t("commons.close")
                        }}
          </el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 入账 dialog -->
    <el-dialog :title="$t('desk.enterAccount')" v-if="settlementDialog" :visible.sync="settlementDialog" width="40%" top="0">
      <div style="margin-left:150px;">
        <span>{{ $t("desk.customer_placeMoney") + ":" }}{{ itemInfo.requestPrice }}；</span>
        <span style="margin-left: 6px">{{ $t("desk.customer_areadyBookPrice") + ":" }}{{
                        itemInfo.intoPrice
                    }}</span>
      </div>
      <el-form size="small" :model="enterForm" ref="enterForm" style="margin-top: 15px" label-width="100px" :rules="enterRules">
        <el-form-item :label="$t('desk.enterAccountMoneyA') + ':'" prop="intoPrice">
          <el-input type='number' style="width:320px;" v-model="enterForm.intoPrice" @keyup.native="intoPriceChange"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_remittanceTime') + ':'" prop="remittanceTime">
          <el-date-picker style="width:320px;" v-model="enterForm.remittanceTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_remittanceBank') + ':'" prop="remittanceBank">
          <el-input style="width:320px;" v-model="enterForm.remittanceBank"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_remittanceAccount') + ':'" prop="remittanceAccount">
          <el-input type='number' style="width:320px;" v-model="enterForm.remittanceAccount"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_note') + ':'">
          <el-input style="width:320px;" v-model="enterForm.remark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: right" slot="footer" class="dialog-footer">
        <span>
          <el-button @click="settlementDialog_cancel">{{ $t("commons.cancel") }}</el-button>
          <el-button type="primary" @click="settlementDialog_save('enterForm')">{{$t('desk.enterAccount')}}</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["souracePage"],
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),
    enterRules() {
      return {
        intoPrice: [
          {
            required: true,
            message: this.$t("desk.customer_bookPriceNotEmpty"),
            trigger: "blur",
          },
        ],
        remittanceTime: [
          {
            required: true,
            message: this.$t("commons.placeChoose"),
            trigger: "change",
          },
        ],
        remittanceBank: [
          {
            required: true,
            message: this.$t("commons.pleaseEnter"),
            trigger: "blur",
          },
        ],
        remittanceAccount: [
          {
            required: true,
            message: this.$t("commons.pleaseEnter"),
            trigger: "blur",
          },
        ],
      };
    },
  },
  data() {
    return {
      storeList: [],
      advanceRuleForm: {
        payType: "1",
        payPrice: "0",
        remark: "",
      },
      settlementDialog: false, //入账 dialog
      itemInfo: {},
      advanceDialog: false, //查看挂账明细 dialog
      bookDialog: false, //入账记录 dialog
      pageIndex: 1, //当前页
      pageSize: 10, //页数
      innerPageIndex: 1,
      innerPageSize: 10,
      loading: false,
      unitList: null,
      searchForm: {
        enterName: "",
        intoStatus: "",
      },
      listTotal: 0, //总条数
      innnerListTotal:0,
      detailListTotal: 0, //查看账务明细dialog总条数
      tableData: [], //表格数据
      buyTable: [], //挂账明细dialog表格数据
      recordList: [], // 入账记录dialog表格数据
      enterForm: {
        intoPrice: "",
        remittanceTime: "",
        remittanceBank: "",
        remittanceAccount: "",
        intoStatus: "",
        //入账form表单
      },
    };
  },
  created() {
    this.getUnitList();
    this.initForm();
    this.getStoreList();
    console.log(this.souracePage);
  },

  methods: {
    checkStores(storesNum) {
      let newArray = this.storeList.filter((item) => {
        return item.storesNum == storesNum;
      });
      if (newArray.length > 0) {
        return newArray[0].storesName;
      }
    },
    getStoreList() {
      this.$F.doRequest(
        this,
        "/pms/freeuser/stores_list",
        {
          filterHeader: false,
        },
        (data) => {
          this.storeList = data;
        }
      );
    },
    intoPriceChange() {
      if (
        this.enterForm.intoPrice >
        this.itemInfo.requestPrice - this.itemInfo.intoPrice
      ) {
        this.enterForm.intoPrice =
          this.itemInfo.requestPrice - this.itemInfo.intoPrice;
      }
    },
    //点击重置按钮
    initForm() {
      this.searchForm = {
        enterName: "",
        intoStatus: "",
        storesNum: "",
      };
      this.pageIndex = 1;
      this.pageSize = 10;
      this.getDataList();
    },
    //入账dialog 点击取消
    settlementDialog_cancel() {
      this.enterForm = {
        intoPrice: "",
        intoStatus: null,
      };
      this.settlementDialog = false;
    },
    //入账dialog 点击保存   入账operType值为4
    settlementDialog_save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.enterForm.intoPrice && this.enterForm.intoPrice > 0) {
            if (
              this.enterForm.intoPrice <=
              this.itemInfo.requestPrice - this.itemInfo.intoPrice
            ) {
              console.log(this.enterForm.intoPrice);
              console.log(this.itemInfo.intoPrice);
              let nowIntoPrice =
                this.enterForm.intoPrice * 1 + this.itemInfo.intoPrice * 1;
              console.log(nowIntoPrice);
              if (nowIntoPrice < this.itemInfo.putupPrice) {
                this.enterForm.intoStatus = 2;
              } else if ((nowIntoPrice = this.itemInfo.putupPrice)) {
                this.enterForm.intoStatus = 3;
              }
            } else {
              this.$message({
                message: this.$t("desk.customer_intoPrcieShould"),
                type: "warning",
              });
              this.enterForm.intoPrice =
                this.itemInfo.requestPrice - this.itemInfo.intoPrice;
              return false;
            }
          } else {
            this.$message({
              message: this.$t("desk.customer_bookPriceMorethan"),
              type: "warning",
            });
            return false;
          }
          let params = {
            operType: 4,
            enterId: this.itemInfo.enterId,
            startTime: this.itemInfo.startTime,
            endTime: this.itemInfo.endTime,
            requestNum: this.itemInfo.requestNum,
            putupPrice: this.itemInfo.putupPrice,
            requestAccountId: this.itemInfo.id,
            requestPrice: this.itemInfo.requestPrice,
            requestStatus: this.itemInfo.requestStatus,
          };
          this.$F.merge(params, this.enterForm);
          this.$F.doRequest(
            this,
            "/pms/request/request_account_edit",
            params,
            (res) => {
              this.$message({
                message: this.$t("desk.customer_bookSuccess"),
                type: "success",
              });
              this.enterForm = {
                intoPrice: "",
                intoStatus: null,
              };
              this.settlementDialog = false;
              this.getDataList();
            }
          );
        } else {
          return false;
        }
      });
    },
    /**获取表格数据 */
    getDataList(params = {}) {
      let storesNum = sessionStorage.storesNum;
      this.$F.merge(params, {
        paging: true,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        storesNum:storesNum
      });
      this.$F.merge(params, this.searchForm);
      this.$F.doRequest(
        this,
        "/pms/request/request_account_list",
        params,
        (data) => {
          console.log(data);
          this.tableData = data.list;
          this.listTotal = data.page.count;
        }
      );
    },
    //请求 单位 列表
    getUnitList() {
      this.$F.doRequest(this, "/pms/hotelenter/list", {}, (res) => {
        this.unitList = res.list;
        console.log(this.unitList);
      });
    },
    //点击 入账 按钮
    settlement(row) {
      this.itemInfo = row;
      console.log(this.itemInfo);
      if (this.itemInfo) {
        this.settlementDialog = true;
      }
    },
    //点击 入账记录 按钮
    bookRecord(row) {
      console.log(row);
      let params = {
        enterId: row.id,
        searchType: 2,
      };
      this.$F.doRequest(
        this,
        "/pms/request/request_account_log_list",
        params,
        (res) => {
          this.recordList = res.list;
          this.bookDialog = true;
        }
      );
    },

    //点击 挂账明细 按钮
    advancePayments(row) {
      this.innerPageSize = 10;
      this.innerPageIndex = 1;
      console.log(row);
      this.itemInfo = row;
      if (this.itemInfo) {
        let params = {
          enterId: row.enterId,
          startTime: row.startTime,
          endTime: row.endTime,
          pageIndex: this.innerPageIndex,
          pageSize: this.innerPageSize,
          paging: true,
        };
        this.$F.doRequest(
          this,
          "/pms/consume/enter_credit_order_list",
          params,
          (res) => {
            console.log(res);
            let {count} =res.page;
            this.innnerListTotal = count;
            this.buyTable = res.consumeOrderList;
            // this.detailListTotal = res.page.count;
            this.totalConsumerPrice = 0;
            res.consumeOrderList.forEach((item) => {
              if (item.priceType == 13) {
                this.totalConsumerPrice += item.payPrice || 0;
              }
            });

            this.advanceDialog = true;
          }
        );
      }
    },
    /**每页条数（即每一页要显示的数据条数） */
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    /**当前页改变（即当前页是第几页） */
    handlePageIndex(val) {
      this.innerPageSize = 10;
      this.innerPageIndex = val;
      this.advancePayments(this.itemInfo);
    },
    handleCurrentChange(val) {
      this.pageSize = 10;
      this.pageIndex = val;
      this.getDataList();
    },
  },
};
</script>
<style lang="less" scoped>
.dialog-footer {
  text-align: center;
}
.flexBox {
  font-weight: 600;
  margin-bottom: 20px;
  .weight {
    margin-bottom: 10px;
  }
}
</style>
