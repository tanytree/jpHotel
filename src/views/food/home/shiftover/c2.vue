<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-10 17:41:33
 * @FilePath: /jiudian/src/views/market/reception/shiftover/c2.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <div>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <el-row>
                <el-form-item label="交班模式">
                    <el-tag>{{$t('commons.all')}}</el-tag>&nbsp;&nbsp;
                    <el-tag>现金流</el-tag>&nbsp;&nbsp;
                    <el-tag>应收</el-tag>&nbsp;&nbsp;
                    <el-tag>实收</el-tag>&nbsp;&nbsp;
                </el-form-item>
            </el-row>
            <el-form-item label="班次时间">
                <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:200px" placeholder="选择日期"></el-date-picker>
                <span>至</span>
                <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:200px" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="当班人">
                <el-input v-model="searchForm.content" class="width200"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getDataList">查询</el-button>
                <el-button type="primary" @click="initForm">重置</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button type="primary">合计</el-button>
                <el-button type="primary">补打</el-button>
            </el-form-item>
        </el-form>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column label="基本信息">
                <el-table-column prop="createTime" label="班次" width="">
                </el-table-column>
                <el-table-column prop="createTime" label="开始-结束" width="">
                </el-table-column>
                <el-table-column prop="createTime" label="当班人" width="">
                </el-table-column>
            </el-table-column>
            <el-table-column label="本班全责汇总">
                <el-table-column prop="createTime" label="现金" width="">
                </el-table-column>
                <el-table-column prop="createTime" label="挂账" width="">
                </el-table-column>
                <el-table-column prop="createTime" label="银行卡" width="">
                </el-table-column>
                <el-table-column prop="createTime" label="微信" width="">
                </el-table-column>
                <el-table-column prop="createTime" label="支付宝" width="">
                </el-table-column>
                <el-table-column prop="createTime" label="其它" width="">
                </el-table-column>
                <el-table-column prop="createTime" label="房费" width="">
                </el-table-column>
                <el-table-column prop="createTime" label="迷你吧" width="">
                </el-table-column>
                <el-table-column prop="createTime" label="会员卡卡费" width="">
                </el-table-column>
                <el-table-column prop="createTime" label="其他收入" width="">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="createTime" label="现金" width="">
            </el-table-column>
            <el-table-column prop="createTime" label="挂账" width="">
            </el-table-column>
            <el-table-column prop="createTime" label="银行卡" width="">
            </el-table-column>
        </el-table>
        <div style="margin-top:10px"></div>
        <!--分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.page" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.page_num" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
    </div>
    <!-- 编辑or详情弹窗 -->
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
export default {
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
                searchType: 1,
                content: '',
                enterStatus: '',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [] //表格数据
        };
    },

    mounted() {
        // this.initForm();
    },
    methods: {
        initForm() {
            this.searchForm = {
                searchType: 1,
                content: '',
                enterStatus: '',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            };
            // this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.searchForm.token = this.token
            this.searchForm.plat_source = this.plat_source
            this.searchForm.userId = this.userId
            console.log(JSON.stringify(this.searchForm))
            this.loading = true;
            enterprise_list(this.searchForm).then(res => {
                this.loading = false
                if (res.code == 200) {
                    this.tableData = res.data;
                    this.listTotal = res.data.total;
                }
            });
        },
        /**编辑 */
        editRowItem(row) {
            // 加载组件
            this.showEdit = true;
            //   组件加载完成调用组件内initdata 方法
            this.$nextTick(() => {
                //   可能没有详情接口的直接传row显示
                this.refs.editRef.initdata(row.id);
            });
        },

        handelRowItem(row) {
            // 加载组件
            this.showDetail = true;
            //   组件加载完成调用组件内initdata 方法
            this.$nextTick(() => {
                //   可能没有详情接口的直接传row显示
                this.refs.detailRef.initdata(row.id);
            });
        },

        /**多选 */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /**每页数 */
        handleSizeChange(val) {
            this.searchForm.page_num = val;
            this.searchForm.page = 1;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.page = val;
            this.getDataList();
        }
    }
};
</script>
