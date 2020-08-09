<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-09 16:49:25
 * @FilePath: /jiudian/src/views/market/nightaudit/verify.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" @selection-change="handleSelectionChange" size="mini">
            <el-table-column prop="index" label="房间号">
                <template slot-scope="{row}">
                    {{row.hotelCheckInRoom?row.hotelCheckInRoom.houseNum:''}}
                </template>
            </el-table-column>
            <el-table-column prop="" label="房型" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{roomTypeFn(row.hotelCheckInRoom?row.hotelCheckInRoom.roomTypeId:'')}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="客人姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orderSource" label="订单来源" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_orderSource(row.orderSource)}}
                </template>
            </el-table-column>
            <el-table-column prop="operCheckinType" label="入住类别">
                <template slot-scope="{row}">
                    {{F_operCheckinType(row.operCheckinType)}}
                </template>
            </el-table-column>
            <el-table-column prop="checkinTime" label="到店时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="checkoutTime" label="预离时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="checkinType" label="入住方式" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_checkinType(row.checkinType)}}
                </template>
            </el-table-column>
            <el-table-column prop="enterStatus" label="价格策略" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{setStrategyName(row.salesId)}}
                </template>
            </el-table-column>
            <el-table-column prop="" label="本日房价" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{row.hotelCheckInRoom?row.hotelCheckInRoom.roomTodayPrice:''}}
                </template>
            </el-table-column>
            <el-table-column prop="" label="门市价" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{row.hotelCheckInRoom?row.hotelCheckInRoom.roomMarkPrice:''}}
                </template>
            </el-table-column>
            <el-table-column prop="" label="房价差异" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" label="操作员" show-overflow-tooltip>
            </el-table-column>
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
            tableData: [], //表格数据
            roomTypeList: [],
            strategyList: []
        };
    },

    mounted() {
        this.initForm();
        this.hotel_room_type_list()
    },
    methods: {
        initForm() {
            this.searchForm = {
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                pageing: true
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.$F.doRequest(this, '/pms/checkin/pretrial_order_list', this.searchForm, (data) => {
                this.tableData = data.roomPersonList;
                // this.listTotal = data.page.count
                console.log(data)
            })
        },
        setStrategyName(id) {
            for (let k in this.strategyList) {
                if (this.strategyList[k].id == id) {
                    return this.strategyList[k].ruleName
                }
            }
            return ''
        },
        /**价格策略单位列表 */
        hotel_price_enter_strategy_list() {
            this.$F.doRequest(this, '/pms/hotel/hotel_price_enter_strategy_list', {}, (res) => {
                this.strategyList = res
            })
        },

        hotel_room_type_list() {
            let params = {
                pageIndex: 1,
                pageSize: 999,
                roomType: 3
            }
            this.$F.doRequest(this, '/pms/hotel/hotel_room_type_list', params, (data) => {
                this.roomTypeList = data.list;
                // this.listTotal = data.page.count
                console.log(data)
            })
        },
        roomTypeFn(id) {
            for (let k in this.roomTypeList) {
                if (this.roomTypeList[k].id == id) {
                    return this.roomTypeList[k].houseName
                }
            }
            return ''
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
