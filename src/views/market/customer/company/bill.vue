<!--  前台部 > 客户管理 > 单位管理 > 请款管理  -->
<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form
        class="term demo-form-inline"
        v-model="searchForm"
        inline
        size="small"
        label-width="80px"
      >
        <el-form-item :label="$t('desk.customer_unitName') + ':'">
          <el-select
            v-model="searchForm.enterName"
            filterable
            :placeholder="$t('commons.placeChoose')"
            class="width150"
          >
            <el-option label="" value>{{ $t("desk.home_all") }}</el-option>
            <el-option
              v-for="(item, index) in unitList"
              :key="index"
              :label="item.enterName"
              :value="item.enterName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_arage') + ':'">
          <el-date-picker
            v-model="searchForm.startTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 140px"
            :placeholder="$t('desk.serve_chooseDate')"
          ></el-date-picker>
          <span style="margin: 0 5px">-</span>
          <el-date-picker
            v-model="searchForm.endTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 140px"
            :placeholder="$t('desk.serve_chooseDate')"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_pleaseState') + ':'">
          <el-select v-model="searchForm.state" class="width150">
            <el-option :label="$t('desk.home_all')" value></el-option>
            <el-option
              :label="$t('desk.customer_notRequest')"
              value="1"
            ></el-option>
            <el-option
              :label="$t('desk.customer_areadyRequest')"
              value="3"
            ></el-option>
            <el-option
              :label="$t('desk.customer_partRequest')"
              value="2"
            ></el-option>
          </el-select>
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
          <el-button type="primary" @click="dialogNew = true" class="submit">{{
            $t("desk.customer_newRequest")
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
          :label="$t('desk.customer_arage')"
          show-overflow-tooltip
          width="120px"
        >
          <template slot-scope="{ row }">
            <div><span style="color: #f11717">开</span>{{ row.startTime }}</div>
            <div><span style="color: #1a3bf1">结</span>{{ row.endTime }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="requestNum"
          :label="$t('desk.customer_paragraphNum')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="putupPrice"
          :label="$t('desk.customer_amountPrice')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="requestPrice"
          :label="$t('desk.customer_areadyPrice')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :label="$t('desk.customer_waiteRequestPri')"
          width="100"
        >
          <template slot-scope="{ row }">
            <div>{{ row.putupPrice - row.requestPrice }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('desk.customer_creativeTime')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :label="$t('desk.customer_pleaseState')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div v-if="row.requestStatus == 1">
              {{ $t("desk.customer_notRequest") }}
            </div>
            <div v-if="row.requestStatus == 2">
              {{ $t("desk.customer_partRequest") }}
            </div>
            <div v-if="row.requestStatus == 3">
              {{ $t("desk.customer_areadyRequest") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" width="220">
          <template slot-scope="{ row }">
            <el-button type="text" @click="editorClick(row)" size="mini">{{
              $t("desk.customer_editorText")
            }}</el-button>
            <el-button type="text" @click="advancePayments(row)" size="mini">{{
              $t("desk.customer_lookBuyDetail")
            }}</el-button>
            <el-button type="text" @click="undoCheckOut(row)" size="mini">{{
              $t("desk.customer_continueRequest")
            }}</el-button>
            <el-button type="text" @click="bookRecord(row)" size="mini">{{
              $t("desk.customer_requestRecord")
            }}</el-button>
            <el-button type="text" size="mini">{{
              $t("commons.delete")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-size="pageSize"
          :total="listTotal"
          layout="total, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <!-- 新增请款单dialog -->
    <el-dialog
      :title="$t('desk.customer_newPlaceOrder')"
      v-if="dialogNew"
      :visible.sync="dialogNew"
      width="700px"
      top="0"
    >
      <el-form
        :model="addPlaceFrom"
        :rules="addRules"
        ref="addPlaceFrom"
        size="small"
        label-width="110px"
      >
        <el-form-item
          :label="$t('desk.customer_chooseUnit') + ':'"
          prop="enterId"
        >
          <el-select
            v-model="addPlaceFrom.enterId"
            filterable
            :placeholder="$t('commons.placeChoose')"
          >
            <el-option
              v-for="(item, index) in unitList"
              :key="index"
              :label="item.enterName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('desk.customer_paragraphNum') + ':'"
          prop="prefix"
        >
          <el-input
            v-model="addPlaceFrom.prefix"
            style="width: 150px"
            :placeholder="$t('desk.customer_numBefore')"
            @blur="requestnumDetail"
          ></el-input>
          <!-- addPlaceFrom.requestNum -->
          <span style="margin-left: 10px">{{ date_serial }}</span>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_arageDate') + ':'" required>
          <el-col :span="8">
            <el-form-item prop="startTime" label-width="0">
              <el-date-picker
                type="date"
                :placeholder="$t('desk.serve_chooseDate')"
                v-model="addPlaceFrom.startTime"
                style="width: 170px"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="1">-</el-col>
          <el-col :span="8">
            <el-form-item prop="endTime" label-width="0">
              <el-date-picker
                type="date"
                :placeholder="$t('desk.serve_chooseDate')"
                v-model="addPlaceFrom.endTime"
                style="width: 170px"
              ></el-date-picker>
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
          <el-input
            v-model="addPlaceFrom.requestPrice"
            style="width: 170px"
          ></el-input>
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
    <!-- 编辑账套dialog-->
    <el-dialog
      :title="$t('desk.customer_editorAccount')"
      v-if="dialogEditor"
      :visible.sync="dialogEditor"
      width="700px"
      top="0"
    >
      <!-- 内层  账务选择 dialog -->
      <el-dialog
        :title="$t('desk.customer_accountingChoose')"
        v-if="dialogChoose_editor"
        :visible.sync="dialogChoose_editor"
        append-to-body
        width="820px"
        top="0"
      >
        <el-form
          :model="editorForm"
          inline
          ref="innerEditorForm"
          class="demo-ruleForm"
        >
          <el-form-item :label="$t('desk.customer_spendTime') + ':'">
            <el-col :span="11">
              <el-date-picker
                type="date"
                :placeholder="$t('desk.serve_chooseDate')"
                v-model="editorForm.startTime"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="line" style="text-align: center" :span="2">{{
              $t("desk.serve_to")
            }}</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                :placeholder="$t('desk.serve_chooseDate')"
                v-model="editorForm.endTime"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogChoose_editor_look" plain>{{
              $t("commons.queryBtn")
            }}</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="editorData_choose"
          height="250"
          :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="createTime"
            :label="$t('desk.customer_spendTime')"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="checkInPerson.houseNum"
            :label="$t('desk.customer_roomNumber')"
          ></el-table-column>
          <el-table-column
            prop="checkInPerson.checkIn.name"
            :label="$t('desk.customer_nameAgroup')"
            width="180"
          ></el-table-column>
          <el-table-column :label="$t('desk.customer_sum')">
            <template slot-scope="{ row }">
              <div>{{ row.consumePrice ? row.consumePrice : 0 }}</div>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right" slot="footer" class="dialog-footer">
          <span>
            <el-button @click="dialogChoose_editor_cancle">{{
              $t("commons.cancel")
            }}</el-button>
            <el-button type="primary" @click="dialogChoose_editor_sure">{{
              $t("commons.confirm")
            }}</el-button>
          </span>
        </div>
      </el-dialog>
      <!-- 上面是内层dialog -->
      <el-form
        :model="editorForm"
        ref="outEditorForm"
        class="demo-ruleForm"
        inline
      >
        <el-form-item :label="$t('desk.book_unit') + ':'">
          <el-select
            v-model="editorForm.enterId"
            size="small"
            style="width: 180px"
            disabled
            :placeholder="$t('commons.placeChoose')"
          >
            <el-option
              :label="itemInfo.enterName"
              :value="itemInfo.enterId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('desk.customer_zhangName') + ':'"
          prop="name"
          style="margin-left: 20px"
        >
          <el-input
            v-model="editorForm.accountSetName"
            size="small"
            style="width: 180px"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item :label="$t('desk.customer_accountingText') + ':'">
          <el-button
            plain
            size="small"
            @click="chooseAccount_editor"
            style="margin-left: 5px"
            >{{ $t("commons.placeChoose") }}</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        :data="editorData"
        height="250"
        :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
      >
        <el-table-column
          prop="createTime"
          :label="$t('desk.customer_spendTime')"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="checkInPerson.checkIn.name"
          :label="$t('desk.customer_nameAgroup')"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="checkInPerson.houseNum"
          :label="$t('desk.customer_roomNumber')"
        ></el-table-column>
        <el-table-column :label="$t('desk.customer_constPrice')">
          <template slot-scope="{ row }">
            <div>{{ row.consumePrice ? row.consumePrice : 0 }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="creatorName"
          :label="$t('desk.customer_operator')"
          width="150px"
        ></el-table-column>
        <el-table-column prop="address" :label="$t('commons.operating')">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              @click="dialogEditor_remove(row)"
              size="mini"
              >{{ $t("desk.customer_remove") }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div>
        {{ $t("desk.customer_aggregate") + ":" }}{{ editorData.length
        }}{{ $t("desk.customer_penNum") }}，{{ $t("desk.customer_gongji") + ":"
        }}{{ totalPrice(editorData) }}{{ $t("desk.serve_yen") }}
      </div>
      <div style="text-align: right" slot="footer" class="dialog-footer">
        <span>
          <el-button @click="dialogEditor_cancle">{{
            $t("commons.cancel")
          }}</el-button>
          <el-button type="primary" @click="dialogEditor_sure">{{
            $t("commons.confirm")
          }}</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 查看挂账明细dialog -->
    <el-dialog
      :title="$t('desk.customer_lookBuyDetail')"
      v-if="advanceDialog"
      :visible.sync="advanceDialog"
      width="900px"
      top="0"
    >
      <div class="flexBox">
        <div><span>总挂账金额：120000</span> <span>挂账记录：3条</span></div>
        <el-button type="primary">导出EXCEL</el-button>
      </div>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="buyTable"
        height="100%"
        header-row-class-name="default"
        size="small"
      >
        <el-table-column
          prop="createTime"
          :label="$t('desk.customer_spendTime')"
          show-overflow-tooltip
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="onAccountTotal"
          :label="$t('desk.customer_amountPrice')"
          width="150"
        >
        </el-table-column>
        <el-table-column
          :label="$t('desk.home_name')"
          prop="requestPrice"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="intoPrice"
          :label="$t('desk.customer_originOrderNum')"
          width="100"
        >
        </el-table-column>
        <el-table-column :label="$t('desk.customer_roomKind')" width="100">
          <template slot-scope="{ row }">
            <div>{{ row.requestPrice - row.intoPrice }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('desk.order_checkinDateA')"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('desk.customer_checkoutTime')"
          width="160"
        >
        </el-table-column>
      </el-table>
      <!--分页 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-size="pageSize"
          :total="detailListTotal"
          layout="total, prev, pager, next, jumper"
        ></el-pagination>
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
    <el-dialog
      :title="$t('desk.customer_requestRecord')"
      v-if="bookDialog"
      :visible.sync="bookDialog"
      top="0"
    >
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="recordList"
        height="100%"
        header-row-class-name="default"
        size="small"
      >
        <el-table-column
          prop="creatorName"
          :label="$t('desk.home_operator')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('desk.customer_operateTime')"
        >
        </el-table-column>
        <el-table-column
          :label="$t('desk.customer_placeMoney')"
          prop="operPrice"
        >
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
    addRules() {
      return {
        enterId: [{ required: true, message: "请选择单位", trigger: "change" }],
        prefix: [
          { required: true, message: "请填写编号前缀", trigger: "blur" },
        ],
        startTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        endTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
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
      unitList: [],
      loading: false,
      pageIndex: 1, //当前页
      pageSize: 10, //页数
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
        enterName: "",
        startTime: "",
        endTime: "",
        requestStatus: "",
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
      accountList: [], //新增 账务列表
      accountList_add: [], // 由账务列表push进来的选择列表
      //////////////////**** ++++++++++++++++++*/
      advanceDialog: false,
      dialogNew: false, // 新增账套  dialog
      dialogEditor: false, //编辑账套 dialog
      dialogChoose: false, //内层  新增账套 账务选择dialog
      dialogChoose_editor: false, //内层 编辑账套  账务选择dialog

      editorForm: {
        //编辑 form表单
        enterId: "",
        accountSetName: "",
        startTime: "",
        endTime: "",
      },
      orderListJson: [],
      itemInfo: null,
      editorData_choose: [], //编辑  账务列表
      editorData: [], //当点击编辑时，用来接收编辑的表格数据
      allPrice: null, //即共计
      detailListTotal: 0,
      bookDialog: false,
      recordList: [],
    };
  },

  mounted() {
    this.initForm();
    this.getUnitList();
  },
  methods: {
    //点击 挂账明细 按钮
    advancePayments(row) {
      console.log(row);
      this.itemInfo = row;
      if (this.itemInfo) {
        let params = {
          enterId: row.enterId,
          startTime: row.startTime,
          endTime: row.endTime,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          paging: true,
        };
        this.$F.doRequest(
          this,
          "/pms/consume/enter_credit_order_list",
          params,
          (res) => {
            this.buyTable = res.consumeOrderList;
            // this.detailListTotal = res.page.count;
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
    //计算账务列表的总消费金额
    totalPrice(arrayName) {
      let gongji = 0;
      if (arrayName.length > 0) {
        for (let item of arrayName) {
          gongji += item.consumePrice;
        }
      } else {
        this.allPrice = 0;
        return 0;
      }
      this.allPrice = gongji;
      return gongji;
    },
    //点击 编辑按钮
    editorClick(row) {
      this.itemInfo = row;
      this.editorData = row.subList;
      console.log(row);
      console.log(this.editorData);
      this.editorForm.enterId = this.itemInfo.enterId;
      this.editorForm.accountSetName = this.itemInfo.accountSetName;
      this.dialogEditor = true;
    },
    //新增账套  点击移除
    dialogNew_remove(row) {
      this.accountList_add = this.accountList_add.filter((item) => {
        return item.id !== row.id;
      });
    },
    //编辑账套  点击移除
    dialogEditor_remove(row) {
      this.editorData = this.editorData.filter((item) => {
        return item.id !== row.id;
      });
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
                  message: "请款金额不得高于挂账金额",
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
            this.$F.doRequest(
              this,
              "/pms/request/request_account_edit",
              this.addPlaceFrom,
              (res) => {
                this.$message({
                  message: "新增成功",
                  type: "success",
                });
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
              }
            );
          } else {
            this.$message({
              message: "挂账金额不得为0",
              type: "success",
            });
          }
        } else {
          return false;
        }
      });
    },
    //编辑账套  点击确定
    dialogEditor_sure() {
      if (this.editorData.length == 0) {
        this.$message.error(this.$t("desk.customer_selectAccounting"));
      } else {
        if (this.editorForm.accountSetName) {
          for (let item of this.editorData) {
            this.orderListJson.push(item.id);
          }
          let params = {
            accountSetId: this.itemInfo.id,
            enterId: this.editorForm.enterId,
            accountSetName: this.editorForm.accountSetName,
            orderListJson: JSON.stringify(this.orderListJson),
          };
          this.$F.doRequest(
            this,
            "/pms/consume/enter_credit_edit",
            params,
            (data) => {
              this.$message.success(this.$t("commons.request_success"));
              this.editorForm.enterId = "";
              this.editorForm.name = "";
              this.editorForm.accountSetName = "";
              this.dialogEditor = false;
              this.editorData = [];
            }
          );
        } else {
          this.$message.error(this.$t("commons.customer_inputAccountName"));
        }
      }
    },
    //新增账套  点击取消
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
      this.dialogNew = false;
    },
    //编辑账套  点击取消
    dialogEditor_cancle() {
      this.editorForm.enterId = "";
      this.editorForm.name = "";
      this.editorForm.accountSetName = "";
      this.editorData = [];
      this.dialogEditor = false;
    },

    //编辑 账务选择  点击取消
    dialogChoose_editor_cancle() {
      this.editorForm.startTime = "";
      this.editorForm.endTime = "";
      this.dialogChoose_editor = false;
    },

    //编辑 账务选择  点击确定
    dialogChoose_editor_sure() {
      if (this.multipleSelection.length > 0) {
        this.editorForm.startTime = "";
        this.editorForm.endTime = "";
        this.dialogChoose_editor = false;
        for (let item of this.multipleSelection) {
          if (this.editorData.length == 0) {
            this.editorData.push(item);
          } else {
            for (let each of this.editorData) {
              if (item.id == each.id) {
                return false;
              }
            }
            this.editorData.push(item);
          }
        }
      } else {
        this.$message.error(this.$t("desk.customer_selectAccounting"));
      }
    },

    //编辑 点击账务选择 查询按钮
    dialogChoose_editor_look() {
      let params = {
        pageIndex: 1,
        pageSize: 999,
      };
      this.$F.merge(params, this.editorForm);
      this.$F.doRequest(
        this,
        "/pms/consume/enter_credit_order_list",
        params,
        (data) => {
          console.log(data);
          this.editorData_choose = data.consumeOrderList;
          this.dialogChoose_editor = true;
        }
      );
    },
    //点击新增  请选择 按钮
    chooseAccount() {
      if (this.addFrom.enterId) {
        let params = {
          pageIndex: 1,
          pageSize: 999,
        };
        this.$F.merge(params, this.addFrom);
        this.$F.doRequest(
          this,
          "/pms/consume/enter_credit_order_list",
          params,
          (data) => {
            console.log(data);
            this.accountList = data.consumeOrderList;
            this.dialogChoose = true;
          }
        );
      } else {
        this.$message.error(this.$t("desk.customer_selectUnit"));
      }
    },
    //点击编辑  请选择 按钮
    chooseAccount_editor() {
      if (this.editorForm.enterId) {
        let params = {
          pageIndex: 1,
          pageSize: 999,
        };
        this.$F.merge(params, this.editorForm);
        this.$F.doRequest(
          this,
          "/pms/consume/enter_credit_order_list",
          params,
          (data) => {
            console.log(data);
            this.editorData_choose = data.consumeOrderList;
            this.dialogChoose_editor = true;
          }
        );
      } else {
        this.$message.error(this.$t("desk.customer_selectUnit"));
      }
    },
    //点击 请款记录 按钮
    bookRecord(row) {
      let params = {
        enterId: row.enterId,
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.jiesuan {
  color: rgba(153, 153, 153, 100);
  font-size: 12px;
}
</style>
