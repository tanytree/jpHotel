<template>
<!-- 统一的列表格式 -->
<div>
    <div>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <el-row>
                <el-form-item :label="$t('food.common.status')">
                   <el-radio-group v-model="searchForm.state" size="small" @change="changeStatus">
                     <el-radio-button label="">{{$t('food.common.all')}}</el-radio-button>
                     <el-radio-button :label="1">{{$t('food.common.active')}}</el-radio-button>
                     <el-radio-button :label="2">{{$t('food.common.disable')}} </el-radio-button>
                   </el-radio-group>
                </el-form-item>

                 <el-button style="float: right;" size="small" type="primary" @click="add">{{$t('food.common.add_storage')}}</el-button>
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
                  prop="soteageName"
                  :label="$t('food.common.storage_name')"
                  >
                </el-table-column>
                <el-table-column
                  prop="address"
                  :label="$t('food.common.storage_address')"
                  >
                </el-table-column>
                <el-table-column
                  :label="$t('food.common.status')"
                 >
                  <template slot-scope="scope">
                      {{scope.row.status == 1 ? $t('food.common.active') : $t('food.common.disable') }}
                  </template>
                </el-table-column>
                <el-table-column
                  width="200"
                  :label="$t('food.common.action')"
                 >
                  <template slot-scope="scope">
                      <el-button @click="getInfo(scope.row)"  type="text" >{{$t('food.common.detail')}}</el-button>
                      <el-button @click="editInfo(scope.row)"  type="text">{{$t('food.common.edit')}}</el-button>
                      <el-button v-if="scope.row.state == 1" @click="changeState(scope.row,2)" type="text">{{$t('food.common.disable')}}</el-button>
                      <el-button v-if="scope.row.state == 2" @click="changeState(scope.row,1)" type="text">{{$t('food.common.active')}}</el-button>
                      <el-button @click="del(scope.row)" type="text">{{$t('food.common.del')}}</el-button>
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
        width="500px"
        :title="$t('food.houseTitle.'+ dialogType)"
        :visible.sync="dialogShow"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDialog"
        >
            <info @closeDialog="closeDialog"  ref="infoRef" v-if="dialogType == 3" />
            <edit @closeDialog="closeDialog"  ref="editRef" v-if="dialogType == 1 || dialogType == 2" />
    </el-dialog>
</div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import info from './info'
import edit from './edit'
import mixin from '../../mixin';
export default {
    mixins: [mixin],
    components:{info,edit},
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

            searchForm: {
                state:'',//  1启用 2禁用 Integer选填 不填全部
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging:true
            },

            listTotal: 0, //总条数
            tableData: [], //表格数据

        };
    },
    mounted() {
        this.getDataList();
    },
    methods: {
        /**获取表格数据 */
        changeStatus(value){
            this.getDataList();
        },
        getDataList() {
            this.loading = true
            let params = this.searchForm
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$F.doRequest(this, "/pms/hotelmealstorage/list", params, (res) => {
                this.loading = false
                this.tableData = res.list
                this.listTotal = res.page.count
            });
        },

        //新增
        add(){
            this.dialogShow = true
            this.dialogType = 1
            this.$nextTick(()=>{
                this.$refs.editRef.intForm();
            })
        },

        //获取订单信息
        getInfo(data){
            this.dialogShow = true
            this.dialogType = 3
            this.$nextTick(()=>{
               this.$refs.infoRef.getInfo(data)
            })
        },

        //修改
        editInfo(data){
            this.dialogShow = true
            this.dialogType = 2
            this.$nextTick(()=>{
                this.$refs.editRef.getData(data)
            })
        },

        //启用禁用
        changeState(data,state){
            let params = {
                id:data.id,
                state:state
            }
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$confirm(this.$t('food.houseStateDesc.'+state), this.$t('food.common.tip'), {
              confirmButtonText: this.$t('food.common.ok'),
              cancelButtonText: this.$t('food.common.cancel'),
              type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, "/pms/hotelmealstorage/disable", params, (res) => {
                    this.alert(200,this.$t('food.common.success'))
                    this.getDataList();
                });
            }).catch(() => {
            });
        },

        del(data){
            let params = {
                id:data.id,
            }
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$confirm(this.$t('food.houseStateDesc.3'), this.$t('food.common.tip'), {
             confirmButtonText: this.$t('food.common.ok'),
             cancelButtonText: this.$t('food.common.cancel'),
              type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, "/pms/hotelmealstorage/delete", params, (res) => {
                    this.alert(200, this.$t('food.common.success'))
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
