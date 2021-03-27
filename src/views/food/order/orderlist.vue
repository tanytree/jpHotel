<template>
<!-- 统一的列表格式 -->
<div>
    <div>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="100px">
            <el-row>
                <el-form-item :label="$t('food.common.order_status')">
                   <el-radio-group v-model="searchForm.state" size="small" @change="changeOrderStatus">
                     <el-radio-button label="">{{$t('food.common.no_limit')}}</el-radio-button>
                     <el-radio-button :label="1">{{$t('food.order_status.1')}}</el-radio-button>
                     <el-radio-button :label="2">{{$t('food.order_status.2')}}</el-radio-button>
                     <el-radio-button :label="3">{{$t('food.order_status.3')}}</el-radio-button>
                   </el-radio-group>
                </el-form-item>
            </el-row>
            <el-form-item :label="$t('food.common.curstom_name')">
                <el-input v-model="searchForm.name" :placeholder="$t('food.common.curstom_name')" class="width200"></el-input>
            </el-form-item>
            <el-form-item :label="$t('food.common.order_from')">
                <el-select v-model="searchForm.orderSource" :placeholder="$t('food.common.order_from')">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
            </el-form-item>

            <el-form-item :label="$t('food.common.order_time')">
                <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:200px" :placeholder="$t('food.common.order_time')"></el-date-picker>
                <span> {{$t('food.common.to')}} </span>
                <el-date-picker v-model="searchForm.endTime" value-format="yyyy-MM-dd" type="date" style="width:200px":placeholder="$t('food.common.order_time')"></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('food.common.order_num')">
                <el-input v-model="searchForm.dishesNum"  :placeholder="$t('food.common.order_num')" class="width200"></el-input>
            </el-form-item>

            <el-form-item :label="$t('food.common.deskNum')">
                <el-input v-model="searchForm.deskNum"  :placeholder="$t('food.common.deskNum')" class="width200"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getDataList">{{$t('food.common.search')}}</el-button>
                <el-button type="primary" @click="initForm">{{$t('food.common.reset')}}</el-button>
            </el-form-item>
        </el-form>
        <!--表格数据 -->

        <div v-loading="loading">
            <el-table
                class="margin-t-20"
                header-row-class-name="default"
                size="small"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
               >
                <el-table-column
                  prop="dishesNum"
                  :label="$t('food.common.order_num')"
                  >
                </el-table-column>

                <el-table-column
                  prop="deskNum"
                  :label="$t('food.common.deskNum')"
                  >
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  :label="$t('food.common.create_time')"
                  >
                </el-table-column>
                <el-table-column
                  :label="$t('food.common.food_detail')"
                  >
                  <template slot-scope="scope" >
                    <div v-for="sumItem in scope.row.orderSubList" class="text-size12">
                    {{sumItem.dishesName}} * {{sumItem.dishesCount}}
                    </div>
                  </template>
                </el-table-column>

                <!-- <el-table-column
                  :label="$t('food.common.curstom_info')">
                  <template slot-scope="scope">
                      <span v-if="!scope.row.numberPlat">{{$t('food.reset.guests')}}</span>
                      <span v-else>
                          {{scope.row.numberPlat}}
                      </span>
                  </template>
                </el-table-column> -->

                <el-table-column
                  :label="$t('food.common.order_from')"
                 >
                  <template slot-scope="scope">{{getOrderSource(scope.row.orderSource)}}</template>
                </el-table-column>
                 <el-table-column label="付款方式">
                   <template slot-scope="{row}">
                      <div  v-if="row.billingType">{{row.billingType == 1 ? $t('commons.payType.'+ row.payType)  : $t('food.billingType.'+ row.billingType)}}
                      </div>
                      <div v-if="row.billingType==3">{{checkRoomNum(row.signRoomId)}}</div>
                   </template>
                </el-table-column>
                <el-table-column
                  :label="$t('food.common.total_pay')"
                 >
                    <template slot-scope="scope">  {{ scope.row.realPayPrice ? '¥'+ numFormate(scope.row.realPayPrice) : '¥'+ numFormate(scope.row.consumePrice)}}</template>
                </el-table-column>

                <el-table-column
                  :label="$t('food.common.status')"
                 >
                  <template slot-scope="scope">
                      <span v-if="scope.row.state">{{$t('food.order_status.'+ scope.row.state)}}</span>
                      <!-- {{scope.row.state == 1 ? '未结' : (scope.row.state == 2 ? '已结' : '已取消') }} -->
                  </template>
                </el-table-column>
                <el-table-column
                  width="200"
                  :label="$t('commons.operating')"
                 >
                  <template slot-scope="scope">
                      <el-button @click="getInfo(scope.row)"  type="text" >{{$t('food.common.detail')}}</el-button>
                      <el-button @click="action(scope.row)" v-if="scope.row.state == 1" type="text">{{$t('food.common.order_deal')}}</el-button>
                      <el-button @click="cancleOrder(scope.row)" v-if="scope.row.state == 1"  type="text">{{$t('food.common.cancel_order')}}</el-button>
                      <!-- <el-button v-if="scope.row.state == 3"  type="text">恢复</el-button> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>

        <div style="margin-top:10px"></div>
        <!--分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.pageSize" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
    </div>
    <!-- 编辑or详情弹窗 -->

    <el-dialog
        top="0"
        :title="$t('food.orderTitle.'+ dialogType)"
        :width="is_add ? '45%' :'70%'"
        :visible.sync="dialogShow"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDialog"
        >
            <detail @closeDialog="closeDialog" @changeDialog="changeDialog" ref="detailRef" @action="action" v-if="dialogType == 1" />
            <action :taxInfo="tax" @closeDialog="closeDialog" ref="actionRef" v-if="dialogType == 2" />
    </el-dialog>

    <el-dialog
        top="0"
        :title="$t('food.orderTitle.1')"
        width="700px"
        :visible.sync="dialogShows"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDialog"
        >
        <div class="detailPanel">
            <div class="top">
                <span style="margin-right:20px">{{$t('food.common.order_num')}}：{{detail.dishesNum}}，</span><span style="margin-right:20px;" v-if= "detail.deskNum">{{$t('food.common.deskNum')}}：{{detail.deskNum}}{{detail.numberPlat?'，':''}}</span>  <span v-if= "detail.numberPlat">{{$t('food.common.numberPlat')}}：{{detail.numberPlat}} </span>
            </div>
            <div class="margin-t-10 text-gray">{{$t('food.reset.order_price')}}：¥{{orderTax.sum}} </div>
            <div class="taxBox text-size14 text-gray">
                <div class="item margin-t-10">{{$t('food.reset.servePri')}}({{orderTax.servicePrice}})： ¥{{orderTax.service}}  </div>
                <div class="item margin-t-10">{{$t('food.reset.constPri')}}<span class="text-size12">({{orderTax.type}}  {{orderTax.tax}})</span>： ¥{{orderTax.taxFee}} </div>
				<div class="item margin-t-10"><span>{{$t('desk.book_costFee2')}}：<span class="text-size12">({{orderTax.type}}  {{orderTax.tax}})</span></span><span>¥{{numFormate(orderTax.taxInFee)}}；</span></div>

                <div class="item margin-t-10" v-if="detail.billingType == 1">{{$t('food.reset.yhPrice')}}： ¥{{detail.preferentialPrice ? detail.preferentialPrice : 0}}</div>
                <div class="item margin-t-10" v-if="detail.billingType">
                    {{$t('food.reset.paymoney')}}: {{detail.billingType == 1 ? '【'+$t('commons.payType.'+ detail.payType) + '】' : '【'+$t('food.billingType.'+ detail.billingType) + '】' }}  ¥{{numFormate(detail.realPayPrice)}}
                   <span style="margin-left:10px" v-if="detail.billingType==3">{{$t('desk.customer_roomNumber')}}{{checkRoomNum(detail.signRoomId)}}</span>
                 </div>
                  <!-- <div class="item margin-t-10" v-if="detail.billingType&&detail.payType==100">
                    {{$t('food.reset.paymoney')}}: 【payments】 ¥{{numFormate(detail.realPayPrice)}}
                 </div> -->
            </div>
            <div class="margin-t-10 text-gray">{{$t('food.reset.create_time')}}：{{detail.createTime}}</div>
            <el-table
              class="margin-t-10 "
              :data="detail.orderSubList"
              border
              header-row-class-name="default"
              size="small"
            >
              <el-table-column prop="dishesName" :label="$t('food.common.food_title')" ></el-table-column>
              <el-table-column :label="$t('food.common.price')">
                  <template slot-scope="scope">¥{{numFormate(scope.row.unitPrice)}}</template>
              </el-table-column>
              <el-table-column :label="$t('food.common.food_count')" width="160" prop="dishesCount"></el-table-column>
            </el-table>

            <el-divider></el-divider>
            <div class="dialog-footer text-center" style="padding: 0 20px;margin:-10px -20px -15px;">
               <el-button size="small" @click="closeDialog">{{$t('food.common.cancel')}}</el-button>
           </div>


        </div>
        <!-- {{detail}} -->

    </el-dialog>


