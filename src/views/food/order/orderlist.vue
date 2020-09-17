<template>
<!-- 统一的列表格式 -->
<div>
    <div>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <el-row>
                <el-form-item label="结账状态">
                   <el-radio-group v-model="searchForm.state" size="small" @change="changeOrderStatus">
                     <el-radio-button label="">不限</el-radio-button>
                     <el-radio-button :label="1">未结</el-radio-button>
                     <el-radio-button :label="2">已结</el-radio-button>
                     <el-radio-button :label="3">已取消</el-radio-button>
                   </el-radio-group>
                </el-form-item>
            </el-row>
            <el-form-item label="客人名称">
                <el-input v-model="searchForm.name" placeholder="客人名称" class="width200"></el-input>
            </el-form-item>
            <el-form-item label="订单来源">
                <el-select v-model="searchForm.orderSource" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
            </el-form-item>

            <el-form-item label="班次时间">
                <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:200px" placeholder="选择日期"></el-date-picker>
                <span> 至 </span>
                <el-date-picker v-model="searchForm.endTime" value-format="yyyy-MM-dd" type="date" style="width:200px" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="订单编号">
                <el-input v-model="searchForm.dishesNum"  placeholder="订单编号" class="width200"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getDataList">查询</el-button>
                <el-button type="primary" @click="initForm">重置</el-button>
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
                  label="订单号"
                  >
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="创建时间"
                  >
                </el-table-column>
                <el-table-column
                  label="菜品明细"
                  >
                  <template slot-scope="scope" >
                    <div v-for="sumItem in scope.row.orderSubList" class="text-size12">
                    {{sumItem.dishesName}} * {{sumItem.dishesCount}}
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  label="客人信息">
                  <template slot-scope="scope">
                      <span v-if="!scope.row.memberCard">临时客人</span>
                      <span v-else>
                          {{scope.row.memberTypeName}}
                      </span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="订单来源"
                 >
                  <template slot-scope="scope">{{getOrderSource(scope.row.orderSource)}}</template>
                </el-table-column>

                <el-table-column
                  label="总消费"
                 >
                    <template slot-scope="scope">{{scope.row.consumePrice}}</template>
                </el-table-column>

                <el-table-column
                  label="状态"
                 >
                  <template slot-scope="scope">
                      {{scope.row.state == 1 ? '未结' : (scope.row.state == 2 ? '已结' : '已取消') }}
                  </template>
                </el-table-column>
                <el-table-column
                  width="200"
                  label="操作"
                 >
                  <template slot-scope="scope">
                      <el-button @click="getInfo(scope.row)"  type="text" >详情</el-button>
                      <el-button @click="action(scope.row)" v-if="scope.row.state == 1" type="text">结账</el-button>
                      <el-button @click="cancleOrder(scope.row)" v-if="scope.row.state == 1"  type="text">取消订单</el-button>
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
        :width="is_add ? '40%' :'70%'"
        :visible.sync="dialogShow"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDialog"
        >
            <detail @closeDialog="closeDialog" @changeDialog="changeDialog" ref="detailRef" v-if="dialogType == 1" />
            <action @closeDialog="closeDialog" ref="actionRef" v-if="dialogType == 2" />
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
    props:['categroyList'],
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
            dialogType:1,
            dialogShow:false,
            loading: false,
            showEdit: false,
            showDetail: false,
            searchForm: {
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
                  label: '前台点餐'
                }, {
                  value: '2',
                  label: 'IPAD点餐'
                }, {
                  value: '3',
                  label: 'H5点餐'
                }
            ],
            listTotal: 0, //总条数
            tableData: [], //表格数据
            is_add:true

        };
    },
    mounted() {
        this.getDataList();
    },
    methods: {
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
            // console.log(data)
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
        },

        //结账
        action(data){
            this.is_add = true
            this.dialogShow = true
            this.dialogType = 2
            this.$nextTick(()=>{
                this.$refs.actionRef.getInfo(data)
            })
        },
        cancleOrder(data){
        // console.log(data)

        let params = {
            dishesOrderId:data.id
        }
        params.userId = this.userId
        params.storesNum = this.storesNum

         this.$confirm('确定取消该订单吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, "/pms/dishes/dishes_order_cancle", params, (res) => {
                    this.alert(200,'取消成功')
                    this.getDataList();
                });
            }).catch(() => {
            });
        },
        closeDialog(){
            this.dialogShow = false
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
