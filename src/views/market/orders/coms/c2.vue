<!--
 * @Date: 2020-07-07 16:59:26
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-13 11:15:45
 * @FilePath: /jiudian/src/views/market/orders/coms/c2.vue
--> 
<template>
<div class="roomDetails">
    <div class="cost margin-t-10">
        <div class="wrap">
            <span class="fee" v-if="detailData.totalPrice>0">应收：{{detailData.totalPrice}}</span>
            <span class="fee" v-if="detailData.totalPrice<0">应退：{{detailData.totalPrice}}</span>
            <div class="costNum">
                <el-row>消费合计：<span class="text-red">{{detailData.consumePrice}}</span></el-row>
                <el-row>付款合计：<span class="text-green">{{detailData.payPrice}}</span></el-row>
            </div>
        </div>
    </div>
    <div class="bd margin-t-10">
        <div class="wrap">
            <finance :detailData="detailData" />
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import myMixin from '@/utils/filterMixin';
import finance from './finance'
export default {
    components:{
        finance
    },
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
        this.consume_order_list()
    },

    methods: {
        consume_order_list(state='') {
            let params = {
                state: state,
                checkInId: this.$route.query.id
            };
            this.$F.doRequest(this, '/pms/consume/consume_order_list', params, (res) => {
                this.tableData = res.consumeOrderList
                this.$forceUpdate()
            })
        },

        consume_move(item) {
            let params = {
                orderId: item.id
            };
            this.$confirm('请确认是否删除该项?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, '/pms/consume/consume_move', params, (res) => {
                    this.$message({
                        type: 'success',
                        message: '移除成功!'
                    });
                    this.consume_order_list()
                })

            }).catch(() => {

            });

        },

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
