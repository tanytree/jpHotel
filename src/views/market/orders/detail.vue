<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-07 17:48:26
 * @FilePath: /jiudian/src/views/market/orders/detail.vue
 -->
<template>
<div>

    <div class="el-card">
        <div class="el-card__header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/orders' }">订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
    <div class="bodyInfo margin-t-10">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content">
                    <div class="customerInfo">
                        <div class="wrap">
                            <div class="hd">
                                <el-button type="primary" size="mini" style="float:right">办理会员</el-button>
                                <h3>客人信息</h3>
                            </div>
                            <div class="bd">
                                <div class="innerWrap">
                                    <el-row class="row clearfix">
                                        <el-button class="fr" size="mini" type="danger" plain>离店</el-button>客人姓名：张三
                                    </el-row>
                                    <el-row class="row">
                                        手机号：18066866505
                                    </el-row>
                                    <el-row class="row">
                                        <el-col :span="12" class="cell">
                                            客源类型：散客
                                        </el-col>
                                        <el-col :span="12" class="cell">
                                            会员类型：白金卡
                                        </el-col>
                                        <el-col :span="12" class="cell">
                                            余额：2 <el-button size="mini" type="text">充值</el-button>
                                        </el-col>
                                        <el-col :span="12" class="cell">
                                            积分：99
                                        </el-col>
                                        <el-col :span="12" class="cell">
                                            同来宾客：2
                                        </el-col>
                                        <el-col :span="12" class="cell">
                                            车牌号：皖A205HF
                                        </el-col>
                                    </el-row>

                                </div>
                            </div>
                        </div>
                        <el-row style="text-align:center;background:#F3F3F3;padding:15px 0">
                            <el-checkbox-group v-model="detail.text">
                                <el-checkbox label="复选框 A">预订（2）</el-checkbox>
                                <el-checkbox label="复选框 B">在线（3）</el-checkbox>
                                <el-checkbox label="复选框 C">离店（3）</el-checkbox>
                            </el-checkbox-group>
                        </el-row>
                        <el-row class="customerCtrl">
                            <ul>
                                <li @click="checkTypeHandle('order')">
                                    <div class="wrap"><span>查看订单信息（联房）></span></div>
                                </li>
                                <li @click="checkTypeHandle('customer')">
                                    <div class="wrap">
                                        <el-button size="mini" type="success" plain class="fr">在住</el-button><span><i class="el-icon-s-custom vm"></i>张三（A001） 余额：-20</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrap">
                                        <el-button size="mini" type="danger" plain class="fr">离店</el-button><span>李四（A002） 余额：-100</span>
                                    </div>
                                </li>
                            </ul>
                        </el-row>
                    </div>

                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content">
                    <template v-if="checkType=='order'">
                        <c1></c1>
                    </template>
                    <template v-if="checkType=='customer'">
                        <div class="detailTabWrap">
                            <div class="el-card detailTab">
                                <div class="el-card__header" style="padding:0 20px">
                                    <el-tabs v-model="activeName" @tab-click="handleClick">
                                        <el-tab-pane label="账务明细" name="first">
                                        </el-tab-pane>
                                        <el-tab-pane label="订单信息" name="second">
                                        </el-tab-pane>
                                        <el-tab-pane label="客人信息" name="third">
                                        </el-tab-pane>
                                    </el-tabs>
                                </div>
                            </div>
                            <template v-if="activeName=='first'">
                                <c2></c2>
                            </template>
                            <template v-if="activeName=='second'">
                                <div class="thisOrderInfo">
                                    <div class="wrap">
                                        <el-row class="row">
                                            <h3>基本信息</h3>
                                            <el-row class="cell">
                                                <el-col :span="6">入住时间：2020-04-15 11:00:00 </el-col>
                                                <el-col :span="6">预离时间：2020-04-18 11:00:00</el-col>
                                            </el-row>
                                            <el-row class="cell">
                                                <el-col :span="6">备注：无</el-col>
                                            </el-row>
                                        </el-row>
                                        <el-divider></el-divider>
                                        <el-row class="row">
                                            <h3>客房信息</h3>
                                            <el-row class="cell">
                                                <el-col :span="6">已入住：标准间（A001）</el-col>
                                            </el-row>
                                        </el-row>
                                        <el-divider></el-divider>
                                        <el-row class="row">
                                            <h3>销售信息</h3>
                                            <el-row class="cell">
                                                <el-col :span="6">销售员：无</el-col>
                                            </el-row>
                                        </el-row>
                                    </div>
                                </div>
                            </template>
                            <template v-if="activeName=='third'">
                                <div class="thisOrderInfo">
                                    <div class="wrap">
                                        <!--表格数据 -->
                                        <el-table v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
                                            <el-table-column prop="enterName" label="姓名" show-overflow-tooltip></el-table-column>
                                            <el-table-column prop="createTime" label="房间/房型" show-overflow-tooltip></el-table-column>
                                            <el-table-column prop="enterType" label="手机号" show-overflow-tooltip></el-table-column>
                                            <el-table-column prop="enterType" label="证件类型" show-overflow-tooltip></el-table-column>
                                            <el-table-column prop="enterType" label="证件号码" show-overflow-tooltip></el-table-column>
                                            <el-table-column prop="enterType" label="性别" show-overflow-tooltip></el-table-column>
                                            <el-table-column prop="enterType" label="地址" show-overflow-tooltip></el-table-column>
                                            <el-table-column prop="enterType" label="同来" show-overflow-tooltip></el-table-column>
                                            <el-table-column label="操作">
                                                <template slot-scope="{row}">
                                                    <el-button type="text" size="mini">添加黑名单</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>

                                    </div>
                                </div>
                            </template>
                        </div>
                    </template>
                </div>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import c1 from './coms/c1'
import c2 from './coms/c2'
// import {
//     get_user_enterprise
// } from "@/utils/api/company";

export default {
    components: {
        c1,
        c2
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
            loading:false,
            checkType:'customer',
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
        checkTypeHandle(v){
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
    .customerInfo {
        background: #fff;

        .wrap {
            padding: 0 10px;

            .hd {
                overflow: hidden;
                padding: 10px 0;
                line-height: 2;

                h3 {
                    font-size: 16px;
                    padding: 0;
                    margin: 0;
                }
            }

            .bd {
                background: #F3F3F3;
                padding: 10px 0;
                margin-bottom: 10px;

                .row {
                    font-size: 14px;
                    padding: 5px 10px;

                    .cell {
                        padding: 5px 0
                    }
                }
            }
        }

        .customerCtrl {
            ul {
                li {
                    line-height: 2;
                    padding: 10px 0;
                    font-size: 12px;

                    span {
                        color: #126EFF;
                        cursor: pointer;

                        i {
                            font-size: 18px;
                            color: #DC3E3E
                        }
                    }

                    &:hover {
                        background: #E3EEFF
                    }
                }

            }
        }

    }

    .thisOrderInfo {
        background: #fff;
        padding: 30px 0;

        .wrap {
            padding: 0 20px;

            h3 {
                margin: 0;
                font-size: 15px;
                color: #333
            }

            .cell {
                font-size: 12px;
                color: #333
            }

        }
    }
}
</style>
