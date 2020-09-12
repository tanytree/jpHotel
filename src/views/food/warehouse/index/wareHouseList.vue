<template>
<!-- 统一的列表格式 -->
<div>
    <div>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <el-row>
                <el-form-item label="状态">
                   <el-radio-group v-model="searchForm.state" size="small" @change="changeOrderStatus">
                     <el-radio-button label="">全部</el-radio-button>
                     <el-radio-button :label="1">启用 </el-radio-button>
                     <el-radio-button :label="2">禁用 </el-radio-button>
                   </el-radio-group>
                </el-form-item>

                 <el-button style="float: right;" size="small" type="primary" @click="add">新增仓库</el-button>
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
                  label="仓库名称"
                  >
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="仓库地址"
                  >
                </el-table-column>
                <el-table-column
                  label="状态"
                 >
                  <template slot-scope="scope">
                      {{scope.row.status == 1 ? '未结' : (scope.row.status == 2 ? '已结' : '已取消') }}
                  </template>
                </el-table-column>
                <el-table-column
                  width="200"
                  label="操作"
                 >
                  <template slot-scope="scope">
                      <el-button @click="getInfo(scope.row)"  type="text" >详情</el-button>
                      <el-button @click="editInfo(scope.row)"  type="text">修改</el-button>
                      <el-button type="text">禁用</el-button>
                      <el-button type="text">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

        <div style="margin-top:10px"></div>
        <!--分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.page" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.page_num" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
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
            <info @closeDialog="closeDialog"  ref="infoRef" v-if="dialogType == 1" />
    </el-dialog>






</div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import info from './info'
import mixin from '../../mixin';
export default {
    mixins: [mixin],
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

            searchForm: {
                state:'',//  1启用 2禁用 Integer选填 不填全部
                pageIndex: 1, //当前页
                pageSize: 10, //页数
            },

            listTotal: 0, //总条数
            tableData: [], //表格数据

        };
    },
    mounted() {
        this.getDataList();
    },
    methods: {
        initForm() {
            this.searchForm = {
                state:'',// 状态  1未结 2已结 3取消      int选填
                pageIndex: 1, //当前页
                pageSize: 10, //页数
            }
            this.getDataList();
        },
        /**获取表格数据 */
        changeOrderStatus(value){
            this.getDataList();
        },
        getDataList() {
            this.loading = true
            let params = this.searchForm
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$F.doRequest(this, "/pms/hotelmealstorage/list", params, (res) => {
                this.loading = false
                this.tableData = res.dishesOrderList
            });
        },

        //新增
        add(){
            this.dialogShow = true
            this.dialogType = 1
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

            this.$nextTick(()=>{
               this.$refs.infoRef.getInfo(data)
            })
        },

        //修改
        editInfo(data){
            this.dialogShow = true
            this.dialogType = 2
            this.$nextTick(()=>{
                this.$refs.infoRef.getInfo(data)
            })
        },

        //禁用
        disableItem(data){

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
            this.searchForm.pageIndex = val;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.pageIndex = val;
            this.getDataList();
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
