<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-18 11:29:02
 * @FilePath: /jiudian/src/views/market/orders/bookingcoms/roominfo.vue
 -->
<template>
<div class="base" v-if="checkinInfo">
    <el-row class="clearfix" style="margin-bottom:-15px;padding-top:15px">
        <el-col :span="12">
            <el-row>
                <el-col :span="8">
                    <p>预订单号：{{checkinInfo.reserveOrderNum}}</p>
                </el-col>
                <el-col :span="8">
                    <p>订单来源：{{F_orderSource(checkinInfo.orderSource)}}</p>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <div class="fr">
                <el-button plain size="mini" @click="liveInPersonShow=true">入住</el-button>
                <el-button plain size="mini" @click="updateReserved">修改预留</el-button>
                <el-dropdown split-button type="primary" size="mini">
                    更多操作
                    <el-dropdown-menu slot="dropdown">
<!--                        <el-dropdown-item>改价</el-dropdown-item>-->
                        <el-dropdown-item>取消预留</el-dropdown-item>
<!--                        <el-dropdown-item @click.native="liveCard_in_person_list">操作房卡</el-dropdown-item>-->
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
        <h4>基本信息</h4>
        <el-row>
            <el-col :span="8">
                <p>订单号：{{checkinInfo.reserveOrderNum}}</p>
            </el-col>
            <el-col :span="8">
                <p>订单来源：{{F_orderSource(checkinInfo.orderSource)}}</p>
            </el-col>
            <el-col :span="8">
                <p>入住状态：{{F_checkinState(checkinInfo.state)}}</p>
            </el-col>
        </el-row>
    </el-row>
    <el-row>
        <h4>客房信息</h4>
        <el-row>
            <el-col :span="3">
                <p>房型：{{currentRoom.roomTypeName}}</p>
            </el-col>
            <el-col :span="3">
                <p>房价总计：{{currentRoom.totalRoomPrice}}元
                </p>
            </el-col>
            <el-col :span="3">
                <p>制卡信息：{{currentRoom.markCard==1?'已制卡':'未制卡'}}
                </p>
            </el-col>
            <el-col :span="5">
                <p>预抵时间：{{checkinInfo.checkinTime}}
                </p>
            </el-col>
            <el-col :span="5">
                <p>预离时间：{{checkinInfo.checkoutTime}}
                </p>
            </el-col>
        </el-row>
    </el-row>

    <el-row v-if="currentRoom.personList">
        <h4>客户信息</h4>
        <el-row>
            <el-col :span="8">
                <p>客户名：{{checkinInfo.name}}</p>
            </el-col>
            <el-col :span="8">
                <p>客户类别：{{checkinInfo.memberCard?'会员':'非会员'}}</p>
            </el-col>
            <el-col :span="8">
                <p>会员类别：</p>
            </el-col>
        </el-row>
    </el-row>
    <el-row>
        <h4>计费规则</h4>
        <el-row>
            <el-col :span="8">
                <p>计费规则：{{F_ruleHour(checkinInfo.ruleHourId)}}</p>
            </el-col>
        </el-row>
    </el-row>
    <el-dialog top="0" :visible.sync="liveInPersonShow" class="liveInPersonDia" title="添加入住人" width="80%">
        <customer></customer>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="liveInPersonShow=false">取消</el-button>
            <!-- <el-button size="small" type="primary" @click="liveInPersonShow = false">确定</el-button> -->
        </span>
    </el-dialog>
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
            <el-button size="small" @click="mackcade=false">取消</el-button>
        </span>
    </el-dialog>
    <rowRoomHandle ref="rowRoomHandle" @baseInfoChange="baseInfoChange" />

</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import myMixin from '@/utils/filterMixin';
import rowRoomHandle from "@/views/market/home/rowRoomHandle";
import customer from '@/components/front/customer'
export default {
    components: {
        customer,
        rowRoomHandle
    },
    mixins: [myMixin],
    props: ['checkinInfo', 'currentRoom'],
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
            liveInPersonShow: false,
            mackcade: false,
            liveCardLoading: false,
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
            tableData: [], //表格数据
            ruleHourList: [],
            liveCardData: []
        };
    },

    mounted() {
        let id = this.$route.query.id
        this.hotel_rule_hour_list()
    },

    methods: {
        //计费规则时租房计费列表
        hotel_rule_hour_list() {
            let params = {
                ruleName: "",
                priceModel: 2,
                state: 1,
                pageIndex: 1,
                pageSize: 999
            }
            this.$F.doRequest(this, '/pms/hotel/hotel_rule_hour_list', params, (res) => {
                this.ruleHourList = res.list
            })
        },
        F_ruleHour(id) {
            for (let k in this.ruleHourList) {
                if (id == this.ruleHourList[k].id) {
                    return this.ruleHourList[k].ruleName
                }
            }
            return ''
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
                    message: '制卡成功',
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

        baseInfoChange() {
            this.$emit('baseInfoChange', '');
        },

        updateReserved() {
            if (!this.$route.query.id) {
                this.$message.error('订单信息不正确');
                return
            }
            let arr = [];
            arr.push(this.currentRoom);
            this.$refs.rowRoomHandle.initForm(this.$route.query.id, this.checkinInfo, arr);
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
