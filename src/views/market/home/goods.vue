<!--
 * @LastEditors: 魏轩
 *
 -->
<template>
    <div class="boss-index">
        <!-- 物品寄存 -->
        <div class="content">
            <el-form :model="leftLuggage" ref="leftLuggage" inline size="small" class="term">
                <el-form-item label="留言类型：" style="display: block">
                    <el-radio-group v-model="noteForm.type">
                        <el-radio-button label="0">不限</el-radio-button>
                        <el-radio-button label="1">我的留言</el-radio-button>
                        <el-radio-button label="2">他人留言</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="客户名称：">
                    <el-input v-model="noteForm.name"></el-input>
                </el-form-item>
                <el-form-item label="房间号：">
                    <el-input v-model="noteForm.room"></el-input>
                </el-form-item>
                <el-form-item label="领取编号：">
                    <el-input v-model="noteForm.num"></el-input>
                </el-form-item>
                <el-form-item label="寄放日期：">
                    <el-date-picker type="date" v-model="formInline.startTime"></el-date-picker>
                    <span class="line">至</span>
                    <el-time-picker type="date" v-model="formInline.endTime"></el-time-picker>
                </el-form-item>
                <el-form-item label="物品名称:">
                    <el-input v-model="noteForm.goodsname"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="submit" type="primary">查询</el-button>
                    <el-button class="white">重置</el-button>
                </el-form-item>
                <div>
                    <el-button class="submit" size="small" type="primary" @click="newCheck=true">新增寄存</el-button>
                </div>
            </el-form>
            <el-table :data="checkTables" border height="100%" header-row-class-name="default" size="small">
                <!--:data="tableData"  -->
                <el-table-column label="客户名称" width="80">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="房间号" width="80">
                    <template slot-scope="scope">{{scope.row.roomnum}}</template>
                </el-table-column>
                <el-table-column label="手机号" width="100">
                    <template slot-scope="scope">{{scope.row.phonenum}}</template>
                </el-table-column>
                <el-table-column label="物品名称" width="80">
                    <template slot-scope="scope">{{scope.row.goodsname}}</template>
                </el-table-column>
                <el-table-column label="寄放时间" width="120">
                    <template slot-scope="scope">{{scope.row.leavetime}}</template>
                </el-table-column>
                <el-table-column label="领取时间" width="120">
                    <template slot-scope="scope">{{scope.row.gettime}}</template>
                </el-table-column>
                <el-table-column label="领取编号" width="180">
                    <template slot-scope="scope">{{scope.row.getnum}}</template>
                </el-table-column>
                <el-table-column label="状态" width="80">
                    <template slot-scope="scope">{{scope.row.status}}</template>
                </el-table-column>
                <el-table-column label="操作人" width="80">
                    <template slot-scope="scope">{{scope.row.operator}}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary">领取</el-button>
                        <el-button size="small" type="text" @click="noteDdetail(scope.$index, scope.row),checkdetail=true">详情</el-button>
                        <el-button size="small" type="text">作废</el-button>
                        <el-button size="small" type="text" @click="checkPatch=true">寄存补打</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
        </div>
        <!-- newCheck新增寄存 -->
        <el-dialog top="0" title="新增寄存" style="text-align:left" :visible.sync="newCheck">
            <el-form ref="newCheckForm" :model="newCheckForm" label-width="80px">
                <el-col :span="8">
                    <el-form-item label="客户姓名:">
                        <el-input v-model="newCheckForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="房间号：">
                        <el-input v-model="newCheckForm.roomnum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="手机号：">
                        <el-input v-model="newCheckForm.phoennum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="物品名称:">
                        <el-input v-model="newCheckForm.goodsname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item label="备注：">
                        <el-input v-model="newCheckForm.remark"></el-input>
                    </el-form-item>
                </el-col>
                <!-- <el-form-item>
                      <el-button type="primary" @click="onSubmit">立即创建</el-button>
                      <el-button>取消</el-button>
                </el-form-item>-->
            </el-form>

            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button style="width:80px;" @click="newCheck = false">取消</el-button>
                <el-button style="width:110px;">保存并打印</el-button>
                <el-button style="width:80px;" type="primary" @click="Save">保存</el-button>
            </div>
        </el-dialog>

        <!-- 新增寄存 详情 -->
        <el-dialog top="0" title="详情" style="text-align:left" :visible.sync="checkdetail">
            <el-row style="margin:10px 20px">
                <el-col :span="12">
                    <el-col :span="12">
                        <span style="color:#888888">客户名称：</span>tom
                    </el-col>
                    <el-col :span="12">
                        <span style="color:#888888">房间号：</span>tom
                    </el-col>
                    <el-col :span="12">
                        <span style="color:#888888">电话号码：</span>tom
                    </el-col>
                    <el-col :span="12">
                        <span style="color:#888888">物品名称：</span>tom
                    </el-col>
                    <el-col :span="12">
                        <span style="color:#888888">领取编号：</span>tom
                    </el-col>
                    <el-col :span="12">
                        <span style="color:#888888">领取状态：</span>tom
                    </el-col>
                    <el-col :span="12">
                        <span style="color:#888888">寄存时间：</span>tom
                    </el-col>
                    <el-col :span="12">
                        <span style="color:#888888">领取时间：</span>tom
                    </el-col>
                    <el-col>
                        <span style="color:#888888">备注：</span>
                    </el-col>
                </el-col>
            </el-row>

            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button style="width:80px;" @click="checkdetail = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- checkPatch  寄存补打-->
        <el-dialog top="0" title="寄存补打" style="text-align:left" width="650px" :visible.sync="checkPatch">
            <el-row style="margin:10px 20px">
                <h2 style="text-align:center">大仓集团第一酒店物品寄存领取单</h2>
                <el-row style="border-bottom:1px solid #333;padding-bottom:10px;margin-bottom:10px;">
                    <label>打印时间：</label>2020-04-04 14.01
                </el-row>

                <el-row style="border-bottom:1px solid #333;padding-bottom:10px;margin-bottom:10px;">
                    <p>
                        <label>物品名称：</label>行李箱
                    </p>
                    <label>领取编号:</label>555515646465
                </el-row>
                <el-row style="margin-bottom:10px">
                    <label>寄存时间:</label>2020-04-04 14.01
                </el-row>
                <el-row style="color:red;margin-bottom:10px">请您务必保管好此票，凭此票 领取东西</el-row>
                <el-row>
                    <span>前台电话：888888</span>
                    <span>酒店地址：蜀山区</span>
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
            return {
                num: 1, total: 0,
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
                noteForm: {
                    content: "",
                    room: "",
                    staff: "",
                    value2: ""
                },
                // 物品寄存
                leftLuggage: {
                    name: "",
                    room: "",
                    num: "",
                    time: "",
                    goodsname: ""
                },
                // 新增 寄存
                newCheckForm: {
                    name: "",
                    roomnum: "",
                    phoennum: "",
                    goodsname: "",
                    remark: ""
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
                        operator: "张三"
                    }
                ],
                hosteldata: [{}],
                display: true,
                activeName: "one",
                roomStatus: {
                    dong: "", //楼栋
                    tag: "" //楼层
                },
                Oswitch: false,
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
                currentPage3: "",
                value1: "" //时间
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
            }
        }
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
