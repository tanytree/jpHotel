<template>
<!-- 统一的列表格式 -->
<div>
    <div>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="100px">
            <el-row>
                <el-form-item :label="$t('food.common.order_status')">
                   <el-radio-group v-model="searchForm.state" size="small" @change="changeOrderStatus">
                     <el-radio-button label="">{{$t('food.common.no_limit')}}</el-radio-button>
                     <el-radio-button :label="1">{{$t('food.order_status.1')}}</el-radio-button>
                     <el-radio-button :label="2">{{$t('food.order_status.2')}}</el-radio-button>
                     <el-radio-button :label="3">{{$t('food.order_status.3')}}</el-radio-button>
                   </el-radio-group>
                </el-form-item>
            </el-row>
            <el-form-item :label="$t('manager.grsl_goodsNameB')">
                <el-input v-model="searchForm.goodsName" :placeholder="$t('manager.grsl_goodsNameC')" class="width200"></el-input>
            </el-form-item>
            <el-form-item :label="$t('food.common.curstom_name')">
                <el-input v-model="searchForm.name" :placeholder="$t('food.common.curstom_name')" class="width200"></el-input>
            </el-form-item>
            <el-form-item :label="$t('shop.reset.salePoint')">
                <el-select v-model="searchForm.sellingId" :placeholder="$t('shop.reset.salePoint')">
                    <el-option :label="$t('food.common.all')" value=""></el-option>
                    <el-option
                      v-for="item in saleData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="$t('food.common.order_time')">
                <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:200px" :placeholder="$t('food.common.order_time')"></el-date-picker>
                <span> {{$t('food.common.to')}} </span>
                <el-date-picker v-model="searchForm.endTime" value-format="yyyy-MM-dd" type="date" style="width:200px":placeholder="$t('food.common.order_time')"></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('food.common.order_num')">
                <el-input v-model="searchForm.shopNum"  :placeholder="$t('food.common.order_num')" class="width200"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getDataList">{{$t('food.common.search')}}</el-button>
                <el-button type="primary" @click="initForm">{{$t('food.common.reset')}}</el-button>
            </el-form-item>
        </el-form>
        <!--表格数据 -->

        <div v-loading="loading">
            <el-table
                class="margin-t-20"
                header-row-class-name="default"
                size="small"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
               >
                <el-table-column
                  prop="shopNum"
                  :label="$t('food.common.order_num')"
                  >
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  :label="$t('food.common.create_time')"
                  >
                </el-table-column>
                <el-table-column
                  :label="$t('shop.reset.goodDetail')"
                  width="180"
                  show-overflow-tooltip
                  >
                  <template slot-scope="scope" >
                    <div v-for="(sumItem,index) in scope.row.orderSubList" :key="index" class="text-size12">
                        {{sumItem.goodsName}} * {{sumItem.goodsCount}}
                    </div>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  :label="$t('food.common.curstom_info')">
                  <template slot-scope="scope">
                      <span v-if="scope.row.memberCard">
                          {{scope.row.memberTypeName}}
                      </span>
                      <span v-else-if="scope.row.signRoomId">
                          {{scope.row.roomObject.houseNum}} {{scope.row.roomObject.houseName ? '+' + scope.row.roomObject.houseName : ''}}
                      </span>
                      <span v-else>{{$t('food.reset.guests')}}</span>
                  </template>
                </el-table-column> -->
                <el-table-column :label="$t('food.common.order_from')">
                  <template slot-scope="scope">
                  {{ scope.row.orderSource ? getSource(scope.row.orderSource) : ''}}</template>
                </el-table-column>
                <el-table-column
                   prop="sellingName"
                   :label="$t('shop.reset.salePoint')"
                >
                </el-table-column>
                 <el-table-column :label="$t('desk.customer_payType')">
                   <template slot-scope="{row}">
                      <div  v-if="row.billingType">{{row.billingType == 1 ? $t('commons.payType.'+ row.payType)  : $t('food.billingType.'+ row.billingType)}}
                      </div>
                      <div v-if="row.billingType==3">{{row.roomObject?row.roomObject.houseNum:''}}</div>
                   </template>
                </el-table-column>
                <el-table-column
                  :label="$t('food.reset.total_payA')"
                >
                    <template slot-scope="scope">
                        {{scope.row.realPayPrice ?  numFormate(scope.row.realPayPrice) : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                  :label="$t('food.common.status')"
                 >
                    <template slot-scope="scope">


                      <span v-if="scope.row.state">{{$t('food.order_status.'+ scope.row.state)}}</span>
                      <!-- {{scope.row.state == 1 ? '未结' : (scope.row.state == 2 ? '已结' : '已取消') }} -->
                    </template>
                </el-table-column>
                <el-table-column
                  width="200"
                  :label="$t('commons.operating')"
                >
                    <template slot-scope="scope">
                      <el-button @click="getInfo(scope.row)"  type="text" >{{$t('food.common.detail')}}</el-button>
                      <el-button @click="action(scope.row)" v-if="scope.row.state == 1" type="text">{{$t('food.common.order_deal')}}</el-button>
                      <el-button @click="cancleOrder(scope.row)" v-if="scope.row.state == 1"  type="text">{{$t('food.common.cancel_order')}}</el-button>
                      <!-- <el-button v-if="scope.row.state == 3"  type="text">恢复</el-button> -->
                    </template>
                </el-table-column>
              </el-table>
            </div>

        <div style="margin-top:10px"></div>
        <!--分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.pageSize" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
    </div>
    <!-- 编辑or详情弹窗 -->

    <el-dialog
        top="0"
        :title="$t('food.orderTitle.'+ dialogType)"
        width="800px"
        :visible.sync="dialogShow"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDialog"
        >
            <detail :taxInfo="tax" @closeDialog="closeDialog" ref="detailRef" @action="action" v-if="dialogType == 1" />
            <action :taxInfo="tax" @closeDialog="closeDialog" ref="actionRef" v-if="dialogType == 2" />
    </el-dialog>

    <el-dialog
        top="0"
        :title="$t('food.orderTitle.1')"
        width="800px"
        :visible.sync="dialogShows"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDialog"
        >
        <div class="detailPanel">
            <div class="top">
                <span>{{$t('food.common.order_num')}}：{{detail.shopNum}} </span>
                <span style="padding:0 50px;">{{$t('shop.reset.salePoint')}}：{{detail.sellingName}} </span>
                <span>{{$t('food.common.create_time')}}：{{detail.createTime}} </span>
            </div>
            <div class="margin-t-10 text-gray">{{$t('shop.orderTotal')}}：¥ {{numFormate(detail.consumePrice)}}</div>
            <!-- <div class="margin-t-10 text-gray">{{$t('food.common.order_price')}}：¥{{orderTax.sum}} </div> -->
            <div class="taxBox text-size14 text-gray">
                <div class="item margin-t-10">{{$t('food.reset.servePri')}}： ¥{{orderTax.service}} <span class="text-size12">({{orderTax.servicePrice}})</span></span> </div>
                <!-- <div class="item margin-t-10">消費税（込み）： ¥{{orderTax.taxFee}} <span class="text-size12">({{orderTax.type}}  {{orderTax.tax}})</span></div> -->
                <div class="item margin-t-10"><span>消費税：<span class="text-size12">({{orderTax.type}}  {{orderTax.tax}})</span></span> <span>¥{{numFormate(orderTax.taxInFee)}}；</span></div>
                <div class="item margin-t-10" v-if="detail.billingType&&detail.billingType == 1">{{$t('shop.yhPrice')}}： ¥{{detail.preferentialPrice ? detail.preferentialPrice : 0}}</div>
            </div>
            <!-- <div v-if="!!orderTax" class="margin-t-10 text-gray">消费税：¥{{orderTax.total}}</div>
            <div v-if="!!orderTax" class="margin-t-10 text-gray">服务费：¥{{orderTax.service}}</div> -->
           <!-- <div v-if="!!orderTax" class=" text-size14 text-gray margin-t-10">
                其中消费税税前¥{{orderTax.taxBefore}}（总消费税 ¥{{orderTax.total}} ，消费税税后¥{{orderTax.taxAfter}}）；服务费¥{{orderTax.service}};
            </div> -->
            <!-- <div class="margin-t-10 text-gray">{{$t('food.common.create_time')}}：¥{{detail.createTime}}</div> -->
            <div v-if="detail.scoresPrice" class="margin-t-10 text-gray">：{{$t('shop.vipPrice')}}：¥{{numFormate(detail.scoresPrice)}}</div>
            <!-- <div class="margin-t-10 text-gray">{{$t('shop.realPrice')}}：¥{{numFormate(detail.realPayPrice)}}</div> -->

            <div class="item margin-t-10 text-gray" v-if="detail.billingType == 1">
                {{$t('shop.realPrice')}}：  ¥{{numFormate(detail.realPayPrice)}}
            </div>

            <div class="item margin-t-10 text-gray" v-if="detail.billingType">
                {{$t('desk.add_paymentMethod')}}：{{detail.billingType == 1 ? '【'+$t('commons.payType.'+ detail.payType) + '】' : '【'+$t('food.billingType.'+ detail.billingType) + '】' }}  ¥{{numFormate(detail.realPayPrice)}}
                <span style="margin-left:10px" v-if="detail.billingType==3">{{$t('desk.customer_roomNumber')}}{{detail.roomObject?detail.roomObject.houseNum:''}}</span>
            </div>

            <div class="margin-t-10 text-gray">{{$t('shop.payTime')}}：{{detail.updateTime}}</div>
            <el-table
              class="margin-t-10 "
              :data="detail.orderSubList"
              border
              header-row-class-name="default"
              size="small"
            >
              <el-table-column prop="goodsName" :label="$t('manager.grsl_goodsName')" ></el-table-column>
             <!-- <el-table-column :label="$t('food.common.price')">
                <template slot-scope="scope">
                    {{numFormate(scope.row.unitPrice)}}
                </template>
              </el-table-column> -->
              <el-table-column :label="$t('shop.rule')">
                <template slot-scope="scope">
                   <div v-if="scope.row.goods">
                       <div v-if="scope.row.goods.categoryType == 1">
                          <!-- 价格*数量 -->
						  {{numFormate(scope.row.unitPrice)}}
                       </div>
                       <div v-else>
                            <span v-if="scope.row.goods.priceModel == 1">
                               {{numFormate(scope.row.unitPrice)}}
                            </span>
                            <span v-else>
                                {{$t('shop.reset.orderPriceDesc',{priceStartMinute:scope.row.goods.priceStartMinute,startPrice:numFormate(scope.row.goods.startPrice),priceTime:scope.row.goods.priceTime,minutePrice:numFormate(scope.row.goods.minutePrice)})}}
                                <span v-if="scope.row.goods.capsPriceFlag == 2"> {{$t('shop.reset.orderCapsPrice',{capsPrice:numFormate(scope.row.goods.capsPrice)})}}</span>
                                <!-- {{scope.row.goods.priceStartMinute}}分钟后收起步价，
                                起步价{{scope.row.goods.startPrice}}日元，每
                                {{scope.row.goods.priceTime}}分钟收费{{scope.row.goods.minutePrice}}日元
                                <span v-if="scope.row.goods.capsPriceFlag == 2">封顶消费{{scope.row.goods.capsPrice}}日元</span> -->
                           </span>
                       </div>
                   </div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('shop.count')" width="160" prop="goodsCount"></el-table-column>
              <el-table-column :label="$t('shop.customePrice')" width="200">
                <template slot-scope="scope">
                  <div v-if="scope.row.goods.categoryType == 1">
                      {{numFormate(scope.row.totalPrice)}}
                  </div>
                  <div v-if="scope.row.goods.categoryType == 2">
                      <span v-if="scope.row.goods.priceModel == 2">
                          {{numFormate(scope.row.goodsCount * getFinalFee(scope.row.goods,scope.row.updateTime,scope.row.createTime))}} (计时:{{getDiffDate(scope.row.createTime,scope.row.updateTime)}})
                      </span>
                      <span v-if="scope.row.goods.priceModel == 1">
                         {{numFormate(scope.row.totalPrice)}}
                      </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('food.common.status')" width="80">
                  <template slot-scope="scope">
                    {{$t('desk.customer_closeAccountA')}}
                      <!-- {{scope.row.state == 2 ? $t('desk.customer_closeAccount') : $t('desk.customer_outStand')}} -->
                  </template>
              </el-table-column>
            </el-table>
            <el-divider></el-divider>
            <div class="dialog-footer text-center" style="padding: 0 20px;margin:-10px -20px -15px;">
               <el-button size="small" @click="closeDialog">{{$t('shop.close')}}</el-button>
           </div>
        </div>
        <!-- {{detail}} -->
    </el-dialog>
     <!-- 单据预览 -->
    <priviewDocuments ref="priviewDocuments" />
</div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import detail from './detail'
import action from './action'
import mixin from '../mixin';
import priviewDocuments from "@/components/table/priviewDocuments";

export default {
    mixins: [mixin],
    props:['saleData'],
    components:{action,detail,priviewDocuments},
    computed: {
        ...mapState({
            token: state => state.user.token,
            userId: state => state.user.userId,
            msgKey: state => state.config.msgKey,
            plat_source: state => state.config.plat_source
        })
    },
    data() {
        return {
            dialogType:1,
            dialogShow:false,
            dialogShows:false,
            loading: false,
            showEdit: false,
            showDetail: false,
            searchForm: {
                goodsName:'',//商品名称
                state:'',// 状态  1未结 2已结 3取消      int选填
                sellingId:'',// 售卖点id
                shopNum :'',// 订单号
                name:'',//客人名称      string选填
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            },

            listTotal: 0, //总条数
            tableData: [], //表格数据
            is_add:true,
            detail:{},
            orderTax:{},
            tax:{}

        };
    },
    mounted() {
        this.get_consume_tax();
        this.initForm();
    },
    methods: {
        initForm() {
            this.searchForm = {
                goodsName:'',//商品名称
                state:'',// 状态  1未结 2已结 3取消      int选填
                sellingId:'',// 售卖点id
                shopNum :'',// 订单号
                name:'',//客人名称      string选填
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            }
            this.getDataList();
        },
        /**获取表格数据 */
        changeOrderStatus(value){
            // console.log(value)
            this.getDataList();
        },
        getDataList() {
            this.loading = true
            let params = this.searchForm
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$F.doRequest(this, "/pms/shop/shop_order_list", params, (res) => {
                console.log(res)
                this.loading = false
                this.tableData = res.shopOrderList
                this.listTotal = res.page.count;
            });
        },

        /**修改订单 */
        changrOrder(list){
            // console.log(list)
            let params = {}
            let dishesJson  = []
            let sum = 0
            for(let i in list){
                dishesJson.push({
                    dishesId:list[i].id,
                    dishesName:list[i].name,
                    unitPrice:list[i].price,
                    totalPrice:parseFloat(parseFloat(list[i].price) * parseFloat(list[i].count)).toFixed(2),
                    dishesCount:list[i].count
                });
                sum += list[i].count
            }
            params.dishesCount = sum
            params.consumePrice = parseFloat(this.cartToTal).toFixed(2)
            params.dishesJson  = JSON.stringify(dishesJson);
            // console.log(params)
        },

        //获取点餐来演类型
        getOrderSource(v){
            let list = this.options
            list.forEach(element => {
                if(v == element.value){
                    return element.label
                }
            });

        },
        //计算总价
        getTotalPrice(list){
            if(list.length > 0){
                let sum = 0
                list.forEach(element => {
                   sum += parseFloat(element.unitPrice) * parseFloat(element.dishesCount)
                });
                return sum.toFixed(2)
            }
        },

        //获取订单信息
        getInfo(data){
            console.log(data.state)
            if(data.state == 2 || data.state == 3){
               this.dialogShows = true
               this.detail = data
               // getTaxInfo(tax,list,outFlag,endTime,info)
               let outFlag = data.outFlag == 1 ? true : false
               this.orderTax = this.getOrderHasPayTaxInfo(this.tax,data,outFlag)
               return false
            }else{
                let info = {
                    shopOrderId:data.id
                }
                info.userId = this.userId
                info.storesNum = this.storesNum
                this.dialogShow = true
                this.dialogType = 1
                // this.is_add = true
                let cateList = this.getNewCateList(this.categroyList)
                this.$nextTick(()=>{
                    this.$refs.detailRef.getInfo(info)
                })
            }




        },

        //结账
        action(data){
            console.log(data)
            // this.is_add = true
            this.dialogShow = true
            this.dialogType = 2
            this.$nextTick(()=>{
                this.$refs.actionRef.getInfo(data)
            })
        },
        //取消订单
        cancleOrder(data){
        // console.log(data)
            let params = {
                shopOrderId:data.id
            }
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$confirm( this.$t('food.common.cancel_confirm_order_tips'),  this.$t('food.common.tip'), {
               confirmButtonText:  this.$t('food.common.ok'),
               cancelButtonText:  this.$t('food.common.cancel'),
               type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, "/pms/shop/shop_order_cancle", params, (res) => {
                    this.alert(200, this.$t('food.common.success'));
                    this.getDataList();
                });
            }).catch(() => {
            });
        },
        closeDialog(isOpen){
           if(isOpen){
            this.$refs.priviewDocuments.openDialog()
          }
            this.dialogShow = false
            this.dialogShows = false
            this.getDataList();
        },

        /**每页数 */
        handleSizeChange(val) {
            this.searchForm.pageSize = val;
            this.getDataList();

            console.log(1)
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.pageIndex = val;
            this.getDataList();
            console.log(2)
        },

        get_consume_tax(){
            let params = {
                userId:this.userId,
                storesNum:this.storesNum,
            }
            this.$F.doRequest(this, "/pms/hotelparam/get_consume_tax", params, (res) => {

                if(res && res.content){
                    this.tax = JSON.parse(res.content)
                }
                console.log(this.tax)
            });
        },
        // changeDialog(){
        //     this.is_add = false
        // }

    }
};
</script>
<style lang="less" scoped>
    .text-size12{
        font-size: 12px !important;
    }
</style>
