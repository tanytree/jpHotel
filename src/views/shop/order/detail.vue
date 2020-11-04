<template>
    <div class="detail" v-loading="load">
        <div class="detailPanel">
            <div class="top">
                <span>{{$t('food.common.order_num')}}：{{info.shopNum}} </span>
                <span>售卖点：{{info.sellingName}} </span>
                <span>{{$t('food.common.create_time')}}：{{info.createTime}} </span>
            </div>
            <div class="text-red text-size20 margin-t-20">{{$t('food.common.consumePrice')}}：{{info.consumePrice}}</div>
            <div class="margin-t-20 clearfix">
                <div class="fl clearfix">
                    <el-button type="primary" size="small" @click="action">{{$t('food.common.order_deal')}}</el-button>
                    <el-button type="primary" size="small">{{$t('food.common.print')}}</el-button>
                </div>
                <div class="fr clearfix">
                    总消费：{{info.consumePrice}};  已结:{{info.hasPayPrice}}
                </div>
            </div>
            <div class="margin-t-20">
                <el-table :data="cart" border header-row-class-name="default" size="small">
                    <el-table-column prop="goodsName" label="商品名称"  ></el-table-column>
                    <el-table-column :label="$t('food.common.price')" width="80">
                      <template slot-scope="scope">
                          <div v-if="scope.row.unitPrice > 0">
                           ¥ {{scope.row.unitPrice}}
                          </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="计费规则">
                      <template slot-scope="scope">
                         <div v-if="scope.row.goods">
                             <div v-if="scope.row.goods.categoryType == 1">
                                价格*数量
                             </div>
                             <div v-else>
                                  <span v-if="scope.row.goods.priceModel == 1">
                                  </span>
                                  <span v-else>
                                    {{scope.row.goods.priceStartMinute}}分钟后收起步价，
                                    起步价{{scope.row.goods.startPrice}}日元，每
                                    {{scope.row.goods.priceTime}}分钟收费{{scope.row.goods.minutePrice}}日元
                                    <span v-if="scope.row.goods.capsPriceFlag == 2">封顶消费{{scope.row.goods.capsPrice}}日元</span>
                                 </span>
                             </div>
                         </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="goodsCount" label="数量" width="50"></el-table-column>
                    <el-table-column label="消费金额" width="150">
                      <template slot-scope="scope">
                        <div v-if="scope.row.goods.categoryType == 1">
                            {{scope.row.totalPrice}}
                        </div>
                        <div v-if="scope.row.goods.categoryType == 2">
                            <span v-if="scope.row.goods.priceModel == 2">
                                {{getFinalFee(scope.row.goods)}} (计时:{{getDiffDate(info.createTime)}})
                            </span>
                            <span v-if="scope.row.goods.priceModel == 1">
                               {{scope.row.totalPrice}}
                            </span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('food.common.status')" width="80">
                        <template slot-scope="scope">
                            {{scope.row.state == 2 ? '已结' : '未结'}}
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
            })
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
                console.log(data)
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

            //获取详情
            getOrderDetail(params){
                this.load = true
                this.$F.doRequest(this, "/pms/shop/shop_order_detail", params, (res) => {
                   console.log(res.order)
                   this.load = false
                   this.info = res.order
                   let list = res.order.orderSubList
                   this.cart = list

                });
            },

            //详情中点击结账
            action(){
                this.$emit('action',this.info)
            },
            getFinalFee(data){
                // console.log(this.info)

                //data.priceModel == 2 按时间 data.priceModel == 1 按次
                if(data.priceModel == 2){
                    let startPrice = data.startPrice
                    console.log('项目开始时间'+this.info.createTime)
                    let allMinutes = this.getDiffMinutes(this.info.createTime)
                    console.log('起步价'+startPrice)//起步价
                    console.log('服务项目所在的全部分钟数'+allMinutes)//服务项目所在的全部分钟数
                    console.log('服务的使用时间是否大于起步价开始计算时间'+ allMinutes > data.priceStartMinute)//服务的使用时间是否大于起步价开始计算时间
                    //全部分钟数》起步价设置的分钟数
                    if( allMinutes > data.priceStartMinute){
                        // 设置价格为起步价
                        let a = parseFloat(allMinutes - data.priceStartMinute)//获取减去起步时间的分钟数
                        console.log('获取减去起步时间的分钟数'+a)
                        console.log('从多少分钟开始收费'+data.priceTime)
                        let b = parseFloat(a/data.priceTime)
                        let c = parseFloat((b+'').split('.')[0])+1//除去起步时间后的次数
                        console.log("除去起步时间后的次数"+c)
                        let d = parseFloat(c * data.minutePrice )//  除去起步时间后的总费用
                        console.log("除去起步时间后的总费用"+d)
                        let ap = 0    //判断是否设置封顶费的总费用
                        if(data.capsPriceFlag == 2){
                            // 2 表示设置了封顶费
                            if(d > data.capsPrice){
                                //费用大于封顶费 则为最终费用
                                ap = data.capsPrice
                            }else{
                                ap = d
                            }
                        }else{
                             ap = d
                        }
                        console.log(ap)
                        let fee = parseFloat(startPrice) + parseFloat(ap)
                        return fee
                    }
                }else{

                }



                // {{scope.row.goods.priceStartMinute}}分钟后收起步价，
                // 起步价{{scope.row.goods.startPrice}}日元，每
                // {{scope.row.goods.priceTime}}分钟收费{{scope.row.goods.minutePrice}}日元
                // <span v-if="scope.row.goods.capsPriceFlag == 2">封顶消费{{scope.row.goods.capsPrice}}日元</span>

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
