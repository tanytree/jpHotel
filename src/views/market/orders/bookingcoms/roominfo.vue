<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-09 16:21:28
 * @FilePath: \jiudian\src\views\market\orders\bookingcoms\roominfo.vue
 -->
<template>
    <div class="base">
        <el-row class="clearfix" style="margin-bottom: -15px; padding-top: 15px">
            <el-col :span="12">
                <el-row>
                    <el-col :span="8">
                        <p>{{ $t('desk.order_bookOrderNum') }}：{{ checkinInfo.reserveOrderNum }}</p>
                    </el-col>
                    <el-col :span="8">
                        <p>{{$t('desk.book_orderSoutce')}}：{{ F_orderSource(checkinInfo.orderSource) }}</p>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <div class="fr">
<!--                    disabled="checkinInfo.state == 1 || checkinInfo.state == 2"-->
                    <el-button plain size="mini" @click="goCheckinDetail" :disabled="checkinInfo.state != 1 && checkinInfo.state != 2" >
                        {{ $t('manager.ps_inLive') }}
                    </el-button>
                    <el-button plain size="mini" @click="updateReserved" :disabled="checkinInfo.state != 1 && checkinInfo.state != 2">
                        {{$t('desk.home_modityReserved')}}
                    </el-button>
                    <!--这块暂时隐藏 不要留太多bug-->
                    <el-dropdown split-button type="primary" size="mini" v-show="false">
                        {{ $t('commons.moreOperating') }}
                        <el-dropdown-menu slot="dropdown">
                            <!--                        <el-dropdown-item>改价</el-dropdown-item>-->
                            <el-dropdown-item @click="cancelRoom"  v-if="checkinInfo.state == 1 || checkinInfo.state == 2">
                                {{ $t('frontOffice.cancelRoomKeep') }}</el-dropdown-item>
                            <!--                        <el-dropdown-item @click.native="liveCard_in_person_list">操作房卡</el-dropdown-item>-->
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
            <h4>{{ $t('desk.serve_basicInfo') }}</h4>
            <el-row>
                <el-col :span="8">
                    <p>{{ $t('desk.book_orderNum') }}：{{ checkinInfo.reserveOrderNum }}</p>
                </el-col>
                <el-col :span="8">
                    <p>{{$t('desk.book_orderSoutce')}}：{{ F_orderSource(checkinInfo.orderSource) }}</p>
                </el-col>
                <el-col :span="8">
                    <p>{{$t('desk.order_checkinState')}}：{{ F_checkinState(checkinInfo.state) }}</p>
                </el-col>
            </el-row>
        </el-row>
        <el-row>
            <h4>{{ $t('desk.order_roomInfo') }}</h4>
            <el-row>
                <el-col :span="3">
                    <p>{{$t('desk.home_roomType')}}：{{ currentRoom.roomTypeName }}</p>
                </el-col>
                <el-col :span="3">
                    <p>{{$t('desk.order_roomPriceTotal')}}：{{ currentRoom.realPrice }}{{$t('desk.serve_yen')}}</p>
                </el-col>
                <el-col :span="3">
                    <p>{{$t('desk.order_makeCardInfo')}}：{{ currentRoom.markCard == 1 ? $t('commons.markCard')['1'] : $t('commons.markCard')['2'] }}</p>
                </el-col>
                <el-col :span="5">
                    <p>{{ $t('desk.arrivalTime') }}：{{ checkinInfo.checkinTime }}</p>
                </el-col>
                <el-col :span="5">
                    <p>{{ $t('desk.order_departureTime') }}：{{ checkinInfo.checkoutTime }}</p>
                </el-col>
            </el-row>
        </el-row>

        <el-row v-if="currentRoom.personList">
            <h4>{{ $t('desk.customerInfoDesc') }}</h4>
            <el-row>
                <el-col :span="8">
                    <p>{{ $t('desk.home_customerName') }}：{{ checkinInfo.name }}</p>
                </el-col>
                <el-col :span="8">
                    <p>{{ $t('desk.order_customerType') }}：{{ checkMember(checkinInfo.guestType) ? $t('desk.book_member') : $t('desk.order_notMember') }}</p>
                </el-col>
                <el-col :span="8" v-if="checkinInfo.memberCard">
                    <p>{{ $t('desk.order_memberType') }}：</p>
                </el-col>
            </el-row>
        </el-row>
