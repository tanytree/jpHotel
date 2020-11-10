 <!-- 前台部 > 客户管理 > 会员管理 > 会员信息管理 -->
<template>
    <!-- 统一的列表格式 -->
    <div class="boss-index">
        <div class="booking" v-if="showPageType == 'main'">
            <!-- 查询部分 -->
            <el-form class="term" inline size="small" label-width="80px">
                <el-form-item :label="$t('desk.customer_memType')">
                    <el-select v-model="searchForm.memberTypeId" class="width150">
                        <el-option :label="$t('desk.home_all')" value></el-option>
                        <el-option v-for="item in smembertypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('desk.order_moblePhone')">
                    <el-input
                        v-model="searchForm.mobile"
                        class="width150"
                    ></el-input>
                </el-form-item>
                <!--                <el-form-item :label="$t('desk.customer_ifCancellation')">-->
                <!--                    <el-select v-model="searchForm.status" class="width150">-->
                <!--                        <el-option-->
                <!--                            :label="$t('desk.home_all')"-->
                <!--                            value-->
                <!--                        ></el-option>-->
                <!--                        <el-option-->
                <!--                            :label="$t('desk.customer_normal')"-->
                <!--                            value="1"-->
                <!--                        ></el-option>-->
                <!--                        <el-option-->
                <!--                            :label="$t('desk.customer_haveCancellation')"-->
                <!--                            value="2"-->
                <!--                        ></el-option>-->
                <!--                    </el-select>-->
                <!--                </el-form-item>-->
                <el-form-item :label="$t('desk.customer_cardNum')">
                    <el-input
                        v-model="searchForm.memberCard"
                        class="width150"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.home_name')">
                    <el-input
                        v-model="searchForm.name"
                        class="width150"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.home_state')">
                    <el-select v-model="searchForm.state" class="width150">
                        <el-option :label="$t('desk.home_all')" value></el-option>
                        <el-option v-for="(label, value) in $t('frontOffice.state')" :label="label" :value="value" :key="value"></el-option>
                    </el-select>
                </el-form-item>
                <!--                <el-form-item :label="$t('desk.customer_isBlack')">-->
                <!--                    <el-select-->
                <!--                        v-model="searchForm.isBlacklist"-->
                <!--                        class="width150"-->
                <!--                    >-->
                <!--                        <el-option-->
                <!--                            :label="$t('desk.home_all')"-->
                <!--                            value-->
                <!--                        ></el-option>-->
                <!--                        <el-option-->
                <!--                            v-for="(label, value) in $t(-->
                <!--                                'frontOffice.isBlacklist'-->
                <!--                            )"-->
                <!--                            :label="label"-->
                <!--                            :value="value"-->
                <!--                            :key="value"-->
                <!--                        ></el-option>-->
                <!--                    </el-select>-->
                <!--                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" class="submit" @click="getDataList">{{ $t("commons.queryBtn") }}</el-button>
                    <el-button type="primary" class="submit" @click="initForm">{{ $t("commons.resetBtn") }}</el-button>
                </el-form-item>
                <el-row>
                    <el-form-item>
<!--                        <el-button plain>{{ $t("desk.customer_readMemCard") }}</el-button>-->
                        <el-button v-if="type == 'header'" type="primary" class="submit" @click="handleAdd">{{ $t("desk.customer_addMem") }}</el-button>
                    </el-form-item>
                </el-row>
            </el-form>

            <!--表格数据 -->
            <el-table ref="multipleTable" v-loading="loading" :data="tableData" height="100%" header-row-class-name="default" size="small">
                <el-table-column prop="memberCard" :label="$t('desk.customer_cardNum')" show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" :label="$t('desk.home_name')"></el-table-column>
                <el-table-column :label="$t('desk.customer_memType')" >
                    <template slot-scope="{ row }">{{
                        F_memberTypeId(row.memberTypeId)
                    }}</template>
                </el-table-column>
                <el-table-column prop="mobile" :label="$t('desk.order_moblePhone')"></el-table-column>
<!--                <el-table-column prop="score" :label="$t('desk.customer_remainPoints')" width="100"></el-table-column>-->
                <el-table-column prop="state" :label="$t('desk.home_state')">
                    <template slot-scope="{ row }">{{
                        row.state | F_cardState
                    }}</template>
                </el-table-column>
