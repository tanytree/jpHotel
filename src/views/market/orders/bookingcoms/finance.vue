<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-05 10:05:25
 * @FilePath: \jiudian\src\views\market\orders\bookingcoms\finance.vue
 -->
<template>
  <div class="finance">
    <el-row class="clearfix">
      <div class="">
        <el-button type="primary" size="mini" @click="depositShow = true">{{ $t('desk.order_payDeposit') }}
        </el-button><el-button type="primary" size="mini" @click="refundShow = true">{{ $t('desk.order_payBack') }}</el-button>
          <el-button type="primary" size="mini" @click="destructionHandle">{{ $t('desk.customer_rich') }}</el-button>
<!--        <el-button type="primary" size="mini">{{-->
<!--          $t("commons.print")-->
<!--        }}</el-button>-->
      </div>
    </el-row>
    <el-row class="clearfix padding-tb-20">
      <el-col :span="4"><span>{{ $t('desk.payTotal') }}：<em class="text-green">{{ detailData.payPrice }}</em></span></el-col>
        <el-col :span="4"><span>{{ $t('desk.consumerTotal') }}：<em class="text-red">{{ detailData.consumePrice }}</em></span></el-col>
        <el-col :span="4"><span>{{ $t('desk.balanceTotal') }}：{{ detailData.payPrice - detailData.consumePrice }}</span></el-col>
    </el-row>
    <!--表格数据 -->
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
      @selection-change="handleSelectionChange"
      size="mini"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="createTime" :label="$t('desk.customer_spendTime')" show-overflow-tooltip></el-table-column>
      <el-table-column prop="priceType" :label="$t('desk.order_accountingProgram')"><template slot-scope="{ row }">
          {{ F_priceType(row.priceType) }}</template>
      </el-table-column>
      <el-table-column prop="payPrice" :label="$t('desk.order_payment')"></el-table-column>
      <el-table-column prop="consumePrice" :label="$t('desk.order_expense')" show-overflow-tooltip></el-table-column>
<!--      <el-table-column-->
<!--        prop=""-->
<!--        :label="$t('desk.order_businessThat')"-->
<!--        show-overflow-tooltip-->
<!--      ></el-table-column>-->
      <el-table-column prop="remark" :label="$t('desk.home_note')" show-overflow-tooltip></el-table-column>
      <el-table-column prop="creatorName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
<!--      <el-table-column prop="" label="班次" show-overflow-tooltip></el-table-column>-->
    </el-table>
    <div style="margin-top: 10px"></div>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchForm.pageIndex"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="searchForm.pageSize"
      layout=" sizes, prev, pager, next, jumper"
      :total="listTotal"
    ></el-pagination>

    <!--冲调-->
    <el-dialog
      top="0"
      :title="$t('desk.customer_rich')"
      :visible.sync="destructionShow"
      width="800px"
    >
      <el-form :model="consumeOperForm" ref="destruction" :rules="rules" size="mini" label-width="100px">
<!--        <p>正在冲调的账务</p>-->
        <el-table v-loading="loading" :data="destructionList" :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }" size="mini">
          <el-table-column :label="$t('desk.order_accountingProgram')" show-overflow-tooltip>
              <template slot-scope="{ row }">{{ F_priceType(row.priceType) }}</template>
          </el-table-column>
          <el-table-column prop="consumePrice" :label="$t('desk.order_expense')" show-overflow-tooltip>
              <template slot-scope="{row}">
                  {{row.consumePrice || 0}}
              </template>
          </el-table-column>
