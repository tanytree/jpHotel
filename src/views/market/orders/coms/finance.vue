<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-18 15:07:25
 * @FilePath: /jiudian/src/views/market/orders/coms/finance.vue
 -->
<template>
<div class="finance">
    <!-- 查询部分 -->
    <el-form inline size="small">
        <el-row>
            <el-form-item label="">
                <el-button type="primary" size="mini" @click="entryShow=true">{{$t('desk.enterAccount')}}</el-button>
                <el-button type="primary" size="mini" @click="onAccountShow=true">{{ $t('desk.charge') }}</el-button>
                <el-button type="primary" size="mini" @click="consumeGoodsHandle">{{ $t('desk.serve_miniPub') }}</el-button>
                <el-button type="primary" size="mini" @click="checkOutHandle">退房结账</el-button>
                <el-button type="primary" size="mini" @click="invoicingHandle">{{ $t('desk.order_invoice') }}</el-button>
<!--                <el-button type="primary" size="mini">{{$t('commons.print')}}</el-button>-->
                <el-button type="primary" size="mini" @click="destructionHandle">{{$t('desk.customer_rich')}}</el-button>
                <el-button type="primary" size="mini" @click="someAccountsHandle">部分结账</el-button>
                <el-button type="primary" size="mini">撤销结账</el-button>
                <el-button type="primary" size="mini" @click="knotShow=true">走结</el-button>
            </el-form-item>
        </el-row>
        <el-form-item label="账务类别：">
<!--            <el-tabs type="border-card">-->
<!--                <el-tab-pane label="用户管理"></el-tab-pane>-->
<!--                <el-tab-pane label="配置管理"></el-tab-pane>-->
<!--                <el-tab-pane label="角色管理"></el-tab-pane>-->
<!--            </el-tabs>-->

            <el-button plain size="mini" @click="consume_order_list('')">所有账务</el-button>
            <el-button plain size="mini" @click="consume_order_list(1)">未结账务</el-button>
            <el-button plain size="mini" @click="consume_order_list(2)">已结账务</el-button>
        </el-form-item>
<!--        <el-form-item class="fr">-->
<!--            <el-button type="primary">导出</el-button>-->
<!--        </el-form-item>-->
    </el-form>
    <!--表格数据 -->
    <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
              @selection-change="handleSelectionChange" size="mini">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="createTime" label="消费时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="roomName" :label="$t('desk.home_roomNum')" show-overflow-tooltip></el-table-column>
        <el-table-column label="账务项目" show-overflow-tooltip>
            <template slot-scope="{row}">
                {{F_priceType(row.priceType)}}
            </template>
        </el-table-column>
        <el-table-column label="付款" prop="payPrice"></el-table-column>
        <el-table-column prop="state" :label="$t('food.common.status')" show-overflow-tooltip>
            <template slot-scope="{row}">
                {{row.state==1?'未结':'已结'}}
            </template>
        </el-table-column>
        <el-table-column prop="consumePrice" label="消费">
            <template slot-scope="{row}" style="color: red">
                {{row.consumePrice}}
            </template>
        </el-table-column>
        <el-table-column prop="enterType" label="业务说明" show-overflow-tooltip></el-table-column>
        <el-table-column prop="creatorName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column :label="$t('commons.operating')">
            <template slot-scope="{row}">
                <el-button type="text" size="mini" @click="consume_move(row)">移除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div style="margin-top:10px"></div>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.pageSize" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>

    <!--入账 -->
    <el-dialog top='0' :title="$t('desk.enterAccount')" :visible.sync="entryShow">
        <el-form :model="consumeOperForm" ref="entry" :rules="rules" size="mini" label-width="100px">
            <p>快速入账项目</p>
            <el-form-item label="付款项目：">
                <el-radio-group v-model="consumeOperForm.priceType">
                    <el-radio-button :label="3" :value="3">收款</el-radio-button>
                    <el-radio-button :label="2" :value="2">押金</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="选择结算方式" v-if="consumeOperForm.priceType == 3 || consumeOperForm.priceType == 2">
                <el-radio-group v-model="consumeOperForm.payType">
                    <el-radio :label="1" :value="1">现金</el-radio>
                    <el-radio :label="2" :value="2">银行卡</el-radio>
                    <el-radio :label="3" :value="3">支付宝</el-radio>
                    <el-radio :label="4" :value="4">微信</el-radio>
                    <el-radio :label="5" :value="5">会员卡</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="消费项目：">
                <el-radio-group v-model="consumeOperForm.priceType" @change="priceTypeChange">
                    <el-radio-button :label="5" :value="5">加收全天房费</el-radio-button>
                    <el-radio-button :label="6" :value="6">加收半天房费</el-radio-button>
                    <el-radio-button :label="7" :value="7">损物赔偿</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <template v-if="consumeOperForm.priceType==7">
                <el-form-item label="商品类别：">
                    <el-select v-model="consumeOperForm.damageTypeId" @change="damageTypeIdChange">
                        <el-option v-for="item in hoteldamagetypeList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称：">
                    <el-select v-model="consumeOperForm.damageId" @change="getDdamageInfo">
                        <el-option v-for="item in hoteldamageList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-input-number @change="getDamagePrice" :disabled="!consumeOperForm.damageId"  v-model="consumeOperForm.damageCount" :min="1" label=""></el-input-number>
                </el-form-item>
            </template>
            <el-form-item label="金额：">
                <el-input class="11111" v-if="consumeOperForm.priceType==3||consumeOperForm.priceType==2" v-model="consumeOperForm.payPrice" autocomplete="off"></el-input>
                <el-input class="2222" v-else v-model="consumeOperForm.consumePrice" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input class="" type="textarea" v-model="consumeOperForm.remark" autocomplete="off"></el-input>
            </el-form-item>