<!--                <el-table-column prop="storesNum" :label="$t('desk.customer_openCarmen')">-->
<!--                    <template slot-scope="{ row }">{{-->
<!--                        F_storeName(row.storesNum)-->
<!--                    }}</template>-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="getWay" align="center" :label="$t('desk.customer_developmentWay')" width="100">-->
<!--                    <template slot-scope="{ row }">-->
<!--                        {{ row.getWay == 1 ? $t("desk.customer_online") : $t("desk.customer_offline") }}-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column prop="createTime" :label="$t('desk.customer_openCardDate')"></el-table-column>
<!--                <el-table-column prop="isBlacklist" align="center" :label="$t('desk.customer_ifBalckName')" width="100">-->
<!--                    <template slot-scope="{ row }">-->
<!--                        {{ row.isBlacklist == 2 ? $t("desk.customer_yes") : $t("desk.customer_no") }}-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="isBlacklist" align="center" :label="$t('desk.customer_ifCancellation')" width="100">-->
<!--                    <template slot-scope="{ row }">-->
<!--                        {{ row.status == 1 ? $t("desk.customer_no") : $t("desk.customer_yes") }}-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column :label="$t('commons.operating')">
                    <template slot-scope="{ row }">
                        <el-button type="text" size="mini" @click="handleDetail(row)">{{ $t("commons.detail") }}</el-button>
                        <el-button type="text" size="mini" @click="handleEdit(row)" v-if="row.state != 2">{{ $t("commons.modify") }}</el-button>
                        <el-button type="text" size="mini" @click="handleRecovery(row)" v-if="row.state == 2">{{ $t("desk.customer_restore") }}</el-button>
                        <el-button type="text" size="mini" @click="handleHistory(row)"> {{ $t("desk.customer_guestHistory") }}</el-button
                        >
                        <!--                        <el-dropdown style="margin-left: 10px; font-size: 12px">-->
                        <!--                            <span class="el-dropdown-link">-->
                        <!--                                {{ $t("desk.customer_more") }}-->
                        <!--                                <i-->
                        <!--                                    class="el-icon-arrow-down el-icon&#45;&#45;right"-->
                        <!--                                ></i>-->
                        <!--                            </span>-->
                        <!--                            <el-dropdown-menu slot="dropdown">-->
                        <!--                                <el-dropdown-item-->
                        <!--                                    @click.native="chargeCard(row)"-->
                        <!--                                    >{{-->
                        <!--                                        $t("desk.customer_getCardPri")-->
                        <!--                                    }}</el-dropdown-item-->
                        <!--                                >-->
                        <!--                                <el-dropdown-item-->
                        <!--                                    @click.native="handelblacklist(row)"-->
                        <!--                                    v-if="row.isBlacklist != 2"-->
                        <!--                                    >{{-->
                        <!--                                        $t("desk.customer_pullBlack")-->
                        <!--                                    }}</el-dropdown-item-->
                        <!--                                >-->
                        <!--                            </el-dropdown-menu>-->
                        <!--                        </el-dropdown>-->
                    </template>
                </el-table-column>
            </el-table>
            <!--分页 -->
            <div class="block">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="searchForm.pageIndex"
                    :page-size="searchForm.pageSize"
                    :total="listTotal"
                    layout="total, prev, pager, next, jumper"
                ></el-pagination>
            </div>
        </div>
        <!-- 编辑or详情弹窗 -->
        <el-dialog :title="$t('desk.customer_newCusBlackName')" :visible.sync="setBlackShow" top="0">
            <el-form :model="setBlackForm" ref="setBlackForm">
                <el-form-item :label="$t('desk.customer_pullBlackRemark') + ':'" prop="blackRemark">
                    <el-input type="textarea" v-model="setBlackForm.remark" autocomplete="off" style="width: 80%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addblacklist">{{ $t("commons.determine") }}</el-button>
            </div>
        </el-dialog>
        <!-- 补收卡费弹框 -->
        <el-dialog top="0" :title="$t('desk.customer_chargeCard')" :visible.sync="setCardVisible" width="470px">
            <div class="dialogDiv" v-if="dialogInfo">
                <span>{{ $t("desk.customer_cardNum") + ":" }}{{ dialogInfo.memberCard }}</span>
                <span>{{ $t("desk.home_name") + ":" }}{{ dialogInfo.name }}</span>
                <span>{{ $t("desk.customer_memType") + ":" }}{{ F_memberTypeId(dialogInfo.memberTypeId) }}</span>
            </div>
            <el-form :model="cardForm" ref="cardForm">
                <el-form-item :label="$t('desk.customer_chargeType')" class prop="memberTypeId">
                    <el-radio-group v-model="cardForm.operType">
                        <el-radio :label="4">{{ $t("desk.customer_cardPri") }}</el-radio>
                        <el-radio :label="5">{{ $t("desk.customer_upgradeCard") }}</el-radio>
                        <el-radio :label="6">{{ $t("desk.customer_cardCost") }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('desk.customer_payType')" class prop="payWay">
                    <el-select v-model="cardForm.payWay" style="width: 300px">
                        <el-option :label="$t('desk.serve_cash')" :value="1"></el-option>
                        <el-option :label="$t('desk.serve_wechat')" :value="2"></el-option>
                        <el-option :label="$t('desk.serve_alipay')" :value="3"></el-option>
                        <el-option :label="$t('desk.customer_unionpay')" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('desk.customer_payPrice')" class prop="payPrices">
                    <el-input style="width: 300px" v-model="cardForm.payPrices" placeholder></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="setCardFrormChange()">{{
                    $t("commons.confirm")
                }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    props: ['type'],
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
            setCardVisible: false,
            cardForm: {
                operType: 4,
                payWay: 1,
                payPrices: "",
                //不改变
                cardNum: "",
                memberId: "",
                cardTypeId: "",
            },
            showPageType: "main", //页面显示类型
            loading: false,
            showEdit: false,
            showDetail: false,
            searchForm: {
                status: "",
                storesNum: "",
            },
            dialogInfo: null,
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [{}], //表格数据
            storeList: "",
            smembertypeList: [],
            setBlackForm: {
                remark: "",
            },
            setBlackShow: false,
            setBlackRules: {
                blackRemark: [
                    {
                        required: true,
                        message: "not emply",
                        trigger: "change",
                    },
                ],
            },
        };
    },

    mounted() {
        this.initForm();
        this.stores_list();
        this.$F.commons.fetchMemberTypeList({}, (res) => {
            this.smembertypeList = res.list;
        });
        console.log(this.type);
    },
    methods: {
        //点击客史
          handleHistory(item) {
            console.log(item);
            console.log(this.type);
            if (item.idcard) {
                if(this.type=='footer'){
                     this.$router.push({
                        name: "customerhistory",
                       query: {
                        idcard: item.idcard,
                      },
                    });
                }else if(this.type=='header'){
                    this.$router.push({
                        name: "historyTao",
                       query: {
                        idcard: item.idcard,
                      },
                    });
                }

            } else {
                this.$message(this.$t("desk.customer_noRecord"));
            }
        },
        //补收卡费弹框，点击确定按钮
        setCardFrormChange() {
            this.cardForm.cardNum = this.dialogInfo.memberCard;
            this.cardForm.memberId = this.dialogInfo.id;
            this.cardForm.cardTypeId = this.dialogInfo.memberTypeId;
            if (this.cardForm.payPrices > 0) {
                this.$F.doRequest(
                    this,
                    "/pms/hotelmember/replenish_fee",
                    this.cardForm,
                    (res) => {
                        this.$message({
                            message:this.$t('desk.customer_payCardSucc'),
                            type: "success",
                        });
                        this.setCardVisible = false;
                        this.cardForm = {
                            operType: 4,
                            payWay: 1,
                            payPrices: "",
                            //不改变
                            cardNum: "",
                            memberId: "",
                            cardTypeId: "",
                        };
                        this.getDataList();
                    }
                );
            } else {
                this.$message(this.$t('desk.customer_payShould'));
            }
        },
        // 点击补收卡费
        chargeCard(row) {
            console.log(row);
            this.dialogInfo = row;
            this.setCardVisible = true;
        },
        initForm() {
            this.searchForm = {
                status: "",
                storesNum: "",
                id: "",
                getWay: "",
                memberTypeId: "",
                mobile: "",
                memberCard: "",
                name: "",
                state: "",
                isBlacklist: "",
                paging: true,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.loading = true;
            this.$F.doRequest(
                this,
                "/pms/hotelmember/list",
                this.searchForm,
                (res) => {
                    this.loading = false;
                    this.tableData = res.list;
                    this.listTotal = res.page.count;
                }
            );
        },
        stores_list() {
            this.$F.doRequest(this, "/pms/freeuser/stores_list", {}, (data) => {
                this.storeList = data;
            });
        },

        handleAdd(item) {
            // this.$router.push({name:'customeradd',query: {type:'header'}})

            this.$router.push({name:'customeradd',params: {isHeader: '1'}})
        },
        handleDetail(item) {
            this.$router.push({
                name: "customerdetails",
                query: {
                    id: item.id,
                    buttonName: this.$t("commons.detail"),
                },
            });
        },
        handleEdit(item) {
            this.$router.push({
                name: "customeredit",
                query: {
                    id: item.id,
                },
            });
        },
        handleRecovery(item) {
            let params = {
                id: item.id,
                remark: "",
                state: 1,
            };

            this.$prompt(
                this.$t("desk.customer_inputReason"),
                this.$t("commons.tip_desc"),
                {
                    confirmButtonText: this.$t("commons.determine"),
                    cancelButtonText: this.$t("commons.cancel"),
                    inputPattern: /\S/,
                    inputErrorMessage: this.$t("commons.customer_notBlink"),
                }
            )
                .then(({ value }) => {
                    params.remark = value;
                    this.$F.doRequest(
                        this,
                        "/pms/hotelmember/enable_disable",
                        params,
                        (data) => {
                            this.getDataList();
                        }
                    );
                })
                .catch(() => {
                    console.log("cancel");
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
            return this.$t("desk.customer_unknowStore");
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
            return this.$t("desk.home_unknown");
        },

        /**多选 */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /**每页数 */
        handleSizeChange(val) {
            this.searchForm.page_num = val;
            this.searchForm.page = 1;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.pageIndex = val;
            this.getDataList();
            this.searchForm.pageIndex = 1;
            
        },
    },
};
</script>

<style lang="scss" scoped>
.open {
    margin-bottom: 20px;
    font-size: 14px;
    color: #666;

    .count {
        color: #333;
    }
}
.dialogDiv span {
    margin-right: 15px;
}
.dialogDiv {
    margin-bottom: 15px;
}
</style>
