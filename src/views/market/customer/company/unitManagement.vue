<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small" label-width="80px">
        <el-form-item :label="$t('frontOffice.enterpriseName')">
          <el-input v-model="searchForm.enterName" class="width150"></el-input>
        </el-form-item>
        <el-form-item :label="$t('food.common.status')">
          <el-select v-model="searchForm.state" class="width150">
            <el-option
              :value="key"
              v-for="(item,key,index) of $t('commons.comState')"
              :label="item"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_ifShare')">
          <el-select v-model="searchForm.shareFlag" class="width150">
            <el-option
              :value="key"
              v-for="(item,key,index) of $t('commons.comShareFlag')"
              :label="item"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_contact')">
          <el-input v-model="searchForm.contactName" class="width150"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.order_moblePhone')">
          <el-input v-model="searchForm.contactPhone" class="width150"></el-input>
        </el-form-item>
        <br />
        <el-form-item :label="$t('desk.order_salesman')">
          <el-select v-model="searchForm.salesId" class="width150">
            <el-option
              v-for="item in salesList"
              :key="item.id"
              :label="item.userName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_paymentAmount')">
          <el-input v-model="searchForm.startCreditLimit" class="width150" style="width:80px"></el-input>{{$t('desk.serve_to')}}
          <el-input v-model="searchForm.endCreditLimit" class="width150" style="width:80px"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_usedLimit')">
          <el-input v-model="searchForm.endCreditLimit" class="width150" style="width:80px"></el-input>{{$t('desk.serve_to')}}
          <el-input v-model="searchForm.endCreditLimit" class="width150" style="width:80px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">{{$t('commons.queryBtn')}}</el-button>
          <el-button type="primary" class="grey" @click="initForm">{{$t('commons.resetBtn')}}</el-button>
        </el-form-item>
        <el-form-item class="fr">
          <el-button type="primary" class="submit" @click="addAndEditItem('add')">+{{$t('desk.customer_newAdd')}}</el-button>
          <el-button type="primary" class="white" @click="setBatchFormVisible=true">{{$t('desk.customer_volumeSet')}}</el-button>
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
        <el-table-column prop="enterName" :label="$t('frontOffice.enterpriseName')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="storesNum" :label="$t('desk.customer_belongStore')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contactName" :label="$t('desk.home_name')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contactPhone" :label="$t('desk.order_moblePhone')" show-overflow-tooltip></el-table-column>
