<!--
 * @Date: 2020-12-10 11:22:33
 * @Author: 陶子
 * @LastEditTime: 2020-12-11 17:52:50
 * @FilePath: \jiudian\src\views\market\home\roomInfo.vue
-->
<template>
  <el-dialog
    top="0"
    :visible.sync="hosteldis"
    width="80%"
    :title="
      `${currentRoom.houseNum}` +
      '  ' +
      `${
        currentRoom.hotelRoomType ? currentRoom.hotelRoomType.houseName : ''
      }` +
      `${currentRoom.checkIn ? '-' : ''}` +
      checkTitleEnd()
    "
  >
    <!-- 内层挂账dialog -->
    <el-dialog
      top="0"
      width="40%"
      title="挂账"
      :visible.sync="paymentVisible"
      append-to-body
    >
      <div class="innerBoxTop">
        <span>房型：标准间 </span>
        <span>房间号：A001</span><span>入住人：张三</span>
      </div>

      <el-form
        ref="paymentForm"
        :rules="paymentRules"
        :model="paymentForm"
        label-width="110px"
      >
        <el-form-item label="挂账金额" prop="name">
          <el-input v-model="paymentForm.name" style="width: 260px"></el-input>
        </el-form-item>
        <el-form-item label="挂账方式" prop="region">
          <el-select
            v-model="paymentForm.region"
            placeholder="请选择活动区域"
            style="width: 260px"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="挂账单位" prop="date1">
          <el-select
            v-model="paymentForm.date1"
            placeholder="请选择活动区域"
            style="width: 260px"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            v-model="paymentForm.desc"
            style="width: 260px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="paymentVisible = false">取消</el-button>
        <el-button type="primary" @click="paymentVisible = false"
          >确认</el-button
        >
      </span>
    </el-dialog>
    <!-- 内层结账退房dialog -->
    <el-dialog
      top="0"
      width="60%"
      title="结账退房"
      :visible.sync="checkoutVisible"
      append-to-body
    >
      <div class="innerBoxTop">
        <span>房型：标准间 </span>
        <span>房间号：A001</span>
        <span>入住人：张三</span>
      </div>
      <div class="priceBox">
        <div class="leftPrice">应收：800</div>
        <div class="centerLine"></div>
        <div class="rightPrcie">
          <div class="rightTop">
            消费合计：<span class="rightTopNum">800.00</span>
          </div>
          <div class="rightBottom">
            付款合计：<span class="RightBottomNum">0.00</span>
          </div>
        </div>
        <div class="lastRight">
          <img src="~@/assets/images/moreThan.png" class="rightTopImg" />
          <div class="hoverBox">
            <div><span>小计</span><span>¥200；</span></div>
            <div><span>服务费（15%）</span><span>¥100；</span></div>
            <div><span>消费税（12%）</span><span>¥100；</span></div>
            <div><span>温泉税</span><span>¥100；</span></div>
            <div><span>住宿税</span><span>¥100；</span></div>
            <div><span>合计</span><span>¥400；</span></div>
          </div>
        </div>
      </div>
      <el-form
        ref="checkoutForm"
        :rules="paymentRules"
        :model="checkoutForm"
        label-width="110px"
      >
        <el-form-item label="支付方式" prop="resource">
          <el-radio-group v-model="checkoutForm.resource">
            <el-radio label="现金"></el-radio>
            <el-radio label="信用卡"></el-radio>
            <el-radio label="挂账"></el-radio>
            <el-radio label="其他"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="挂账方式"
          v-if="checkoutForm.resource == '挂账'"
          prop="region"
        >
          <el-select
            v-model="checkoutForm.region"
            placeholder="请选择活动区域"
            style="width: 260px"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="挂账单位"
          v-if="checkoutForm.resource == '挂账'"
          prop="date1"
        >
          <el-select
            v-model="checkoutForm.date1"
            placeholder="请选择活动区域"
            style="width: 260px"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优惠金额">
          <el-input
            v-model="checkoutForm.name"
            style="width: 260px"
          ></el-input> </el-form-item
        ><el-form-item label="金额" prop="name">
          <el-input v-model="checkoutForm.name" style="width: 260px"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="checkoutForm.desc"></el-input>
        </el-form-item>
        <el-form-item label-width="40px">
          <el-checkbox v-model="checkoutForm.checked">备选项</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button @click="checkoutVisible = false">取消</el-button>
        <el-button type="primary" @click="checkoutVisible = false"
          >结账并退房</el-button
        >
      </div>
    </el-dialog>
    <!-- 查看预订信息dialog -->
    <el-dialog
      top="0"
      width="70%"
      title="查看预订信息"
      :visible.sync="lookBookVisible"
      append-to-body
    >
      <div class="infoBox">
        <div class="public">
          <div class="itemDetail">
            <el-row>
              <el-col :span="6">预订单号：498576890458</el-col>
              <el-col :span="6" :offset="1">订单来源：前台</el-col>
              <el-col :span="6" :offset="1">外部订单号：398759487430</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">地区：安徽省合肥市蜀山区</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">入住时间：2020-04-26 12:00</el-col>
              <el-col :span="6" :offset="1">预离时间：2020-04-27 12:00</el-col>
              <el-col :span="6" :offset="1">入住天数：1</el-col>
            </el-row>
          </div>
        </div>
        <div class="public otherStyle">
          <div class="infoTitle">预约内容/住宿plan：</div>
          <div class="itemDetail">
            <el-row>
              <el-col :span="6">消费合计：80000</el-col>
              <el-col :span="6" :offset="1">付款合计：9000</el-col>
            </el-row>
            <el-row>
              <el-col :span="18"
                >付款方式：现金（2000）；信用卡（4000）；挂账（1000）；其他（2000））</el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6">预约人：张三【zhangsan】</el-col>
              <el-col :span="8" :offset="1"
                >预约人电话：（手）18077689906</el-col
              >
            </el-row>
          </div>
        </div>
        <el-table
          :data="tableData"
          header-row-class-name="default"
          border
          style="width: 100%"
          :span-method="arraySpanMethod"
        >
          <el-table-column
            prop="name"
            label="入住人/单位名称/团队名"
            width="150"
          >
            <template slot-scope="{ row, $index }">
              <div v-if="$index < 3">{{ row.name }}</div>
              <div v-if="$index == 3">备注</div>
              <div v-if="$index == 4">留言</div>
            </template>
          </el-table-column>
          <el-table-column label="联系方式" align="center">
            <template slot-scope="{ row, $index }">
              <div v-if="$index < 3">{{ row.id }}</div>
              <div v-if="$index == 3"></div>
              <div v-if="$index == 4" class="messageBox">
                <div v-if="!inputMessage">{{ row.remark }}</div>
                <el-input
                  v-model="row.remark"
                  v-if="inputMessage"
                  placeholder="请输入内容"
                  >{{ row.remark }}</el-input
                >
                <el-button type="text" @click="resetMessage(inputMessage)">{{
                  inputMessage ? "保存" : "修改"
                }}</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="性别" align="center" width="120">
          </el-table-column>
          <el-table-column label="客源类型" prop="amount1" align="center">
          </el-table-column>
          <el-table-column
            align="center"
            prop="amount2"
            label="会员号码/单位号码"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="amount2"
            label="同来宾客"
            width="300"
            align="center"
          >
            <el-table-column
              prop="name"
              label="姓名"
              width="100"
              align="center"
            >
            </el-table-column
            ><el-table-column
              prop="amount3"
              label="性别"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="类型"
              width="100"
              align="center"
            >
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>

      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="lookBookVisible = false"
          >关闭</el-button
        >
      </div>
    </el-dialog>
    <el-tabs type="border-card" v-model="activeName">
      <!-- 基本信息 -->
      <el-tab-pane
        :label="$t('desk.serve_basicInfo')"
        v-if="
          currentRoom.checkInRoomType == 1 || currentRoom.checkInRoomType == 2
        "
        :key="0"
        name="first"
      >
        <div class="buttonBox">
          <el-button type="primary" size="small" plain>置脏</el-button>
          <el-button type="primary" size="small" plain>账务</el-button>
          <el-button
            type="primary"
            @click="paymentVisible = true"
            size="small"
            plain
            >挂账</el-button
          >
          <el-button
            type="primary"
            @click="checkoutVisible = true"
            size="small"
            plain
            >结账退房</el-button
          >
        </div>
        <div class="infoBox">
          <div class="public">
            <div class="infoTitle">入住信息：</div>
            <div class="itemDetail">
              <el-row>
                <el-col :span="6">预订单号：498576890458</el-col>
                <el-col :span="6" :offset="1">订单来源：前台</el-col>
                <el-col :span="6" :offset="1">外部订单号：398759487430</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">地区：安徽省合肥市蜀山区</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">入住时间：2020-04-26 12:00</el-col>
                <el-col :span="6" :offset="1"
                  >预离时间：2020-04-27 12:00</el-col
                >
                <el-col :span="6" :offset="1">入住天数：1</el-col>
              </el-row>
            </div>
          </div>
          <div class="public otherStyle">
            <div class="infoTitle">预约内容/住宿plan：</div>
            <div class="itemDetail">
              <el-row>
                <el-col :span="6">消费合计：80000</el-col>
                <el-col :span="6" :offset="1">付款合计：9000</el-col>
              </el-row>
              <el-row>
                <el-col :span="18"
                  >付款方式：现金（2000）；信用卡（4000）；挂账（1000）；其他（2000））</el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6">预约人：张三【zhangsan】</el-col>
                <el-col :span="8" :offset="1"
                  >预约人电话：（手）18077689906</el-col
                >
              </el-row>
            </div>
          </div>
          <el-table
            :data="tableData"
            header-row-class-name="default"
            border
            style="width: 100%"
            :span-method="arraySpanMethod"
          >
            <el-table-column
              prop="name"
              label="入住人/单位名称/团队名"
              width="150"
            >
              <template slot-scope="{ row, $index }">
                <div v-if="$index < 3">{{ row.name }}</div>
                <div v-if="$index == 3">备注</div>
                <div v-if="$index == 4">留言</div>
              </template>
            </el-table-column>
            <el-table-column label="联系方式" align="center">
              <template slot-scope="{ row, $index }">
                <div v-if="$index < 3">{{ row.id }}</div>
                <div v-if="$index == 3"></div>
                <div v-if="$index == 4" class="messageBox">
                  <div v-if="!inputMessage">{{ row.remark }}</div>
                  <el-input
                    v-model="row.remark"
                    v-if="inputMessage"
                    placeholder="请输入内容"
                    >{{ row.remark }}</el-input
                  >
                  <el-button type="text" @click="resetMessage(inputMessage)">{{
                    inputMessage ? "保存" : "修改"
                  }}</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="性别"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column label="客源类型" prop="amount1" align="center">
            </el-table-column>
            <el-table-column
              align="center"
              prop="amount2"
              label="会员号码/单位号码"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="amount2"
              label="同来宾客"
              width="300"
              align="center"
            >
              <el-table-column
                prop="name"
                label="姓名"
                width="100"
                align="center"
              >
              </el-table-column
              ><el-table-column
                prop="amount3"
                label="性别"
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="类型"
                width="100"
                align="center"
              >
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!-- 房间信息 -->
      <el-tab-pane :label="$t('desk.roomInfoDesc')" :key="1" name="second">
        <div class="timeBox">
          <el-button type="primary" disabled size="small" plain
            >&lt;&lt;往前24天</el-button
          >
          <div class="middleTime">04月15日——05月24日</div>
          <el-button type="primary" size="small" plain
            >往后24天&gt;&gt;</el-button
          >
        </div>
        <div class="riliBox">
          <div v-for="i in 24" :key="i" class="itemRi">
            <div class="riTop">王小虎</div>
            <div class="riBottom" @click="lookBookVisible = true">入住中</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button
        style="width: 60px"
        v-if="
          currentRoom.roomStatus == 'null' ||
          currentRoom.roomStatus == null ||
          currentRoom.roomStatus == 1 ||
          currentRoom.roomStatus == 3
        "
        @click="handleOperRoomStatus(2, currentRoom)"
        >{{ $t("desk.home_putDirty") }}
      </el-button>
      <el-button
        style="width: 60px"
        v-if="currentRoom.roomStatus == 2 || currentRoom.roomStatus == 4"
        @click="handleOperRoomStatus(1, currentRoom)"
        >{{ $t("desk.home_buyNet") }}
      </el-button>
      <el-button style="width: 60px" @click="handleFix(currentRoom)"
        >{{ $t("desk.home_service") }}
      </el-button>
    </div> -->
  </el-dialog>
