<!--
 * @Date: 2020-07-07 16:59:26
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-07 17:24:07
 * @FilePath: /jiudian/src/views/market/orders/coms/c2.vue
--> 
<template>
<div class="roomDetails">
    <div class="cost margin-t-10">
        <div class="wrap">
            <span class="fee">应收：20.00</span>
            <div class="costNum">
                <el-row>消费合计：<span class="text-red">22000</span></el-row>
                <el-row>付款合计：<span class="text-green">3000</span></el-row>
            </div>
        </div>
    </div>
    <div class="bd margin-t-10">
        <div class="wrap">
            <!-- 查询部分 -->
            <el-form inline size="small">
                <el-row>
                    <el-form-item label="">
                        <el-button type="primary" size="mini">入账</el-button>
                        <el-button type="primary" size="mini">挂账</el-button>
                        <el-button type="primary" size="mini">迷你吧</el-button>
                        <el-button type="primary" size="mini">结账</el-button>
                        <el-button type="primary" size="mini">开发票</el-button>
                        <el-button type="primary" size="mini">打印</el-button>
                        <el-button type="primary" size="mini">冲调</el-button>
                        <el-button type="primary" size="mini">部分结账</el-button>
                        <el-button type="primary" size="mini">撤销结账</el-button>
                        <el-button type="primary" size="mini">撤销退房</el-button>
                    </el-form-item>
                </el-row>
                <el-form-item label="账务类别：">
                    <el-button plain size="mini">所有账务</el-button>
                    <el-button plain size="mini">未结账务</el-button>
                    <el-button plain size="mini">已结账务</el-button>
                </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary">导出</el-button>
                </el-form-item>
            </el-form>
            <!--表格数据 -->
            <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" @selection-change="handleSelectionChange" size="mini">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="enterName" label="消费时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTime" label="房间号" show-overflow-tooltip></el-table-column>
                <el-table-column label="账务项目" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="enterType" label="状态" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterType" label="消费" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterType" label="业务说明" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterType" label="操作人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="enterType" label="备注" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{row}">
                        <el-button type="text" size="mini">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top:10px"></div>
            <!--分页 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.page" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.page_num" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
// import {
//     get_user_enterprise
// } from "@/utils/api/company";

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
            loading:false,
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
        }

    }
};
</script>

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

    .roomDetails {
        .hd {
            background: #fff;

            .tit {
                padding: 15px 15px;
                margin: 0;
                border-bottom: 1px solid #eee;

                h3 {
                    display: inline-block;
                    margin: 0;
                    font-size: 16px;
                    vertical-align: middle;
                }

                span {
                    font-size: 14px;
                    color: #999;
                    margin-left: 5px;
                    vertical-align: middle;
                }
            }

            .customerInfo {
                padding: 0 15px;

                .row {
                    font-size: 14px;
                    padding: 10px 0;
                }
            }
        }

        .cost {

            background: #fff;

            .wrap {
                padding: 20px 15px;

                span.fee {
                    font-size: 26px;
                    color: #DC3E3E;
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 50px;
                }

                .costNum {
                    display: inline-block;
                    font-size: 16px;
                    vertical-align: middle;
                    border-left: 1px solid #eee;
                    padding-left: 50px;
                }
            }
        }

        .bd {
            background: #fff;

            .wrap {
                padding: 20px 15px
            }
        }

    }
}
</style>
