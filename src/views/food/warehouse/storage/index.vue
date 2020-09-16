<template>
<!-- 统一的列表格式 -->
<div>
    <div>

        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <el-row>
                <el-form-item label="商品名称">
                    <el-input v-model="searchForm.dishesName" placeholder="商品名称" class="width200"></el-input>
                </el-form-item>

                <el-form-item label="所在仓库:">
                    <el-select size="small" v-model="searchForm.storageId" placeholder="请选择所在仓库">
                        <el-option v-for="(item,index) in mealstorageList" :key="index" :label="item.soteageName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getDataList">查询</el-button>
                    <el-button type="primary" @click="initForm">重置</el-button>
                </el-form-item>

                <el-button style="float: right;margin-left: 10px;" size="small" @click="storeAdd(2)" type="primary">商品出库</el-button>
                <el-button style="float: right;" size="small" type="primary" @click="storeAdd(1)">商品入库</el-button>
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
                  label="商品名称"
                  >
                </el-table-column>
                <el-table-column
                  prop="goodsNo"
                  label="商品编号"
                  >
                </el-table-column>

                <el-table-column
                  prop="inventoryCount"
                  label="仓库量"
                  >
                </el-table-column>
                <el-table-column
                  prop="unit"
                  label="单位"
                 >
                </el-table-column>
                <el-table-column
                  v-if="is_show_storageId"
                  prop="storageName"
                  label="所在仓库"
                  >
                </el-table-column>
               <!-- <el-table-column
                  width="200"
                  label="操作"
                 >
                  <template slot-scope="scope">
                      <el-button @click="getInfo(scope.row)"  type="text" >详情</el-button>
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
            <el-form inline size="small" label-width="100px"  :model="storageInfo" :rules="storageInfoRules" ref="storageInfo" class="margin-t-20 ">
                <el-row>
                    <el-form-item :label=" storeType == 1 ? $t('food.common.storageInTitle') :  $t('food.common.storageOutTitle') " prop="storageId">
                        <el-select size="small" v-model="storageInfo.storageId" :placeholder="storeType == 1 ? $t('food.common.storageInTitle') :  $t('food.common.storageOutTitle') ">
                            <el-option v-for="(item,index) in mealstorageList" :key="index" :label="item.soteageName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button style="float: right;margin-left: 10px;" size="small" @click="batchAddPro()" type="primary">批量添加商品</el-button>
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
                      label="商品名称"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="unit"
                      label="单位"
                      >
                    </el-table-column>
                    <el-table-column
                      label="入库数量"
                     >
                      <template slot-scope="scope">
                            <el-input size="mini" v-model="scope.row.inventoryCount" style="width: 80px;"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      width="100"
                      label="操作"
                    >
                        <template slot-scope="scope">
                           <el-button type="text" @click="delBatchOne(scope.$index)" >移除</el-button>
                        </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="margin-t-20 clearfix"></div>
                <el-form-item label="经办人:" prop="createrName">
                    <el-input size="small" v-model="storageInfo.createrName" placeholder="经办人" class="width200"></el-input>
                </el-form-item>
                <el-form-item label="申请日期:" prop="applyTime">
                    <el-date-picker size="small" v-model="storageInfo.applyTime" value-format="yyyy-MM-dd" type="date" style="width:200px" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input size="small"  type="textarea" v-model="storageInfo.remark" placeholder="备注" style="width: 500px;"></el-input>
                </el-form-item>
            </el-form>

            <el-divider></el-divider>
            <div class="dialog-footer text-center" style="padding: 0 20px;margin:-10px -20px -15px;">
             <el-button size="small" @click="closeDialog">取消</el-button>
             <el-button type="primary" size="small" @click="setStorage">确认</el-button>
            </div>
        </div>


        <el-form  inline size="small" label-width="80px" v-loading="proLoading" v-show="is_batch == 1">
            <el-row>
                <el-form-item label="商品名称:">
                    <el-input size="small" v-model="proInfo.goodsName" placeholder="商品名称" class="width200"></el-input>
                </el-form-item>
                <el-form-item label="所在仓库:">
                    <el-select size="small" v-model="proInfo.storageId" placeholder="请选择所在仓库" :disabled="proInfo.storageId != '' && storeType == 2">
                        <el-option v-for="(item,index) in mealstorageList" :key="index" :label="item.soteageName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getProList()">查询</el-button>
                </el-form-item>
                <el-button style="float: right;margin-left: 10px;" size="small"  type="primary" @click="addProShow = true">新增商品</el-button>
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
                      label="商品名称"
                      width="150"
                      >
                    </el-table-column>

                    <el-table-column
                      label="编号"
                     >
                      <template slot-scope="scope">
                        {{scope.row.remark}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="unit"
                      label="单位"
                      width="55"
                      >
                    </el-table-column>
                    <el-table-column
                      width="100"
                      label="操作"
                    >
                        <template slot-scope="scope">
                           <el-button type="text" @click="delItem(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                  </el-table>
            </div>
            <!--分页 -->
            <el-pagination style="padding-bottom: 0;" @size-change="proSizeChange" @current-change="proCurrentChange" :current-page="proInfo.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="proInfo.pageSize" layout=" sizes, prev, pager, next, jumper" :total="prolistTotal"></el-pagination>
            <el-divider></el-divider>
            <div class="dialog-footer text-center" style="padding: 0 20px;">
               <el-button size="small" @click="cancelBatch">取消</el-button>
               <el-button type="primary" size="small" @click="setBatch" >确认</el-button>
            </div>
        </el-form>
    </el-dialog>

    <el-dialog top="0" width="500px" title="新增商品" :visible.sync="addProShow" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form  :model="addProInfo" :rules="addProInfoRules" ref="addProInfo"  size="small" label-width="120px">
            <el-form-item label="商品名称:" prop="name">
                <el-input size="small" v-model="addProInfo.name" placeholder="商品名称" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="商品单位:"  prop="unit">
                <el-input size="small" v-model="addProInfo.unit" placeholder="单位(个,斤,吨)" style="width: 100%;"></el-input>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div class="dialog-footer text-right" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog_add">取消</el-button>
           <el-button type="primary" size="small"  @click="addProSubmit">确认</el-button>
        </div>
    </el-dialog>

    <el-dialog top="0" width="700px" title="仓库详情" :visible.sync="infoShow" :close-on-click-modal="false" :close-on-press-escape="false">
            <info ref="infoRef"  @closeDialog="closeDialog"></info>
    </el-dialog>


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
                    { required: true, message: '请选择仓库', trigger: 'change' }
                ],
                createrName: [
                    { required: true, message: '请输入经办人姓名', trigger: 'blur' }
                ],
                applyTime: [
                  { required: true, message: '请输入申请日期', trigger: 'blur' }
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
                    { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                unit: [
                  { required: true, message: '请输入商品单位', trigger: 'blur' }
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
                    this.alert(0,'请选择仓库');
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
            console.log(data)
            console.log(data.inventoryCount && parseFloat(data.inventoryCount) > 0)
            if(!data.inventoryCount ||  parseFloat(data.inventoryCount) > 0){
                this.alert(0,'该商品还有库存，暂时不能删除');
                return false
            }else{
                let params = {
                    id:id
                }
                params.userId = this.userId
                params.storesNum = this.storesNum
                this.$F.doRequest(this, "/pms/hotelmealgoods/delete", params, (res) => {
                    this.getProList();
                });
            }
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
            if(this.multipleSelection.length == 0){
                this.alert(0,'请选择商品！')
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
