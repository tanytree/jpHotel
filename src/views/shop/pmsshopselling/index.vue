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
                                <el-form-item :label="$t('manager.grsl_goodsName')+':'">
                                    <el-input v-model="searchform.name" :placeholder="$t('manager.grsl_goodsName')"></el-input>
                                </el-form-item>
                                 <el-form-item label="商品类别型:">
                                     <el-select  v-model="searchform.categoryType" placeholder="请选择" @change="geProductType">
                                         <el-option label="实物" value="1"></el-option>
                                         <el-option label="服务" value="2"></el-option>
                                      </el-select>
                                 </el-form-item>
                                 <el-form-item :label="$t('manager.grsl_goodsType')+':'">
                                     <el-select  v-model="searchform.categoryId" placeholder="请选择">
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
                                 <el-table-column prop="goodsName" :label="$t('manager.grsl_goodsName')"></el-table-column>
                                 <el-table-column label="商品类型">
                                     <template slot-scope="scope">
                                        {{scope.row.hotelGoods.categoryType == 1 ? '实物' : '服务'}}
                                     </template>
                                 </el-table-column>
                                 <el-table-column :label="$t('manager.grsl_goodsType')" >
                                     <template slot-scope="scope">
                                         {{scope.row.hotelGoods.categoryName}}
                                     </template>
                                 </el-table-column>
                                 <el-table-column label="计费规则">
                                     <template slot-scope="scope">
                                        <div v-if="scope.row.hotelGoods">
                                            <div v-if="scope.row.hotelGoods.categoryType == 1">
                                                价格*数量
                                            </div>
                                            <div v-else>
                                                 <span v-if="scope.row.hotelGoods.priceModel == 1">
                                                     一次性固定收费
                                                 </span>
                                                 <span v-else>
                                                    {{scope.row.hotelGoods.priceStartMinute}}分钟后收起步价，
                                                    起步价{{scope.row.hotelGoods.startPrice}}日元，每
                                                    {{scope.row.hotelGoods.priceTime}}分钟收费{{scope.row.hotelGoods.minutePrice}}日元
                                                    <span v-if="scope.row.hotelGoods.capsPriceFlag == 2">封顶消费{{scope.row.hotelGoods.capsPrice}}日元</span>
                                                </span>
                                            </div>
                                        </div>
                                     </template>
                                 </el-table-column>
                                 <el-table-column prop="retailPrice" label="商品单价(元)" width="250"></el-table-column>
                                 <!-- <el-table-column prop="inventoryCount"  label="库存">
                                     <template slot-scope="scope">
                                         <span v-if="scope.row.hotelGoods.categoryType == 1">
                                             {{scope.row.inventoryCount}}
                                         </span>
                                     </template>
                                 </el-table-column> -->
                                 <el-table-column  label="操作" width="100">
                                     <template slot-scope="scope">
                                        <el-button  size="mini" @click="addCart(scope.row,scope.$index)">添加</el-button>
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
                   <div class="hasTitle">已选商品</div>
                    <el-main class="main padding-20">
                        <el-table  :data="cart" header-row-class-name="default" size="small" >
                            <el-table-column prop="goodsName" :label="$t('manager.grsl_goodsName')"></el-table-column>
                            <el-table-column prop="retailPrice" label="单价(元)" show-overflow-tooltip></el-table-column>
                            <el-table-column label="数量" width="150">
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
                            <el-table-column label="合计(元)" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    {{parseFloat(scope.row.count) * parseFloat(scope.row.retailPrice)}}
                                </template>
                            </el-table-column>
                            <el-table-column :label="$t('commons.operating')">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleDelete(scope.row,scope.$index)">移除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row class="padding-tb-10">
                            <em>共 {{countToTal}} 件</em>，合计：{{cartToTal}}元 / 已结算金额：{{hasPayPrice}}
                        </el-row>
                        <div class="action rel" v-loading="isloading">
                            <div class="margin-t-10">
                                <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="订单来源" prop="orderSource">
                                        <el-radio-group v-model="searchform.orderSource">
                                            <el-radio :label="1">售卖点</el-radio>
                                            <el-radio :label="2">IPAD</el-radio>
                                            <el-radio :label="3">其他</el-radio>
                                        </el-radio-group>
                                    </el-form-item>


                                    <el-form-item :label="$t('food.common.billingType')" prop="billingType">
                                        <el-radio-group v-model="form.billingType" @change="changeBillingType">
                                            <el-radio :label="1">{{$t('food.billingType.1')}}</el-radio>
                                            <el-radio :label="2">{{$t('food.billingType.2')}}</el-radio>
                                            <el-radio :label="3">{{$t('food.billingType.3')}}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>

                                    <div v-if="form.billingType == 1">
                                        <el-form-item :label="$t('food.common.payType')">
                                            <el-select size="small" v-model="form.payType">
                                                <el-option :label="$t('food.payType.1')" :value="1"></el-option>
                                                <el-option :label="$t('food.payType.2')" :value="2"></el-option>
                                                <!-- <el-option :label="$t('food.payType.3')" :value="3"></el-option>
                                                <el-option :label="$t('food.payType.4')" :value="4"></el-option> -->
                                                <el-option :label="$t('food.payType.5')" :value="5"></el-option>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item :label="$t('food.common.payPrice')">
                                            <span class="text-red">{{getPayPrice}}</span>
                                        </el-form-item>

                                        <el-form-item :label="$t('food.common.member_card')">
                                            <el-select  size="small" v-model="form.memberCard"  filterable :placeholder="$t('food.common.select_member_card')" @change="getMerberInfo">
                                                <el-option
                                                  v-for="(item,index) in memberList"
                                                  :key="index"
                                                  :label="item.name +'('+ item.mobile +')'"
                                                  :value="item.memberCard">
                                                </el-option>
                                            </el-select>
                                            <el-button style="margin-left: 10px;" size="small">{{$t('food.common.read_member_card')}}</el-button>
                                        </el-form-item>
                                        <!-- 使用积分兑换操作，暂时不要 -->

                                        <!-- <el-form-item v-if="selectMerberInfo.score && selectMerberInfo.score > 0">
                                            <el-checkbox v-model="isUseScore">可用{{jfInfo.jf}}积分抵扣{{jfInfo.discount}}日元</el-checkbox>
                                        </el-form-item> -->
                                    </div>
                                    <div v-if="form.billingType == 2">
                                        <el-form-item :label="$t('food.common.select_company')" prop="signEnterId">
                                            <el-select  size="small" v-model="form.signEnterId"  filterable :placeholder="$t('food.common.select_company')" @focus="getSignList" @change="getSignInfo" >
                                                <el-option
                                                  v-for="(item,index) in signList"
                                                  :key="index"
                                                  :label="item.enterName +'('+ item.contactPhone +')'"
                                                  :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item :label="$t('food.common.acount_info')" prop="signUserName" class="signUserBox">
                                            <el-input  size="small" placeholder="姓名" v-model="form.signUserName" style="width: 180px;" ></el-input>
                                            <el-select size="small" v-model="form.signIdcardType" :placeholder="$t('food.common.card_type')" style="width: 120px;" >
                                                <el-option :label="$t('food.card_type.1')" :value="1"></el-option>
                                                <el-option :label="$t('food.card_type.2')" :value="2"></el-option>
                                            </el-select>
                                            <el-input size="small" :placeholder="$t('food.common.card_no')" v-model="form.signIdcard" style="width: 180px;" ></el-input>
                                        </el-form-item>
                                    </div>


                                    <div v-if="form.billingType == 3">
                                        <el-form-item :label="$t('food.common.select_room')" prop="signRoomId">
                                            <el-select  size="small" v-model="form.signRoomId"  filterable :placeholder="$t('food.common.select_room')" @focus="getSignRoomList" @change="getSignRoomInfo" >
                                                <el-option
                                                  v-for="(item,index) in romeList"
                                                  :key="index"
                                                  :label="item.houseName + '(' + item.houseNum +')'"
                                                  :value="item.roomId">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>

                                    <el-form-item  :label="$t('food.common.remark')">
                                        <el-input type="textarea" :placeholder="$t('food.common.remark')" v-model="form.remark"  maxlength="200" show-word-limit></el-input>
                                    </el-form-item>

                                    <el-form-item  :label="$t('food.common.order_count')">
                                        <el-input-number size="mini" v-model="form.docCount" :step="1" :min="1" step-strictly></el-input-number>
                                    </el-form-item>

                                    <el-form-item>
                                        <el-checkbox v-model="isPrint">{{$t('food.common.order_print')}}</el-checkbox>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" size="small"  @click="submit">{{$t('food.common.submit')}}</el-button>
                                        <el-button size="small" @click="reset">清空</el-button>
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
            categoryType:1,
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
    //商品总金额
    cartToTal(){
        let sum = 0
        let cart = this.cart
        cart.forEach(element => {
           sum +=  parseFloat(element.retailPrice) *  parseFloat(element.count)
        });
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

    //计算已结算的部分商品金额
    hasPayPrice(){
        let sum = 0
        let cart = this.cart
        cart.forEach(element => {
           if(element.hotelGoods.categoryType == 1){
               sum +=  parseFloat(element.retailPrice) *  parseFloat(element.count)
           }
        });
        return sum.toFixed(0);

    },

    //计算实际价格
    getPayPrice(){
        if(this.form.billingType == 1){
            let consumePrice = this.cartToTal
            let scoresPrice = this.jfInfo.discount
            let realPayPrice = 0
            if(this.isUseScore){
                realPayPrice =  parseFloat(consumePrice) - parseFloat(scoresPrice)
            }else{
                realPayPrice = parseFloat(consumePrice)
            }
            this.form.realPayPrice = parseFloat(realPayPrice).toFixed(2)
            let p = parseFloat(realPayPrice).toFixed(2)
            return p
        }
    }
  },
  methods: {
    intForm(){
        this.searchform.name = ''
        this.searchform.categoryType = '1'
        this.searchform.categoryId = ''
        this.getDataList();
        this.geProductType(1);
        this.getMemberList();
        this.getScoresDiscount();
    },
    //获取售卖点列表
    getDataList(){
        this.left_loading = true
        let params = {}
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
    geProductType(v){
        // this.searchform.categoryId = ''
        let params = {
            categoryType:v,
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
            console.log(res)
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

    //获取积分换算查询
    getScoresDiscount(){
        let params = {
            storesNum:this.storesNum,
            userId: this.userId
        }
        this.$F.doRequest(this, "/pms/hotelparam/convertfind", params, (res) => {
            this.score.convert = res
            console.log(res)
            this.getScoresPrice();
        });
    },

    //获取积分抵扣比例
    getScoresPrice(){
        let params = {
            storesNum:this.storesNum,
            userId: this.userId
        }
        this.$F.doRequest(this, "/pms/hotelparam/discountfind", params, (res) => {
            this.score.shop_discount_ratio = res.shop_discount_ratio
            console.log(res.shop_discount_ratio)
        });
    },

    //获取会员列表
    getMemberList(){
        this.isloading = true
        let params = {
            storesNum:'',
            paging: false
        }
        this.$F.doRequest(this, "/pms/hotelmember/list", params, (res) => {
            this.memberList = res.list
            this.isloading = false
        });
    },
    //选择会员
    getMerberInfo(){
        let card = this.form.memberCard
        let list = this.memberList
        for(let i in list){
            if(card == list[i].memberCard){
                this.selectMerberInfo = list[i]
                console.log(this.selectMerberInfo)
                this.getScore();
                break
            }
        }
    },

    //计算当前的积分和抵扣金额
    getScore(){
        console.log(this.isUseScore)
        // if(this.isUseScore){
            let price = this.cartToTal
            let shop_discount_ratio = this.score.shop_discount_ratio
            let convert = this.score.convert
            let score =  this.selectMerberInfo.score
            // console.log(score)
            if(score){
                let jf = parseFloat(price)*parseFloat(convert)*parseFloat(shop_discount_ratio) //当前可有用的积分
                let discount = 0
                if(score > jf || score == jf){
                    discount = parseFloat(price)*parseFloat(shop_discount_ratio) //当前最大可抵扣金额
                    this.jfInfo = {
                       jf:jf,
                       discount:discount.toFixed(2)
                    }
                }else{
                    discount =  parseFloat(score)/parseFloat(convert)
                    this.jfInfo = {
                       jf:score,
                       discount:discount.toFixed(2)
                    }
                }
                this.form.scoresDiscount =  this.jfInfo.jf
                this.form.scoresPrice =  this.jfInfo.discount
            }else{
                this.form.scoresDiscount = ''
                this.form.scoresPrice =  ''
            }

        // }
    },

    //获取单位列表
    getSignList() {
        this.isloading = true
        let params = {
            paging: false
        }
        this.$F.doRequest(this,"/pms/hotelenter/list",params,(res) => {
          this.signList = res.list;
          this.isloading = false
        }
      );
    },

    //获取房间列表
    getSignInfo(){
        let signEnterId = this.form.signEnterId
        // console.log(signEnterId)
        let list = this.signList
        let obj = {}
        for(let i in list){
            if(signEnterId == list[i].id){
                obj = list[i]
                break
            }
        }
        // console.log(obj)
        this.form.signEnterId =   obj.id      //签单单位名称  billingType=2必填  String选填
        this.form.signCreditName = obj.enterName //签单单位名称  billingType=2必填  String选填
    },

    //获取房间详情
    getSignRoomList(){
        this.isloading = true
        let params = {}
        params.userId = this.userId
        params.storesNum = this.storesNum
        this.$F.doRequest(this, "/pms/dishes/living_rooms_list", params, (res) => {
            this.romeList = res.roomListGroup
            this.isloading = false
        });
    },

    getSignRoomInfo(){
        let signRoomId = this.form.signRoomId
        let list = this.romeList
        let obj = {}
        for(let i in list){
            if(signRoomId == list[i].roomId){
                obj = list[i]
                break
            }
        }
        this.form.signCheckInId = obj.checkinId// 入住信息id  billingType=3必填  String选填
        this.form.signRoomId = obj.roomId //房间id
        this.form.signHouseNum = obj.houseNum //房间号
    },

    //提交
    submit(){
        // console.log(this.isUseScore)
        // console.log(this.form.scoresDiscount)
        // console.log(this.form.scoresPrice)
        console.log(this.form.billingType)
        let arr  = []
        let list = this.cart
        let cateArr = []
        for(let i in list){
            arr.push({
                goodsId:list[i].goodsId,
                goodsName:list[i].goodsName,
                unitPrice:list[i].retailPrice,
                totalPrice:parseFloat(list[i].retailPrice)*parseFloat(list[i].count),
                goodsCount:parseFloat(list[i].count),
            })
            cateArr.push(list[i].hotelGoods.categoryType)


        }

        if(arr.length == 0){
            this.$message.error('请选择商品！');
            return
        }

        if(this.form.billingType == 1){
            if(this.form.memberCard == ''){
                this.$message.error('请选择会员！');
                return
            }
        }

        if(this.form.billingType == 2){
            if(this.form.signEnterId == ''){
                this.$message.error('请选择单位！');
                return
            }
            if(this.form.signUserName == ''){
               this.$message.error('请输入姓名！');
               return
            }
            if(this.form.signIdcardType == ''){
                this.$message.error('请输入证件类型！');
                return
            }
            if(this.form.signIdcard == ''){
                this.$message.error('请输入证件号！');
                return
            }
        }

        if(this.form.billingType == 3){
             if(this.form.signHouseNum == ''){
                 this.$message.error('请选择房间！');
                 return
             }
        }
        this.payLoading = true
        let params = {
            orderSource:this.searchform.orderSource,
            sellingId:this.searchform.sellId,
            shopCount:this.countToTal,
            consumePrice:this.cartToTal,
            realPayPrice:this.cartToTal,
            shopsJson :JSON.stringify(arr)
        }

        // console.log(params)

        params.userId = this.userId
        params.storesNum = this.storesNum
        this.$F.doRequest(this, "/pms/shop/shop_place_order_edit", params, (res) => {
            // this.alert(200,this.$t('food.common.success'));
            this.payLoading = false
            this.payOrder(res.orderId,cateArr)
        });
    },

    payOrder(id,cateArr){
            // console.log(arr)
            // console.log(arr.indexOf(2))
            // 2 表示 arr 中存在服务类型的商品
            let state = ''
            let hasPayGoods = []
            let list = this.cart
            for(let i in list){
                if(list[i].hotelGoods.categoryType == 1){
                   hasPayGoods.push(list[i])
                }
            }
            console.log(hasPayGoods)
            this.payLoading = true
            let params = this.form
            params.hasPayPrice = this.hasPayPrice
            //cateArr 选择商品的类型是否是实体 实体1 服务2
            if(cateArr.indexOf(2) > -1){
                params.state = 1
            }else{
                params.state = 2
            }
            let goodsIds = hasPayGoods.map((ele,index)=>{
                return  ele.goodsId
            })

            console.log(goodsIds)

            params.goodsSubIds = goodsIds.join(',')
            params.orderId = id
            params.userId = this.userId
            params.storesNum = this.storesNum
            console.log(params)
            this.$F.doRequest(this, "/pms/shop/shop_place_order_pay", params, (res) => {
                this.payLoading = false
                this.alert(200,this.$t('food.common.success'));
                this.reset();
            });




    },



    changeBillingType(value){
        // console.log(value)
        this.isUseScore = false
        this.isPrint = false
    },
    reset(){
        this.cart = []
        this.form = {
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
        }
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
  },
  watch:{

    cart(val){
        //监听购物车添加商品的积分计算
        this.getScore()
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
