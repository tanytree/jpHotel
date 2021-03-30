<template>
  <div class="boss-index">
   <div class="content">
      <div class="left">
        <el-header>{{$t('food.common.is_choose_food')}}</el-header>
        <div class="tablist">
            <el-table
              :data="cart"
              border
              header-row-class-name="default"
              size="small"
            >
              <el-table-column prop="name" :label="$t('food.common.food_title')" ></el-table-column>
              <el-table-column :label="$t('food.common.food_price')">
                  <template slot-scope="scope">
                   ¥ {{numFormate(scope.row.price)}}
                  </template>
              </el-table-column>
              <el-table-column :label="$t('food.common.food_count')" width="160">
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
              <el-table-column :label="$t('food.common.action')">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleDelete(scope.$index)">{{$t('food.common.remove')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
        <div class="block flex " >
            <div class=" text-size14 text-left"  style="justify-content: flex-start">
                <!-- {{$t('food.common.food_total',{count:countToTal})}}  ¥  <span class="text-size20"> {{numFormate(cartToTal)}}</span> -->
              {{$t('food.common.product_total')}}：{{countToTal}}{{$t('food.reset.each')}}；¥ <span class="text-size20"> {{numFormate(cartToTal)}}</span>
             </div>
            <div style="max-width: 100px;">
               <el-button type="primary" :disabled="cartToTal == '0.00' || cartToTal == 0" style="width: 100%;" @click="openDialog">{{$t('food.reset.submit')}}</el-button>
            </div>
         </div>
      </div>
      <el-container class="right">
        <el-header>
            <el-row>
              <el-button size="small" :type="tabCurr == 999 ? 'primary' : '' " @click="intForm">{{$t('food.common.all')}}</el-button>
              <el-button size="small" v-for="(item,index) in categroyList" :key="index"  :type="tabCurr == index ? 'primary' : ''"  @click="changeTab(item.id,item,index)">{{item.name}}</el-button>
              <span style="float: right;">
                  <el-input
                       size="small"
                      :placeholder="$t('food.common.food_title')"
                      v-model="searchForm.name"
                      @change="getDataList"
                      >
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
              </span>
            </el-row>
        </el-header>
        <el-main  v-loading="list_loading">
            <div v-if="cateList.length > 0">
                <el-form class="demo-ruleForm">
                    <el-form-item :label="$t('food.common.cate')" prop="categoryId">
                      <el-cascader
                         :options="cateList"
                         v-model="searchForm.categoryId"
                         @change="handleChange"></el-cascader>
                    </el-form-item>
                </el-form>
            </div>
            <div class="menuList clearfix" >
                <el-row :gutter="10" style="width: 100%;">
                    <el-col v-for="(item,index) in tableData" :key="index" :xs="8" :sm="8"  :md="8" :lg="6" :xl="6">
                        <div class="menuItem" >
                            <div class="box">
                               <div class="top">
                                   <div>{{item.name}}</div>
                                   <div class="text-size12 margin-t-10 text-gray" style="height:16px;">
                                       <span v-if="item.remainingCount == null" class="text-gray text-size12">{{$t('food.common.no_set')}}</span>
                                       <div v-else>
                                           <div v-if="item.soldOut  == 1"  :class="item.remainingCount <= item.warningCount ? 'text-red' : ''" >{{$t('food.common.food_surplus')}}：{{item.remainingCount}}</div>
                                           <div v-else class="text-red">
                                               {{$t('food.common.is_solt')}}
                                           </div>
                                       </div>

                                   </div>
                               </div>
                                <div class="bot margin-t-10 clearfix">
                                    <span>¥{{numFormate(item.price)}}</span><el-button @click="addCart(item,index)" size="mini" plain>{{$t('food.common.isadd')}}</el-button>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-main>
        <div class="block" style="padding:0 20px;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="searchForm.pageIndex"
              :page-sizes="[10, 50, 100, 200]"
              :page-size="searchForm.pageSize"
              layout=" sizes, prev, pager, next, jumper"
              :total="listTotal"
            >
            </el-pagination>
        </div>
      </el-container>
    </div>

    <!-- submit_status -->

    <el-dialog
        top="0"
        :title="$t('food.common.submit')"
        width="700px"
        :visible.sync="submit_status"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDialog"
        >

       <el-table
             :data="cart"
             border
             header-row-class-name="default"
             size="small"
           >
             <el-table-column prop="name" :label="$t('food.common.food_title')" ></el-table-column>
             <el-table-column :label="$t('food.common.food_price')">
                 <template slot-scope="scope">
                  ¥ {{numFormate(scope.row.price)}}
                 </template>
             </el-table-column>
             <el-table-column :label="$t('food.common.food_count')" width="160">
                 <template slot-scope="scope">
                   {{scope.row.count}}
                 </template>
             </el-table-column>
             <el-table-column :label="$t('desk.order_totalPrice')" width="160">
                 <template slot-scope="scope">
                  ¥ {{numFormate(scope.row.count * scope.row.price)}}
                 </template>
             </el-table-column>
        </el-table>
        <div class="margin-t-20 margin-b-20">{{$t('food.common.product_total')}}, {{$t('food.common.food_count')}} : {{countToTal}}  {{$t('food.common.amount')}} : {{numFormate(cartToTal)}}</div>
       <!-- <div class="margin-t-20 margin-b-20">
            {{$t('food.common.order_from')}} ：{{this.$t('food.orderSource.1')}}
        </div> -->
        <el-form :model="desk" :rules="rules" ref="deskform"  :inline="true" >
            <el-form-item :label="$t('food.common.order_from')" prop="orderSource">
                <el-radio-group v-model="searchForm.orderSource">
                    <el-radio :label="1">PC</el-radio>
                    <el-radio :label="2">{{$t('shop.reset.ipad')}}</el-radio>
                    <el-radio :label="3">{{$t('shop.other')}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item :label="$t('food.common.deskNum')" prop="deskNum">
                <el-input type="number" size="small" :placeholder="$t('food.common.deskNum')" v-model="desk.deskNum"></el-input>
            </el-form-item>
            <!-- <el-form-item :label="$t('food.common.numberPlat')" prop="numberPlat">
                <el-input  type="number" size="small" :placeholder="$t('food.common.numberPlat')" v-model="desk.numberPlat"></el-input>
            </el-form-item> -->
        </el-form>
        <div class="text-center"  style="padding-top: 20px;border-top: 1px solid #ddd;">
           <el-button @click="closeDialog">{{$t('food.common.cancel')}}</el-button>
           <el-button :disabled="!desk.deskNum" type="primary" @click="submit('deskform')">{{$t('food.common.ok')}}</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import mixin from '../mixin';
export default {
  mixins: [mixin],
  props:['categroyList'],
  components: {},

  data() {
    return {
        loading: true,
        list_loading:false,
        submit_status:false,
        searchForm:{
           name:'',
           categoryId: '',
        },
        cart:[],
        tabCurr:0,
        listTotal: 0, //总条数
        cateList:[],
        tableData: [],
        desk:{
            deskNum:'',
            numberPlat:''
        },
        rules:{
            deskNum: [
              { required: true, message: '请填写桌号',trigger: 'change' },
            ],
            deskNum: [
              { numberPlat: true, message: '请填写号码牌',trigger: 'change' },
            ]
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
        let list = this.cart
        if(list.length > 0){
            list.forEach(element => {
                sum +=  parseFloat(element.price) *  parseFloat(element.count)
            });
            return sum.toFixed(0);
        }else{
            return sum.toFixed(0);
        }
    },
    countToTal(){
        let sum = 0
        let list = this.cart
        if(list.length > 0){
            list.forEach(element => {
                sum +=  parseFloat(element.count)
            });
            return sum
        }else{
          return sum
        }
    }
  },
  methods: {
    intForm(){
        this.tabCurr = 999
        this.cateList = []
        // this.cart = []
        this.searchForm = {
            name:'',
            categoryId: '',
            orderSource:1,
            pageIndex: 1, //当前页
            pageSize: 20, //页数
        }
        this.getDataList();

    },
    getDataList(){
        this.list_loading = true
        let params = this.searchForm
        params.state = 1
        params.userId = this.userId
        params.storesNum = this.storesNum
        this.$F.doRequest(this, "/pms/dishes/dishes_manage_list", params, (res) => {
            console.log(res)
            this.list_loading = false
            this.tableData = res.dishesList
            this.listTotal = res.page.count
            this.intCart();
        });
    },
    //切换菜品类型
    async changeTab(v,item,index){
        // this.cart = []
        this.cateList = []
        this.tabCurr = index
        this.searchForm.categoryId = ''
        this.searchForm.categoryId = v
        this.getDataList();
        this.intCart();
        if(item.childList.length > 0){
            this.cateList = await this.getNewCateList(item.childList);
        }
    },
    //二级菜单筛选
    handleChange(value) {
        this.searchForm.categoryId = value[value.length - 1].toString();
        this.$nextTick(()=>{
            this.getDataList()
            this.intCart();
        })
    },
    //将切换后的购物车和全部菜品对比，如果已添加进入购物车的，需要在菜品列表中减去对应添加的个数
    intCart(){
        let list = this.cart
        let table = this.tableData
        for(let i in list){
            for(let j in table){
                if(list[i].id == table[j].id){
                    table[j].remainingCount = parseFloat(table[j].remainingCount) - parseFloat(list[i].count)
                }
            }
        }
    },
    //加入菜单
    addCart(item,index){
        if(this.tableData[index].remainingCount > 0 && this.tableData[index].soldOut == 1){
            this.tableData[index].remainingCount -= 1
            let good = this.cart.find(v=>v.name==item.name)
            if(good){
              good.count += 1
            }else{
              this.cart.push({...item,count:1})
            }

        }else if(this.tableData[index].remainingCount  ==  0 && this.tableData[index].soldOut == 1){
            this.$alert(this.$t('food.reset.soldOut'), this.$t('commons.tip_desc'), {
              confirmButtonText: this.$t('commons.confirm'),
              callback: action => {

              }
            });
        }else{
            this.$alert(this.$t('food.reset.outOfSomething'), this.$t('commons.tip_desc'), {
              confirmButtonText: this.$t('commons.confirm'),
              callback: action => {
              }
            });
        }
    },


    //购物车的加减 type = 1 是减少  2 是添加
    changeCartCount(v,type){
        console.log(type)
        let info  = this.cart[v]
        let good = this.tableData.find(v=>v.id==info.id)
        if(type == 1){
            // console.log('减少')
            info.count-= 1
            good.remainingCount += 1
            if(info.count == 0){
                this.cart.splice(v,1)
                return false
            }
        }else{
            // console.log('添加')
            if(good.remainingCount == 0){
                this.$alert(this.$t('food.common.soldOut'), this.$t('commons.tip_desc'), {
                  confirmButtonText: this.$t('commons.confirm'),
                  callback: action => {
                  }
                });
                return false
            }else{
                info.count+= 1
                good.remainingCount -= 1
                console.log(good.remainingCount)
            }
        }
    },
    //移除
    handleDelete(index){
        this.cart.splice(index,1)
        if(this.cart.length == 0){
            this.getDataList();
        }
    },
    //提交
    submit(form){

        this.$refs[form].validate((valid) => {
          if (valid) {
            let params = {}
            let list = this.cart
            let dishesJson  = []
            let sum = 0


            list.forEach(element => {
                dishesJson.push({
                    dishesId:element.id,
                    dishesName:element.name,
                    unitPrice:element.price,
                    totalPrice:parseFloat(parseFloat(element.price) * parseFloat(element.count)).toFixed(0),
                    dishesCount:element.count
                });
                sum += element.count
            });



            // for(let i in list){
            //     dishesJson.push({
            //         dishesId:list[i].id,
            //         dishesName:list[i].name,
            //         unitPrice:list[i].price,
            //         totalPrice:parseFloat(parseFloat(list[i].price) * parseFloat(list[i].count)).toFixed(0),
            //         dishesCount:list[i].count
            //     });
            //     sum += list[i].count
            // }
            params.dishesCount = sum
            params.consumePrice = parseFloat(this.cartToTal).toFixed(2)
            params.dishesJson  = JSON.stringify(dishesJson);
            params.deskNum = this.desk.deskNum
            params.numberPlat = this.desk.numberPlat
            params.orderSource = this.searchForm.orderSource
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$confirm(this.$t('food.common.confirm_submit'), this.$t('food.common.tip'), {
                confirmButtonText: this.$t('commons.confirm'),
                cancelButtonText: this.$t('commons.cancel'),
                type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, "/pms/dishes/dishes_place_order_edit", params, (res) => {
                   // console.log(res)
                   if(res.orderId){
                     this.cart = []
                     this.closeDialog();
                     this.getDataList();
                     this.alert(200, this.$t('commons.request_success'))
                   }else{
                     this.alert(0, this.$t('commons.request_fail'))
                   }
                });
            });
          }else{
            console.log('error submit!!');
            return false;
          }
        });
    },
    openDialog(){
        this.submit_status = true
    },
    closeDialog(){
        this.submit_status = false
    },

    /**每页数 */
    handleSizeChange(val) {
        // console.log(val)
        this.searchForm.pageSize = val;
        this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
        this.searchForm.pageIndex = val;
        this.getDataList();
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: row;
  height: 100%;
  background: transparent;
  padding: 0;

  > div,
  section {
    background: #fff;
    border-radius: 10px;
    height: 100%;
    overflow: auto;
  }

    .el-header {
      border-bottom: 1px solid #dedede;
      width: 100%;
    }
  .left {
    flex: 1.2;
    margin-right: 20px;
    padding:0 20px;
        .el-header{
            padding: 0;
            line-height: 60px;
        }
        .tablist{
            height: calc(100% - 110px);
            padding-top: 20px;
        }

  }

  .right {
    flex: 3;

    .el-header{
        padding-top:10px;
    }

    .menuList{
       padding:5px;
       display: -webkit-box;
       display: -ms-flexbox;
       display: flex;
       -ms-flex-wrap: wrap;
       flex-wrap: wrap;
       margin:-10px;
       .menuItem{
           width: 100%;
           margin-bottom: 10px;
            .box{
                background-color: #E2E9F2;
                display: block;
                text-align: left;
                .top{
                    padding:10px;
                    padding-bottom: 0;
                }
                .bot{
                    background-color: #7B9FCD;
                    padding:10px;
                    span{
                        color: #fff;
                        padding-top: 3px;
                        display: inline-block;
                    }
                    .el-button{
                        float: right;
                        background: #7B9FCD !important;
                        color: #fff;
                    }


                }



            }
        }
    }
    .el-footer {
      display: flex;
      align-items: center;
      background-color: #fff;
      box-shadow: 0px -5px 8px 0px rgba(0, 0, 0, 0.19);
    }

    .el-main {


    }
  }
}


</style>
