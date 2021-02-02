<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-05 10:05:25
 * @FilePath: \jiudian\src\views\market\orders\bookingcoms\finance.vue
 -->
<template>
    <div class="finance">
        <el-row class="clearfix">
            <div class="">
                <el-button type="primary" size="mini" @click="depositShow = true" :disabled="roomLeaves || hasCheckinFlag">{{ $t('desk.order_payDepositA') }}</el-button>
                <el-button type="primary" size="mini" @click="refundShow = true" :disabled="roomLeaves || hasCheckinFlag">{{ $t('desk.order_payBackA') }}</el-button>
                <el-button type="primary" size="mini" @click="destructionHandle" :disabled="roomLeaves || hasCheckinFlag">{{ $t('desk.customer_richA') }}</el-button>
                <!--        <el-button type="primary" size="mini">{{ $t("commons.print") }}</el-button>-->
            </div>
        </el-row>
        <el-row class="clearfix padding-tb-20">
            <el-col :span="4"><span>{{ $t('desk.payTotalA') }}：<em class="text-green">{{
                    detailData.payPrice
                }}</em></span></el-col>
            <el-col :span="4"><span>{{ $t('frontOffice.refundAmountA') }}：<em class="text-red">{{
                    detailData.consumePrice
                }}</em></span></el-col>
            <el-col :span="4"><span>{{ $t('desk.balanceTotal') }}：{{
                    detailData.payPrice - detailData.consumePrice
                }}</span></el-col>
        </el-row>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData"
                  :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
                  @selection-change="handleSelectionChange" size="mini">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="createTime" :label="$t('commons.operatingTime')"></el-table-column>
            <el-table-column prop="priceType" :label="$t('desk.order_accountingProgram')">
                <template slot-scope="{ row }">
                    <span v-if="row.priceType == 9 || row.priceType == 10" style="color: red">
                        {{F_priceType(row.priceType ? row.priceType : 99)}}
                    </span>
                    <span v-else :class="row.richType == 1 ? 'red' : ''">
                        {{'【' + $t('commons.payType')[row.payType || 1] + '】' + F_priceType(row.priceType ? row.priceType : 99)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="payPrice" :label="$t('desk.order_paymentA')">
                <template slot-scope="{ row }">
                    <span v-if="row.priceType == 9 || row.priceType == 10" style="color: red">{{row.payPrice ? (0 - row.payPrice) : ''}}</span>
                    <span v-else :class="row.richType == 1 ? 'red' : ''">{{row.payPrice}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="consumePrice" :label="$t('frontOffice.refundAmountA')">
                <template slot-scope="{ row }">
                    <span v-if="row.priceType == 9 || row.priceType == 10" style="color: red">{{row.consumePrice ? (0 - row.consumePrice) : ''}}</span>
                    <span v-else :class="row.richType == 1 ? 'red' : ''">{{row.consumePrice}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('desk.order_businessThat')" show-overflow-tooltip>
                <template slot-scope="{ row }">
                    <span v-if="row.richType == 1" class="blue">
                        {{F_priceType('9') + '【' + $t('commons.payType')[row.payType] + '】' + F_priceType(row.priceType ? row.priceType : 99)}}
                    </span>
                    <br v-if="row.richType == 1">
                    <span v-if="row.richType == 1" class="blue">
                       理由： {{row.richRemark}}
                    </span>
                    <span v-else>{{F_priceType(row.priceType == 1 ? 1 : 99)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="remark" :label="$t('desk.home_note')" show-overflow-tooltip></el-table-column>
            <el-table-column prop="creatorName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
        </el-table>
        <div style="margin-top: 10px"></div>
        <!-- 分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchForm.pageIndex"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="searchForm.pageSize"
            layout=" sizes, prev, pager, next, jumper"
            :total="listTotal"
        ></el-pagination>

        <!--冲调-->
        <el-dialog top="0" :title="$t('desk.customer_rich')" :visible.sync="destructionShow" width="800px">
            <el-form :model="consumeOperForm" ref="destruction" :rules="rules" size="mini" label-width="100px">
                <!--        <p>正在冲调的账务</p>-->
                <el-table v-loading="loading" :data="destructionList"
                          :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }" size="mini">
                    <el-table-column :label="$t('desk.order_accountingProgram')" show-overflow-tooltip>
                        <template slot-scope="{ row }">
                            {{
                                '【' + $t('commons.payType')[row.payType] + '】' + F_priceType(row.payPrice ? row.priceType : 99)
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="payPrice" :label="$t('desk.order_payment')">
                        <template slot-scope="{ row }">
                            <span v-if="row.priceType == 9 || row.priceType == 10" style="color: red">{{row.payPrice ? (0 - row.payPrice) : ''}}</span>
                            <span v-else>{{row.payPrice}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="consumePrice" :label="$t('frontOffice.refundAmount')">
                        <template slot-scope="{ row }">
                            <span v-if="row.priceType == 9 || row.priceType == 10" style="color: red">{{row.consumePrice ? (0 - row.consumePrice) : ''}}</span>
                            <span v-else>{{row.consumePrice}}</span>
                        </template>
                    </el-table-column>
                    <!--          <el-table-column prop="remark" :label="$t('desk.order_businessThat')" show-overflow-tooltip></el-table-column>-->
                    <el-table-column prop="createTime" :label="$t('commons.operatingTime')" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="roomName" :label="$t('desk.home_roomNum')" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="creatorName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
                </el-table>
                <!--冲调方式 -->
                <el-form-item :label="$t('desk.order_mixingWay')+':'" prop="priceType">
                    <el-radio-group v-model="consumeOperForm.priceType">
                        <el-radio :label="9" :value="9">{{ $t('desk.order_completelyAgainst') }}</el-radio>
<!--                        <el-radio :label="10" :value="10">{{ $t('desk.order_partCompletely') }}</el-radio>-->
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('desk.order_completelyPrice')+':'" prop="segmentAmount" v-if="consumeOperForm.priceType != 9">
                    <el-input class="width200" type="number" v-model="consumeOperForm.segmentAmount" @change="changeSegmentAmount" autocomplete="off"></el-input>
                    <em style="margin-left: 10px; color: #888">{{ $t('desk.order_attention') }}</em>
                </el-form-item>
                <el-form-item :label="$t('desk.order_completelyReason')+':'" prop="remark">
                    <el-input type="textarea" v-model="consumeOperForm.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="destructionShow = false">{{ $t('commons.cancel') }}</el-button>
                <el-button type="primary" @click="consume_oper(3, 'destruction')">
                    {{ $t('commons.confirm') }}
                </el-button>
            </div>
        </el-dialog>
        <!--交订金-->
        <el-dialog top="0" :title="$t('desk.order_payDeposit')" :visible.sync="depositShow">
            <el-form
                :model="consumeOperForm"
                ref="deposit"
                :rules="rules"
                size="mini"
                label-width="140px"
            >
                <el-row v-if="detailData">
                    <el-col :span="8" v-if="detailData.checkIn"
                    >{{ $t('desk.order_bookOrderNum') }}：{{ detailData.checkIn.reserveOrderNum }}
                    </el-col
                    >
                    <el-col :span="8" v-if="detailData.checkIn"
                    >{{ $t('desk.home_bookPeople') }}：{{ detailData.checkIn.name }}
                    </el-col
                    >
                </el-row>
                <br/>
                <!--        <el-form-item :label="$t('desk.order_payProject')+':'">-->
                <!--          <el-radio-group v-model="consumeOperForm.priceType">-->
                <!--            <el-radio-button :label="1" :value="1">{{ $t('desk.downPayment')}}</el-radio-button>-->
                <!--          </el-radio-group>-->
                <!--        </el-form-item>-->
                <el-form-item :label="$t('desk.customer_payType') + ':'">
                    <el-radio-group v-model="consumeOperForm.payType">
                        <el-radio v-for="(value, key) in $t('commons.payType')" :label="key" :key="key" v-if="key != 3">
                            {{ value }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('desk.customer_sum')+':'">
                    <el-input
                        class=""
                        v-model="consumeOperForm.payPrice"
                        :autofocus="true"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.home_note') + ':'">
                    <el-input
                        class=""
                        type="textarea"
                        v-model="consumeOperForm.remark"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <!--            <el-form-item label="打印单据：">-->
                <!--                <el-checkbox v-model="consumeOperForm.name"></el-checkbox>-->
                <!--            </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="depositShow = false">{{ $t('commons.close') }}</el-button>
                <el-button type="primary" @click="consume_oper(1, 'deposit')">{{ $t('desk.customer_settlement') }}
                </el-button>
            </div>
        </el-dialog>
        <!--退订金-->
        <el-dialog top="0" :title="$t('desk.order_payBack')" :visible.sync="refundShow">
            <el-form :model="consumeOperForm" ref="refund" :rules="rules" size="mini" label-width="100px">
                <el-row v-if="detailData">
                    <el-col :span="8" v-if="detailData.checkIn">{{
                            $t('desk.order_bookOrderNum')
                        }}：{{ detailData.checkIn.reserveOrderNum }}
                    </el-col>
                    <el-col :span="8" v-if="detailData.checkIn">
                        {{ $t('desk.home_bookPeople') }}：{{ detailData.checkIn.name }}
                    </el-col>
                </el-row>
                <br/>
                <!--        <el-form-item :label="$t('desk.order_payProject')+':'">-->
                <!--          <el-radio-group v-model="consumeOperForm.priceType">-->
                <!--            <el-radio-button :label="4" :value="4">{{ $t('desk.order_payBack') }}</el-radio-button>-->
                <!--          </el-radio-group>-->
                <!--        </el-form-item>-->
                <el-form-item :label="$t('desk.customer_refundWay') + ':'">
                    <el-radio-group v-model="consumeOperForm.payType">
                        <el-radio v-for="(value, key) in $t('commons.payType')" :label="key" :key="key" v-if="key != 3">
                            {{ value }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('desk.customer_sum')+':'">
                    <el-input
                        v-model="consumeOperForm.consumePrice"
                        :autofocus="true"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.home_note') + ':'">
                    <el-input
                        type="textarea"
                        v-model="consumeOperForm.remark"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <!--        <el-form-item label="打印单据：">-->
                <!--          <el-checkbox v-model="consumeOperForm.name"></el-checkbox>-->
                <!--        </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="refundShow = false">{{ $t('commons.close') }}</el-button>
                <el-button type="primary" @click="consume_oper(2, 'refund')"
                >{{ $t('desk.customer_settlement') }}
                </el-button
                >
            </div>
        </el-dialog>

    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import myMixin from "@/utils/filterMixin";

export default {
    mixins: [myMixin],
    props: ["detailData"],
    computed: {

        rules() {
            return {
                segmentAmount: [
                    {
                        required: true,
                        // message: "请输入金额",
                        message: this.$t('commons.mustInput'),
                        trigger: "blur",
                    },
                ],
                creditName: [
                    {
                        required: true,
                        message: this.$t('commons.placeChoose'),
                        trigger: "blur",
                    },
                ],
                companyName: [
                    {
                        required: true,
                        // message: "请输入付款公司名称",
                        message: this.$t('commons.mustInput'),
                        trigger: "blur",
                    },
                ],
                projectName: [
                    {
                        required: true,
                        // message: "请输入项目名称",
                        message: this.$t('commons.mustInput'),
                        trigger: "blur",
                    },
                ],
                invoiceTime: [
                    {
                        required: true,
                        message: this.$t('commons.placeChoose'),
                        trigger: "blur",
                    },
                ],
                prices: [
                    {
                        required: true,
                        // message: "请输入金额",
                        message: this.$t('commons.mustInput'),
                        trigger: "blur",
                    },
                ],
                payType: [
                    {
                        required: true,
                        message: this.$t('commons.placeChoose'),
                        trigger: "change",
                    },
                ],
                priceType: [
                    {
                        required: true,
                        message: this.$t('commons.placeChoose'),
                        trigger: "change",
                    },
                ],
                remark: [
                    {
                        required: true,
                        // message: "请输入备注",
                        message: this.$t('commons.mustInput'),
                        trigger: "blur",
                    },
                ],
            }
        }
    },
    data() {
        return {
            destuctionAbleAmount: 0,
            loading: false,
            destructionShow: false,
            depositShow: false,
            payTypeShow: false,
            refundShow: false,
            checkType: "customer",
            activeName: "first",
            detail: {
                text: "",
            },
            searchForm: {
                state: "",
                checkInId: "",
                pageIndex: 1,
                pageSize: 10,
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [{}], //表格数据
            destructionList: [],
            consumeOperForm: {},
            roomLeaves: false,   //是否都离店
            hasCheckinFlag: false,  //是否有入住房间
            noCheckinFlag: false,  //是否还有未入住房间
        };
    },

    mounted() {
        let id = this.$route.query.id;
        this.consume_order_list();
        this.consumeOperFormInit();
        //查询出是否所有的房间都已经离店
        let length = 0;
        if (this.detailData.inRoomList && this.detailData.inRoomList.length > 0) {
            this.detailData.inRoomList.forEach((room => {
                if (room.state == 2) {length ++;}
                if (room.state == 3) {this.noCheckinFlag = true;}
                if (room.state == 1) {this.hasCheckinFlag = true;}
            }))
            this.roomLeaves = length == this.detailData.inRoomList.length;
        }
    },

    methods: {
        changeSegmentAmount() {
            if (this.consumeOperForm.segmentAmount > this.destuctionAbleAmount) {
                this.consumeOperForm.segmentAmount = this.destuctionAbleAmount;
            }
        },
        baseInfoChange() {
            this.$emit("baseInfoChange", "");
        },
        consumeOperFormInit() {
            this.consumeOperForm = {
                segmentAmount: 0,
                priceType: "1",
                payType: "1",
                name: "",
            }
        },
        consume_order_list() {
            this.searchForm.reserveId = this.$route.query.id;
            this.$F.doRequest(
                this,
                "/pms/consume/consume_order_list",
                this.searchForm,
                (res) => {
                    this.tableData = res.consumeOrderList;
                    this.tableData = this.tableData.filter(item=> {
                        return item.priceType != 9
                    })
                    this.listTotal = res.consumeOrderList.length || 0;
                    this.$forceUpdate();
                }
            );
        },
        consume_oper(type, formName) {
            /**
             * 1.交订金
             * 2.退订金
             *
             * **/
            console.log(this.consumeOperForm)
            let params = this.consumeOperForm;
            params.checkinReserveId = this.$route.query.id;
            if (params.priceType == 9 ) {
                let richIdArray = [];
                this.multipleSelection.forEach(item => {
                    richIdArray.push(item.id)
                    if (item.consumePrice)
                        params.consumePrice = -item.consumePrice;
                    else
                        params.payPrice = -item.payPrice;
                })
                params.richIds = richIdArray.join(',');
            } else if (params.priceType == 10 ) {
                let richIdArray = [];
                if (params.segmentAmount <= 0) {
                    return this.$message.error(this.$t('desk.order_attention'));
                }
                this.multipleSelection.forEach(item => {
                    richIdArray.push(item.id)
                    if (item.consumePrice)
                        params.consumePrice = -params.segmentAmount;
                    else
                        params.payPrice = - params.segmentAmount;
                })
                params.richIds = richIdArray.join(',');
            }
            if (this.detailData.inRoomList.length) {
                params.roomId = this.detailData.inRoomList[0].id;
                params.roomNum = this.detailData.inRoomList[0].houseNum;
            } else {
                this.$message.error(this.$t('desk.order_rowHouses'));
                return;
            }
            params.state = 1;
            //订金，退订金
            if (type == 1 || type == 2) {

                //这个type没什么意义，只是按照开发顺序或者按钮顺序来做个简单处理

                if (!params.priceType) {
                    this.$message.error(this.$t('desk.order_selectPayProject'));
                    return;
                }
                if (params.priceType == 1 && !params.payType) {
                    this.payTypeShow = true;
                    return;
                }
                if (params.priceType == 1) {
                    if (params.payPrice < 0 || params.payPrice == 0) {
                        this.$message.error(this.$t('desk.order_inputThan'));
                        return;
                    }
                }
                // params.priceType = type;
                if (params.priceType == 4) {
                    // params.priceType == 1
                    // if (params.consumePrice > 0 || params.consumePrice == 0) {
                    //   this.$message.error("请输入为负数金额");
                    //   return;
                    // }
                }
            }
            //冲调
            if (type == 3) {
                params.payType = 0;  //冲调没有支付类型
                params.richType = 1;
                params.richRemark = params.remark;
                debugger
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$F.doRequest(this, "/pms/consume/consume_oper", params, (res) => {
                        this.depositShow = false;
                        this.refundShow = false;
                        this.destructionShow = false;
                        this.consume_order_list();
                        this.baseInfoChange();
                        this.consumeOperFormInit()
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        destructionHandle() {
            if (this.multipleSelection.length < 1) {
                return this.$message.error(this.$t('desk.order_selectOperateAccount'));
            }
            if (this.multipleSelection.length > 1) {
                return this.$message.error(this.$t('desk.order_onlyOneAccount'));
            }
            for (let k in this.multipleSelection) {
                if (this.multipleSelection[k].billingType == 1) {
                    return this.$message.error(this.$t('desk.order_autoTiePrice'));
                }
                if (this.multipleSelection[k].priceType == 9 || this.multipleSelection[k].priceType == 10) {
                    return this.$message.error(this.$t('desk.order_priceShould'));
                }
            }
            if (this.multipleSelection[0].richType == 1 || this.multipleSelection[0].priceType == 9) {
                return  this.$message.error(this.$t('desk.order_priceShould'));
            }
            this.destuctionAbleAmount = this.multipleSelection[0].payPrice || this.multipleSelection[0].consumePrice;
            this.tableData.forEach(data => {
                if ((data.priceType == 9 || data.priceType == 10)) {
                    if (data.richList && data.richList.length > 0) {
                        data.richList.forEach(rich => {
                            if (rich.id == this.multipleSelection[0].id) {
                                this.destuctionAbleAmount += (data.payPrice || data.consumePrice)
                            }
                        })
                    }

                }
            })
            this.destructionList = this.multipleSelection;
            this.consumeOperForm.priceType = 9;
            this.destructionShow = true;
            this.$forceUpdate();
        },
        /**多选 */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /**每页数 */
        handleSizeChange(val) {
            this.searchForm.pageSize = val;
            this.searchForm.pageIndex = 1;
            this.consume_order_list();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.pageIndex = val;
            this.consume_order_list();
        },
    },
};
</script>

<style lang="less" scoped>
.base p {
    font-size: 12px;
}
.red {
    color: red;
}
.blue {
    color: blue;
}
</style>
