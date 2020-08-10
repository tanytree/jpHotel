<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-10 17:58:06
 * @FilePath: /jiudian/src/views/market/orders/bookingcoms/finance.vue
 -->
<template>
<div class="finance">
    <el-row class="clearfix">
        <div class="">
            <el-button type="primary" size="mini">交订金</el-button>
            <el-button type="primary" size="mini">退订金</el-button>
            <el-button type="primary" size="mini">冲调</el-button>
            <el-button type="primary" size="mini">打印</el-button>
        </div>
    </el-row>
    <el-row class="clearfix padding-tb-20">
        <el-col :span="4">
            <span>付款合计：<em class="text-green">{{detailData.payPrice}}</em></span>
        </el-col>
        <el-col :span="4">
            <span>消费合计：<em class="text-red">{{detailData.consumePrice}}</em></span>
        </el-col>
        <el-col :span="4">
            <span>平衡数：100</span>
        </el-col>
    </el-row>
    <!--表格数据 -->
    <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
        <el-table-column prop="createTime" label="消费时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="priceType" label="账务项目">
            <template slot-scope="{row}">
                {{F_priceType(row.priceType)}}
            </template>
        </el-table-column>
        <el-table-column prop="payPrice" label="付款"></el-table-column>
        <el-table-column prop="consumePrice" label="消费" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="业务说明" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column prop="creatorName" label="操作人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="班次" show-overflow-tooltip></el-table-column>
    </el-table>
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
    props: ['detailData'],

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
            checkType: 'customer',
            activeName: 'first',
            detail: {
                text: ''
            },
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
            tableData: [{}] //表格数据
        };
    },

    mounted() {
        let id = this.$route.query.id
        this.consume_order_list()
    },

    methods: {
        consume_order_list() {
            let params = {
                state: '',
                checkInId: this.$route.query.id
            };
            this.$F.doRequest(this, '/pms/consume/consume_order_list', params, (res) => {
                this.tableData = res.consumeOrderList
                this.$forceUpdate()
            })
        },
    }
};
</script>

<style scoped>
.detailTab {
    border: 0
}

.detailTab>>>.el-tabs__header {
    margin: 0;
}
</style>
<style lang="less" scoped>
.base p {
    font-size: 12px
}
</style>