<!--        <el-table-column prop="enterStrategyId" :label="$t('desk.customer_pricingStrategy')" show-overflow-tooltip>-->
<!--          <template slot-scope="{row}">{{setStrategyName(row.enterStrategyId)}}</template>-->
<!--        </el-table-column>-->
        <el-table-column prop="contractNum" :label="$t('desk.customer_contractNo')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="creditLimit" :label="$t('desk.customer_paymentAmount')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="usedLimit" :label="$t('desk.customer_usedLimit')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="totalLimit" :label="$t('desk.customer_totalConsum')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="enterType" :label="$t('desk.customer_advancePayment')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" :label="$t('food.common.status')" show-overflow-tooltip>
          <template slot-scope="{row}">
            <div>{{row.state==1?$t('desk.customer_enable'):$t('desk.customer_disable')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="salesId" :label="$t('desk.order_salesman')" show-overflow-tooltip>
          <template slot-scope="{row}">{{setSalesIdName(row.salesId)}}</template>
        </el-table-column>
        <el-table-column prop="shareFlag" :label="$t('desk.customer_ifShare')" show-overflow-tooltip>
          <template slot-scope="{row}">{{row.shareFlag==1?$t('desk.customer_yes'):$t('desk.customer_no')}}</template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" width="220">
          <template slot-scope="{row}">
            <el-button type="text" size="mini" @click="handleDetail(row)">{{$t('commons.detail')}}</el-button>
            <el-button type="text" size="mini" @click="addAndEditItem('edit',row)">{{$t('commons.modify')}}</el-button>
            <el-dropdown style="margin-left: 10px;font-size:12px">
              <span class="el-dropdown-link">
                {{$t('desk.customer_more')}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="disableItem(row)">{{$t('desk.customer_disable')}}</el-dropdown-item>
                <el-dropdown-item @click.native="delItem(row)">{{$t('commons.delete')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
    <!-- 编辑or详情弹窗 -->
    <el-dialog
      top="0"
      :title="addCompanyForm.type=='add'?$t('desk.customer_newUnit'):$t('desk.customer_editorUnit')"
      :visible.sync="setCompanyFormVisible"
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
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item :label="$t('frontOffice.enterpriseName') + ':'" prop="enterName">
                <el-input v-model="addCompanyForm.enterName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_contact')+':'" prop="contactName">
                <el-input v-model="addCompanyForm.contactName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.order_moblePhone')" prop="contactPhone">
                <el-input v-model="addCompanyForm.contactPhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
<!--        <el-row class="row">-->
<!--          <el-row class="cell">-->
<!--            <el-col :span="8" class="col">-->
<!--              <el-form-item :label="$t('desk.customer_pricingStrategy')" prop="enterStrategyId">-->
<!--                <el-select v-model="addCompanyForm.enterStrategyId">-->
<!--                  <el-option-->
<!--                    :label="item.ruleName"-->
<!--                    :value="item.id"-->
<!--                    v-for="(item,index) of strategyList"-->
<!--                    :key="index"-->
<!--                  ></el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </el-row>-->
        <el-row class="row">
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_accountRules')+':'" prop>
                <el-select v-model="addCompanyForm.ruleAlldayId">
                  <el-option
                    :label="item.ruleName"
                    :value="item.id"
                    v-for="(item,index) of alldayList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_hangLine')+':'" prop="creditLimit">
                <el-input v-model="addCompanyForm.creditLimit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item label label-width="20px">
                <el-checkbox v-model="addCompanyForm.shareFlag">{{$t('desk.customer_groupShare')}}</el-checkbox>
                <el-checkbox v-model="addCompanyForm.state">{{ $t('commons.comState')['2'] }}</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-divider></el-divider>
        <el-row class="row">
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_effectiveDate')+':'">
                <el-date-picker
                  v-model="addCompanyForm.effectiveStartTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  style="width:100%"
                  :placeholder="$t('desk.serve_chooseDate')"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_expiryDate') + '：'">
                <el-date-picker
                  v-model="addCompanyForm.effectiveEndTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  style="width:100%"
                  :placeholder="$t('desk.serve_chooseDate')"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_developmentWay') + '：'">
                <el-select v-model="addCompanyForm.getWay">
                  <el-option :label="$t('desk.customer_online')" :value="1"></el-option>
                  <el-option :label="$t('desk.customer_offline')" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.order_salesman') + '：'">
                <el-select v-model="addCompanyForm.salesId">
                  <el-option
                    v-for="item in salesList"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-divider></el-divider>
        <el-row class="row">
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_bankAccount') + '：'">
                <el-input v-model="addCompanyForm.bankCard"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_ein') + '：'">
                <el-input v-model="addCompanyForm.taxNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_telephone') + '：'">
                <el-input v-model="addCompanyForm.contactPhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_contractNo') + '：'">
                <el-input v-model="addCompanyForm.contractNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_email') + '：'">
                <el-input v-model="addCompanyForm.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_address') + '：'">
                <el-input v-model="addCompanyForm.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="12" class="col">
              <el-form-item :label="$t('desk.home_note') + ':'">
                <el-input type="textarea" v-model="addCompanyForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setCompanyFormVisible=false">{{ $t('commons.close') }}</el-button>
        <el-button type="primary" @click="hotelenterAddAndEdit">{{ $t('commons.confirm') }}</el-button>
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
        :rules="plRule"
        ref="setBatchForm"
        label-width="100px"
        size="mini"
      >
        <el-row class="row">
          <el-row class="cell">
<!--            <el-col :span="6" class="col">-->
<!--              <el-form-item :label="$t('desk.customer_pricingStrategy')">-->
<!--                <el-select v-model="setBatchForm.enterStrategyId">-->
<!--                  <el-option-->
<!--                    :label="item.ruleName"-->
<!--                    :value="item.id"-->
<!--                    v-for="(item,index) of strategyList"-->
<!--                    :key="index"-->
<!--                  ></el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
            <el-col :span="6" class="col">
              <el-form-item :label="$t('desk.customer_accountRules')+':'">
                <el-select v-model="setBatchForm.ruleAlldayId">
                  <el-option
                    :label="item.ruleName"
                    :value="item.id"
                    v-for="(item,index) of alldayList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item :label="$t('desk.customer_paymentAmount')+':'">
                <el-input v-model="setBatchForm.creditLimit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item label label-width="50px" prop="state">
                <el-radio-group v-model="setBatchForm.state">
                  <el-radio :label="1">{{$t('desk.customer_aKeyEnable')}}</el-radio>
                  <el-radio :label="2">{{$t('desk.customer_aKeyDisable')}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="6" class="col">
              <el-form-item :label="$t('desk.customer_effectiveDate')+':'">
                <el-date-picker
                  v-model="setBatchForm.effectiveStartTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  style="width:140px"
                  :placeholder="$t('desk.serve_chooseDate')"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item :label="$t('desk.customer_expiryDate')+':'">
                <el-date-picker
                  v-model="setBatchForm.effectiveEndTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  style="width:140px"
                  :placeholder="$t('desk.serve_chooseDate')"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item :label="$t('desk.order_salesman') + '：'">
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
            <el-col :span="6" class="col">
              <el-form-item label label-width="0px">
                <el-button type="primary" @click="totalset">{{$t('desk.customer_resetText')}}</el-button>
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
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        @selection-change="handleSelectionChange"
        size="mini"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="enterName" :label="$t('frontOffice.enterpriseName')" show-overflow-tooltip></el-table-column>
<!--        <el-table-column prop :label="$t('desk.customer_pricingStrategy')" show-overflow-tooltip>-->
<!--          <template slot-scope="{row}">-->
<!--            <el-select v-model="row.enterStrategyId" size="mini">-->
<!--              <el-option-->
<!--                :label="item.ruleName"-->
<!--                :value="item.id"-->
<!--                v-for="(item,index) of strategyList"-->
<!--                :key="index"-->
<!--              ></el-option>-->
<!--            </el-select>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column :label="$t('desk.customer_accountRules')" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-select v-model="row.ruleAlldayId" size="mini">
              <el-option
                :label="item.ruleName"
                :value="item.id"
                v-for="(item,index) of alldayList"
                :key="index"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop :label="$t('desk.customer_paymentAmount')" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-input v-model="row.creditLimit" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop :label="$t('desk.home_name')" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-input v-model="row.contactName" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop :label="$t('desk.customer_effectiveDate')" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-date-picker
              v-model="row.effectiveStartTime"
              value-format="yyyy-MM-dd"
              type="date"
              style="width:100%"
              :placeholder="$t('desk.serve_chooseDate')"
              size="mini"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop :label="$t('desk.customer_expiryDate')" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-date-picker
              v-model="row.effectiveEndTime"
              value-format="yyyy-MM-dd"
              type="date"
              style="width:100%"
              :placeholder="$t('desk.serve_chooseDate')"
              size="mini"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop :label="$t('desk.customer_developmentWay')" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-select v-model="row.getWay" size="mini">
              <el-option :label="$t('desk.customer_online')" :value="1"></el-option>
              <el-option :label="$t('desk.customer_offline')" :value="2"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="enterType" :label="$t('desk.order_salesman')" show-overflow-tooltip>
          <template slot-scope="{row}">
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
          <template slot-scope="{row}">
            <el-button type="text" size="mini" @click="changeSate(row)">{{row.state==1?$t('desk.customer_enableIng'):$t('desk.customer_disableIng')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px"></div>
      <!--分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="searchForm.page_num"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setBatchFormVisible=false">{{ $t('commons.close') }}</el-button>
        <el-button type="primary" @click="batchedit">{{ $t('commons.confirm') }}</el-button>
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
    plRule(){
        return {
        enterStrategyId: [
          {
              required: true,
              message: this.$t('commons.placeChoose'),
            trigger: "change",
          },
        ],
        ruleAlldayId: [
          {
              required: true,
              message: this.$t('commons.placeChoose'),
            trigger: "change",
          },
        ],
        }
    },
    rules(){
        return {
        enterName: [
          {
            required: true,
            // message: "请输入单位名称",
              message: this.$t('commons.mustInput'),
            trigger: "blur",
          },
        ],
        contactName: [
          {
            required: true,
            message: this.$t('desk.customer_inputPeople'),
            trigger: "blur",
          },
        ],
        contactPhone: [
          {
            required: true,
            // message: "请输入手机号",
              message: this.$t('commons.mustInput'),
            trigger: "blur",
          },
        ],
        enterStrategyId: [
          {
              required: true,
              message: this.$t('commons.placeChoose'),
            trigger: "change",
          },
        ],
        ruleAlldayId: [
          {
              required: true,
              message: this.$t('commons.placeChoose'),
            trigger: "change",
          },
        ],
        creditLimit: [
          {
            required: true,
            // message: "请输入挂账额度",
              message: this.$t('commons.mustInput'),
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: this.$t('desk.customer_selectIfStop'),
            trigger: "blur",
          },
        ],
        }
    }
  },
  data() {
    return {
      loading: false,
      showEdit: false,
      showDetail: false,
      searchForm: {
        searchType: 1,
        content: "",
        enterStatus: "",
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        startTime: "", //考试时件
        endTime: "", //结束时间
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
      stableData: [], //表格数据
      strategyList: [],
      alldayList: [],
      salesList: [],
      setCompanyFormVisible: false,
      setBatchFormVisible: false,
      addCompanyForm: {
        id: "",
        type: "",
        enterName: "",
        contactName: "",
        contactPhone: "",
        enterStrategyId: "",
        ruleAlldayId: "",
        creditLimit: "",
        shareFlag: "",
        state: "",
        effectiveStartTime: "",
        effectiveEndTime: "",
        getWay: "",
        salesId: "",
        bankCard: "",
        taxNum: "",
        contractNum: "",
        email: "",
        remark: "",
      },

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
    this.initForm();
    this.hotel_price_enter_strategy_list();
    this.hotel_rule_allday_list();
    this.$F.commons.fetchSalesList({ salesFlag: 1 }, (data) => {
      this.salesList = data.hotelUserList;
    });
  },
  methods: {
    initForm() {
      this.searchForm = {
        id: "",
        enterName: "",
        state: "",
        shareFlag: "",
        contactName: "",
        contactPhone: "",
        salesId: "",
        startCreditLimit: "",
        endCreditLimit: "",
        paging: true,
        pageIndex: 1,
        pageSize: 10,
      };
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      this.loading = true;
      this.$F.doRequest(
        this,
        "/pms/hotelenter/list",
        this.searchForm,
        (res) => {
          this.loading = false;
          this.tableData = res.list;
          this.stableData = res.list;
          this.listTotal = (res.page || {}).count || 0;
        }
      );
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
          params.shareFlag = params.shareFlag ? 1 : 2;
          params.state = params.state ? 1 : 2;
          this.$F.doRequest(this, "/pms/hotelenter/edit", params, (res) => {
            this.setCompanyFormVisible = false;
            this.$message({
              message: this.$t('commons.request_success'),
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
    handleDetail(item) {
      this.$router.push("/companydetail?id=" + item.id);
    },
    disableItem(item) {
      this.$confirm(this.$t('desk.customer_sureDisabled'), this.$t('commons.tip_desc'), {
        confirmButtonText: this.$t('commons.confirm'),
        cancelButtonText: this.$t('commons.cancel'),
        type: "warning",
      })
        .then(() => {
          this.$F.doRequest(
            this,
            "/pms/hotelenter/enable_disable",
            {
              id: item.id,
            },
            (res) => {
              this.$message({
                message: this.$t('commons.request_success'),
                type: "success",
              });
              this.getDataList();
            }
          );
        })
        .catch(() => {});
    },
    delItem(item) {
      this.$confirm(this.$t('desk.customer_sureDelete'), this.$t('commons.tip_desc'), {
        confirmButtonText: this.$t('commons.confirm'),
        cancelButtonText: this.$t('commons.cancel'),
        type: "warning",
      })
        .then(() => {
          this.$F.doRequest(
            this,
            "/pms/hotelenter/delete",
            {
              id: item.id,
            },
            (res) => {
              this.$message({
                message: this.$t('commons.request_success'),
                type: "success",
              });
              this.getDataList();
            }
          );
        })
        .catch(() => {});
    },
    addAndEditItem(type, item) {
      console.log(type);
      this.setCompanyFormVisible = true;
      this.addCompanyForm.type = type;
      if (item) {
        for (let k in this.addCompanyForm) {
          this.addCompanyForm[k] = item[k];
        }
        this.addCompanyForm.shareFlag = item.shareFlag == 1 ? true : false;
        this.addCompanyForm.state = item.state == 1 ? true : false;
      } else {
        for (let k in this.addCompanyForm) {
          this.addCompanyForm[k] = "";
        }
      }
    },

    totalset() {
      this.$refs.setBatchForm.validate((valid) => {
        if (valid) {
          console.log("都是有值的");
          this.$F.doRequest(
            this,
            "/pms/hotelenter/totalset",
            this.setBatchForm,
            (data) => {
              this.$message({
                message: this.$t('commons.request_success'),
                type: "success",
              });
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    batchedit() {
      let params = {
        enters: JSON.stringify(this.multipleSelection),
      };
      this.$F.doRequest(this, "/pms/hotelenter/batchedit", params, (data) => {
        this.setBatchFormVisible = false;
        this.getDataList();
        this.$message({
          message: this.$t('commons.request_success'),
          type: "success",
        });
      });
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

    /**多选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**每页数 */
    handleSizeChange(val) {
      this.searchForm.page_num = val;
      this.searchForm.page = 1;
      this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.getDataList();
    },
  },
};
</script>