<!--          <el-table-column prop="remark" :label="$t('desk.order_businessThat')" show-overflow-tooltip></el-table-column>-->
          <el-table-column prop="createTime" :label="$t('desk.enterAccountTime')" show-overflow-tooltip></el-table-column>
          <el-table-column prop="roomName" :label="$t('desk.home_roomNum')" show-overflow-tooltip></el-table-column>
          <el-table-column prop="creatorName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
        </el-table>
          <!--冲调方式 -->
        <el-form-item :label="$t('desk.order_mixingWay')+':'" prop="priceType">
            <el-radio-group v-model="consumeOperForm.priceType">
                <el-radio :label="9" :value="9">{{$t('desk.order_completelyAgainst')}}</el-radio>
                <el-radio :label="10" :value="10">{{$t('desk.order_partCompletely')}}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('desk.order_completelyPrice')+':'" prop="consumePrice" v-if="consumeOperForm.priceType != 9">
            <el-input class="width200" type="number" v-model="consumeOperForm.consumePrice" autocomplete="off"> </el-input>
            <em style="margin-left: 10px; color: #888">{{$t('desk.order_attention')}}</em>
        </el-form-item>
        <el-form-item :label="$t('desk.order_completelyReason')+':'" prop="remark">
          <el-input class="width200" type="textarea" v-model="consumeOperForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="destructionShow = false">{{ $t('commons.cancel') }}</el-button>
        <el-button type="primary" @click="consume_oper(3, 'destruction')">
            {{ $t('commons.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <!--交订金-->
    <el-dialog top="0" :title="$t('desk.order_payDeposit')" :visible.sync="depositShow">
      <el-form
        :model="consumeOperForm"
        ref="deposit"
        :rules="rules"
        size="mini"
        label-width="140px"
      >
        <el-row v-if="detailData">
          <el-col :span="8" v-if="detailData.checkIn"
            >{{ $t('desk.order_bookOrderNum') }}：{{ detailData.checkIn.reserveOrderNum }}</el-col
          >
          <el-col :span="8" v-if="detailData.checkIn"
            >{{$t('desk.home_bookPeople')}}：{{ detailData.checkIn.name }}</el-col
          >
        </el-row>
        <br />
        <el-form-item :label="$t('desk.order_payProject')+':'">
          <el-radio-group v-model="consumeOperForm.priceType">
            <el-radio-button :label="1" :value="1">{{ $t('desk.downPayment')}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
          <el-form-item :label="$t('desk.order_selectPayWay') + ':'">
              <el-radio-group v-model="consumeOperForm.payType">
                  <el-radio  v-for="(value, key) in $t('commons.payType')" :label="key" :key="key">{{value}}</el-radio>
              </el-radio-group>
          </el-form-item>
        <el-form-item :label="$t('desk.customer_sum')+':'">
          <el-input
            class=""
            v-model="consumeOperForm.payPrice"
            :autofocus="true"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_note') + ':'">
          <el-input
            class=""
            type="textarea"
            v-model="consumeOperForm.remark"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!--            <el-form-item label="打印单据：">-->
        <!--                <el-checkbox v-model="consumeOperForm.name"></el-checkbox>-->
        <!--            </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="depositShow = false">{{$t('commons.close')}}</el-button>
        <el-button type="primary" @click="consume_oper(1, 'deposit')">{{$t('desk.customer_settlement')}}</el-button>
      </div>
    </el-dialog>
    <!--退订金-->
    <el-dialog top="0" :title="$t('desk.order_payBack')" :visible.sync="refundShow">
      <el-form
        :model="consumeOperForm"
        ref="refund"
        :rules="rules"
        size="mini"
        label-width="100px"
      >
        <el-row v-if="detailData">
          <el-col :span="8" v-if="detailData.checkIn"
            >{{ $t('desk.order_bookOrderNum') }}：{{ detailData.checkIn.reserveOrderNum }}</el-col
          >
          <el-col :span="8" v-if="detailData.checkIn"
            >{{$t('desk.home_bookPeople')}}：{{ detailData.checkIn.name }}</el-col
          >
        </el-row>
        <br />
        <el-form-item :label="$t('desk.order_payProject')+':'">
          <el-radio-group v-model="consumeOperForm.priceType">
            <el-radio-button :label="4" :value="4">{{ $t('desk.order_payBack') }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_sum')+':'">
          <el-input
            class="width100"
            v-model="consumeOperForm.consumePrice"
            :autofocus="true"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_note') + ':'">
          <el-input
            class="width200"
            type="textarea"
            v-model="consumeOperForm.remark"
            autocomplete="off"
          ></el-input>
        </el-form-item>
<!--        <el-form-item label="打印单据：">-->
<!--          <el-checkbox v-model="consumeOperForm.name"></el-checkbox>-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundShow = false">{{$t('commons.close')}}</el-button>
        <el-button type="primary" @click="consume_oper(2, 'refund')"
          >{{$t('desk.customer_settlement')}}</el-button
        >
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import myMixin from "@/utils/filterMixin";
export default {
  mixins: [myMixin],
  props: ["detailData"],
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),
    rules(){
        return {
        consumePrice: [
          {
            required: true,
            // message: "请输入金额",
              message: this.$t('commons.mustInput'),
            trigger: "blur",
          },
        ],
        creditName: [
          {
              required: true,
              message: this.$t('commons.placeChoose'),
            trigger: "blur",
          },
        ],
        companyName: [
          {
            required: true,
            // message: "请输入付款公司名称",
              message: this.$t('commons.mustInput'),
            trigger: "blur",
          },
        ],
        projectName: [
          {
            required: true,
            // message: "请输入项目名称",
              message: this.$t('commons.mustInput'),
            trigger: "blur",
          },
        ],
        invoiceTime: [
          {
              required: true,
              message: this.$t('commons.placeChoose'),
            trigger: "blur",
          },
        ],
        prices: [
          {
            required: true,
            // message: "请输入金额",
              message: this.$t('commons.mustInput'),
            trigger: "blur",
          },
        ],
        payType: [
          {
              required: true,
              message: this.$t('commons.placeChoose'),
            trigger: "change",
          },
        ],
        priceType: [
          {
              required: true,
              message: this.$t('commons.placeChoose'),
            trigger: "change",
          },
        ],
        remark: [
          {
            required: true,
            // message: "请输入备注",
              message: this.$t('commons.mustInput'),
            trigger: "blur",
          },
        ],
        }
    }
  },
  data() {
    return {
      loading: false,
      destructionShow: false,
      depositShow: false,
      payTypeShow: false,
      refundShow: false,
      checkType: "customer",
      activeName: "first",
      detail: {
        text: "",
      },
      searchForm: {
        state: "",
        checkInId: "",
        pageIndex: 1,
        pageSize: 10,
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [{}], //表格数据
      destructionList: [],
      consumeOperForm: {
        priceType: "1",
        payType: "1",
        name: "",
      },

    };
  },

  mounted() {
    let id = this.$route.query.id;
    this.consume_order_list();
  },

  methods: {
    consume_order_list() {
      this.searchForm.reserveId = this.$route.query.id;
      this.$F.doRequest(
        this,
        "/pms/consume/consume_order_list",
        this.searchForm,
        (res) => {

          this.tableData = res.consumeOrderList;
          this.listTotal = (res.page || {}).count || 0;
          this.$forceUpdate();
        }
      );
    },
    consume_oper(type, formName) {
      /**
       * 1.交订金
       * 2.退订金
       *
       * **/
      let params = this.consumeOperForm;

      params.checkinReserveId = this.$route.query.id;

      if (this.detailData.inRoomList.length) {
        params.roomId = this.detailData.inRoomList[0].id;
        params.roomNum = this.detailData.inRoomList[0].houseNum;
      } else {
        this.$message.error(this.$t('desk.order_rowHouses'));
        return;
      }

      //订金，退订金
      if (type == 1 || type == 2) {
        //这个type没什么意义，只是按照开发顺序或者按钮顺序来做个简单处理
        params.state = 2;
        if (!params.priceType) {
          this.$message.error(this.$t('desk.order_selectPayProject'));
          return;
        }
        if (params.priceType == 1 && !params.payType) {
          this.payTypeShow = true;
          return;
        }
        if (params.priceType == 1) {
          if (params.payPrice < 0 || params.payPrice == 0) {
            this.$message.error(this.$t('desk.order_inputThan'));
            return;
          }
        }

        if (params.priceType == 4) {
          // params.priceType == 1
          // if (params.consumePrice > 0 || params.consumePrice == 0) {
          //   this.$message.error("请输入为负数金额");
          //   return;
          // }
        }
      }
      //冲调
      if (type == 3) {
        //这个type没什么意义，只是按照开发顺序或者按钮顺序来做个简单处理
        params.state = 2;
        params.payType == 0;
          params.consumePrice = -params.consumePrice;
        // if (params.consumePrice > 0 || params.consumePrice == 0) {
        //   this.$message.error("请输入为负数金额");
        //   return;
        // }
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$F.doRequest(
            this,
            "/pms/consume/consume_oper",
            params,
            (res) => {
              this.depositShow = false;
              this.refundShow = false;
              this.destructionShow = false;
              this.consume_order_list();
              this.consumeOperForm = {
                  priceType: "1",
                  payType: "1",
                  name: "",
              };
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    destructionHandle() {
      if (this.multipleSelection.length < 1) {
        this.$message.error(this.$t('desk.order_selectOperateAccount'));
        return;
      }
      if (this.multipleSelection.length > 1) {
        this.$message.error(this.$t('desk.order_onlyOneAccount'));
        return;
      }
      for (let k in this.multipleSelection) {
        if (this.multipleSelection[k].billingType == 1) {
          this.$message.error(this.$t('desk.order_autoTiePrice'));
          return;
        }
        if (this.multipleSelection[k].consumePrice < 0) {
          this.$message.error(this.$t('desk.order_priceShould'));
          return;
        }
      }
      this.destructionList = this.multipleSelection;
      this.consumeOperForm.priceType = 9;
        this.destructionShow = true;
        this.$forceUpdate();
    },
    /**多选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**每页数 */
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.searchForm.pageIndex = 1;
      this.consume_order_list();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.searchForm.pageIndex = val;
      this.consume_order_list();
    },
  },
};
</script>

<style scoped>
.detailTab {
  border: 0;
}

.detailTab >>> .el-tabs__header {
  margin: 0;
}
</style>
<style lang="less" scoped>
.base p {
  font-size: 12px;
}
</style>
