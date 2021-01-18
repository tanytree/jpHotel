<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-12 18:09:57
 * @FilePath: \jiudian\src\views\market\orders\coms\finance.vue
 -->
<template>
<div class="finance">
    <!-- 查询部分 -->
    <el-form inline size="small">
        <el-row>
            <el-form-item label="">
                <el-button type="primary" size="mini" @click="entryShow=true" :disabled="detailData.checkIn.state == 2">{{$t('desk.enterAccount')}}</el-button>
                <el-button type="primary" size="mini" @click="onAccountShow" :disabled="detailData.checkIn.state == 2">{{ $t('desk.charge') }}</el-button>
                <el-button type="primary" size="mini" @click="consumeGoodsHandle" :disabled="detailData.checkIn.state == 2">{{ $t('desk.serve_miniPub') }}</el-button>
                <el-button type="primary" size="mini" @click="checkOutHandle" :disabled="detailData.checkIn.state == 2">{{ $t('desk.order_checkout') }}</el-button>
                <el-button type="primary" size="mini" @click="invoicingHandle" :disabled="detailData.checkIn.state == 2">{{ $t('desk.order_invoice') }}</el-button>
<!--                <el-button type="primary" size="mini">{{$t('commons.print')}}</el-button>-->
                <el-button type="primary" size="mini" @click="destructionHandle" :disabled="detailData.checkIn.state == 2">{{$t('desk.customer_rich')}}</el-button>
<!--                <el-button type="primary" size="mini" @click="someAccountsHandle">部分结账</el-button>-->
<!--                <el-button type="primary" size="mini" @click="undoCheckoutA" :disabled="detailData.checkIn.state != 2">{{$t('desk.customer_undoCheckoutA')}}</el-button>-->
                <!-- <el-button type="primary" size="mini" @click="knotShow=true" :disabled="detailData.checkIn.state == 2">{{$t('desk.order_goTie')}}</el-button> -->
                <el-button type="primary" size="mini" @click='sideOrderHandle' :disabled="detailData.checkIn.state == 2">{{$t('desk.attachedMeal')}}</el-button>
            </el-form-item>
        </el-row>
        <el-form-item :label="$t('desk.order_accountsType')+':'">
            <el-button :type="searchForm.state == '' ? 'primary' : ''" size="mini" @click="consume_order_list('')">{{$t('desk.order_allAccounts')}}</el-button>
            <el-button :type="searchForm.state == '2' ? 'primary' : ''" size="mini" @click="consume_order_list(2)">{{$t('desk.order_haveAccounts')}}</el-button>
            <el-button :type="searchForm.state == '1' ? 'primary' : ''" size="mini" @click="consume_order_list(1)">{{$t('desk.order_notHaveAccounts')}}</el-button>
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
        <el-table-column prop="createTime" :label="$t('desk.customer_spendTime')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="roomName" :label="$t('desk.home_roomNum')" show-overflow-tooltip></el-table-column>
        <el-table-column :label="$t('desk.order_accountingProgram')" show-overflow-tooltip>
            <template slot-scope="{row}">
                {{F_priceType(row.priceType)}}
                <!-- /    {{row.priceType}} -->
            </template>
        </el-table-column>
        <el-table-column :label="$t('desk.order_payment')" >
            <template slot-scope="{row}">
                {{getPriceStr(row.payPrice)}}
            </template>
        </el-table-column>
        <el-table-column prop="consumePrice" :label="$t('desk.order_expense')">
            <template slot-scope="{row}" style="color: red">
                {{getPriceStr(row.consumePrice)}}
            </template>
        </el-table-column>
		<el-table-column prop="state" label="业务说明" show-overflow-tooltip>
		    <template slot-scope="{row}">
               <!-- "1": '订金',
                "2": '押金',
                "3": '收款',
                "4": '退款',
                "5": '加收全天房费',
                "6": '加收半天房费',
                "7": '损物赔偿',
                "8": '迷你吧',
                "9": '完全冲调',
                "10": '部分冲调',
                "11": '免单',
                "12": '房费',
                "13": '挂账',
                "14": '餐吧消费',
                "15":'温泉税',
                "16":'住宿税',
                "100": '其他' -->
		       <span v-if="row.priceType == 1">
                    <span v-if="row.payType == 1">现金定金</span>
                    <span v-if="row.payType == 2">信用卡订金 </span>
                    <span v-if="row.payType == 4">其他定金 </span>
                </span>
                <span v-if="row.priceType == 2">
                    <span v-if="row.payType == 1">现金押金</span>
                    <span v-if="row.payType == 2">信用卡押金 </span>
                    <span v-if="row.payType == 4">其他押金</span>
                </span>
                <span v-if="row.priceType == 3">
                    <span v-if="row.payType == 1">现金收款</span>
                    <span v-if="row.payType == 2">信用卡收款 </span>
                    <span v-if="row.payType == 4">其他押金</span>
                </span>
                <span v-if="row.priceType == 5">房费</span>
                <span v-if="row.priceType == 6">房费</span>
                <span v-if="row.priceType == 7">
                    {{row.damageName}}(￥{{row.unitPrice}}) * {{row.damageCount}}
                </span>
                <span v-if="row.priceType == 8">
                   <span v-if="row.goodsList&&row.goodsList.length > 0" v-for="item in row.goodsList">
                       {{item.goodsName}}({{item.price}})*{{item.goodsCount}}
                   </span>
                </span>
                <span v-if="row.priceType == 9">
                </span>

                <span v-if="row.priceType == 10">
                </span>
                <span v-if="row.priceType == 12">房费</span>
                <span v-if="row.priceType == 13">
                     {{row.creditName}}({{$t('commons.paymentWay.'+row.putUp)}})
                </span>
                <span v-if="row.priceType == 14">
                   <!-- 具体餐品 -->
                   <span v-if="row.disherOrderSubList&&row.disherOrderSubList.length > 0" v-for="item in row.disherOrderSubList">
                       {{item.dishesName}}({{item.unitPrice}})*{{item.dishesCount}}
                   </span>
                </span>
                <span v-if="row.priceType == 15">
                    温泉税(￥{{row.unitPrice}}) * {{row.taxCount}}
                </span>
                <span v-if="row.priceType == 16">
                    住宿税(￥{{row.unitPrice}}) * {{row.taxCount}}
                </span>
		    </template>
		</el-table-column>
        <el-table-column prop="state" :label="$t('food.common.status')" show-overflow-tooltip>
            <template slot-scope="{row}">
                {{row.state == 1 ? $t('desk.customer_outStand') : $t('desk.customer_closeAccount')}}
            </template>
        </el-table-column>
