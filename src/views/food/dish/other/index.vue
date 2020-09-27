<template>
<!-- 统一的列表格式 -->
<div>
    <div class="padding-10">
        <!-- 查询部分 -->
        <el-form inline size="small" class="padding-20"  style="background:#FAFAFA;">
            <el-row  class="margin-b-20">
                <el-col :span="24">{{$t('food.common.working_day')}} {{nowDate}}</el-col>
            </el-row>
           <el-form-item :label="$t('food.common.food_title')">
               <el-input v-model="searchForm.name" :placeholder="$t('food.common.food_title')" class="width200"></el-input>
           </el-form-item>
           <el-form-item :label="$t('food.common.cate')" prop="categoryId">
             <el-cascader
                :options="getNewCateList(categroyList)"
                v-model="searchForm.categoryId"
                @change="handleChange"></el-cascader>
           </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="getDataList">{{$t('food.common.search')}}</el-button>
                <el-button type="default" @click="initForm">{{$t('food.common.reset')}}</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button type="primary" @click="emptyHandle">{{$t('food.common.hanlde_empty')}}</el-button>
                <el-button type="primary" @click="autoEmptyHandle">{{$t('food.common.set_auto_emptying_time')}}</el-button>
                <el-button type="primary" @click="batchHandle">{{$t('food.common.batch_set')}}</el-button>
            </el-form-item>
        </el-form>
        <!--表格数据 -->
        <div v-loading="loading">
            <el-table
                class="margin-t-20"
                header-row-class-name="default"
                size="small"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="name"
                  :label="$t('food.common.food_title')"
                  >
                </el-table-column>
                <el-table-column
                  prop="categoryName"
                  :label="$t('food.common.cate')"
                  >
                </el-table-column>
                <el-table-column
                  :label="$t('food.common.food_remain')"
                  >
                  <template slot-scope="scope">
                    <span class="text-blue">{{scope.row.remainingCount}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  :label="$t('food.common.is_solt')">
                  <template slot-scope="scope">{{ scope.row.soldOut == 1 ? $t('food.common.no') : $t('food.common.yes')}}</template>
                </el-table-column>

                <el-table-column
                  :label="$t('food.common.price')"
                 >
                  <template slot-scope="scope">¥ {{ scope.row.price}}</template>
                </el-table-column>

                <el-table-column
                  :label="$t('food.common.warning_count')"
                 >
                 <template slot-scope="scope">
                   <span class="text-blue">{{scope.row.warningCount ? scope.row.warningCount : '-' }}</span>
                 </template>
                </el-table-column>

                <el-table-column
                  width="100"
                  :label="$t('food.common.action')"
                 >
                  <template slot-scope="scope">
                      <el-button @click="edit(scope.row,2)" type="text" v-if="scope.row.warningCount == ''">{{$t('food.common.set')}}</el-button>
                      <el-button  @click="edit(scope.row,1)" type="text" v-else>{{$t('food.common.edit')}}</el-button>
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
        :title="$t('food.dialogTitle.'+ dialogType)"
        width="40%"
        :visible.sync="dialogShow"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDialog"
    >
            <edit @closeDialog="closeDialog" ref="editRef" v-if="dialogType == 1 || dialogType == 2" />
            <emptyHandlePanel @closeDialog="closeDialog"  v-if="dialogType == 3" />
            <autoEmptyHandlePanel @closeDialog="closeDialog"  v-if="dialogType == 4" />
            <batchHandlePanel @closeDialog="closeDialog" ref="batchRef"  v-if="dialogType == 5" />
    </el-dialog>
</div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import edit from './edit.vue'
import emptyHandlePanel from './emptyHandle.vue'
import autoEmptyHandlePanel from './autoEmptyHandle.vue'
import batchHandlePanel from './batchHandle.vue'
 import mixin from '../../mixin';

export default {
    mixins: [mixin],
    components:{edit,emptyHandlePanel,autoEmptyHandlePanel,batchHandlePanel},
    props:['categroyList'],
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
            loading: false,
            showEdit: false,
            showDetail: false,
            searchForm: {
                name:'',
                categoryId: '',
            },
            nowDate:'',
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [] ,//表格数据
            dialogReset:true,//销毁组件-重构组件
            dialogShow:false,
            dialogType:1,
            checked:false,// 清除所有菜品预警数

        };
    },

    mounted() {
        this.initForm();
    },
    methods: {
        initForm() {
            this.searchForm = {
               name:'',
               categoryId: '',
               pageIndex: 1, //当前页
               pageSize: 10, //页数
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.loading = true
            let params = this.searchForm
            params.remainingCount = 0
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$F.doRequest(this, "/pms/dishes/dishes_manage_list", params, (res) => {
                console.log(res)
                this.loading = false
                this.nowDate = res.nowDate
                this.tableData = res.dishesList
                this.listTotal = res.page.count
            });
        },

        /**编辑 */
        edit(row,v) {
            this.dialogShow = true
            this.dialogType = v
            this.$nextTick(() => {
                this.$refs.editRef.intData(row);
            });
        },
        //手动清空
        emptyHandle(){
            this.dialogShow = true
            this.dialogType = 3
        },

        emptyHandle(){
            this.dialogShow = true
            this.dialogType = 3
        },
        //设置自动清空时间
        autoEmptyHandle(){
            this.dialogShow = true
            this.dialogType = 4
        },
        //批量设置
        batchHandle(){
            if(this.multipleSelection.length == 0){
                this.$message({
                  message: this.$t('food.common.select_food'),
                  type: 'warning'
                });
                return false
            }
            this.dialogShow = true
            this.dialogType = 5
            this.$nextTick(() => {
                this.$refs.batchRef.getData(this.multipleSelection);
            });
        },

        closeDialog(){
            this.dialogShow = false
            this.getDataList();
        },

        //获取选择的产品最后一级分类
        handleChange(value) {
           this.searchForm.categoryId = value[value.length - 1].toString();
        },

        handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = val;
        },

         /**每页数 */
        handleSizeChange(val) {
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
