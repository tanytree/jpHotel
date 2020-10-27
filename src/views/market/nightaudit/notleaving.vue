<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-09 15:57:47
 * @FilePath: /jiudian/src/views/market/nightaudit/notleaving.vue
 -->

<template>
    <!-- 统一的列表格式 -->
    <div class="boss-index">
        <div class="booking">
            <!--表格数据 -->
            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="tableData"
                height="100%"
                header-row-class-name="default"
                size="small"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="name" :label="$t('food.common.curstom_name')"></el-table-column>
                <el-table-column prop="mobile" :label="$t('commons.mobile')"></el-table-column>
                <el-table-column prop="checkinTime" :label="$t('frontOffice.nightAudit.checkInTime')" width="200" align="center"></el-table-column>
                <el-table-column prop="checkoutTime" :label="$t('desk.order_departureTime')" width="200" align="center"></el-table-column>
                <el-table-column prop :label="$t('desk.home_roomNum')">
                    <template slot-scope="{row}">{{ row.hotelCheckInRoom ? row.hotelCheckInRoom.houseNum : '' }}
                    </template>
                </el-table-column>
                <el-table-column prop="guestType" :label="$t('desk.home_customersCategory')" width="140" align="center">
                    <template slot-scope="{row}">{{ F_guestType(row.guestType) }}</template>
                </el-table-column>
                <el-table-column prop="consumeTotalPrice" :label="$t('desk.customer_totalConsum')" width="120" align="center">
                    <template slot-scope="{row}">{{ row.consumeTotalPrice || 0}}
                    </template>
                </el-table-column>
                <el-table-column prop="state" :label="$t('desk.order_liveState')"  align="center">
                    <template slot-scope="{row}">{{ F_checkinState(row.state) }}</template>
                </el-table-column>
                <el-table-column prop="billType" :label="$t('desk.order_checkStatus')" align="center">
                    <template slot-scope="{row}">{{ F_billType(row.billType || '0') }}</template>
                </el-table-column>
                <el-table-column :label="$t('commons.operating')" width="160">
                    <template slot-scope="{row}">
                        <el-button type="text" size="mini" @click="goDetail(row)">{{$t('commons.detail')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页 -->
            <div class="block">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="searchForm.page"
                    :page-size="searchForm.page_num"
                    :total="listTotal"
                    layout="total, prev, pager, next, jumper"
                ></el-pagination>
            </div>
        </div>
        <!-- 编辑or详情弹窗 -->
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import myMixin from "@/utils/filterMixin";

export default {
    mixins: [myMixin],
    props: ['data'],
    data() {
        return {
            loading: false,
            showEdit: false,
            showDetail: false,
            searchForm: {
                searchType: 1,
                content: "",
                enterStatus: "",
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "", //结束时间
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [], //表格数据
        };
    },

    mounted() {
        this.initForm();
    },
    methods: {
        goDetail(item) {
            this.$router.push(`/orderdetail?id=${item.id}`)
        },
        initForm() {
            this.searchForm = {
                mobile: "",
                idcard: "",
                name: "",
                searchType: 2,
                outType: 1,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true,
            };
            // this.getDataList();
            this.listTotal = this.data.page.count;
            this.tableData = this.data.roomPersonList;
        },
        /**获取表格数据 */
        getDataList() {
            this.$F.doRequest(
                this,
                "/pms/checkin/checkin_order_list",
                this.searchForm,
                (res) => {
                    this.tableData = res.roomPersonList;
                    this.listTotal = res.page.count;
                }
            );
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
        },
    },
};
</script>
