<template>
    <div class="boss-index" v-loading="loading">
        <!-- 房间动态 -->
        <div class="content">
            <div class="left">
                <el-form class="room" v-model="searchForm" inline size="small">
                    <el-form-item>
                        <el-input v-model="searchForm.keyword" class="search" :placeholder="$t('desk.home_nameAroom')" @keyup.native="handleChange">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox-group v-model="searchForm.checkInType" @change="handleChange">
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <!-- 房态 -->
                <div class="room">
                    <div class="tag-top">
                        <span class="fang">{{ $t("desk.home_toRoom") }}</span>
                        <span class="reset" @click="clearnSelectAttr('roomStatus')">
                            {{ $t("commons.resetBtn") }}
                        </span>
                    </div>
                    <div class="tag-btm">
                        <el-checkbox-group v-model="searchForm.roomStatus" @change="handleChange">
                            <el-checkbox v-for="(item, index) in $t('commons.roomStatus')" :key="index" :label="item.value">
                                <el-tag v-if="item.value == 6" style="color: #00B1F2" effect="plain" size="mini">
                                    <span>{{ item.name + " " + F_roomStatus(item.value) }}</span>
                                </el-tag>
                                <el-tag v-else-if="item.value == 3"  style="color: #276BBA" :type="item.type" effect="plain" size="mini">
                                    <span>{{ item.name + " " + F_roomStatus(item.value) }}</span>
                                </el-tag>
                                <el-tag v-else :type="item.type" effect="plain" size="mini">
                                    <span>{{ item.name + " " + F_roomStatus(item.value) }}</span>
                                </el-tag>
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <!-- 房型 -->
                <div class="room">
                    <div class="tag-top">
                        <div>
                            <span class="fang">{{ $t("desk.home_roomType") }}</span>
                        </div>
                        <span class="reset" @click="clearnSelectAttr('roomTypeId')">
                            {{ $t("commons.resetBtn") }}
                        </span>
                    </div>

                    <div class="tag-btm">
                        <el-checkbox-group v-model="searchForm.roomTypeId" @change="handleChange">
                            <el-checkbox class="roomType" v-for="item of roomTypeList" :key="item.roomTypeId" :label="item.roomTypeId">
                                {{ item.houseName ? item.houseName : $t("desk.home_unknown") }}
                                <span class="total">{{ item.total - item.reserveCount }}/{{ item.total }}</span>
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>

                <!-- 楼栋楼层 -->
                <el-form class="room" v-model="searchForm" size="small">
                    <el-form-item :label="$t('desk.home_floorBuilding') + ':'">
                        <el-select v-model="searchForm.buildingId" :placeholder="$t('desk.home_building')" class="row-width" @change="buildingSelectChange">
                            <el-option v-for="item in hotel_building_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <el-select v-model="searchForm.buildingFloorId" :placeholder="$t('desk.home_floor')" class="row-width margin-l-8" @change="floorSelectChange">
                            <el-option v-for="item in hotel_building_floor_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

            <el-container class="right" v-loading="roomloading">
                <el-header>
                    <el-row>
                        <el-checkbox-group v-model="searchForm.personRoom" @change="handleChange">
                            <el-checkbox v-for="(item, index) in personRoom" :value="item.eName" :label="item.eName" :key="index">
                                {{ item.name }}({{ item.total }})
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-row>
                </el-header>
                <el-main>
                    <div v-for="(item, index) in roomList" :key="index">
                        <div v-if="item.floorRoomCount > 0">
                            <div class="floor">
                <span class="title">{{ item.building ? item.building.name : "" }}
                    <span>{{ item.floor }}</span>
                    <span>{{ $t("desk.home_layer") }}</span>
                </span>
                <span class="count">
                  <span style="color: #126eff">{{ item.reserveFloorRoomCount }}</span>/{{ item.floorRoomCount }}
                </span>
                            </div>
                            <div class="floor-box">
                                <div @click="hostelmess(room, item)" class="tag-margin" v-for="(room, i) in item.roomList" :key="i">
                                    <div :style="`background:${F_roomStatusColor(room.roomStatus)};`">
                                        <div class="line">
                                            <span>{{ room.houseNum }}</span>
                                            <span>{{ room.hotelRoomType.houseName }}</span>
                                        </div>
                                        <div class="line" v-if=" room.livingPersonList && room.livingPersonList.length > 0 &&  room.checkInObj && (room.checkInRoomType == 1 || room.checkInRoomType == 2)">
                                            <span v-if="room.checkInRoomType == 1"> {{ $t('desk.home_bookPeople') + '：' + room.livingPersonList[0].name }}</span>
                                            <span v-if="room.checkInRoomType == 2"> {{ $t('desk.customer_livePeople') + '：' + room.livingPersonList[0].name }}</span>
                                            <span>{{  '  '  }}</span>
                                            <span>{{  F_guestType( room.checkInObj.guestType || '1') }}</span>
                                        </div>
                                        <div class="line source-bottom" v-if="(room.checkInRoomType == 1 || room.checkInRoomType == 2) && room.checkInObj" style="margin-top: 40px">
                                            <span>{{$t('manager.finance_source')}}：{{
                                                    F_orderSource(room.checkInObj.orderSource)
                                                        }}
                                                    <span v-if="room.checkInObj.orderSource == 5 && room.checkInObj.otaChannelId">-</span>
                                                    <span v-if="room.checkInObj.orderSource == 5">{{getOtaName(room.checkInObj.otaChannelId)}}</span>
                                                </span>
                                        </div>
                                        <!-- 清扫图标后期加 -->
                                        <div class="placeIcon text-center">
                                            <img v-if="room.roomStatus == 5" :src="require('@/assets/images/frontdesk/fix.png')"/>
                                            <img v-if="room.roomStatus == 2 || room.roomStatus == 4" :src="require('@/assets/images/frontdesk/clearn.png')"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-main>
                <el-footer>
                    <el-button class="white" size="small" @click="batchRoomHaldel">{{ $t("desk.home_batchSet") }}</el-button>
                    <div class='rateClass'>
                        <span>{{$t('desk.home_nowLiveRate')}}：{{(menuBottomInfo.checkInRate)*100}}%</span>
                        <span style="margin-left: 15px">ADR：{{(menuBottomInfo.ADR)*100}}%</span>
                        <span style="margin-left: 15px">DOR：{{(menuBottomInfo.DOR)*100}}%</span>
                        <span style="margin-left: 15px">RevPAR：{{(menuBottomInfo.RevPAR)*100}}%</span>
                    </div>
                </el-footer>
            </el-container>
        </div>
        <!-- 房间信息 -->
       <room-info ref="roomInfo"></room-info>
        <!-- 续住 -->
        <el-dialog top="0" :title="$t('desk.home_stayOver')" :visible.sync="stayoer" width="80%">
            <el-alert
                :title="$t('desk.home_needLeave')"
                type="error"
                :closable="false"
                show-icon
            ></el-alert>
            <el-table
                :data="tableData"
                style="width: 100%"
                border
                header-row-class-name="default"
                size="small"
            >
                <el-table-column :label="$t('desk.home_roomNum')" width="100">
                    <template>A100</template>
                </el-table-column>
                <el-table-column :label="$t('desk.home_name')" width="100">
                    <template>A100</template>
                </el-table-column>
                <el-table-column :label="$t('desk.home_orignLeaveTime')" width="100">
                    <template>A100</template>
                </el-table-column>
                <el-table-column :label="$t('desk.home_stayOverDay')">
                    <template>
                        <el-input-number v-model="stayoernum" :step="1"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('desk.home_newLeaveTime')">
                    <template class="block">
                        <el-date-picker
                            v-model="value1"
                            type="date"
                            :placeholder="$t('desk.serve_chooseDate')"
                        ></el-date-picker>
                    </template>
                </el-table-column>

                <el-table-column :label="$t('desk.home_hejiRoomPrice')">
                    <template>A100</template>
                </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" class="white" @click="stayoer = false">{{$t('commons.cancel')}}</el-button>
                <el-button size="small" type="primary" class="submit" @click="stayoer = false">{{$t('commons.determine')}}</el-button>
            </div>
        </el-dialog>

        <!-- 制卡 -->
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
                height="100%"
                header-row-class-name="default"
                size="small"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column :label="$t('desk.home_roomNum')" width="200">
                    <template slot-scope="{ row }">{{
                            row.room ? row.room.houseNum : ""
                        }}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('desk.home_nowMakeState')">
                    <template slot-scope="{ row }">{{
                            F_markCard(row.markCard)
                        }}
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="mackcadeCancel">{{ $t('commons.cancel') }}</el-button>
            </div>
        </el-dialog>

        <!-- 修改备注 -->
        <el-dialog top="0" :title="$t('desk.home_resetRemark')" :visible.sync="remark" width="600px">
            <el-form>
                <el-form-item :label="$t('desk.home_note') + ':'">
                    <el-input type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" class="white" @click="remark = false"
                >{{$t('commons.cancel')}}
                </el-button
                >
                <el-button
                    size="small"
                    type="primary"
                    class="submit"
                    @click="remark = false"
                >{{$t('commons.determine')}}
                </el-button
                >
            </div>
        </el-dialog>
        <roomStatusHandle ref="roomStatusHandle" @initForm="initForm"/>
        <unitedRoomHandle ref="unitedRoomHandle"/>
        <rowRoomHandle ref="rowRoomHandle"/>
    </div>
