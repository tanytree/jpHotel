<template>
    <div class="detail" v-loading="load">
        <div class="detailPanel">
            <div class="top">
                <span>{{$t('food.common.order_num')}}：{{info.shopNum}} </span>
                <span>{{$t('shop.reset.salePoint')}}:{{info.sellingName}} </span>
                <span>{{$t('food.common.create_time')}}：{{info.createTime}} </span>
            </div>
            <div class="text-red text-size20 margin-t-20">{{$t('food.reset.consumePrice')}}：{{numFormate(getFee)}}<!-- {{info.consumePrice}} --></div>
            <div class="margin-t-20 clearfix">
                <div class="fl clearfix">
                    <el-button type="primary" size="small" @click="action">{{$t('food.common.order_deal')}}</el-button>
                    <!-- <el-button type="primary" size="small">{{$t('food.common.print')}}</el-button> -->
                </div>
                <div class="fr clearfix">
                    {{$t('food.common.total_pay')}}：{{numFormate(getFee + info.hasPayPrice)}};  {{$t('desk.customer_closeAccount')}}:{{ info.hasPayPrice ? numFormate(info.hasPayPrice) : 0}}
                </div>
            </div>
            <div class="margin-t-20">
                <el-table :data="cart" border header-row-class-name="default" size="small">
                    <el-table-column prop="goodsName" :label="$t('food.common.product_name')"  ></el-table-column>
                    <!-- <el-table-column :label="$t('food.common.price')" width="80">
                      <template slot-scope="scope">
                          <div v-if="scope.row.unitPrice > 0">
                           ¥ {{numFormate(scope.row.unitPrice)}}
                          </div>
                      </template>
                    </el-table-column> -->
                    <el-table-column :label="$t('shop.rule')">
                      <template slot-scope="scope">

                         <div v-if="scope.row.goods">
                             <div v-if="scope.row.goods.categoryType == 1">
                                  ¥ {{numFormate(scope.row.unitPrice)}}
                             </div>
                             <div v-else>
                                  <span v-if="scope.row.goods.priceModel == 1">
                                      <!-- 按次计费 -->
                                      ¥ {{numFormate(scope.row.unitPrice)}}
                                  </span>
                                  <span v-else>
                                    {{$t('shop.reset.orderPriceDesc',{priceStartMinute:scope.row.goods.priceStartMinute,startPrice:numFormate(scope.row.goods.startPrice),priceTime:scope.row.goods.priceTime,minutePrice:numFormate(scope.row.goods.minutePrice)})}}
                                    <span v-if="scope.row.goods.capsPriceFlag == 2"> {{$t('shop.reset.orderCapsPrice',{capsPrice:numFormate(scope.row.goods.capsPrice)})}}</span><!--
                                    {{scope.row.goods.priceStartMinute}}分钟后收起步价，
                                    起步价{{scope.row.goods.startPrice}}日元，每
                                    {{scope.row.goods.priceTime}}分钟收费{{scope.row.goods.minutePrice}}日元
                                    <span v-if="scope.row.goods.capsPriceFlag == 2">封顶消费{{scope.row.goods.capsPrice}}日元</span> -->
                                 </span>
                             </div>
                         </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="goodsCount" :label="$t('shop.count')" width="50"></el-table-column>
                    <el-table-column :label="$t('shop.reset.customePrice')"  width="200">
                        <template slot-scope="scope">
                        <div v-if="scope.row.goods.categoryType == 1">
                            ¥ {{numFormate(scope.row.totalPrice)}}
                        </div>
                        <div v-if="scope.row.goods.categoryType == 2">
                            <span v-if="scope.row.goods.priceModel == 2">
                                {{numFormate(scope.row.goodsCount * getFinalFee(scope.row.goods,endTime,info.createTime))}} (计时: {{getDiffDate(info.createTime,endTime)}})
                            </span>
                            <span v-if="scope.row.goods.priceModel == 1">
                               <!-- {{scope.row.totalPrice}} -->
                                ¥ {{numFormate(scope.row.totalPrice)}}
                            </span>
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('food.common.status')" width="80">
                        <template slot-scope="scope">
                            {{scope.row.state == 2 ? $t('desk.customer_closeAccount') : $t('desk.customer_outStand')}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="dialog-footer text-center" style="padding: 0 20px;margin:20px -20px -15px;">
           <el-button size="small" @click="closeDialog">{{$t('food.common.cancel')}}</el-button>
        </div>
    </div>
</template>
<script>
    import mixin from '../mixin';
    import {mapState,mapActions} from "vuex";
    export default {
        mixins: [mixin],
        data() {
            return {
                load:true,
                info:{},
                cart:[],
                endTime:'',
                searchForm:{
                    name:'',
                    categoryId: '',
                    pageIndex: 1, //当前页
                    pageSize: 10 //页数
                }
            }
        },
        computed: {
            ...mapState({
                token: state => state.user.token,
                userId: state => state.user.userId,
                msgKey: state => state.config.msgKey,
                plat_source: state => state.config.plat_source
            }),
            //计算价格
            getFee(){
                if(this.endTime && this.info.orderSubList && this.info.orderSubList.length > 0){
                    let list = this.info.orderSubList
                    let sum =  0
                    list.forEach(element => {
                        console.log(element)
                        if(element.goods.categoryType == 2){
                            if(element.goods.priceModel == 2){
                                let fee = this.getFinalFee(element.goods,this.endTime,this.info.createTime)
                                sum += fee
                            }else{
                                sum += element.totalPrice
                            }
                        }else{
                            sum += parseFloat(element.totalPrice)
                        }
                    });

                    return sum
                }else{
                    return 0
                }

            }
        },
        mounted() {
        },
        methods: {
            //重置
            initForm(){
               this.searchForm = {
                    name:'',
                    categoryId: '',
                    pageIndex: 1, //当前页
                    pageSize: 10, //页数
               }
               this.getAllTableList();
            },
            //获取传过来的值
            getInfo(data){
                this.info = {}
                this.cart = []
                this.searchForm = {
                     name:'',
                     categoryId: '',
                     pageIndex: 1, //当前页
                     pageSize: 10, //页数
                }
                let params = data
                this.getOrderDetail(data)
            },

            get_systime(time){
                console.log(time)
                let info = {
                   startTime:time
                }
                this.$F.doRequest(this, "/pms/system/system_time", info, (res) => {
                    console.log(res)
                    this.endTime = res.dateStr
                });

            },

            //获取详情
            getOrderDetail(params){
                console.log(params)
                this.load = true
                this.$F.doRequest(this, "/pms/shop/shop_order_detail", params, (res) => {
                   console.log(res.order)
                   this.load = false
                   this.info = res.order
                   let list = res.order.orderSubList
                   this.cart = list
                   this.get_systime(res.order.createTime)

                });
            },

            //详情中点击结账
            action(){
                this.$emit('action',this.info)
            },


            closeDialog(){
                this.info = {}
                this.allTableData = []
                this.cart = []
                this.searchForm = {
                    name:'',
                    categoryId: '',
                    pageIndex: 1, //当前页
                    pageSize: 10, //页数
               }
               this.$emit('closeDialog')
            },



            /**每页数 */
            handleSizeChange(val) {
                this.searchForm.pageIndex = val;
                this.getAllTableList();
            },
            /**当前页 */
            handleCurrentChange(val) {
                this.searchForm.pageIndex = val;
                this.getAllTableList();
            }
        }
    }
</script>

<style lang="less" scoped>
    .detail{
        .top{
            span{
                padding-right: 50px;
            }
        }
    }


</style>