</div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import detail from './detail'
import action from './action'
import mixin from '../mixin';
export default {
    mixins: [mixin],
    props:['categroyList','tax'],
    components:{action,detail},
    computed: {
        ...mapState({
            token: state => state.user.token,
            userId: state => state.user.userId,
            msgKey: state => state.config.msgKey,
            plat_source: state => state.config.plat_source
        })
    },
    data() {
        return {
          romeList:[],
            dialogType:1,
            dialogShow:false,
            dialogShows:false,
            loading: false,
            showEdit: false,
            showDetail: false,
            searchForm: {
                deskNum:'',
                state:'',// 状态  1未结 2已结 3取消      int选填
                orderSource:'',//点餐来源 1前台点餐 2IPAD点餐 3H5点餐      int选填
                dishesNum:'',// 订单号      String选填
                name:'',//客人名称      string选填
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            },
            options: [
                {
                  value: '1',
                  label: this.$t('food.orderSource.1')
                }, {
                  value: '2',
                  label: this.$t('food.orderSource.2')
                }, {
                  value: '3',
                  label: this.$t('food.orderSource.3')
                }
            ],
            listTotal: 0, //总条数
            tableData: [], //表格数据
            is_add:true,
            detail:{},
            orderTax:{}

        };
    },
    mounted() {
        this.getDataList();
        this.getSignRoomList();
    },
    methods: {
      checkRoomNum(roomId){
        for(let item of this.romeList ){
          if(item.roomId==roomId){
            return item.houseNum;
          }
        }
      },
      getSignRoomList() {
      let params = {};
      this.$F.doRequest(
        this,
        "/pms/dishes/living_rooms_list",
        params,
        (res) => {
          this.romeList = res.roomListGroup;
        }
      );
    },
        initForm() {
            this.searchForm = {
                state:'',// 状态  1未结 2已结 3取消      int选填
                orderSource:'',//点餐来源 1前台点餐 2IPAD点餐 3H5点餐      int选填
                dishesNum:'',// 订单号      String选填
                name:'',//客人名称      string选填
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            }
            this.getDataList();
        },
        /**获取表格数据 */
        changeOrderStatus(value){
            // console.log(value)
            this.getDataList();
        },
        getDataList() {
            this.loading = true
            let params = this.searchForm
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$F.doRequest(this, "/pms/dishes/dishes_order_list", params, (res) => {
                // console.log(res)
                this.loading = false
                this.tableData = res.dishesOrderList
                this.listTotal = res.page.count;
            });
        },

        /**修改订单 */
        changrOrder(list){
            // console.log(list)
            let params = {}
            let dishesJson  = []
            let sum = 0
            for(let i in list){
                dishesJson.push({
                    dishesId:list[i].id,
                    dishesName:list[i].name,
                    unitPrice:list[i].price,
                    totalPrice:parseFloat(parseFloat(list[i].price) * parseFloat(list[i].count)).toFixed(2),
                    dishesCount:list[i].count
                });
                sum += list[i].count
            }
            params.dishesCount = sum
            params.consumePrice = parseFloat(this.cartToTal).toFixed(2)
            params.dishesJson  = JSON.stringify(dishesJson);
            // console.log(params)
        },

        //获取点餐来演类型
        getOrderSource(v){
            let list = this.options
            for(let i in list){
                if(v == list[i].value){
                    return list[i].label
                }
            }
        },
        //计算总价
        getTotalPrice(list){
            if(list.length > 0){
                let sum = 0
                for (let i in list){
                   sum += parseFloat(list[i].unitPrice) * parseFloat(list[i].dishesCount)
                }
                return sum.toFixed(2)
            }
        },

        //获取订单信息
        getInfo(data){
            console.log(data)
            if(data.state == 2){
               this.dialogShows = true
               this.detail = data
               let outFlag = data.outFlag == 1 ? true : false
               this.orderTax = this.getTaxInfo(this.tax,data.orderSubList,outFlag)
               return false
            }else{
                let info = {
                    dishesOrderId:data.id
                }
                info.userId = this.userId
                info.storesNum = this.storesNum
                this.dialogShow = true
                this.dialogType = 1
                this.is_add = true
                let cateList = this.getNewCateList(this.categroyList)

                this.$nextTick(()=>{
                    this.$refs.detailRef.getInfo(info,cateList)
                })
            }




        },

        //结账
        action(data){
            console.log(data)
            this.is_add = true
            this.dialogShow = true
            this.dialogType = 2
            this.$nextTick(()=>{
                this.$refs.actionRef.getInfo(data)
            })
        },
        //取消订单
        cancleOrder(data){
        // console.log(data)
            let params = {
                dishesOrderId:data.id
            }
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$confirm( this.$t('food.common.cancel_confirm_order_tips'),  this.$t('food.common.tip'), {
               confirmButtonText:  this.$t('food.common.ok'),
               cancelButtonText:  this.$t('food.common.cancel'),
               type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, "/pms/dishes/dishes_order_cancle", params, (res) => {
                    this.alert(200, this.$t('food.common.success'));
                    this.getDataList();
                });
            }).catch(() => {
            });
        },
        closeDialog(){
            this.dialogShow = false
            this.dialogShows = false
            this.getDataList();
        },

        /**每页数 */
        handleSizeChange(val) {
            this.searchForm.pageSize = val;
            this.getDataList();

            console.log(1)
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.pageIndex = val;
            this.getDataList();
            console.log(2)
        },
        changeDialog(){
            this.is_add = false
        }

    }
};
</script>
<style lang="less" scoped>
    .text-size12{
        font-size: 12px !important;
    }
</style>
