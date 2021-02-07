<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-04 17:59:10
 * @FilePath: \jiudian\src\views\market\orders\coms\finance.vue
 -->
<template>
    <div class="finance">
        <!-- 查询部分 -->
        <el-form inline size="small">
            <el-row>
                <el-form-item label="">
                    <el-button type="danger" size="mini" @click="entryShow=true" :disabled="detailData.checkIn.state == 2">{{$t('desk.enterAccountA')}}</el-button>
                    <el-button type="primary" size="mini" @click='sideOrderHandle' :disabled="detailData.checkIn.state == 2">{{$t('desk.attachedMealA')}}</el-button>
                    <el-button type="primary" size="mini" @click="stayoverHandle" :disabled="detailData.checkIn.state == 2" v-if="currentRoom.id">{{$t('desk.home_stayOver')}}</el-button>
                    <el-button type="primary" size="mini" @click="consumeGoodsHandle" :disabled="detailData.checkIn.state == 2">{{ $t('desk.serve_miniPub') }}</el-button>
                    <el-button type="primary" size="mini" @click="destructionHandle" :disabled="detailData.checkIn.state == 2">{{$t('desk.customer_richA')}}</el-button>
                </el-form-item>
                <br/>
                <el-form-item label="">
                    <el-button type="danger" size="mini" :disabled="detailData.checkIn.state == 2" @click="someAccountsHandle">{{$t('desk.order_partBillA')}}</el-button>
                    <el-button type="danger" size="mini" @click="checkOutHandle" :disabled="detailData.checkIn.state == 2">{{ $t('desk.order_checkout') }}</el-button>
                    <el-button type="primary" size="mini" @click="onAccountShow" :disabled="detailData.checkIn.state == 2">{{ $t('desk.charge') }}</el-button>

                    <el-button type="primary" size="mini" @click="invoicingHandle" :disabled="detailData.checkIn.state == 2">{{ $t('desk.order_invoice') }}</el-button>
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
            <el-table-column type="selection" width="55" :selectable="selectable">
            </el-table-column>
            <el-table-column prop="createTime" :label="$t('desk.customer_spendTime')" show-overflow-tooltip></el-table-column>
            <el-table-column prop="roomName" :label="$t('desk.home_roomNum')" show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('desk.order_accountingProgram')" show-overflow-tooltip width="120">
                <template slot-scope="{ row }">
                    {{row.priceType}}
                    <span v-if="row.priceType == 9 || row.priceType == 10" style="color: red">
                        {{F_priceType(row.priceType ? row.priceType : 99)}}
                    </span>
                    <span v-else :class="row.richType == 1 ? 'red' : ''">
                        {{ (row.priceType != 17 && row.priceType != 18) ? `【${$t('commons.payType')[row.payType || 1]}】` : ''}}
                        {{F_priceType(row.priceType ? row.priceType : 99)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('desk.order_paymentB')" >
                <template slot-scope="{ row }">
                    <span v-if="row.priceType == 9 || row.priceType == 10" style="color: red">{{row.payPrice ? $F.numFormate((0 - row.payPrice)) : ''}}</span>
                    <span v-else :class="row.richType == 1 ? 'red' : ''">{{$F.numFormate(row.payPrice)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="consumePrice" :label="$t('desk.order_expenseA')">
                <template slot-scope="{ row }">
                    <span v-if="row.priceType == 9 || row.priceType == 10" style="color: red">{{row.consumePrice ? $F.numFormate((0 - row.consumePrice)) : ''}}</span>
                    <span v-else :class="row.richType == 1 ? 'red' : ''">{{$F.numFormate(row.consumePrice)}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="$t('desk.order_yewu')" width="200" show-overflow-tooltip>
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

                    <div :class="row.richType == 1 ? 'text-blue' : ''">
                       <span v-if="row.richType == 1 ? 'text-blue' : ''"> {{F_priceType(9)}}--</span>
                       <span v-if="row.priceType == 1">
                            <span v-if="row.payType == 1">{{$t('desk.add_cashDeposit')}}</span>
                            <span v-if="row.payType == 2">{{$t('desk.add_cardDeposit')}}</span>
                            <span v-if="row.payType == 4">{{$t('desk.add_otherDeposit')}} </span>
                        </span>
                                <span v-if="row.priceType == 2">
                            <span v-if="row.payType == 1">{{$t('desk.add_cashDepositA')}}</span>
                            <span v-if="row.payType == 2">{{$t('desk.add_cardDepositA')}} </span>
                            <span v-if="row.payType == 4">{{$t('desk.add_otherDepositA')}}</span>
                        </span>
                                <span v-if="row.priceType == 3">
                            <span v-if="row.payType == 1">{{$t('desk.add_cashGet')}}</span>
                            <span v-if="row.payType == 2">{{$t('desk.add_cardGet')}} </span>
                            <span v-if="row.payType == 4">{{$t('desk.add_otherGet')}}</span>
                        </span>
                                <span v-if="row.priceType == 5">{{$t('desk.serve_roomPrice')}} (￥{{row.consumePrice}}) </span>
                                <span v-if="row.priceType == 6">{{$t('desk.serve_roomPrice')}}(￥{{row.consumePrice}})</span>
                                <span v-if="row.priceType == 7">
                                {{row.damageTypeName}}(￥{{$F.numFormate(row.consumePrice)}}) * {{row.damageCount}}
                        </span>
                                <span v-if="row.priceType == 8">
                           <span v-if="row.goodsList&&row.goodsList.length > 0" >
                               <div v-for="(item,index) in row.goodsList" :key="index">
                                   {{item.goodsName}}(￥{{$F.numFormate(item.price)}})*{{item.goodsCount}}
                               </div>
                           </span>
                        </span>
                        <!-- 5,6,7,8,14,15,16,17,18 消费类 -->
                        <!-- 全部冲调 -->
                        <span class="text-blue" v-if="(row.priceType == 9 || row.priceType == 10) && row.richList.length > 0">
                    <!-- {{row.richList[0].priceType}}/ -->
                            <!-- 全部冲调 -- -->
                            {{F_priceType(row.priceType)}} --
                            <span v-if="row.richList[0].priceType == 1">
                                 <span v-if="row.richList[0].payType == 1">{{$t('desk.add_cashDeposit')}}</span>
                                 <span v-if="row.richList[0].payType == 2">{{$t('desk.add_cardDeposit')}}</span>
                                 <span v-if="row.richList[0].payType == 4">{{$t('desk.add_otherDeposit')}} </span>
                             </span>
                            <span v-if="row.richList[0].priceType == 2">
                                <span v-if="row.richList[0].payType == 1">{{$t('desk.add_cashDepositA')}}</span>
                                <span v-if="row.richList[0].payType == 2">{{$t('desk.add_cardDepositA')}} </span>
                                <span v-if="row.richList[0].payType == 4">{{$t('desk.add_otherDepositA')}}</span>
                            </span>
                            <span v-if="row.richList[0].priceType == 3">
                                <span v-if="row.richList[0].payType == 1">{{$t('desk.add_cashGet')}}</span>
                                <span v-if="row.richList[0].payType == 2">{{$t('desk.add_cardGet')}} </span>
                                <span v-if="row.richList[0].payType == 4">{{$t('desk.add_otherGet')}}</span>
                            </span>
                            <span v-if="row.richList[0].priceType == 5"> {{F_priceType(row.richList[0].priceType)}} </span>
                            <span v-if="row.richList[0].priceType == 6"> {{F_priceType(row.richList[0].priceType)}} </span>
                            <span v-if="row.richList[0].priceType == 7">
                                {{row.richList[0].damageTypeName}}(￥{{$F.numFormate(row.richList[0].consumePrice)}}) * {{row.richList[0].damageCount}}
                            </span>
                            <span v-if="row.richList[0].priceType == 8">
                                <div v-for="(item,index) in row.richGoodsList" :key="index">
                                     {{item.goodsName}}(￥{{$F.numFormate(item.price)}}) * {{item.goodsCount}}
                                </div>
                            </span>
                            <span v-if="row.richList[0].priceType == 13">
                               {{row.richList[0].creditName}}({{$t('commons.paymentWay.'+row.richList[0].putUp)}})
                            </span>
                            <span v-if="row.richList[0].priceType == 14">
                                <span v-if="row.richList[0].disherOrderSubList&&row.richList[0].disherOrderSubList.length > 0">
                                    <div v-for="(item,index) in row.richList[0].disherOrderSubList" :key="index">
                                        {{item.dishesName}}(￥{{$F.numFormate(item.unitPrice)}})*{{item.dishesCount}}
                                    </div>
                                </span>
                            </span>
                            <span v-if="row.richList[0].priceType == 15">
                                <span v-if="row.richList[0]">
                                   {{F_priceType(row.richList[0].priceType)}} ￥{{$F.numFormate(row.richList[0].unitPrice)}}) * {{row.richList[0].taxCount}}
                                </span>
                            </span>
                            <span v-if="row.richList[0].priceType == 16">
                                <span v-if="row.richList[0]">
                                   {{F_priceType(row.richList[0].priceType)}} ￥{{$F.numFormate(row.richList[0].unitPrice)}}) * {{row.richList[0].taxCount}}
                                </span>
                            </span>
                        </span>
                        <span v-if="row.priceType == 12">{{$t('desk.serve_roomPrice')}}(￥{{row.consumePrice}})</span>
                        <span v-if="row.priceType == 13">
                             {{row.creditName}}({{$t('commons.paymentWay.'+row.putUp)}})
                        </span>
                        <span v-if="row.priceType == 14">
                            <!-- 具体餐品 -->
                           <div v-if="row.disherOrderSubList&&row.disherOrderSubList.length > 0" v-for="(item,index) in row.disherOrderSubList" :key="index">
                               {{item.dishesName}}(￥{{$F.numFormate(item.unitPrice)}})*{{item.dishesCount}}
                           </div>
                        </span>
                        <span v-if="row.priceType == 15">
                            {{F_priceType(row.priceType)}}(￥{{$F.numFormate(row.unitPrice)}}) * {{row.taxCount}}
                        </span>
                        <span v-if="row.priceType == 16">
                            {{F_priceType(row.priceType)}}(￥{{$F.numFormate(row.unitPrice)}}) * {{row.taxCount}}
                        </span>
                        <span v-if="row.priceType == 17 || row.priceType == 18">
                            {{getHotelattaChmealDetail(row)}}
                        </span>
                        <span v-if="row.priceType == 22">
                            <!-- 商品费 -->
                            <div class="" v-if="row.shopOrderSubList&&row.shopOrderSubList.length > 0" v-for="item in row.shopOrderSubList">
                                {{item.goodsName}}(￥{{$F.numFormate(item.unitPrice)}})*{{item.goodsCount}}
                            </div>
                        </span>
                        <br v-if="row.richType == 1">
                        <span v-if="row.richType == 1" class="blue">
                           {{ $t('desk.reason') }}： {{row.richRemark}}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('food.common.status')" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{row.state == 1 ? $t('desk.customer_outStand') : $t('desk.customer_closeAccount')}}
                </template>
            </el-table-column>
            <!--        <el-table-column prop="enterType" :label="$t('desk.order_businessThat')" show-overflow-tooltip></el-table-column>-->
            <el-table-column prop="creatorName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('desk.home_noteB')" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span :class="row.priceType == 9 || row.priceType == 10 || row.richType == 1 ? 'text-red' : ''">
                        {{row.remark}}
                    </span>
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
        <el-dialog width="800px" top='0' :title="$t('desk.enterAccountB')" :visible.sync="entryShow">
            <el-form :model="consumeOperForm" ref="entry" :rules="rules" size="mini" label-width="100px">
                <p>{{$t('desk.book_firstInto')}}</p>
                 <el-form-item :label="$t('desk.order_consumptionProject')+':'">
                    <el-radio-group v-model="consumeOperForm.priceType" @change="priceTypeChange">
                        <el-radio-button :label="5" :value="5">{{$t('desk.order_addDayPrice')}}</el-radio-button>
                        <el-radio-button :label="6" :value="6">{{$t('desk.order_addHalfPrice')}}</el-radio-button>
                        <el-radio-button :label="7" :value="7">{{$t('desk.order_loosAndCompensation')}}</el-radio-button>
                        <el-radio-button :label="15" :value="15">{{$t('desk.book_wenquan')}}</el-radio-button>
                        <el-radio-button :label="16" :value="16">{{$t('desk.book_liveFee')}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('desk.order_payProject')+':'">
                    <el-radio-group v-model="consumeOperForm.priceType">
                        <el-radio-button :label="3" :value="3">{{$t('desk.customer_collectionA')}}</el-radio-button>
                        <el-radio-button :label="2" :value="2">{{$t('desk.order_theDeposit')}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <el-form-item :label="$t('desk.order_selectPayWayA')+':'" v-if="consumeOperForm.priceType == 3 || consumeOperForm.priceType == 2">
                    <el-radio-group v-model="consumeOperForm.payType">
                        <!-- <el-radio v-for="(value, key) in $t('commons.payType')" :label="key" :key="key" v-if="key != 3">{{value}}</el-radio> -->
                        <el-radio v-for="(value, key) in payTypeList()" :label="key" :key="key">{{value}}</el-radio>
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
                    <el-input type="number" style="width: 100px;" v-else v-model="consumeOperForm.consumePrices" autocomplete="off" :placeholder="$t('desk.customer_sum')"></el-input>
                </el-form-item>

                <el-form-item :label="$t('desk.home_note') + ':'">
                    <el-input class="" :placeholder="$t('desk.home_noteA')" type="textarea" v-model="consumeOperForm.remark" autocomplete="off"></el-input>
                </el-form-item>
                <!--            <el-form-item label="打印单据：">-->
                <!--                <el-checkbox v-model="consumeOperForm.name"></el-checkbox>-->
                <!--            </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="entryShow = false">{{ $t('commons.close') }}</el-button>
                <el-button type="primary" @click="consume_oper(1,'entry')">{{$t('desk.enterAccountC')}}</el-button>
            </div>
        </el-dialog>
        <!-- 挂账 -->
        <cardTao @refreshFatherData="updataInfo" ref="cardTao" :detailData = "detailData" :currentRoom="currentRoom" ></cardTao>

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
                     <el-input size="medium" class="width200" type="number" v-model="consumeOperForm.consumePrices" autocomplete="off" :disabled="true"></el-input>
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
        <el-dialog top='0' :title="$t('desk.customer_richA')" :visible.sync="destructionShow" width="800px">
            <el-form :model="consumeOperForm" ref="destruction" :rules="rules" size="mini" label-width="100px" >
                <el-row v-if="currentRoom">
                    <el-col :span="8">
                        {{$t('desk.home_roomType')}}：{{currentRoom.roomTypeName}}
                    </el-col>
                    <el-col :span="8">
                        {{$t('desk.home_roomNum')}}：{{currentRoom.houseNum}}
                    </el-col>
                    <el-col :span="8" v-if="currentRoom.personList">
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
                    <el-table-column prop="payPrice" :label="$t('desk.order_payment')" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="consumePrice" :label="$t('desk.order_expense')" show-overflow-tooltip></el-table-column>
                    <!--                <el-table-column prop="enterType" :label="$t('desk.order_businessThat')" show-overflow-tooltip></el-table-column>-->
                    <el-table-column prop="createTime" :label="$t('desk.enterAccountTime')" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="roomName" :label="$t('desk.home_roomNum')" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="creatorName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
                </el-table>
                <el-form-item style="margin-top: 10px;" :label="$t('desk.order_mixingWay')+':'" prop="priceType">
                    <el-radio-group v-model="consumeOperForm.priceType">
                        <el-radio :label="9" :value="9">{{$t('desk.order_completelyAgainst')}}</el-radio>
                        <!-- <el-radio :label="10" :value="10">{{$t('desk.order_partCompletely')}}</el-radio> -->
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('desk.order_completelyPrice')+':'" prop="consumePrices"  v-if="consumeOperForm.priceType == 10">
                    <el-input class="width200" type="text" v-model="consumeOperForm.consumePrices"></el-input>
                    <em style="margin-left:10px;color:#888;font-size: 12px;">
                        <!-- {{$t('desk.order_attention')}} -->
                        最大可冲调金额
                        <span v-if="priceTypeList.indexOf(destructionList[0].priceType) > -1">
                        {{destructionList.length > 0&&destructionList[0].consumePrice}}
                    </span>
                        <span v-else>
                        {{destructionList.length > 0&&destructionList[0].payPrice}}
                    </span>
                    </em>
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

        <!--    续住-->
        <el-dialog top="0" :title="$t('desk.home_stayOver')" :visible.sync="stayoverVisible" width="60%">
            <el-alert :title="$t('desk.home_needLeave')" type="error" :closable="false" show-icon></el-alert>
            <el-table :data="overstayTabledata" style="width: 100%" border header-row-class-name="default" size="small">
                <el-table-column :label="$t('desk.home_roomNum')" prop="houseNum">
                </el-table-column>
                <el-table-column :label="$t('desk.home_name')" prop="name">

                </el-table-column>
                <el-table-column :label="$t('desk.home_orignLeaveTime')" prop="checkoutTime">
                </el-table-column>
                <el-table-column :label="$t('desk.home_stayOverDay')" width="250">
                    <template slot-scope="{row}">
                        <el-input-number v-model="row.number" :step="1" @change="checkinDaysChange(row.number, row)"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('desk.home_newLeaveTime')" width="250">
                    <template class="block" slot-scope="{row}">
                        <el-date-picker
                            v-model="row.newLeaveTime"
                            type="date"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :placeholder="$t('desk.serve_chooseDate')"
                            @change="endTimeChange(row)"
                        ></el-date-picker>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" class="white" @click="stayoverVisible = false">{{$t('commons.cancel')}}</el-button>
                <el-button size="small" type="primary" class="submit" @click="stayoverSubmit">{{$t('commons.determine')}}</el-button>
            </div>
        </el-dialog>

        <!--部分结账-->
        <someAccounts ref="someAccounts" :detailData = "detailData" :currentRoom="currentRoom" @getOrderDetail="getOrderDetail"  />
        <!--迷你吧-->
        <consumeGoods ref="consumeGoods" :detailData = "detailData" @getOrderDetail="getOrderDetail"  @get_consume_order_list="consume_order_list" :currentRoom="currentRoom" />
        <!--开发票-->
        <invoicing ref="invoicing" :detailData = "detailData" @get_consume_order_list="consume_order_list" :currentRoom="currentRoom" />
        <!-- 附餐 -->
        <sideOrder ref='sideOrder' :currentRoom="currentRoom" :detailData="detailData" @getOrderDetail="getOrderDetail" @get_consume_order_list="consume_order_list"></sideOrder>
    </div>
</template>

<script>
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
};
import {
    mapState,
    mapActions
} from "vuex";
import myMixin from '@/utils/filterMixin';
import consumeGoods from './consumeGoods'
// import someAccounts from './someAccounts'
import someAccounts from './partAccounts'
import invoicing from './invoicing'
import sideOrder from './sideOrder'
import cardTao from "@/components/cardTao";
import checkoutTao from "@/components/checkoutTao";

export default {
    mixins: [myMixin],
    props: ["detailData", "currentRoom2"],
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
                consumePrices: [{
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
            currentRoom: {},
            hotelattaChmealList: [],
            stayoverVisible: false,
            overstayTabledata: [],
            overstayForm: {
                number: 1,
                newLeaveTime: ''
            },
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
                consumePrices: '',
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
            tableData: [], //表格数据
            hoteldamagetypeList: [],
            hoteldamageList: [],
            hotelenterList: [], //挂账企业列表
            destructionList: [], //冲调的账务
            checkInId: '',
            priceTypeList:[5,6,7,8,12,14,15,16,17,18,22]
        };
    },

    created() {
        this.checkInId = this.$route.query.id;
        //监听单价和数量
        this.$watch('unitPrice', (value) => {
            this.getDamagePrice();
        });
        this.$watch('taxCount', (value) => {
            this.getDamagePrice();
        });
        this.hoteldamagetype_list()
        this.hotelenter_list()
        this.consume_order_list(1);
        if (this.currentRoom2 && this.currentRoom2.roomId) {
            this.currentRoom = this.detailData.inRoomList[0];
        }
    },

    mounted() {
        let id = this.$route.query.id;
        this.fetchHotelattaChmealList();
    },

    methods: {
        selectable(row, index) {
            return row.richType != 1;
        },
        F_priceType(value) {
            let enums = this.$t('frontOffice.priceType')
            return value && enums[value] ? enums[value] : ''
        },
        getHotelattaChmealDetail(row) {
            let node = (this.hotelattaChmealList.filter((item) => {
                return item.id == row.attachMealId;
            }) || [])[0];
            if (node) {
                return ` ${node.mealName} (￥${node.mealPrice}) *${row.attachMealCount}`
            }
        },
        fetchHotelattaChmealList() {
            this.$F.doRequest(this,
                "/pms/hotelattachmeal/list",
                {
                    pageIndex: 1,
                    pageSize: 999,
                    state: 1, //1启用 2禁用
                },
                (res) => {
                    res.list.sort((a, b)=> {
                        if (a.mealTime < b.mealTime) {return -1;}if (b.mealTime < a.mealTime) {return 1;}return 0;
                    })
                    res.list.forEach(item => {
                        item.mealName = (item.mealTime == 1 ? this.$t('manager.hk_breakfast') : this.$t('manager.hk_dinner'))+ '-' + item.mealName;
                    })
                    this.hotelattaChmealList = res.list;
                    this.$forceUpdate();
                }
            );
        },

        checkinDaysChange(e, row) {
            var date = new Date(row.checkoutTime);
            date.setDate(date.getDate() + e);
            row.newLeaveTime = date.Format("yyyy-MM-dd HH:mm:ss");
        },
        endTimeChange(row) {
            row.number = this.$F.getDaysBetween(
                new Date(row.checkoutTime).Format("yyyy-MM-dd"),
                new Date(row.newLeaveTime).Format("yyyy-MM-dd")
            );
        },
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
        // undoCheckoutA() {
        //     this.$F.doRequest(this, '/pms/checkin/out_check_in_cancel', {
        //         checkInId: this.checkInId
        //     }, res => {
        //         this.$router.push("/orders?type=order");
        //     }, res => {
        //         this.$message(res.message);
        //     })
        // },

        //加载财务列表
        consume_order_list(state) {
            this.searchForm.state = state || '';
            this.searchForm.checkInId = this.checkInId;
            this.$F.doRequest(this, '/pms/consume/consume_order_list', this.searchForm, (res) => {
                let list = res.consumeOrderList
                let arr = []
                for(let i =0;i<list.length;i++){
                    let element = list[i]
                    // console.log(element)
                    // console.log(element.priceType)
                    if(element.priceType !== 9&&element.priceType !== 10){
                        arr.push(element)
                    }
                }
                this.tableData = arr
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
            if(type == 1&&this.consumeOperForm.payType==4){
                if(!this.consumeOperForm.remark){
                    this.$message({
                        message: this.$t('desk.home_noteA'),
                        type: 'warning'
                    })
                    return false
                }
            }
            /**
             * 1.入账
             * 2.挂账
             * 3.冲调
             *
             * **/

            let params = this.consumeOperForm
            // let parms = {
            //     consumePrice: '',
            //     payPrice:'',
            //     priceType: '',
            //     payType: '',
            //     name: '',
            //     damageCount:''
            // }




            if(this.unitPrice){
                params.unitPrice = this.unitPrice
            }
            if(this.taxCount){
                params.taxCount = this.taxCount
            }
            // params.orderId = this.$route.query.id

            params.checkInId = this.checkInId
            if (this.currentRoom && this.currentRoom.roomId) {
                params.roomId = this.currentRoom.roomId;
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
                params.consumePrice = this.consumeOperForm.consumePrices
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
                if(parseFloat(this.consumeOperForm.consumePrices) > parseFloat(this.destructionList[0].payPrice)){
                    this.$message.error(this.$t('desk.order_partComShould') +  parseFloat(this.destructionList[0].payPrice));
                    return;
                }
                let priceType  =  this.destructionList[0].priceType
                // if(priceType == 9){
                //     this.$message.error('已冲调记录不能被冲调!')
                //     return false
                // }
                let priceTypeList = this.priceTypeList
                if(priceTypeList.indexOf(priceType) > -1){
                    console.log('消费类')
                    params.payPrice = ''
                    params.consumePrice = 0 - this.getPriceStr(this.consumeOperForm.consumePrices)
                }else{
                    console.log('付款类')
                    params.consumePrice = ''
                    params.payPrice = 0 -  this.getPriceStr(this.consumeOperForm.consumePrices)
                }
                params.richIds = this.destructionList[0].id
                params.priceType = this.consumeOperForm.priceType
                params.state = this.destructionList[0].state
                params.payType = 0
                params.richType = 1
                params.richRemark  = this.consumeOperForm.remark

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
            // this.consumeOperForm.consumePrices = this.detailData.totalPrice
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
            console.log(this.detailData)
            if (e == 5 || e == 6) {
                this.taxCount = ''
                this.consumeOperForm.consumePrices = 0;
                if (this.currentRoom.personList.length > 0) {
                    let tempArray = this.currentRoom.personList.filter(person => {
                        return person.personType == 2
                    }) || [];

                   this.consumeOperForm.consumePrices = tempArray[0].housePrice
                }
                if (e == 6) {
                    this.consumeOperForm.consumePrices = this.consumeOperForm.consumePrices * 0.5;
                }


            } else if (e == 7) {
                this.taxCount = ''
                this.consumeOperForm.damageCount = 1
                this.consumeOperForm.consumePrices = ''
                this.getDdamageInfo();
            }

            console.log( this.consumeOperForm.consumePrices)


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
                this.consumeOperForm.consumePrices = p

                console.log(p)

                console.log( this.consumeOperForm.consumePrices)
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
                            this.consumeOperForm.consumePrices = p.toFixed(0)
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


        //续住提交
        stayoverSubmit() {
            let params = {
                checkoutTime: this.overstayTabledata[0].newLeaveTime,
                checkInId: this.detailData.checkIn.id,
                roomIds: this.currentRoom.roomId
            }
            this.$F.doRequest(this, '/pms/checkin/hotel_check_in_continue', params, (res) => {
                this.stayoverVisible = false;
            })
        },
        //续住
        stayoverHandle() {
            let personInfo = this.currentRoom.personList.filter(item => {
                return item.personType == 2
            })[0];
            let roomInfo = {
                houseNum: this.currentRoom.houseNum,
                name: personInfo&&personInfo.name?personInfo.name:'',
                checkoutTime: this.detailData.checkIn.checkoutTime,
                newLeaveTime: '',
                number: 1,
            }
            this.checkinDaysChange(1, roomInfo);
            this.overstayTabledata = [];
            this.overstayTabledata.push(roomInfo);
            this.stayoverVisible = true;
            this.$forceUpdate();
        },

        destructionHandle() {
            if (this.multipleSelection.length < 1) {
                this.$message.error(this.$t('desk.order_selectOperateAccount'));
                return false
            }
            if (this.multipleSelection.length > 1) {
                this.$message.error(this.$t('desk.order_onlyOneAccount'));
                return false
            }

            for (let k in this.multipleSelection) {
                if (this.multipleSelection[k].billingType == 1) {
                    this.$message.error(this.$t('desk.order_autoTiePrice'));
                    return false
                }
                //判断是否是冲调记录
                let priceType  =  this.multipleSelection[k].priceType
                if(priceType == 9 || priceType == 10){
                    this.$message.error('已冲调记录不能被冲调!')
                    return false
                }
            }
            this.destructionList = this.multipleSelection
            this.destructionShow = true
            this.consumeOperForm.priceType = 9
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
                // this.consumeOperForm.consumePrices =  this.destructionList[0].consumePrice
                // console.log(this.destructionList[0].consumePrice)
                console.log(this.destructionList[0])
                let priceType  =  this.destructionList[0].priceType //当前冲调记录类型
                let priceTypeList = this.priceTypeList//消费类
                if(priceTypeList.indexOf(priceType) > -1){
                    console.log('消费类')
                    this.consumeOperForm.payPrice = ''
                    if(val == 9){
                        this.consumeOperForm.consumePrices =  this.destructionList[0].consumePrice
                    }
                    if(val == 100){
                        this.consumeOperForm.consumePrices =  ''
                    }
                }else{
                    console.log('入账类')
                    this.consumeOperForm.consumePrices = ''
                    if(val == 9){
                        this.consumeOperForm.payPrice =  this.destructionList[0].payPrice
                    }
                    if(val == 100){
                        this.consumeOperForm.payPrice =  ''
                    }
                }

            }else{
                this.consumeOperForm.consumePrices = ''
            }

            console.log(this.consumeOperForm)



            // console.log(val)
            // if(val !== 3){
            //    this.consumeOperForm.payType = ''
            // }
            // if(val !== 7){
            //     this.consumeOperForm.consumePrices = ''
            // }

            // if(val == 9){

            //     this.consumeOperForm.consumePrices = ''
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
.toDot{
    padding-right:5px;
    display: inline-block;
    position: relative;
    &&::after{
        content: '-';
    }
    &&:last-child:after{
        content: '';
    }
}



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
.red {
    color: red;
}
.blue {
    color: blue;
}
</style>
