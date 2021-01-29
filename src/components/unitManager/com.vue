<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking flex_column">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small" label-width="120px">
        <el-form-item :label="$t('desk.customer_unitName')">
          <el-input v-model="searchForm.enterName" class="width150"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_state')">
          <el-select v-model="searchForm.state" class="width150">
            <el-option
              :value="key"
              v-for="(item, key, index) of $t('commons.comState')"
              :label="item"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_contactA')">
          <el-input
            v-model="searchForm.contactName"
            class="width150"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item :label="$t('desk.home_phoneNumA')">
          <el-input
            v-model="searchForm.contactPhone"
            class="width150"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="queryClick"
            >{{ $t("commons.queryBtn") }}
          </el-button>
          <el-button type="primary" class="submit" @click="initForm"
            >{{ $t("commons.resetBtn") }}
          </el-button>
        </el-form-item>
        <el-form-item style="float: right" >
          <el-button
            type="primary"
            class="submit"
            @click="addAndEditItem('add')"
            >{{ $t("desk.customer_newAddA") }}</el-button
          >
          <!-- <el-button type="primary" class="submit" @click="piliangClick">{{
            $t("desk.customer_volumeSet")
          }}</el-button> -->
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
          prop="enterNo"
          :label="$t('desk.customer_unitNum')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="enterName"
          :label="$t('desk.customer_unitName')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{ row.enterName }}
            <span v-if="row.enterPinyin">【{{ row.enterPinyin }}】</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="contactName"
          :label="$t('desk.customer_contactA')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="contactPhone"
          :label="$t('desk.home_phoneNumA')"
          show-overflow-tooltip
        >
        <template slot-scope="{row}">
                <div v-if="row.contactPhone">({{$t('desk.editor_hand')}}){{row.contactPhone}}</div>
                <div v-if="row.mobile">({{$t('desk.editor_only')}}){{row.mobile}}</div>
        </template>
        </el-table-column>
        <el-table-column
          :label="$t('desk.home_state')"
          width="80px"
          align="center"
        >
          <template slot-scope="{ row }"
            ><div>
              {{
                row.state == 1
                  ? $t("desk.customer_enableA")
                  : $t("desk.customer_disable")
              }}
            </div></template
          >
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" width="160">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini" @click="handleDetail(row)">{{
              $t("commons.detail")
            }}</el-button>
            <el-button
              type="text"
              size="mini"
              @click="addAndEditItem('edit', row)"
              >{{ $t("commons.modify") }}</el-button
            >
            <el-dropdown szie="mini" >
              <span class="el-dropdown-link" style="font-size: 12px">
                {{ $t("desk.customer_more") }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- 单位禁用按钮 -->
                <el-dropdown-item
                  @click.native="disableItem(row)"
                  v-if="row.state == 1"
                  >{{ $t("desk.customer_disable") }}
                </el-dropdown-item>
                <!-- 单位启用按钮 -->
                <el-dropdown-item
                  @click.native="disableItem(row)"
                  v-if="row.state == 2"
                  >{{ $t("desk.customer_enable") }}
                </el-dropdown-item>
                <el-dropdown-item @click.native="delItem(row)"
                  >{{ $t("commons.delete") }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="total,prev, pager, next, jumper"
        :total="listTotal"
      ></el-pagination>
    </div>
    <!-- 编辑or详情弹窗 -->
    <el-dialog
      top="0"
      :title="
        addCompanyForm.type == 'add'
          ? $t('desk.customer_newUnit')
          : $t('desk.customer_editorUnit')
      "
      :visible.sync="setCompanyFormVisible"
      width="70%"
      class="setCompanyForm"
    >
      <el-form
        :model="addCompanyForm"
        ref="addCompanyForm"
        :rules="rules"
        label-width="100px"
        size="mini"
      >
        <el-row class="row">
          <el-col :span="24" class="col">
            <el-form-item
              :label="$t('desk.customer_unitName') + ':'"
              prop="enterName"
            >
              <el-input
              :placeholder="$t('desk.book_name')"
                v-model="addCompanyForm.enterName"
                style="width: 128px"
              ></el-input>
              <el-input
              :placeholder="$t('desk.customer_namePYA')"
                v-model="addCompanyForm.enterPinyin"
                style="width: 128px; margin-left: 10px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8" class="col">
            <el-form-item
              :label="$t('desk.customer_contactA') + ':'"
              prop="contactName"
            >
              <el-input v-model="addCompanyForm.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="col">
            <el-form-item
              :label="$t('desk.home_phoneNumA') + ':'"
              prop="contactPhone"
            >
              <el-input v-model="addCompanyForm.contactPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="col">
            <el-form-item label="email:">
              <el-input v-model="addCompanyForm.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="row">
          <el-form-item :label="$t('desk.customer_unitAddress') + '1:'">
            <el-input
              minlength="3"
              maxlength="3"
              @blur="checkNextcode(addCompanyForm.enterAddress1C1)"
              style="width: 80px"
              v-model="addCompanyForm.enterAddress1C1"
            ></el-input>
            <span style="margin: 0 5px">-</span>
            <el-input
              minlength="4"
              maxlength="4"
              @blur="
                checkAddress(
                  addCompanyForm.enterAddress1C1,
                  addCompanyForm.enterAddress1C2,
                  'addressA'
                )
              "
              v-model="addCompanyForm.enterAddress1C2"
              style="width: 80px"
            ></el-input>
            <el-input
              v-model="addCompanyForm.enterAddress1"
              style="width: 260px; margin-left: 10px"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item :label="$t('desk.customer_unitAddress') + '2:'">
            <el-input
              minlength="3"
              maxlength="3"
              @blur="checkNextcode(addCompanyForm.enterAddress2C1)"
              style="width: 80px"
              v-model="addCompanyForm.enterAddress2C1"
            ></el-input>
            <span style="margin: 0 5px">-</span>
            <el-input
              minlength="4"
              maxlength="4"
              @blur="
                checkAddress(
                  addCompanyForm.enterAddress2C1,
                  addCompanyForm.enterAddress2C2,
                  'addressB'
                )
              "
              v-model="addCompanyForm.enterAddress2C2"
              style="width: 80px"
            ></el-input>
            <el-input
              v-model="addCompanyForm.enterAddress2"
              style="width: 260px; margin-left: 10px"
            ></el-input>
          </el-form-item>
        </el-row>

        <el-row class="row">
          <el-col :span="8" class="col">
            <el-form-item :label="$t('desk.customer_unitPhone') + ':'">
              <el-input v-model="addCompanyForm.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="col">
            <el-form-item :label="$t('desk.customer_faxNum') + ':'">
              <el-input v-model="addCompanyForm.fax"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="col">
            <el-form-item label label-width="20px">
              <el-checkbox v-model="addCompanyForm.state"
                >{{ $t("desk.customer_stopUse") }}
              </el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="row">
          <el-col :span="8" class="col">
            <el-form-item :label="$t('desk.customer_bankName') + ':'">
              <el-input v-model="addCompanyForm.bankName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="col">
            <el-form-item :label="$t('desk.customer_bankNo') + ':'">
              <el-input v-model="addCompanyForm.bankCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="col">
            <el-form-item :label="$t('desk.customer_branchName') + ':'">
              <el-input v-model="addCompanyForm.branchEnterName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8" class="col">
            <el-form-item :label="$t('desk.customer_branchNo') + ':'">
              <el-input v-model="addCompanyForm.branchEnterNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16" class="col">
            <el-form-item :label="$t('desk.customer_branchAddress') + ':'">
              <el-input
                style="width: 80px"
                v-model="addCompanyForm.branchEnterC1"
                  @blur="checkNextcode(addCompanyForm.branchEnterC1)"
              ></el-input>
              <span style="margin: 0 5px">-</span>
              <el-input
                v-model="addCompanyForm.branchEnterC2"
                style="width: 80px"
                @blur="
                checkAddress(
                  addCompanyForm.branchEnterC1,
                  addCompanyForm.branchEnterC2,
                  'addressC'
                )
              "
              ></el-input>
              <el-input
                v-model="addCompanyForm.branchEnterAddress"
                style="width: 165px; margin-left: 10px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8" class="col">
            <el-form-item :label="$t('desk.customer_branchPhone') + ':'">
              <el-input
                v-model="addCompanyForm.branchEnterTelephone"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="col">
            <el-form-item :label="$t('desk.customer_accountNum') + ':'">
              <el-input v-model="addCompanyForm.accountNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="col">
            <el-form-item :label="$t('desk.customer_accName') + ':'">
              <el-input v-model="addCompanyForm.accountName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="row">
          <el-col :span="24" class="col">
            <el-form-item :label="$t('desk.customer_unitHeader') + ':'">
              <el-input
                v-model="addCompanyForm.headeName"
                style="width: 128px"
                :placeholder="$t('desk.home_name')"
              ></el-input>
              <el-input
                v-model="addCompanyForm.headePinyin"
                style="width: 128px; margin-left: 10px"
                :placeholder="$t('desk.home_nameA')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8" class="col">
            <el-form-item :label="$t('desk.customer_amountCapital') + ':'">
              <el-input v-model="addCompanyForm.totalFee"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="col">
            <el-form-item :label="$t('desk.customer_employeeNum') + ':'">
              <el-input v-model="addCompanyForm.personNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="memo1:">
            <el-input type="textarea" v-model="addCompanyForm.memo1"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="memo2:">
            <el-input type="textarea" v-model="addCompanyForm.memo2"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setCompanyFormVisible = false">{{
          $t("commons.close")
        }}</el-button>
        <el-button type="primary" @click="hotelenterAddAndEdit">{{
          $t("commons.confirm")
        }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      top="0"
      :title="$t('desk.customer_volumeSet')"
      :visible.sync="setBatchFormVisible"
      class="setBatchForm"
      width="1200px"
    >
      <el-form
        :model="setBatchForm"
        ref="setBatchForm"
        label-width="100px"
        size="mini"
      >
        <el-row class="row">
          <el-row class="cell">
            <!-- <el-col :span="6" class="col">
                            <el-form-item
                                :label="$t('desk.customer_pricingStrategy') + ':'"
                                prop="enterStrategyId"
                            >
                                <el-select v-model="setBatchForm.enterStrategyId">
                                    <el-option
                                        :label="item.ruleName"
                                        :value="item.id"
                                        v-for="(item, index) of strategyList"
                                        :key="index"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
            <el-col :span="6" class="col">
              <el-form-item
                :label="$t('desk.customer_accountRules') + ':'"
                prop="ruleAlldayId"
              >
                <el-select v-model="setBatchForm.ruleAlldayId">
                  <el-option
                    :label="item.ruleName"
                    :value="item.id"
                    v-for="(item, index) of alldayList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item :label="$t('desk.customer_paymentAmount') + ':'">
                <el-input v-model="setBatchForm.creditLimit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item label label-width="50px" prop="state">
                <el-radio-group v-model="setBatchForm.state">
                  <el-radio :label="1"
                    >{{ $t("desk.customer_aKeyEnable") }}
                  </el-radio>
                  <el-radio :label="2"
                    >{{ $t("desk.customer_aKeyDisable") }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="6" class="col">
              <el-form-item :label="$t('desk.customer_effectiveDate') + ':'">
                <el-date-picker
                  v-model="setBatchForm.effectiveStartTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  style="width: 140px"
                  :placeholder="$t('desk.serve_chooseDate')"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item :label="$t('desk.customer_expiryDate') + ':'">
                <el-date-picker
                  v-model="setBatchForm.effectiveEndTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  style="width: 140px"
                  :placeholder="$t('desk.serve_chooseDate')"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item :label="$t('desk.order_salesman') + ':'">
                <el-select v-model="setBatchForm.salesId">
                  <el-option
                    v-for="item in salesList"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3" class="col" style="text-align: center">
              <el-form-item label label-width="0px">
                <el-button type="primary" @click="totalset"
                  >{{ $t("desk.customer_resetText") }}
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <el-divider></el-divider>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="stableData"
        :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
        @selection-change="handleSelectionChange"
        size="mini"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="enterName"
          :label="$t('desk.customer_unitName')"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column
                    prop
                    :label="$t('desk.customer_pricingStrategy')"
                    show-overflow-tooltip
                >
                    <template slot-scope="{ row }">
                        <el-select v-model="row.enterStrategyId" size="mini">
                            <el-option
                                :label="item.ruleName"
                                :value="item.id"
                                v-for="(item, index) of strategyList"
                                :key="index"
                            ></el-option>
                        </el-select>
                    </template>
                </el-table-column> -->
        <el-table-column
          :label="$t('desk.customer_accountRules')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-select v-model="row.ruleAlldayId" size="mini">
              <el-option
                :label="item.ruleName"
                :value="item.id"
                v-for="(item, index) of alldayList"
                :key="index"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop
          :label="$t('desk.customer_paymentAmount')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-input v-model="row.creditLimit" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop
          :label="$t('desk.home_name')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-input v-model="row.contactName" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop
          :label="$t('desk.customer_effectiveDate')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-date-picker
              v-model="row.effectiveStartTime"
              value-format="yyyy-MM-dd"
              type="date"
              style="width: 100%"
              :placeholder="$t('desk.serve_chooseDate')"
              size="mini"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          prop
          :label="$t('desk.customer_expiryDate')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-date-picker
              v-model="row.effectiveEndTime"
              value-format="yyyy-MM-dd"
              type="date"
              style="width: 100%"
              :placeholder="$t('desk.serve_chooseDate')"
              size="mini"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          prop
          :label="$t('desk.customer_developmentWay')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-select v-model="row.getWay" size="mini">
              <el-option
                :label="$t('desk.customer_online')"
                :value="1"
              ></el-option>
              <el-option
                :label="$t('desk.customer_offline')"
                :value="2"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="enterType"
          :label="$t('desk.order_salesman')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-select v-model="row.salesId" size="mini">
              <el-option
                v-for="item in salesList"
                :key="item.id"
                :label="item.userName"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini" @click="changeSate(row)"
              >{{
                row.state == 1
                  ? $t("desk.customer_enableIng")
                  : $t("desk.customer_disableIng")
              }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px"></div>
      <!--分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="pageSize"
        layout=" sizes, prev, pager, next, jumper"
        :total="listTotal"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setBatchFormVisible = false">{{
          $t("commons.close")
        }}</el-button>
        <el-button type="primary" @click="batchedit">{{
          $t("commons.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["isHeader", "footer"],
  computed: {
    ...mapState({
      storesNum: (state) => state.user.storesInfo.storesNum,
    }),
    rules() {
      return {
        enterName: [
          {
            required: true,
            message: this.$t("desk.customer_inputUnitName"),
            trigger: "blur",
          },
        ],
        contactName: [
          {
            required: true,
            message: this.$t("desk.customer_inputPeople"),
            trigger: "blur",
          },
        ],
        contactPhone: [
          {
            required: true,
            message: this.$t("desk.customer_inputPhone"),
            trigger: "blur",
          },
        ],
        enterStrategyId: [
          {
            required: true,
            message: this.$t("desk.customer_selectPriceRule"),
            trigger: "change",
          },
        ],
        ruleAlldayId: [
          {
            required: true,
            message: this.$t("desk.customer_selectBillRule"),
            trigger: "change",
          },
        ],
        creditLimit: [
          {
            required: true,
            message: this.$t("desk.customer_inputPaymentAmount"),
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: this.$t("desk.customer_selectIfStop"),
            trigger: "blur",
          },
        ],
      };
    },
  },
  data() {
    return {
      storeList: [],
      loading: false,
      showEdit: false,
      showDetail: false,
      searchForm: {
        storesNum: "",
        searchType: 1,
        content: "",
        enterStatus: "",
        startTime: "", //考试时件
        endTime: "", //结束时间
      },
      pageIndex: 1, //当前页
      pageSize: 10, //页数
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
      stableData: [], //表格数据
      strategyList: [],
      alldayList: [],
      salesList: [],
      setCompanyFormVisible: false,
      setBatchFormVisible: false,
      addCompanyForm: {},
      setBatchForm: {
        enterStrategyId: "",
        ruleAlldayId: "",
        creditLimit: "",
        effectiveStartTime: "",
        effectiveEndTime: "",
        salesId: "",
        state: "",
      },
    };
  },

  mounted() {
    this.initAddCompanyForm();
    this.hotel_price_enter_strategy_list();
    this.hotel_rule_allday_list();
    this.initForm();
    this.$F.commons.fetchSalesList({ salesFlag: 1 }, (data) => {
      this.salesList = data.hotelUserList;
    });
    // if (this.storesNum == this.$F.getHQCode()) {
    this.$F.doRequest(
      this,
      "/pms/freeuser/stores_list",
      {
        filterHeader: true,
      },
      (data) => {
        this.storeList = data;
      }
    );
    // }
  },
  methods: {
    checkNextcode(code1) {
      if (!code1 || code1.length !== 3) {
        this.$message({
           message: this.$t("desk.customer_sureZipcode"),
          type: "warning",
        });
      }
    },
    // 输入邮编检索地址
    checkAddress(code1, code2, type) {
      if (code1 && code2) {
        if (code1.length == 3 && code2.length == 4) {
          this.$F.commons.zipCode(code1, code2, (res) => {
            if (res.results.length > 0) {
              if (type == "addressA") {
                this.addCompanyForm.enterAddress1 =
                  res.results[0].address1 +
                  res.results[0].address2 +
                  res.results[0].address3;
              } else if(type=='addressB') {
                this.addCompanyForm.enterAddress2 =
                  res.results[0].address1 +
                  res.results[0].address2 +
                  res.results[0].address3;
              }else{
                this.addCompanyForm.branchEnterAddress =
                  res.results[0].address1 +
                  res.results[0].address2 +
                  res.results[0].address3;
              }
            }
          });
        } else {
          this.$message({
             message: this.$t("desk.customer_sureZipcode"),
            type: "warning",
          });
        }
      } else {
        this.$message({
           message: this.$t("desk.customer_sureZipcode"),
          type: "warning",
        });
      }
    },

    initAddCompanyForm() {
      this.addCompanyForm = {
        id: "",
        type: "",
        enterName: "",
        enterPinyin: "",
        contactName: "",
        contactPhone: "",
        email: "",
        address: "",
        mobile: "",
        fax: "",
        enterStrategyId: "",
        state: "",
        bankName: "",
        bankCard: "",
        branchEnterName: "",
        branchEnterNo: "",
        branchEnterC1: "",
        branchEnterC2: "",
        branchEnterAddress: "",
        branchEnterTelephone: "",
        accountName: "",
        accountNo: "",
        headeName: "",
        headePinyin: "",
        totalFee: "",
        personNo: "",
        ruleAlldayId: "dev",
        creditLimit: "1024",
        shareFlag: "",
        effectiveStartTime: "",
        effectiveEndTime: "",
        getWay: "",
        salesId: "",
        taxNum: "",
        contractNum: "",
        remark: "",
        memo1: "",
        memo2: "",
        enterAddress1C1: "",
        enterAddress1C2: "",
        enterAddress1: "",
        enterAddress2C1: "",
        enterAddress2C2: "",
        enterAddress2: "",
      };
    },
    F_storeName(v) {
      let that = this;
      for (let k in that.storeList) {
        if (that.storeList[k].storesNum == v) {
          return that.storeList[k].storesName;
        }
      }
      return this.unknown;
    },
    initForm() {
      this.pageSize = 10;
      this.pageIndex = 1;
      this.searchForm = {
        storesNum: "",
        id: "",
        enterName: "",
        state: "",
        shareFlag: "",
        contactName: "",
        contactPhone: "",
        salesId: "",
        startCreditLimit: "",
        endCreditLimit: "",
        startUsedLimit: "",
        endUsedLimit: "",
        paging: true,
      };
      this.getDataList();
    },

    //点击查询按钮
    queryClick() {
      this.pageSize = 10;
      this.pageIndex = 1;
      this.getDataList();
    },
    //点击 批量设置 按钮
    piliangClick() {
      this.setBatchFormVisible = true;
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      this.loading = true;
      this.$F.merge(this.searchForm, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.$F.doRequest(
        this,
        "/pms/hotelenter/list",
        this.searchForm,
        (res) => {
          this.loading = false;
          this.tableData = res.list;
          this.stableData = res.list;
          this.listTotal = res.page.count;
        }
      );
    },
    checkEnterStrategyId(row) {
      for (let i = 0; i < this.strategyList.length; i++) {
        if (row.enterStrategyId == this.strategyList[i].id) {
          return this.strategyList[i].ruleName;
        }
      }
    },
    /**价格策略单位列表 */
    hotel_price_enter_strategy_list() {
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_price_enter_strategy_list",
        {},
        (res) => {
          this.strategyList = res;
        }
      );
    },
    /**计费规则全天房计费列表 */
    hotel_rule_allday_list() {
      let params = {
        ruleName: "",
        priceModel: "",
        state: 1,
        pageIndex: 1,
        pageSize: 999,
      };
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_rule_allday_list",
        params,
        (res) => {
          console.log(res);
          this.alldayList = res.list;
        }
      );
    },
    /**新增编辑单位 */
    hotelenterAddAndEdit() {
      this.$refs.addCompanyForm.validate((valid) => {
        if (valid) {
          let params = {};
          Object.assign(params, this.addCompanyForm);
          console.log(params.shareFlag);
          console.log(params.state);

          params.shareFlag = params.shareFlag ? 1 : 2;
          params.state = params.state ? 2 : 1;
          this.$F.doRequest(this, "/pms/hotelenter/edit", params, (res) => {
            this.setCompanyFormVisible = false;
            this.$message({
              message: this.$t("commons.request_success"),
              type: "success",
            });
            this.getDataList();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //点击 详情按钮
    handleDetail(item) {
      this.$router.push("/comTaodetail?id=" + item.id);
    },
    //点击单位禁用
    disableItem(item) {
      this.$confirm(
        item.state == 1
          ? this.$t("desk.customer_sureDisable")
          : this.$t("desk.customer_sureEnable"),
        this.$t("commons.tip_desc"),
        {
          confirmButtonText: this.$t("commons.confirm"),
          cancelButtonText: this.$t("commons.cancel"),
          type: "warning",
        }
      )
        .then(() => {
          this.$F.doRequest(
            this,
            "/pms/hotelenter/enable_disable",
            {
              id: item.id,
            },
            (res) => {
              this.$message({
                message: this.$t("commons.request_success"),
                type: "success",
              });
              this.getDataList();
            }
          );
        })
        .catch(() => {});
    },
    delItem(item) {
      this.$confirm(
        this.$t("commons.delete_singleA"),
        this.$t("commons.tip_desc"),
        {
          confirmButtonText: this.$t("commons.confirm"),
          cancelButtonText: this.$t("commons.cancel"),
          type: "warning",
        }
      )
        .then(() => {
          this.$F.doRequest(
            this,
            "/pms/hotelenter/delete",
            {
              id: item.id,
            },
            (res) => {
              this.$message({
                message: this.$t("commons.request_success"),
                type: "success",
              });
              this.getDataList();
            }
          );
        })
        .catch(() => {});
    },
    addAndEditItem(type, item) {
      if (item) {
        for (let k in this.addCompanyForm) {
          this.addCompanyForm[k] = item[k];
        }
        this.addCompanyForm.shareFlag = item.shareFlag == 1 ? true : false;
        this.addCompanyForm.state = item.state == 2 ? true : false;
      } else {
        this.initAddCompanyForm();
      }
      console.log(this.addCompanyForm);
      this.addCompanyForm.type = type;
      this.setCompanyFormVisible = true;
    },
    // 验证材料
    //  this.$refs.setBatchForm.validate((valid) => {
    //       if (valid) {
    //         this.$F.doRequest(
    //           this,
    //           "/pms/hotelenter/totalset",
    //           this.setBatchForm,
    //           (data) => {
    //             this.$message({
    //               message: this.$t('commons.request_success'),
    //               type: "success",
    //             });
    //           }
    //         );
    //       } else {
    //         console.log("error submit!!");
    //         return false;
    //       }
    //     });

    batchedit() {
      if (this.multipleSelection.length > 0) {
        for (let item of this.multipleSelection) {
          if (!item.enterStrategyId) {
            this.$message.error(
              item.enterName + this.$t("desk.customer_priRuleNotBlank")
            );
            return false;
          } else {
            if (!item.ruleAlldayId) {
              this.$message.error(
                item.enterName + this.$t("desk.customer_billRuleNotBlank")
              );
              return false;
            }
          }
        }
        let params = {
          enters: JSON.stringify(this.multipleSelection),
        };
        this.$F.doRequest(this, "/pms/hotelenter/batchedit", params, (data) => {
          this.setBatchFormVisible = false;
          this.getDataList();
          this.$message({
            message: this.$t("commons.request_success"),
            type: "success",
          });
        });
      } else {
        this.$message.error(this.$t("desk.customer_selectUnit"));
      }
    },
    changeSate(item) {
      item.state = item.state == 1 ? 2 : 1;
      this.$forceUpdate();
    },
    setStrategyName(id) {
      for (let k in this.strategyList) {
        if (this.strategyList[k].id == id) {
          return this.strategyList[k].ruleName;
        }
      }
      return "";
    },
    setAlldayName(id) {
      for (let k in this.alldayList) {
        if (this.alldayList[k].id == id) {
          return this.alldayList[k].ruleName;
        }
      }
      return "";
    },
    setSalesIdName(id) {
      for (let k in this.salesList) {
        if (this.salesList[k].id == id) {
          return this.salesList[k].userName;
        }
      }
      return "";
    },
    /**编辑 */
    editRowItem(row) {
      // 加载组件
      this.showEdit = true;
      //   组件加载完成调用组件内initdata 方法
      this.$nextTick(() => {
        //   可能没有详情接口的直接传row显示
        this.refs.editRef.initdata(row.id);
      });
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
    //批量设置，点击设置按钮
    totalset() {
      if (this.multipleSelection.length > 0) {
        for (let item of this.multipleSelection) {
          item.enterStrategyId = this.setBatchForm.enterStrategyId
            ? this.setBatchForm.enterStrategyId
            : item.enterStrategyId;
          item.ruleAlldayId = this.setBatchForm.ruleAlldayId
            ? this.setBatchForm.ruleAlldayId
            : item.ruleAlldayId;
          item.creditLimit = this.setBatchForm.creditLimit
            ? this.setBatchForm.creditLimit
            : item.creditLimit;
          item.state = this.setBatchForm.state
            ? this.setBatchForm.state
            : item.state;
          item.effectiveStartTime = this.setBatchForm.effectiveStartTime
            ? this.setBatchForm.effectiveStartTime
            : item.effectiveStartTime;
          item.effectiveEndTime = this.setBatchForm.effectiveEndTime
            ? this.setBatchForm.effectiveEndTime
            : item.effectiveEndTime;
          item.salesId = this.setBatchForm.salesId
            ? this.setBatchForm.salesId
            : item.salesId;
        }
        // this.$message.success("设置成功，点击保存按钮");
      } else {
        this.$message.error(this.$t("desk.customer_selectUnit"));
      }
    },
    /**多选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    /**每页数 */
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getDataList();
    },
  },
};
</script>
