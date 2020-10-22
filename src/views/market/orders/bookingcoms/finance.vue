<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-10 10:35:52
 * @FilePath: \jiudian\src\views\market\orders\bookingcoms\finance.vue
 -->
<template>
  <div class="finance">
    <el-row class="clearfix">
      <div class="">
        <el-button type="primary" size="mini" @click="depositShow = true"
          >交订金</el-button
        >
        <el-button type="primary" size="mini" @click="refundShow = true"
          >退订金</el-button
        >
        <el-button type="primary" size="mini" @click="destructionHandle"
          >冲调</el-button
        >
<!--        <el-button type="primary" size="mini">{{-->
<!--          $t("commons.print")-->
<!--        }}</el-button>-->
      </div>
    </el-row>
    <el-row class="clearfix padding-tb-20">
      <el-col :span="4">
        <span
          >付款合计：<em class="text-green">{{ detailData.payPrice }}</em></span
        >
      </el-col>
      <el-col :span="4">
        <span
          >消费合计：<em class="text-red">{{
            detailData.consumePrice
          }}</em></span
        >
      </el-col>
      <el-col :span="4">
        <span>平衡数：100</span>
      </el-col>
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
      <el-table-column
        prop="createTime"
        label="消费时间"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="priceType" label="账务项目">
        <template slot-scope="{ row }">
          {{ F_priceType(row.priceType) }}
        </template>
      </el-table-column>
      <el-table-column prop="payPrice" label="付款"></el-table-column>
      <el-table-column
        prop="consumePrice"
        label="消费"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop=""
        label="业务说明"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="creatorName"
        :label="$t('desk.home_operator')"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop=""
        label="班次"
        show-overflow-tooltip
      ></el-table-column>
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
      title="冲调"
      :visible.sync="destructionShow"
      width="800px"
    >
      <el-form
        :model="consumeOperForm"
        ref="destruction"
        :rules="rules"
        size="mini"
        label-width="100px"
      >
        <p>正在冲调的账务</p>
        <el-table
          v-loading="loading"
          :data="destructionList"
          :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
          size="mini"
        >
          <el-table-column label="账务项目" show-overflow-tooltip>
            <template slot-scope="{ row }">
              {{ F_priceType(row.priceType) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="consumePrice"
            label="消费"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="enterType"
            label="业务说明"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="入账时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="roomName"
            :label="$t('desk.home_roomNum')"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="creatorName"
            :label="$t('desk.home_operator')"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <el-form-item label="冲调方式：" prop="priceType">
          <el-radio-group v-model="consumeOperForm.priceType">
            <el-radio :label="9" :value="9">完全冲调</el-radio>
            <el-radio :label="10" :value="10">部分冲调</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="冲调金额：" prop="consumePrice">
          <el-input
            class="width200"
            type="number"
            v-model="consumeOperForm.consumePrice"
            autocomplete="off"
          ></el-input
          ><em style="margin-left: 10px; color: #888"
            >注意：冲调金额小于原账金额</em
          >
        </el-form-item>
        <el-form-item label="冲调原因：" prop="remark">
          <el-input
            class="width200"
            type="textarea"
            v-model="consumeOperForm.remark"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="destructionShow = false">{{ $t('commons.cancel') }}</el-button>
        <el-button type="primary" @click="consume_oper(3, 'destruction')"
          >{{ $t('commons.confirm') }}</el-button
        >
      </div>
    </el-dialog>
    <!--交订金-->
    <el-dialog top="0" title="交订金" :visible.sync="depositShow">
      <el-form
        :model="consumeOperForm"
        ref="deposit"
        :rules="rules"
        size="mini"
        label-width="140px"
      >
        <el-row v-if="detailData">
          <el-col :span="8" v-if="detailData.checkIn"
            >预订单号：{{ detailData.checkIn.reserveOrderNum }}</el-col
          >
          <el-col :span="8" v-if="detailData.checkIn"
            >{{$t('desk.home_bookPeople')}}：{{ detailData.checkIn.name }}</el-col
          >
        </el-row>
        <br />
        <el-form-item label="付款项目：">
          <el-radio-group v-model="consumeOperForm.priceType">
            <el-radio-button :label="1" :value="1">{{ $t('desk.downPayment')}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="金额：">
          <el-input
            class=""
            v-model="consumeOperForm.payPrice"
            :autofocus="true"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注：">
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
        <el-button @click="depositShow = false">关闭</el-button>
        <el-button type="primary" @click="consume_oper(1, 'deposit')"
          >结算</el-button
        >
      </div>
    </el-dialog>
    <!--退订金-->
    <el-dialog top="0" title="退订金" :visible.sync="refundShow">
      <el-form
        :model="consumeOperForm"
        ref="refund"
        :rules="rules"
        size="mini"
        label-width="100px"
      >
        <el-row v-if="detailData">
          <el-col :span="8" v-if="detailData.checkIn"
            >预订单号：{{ detailData.checkIn.reserveOrderNum }}</el-col
          >
          <el-col :span="8" v-if="detailData.checkIn"
            >{{$t('desk.home_bookPeople')}}：{{ detailData.checkIn.name }}</el-col
          >
        </el-row>
        <br />
        <el-form-item label="付款项目：">
          <el-radio-group v-model="consumeOperForm.priceType">
            <el-radio-button :label="4" :value="4">退订金</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="金额：">
          <el-input
            class="width100"
            v-model="consumeOperForm.consumePrice"
            :autofocus="true"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注：">
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
        <el-button @click="refundShow = false">关闭</el-button>
        <el-button type="primary" @click="consume_oper(2, 'refund')"
          >结算</el-button
        >
      </div>
    </el-dialog>
    <el-dialog top="0" title="选择结算方式" :visible.sync="payTypeShow">
      <el-form :model="consumeOperForm" size="mini">
        <el-form-item label="">
          <el-radio-group v-model="consumeOperForm.payType">
            <el-radio :label="1" :value="1">现金</el-radio>
            <el-radio :label="2" :value="2">银行卡</el-radio>
            <el-radio :label="3" :value="3">支付宝</el-radio>
            <el-radio :label="4" :value="4">微信</el-radio>
            <el-radio :label="5" :value="5">会员卡</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="payTypeShow = false">关闭</el-button>
        <el-button type="primary" @click="payTypeShow = false">结算</el-button>
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
        payType: "",
        name: "",
      },
      rules: {
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
        this.$message.error("请优先排房，添加入住人");
        return;
      }

      //订金，退订金
      if (type == 1 || type == 2) {
        console.log("这是交定金：" + params.priceType);
        //这个type没什么意义，只是按照开发顺序或者按钮顺序来做个简单处理
        params.state = 2;
        if (!params.priceType) {
          this.$message.error("请选择付款项目");
          return;
        }
        if (params.priceType == 1 && !params.payType) {
          this.payTypeShow = true;
          return;
        }
        if (params.priceType == 1) {
          if (params.payPrice < 0 || params.payPrice == 0) {
            this.$message.error("请输入大于0的金额");
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
        if (params.consumePrice > 0 || params.consumePrice == 0) {
          this.$message.error("请输入为负数金额");
          return;
        }
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
              this.consume_order_list();
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
        this.$message.error("请选择需要操作的账务");
        return;
      }
      if (this.multipleSelection.length > 1) {
        this.$message.error("仅能选择一条账务冲调");
        return;
      }
      for (let k in this.multipleSelection) {
        if (this.multipleSelection[k].billingType == 1) {
          this.$message.error("自动计费项目不能冲调");
          return;
        }
      }
      this.destructionList = this.multipleSelection;
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
