<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-09 15:51:29
 * @FilePath: /jiudian/src/views/market/nightaudit/notyet.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" @selection-change="handleSelectionChange" size="mini">
            <el-table-column prop="name" label="预订人"></el-table-column>
            <el-table-column prop="mobile" label="手机号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="预定时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterName" label="抵离时间" width="300">
                <template slot-scope="{row}">
                    <div class="box">
                        <div class="item">
                            <div>
                                <span class="text-blue">抵</span>{{row.checkinTime}}
                            </div>
                            <div>
                                <span class="text-red">离</span>{{row.checkoutTime}}
                            </div>
                        </div>
                        <div class="item">{{row.checkinDays}}天</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="deposit" label="订金" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orderSource" label="订单来源" show-overflow-tooltip></el-table-column>
            <el-table-column prop="state" label="状态">
                <template slot-scope="{row}">
                    {{F_checkinState(row.state)}}
                </template>
            </el-table-column>
            <el-table-column prop="checkinType" label="入住类型" show-overflow-tooltip>
                                <template slot-scope="{row}">
                    {{F_checkinType(row.checkinType)}}
                </template>

            </el-table-column>
            <el-table-column prop="reserveOrderNum" label="预定单号" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top:10px"></div>
        <!--分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.page" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.page_num" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
    </el-card>
    <!-- 编辑or详情弹窗 -->
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import myMixin from '@/utils/filterMixin';
export default {
    mixins: [myMixin],
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
        this.initForm();
    },
    methods: {
        initForm() {
            this.searchForm = {
                operCheckinType: '',
                enterName: '',
                houseNum: '',
                thirdOrdernum: '',
                orderNum: '',
                mobile: '',
                name: '',
                orderSource: '',
                checkinType: '',
                checkinTime: '',
                createTime: '',
                state: 9,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.loading = true;
            this.$F.doRequest(this, '/pms/reserve/reserve_order_list', this.searchForm, (res) => {
                this.loading = false
                this.tableData = res.resreveList;
                this.listTotal = res.page.count
            })
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
            this.searchForm.pageSize = val;
            this.searchForm.pageIndex = 1;
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