<!--            <el-form-item label="打印单据：">-->
<!--                <el-checkbox v-model="consumeOperForm.name"></el-checkbox>-->
<!--            </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="entryShow = false">关闭</el-button>
            <el-button type="primary" @click="consume_oper(1,'entry')">{{$t('desk.enterAccount')}}</el-button>
        </div>
    </el-dialog>
   <!-- <el-dialog top='0' title="选择结算方式" :visible.sync="payTypeShow">
        <el-form :model="consumeOperForm" size="mini">
            <el-form-item label="">
                <el-radio-group v-model="consumeOperForm.payType">
                    <el-radio :label="1" :value="1">现金</el-radio>
                    <el-radio :label="2" :value="2">银行卡</el-radio>
                    <el-radio :label="3" :value="3">支付宝</el-radio>
                    <el-radio :label="4" :value="4">微信</el-radio>
                    <el-radio :label="5" :value="5">会员卡</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="payTypeShow = false">{{ $t('commons.cancel') }}</el-button>
            <el-button type="primary" @click="payTypeShow = false">{{ $t('commons.confirm') }}</el-button>
        </div>
    </el-dialog> -->

    <!--挂账-->
    <el-dialog top='0' :title="$t('desk.charge')" :visible.sync="onAccountShow" width="500px">
        <el-form :model="consumeOperForm" ref="onAccount" :rules="rules" size="mini" label-width="100px">
            <el-row v-if="currentRoom">
                <el-col :span="8">
                    {{$t('desk.home_roomType')}}：{{currentRoom.roomTypeName}}
                </el-col>
                <el-col :span="8">
                    {{$t('desk.home_roomNum')}}：{{currentRoom.houseNum}}
                </el-col>
                <el-col :span="8">
                    入住人：{{currentRoom.personList && currentRoom.personList.length && currentRoom.personList[0].name}}
                </el-col>
            </el-row>
            <el-row v-else>
                <template v-if="detailData&&detailData.inRoomList">
                    <el-col :span="8">
                        {{$t('desk.home_roomType')}}：{{detailData.inRoomList[0].roomTypeName}}
                    </el-col>
                    <el-col :span="8">
                        {{$t('desk.home_roomNum')}}：{{detailData.inRoomList[0].houseNum}}
                    </el-col>
                    <el-col :span="8">
                        入住人：{{detailData.inRoomList && detailData.inRoomList[0] && detailData.inRoomList[0].personList &&
                        detailData.inRoomList[0].personList[0] &&
                        detailData.inRoomList[0].personList[0].name}}
                    </el-col>
                </template>
            </el-row>
            <br />

            <el-form-item :label="$t('desk.chargeMoney') + ':'" class="" prop="consumePrice">
                <el-input class="width200" type="number" v-model="consumeOperForm.consumePrice"></el-input>
            </el-form-item>
            <el-form-item label="挂账单位：" class="" prop="creditName">
                <el-select v-model="consumeOperForm.enterId" filterable remote reserve-keyword placeholder="请输入关键词"  :loading="loading" @change="enterNameChange">
                    <el-option v-for="item in hotelenterList" :key="item.id" :label="item.enterName" :value="item.id">
                        {{item.enterName}}
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input type="textarea" v-model="consumeOperForm.remark" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onAccountShow=false">关闭</el-button>
            <el-button type="primary" @click="consume_oper(2,'onAccount')">{{ $t('commons.confirm') }}</el-button>
        </div>
    </el-dialog>
    <!--走结-->
    <el-dialog top='0' title="走结" :visible.sync="knotShow" width="500px">
        <el-form :model="consumeOperForm" ref="knot" :rules="rules" size="mini" label-width="20px">
            <el-row v-if="currentRoom">
                <el-col :span="8">
                    {{$t('desk.home_roomType')}}：{{currentRoom.roomTypeName}}
                </el-col>
                <el-col :span="8">
                    {{$t('desk.home_roomNum')}}：{{currentRoom.houseNum}}
                </el-col>
                <el-col :span="8">
                    入住人：{{currentRoom.personList[0] && currentRoom.personList[0].name}}
                </el-col>
            </el-row>
            <el-row v-else>
                <template v-if="detailData&&detailData.inRoomList">
                    <el-col :span="8">
                        {{$t('desk.home_roomType')}}：{{detailData.inRoomList[0].roomTypeName}}
                    </el-col>
                    <el-col :span="8">
                        {{$t('desk.home_roomNum')}}：{{detailData.inRoomList[0].houseNum}}
                    </el-col>
                    <el-col :span="8">
                        入住人：{{detailData.inRoomList && detailData.inRoomList[0] && detailData.inRoomList[0].personList
                        && detailData.inRoomList[0].personList[0].name}}
                    </el-col>
                </template>
            </el-row>
            <br />
            <el-form-item label="" class="">
                <p>是否确认改为走结？</p>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="knotShow=false">关闭</el-button>
            <el-button type="primary" @click="out_check_in">{{ $t('commons.confirm') }}</el-button>
        </div>
    </el-dialog>
    <!--开发票-->

    <!--结账退款-->
    <el-dialog top='0' title="退房结账" :visible.sync="checkOutShow" width="800px">
        <el-form :model="consumeOperForm" ref="checkOut" :rules="rules" size="mini" label-width="100px">
            <el-row v-if="currentRoom">
                <el-col :span="8">
                    {{$t('desk.home_roomType')}}：{{currentRoom.roomTypeName}}
                </el-col>
                <el-col :span="8">
                    {{$t('desk.home_roomNum')}}：{{currentRoom.houseNum}}
                </el-col>
                <el-col :span="8">
                    入住人：{{currentRoom.personList && currentRoom.personList[0] && currentRoom.personList[0].name}}
                </el-col>
            </el-row>
            <br />
            <div class="cost margin-t-10" v-if="detailData">
                <div class="wrap" style="background:#efefef">
                    <span class="fee" v-if="detailData.totalPrice>0">应收：{{detailData.totalPrice}}</span>
                    <span class="fee" v-if="detailData.totalPrice<0">应退：{{detailData.totalPrice}}</span>
                    <div class="costNum">
                        <el-row>{{ $t('desk.consumerTotal') }}：<span class="text-red">{{detailData.consumePrice}}</span></el-row>
                        <el-row>{{ $t('desk.payTotal') }}：<span class="text-green">{{detailData.payPrice}}</span></el-row>
                    </div>
                </div>
            </div>
            <br />
            <el-form-item label="" label-width="0">
                <el-checkbox v-model="consumeOperForm.isPoints">可用200积分抵扣20日元</el-checkbox>
            </el-form-item>
            <el-form-item :label="$t('desk.customer_paymentMethod') + ':'" prop="payType" v-if="detailData.totalPrice>0">
                <el-radio-group v-model="consumeOperForm.payType">
                    <el-radio :label="1" :value="1">现金</el-radio>
                    <el-radio :label="2" :value="2">银行卡</el-radio>
                    <el-radio :label="3" :value="3">支付宝</el-radio>
                    <el-radio :label="4" :value="4">微信</el-radio>
                    <el-radio :label="5" :value="5">会员卡</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="金额：" class="" prop="consumePrice">
                <el-input class="width200" type="number" v-model="consumeOperForm.consumePrice" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input class="width200" type="textarea" v-model="consumeOperForm.remark" autocomplete="off"></el-input>
            </el-form-item>
