<template>
    <div class="detail" v-loading="load">
         <!--  -->

        <div class="detailPanel" v-if="add == 0">
            <div class="top">
                <span>{{$t('food.common.order_num')}}：{{info.dishesNum}} </span><span v-if= "info.deskNum">{{$t('food.common.deskNum')}}：{{info.deskNum}} </span>  <span v-if= "info.numberPlat">{{$t('food.common.numberPlat')}}：{{info.numberPlat}} </span>
                </div>
            <div class="text-red text-size20 margin-t-20">{{$t('food.common.consumePrice')}}：{{info.consumePrice}}</div>

            <div class="text-red text-size20 margin-t-20">
                <el-button v-if="info.state == 1" type="primary" size="small" @click="addOrderInfo">{{$t('food.common.add_food')}}</el-button>
                <el-button v-if="info.state == 1" type="primary" size="small" @click="action">{{$t('food.common.order_deal')}}</el-button>
                <el-button type="primary" size="small">{{$t('food.common.print')}}</el-button>
            </div>

            <div class="margin-t-20">
                <el-table
                  :data="cart"
                  border
                  header-row-class-name="default"
                  size="small"
                >
                  <el-table-column prop="dishesName" :label="$t('food.common.food_title')" ></el-table-column>
                  <el-table-column :label="$t('food.common.price')">
                      <template slot-scope="scope">
                       ¥ {{scope.row.unitPrice}}
                      </template>
                  </el-table-column>
                  <el-table-column :label="$t('food.common.food_count')" width="160">
                      <template slot-scope="scope">
                        <div class="cell" style="padding:0;" v-if="info.state == 1" >
                            <div  class="el-input-number el-input-number--mini" style=" width:100px;">
                                <span @click="changOrderSub(scope.$index,1)" role="button" class="el-input-number__decrease" ><i class="el-icon-minus"></i></span>
                                <span @click="changOrderSub(scope.$index,2)" role="button" class="el-input-number__increase"><i class="el-icon-plus"></i></span>
                                <div class="el-input el-input--mini">
                                    <input type="text" min="1" v-model="scope.row.dishesCount" class="el-input__inner" disabled="disabled">
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            {{scope.row.dishesCount}}
                        </div>
                      </template>
                  </el-table-column>
                  <el-table-column :label="$t('food.common.action')" v-if="info.state == 1">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="handleDelete(scope.$index)">{{$t('food.common.remove')}}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- -->
        <div class="cartPanel"  v-if="add == 1" v-loading="list_loading">
                <!-- 查询部分 -->
                <el-form inline size="small">
                    <el-form-item :label="$t('food.common.food_title')">
                        <el-input v-model="searchForm.name" :placeholder="$t('food.common.food_title')" class="width200"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('food.common.cate')" prop="categoryId">
                      <el-cascader
                         :options="cateList"
                         v-model="searchForm.categoryId"
                         @change="handleChange"></el-cascader>
                    </el-form-item>

                    <el-form-item>
                       <el-button type="primary" @click="getAllTableList">{{$t('food.common.search')}}</el-button>
                        <el-button type="default" @click="initForm">{{$t('food.common.reset')}}</el-button>
                    </el-form-item>
                </el-form>

                <el-table
                  height="300"
                  :data="allTableData"
                  border
                  header-row-class-name="default"
                  size="small"
                >
                  <el-table-column prop="name" :label="$t('food.common.food_title')" ></el-table-column>
                  <el-table-column :label="$t('food.common.food_price')">
                      <template slot-scope="scope">
                       ¥ {{scope.row.price}}
                      </template>
                  </el-table-column>
                 <el-table-column
                   :label="$t('food.common.food_remain')"
                   >
                   <template slot-scope="scope">
                     <span class="text-blue text-size12">{{scope.row.remainingCount}}</span>
                   </template>
                 </el-table-column>

                 <el-table-column
                   :label="$t('food.common.is_solt')">
                   <template slot-scope="scope">{{ scope.row.soldOut == 1 ? $t('food.common.no') : $t('food.common.yes') }}</template>
                 </el-table-column>

                 <el-table-column
                   :label="$t('food.common.warning_count')"
                  >
                  <template slot-scope="scope">
                    <span class="text-blue">{{scope.row.warningCount ? scope.row.warningCount : '-' }}</span>
                  </template>
                 </el-table-column>
                  <el-table-column :label="$t('food.common.action')" width="200">
                      <template slot-scope="scope">
                        <div class="cell" style="padding:0;" >
                            <!-- 如果匹配上则显示加减 -->
                            <div class="el-input-number el-input-number--mini" style=" width:100px;" v-if="cartDishIds.indexOf(scope.row.id) > -1 && scope.row.count > 0">
                                <span role="button" class="el-input-number__decrease" @click="changeCartCount(scope.$index,1)"><i class="el-icon-minus"></i></span>
                                <span role="button" class="el-input-number__increase" @click="changeCartCount(scope.$index,2)"><i class="el-icon-plus"></i></span>
                                <div class="el-input el-input--mini">
                                    <input type="text" min="1" v-model="scope.row.count"   class="el-input__inner" disabled="disabled">
                                </div>
                            </div>
                            <div v-else>
                                <el-button v-if="scope.row.soldOut == 1" size="small" @click="changeCartCount(scope.$index,2)">{{$t('food.common.isadd')}}</el-button>
                                <span v-else>-</span>
                            </div>

                        </div>
                        <!-- <div v-else>-</div> -->
                      </template>
                  </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.page" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.page_num" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>

        </div>

        <el-divider></el-divider>
        <div class="dialog-footer text-center" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">{{$t('food.common.cancel')}}</el-button>
           <el-button  v-if="add == 1" size="small" type="primary" @click="save(1)">{{$t('food.common.ok')}}</el-button>
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
               cartDishIds:[],
               cateList:[],
               searchForm:{
                    name:'',
                    categoryId: '',
                    pageIndex: 1, //当前页
                    pageSize: 10, //页数
               },
               list_loading:false,
               allTableData:[],
               listTotal:0,
               add:0,


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
            getInfo(data,cateList){
                console.log(data)
                this.allTableData = []
                this.cartDishIds = []
                this.listTotal = 0
                this.add = 0
                this.info = {}
                this.cart = []
                this.searchForm = {
                     name:'',
                     categoryId: '',
                     pageIndex: 1, //当前页
                     pageSize: 10, //页数
                }
                this.cateList = cateList
               let params = data
               this.getOrderDetail(data)
            },

            //获取详情
            getOrderDetail(params){

                this.load = true
                this.$F.doRequest(this, "/pms/dishes/dishes_order_detail", params, (res) => {
                   // console.log(res.order)
                   this.load = false
                   this.info = res.order
                   let list = res.order.orderSubList
                   for(let i in list){
                       this.cartDishIds.push(list[i].dishesId)
                   }
                   this.cart = list

                });
            },
            
            //详情中点击结账
            action(){
                this.$emit('action',this.info)
            },

            //初始化订单中的产品，并和所有菜品列表进行绑定计算，是否显示添加减少的按钮操作
            checkCartDishIds(){
               let list = this.cart
               for(let i in list){
                   this.cartDishIds.push(list[i].dishesId)
               }
            },

            //是否显示添加菜品时候的宽度较大的弹出框
            addOrderInfo(){
                this.$emit('changeDialog');
                this.add = 1
                this.getAllTableList();
            },
            // 获取所有菜品
            getAllTableList(){
                this.list_loading = true
                let params = this.searchForm
                params.userId = this.userId
                params.storesNum = this.storesNum
                this.$F.doRequest(this, "/pms/dishes/dishes_manage_list", params, (res) => {
                    console.log(res)
                    this.list_loading = false
                    this.listTotal = res.page.count;
                    let allTableData = res.dishesList
                    for(let j in allTableData){
                        allTableData[j].count = this.getOrderCount(allTableData[j].id)
                    }
                    this.allTableData = allTableData

                });
            },
            //选择菜品id
            handleChange(value){
                this.searchForm.categoryId = value[value.length - 1].toString()
            },



            //查询某个商品的个数
            getOrderCount(v){
                let list = this.cart
                let count = 0
                for(let i in list){
                    if(list[i].dishesId == v){
                        count = list[i].dishesCount
                    }
                }
                return count

            },

            //购物车的加减 type = 1 是减少  2 是添加
            changeCartCount(v,type){

                let info  = this.allTableData[v]
                let good = this.cart.find(v=>v.dishesId == info.id)

                // console.log(info)

                if(type == 1){
                    // console.log('减少')
                    if(info.count == 1){
                        this.$confirm( this.$t('food.common.confirm_remove_tips'), this.$t('food.common.tip'), {
                            confirmButtonText: this.$t('food.common.ok'),
                            cancelButtonText: this.$t('food.common.cancel'),
                            type: 'warning'
                        }).then(() => {
                            //移除需要调用菜品删除接口
                            let params = {
                                dishesCount:good.dishesCount,
                                consumePrice:this.info.consumePrice,
                                orderId :good.orderId,
                                dishesSubId:good.id,
                            }
                            // console.log(params)
                            this.$F.doRequest(this, "/pms/dishes/dishes_place_order_delete", params, (res) => {
                                info.count-= 1
                                if(info.remainingCount){
                                    info.remainingCount += 1
                                }
                                if(good){
                                   good.dishesCount -= 1
                                   if(good.dishesCount == 0){
                                       let index = this.cart.indexOf(good)
                                       this.cart.splice(index,1)
                                   }
                                }
                                this.save(2)
                            });

                        }).catch(() => {

                        });
                    }else{
                        info.count-= 1
                        // info.remainingCount += 1
                        if(info.remainingCount){
                            info.remainingCount += 1
                        }
                        if(good){
                            good.dishesCount -= 1
                        }
                    }
                }else{



                    if(info.remainingCount == 0){
                        this.$alert(this.$t('food.common.soldOut') , this.$t('food.common.tip'), {
                          confirmButtonText: this.$t('food.common.ok'),
                          callback: action => {
                          }
                        });
                        return false
                    }else{
                        info.count += 1
                        if(info.remainingCount){
                            info.remainingCount -= 1
                        }
                        if(good){
                            good.dishesCount += 1
                        }else{
                            // console.log(this.info)
                            // console.log(this.cart)
                            // console.log(info)
                            let item = {
                                id:info.id,
                                createTime: info.createTime,
                                updateTime: info.updateTime ,
                                orderId: this.info.id,
                                dishesId: info.id,
                                dishesName: info.name,
                                dishesCount: 1,
                                unitPrice: info.price,
                                status: info.status
                            }
                            // console.log(item)

                            this.cart.push(item)
                        }

                    }
                }
                this.checkCartDishIds();
            },

            changOrderSub(index,type){
              // console.log(index)
              let list = this.cart
              let info = list[index]
              let good = this.allTableData.find(v=>v.id == info.dishesId)
              // console.log(info)
              // console.log(good)

              if(type == 1){
                // console.log('减少')
                // console.log(info)
                if(info.dishesCount == 1){
                   this.$confirm( this.$t('food.common.confirm_remove_tips'), this.$t('food.common.tip'), {
                       confirmButtonText: this.$t('food.common.ok'),
                       cancelButtonText: this.$t('food.common.cancel'),
                       type: 'warning'
                   }).then(() => {
                        let params = {
                            dishesCount:info.dishesCount,
                            consumePrice:this.info.consumePrice,
                            orderId :info.orderId,
                            dishesSubId:info.id,
                        }

                        // console.log(params)
                        this.$F.doRequest(this, "/pms/dishes/dishes_place_order_delete", params, (res) => {
                            // console.log(res)
                            list.splice(index,1)
                            if(good){
                                good.remainingCount += 1
                                good.count -= 1
                            }
                            this.save(2)

                        });
                    }).catch(() => {
                    });
                }else{
                    info.dishesCount -= 1
                }
              }else{
                  // console.log('增加')
                info.dishesCount += 1
                if(good){
                    good.remainingCount -= 1
                    good.count += 1
                }
              }
            },

            //移除菜品
            handleDelete(index){
                let info  = this.cart[index]
               this.$confirm( this.$t('food.common.confirm_remove_tips'), this.$t('food.common.tip'), {
                   confirmButtonText: this.$t('food.common.ok'),
                   cancelButtonText: this.$t('food.common.cancel'),
                   type: 'warning'
               }).then(() => {

                    // console.log(1111)
                    let params = {
                        dishesCount:info.dishesCount,
                        consumePrice:this.info.consumePrice,
                        orderId :info.orderId,
                        dishesSubId:info.id
                    }
                    // console.log(params)
                    this.$F.doRequest(this, "/pms/dishes/dishes_place_order_delete", params, (res) => {
                        // console.log(res)
                        this.cart.splice(index,1);
                        this.save(2);
                    });
                }).catch(() => {

                });
            },

            cartToTal(){
                let sum = 0
                if(this.cart.length > 0){
                    for(let k in this.cart){
                       sum +=  parseFloat(this.cart[k].unitPrice) *  parseFloat(this.cart[k].dishesCount)
                    }
                    return sum.toFixed(2);
                }else{
                    return sum.toFixed(2);
                }
            },

            save(v){
                // console.log('移除菜品')
                let list = this.cart
                let params = {
                    orderId:this.info.id
                }
                params.userId = this.userId
                params.storesNum = this.storesNum
                let dishesJson  = []
                let sum = 0
                for(let i in list){
                    dishesJson.push({
                        id:list[i].id,
                        dishesId:list[i].dishesId,
                        dishesName:list[i].dishesName,
                        unitPrice:list[i].unitPrice,
                        totalPrice:parseFloat(parseFloat(list[i].unitPrice) * parseFloat(list[i].dishesCount)).toFixed(2),
                        dishesCount:list[i].dishesCount
                    });
                    sum += list[i].dishesCount
                }
                // console.log(dishesJson)
                params.dishesCount = sum
                params.consumePrice = parseFloat(this.cartToTal()).toFixed(2)
                params.dishesJson  = JSON.stringify(dishesJson);
                params.orderSource = 1
                params.userId = this.userId
                params.storesNum = this.storesNum
                // console.log(params)

                if(v == 1){
                    this.$confirm( this.$t('food.common.confirm_submit'), this.$t('food.common.tip'), {
                        confirmButtonText: this.$t('food.common.ok'),
                        cancelButtonText: this.$t('food.common.cancel'),
                        type: 'warning'
                    }).then(() => {
                        this.$F.doRequest(this, "/pms/dishes/dishes_place_order_add", params, (res) => {
                            // console.log(res)
                            if(res.orderId){
                                this.closeDialog();
                            }
                        });
                    }).catch(() => {

                    });
                }else{

                    this.$F.doRequest(this, "/pms/dishes/dishes_place_order_add", params, (res) => {
                        // console.log(res)
                        if(res.orderId){
                            let obj = {
                                dishesOrderId:this.info.id,
                            }
                            obj.userId = this.userId
                            obj.storesNum = this.storesNum
                            this.getOrderDetail(obj);
                        }
                    });
                }
                this.checkCartDishIds();
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
