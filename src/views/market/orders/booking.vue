<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-29 11:30:54
 * @FilePath: /jiudian/src/views/market/orders/booking.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
            <el-row>
                <el-form-item label="订单状态">
                    <el-tag type="success">不限</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">未入住</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">取消</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">离店</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">待确认</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">拒单</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">已入驻</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">NOSHOW</el-tag>&nbsp;&nbsp;
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="预抵日期">
                    <el-tag type="success">不限</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">上周</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">今日</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">本周</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">下周</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">自定义</el-tag>&nbsp;&nbsp;
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="预订日期">
                    <el-tag type="success">不限</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">上周</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">今日</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">本周</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">下周</el-tag>&nbsp;&nbsp;
                    <el-tag type="success">自定义</el-tag>&nbsp;&nbsp;
                </el-form-item>

            </el-row>
            <el-row>
                <el-form-item label="入住类型">
                    <el-select v-model="searchForm.enterStatus" class="width150">
                        <el-option :value="key" v-for="(item,key,index) of $t('commons.checkinType')" :label="item" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单来源">
                    <el-select v-model="searchForm.enterStatus" class="width150">
                        <el-option :value="key" v-for="(item,key,index) of $t('commons.orderSource')" :label="item" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="团队名称">
                    <el-input v-model="searchForm.content" class="width150"></el-input>
                </el-form-item>
                <el-form-item label="预定单号">
                    <el-input v-model="searchForm.content" class="width150"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="预订人">
                    <el-input v-model="searchForm.name" class="width150"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="searchForm.content" class="width150"></el-input>
                </el-form-item>
                <el-form-item label="房类">
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
                <el-form-item label="预订人">
                    <el-input v-model="searchForm.content" class="width150"></el-input>
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
            <el-table-column prop="name" label="预订人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mobile" label="手机号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="checkinTime" label="预订时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="抵离时间" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <div>
                        <span>抵</span>{{row.checkinTime}}
                    </div>
                    <div>
                        <span>离</span>{{row.checkoutTime}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="enterType" label="房型（房号）" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="订金" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="总房费" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="订单来源" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_orderSource(row.orderSource)}}
                </template>
            </el-table-column>
            <el-table-column prop="" label="状态" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_checkinState(row.state)}}
            </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="handelDetail(row)">详情</el-button>
                    <el-button type="text" size="mini">订金</el-button>
                    <el-button type="text" size="mini">NOSHOW</el-button>
                    <el-button type="text" size="mini">取消</el-button>
                    <el-button type="text" size="mini">接受</el-button>
                    <el-button type="text" size="mini">拒单</el-button>
                    <el-button type="text" size="mini">恢复</el-button>
                    <el-button type="text" size="mini">撤销</el-button>
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
            tableData: [{}] //表格数据
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
        handelDetail(item) {
            this.$router.push('/orderdetail')
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
