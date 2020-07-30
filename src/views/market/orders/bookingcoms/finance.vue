<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-30 15:47:55
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
            <span>付款合计：<em class="text-green">100</em></span>
            <span>消费合计：<em class="text-red">0</em></span>
            <span>平衡数：100</span>
    </el-row>
    <!--表格数据 -->
    <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
        <el-table-column prop="name" label="消费时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="账务项目" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="付款">
            <template slot-scope="">
                未入住 <el-button type="text">点击入住</el-button><el-button type="text">点击排房</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="消费" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="操作人" show-overflow-tooltip></el-table-column>
    </el-table>
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
        // this.get_user_enterprise(id)
    },

    methods: {
        get_user_enterprise(id) {
            // 加载组件
            let params = {
                token: this.token,
                userId: this.userId,
                plat_source: this.plat_source,
                enterCode: id
            }
            get_user_enterprise(params).then(res => {
                    if (res.code == 200) {
                        this.detailDialogFormVisible = true;
                        this.detailData = res.data
                    } else {
                        this.$message.error(res.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err.message);
                });

        },
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
            this.getDataList();
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
        handleClick() {

        },
        checkTypeHandle(v) {
            this.checkType = v
        }

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
