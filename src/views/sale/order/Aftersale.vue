<!--
 * @Date: 2020-03-10 14:14:58
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-14 13:36:18
 * @FilePath: /cloudAdmin/src/views/sale/order/Aftersale.vue
 -->
 <template>
  <div class="sec1">
    <el-form :model="form" :inline="true" class="top-body" size="small" label-width="100px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="买家名称">
            <el-input v-model="form.userName" style="width:100px" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="订单类型">
            <el-select v-model="form.orderType" style="width:100px">
              <el-option label="当前课程" value="1"></el-option>
              <el-option label="演出" value="3"></el-option>
              <el-option label="场地预定" value="2"></el-option>
              <el-option label="活动项目课程" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="申请时间">
            <el-date-picker
              type="date"
              placeholder="请选择"
              style="width:140px"
              value-format="yyyy-MM-dd"
              class="dateBox"
              v-model="form.startTime"
            ></el-date-picker>
            <span>-</span>
            <el-date-picker
              type="date"
              placeholder="请选择"
              style="width:140px"
              value-format="yyyy-MM-dd"
              class="dateBox"
              v-model="form.endTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="订单编号">
            <el-input v-model="form.orderNumber"  style="width:110px" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="margin-left:16px">
        <el-button @click="queryCourseList(form)" plain type="primary">查询</el-button>
        <el-button @click="resetForm" plain type="primary">重置</el-button>
      </el-form-item>
    </el-form>
    <el-tabs class="subTab" v-model="status" @tab-click="handleClick(status)">
      <el-tab-pane label="全部" name></el-tab-pane>
      <el-tab-pane label="待处理" name="1"></el-tab-pane>
      <el-tab-pane label="处理完成" name="2"></el-tab-pane>
    </el-tabs>
    <div class="components-edit">
      <div class="components-table">
        <el-table
          ref="multipleTable"
          height="250"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;padding: 8px 0 ! important;"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          size="mini"
        >
          <el-table-column prop="courseName" width="120" label="产品" show-overflow-tooltip>
            <template slot-scope="{row}">
              <img style="margin-right:8px" :src="chooseIcon(row)" class="goodsImg" />
              <span v-if="row.modelType==1&&row.activityId">{{row.edtCourse.courseName}}</span>
              <span v-if="row.modelType==1&&!row.activityId">{{row.edtCourse.courseName}}</span>
              <span v-if="row.modelType==2">{{row.edtReserver.reserverName}}</span>
              <span v-if="row.modelType==3">{{row.edtShow.showName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" width="120" label="创建时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orderNumber" width="120" label="订单编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="edtUser" width="90" label="买家" show-overflow-tooltip>
            <template slot-scope="{row}">
              <div>{{row.edtUser.nickname}}</div>
              <div v-if="row.memberType==0">普通用户</div>
              <div v-else-if="row.memberType==2">超级会员</div>
              <div v-else>会员</div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNumber" width="90" label="申请时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="modelType" width="100" label="订单类型">
            <template slot-scope="{row}">
              <div v-if="row.modelType==1">当前课程</div>
              <div v-else-if="row.modelType==3">演出门票</div>
              <div v-else-if="row.modelType==2">场地预定</div>
              <div v-else>活动项目课程</div>
            </template>
          </el-table-column>
          <el-table-column prop="orderStatus" width="100" label="售后状态">
            <template slot-scope="{row}">
              <div v-if="row.shopGoodsRefund.refundStatus==0">待处理</div>
              <div
                v-else-if="row.shopGoodsRefund.refundStatus==1||row.shopGoodsRefund.refundStatus==2"
              >已完成</div>
            </template>
          </el-table-column>
          <el-table-column prop="orderStatus" width="150" label="处理结果">
            <template slot-scope="{row}">
              <div v-if="row.shopGoodsRefund.refundStatus==0">待退款</div>
              <div v-else-if="row.shopGoodsRefund.refundStatus==1">拒绝退款</div>
              <div v-else-if="row.shopGoodsRefund.refundStatus==2">同意退款</div>
            </template>
          </el-table-column>

          <el-table-column align="ceneter" label="操作">
            <template slot-scope="{row}">
              <div style="color: rgba(51, 51, 51, 1);">订单详情</div>
              <el-button type="text" size="mini" @click="applyDateil(row)">申请详情</el-button>
            </template>
          </el-table-column>

          <el-table-column align="ceneter" label>
            <template slot-scope="{row}">
              <div
                v-if="row.shopGoodsRefund.refundStatus==0"
                style="
                    color: rgba(136, 136, 136, 1);
                    font-size: 12px;
                      "
              >剩余{{row.shopGoodsRefund.timeRemaining}}将自动取消用户的申请</div>
              <el-button
                v-if="row.shopGoodsRefund.refundStatus==0"
                type="primary"
                size="mini"
                @click="nowDeal(row)"
              >立即处理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="padding:20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total,  prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title="申请详情"
      v-if="dialogTableVisible"
      :visible.sync="dialogTableVisible"
      width="40%"
    >
      <div class="partOne">
        <div>
          <img :src="dailogIcon()" class="dailogImg" />
        </div>
        <div class="buyDetail">
          <div
            v-if="currentData.modelType==1&&currentData.activityId"
          >{{currentData.edtCourse.courseName}}</div>
          <div
            v-if="currentData.modelType==1&&!currentData.activityId"
          >{{currentData.edtCourse.courseName}}</div>
          <div v-if="currentData.modelType==2">{{currentData.edtReserver.reserverName}}</div>
          <div v-if="currentData.modelType==3">{{currentData.edtShow.showName}}</div>
          <div>
            <span>{{currentData.createTime}}</span>
            <span
              v-if="currentData.modelType==2"
              style="margin-left:8px"
            >{{currentData.edtReserver.reserverAddress}}</span>
            <span
              v-if="currentData.modelType==2"
              style="margin-left:8px"
            >{{currentData.edtShow.showCitys}}</span>
            <span style="margin-left:45px">x{{currentData.orderTotal}}</span>
          </div>
        </div>
      </div>
      <div class="partTwo">
        <div class="applyText">申请详情</div>
        <div class="applyBox">
          <div>
            申请原因：
            <span>{{currentData.shopGoodsRefund.content}}</span>
          </div>
          <div style="margin-top:10px">
            退款金额：
            <span>￥{{currentData.shopGoodsRefund.refundPrice}}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 点击立即处理弹框 -->
    <el-dialog top="0" title="立即处理" v-if="dealWithBullet" :visible.sync="dealWithBullet" width="40%">
      <el-radio-group v-model="refundStatus">
        <el-radio :label="1">同意申请</el-radio>
        <div style="margin:20px 0;"></div>
        <el-radio :label="2">拒绝申请</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subBullet()">提交</el-button>
        <el-button type="primary" @click="dealWithBullet = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  get_refund_total_list,
  get_refund_all_info,
  add_refund_tracking,
  get_order_express,
  agree_refund_info,
  co_refund_take
} from "@/utils/api/sale";
import { mapState, mapActions } from "vuex";
import OrderDetail from "./orderDetail";
export default {
  components: {
    OrderDetail
  },
  computed: {
    ...mapState({
      logisticList: state => state.config.logisticList
    }),
    logistic() {
      let name = "";
      let nameList = this.logisticList.filter(
        item => item.value == this.editform.shipper_code
      );
      if (nameList[0] && nameList[0].name) {
        name = nameList[0].name;
      }
      return name;
    }
  },
  data() {
    return {
      refundId:null,   //点击立即处理是，用来存放上传参数的
      refundStatus:1,
      dealWithBullet: false, //立即处理弹框
      currentData: null,
      dialogTableVisible: false, //申请详情弹框
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      showTop: false,
      tableData: [],
      dataListLoading: false,
      dataListSelections: [],
      status: '',   //0为全部  1 为待处理  2位处理完成
      form: {}
    };
  },
  created() {
    this.resetForm();
    this.fetchGoodList();
  },
  methods: {
    //点击立即处理
    nowDeal(row){
      this.refundId = row.shopGoodsRefund.id;
      this.dealWithBullet = true;
    },
    //待处理弹框点击提交按钮
    subBullet(params = {}){
      this.$F.merge(params, {
        refundStatus:this.refundStatus,
        refundId:this.refundId,
      });
      this.$F.doRequest(
        this,
        "/edt/adminsystem/scores_order_refund_save",
        params,
        data => {
        console.log(data.message);
        this.dealWithBullet = false;
        }
      );
    },
    //点击申请详情
    applyDateil(row) {
      this.currentData = row;
      this.dialogTableVisible = true;
    },
    //dailog选择图片
    dailogIcon() {
      if (this.currentData) {
        if (this.currentData.modelType == 1) {
          return this.currentData.edtCourse.courseIcon;
        }
        if (this.currentData.modelType == 2) {
          return this.currentData.edtReserver.reserverIcon;
        }
        if (this.currentData.modelType == 3) {
          return this.currentData.edtShow.showIcon;
        }
      } else {
        return false;
      }
    },
    //选择产品图片
    chooseIcon(row) {
      if (row.modelType == 1) {
        return row.edtCourse.courseIcon;
      }
      if (row.modelType == 2) {
        return row.edtReserver.reserverIcon;
      }
      if (row.modelType == 3) {
        return row.edtShow.showIcon;
      }
    },
    //点击重置按钮
    resetForm(query) {
      console.log(query);
      this.form = {
        userName: "", //买家名称
        orderType: "", //订单类型
        orderNumber: "", //订单编号
        startTime: "", //交易开始时间
        endTime: "", //交易结束时间
        orderStatus: "", //订单状态
        listType: 2,
        refundStatus: '',
      };
      console.log(this.form);
      this.pageIndex = 1;
      this.pageSize = 8;
      this.totalPage = 0;
      if (query) this.fetchGoodList();
    },
  //点击查询
    queryCourseList(form) {
      this.form.listType = 2;
      console.log(form);
      this.pageIndex = 1;
      this.fetchGoodList();
    },
    //点击切换按钮   全部+待处理+处理完成
    handleClick(status) {
      console.log(status);
      this.form.refundStatus = this.status;
      this.pageIndex = 1;
      this.fetchGoodList();
    },

    /**获取列表数据 */
    fetchGoodList(params = {}) {
      console.log(this.pageIndex);
      this.$F.merge(params, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
        // shelvesStatus: this.form.shelvesStatus,
      });
      this.$F.merge(params, this.form);
      this.$F.doRequest(
        this,
        "/edt/adminsystem/scores_order_list",
        params,
        data => {
          this.tableData = data.list;
          this.totalPage = data.totalSize;
        }
      );
    },
    // 每页数
    handleSizeChange(val) {
      this.form.page_num = val;
      this.form.page = 1;
      this.getDataList();
    },
    // 当前页
    handleCurrentChange(val) {
      this.form.page = val;
      this.getDataList();
    },
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.goodsImg {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.top-close {
  display: flex;
  align-items: center;
  float: right;
  cursor: pointer;
  padding-right: 10px;
  padding-top: 20px;
  font-size: 14px;
  i {
    margin-left: 8px;
  }
}
.shopStatus {
  color: rgba(9, 109, 217, 1);
  font-size: 12px;
}
.top-body {
  background-color: rgba(250, 250, 250, 1);
  padding: 10px;
  border-radius: 5px;
}

.components-edit {
  margin-top: 10px;

  .components-table {
    border: 1px solid #e6e6e6;
  }
  .block {
    padding: 10px 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .page-all {
      font-size: 12px;
      color: #666666;
      letter-spacing: 2px;
    }
  }
}
.dailogImg {
  width: 60px;
  height: 60px;
}
.partOne {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.buyDetail {
  margin-left: 12px;
  color: rgba(51, 51, 51, 1);
  font-size: 20px;
}
.buyDetail span {
  color: rgba(102, 102, 102, 1);
  font-size: 12px;
}
.partTwo {
  margin-top: 30px;
  margin-bottom: 50px;
}
.applyText {
  color: rgba(51, 51, 51, 1);
  font-size: 20px;
  margin-bottom: 8px;
}
.applyBox {
  left: 618px;
  padding: 16px;

  color: rgba(51, 51, 51, 1);
  font-size: 16px;

  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(220, 220, 220, 1);
}
</style>


