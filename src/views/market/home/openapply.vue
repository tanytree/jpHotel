<!--

 * @LastEditors: 魏轩

 *
 -->
<template>
    <div class="boss-index">
        <div class="content">
            <el-form inline :model="formInline" size="small" class="term line demo-form-inline">
                <el-form-item label="开票时间：">
                    <el-date-picker type="date" v-model="formInline.startTime"></el-date-picker>
                    <span class="line">至</span>
                    <el-time-picker type="date" v-model="formInline.endTime"></el-time-picker>
                </el-form-item>
                <el-form-item label="客户名称：">
                    <el-input v-model="formInline.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="submit" type="primary" @click="onSubmit">查询</el-button>
                    <el-button class="white" @click="resetForm('formInline')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border height="100%" header-row-class-name="default" size="small">
                <el-table-column prop="name" label="客户名称" width="140"></el-table-column>
                <el-table-column prop="roomNum" label="房间号" width="100"></el-table-column>
                <el-table-column prop="mobile" label="电话号码" width="140"></el-table-column>
                <el-table-column prop="companyName" label="付款方公司名称" width="200"></el-table-column>
                <el-table-column prop="prices" label="金额" width="100"></el-table-column>
                <el-table-column prop="projectName" label="项目" width="180"></el-table-column>
                <el-table-column prop="invoiceTime" label="日期" width="180"></el-table-column>
                <el-table-column prop="updateTime" label="操作时间" width="180"></el-table-column>
                <el-table-column prop="updateName" label="操作人" width="130"></el-table-column>
                <el-table-column label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row),awaitBill=true">开票</el-button>
                        <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
        </div>
        <!-- 开票申请 -->
        <el-tabs style="display: none" v-model="activeThree" class="tabCenter">
            <el-tab-pane label="待开票" name="a">
                <div class="content">
                    <div style="text-align: left;margin-bottom:10px ;">
                        <span>发票类型：</span>
                        <el-button>不限</el-button>
                        <el-button>增值税专用发票</el-button>
                        <el-button>增值税普通发票</el-button>
                        <el-button>增值税电子发票</el-button>
                    </div>
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="客户名称：">
                            <el-input v-model="formInline.user"></el-input>
                        </el-form-item>
                        <el-form-item label="房间号:">
                            <el-input v-model="formInline.hostel"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="width:80px" type="primary" @click="onSubmit">查询</el-button>
                            <el-button style="width:80px" @click="resetForm('formInline')">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableData" border height="100%" header-row-class-name="default" size="small">
                        <el-table-column prop="name" label="客户名称" width="100"></el-table-column>
                        <el-table-column prop="roomNum" label="房间号" width="100"></el-table-column>
                        <el-table-column prop="phonenum" label="电话号码" width="100"></el-table-column>
                        <el-table-column prop="billType" label="发票类型" width="100"></el-table-column>
                        <el-table-column prop="invoiceTitle" label="发票抬头" width="100"></el-table-column>
                        <el-table-column prop="invoiceAmount" label="税号" width="180"></el-table-column>
                        <el-table-column prop="taxes" label="开票金额" width="180"></el-table-column>
                        <el-table-column prop="billNum" label="邮箱" width="180"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row),awaitBill=true">开票</el-button>
                                <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000"></el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已开票" name="b">
                <div class="content">
                    <div style="margin-bottom: 10px">
                        <span>发票类型：</span>
                        <el-button>不限</el-button>
                        <el-button>增值税专用发票</el-button>
                        <el-button>增值税普通发票</el-button>
                        <el-button>增值税电子发票</el-button>
                    </div>
                    <el-form class="term line demo-form-inline" size="small" :inline="true">
                            <el-form-item label="开票日期：">
                                <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="客户名称">
                                <el-input></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="submit" type="primary" @click="onSubmit">查询</el-button>
                                <el-button class="reset" @click="resetForm('formInline')">重置</el-button>
                            </el-form-item>
                    </el-form>
                    <el-table :data="tableDatas" border height="100%" header-row-class-name="default" size="small">
                        <el-table-column prop="clientName" label="客户名称" width="120"></el-table-column>
                        <el-table-column prop="roomNum" label="房间号" width="80"></el-table-column>
                        <el-table-column prop="phonenum" label="电话号码" width="120"></el-table-column>
                        <el-table-column prop="billType" label="发票类型" width="150"></el-table-column>
                        <el-table-column prop="invoiceTitle" label="发票抬头" width="150"></el-table-column>
                        <el-table-column prop="invoiceAmount" label="开票金额" width="50"></el-table-column>
                        <el-table-column prop="taxes" label="税金" width="50"></el-table-column>
                        <el-table-column prop="billNum" label="发票号码" width="100"></el-table-column>
                        <el-table-column prop="time" label="开票时间" width="100"></el-table-column>
                        <el-table-column prop="operator" label="操作人" width="80"></el-table-column>
                        <el-table-column label="操作" width="180">
                            <template slot-scope="scope">
                                <el-button size="small" type="text" @click="details(scope.$index, scope.row),detailsBill=true">详情</el-button>
                                <el-button size="small" type="text" @click="openEdit(scope.$index, scope.row),editBill=true">编辑</el-button>
                                <el-button size="small" type="text" @click="openDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000"></el-pagination>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 开票弹出框 -->
        <el-dialog title="确认开票" width="1180px" :visible.sync="awaitBill">
            <el-row style="margin:10px 20px">
                <el-form label-width="90px">
                    <!-- ref="billForm" :model="billForm"  -->
                    <el-form-item label="发票类型：">
                        <el-radio-group v-model="billForm.resource">
                            <!--   -->
                            <el-radio label="增值税专用发票"></el-radio>
                            <el-radio label="增值税普通发票"></el-radio>
                            <el-radio label="增值税电子发票"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="客户名称：">
                                <el-input disabled v-model="billList.name"></el-input>
                                <!-- v-model="billForm.name" -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="手机号：">
                                <el-input></el-input>
                                <!-- v-model="billForm.name" -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="房间号：">
                                <el-input disabled v-model="billList.roomNum"></el-input>
                                <!-- v-model="billForm.name" -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="发票抬头：">
                                <el-input></el-input>
                                <!-- v-model="billForm.name" -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="税号：">
                                <el-input></el-input>
                                <!-- v-model="billForm.name" -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开票金额：">
                                <el-input></el-input>
                                <!-- v-model="billForm.name" -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="电子邮箱：">
                                <el-input></el-input>
                                <!-- v-model="billForm.name" -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button style="width:80px;" @click="awaitBill = false">取消</el-button>
                <el-button style="width:80px;" type="primary" @click="awaitBill = false">确认</el-button>
            </div>
        </el-dialog>
        <!-- 点击详情弹出框 -->
        <el-dialog title="详情" width="1180px" :visible.sync="detailsBill">
            <el-row style="margin:10px 20px">
                <el-col :span="12">
                    <el-col :span="12" style="margin-bottom: 10px;">
                        <span style="color:#888888">客户名称：</span>tom
                    </el-col>
                    <el-col :span="12" style="margin-bottom: 10px;">
                        <span style="color:#888888">房间号:</span>tom
                    </el-col>
                    <el-col :span="12" style="margin-bottom: 10px;">
                        <span style="color:#888888">电话号码:</span>tom
                    </el-col>
                    <el-col :span="12" style="margin-bottom: 10px;">
                        <span style="color:#888888">电子邮箱:</span>tom
                    </el-col>
                    <el-col :span="12" style="margin-bottom: 10px;">
                        <span style="color:#888888">发票类型:</span>tom
                    </el-col>
                    <el-col :span="12" style="margin-bottom: 10px;">
                        <span style="color:#888888">发票号码:</span>tom
                    </el-col>
                    <el-col :span="12" style="margin-bottom: 10px;">
                        <span style="color:#888888">税号:</span>tom
                    </el-col>
                    <el-col :span="12" style="margin-bottom: 10px;">
                        <span style="color:#888888">开票金额:</span>tom
                    </el-col>
                    <el-col :span="12" style="margin-bottom: 10px;">
                        <span style="color:#888888">电子邮箱:</span>tom
                    </el-col>
                    <el-col :span="12" style="margin-bottom: 10px;">
                        <span style="color:#888888">税金:</span>tom
                    </el-col>
                    <el-col :span="12" style="margin-bottom: 10px;">
                        <span style="color:#888888">账户类型:</span>tom
                    </el-col>

                    <el-col :span="12" style="margin-bottom: 10px;">
                        <span style="color:#888888">开票时间:</span>tom
                    </el-col>
                    <el-col>
                        <span style="color:#888888">备注：</span>
                    </el-col>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button class="submit" type="primary" @click="detailsBill = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 点击编辑 -->
        <el-dialog title="编辑" width="1180px" :visible.sync="editBill">
            <el-row style="margin:10px 20px">
                <el-form ref="form" :model="form" label-width="90px">
                    <el-row>
                        <el-col :span="9">
                            <el-form-item label="客户姓名：">
                                <el-input v-model="form.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="手机号：">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="发票号码：">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="税金：">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item style="text-align:right">
                        <el-button type="primary" style="width:80px;" @click="editSubmit">确定</el-button>
                        <el-button style="width:80px;" @click="editBill = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
            <!-- <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button style="width:80px;" type="primary" @click="editBill = false">取消</el-button>

            </div>-->
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                num: 1, total: 0,
                // currentPage4: 4,//分页当前所在页数的位置
                stayoernum: '1',//续住天数
                stayoerchecked: false,//续住  勾选
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
                checkdetail: false,//物品寄存 详情
                editBill: false, //已开票  编辑
                newCheck: false,//新增寄存按钮
                checkPatch: false,//寄存补打 按钮
                hosteldis: false,//
                stayoer: false,//续住
                yokeplate: false,//联房
                roomchange: false,//换房
                mackcade: false,//制卡
                dirty: false,// 置脏
                formInline: {
                    startTime: '',
                    endTime: '',
                    name: "",
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
                    content: '',
                    room: '',
                    staff: '',
                    value2: ''
                },
                // 物品寄存
                leftLuggage: {
                    name: '',
                    room: '',
                    num: '',
                    time: '',
                    goodsname: ''

                },
                // 新增 寄存
                newCheckForm: {
                    name: '',
                    roomnum: '',
                    phoennum: '',
                    goodsname: '',
                    remark: ''
                },
                // 物品寄存表格
                checkTables: [
                    {
                        name: "噢噢噢噢",
                        roomnum: "a14",
                        phonenum: 111111,
                        goodsname: '行李箱',
                        leavetime: 222,
                        gettime: 222,
                        getnum: 55555,
                        status: "待领取",
                        operator: '张三'
                    }
                ],
                hosteldata: [
                    {}
                ],
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
                currentPage3: 1,
                value1: '',//时间
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
                this.newCheck = false
            },

            // 员工管理
            handleCommand(command) {
                // this.$message('click on item ' + command);
                if (command == 'jurisdiction') {
                    // alert(11111)
                    this.display = !this.display;

                }
            },
            management() {
                this.display = !this.display;
                ;
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
