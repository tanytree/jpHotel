<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-30 16:29:31
 * @FilePath: /jiudian/src/views/market/orders/bookingDetail.vue
 -->
<template>
<div>

    <div class="el-card">
        <div class="el-card__header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/orders' }">预订单</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
    <div class="bodyInfo margin-t-10">

        <div class="aside">
            <ul>
                <li>
                    <p>预订单信息</p>
                    
                </li>
                <li>
                    <p>A006 房型：标准间</p>
                    <span class="ok">已排房</span>
                </li>
                <li>
                    <p>张三 房型：总统套房</p>
                    <span class="no">未排房</span>
                </li>
            </ul>
        </div>
        <div class="rightContent">
            <el-row>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="订单基本信息" name="first">
                        <div class="tabWrap">
                            <sbase></sbase>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="客人信息" name="second">
                        <div class="tabWrap">
                            <customer></customer>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="财务明细" name="third">
                        <div class="tabWrap">
                            <finance></finance>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-row>
            <el-row>
                <roominfo></roominfo>
            </el-row>
        </div>

    </div>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import roominfo from './bookingcoms/roominfo'
import sbase from './bookingcoms/base'
import customer from './bookingcoms/customer'
import finance from './bookingcoms/finance'
export default {
    components: {
        roominfo,
        sbase,
        customer,
        finance
    },
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
.bodyInfo {
    overflow: hidden;
    .tabWrap{padding:0 20px}
    .aside {
        background: #fff;
        min-height: 800px;
        float: left;
        margin-bottom: -5000px;
        padding-bottom: 5000px;
        width: 280px;

        li {
            width: 100%;
            height: 60px;
            line-height: 60px;
            border-bottom: 1px solid #eee;
            border-right: 3px solid #fff;
            overflow: hidden;
            position: relative;
            p {
                font-size: 14px;
                padding-left: 40px;
                margin: 0;
            }
            span{position: absolute;top: -20px;left: -43px;bottom: 0;font-size:12px;
                height: 60px;width: 100px;text-align: center;color:#fff;line-height: 8;
                transform:rotate(-45deg)
            }
            span.ok{background: #34B069;}
            span.no{background: #D7552F;}

            &:hover,
            &.active {
                background: #E3EEFF;
                color: #126EFF;
                border-right-color: #126EFF;
            }
        }
    }

    .rightContent {
        background: #fff;
        overflow: hidden;
        margin-bottom: -5000px;
        padding-bottom: 5000px;
    }
}
</style>
