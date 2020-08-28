<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-03 14:26:32
 * @FilePath: /jiudian/src/components/employee/employeeManager.vue
 -->
<template>
    <div class="sec1 boss-index">
        <el-form :model="form" :inline="true" class="top-body" size="small" label-width="100px">
            <el-form-item :label="$t('boss.loginDetail_stores')" v-if="storesNum == $F.getHQCode()">
                <el-select v-model="searchForm.storesNum">
                    <el-option :label="$t('commons.all')" value>{{$t('commons.all')}}</el-option>
                    <el-option
                        v-for="item in storeList"
                        :key="item.storesNum"
                        :label="item.storesName"
                        :value="item.storesNum"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('boss.staff_name')+':'">
                <el-input v-model="searchForm.content"></el-input>
            </el-form-item>
            <el-form-item :label="$t('boss.staff_workTime')+':'">
                <el-date-picker
                    v-model="searchForm.inStartTime"
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width:140px"
                    :placeholder="$t('commons.selectDate')"
                ></el-date-picker>
                <span style="margin:0 5px">-</span>
                <el-date-picker
                    v-model="searchForm.inEndTime"
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width:140px"
                    :placeholder="$t('commons.selectDate')"
                ></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('boss.staff_department')" v-if="!isPersonnelManager">
                <el-select
                    v-model="searchForm.departmentId"
                    :placeholder="$t('boss.staff_selectDepartment')"
                    class="width200"
                >
                    <el-option
                        v-for="item in departmentList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="getDataList(searchForm)" type="primary">{{$t('commons.queryBtn')}}</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button type="primary">{{$t('commons.downloadTemplate')}}</el-button>
                <el-button type="primary">{{$t('commons.bulkImport')}}</el-button>
                <el-button type="primary" @click="addItem">{{$t('commons.addEmployees')}}</el-button>
            </el-form-item>
        </el-form>
        <div>
            <!--表格数据 -->
            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="tableData"
                tooltip-effect="dark"
                header-row-class-name="default"
                size="medium"
            >
                <el-table-column
                    prop="storesNum"
                    :label="$t('boss.loginDetail_stores')"
                    show-overflow-tooltip
                    v-if="storesNum == $F.getHQCode()"
                >
                    <template
                        slot-scope="scope"
                        v-if="scope.row.storesNum"
                    >{{F_storeName(scope.row.storesNum)}}
                    </template>
                </el-table-column>
                <el-table-column prop="userName" :label="$t('boss.staff_theName')"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column prop="inTime" :label="$t('boss.staff_workTime')"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column prop="position" :label="$t('boss.staff_workState')" show-overflow-tooltip>
                    <template slot-scope="scope">{{$t('commons.userStatus')[scope.row.userStatus || '']}}</template>
                </el-table-column>
                <el-table-column
                    prop="position"
                    :label="$t('boss.loginDetail_position')"
                    show-overflow-tooltip
                >
                    <template slot-scope="{row}">
                        <span>{{row.position || $t('boss.loginDetail_no')}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="worknum"
                    :label="$t('boss.loginDetail_workNumber')"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="department.name"
                    :label="$t('boss.loginDetail_department')"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column :label="$t('commons.operating')" width="300">
                    <template slot-scope="{row}">
                        <el-button type="text" size="mini" @click="editItem(row)">{{$t('commons.modify')}}</el-button>
                        <el-button type="text" size="mini" @click="detailsHandle(row)">{{$t('commons.detail')}}
                        </el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click="dimissionClick(row)"
                        >{{$t('commons.forDeparture')}}
                        </el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click="becoming(row)"
                            v-if="row.userStatus!=1"
                        >{{$t('commons.positive')}}
                        </el-button>
                        <el-button type="text" size="mini" @click="deleteItem(row)">{{$t('commons.delete')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页 :current-page="searchForm.page"   :page-size="searchForm.page_num"  :total="listTotal"-->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchForm.pageIndex"
                :page-sizes="[10, 50, 100, 200]"
                :page-size="searchForm.pageSize"
                layout=" sizes, prev, pager, next, jumper"
                :total="listTotal"
            ></el-pagination>
        </div>
        <div>
            <!-- 添加员工 -->
            <el-dialog
                top="0"
                :title="addAndEditForm.employeeId?$t('commons.modify'):$t('commons.addEmployees')"
                :visible.sync="adddstaff"
                @close="addAndEditFormClose"
            >
                <el-form
                    ref="addAndEditForm"
                    :model="addAndEditForm"
                    :rules="rules"
                    :inline="true"
                    :required="true"
                    class="top-body"
                    label-width="100px"
                    size="small"
                >
                    <el-row>
                        <el-col :span="12" v-if="isPersonnelManager" class>
                            <el-form-item
                                :label="$t('boss.loginDetail_stores')"
                                prop="storesNum"
                                v-if="storesNum == $F.getHQCode()"
                            >
                                <el-select
                                    v-model="addAndEditForm.storesNum"
                                    class="width200"
                                    @change="changeStore($event)"
                                >
                                    <el-option
                                        v-for="item in storeList"
                                        :key="item.storesNum"
                                        :label="item.storesName"
                                        :value="item.storesNum"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('boss.staff_staffState')+'：'" prop="userStatus">
                                <el-radio-group v-model="addAndEditForm.userStatus">
                                    <el-radio
                                        v-for="(value, key) in $t('commons.userStatus')"
                                        :label="key"
                                        :key="key"
                                    >{{value}}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('boss.loginDetail_name')+'：'" class prop="userName">
                                <el-input
                                    class="width200"
                                    :placeholder="$t('boss.staff_inputName')"
                                    autocomplete="off"
                                    v-model="addAndEditForm.userName"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('boss.loginDetail_phone')">
                                <el-input class="width200" autocomplete="off"
                                          v-model="addAndEditForm.userPhone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('boss.loginDetail_documentType')">
                                <el-select
                                    v-model="addAndEditForm.idcardType"
                                    :placeholder="$t('boss.staff_selectType')"
                                    class="width200"
                                >
                                    <el-option
                                        v-for="(value, key) in $t('commons.idCardType')"
                                        :label="value"
                                        :value="key"
                                        :key="key"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('boss.loginDetail_documentNumber')">
                                <el-input v-model="addAndEditForm.idcard" class="width200"
                                          autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('boss.staff_department')" class prop="departmentId">
                                <el-select
                                    v-model="addAndEditForm.departmentId"
                                    :placeholder="$t('boss.staff_selectDepartment')"
                                    class="width200"
                                >
                                    <el-option
                                        v-for="item in departmentList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('boss.loginDetail_position')">
                                <el-input
                                    v-model="addAndEditForm.position"
                                    class="width200"
                                    :placeholder="$t('boss.staff_fillInPosition')"
                                    autocomplete="off"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('boss.loginDetail_workNumber')">
                                <el-input v-model="addAndEditForm.worknum" class="width200"
                                          autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('boss.loginDetail_bankAccount')">
                                <el-input v-model="addAndEditForm.bankcard" class="width200"
                                          autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('boss.loginDetail_email')">
                                <el-input v-model="addAndEditForm.email" class="width200" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('boss.loginDetail_extension')">
                                <el-input v-model="addAndEditForm.extension" class="width200"
                                          autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content">
                                <el-form-item :label="$t('boss.staff_workTime')+':'" prop="inTime">
                                    <el-date-picker
                                        v-model="addAndEditForm.inTime"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        style="width:200px"
                                        :placeholder="$t('commons.selectDate')"
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('boss.staff_relatedBackground')">
                                <el-select
                                    v-model="addAndEditForm.associatedAccount"
                                    filterable
                                    remote
                                    reserve-keyword
                                    :placeholder="$t('boss.staff_relatedBackground')"
                                    :remote-method="remoteMethod"
                                    :loading="vloading"
                                >
                                    <el-option
                                        v-for="item in options"
                                        :key="item.id"
                                        :label="item.userName + '-' + item.account"
                                        :value="item.account"
                                    ></el-option>
                                </el-select>
                                <!-- <el-input v-model="addAndEditForm.associatedAccount" class="width200" placeholder="请输入正确的后台账号" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addAndEditFormClose()">{{$t('commons.cancel')}}</el-button>
                    <el-button type="primary" @click="addAndEditPost">{{$t('commons.determine')}}</el-button>
                </div>
            </el-dialog>
        </div>

        <div>
            <!-- 办理离职 -->
            <el-dialog
                top="0"
                :title="$t('commons.forDeparture')"
                :visible.sync="dimission"
                width="500px"
                class="dimission"
                @close="dimissionClose"
            >
                <el-form>
                    <el-row>
                        <el-col>
                            <div class="grid-content">
                                <el-form-item :label="$t('boss.staff_departureTime')+'：'">
                                    <el-date-picker
                                        v-model="itemCtrlForm.outTime"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        style="width:305px"
                                        :placeholder="$t('commons.selectDate')"
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item :label="$t('boss.staff_leavingReason')">
                                <el-input style="width:305px" v-model="itemCtrlForm.outReason"
                                          autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item :label="$t('boss.staff_leavingFile')+'：'">
                                <el-input
                                    v-model="itemCtrlForm.outDataUrlShow"
                                    :placeholder="$t('boss.staff_leavingFile')"
                                    :disabled="true"
                                    style="width:300px"
                                >
                                    <template slot="append">
                                        <el-upload
                                            class="upload-demo"
                                            :action="action"
                                            :data="uploadData"
                                            :show-file-list="false"
                                            :on-success="handleSuccess"
                                            :before-upload="beforeUpload"
                                        >
                                            <el-button size="small" type="primary">{{$t('boss.staff_clickUp')}}
                                            </el-button>
                                        </el-upload>
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dimissionClose">{{$t('commons.close')}}</el-button>
                    <el-button
                        type="primary"
                        @click="dimissionPost"
                        v-loading="loading"
                    >{{$t('commons.determine')}}
                    </el-button>
                </div>
            </el-dialog>
        </div>

        <div>
            <!-- 转正 -->
            <el-dialog top="0" :title="$t('commons.positive')" :visible.sync="correct" width="500px">
                <el-form>
                    <el-row>
                        <el-col>
                            <div class="grid-content">
                                <el-form-item :label="$t('boss.staff_positiveTime')">
                                    <el-date-picker
                                        v-model="itemCtrlForm.positiveTime"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        style="width:305px"
                                        :placeholder="$t('commons.selectDate')"
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="correct = false">{{$t('commons.close')}}</el-button>
                    <el-button type="primary" @click="becomingPost">{{$t('commons.determine')}}</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 查看资料组件 -->
        <LoginDetail ref="loginDetail" :storeList="storeList"></LoginDetail>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import httpRequest from "@/utils/httpRequest";
    import LoginDetail from "@/components/employee/loginDetail";

    export default {
        components: {
            LoginDetail,
        },
        data() {
            return {
                isPersonnelManager: true,
                correct: false,
                dimission: false,
                editstaff: false,
                adddstaff: false,
                details: false,
                loading: false,
                vloading: false,
                pageIndex: 1,
                pageSize: 8,
                totalPage: 0,
                showTop: false,
                dataListLoading: false,
                dataListSelections: [],
                status: "",
                action: httpRequest.systemUrl("/pms/upload/upload_img"),
                uploadData: {
                    imgModel: 2,
                    platSource: 1005,
                },
                fileList: [],
                listTotal: 0,
                storeList: [],
                departmentList: [],
                searchForm: {},
                form: {
                    orderType: "",
                    name: "",
                    startTime: "",
                    endTime: "",
                },
                itemCtrlForm: {
                    employeeId: "",
                    operType: "",
                    positiveTime: "",
                    outTime: "",
                    outReason: "",
                    outDataUrl: "",
                    outDataUrlShow: "",
                },
                addAndEditForm: {
                    storesNum: "",
                    userStatus: "",
                    userName: "",
                    userPhone: "",
                    idcardType: "",
                    idcard: "",
                    departmentId: "",
                    position: "",
                    worknum: "",
                    bankcard: "",
                    email: "",
                    extension: "",
                    inTime: "",
                    associatedAccount: "",
                    remark: "",
                    employeeId: "",
                },
                rules: {
                    storesNum: [
                        {
                            required: true,
                            trigger: "blur",
                            message: this.selectStores,
                        },
                    ],
                    userName: [
                        {
                            required: true,
                            trigger: "blur",
                            message: this.inputStaffName,
                        },
                    ],
                    departmentId: [
                        {
                            required: true,
                            trigger: "blur",
                            message: this.selectDepartment,
                        },
                    ],
                    userStatus: [
                        {
                            required: true,
                            trigger: "blur",
                            message: this.placeSelectStaffState,
                        },
                    ],
                    inTime: [
                        {
                            required: true,
                            trigger: "blur",
                            message: this.inputWorkTime,
                        },
                    ],
                },
                options: [],
                optionsSearchForm: {
                    searchType: 1,
                    pageIndex: 1,
                    pageSize: 20,
                    paging: false,
                },
                tableData: [{}], //表格数据
            };
        },

        computed: {
            ...mapState({
                token: (state) => state.user.token,
                userId: (state) => state.user.id,
                storesNum: (state) => state.user.storesInfo.storesNum,
            }),
            selectStores: {
                get() {
                    return this.$t("boss.staff_selectStores");
                },
                set() {
                },
            },
            inputStaffName: {
                get() {
                    return this.$t("boss.staff_inputStaffName");
                },
                set() {
                },
            },
            selectDepartment: {
                get() {
                    return this.$t("boss.staff_selectDepartment");
                },
                set() {
                },
            },
            placeSelectStaffState: {
                get() {
                    return this.$t("boss.staff_placeSelectStaffState");
                },
                set() {
                },
            },
            inputWorkTime: {
                get() {
                    return this.$t("boss.staff_inputWorkTime");
                },
                set() {
                },
            },
            unknown: {
                get() {
                    return this.$t("boss.loginDetail_unknownStores");
                },
                set() {
                },
            },
            alertTitle: {
                get() {
                    return this.$t("boss.loginDetail_alertTitle");
                },
                set() {
                },
            },
            sureDelete: {
                get() {
                    return this.$t("boss.staff_sureDelete");
                },
                set() {
                },
            },
            determine: {
                get() {
                    return this.$t("commons.determine");
                },
                set() {
                },
            },
            cancel: {
                get() {
                    return this.$t("commons.cancel");
                },
                set() {
                },
            },
            selectPositiveTime: {
                get() {
                    return this.$t("boss.staff_selectPositiveTime");
                },
                set() {
                },
            },
            selectLeavingTime: {
                get() {
                    return this.$t("boss.staff_selectLeavingTime");
                },
                set() {
                },
            },
            selectLeavingReson: {
                get() {
                    return this.$t("boss.staff_selectLeavingReson");
                },
                set() {
                },
            },
            selectLeavingFile: {
                get() {
                    return this.$t("boss.staff_selectLeavingFile");
                },
                set() {
                },
            },
            fileLimit: {
                get() {
                    return this.$t("boss.staff_fileLimit");
                },
                set() {
                },
            },
        },
        watch: {
            selectStores(newValue, oldValue) {
                this.selectStores = newValue;
            },
            inputStaffName(newValue, oldValue) {
                this.inputStaffName = newValue;
            },
            selectDepartment(newValue, oldValue) {
                this.selectDepartment = newValue;
            },
            placeSelectStaffState(newValue, oldValue) {
                this.placeSelectStaffState = newValue;
            },
            inputWorkTime(newValue, oldValue) {
                this.inputWorkTime = newValue;
            },
            unknown(newValue, oldValue) {
                this.unknown = newValue;
            },
            alertTitle(newValue, oldValue) {
                this.alertTitle = newValue;
            },
            sureDelete(newValue, oldValue) {
                this.sureDelete = newValue;
            },
            determine(newValue, oldValue) {
                this.determine = newValue;
            },
            cancel(newValue, oldValue) {
                this.cancel = newValue;
            },
            selectPositiveTime(newValue, oldValue) {
                this.selectPositiveTime = newValue;
            },
            selectLeavingTime(newValue, oldValue) {
                this.selectLeavingTime = newValue;
            },
            selectLeavingReson(newValue, oldValue) {
                this.selectLeavingReson = newValue;
            },
            selectLeavingFile(newValue, oldValue) {
                this.selectLeavingFile = newValue;
            },
            fileLimit(newValue, oldValue) {
                this.fileLimit = newValue;
            },
        },
        mounted() {
            if (this.$route.name == "employeeList") {
                this.isPersonnelManager = true;
            } else {
                this.isPersonnelManager = false;
            }
            this.uploadData.userId = this.userId;
            this.uploadData.accessToken = this.token;
            this.uploadData.token = this.token;
            this.uploadData.storesNum = this.storesNum;
            if (this.storesNum == this.$F.getHQCode()) {
                this.$F.doRequest(
                    this,
                    "/pms/freeuser/stores_list",
                    {
                        filterHeader: true,
                    },
                    (data) => {
                        this.storeList = data;
                    }
                );
            }
            this.initForm();
            this.department_list();
        },
        methods: {
            initForm() {
                this.searchForm = {
                    workingState: 2, //工作状态  1离职  2在职  int选填
                    storesNum: "",
                    content: "",
                    departmentId: "",
                    inStartTime: "",
                    inEndTime: "",
                    paging: true,
                    pageIndex: 1, //当前页
                    pageSize: 10, //页数
                };
                this.getDataList();
            },
            department_list(storesNum = this.storesNum) {
                this.$F.doRequest(
                    null,
                    "/pms/department/department_list",
                    {storesNum: storesNum},
                    (res) => {
                        this.departmentList = res;
                        this.$forceUpdate();
                    }
                );
            },
            getDataList() {
                if (this.storesNum != this.$F.getHQCode())
                    this.searchForm.storesNum = this.storesNum;
                this.$F.doRequest(
                    this,
                    "/pms/employee/employee_list",
                    this.searchForm,
                    (res) => {
                        this.tableData = res.employeesList;
                        this.listTotal = res.page.count;
                        this.$forceUpdate();
                    }
                );
            },
            F_storeName(v) {
                let that = this;
                for (let k in that.storeList) {
                    if (that.storeList[k].storesNum == v) {
                        return that.storeList[k].storesName;
                    }
                }
                return this.unknown;
            },
            deleteItem(item) {
                let params = {
                    employeeId: item.id,
                    operType: 3,
                };
                this.$confirm(this.sureDelete, this.alertTitle, {
                    confirmButtonText: this.determine,
                    cancelButtonText: this.cancel,
                    type: "warning",
                })
                    .then(() => {
                        this.itemCtrlHandle(params);
                    })
                    .catch(() => {
                    });
            },
            becoming(item) {
                this.itemCtrlForm.employeeId = item.id;
                this.itemCtrlForm.operType = 1;
                this.itemCtrlForm.positiveTime = "";
                this.correct = true;
            },
            becomingPost() {
                let params = {
                    employeeId: this.itemCtrlForm.employeeId,
                    operType: this.itemCtrlForm.operType,
                    positiveTime: this.itemCtrlForm.positiveTime,
                };
                if (!this.itemCtrlForm.positiveTime) {
                    this.$message.error(this.selectPositiveTime);
                    return;
                }
                this.itemCtrlHandle(params);
            },
            dimissionClick(item) {
                this.itemCtrlForm.employeeId = item.id;
                this.itemCtrlForm.operType = 2;
                this.dimission = true;
            },

            dimissionClose() {
                this.itemCtrlForm = {
                    employeeId: "",
                    operType: "",
                    positiveTime: "",
                    outTime: "",
                    outReason: "",
                    outDataUrl: "",
                    outDataUrlShow: "",
                };
                this.dimission = false;
            },
            dimissionPost() {
                let params = {
                    employeeId: this.itemCtrlForm.employeeId,
                    operType: this.itemCtrlForm.operType,
                    outTime: this.itemCtrlForm.outTime,
                    outReason: this.itemCtrlForm.outReason,
                    outDataUrl: this.itemCtrlForm.outDataUrl,
                };
                if (!this.itemCtrlForm.outTime) {
                    this.$message.error(this.selectLeavingTime);
                    return;
                }
                if (!this.itemCtrlForm.outReason) {
                    this.$message.error(this.selectLeavingReson);
                    return;
                }
                if (!this.itemCtrlForm.outDataUrl) {
                    this.$message.error(this.selectLeavingFile);
                    return;
                }
                this.itemCtrlHandle(params);
            },
            itemCtrlHandle(params) {
                this.$F.doRequest(this, "/pms/employee/oper_employee", params, (res) => {
                    this.getDataList();
                    this.dimission = false;
                    this.dimissionClose();
                    this.correct = false;
                    this.$forceUpdate();
                });
            },

            addAndEditFormClose() {
                this.$refs["addAndEditForm"].resetFields();
                this.adddstaff = false;
            },

            addAndEditPost() {
                this.$refs.addAndEditForm.validate((valid) => {
                    if (valid) {
                        this.$F.doRequest(
                            this,
                            "/pms/employee/edit_employee",
                            this.addAndEditForm,
                            (res) => {
                                this.getDataList();
                                this.addAndEditFormClose();
                                this.$forceUpdate();
                            }
                        );
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            getDetails(item) {
                item = this.$F.deepClone(item);
                this.$F.formatJsonNumberToString(item);
                this.addAndEditForm = item;
                this.addAndEditForm.employeeId = item.id;
                // let params = {
                //     employeeId: item.id,
                //     account: item.associatedAccount
                // }
                // this.$F.doRequest(this, '/pms/employee/detail_employee', params, (res) => {
                //     this.$F.formatJsonNumberToString(res);
                //     this.addAndEditForm = res
                //     this.addAndEditForm.userStatus = this.addAndEditForm.userStatus.toString();
                //     this.addAndEditForm.employeeId = res.id
                //     this.$forceUpdate();
                // })
            },
            detailsHandle(item) {
                this.$refs.loginDetail.getDetails(item.associatedAccount, item.id, item);
            },

            editItem(item) {
                this.getDetails(item);
                setTimeout(() => {
                    this.adddstaff = true;
                }, 300);
            },
            addItem() {
                for (let k in this.addAndEditForm) {
                    this.addAndEditForm[k] = "";
                }
                this.addAndEditForm.userStatus = "1";
                this.addAndEditForm.storesNum = this.storesNum;
                this.adddstaff = true;
            },
            changeStore(v) {
                this.department_list(v);
                this.addAndEditForm.associatedAccount = "";
                this.addAndEditForm.departmentId = "";
                this.options = [];
                this.optionsSearchForm.storesNum = v;
            },
            remoteMethod(content) {
                if (content !== "") {
                    this.optionsSearchForm.content = content;
                    if (!this.optionsSearchForm.storesNum)
                        this.optionsSearchForm.storesNum = this.storesNum;
                    this.vloading = true;
                    this.$F.commons.fetchSalesList(this.optionsSearchForm, (data) => {
                        this.vloading = false;
                        this.options = res.hotelUserList;
                    });
                } else {
                    this.options = [];
                }
            },
            /**每页数 */
            handleSizeChange(val) {
                this.searchForm.pageSize = val;
                this.searchForm.pageIndex = 1;
                this.getDataList();
                console.log(11111);
            },
            /**当前页 */
            handleCurrentChange(val) {
                this.searchForm.pageIndex = val;
                this.getDataList();
                console.log(222);
            },
            handleSuccess(res, file) {
                this.itemCtrlForm.outDataUrl = res.data;
                this.itemCtrlForm.outDataUrlShow = file.name;
            },
            changeHandleSuccess(res, file) {
                this.itemCtrlForm.outDataUrl = res.data;
                this.itemCtrlForm.outDataUrlShow = file.name;
            },
            beforeUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 8;
                if (!isLt2M) {
                    this.$message.error(this.fileLimit);
                }
                return isLt2M;
            },
        },
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
        background-color: #f2f2f2;
        padding: 10px;
        border-radius: 5px;
        background-color: rgba(250, 250, 250, 1);
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
</style>
<style scoped>
    .dimission >>> .el-upload {
        overflow: initial;
        outline: none;
    }

    .dimission >>> .el-upload-list {
        display: none;
    }
</style>
