<template>
    <el-container  class="boss-index">
        <el-header class="bg round" >
            <div class="item" v-for="item in tableData"  :key="item.id" :class="active == item.id ? 'active' : ''" @click="changeTab(item.id)">{{item.name}}</div>
        </el-header>
        <el-main class="round" style="padding:0;">
            <div class="content">
               <div class="left bg rel"  v-loading="left_loading" >
                <el-main  style="padding:0;">
                        <div class="padding-20">
                             <el-form class="term line demo-form-inline" v-model="searchform" inline size="small">
                                <el-form-item :label="$t('manager.grsl_goodsNameB')+':'">
                                    <el-input v-model="searchform.name" :placeholder="$t('manager.grsl_goodsNameC')"></el-input>
                                </el-form-item>
                                 <el-form-item :label="$t('shop.reset.categoryType')">
                                     <el-select  v-model="searchform.categoryType" :placeholder="$t('commons.placeChoose')" @change="geProductType">
                                         <el-option :label="$t('shop.goods')" value="1"></el-option>
                                         <el-option :label="$t('shop.serve')" value="2"></el-option>
                                      </el-select>
                                 </el-form-item>
                                 <el-form-item :label="$t('manager.grsl_goodsTypeA')+':'">
                                     <el-select  v-model="searchform.categoryId" :placeholder="$t('commons.placeChoose')">
                                        <el-option  v-for="item in category" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                     </el-select>
                                 </el-form-item>
                                 <el-form-item>
                                    <el-button type="primary" class="submit" @click="getPrucuctList">{{$t('commons.queryBtn')}}</el-button>
                                    <el-button class="grey" @click="intForm">{{$t('commons.resetBtn')}}</el-button>
                                 </el-form-item>
                             </el-form>

                        <!-- 列表开始 -->

                             <el-table ref="multipleTable" :data="productList" header-row-class-name="default" size="small" >
                                 <el-table-column prop="goodsName" :label="$t('shop.productTitle')"></el-table-column>
                                 <el-table-column :label="$t('shop.categoryType2')">
                                     <template slot-scope="scope">
                                        {{scope.row.hotelGoods.categoryType == 1 ? $t('shop.goods') : $t('shop.serve')}}
                                     </template>
                                 </el-table-column>
                                 <el-table-column :label="$t('manager.grsl_goodsTypeA')" >
                                     <template slot-scope="scope">
                                         {{scope.row.hotelGoods.categoryName}}
                                     </template>
                                 </el-table-column>
                                 <el-table-column :label="$t('shop.rule')">
                                     <template slot-scope="scope">
                                        <div v-if="scope.row.hotelGoods">
                                            <div v-if="scope.row.hotelGoods.categoryType == 1">
                                                 {{numFormate(scope.row.retailPrice)}}
                                            </div>
                                            <div v-else>
                                                 <span v-if="scope.row.hotelGoods.priceModel == 1">
                                                     <!-- 一次性固定收费 -->
                                                     {{numFormate(scope.row.retailPrice)}}
                                                 </span>
                                                 <span v-else>
                                                    {{$t('shop.reset.orderPriceDesc',{priceStartMinute:scope.row.hotelGoods.priceStartMinute,startPrice:numFormate(scope.row.hotelGoods.startPrice),priceTime:scope.row.hotelGoods.priceTime,minutePrice:numFormate(scope.row.hotelGoods.minutePrice)})}}
                                                    <span v-if="scope.row.hotelGoods.capsPriceFlag == 2"> {{$t('shop.reset.orderCapsPrice',{capsPrice:numFormate(scope.row.hotelGoods.capsPrice)})}}</span>
                                                    <!-- {{scope.row.hotelGoods.priceStartMinute}}分钟后收起步价，
                                                    起步价{{scope.row.hotelGoods.startPrice}}日元，每
                                                    {{scope.row.hotelGoods.priceTime}}分钟收费{{scope.row.hotelGoods.minutePrice}}日元
                                                    <span v-if="scope.row.hotelGoods.capsPriceFlag == 2">封顶消费{{scope.row.hotelGoods.capsPrice}}日元</span> -->
                                                </span>
                                            </div>
                                        </div>
                                     </template>
                                 </el-table-column>
                                 <!-- <el-table-column label="商品单价(元)" width="250">
                                     <template slot-scope="scope">
                                     {{numFormate(scope.row.retailPrice)}}
                                     </template>
                                 </el-table-column> -->
                                <!-- <el-table-column prop="inventoryCount"  label="库存">
                                     <template slot-scope="scope">
                                         <span v-if="scope.row.hotelGoods.categoryType == 1">
                                             {{scope.row.inventoryCount}}
                                         </span>
                                     </template>
                                 </el-table-column> -->
                                 <el-table-column  :label="$t('food.common.action')" width="100">
                                     <template slot-scope="scope">
                                        <el-button  size="mini" @click="addCart(scope.row,scope.$index)">{{$t('food.reset.add')}}</el-button>
                                     </template>
                                 </el-table-column>
                             </el-table>
                             <div class="pagination">
                                 <el-pagination @current-change="handleCurrentChange" :current-page="searchform.pageIndex" :page-size="searchform.pageSize" :total="listTotal" layout="total, prev, pager, next, jumper"></el-pagination>
                             </div>
                        </div>
                </el-main>
                <!--  -->
               </div>
               <div class="right bg rel" v-loading="payLoading">
                   <div class="hasTitle">{{$t('shop.isChoose')}}</div>
                    <el-main class="main padding-20">
                        <el-table  :data="cart" header-row-class-name="default" size="small" >
                            <el-table-column width="100"  show-overflow-tooltip prop="goodsName" :label="$t('manager.grsl_goodsNameA')"></el-table-column>
                            <el-table-column :label="$t('shop.rule')">
                                <template slot-scope="scope">
                                     <div v-if="scope.row.hotelGoods.categoryType == 1"> {{numFormate(scope.row.retailPrice)}}</div>
                                     <div v-else>
                                         <span v-if="scope.row.hotelGoods.priceModel == 1">
                                              <!-- 一次性固定收费 -->
                                              {{numFormate(scope.row.retailPrice)}}
                                          </span>
                                          <span v-else>
                                            {{$t('shop.reset.orderPriceDesc',{priceStartMinute:scope.row.hotelGoods.priceStartMinute,startPrice:numFormate(scope.row.hotelGoods.startPrice),priceTime:scope.row.hotelGoods.priceTime,minutePrice:numFormate(scope.row.hotelGoods.minutePrice)})}}
                                            <span v-if="scope.row.hotelGoods.capsPriceFlag == 2"> {{$t('shop.reset.orderCapsPrice',{capsPrice:numFormate(scope.row.hotelGoods.capsPrice)})}}</span>

    <!-- <br> -->

                                         <!--    {{scope.row.hotelGoods.priceStartMinute}}分钟后收起步价，
                                             起步价{{scope.row.hotelGoods.startPrice}}日元，每
                                             {{scope.row.hotelGoods.priceTime}}分钟收费{{scope.row.hotelGoods.minutePrice}}日元
                                             <span v-if="scope.row.hotelGoods.capsPriceFlag == 2">封顶消费{{scope.row.hotelGoods.capsPrice}}日元</span> -->
                                         </span>
                                     </div>
                                </template>
                            </el-table-column>
                            <el-table-column :label="$t('shop.count')" width="150">
                                <template slot-scope="scope">
                                  <div class="cell" style="padding:0;">
                                      <div  class="el-input-number el-input-number--mini" style=" width:100px;">
                                          <span role="button" class="el-input-number__decrease" @click="changeCartCount(scope.$index,1)"><i class="el-icon-minus"></i></span>
                                          <span role="button" class="el-input-number__increase" @click="changeCartCount(scope.$index,2)"><i class="el-icon-plus"></i></span>
                                          <div class="el-input el-input--mini">
                                              <input type="text" min="1" v-model="scope.row.count" class="el-input__inner" disabled="disabled">
                                          </div>
                                      </div>
                                  </div>
                                </template>
                            </el-table-column>
                            <el-table-column width="100" :label="$t('food.common.action')">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleDelete(scope.row,scope.$index)">
                                        {{$t('shop.remove')}}
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row class="padding-tb-10">
                             {{$t('shop.food_total',{count:countToTal})}}{{numFormate(cartToTal)}}<!-- / 已结算金额：{{hasPayPrice}} -->
                        </el-row>
                        <div class="action rel" v-loading="isloading">
                            <div class="margin-t-10">
                                <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                    <el-form-item :label="$t('food.common.order_from')" prop="orderSource">
                                        <el-radio-group v-model="searchform.orderSource">
                                            <el-radio :label="1">PC</el-radio>
                                            <el-radio :label="2">{{$t('shop.reset.ipad')}}</el-radio>
                                            <el-radio :label="3">{{$t('shop.other')}}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button style="width: 50%;"  type="primary"  @click="submit">{{$t('food.reset.submit')}}</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                        <!-- end -->
                    </el-main>
               </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import {mapState,mapActions} from "vuex";
