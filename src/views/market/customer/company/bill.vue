<!--  前台部 > 客户管理 > 单位管理 > 请款管理  -->
<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form class="term demo-form-inline" v-model="searchForm" inline size="small" label-width="80px">
        <el-form-item :label="$t('boss.store_storeNameA') + ':'" v-if="souracePage=='header'" label-width="90px">
          <el-select v-model="searchForm.storesNum" filterable :placeholder="$t('commons.placeChoose')" class="width150">
            <el-option :label='$t("desk.home_allA")' value=''></el-option>
            <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_unitName') + ':'">
          <el-select v-model="searchForm.enterName" filterable :placeholder="$t('commons.placeChoose')" class="width150">
            <el-option :label='$t("desk.home_all")' value=''></el-option>
            <el-option v-for="(item, index) in unitList" :key="index" :label="item.enterName" :value="item.enterName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_arage') + ':'">
          <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width: 140px" :placeholder="$t('desk.serve_chooseDate')"></el-date-picker>
          <span style="margin: 0 5px">-</span>
          <el-date-picker v-model="searchForm.endTime" value-format="yyyy-MM-dd" type="date" style="width: 140px" :placeholder="$t('desk.serve_chooseDate')"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">{{
            $t("commons.queryBtn")
          }}</el-button>
          <el-button type="primary" class="grey" @click="initForm">{{
            $t("commons.resetBtn")
          }}</el-button>
        </el-form-item>
        <el-form-item class="form-inline-flex">
          <el-button type="primary" @click="addAeditor('add')" class="submit">{{
            $t("desk.customer_newRequest")
          }}</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据 -->
      <el-table ref="multipleTable" v-loading="loading" :data="tableData" height="100%" header-row-class-name="default" size="small">
        <el-table-column prop="enterName" :label="$t('desk.customer_unitName')" show-overflow-tooltip></el-table-column>
        <el-table-column :label="$t('boss.store_storeNameA')" show-overflow-tooltip v-if="souracePage=='header'">
          <template slot-scope="{row}">
            <div v-if="row&&row.storesNum">{{checkStores(row.storesNum)}}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('desk.customer_arage')" show-overflow-tooltip width="120px">
          <template slot-scope="{ row }">
            <div><span style="color: #f11717">{{ $t("desk.serve_openA") }}</span>{{ row.startTime }}</div>
            <div><span style="color: #1a3bf1">{{ $t("desk.serve_tieA") }}</span>{{ row.endTime }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="requestPrice" :label="$t('desk.customer_placeMoney')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="requestNum" :label="$t('desk.customer_paragraphNum')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" :label="$t('desk.customer_creativeTime')" show-overflow-tooltip></el-table-column>
        <!--        <el-table-column prop="requestPrice" :label="$t('desk.customer_areadyPrice')" show-overflow-tooltip></el-table-column>-->
        <!--        <el-table-column :label="$t('desk.customer_waiteRequestPri')" width="100">-->
        <!--          <template slot-scope="{ row }">-->
        <!--            <div>{{ row.putupPrice - row.requestPrice }}</div>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-table-column :label="$t('desk.customer_pleaseState')" show-overflow-tooltip>
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
        <el-table-column prop="intoPrice" :label="$t('desk.customer_areadyBookPrice')" show-overflow-tooltip></el-table-column>
        <el-table-column :label="$t('commons.operating')" width="220">
          <template slot-scope="{ row }">
            <!--            <el-button type="text" v-if="row.requestStatus != 3" @click="addAeditor('editor', row)" size="mini">{{ $t("desk.customer_editorText") }}</el-button>-->
            <!--            <el-button v-if="row.requestStatus != 3" type="text" @click="settlement(row)" size="mini">{{ $t("desk.customer_continueRequest") }}</el-button>-->
            <el-button type="text" @click="advancePayments(row)" size="mini">{{ $t("desk.customer_lookBuyDetailA") }}</el-button>
            <el-button type="text" @click="bookRecord(row)" size="mini">{{ $t("desk.customer_requestRecord") }}</el-button>
            <el-button type="text" @click="dialogNew_remove(row)" size="mini">{{ $t("commons.delete") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" :total="listTotal" layout="total, prev, pager, next, jumper"></el-pagination>
      </div>
    </div>
    <!-- 新增请款单dialog -->
    <el-dialog :title="
        clickType == 'add'
          ? $t('desk.customer_newPlaceOrder')
          : $t('desk.customer_editorRequestOrder')
      " :visible.sync="dialogNew" width="700px" top="0" :close-on-click-modal="false" @close="dialogClose">
      <el-form :model="addPlaceFrom" :rules="addRules" ref="addPlaceFrom" size="small" label-width="110px">
        <el-form-item :label="$t('boss.add_chooseStoreA') + ':'" prop="storesNum" v-if="souracePage=='header'">
          <el-select v-model="addPlaceFrom.storesNum" :placeholder="$t('login.sTip')">
            <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_chooseUnitA') + ':'" prop="enterId">
          <el-select v-model="addPlaceFrom.enterId" filterable :placeholder="$t('commons.placeChoose')">
            <el-option v-for="(item, index) in unitList" :key="index" :label="item.enterName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_paragraphNum') + ':'" prop="prefix" v-if="clickType == 'add'">
          <el-input v-model="addPlaceFrom.prefix" style="width: 150px" :placeholder="$t('desk.customer_numBefore')" @blur="requestnumDetail"></el-input>
          <!-- addPlaceFrom.requestNum -->
          <span style="margin-left: 10px">{{ date_serial }}</span>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_arageDate') + ':'" required>
          <el-col :span="8">
            <el-form-item label-width="0">
              <el-date-picker type="date" :placeholder="$t('desk.serve_chooseDate')" v-model="addPlaceFrom.startTime" value-format="yyyy-MM-dd" style="width: 170px"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="1">-</el-col>
          <el-col :span="8">
            <el-form-item label-width="0">
              <el-date-picker type="date" :placeholder="$t('desk.serve_chooseDate')" v-model="addPlaceFrom.endTime" value-format="yyyy-MM-dd" style="width: 170px"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <div class="jiesuan">{{ $t("desk.customer_settlementAll") }}</div>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_amountPrice') + ':'">
          <el-input :value="calculate" style="width: 170px" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_placeMoney') + ':'">
          <el-input v-model="addPlaceFrom.requestPrice" disabled style="width: 170px"></el-input>
        </el-form-item>
      </el-form>

      <div style="text-align: center" slot="footer" class="dialog-footer">
        <span>
          <el-button @click="dialogNew_cancle">{{
            $t("commons.cancel")
          }}</el-button>
          <el-button type="primary" @click="dialogNew_sure('addPlaceFrom')">{{
            $t("commons.save")
          }}</el-button>
        </span>
      </div>
    </el-dialog>
     <!-- 查看请款明细dialog -->
    <el-dialog :title="$t('desk.customer_lookBuyDetailB')" v-if="advanceDialog" :visible.sync="advanceDialog" width="90%" top="0">
      <div class="flexBox">
        <div class="weight">{{itemInfo.enterName}}</div>
        <div class="weigth">
          <span>{{ $t("desk.customer_totalCreditAmount") + ":"
            }}{{ totalConsumerPrice }}</span>
          <span style="margin-left: 10px">{{ $t("desk.customer_cardRecordsA") + ":" }}{{ buyTable.length
            }}{{ $t("desk.customer_article") }}</span>
        </div>
        <!--        <el-button type="primary">导出EXCEL</el-button>-->
      </div>
      <el-table ref="multipleTable" v-loading="loading" :data="buyTable" height="100%" header-row-class-name="default" size="small">
        <el-table-column :label="$t('desk.home_nameB')" prop="checkIn.name" width="140">
          <template slot-scope="{ row }">
            {{ row.checkIn.name + `【${row.checkIn.pronunciation || ""}】` }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('desk.customer_payMenttiemA')" prop="createTime" show-overflow-tooltip width="160px"></el-table-column>
        <el-table-column prop="checkIn.orderNum" :label="$t('desk.customer_originOrderNum')" width="150">
        </el-table-column>
        <el-table-column prop="onAccountTotal" :label="$t('desk.customer_amountPriceA')">
        </el-table-column>
        <el-table-column :label="$t('desk.customer_roomKind')" show-overflow-tooltip width="110px">
          <template slot-scope="{ row }">
            <div>
              {{ row.checkIn.hotelCheckInRoom.roomTypeName || "" }}
              <span>/</span>
              {{ row.checkIn.hotelCheckInRoom.houseNum || "" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('desk.customer_accommodationFees')" width="100" prop="roomPrice"></el-table-column>
        <el-table-column :label="$t('desk.customer_foodPrice')" width="100">
          <template slot-scope="{row}">
            {{row.dishesPrice+row.shopPrice}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('desk.customer_checkAlive')" width="160">
          <template slot-scope="{row}">
            <div>{{row.checkIn.checkinTime}}</div>
            <div>{{row.checkIn.checkoutTime}}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('desk.customer_spendTime')" width="160" prop="checkIn.checkinTime"></el-table-column>
        <el-table-column :label="$t('desk.customer_xiaoJi')" prop="onAccountTotal"></el-table-column>
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
    <!-- 请款记录dialog -->
    <el-dialog :title="$t('desk.customer_requestRecord')" v-if="bookDialog" :visible.sync="bookDialog" top="0">
      <el-table ref="multipleTable" v-loading="loading"  :data="recordList"  height="100%" header-row-class-name="default" size="small">
        <el-table-column prop="creatorName" width="226px" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime"  width="226px"  :label="$t('desk.customer_operateTime')">
        </el-table-column>
        <el-table-column :label="$t('desk.customer_placeMoney')"  width="226px"  prop="operPrice">
        </el-table-column>
      </el-table>
      <div slot="footer">
        <div class="dialog-footer">
          <el-button type="primary" @click="bookDialog = false">{{
            $t("commons.close")
          }}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 继续请款 dialog -->
    <el-dialog :title="$t('desk.customer_continueRequest')" v-if="settlementDialog" :visible.sync="settlementDialog" width="600px" top="0">
      <div style="margin-left: 34px">
        <span>{{ $t("desk.customer_amountPrice") + ":"
          }}{{ itemInfo.putupPrice }}；</span>
        <span style="margin-left: 6px">
          {{ $t("desk.customer_areadyPrice") + ":" }}{{ itemInfo.requestPrice }}
        </span>
      </div>
      <el-form style="margin:30px 0 0 30px" inline size="small" :model="enterForm" ref="enterForm" :rules="continueRules">
        <el-form-item :label="$t('desk.customer_placeMoney')" prop="requestPrice">
          <el-input type="number" v-model.number="enterForm.requestPrice"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: right" slot="footer" class="dialog-footer">
        <span>
          <el-button @click="settlementDialog_cancel">{{
            $t("commons.cancel")
          }}</el-button>
          <el-button type="primary" @click="settlementDialog_save('enterForm')">{{ $t("commons.save") }}</el-button>
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
    continueRules() {
      return {
        requestPrice: [
          {
            required: true,
            message: this.$t("commons.mustInput"),
            trigger: "blur",
          },
        ],
      };
    },
    addRules() {
      return {
        totalConsumerPrice: 0,
        enterId: [
          {
            required: true,
            message: this.$t("desk.customer_selectUnit"),
            trigger: "change",
          },
        ],
        prefix: [
          {
            required: true,
            message: this.$t("desk.customer_inputNumBefore"),
            trigger: "blur",
          },
        ],
        storesNum: [
          {
            required: true,
            message: this.$t("commons.placeChoose"),
            trigger: "change",
          },
        ],
      };
    },
    calculate() {
      if (
        this.addPlaceFrom.enterId &&
        this.addPlaceFrom.startTime &&
        this.addPlaceFrom.endTime
      ) {
        let params = {
          enterId: this.addPlaceFrom.enterId,
          startTime: this.addPlaceFrom.startTime,
          endTime: this.addPlaceFrom.endTime,
        };
        this.$F.doRequest(
          this,
          "/pms/request/enter_time_putup_price",
          params,
          (res) => {
            this.addPlaceFrom.putupPrice = res.putupPrice;
            this.addPlaceFrom.requestPrice = res.putupPrice;
          }
        );
      }
      if (this.addPlaceFrom.putupPrice) {
        return this.addPlaceFrom.putupPrice;
      } else {
        return 0;
      }
    },
  },

  data() {
    return {
      storeList: [],
      unitList: [],
      loading: false,
      pageIndex: 1, //当前页
      pageSize: 10, //页数
      innerPageIndex: 1,
      innerPageSize: 10,
      date_serial: null,
      addPlaceFrom: {
        enterId: "",
        prefix: "", //编号前缀
        startTime: "",
        endTime: "",
        putupPrice: "",
        requestPrice: "",
        ////////
        operType: 1, //操作类型  1新增请款  2编辑请款 3继续请款 4请款结账
        requestNum: "", //请款编号
        requestStatus: null, //请款状态 1未请款 2部分请款 3已请款 如果requestPrice为0则未请款， 如果requestPrice<putupPrice为部分请款，如果putupPrice=requestPrice为已请款
        intoPrice: "", //已入账金额  为空默认0占位  在对已请款结账的时候需要填入账值
        intoStatus: null, //入账状态 1未结 2部分结账  3已结
      },
      searchForm: {
        storesNum: "",
        enterName: "",
        startTime: "",
        endTime: "",
        requestStatus: "",
      },
      enterForm: {
        requestPrice: "",
        requestStatus: null,
        //继续请款form表单
      },
      listTotal: 0, //总条数
        innnerListTotal:0,
      tableData: [], //表格数据
      buyTable: [], //挂账明细dialog表格数据
      //////////////////**** ++++++++++++++++++*/
      advanceDialog: false,
      dialogNew: false, // 新增账套  dialog
      settlementDialog: false,
      itemInfo: {},
      detailListTotal: 0,
      bookDialog: false,
      recordList: [],
      clickType: "",
      newIntoStatus: null,
    };
  },

  mounted() {
    this.initForm();
    this.getUnitList();
    console.log(this.souracePage);
    this.getStoreList();
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
    //新增\编辑请款
    addAeditor(type, row) {
      this.clickType = type;
      console.log(row);
      if (type == "editor") {
        this.addPlaceFrom = this.$F.deepClone(row);
      }
      this.dialogNew = true;
    },
    dialogClose() {
      this.dialogNew_cancle();
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
    requestnumDetail() {
      if (this.addPlaceFrom.prefix) {
        let params = {
          prefix: this.addPlaceFrom.prefix,
        };
        this.$F.doRequest(
          this,
          "/pms/request/request_account_serial",
          params,
          (res) => {
            this.addPlaceFrom.requestNum = res.prefix_date_serial;
            this.date_serial = res.date_serial;
          }
        );
      }
    },

    //点击删除按钮
    dialogNew_remove(row) {
      this.$confirm(
        this.$t("commons.delete_single"),
        this.$t("commons.tip_desc"),
        {
          confirmButtonText: this.$t("commons.confirm"),
          cancelButtonText: this.$t("commons.cancel"),
          type: "warning",
        }
      )
        .then(() => {
          let params = {
            requestAccountId: row.id,
          };
          this.$F.doRequest(
            this,
            "/pms/request/request_account_delete",
            params,
            (res) => {
              this.$message({
                message: this.$t("commons.delete_success"),
                type: "success",
              });
              this.getDataList();
            }
          );
        })
        .catch(() => {});
    },

    //继续请款dialog 点击保存   继续请款operType值为3
    settlementDialog_save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.enterForm.requestPrice && this.enterForm.requestPrice > 0) {
            if (
              this.itemInfo.putupPrice - this.itemInfo.requestPrice >
              this.enterForm.requestPrice
            ) {
              this.enterForm.requestStatus = 2;
            } else if (
              this.itemInfo.putupPrice - this.itemInfo.requestPrice ==
              this.enterForm.requestPrice
            ) {
              this.enterForm.requestStatus = 3;
            } else {
              this.$message({
                message: this.$t("desk.customer_requestPriceShould"),
                type: "warning",
              });
              this.enterForm.requestPrice =
                this.itemInfo.putupPrice - this.itemInfo.requestPrice;
              return false;
            }
          } else {
            this.$message({
              message: this.$t("desk.customer_conReShould"),
              type: "warning",
            });
            return false;
          }
          if (this.itemInfo.intoPrice > 0) {
            if (this.itemInfo.intoPrice < this.itemInfo.putupPrice) {
              this.newIntoStatus = 2;
            } else if (this.itemInfo.intoPrice == this.itemInfo.putupPrice) {
              this.newIntoStatus = 3;
            }
          } else {
            this.newIntoStatus = 1;
          }

          let params = {
            operType: 3,
            enterId: this.itemInfo.enterId,
            startTime: this.itemInfo.startTime,
            endTime: this.itemInfo.endTime,
            requestNum: this.itemInfo.requestNum,
            putupPrice: this.itemInfo.putupPrice,
            intoPrice: this.itemInfo.intoPrice,
            intoStatus: this.newIntoStatus,
            requestAccountId: this.itemInfo.id,
          };
          // this.enterForm.requestPrice = this.enterForm.requestPrice + this.itemInfo.requestPrice;
          this.$F.merge(params, this.enterForm);
          this.$F.doRequest(
            this,
            "/pms/request/request_account_edit",
            params,
            (res) => {
              this.$message({
                message: this.$t("desk.customer_continueRequestSuccess"),
                type: "success",
              });
              this.enterForm = {
                requestPrice: "",
                requestStatus: null,
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
    //继续请款dialog 点击取消
    settlementDialog_cancel() {
      this.enterForm = {
        requestPrice: "",
        requestStatus: null,
      };
      this.settlementDialog = false;
    },
    //新增请款单  点击保存
    dialogNew_sure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addPlaceFrom.putupPrice > 0) {
            if (
              this.addPlaceFrom.requestPrice &&
              this.addPlaceFrom.requestPrice > 0
            ) {
              if (
                this.addPlaceFrom.putupPrice > this.addPlaceFrom.requestPrice
              ) {
                this.addPlaceFrom.requestStatus = 2;
              } else if (
                this.addPlaceFrom.putupPrice == this.addPlaceFrom.requestPrice
              ) {
                this.addPlaceFrom.requestStatus = 3;
              } else {
                this.$message({
                  message: this.$t("desk.customer_requestPriceNotMorethan"),
                  type: "warning",
                });
                return false;
              }
            } else {
              this.addPlaceFrom.requestStatus = 1;
              this.addPlaceFrom.requestPrice = 0;
            }
            this.addPlaceFrom.intoStatus = 1;
            this.addPlaceFrom.intoPrice = 0;
            this.addPlaceFrom.operType = this.clickType == "add" ? 1 : 2;
            this.addPlaceFrom.requestAccountId = this.addPlaceFrom.id;
            this.$F.doRequest(
              this,
              "/pms/request/request_account_edit",
              this.addPlaceFrom,
              (res) => {
                this.addPlaceFrom = {
                  enterId: "",
                  prefix: "",
                  startTime: "",
                  endTime: "",
                  putupPrice: "",
                  requestPrice: "",
                  ////////
                  operType: 1,
                  requestNum: "",
                  requestStatus: null,
                  intoPrice: "",
                  intoStatus: null,
                };
                this.dialogNew = false;
                this.getDataList();
              }
            );
          } else {
            this.$message({
              message: this.$t("desk.customer_putPriceNot"),
              type: "warning",
            });
          }
        } else {
          return false;
        }
      });
    },

    //新增请款单  点击取消
    dialogNew_cancle() {
      this.addPlaceFrom = {
        enterId: "",
        prefix: "",
        startTime: "",
        endTime: "",
        putupPrice: "",
        requestPrice: "",
        ////////
        operType: 1,
        requestNum: "",
        requestStatus: null,
        intoPrice: "",
        intoStatus: null,
      };
      this.date_serial = null;
      this.dialogNew = false;
    },
    //点击 继续请款 按钮
    settlement(row) {
      this.itemInfo = this.$F.deepClone(row);
      //
      this.settlementDialog = true;
    },

    //点击 请款记录 按钮
    bookRecord(row) {
      let params = {
        enterId: row.id,
        searchType: 1,
      };
      this.$F.doRequest(
        this,
        "/pms/request/request_account_log_list",
        params,
        (res) => {
          console.log(res);
          this.recordList = res.list;
          this.bookDialog = true;
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
    initForm() {
      this.searchForm = {
        storesNum: "",
        enterName: "",
        startTime: "",
        endTime: "",
        requestStatus: "",
      };
      this.pageIndex = 1;
      this.pageSize = 10;
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList(params = {}) {
      this.$F.merge(params, {
        paging: true,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        // storesNum: ''
      });
      if (this.souracePage == "footer") {
        this.$delete(this.searchForm, "storesNum");
        console.log(this.searchForm);
      }
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
    /**每页数 */
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    /**当前页 */
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
  text-align: right;
}
.flexBox {
  font-weight: 600;
  margin-bottom: 20px;
  .weight {
    margin-bottom: 10px;
  }
}
.jiesuan {
  color: rgba(153, 153, 153, 100);
  font-size: 12px;
}
</style>
