<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-25 21:52:24
 * @FilePath: /jiudian/src/views/market/reception/checkin/normal.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-row>
        <h3>入住信息</h3>
        <el-form inline size="small" :model="checkInForm" :rules="rules" label-width="100px">
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="入住人：" prop="name">
                            <el-input v-model="checkInForm.name" style="width:100px"></el-input> &nbsp;&nbsp;
                            <el-button type="primary" size="small">扫脸入住</el-button>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="性别：" prop="sex">
                            <el-radio-group v-model="checkInForm.sex">
                                <el-radio v-for="(item,key,index) of $t('commons.F_sex')" :label="key" :key="index">{{item}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="证件类型：" prop="idcardType">
                            <el-select v-model="checkInForm.idcardType" class="width200">
                                <el-option :value="key" v-for="(item,key,index) of $t('commons.idCardType')" :label="item" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="证件号：" prop="idcard">
                            <el-input v-model="checkInForm.idcard" class="width200"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="入住时间：" prop="checkinTime">
                            <el-date-picker v-model="checkInForm.checkinTime" value-format="yyyy-MM-dd" type="date" style="width:200px" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="预离时间：" prop="checkoutTime">
                            <el-date-picker v-model="checkInForm.checkoutTime" value-format="yyyy-MM-dd" type="date" style="width:200px" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="销售员：">
                            <el-select v-model="checkInForm.salesId" class="width200">
                                <el-option v-for="item in salesList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="外部订单号：">
                            <el-input v-model="checkInForm.thirdOrdernum" class="width200"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="手机号：">
                            <el-input v-model="checkInForm.mobile" class="width200"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="客源类型：" prop="guestType">
                            <el-input type="input" :value="guestTypeSwitch(checkInForm.guestType)" class="width200">
                                <template slot="append"><span @click="guestTypeShow=true">…</span></template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="订单备注：">
                            <el-input class="width200" type="textarea" v-model="checkInForm.remark"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="订单来源" prop="orderSource">
                            <el-select v-model="checkInForm.orderSource" class="width200">
                                <el-option :value="key" v-for="(item,key,index) of $t('commons.orderSource')" :label="item" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="入住类型" prop="checkinType">
                            <el-select v-model="checkInForm.checkinType" class="width200">
                                <el-option :value="key" v-for="(item,key,index) of $t('commons.checkinType')" :label="item" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                </el-col>
                <el-col :span="6">
                </el-col>
            </el-row>
        </el-form>
    </el-row>
    <el-row style="margin-bottom:60px">
        <h3>房间信息</h3>
        <el-form inline size="mini">
            <el-row>
                <el-col :span="17">
                    <div class="grid-content">
                        <el-row>
                            <el-radio-group v-model="getRoomsForm.changeType" size="small" @change="getDataList">
                                <el-radio :label="1" border>可改房价</el-radio>
                                <el-radio :label="2" border>不可改房价</el-radio>
                            </el-radio-group>
                            <el-select v-model="getRoomsForm.bedCount" size="small" style="margin-left:40px" @change="getDataList">
                                <el-option label="1床" :value="1"></el-option>
                                <el-option label="2床" :value="2"></el-option>
                                <el-option label="3床" :value="4"></el-option>
                                <el-option label="4床" :value="4"></el-option>
                                <el-option label="5床" :value="5"></el-option>
                                <el-option label="6床" :value="6"></el-option>
                                <el-option label="7床" :value="7"></el-option>
                            </el-select>
                        </el-row>
                        <br />
                        <el-row>
                            <el-col :span="8" v-for="v in roomList" :key="v.roomTypeId">
                                <div class="grid-content rooms">
                                    <div class="grid-cell" :class="activeRoomCheck(v.roomTypeId)?'active':''">
                                        <div class="wrap">
                                            <el-row class="row">
                                                <el-col :span="14">
                                                    <span>{{v.roomTypeName}}</span>
                                                </el-col>
                                                <el-col :span="10">
                                                    <div style="text-align: right">
                                                        <el-input-number @change="handleNumChange($event,v)" :min="0" :max="v.reserveTotal" label="描述文字" size="mini" style="width:100px" v-model.number="v.num"></el-input-number>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="row">
                                                <el-col :span="14">
                                                    <el-button type="text" size="mini">可订{{v.reserveTotal}}</el-button>
                                                </el-col>
                                                <el-col :span="10">
                                                    <div style="text-align: right">

                                                        <el-input placeholder="" size="mini" style="width:60px" v-model="v.price" v-if="getRoomsForm.changeType==1"></el-input>

                                                        <em>{{v.todayPrice}}</em>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>

                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="grid-content">
                        <el-row>
                            <el-button @click="page_row_houses">自动排房</el-button>&nbsp;&nbsp;
                            <el-button @click="liveInPersonShow=true">添加入住人</el-button>&nbsp;&nbsp;
                            <el-button>制卡</el-button>&nbsp;&nbsp;
                        </el-row>
                        <br />
                        <el-row class="roomSelect">
                            <ul>
                                <li v-for="(v,index) in waitingRoom" :key="index">
                                    <div class="grid-content rooms">
                                        <div class="grid-cell">
                                            <div class="wrap">
                                                <el-row class="row">
                                                    <el-col :span="14">
                                                        <span>{{v.roomTypeName}}</span>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <div style="text-align: right">
                                                            <el-button type="primary" size="mini" @click="rowRoomByItem(v,index)">排房</el-button>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                                <el-row class="row" v-if="v.roomsArr&&v.roomsArr.length">
                                                    <el-button size="mini" v-for="(item,i) of v.roomsArr" :key="i">{{item.houseNum}}</el-button>
                                                </el-row>
                                                <el-row class="row">
                                                    <el-col :span="14">
                                                        <el-button type="text" size="mini">可订{{v.reserveTotal}}</el-button>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <div style="text-align: right">
                                                            <em>{{v.num}}间</em>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </el-row>

                    </div>
                </el-col>
            </el-row>
        </el-form>
    </el-row>
    <!-- 编辑or详情弹窗 -->
    <el-row class="fixedFoot">
        <div class="wrap">
            <el-button type="primary">保存</el-button>
            <el-button>保存后继续办理新入住</el-button>
        </div>
    </el-row>

    <el-dialog top="0" :visible.sync="rowRoomShow" class="rowRoomDia" title="排房" width="800px">
        <el-form :model="hotelRoomListParams" style="margin-top:-20px" v-loading="loading">
            <el-form-item label="朝向:" class="" style="margin-bottom:0">
                <el-checkbox-group v-model="hotelRoomListParams.toward" @change="hotel_room_list">
                    <el-checkbox v-for="(item,key,index) of $t('commons.toward')" :label="key" :value="key" :key="index">{{item}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="属性:" class="" style="margin-bottom:0">
                <el-checkbox v-model="hotelRoomListParams.windowFlag" @change="hotel_room_list">有窗</el-checkbox>
                <el-checkbox v-model="hotelRoomListParams.roadFlag" @change="hotel_room_list">靠马路</el-checkbox>
                <el-checkbox v-model="hotelRoomListParams.smokeFlag" @change="hotel_room_list">无烟房</el-checkbox>
                <el-checkbox v-model="hotelRoomListParams.noiseFlag" @change="hotel_room_list">非噪音房</el-checkbox>
                <el-checkbox v-model="hotelRoomListParams.temperatureFlag" @change="hotel_room_list">非高温房</el-checkbox>
            </el-form-item>
            <div class="rowRoomsList">
                <div class="wrap">
                    <el-row>
                        <!-- <h3>新加坡假日酒店</h3> -->
                        <el-row class="roomsInserted" :gutter="10">
                            <el-col v-for="v in rowRoomCurrentList" :key="v.id" :span="3" style="margin-bottom:10px">
                                <el-tag :type="checkIsSelect(v)?'danger':'info'" effect="dark" class="tag" @click="rowRoomCurrentListItemAdd(v)">{{v.houseNum}}</el-tag>
                            </el-col>
                        </el-row>
                    </el-row>
                </div>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="rowRoomShow = false">取消</el-button>
            <el-button size="small" type="primary" @click="db_row_houses">确定</el-button>
        </span>
    </el-dialog>
    <el-dialog top="0" :visible.sync="guestTypeShow" class="guestTypeDia" title="排房" width="500px">
        <el-form :model="checkInForm" style="margin-top:-20px">
            <el-form-item label="客人类型:" class="" style="margin-bottom:0">
                <el-radio-group v-model="checkInForm.guestType">
                    <el-radio v-for="(item,key,index) of $t('commons.guestType')" :label="key" :key="index">{{item}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="" class="" style="margin-bottom:0" label-width="0" v-if="checkInForm.guestType==2||checkInForm.guestType==3">
                <el-input type="text"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="guestTypeShow = false">取消</el-button>
            <el-button size="small" type="primary" @click="guestTypeShow = false">确定</el-button>
        </span>
    </el-dialog>
    <el-dialog top="0" :visible.sync="liveInPersonShow" class="liveInPersonDia" title="添加入住人" width="60%">
        <el-table :data="liveInPersonData" style="width: 100%;margin-bottom: 20px;" row-key="id" border :default-expand-all='false' :tree-props="{children: 'departmentList', hasChildren: 'hasChildren'}">
            <el-table-column prop="storesName" label="房号/房型" width="200">
                <template slot-scope="scope">
                    <!-- {{scope.row.storesName || scope.row.name}} -->
                </template>
            </el-table-column>
            <el-table-column prop="groupName" label="房价">
            </el-table-column>
            <el-table-column prop="groupName" label="姓名">
            </el-table-column>
            <el-table-column prop="groupName" label="证件类型">
            </el-table-column>
            <el-table-column prop="groupName" label="证件号码">
            </el-table-column>
            <el-table-column prop="groupName" label="性别">
            </el-table-column>
            <el-table-column prop="groupName" label="手机号">
            </el-table-column>
            <el-table-column label="操作" width="140">
                <template slot-scope="{row}">
                    <el-button type="primary" v-if="row.isChild" size="mini" @click="deleteItem(row)">删除</el-button>
                    <el-button type="text" v-if="row.isChild" size="mini" @click="deleteItem(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="liveInPersonShow = false">取消</el-button>
            <el-button size="small" type="primary" @click="liveInPersonShow = false">确定</el-button>
        </span>
    </el-dialog>
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
            num: 1,
            loading: false,
            rowRoomShow: false,
            showDetail: false,
            guestTypeShow: false,
            liveInPersonShow: false,
            getRoomsForm: {
                changeType: 1,
                bedCountL: '',
            },
            salesList: '',
            checkInForm: {
                operCheckinType: 1,
                name: '',
                sex: '',
                idcardType: '',
                idcard: '',
                memberCard: '',
                checkinTime: '',
                checkoutTime: '',
                salesId: '',
                thirdOrdernum: '',
                mobile: '',
                ruleHourId: '',
                guestType: '',
                orderSource: '',
                recommendInfo: '',
                channel: '',
                checkinType: '',
                remark: '',
                // checkInId: '2c9f404b737ef3800173803fe61f0002'
                checkInId: ''
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }, ],
                sex: [{
                    required: true,
                    message: '请选择性别',
                    trigger: 'blur'
                }, ],
                idcardType: [{
                    required: true,
                    message: '请选择护照类型',
                    trigger: 'blur'
                }, ],
                idcard: [{
                    required: true,
                    message: '请输入证件号',
                    trigger: 'blur'
                }, ],
                checkinTime: [{
                    required: true,
                    message: '请选择入住时间',
                    trigger: 'change'
                }, ],
                checkoutTime: [{
                    required: true,
                    message: '请选择预离时间',
                    trigger: 'change'
                }, ],
                guestType: [{
                    required: true,
                    message: '请选择客源类型',
                    trigger: 'blur'
                }, ],
                orderSource: [{
                    required: true,
                    message: '请订单来源',
                    trigger: 'change'
                }, ],
                checkinType: [{
                    required: true,
                    message: '请选择入住类型',
                    trigger: 'change'
                }, ]
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            roomList: [], //表格数据
            waitingRoom: [],
            rowRoomCurrentItem: '',
            rowRoomCurrentList: '',

            hotelRoomListParams: {
                buildingId: '',
                buildingFloorId: '',
                roomTypeId: '',
                houseNum: '',
                toward: [],
                roadFlag: '',
                windowFlag: '',
                smokeFlag: '',
                noiseFlag: '',
                temperatureFlag: '',
                livingRoomStatus: '',
                pageIndex: 1,
                pageSize: 9999
            },
            liveInPersonData: [{}]
        };
    },

    mounted() {
        this.initForm();
    },
    watch: {
        checkInForm: {
            handler(n, o) {
                console.log(n)
                let arr = [
                    'name', 'sex', 'idcardType', 'idcard', 'checkinTime', 'checkoutTime', 'guestType', 'orderSource', 'checkinType'
                ]
                if (!this.checkInForm.checkinId) {
                    let len = 0;
                    for (let k in arr) {
                        if (this.checkInForm[arr[k]] != '') {
                            len++
                        }
                    }

                    if (len == arr.length) {
                        window.setTimeout(() => {

                            this.hotel_check_in()

                        }, 2000)

                    }
                }

            },
            //   immediate: true,  
            deep: true
        }
    },
    methods: {
        initForm() {
            this.getRoomsForm = {
                changeType: 1,
                bedCountL: '',
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            let that = this
            this.$F.doRequest(this, '/pms/checkin/hotel_checkin_roominfo', this.getRoomsForm, (res) => {
                this.loading = false
                let list = res.roomTypeList;
                list.forEach(element => {
                    let coverData = check(element.roomTypeId)
                    if (coverData) {
                        element.price = coverData.todayPrice
                        element.num = coverData.num
                    } else {
                        element.price = element.todayPrice
                        element.num = 0
                    }
                });

                function check(id) {
                    for (let k in that.waitingRoom) {
                        if (that.waitingRoom[k].roomTypeId == id) {
                            return that.waitingRoom[k]
                        }
                    }
                    return false
                }
                this.roomList = list
                console.log(this.roomList)
            })
        },
        login_user_list() {
            let params = {
                searchType: 2,
                paging: false,
                salesFlag: 1,
                content: '',
                departmentId: '',
                pageIndex: 1,
                pageSize: 10
            }
            this.$F.doRequest(this, '/pms/workuser/login_user_list', params, (data) => {
                this.salesList = data.hotelUserList;
            })
        },
        hotel_check_in(type) {

            this.$F.doRequest(this, '/pms/checkin/hotel_check_in', this.checkInForm, (data) => {
                this.checkInForm.checkinId = data.checkinId
                if (type == 1) {

                } else {

                }
            })
        },
        /**编辑 */
        editRowItem(row) {
            // 加载组件
            this.showEdit = true;
            //   组件加载完成调用组件内initdata 方法
            this.$nextTick(() => {
                //   可能没有详情接口的直接传row显示
                this.refs.editRef.initdata(row.id);
            });
        },

        handelRowItem(row) {
            // 加载组件
            this.showDetail = true;
            //   组件加载完成调用组件内initdata 方法
            this.$nextTick(() => {
                //   可能没有详情接口的直接传row显示
                this.refs.detailRef.initdata(row.id);
            });
        },
        guestTypeSwitch(v) {
            for (let k in this.$t('commons.guestType')) {
                if (v == k) {
                    return this.$t('commons.guestType')[k]
                }
            }
            return ''
        },

        handleNumChange(e, item) {
            let exist = false
            for (let k in this.waitingRoom) {
                if (this.waitingRoom[k].roomTypeId == item.roomTypeId) {
                    if (item.num > 0) {
                        this.waitingRoom[k].price = item.price
                        this.waitingRoom[k].todayPrice = item.todayPrice
                        this.waitingRoom[k].num = item.num
                    } else {
                        this.waitingRoom.splice(k, 1)
                    }
                    exist = true
                    break
                }
            }
            if (!exist) {
                this.waitingRoom.push(item)
            }
            console.log(this.waitingRoom)
        },
        activeRoomCheck(id) {

            for (let k in this.waitingRoom) {
                if (this.waitingRoom[k].roomTypeId == id) {
                    return true
                }
            }
            return false

        },

        rowRoomByItem(item, index) {
            if (!this.checkInForm.checkInId) {
                this.$message.error('请完善入住信息后操作');
                return
            }
            this.rowRoomCurrentItem = JSON.parse(JSON.stringify(item))
            this.rowRoomCurrentIndex = index
            this.hotelRoomListParams.roomTypeId = item.roomTypeId
            this.rowRoomShow = true
            this.hotel_room_list()
        },
        //获取可排房的房间
        hotel_room_list() {
            let params = Object.assign({}, this.hotelRoomListParams);
            params.roadFlag !== '' && (params.roadFlag = params.roadFlag ? 1 : '')
            params.windowFlag !== '' && (params.windowFlag = params.windowFlag ? 1 : '')
            params.smokeFlag !== '' && (params.smokeFlag = params.smokeFlag ? 1 : '')
            params.noiseFlag !== '' && (params.noiseFlag = params.noiseFlag ? 1 : '')
            params.temperatureFlag !== '' && (params.temperatureFlag = params.temperatureFlag ? 1 : '')
            this.$F.doRequest(this, '/pms/hotel/hotel_room_list', params, (res) => {
                this.rowRoomCurrentList = res.list
            })
        },
        //手动排房确定
        db_row_houses() {
            if (this.rowRoomCurrentItem.roomsArr.length > this.rowRoomCurrentItem.num) {
                this.$message.error('排房数量超过订房数量');
                return
            }
            let ids = [];
            this.rowRoomCurrentItem.roomsArr.map((item) => {
                ids.push(item.id);
            })
            let params = {
                checkinRoomType: 1,
                roomTypeId: this.rowRoomCurrentItem.roomTypeId,
                checkinId: this.checkInForm.checkInId,
                checkinReserveId: '',
                roomId: ids,
                reservePrice: this.rowRoomCurrentItem.todayPrice,
                realPrice: this.rowRoomCurrentItem.price
            }
            this.$F.doRequest(this, '/pms/checkin/db_row_houses', params, (res) => {
                this.$message({
                    message: '排房成功',
                    type: 'success'
                });
                this.waitingRoom[this.rowRoomCurrentIndex] = this.rowRoomCurrentItem
                this.rowRoomShow = false
                this.$forceUpdate()
            })
        },
        //自动排房确定
        page_row_houses() {
            if (this.waitingRoom.length < 1) {
                this.$message.error('请选择房型后操作');
                return
            }
            let roomTypeId = [],
                number = 0;
            for (let k in this.waitingRoom) {
                number += this.waitingRoom[k].num
                roomTypeId.push(this.waitingRoom[k].roomTypeId);
            }
            let params = {
                checkinRoomType: 1,
                roomTypeId: roomTypeId,
                checkinId: this.checkInForm.checkInId,
                rowHousesTotal: number,
                checkinReserveId: ''
            }
            let setRooms = (key, item) => {
                console.log(key)
                console.log(item)
                for (let k in this.waitingRoom) {
                    if (this.waitingRoom[k].roomTypeId == key) {
                        if (!this.waitingRoom[k].roomsArr) {
                            this.waitingRoom[k].roomsArr = []
                        }
                        this.waitingRoom[k].roomsArr.push({
                            houseNum: item.houseNum,
                            id: item.id
                        })
                    }
                }
            }

            this.$F.doRequest(this, '/pms/checkin/page_row_houses', params, (res) => {
                let data = res
                this.$message({
                    message: '排房成功',
                    type: 'success'
                });
                for (let k in data) {
                    for (let j in data[k]) {
                        setRooms(k, data[k][j])
                    }
                }
                this.$forceUpdate()
            })

        },
        rowRoomCurrentListItemAdd(item) {
            if (!this.rowRoomCurrentItem.roomsArr) {
                this.rowRoomCurrentItem.roomsArr = [];
            }
            let exist = false
            for (let k in this.rowRoomCurrentItem.roomsArr) {
                if (item.id == this.rowRoomCurrentItem.roomsArr[k].id) {
                    this.rowRoomCurrentItem.roomsArr.splice(k, 1)
                    exist = true
                    break
                }
            }
            if (!exist) {
                this.rowRoomCurrentItem.roomsArr.push({
                    houseNum: item.houseNum,
                    id: item.id,
                    checkinNum: item.hotelRoomType.checkinNum
                })
            }
            this.$forceUpdate()
            console.log(this.rowRoomCurrentItem)
        },
        checkIsSelect(item) {
            if (this.rowRoomCurrentItem.roomsArr && this.rowRoomCurrentItem.roomsArr.length) {
                for (let k in this.rowRoomCurrentItem.roomsArr) {
                    if (item.id == this.rowRoomCurrentItem.roomsArr[k].id) {
                        return true
                    }
                }
                return false
            }
            return false
        }
    }
};
</script>