import mixin from '../mixin';
export default {
  mixins: [mixin],
  components: {},

  data() {
    return {
        left_loading: false,
        isloading:false,
        payLoading:false,
        tabCurr:0,
        tableData: [],
        active:'',
        searchform:{
            orderSource:1,
            name:'',
            categoryId:'',
            pageIndex:1,
            pageSize:20,
            categoryType:'',
            sellId:''
        },
        category:[],
        cart:[],
        productList:[],
        listTotal: 0, //总条数
        pageIndex:1,
        pageSize:20,
        form:{

           realPayPrice:'',//实付金额  Double必填
           payType:1,//结算方式 1现金 2银行卡  3支付宝 4支票  5会员卡  Integer选填
           remark:'',//备注  String选填
           memberCard:'',//会员卡卡号  String选填
           docCount:1,//单据份数  Integer选填
           billingType:1,// 计费类型 1直接结账 2签单到单位 3签单到房间  Integer必填
           signCheckInId:'',// 入住信息id  billingType=3必填  String选填
           signRoomId:'',//房间id
           signHouseNum:'',//房间号
           signEnterId:'',//签单单位id  billingType=2必填 String选填
           signCreditName:'',//签单单位名称  billingType=2必填  String选填
           signUserName:'',//签单用户名  billingType=2必填  String选填
           signIdcardType:'',//签单证件类型 1身份证 2护照  billingType=2必填   Integer选填
           signIdcard:'',//签单证件号码   billingType=2必填 String选填
           scoresDiscount:'',//积分抵扣分值  Integer选填
           scoresPrice:'',//积分抵扣额度  Double选填
        },
        isUseScore:false,
        isPrint:false,
        memberList:[],//会员列表
        selectMerberInfo:{},
        signList:[],//单位列表
        selectSignInfo:{},
        romeList:[],//房间列表
        selectRomeInfo:{},
        score:{
            shop_discount_ratio:'',
            convert:''
        },
        jfInfo:{
            jf:'',
            discount:''
        },
        rules:{

        }


    };
  },

  async mounted() {
       await  this.intForm();
  },
  computed: {
    ...mapState({
        token: state => state.user.token,
        userId: state => state.user.userId,
        msgKey: state => state.config.msgKey,
        plat_source: state => state.config.plat_source
    }),

    cartToTal(){
        let sum = 0
        let cart = this.cart
        cart.forEach(element => {
            if(element.hotelGoods.priceModel !== 2){
                sum +=  parseFloat(element.retailPrice) *  parseFloat(element.count)
            }
        });
        console.log(sum)
        return sum.toFixed(0);
    },

    //商品数量
    countToTal(){
        let sum = 0
        let cart = this.cart
        cart.forEach(element => {
            sum +=  parseFloat(element.count)
        });
        return sum
    },
  },
  methods: {
    intForm(){
        this.searchform.name = ''
        this.searchform.categoryType = ''
        this.searchform.categoryId = ''
        this.getDataList();
        // this.geProductType();
    },
    //获取售卖点列表
    getDataList(){
        this.left_loading = true
        let params = {}
        params.isShop = 1 //新增字段 是否商店部
        params.userId = this.userId
        params.storesNum = this.storesNum
        this.$F.doRequest(this, "/pms/hotelgoodsSelling/list", params, (res) => {
            console.log(res)
            this.left_loading = false
            this.tableData = res.list
            if( res.list.length > 0){
                if(this.$route.query.key){
                    this.active = this.$route.query.key
                    this.searchform.sellId  = this.$route.query.key
                }else{
                    this.active = res.list[0].id
                    this.searchform.sellId  = res.list[0].id
                }
                this.getPrucuctList();
            }
        });
    },

    //
    geProductType(){
        this.searchform.categoryId = ''
        // console.log(v)
        let params = {
            categoryType:this.searchform.categoryType,
            categoryId:this.searchform.categoryId
        }
        params.userId = this.userId
        params.storesNum = this.storesNum
        this.$F.doRequest(this, "/pms/hotelcategory/list", params, (res) => {
            console.log(res.list)
            this.category = this.getNewCateList(res.list)
            // this.listTotal = res.page.count
        });
    },
    //商品列表
    getPrucuctList(){
        this.left_loading = true
        let params = {
            goodsName:this.searchform.name,
            categoryId:this.searchform.categoryId,
            categoryType:this.searchform.categoryType,
            sellId:this.searchform.sellId,
            pageIndex:this.searchform.pageIndex,
            pageSize:this.searchform.pageSize,
            status:1,
            paging:true
        }
        params.userId = this.userId
        params.storesNum = this.storesNum
        this.$F.doRequest(this, "/pms/sellinglog/list", params, (res) => {
            this.left_loading = false
            this.productList = res.list
            this.listTotal = res.page.count
        });
    },

    //切换
    changeTab(id){
      this.active = id
      this.searchform.sellId = id
      this.left_loading = true
      this.getPrucuctList();
    },


    //加入
    addCart(item,index){



        // console.log(item.hotelGoods.categoryType)

        // if(this.productList[index].inventoryCount > 0){
            this.productList[index].inventoryCount -= 1
            let good = this.cart.find(v=>v.goodsName==item.goodsName)
            if(good){
              good.count += 1
            }else{
              this.cart.push({...item,count:1})
            }
        // }else{
        //     this.$alert('该商品已经没有库存啦，不能再售卖啦！', this.$t('commons.tip_desc'), {
        //       confirmButtonText: this.$t('commons.confirm'),
        //       callback: action => {
        //       }
        //     });
        // }
    },

    //购物车的加减 type = 1 是减少  2 是添加
    changeCartCount(v,type){
        let info  = this.cart[v]
        let good = this.productList.find(v=> v.goodsId==info.goodsId)
        if(type == 1){
            info.count-= 1
            // good.inventoryCount += 1
            if(info.count == 0){
                this.cart.splice(v,1)
                return false
            }
        }else{
            // if(good.inventoryCount == 0){
            //     this.$alert('该商品已经没有库存啦，不能再售卖啦!', this.$t('commons.tip_desc'), {
            //       confirmButtonText: this.$t('commons.confirm'),
            //       callback: action => {
            //       }
            //     });
            //     return false
            // }else{
                info.count+= 1
                // good.inventoryCount -= 1
            // }
        }
    },
    //移除
    handleDelete(item,index){
        // let good = this.productList.find(v=>v.goodsId == item.goodsId)
        // if(good){
            // good.inventoryCount = good.inventoryCount + item.count
            this.cart.splice(index,1)
            if(this.cart.length == 0){
                this.getPrucuctList();
            }
        // }

    },



    //提交
    submit(){
        let list = this.cart
        if(list.length == 0){
            this.$message.error(this.$t('food.common.select_product'));
            return
        }
        let arr  = []
        let cateArr = []
        list.forEach(element => {
            arr.push({
                goodsId:element.goodsId,
                goodsName:element.goodsName,
                unitPrice:element.retailPrice,
                totalPrice:parseFloat(element.retailPrice)*parseFloat(element.count),
                goodsCount:parseFloat(element.count),
            });
        });
        this.payLoading = true
        let params = {
            orderSource:this.searchform.orderSource,
            sellingId:this.searchform.sellId,
            shopCount:this.countToTal,
            consumePrice:this.cartToTal,
            realPayPrice:this.cartToTal,
            shopsJson :JSON.stringify(arr)
        }

        params.userId = this.userId
        params.storesNum = this.storesNum
        console.log(params)
        this.$F.doRequest(this, "/pms/shop/shop_place_order_edit", params, (res) => {
            this.alert(200,this.$t('food.common.success'));
            this.payLoading = false
            this.cart = []
        });
    },

    /**每页数 */
    handleSizeChange(val) {
        // console.log(val)
        this.searchform.pageSize = val;
        this.getPrucuctList();
    },
    /**当前页 */
    handleCurrentChange(val) {
        this.searchform.pageIndex = val;
        this.getPrucuctList();
    }
  }
};
</script>
<style lang="less" scoped>



