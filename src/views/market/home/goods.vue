<!--
 * @LastEditors: 魏轩
 *
 -->
<template>
  <div class="boss-index">
    <!-- 物品寄存 -->
    <div class="content">
      <el-form :model="leftLuggage" ref="leftLuggage" inline size="small" class="term">
        <el-form-item label="寄存类型：" style="display: block">
          <el-radio-group v-model="leftLuggage.operStatus  ">
            <el-radio-button label="0">不限</el-radio-button>
            <el-radio-button label="1" style="margin-left:10px">待取回</el-radio-button>
            <el-radio-button label="2" style="margin-left:10px">已取回</el-radio-button>
            <el-radio-button label="3" style="margin-left:10px">已作废</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="客户名称：">
          <el-input v-model="leftLuggage.guestName"></el-input>
        </el-form-item>
        <el-form-item label="房间号：">
          <el-input v-model="leftLuggage.roomNum"></el-input>
        </el-form-item>
        <el-form-item label="领取编号：">
          <el-input v-model="leftLuggage.luggageNum"></el-input>
        </el-form-item>
        <el-form-item label="寄放日期：">
          <el-date-picker type="date" v-model="leftLuggage.startTime"></el-date-picker>
          <span class="line">至</span>
          <el-date-picker type="date" v-model="leftLuggage.endTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="物品名称:">
          <el-input v-model="leftLuggage.luggageName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="lookFor(leftLuggage)">查询</el-button>
          <el-button class="white" @click="resetClick(leftLuggage)">重置</el-button>
        </el-form-item>
        <div>
          <el-button class="submit" size="small" type="primary" @click="newCheck=true">新增寄存</el-button>
        </div>
      </el-form>
      <el-table
        :data="checkTables"
        border
        height="100%"
        header-row-class-name="default"
        size="small"
      >
        <!--:data="tableData"  -->
        <el-table-column label="客户名称" width="80" prop="guestName"></el-table-column>
        <el-table-column label="房间号" width="80" prop="roomNum"></el-table-column>
        <el-table-column label="手机号" width="100" prop="mobile"></el-table-column>
        <el-table-column label="物品名称" width="80" prop="luggageName"></el-table-column>
        <el-table-column label="寄放时间" width="120" prop="createTime"></el-table-column>
        <el-table-column label="领取时间" width="120" prop="receiveTime"></el-table-column>
        <el-table-column label="领取编号" width="180" prop="luggageNum"></el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="{row}">
            <div v-if="row.operStatus==1">待取回</div>
            <div v-if="row.operStatus==2">已取回</div>
            <div v-if="row.operStatus==3">已作废</div>
          </template>
        </el-table-column>
        <el-table-column label="操作人" width="80">
          <template slot-scope="{row}">{{row.creatorName}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="primary" v-if="row.operStatus==1" @click="getClick(row)">领取</el-button>
            <el-button size="small" type="text" @click="noteDdetail(row)">详情</el-button>
            <el-button
              size="small"
              type="text"
              v-if="row.operStatus==1"
              @click="invalidClick(row)"
            >作废</el-button>
            <el-button
              size="small"
              type="text"
              v-if="row.operStatus==3"
              @click="cancelInvalidClick(row)"
            >取消作废</el-button>
            <el-button
              size="small"
              type="text"
              v-if="row.operStatus==2||row.operStatus==3"
              @click="deletClick(row)"
            >删除</el-button>
            <el-button
              size="small"
              type="text"
              v-if="row.operStatus==1"
              @click="jicunClick(row)"
            >寄存补打</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- newCheck新增寄存 -->
    <el-dialog top="0" title="新增寄存" style="text-align:left" :visible.sync="newCheck">
      <el-form ref="newCheckForm" :model="newCheckForm" :rules="rules" label-width="90px">
        <el-col :span="8">
          <el-form-item label="客户姓名:">
            <el-input v-model="newCheckForm.guestName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房间号：">
            <el-input v-model="newCheckForm.roomNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号：" prop="phoneNum">
            <el-input v-model="newCheckForm.mobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物品名称:" prop="luggageName">
            <el-input v-model="newCheckForm.luggageName "></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="备注：">
            <el-input v-model="newCheckForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-form>

      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button style="width:80px;" @click="newCheck = false">取消</el-button>
        <el-button style="width:110px;" v-if="1==2">保存并打印</el-button>
        <el-button style="width:80px;" type="primary" @click="saveNewAdd('newCheckForm')">保存</el-button>
      </div>
    </el-dialog>

    <!-- 新增寄存 详情 -->
    <el-dialog
      top="0"
      title="详情"
      style="text-align:left"
      v-if="checkdetail"
      :visible.sync="checkdetail"
    >
      <el-row style="margin:10px 20px">
        <el-col :span="12">
          <span style="color:#888888">客户名称：</span>
          {{itemGoodsDetail.guestName}}
        </el-col>
        <el-col :span="12">
          <span style="color:#888888">房间号：</span>
          {{itemGoodsDetail.roomNum}}
        </el-col>
        <el-col :span="12">
          <span style="color:#888888">电话号码：</span>
          {{itemGoodsDetail.mobile}}
        </el-col>
        <el-col :span="12">
          <span style="color:#888888">物品名称：</span>
          {{itemGoodsDetail.luggageName}}
        </el-col>
        <el-col :span="12">
          <span style="color:#888888">领取编号：</span>
          {{itemGoodsDetail.luggageNum}}
        </el-col>
        <el-col :span="12">
          <span style="color:#888888">领取状态：</span>
          {{itemGoodsDetail.operStatus}}
        </el-col>
        <el-col :span="12">
          <span style="color:#888888">寄存时间：</span>
          {{itemGoodsDetail.createTime}}
        </el-col>
        <el-col :span="12">
          <span style="color:#888888">领取时间：</span>
          {{itemGoodsDetail.receiveTime}}
        </el-col>
        <el-col>
          <span style="color:#888888">备注：</span>
          {{itemGoodsDetail.remark}}
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button style="width:80px;" @click="checkdetail = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- checkPatch  寄存补打-->
    <el-dialog
      top="0"
      title="寄存补打"
      style="text-align:left"
      width="650px"
      v-if="checkPatch"
      :visible.sync="checkPatch"
    >
      <el-row style="margin:10px 20px">
        <h2 style="text-align:center">{{itemJiCun.storesName}}物品寄存领取单</h2>
        <el-row style="border-bottom:1px solid #333;padding-bottom:10px;margin-bottom:10px;">
          <label>打印时间：</label>
          {{itemJiCun.printingTime}}
        </el-row>

        <el-row style="border-bottom:1px solid #333;padding-bottom:10px;margin-bottom:10px;">
          <p>
            <label>物品名称：</label>
            {{itemJiCun.luggageName}}
          </p>
          <label>领取编号:</label>
          {{itemJiCun.luggageNum}}
        </el-row>
        <el-row style="margin-bottom:10px">
          <label>寄存时间:</label>
          {{itemJiCun.createTime}}
        </el-row>
        <el-row style="color:red;margin-bottom:10px">请您务必保管好此票，凭此票 领取东西</el-row>
        <el-row>
          <span>前台电话：{{itemJiCun.receptionMobile}}</span>
          <span>酒店地址：{{itemJiCun.storesAddress}}</span>
        </el-row>
      </el-row>

      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button style="width:80px;" @click="checkPatch = false">取消</el-button>
        <el-button style="width:80px;" type="primary">打印</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value) {
        setTimeout(() => {
          let reg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
          if (!reg.test(value)) {
            return callback(new Error("请输入正确的手机号"));
          } else {
            callback();
          }
        }, 500);
      } else {
        callback();
      }
    };
    return {
      nowTime: null,
      pageIndex: 1,
      pageSize: 10,
      num: 1,
      total: 0,
      currentPage4: 1, //分页当前所在页数的位置
      rules: {
        luggageName: [
          { required: true, message: "请输入物品名称", trigger: "blur" },
        ],
        phoneNum: [{ validator: checkPhone, trigger: "blur" }],
      },
      tableData: [
        //待开票表格字段
        {
          name: "王小虎",
          roomNum: 12,
          phonenum: 1111111,
          billType: "增值税电子发票",
          invoiceTitle: "全购网络技术有限公司",
          invoiceAmount: 150,
          taxes: 0,
          billNum: 5545554,
        },
      ],
      checkdetail: false, //物品寄存dialog
      newCheck: false, //新增寄存按钮
      checkPatch: false, //寄存补打 按钮
      leftLuggage: {
        // 物品寄存

        guestName: "", //客户姓名
        roomNum: "",
        luggageNum: "", //领取编号
        receiveTime: "", //领取时间
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
  created() {
    this.getDepositList(); //请求寄存列表
  },

  methods: {
    //点击 寄存补打 按钮
    jicunClick(row) {
      let params = {
        id: row.id,
      };
      this.$F.doRequest(
        this,
        "/pms/luggagedeposit/findone", //请求新增接口  (接口有问题)
        params,
        (data) => {
          this.itemJiCun = data;
          this.checkPatch = true;
          console.log(this.itemJiCun);
        }
      );
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
      this.$confirm("确认删除该单位", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
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
                message: "操作成功",
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
    },
    //点击详情按钮
    noteDdetail(row) {
      let params = {
        id: row.id,
      };
      this.$F.doRequest(
        this,
        "/pms/luggagedeposit/findone", //请求新增接口  (接口有问题)
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
            "/pms/luggagedeposit/edit", //请求新增接口  (接口有问题)
            params,
            (data) => {
              console.log(data.message);
              this.newCheck = false;
              this.getDepositList();
            }
          );
        } else {
          console.log("小伙子，你路走窄了");
          return false;
        }
      });
    },

    //点击重置按钮
    resetClick(leftLuggage) {
      this.leftLuggage = {};
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
</style>
