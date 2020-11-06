<!--  前台部 > 客户管理 > 单位管理 > 账务处理   -->
<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form
        class="term demo-form-inline"
        inline
        size="small"
        v-model="searchForm"
        label-width="80px"
      >
        <el-form-item :label="$t('desk.customer_buyerUnit')">
          <el-select v-model="searchForm.enterId" class="width150">
            <el-option :label="$t('commons.all')" value=""></el-option>
            <el-option
              v-for="(item, index) in unitList"
              :key="index"
              :label="item.enterName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">{{
            $t("commons.queryBtn")
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
          prop="enterName"
          :label="$t('desk.customer_unitName')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="creditLimit"
          :label="$t('desk.customer_paymentAmount')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :label="$t('desk.customer_noSettlement')"
          align="center"
        >
          <el-table-column
            :label="$t('desk.customer_totalPayment')"
            width="120"
          >
            <template slot-scope="{ row }">
              <div>{{ row.finance.onAccountTotal ? row.finance.onAccountTotal : 0 }}</div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('desk.customer_outstandingTotalAmount')"
            width="120"
          >
            <template slot-scope="{ row }">
              <div>
                {{
                  row.finance.noSettlementTotal ? row.finance.onAccountTotal : 0
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('desk.customer_totalCreditBalance')"
            width="120"
          >
            <template slot-scope="{ row }">
              <div>{{ row.creditLimit - row.finance.noSettlementTotal }}</div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('desk.customer_advancePayment')"
            width="120"
          >
            <template slot-scope="{ row }">
              <div>{{ row.totalLimit ? row.totalLimit : 0 }}</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('desk.customer_hasSettled')" align="center">
          <el-table-column :label="$t('desk.customer_hasSettled')" width="80">
            <template slot-scope="{ row }">
              <div>{{ hasSettled(row) }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('desk.serve_cash')" width="80">
            <template slot-scope="{ row }">
              <div v-for="(item, index) in row.finance.typeList" :key="index">
                <div v-if="item.payType == 1">{{ item.payPrice }}</div>
                <div v-else>0</div>
              </div>
              <div v-if="row.finance.typeList.length == 0">0</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('desk.customer_bankCard')" width="80">
            <template slot-scope="{ row }">
              <div v-for="(item, index) in row.finance.typeList" :key="index">
                <div v-if="item.payType == 2">{{ item.payPrice }}</div>
                <div v-else>0</div>
              </div>
              <div v-if="row.finance.typeList.length == 0">0</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('desk.customer_advance')" width="80"
            >0</el-table-column
          >
          <el-table-column :label="$t('desk.serve_wechat')" width="80">
            <template slot-scope="{ row }">
              <div v-for="(item, index) in row.finance.typeList" :key="index">
                <div v-if="item.payType == 4">{{ item.payPrice }}</div>
                <div v-else>0</div>
              </div>
              <div v-if="row.finance.typeList.length == 0">0</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('desk.serve_alipay')" width="80">
            <template slot-scope="{ row }">
              <div v-for="(item, index) in row.finance.typeList" :key="index">
                <div v-if="item.payType == 3">{{ item.payPrice }}</div>
                <div v-else>0</div>
              </div>
              <div v-if="row.finance.typeList.length == 0">0</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('desk.customer_freeOfCharge')" width="80">
            <template slot-scope="{ row }">
              <div v-for="(item, index) in row.finance.typeList" :key="index">
                <div v-if="item.payType == 6">{{ item.payPrice }}</div>
                <div v-else>0</div>
              </div>
              <div v-if="row.finance.typeList.length == 0">0</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" width="220">
          <template slot-scope="{ row }">
            <el-button type="text" @click="advancePayments(row)" size="mini">{{
              $t("desk.customer_advance")
            }}</el-button>
            <el-button type="text" @click="settlement(row)" size="mini">{{
              $t("desk.customer_billSettlement")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="searchForm.page"
          :page-size="searchForm.page_num"
          :total="listTotal"
          layout="total, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <!-- 预收款弹窗 -->
    <el-dialog
      :title="$t('desk.customer_advance')"
      v-if="advanceDialog"
      :visible.sync="advanceDialog"
      width="600px"
      top="0"
    >
      <el-form
        :model="advanceRuleForm"
        :rules="rules"
        ref="advanceRuleForm"
        label-width="100px"
        class="demo-ruleForm"
        inline
      >
        <el-form-item :label="$t('desk.customer_unitName') + ':'">{{
          itemInfo.enterName
        }}</el-form-item>
        <el-form-item :label="$t('desk.customer_advancePayment') + ':'">{{
          itemInfo.totalLimit
        }}</el-form-item>

        <el-form-item :label="$t('desk.customer_payType') + ':'">
          <el-radio-group v-model="advanceRuleForm.payType">
            <el-radio label="1">{{ $t("desk.serve_cash") }}</el-radio>
            <el-radio label="2">{{ $t("desk.customer_bankCard") }}</el-radio>
            <el-radio label="5">{{ $t("desk.customer_check") }}</el-radio>
            <el-radio label="4">{{ $t("desk.serve_wechat") }}</el-radio>
            <el-radio label="3">{{ $t("desk.serve_alipay") }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_sum') + ':'" prop="payPrice">
          <el-input
            size="small"
            style="width: 360px"
            v-model="advanceRuleForm.payPrice"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_note') + ':'">
          <el-input
            type="textarea"
            style="width: 360px"
            v-model="advanceRuleForm.remark"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <div class="dialog-footer">
          <el-button @click="advanceDialog = false">{{
            $t("commons.cancel")
          }}</el-button>
          <el-button
            type="primary"
            @click="advanceDialog_sure('advanceRuleForm')"
            >{{ $t("commons.confirm") }}</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- 账务结算dialog -->
    <el-dialog
      :title="$t('desk.customer_billSettlement')"
      v-if="settlementDialog"
      :visible.sync="settlementDialog"
      width="900px"
      top="0"
    >
      <div>
        <span>{{ $t("desk.customer_unitName") + ":" }}{{itemInfo.enterName}}</span>
        <span style="margin-left: 20px">
          {{ $t("desk.customer_chooseAccount") + ":" }}
          <el-radio-group v-model="choose">
            <el-radio label="1">{{
              $t("desk.customer_chooseAccount")
            }}</el-radio>
            <el-radio label="2">{{
              $t("desk.customer_selectAccountSet")
            }}</el-radio>
          </el-radio-group>
        </span>
        <el-input
          v-if="choose == 2"
          v-model="input"
          :disabled="true"
          size="mini"
          style="width: 120px; margin-left: 30px"
        ></el-input>
        <el-button
          v-if="choose == 2"
          @click="dialogChooseBook = true"
          plain
          size="small"
          style="margin-left: 5px"
          >{{ $t("desk.customer_selectAccountSet") }}</el-button
        >
      </div>
      <div>
        <!-- 内层dailog -->
        <!-- 内层  收款dialog -->
        <el-dialog
          :title="$t('desk.customer_getMoney')"
          v-if="dialogVisible"
          :visible.sync="dialogVisible"
          append-to-body
          width="500px"
          top="0"
        >
          <el-form
            :model="inneraAccountForm"
            ref="inneraAccountForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item :label="$t('desk.customer_paymentMethod') + ':'">
              <el-radio-group v-model="inneraAccountForm.payType">
                <el-radio label="1">{{ $t("desk.serve_cash") }}</el-radio>
                <el-radio label="2">{{
                  $t("desk.customer_bankCard")
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('desk.customer_sum') + ':'">
              <el-input
                v-model="inneraAccountForm.payPrice"
                style="width: 280px"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('desk.home_note') + ':'" prop="remark">
              <el-input
                type="textarea"
                v-model="inneraAccountForm.remark"
                style="width: 280px"
              ></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align: right" slot="footer" class="dialog-footer">
            <span>
              <el-button @click="dialogVisible = false">{{
                $t("commons.cancel")
              }}</el-button>
              <el-button type="primary" @click="sureRefund('dialogVisible')">{{
                $t("commons.confirm")
              }}</el-button>
            </span>
          </div>
        </el-dialog>
        <!-- 内层  免单dialog -->
        <el-dialog
          :title="$t('desk.customer_getMoney')"
          v-if="dialogFree"
          :visible.sync="dialogFree"
          append-to-body
          width="500px"
          top="0"
        >
          <el-form
            :model="inneraAccountForm"
            ref="inneraAccountForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item :label="$t('desk.customer_paymentMethod') + ':'">
              <el-radio-group v-model="inneraAccountForm.payType">
                <el-radio label="1">{{
                  $t("desk.customer_freeOfCharge")
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('desk.customer_sum') + ':'">
              <el-input
                v-model="inneraAccountForm.payPrice"
                style="width: 280px"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('desk.home_note') + ':'" prop="remark">
              <el-input
                type="textarea"
                v-model="inneraAccountForm.remark"
                style="width: 280px"
              ></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align: right" slot="footer" class="dialog-footer">
            <span>
              <el-button @click="dialogFree = false">{{
                $t("commons.cancel")
              }}</el-button>
              <el-button type="primary" @click="sureRefund('dialogFree')">{{
                $t("commons.confirm")
              }}</el-button>
            </span>
          </div>
        </el-dialog>
        <!-- 内层  预收款dialog -->
        <el-dialog
          :title="$t('desk.customer_getMoney')"
          v-if="dialogAheadTime"
          :visible.sync="dialogAheadTime"
          append-to-body
          width="500px"
          top="0"
        >
          <el-form
            :model="inneraAccountForm"
            ref="inneraAccountForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item :label="$t('desk.customer_paymentMethod') + ':'">
              <el-radio-group v-model="inneraAccountForm.payType">
                <el-radio label="1">{{ $t("desk.customer_advance") }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('desk.customer_advancePayment') + ':'">
              <span>300</span>
            </el-form-item>
            <el-form-item :label="$t('desk.customer_sum') + ':'">
              <el-input
                v-model="inneraAccountForm.payPrice"
                style="width: 280px"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('desk.home_note') + ':'" prop="remark">
              <el-input
                type="textarea"
                v-model="inneraAccountForm.remark"
                style="width: 280px"
              ></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align: right" slot="footer" class="dialog-footer">
            <span>
              <el-button @click="dialogAheadTime = false">{{
                $t("commons.cancel")
              }}</el-button>
              <el-button
                type="primary"
                @click="sureRefund('dialogAheadTime')"
                >{{ $t("commons.confirm") }}</el-button
              >
            </span>
          </div>
        </el-dialog>
        <!-- 内层  选择账套dialog -->
        <el-dialog
          :title="$t('desk.customer_selectAccountSet')"
          v-if="dialogChooseBook"
          :visible.sync="dialogChooseBook"
          append-to-body
          width="700px"
          top="0"
        >
          <el-table
            :data="tableData"
            height="250"
            :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              prop="date"
              :label="$t('desk.customer_accountName')"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="address"
              :label="$t('desk.customer_amountPrice')"
            ></el-table-column>
            <el-table-column
              prop="name"
              :label="$t('desk.customer_amountMoney')"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="address"
              :label="$t('desk.customer_creativeTime')"
            ></el-table-column>
          </el-table>
          <div style="text-align: right" slot="footer" class="dialog-footer">
            <span>
              <el-button @click="dialogChooseBook = false">{{
                $t("commons.cancel")
              }}</el-button>
              <el-button type="primary" @click="dialogChooseBook = false">{{
                $t("commons.confirm")
              }}</el-button>
            </span>
          </div>
        </el-dialog>
        <!-- 内层  退款dialog -->
        <el-dialog
          :title="$t('desk.customer_refund')"
          v-if="dialogRefoundMoney"
          :visible.sync="dialogRefoundMoney"
          append-to-body
          width="500px"
          top="0"
        >
          <el-form
            :model="inneraAccountForm"
            ref="inneraAccountForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item :label="$t('desk.customer_paymentMethod') + ':'">
              <el-radio-group v-model="inneraAccountForm.payType">
                <el-radio label="1">{{ $t("desk.serve_cash") }}</el-radio>
                <el-radio label="2">{{
                  $t("desk.customer_bankCard")
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('desk.customer_sum') + ':'">
              <el-input
                v-model="inneraAccountForm.payPrice"
                style="width: 280px"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('desk.home_note') + ':'" prop="remark">
              <el-input
                type="textarea"
                v-model="inneraAccountForm.remark"
                style="width: 280px"
              ></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align: right" slot="footer" class="dialog-footer">
            <span>
              <el-button @click="dialogRefoundMoney = false">{{
                $t("commons.cancel")
              }}</el-button>
              <el-button
                type="primary"
                @click="sureRefund('dialogRefoundMoney')"
                >{{ $t("commons.confirm") }}</el-button
              >
            </span>
          </div>
        </el-dialog>

        <!-- div结束标签 -->
      </div>
      <div v-if="choose == 1" class="rootA">
        <el-table
          key="1"
          :data="tableData"
          height="250"
          :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="date"
            :label="$t('desk.customer_spendTime')"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="name"
            :label="$t('desk.customer_nameAgroup')"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="address"
            :label="$t('desk.customer_roomNumber')"
          ></el-table-column>
          <el-table-column
            prop="address"
            :label="$t('desk.customer_amountPrice')"
          ></el-table-column>
        </el-table>

        <div>
          {{ $t("desk.customer_aggregate") + ":" }}0{{
            $t("desk.customer_penNum")
          }}，{{ $t("desk.customer_gongji") + ":" }}0{{ $t("desk.serve_yen") }}
        </div>
        <div style="margin: 15px 0">
          <el-button type="primary" @click="dialogVisible = true">{{
            $t("desk.customer_collection")
          }}</el-button>
          <el-button type="primary" @click="dialogFree = true">{{
            $t("desk.customer_freeOfCharge")
          }}</el-button>
          <el-button type="primary" @click="dialogAheadTime = true">{{
            $t("desk.customer_advance")
          }}</el-button>
        </div>
        <div>{{ $t("desk.customer_settleBill") }}</div>
        <el-table
          :data="tableData"
          height="250"
          :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
        >
          <el-table-column
            prop="date"
            :label="$t('desk.customer_businessProject')"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="name"
            :label="$t('desk.order_invoicing')"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="address"
            :label="$t('desk.customer_sum')"
          ></el-table-column>
          <el-table-column prop="address" :label="$t('commons.operating')">
            <template>
              <el-button type="text" size="mini">{{
                $t("desk.customer_remove")
              }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 5px">
          {{ $t("desk.customer_banlance") + ":" }}0
        </div>
      </div>
      <div v-if="choose == 2" class="rootA">
        <el-table
          key="2"
          :data="tableData"
          height="250"
          :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
        >
          <el-table-column
            prop="date"
            :label="$t('desk.customer_spendTime')"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="name"
            :label="$t('desk.customer_nameAgroup')"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="address"
            :label="$t('desk.customer_roomNumber')"
          ></el-table-column>
          <el-table-column
            prop="address"
            :label="$t('desk.customer_amountPrice')"
          ></el-table-column>
        </el-table>

        <div>
          {{ $t("desk.customer_aggregate") + ":" }}0{{
            $t("desk.customer_penNum")
          }}，{{ $t("desk.customer_gongji") + ":" }}0{{ $t("desk.serve_yen") }}
        </div>
        <div style="margin: 15px 0">
          <el-button type="primary" @click="dialogVisible = true">{{
            $t("desk.customer_collection")
          }}</el-button>
          <el-button type="primary" @click="dialogRefoundMoney = true">{{
            $t("desk.customer_refund")
          }}</el-button>
          <el-button type="primary" @click="brewRich">{{
            $t("desk.customer_rich")
          }}</el-button>
          <el-button type="primary" @click="dialogFree = true">{{
            $t("desk.customer_freeOfCharge")
          }}</el-button>
          <el-button type="primary" @click="dialogAheadTime = true">{{
            $t("desk.customer_advance")
          }}</el-button>
        </div>
        <div>{{ $t("desk.customer_settleBill") }}</div>
        <el-table
          :data="tableData"
          height="250"
          :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
        >
          <el-table-column
            prop="date"
            :label="$t('desk.customer_selectText')"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="name"
            :label="$t('desk.customer_businessProject')"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="name"
            :label="$t('desk.customer_businessDetail')"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="address"
            :label="$t('desk.customer_sum')"
          ></el-table-column>
          <el-table-column prop="address" :label="$t('commons.operating')">
            <template>
              <el-button type="text" size="mini">{{
                $t("desk.customer_remove")
              }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 5px">
          {{ $t("desk.customer_banlance") + ":" }}0
        </div>
      </div>
      <div slot="footer">
        <div class="dialog-footer">
          <el-button @click="settlementDialog = false">{{
            $t("commons.cancel")
          }}</el-button>
          <el-button type="primary" @click="advanceDialog_sure('ruleForm')">{{
            $t("desk.order_invoicing")
          }}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("desk.customer_inputExpectPrice")));
      } else {
        if (value <= 0) {
          callback(new Error(this.$t("desk.customer_expectPriceShould")));
        } else {
          callback();
        }
      }
    };
    return {
      inneraAccountForm: {
        payType: "1",
        payPrice: "0",
        remark: "",
      },
      ruleForm: {
        payType: "1",
        payPrice: "0",
        remark: "",
      },
      advanceRuleForm: {
        payType: "1",
        payPrice: "0",
        remark: "",
      },
      rules: {
        payPrice: [
          { validator: validatePass, trigger: "blur", required: true },
        ],
      },
      choose: "1",
      dialogRefoundMoney: false, //内层  退款 dialog
      dialogChooseBook: false, //内层  选择账套 dialog
      dialogAheadTime: false, //内层  预收款dialog
      dialogFree: false, //内层   免单dialog
      dialogVisible: false, //内层  收款dialog
      settlementDialog: false, //账务结算弹框
      itemInfo: null,
      advanceDialog: false,
      pageIndex: 1, //当前页
      pageSize: 10, //页数
      loading: false,
      showEdit: false,
      showDetail: false,
      unitList: null,
      searchForm: {
        enterId: "",
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
      input:'',
    };
  },
  created() {
    this.getDataList();
    this.getUnitList();
  },

  methods: {
    sureRefund(dialogName) {
      if (this.inneraAccountForm.payPrice == 0) {
        this.$message.error(this.$t("desk.customer_refundShould"));
      } else {
        this[dialogName] = false;
        this.inneraAccountForm = {
          payType: "1",
          payPrice: "0",
          remark: "",
        };
      }
    },
    //账务结算dialog ，点击 结账按钮
    brewRich() {
      this.$message.error(this.$t("desk.customer_chooseRich"));
    },
    //点击账务结算按钮
    settlement(row) {
        this.itemInfo = row;
        if(this.itemInfo){
          this.settlementDialog = true;
        }
    },
    //预收款弹框 点击确定按钮
    advanceDialog_sure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            enterId: this.itemInfo.id,
            priceType: 1,
          };
          this.$F.merge(params, this.advanceRuleForm);
          this.$F.doRequest(
            this,
            "/pms/consume/enter_consume_oper",
            params,
            (data) => {
              this.advanceRuleForm = {
                payType: "1",
                payPrice: "0",
                remark: "",
              };
              this.advanceDialog = false;
              this.getDataList();
            }
          );
        } else {
          return false;
        }
      });
    },
    //点击 预收款 按钮
    advancePayments(row) {
      console.log(row);
      this.itemInfo = row;
      if (this.itemInfo) {
        this.advanceDialog = true;
      }
    },
    hasSettled(row) {
      if (row.finance.typeList.length == 0) {
        return 0;
      } else {
        let allPrice = 0;
        for (let item of row.finance.typeList) {
          allPrice += item.payPrice;
        }
        return allPrice;
      }
    },
    //请求 单位 列表
    getUnitList() {
      this.$F.doRequest(this, "/pms/hotelenter/list", {}, (res) => {
        this.unitList = res.list;
        console.log(this.unitList);
      });
    },
    /**获取表格数据 */
    getDataList(params = {}) {
      this.$F.merge(params, {
        paging: true,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.$F.merge(params, this.searchForm);
      this.$F.doRequest(
        this,
        "/pms/consume/enter_finance_deal_list",
        params,
        (data) => {
          console.log(data);
          this.tableData = data.enterList;

          this.listTotal = data.page.count;
        }
      );
    },

    handelRowItem(row) {
      // 加载组件
      this.showDetail = true;
      //   组件加载完成调用组件内initdata 方法
      this.$nextTick(() => {
        //   可能没有详情接口的直接传row显示
        this.refs.detailRef.initdata(row.id);
      });
    },

    /**多选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**每页条数（即每一页要显示的数据条数） */
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    /**当前页改变（即当前页是第几页） */
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
</style>
