<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-30 16:01:23
 * @FilePath: /jiudian/src/views/market/orders/bookingcoms/roominfo.vue
 -->
<template>
<div class="base">
    <el-row class="clearfix">
        <el-col :span="12">
             <el-row>
            <el-col :span="8">
                <p>预订单号：YU21R0422025</p>
            </el-col>
            <el-col :span="8">
                <p>订单来源：前台</p>
            </el-col>
             </el-row>
        </el-col>
        <el-col :span="12">
            <div class="fr">
                <el-button plain size="mini">批量入住</el-button>
                <el-button plain size="mini">修改订单</el-button>
            </div>
        </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
        <h4>基本信息</h4>
        <el-row>
            <el-col :span="8">
                <p>订单号：YU21R0422025</p>
            </el-col>
            <el-col :span="8">
                <p>订单来源：前台</p>
            </el-col>
            <el-col :span="8">
                <p>入住类型：正常</p>
            </el-col>
        </el-row>
    </el-row>
    <el-row>
        <h4>客房信息</h4>
        <el-row>
            <el-col :span="3">
                <p>房型：标准间
                </p>
            </el-col>
            <el-col :span="3">
                <p>房价总计：100元
                </p>
            </el-col>
            <el-col :span="3">
                <p>制卡信息：未制卡
                </p>
            </el-col>
            <el-col :span="5">
                <p>预抵时间：2020/04/20 20:00
                </p>
            </el-col>
            <el-col :span="5">
                <p>预离时间：2020/04/26 12:00
                </p>
            </el-col>
        </el-row>
    </el-row>

    <el-row>
        <h4>客户信息</h4>
        <el-row>
            <el-col :span="8">
                <p>客户名：张三</p>
            </el-col>
            <el-col :span="8">
                <p>客户类别：会员</p>
            </el-col>
            <el-col :span="8">
                <p>会员类别：白金卡</p>
            </el-col>
        </el-row>
    </el-row>
    <el-row>
        <h4>计费规则</h4>
        <el-row>
            <el-col :span="8">
                <p>计费规则：会员入住</p>
            </el-col>
        </el-row>
    </el-row>

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
            tableData: [] //表格数据
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