.bg{
    background: #fff;
}
.boss-index {
    .rel{
        position: relative;
    }
    border-radius: 10px;
    .round{
        border-radius: 10px;
    }
    .el-tabs__content{display: none;}
    .el-header {
        padding: 20px;
        height: auto !important;
        width: 100%;
        margin-bottom: 20px;
        .item{
            cursor: pointer;
            display: inline-block;
            padding: 0 25px;
            line-height: 40px;
            min-width: 120px;
            text-align: center;
            font-size: 16px;
        }
        .item.active{
            background: #126eff;
            border-radius: 4px;
            color: #ffffff;
        }


    }
    .shopNavList{
        .item{
            width:13% ;
            float: left;
            border-radius: 4px;
            background-color: rgba(239, 239, 239, 1);
            border: 1px solid rgba(200, 200, 200, 1);
            padding: 30px 0;
            text-align: center;
            margin-right: 15px;
            margin-bottom:15px;
            cursor: pointer;
            .icon{
                margin:0 auto;
                width: 60px;
                line-height: 60px;
                background: #1296DB;
                border-radius: 50%;
                color: #fff;
                font-size: 30px;
                i{
                    vertical-align: middle;
                }
            }
            .title{
                padding-top: 10px;
                font-size: 15px;
            }
        }
    }

    .padding-20{
        padding: 20px;
    }
    .content {
        display: flex;
        flex-direction: row;
        height: 100%;
        background: transparent;
        padding: 0;

        .left {
            border-radius: 10px;
            flex: 3;
            margin-right: 20px;
        }

        .right {
            border-radius: 10px;
            flex: 2;

            .action{
                padding: 0 20px;
                .el-form-item{margin-bottom: 10px;}
            }
            .hasTitle{
                z-index: 500;
                background: #fff;
                padding: 20px;
                border-bottom: 1px solid #eee;
                position: absolute;
                left: 0;top: 0; right: 0;
            }
            .main{
                height: 100%;
                padding-top: 80px;
                overflow:auto;
                position: relative;

            }
        }
    }
}


</style>
