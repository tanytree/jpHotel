<!--
 * @LastEditors: Please set LastEditors
 *
 -->
<template>
  <div class="boss-index">
    <!-- 物品寄存 -->
    <div class="content">
      <el-form :model="leftLuggage" ref="leftLuggage" inline size="small" class="term">
        <el-form-item :label="$t('desk.home_state') + ':'" style="display: block">
          <el-radio-group v-model="leftLuggage.operStatus">
            <el-radio-button label="">{{
              $t("desk.home_noLimit")
            }}</el-radio-button>
            <el-radio-button label="1" style="margin-left: 10px">{{
              $t("desk.home_toRetrieve")
            }}</el-radio-button>
            <el-radio-button label="2" style="margin-left: 10px">{{
              $t("desk.home_haveRetrieve")
            }}</el-radio-button>
            <el-radio-button label="3" style="margin-left: 10px">{{
              $t("desk.home_cancelllation")
            }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('desk.home_customerName') + ':'">
          <el-input v-model="leftLuggage.guestName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_roomNum') + ':'">
          <el-input v-model="leftLuggage.roomNum"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_getNum') + ':'">
          <el-input v-model="leftLuggage.luggageNum"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_registerTime') + ':'">
          <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="leftLuggage.startTime"></el-date-picker>
          <span class="line">{{ $t("boss.report_toText") }}</span>
          <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="leftLuggage.endTime"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('desk.home_goodsName') + ':'">
          <el-input v-model="leftLuggage.luggageName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="lookFor(leftLuggage)">{{ $t("commons.queryBtn") }}</el-button>
          <el-button class="white" @click="resetClick(leftLuggage)">{{
            $t("commons.resetBtn")
          }}</el-button>
        </el-form-item>
        <div>
          <el-button class="submit" size="small" type="primary" @click="newCheck = true">{{ $t("desk.home_addRegister") }}</el-button>
        </div>
      </el-form>
      <el-table :data="checkTables" border height="100%" header-row-class-name="default" size="small">
        <el-table-column :label="$t('desk.home_customerName')" prop="guestName"></el-table-column>
        <el-table-column :label="$t('desk.home_roomNum')" prop="roomNum" width="100px"></el-table-column>
        <el-table-column :label="$t('desk.home_phoneNumA')" prop="mobile" width="135"></el-table-column>
        <el-table-column :label="$t('desk.home_goodsName')" prop="luggageName" show-overflow-tooltip width="110"></el-table-column>
        <el-table-column width="110" :label="$t('desk.home_depositingTime')" prop="createTime">
          <template slot-scope="{row}">
            <div v-for="(item,index) in formatTime(row.createTime)" :key="index">{{item}}</div>
          </template>
        </el-table-column>
        <el-table-column width="110" :label="$t('desk.home_drawTime')" prop="receiveTime"></el-table-column>
        <el-table-column :label="$t('desk.home_getNum')" width="220" prop="luggageNum"></el-table-column>
        <el-table-column :label="$t('desk.home_state')">
          <template slot-scope="{ row }">
            <div v-if="row.operStatus == 1">
              {{ $t("desk.home_toRetrieve") }}
            </div>
            <div v-if="row.operStatus == 2">
              {{ $t("desk.home_haveRetrieve") }}
            </div>
            <div v-if="row.operStatus == 3">
              {{ $t("desk.home_cancelllation") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('desk.home_operator')">
          <template slot-scope="{ row }">{{ row.creatorName }}</template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" width="280">
          <template slot-scope="{ row }">
            <el-button type="primary" v-if="row.operStatus == 1" @click="getClick(row)">
              {{ $t("desk.home_receive") }}</el-button>
            <el-button size="small" type="text" @click="noteDdetail(row)">{{
              $t("commons.detail")
            }}</el-button>
            <el-button size="small" type="text" v-if="row.operStatus == 1" @click="invalidClick(row)">{{ $t("desk.home_invalid") }}</el-button>
            <el-button size="small" type="text" v-if="row.operStatus == 3" @click="cancelInvalidClick(row)">{{ $t("desk.home_cancelInvalid") }}</el-button>
            <!-- <el-button size="small" type="text" v-if="row.operStatus == 2 || row.operStatus == 3" @click="deletClick(row)">{{ $t("commons.delete") }}</el-button> -->
            <!-- 寄存补打 -->
            <el-button size="small" type="text" v-if="row.operStatus == 1" @click="jicunClick(row.id)">{{ $t("desk.home_checkToPlayA") }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>
    <!-- newCheck新增寄存 -->
    <el-dialog top="0" :title="$t('desk.home_addRegister')" style="text-align: left" :visible.sync="newCheck">
      <el-form ref="newCheckForm" :model="newCheckForm" :rules="rules" label-width="90px">
        <el-col :span="8">
          <el-form-item :label="$t('desk.home_customerName') + ':'">
            <el-input v-model="newCheckForm.guestName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('desk.home_roomNum') + ':'">
            <el-input v-model="newCheckForm.roomNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('desk.home_phoneNumA') + ':'">
            <el-input v-model="newCheckForm.mobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('desk.home_goodsName') + ':'" prop="luggageName" label-width="110px">
            <el-input v-model="newCheckForm.luggageName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('desk.home_note') + ':'">
            <el-input v-model="newCheckForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-form>

      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button style="width: 80px" @click="cancelClick()">{{
          $t("commons.cancel")
        }}</el-button>
        <el-button style="width: 110px" v-if="1 == 2">{{
          $t("desk.home_saveAndPri")
        }}</el-button>
        <el-button style="width: 80px" type="primary" @click="saveNewAdd('newCheckForm')">{{ $t("commons.save") }}</el-button>
      </div>
    </el-dialog>

    <!-- 新增寄存 详情 -->
    <el-dialog top="0" :title="$t('commons.detail')" style="text-align: left" v-if="checkdetail" :visible.sync="checkdetail">
      <el-row style="margin: 10px 20px">
        <el-col :span="12">
          <span style="color: #888888">{{
            $t("desk.home_customerName") + ":"
          }}</span>
          {{ itemGoodsDetail.guestName }}
        </el-col>
        <el-col :span="12">
          <span style="color: #888888">{{
            $t("desk.home_roomNum") + ":"
          }}</span>
          {{ itemGoodsDetail.roomNum }}
        </el-col>
        <el-col :span="12">
          <span style="color: #888888">{{ $t("desk.home_telNumA") + ":" }}</span>
          {{ itemGoodsDetail.mobile }}
        </el-col>
        <el-col :span="12">
          <span style="color: #888888">{{
            $t("desk.home_goodsName") + ":"
          }}</span>
          {{ itemGoodsDetail.luggageName }}
        </el-col>
        <el-col :span="12">
          <span style="color: #888888">{{ $t("desk.home_getNum") + ":" }}</span>
          {{ itemGoodsDetail.luggageNum }}
        </el-col>
        <el-col :span="12">
          <span style="color: #888888">{{
            $t("desk.home_getState") + ":"
          }}</span>
          {{ checkGetState(itemGoodsDetail.operStatus)}}
        </el-col>
        <el-col :span="12">
          <span style="color: #888888">{{
            $t("desk.home_checkTheTime") + ":"
          }}</span>
          {{ itemGoodsDetail.createTime }}
        </el-col>
        <el-col :span="12">
          <span style="color: #888888">{{
            $t("desk.home_drawTime") + ":"
          }}</span>
          {{ itemGoodsDetail.receiveTime }}
        </el-col>
        <el-col>
          <span style="color: #888888">{{ $t("desk.home_note") + ":" }}</span>
          {{ itemGoodsDetail.remark }}
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button style="width: 80px" @click="checkdetail = false">{{
          $t("commons.close")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- checkPatch  寄存补打-->
    <el-dialog top="0" :title="$t('desk.home_checkToPlayA')" style="text-align: left" width="60%" v-if="checkPatch" :visible.sync="checkPatch">
      <div class="dialog_headBox">
        <img src="~@/assets/images/print/good_print.png" alt="">
        <div>https://okura-club-hotels.com</div>
      </div>
      <el-row style="margin: -10px 20px 10px">
        <h2 style="text-align: center">
          <span>預かり書</span><br /><span>Storage Receipt</span>
        </h2>
        <el-row style="margin-bottom:10px;">
          <el-col :span="12">
            印刷時間：{{ itemJiCun.printingTime }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            No.：{{ itemJiCun.luggageNum }}
          </el-col>
          <el-col :span="12">
            ホテル名：{{ itemJiCun.storesName }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            預かり時間：{{ itemJiCun.createTime }}
          </el-col>
          <el-col :span="12">
            ホテル住所：{{ itemJiCun.storesAddress }}
          </el-col>
        </el-row>
        <el-row style="
            border-bottom: 1px dashed #333;
            padding-bottom: 20px;
            margin-bottom: 20px;
          ">
          <el-col :span="12">
            担当者：{{ itemJiCun.creatorName }}
          </el-col>
          <el-col :span="12">
            ホテル電話：{{ itemJiCun.receptionMobile }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            お名前 /Name ：{{itemJiCun.guestName}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            部屋番号：{{itemJiCun.roomNum}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            お電話：{{itemJiCun.mobile}}
          </el-col>
        </el-row>
        <el-row style="margin-top:10px;">
          <el-col :span="12">
            御預かり内容：{{itemJiCun.luggageName}}
          </el-col>
        </el-row>
      </el-row>
      <div class="responsible">
        <div class="innerBox"> 担当者署名</div>
      </div>
      <div style="margin-top:10px">
        <div style="margin-bottom:10px;">毎度ご愛顧賜りましてありがとう御座います。</div>
        <div>
          <div>上記通り預ける荷物には現金、貴重品、医薬品、壊れやすいもの、危険物などはありません。
            <div>
              この内容と異なるものが含まれる場合、一切責任を負担いたしません。
            </div>
            <div>
              ご了承の程宜しくお願いいたします</div>
          </div>
        </div>
      </div>
      <div class="imgBox">
        <img src="~@/assets/images/print/good_print.png" alt="">
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button style="width: 80px" @click="checkPatch = false">{{
          $t("commons.cancel")
        }}</el-button>
        <el-button style="width:80px;" type="primary">印刷</el-button>
      </div>
    </el-dialog>
     <!-- checkPatch  测试所用-->
    <el-dialog top="0" title="印刷レビュー" style="text-align: left" width="70%" v-if="testDialog" :visible.sync="testDialog">
      <customerInfo/>
    </el-dialog>
  </div>
</template>

<script>
import customerInfo from '@/components/table/customerInfo'
export default {
  data() {
    return {
      testDialog:true,
      nowTime: null,
      pageIndex: 1,
      pageSize: 10,
      num: 1,
      total: 0,
      currentPage4: 1, //分页当前所在页数的位置
      checkdetail: false, //物品寄存dialog
      newCheck: false, //新增寄存按钮
      checkPatch: false, //寄存补打 按钮
      leftLuggage: {
        // 物品寄存
        operStatus: "",
        startTime: "",
        endTime: "",
        guestName: "", //客户姓名
        roomNum: "",
        luggageNum: "", //领取编号
        luggageName: "", //物品名称
      },
      // 新增寄存dialog数据
      newCheckForm: {
        guestName: "",
        roomNum: "",
        luggageName: "",
        remark: "",
        mobile: null,
      },
      // 物品寄存表格
      checkTables: [],
      itemGoodsDetail: null,
      itemJiCun: null,
      display: true,
      input: "", //搜索框
    };
  },
  components:{
    customerInfo
  },
  created() {
    this.getDepositList(); //请求寄存列表
  },
  computed: {
    rules() {
      return {
        luggageName: [
          {
            required: true,
            message: this.$t("desk.home_inputGoodsName"),
            trigger: "blur",
          },
        ],
        roomNum: [
          {
            required: true,
            message: this.$t("desk.home_inputRoomNum"),
            trigger: "blur",
          },
        ],
      };
    },
  },
  methods: {
    formatTime(time) {
      if (time) {
        let array = time.split(" ");
        return array;
      } else {
        return time;
      }
    },
    checkGetState(number) {
      console.log(number);
      switch (parseInt(number)) {
        case 1:
          return this.$t("desk.home_waitGet");
        case 2:
          return this.$t("desk.home_alerdGet");
        case 3:
          return this.$t("desk.home_discard");
      }
    },
    //点击 寄存补打 按钮
    jicunClick(id) {
      let params = {
        id: id,
      };
      this.$F.doRequest(
        this,
        "/pms/luggagedeposit/findone", 
        params,
        (data) => {
          this.itemJiCun = data;
          this.checkPatch = true;
          console.log(this.itemJiCun);
        }
      );
    },
    cancelClick() {
      this.newCheck = false;
      this.newCheckForm = {};
    },
    //取得当前时间
    getNowDate() {
      let now = new Date(),
        y = now.getFullYear(),
        m = ("0" + (now.getMonth() + 1)).slice(-2),
        d = ("0" + now.getDate()).slice(-2),
        hourse = ("0" + now.getHours()).slice(-2),
        min = ("0" + now.getMinutes()).slice(-2),
        second = ("0" + now.getSeconds()).slice(-2);
      this.nowTime = y + m + d + hourse + min + second;
      console.log("当前时间：" + this.nowTime);
    },
    //点击  删除   按钮
    deletClick(row) {
      this.$confirm(
        this.$t("desk.home_deleteSure"),
        this.$t("commons.tip_desc"),
        {
          confirmButtonText: this.$t("commons.determine"),
          cancelButtonText: this.$t("commons.cancel"),
          type: "warning",
        }
      )
        .then(() => {
          let params = {
            id: row.id,
          };
          this.$F.doRequest(
            this,
            "/pms/luggagedeposit/delete",
            params,
            (data) => {
              this.$message({
                message: this.$t("desk.home_deleteSuccess"),
                type: "success",
              });
              this.getDepositList();
            }
          );
        })
        .catch(() => {});
    },
    //点击  取消作废  按钮
    cancelInvalidClick(row) {
      let params = {
        id: row.id,
        status: 1,
      };
      this.$F.doRequest(
        this,
        "/pms/luggagedeposit/getdeposit",
        params,
        (data) => {
          this.getDepositList();
        }
      );
    },
    //点击 作废 按钮
    invalidClick(row) {
      let params = {
        id: row.id,
        status: 3,
      };
      this.$F.doRequest(
        this,
        "/pms/luggagedeposit/getdeposit",
        params,
        (data) => {
          this.getDepositList();
        }
      );
    },
    //点击 领取 按钮
    getClick(row) {
      this.$confirm(this.$t("desk.home_sureGet"), this.$t("commons.tip_desc"), {
        confirmButtonText: this.$t("commons.determine"),
        cancelButtonText: this.$t("commons.cancel"),
        type: "warning",
      })
        .then(() => {
          let params = {
            id: row.id,
            status: 2,
          };
          this.$F.doRequest(
            this,
            "/pms/luggagedeposit/getdeposit",
            params,
            (data) => {
              this.getDepositList();
            }
          );
        })
        .catch(() => {});
    },
    //点击详情按钮
    noteDdetail(row) {
      let params = {
        id: row.id,
      };
      this.$F.doRequest(
        this,
        "/pms/luggagedeposit/findone", 
        params,
        (data) => {
          this.itemGoodsDetail = data;
          this.checkdetail = true;
        }
      );
    },

    //新增寄存dialog中点击 保存  按钮
    saveNewAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getNowDate();
          let bianhao =
            this.nowTime + this.$store.state.user.storesInfo.storesNum;
          let params = {
            operStatus: 1,
            luggageNum: bianhao,
          };
          this.$F.merge(params, this.newCheckForm);
          this.$F.doRequest(
            this,
            "/pms/luggagedeposit/edit", //请求新增接口  
            params,
            (data) => {
              console.log(data);
              this.newCheck = false;
              this.newCheckForm = {};
              this.getDepositList();
              this.jicunClick(data.id);
            }
          );
        } else {
          return false;
        }
      });
    },

    //点击重置按钮
    resetClick(leftLuggage) {
      this.leftLuggage = {
        operStatus: "",
        startTime: "",
        endTime: "",
        guestName: "", //客户姓名
        roomNum: "",
        luggageNum: "", //领取编号
        luggageName: "", //物品名称
      };
      this.pageIndex = 1;
      this.getDepositList();
    },
    //点击查询按钮
    lookFor(leftLuggage) {
      console.log(leftLuggage);
      this.pageIndex = 1;
      this.getDepositList();
    },
    //请求寄存列表
    getDepositList(params = {}) {
      this.$F.merge(params, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        paging: true,
      });
      this.$F.merge(params, this.leftLuggage);
      this.$F.doRequest(this, "/pms/luggagedeposit/list", params, (data) => {
        this.checkTables = data.list;
        this.total = data.page.count;
      });
    },
    // 当前页
    handleCurrentChange(val) {
      this.pageSize = 10;
      this.pageIndex = val;
      this.getDepositList();
    },
    // 每页数
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDepositList();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.dialog_headBox {
  margin-top: -35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 260px;
    height: 73px;
  }
}
.responsible {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  .innerBox {
    width: 400px;
    font-weight: 600;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid black;
  }
}
.imgBox {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  img {
    width: 260px;
    height: 73px;
  }
}
</style>
