<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-05 11:20:12
 * @FilePath: \jiudian\src\views\market\orders\coms\consumeGoods.vue
 -->
<template>
<el-dialog top='0' :title="$t('desk.serve_miniPub')" :visible.sync="visible" :lock-scroll='false' width="80%">
        <el-row :gutter="20">
            <el-col :span="14">
                <el-row>
                    <div class="padding-20 clearfix" style="border:1px solid #eee;">
                        <el-form inline size="small" label-width="100px">
                            <el-form-item :label="$t('desk.order_goodsName') + ':'">
                                <el-input v-model="category.goodsName" :placeholder="$t('desk.order_goodsName')" style="width:150px"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('desk.order_goodsType')+':'">
                                <el-cascader v-model="category.categoryId" :options="categoryList" @change="changeCategoryId"></el-cascader>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="getDataList">{{$t('commons.queryBtn')}}</el-button>
                                <el-button type="primary" @click="initForm">{{$t('commons.resetBtn')}}</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
                            <el-table-column prop="goodsName" :label="$t('desk.order_goodsName')"  show-overflow-tooltip></el-table-column>
                            <el-table-column prop="sellName" :label="$t('desk.order_goodsType')" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="retailPrice" :label="$t('desk.order_goodsUnit')" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="employeePrice" :label="$t('desk.order_empoyeePrice')" show-overflow-tooltip></el-table-column>
                            <!-- <el-table-column prop="inventoryCount" :label="$t('desk.customer_inventory')" show-overflow-tooltip></el-table-column> -->
                            <el-table-column :label="$t('commons.operating')">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="addCart(scope.row,scope.$index)">{{$t('desk.customer_add')}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-row>
            </el-col>
            <el-col :span="10">
                <div class="padding-20 clearfix" style="border:1px solid #eee;">
                    <h3 style="margin-top:0;border-bottom: 1px solid #eee;padding-bottom:10px;">{{$t('desk.customer_chooseGoods')}}</h3>
                    <el-table v-loading="loading" :data="cart" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
                        <el-table-column :label="$t('desk.order_goodsName')" prop="goodsName" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="retailPrice" :label="$t('desk.order_unitPrice')" show-overflow-tooltip></el-table-column>
                        <el-table-column :label="$t('desk.order_number')" width="150">
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
                        <el-table-column :label="$t('desk.serve_heji')" show-overflow-tooltip>
                            <template slot-scope="scope">
                                {{parseFloat(scope.row.count) * parseFloat(scope.row.retailPrice)}}
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('commons.operating')">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleDelete(scope.row,scope.$index)">{{$t('desk.customer_remove')}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-row class="padding-tb-10">
                        <em>{{$t('desk.customer_all')}} {{countToTal}} {{$t('desk.customer_each')}}</em>
                        <!-- ，{{$t('desk.serve_heji')}}：{{cartToTal}}{{$t('desk.serve_yen')}} -->
                    </el-row>
                    <!-- <el-row class="padding-tb-10"> <em>小计 : {{taxInfo.total}} </em></el-row> -->

                    <el-row class="">
                       <div class="item mb10"><span class="w70">小计</span> <span class="text-right">￥{{taxInfo.total}}</span> </div>
                       <div class="item mb10"><span class="w70">服务费 <span class="text-size12">({{taxInfo.servicePrice}})</span></span> <span class="text-right">￥{{taxInfo.service}}</span> </div>
                       <div class="item mb10"><span class="w70">消费税 <span class="text-size12">({{taxInfo.type}}  {{taxInfo.tax}})</span> </span> <span class="text-right">￥{{taxInfo.taxFee}}</span> </div>
                       <div class="item padding-tb-10"><span class="w70 text-size20">合计</span> <span class="text-right text-size20">￥{{taxInfo.sum}}</span> </div>
                    </el-row>

                    <el-form>
                       <!-- <el-form-item :label="$t('desk.order_atEmpoyee')+':'">
                            <el-checkbox v-model="consumeOperForm.employeePrice"></el-checkbox>
                        </el-form-item> -->
                       <!-- <el-form-item :label="$t('desk.home_chooseRoom')+':'">
                           <el-select v-model="consumeOperForm.roorId">
                                <el-option v-for="item in detailData.inRoomList" :key="item.id" :label="item.houseNum" :value="item.roomId">
                                </el-option>
                            </el-select>
                        </el-form-item> -->
                        <!-- <el-form-item :label="$t('desk.enterAccountMoney') + ':'">
                            {{totalIn}}
                        </el-form-item> -->
                        <el-form-item :label="$t('desk.home_note') + ':'">
                            <el-input type="textarea" v-model="consumeOperForm.remark" autocomplete="off" :placeholder="$t('desk.home_note')"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>

        {{taxInfo}}
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">{{ $t('commons.cancel') }}</el-button>
            <el-button type="primary"  @click="consume_oper">{{ $t('commons.confirm') }}</el-button>
        </div>
    </el-dialog>
</template>

<script>
Array.prototype.push2 = function () {
    for (var i = 0; i < arguments.length; i++) {
        var ele = arguments[i];
        if (this.indexOf(ele) == -1) {
            this.push(ele);
        }
    }
};
import {mapState,mapActions} from "vuex";
import myMixin from '@/utils/filterMixin';
export default {
    mixins: [myMixin],
    props:['detailData','currentRoom'],
    data() {
        return {
            id: '',
            type: '',
            visible: false,
            loading: true,
            category:{
                goodsName:'',
                categoryId:''
            },
            searchForm: {
                mobile: '',
                idcard: '',
                name: '',
                searchType: 3,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [], //表格数据
            cart:[],//购物车
            consumeOperForm:{
                employeePrice:false,
                goodsTotal:'',
                goodsJson:[],
                remark:'',
                roorId:''
            },
            categoryList:[],
            tax:{},
            taxInfo:{},

        };
    },
    computed: {
        ...mapState({
            token: state => state.user.token,
            userId: state => state.user.userId,
            msgKey: state => state.config.msgKey,
            plat_source: state => state.config.plat_source
        }),
        //商品总金额
        // cartToTal(){
        //     let sum = 0
        //     let cart = this.cart
        //     cart.forEach(element => {
        //         sum +=  parseFloat(element.retailPrice) *  parseFloat(element.count)
        //     });
        //     return sum.toFixed(0);
        // },
        //入账金额
        totalIn(){
            let sum = 0
            let cart = this.cart
            this.miniOrderTax();
            if(this.consumeOperForm.employeePrice){
                cart.forEach(element => {
                    // console.log(element.employeePrice)
                    // console.log(element.count)
                    sum +=  parseFloat(element.employeePrice) *  parseFloat(element.count)

                });
            }else{
                cart.forEach(element => {
                    // console.log(element.retailPrice)
                    // console.log(element.count)
                    sum +=  parseFloat(element.retailPrice) *  parseFloat(element.count)
                });
            }
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
        }
    },
    created() {
        //监听是否外带
        this.$watch('cart',(val,oldVal) =>{
            this.miniOrderTax();
        })
    },
    methods: {
        async init(id) {
            this.id = id
            this.initForm()
            this.visible = true;
        },
        initForm() {
            this.cart = []
            this.searchForm = {
                sellId:'',
                paging:false,
                pageIndex:1,
                pageSize:10
            };
            this.category = {
                goodsName:'',
                categoryId:''
            }
            this.getDataList();
            this.getCategoryData();
            this.get_consume_tax();
        },

        changeCategoryId(value){
            this.category.categoryId = value[value.length - 1].toString();
                console.log(this.category.categoryId)
        },
        //获取列表
        getDataList() {
            this.tableData = []
            this.loading = true
            this.$F.doRequest(this, "/pms/hotelgoodsSelling/list", {}, (res) => {
                // console.log(res)
                let name = this.$t('desk.serve_miniPub');
                for(let i in res.list){
                   if(res.list[i].name == name){
                       this.sellId = res.list[i].id
                       this.getProductsList(res.list[i].id)
                       break;
                   }
               }
            });
        },

        getProductsList(id){
            let info = {
                sellId:id,
                paging:false,
                pageIndex:1,
                pageSize:10,
                goodsName:this.category.goodsName,
                categoryId:this.category.categoryId,
                categoryType:1
            }
            // console.log(info)
            this.$F.doRequest(this, '/pms/sellinglog/list', info, (res) => {
                let Goodlist = res.list;
                for(let j in Goodlist){
                    if(Goodlist[j].sellId == this.sellId){
                        Goodlist[j].taxStatus =   Goodlist[j].hotelGoods.taxStatus
                        Goodlist[j].seviceStatus = Goodlist[j].hotelGoods.seviceStatus
                        this.tableData.push(Goodlist[j])
                    }
                }
                this.miniOrderTax();

                console.log(this.tableData)
             })

        },

        //获取商品实物分类
        getCategoryData() {
            let info =  {
                categoryType: 1
            }
            this.$F.doRequest(this, '/pms/hotelcategory/list',info, (res) => {
                // this.category = res.list;
                let categoryList = this.getTreeItem(res.list);
                this.categoryList = this.getNewCateList(categoryList)
                // console.log('商品分类')
                // console.log( this.categoryList)
                // console.log('商品分类')

            })
        },
        getTreeItem(arr) {
            let newarr = []
            arr.sort(this.compare('categoryOrder'))
            newarr = arr.filter(father => {
                const branchArr = arr.filter((child) => {
                    if (father.id == child.pCategoryId ) child._hasParent = true;
                    return father.id == child.pCategoryId;
                });
                if (branchArr.length > 0) father.child = branchArr;
                return !father._hasParent;
            })

            newarr = newarr.filter((item) => {
                return !item._hasParent;
            })
            return newarr;
        },
        //重组分类
        getNewCateList(list){
           if(list && list.length > 0 ){
               let arr = []
               for(let i in list){
                   if(list[i].child){
                       arr.push({
                           value:list[i].id,
                           label:list[i].name,
                           children:this.getNewCateList(list[i].child)
                       })
                   }

               }
               return arr
            }
        },

        //排序
        compare (attr, rev){
            if(rev ==  undefined){
                rev = 1;
            } else {
                rev = (rev) ? 1 : -1;
            }
            return function(a,b){
                a = a[attr];
                b = b[attr];
                if(a < b){
                    return rev * -1;
                }
                if(a > b){
                    return rev * 1;
                }
                return 0;
            }
        },
        //加入菜单
        addCart(item,index){
            // if(this.tableData[index].inventoryCount > 0){
            //     this.tableData[index].inventoryCount -= 1
            //     let good = this.cart.find(v=>v.goodsName==item.goodsName)
                let good = this.cart[index]
                if(good){
                  good.count += 1
                  this.miniOrderTax();
                }else{
                  this.cart.push({...item,count:1})
                  this.miniOrderTax();
                }
            // }else{
            //     this.$alert(this.$t('desk.order_nofood'), this.$t('commons.tip_desc'), {
            //       confirmButtonText: this.$t('commons.confirm'),
            //       callback: action => {
            //       }
            //     });
            // }

        },

        //购物车的加减 type = 1 是减少  2 是添加
        changeCartCount(v,type){
            let info  = this.cart[v]
            // let good = this.tableData.find(v=>v.id==info.id)
            if(type == 1){
                info.count-= 1
                // good.inventoryCount += 1
                if(info.count == 0){
                    this.cart.splice(v,1)
                    this.miniOrderTax();
                    return false
                }else{
                    this.miniOrderTax();
                }
            }else{
                // if(good.inventoryCount == 0){
                //     this.$alert(this.$t('desk.order_nofood'), this.$t('commons.tip_desc'), {
                //       confirmButtonText: this.$t('commons.confirm'),
                //       callback: action => {
                //       }
                //     });
                //     return false
                // }else{
                    info.count+= 1
                    this.miniOrderTax();
                //     good.inventoryCount -= 1
                // }
            }


        },
        handleDelete(item,index){
            // let good = this.tableData.find(v=>v.id==item.id)
            // good.inventoryCount = good.inventoryCount + item.count
            this.cart.splice(index,1)
            this.miniOrderTax();
            if(this.cart.length == 0){
                this.getDataList();
            }
        },

        //计算迷你吧相关税
        miniOrderTax(){
            let cart = this.cart
            if(this.consumeOperForm.employeePrice){
                cart.forEach(element => {
                    // console.log(element.employeePrice)
                    // console.log(element.count)
                    element.totalPrice =  parseFloat(element.employeePrice) *  parseFloat(element.count)

                });
            }else{
                cart.forEach(element => {
                    // console.log(element.retailPrice)
                    // console.log(element.count)
                    element.totalPrice =  parseFloat(element.retailPrice) *  parseFloat(element.count)
                });
            }
            console.log(cart)
            this.taxInfo = this.getTaxInfo(this.tax,cart,false)
            console.log(this.taxInfo)
        },

        consume_oper() {
            console.log(this.currentRoom)
            // console.log(this.detailData)
            this.consumeOperForm.roorId = this.currentRoom.id

            // console.log(this.consumeOperForm.roorId)
            if(this.cart.length == 0){
                this.$message({
                  type: 'error',
                  message: this.$t('desk.order_selectGoods')
                });
                return false
            }



            if(!this.consumeOperForm.roorId){
                this.$message({
                  type: 'error',
                  message: this.$t('desk.order_selectRoomNum')
                });
                return false
            }


            if(!this.consumeOperForm.remark){
                this.$message({
                  type: 'error',
                  message: this.$t('desk.customer_inputRemark')
                });
                return false
            }
            let params = {}
            params.checkInId = this.$route.query.id
            params.priceType = 8
            params.payType = 0
            params.state = 1
            params.remak = this.consumeOperForm.remark
            params.employeePrice = this.consumeOperForm.employeePrice ? 1 : 2
            params.goodsTotal = this.taxInfo.sum




            let roomList = this.detailData.inRoomList
            console.log(roomList)
            // let choose = {}
            // roomList.forEach(element => {
            //     console.log(element)
            //    if(element.roomId == this.consumeOperForm.roorId){
            //        choose = element
            //    }
            // });
          //   params.roomId = this.consumeOperForm.roorId;
          //   params.roomNum = choose.houseNum
            params.roomId = this.consumeOperForm.roorId
            params.roomNum = this.currentRoom.houseNum
            let Json = []
            let cart = this.cart
            if(this.consumeOperForm.employeePrice){
                cart.forEach(element => {
                    Json.push({
                        goodsId:element.id,
                        goodsName:element.goodsName,
                        price:element.employeePrice,
                        goodsCount:element.count,
                        totalPrice: parseFloat(element.employeePrice) *  parseFloat(element.count)
                    })
                });
                params.consumePrice = this.taxInfo.sum
            }else{
                cart.forEach(element => {
                    Json.push({
                        goodsId:element.id,
                        goodsName:element.goodsName,
                        price:element.retailPrice,
                        goodsCount:element.count,
                        totalPrice: parseFloat(element.retailPrice) *  parseFloat(element.count)
                    })
                });
                params.consumePrice = this.taxInfo.sum
            }
            params.goodsJson = JSON.stringify(Json)
            console.log(params)
            this.$F.doRequest(this, '/pms/consume/consume_oper', params, (res) => {
                this.consumeOperForm.remark = ''
                this.consumeOperForm.roorId = ''
                this.visible = false
                this.cart = []
                this.$emit('get_consume_order_list','');
                this.$emit('getOrderDetail');
            });
        },

        /**多选 */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /**每页数 */
        handleSizeChange(val) {
            this.searchForm.pageSize = val;
            this.searchForm.pageIndex = 1;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.pageIndex = val;
            this.getDataList();
        },
        get_consume_tax(){
            let params = {
                userId:this.userId,
                storesNum:this.storesNum,
            }
            this.$F.doRequest(this, "/pms/hotelparam/get_consume_tax", params, (res) => {
                if(res && res.content){
                    this.tax = JSON.parse(res.content)
                    console.log(this.tax)
                }
            });
        },

    }
};
</script>

<style scoped>
.roomNumTag {
    position: relative;
    min-width: 100px;
}

.roomNumTag .del {
    display: none;
}

.roomNumTag:hover .del {
    display: block;
    z-index: 9;
    width: 100%;
    border-radius: 5px;
    font-size: 12px;
    font-style: normal;
    margin: 0;
    line-height: 38px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.66);
    color: #fff
}
.mb10{margin-bottom: 5px;}
.w70{ width:200px; display: inline-block;}
</style>
