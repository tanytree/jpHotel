<template>
    <div class="detail" v-loading="load">
         <!--  -->
        <div class="detailPanel">
            <div class="top">
                <span>{{$t('food.common.order_num')}}：{{info.shopNum}} </span><span v-if= "info.deskNum">{{$t('food.common.deskNum')}}：{{info.deskNum}} </span>  <span v-if= "info.numberPlat">{{$t('food.common.numberPlat')}}：{{info.numberPlat}} </span>
                </div>
            <div class="text-red text-size20 margin-t-20">{{$t('food.common.consumePrice')}}：{{info.consumePrice}}</div>

            <div class="text-red text-size20 margin-t-20">
                <el-button v-if="info.state == 1" type="primary" size="small" @click="action">{{$t('food.common.order_deal')}}</el-button>
                <el-button v-if="info.state == 1" type="primary" size="small">{{$t('food.common.print')}}</el-button>
            </div>

            <div class="margin-t-20">
                <el-table
                  :data="cart"
                  border
                  header-row-class-name="default"
                  size="small"
                >
                  <el-table-column prop="goodsName" label="商品名称" ></el-table-column>
                  <el-table-column :label="$t('food.common.price')">
                      <template slot-scope="scope">
                          <div v-if="scope.row.unitPrice > 0">
                           ¥ {{scope.row.unitPrice}}
                          </div>
                          <span v-else> </span>
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


                  <el-table-column prop="goodsCount" label="数量" width="160"></el-table-column>
                  <el-table-column label="消费金额">
                      <template slot-scope="scope">

                        <div v-if="scope.row.goods.categoryType == 1">
                                {{scope.row.totalPrice}}
                        </div>
                        <div v-else>


                        </div>

                      </template>
                  </el-table-column>
                  <el-table-column :label="$t('food.common.status')">
                    <template slot-scope="scope">
                        未结/已结
                        {{scope.row.goods.state}}
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
                    pageSize: 10, //页数
               },


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
                   console.log(res.order.orderSubList)
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
