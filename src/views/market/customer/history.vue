<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-10 16:49:40
 * @FilePath: \jiudian\src\views\market\customer\history.vue
 -->

<template>
    <!-- 统一的列表格式 -->
    <div class="boss-index">
        <div class="booking">
            <!-- 查询部分 -->
            <el-form class="term" inline size="small" label-width="80px">
                <el-form-item :label="$t('desk.customer_guestType') + ':'">
                    <el-select v-model="searchForm.guestType" class="width150">
                        <el-option
                            :label="$t('desk.home_all')"
                            value
                        ></el-option>
                        <el-option
                            v-for="(value, key, index) of $t(
                                'commons.guestType'
                            )"
                            :key="index"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('desk.customer_guestNum') + ':'">
                    <el-input
                        v-model="searchForm.guestNum"
                        class="width150"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    :label="$t('desk.home_name') + ':'"
                    label-width="50px"
                >
                    <el-input
                        v-model="searchForm.name"
                        class="width150"
                    ></el-input>
                </el-form-item>

                <el-form-item :label="$t('desk.order_moblePhone') + ':'">
                    <el-input
                        v-model="searchForm.mobile"
                        class="width150"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.customer_documentType') + ':'">
                    <el-select
                        v-model="searchForm.idcardType"
                        :placeholder="$t('commons.placeChoose')"
                        class="width300"
                    >
                        <el-option
                            :label="$t('desk.home_all')"
                            value
                        ></el-option>
                        <el-option
                            v-for="(label, value) in $t('commons.idCardType')"
                            :label="label"
                            :value="value"
                            :key="value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        class="submit"
                        @click="getDataList"
                        >{{ $t("commons.queryBtn") }}</el-button
                    >
                    <el-button type="primary" class="white" @click="initForm">{{
                        $t("commons.resetBtn")
                    }}</el-button>
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
                <el-table-column
                    prop="name"
                    align="center"
                    :label="$t('desk.home_name')"
                    width="100"
                ></el-table-column>
                <el-table-column
                    prop="sex"
                    align="center"
                    :label="$t('desk.customer_sex')"
                    width="60"
                >
                    <template slot-scope="{ row }">{{
                        row.sex | F_sex
                    }}</template>
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    :label="$t('desk.home_phoneNum')"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="idcardType"
                    align="center"
                    :label="$t('desk.customer_documentType')"
                    width="120"
                >
                    <template slot-scope="{ row }">{{
                        row.idcardType | F_idcardType
                    }}</template>
                </el-table-column>
                <el-table-column
                    prop="idcard"
                    :label="$t('desk.customer_documentNum')"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="birthday"
                    align="center"
                    :label="$t('desk.customer_brithday')"
                    width="120"
                ></el-table-column>
                <el-table-column
                    align="center"
                    :label="$t('desk.customer_guestType')"
                    width="100"
                >
                    <template slot-scope="{ row }">{{
                        F_guestType(row.guestType)
                    }}</template>
                </el-table-column>
                <el-table-column
                    prop="guestNum"
                    align="center"
                    :label="$t('desk.customer_guestNum')"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    align="center"
                    :label="$t('desk.customer_cumulative')"
                    width="100"
                >
                    <template slot-scope="{ row }">{{
                        row.consumeTotalPrice ? row.consumeTotalPrice : "0"
                    }}</template>
                </el-table-column>
                <el-table-column
                    prop
                    :label="$t('commons.operating')"
                    width="200"
                >
                    <template slot-scope="{ row }">
                        <!-- <el-button
                            type="text"
                            size="mini"
                            @click="handleHistory(row)"
                        >
                            {{ $t("desk.customer_guestHistory") }}</el-button
                        > -->
                        <el-button
                            type="text"
                            size="mini"
                            @click="handleDetail(row)"
                            >{{ $t("commons.detail") }}</el-button
                        >
                        <el-button
                            type="text"
                            size="mini"
                            @click.native="handleEdit(row)"
                            >{{ $t("commons.modify") }}</el-button
                        >
                        <!-- <el-dropdown v-if="1 == 2">
                            <span class="el-dropdown-link">
                                {{ $t("desk.customer_more") }}
                                <i
                                    class="el-icon-arrow-down el-icon--right"
                                ></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                    @click.native="handleEdit(row)"
                                    >{{
                                        $t("commons.modify")
                                    }}</el-dropdown-item
                                >
                                <el-dropdown-item
                                    v-if="!row.memberCard"
                                    @click.native="changeIntoMember(row)"
                                >
                                    {{
                                        $t("desk.customer_changeMem")
                                    }}</el-dropdown-item
                                >
                                <el-dropdown-item
                                    @click.native="handelblacklist(row)"
                                    >{{
                                        $t("desk.customer_pullBlack")
                                    }}</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </el-dropdown> -->
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 10px"></div>
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
        <!-- 编辑or详情弹窗 -->
        <el-dialog
            top="0"
            :title="
                detailForm.type == 'add'
                    ? $t('desk.customer_changeMem')
                    : $t('commons.detail')
            "
            :visible.sync="setMemberFormVisible"
            class="setMemberForm"
            width="60%"
        >
            <el-form
                :model="detailForm"
                :rules="detailForm.type == 'add' ? rules : {}"
                ref="setMemberForm"
                label-width="100px"
                size="mini"
            >
                <el-row class="row">
                    <el-row class="cell">
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('desk.home_name') + ':'"
                                class
                                prop="name"
                            >
                                <el-input
                                    v-model="detailForm.name"
                                    class="width200"
                                    v-if="detailForm.type == 'add'"
                                ></el-input>
                                <template v-else>{{
                                    detailForm.name
                                }}</template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('desk.customer_telephone') + ':'"
                                class
                                prop="mobile"
                            >
                                <el-input
                                    v-model="detailForm.mobile"
                                    class="width200"
                                    v-if="detailForm.type == 'add'"
                                ></el-input>
                                <template v-else>{{
                                    detailForm.mobile
                                }}</template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('desk.customer_documentType') + ':'"
                                class
                                prop="idcardType"
                            >
                                <el-select
                                    v-model="detailForm.idcardType"
                                    class="width200"
                                    v-if="detailForm.type == 'add'"
                                >
                                    <el-option
                                        v-for="(label, value) in $t(
                                            'commons.idCardType'
                                        )"
                                        :label="label"
                                        :value="value"
                                        :key="value"
                                    ></el-option>
                                </el-select>
                                <template v-else>{{
                                    detailForm.idcardType | F_idcardType
                                }}</template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('desk.customer_documentNum') + ':'"
                                class
                                prop="idcard"
                            >
                                <el-input
                                    v-model="detailForm.idcard"
                                    class="width200"
                                    v-if="detailForm.type == 'add'"
                                ></el-input>
                                <template v-else>{{
                                    detailForm.idcard
                                }}</template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="
                                    $t('desk.customer_guestNum') + ':'
                                "
                                class
                                prop="guestNum"
                            >
                                <el-input
                                    v-model="detailForm.guestNum"
                                    class="width200"
                                    v-if="detailForm.type == 'add'"
                                ></el-input>
                                <template v-else>{{
                                    detailForm.guestNum
                                }}</template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('desk.customer_memType') + ':'"
                                class
                                prop="memberTypeId"
                            >
                                <el-select
                                    v-model="detailForm.memberTypeId"
                                    class="width200"
                                    v-if="detailForm.type == 'add'"
                                >
                                    <el-option
                                        v-for="item in smembertypeList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                                <template v-else>{{
                                    F_memberTypeId(detailForm.memberTypeId)
                                }}</template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="cell"></el-row>
                </el-row>
                <el-divider></el-divider>
                <el-row class="row">
                    <el-row class="cell">
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('desk.customer_sex') + ':'"
                            >
                                <el-radio-group
                                    v-model="detailForm.sex"
                                    v-if="detailForm.type == 'add'"
                                >
                                    <el-radio
                                        v-for="(item, key, index) of $t(
                                            'commons.F_sex'
                                        )"
                                        :label="key"
                                        :key="index"
                                        >{{ item }}</el-radio
                                    >
                                </el-radio-group>
                                <template v-else>{{
                                    detailForm.sex | F_sex
                                }}</template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('desk.customer_brithday') + ':'"
                            >
                                <el-date-picker
                                    v-model="detailForm.birthday"
                                    value-format="yyyy-MM-dd"
                                    type="date"
                                    :placeholder="$t('desk.serve_chooseDate')"
                                    class="width200"
                                    v-if="detailForm.type == 'add'"
                                ></el-date-picker>
                                <template v-else>{{
                                    detailForm.birthday
                                }}</template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('desk.customer_email') + ':'"
                            >
                                <el-input
                                    v-model="detailForm.email"
                                    class="width200"
                                    v-if="detailForm.type == 'add'"
                                ></el-input>
                                <template v-else>{{
                                    detailForm.email
                                }}</template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="cell">
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('desk.customer_international') + ':'"
                            >
                                <el-select
                                    v-model="detailForm.nationality"
                                    class="width200"
                                    v-if="detailForm.type == 'add'"
                                >
                                    <el-option
                                        v-for="item in nationalityList"
                                        :key="item.id"
                                        :label="
                                            $i18n.locale == 'ri'
                                                ? item.jName
                                                : item.cName
                                        "
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                                <template v-else>{{
                                    F_nationality(detailForm.nationality)
                                }}</template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('desk.customer_address') + ':'"
                            >
                                <el-input
                                    v-model="detailForm.address"
                                    class="width200"
                                    v-if="detailForm.type == 'add'"
                                ></el-input>
                                <template v-else>{{
                                    detailForm.address
                                }}</template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="cell">
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('desk.customer_carNum') + ':'"
                            >
                                <el-input
                                    v-model="detailForm.carNum"
                                    class="width200"
                                    v-if="detailForm.type == 'add'"
                                ></el-input>
                                <template v-else>{{
                                    detailForm.carNum
                                }}</template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('desk.customer_hoppy') + ':'"
                            >
                                <el-input
                                    v-model="detailForm.hobby"
                                    class="width200"
                                    v-if="detailForm.type == 'add'"
                                ></el-input>
                                <template v-else>{{
                                    detailForm.hobby
                                }}</template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="cell">
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="
                                    $t('desk.customer_subordinateUnits') + ':'
                                "
                            >
                                <el-select
                                    v-model="detailForm.enterId"
                                    class="width200"
                                    v-if="detailForm.type == 'add'"
                                >
                                    <el-option
                                        v-for="item in hotelenterList"
                                        :key="item.id"
                                        :label="item.enterName"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                                <template v-else>{{
                                    F_enterId(detailForm.enterId)
                                }}</template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="col">
                            <el-form-item :label="$t('desk.home_note') + ':'">
                                <el-input
                                    type="textarea"
                                    v-model="detailForm.remark"
                                    class="width200"
                                    v-if="detailForm.type == 'add'"
                                ></el-input>
                                <template v-else>{{
                                    detailForm.remark
                                }}</template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-divider></el-divider>
                <el-row class="row">
                    <el-row class="cell">
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('desk.order_salesman') + ':'"
                            >
                                <el-select
                                    v-model="detailForm.salesId"
                                    v-if="detailForm.type == 'add'"
                                >
                                    <el-option
                                        v-for="item in salesList"
                                        :key="item.id"
                                        :label="item.userName"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                                <template v-else>{{
                                    F_salesId(detailForm.salesId)
                                }}</template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="
                                    $t('desk.customer_developmentWay') + ':'
                                "
                            >
                                <el-select
                                    v-model="detailForm.getWay"
                                    v-if="detailForm.type == 'add'"
                                >
                                    <el-option
                                        v-for="(value, key) in $t(
                                            'frontOffice.getWay'
                                        )"
                                        :label="value"
                                        :key="value"
                                        :value="key"
                                    ></el-option>
                                </el-select>
                                <template v-else>{{
                                    F_getWay(detailForm.getWay)
                                }}</template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row class="row">
                    <el-row class="cell">
                        <el-col :span="8" class="col">
                            <el-form-item
                                :label="$t('desk.customer_creditCard') + ':'"
                                prop="state"
                            >
                                <el-radio-group
                                    v-model="detailForm.state"
                                    v-if="detailForm.type == 'add'"
                                >
                                    <el-radio label="1">{{
                                        $t("desk.customer_yes")
                                    }}</el-radio>
                                    <el-radio label="2">{{
                                        $t("desk.customer_waiteUse")
                                    }}</el-radio>
                                </el-radio-group>
                                <template v-else>{{
                                    detailForm.state == 1
                                        ? $t("desk.customer_yes")
                                        : $t("desk.customer_waiteUse")
                                }}</template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
                v-if="detailForm.type == 'add'"
            >
                <el-button @click="setMemberFormVisible = false">{{
                    $t("commons.close")
                }}</el-button>
                <el-button type="primary" @click="addItem('setMemberForm')">{{
                    $t("commons.confirm")
                }}</el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="$t('desk.customer_newCusBlackName')"
            :visible.sync="setBlackShow"
            top="0"
        >
            <el-form :model="setBlackForm" ref="setBlackForm">
                <el-form-item
                    :label="$t('desk.customer_pullBlackRemark') + ':'"
                    required="true"
                >
                    <el-input
                        type="textarea"
                        v-model="setBlackForm.remark"
                        autocomplete="off"
                        style="width: 80%"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addblacklist">{{
                    $t("commons.determine")
                }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import myMixin from "@/utils/filterMixin";
