<!--
 * @Date: 2020-07-07 16:59:26
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-11 17:26:45
 * @FilePath: /jiudian/src/views/market/orders/coms/c1.vue
-->
<template>
<div class="roomDetails">
    <div class="hd">
        <div class="tit">
            <el-button type="" size="mini" class="fr" @click="liveCard_in_person_list">操作房卡</el-button>
            <h3>入住信息（房间：{{currentRoom.houseNum}} {{F_orderSource(detailData.checkIn.orderSource)}}）</h3><span>订单号：{{detailData.checkIn.orderNum}}</span>
        </div>
        <div class="customerInfo">
            <el-row class="row">
                <el-col :span="4">
                    入住方式：{{F_operCheckinType(detailData.checkIn.operCheckinType)}}
                </el-col>
                <el-col :span="4">
                    房型：{{currentRoom.roomTypeName}}
                </el-col>
                <el-col :span="12">
                    入离时间：{{detailData.checkIn.checkinTime}} - {{detailData.checkIn.checkoutTime}}
                </el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="4">
                    房价合计：{{detailData.checkIn.realPrice}}
                </el-col>
                <el-col :span="4">
                    {{$t('commons.checkInTypeDesc')}}：{{F_checkinType(detailData.checkIn.checkinType)}}
                </el-col>
                <el-col :span="6">
                    外部订单号：{{detailData.checkIn.thirdOrdernum}}
                </el-col>
                <el-col :span="6">
                    备注：{{detailData.checkIn.remark}}
                </el-col>
            </el-row>
        </div>
    </div>
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
            <finance ref="finance" :currentRoomId="currentRoomId" :detailData="detailData" @getOrderDetail="getOrderDetail" />
        </div>
    </div>
    <el-dialog top="0" :show-close='false' title="房卡操作" :visible.sync="mackcade" width="60%">
        <el-row>
            <span>共一间&nbsp;&nbsp;本次已制卡数：{{liveCardData.done}}</span>
            <el-col :span="8" style="float:right">
                <el-button @click="make_card_status">制卡</el-button>
                <el-button>清卡</el-button>
                <el-button>读卡</el-button>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="liveCardData.checkInRoomList" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="房间号" width="200">
                <template slot-scope="{row}">
                    {{row.room?row.room.houseNum:''}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="本次制卡状态">
                <template slot-scope="{row}">
                    {{F_markCard(row.markCard)}}
                </template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="mackcade=false">{{ $t('commons.cancel') }}</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import finance from './finance'
import myMixin from '@/utils/filterMixin';
export default {
    mixins: [myMixin],
    props: ['detailData', 'currentRoomId'],
    components: {
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
            mackcade: false,
            liveCardLoading: false,
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
            tableData: [], //表格数据
            liveCardData: [],
            currentRoom: {
                personList: []
            }
        };
    },

    created() {
        if (this.currentRoomId) {
            this.currentRoom = this.detailData.inRoomList.filter(item=>{
                return item.id == this.currentRoomId
            })[0];
        }
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
                        console.log(res.data)
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
        //获取入住人
        liveCard_in_person_list() {
            let params = {
                type: 3,
                checkinId: this.$route.query.id,
                pageIndex: 1,
                pageSize: 999
            };
            this.liveCardLoading = true;
            this.$F.doRequest(this, '/pms/checkin/live_in_person_list', params, (res) => {
                // this.liveCardData = res.checkInRoomList
                this.liveCardData = res
                this.liveCardData.done = 0;
                this.liveCardData.unfinished = 0;
                let list = res.checkInRoomList;
                for (let k in list) {
                    if (list[k].markCard == 2) {
                        this.liveCardData.done++
                    }
                    if (list[k].markCard == 1) {
                        this.liveCardData.unfinished++
                    }
                }
                this.liveCardLoading = false
                this.mackcade = true
                this.$forceUpdate()
            })
        },
        make_card_status() {
            let arr = []
            if (!this.multipleSelection.length) {
                this.$message.error('至少选择一间房间')
                return
            }
            this.multipleSelection.forEach(element => {
                arr.push(element.id)
            });
            let params = {
                checkInRoomIds: arr,
            };
            this.$F.doRequest(this, '/pms/checkin/make_card_status', params, (res) => {
                this.$message({
                    message: this.$t('commons.request_success'),
                    type: 'success'
                });
                this.liveCard_in_person_list()
                this.$forceUpdate()
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val)
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
        getOrderDetail(){
            console.log('c1')
            this.$emit('getOrderDetail')
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
