<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-31 17:05:05
 * @FilePath: /jiudian/src/views/market/orders/orderlist.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <el-row>
                <el-form-item label="订单类型">
                    <el-tag type="info">不限</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">在住订单</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">今日预离</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">历史订单</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">走结订单</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">反结订单</el-tag>&nbsp;&nbsp;
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="预离日期">
                    <el-tag type="info">当天</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">昨天</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">明天</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">后三天</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">近三天</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">近七天</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">上月</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">本月</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">下月</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">自定义</el-tag>&nbsp;&nbsp;
                    <el-form-item label="">
                        <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                        <span style="margin:0 5px">-</span>
                        <el-date-picker v-model="searchForm.endTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="入住方式">
                    <el-tag type="info">不限</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">全天房</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">钟点房</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">午夜房</el-tag>&nbsp;&nbsp;
                    <el-form-item label="入住日期">
                        <el-date-picker v-model="searchForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                        <span style="margin:0 5px">-</span>
                        <el-date-picker v-model="searchForm.endTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="订单来源">
                    <el-select v-model="searchForm.enterStatus" class="width150">
                        <el-option :value="key" v-for="(item,key,index) of $t('commons.orderSource')" :label="item" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客源类别">
                    <el-select v-model="searchForm.enterStatus" class="width150">
                        <el-radio v-for="(item,key,index) of $t('commons.guestType')" :value="key" :label="item" :key="index">{{item}}</el-radio>
                    </el-select>
                </el-form-item>
                <el-form-item label="房型">
                    <el-select v-model="searchForm.enterStatus" class="width150">
                        <el-option label="全部" value="3">全部</el-option>
                        <el-option label="已认证" value="1">已认证</el-option>
                        <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="外部订单">
                    <el-input v-model="searchForm.content" class="width150"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="姓名">
                    <el-input v-model="searchForm.name" class="width150"></el-input>
                </el-form-item>
                <el-form-item label="房间号">
                    <el-input v-model="searchForm.content" class="width150"></el-input>
                </el-form-item>
                <el-form-item label="订单号">
                    <el-select v-model="searchForm.enterStatus" class="width150">
                        <el-option label="全部" value="3">全部</el-option>
                        <el-option label="已认证" value="1">已认证</el-option>
                        <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getDataList">查询</el-button>
                    <el-button type="primary" @click="initForm">重置</el-button>
                    <el-button type="primary" @click="initForm">导出</el-button>
                </el-form-item>
                <el-form-item style="float:right">
                    <el-button type="text" icon="el-icon-arrow-up">收起</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mobile" label="手机号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="checkinTime" label="入住时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="checkoutTime" label="预离时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="房间号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="房型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="客源类别" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_guestType(row.guestType)}}
                </template>
            </el-table-column>
            <el-table-column prop="" label="订单来源" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_orderSource(row.orderSource)}}
                </template>
            </el-table-column>
            <el-table-column prop="" label="在住状态" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_checkinState(row.state)}}
                </template>
            </el-table-column>
            <el-table-column prop="" label="结账状态" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_billType(row.billType)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini">详情</el-button>
                    <el-button type="text" size="mini">结账</el-button>
                    <el-button type="text" size="mini">开发票</el-button>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            更多<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>撤销退房</el-dropdown-item>
                            <el-dropdown-item>开发票</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
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
                mobile: '',
                idcard: '',
                name: '',
                searchType: 1,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true
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
                mobile: '',
                idcard: '',
                name: '',
                searchType: 1,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.loading = true;
            this.$F.doRequest(this, '/pms/checkin/checkin_order_list', this.searchForm, (res) => {
                this.loading = false
                this.tableData = res.roomPersonList;
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