export default {
    mixins: [myMixin],
    computed: {
        ...mapState({
            token: (state) => state.user.token,
            userId: (state) => state.user.userId,
            msgKey: (state) => state.config.msgKey,
            plat_source: (state) => state.config.plat_source,
        }),
    },
    data() {
        return {
            loading: false,
            showEdit: false,
            showDetail: false,
            setMemberFormVisible: false,
            searchForm: {
                guestNum:'',
               name: "",
               guestType:'',
                mobile: "",
                idcardType:'',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true,
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [], //表格数据
            storeList: [],
            nationalityList: [],
            smembertypeList: [],
            salesList: "",
            hotelenterList: "",
            detailForm: {
                name: "",
            },

            setBlackForm: {
                remark: "",
            },
            setBlackShow: false,

            currentItem: "",
        };
    },
    computed: {
        rules() {
            return {
                name: [
                    {
                        required: true,
                        message: this.$t("desk.customer_inputName"),
                        trigger: "blur",
                    },
                ],
                sex: [
                    {
                        required: true,
                        message: this.$t("desk.customer_chooseSex"),
                        trigger: "change",
                    },
                ],
                idcardType: [
                    {
                        required: true,
                        message: this.$t("desk.customer_chooseCard"),
                        trigger: "change",
                    },
                ],
                idcard: [
                    {
                        required: true,
                        message: this.$t("desk.customer_inputCardNum"),
                        trigger: "blur",
                    },
                ],
                mobile: [
                    {
                        required: true,
                        message: this.$t("desk.customer_inputPhone"),
                        trigger: "blur",
                    },
                ],
                memberCard: [
                    {
                        required: true,
                        message: this.$t("desk.customer_inputMemNum"),
                        trigger: "blur",
                    },
                ],
                memberTypeId: [
                    {
                        required: true,
                        message: this.$t("desk.customer_chooseMemType"),
                        trigger: "change",
                    },
                ],
                state: [
                    {
                        required: true,
                        message: this.$t("desk.customer_chooseIfcard"),
                        trigger: "change",
                    },
                ],
                remark: [
                    {
                        required: true,
                        message: this.$t("desk.customer_inputRemark"),
                        trigger: "blur",
                    },
                ],
                payPrices: [
                    {
                        required: true,
                        message: this.$t("desk.customer_inputPayPrice"),
                        trigger: "blur",
                    },
                ],
                payWay: [
                    {
                        required: true,
                        message: this.$t("desk.customer_choosePayType"),
                        trigger: "change",
                    },
                ],
                operType: [
                    {
                        required: true,
                        message: this.$t("desk.customer_chooseOpearType"),
                        trigger: "change",
                    },
                ],
            };
        },
    },
    mounted() {
        this.initForm();
        this.stores_list();
        this.smembertype_list();
        this.$F.commons.fetchSalesList(this.employeesForm, (data) => {
            this.salesList = data.hotelUserList;
        });
        this.hotelenter_list();
        this.nationality();
    },
    methods: {
        initForm() {
            this.searchForm = {
                guestNum:'',
                 name: "",
               guestType:'',
                mobile: "",
                idcardType:'',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true,
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.loading = true;
            this.$F.doRequest(
                this,
                 "/pms/guestarchives/guest_archives_list",
                this.searchForm,
                (res) => {
                    this.loading = false;
                    this.tableData = res.guestList;
                    console.log(this.tableData);
                    this.listTotal = res.page.count;
                }
            );
        },
        stores_list() {
            this.$F.doRequest(this, "/pms/freeuser/stores_list", {}, (data) => {
                this.storeList = data;
            });
        },
        handelblacklist(row) {
            this.setBlackForm.id = row.id;
            this.setBlackShow = true;
        },
        addblacklist() {
            if (!this.setBlackForm.remark) {
                this.$message.error(this.$t("desk.customer_inputRemark"));
                return;
            }
            this.$F.doRequest(
                this,
                "/pms/hotelmember/addblacklist",
                this.setBlackForm,
                (data) => {
                    this.setBlackShow = false;
                    this.getDataList();
                    this.$message({
                        message: "success",
                        type: "success",
                    });
                }
            );
        },
        smembertype_list() {
            this.$F.commons.fetchMemberTypeList({}, (res) => {
                this.smembertypeList = res.list;
            });
        },
        hotelenter_list() {
            let params = {
                id: "",
                enterName: "",
                state: 1,
                shareFlag: "",
                contactName: "",
                contactPhone: "",
                salesId: "",
                startCreditLimit: "",
                endCreditLimit: "",
                paging: false,
                salesFlag: 1,
                pageIndex: 1,
                pageSize: 10,
            };
            this.$F.doRequest(null, "/pms/hotelenter/list", params, (data) => {
                this.hotelenterList = data.list;
            });
        },
        nationality() {
            this.$F.commons.fetchNationality((res) => {
                this.nationalityList = res;
            });
        },

        changeIntoMember(item) {
            let data = {
                name: "",
                memberTypeId: "",
                idcardType: "",
                idcard: "",
                mobile: "",
                sex: "",
                email: "",
                salesId: "",
            };
            for (var key in item) {
                if (item[key] && typeof item[key] == "number") {
                    item[key] = item[key].toString();
                }
            }
            for (var key in data) {
                this.detailForm[key] = item[key];
            }
            this.detailForm.type = "add";
            this.setMemberFormVisible = true;
        },
        addItem(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$F.doRequest(
                        this,
                        "/pms/hotelmember/edit",
                        this.detailForm,
                        (res) => {
                            this.$message({
                                message: this.$t("commons.request_success"),
                                type: "success",
                            });
                            this.setMemberFormVisible = false;
                            this.getDataList();
                        }
                    );
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        handleDetail(item) {
            this.detailForm = item;
            this.detailForm.type = "detail";
            this.setMemberFormVisible = true;
        },
        handleHistory(item) {
            console.log(item.idcard);
            if (item.idcard) {
                this.$router.push({
                    name: "customerhistory",
                    query: {
                        idcard: item.idcard,
                    },
                });
            } else {
                this.$message(this.$t("desk.customer_noRecord"));
            }
        },
        handleEdit(item) {
            this.$router.push({
                name: "historydetail",
                query: {
                    item: item,
                },
            });
        },
        F_memberTypeId(v) {
            let that = this;
            for (let k in that.smembertypeList) {
                if (that.smembertypeList[k].id == v) {
                    return that.smembertypeList[k].name;
                }
            }
            return "";
        },
        F_storeName(v) {
            let that = this;
            for (let k in that.storeList) {
                if (that.storeList[k].storesNum == v) {
                    return that.storeList[k].storesName;
                }
            }
            return "";
        },
        F_nationality(v) {
            let that = this;
            for (let k in that.nationalityList) {
                if (that.nationalityList[k].id == v) {
                    return this.$i18n.locale == "ri"
                        ? that.nationalityList[k].jName
                        : that.nationalityList[k].cName;
                }
            }
            return "";
        },
        F_salesId(v) {
            let that = this;
            for (let k in that.salesList) {
                if (that.salesList[k].id == v) {
                    return that.salesList[k].userName;
                }
            }
            return "";
        },
        F_enterId(v) {
            let that = this;
            for (let k in that.hotelenterList) {
                if (that.hotelenterList[k].id == v) {
                    return that.hotelenterList[k].enterName;
                }
            }
            return "";
        },
        /**多选 */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /**每页数 */
        handleSizeChange(val) {
            this.searchForm.pageSize = val;
            this.searchForm.pageIndex = 1;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.pageIndex = val;
            this.getDataList();
        },
    },
};
</script>

<style lang="less" scoped>
.el-select {
    display: inline-block;
}
</style>
