<template>
<!-- 统一的列表格式 -->
<div>
    <div>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <el-row>
                <el-form-item :label="$t('food.common.product_name')">
                    <el-input v-model="searchForm.dishesName" :placeholder="$t('food.common.product_name')" class="width200"></el-input>
                </el-form-item>

                <el-form-item :label="$t('food.common.storage_in')">
                    <el-select size="small" v-model="searchForm.storageId" :placeholder="$t('food.common.storage_in')">
                        <el-option v-for="(item,index) in mealstorageList" :key="index" :label="item.soteageName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getDataList">{{$t('food.common.search')}}</el-button>
                    <el-button type="primary" @click="initForm">{{$t('food.common.reset')}}</el-button>
                </el-form-item>

                <el-button style="float: right;margin-left: 10px;" size="small" @click="storeAdd(2)" type="primary">{{$t('food.common.product_storage_out')}}</el-button>
                <el-button style="float: right;" size="small" type="primary" @click="storeAdd(1)">{{$t('food.common.product_storage_in')}}</el-button>
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
                  prop="dishesName"
                  :label="$t('food.common.product_name')"
                  >
                </el-table-column>
                <el-table-column
                  prop="goodsNo"
                  :label="$t('food.common.product_num')"
                  >
                </el-table-column>

                <el-table-column
                  prop="inventoryCount"
                  :label="$t('food.common.product_count')"
                  >
                </el-table-column>
                <el-table-column
                  prop="unit"
                  :label="$t('food.common.unit')"
                 >
                </el-table-column>
               <!-- <el-table-column
                  v-if="is_show_storageId"
                  prop="storageName"
                  label="所在仓库"
                  >
                </el-table-column> -->
               <!-- <el-table-column
                  width="200"
                  :label="$t('commons.operating')"
                 >
                  <template slot-scope="scope">
                      <el-button @click="getInfo(scope.row)"  type="text" >{{$t('commons.detail')}}</el-button>
                  </template>
                </el-table-column> -->
              </el-table>
            </div>

        <div style="margin-top:10px"></div>
        <!--分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.pageSize" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
    </div>
    <!-- 编辑or详情弹窗 -->


   <el-dialog top="0" width="50%" :title="$t('food.storageTitle.'+ storeType)" :visible.sync="dialogShow" :close-on-click-modal="false" :close-on-press-escape="false" @close="closeDialog">
        <div v-show="is_batch == 0">
            <el-form inline size="small" label-width="100px"  :model="storageInfo" :rules="storageInfoRules" ref="storageInfo">
                <el-row>
                    <el-form-item :label=" storeType == 1 ? $t('food.common.storageInTitle') :  $t('food.common.storageOutTitle') " prop="storageId">
                        <el-select  :disabled="storeType == 2 && proInfo.storageId != ''" size="small" v-model="storageInfo.storageId" :placeholder="storeType == 1 ? $t('food.common.storageInTitle') :  $t('food.common.storageOutTitle') ">
                            <el-option v-for="(item,index) in mealstorageList" :key="index" :label="item.soteageName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button style="float: right;margin-left: 10px;" size="small" @click="batchAddPro()" type="primary">{{$t('food.common.batch_add_product')}}</el-button>
                </el-row>
                <div class="paddingTable" >
                    <el-table
                        height="300"
                        header-row-class-name="default"
                        size="small"
                        :data="batchAllList"
                        tooltip-effect="dark"
                        style="width: 100%"
                       >
                    <el-table-column
                      prop="dishesName"
                      :label="$t('food.common.product_name')"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="unit"
                      :label="$t('food.common.unit')"
                      >
                    </el-table-column>
                    <el-table-column
                      :label="$t('food.common.product_count')"
                     >
                      <template slot-scope="scope">
                            <el-input size="mini" v-model="scope.row.inventoryCount" style="width: 80px;"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      width="100"
                      :label="$t('food.common.action')"
                    >
                        <template slot-scope="scope">
                           <el-button type="text" @click="delBatchOne(scope.$index)" >{{$t('food.common.del')}}</el-button>
                        </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="margin-t-20 clearfix"></div>
                <el-form-item :label="$t('food.common.createrName')" prop="createrName">
                    <el-input size="small" v-model="storageInfo.createrName" :placeholder="$t('food.common.createrName')" class="width200"></el-input>
                </el-form-item>
                <el-form-item :label="$t('food.common.apply_time')" prop="applyTime">
                    <el-date-picker size="small" v-model="storageInfo.applyTime" value-format="yyyy-MM-dd" type="date" style="width:200px" :placeholder="$t('food.common.apply_time')"></el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('food.common.remark')">
                    <el-input size="medium"  type="textarea" v-model="storageInfo.remark" :placeholder="$t('food.common.remark')" style="width: 500px;"></el-input>
                </el-form-item>
            </el-form>

            <el-divider></el-divider>
            <div class="dialog-footer text-center" style="padding: 0 20px;margin:-10px -20px -15px;">
             <el-button size="small" @click="closeDialog">{{$t('food.common.cancel')}}</el-button>
             <el-button type="primary" size="small" @click="setStorage">{{$t('food.common.ok')}}</el-button>
            </div>
        </div>


        <el-form  inline size="small" label-width="80px" v-loading="proLoading" v-show="is_batch == 1">
            <el-row>
                <el-form-item :label="$t('food.common.product_name')">
                    <el-input size="small" v-model="proInfo.goodsName" :placeholder="$t('food.common.product_name')" class="width200"></el-input>
                </el-form-item>
                <el-form-item :label="$t('food.common.storage_in')">
                    <el-select size="small" v-model="proInfo.storageId" :placeholder="$t('food.common.storage_in')" :disabled="proInfo.storageId != '' && storeType == 2">
                        <el-option v-for="(item,index) in mealstorageList" :key="index" :label="item.soteageName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getProList()">{{$t('food.common.search')}}</el-button>
                </el-form-item>
                <el-button style="float: right;margin-left: 10px;" size="small"  type="primary" @click="addProShow = true">{{$t('food.common.add_product')}}</el-button>
            </el-row>
            <div class="paddingTable">
                <el-table
                    size="small"
                    height="300"
                    :data="productList"
                    tooltip-effect="dark"
                    header-row-class-name="default"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>

                    <el-table-column
                      prop="name"
                      :label="$t('food.common.product_name')"
                      width="150"
                      >
                    </el-table-column>

                    <el-table-column
                     :label="$t('food.common.product_num')"
                     >
                      <template slot-scope="scope">
                        {{scope.row.remark}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="unit"
                      :label="$t('food.common.unit')"
                      width="55"
                      >
                    </el-table-column>
                    <el-table-column
                      width="100"
                      :label="$t('food.common.action')"
                    >
                        <template slot-scope="scope">
                           <el-button type="text" @click="delItem(scope.row)">{{$t('food.common.del')}}</el-button>
                        </template>
                    </el-table-column>
                  </el-table>
            </div>
            <!--分页 -->
            <el-pagination style="padding-bottom: 0;" @size-change="proSizeChange" @current-change="proCurrentChange" :current-page="proInfo.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="proInfo.pageSize" layout=" sizes, prev, pager, next, jumper" :total="prolistTotal"></el-pagination>
            <el-divider></el-divider>
            <div class="dialog-footer text-center" style="padding: 0 20px;">
               <el-button size="small" @click="cancelBatch">{{$t('food.common.cancel')}}</el-button>
               <el-button type="primary" size="small" @click="setBatch" >{{$t('food.common.ok')}}</el-button>
            </div>
        </el-form>
    </el-dialog>

    <el-dialog top="0" width="500px" :title="$t('food.common.add_product')" :visible.sync="addProShow" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form  :model="addProInfo" :rules="addProInfoRules" ref="addProInfo"  size="small" label-width="120px">
            <el-form-item :label="$t('food.common.product_name')" prop="name">
                <el-input size="small" v-model="addProInfo.name" :placeholder="$t('food.common.product_name')" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item :label="$t('food.common.unit')"  prop="unit">
                <el-input size="small" v-model="addProInfo.unit" :placeholder="$t('food.common.unit')" style="width: 100%;"></el-input>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div class="dialog-footer text-right" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog_add">{{$t('food.common.cancel')}}</el-button>
           <el-button type="primary" size="small"  @click="addProSubmit">{{$t('food.common.ok')}}</el-button>
        </div>
    </el-dialog>

    <!-- <el-dialog top="0" width="700px" :title="$t('food.houseTitle.3')" :visible.sync="infoShow" :close-on-click-modal="false" :close-on-press-escape="false">
            <info ref="infoRef"  @closeDialog="closeDialog"></info>
    </el-dialog> -->


</div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import info from './info'
// import edit from './edit'
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
            addProShow:false,
            proLoading:false,
            infoShow:false,
            searchForm: {
                dishesName:'',//
                storageId:'',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging:true
            },
            storeType:1,//1入库 2出库

            storageInfo:{
                storageId:'',
                createrName:'',
                applyTime:'',
                remark:''
            },
            storageInfoRules: {
                storageId:[
                    { required: true, message:this.$t('food.common.select_storage'), trigger: 'change' }
                ],
                createrName: [
                    { required: true, message: this.$t('food.common.input_createName'), trigger: 'blur' }
                ],
                applyTime: [
                  { required: true, message: this.$t('food.common.input_apply_time'), trigger: 'blur' }
                ]
            },

            is_batch:0,//批量添加的切换
            batchList:[],
            batchAllList:[],
            multipleSelection:[],//多选后的数组
            proInfo:{
                goodsName:'',
                storageId:'',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging:true
            },
            prolistTotal:0,
            addProInfo:{
                name:'',
                unit:''
            },

            addProInfoRules: {
                name: [
                    { required: true, message:this.$t('food.common.input_product_name') , trigger: 'blur' }
                ],
                unit: [
                  { required: true, message: this.$t('food.common.input_unit'), trigger: 'blur' }
                ]
            },
            productList:[],
            listTotal: 0, //总条数
            tableData: [], //表格数据
            is_show_storageId: false

        };
    },
    mounted() {
        this.getDataList();
    },
    methods: {
        initForm(){
            this.searchForm =  {
                dishesName:'',//
                storageId:'',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging:true,
            }

            this.storeType = 1
            this.storageInfo = {
                 storageId:'',
                 createrName:'',
                 applyTime:''
            }
            this.is_batch = 0//批量添加的切换
            this.batchList = []
            this.batchAllList = []
            this.multipleSelection = []
            this.proInfo = {
                 goodsName:'',
                 storageId:'',
                 pageIndex: 1, //当前页
                 pageSize: 10, //页数
                 paging:true
            }
            this.prolistTotal = 0
            this.addProInfo = {
                 name:'',
                 unit:''
            }

            this.getDataList();



        },
        // 获取列表
        getDataList() {
            this.loading = true
            let params = this.searchForm
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$F.doRequest(this, "/pms/mealstoragedishes/list", params, (res) => {
                this.loading = false
                this.tableData = res.list
                this.listTotal = res.page.count

            });
        },

        //获取订单信息
        getInfo(data){
            this.infoShow = true
            this.$nextTick(()=>{
               this.$refs.infoRef.getInfo(data)
            })
        },

        // 出入库时候的类型选择和判断
        batchAddPro(){
            if(this.storeType == 2){
                // console.log(this.storageInfo.storageId)
                if(!this.storageInfo.storageId && this.storageInfo.storageId == ''){
                    this.alert(0,this.$t('food.common.select_storage'));
                    return false
                }
                this.proInfo.storageId = this.storageInfo.storageId
            }
            this.is_batch = 1
            this.getProList();
            this.$refs['storageInfo'].resetFields();

        },

        //获取商品列表
        getProList(){
            this.proLoading = true
            let params = this.proInfo
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$F.doRequest(this, "/pms/hotelmealgoods/list", params, (res) => {
                console.log(res)
                this.proLoading = false
                this.productList = res.list
                this.prolistTotal = res.page.count
            });
        },
        delItem(data){
                let params = {
                    id:data.id
                }
                params.userId = this.userId
                params.storesNum = this.storesNum
                this.$confirm(this.$t('food.common.confirm_del'), this.$t('food.common.tip'), {
                  confirmButtonText: this.$t('food.common.ok'),
                  cancelButtonText: this.$t('food.common.cancel'),
                  type: 'warning'
                }).then(() => {
                    this.$F.doRequest(this, "/pms/hotelmealgoods/delete", params, (res) => {
                        if(res === 'cannotDelete'){
                            this.alert(0, this.$t('food.common.product_del_tips'));
                            return false
                        }
                        if(res === 'success'){
                            this.alert(0, this.$t('food.common.success'));
                            this.getProList();
                            return false
                        }
                    });
                }).catch(() => {
                });
        },

        //添加商品
        addProSubmit(){
            this.$refs['addProInfo'].validate((valid) => {
              if (valid) {
                let params = this.addProInfo
                params.userId = this.userId
                params.storesNum = this.storesNum
                this.$F.doRequest(this, "/pms/hotelmealgoods/edit", params, (res) => {
                    console.log(res)
                    this.intProForm();
                });
              } else {
                console.log('error submit!!');
                return false;
              }
            });
        },

        handleSelectionChange(val) {
            this.multipleSelection = val
            this.batchList = this.batchList.concat(val)
        },

        //点击确定添加到入库/出库的数组中
        setBatch(){
            this.storageInfo.storageId = this.proInfo.storageId
            if(this.multipleSelection.length == 0){
                this.alert(0, this.$t('food.common.select_product'));
                return false
            }
            this.is_batch = 0
            let list = this.noRepeat(this.batchList)

            let arr = []
            for(let i in list){
                arr.push({
                    dishesId:list[i].id,
                    dishesName:list[i].name,
                    inventoryCount:1,
                    unit:list[i].unit
                })
            }
            this.batchAllList = arr
        },

        //取消添加到出入库列表
        cancelBatch(){
            this.storageInfo.storageId  = ''
            this.proInfo.storageId = ''
            this.is_batch = 0
            this.batchAllList = []
            this.batchList = []
            this.multipleSelection = []
        },

        //删除选中的商品
        delBatchOne(index){
            this.batchAllList.splice(index,1)
        },

        //打开弹框
        storeAdd(v){
            this.storeType = v
            this.dialogShow = true
        },

        //出入库操作
        setStorage(){

            let list = this.batchAllList
            let dishesArray = []
            for(let i in list){
                dishesArray.push({
                    dishesId:list[i].dishesId,
                    dishesName:list[i].dishesName,
                    inventoryCount:list[i].inventoryCount,
                })
            }
            this.$refs['storageInfo'].validate((valid) => {
              if (valid) {
                let params = {
                    storageId:this.storageInfo.storageId,
                    type:this.storeType,
                    applyTime:this.storageInfo.applyTime,
                    createrName:this.storageInfo.createrName,
                    remark:this.storageInfo.remark,
                }
                params.dishesArray  = JSON.stringify(dishesArray);
                params.userId = this.userId
                params.storesNum = this.storesNum
                console.log(params)

                this.$F.doRequest(this, "/pms/mealstoragelog/apply", params, (res) => {
                    this.dialogShow = false
                    this.getDataList();
                });
              } else {
                console.log('error submit!!');
                return false;
              }
            });

        },




        intProForm(){
            this.proInfo = {
                goodsName:'',
                storageId:'',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging:true
            }
            this.prolistTotal = 0
            this.addProInfo = {
                name:'',
                unit:''
            }
            this.$refs['addProInfo'].resetFields();
            this.addProShow = false
            this.getProList();
        },
        //关闭
        closeDialog(){
            this.infoShow = false
            this.dialogShow = false
            this.getDataList();
            this.initForm();
            this.$refs['storageInfo'].resetFields();
        },

        closeDialog_add(){
            this.addProShow = false
            this.intProForm();
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
        },
        /**每页数 */
        proSizeChange(val) {
            console.log(val)
            this.proInfo.pageSize = val;
            this.getProList();
        },
        /**当前页 */
        proCurrentChange(val) {
            this.proInfo.pageIndex = val;
            this.getProList();
        }

    }
};
</script>
<style lang="less" scoped>
    .text-size12{
        font-size: 12px !important;
    }
    .paddingTable{
        padding: 10px;
        border:1px solid #eee;
    }
    .w100{
        width: 100%;
    }
</style>