</template>

<script>
import myMixin from "@/utils/filterMixin";
export default {
  props: ["currentRoom"],
  computed: {
    activeName: {
      get() {
        if (
          this.currentRoom.checkInRoomType == 1 ||
          this.currentRoom.checkInRoomType == 2
        ) {
          return "first";
        } else {
          return "second";
        }
      },
      set() {},
    },
    paymentRules() {
      return {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        resource: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      };
    },
  },
  mixins: [myMixin],
  data() {
    return {
      hosteldis: false, //最外层入住弹框
      paymentVisible: false, //内层挂账dialog
      checkoutVisible: false, //内层结账退房dialog
      lookBookVisible: false, //内层查看预订信息dialog
      paymentForm: {}, //挂账弹框的表单
      checkoutForm: {
        resource: "现金",
      }, //退房结账弹框的表单
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
          remark: "你好啊，打工人",
        },
      ],
      inputMessage: false,
    };
  },
  created() {},
  methods: {
    resetMessage(inputMessage) {
      if (inputMessage) {
        this.inputMessage = false;
      } else {
        this.inputMessage = true;
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex <= 4) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 1,
            colspan: 1,
          };
        }
      }
      if (rowIndex > 2) {
        if (columnIndex > 0) {
          return {
            rowspan: 1,
            colspan: 7,
          };
        } else {
          return {
            rowspan: 1,
            colspan: 1,
          };
        }
      }
    },
    changeVisible() {
      this.hosteldis = true;
    },
    checkTitleEnd() {
      if (
        this.currentRoom.checkIn &&
        this.currentRoom.checkIn.operCheckinType
      ) {
        switch (this.currentRoom.checkIn.operCheckinType) {
          case 1:
            return "普通入住";
            break;
          case 2:
            return "时租房入住";
            break;
          case 3:
            return "会场";
            break;
        }
      } else {
        return "";
      }
    },
    handleOperRoomStatus(status, item) {
      // console.log(s) // ; // let status = ''; // if (s == 1 || s == null || s == 'null') { //     status = 2 // } // if (s == 3) { //     status = 4 // } // if (s == 2) { //     status = 1 // } // if (s == 4) { //     status = 1 // }
      item.roomStatus = status;
      this.$F.doRequest(
        this,
        "/pms/hotel/oper_room_status",
        {
          roomIds: item.id,
          roomStatus: status,
        },
        (res) => {
          this.hosteldis = false;
          this.$message({
            message: this.$t("commons.request_success"),
            type: "success",
          });
          // this.getDataList()
        }
      );
    },
    //将房间设置为维修状态
    handleFix(item) {
      this.$confirm(
        this.$t("desk.home_sureService"),
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
            "/pms/hotel/oper_room_status",
            {
              roomStatus: 5,
              roomIds: item.id,
            },
            (res) => {
              this.$message({
                message: this.$t("commons.request_success"),
                type: "success",
              });
              this.hosteldis = false;
            }
          );
        })
        .catch(() => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.buttonBox {
  box-sizing: border-box;
  padding: 10px;
}

.infoBox {
  box-sizing: border-box;
  padding: 10px;
  padding-top: 0;
  .public {
    margin-bottom: 20px;
    .infoTitle {
      font-weight: 600;
      margin-bottom: 10px;
    }
    .itemDetail {
      .el-row {
        margin-bottom: 10px;
      }
    }
  }
  .otherStyle {
    margin-bottom: 10px;
  }
}
.messageBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.innerBoxTop {
  > span {
    margin-right: 40px;
  }
  margin-bottom: 10px;
}
.priceBox {
  margin: 20px 0;
  box-sizing: border-box;
  padding: 10px 20px;
  width: 100%;
  height: 120px;
  background-color: rgba(250, 250, 250, 1);
  border: 1px solid rgba(239, 239, 239, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .leftPrice {
    color: rgba(220, 62, 62, 100);
    font-size: 32px;
  }
  .centerLine {
    width: 1px;
    height: 60px;
    border: 1px solid rgba(218, 218, 218, 1);
    margin: 0 40px;
  }
  .rightPrcie {
    .rightTop {
      margin-bottom: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      .rightTopNum {
        color: rgba(220, 62, 62, 100);
      }
    }
    .rightBottom {
      font-size: 20px;
      .RightBottomNum {
        color: rgba(41, 182, 75, 100);
      }
    }
  }
  .lastRight {
    display: flex;
    justify-content: center;
    align-items: center;
    .rightTopImg {
      position: relative;
      bottom: 15px;
      margin-left: 10px;
      width: 24px;
      height: 24px;
      &:hover + .hoverBox {
        display: block;
      }
    }
    .hoverBox {
      display: none;
      position: relative;
      top: 50px;
      left: 10px;
      box-sizing: border-box;
      padding: 20px;
      width: 240px;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.7);
      color: rgba(255, 255, 255, 100);
      font-size: 14px;
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
.timeBox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  .middleTime {
    color: rgba(51, 51, 51, 100);
    font-size: 16px;
    margin: 0 10px;
  }
}
.riliBox {
  margin: 10px auto;
  margin-bottom: 20px;
  width: 800px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .itemRi {
    .riTop {
      width: 100px;
      height: 50px;
      background-color: rgba(234, 234, 234, 1);
      border: 1px solid rgba(218, 218, 218, 1);
      text-align: center;
      line-height: 50px;
    }
    .riBottom {
      text-align: center;
      width: 100px;
      height: 80px;
      background-color: rgba(255, 255, 255, 1);
      border: 1px solid rgba(218, 218, 218, 1);
      text-align: center;
      line-height: 80px;
    }
  }
}
</style>
 