</template>

<script>
import unitedRoomHandle from "./unitedRoomHandle";
import roomInfo from "./roomInfo";
import roomStatusHandle from "./roomStatusHandle";
import rowRoomHandle from "./rowRoomHandle";
import myMixin from "@/utils/filterMixin";
import { getLanguage, setLanguage } from "@/utils/auth";
export default {
    components: {
        roomStatusHandle,
        unitedRoomHandle,
        rowRoomHandle,
        roomInfo
    },
    mixins: [myMixin],
    data() {
        return {
            menuBottomInfo: {},
            remark: false,
            num: 1,
            currentPage4: 4, //分页当前所在页数的位置
            stayoernum: "1", //续住天数
            stayoerchecked: false, //续住  勾选
            tableData: [
                //待开票表格字段
            ],
            billList: [], //点击开票按钮的数据
            checkInForm: {
                searchType: 1,
                content: "",
                enterStatus: "",
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "", //结束时间
            },
            print: false, //催押
            batch: false,
            newCheck: false, //新增寄存按钮
            checkPatch: false, //寄存补打 按钮
            hosteldis: false, //
            stayoer: false, //续住
            yokeplate: false, //联房
            roomchange: false, //换房
            mackcade: false, //制卡
            dirty: false, // 置脏
            formInline: {
                //待开票
                user: "",
                hostel: "",
            },
            billForm: {
                resource: "", //单选按钮
            },
            formLabelWidth: "120px",
            form: {
                //催押
                roomname: "",
                peoplename: "",
                phonenum: "",
            },
            hosteldata: [{}],
            display: true,
            activeName: "one",
            Oswitch: false,
            input: "", //搜索框
            checked1: false,
            checked2: false,
            checked3: false,
            roomStatusList: [], //房态
            roomList: [],
            checked: false,
            activeThree: "a",
            currentPage3: "",
            value1: "", //时间
            loading: true,
            roomloading: true,
            searchForm: {
                keyword: "",
                checkInType: [],
                state: 1,
                roomStatus: [],
                roomTypeId: [],
                buildingId: "",
                buildingFloorId: "",
                channel: [],
                personRoom: [],
            },
            personRoom: [],
            roomTypeList: [],
            channel: "",
            iconDesList: "",
            hotel_building_list: "",
            hotel_building_floor_list: "",
            currentRoom: {

            },
            liveCardData: [],
            liveCardLoading: false,
            multipleSelection: [],
        };
    },

    async mounted() {
        this.$F.commons.fetchOtaList({}, (list)=> {
            this.otaList = list;
            this.$forceUpdate();
        })
        await this.getChannel();
        await this.getPersonRoom();
        // await this.getRoomStatus()
        await this.getIconDes();
        this.realtime_room_statistics();
        this.get_hotel_building_list();
        this.initForm();
    },
    methods: {
        getOtaName(otaChannelId) {
            let array = this.otaList.filter((ota) => {
                return ota.id == otaChannelId
            })
            if (array && array.length > 0) {
                return array[0].otaName
            }
        },

        initForm() {
            this.searchForm = {
                keyword: "",
                checkInType: [],
                state: 1,
                roomStatus: [],
                roomTypeId: [],
                buildingId: "",
                buildingFloorId: "",
                channel: [],
                personRoom: [],
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.roomloading = true;
            this.roomList = [];
            this.$F.doRequest(
                null,
                "/pms/realtime/realtime_hotel_room_list",
                this.searchForm,
                (res) => {
                    this.roomloading = false;
                    this.roomList = res.floorList;
                    this.$forceUpdate();
                }
            );
        },
        getChannel() {
            return new Promise((resolve, reject) => {
                this.$F.getPublicDictByType(this, 1, (res) => {
                    this.dict_channel = res;
                    resolve(res);
                });
            });
        },
        getPersonRoom() {
            return new Promise((resolve, reject) => {
                this.$F.getPublicDictByType(this, 7, (res) => {
                    this.dict_personRoom = res;
                    this.personRoom = res;
                    resolve(res);
                });
            });
        },
        getRoomStatus() {
            return new Promise((resolve, reject) => {
                this.$F.getPublicDictByType(this, 15, (res) => {
                    // this.dict_roomStatus= res
                    resolve(res);
                });
            });
        },
        //获取图标说明
        getIconDes() {
            return new Promise((resolve, reject) => {
                this.$F.getPublicDictByType(this, 15, (res) => {
                    this.iconDesList = res;
                    resolve(res);
                });
            });
        },
        realtime_room_statistics() {
            let that = this;

            this.$F.doRequest(
                this,
                "/pms/realtime/realtime_room_statistics",
                this.searchForm,
                (res) => {
                  console.log(res);
                    this.menuBottomInfo = {
                        checkInRate: res.checkInRate,
                        DOR: res.DOR,
                        RevPAR: res.RevPAR,
                        ADR: res.ADR,
                    }
                    let menu = {
                        0: "orders_today_out", //今日预离
                        1: "orders_individual", //散客
                        2: "orders_member", //会员
                        5: "orders_clock", //钟点房
                        // 3: "orders_enter", //单位
                        4: 'orders_team',//  团体

                        // 6: "orders_night", //午夜房
                        // 7: "orders_free", //免费
                    };
                    this.roomStatusList = res.roomStatusList;
                    this.personRoom = res.personRoomList;
                    this.roomTypeList = res.roomTypeList;
                    this.channel = res.channelList;
                    this.channel.forEach((element) => {
                        element.name = checkIdInDict(element.channel, this.dict_channel);
                    });
                    let personRoomNoExistArray = [];
                    let array = [];
                    this.personRoom.forEach((element) => {
                        array.push(parseInt(element.personRoomType));
                        element.eName = menu[element.personRoomType];
                        element.name = checkIdInDict(
                            element.eName,
                            that.dict_personRoom,
                            "icon"
                        );
                    });
                    for (let key in menu) {
                        if (array.indexOf(parseInt(key)) == -1) {
                            let temp = {
                                eName: menu[key],
                                total: 0,
                                personRoomType: key,
                            }
                            temp.name = checkIdInDict(
                                temp.eName,
                                that.dict_personRoom,
                                "icon"
                            );
                            that.personRoom.push(temp)
                        }
                    }
                    function checkIdInDict(id, arr, eName) {
                        for (let k in arr) {
                            if (eName) {
                                if (arr[k].eName == id) {
                                    return getLanguage() == "ri" ? arr[k].japanese  : arr[k].name;
                                }
                            } else {
                                if (arr[k].dictNum == id) {
                                    return getLanguage() == "ri" ? arr[k].japanese : arr[k].name;
                                }
                            }
                        }
                        return "";
                    }

                    // console.log(this.channel)
                    // console.log(this.roomStatus)
                    console.log(this.personRoom);
                }
            );
        },
        get_hotel_building_list() {
            this.$F.doRequest(this, "/pms/hotel/hotel_building_list", {}, (res) => {
                this.hotel_building_list = res;
            });
        },
        get_hotel_building_floor_list(id) {
            this.$F.doRequest(
                this,
                "/pms/hotel/hotel_building_floor_list",
                {
                    buildingId: id,
                },
                (res) => {
                    this.hotel_building_floor_list = res;
                }
            );
        },
        buildingSelectChange(e) {
            console.log(e);
            this.searchForm.buildingId = e;
            this.searchForm.buildingFloorId = "";
            this.get_hotel_building_floor_list(e);
            this.getDataList();
        },
        floorSelectChange(e) {
            console.log(e);
            this.searchForm.buildingFloorId = e;
            this.getDataList();
        },
        clearnSelectAttr(attr) {
            this.searchForm[attr] = [];
            this.getDataList();
        },
        F_roomStatusColor(value) {
            let enums = {
                1: "#27AE76",
                2: "#C0512B",
                3: "#276BBA",
                4: "#C0512B",
                5: "#27AE76",
                6: "#00B1F2",
            };
            return enums[value] ? enums[value] : "#276BBA";
        },

        F_roomStatus(value) {
            let enums = this.roomStatusList;
            var array = enums.filter((item) => {
                return item.roomStatus == value;
            });
            return array.length > 0 ? array[0].total : 0;
        },


        handleChange(e) {
            this.getDataList();
        },

        //查看房间详情
        hostelmess(room, parent) {
          // room为房间信息，parent为楼层信息
            this.$refs.roomInfo.changeVisible(room || {});
        },

        yokeplateHandle(item) {
            this.$refs.unitedRoomHandle.init(item.id);
        },


        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        // 待开票
        handleEdit(index, row) {
            // console.log(index, row);
            this.billList = row;
            console.log(this.billList, 11111);
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 催交重置
        resetForms(formNames) {
            this.$refs[formNames].resetFields();
        },
        // 批量置脏/置净
        resetbatch(formbatch) {
            this.$refs[formbatch].resetFields();
        },
        // 批量置脏/置净
        batchForm() {
            console.log("批量置脏/置净");
        },
        batchRoomHaldel() {
            this.$refs.roomStatusHandle.init();
        },

        rowRoomHandle(item) {
            if (item.livingPersonList.length) {
                this.$refs.rowRoomHandle.initForm(item.livingPersonList[0].checkinId);
            } else {
                this.$message.error(this.$t('desk.home_noPeopleLive'));
                return;
            }
        },
        //获取制卡房间表
        liveCard_in_person_list(item) {
            console.log(item);
            if (!item.livingPersonList || !item.livingPersonList.length) {
                this.$message.error(this.$t('desk.home_noPeopleLive'));
                return;
            }
            let params = {
                type: 3,
                checkinId: item.livingPersonList[0].checkinId,
                pageIndex: 1,
                pageSize: 999,
            };
            this.liveCardLoading = true;
            this.$F.doRequest(
                this,
                "/pms/checkin/live_in_person_list",
                params,
                (res) => {
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
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val);
        },
        mackcadeCancel() {
            this.mackcade = false;
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
        F_markCard(value) {
            let enums = this.$t("commons.markCard");
            return value && enums[value] ? enums[value] : "";
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
.content {
    display: flex;
    flex-direction: row;
    height: 100%;
    background: transparent;
    padding: 0;

    > div,
    section {
        background: #fff;
        border-radius: 10px;
        height: 100%;
        overflow: auto;
    }

    .left {
        flex: 1;
        margin-right: 20px;
        padding: 20px;

        .room {
            border-bottom: 1px dashed #ccc;
            padding: 10px 0;

            &.el-form {
                padding-top: 0;

                .el-form-item {
                    margin-bottom: 0;

                    .search {
                        width: 137px !important;
                        height: 30px !important;
                        line-height: 30px !important;
                    }
                }
            }

            .row-width {
                width: 100px;
            }

            .tag-top {
                margin-bottom: 10px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                .fang {
                    color: #1e1e1e;
                }

                .all {
                    margin-left: 10px;
                    color: #999;
                    font-size: 12px;
                }

                .reset {
                    border-radius: 2px;
                    padding: 4px;
                    color: #999;
                    font-size: 12px;
                    border: 1px solid #ccc;
                }
            }

            .tag-btm {
                .el-checkbox-group {
                    display: flex;
                    flex-wrap: wrap;

                    .el-checkbox {
                        margin: 0 0 10px;
                        width: 50%;

                        &.roomType {
                            width: 100%;
                            position: relative;

                            .total {
                                position: absolute;
                                right: 0;
                            }
                        }
                    }
                }
            }
        }
    }

    .right {
        flex: 3;

        .el-header {
            margin: 0 20px;
            border-bottom: 1px solid #dedede;
            display: flex;
            align-items: center;
        }

        .el-footer {
            display: flex;
            align-items: center;
            background-color: #fff;
            box-shadow: 0px -5px 8px 0px rgba(0, 0, 0, 0.19);

            .icondesc {
                span {
                    vertical-align: middle;
                }

                .item {
                    margin: 0 0 10px 0;
                }
            }
        }

        .el-main {
            .floor .count {
                margin-left: 100px;
            }

            .floor-box {
                display: flex;
                flex-wrap: wrap;

                .tag-margin {
                    height: 150px;
                    width: 20%;
                    padding: 10px;
                    margin: 0;

                    & > div {
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                        padding: 10px;
                        color: #fff;
                        border-radius: 5px;
                    }

                    .line {
                        font-size: 12px;
                        margin-bottom: 10px;

                        span + span {
                            margin-left: 20px;
                        }
                        }

                    .placeIcon {
                        margin-top: 12px;
                    }
                }
            }
        }
    }
}

.card {
    border: 1px solid #ccc;
    margin: 0 5px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 4px;
    padding: 3px;
}

.inco {
    border: 1px solid #333;
    background: #666;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    margin-right: 4px;
}

.inco.i_img {
    background: none;
    border: 0;
}

.inco.i_img img {
    width: 100%;
    height: 100%;
}

.el-checkbox.is-bordered {
    border: none;
}

// 下拉标题
.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
}

.el-icon-arrow-down {
    font-size: 12px;
}

// ========
.second-body {
    .title {
        border-bottom: 1px solid #e4e7ed;

        span {
            display: flex;
            padding: 15px 0px;
            font-weight: bolder;
        }
    }

    .row-body {
        .row-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0px;
            border-bottom: 1px solid #e5e5e5;

            .row-item {
                display: flex;
                align-items: center;
                font-size: 12px;

                .row-img {
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                    background-color: #f2f2f2;
                }

                .default-text {
                    padding: 0px 15px;
                }

                .active-facus {
                    border: 1px solid #126eff;
                    padding: 3px 15px;
                    border-radius: 5px;
                    color: #126eff;
                }
            }
        }
    }
}

.inMsg {
    padding: 20px;

    .row {
        display: flex;
        flex-wrap: wrap;
        line-height: 26px;

        .col {
            width: 33%;

            span {
                margin-left: 5px;
            }
        }
    }

    .el-table {
        margin: 10px 0;
    }

    .remark {
        padding: 0 20px;
        display: flex;
        align-items: center;
        line-height: 30px;

        .el-button {
            font-size: 14px;
        }
    }
}

.mainer {
    max-height: 350px;
    display: flex;

    .left {
        flex: 3;
        overflow: auto;
        margin-right: 10px;

        .main {
            border-radius: 5px;
            display: flex;
            flex-wrap: wrap;
            background: #f6f7f7;
            margin-top: 20px;

            .main-item {
                padding: 5px;

                .rooms {
                    width: 200px;
                    border: 1px solid #eee;
                    border-radius: 5px;
                    padding: 8px 5px;
                    background: #fff;

                    &.active {
                        background: #e3eeff;
                        border-color: #126eff;
                    }

                    .row {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        & + .row {
                            margin-top: 10px;
                        }

                        del {
                            color: #bbb;
                            margin-left: 5px;
                        }

                        .allow {
                            color: #126eff;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }

    .right {
        flex: 1;
        display: flex;
        flex-direction: column;

        .main {
            flex: 1;
            border-radius: 5px;
            padding: 10px;
            background: #f6f7f7;
            margin-top: 20px;

            .row {
                display: flex;
                align-items: center;
                justify-content: space-between;

                & + .row {
                    margin-top: 10px;
                }
            }
        }
    }
}
.rateClass{
  text-align: right;
  width:100%;
  color: rgba(102, 102, 102, 100);
  font-size: 16px;
  span{
    margin-right: 10px;
  }
}
</style>