<style scoped>
.fixedFoot {
    text-align: right;
    position: fixed;
    bottom: 0;
    left: 200px;
    right: 20px;
    background: #fff;
    border-top: 1px solid #eee;
    z-index: 9;
}

.fixedFoot .wrap {
    padding: 10px 20px
}

.fixedFoot .wrap button {
    margin-left: 20px;
}

.rooms {
    margin-right: 10px;
    margin-bottom: 10px;
}

.rooms .grid-cell {
    border: 1px solid #eee;
    border-radius: 5px;
}

.rooms .grid-cell.active {
    background: #E3EEFF;
    border-color: #126EFF;
}

.rooms .grid-cell .wrap {
    padding: 10px 5px;
}

.rooms .grid-cell .wrap .row:last-child {
    margin-top: 10px;
}

.rooms .grid-cell .wrap em {
    font-style: normal;
    font-size: 12px;
    color: #999;
    text-decoration: line-through;
    margin-left: 5px;
}

.roomSelect {
    background: #F6F7F7;
    min-height: 500px;
}

.roomSelect ul li .rooms {
    margin: 0
}

.roomSelect ul li .rooms .grid-cell {
    border: 0
}

.roomSelect ul {
    padding: 0 20px
}

.roomSelect ul li {
    border-bottom: 1px solid #D7D7D7;
    padding: 10px 0;
}

.roomSelect ul li:last-child {
    border-bottom: 0;
}

.rowRoomDia .rowRoomsList {
    background: #f6f7f7;
    width: 100%;
    height: 368px;
    overflow-y: auto;
    padding: .1px;
}

.rowRoomDia .rowRoomsList .wrap {
    padding: 20px 30px;
}

.rowRoomDia .rowRoomsList h3 {
    padding: 0;
    margin: 0;
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: normal;
}

.rowRoomDia .rowRoomsList .tag {
    cursor: pointer;
    min-width: 50px;
    text-align: center;
}
</style>