<!--            <el-form-item label="打印单据：">-->
<!--                <el-checkbox v-model="consumeOperForm.name"></el-checkbox>-->
<!--            </el-form-item>-->

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="checkOutShow=false">关闭</el-button>
            <el-button type="primary" @click="consume_oper(4,'checkOut')">{{ $t('commons.confirm') }}</el-button>
        </div>
    </el-dialog>
    <!--冲调-->
    <el-dialog top='0' :title="$t('desk.customer_rich')" :visible.sync="destructionShow"width="800px">
        <el-form :model="consumeOperForm" ref="destruction" :rules="rules" size="mini" label-width="100px" >
            <el-row v-if="currentRoom">
                <el-col :span="8">
                    {{$t('desk.home_roomType')}}：{{currentRoom.roomTypeName}}
                </el-col>
                <el-col :span="8">
                    {{$t('desk.home_roomNum')}}：{{currentRoom.houseNum}}
                </el-col>
                <el-col :span="8">
                    入住人：{{currentRoom.personList && currentRoom.personList[0] && currentRoom.personList[0].name}}
                </el-col>
            </el-row>
            <el-row v-else>
                <template v-if="detailData&&detailData.inRoomList">
                    <el-col :span="8">
                        {{$t('desk.home_roomType')}}：{{detailData.inRoomList[0].roomTypeName}}
                    </el-col>
                    <el-col :span="8">
                        {{$t('desk.home_roomNum')}}：{{detailData.inRoomList[0].houseNum}}
                    </el-col>
                    <el-col :span="8">
                        入住人：{{detailData.inRoomList && detailData.inRoomList[0] && detailData.inRoomList[0].personList &&
                        detailData.inRoomList[0].personList[0].name}}
                    </el-col>
                </template>
            </el-row>
            <br />
            <p>正在冲调的账务</p>
            <el-table v-loading="loading" :data="destructionList" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
                <el-table-column label="账务项目" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{F_priceType(row.priceType)}}
                    </template>
                </el-table-column>
                <el-table-column prop="consumePrice" label="消费" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterType" label="业务说明" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTime" :label="$t('desk.enterAccountTime')" show-overflow-tooltip></el-table-column>
                <el-table-column prop="roomName" :label="$t('desk.home_roomNum')" show-overflow-tooltip></el-table-column>
                <el-table-column prop="creatorName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-form-item style="margin-top: 10px;" label="冲调方式：" prop="priceType">
                <el-radio-group v-model="consumeOperForm.priceType">
                    <el-radio :label="9" :value="9">完全冲调</el-radio>
                    <el-radio :label="10" :value="10">部分冲调</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="冲调金额：" prop="consumePrice"  v-if="consumeOperForm.priceType == 10">
                <el-input class="width200" type="text" v-model="consumeOperForm.consumePrice"></el-input>
                <em style="margin-left:10px;color:#888;font-size: 12px;">注意：冲调金额小于原账金额</em>
            </el-form-item>
            <el-form-item label="冲调原因：" prop="remark">
                <el-input type="textarea" v-model="consumeOperForm.remark"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="destructionShow=false">{{ $t('commons.cancel') }}</el-button>
            <el-button type="primary" @click="consume_oper(3,'destruction')">{{ $t('commons.confirm') }}</el-button>
        </div>
    </el-dialog>

    <!--部分结账-->
    <someAccounts ref="someAccounts" :detailData = "detailData" @get_consume_order_list="consume_order_list" :currentRoom="currentRoom"  />
    <!--迷你吧-->
    <consumeGoods ref="consumeGoods" :detailData = "detailData" @get_consume_order_list="consume_order_list" :currentRoom="currentRoom" />
    <!--开发票-->
    <invoicing ref="invoicing" :detailData = "detailData" @get_consume_order_list="consume_order_list" :currentRoom="currentRoom" />
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import myMixin from '@/utils/filterMixin';
import consumeGoods from './consumeGoods'
import someAccounts from './someAccounts'
import invoicing from './invoicing'
export default {
    mixins: [myMixin],
    props: ['currentRoomId', 'detailData'],
    components: {
        consumeGoods,
        someAccounts,
        invoicing
    },
    computed: {
        ...mapState({
        })
    },
    data() {
        return {
            loading: false,
            hotelenterLoading: false,
            entryShow: false, //入账
            payTypeShow: false,
            onAccountShow: false,
            knotShow: false,
            openInvoiceShow: false,
            checkOutShow: false,
            destructionShow: false,
            someAccountsShow: false,
            consumeGoodsShow: false,
            checkType: 'customer',
            activeName: 'first',
            detail: {
                text: ''
            },
            searchForm: {
                state: '',
                checkInId: '',
                pageIndex: 1,
                pageSize: 10
            },
            consumeOperForm: {
                priceType: '',
                payType: '',
                name: '',
            },
            openInvoiceForm: {
                roomNum: '',
                name: '',
                checkInId: '',
                mobile: '',
                consumePrice: '',
                prices: '',
                invoicePrice: '',
                companyName: '',
                projectName: '',
                invoiceTime: '',
                remark: '',
                invoiceId: '',
                isPoints:false
            },
            rules: {
                consumePrice: [{
                    required: true,
                    // message: '请输入金额',
                    message: this.$t('commons.mustInput'),
                    trigger: 'blur'
                }, ],
                creditName: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择挂账公司',
                    trigger: 'blur'
                }, ],
                companyName: [{
                    required: true,
                    // message: '请输入付款公司名称',
                    message: this.$t('commons.mustInput'),
                    trigger: 'blur'
                }, ],
                projectName: [{
                    required: true,
                    // message: '请输入项目名称',
                    message: this.$t('commons.mustInput'),
                    trigger: 'blur'
                }, ],
                invoiceTime: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择开票日期',
                    trigger: 'blur'
                }, ],
                prices: [{
                    required: true,
                    // message: '请输入金额',
                    message: this.$t('commons.mustInput'),
                    trigger: 'blur'
                }, ],
                payType: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择支付方式',
                    trigger: 'change'
                }, ],
                priceType: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择冲调方式',
                    trigger: 'change'
                }, ],
                remark: [{
                    required: true,
                    // message: '请输入备注',
                    message: this.$t('commons.mustInput'),
                    trigger: 'blur'
                }, ],
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [{}], //表格数据
            hoteldamagetypeList: [],
            hoteldamageList: [],
            hotelenterList: [], //挂账企业列表
            destructionList: [], //冲调的账务
            currentRoom: {
                personList: []
            }
        };
    },

    created() {

        console.log(this.currentRoomId)
        if (this.currentRoomId) {
            this.currentRoom = this.detailData.inRoomList.filter(item=>{
                return item.id == this.currentRoomId
            })[0];
        }

        console.log(this.currentRoom)
    },

    mounted() {
        let id = this.$route.query.id;

        this.consume_order_list('')
        this.hoteldamagetype_list()
        this.hotelenter_list()
    },

    methods: {
        consume_order_list(state) {
            this.searchForm.state = state || '';
            this.searchForm.checkInId = this.$route.query.id;
            this.$F.doRequest(this, '/pms/consume/consume_order_list', this.searchForm, (res) => {
                this.tableData = res.consumeOrderList
                this.listTotal = (res.page || {}).count || 0
                this.$forceUpdate()
            })
        },
        consume_move(item) {
            let params = {
                orderId: item.id
            };
            this.$confirm('请确认是否删除该项?', this.$t('commons.tip_desc'), {
                confirmButtonText: this.$t('commons.confirm'),
                cancelButtonText: this.$t('commons.cancel'),
                type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, '/pms/consume/consume_move', params, (res) => {
                    this.$message({
                        type: 'success',
                        message: this.$t('commons.request_success'),
                    });
                    this.consume_order_list()
                    this.getOrderDetail();
                })
            }).catch(() => {});
        },
        consume_oper(type, formName) {
            /**
             * 1.入账
             * 2.挂账
             * 3.冲调
             *
             * **/

            let params = this.consumeOperForm
            // params.orderId = this.$route.query.id

            params.checkInId = this.$route.query.id
            if (this.currentRoomId) {
                params.roomId = this.currentRoom.id;
                params.roomNum = this.currentRoom.houseNum
            } else {
                if (this.detailData.inRoomList.length > 0) {
                    params.roomId = this.detailData.inRoomList[0].id;
                    params.roomNum = this.detailData.inRoomList[0].houseNum
                }
            }



            //入账 默认未接
            if (type == 1) {
                params.state = 1;
                if (!params.priceType) {
                    this.$message.error('请选择入账项目');
                    return;
                }
                if (params.priceType == 3 && !params.payType) {
                    // this.payTypeShow = true;
                    this.$message.error('请选择结算方式');
                    return;
                }
                if (params.priceType == 3 || params.priceType == 2) {
                    if (!params.payPrice) {
                        this.$message.error('请输入金额');
                        return;
                    }
                } else {

                    if (!params.consumePrice) {
                        this.$message.error('请输入金额');
                        return;
                    }

                    if(params.priceType == 5 || params.priceType == 6 || params.priceType == 7 ){
                        params.payType = 0
                    }
                }

            }



            //挂账
            if (type == 2) {
                params.priceType = 13
                params.payType = 0 //挂账无需支付方式
                params.state = 1
                console.log(params)
            }
            //冲调
            if (type == 3) {
                params.state = 2
                params.payType = 0 //挂账无需支付方式
                params.orderId = this.destructionList[0].id


                // if (params.consumePrice > 0 || params.consumePrice == 0) {
                //     this.$message.error('请输入为负数金额');
                //     return false
                // }

                params.consumePrice = '-' + this.consumeOperForm.consumePrice

            }

            console.log(params)
            // return

            //退房结账
            if (type == 4) {
                params.state = 2
                if(params.consumePrice<0){
                    params.payType = 0
                }
                if(params.isPoints){
                    params.scoresDiscount = 200
                    params.scoresPrice = 20
                } else {
                    params.scoresDiscount = ''
                    params.scoresPrice = ''
                }
            }




            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$F.doRequest(this, '/pms/consume/consume_oper', params, (res) => {
                        this.entryShow = false
                        this.onAccountShow = false
                        this.destructionShow = false;
                        this.consumeOperForm = {
                            priceType: '',
                            payType: '',
                            name: ''
                        }
                        this.consume_order_list()
                        this.getOrderDetail()
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        out_check_in() {
            let params = {
                checkInId: this.$route.query.id,
                billType: 4
            }
            this.$F.doRequest(this, '/pms/checkin/out_check_in', params, (res) => {
                this.knotShow = false
                this.consume_order_list()
            })
        },
        //开发票按钮点击
        openInvoiceHandle() {
            this.openInvoiceForm.checkInId = this.$route.query.id
            if (this.currentRoom) {
                this.openInvoiceForm.name = this.currentRoom.name
                this.openInvoiceForm.consumePrice = this.currentRoom.roomMarkPrice
                this.openInvoiceForm.invoicePrice = ''
                this.openInvoiceForm.roomNum = this.currentRoom.houseNum
                this.openInvoiceForm.mobile = this.currentRoom.mobile
            } else {
                if (this.detailData.inRoomList.length) {
                    this.openInvoiceForm.name = this.detailData.inRoomList[0].name
                    this.openInvoiceForm.consumePrice = this.detailData.inRoomList[0].roomMarkPrice
                    this.openInvoiceForm.invoicePrice = ''
                    this.openInvoiceForm.roomNum = this.detailData.inRoomList[0].houseNum
                    this.openInvoiceForm.mobile = this.detailData.inRoomList[0].mobile
                } else {
                    this.$message.error('暂无入住人');
                    return
                }
            }
            this.openInvoiceShow = true
        },
        checkOutHandle() {
            this.checkOutShow = true;
            this.consumeOperForm.consumePrice = this.detailData.totalPrice
        },
        // //开发票提交
        // openInvoiceSubmit(formName) {
        //     this.$refs[formName].validate((valid) => {
        //         if (valid) {
        //             this.$F.doRequest(this, '/pms/invoice/open_invoice', this.openInvoiceForm, (res) => {
        //                 this.openInvoiceShow = false
        //                 this.$message({
        //                     message: this.$t('commons.request_success'),
        //                     type: 'success'
        //                 });
        //                 this.consume_order_list()
        //             })
        //         } else {
        //             console.log('error submit!!');
        //             return false;
        //         }
        //     });
        //
        // },
        hoteldamagetype_list() {
            let params = {
                pageIndex: 1,
                pageSize: 10,
                paging: false
            };
            this.$F.doRequest(this, '/pms/hoteldamagetype/list', params, (res) => {
                this.hoteldamagetypeList = res.list
                this.$forceUpdate()
            })
        },
        hoteldamage_list(id) {
            let params = {
                damageTypeId: id,
                pageIndex: 1,
                pageSize: 10,
                paging: false
            };
            this.$F.doRequest(this, '/pms/hoteldamage/list', params, (res) => {
                this.hoteldamageList = res.list
                console.log(res)
                this.$forceUpdate()
            })
        },


        priceTypeChange(e) {
            this.consumeOperForm.priceType = e
            console.log(e)
            console.log(this.currentRoom)
            if (e == 5) {
                if (this.currentRoom) {
                    this.consumeOperForm.consumePrice = this.currentRoom.realPrice
                } else {
                    if (this.detailData && this.detailData.inRoomList.length) {
                        this.consumeOperForm.consumePrice = this.detailData.inRoomList[0].realPrice
                    } else {
                        this.consumeOperForm.consumePrice = ''
                        this.$message.error('暂无入住人');
                        return
                    }
                }
            } else if (e == 6) {
                console.log(this.currentRoom)
                if (this.currentRoom) {
                    this.consumeOperForm.consumePrice = (this.currentRoom.realPrice * 0.5).toFixed(2)

                } else {
                    if (this.detailData && this.detailData.inRoomList.length) {
                        this.consumeOperForm.consumePrice = (this.detailData.inRoomList[0].realPrice * 0.5).toFixed(2)
                    } else {
                        this.consumeOperForm.consumePrice = ''
                        this.$message.error('暂无入住人');
                        return
                    }
                }
            } else if (e == 7) {
                this.consumeOperForm.damageCount = 1
                this.consumeOperForm.consumePrice = ''
                this.getDdamageInfo();
            }

            // console.log( this.consumeOperForm.consumePrice)


            this.$forceUpdate()
        },
        getDamagePrice(value){
            this.getDdamageInfo();
        },
        //获取房间的物品价格
        getDdamageInfo(){
            console.log(this.consumeOperForm.damageId)
            console.log(this.hoteldamageList)
            let list = this.hoteldamageList
            if(list.length > 0 && this.consumeOperForm.damageTypeId && this.consumeOperForm.damageId ){
               for(let i in list){
                   if(this.consumeOperForm.damageId == list[i].id){
                       console.log(list[i])
                       let p = parseFloat(list[i].damagePrice)  * parseFloat(this.consumeOperForm.damageCount)
                       this.consumeOperForm.consumePrice = p.toFixed(2)
                       this.consumeOperForm.damageName = list[i].name
                   }
               }
            }
        },




        /**获取挂账企业 */
        hotelenter_list(name) {
            let searchForm = {
                id: '',
                state: '',
                shareFlag: '',
                contactName: '',
                contactPhone: '',
                salesId: '',
                startCreditLimit: '',
                endCreditLimit: '',
                paging: false,
                pageIndex: 1,
                pageSize: 10
            };
            if(name){
                searchForm.enterName = name
            }
            this.loading = true
            this.$F.doRequest(this, '/pms/hotelenter/list', searchForm, (res) => {
                this.loading = false
                console.log(res)
                this.hotelenterList = res.list;

            })
        },
        remoteMethod(query) {
            if (query !== '') {
                this.hotelenterLoading = true;
                setTimeout(() => {
                    this.hotelenterLoading = false;
                    this.hotelenter_list(query)
                }, 200);
            } else {
                this.hotelenterList = [];
            }
        },
        enterNameChange(e) {
            console.log(e)
            this.consumeOperForm.enterId = e
            this.hotelenterList.forEach(element => {
                if (e == element.id) {
                    this.consumeOperForm.creditName = element.enterName
                }
            });
        },
        //获取商品分类信息
        damageTypeIdChange(e) {
            console.log(e)
            console.log(this.hoteldamagetypeList)
            let list = this.hoteldamagetypeList
            if(list.length > 0){
                for(let i in list){
                    if(list[i].id == e){
                        // console.log(list[i])
                        this.consumeOperForm.damageTypeName  = list[i].name
                    }
                }
            }


            if(e){
                this.hoteldamage_list()
            }

        },


        destructionHandle() {
            if (this.multipleSelection.length < 1) {
                this.$message.error('请选择需要操作的账务');
                return
            }
            if (this.multipleSelection.length > 1) {
                this.$message.error('仅能选择一条账务冲调');
                return
            }
            for (let k in this.multipleSelection) {
                if (this.multipleSelection[k].billingType == 1) {
                    this.$message.error('自动计费项目不能冲调');
                    return
                }

            }
            this.destructionList = this.multipleSelection
            this.destructionShow = true
            this.$forceUpdate()
        },
        //开发票
        invoicingHandle() {
            this.openInvoiceForm.checkInId = this.$route.query.id
            if (this.currentRoom) {
                this.openInvoiceForm.name = this.detailData.checkIn.name;
                this.openInvoiceForm.consumePrice = this.currentRoom.roomMarkPrice
                this.openInvoiceForm.invoicePrice = ''
                this.openInvoiceForm.roomNum = this.currentRoom.houseNum
                this.openInvoiceForm.mobile = this.detailData.checkIn.mobile
            } else {
                if (this.detailData.inRoomList.length) {
                    // this.openInvoiceForm.name = this.detailData.inRoomList[0].name
                    this.openInvoiceForm.name = this.detailData.checkIn.name;
                    this.openInvoiceForm.consumePrice = this.detailData.inRoomList[0].roomMarkPrice
                    this.openInvoiceForm.invoicePrice = ''
                    this.openInvoiceForm.roomNum = this.detailData.inRoomList[0].houseNum
                    this.openInvoiceForm.mobile = this.detailData.checkIn.mobile
                } else {
                    this.$message.error('暂无入住人');
                    return
                }
            }
            this.$refs.invoicing.init(this.$route.query.id, this.openInvoiceForm);
        },
        consumeGoodsHandle() {
            this.$refs.consumeGoods.init(this.$route.query.id);
        },
        someAccountsHandle() {
            this.$refs.someAccounts.init(this.$route.query.id);
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
        getOrderDetail(){
            console.log(111)
            this.$emit('getOrderDetail')
        }
    },
    watch:{
        'consumeOperForm.priceType':function(val,oldval){
                if(val == 9){
                    this.consumeOperForm.consumePrice = this.destructionList[0].consumePrice ? this.destructionList[0].consumePrice : this.destructionList[0].payPrice
                }else if(val == 10){
                   this.consumeOperForm.consumePrice = ''
                }else{
                    this.consumeOperForm.consumePrice = ''
                }
                // console.log(val)
               // if(val !== 3){
               //    this.consumeOperForm.payType = ''
               // }
               // if(val !== 7){
               //     this.consumeOperForm.consumePrice = ''
               // }

                // if(val == 9){

                //     this.consumeOperForm.consumePrice = ''
                // }
                // console.log(this.consumeOperForm.payType)
        }


    }
};
</script>

<style scoped>
.detailTab {
    border: 0
}

.detailTab>>>.el-tabs__header {
    margin: 0;
}
</style>
<style lang="less" scoped>
.base p {
    font-size: 12px
}

.cost {
    background: #fff;

    .wrap {
        padding: 20px 15px;

        span.fee {
            font-size: 26px;
            color: #DC3E3E;
            display: inline-block;
            vertical-align: middle;
            margin-right: 50px;
        }

        .costNum {
            display: inline-block;
            font-size: 16px;
            vertical-align: middle;
            border-left: 1px solid #eee;
            padding-left: 50px;
        }
    }
}
</style>