<!--        <el-row>-->
<!--            <h4>计费规则</h4>-->
<!--            <el-row>-->
<!--                <el-col :span="8">-->
<!--                    <p>计费规则：{{ F_ruleHour(checkinInfo.ruleHourId) }}</p>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--        </el-row>-->
        <el-dialog top="0" :visible.sync="liveInPersonShow" class="liveInPersonDia" :title="$t('desk.order_rowHouses')" width="80%">
            <customer2 :liveData="liveData" :checkinInfo="checkinInfo" type="reserve" @checkInCallback="checkInCallback"></customer2>
<!--            <span slot="footer" class="dialog-footer">-->
<!--        <el-button size="small" @click="liveInPersonShow = false" >{{ $t('commons.cancel') }}</el-button>-->
<!--                &lt;!&ndash; <el-button size="small" type="primary" @click="liveInPersonShow = false">{{ $t('commons.confirm') }}</el-button> &ndash;&gt;-->
<!--      </span>-->
        </el-dialog>
        <el-dialog
            top="0"
            :show-close="false"
            :title="$t('desk.home_roomCardOpreat')"
            :visible.sync="mackcade"
            width="60%"
        >
            <el-row>
                <span>{{$t('desk.home_haveOne')}}&nbsp;&nbsp;{{$t('desk.home_haveCardNum')}}：{{ liveCardData.done }}</span>
                <el-col :span="8" style="float: right">
                    <el-button @click="make_card_status">{{$t('desk.home_makeCard')}}</el-button>
                    <el-button>{{$t('desk.home_clearCard')}}</el-button>
                    <el-button>{{$t('desk.home_readCard')}}</el-button>
                </el-col>
            </el-row>
            <el-table
                ref="multipleTable"
                :data="liveCardData.checkInRoomList"
                @selection-change="handleSelectionChange"
                tooltip-effect="dark"
                style="width: 100%"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" :label="$t('desk.home_roomNum')" width="200">
                    <template slot-scope="{ row }">
                        {{ row.room ? row.room.houseNum : "" }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" :label="$t('desk.home_nowMakeState')">
                    <template slot-scope="{ row }">
                        {{ F_markCard(row.markCard) }}
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="mackcade = false">{{ $t('commons.cancel') }}</el-button>
      </span>
        </el-dialog>
        <rowRoomHandle ref="rowRoomHandle" @baseInfoChange="baseInfoChange"/>
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import myMixin from "@/utils/filterMixin";
import rowRoomHandle from "@/views/market/home/rowRoomHandle";
import customer2 from "@/components/front/customer2";

export default {
    components: {
        customer2,
        rowRoomHandle,
    },
    mixins: [myMixin],
    props: ["checkinInfo", "currentRoom"],
    computed: {
        ...mapState({}),
    },
    data() {
        return {
            loading: false,
            liveInPersonShow: false,
            mackcade: false,
            liveCardLoading: false,
            checkType: "customer",
            activeName: "first",
            detail: {
                text: "",
            },
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
            ruleHourList: [],
            liveCardData: [],
            liveData: [],
        };
    },

    created() {
        console.log(this.currentRoom);
        console.log(this.checkinInfo);
        let id = this.$route.query.id;
        this.hotel_rule_hour_list();
    },

    methods: {
        goCheckinDetail(){
            this.$router.push({
                name:'checktheDetails',
                params: {
                    currentRoom: this.currentRoom,
                    type: 3,  //单个房间入住维护
                },
            })
        },
        //cancel room
        cancelRoom() {
            let params = {
                checkInReserveId: this.$route.query.id || '',
                state: 8
            }
            this.$F.doRequest(
                this,
                "/pms/reserve/reserve_oper",
                params,
                (res) => {
                    this.$message({
                        message: this.$t("commons.request_success"),
                        type: "success",
                    });
                }
            );
        },
        checkMember(guestType){
            if(guestType==2){
                return true;
            }else{
                return false;
            }
        },
        checkInCallback(id) {
            this.liveInPersonShow = false;
            this.$router.push('/orderdetail?id=' + id);
        },
        batchCheckId() {
            let object = {
                checkinRoomId: this.checkinInfo.id,
                name: this.checkinInfo.name,
                idcardType: this.checkinInfo.idcardType || '1',
                idcard: this.checkinInfo.idcard,
                sex: this.checkinInfo.sex || '1',
                mobile: this.checkinInfo.mobile,
                checkinId: '',
                checkInPersonId: '',
                houseNum: this.currentRoom.houseNum,
                realPrice: this.currentRoom.realPrice,
                reservePrice: this.currentRoom.reservePrice,
                roomId: this.currentRoom.roomId,
                roomTypeId: this.currentRoom.roomTypeId,
                roomTypeName: this.currentRoom.roomTypeName,
                personList: []
            }
            this.liveData.push(object);
            this.liveInPersonShow = true;
        },
        doLiveInPerson() {
            // this.liveCard_in_person_list();
            if (
                this.currentRoom.personList &&
                this.currentRoom.personList.length > 1
            ) {
                var personList = this.currentRoom.personList;
                var room = {};
                this.$F.merge(room, {
                    roomId: personList[0].id,
                    roomTypeName: personList[0].houseName,
                    houseNum: personList[0].houseNum,
                    checkinRoomId: personList[0].checkinRoomId,
                    name: personList[0].name,
                    idcardType: personList[0].idcardType + "",
                    idcard: personList[0].idcard,
                    sex: personList[0].sex + "",
                    personList: [],
                    mobile: personList[0].mobile,
                    checkinId: personList[0].checkinId,
                    checkInPersonId: personList[0].id,
                });
                personList.splice(0, 1);
                personList.splice(2);
                personList.forEach((person, index) => {
                    person.roomId = personList[0].id + index;
                    (person.idcardType = person.idcardType + ""),
                        (person.sex = person.sex + ""),
                        (person.isChild = true);
                });
                room.personList = personList;
                this.liveData.push(room);
                //
            }
            this.liveInPersonShow = true;
        },
        //计费规则时租房计费列表
        hotel_rule_hour_list() {
            let params = {
                ruleName: "",
                priceModel: 2,
                state: 1,
                pageIndex: 1,
                pageSize: 999,
            };
            this.$F.doRequest(
                this,
                "/pms/hotel/hotel_rule_hour_list",
                params,
                (res) => {
                    this.ruleHourList = res.list;
                }
            );
        },
        F_ruleHour(id) {
            for (let k in this.ruleHourList) {
                if (id == this.ruleHourList[k].id) {
                    return this.ruleHourList[k].ruleName;
                }
            }
            return "";
        },
        //获取入住人
        liveCard_in_person_list() {
            let params = {
                type: 3,
                checkinId: this.$route.query.id,
                pageIndex: 1,
                pageSize: 999,
            };
            this.liveCardLoading = true;
            this.$F.doRequest(
                this,
                "/pms/checkin/live_in_person_list",
                params,
                (res) => {
                    //
                    // this.liveCardData = res.checkInRoomList
                    this.liveCardData = res;
                    this.liveCardData.done = 0;
                    this.liveCardData.unfinished = 0;
                    let list = res.checkInRoomList;
                    for (let k in list) {
                        if (list[k].markCard == 2) {
                            this.liveCardData.done++;
                        }
                        if (list[k].markCard == 1) {
                            this.liveCardData.unfinished++;
                        }
                    }
                    this.liveCardLoading = false;
                    this.mackcade = true;
                    this.$forceUpdate();
                }
            );
        },
        make_card_status() {
            let arr = [];
            if (!this.multipleSelection.length) {
                this.$message.error(this.$t('desk.home_shouldSelectRoom'));
                return;
            }
            this.multipleSelection.forEach((element) => {
                arr.push(element.id);
            });
            let params = {
                checkInRoomIds: arr,
            };
            this.$F.doRequest(
                this,
                "/pms/checkin/make_card_status",
                params,
                (res) => {
                    this.$message({
                        message: this.$t('commons.request_success'),
                        type: "success",
                    });
                    this.liveCard_in_person_list();
                    this.$forceUpdate();
                }
            );
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val);
        },

        baseInfoChange() {
            this.$emit("baseInfoChange", "");
        },

        updateReserved() {
            if (!this.$route.query.id) {
                return;
            }
            let arr = [];
            arr.push(this.currentRoom);
            this.$refs.rowRoomHandle.initForm(
                this.$route.query.id,
                this.checkinInfo,
                arr
            );
        },
    },
};
</script>

<style scoped>
.detailTab {
    border: 0;
}

.detailTab >>> .el-tabs__header {
    margin: 0;
}
</style>
<style lang="less" scoped>
.base p {
    font-size: 12px;
}
</style>