<!--        <el-table-column prop="enterType" :label="$t('desk.order_businessThat')" show-overflow-tooltip></el-table-column>-->
        <el-table-column prop="creatorName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
        <el-table-column :label="$t('desk.home_note')" show-overflow-tooltip>
            <template slot-scope="{row}">
                <span :style="row.priceType == 10 ? 'color:#3a8ee6' : '' ">{{row.remark}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')">
            <template slot-scope="{row}">
                <el-button type="text" size="mini" @click="consume_move(row)">{{$t('desk.customer_remove')}}</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div style="margin-top:10px"></div>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.pageSize" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>

    <!--入账 -->
    <el-dialog top='0' :title="$t('desk.enterAccount')" :visible.sync="entryShow">
        <el-form :model="consumeOperForm" ref="entry" :rules="rules" size="mini" label-width="100px">
            <p>{{$t('desk.book_firstInto')}}</p>
            <el-form-item :label="$t('desk.order_payProject')+':'">
                <el-radio-group v-model="consumeOperForm.priceType">
                    <el-radio-button :label="3" :value="3">{{$t('desk.customer_collectionA')}}</el-radio-button>
                    <el-radio-button :label="2" :value="2">{{$t('desk.order_theDeposit')}}</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('desk.order_selectPayWay')+':'" v-if="consumeOperForm.priceType == 3 || consumeOperForm.priceType == 2">
                <el-radio-group v-model="consumeOperForm.payType">
                    <!-- <el-radio v-for="(value, key) in $t('commons.payType')" :label="key" :key="key" v-if="key != 3">{{value}}</el-radio> -->
                    <el-radio v-for="(value, key) in payTypeList()" :label="key" :key="key">{{value}}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('desk.order_consumptionProject')+':'">
                <el-radio-group v-model="consumeOperForm.priceType" @change="priceTypeChange">
                    <el-radio-button :label="5" :value="5">{{$t('desk.order_addDayPrice')}}</el-radio-button>
                    <el-radio-button :label="6" :value="6">{{$t('desk.order_addHalfPrice')}}</el-radio-button>
                    <el-radio-button :label="7" :value="7">{{$t('desk.order_loosAndCompensation')}}</el-radio-button>
                    <el-radio-button :label="15" :value="15">{{$t('desk.book_wenquan')}}</el-radio-button>
                    <el-radio-button :label="16" :value="16">{{$t('desk.book_liveFee')}}</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <template v-if="consumeOperForm.priceType==7">
                <el-form-item :label="$t('desk.order_goodsType')+':'">
                    <el-select v-model="consumeOperForm.damageTypeId" @change="damageTypeIdChange">
                        <el-option v-for="item in hoteldamagetypeList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('desk.order_goodsName')+':'">
                    <el-select v-model="consumeOperForm.damageId" @change="getDdamageInfo">
                        <el-option v-for="item in hoteldamageList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-input-number @change="getDamagePrice" :disabled="!consumeOperForm.damageId"  v-model="consumeOperForm.damageCount" :min="1" label=""></el-input-number>
                </el-form-item>
            </template>

            <template v-if="consumeOperForm.priceType == 15 || consumeOperForm.priceType == 16">
                <el-form-item :label="$t('desk.order_unitPrice')+':'">
                    <el-input @change="getDamagePrice" :placeholder="$t('desk.order_unitPrice')" type="number" style="width: 100px;" v-model="unitPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('desk.order_number')+':'">
                    <el-input-number style="width: 100px;" @change="getDamagePrice" @focus="getDamagePrice" :disabled="!taxCount"  v-model="taxCount" :min="1" label=""></el-input-number>
                </el-form-item>
            </template>

            <el-form-item :label="$t('desk.customer_sum')+':'">
                <el-input class="11111" v-if="consumeOperForm.priceType==3||consumeOperForm.priceType==2" v-model="consumeOperForm.payPrice" autocomplete="off" :placeholder="$t('desk.customer_sum')"></el-input>
                <el-input type="number" style="width: 100px;" v-else v-model="consumeOperForm.consumePrice" autocomplete="off" :placeholder="$t('desk.customer_sum')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('desk.home_note') + ':'">
                <el-input class="" :placeholder="$t('desk.home_note')" type="textarea" v-model="consumeOperForm.remark" autocomplete="off"></el-input>
            </el-form-item>
<!--            <el-form-item label="打印单据：">-->
<!--                <el-checkbox v-model="consumeOperForm.name"></el-checkbox>-->
<!--            </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="entryShow = false">{{ $t('commons.close') }}</el-button>
            <el-button type="primary" @click="consume_oper(1,'entry')">{{$t('desk.enterAccount')}}</el-button>
        </div>
    </el-dialog>
    <!-- 挂账 -->
    <cardTao @refreshFatherData="updataInfo" ref="cardTao" :detailData = "detailData" :currentRoom="currentRoom" ></cardTao>
    <!--走结-->
    <el-dialog top='0' :title="$t('desk.order_goTie')" :visible.sync="knotShow" width="500px">
        <el-form :model="consumeOperForm" ref="knot" :rules="rules" size="mini" label-width="20px">
            <el-row v-if="currentRoom">
                <el-col :span="8">
                    {{$t('desk.home_roomType')}}：{{currentRoom.roomTypeName}}
                </el-col>
                <el-col :span="8">
                    {{$t('desk.home_roomNum')}}：{{currentRoom.houseNum}}
                </el-col>
                <el-col :span="8">
                   {{$t('desk.customer_livePeople')+':'}}{{currentRoom.personList[0] && currentRoom.personList[0].name}}
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
                       {{$t('desk.customer_livePeople')+':'}}{{detailData.inRoomList && detailData.inRoomList[0] && detailData.inRoomList[0].personList
                        && detailData.inRoomList[0].personList[0].name}}
                    </el-col>
                </template>
            </el-row>
            <br />
            <el-form-item label="" class="">
                <p>{{$t('desk.order_ifGoTie')}}</p>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="knotShow=false">{{ $t('commons.close') }}</el-button>
            <el-button type="primary" @click="out_check_in">{{ $t('commons.confirm') }}</el-button>
        </div>
    </el-dialog>
    <!--开发票-->

    <!--退房结账-->
    <checkoutTao ref="checkoutTao" :detailData = "detailData" :currentRoom="currentRoom" @getOrderDetail="getOrderDetail" ></checkoutTao>
   <!-- <el-dialog top='0' :title="$t('desk.order_checkout')" :visible.sync="checkOutShow" width="800px">
        <el-form :model="consumeOperForm" ref="checkOut" :rules="rules" size="mini" label-width="100px">
            <el-row v-if="currentRoom">
                <el-col :span="8">
                    {{$t('desk.home_roomType')}}：{{currentRoom.roomTypeName}}
                </el-col>
                <el-col :span="8">
                    {{$t('desk.home_roomNum')}}：{{currentRoom.houseNum}}
                </el-col>
                <el-col :span="8">
                   {{$t('desk.customer_livePeople')+':'}}{{currentRoom.personList && currentRoom.personList[0] && currentRoom.personList[0].name}}
                </el-col>
            </el-row>
            <br/>
            <div class="cost margin-t-10" v-if="detailData">
                <div class="wrap" style="background:#efefef">
                    <span class="fee" v-if="detailData.payPrice - detailData.consumePrice > 0">{{ $t('desk.order_shouldBack') }}：{{detailData.payPrice - detailData.consumePrice}}</span>
                    <span class="fee" v-else>{{ $t('desk.order_receivable') }}：{{detailData.consumePrice - detailData.payPrice}}</span>
                    <div class="costNum">
                        <el-row style="padding-bottom: 10px;">{{ $t('desk.consumerTotal') }}：<span class="text-red">{{detailData.consumePrice}}</span></el-row>
                        <el-row>{{ $t('desk.payTotal') }}：<span class="text-green">{{detailData.payPrice}}</span></el-row>
                    </div>
                </div>
            </div>
            <br/>
            <el-form-item :label="$t('desk.customer_sum') + ':'" class="" prop="consumePrice">
                <el-input size="medium" class="width200" type="number" v-model="consumeOperForm.consumePrice" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item :label="$t('desk.home_note') + ':'">
                <el-input type="textarea" v-model="consumeOperForm.remark" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="checkOutShow=false">{{ $t('commons.close') }}</el-button>
            <el-button type="primary" @click="set_out_check_in">{{ $t('commons.confirm') }}</el-button>
        </div>
    </el-dialog> -->
    <!--冲调-->
    <el-dialog top='0' :title="$t('desk.customer_rich')" :visible.sync="destructionShow" width="800px">
        <el-form :model="consumeOperForm" ref="destruction" :rules="rules" size="mini" label-width="100px" >
            <el-row v-if="currentRoom">
                <el-col :span="8">
                    {{$t('desk.home_roomType')}}：{{currentRoom.roomTypeName}}
                </el-col>
                <el-col :span="8">
                    {{$t('desk.home_roomNum')}}：{{currentRoom.houseNum}}
                </el-col>
                <el-col :span="8">
                   {{$t('desk.customer_livePeople')+':'}}{{currentRoom.personList && currentRoom.personList[0] && currentRoom.personList[0].name}}
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
                       {{$t('desk.customer_livePeople')+':'}}{{detailData.inRoomList && detailData.inRoomList[0] && detailData.inRoomList[0].personList &&
                        detailData.inRoomList[0].personList[0].name}}
                    </el-col>
                </template>
            </el-row>
            <br />
            <p>{{$t('desk.order_accountDeveloped')}}</p>
            <el-table v-loading="loading" :data="destructionList" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
                <el-table-column :label="$t('desk.order_accountingProgram')" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        {{F_priceType(row.priceType)}}
                    </template>
                </el-table-column>
                <el-table-column prop="consumePrice" :label="$t('desk.order_expense')" show-overflow-tooltip></el-table-column>
<!--                <el-table-column prop="enterType" :label="$t('desk.order_businessThat')" show-overflow-tooltip></el-table-column>-->
                <el-table-column prop="createTime" :label="$t('desk.enterAccountTime')" show-overflow-tooltip></el-table-column>
                <el-table-column prop="roomName" :label="$t('desk.home_roomNum')" show-overflow-tooltip></el-table-column>
                <el-table-column prop="creatorName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-form-item style="margin-top: 10px;" :label="$t('desk.order_mixingWay')+':'" prop="priceType">
                <el-radio-group v-model="consumeOperForm.priceType">

                    <el-radio :label="9" :value="9">{{$t('desk.order_completelyAgainst')}}</el-radio>
                    <el-radio :label="10" :value="10">{{$t('desk.order_partCompletely')}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('desk.order_completelyPrice')+':'" prop="consumePrice"  v-if="consumeOperForm.priceType == 10">
                <el-input class="width200" type="text" v-model="consumeOperForm.consumePrice"></el-input>
                <em style="margin-left:10px;color:#888;font-size: 12px;">{{$t('desk.order_attention')}}</em>
            </el-form-item>
            <el-form-item :label="$t('desk.order_completelyReason')+':'" prop="remark">
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
    <consumeGoods ref="consumeGoods" :detailData = "detailData" @getOrderDetail="getOrderDetail"  @get_consume_order_list="consume_order_list" :currentRoom="currentRoom" />
    <!--开发票-->
    <invoicing ref="invoicing" :detailData = "detailData" @get_consume_order_list="consume_order_list" :currentRoom="currentRoom" />
    <!-- 附餐 -->
    <sideOrder ref='sideOrder'></sideOrder>
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
import sideOrder from './sideOrder'
import cardTao from "@/components/cardTao";
import checkoutTao from "@/components/checkoutTao";

export default {
    mixins: [myMixin],
   props: ["detailData", "currentRoomId"],
    components: {
        consumeGoods,
        someAccounts,
        invoicing,
        sideOrder,
        cardTao,
        checkoutTao
    },
    computed: {
        ...mapState({
        }),
        rules(){
            return{
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
                },
                ],
            }
        }
    },
    data() {
        return {
            loading: false,
            hotelenterLoading: false,
            entryShow: false, //入账
            payTypeShow: false,
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
                consumePrice: '',
                payPrice:'',
                priceType: '',
                payType: '',
                name: '',
                damageCount:''
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
            unitPrice:'',
            taxCount:'',//税--数量
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [{}], //表格数据
            hoteldamagetypeList: [],
            hoteldamageList: [],
            hotelenterList: [], //挂账企业列表
            destructionList: [], //冲调的账务
            currentRoom: {
                personList: []
            },
            checkInId: '',
        };
    },

    created() {
        this.checkInId = this.$route.query.id;
        console.log(this.currentRoomId)
        if (this.currentRoomId) {
            this.currentRoom = this.detailData.inRoomList.filter(item=>{
                return item.id == this.currentRoomId
            })[0];
        }

        //监听单价和数量
        this.$watch('unitPrice', (value) => {
            this.getDamagePrice();
        });
        this.$watch('taxCount', (value) => {
          this.getDamagePrice();
        });

    },

    mounted() {
        let id = this.$route.query.id;

        this.consume_order_list(1)
        this.hoteldamagetype_list()
        this.hotelenter_list()
    },

    methods: {
      payTypeList(){
        let obj = this. $t('commons.payType');
        let newArry={};
         for(let i in obj){
           if(i!=3){
             newArry[i] = obj[i];
           }
         }
         return newArry;

      },
      updataInfo(){
          this.consume_order_list()
          this.getOrderDetail()
      },
      //点击挂账按钮
      onAccountShow(){
        //该id为checkinId
        this.$refs.cardTao.resetVisibel(this.$route.query.id);
      },
        //撤销结账
        undoCheckoutA() {
            this.$F.doRequest(this, '/pms/checkin/out_check_in_cancel', {
                checkInId: this.checkInId
            }, res => {
                this.$router.push("/orders?type=order");
            }, res => {
                this.$message(res.message);
            })
        },

        //加载财务列表
        consume_order_list(state) {
            this.searchForm.state = state || '';
            this.searchForm.checkInId = this.checkInId;
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
            this.$confirm(this.$t('desk.order_ifDelete'), this.$t('commons.tip_desc'), {
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
            if(this.unitPrice){
                params.unitPrice = this.unitPrice
            }
            if(this.taxCount){
                params.taxCount = this.taxCount
            }
            // params.orderId = this.$route.query.id

            params.checkInId = this.checkInId
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
                    this.$message.error(this.$t('desk.order_selectEntryItem'));
                    return;
                }
                if (params.priceType == 3 && !params.payType) {
                    // this.payTypeShow = true;
                    this.$message.error(this.$t('desk.order_pleaseSelectPayWay'));
                    return;
                }
                if (params.priceType == 3 || params.priceType == 2) {
                    if (!params.payPrice) {
                        this.$message.error(this.$t('desk.order_inputPrice'));
                        return;
                    }
                } else {

                    if (!params.consumePrice) {
                        this.$message.error(this.$t('desk.order_inputPrice'));
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
                params.payPrice =  this.consumeOperForm.payPrice
                console.log(params)
            }

            //冲调
            if (type == 3) {
                if(parseFloat(this.consumeOperForm.consumePrice) > parseFloat(this.destructionList[0].payPrice)){
                   this.$message.error(this.$t('desk.order_partComShould') +  parseFloat(this.destructionList[0].payPrice));
                   return;
                }

                let priceType  =  this.destructionList[0].priceType
                let priceTypeList = [5,6,7,8,14,15,16,17,18]
                if(priceTypeList.indexOf(priceType) > -1){
                    console.log('消费类')
                    params.consumePrice = 0 - this.getPriceStr(this.consumeOperForm.consumePrice)
                }else{
                    console.log('付款类')
                    params.payPrice = 0 -  this.getPriceStr(this.consumeOperForm.payPrice)
                }
                console.log(this.destructionList[0])
                params.richIds = this.destructionList[0].id
                params.priceType = this.consumeOperForm.priceType
                params.state = this.destructionList[0].state
                params.payType = 0 //挂账无需支付方式

            }
            console.log(params)
            // return

            //退房结账
            // if (type == 4) {
            //     params.state = 2
            //     if(params.consumePrice<0){
            //         params.payType = 0
            //     }
            //     if(params.isPoints){
            //         params.scoresDiscount = 200
            //         params.scoresPrice = 20
            //     } else {
            //         params.scoresDiscount = ''
            //         params.scoresPrice = ''
            //     }
            // }

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$F.doRequest(this, '/pms/consume/consume_oper', params, (res) => {
                        this.entryShow = false
                        this.destructionShow = false;
                        this.consumeOperForm = {
                            consumePrice: '',
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


        //走结
        out_check_in() {
            let params = {
                checkInId: this.checkInId,
                billType: 4
            }
            this.$F.doRequest(this, '/pms/checkin/out_check_in', params, (res) => {
                this.knotShow = false
                this.$router.push("/orders?type=order");
            })
        },

        //退房结账
        set_out_check_in() {
            let info = {
                checkInId: this.checkInId,
                state:'',
                pageIndex: 1,
                pageSize: 1000
            }
            this.$F.doRequest(this, '/pms/consume/consume_order_list', info, (res) => {
               // console.log(this.isArrSame(res.consumeOrderList,1)) // 判断是否都为1
               // console.log(this.isArrSame(res.consumeOrderList,2)) //判断是否都为2
               //未结状态 1
               //已结状态 2
               //判断 state状态全是1 billType =  1  ,state状态全是2 billType =  3, state状态全有1和2 billType =4
               // let array = [1,1,1,1]
               // let array = [2,2,2,2]
               // let array = [1,2,1,2]
               let array = res.consumeOrderList.map(v=>{
                   return v.state
               });
               console.log(array);
               let params = {}
               params.checkInId = this.checkInId

                console.log(this.isArrSame(array,1))
                console.log(this.isArrSame(array,2))
               if(this.isArrSame(array,1) == true){
                   params.billType = 1
               }else if(this.isArrSame(array,2) == true){
                   params.billType = 3
               }else{
                   params.billType = 4
               }
               this.$F.doRequest(this, '/pms/checkin/out_check_in', params, (res) => {
                   this.checkOutShow = false
                   this.getOrderDetail();
                   this.consume_order_list();
               })
            })
        },
        //判断数组中的值是否相同
        isArrSame(array,state) {
                return !array.some(function(value, index) {
                    return value !== state
                });
        },

        //开发票按钮点击
        openInvoiceHandle() {
            this.openInvoiceForm.checkInId = this.checkInId
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
                    this.$message.error(this.$t('desk.order_noPeople'));
                    return
                }
            }
            this.openInvoiceShow = true
        },
          //点击退房结账按钮
        checkOutHandle() {
            this.$refs.checkoutTao.resetVisibel()
            // this.checkOutShow = true;
            // this.consumeOperForm.consumePrice = this.detailData.totalPrice
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
                this.taxCount = ''
                if (this.currentRoom) {
                    this.consumeOperForm.consumePrice = this.currentRoom.realPrice
                } else {
                    if (this.detailData && this.detailData.inRoomList.length) {
                        this.consumeOperForm.consumePrice = this.detailData.inRoomList[0].realPrice
                    } else {
                        this.consumeOperForm.consumePrice = ''
                        this.$message.error(this.$t('desk.order_noPeople'));
                        return
                    }
                }
            } else if (e == 6) {
                this.taxCount = ''
                console.log(this.currentRoom)
                if (this.currentRoom) {
                    this.consumeOperForm.consumePrice = (this.currentRoom.realPrice * 0.5).toFixed(2)

                } else {
                    if (this.detailData && this.detailData.inRoomList.length) {
                        this.consumeOperForm.consumePrice = (this.detailData.inRoomList[0].realPrice * 0.5).toFixed(2)
                    } else {
                        this.consumeOperForm.consumePrice = ''
                        this.$message.error(this.$t('desk.order_noPeople'));
                        return
                    }
                }
            } else if (e == 7) {
                this.taxCount = ''
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

            if(this.consumeOperForm.priceType == 15 || this.consumeOperForm.priceType == 16){
                let count = this.taxCount ? this.taxCount : 0
                let unitPrice = this.unitPrice ? this.unitPrice : 0
                let p = count * unitPrice
                this.consumeOperForm.consumePrice = p

                console.log(p)

                console.log( this.consumeOperForm.consumePrice)
            }else{
                this.taxCount = ''
                console.log(this.consumeOperForm.damageId)
                console.log(this.hoteldamageList)
                let list = this.hoteldamageList
                if(list.length > 0 && this.consumeOperForm.damageTypeId && this.consumeOperForm.damageId ){
                   for(let i in list){
                       if(this.consumeOperForm.damageId == list[i].id){
                           console.log(list[i])
                           let p = parseFloat(list[i].damagePrice)  * parseFloat(this.consumeOperForm.damageCount)
                           this.consumeOperForm.consumePrice = p.toFixed(0)
                           this.consumeOperForm.damageName = list[i].name
                       }
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
                this.$message.error(this.$t('desk.order_selectOperateAccount'));
                return
            }
            if (this.multipleSelection.length > 1) {
                this.$message.error(this.$t('desk.order_onlyOneAccount'));
                return
            }
            for (let k in this.multipleSelection) {
                if (this.multipleSelection[k].billingType == 1) {
                    this.$message.error(this.$t('desk.order_autoTiePrice'));
                    return
                }

            }
            this.destructionList = this.multipleSelection
            this.destructionShow = true
            this.$forceUpdate()
        },
        //开发票
        invoicingHandle() {
            this.openInvoiceForm.checkInId = this.checkInId
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
                    this.$message.error(this.$t('desk.order_noPeople'));
                    return
                }
            }
            this.$refs.invoicing.init(this.$route.query.id, this.openInvoiceForm);
        },
        consumeGoodsHandle() {
          //该id为checkinId
            this.$refs.consumeGoods.init(this.$route.query.id);
        },
        //点击 附餐 按钮
        sideOrderHandle(){
          //该id为checkinId
            this.$refs.sideOrder.init(this.$route.query.id);
        },
        someAccountsHandle() {
          //该id为checkinId
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
            console.log(val)
            console.log(oldval)
            this.taxCount = ''
            this.unitPrice = ''
            this.consumeOperForm.priceType = val
            if(val == 9 || val == 10){
                // this.consumeOperForm.consumePrice =  this.destructionList[0].consumePrice
                // console.log(this.destructionList[0].consumePrice)
                console.log(this.destructionList[0])
                let priceType  =  this.destructionList[0].priceType //当前冲调记录类型
                let priceTypeList = [5,6,7,8,14,15,16,17,18] //消费类
                if(priceTypeList.indexOf(priceType) > -1){
                    console.log('消费类')
                    this.consumeOperForm.payPrice = ''
                    if(val == 9){
                       this.consumeOperForm.consumePrice =  this.destructionList[0].consumePrice
                    }
                    if(val == 100){
                        this.consumeOperForm.consumePrice =  ''
                    }
                }else{
                    console.log('入账类')
                     this.consumeOperForm.consumePrice = ''
                    if(val == 9){
                       this.consumeOperForm.payPrice =  this.destructionList[0].payPrice
                    }
                    if(val == 100){
                        this.consumeOperForm.payPrice =  ''
                    }
                }

            }else{
                this.consumeOperForm.consumePrice = ''
            }

            console.log(this.consumeOperForm)



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
