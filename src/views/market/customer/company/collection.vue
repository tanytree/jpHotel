<!--  前台部 > 客户管理 > 单位管理 > 收款查询  -->
<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form
        class="term"
        inline
        size="small"
        label-width="100px"
        :model="searchForm"
      >
        <el-form-item label="收款门店">
          <el-select v-model="searchForm.storesNum" class="width150">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item, index) in storeList"
              :key="index"
              :label="item.storesName"
              :value="item.storesNum"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称">
          <el-select
            v-model="searchForm.enterId"
            filterable
            placeholder="请选择"
            class="width150"
          >
            <el-option label="全部" value>全部</el-option>
            <el-option
              v-for="(item, index) in unitList"
              :key="index"
              :label="item.enterName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-form-item label="收款类型">
            <el-radio-group v-model="searchForm.priceType">
              <el-radio-button label style="margin-right: 10px"
                >不限</el-radio-button
              >&nbsp;&nbsp;
              <el-radio-button label="2" style="margin-right: 10px"
                >结算</el-radio-button
              >&nbsp;&nbsp;
              <el-radio-button label="1">预收款</el-radio-button>&nbsp;&nbsp;
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="支付方式">
            <el-radio-group v-model="searchForm.payType">
              <el-radio-button label style="margin-right: 10px"
                >不限</el-radio-button
              >
              <el-radio-button label="1" style="margin-right: 10px"
                >现金</el-radio-button
              >
              <el-radio-button label="2" style="margin-right: 10px"
                >银行卡</el-radio-button
              >
              <el-radio-button label="5" style="margin-right: 10px"
                >支票</el-radio-button
              >
              <el-radio-button label="3" style="margin-right: 10px"
                >支付宝</el-radio-button
              >
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="收款时间">
            <el-radio-group v-model="searchForm.timeType">
              <el-radio-button label style="margin-right: 10px"
                >不限</el-radio-button
              >
              <el-radio-button label="1" style="margin-right: 10px"
                >今日</el-radio-button
              >
              <el-radio-button label="2" style="margin-right: 10px"
                >昨日</el-radio-button
              >
              <el-radio-button label="3" style="margin-right: 10px"
                >上周</el-radio-button
              >
              <el-radio-button label="4" style="margin-right: 10px"
                >上月</el-radio-button
              >
              <el-radio-button label="5" style="margin-right: 10px"
                >本月</el-radio-button
              >
              <el-radio-button label="自定义" style="margin-right: 10px"
                >自定义</el-radio-button
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="searchForm.timeType == '自定义'">
            <el-date-picker
              v-model="searchForm.startTime"
              value-format="yyyy-MM-dd"
              type="date"
              style="width: 140px"
              placeholder="选择日期"
            ></el-date-picker>
            <span style="margin: 0 5px">至</span>
            <el-date-picker
              v-model="searchForm.endTime"
              value-format="yyyy-MM-dd"
              type="date"
              style="width: 140px"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit" @click="getReceiveList"
              >查询</el-button
            >
            <el-button type="primary" class="grey" @click="initForm"
              >重置</el-button
            >
          </el-form-item>
        </el-row>
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
          label="单位名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="storesName"
          label="收款门店"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="收款类型" show-overflow-tooltip width="80px">
          <template slot-scope="{ row }">
            <div v-if="row.priceType == 1">预收款</div>
            <div v-if="row.priceType == 2">结算</div>
            <div v-if="row.priceType == 3">预收款</div>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" show-overflow-tooltip width="135px">
          <template slot-scope="{ row }">
            <div v-if="row.priceType == 2">
              <span>单位结算-</span>
              <span v-if="row.payType == 1">现金</span>
              <span v-if="row.payType == 2">银行卡</span>
              <span v-if="row.payType == 5">支票</span>
              <span v-if="row.payType == 4">微信</span>
              <span v-if="row.payType == 3">支付宝</span>
            </div>
            <div v-if="row.priceType == 1">
              <span>预收款</span>
              <span v-if="row.payType == 1">现金</span>
              <span v-if="row.payType == 2">银行卡</span>
              <span v-if="row.payType == 5">支票</span>
              <span v-if="row.payType == 4">微信</span>
              <span v-if="row.payType == 3">支付宝</span>
              <span>收款</span>
            </div>
            <div v-if="row.priceType == 3">
              <span>预收款-</span>
              <span v-if="row.payType == 1">现金</span>
              <span v-if="row.payType == 2">银行卡</span>
              <span v-if="row.payType == 5">支票</span>
              <span v-if="row.payType == 4">微信</span>
              <span v-if="row.payType == 3">支付宝</span>
              <span>退款</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="收款时间"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="payPrice"
          label="金额"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="creatorName"
          label="操作人"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="{ row }" v-if="row.priceType == 1">
            <el-button
              @click="paymentsRefund(row)"
              type="text"
              v-if="row.outMoney == 1"
              size="mini"
              >预收款退款</el-button
            >
            <el-button @click="printDetail(row)" type="text" size="mini"
              >预收款补打</el-button
            >
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
    <!-- 退款dialog -->
    <el-dialog
      title="退款"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="700px"
      top="0"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="退款方式:">
          <el-radio-group v-model="ruleForm.payType">
            <el-radio label="1">现金</el-radio>
            <el-radio label="2">银行卡</el-radio>
            <el-radio label="3">支付宝</el-radio>
            <el-radio label="4">微信</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="可退金额:">
          <span>{{ rowInfo.payPrice }}</span>
        </el-form-item>
        <el-form-item label="金额:">
          <el-input v-model="ruleForm.payPrice" style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input
            type="textarea"
            v-model="ruleForm.remark"
            style="width: 280px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: right" slot="footer" class="dialog-footer">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureRefund">确 认</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 寄存补打dialog -->
    <el-dialog
      top="0"
      title="寄存补打"
      style="text-align: left"
      width="750px"
      v-if="checkPatch"
      :visible.sync="checkPatch"
    >
      <h2 style="text-align: center">{{ itemInfo.storesName }} 预收款账单</h2>
      <div class="bigBox">
        <div class="headInfo">
          <span>打印时间：{{ printingTime }}</span>
          <span>订单编号：{{ itemInfo.orderNum }}</span>
          <span>收银员：{{ itemInfo.creatorName }}</span>
        </div>
        <div class="middleInfo">
          <div class="middleItem" style="margin-bottom: 26px">
            <div class="right30">
              <div>名称</div>
              <div>Name</div>
            </div>
            <div class="right50">{{ itemInfo.enterName }}</div>
            <div class="right30">
              <div>支付方式</div>
              <div>Pay Method</div>
            </div>
            <div v-if="itemInfo.payType == 1" class="right50">现金</div>
            <div v-if="itemInfo.payType == 2" class="right50">银行卡</div>
            <div v-if="itemInfo.payType == 3" class="right50">支付宝</div>
            <div v-if="itemInfo.payType == 4" class="right50">微信</div>
            <div v-if="itemInfo.payType == 5" class="right50">支票</div>
            <div class="right30">
              <div>充值金额</div>
              <div>Money</div>
            </div>
            <div>{{ itemInfo.payPrice }}</div>
          </div>
          <div class="middleItem">
            <div class="right30">
              <div>联系人</div>
              <div>Contacts</div>
            </div>
            <div class="right50">{{ itemInfo.hotelEnter.contactName }}</div>
            <div class="right30">
              <div>手机号</div>
              <div>Phone</div>
            </div>
            <div class="right50">{{ itemInfo.hotelEnter.contactPhone }}</div>
            <div class="right30">
              <div>卡内余额</div>
              <div>Balance</div>
            </div>
            <div>{{ itemInfo.hotelEnter.totalLimit }}</div>
          </div>
        </div>
      </div>
      <el-row :gutter="20" style="margin-bottom: 15px">
        <el-col :span="8">
          <span>充值时间：{{ itemInfo.createTime }}</span>
        </el-col>
        <el-col :span="8">
          <span>备注：{{ itemInfo.remark }}</span>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>前台电话：{{ storeInfo.phone }}</span>
        </el-col>
        <el-col :span="9">
          <span>酒店地址：{{ storeInfo.address }}</span>
        </el-col>
        <el-col :span="7">贵宾签名：</el-col>
      </el-row>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button style="width: 80px" @click="checkPatch = false"
          >取消</el-button
        >
        <!--        <el-button style="width:80px;" type="primary">{{$t('commons.print')}}</el-button>-->
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
      storeInfo: null,
      printingTime: null,
      checkPatch: false,
      dialogVisible: false,
      unitList: [],
      storeList: [],
      pageIndex: 1, //当前页
      pageSize: 10, //页数
      loading: false,
      showEdit: false,
      showDetail: false,
      searchForm: {
        storesNum: "",
        enterId: "",
        timeType: "",
        payType: "",
        priceType: "",
        startTime: "",
        endTime: "",
      },
      ruleForm: {
        payType: "1",
        payPrice: null,
        remark: null,
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
      rowInfo: null, //预收款退款 每一项的收款信息
      itemInfo: null, //预收款补打  每一项的收款信息
    };
  },

  created() {
    this.getStoreList();
    this.getUnitList();
    this.getReceiveList();
  },
  methods: {
    //取得当前时间
    getNowDate() {
      let now = new Date(),
        y = now.getFullYear(),
        m = ("0" + (now.getMonth() + 1)).slice(-2),
        d = ("0" + now.getDate()).slice(-2),
        hourse = ("0" + now.getHours()).slice(-2),
        min = ("0" + now.getMinutes()).slice(-2);
      // second = ("0" + now.getSeconds()).slice(-2);
      let bigTime = y + "-" + m + "-" + d;
      let smallTime = hourse + ":" + min;
      this.printingTime = bigTime + " " + smallTime;
    },
    //点击 预收款补打  按钮
    printDetail(row) {
      this.itemInfo = row;
      console.log(this.itemInfo);
      this.getNowDate();
      this.getStoreInfo();
      this.checkPatch = true;
    },
    //取得酒店的基本信息
    getStoreInfo(params = {}) {
      this.$F.doRequest(this, "/pms/hotelservice/findone", params, (res) => {
        this.storeInfo = res;
        console.log(res);
      });
    },
    //退款dialog  点击 确认 按钮
    sureRefund() {
      if (this.ruleForm.payPrice <= this.rowInfo.payPrice) {
        let params = {};
        this.$F.merge(params, {
          storesNum: this.rowInfo.storesNum,
          enterId: this.rowInfo.enterId,
          priceType: 3,
          enterOrderId: this.rowInfo.id,
          outMoneyOrderId: this.rowInfo.id,
        });
        this.$F.merge(params, this.ruleForm);
        this.$F.doRequest(
          this,
          "/pms/consume/enter_consume_oper",
          params,
          (data) => {
            this.$message.success("退款成功");
            this.dialogVisible = false;
            this.ruleForm.payType = "1";
            this.ruleForm.payPrice = null;
            this.ruleForm.remark = null;
            this.getReceiveList();
          }
        );
      } else {
        this.$message.error("退款金额不能高于" + this.rowInfo.payPrice);
      }
    },
    //点击预收款退款按钮
    paymentsRefund(row) {
      this.rowInfo = row;
      this.dialogVisible = true;
    },
    //请求 单位 列表
    getUnitList() {
      this.$F.doRequest(this, "/pms/hotelenter/list", {}, (res) => {
        this.unitList = res.list;
        console.log(this.unitList);
      });
    },
    //请求门店列表
    getStoreList() {
      this.$F.doRequest(this, "/pms/freeuser/stores_list", {}, (data) => {
        this.storeList = data;
      });
    },
    //请求 收款查询 接口
    getReceiveList(params = {}) {
      this.$F.merge(params, {
        paging: true,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.$F.merge(params, this.searchForm);
      this.$F.doRequest(
        this,
        "/pms/consume/enter_consume_order_list",
        params,
        (data) => {
          console.log(data);
          this.tableData = data.enterOrderLogList;
          this.listTotal = data.page.count;
        }
      );
    },
    initForm() {
      this.searchForm = {
        storesNum: "",
        enterId: "",
        timeType: "",
        payType: "",
        priceType: "",
        startTime: "",
        endTime: "",
      };
      this.pageIndex = 1;
      this.pageSize = 10;
      this.getReceiveList();
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
      this.pageSize = val;
      this.pageIndex = 1;
      this.getReceiveList();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.pageSize = 10;
      this.pageIndex = val;
      this.getReceiveList();
    },
  },
};
</script>
<style lang="less" scoped>
.bigBox {
  .headInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(126, 126, 126, 1);
    padding-bottom: 5px;
    margin-bottom: 20px;
  }
  .middleInfo {
    border-bottom: 1px solid rgba(126, 126, 126, 1);
    padding-bottom: 5px;
    margin-bottom: 20px;
    .middleItem {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .right30 {
        margin-right: 20px;
      }
      .right50 {
        margin-right: 40px;
      }
    }
  }
}
</style>
