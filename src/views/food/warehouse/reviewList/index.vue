<template>
<!-- 统一的列表格式 -->
<div>
    <div>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <el-row>
                <el-form-item :label="$t('food.common.type')">
                       <el-radio-group v-model="searchForm.type" size="small" @change="changeType">
                         <el-radio-button label="">{{$t('food.common.all')}}</el-radio-button>
                         <el-radio-button :label="1">{{$t('food.common.product_storage_in')}}</el-radio-button>
                         <el-radio-button :label="2">{{$t('food.common.product_storage_out')}}</el-radio-button>
                       </el-radio-group>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item :label="$t('food.common.review_status')">
                       <el-radio-group v-model="searchForm.state" size="small" @change="changeState">
                            <el-radio-button label="">{{$t('food.common.all')}}</el-radio-button>
                            <el-radio-button :label="1">{{$t('food.storageLogState.1')}}</el-radio-button>
                            <el-radio-button :label="2">{{$t('food.storageLogState.2')}}</el-radio-button>
                            <el-radio-button :label="3">{{$t('food.storageLogState.3')}}</el-radio-button>
                       </el-radio-group>
                    </el-form-item>
                </el-row>
            <el-row>
            <el-form-item :label="$t('food.common.store_in_out')">
                <el-select size="small" v-model="searchForm.storageId" :placeholder="$t('food.common.store_in_out')">
                    <el-option v-for="(item,index) in mealstorageList" :key="index" :label="item.soteageName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('food.common.applyer_name')">
                <el-input v-model="searchForm.createrName" :placeholder="$t('food.common.applyer_name')" class="width200"></el-input>
            </el-form-item>

            <el-form-item :label="$t('food.common.apply_time')">
                <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:200px" :placeholder="$t('food.common.apply_time')"></el-date-picker>
                <span> {{$t('food.common.to')}} </span>
                <el-date-picker v-model="searchForm.endTime" value-format="yyyy-MM-dd" type="date" style="width:200px" :placeholder="$t('food.common.apply_time')"></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="getDataList">{{$t('food.common.search')}}</el-button>
                <el-button @click="initForm">{{$t('food.common.reset')}}</el-button>
            </el-form-item>
        </el-row>
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
              prop="orderNo"
              :label="$t('food.common.storage_order_no')"
              >
            </el-table-column>
            <el-table-column
              prop="applyTime"
              :label="$t('food.common.apply_time')"
              >
            </el-table-column>
            <el-table-column
              prop="storageName"
              :label="$t('food.common.store_in_out')"
             >
            </el-table-column>
            <el-table-column
              :label="$t('food.common.type')"
              >
              <template slot-scope="scope">
                <span v-if="scope.row.type">
                {{$t('food.storageLogType.'+ scope.row.type)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('food.common.view_status')"
              >
              <template slot-scope="scope">
                <span v-if="scope.row.state">
                    {{$t('food.storageLogState.'+ scope.row.state)}}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              prop="applyerName"
              :label="$t('food.common.applyer_name')"
              >
            </el-table-column>
            <el-table-column
              width="200"
              :label="$t('food.common.action')"
             >
              <template slot-scope="scope">
                  <el-button @click="getInfo(scope.row)"  type="text">{{$t('food.common.storage_detail')}}</el-button>
                  <el-button @click="del(scope.row)" v-if="scope.row.state == 1 || scope.row.state == 3"  type="text" >{{$t('food.common.del')}}</el-button>
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
        :width="id_detail == 0 ? '800px' : '500px'"
        :title="$t('food.storageLogTitle.'+ dialogType)"
        :visible.sync="dialogShow"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDialog"
        >
            <info  @closeDialog="closeDialog"  ref="infoRef"/>
    </el-dialog>



</div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import info from './info'
import mixin from '../../mixin';
export default {
    mixins: [mixin],
    props:['mealstorageList'],
    components:{info},
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
            id_detail:0,
            searchForm: {
                id:'',//主键id String选填
                createrName:'',// 制单人 String选填
                storageId :'',//  倉庫id 不传表示全部 String选填
                state :'',//      状态 1待审核 2审核通过 3未通过 Integer选填
                type:'',//     申请类型 1入库 2出库 Integer选填
                startTime:'',//   起始时间yyyyMMdd String选填
                endTime  :'',//   结束时间yyyyMMdd String选填
                pageIndex:1,//   第几页 从1开始 int 选填
                pageSize :10,//   每页长度 int 选填
                paging:true
            },



            listTotal: 0, //总条数
            tableData: [

            ], //表格数据

        };
    },
    mounted() {
        this.getDataList();
    },
    methods: {
        initForm(){
            this.searchForm =  {
                id:'',//主键id String选填
                createrName:'',// 制单人 String选填
                storageId:'',//  倉庫id 不传表示全部 String选填
                state:'',//      状态 1待审核 2审核通过 3未通过 Integer选填
                type:'',//     申请类型 1入库 2出库 Integer选填
                startTime:'',//   起始时间yyyyMMdd String选填
                endTime:'',//   结束时间yyyyMMdd String选填
                pageIndex:1,//   第几页 从1开始 int 选填
                pageSize:10,//   每页长度 int 选填
                paging:true
            }
            this.getDataList();
        },

        getDataList() {
            this.loading = true
            let params = this.searchForm
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$F.doRequest(this, "/pms/mealstoragelog/list", params, (res) => {
                console.log(res)
                this.loading = false
                this.tableData = res.list
                this.listTotal = res.page.count
            });
        },
        changeType(){
            this.getDataList();
        },
        changeState(){
            this.getDataList();
        },

        //获取订单信息
        getInfo(data){
            this.id_detail = 0
            this.dialogShow = true
            
            if(data.type == 1){
                this.dialogType = 2
            }else{
                this.dialogType = 3
            }                      
            this.$nextTick(()=>{
               this.$refs.infoRef.getInfo(data)
            })
        },

        del(data){

            this.$confirm(this.$t('food.common.confirm_del'), this.$t('food.common.tip'), {
             confirmButtonText: this.$t('food.common.ok'),
             cancelButtonText: this.$t('food.common.cancel'),
             type: 'warning'
            }).then(() => {
                let params = {
                    orderNo:data.orderNo
                }
                params.userId = this.userId
                params.storesNum = this.storesNum
                this.$F.doRequest(this, "/pms/mealstoragelog/delete", params, (res) => {
                   this.alert(200,this.$t('food.common.success'));
                   this.getDataList();
                });
            }).catch(() => {

            });




        },


        //审核
        deal(data){
            this.id_detail = 1
            this.dialogShow = true
            if(data.type == 1){
                this.dialogType = 4
            }
            if(data.type == 2){
                this.dialogType = 5
            }

            this.$nextTick(()=>{
               this.$refs.storeInRef.getData(data)
            })

            console.log(data)
        },


        closeDialog(){
            this.dialogShow = false
            this.getDataList();
        },

        /**每页数 */
        handleSizeChange(val) {
            console.log(val)
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
    .text-size12{
        font-size: 12px !important;
    }
</style>
