<template>
    <div class="detail" v-loading="load">
        <div class="detailPanel">
            <div class="top">
                <span>{{$t('food.common.order_num')}}：{{info.shopNum}} </span>
                <span>售卖点：{{info.sellingName}} </span>
                <span>{{$t('food.common.create_time')}}：{{info.createTime}} </span>
            </div>
            <div class="text-red text-size20 margin-t-20">{{$t('food.common.consumePrice')}}：{{numFormate(getFee)}}<!-- {{info.consumePrice}} --></div>
            <div class="margin-t-20 clearfix">
                <div class="fl clearfix">
                    <el-button type="primary" size="small" @click="action">{{$t('food.common.order_deal')}}</el-button>
                    <el-button type="primary" size="small">{{$t('food.common.print')}}</el-button>
                </div>
                <div class="fr clearfix">
                    总消费：{{numFormate(getFee + info.hasPayPrice)}};  已结:{{ info.hasPayPrice ? numFormate(info.hasPayPrice) : 0}}
                </div>
            </div>
            <div class="margin-t-20">
                <el-table :data="cart" border header-row-class-name="default" size="small">
                    <el-table-column prop="goodsName" label="商品名称"  ></el-table-column>
                    <el-table-column :label="$t('food.common.price')" width="80">
                      <template slot-scope="scope">
                          <div v-if="scope.row.unitPrice > 0">
                           ¥ {{numFormate(scope.row.unitPrice)}}
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
                                      按次计费
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
                    <el-table-column label="消费金额" width="200">
                      <template slot-scope="scope">
                        <div v-if="scope.row.goods.categoryType == 1">
                            <!-- {{scope.row.totalPrice}} -->
                            ¥ {{numFormate(scope.row.totalPrice)}}
                        </div>
                        <div v-if="scope.row.goods.categoryType == 2">
                            <span v-if="scope.row.goods.priceModel == 2">
                                {{numFormate(getFinalFee(scope.row.goods,endTime,info.createTime))}} (计时: {{getDiffDate(info.createTime,endTime)}})
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
            getFee(){
                let list = this.info.orderSubList
                let sum =  0
                for(let i in list){
                    if(list[i].goods.categoryType == 2){
                        let data = list[i].goods
                        console.log(list[i])
                        if(data.priceModel == 2){
                            // let fee = this.getFinalFee(data)
                             let fee = this.getFinalFee(data,this.endTime,this.info.createTime)
                            sum += fee
                        }else{
                            sum += list[i].totalPrice
                        }
                    }
                }
                return sum
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
