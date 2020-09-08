<!--  前台部 > 客户管理 > 单位管理 > 账务处理     9/8 开始调账务结算样式 --> 
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
        <el-form-item label="挂账单位">
          <el-select v-model="searchForm.enterId" class="width150">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item,index) in unitList"
              :key="index"
              :label="item.enterName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">查询</el-button>
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
        <el-table-column prop="creditLimit" label="挂账额度" show-overflow-tooltip></el-table-column>
        <el-table-column label="未结算" align="center">
          <el-table-column label="挂账总额" width="120">
            <template slot-scope="{row}">
              <div>{{row.finance.onAccountTotal?row.finance.onAccountTotal:0}}</div>
            </template>
          </el-table-column>
          <el-table-column label="未结总额" width="120">
            <template slot-scope="{row}">
              <div>{{row.finance.noSettlementTotal?row.finance.onAccountTotal:0}}</div>
            </template>
          </el-table-column>
          <el-table-column label="挂账剩余总额" width="120">
            <template slot-scope="{row}">
              <div>{{row.creditLimit - row.finance.noSettlementTotal}}</div>
            </template>
          </el-table-column>
          <el-table-column label="预收款余额" width="120">
            <template slot-scope="{row}">
              <div>{{row.totalLimit?row.totalLimit:0}}</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="已结算" align="center">
          <el-table-column label="已结算" width="80">
            <template slot-scope="{row}">
              <div>{{hasSettled(row)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="现金" width="80">
            <template slot-scope="{row}">
              <div v-for="(item,index) in row.finance.typeList" :key="index">
                <div v-if="item.payType==1">{{item.payPrice}}</div>
                <div v-else>0</div>
              </div>
              <div v-if="row.finance.typeList.length==0">0</div>
            </template>
          </el-table-column>
          <el-table-column label="银行卡" width="80">
            <template slot-scope="{row}">
              <div v-for="(item,index) in row.finance.typeList" :key="index">
                <div v-if="item.payType==2">{{item.payPrice}}</div>
                <div v-else>0</div>
              </div>
              <div v-if="row.finance.typeList.length==0">0</div>
            </template>
          </el-table-column>
          <el-table-column label="预收款" width="80">0</el-table-column>
          <el-table-column label="微信" width="80">
            <template slot-scope="{row}">
              <div v-for="(item,index) in row.finance.typeList" :key="index">
                <div v-if="item.payType==4">{{item.payPrice}}</div>
                <div v-else>0</div>
              </div>
              <div v-if="row.finance.typeList.length==0">0</div>
            </template>
          </el-table-column>
          <el-table-column label="支付宝" width="80">
            <template slot-scope="{row}">
              <div v-for="(item,index) in row.finance.typeList" :key="index">
                <div v-if="item.payType==3">{{item.payPrice}}</div>
                <div v-else>0</div>
              </div>
              <div v-if="row.finance.typeList.length==0">0</div>
            </template>
          </el-table-column>
          <el-table-column label="免单" width="80">
            <template slot-scope="{row}">
              <div v-for="(item,index) in row.finance.typeList" :key="index">
                <div v-if="item.payType==6">{{item.payPrice}}</div>
                <div v-else>0</div>
              </div>
              <div v-if="row.finance.typeList.length==0">0</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="{row}">
            <el-button type="text" @click="advancePayments(row)" size="mini">预收款</el-button>
            <el-button type="text" @click="settlement(row)" size="mini">账务结算</el-button>
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
    <el-dialog title="预收款" v-if="advanceDialog" :visible.sync="advanceDialog" width="600px" top="0">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        inline
      >
        <el-form-item label="单位名称:">{{itemInfo.enterName}}</el-form-item>
        <el-form-item label="预收款余额:">{{itemInfo.totalLimit}}</el-form-item>

        <el-form-item label="支付方式:">
          <el-radio-group v-model="ruleForm.payType">
            <el-radio label="1">现金</el-radio>
            <el-radio label="2">银行卡</el-radio>
            <el-radio label="5">支票</el-radio>
            <el-radio label="4">微信</el-radio>
            <el-radio label="3">支付宝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="金额:" prop="payPrice">
          <el-input size="small" style="width:360px" v-model="ruleForm.payPrice"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" style="width:360px" v-model="ruleForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <div class="dialog-footer">
          <el-button @click="advanceDialog = false">取 消</el-button>
          <el-button type="primary" @click="advanceDialog_sure('ruleForm')">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 账务结算dialog -->
    <el-dialog
      title="账务结算"
      v-if="settlementDialog"
      :visible.sync="settlementDialog"
      width="900px"
      top="0"
    >
      <div>
        <span>单位名称:蓝海一号</span>
        <span>
          选择账务：
          <el-radio-group v-model="ruleForm.payType">
            <el-radio label="1">选择账务</el-radio>
            <el-radio label="2">选择账套</el-radio>
          </el-radio-group>
        </span>
      </div>
      <div v-if="1==1" class="rootA">
        <el-table
          :data="tableData"
          height="250"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="date" label="消费时间" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名/团队" width="180"></el-table-column>
          <el-table-column prop="address" label="房号"></el-table-column>
          <el-table-column prop="address" label="挂账金额"></el-table-column>
        </el-table>

        <div>总计:0笔账务，共计:0元</div>
        <div>
          <el-button>收款</el-button>
          <el-button>免单</el-button>
          <el-button>预收款</el-button>
        </div>
        <div>结算账单</div>
        <el-table
          :data="tableData"
          height="250"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        >
          <el-table-column prop="date" label="营业项目" width="180"></el-table-column>
          <el-table-column prop="name" label="结账" width="180"></el-table-column>
          <el-table-column prop="address" label="金额"></el-table-column>
          <el-table-column prop="address" label="操作">
            <template>
              <el-button type="text" size="mini">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>平衡数:0</div>
      </div>
      <div slot="footer">
        <div class="dialog-footer">
          <el-button @click="advanceDialog = false">取 消</el-button>
          <el-button type="primary" @click="advanceDialog_sure('ruleForm')">确 定</el-button>
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
        callback(new Error("请输入预收款金额"));
      } else {
        if (value <= 0) {
          callback(new Error("预收款金额必须大于0"));
        } else {
          callback();
        }
      }
    };
    return {
      ruleForm: {
        payType: "1",
        payPrice: "0",
        remark: "",
      },
      rules: {
        payPrice: [
          { validator: validatePass, trigger: "blur", required: true },
        ],
      },
      settlementDialog: true, //账务结算弹框
      itemInfo: null,
      advanceDialog: false,
      pageIndex: 1, //当前页
      pageSize: 10, //页数
      loading: false,
      showEdit: false,
      showDetail: false,
      unitList: null,
      searchForm: {
        enterId: null,
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
    };
  },
  created() {
    this.getDataList();
    this.getUnitList();
  },

  methods: {
    //点击账务结算按钮
    settlement(row) {
      this.settlementDialog = true;
    },
    //预收款弹框 点击确定按钮
    advanceDialog_sure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            enterId: this.itemInfo.id,
            priceType: 1,
          };
          this.$F.merge(params, this.ruleForm);
          this.$F.doRequest(
            this,
            "/pms/consume/enter_consume_oper",
            params,
            (data) => {
              this.ruleForm = {
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
<style lang="less" scoped>
.dialog-footer {
  text-align: right;
}
</style>
