
<!--

 * @LastEditors:魏轩

 *
 -->
<template>
  <div>

      <!-- 留言管理 -->
      <div>
        <el-form :model="noteForm"  ref="noteForm" label-width="100px" class="demo-ruleForm">

          <el-row>
            <label>留言类型：</label>
            <el-button>不限</el-button>
            <el-button>我的留言</el-button>
            <el-button>他人留言</el-button>
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :span="4">
              <el-form-item label="留言内容：">
                  <el-input v-model="noteForm.content" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                 <el-form-item label="房间号：">
                    <el-input v-model="noteForm.room" ></el-input>
                  </el-form-item>
            </el-col>

            <el-col :span="4">
                  <el-form-item label="留言员工：">
                    <el-input v-model="noteForm.staff" ></el-input>
                  </el-form-item>
            </el-col>
              <el-col :span="7">
                <el-form-item label="留言时间：">
                    <div class="block">
                      <!-- <span class="demonstration">留言时间：</span> -->
                      <el-date-picker
                        v-model="noteForm.value2"
                        type="daterange"
                        range-separator="至"
                      ></el-date-picker>
                    </div>
                  </el-form-item>
              </el-col>

            <el-col :span="5" style="float:right">
              <el-form-item>
                <el-button style="width:60px;" type="primary">查询</el-button>
                <el-button style="width:60px;">重置</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item style="margin-left:-100px">
                <el-button type="primary" @click="newNote=true">新增留言</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
        <div>
          <el-table :data="messageContents" style="width: 100%">
            <!--:data="tableData"  -->
            <el-table-column label="留言内容" width="500">
              <template slot-scope="scope">{{scope.row.content}}</template>
            </el-table-column>
            <el-table-column label="房间号" width="180">
              <template slot-scope="scope">{{scope.row.room}}</template>
            </el-table-column>
            <el-table-column label="留言员工" width="180">
              <template slot-scope="scope">{{scope.row.employee}}</template>
            </el-table-column>
            <el-table-column label="留言时间" width="180">
              <template slot-scope="scope">{{scope.row.time}}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  style="width:60px;"
                  type="text"
                  @click="noteDdetail(scope.$index, scope.row),notedetail=true"
                >详情</el-button>
                <el-button size="mini" type="text" @click="noteDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            ></el-pagination>
          </div>
        </div>

        <!-- 留言详情 -->
        <div>
          <el-dialog top="0" title="详情" style="text-align:left" :visible.sync="notedetail">
            <el-row>
              <el-col :span="3">房间号：</el-col><el-col :span="12">A1001</el-col>
            </el-row>
            <el-row>
              <el-col :span="3">员工留言：</el-col><el-col :span="12">张三</el-col>
            </el-row>
            <el-row>
              <el-col :span="3">留言内容：</el-col><el-col :span="12">挖空房间爱读书卡还款</el-col>
            </el-row>
            <div slot="footer" class="dialog-footer" style="text-align:center">
              <el-button style="width:80px;" type="primary" @click="notedetail = false">关闭</el-button>
            </div>
          </el-dialog>
        </div>
        <!-- 新增留言 -->
        <div>
         <el-dialog top="0" title="新增留言" style="text-align:left" :visible.sync="newNote">
           <el-form ref="noteForm" :model="noteForm" label-width="80px">
             <el-form-item label="房间号：">
               <el-input style="width:200px" v-model="noteForm.room"></el-input>
             </el-form-item>
             <el-form-item label="留言内容">
               <el-input type="textarea" style="width:500px"  v-model="noteForm.desc"></el-input>
             </el-form-item>
             <el-form-item style="text-align:center">
               <el-button style="width:80px;" type="primary" @click="noteSubmit">确定</el-button>
               <el-button style="width:80px;" @click="newNote = false">取消</el-button>
             </el-form-item>
           </el-form>
         </el-dialog>

        </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      num:1,
      currentPage4: 4,//分页当前所在页数的位置
      stayoernum:'1',//续住天数
      stayoerchecked:false,//续住  勾选
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
          billNum: 5545554
        }
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
          operator: "张三"
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
          operator: "张三"
        }
      ],
      print: false, //催押
      batch: false,
      detailsBill: false, //已开票  详情
      awaitBill: false, //待开票
      checkdetail:false,//物品寄存 详情
      editBill: false, //已开票  编辑
      newCheck:false,//新增寄存按钮
      checkPatch:false,//寄存补打 按钮
      hosteldis:false,//
      stayoer:false,//续住
      yokeplate:false,//联房
      roomchange:false,//换房
      mackcade:false,//制卡
      dirty:false,// 置脏
      formInline: {
        //待开票
        user: "",
        hostel: ""
      },
      notedetail: false, // 留言详情
      newNote: false, //新增留言按钮
      // 留言内容
      messageContents: [
        {
          content: "身份和骄傲股市的看法",
          room: "A100",
          employee: "刘洋",
          time: "2020/10/10"
        }
      ],
      // 新增留言
      noteForm: {
        room: "",
        desc: ""
      },
      billForm: {
        resource: "" //单选按钮
      },
      formLabelWidth: "120px",
      form: {
        //催押
        roomname: "",
        peoplename: "",
        phonenum: ""
      },
      // 留言管理
      noteForm:{
        content:'',
        room:'',
        staff:'',
        value2:''
      },
      // 物品寄存
      leftLuggage:{
        name:'',
        room:'',
        num:'',
        time:'',
        goodsname:''

      },
      // 新增 寄存
     newCheckForm:{
        name:'',
        roomnum:'',
        phoennum:'',
        goodsname:'',
        remark:''
     },
      // 物品寄存表格
      checkTables:[
        {
          name:"噢噢噢噢",
          roomnum:"a14",
          phonenum:111111,
          goodsname:'行李箱',
          leavetime:222,
          gettime:222,
          getnum:55555,
          status:"待领取",
          operator:'张三'
          }
      ],
      hosteldata:[
          {

          }
      ],
      display:true,
      activeName: "one",
      roomStatus: {
        dong: "", //楼栋
        tag: "" //楼层
      },
      Oswitch:false,
      input: "", //搜索框
      checked1: false,
      checked2: false,
      checked3: false,
      items: [
        {
          type: "success",
          label: "空净(20)"
        },
        {
          type: "info",
          label: "空脏(20)"
        },
        {
          type: "danger",
          label: "空脏(20)"
        },
        {
          type: "warning",
          label: "空脏(20)"
        },
        {
          type: "warning",
          label: "空脏(20)"
        }
      ],
      roomList: [
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#27ae76"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "单间",
          bgColor: "#276bba"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "单间",
          bgColor: "#b07b2e"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#c0512b"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#c0512b"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba"
        }
      ],
      checked: false,
      activeThree: "a",
      currentPage3:'',
       value1: '',//时间
      // value2: '',
      // value3: ''
    };
  },
  methods: {
     hostelmess(){
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
    Save(){
      console.log("新增寄存保存");
      this.newCheck = false
    },

    // 员工管理
     handleCommand(command) {
        // this.$message('click on item ' + command);
        if(command=='jurisdiction'){
          // alert(11111)
          this.display=!this.display;

        }
      },
      management(){
          this.display=!this.display;;
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
    }
  }
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
.duty{
  border:1px solid #1B80FF;
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
