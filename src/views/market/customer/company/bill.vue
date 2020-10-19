<!--  前台部 > 客户管理 > 单位管理 > 账套管理  -->
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
        <el-form-item label="单位名称">
          <el-select v-model="searchForm.enterId" filterable :placeholder="$t('commons.placeChoose')" class="width150">
            <el-option label="" value>全部</el-option>
            <el-option
              v-for="(item,index) in unitList"
              :key="index"
              :label="item.enterName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账套名">
          <el-input v-model="searchForm.accountSetName" class="width150"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="searchForm.state" class="width150">
            <el-option label="全部" value>全部</el-option>
            <el-option label="未结" value="1">未结</el-option>
            <el-option label="已结" value="2">已结</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">查询</el-button>
          <el-button type="primary" class="grey" @click="initForm">重置</el-button>
        </el-form-item>
        <el-form-item class="form-inline-flex">
          <el-button type="primary" @click="dialogNew= true" class="submit">+新增</el-button>
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
        <el-table-column prop="enterName" label="单位名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="accountSetName" label="账套名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="creditPrice" label="挂账金额" show-overflow-tooltip></el-table-column>
        <el-table-column prop="payPrice" label="结算金额" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" show-overflow-tooltip>
          <template slot-scope="{row}">
            <div v-if="row.state == 2">已结</div>
            <div v-if="row.state==1">未结</div>
          </template>
        </el-table-column>
        <el-table-column prop="creatorName" label="创建人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sellementName" label="结账人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updateTime" label="结账时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="{row}">
            <el-button type="text" v-if="row.state==1" @click="editorClick(row)" size="mini">编辑</el-button>
            <el-button type="text" v-if="row.state==1" @click="settleAccounts(row)" size="mini">结账</el-button>
            <el-button type="text" v-if="row.state==2" @click="undoCheckOut(row)" size="mini">撤销结账</el-button>
            <el-button type="text" v-if="row.state==2" size="mini">结算单补打</el-button>
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
    <!-- 新增dialog -->
    <el-dialog title="新增账套" v-if="dialogNew" :visible.sync="dialogNew" width="700px" top="0">
      <!-- 内层  账务选择 dialog -->
      <el-dialog
        title="账务选择"
        v-if="dialogChoose"
        :visible.sync="dialogChoose"
        append-to-body
        width="820px"
        top="0"
      >
        <el-form :model="addFrom" inline ref="innerAddForm" class="demo-ruleForm">
          <el-form-item label="消费时间:">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="请选择日期"
                v-model="addFrom.startTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" style="text-align:center" :span="2">至</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="请选择日期"
                v-model="addFrom.endTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogChoose_look" plain>查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="accountList"
          height="250"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="createTime" label="消费时间" width="180"></el-table-column>
          <el-table-column prop="checkInPerson.houseNum" label="房号"></el-table-column>
          <el-table-column prop="checkInPerson.checkIn.name" label="姓名/团队" width="180"></el-table-column>
          <el-table-column prop="consumePrice" label="金额"></el-table-column>
        </el-table>
        <div style="text-align:right" slot="footer" class="dialog-footer">
          <span>
            <el-button @click="dialogChoose_cancle">取 消</el-button>
            <el-button type="primary" @click="dialogChoose_sure">确 认</el-button>
          </span>
        </div>
      </el-dialog>
      <!-- 上面是内层dialog -->
      <el-form :model="addFrom" ref="outAddForm" class="demo-ruleForm" inline>
        <el-form-item label="单位:">
          <el-select v-model="addFrom.enterId" filterable :placeholder="$t('commons.placeChoose')" class="width150">
            <el-option
              v-for="(item,index) in unitList"
              :key="index"
              :label="item.enterName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账套名称:" prop="name" style="margin-left:20px">
          <el-input v-model="addFrom.accountSetName" size="small" style="width:180px"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="账务:">
          <el-button plain size="small" @click="chooseAccount" style="margin-left:5px">请选择</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="accountList_add"
        height="250"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
      >
        <el-table-column prop="createTime" label="消费时间" width="180"></el-table-column>
        <el-table-column prop="checkInPerson.checkIn.name" label="姓名/团队" width="120"></el-table-column>
        <el-table-column prop="checkInPerson.houseNum" label="房号"></el-table-column>
        <el-table-column prop="consumePrice" label="消费金额	"></el-table-column>
        <el-table-column prop="creatorName" label="操作员"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="text" @click="dialogNew_remove(row)" size="mini">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>总计：{{accountList_add.length}}笔账务，共计：{{totalPrice(accountList_add)}}元</div>
      <div style="text-align:right" slot="footer" class="dialog-footer">
        <span>
          <el-button @click="dialogNew_cancle">取 消</el-button>
          <el-button type="primary" @click="dialogNew_sure">确 认</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 编辑账套dialog-->
    <el-dialog title="编辑账套" v-if="dialogEditor" :visible.sync="dialogEditor" width="700px" top="0">
      <!-- 内层  账务选择 dialog -->
      <el-dialog
        title="账务选择"
        v-if="dialogChoose_editor"
        :visible.sync="dialogChoose_editor"
        append-to-body
        width="820px"
        top="0"
      >
        <el-form :model="editorForm" inline ref="innerEditorForm" class="demo-ruleForm">
          <el-form-item label="消费时间:">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="请选择日期"
                v-model="editorForm.startTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" style="text-align:center" :span="2">至</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="请选择日期"
                v-model="editorForm.endTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogChoose_editor_look" plain>查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="editorData_choose"
          height="250"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="createTime" label="消费时间" width="180"></el-table-column>
          <el-table-column prop="checkInPerson.houseNum" label="房号"></el-table-column>
          <el-table-column prop="checkInPerson.checkIn.name" label="姓名/团队" width="180"></el-table-column>
          <el-table-column label="金额">
            <template slot-scope="{row}">
              <div>{{row.consumePrice?row.consumePrice:0}}</div>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right" slot="footer" class="dialog-footer">
          <span>
            <el-button @click="dialogChoose_editor_cancle">取 消</el-button>
            <el-button type="primary" @click="dialogChoose_editor_sure">确 认</el-button>
          </span>
        </div>
      </el-dialog>
      <!-- 上面是内层dialog -->
      <el-form :model="editorForm" ref="outEditorForm" class="demo-ruleForm" inline>
        <el-form-item label="单位:">
          <el-select
            v-model="editorForm.enterId"
            size="small"
            style="width:180px"
            disabled
            :placeholder="$t('commons.placeChoose')"
          >
            <el-option :label="itemInfo.enterName" :value="itemInfo.enterId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账套名称:" prop="name" style="margin-left:20px">
          <el-input v-model="editorForm.accountSetName" size="small" style="width:180px"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="账务:">
          <el-button plain size="small" @click="chooseAccount_editor" style="margin-left:5px">请选择</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="editorData"
        height="250"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
      >
        <el-table-column prop="createTime" label="消费时间" width="160"></el-table-column>
        <el-table-column prop="checkInPerson.checkIn.name" label="姓名/团队" width="100"></el-table-column>
        <el-table-column prop="checkInPerson.houseNum" label="房号"></el-table-column>
        <el-table-column label="消费金额	">
          <template slot-scope="{row}">
            <div>{{row.consumePrice?row.consumePrice:0}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="creatorName" label="操作员" width="150px"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="{row}">
            <el-button type="text" @click="dialogEditor_remove(row)" size="mini">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>总计：{{editorData.length}}笔账务，共计：{{totalPrice(editorData)}}元</div>
      <div style="text-align:right" slot="footer" class="dialog-footer">
        <span>
          <el-button @click="dialogEditor_cancle">取 消</el-button>
          <el-button type="primary" @click="dialogEditor_sure">确 认</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 账务处理（按账套）dialog -->
    <el-dialog
      title="账务处理（按账套）"
      v-if="settlementDialog"
      :visible.sync="settlementDialog"
      width="900px"
      top="0"
    >
      <div>
        <span>单位名称:{{itemInfo.enterName}}</span>
        <span style="margin-left:20px">账套名称: {{itemInfo.accountSetName}}</span>
      </div>
      <!-- 内层dailog -->
      <div>
        <!-- 内层  收款dialog -->
        <el-dialog
          title="结算收款"
          v-if="dialogVisible"
          :visible.sync="dialogVisible"
          append-to-body
          width="500px"
          top="0"
        >
          <el-form
            :model="inneraAccountForm"
            ref="inneraAccountForm_collection"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="收款方式:">
              <el-radio-group v-model="inneraAccountForm.payType">
                <el-radio label="1">现金</el-radio>
                <el-radio label="2">银行卡</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="金额:">
              <el-input v-model="inneraAccountForm.payPrice" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="备注:" prop="remark">
              <el-input type="textarea" v-model="inneraAccountForm.remark" style="width:280px"></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align:right" slot="footer" class="dialog-footer">
            <span>
              <el-button @click="dialogCancle('dialogVisible')">取 消</el-button>
              <el-button type="primary" @click="sureRefund('dialogVisible')">确 认</el-button>
            </span>
          </div>
        </el-dialog>
        <!-- 内层  免单dialog -->
        <el-dialog
          title="结算收款"
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
            <el-form-item label="收款方式:">
              <el-radio-group v-model="inneraAccountForm.payType">
                <el-radio label="1">免单</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="金额:">
              <el-input v-model="inneraAccountForm.payPrice" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="备注:" prop="remark">
              <el-input type="textarea" v-model="inneraAccountForm.remark" style="width:280px"></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align:right" slot="footer" class="dialog-footer">
            <span>
              <el-button @click="dialogFree = false">取 消</el-button>
              <el-button type="primary" @click="sureRefund('dialogFree')">确 认</el-button>
            </span>
          </div>
        </el-dialog>
        <!-- 内层  预收款dialog -->
        <el-dialog
          title="结算收款"
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
            <el-form-item label="收款方式:">
              <el-radio-group v-model="inneraAccountForm.payType">
                <el-radio label="1">预收款</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="预收款余额:">
              <span>300</span>
            </el-form-item>
            <el-form-item label="金额:">
              <el-input v-model="inneraAccountForm.payPrice" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="备注:" prop="remark">
              <el-input type="textarea" v-model="inneraAccountForm.remark" style="width:280px"></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align:right" slot="footer" class="dialog-footer">
            <span>
              <el-button @click="dialogCancle('dialogAheadTime')">取 消</el-button>
              <el-button type="primary" @click="sureRefund('dialogAheadTime')">确 认</el-button>
            </span>
          </div>
        </el-dialog>
        <!-- 内层  冲调dialog -->
        <el-dialog
          title="冲调"
          v-if="dialogChooseBook"
          :visible.sync="dialogChooseBook"
          append-to-body
          width="700px"
          top="0"
        >
          <el-table
            :data="tableData"
            height="250"
            :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          >
            <el-table-column prop="date" label="营业项目" width="180"></el-table-column>
            <el-table-column prop="address" label="业务详情"></el-table-column>
            <el-table-column prop="name" label="挂账金额" width="180"></el-table-column>
          </el-table>
          <el-form
            :model="inneraAccountForm"
            ref="inneraAccountForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="冲调原因:">
              <el-input v-model="inneraAccountForm.reason" style="width:280px"></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align:right" slot="footer" class="dialog-footer">
            <span>
              <el-button @click="dialogChooseBook = false">取 消</el-button>
              <el-button type="primary" @click="dialogChooseBook = false">确 认</el-button>
            </span>
          </div>
        </el-dialog>
        <!-- 内层  退款dialog -->
        <el-dialog
          title="退款"
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
            <el-form-item label="收款方式:">
              <el-radio-group v-model="inneraAccountForm.payType">
                <el-radio label="1">现金</el-radio>
                <el-radio label="2">银行卡</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="金额:">
              <el-input v-model="inneraAccountForm.payPrice" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="备注:" prop="remark">
              <el-input type="textarea" v-model="inneraAccountForm.remark" style="width:280px"></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align:right" slot="footer" class="dialog-footer">
            <span>
              <el-button @click="dialogCancle('dialogRefoundMoney')">取 消</el-button>
              <el-button type="primary" @click="sureRefund('dialogRefoundMoney')">确 认</el-button>
            </span>
          </div>
        </el-dialog>

        <!-- div结束标签 -->
      </div>
      <div class="rootA">
        <el-table
          key="2"
          :data="editorData"
          height="250"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        >
          <el-table-column prop="createTime" label="消费时间" width="180"></el-table-column>
          <el-table-column prop="checkInPerson.checkIn.name" label="姓名/团队" width="180"></el-table-column>
          <el-table-column prop="checkInPerson.houseNum" label="房号"></el-table-column>
          <el-table-column label="挂账金额">
            <template slot-scope="{row}">
              <div>{{row.onAccountTotal?-row.onAccountTotal:0}}</div>
            </template>
          </el-table-column>
        </el-table>
        <div>总计：{{editorData.length}}笔账务，共计：{{-totalPrice_deal(editorData)}}元</div>
        <div style="margin:15px 0">
          <el-button type="primary" @click="dialogVisible=true">收款</el-button>
          <el-button type="primary" @click="dialogRefoundMoney=true">退款</el-button>
          <el-button type="primary" @click="dialogChooseBook = true">冲调</el-button>
          <el-button type="primary" @click="dialogFree = true">免单</el-button>
          <el-button type="primary" @click="dialogAheadTime = true">预收款</el-button>
        </div>
        <div>结算账单</div>
        <el-table
          key="11"
          :data="tableData"
          height="250"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          highlight-current-row
          @row-click="rowClick"
        >
          <!-- <el-table-column type="selection" width="50"></el-table-column> -->
          <el-table-column label width="35">
            <template slot-scope="{row}">
              <el-radio :label="row.name" v-model="radioId">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="营业项目" width="180"></el-table-column>
          <el-table-column prop="name" label="业务详情" width="180"></el-table-column>
          <el-table-column prop="address" label="金额"></el-table-column>
          <el-table-column prop="address" label="操作">
            <template>
              <el-button type="text" size="mini">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:5px">平衡数:0</div>
      </div>
      <div slot="footer">
        <div class="dialog-footer">
          <span>
            <el-button type="primary" @click="advanceDialog_sure('ruleForm')">增加账务</el-button>
            <el-button type="primary" @click="advanceDialog_sure('ruleForm')">结 账</el-button>
            <el-button @click="settlementDialog = false">取 消</el-button>
          </span>
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
    return {
      unitList: [],
      loading: false,
      showEdit: false,
      showDetail: false,
      pageIndex: 1, //当前页
      pageSize: 10, //页数
      addFrom: {
        enterId: "",
        accountSetName: "",
        startTime: "",
        endTime: "",
      },
      searchForm: {
        enterId: "",
        accountSetName: "",
        state: "",
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
      accountList: [], //新增 账务列表
      accountList_add: [], // 由账务列表push进来的选择列表
      //////////////////**** ++++++++++++++++++*/
      settlementDialog: false, //账务处理弹框
      dialogNew: false, // 新增账套  dialog
      dialogEditor: false, //编辑账套 dialog
      dialogChoose: false, //内层  新增账套 账务选择dialog
      dialogChoose_editor: false, //内层 编辑账套  账务选择dialog
      //账务处理内层弹框
      dialogVisible: false, //收款
      dialogRefoundMoney: false, //退款
      dialogAheadTime: false, //预收款
      dialogChooseBook: false, //冲调
      dialogFree: false, //免单
      inneraAccountForm: {
        payType: "",
        payPrice: "0",
        remark: "",
        reason: "",
      },
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
      allPrice_deal: null, //账套结算——即共计
      radioId: "", //对结算账单里面进行单选用的
    };
  },

  mounted() {
    this.initForm();
    this.getUnitList();
  },
  methods: {
    rowClick(row) {
      this.radioId = row.name;
    },
    //账务处理（按账套）内层dialog 点击取消
    dialogCancle(dialogName) {
      this[dialogName] = false;
      this.inneraAccountForm = {
        payType: "",
        payPrice: "0",
        remark: "",
      };
    },
    //账务处理（按账套）内层dialog 点击确认
    sureRefund(dialogName) {
      this[dialogName] = false;
      this.inneraAccountForm = {
        payType: "",
        payPrice: "0",
        remark: "",
      };
    },
    //点击结账按钮
    settleAccounts(row) {
      console.log(row);
      this.itemInfo = row;
      this.editorData = row.subList;
      this.settlementDialog = true;
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
    //计算账务处理的总消费金额
    totalPrice_deal(arrayName) {
      let gongji = 0;
      if (arrayName.length > 0) {
        for (let item of arrayName) {
          gongji += item.onAccountTotal;
        }
      } else {
        this.allPrice_deal = 0;
        return 0;
      }
      this.allPrice_deal = gongji;
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
    //新增账套  点击确定
    dialogNew_sure() {
      if (this.accountList_add.length == 0) {
        this.$message.error("请选择账务");
      } else {
        if (this.addFrom.accountSetName) {
          for (let item of this.accountList_add) {
            this.orderListJson.push(item.id);
          }
          let params = {
            enterId: this.addFrom.enterId,
            accountSetName: this.addFrom.accountSetName,
            orderListJson: JSON.stringify(this.orderListJson),
          };
          this.$F.doRequest(
            this,
            "/pms/consume/enter_credit_edit",
            params,
            (data) => {
              this.$message.success(this.$t('commons.request_success'));
              this.addFrom.enterId = "";
              this.addFrom.name = "";
              this.addFrom.accountSetName = "";
              this.dialogNew = false;
              this.accountList_add = [];
              this.getDataList();
            }
          );
        } else {
          this.$message.error("请输入账套名称");
        }
      }
    },
    //编辑账套  点击确定
    dialogEditor_sure() {
      if (this.editorData.length == 0) {
        this.$message.error("请选择账务");
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
              this.$message.success(this.$t('commons.request_success'));
              this.editorForm.enterId = "";
              this.editorForm.name = "";
              this.editorForm.accountSetName = "";
              this.dialogEditor = false;
              this.editorData = [];
            }
          );
        } else {
          this.$message.error("请输入账套名称");
        }
      }
    },
    //新增账套  点击取消
    dialogNew_cancle() {
      this.addFrom.enterId = "";
      this.addFrom.name = "";
      this.addFrom.accountSetName = "";
      this.dialogNew = false;
      this.accountList_add = [];
    },
    //编辑账套  点击取消
    dialogEditor_cancle() {
      this.editorForm.enterId = "";
      this.editorForm.name = "";
      this.editorForm.accountSetName = "";
      this.editorData = [];
      this.dialogEditor = false;
    },
    //新增  账务选择  点击取消
    dialogChoose_cancle() {
      this.addFrom.startTime = "";
      this.addFrom.endTime = "";
      this.dialogChoose = false;
    },
    //编辑 账务选择  点击取消
    dialogChoose_editor_cancle() {
      this.editorForm.startTime = "";
      this.editorForm.endTime = "";
      this.dialogChoose_editor = false;
    },
    //新增 账务选择  点击确定
    dialogChoose_sure() {
      if (this.multipleSelection.length > 0) {
        this.addFrom.startTime = "";
        this.addFrom.endTime = "";
        this.dialogChoose = false;
        for (let item of this.multipleSelection) {
          if (this.accountList_add.length == 0) {
            this.accountList_add.push(item);
          } else {
            for (let each of this.accountList_add) {
              if (item.id == each.id) {
                return false;
              }
            }
            this.accountList_add.push(item);
          }
        }
      } else {
        this.$message.error("请选择账务");
      }
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
        this.$message.error("请选择账务");
      }
    },
    //新增 点击账务选择 查询按钮
    dialogChoose_look() {
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
        this.$message.error("请选择单位");
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
        this.$message.error("请选择单位");
      }
    },
    //点击 撤销结账按钮
    undoCheckOut(row) {
      console.log(row);
      let params = {
        accountSetId: row.id,
      };
      this.$F.doRequest(
        this,
        "/pms/consume/enter_credit_sellement_cancel",
        params,
        (data) => {
          console.log(data);
          this.$message.success(this.$t('commons.request_success'));
          this.getDataList();
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
        enterId: "",
        accountSetName: "",
        state: "",
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
        "/pms/consume/enter_cridet_order_list",
        params,
        (data) => {
          console.log(data);
          this.tableData = data.accountSetList;
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
</style>
