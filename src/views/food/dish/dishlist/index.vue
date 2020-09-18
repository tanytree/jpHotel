<template>
<!-- 统一的列表格式 -->
<div>
    <div class="padding-10">
        <!-- 查询部分 -->
        <el-form inline size="small" class="padding-20"  style="background:#FAFAFA;">
            <el-form-item label="菜品名称：">
                <el-input v-model="searchForm.name" placeholder="菜品名称" class="width200"></el-input>
            </el-form-item>
            <el-form-item label="菜品分类" prop="categoryId">
              <el-cascader
                 :options="getNewCateList(categroyList)"
                 v-model="searchForm.categoryId"
                 @change="handleChange"></el-cascader>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="getDataList">查询</el-button>
                <el-button type="default" @click="initForm">重置</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button type="primary" @click="batchDel">批量删除</el-button>
                <el-button type="primary" @click="add">新增菜品</el-button>
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
              label="菜品名称"
              >
            </el-table-column>
            <el-table-column
              prop="categoryName"
              label="菜品分类"
              >
            </el-table-column>

            <el-table-column
              label="价格"
             >
              <template slot-scope="scope">¥ {{ scope.row.price}}</template>
            </el-table-column>

            <el-table-column
              label="状态"
             >
             <template slot-scope="scope"> {{ scope.row.state == 1 ? '启用中':'禁用中'}}</template>
            </el-table-column>

            <el-table-column
              width="250"
              label="操作"
             >
              <template slot-scope="scope">
                  <el-button @click="getInfo(scope.row,4)" type="text">详情</el-button>
                  <el-button  @click="edit(scope.row,1)" type="text">修改</el-button>
                  <el-button type="text" @click="changStatus( scope.row)"> {{ scope.row.state == 1 ? '禁用':'开启'}}</el-button>
                  <el-button type="text" @click="deleteHandle(scope.row)">删除</el-button>
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
        :title="$t('food.dishTitle.'+ dialogType)"
        :width="dialogType == 4 ? '600px' : '700PX'"
        :visible.sync="dialogShow"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDialog"
        >

            <edit @closeDialog="closeDialog" ref="editRef" v-if="dialogType == 1 || dialogType == 2" />
            <info @closeDialog="closeDialog" ref="infoRef" v-if="dialogType == 4" />
    </el-dialog>
</div>
</template>

<script>
import mixin from '../../mixin';
import {mapState,mapActions} from "vuex";
import edit from './edit.vue'
import info from './info.vue'

export default {
    mixins: [mixin],
    props:['categroyList'],
    components:{edit,info},
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
            loading: true,
            showEdit: false,
            showDetail: false,
            searchForm: {
                name:'',
                categoryId: '',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            dialogReset:true,//销毁组件-重构组件
            tableData:[],
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
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$F.doRequest(this, "/pms/dishes/dishes_manage_list", params, (res) => {
                console.log(res)
                this.loading = false
                this.tableData = res.dishesList
                this.listTotal = res.page.count
            });
        },
        /**编辑 */
        getInfo(row,v){
            this.dialogShow = true
            this.dialogType = v
            this.$nextTick(() => {
                this.$refs.infoRef.getInfo(row);
            });
        },
        edit(row,v) {
            this.dialogShow = true
            this.dialogType = v
            this.$nextTick(() => {
                this.$refs.editRef.getData(row);
                this.$refs.editRef.getCateList(this.categroyList);
            });
        },
        //新增菜品
        add(){
            this.dialogShow = true
            this.dialogType = 2
            this.$nextTick(() => {
                this.$refs.editRef.getCateList(this.categroyList);
                this.$refs.editRef.intData();
            });
        },
        //修改状态
        changStatus(data){
            let params ={
               dishesIds:data.id
            }
            params.userId = this.userId
            let text = ''
            if(data.state == 1){
                text = '确认要开启吗?'
            }else{
                text = '确认要禁用吗?'
            }
            console.log(params)
            console.log(data.state)
            console.log(params)
            this.$confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, "/pms/dishes/dishes_manage_disable", params, (res) => {
                    this.alert(200,'操作成功')
                    this.getDataList();
                });
            }).catch(() => {

            });
        },
        //批量删除
        deleteHandle(data){
            this.$confirm('确认要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params ={
                    dishesIds:data.id
                }
                params.userId = this.userId
                params.storesNum = this.storesNum
                this.$F.doRequest(this, "/pms/dishes/dishes_manage_delete", params, (res) => {
                    this.alert(200,'删除成功');
                    this.closeDialog();
                });
            }).catch(() => {

            });
        },
        batchDel(){
            if(this.multipleSelection.length == 0){
                this.$message({
                  message: '请先选择菜品！',
                  type: 'warning'
                });
                return false
            }
            let params ={
                dishesIds:this.getArr(this.multipleSelection)
            }
            this.$confirm('确认全部删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                params.userId = this.userId
                params.storesNum = this.storesNum
                this.$F.doRequest(this, "/pms/dishes/dishes_manage_delete", params, (res) => {
                    this.alert(200,'删除成功');
                    this.closeDialog();
                });
            }).catch(() => {

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
