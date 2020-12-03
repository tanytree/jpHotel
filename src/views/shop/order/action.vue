<template>
    <div class="action" v-loading="loading">
        <div class="money text-red text-size20">
        {{$t('food.common.consumePrice')}} : {{numFormate(getFee)}}   <!--span class="text-gray text-size14 margin-l-15">已付金额: {{numFormate(info.hasPayPrice)}}</span> {{info.consumePrice}} --></div>
        <!-- <div class="money">已付金额: {{info.hasPayPrice}}</div> -->
        <div class="margin-t-10">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item :label="$t('shop.payType')" prop="billingType">
                    <el-radio-group v-model="form.billingType" @change="changeBillingType">
                        <el-radio :label="1">{{$t('food.billingType.1')}}</el-radio>
                        <!-- <el-radio :label="2">{{$t('food.billingType.2')}}</el-radio> -->
                        <el-radio :label="3">{{$t('food.billingType.3')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('shop.yhPrice')">
                   <el-input  size="small" type="number" v-model="form.preferentialPrice" :placeholder="$t('shop.yhPrice')" style="width: 180px;" ></el-input>
                </el-form-item>
                <el-form-item :label="$t('food.common.payPrice')">
                    <!-- {{getPayPrice}} -->
                    {{numFormate(getFee)}}
                </el-form-item>

                <div v-if="form.billingType == 1">
                    <el-form-item :label="$t('food.common.payType')">
                        <el-select size="small" v-model="form.payType">
                            <el-option :label="$t('food.payType.1')" :value="1"></el-option>
                            <el-option :label="$t('food.payType.2')" :value="2"></el-option>
                            <!-- <el-option :label="$t('food.payType.3')" :value="3"></el-option>
                            <el-option :label="$t('food.payType.4')" :value="4"></el-option> -->
                            <!-- <el-option :label="$t('food.payType.5')" :value="5"></el-option> -->
                        </el-select>
                    </el-form-item>

                    <!-- <el-form-item :label="$t('food.common.payPrice')">
                        {{getPayPrice}}
                    </el-form-item> -->

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
                        <el-select  size="small" v-model="form.signEnterId"  filterable :placeholder="$t('food.common.select_company')"  @change="getSignInfo" >
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
                        <el-select  size="small" v-model="form.signRoomId"  filterable :placeholder="$t('food.common.select_room')" @change="getSignRoomInfo" >
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
                    <el-input-number size="mini" v-model="form.docCount" :step="1" step-strictly></el-input-number>
                </el-form-item>

                <el-form-item>
                    <el-checkbox v-model="isPrint">{{$t('food.common.order_print')}}</el-checkbox>
                </el-form-item>
            </el-form>
        </div>
        <el-divider></el-divider>
        <div class="dialog-footer text-right" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">{{$t('food.common.cancel')}}</el-button>
           <el-button type="primary" size="small"  @click="submit">{{$t('food.common.pay_order_deal')}}</el-button>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex"
    import mixin from '../mixin';
    export default {
        mixins: [mixin],
        data() {
            return {
                loading:false,
                info:{},
                form:{
                   orderId:'',//菜品订单id string必填
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
                   preferentialPrice:'',//优惠金额
                },
                endTime:'',
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
                rules: {

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

            //计算实际价格
            getPayPrice(){
                if(this.form.billingType == 1){
                    // let consumePrice = this.info.consumePrice

                    let consumePrice = this.getFee
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
                }else{
                    return 0
                }
            },
            //计算价格
            getFee(){
                if(this.endTime && this.info.orderSubList && this.info.orderSubList.length > 0){
                    let list = this.info.orderSubList
                    let sum = 0
                    list.forEach(element => {
                        if(element.goods.categoryType == 2){
                            if(element.goods.priceModel == 2){
                                sum += this.getFinalFee(element.goods,this.endTime,this.info.createTime)
                            }else{
                                sum += element.totalPrice
                            }
                        }else{
                            sum += parseFloat(element.totalPrice)
                        }
                    });
                    return parseFloat(this.form.preferentialPrice) ? sum - parseFloat(this.form.preferentialPrice) : sum

                    // for(let i in list){
                    //     if(list[i].goods.categoryType == 2){
                    //         console.log(list[i].createTime)
                    //         let data = list[i].goods

                    //         if(data.priceModel == 2){
                    //             let fee = this.getFinalFee(data,this.endTime,list[i].createTime)
                    //             sum += fee
                    //         }else{
                    //             sum += list[i].totalPrice
                    //         }
                    //     }
                    // }

                    // return  parseFloat(this.form.preferentialPrice) ? sum - parseFloat(this.form.preferentialPrice) : sum
                }

            }

        },
        mounted() {

        },
        methods: {
            intForm(){
                this.form = {
                    orderId:'',//菜品订单id string必填
                    realPayPrice:'',//实付金额  Double必填
                    payType:1,//结算方式 1现金 2银行卡  3支付宝 4支票  5会员卡  Integer选填
                    remark:'',//备注  String选填
                    memberCard:'',//会员卡卡号  String选填
                    docCoun:1,//单据份数  Integer选填
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

                this.score = {
                    shop_discount_ratio:'',
                    convert:''
                }

                this.jfInfo = {
                    jf:'',
                    discount:''
                }
                this.isUseScore = false
                this.isPrint = false
            },
            //获取传过来的值
            getInfo(data){
                this.intForm();
                this.get_systime(data.createTime)
                // console.log(data)
                console.log(data.billingType)
                this.form.billingType = data.billingType
                if(data.memberCard){
                    this.form.memberCard = data.memberCard
                }
                if(data.signEnterId){
                    this.form.signEnterId = data.signEnterId
                    this.form.signCreditName = data.signCreditName
                    this.form.signUserName = data.signUserName
                    this.form.signIdcardType = data.signIdcardType
                    this.form.signIdcard = data.signIdcard
                }

                if(data.signRoomId){
                    this.form.signRoomId = data.signRoomId
                    // this.form.signCheckInId = data.signCheckInId
                    // this.signHouseNum = ''
                }
                this.form.docCount = data.docCount
                this.form.remark = data.remark
                this.info = data
                this.form.orderId = data.id
                // this.form.scoresDiscount = data.scoresDiscount
                // this.form.scoresPrice = data.scoresPrice
                this.getMemberList();
                this.getScoresDiscount();
                this.getSignList();
                this.getSignRoomList();

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


            changeBillingType(value){
                // console.log(value)
                this.isUseScore = false
                this.isPrint = false
            },



            //获取会员列表
            getMemberList(){
                this.loading = true
                let params = {
                    storesNum:'',
                    paging: false
                }
                this.$F.doRequest(this, "/pms/hotelmember/list", params, (res) => {
                    this.memberList = res.list
                    this.loading = false
                    this.getMerberInfo();
                });
            },
            //选择会员
            getMerberInfo(){
                let card = this.form.memberCard
                if(!card){
                    return false
                }
                let list = this.memberList
                for(let i in list){
                    if(card == list[i].memberCard){
                        this.selectMerberInfo = list[i]
                        this.getScore();
                        break
                    }
                }
            },

            //计算当前的积分和抵扣金额
            getScore(){
                console.log(this.isUseScore)
                // if(this.isUseScore){
                    let price = this.info.consumePrice
                    let shop_discount_ratio = this.score.shop_discount_ratio
                    let convert = this.score.convert
                    let score =  this.selectMerberInfo.score
                    console.log(convert)
                    console.log(shop_discount_ratio)
                    console.log(score)
                    if(!convert || !shop_discount_ratio || !score){
                        this.form.scoresDiscount =  0
                        this.form.scoresPrice =  0
                        return false
                    }
                    let jf = parseFloat(price)*parseFloat(convert)*parseFloat(shop_discount_ratio) //当前可有用的积分
                    let discount = 0
                    if(score > jf || score == jf){
                        discount = parseFloat(price)*parseFloat(shop_discount_ratio) //当前最大可抵扣金额
                        this.jfInfo = {
                           jf:jf,
                           // discount:discount.toFixed(0)
                           discount: discount ? discount.toFixed(2) : ''
                        }
                    }else{
                        discount =  parseFloat(score)/parseFloat(convert)
                        this.jfInfo = {
                           jf:score,
                           discount: discount ? discount.toFixed(2) : ''
                        }
                    }
                    console.log(this.jfInfo)

                    this.form.scoresDiscount =  this.jfInfo.jf
                    this.form.scoresPrice =  this.jfInfo.discount
                // }else{

                // }
            },

            //获取单位列表
            getSignList() {
                this.loading = true
                let params = {
                    paging: false
                }
                this.$F.doRequest(this,"/pms/hotelenter/list",params,(res) => {
                  this.signList = res.list;
                  this.loading = false
                  this.getSignInfo();
                });
            },

            //获取单位详情
            getSignInfo(){
                let signEnterId = this.form.signEnterId
                console.log(signEnterId)
                if(!signEnterId){
                    return false
                }
                let list = this.signList
                let obj = {}
                for(let i in list){
                    if(signEnterId == list[i].id){
                        obj = list[i]
                        break
                    }
                }
                // console.log(obj)
                // this.form.signEnterId =   obj.id      //签单单位名称  billingType=2必填  String选填
                this.form.signCreditName = obj.enterName //签单单位名称  billingType=2必填  String选填
            },

            //获取房间详情
            getSignRoomList(){
                this.loading = true
                let params = {}
                params.userId = this.userId
                params.storesNum = this.storesNum
                this.$F.doRequest(this, "/pms/dishes/living_rooms_list", params, (res) => {
                    this.romeList = res.roomListGroup
                    this.loading = false
                    this.getSignRoomInfo();
                });
            },

            getSignRoomInfo(){
                let signRoomId = this.form.signRoomId
                console.log(signRoomId)
                if(!signRoomId){
                    return false
                }
                let list = this.romeList
                let obj = {}
                for(let i in list){
                    if(signRoomId == list[i].roomId){
                        obj = list[i]
                        break
                    }
                }
                // console.log(obj)
                this.form.signCheckInId = obj.checkinId// 入住信息id  billingType=3必填  String选填
                this.form.signRoomId = obj.roomId //房间id
                this.form.signHouseNum = obj.houseNum //房间号
            },
            //获取系统时间
            get_systime(time){
                let info = {
                   startTime:time
                }
                this.$F.doRequest(this, "/pms/system/system_time", info, (res) => {
                    // console.log(res)
                    this.endTime = res.dateStr
                });
            },


            //提交结账
            submit(){
                this.loading = true
                let params = this.form
                params.consumePrice = this.info.consumePrice
                params.hasPayPrice = this.info.hasPayPrice
                params.state = 2
                let goodsIds = this.info.orderSubList.map((ele,index)=>{
                    return  ele.goodsId
                })
                params.goodsSubIds = goodsIds.join(',')
                params.realPayPrice = this.getFee
                // params.realPayPrice = this.info.hasPayPrice + this.getFee
                params.orderId = this.info.id
                params.userId = this.userId
                params.storesNum = this.storesNum

                this.$F.doRequest(this, "/pms/shop/shop_place_order_pay", params, (res) => {
                    this.loading = false
                    this.alert(200,this.$t('food.common.success'));
                    this.closeDialog();
                });
            },

            closeDialog(){
                this.info = {}
                this.intForm()
                this.$emit('closeDialog')
            }
        },
        watch:{
            'form.signEnterId': {
                handler(newVal,oldVal) {
                    this.getSignInfo();
                },
                deep: true,
                immediate: true
            },
            getFee:{
                handler(newVal,oldVal) {
                   console.log(newVal)
                   if(newVal < 0){
                       this.form.preferentialPrice = ''
                       this.alert(0,'优惠金额不能大于结算金额,请重新输入优惠金额！');
                   }
                },
                deep: true,
                immediate: true
            }


        }
    }
</script>

<style lang="less" scoped>
    .money{
        padding:20px;
        background-color:#FAFAFA;
    }
    .el-form-item{
        margin-bottom: 10px;
    }
    .signUserBox{
        .el-input,.el-select {
            vertical-align: top;
            margin: 0 10px 10px 0;
            display: inline-block;
            width: 100px;
        }
    }



</style>
