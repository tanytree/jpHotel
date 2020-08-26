
<!--

 * @LastEditors: 魏轩1

 *
 -->
<template>
  <div>
    <!-- 员工管理 -->

    <div v-if="display">
      <h4>前台部</h4>
      <el-divider></el-divider>
      <span>
        <el-avatar
          style="vertical-align: middle;"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <label style="margin:0 10px">张鑫</label>
        <span class="duty">部门负责人</span>
      </span>
      <el-dropdown @command="handleCommand" style="float:right">
        <span class="el-dropdown-link">
          操作
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="checkData">查看资料</el-dropdown-item>
          <el-dropdown-item command="jurisdiction">权限设置</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-divider></el-divider>
    </div>

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" v-if="!display">
        <!--  v-if="!display" -->
        <el-breadcrumb-item>
          <span @click="management()" style="cursor: pointer;">员工管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>权限设置</el-breadcrumb-item>
        <el-divider></el-divider>
        <div>
          <span>
            <el-avatar
              style="vertical-align: middle;"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <label style="margin:0 10px">张鑫</label>
            <el-divider></el-divider>
          </span>
        </div>

        <el-row style="margin-left:10px">
          <div>
            <span style="font-size:18px">具体权限设置(前台部)</span>
            <span style="margin-left:20px">开启后就有该项权限</span>
            <!-- 首页 -->
            <el-row style="margin-top:30px">
              <span>首页</span>
              <el-checkbox style="margin-left:30px">全部开启</el-checkbox>
              <!--  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" -->
              <div style="margin-top:10px;">
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>实时房态</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>开票申请</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>留言管理</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>物品寄存</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
              </div>
            </el-row>
            <!-- 客房中心 -->
            <el-row style="margin-top:30px">
              <span>客房中心</span>
              <el-checkbox style="margin-left:30px">全部开启</el-checkbox>
              <!--  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" -->
              <div style="margin-top:10px;">
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>实时房态</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>开票申请</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>留言管理</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>物品寄存</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
              </div>
            </el-row>
            <!-- 预订管理 -->
            <el-row style="margin-top:30px">
              <span>预订管理</span>
              <el-checkbox style="margin-left:30px">全部开启</el-checkbox>
              <!--  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" -->
              <div style="margin-top:10px;">
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>实时房态</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>开票申请</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
              </div>
            </el-row>

            <!-- 订单管理 -->
            <el-row style="margin-top:30px">
              <span>订单管理</span>
              <el-checkbox style="margin-left:30px">全部开启</el-checkbox>
              <!--  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" -->
              <div style="margin-top:10px;">
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>实时房态</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>开票申请</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
              </div>
            </el-row>

            <!-- 预订管理 -->
            <el-row style="margin-top:30px">
              <span>预订管理</span>
              <el-checkbox style="margin-left:30px">全部开启</el-checkbox>
              <!--  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" -->
              <div style="margin-top:10px;">
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>实时房态</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>开票申请</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
              </div>
            </el-row>

            <!-- 客户管理 -->
            <el-row style="margin-top:30px">
              <span>客户管理</span>
              <el-checkbox style="margin-left:30px">全部开启</el-checkbox>
              <!--  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" -->
              <div style="margin-top:10px;">
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>会员管理</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>客史档案</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>单位管理</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
              </div>
            </el-row>

            <!-- 夜审 -->
            <el-row style="margin-top:30px">
              <span>夜审</span>
              <el-checkbox style="margin-left:30px">全部开启</el-checkbox>
              <!--  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" -->
              <div style="margin-top:10px;">
                <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                  <i class="el-icon-more"></i>
                  <span>夜审</span>
                  <el-switch style="margin-left:170px" v-model="Oswitch"></el-switch>
                </el-col>
              </div>
            </el-row>
          </div>
        </el-row>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      currentPage4: 4, //分页当前所在页数的位置
      stayoernum: "1", //续住天数
      stayoerchecked: false, //续住  勾选
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
      billList: [], //点击开票按钮的数据
      tableDatas: [
        //已开票表格
        {
          clientName: "tom",
          roomNum: 12,
          phonenum: 1111111,
          billType: "增值税电子发票",
          invoiceTitle: "全购网络技术有限公司",
          invoiceAmount: 150,
          taxes: 0,
          billNum: 5545554,
          time: "2020/1/10",
          operator: "张三",
        },
        {
          clientName: "tom",
          roomNum: 12,
          phonenum: 1111111,
          billType: "增值税电子发票",
          invoiceTitle: "全购网络技术有限公司",
          invoiceAmount: 150,
          taxes: 0,
          billNum: 5545554,
          time: "2020/1/10",
          operator: "张三",
        },
      ],
      print: false, //催押
      batch: false,
      detailsBill: false, //已开票  详情
      awaitBill: false, //待开票
      checkdetail: false, //物品寄存 详情
      editBill: false, //已开票  编辑
      newCheck: false, //新增寄存按钮
      checkPatch: false, //寄存补打 按钮
      hosteldis: false, //
      stayoer: false, //续住
      yokeplate: false, //联房
      roomchange: false, //换房
      mackcade: false, //制卡
      dirty: false, // 置脏
      formInline: {
        //待开票
        user: "",
        hostel: "",
      },
      notedetail: false, // 留言详情
      newNote: false, //新增留言按钮
      // 留言内容
      messageContents: [
        {
          content: "身份和骄傲股市的看法",
          room: "A100",
          employee: "刘洋",
          time: "2020/10/10",
        },
      ],
      // 新增留言
      noteForm: {
        room: "",
        desc: "",
      },
      billForm: {
        resource: "", //单选按钮
      },
      formLabelWidth: "120px",
      form: {
        //催押
        roomname: "",
        peoplename: "",
        phonenum: "",
      },
      // 留言管理
      noteForm: {
        content: "",
        room: "",
        staff: "",
        value2: "",
      },
      // 物品寄存
      leftLuggage: {
        name: "",
        room: "",
        num: "",
        time: "",
        goodsname: "",
      },
      // 新增 寄存
      newCheckForm: {
        name: "",
        roomnum: "",
        phoennum: "",
        goodsname: "",
        remark: "",
      },
      // 物品寄存表格
      checkTables: [
        {
          name: "噢噢噢噢",
          roomnum: "a14",
          phonenum: 111111,
          goodsname: "行李箱",
          leavetime: 222,
          gettime: 222,
          getnum: 55555,
          status: "待领取",
          operator: "张三",
        },
      ],
      hosteldata: [{}],
      display: true,
      activeName: "one",
      roomStatus: {
        dong: "", //楼栋
        tag: "", //楼层
      },
      Oswitch: false,
      input: "", //搜索框
      checked1: false,
      checked2: false,
      checked3: false,
      items: [
        {
          type: "success",
          label: "空净(20)",
        },
        {
          type: "info",
          label: "空脏(20)",
        },
        {
          type: "danger",
          label: "空脏(20)",
        },
        {
          type: "warning",
          label: "空脏(20)",
        },
        {
          type: "warning",
          label: "空脏(20)",
        },
      ],
      roomList: [
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#27ae76",
        },
        {
          hao: "A001",
          status: 1,
          status_name: "单间",
          bgColor: "#276bba",
        },
        {
          hao: "A001",
          status: 1,
          status_name: "单间",
          bgColor: "#b07b2e",
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba",
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#c0512b",
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba",
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba",
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba",
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#c0512b",
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba",
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba",
        },
      ],
      checked: false,
      activeThree: "a",
      currentPage3: "",
      value1: "", //时间
      // value2: '',
      // value3: ''
    };
  },
  methods: {
    hostelmess() {
      this.hosteldis = true;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 待开票
    handleEdit(index, row) {
      // console.log(index, row);
      this.billList = row;
      console.log(this.billList, 11111);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 已开票
    details(index, row) {
      // console.log(index, row.time);
      console.log(row, 1111);
    },
    openEdit(index, row) {
      console.log(index, row);
    },
    openDelete(index, row) {
      console.log(index, row);
    },
    editSubmit() {
      console.log(111);
    },
    // 账单详情
    Edit() {
      console.log("submit!");
    },
    // 留言详情
    noteDdetail(index, row) {
      console.log(index, row);
    },
    // 留言删除
    noteDelete(index, row) {
      console.log(index, row);
    },
    // 新增留言
    noteSubmit() {
      console.log("新增留言");
      this.newNote = false;
    },
    // 新增寄存
    Save() {
      console.log("新增寄存保存");
      this.newCheck = false;
    },

    // 员工管理
    handleCommand(command) {
      // this.$message('click on item ' + command);
      if (command == "jurisdiction") {
        // alert(11111)
        this.display = !this.display;
      }
    },
    management() {
      this.display = !this.display;
    },
    // 查询按钮
    onSubmit() {
      console.log("submit!");
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 催交重置
    resetForms(formNames) {
      this.$refs[formNames].resetFields();
    },
    // 批量置脏/置净
    resetbatch(formbatch) {
      this.$refs[formbatch].resetFields();
    },
    // 批量置脏/置净
    batchForm() {
      console.log("批量置脏/置净");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-dialog__header {
  background-color: #c8d8f1 !important;
}
.card {
  border: 1px solid #ccc;
  margin: 0 5px;
  line-height: 30px;
  font-size: 14px;
  border-radius: 4px;
  padding: 3px;
}
.inco {
  border: 1px solid #333;
  background: #666;
  color: #fff;
}
.search {
  width: 137px !important;
  height: 30px !important;
  line-height: 30px !important;
}
.fangtai {
  left: 180px;
  top: 300px;
  width: 36px;
  height: 25px;
  color: rgba(30, 30, 30, 1);
  // font-size: 18px;
  text-align: left;
  font-family: PingFangSC-Regular;
}
.all {
  // left: 230px;
  // top: 303px;
  margin-left: 10px;
  width: 51px;
  height: 20px;
  color: rgba(153, 153, 153, 1);
  font-size: 12px;
  text-align: left;
  font-family: PingFangSC-Regular;
}
.duty {
  border: 1px solid #1b80ff;
  font-size: 12px;
  padding: 3px 10px;
}
.rescet {
  border-radius: 0;
  width: 28px;
  height: 20px;
  color: rgba(153, 153, 153, 1);
  font-size: 12px;
  text-align: left;
  border: 1px solid #ccc;
  font-family: PingFangSC-Regular;
  float: right;
}
.el-checkbox.is-bordered {
  border: none;
}

.tag-width {
  width: 80px;
  display: flex;
  justify-content: center;
}

.tag-margin {
  margin-right: 8px;
  margin-top: 8px;
}

.row-width {
  width: 100px;
}

.font {
  font-size: 13px;
}

.tag-top {
  margin-top: 10px;
}

.tag-group {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  margin-top: 10px;
}

.box-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: auto;
  padding: 10px 20px;
}

.fix-circle {
  height: 45px;
  width: 45px;
  position: absolute;
  bottom: -20px;
  right: -20px;
}

// 下拉标题
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

// ========
.second-body {
  .title {
    border-bottom: 1px solid #e4e7ed;
    span {
      display: flex;
      padding: 15px 0px;
      font-weight: bolder;
    }
  }
  .row-body {
    .row-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0px;
      border-bottom: 1px solid #e5e5e5;
      .row-item {
        display: flex;
        align-items: center;
        font-size: 12px;
        .row-img {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          background-color: #f2f2f2;
        }
        .default-text {
          padding: 0px 15px;
        }
        .active-facus {
          border: 1px solid #126eff;
          padding: 3px 15px;
          border-radius: 5px;
          color: #126eff;
        }
      }
    }
  }
}
</style>
