<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-02 09:51:28
 * @FilePath: \jiudian\src\components\checktheDetails.vue
 -->
<template>
    <div>
        <el-card>
            <!-- 头部导航 -->
            <div slot="header" v-if="type != 'checkin'">
                <div class="headerBox">
                    <span class="point" @click="goBack">{{$t('desk.order_bookOrderInfo')}}</span>
                    <span style="margin: 0 5px">></span>
                    <span style="font-size: 16px">{{ifMeeting==3? $t('desk.order_livePeopleManegermentA'):$t('desk.order_livePeopleManegerment')}}</span>
                </div>
            </div>
            <div class="infoBlock" v-for="(roomInfo, topIndex) of inRoomList" :key="topIndex">
                <div class="roomItem">{{ roomInfo.room.houseNum }}/{{ roomInfo.room.roomTypeName }}</div>
                <el-form ref="form" :model="form" label-width="130px" inline>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item :label="(ifMeeting==3?$t('desk.home_onePeopleLiveA'):$t('manager.hk_livePrice'))+':'">
<!--                                <el-input v-model.number="roomInfo.headerObj.housePrice" size="small" style="width: 200px"></el-input>-->
                                <el-select v-model="roomInfo.headerObj.housePrice" :class="roomInfo.headerObj.housePrice === 'defined' ? 'width-100' : 'width-200'">
                                    <el-option v-for="(item,i) in roomInfo.priceList" :key="i" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                                <el-input v-if="roomInfo.headerObj.housePrice === 'defined'" v-model.number="roomInfo.headerObj.definedPrice" size="small" type="number"
                                          style="width: 110px; margin-left: 10px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="(ifMeeting==3?$t('desk.customer_livePeopleA'):$t('desk.customer_livePeople'))+':'">
                                <el-autocomplete
                                    style="width: 100px"
                                    v-model="roomInfo.headerObj.name"
                                    name="name"
                                    :fetch-suggestions="remoteMethod"
                                    :highlight-first-item="true"
                                    popper-class="popper-class"
                                    :trigger-on-focus="false"
                                    :placeholder="$t('desk.book_inputContentA')"
                                    @select="changeName($event, roomInfo.headerObj, topIndex)"
                                ></el-autocomplete>
                                <el-input style="width: 110px; margin-left: 10px" v-model="roomInfo.headerObj.pronunciation" :placeholder="$t('desk.customer_namePYA')" @keyup.native="headerObjChange(topIndex)"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.customer_sex')+ ':'">
                                <el-radio-group v-model="roomInfo.headerObj.sex" @change="headerObjChange(topIndex)">
                                    <el-radio v-for="(item, key, index) of $t('commons.F_sex')" :label="key" :key="index">{{ item }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.order_guestKind')+ ':'">
                                <el-select v-model="roomInfo.headerObj.customerType" size="small" style="width:200px" @change="headerObjChange(topIndex)">
                                    <el-option :value="key" v-for="(item,key,index) of $t('commons.customerTypes')" :label="item" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.customer_documentTypeA')+ ':'">
                                <el-select v-model="roomInfo.headerObj.idcardType" size="small" :placeholder="$t('commons.selectIdCardType')" style="width: 200px" @change="headerObjChange(topIndex)">
                                    <el-option v-for="(value, key) in $t('commons.idCardType')" :label="value" :value="key" :key="key"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.home_idCardNumA')+ ':'">
                                <el-input :placeholder="$t('desk.order_inputCardNum')" v-model="roomInfo.headerObj.idcard" size="small" style="width: 200px" @keyup.native="headerObjChange(topIndex)"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="E-mail:">
                                <el-input :placeholder="$t('commons.pleaseEnter')" v-model="roomInfo.headerObj.email" size="small" style="width: 180px"
                                          @keyup.native="headerObjChange(topIndex)"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.customer_region')+ ':'">
                                <el-input style="width:200px" :placeholder="$t('desk.customer_pleaceInput')" v-model="roomInfo.headerObj.region" size="small" @keyup.native="headerObjChange(topIndex)"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('desk.order_liveAddress')+ ':'">
                                <el-input v-model="roomInfo.headerObj.homeAddressZip1" size="small" maxlength="3" @keyup.native="checkNextcode(roomInfo.headerObj.homeAddressZip1, topIndex)" style="width: 80px"></el-input>
                                <span style="margin: 0 5px">-</span>
                                <el-input v-model="roomInfo.headerObj.homeAddressZip2" size="small" maxlength="4" @keyup.native="checkAddress(roomInfo.headerObj.homeAddressZip1,roomInfo.headerObj.homeAddressZip2,'addressA',roomInfo, topIndex)" style="width:80px"></el-input>
                                <el-input :placeholder="$t('desk.customer_zipcodeTo')" v-model="roomInfo.headerObj.homeAddress" size="small" style="width: 300px; margin-left: 10px" @keyup.native="headerObjChange(topIndex)"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.order_homePhone')+ ':'">
                                <el-input :placeholder="$t('desk.customer_pleaceInput')" v-model="roomInfo.headerObj.homeMobile" size="small" style="width: 180px" @keyup.native="headerObjChange(topIndex)"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.home_phoneNum')+ ':'">
                                <el-input style="width:200px" :placeholder="$t('desk.customer_pleaceInput')" v-model="roomInfo.headerObj.phone" size="small" @keyup.native="headerObjChange(topIndex)"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.customer_unitName')+ ':'">
                                <el-input :placeholder="$t('commons.pleaseEnterA')" v-model="roomInfo.headerObj.enterName" size="small" style="width: 95px" @keyup.native="headerObjChange(topIndex)"></el-input>
                                <el-input :placeholder="$t('desk.customer_faying')" v-model="roomInfo.headerObj.enterPinyin" size="small" style="width: 95px; margin-left: 5px" @keyup.native="headerObjChange(topIndex)"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.customer_unitPhone')+ ':'">
                                <el-input :placeholder="$t('commons.pleaseEnter')" v-model="roomInfo.headerObj.enterMobile" size="small" style="width: 200px" @keyup.native="headerObjChange(topIndex)"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('desk.customer_unitAddress')+ ':'">
                                <el-input v-model="roomInfo.headerObj.enterAddressZip1" size="small" style="width: 80px" maxlength="3" @keyup.native="checkNextcode(roomInfo.headerObj.enterAddressZip1, topIndex)"></el-input>
                                <span style="margin: 0 5px">-</span>
                                <el-input v-model="roomInfo.headerObj.enterAddressZip2" maxlength="4"  @keyup.native="checkAddress(roomInfo.headerObj.enterAddressZip1,roomInfo.headerObj.enterAddressZip2,'addressB',roomInfo, topIndex)" size="small" style="width: 80px"></el-input>
                                <el-input :placeholder="$t('desk.customer_zipcodeTo')" v-model="roomInfo.headerObj.enterAddress" size="small" style="width: 300px; margin-left: 10px" @keyup.native="headerObjChange(topIndex)"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" v-if="ifMeeting!=3">
                            <el-form-item :label="$t('desk.editor_asideBreakfast')+ ':'">
                                <el-select v-model="roomInfo.headerObj.attachMealId" size="small" style="width: 200px">
                                    <el-option :label="$t('manager.hk_donot')" value=""></el-option>
                                    <el-option v-for="item in breakfastList" :key="item.id" :label="item.mealName" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.editor_asideDinner')+ ':'" >
                                <el-select v-model="roomInfo.headerObj.attachMealIdDinner" size="small" style="width: 200px">
                                    <el-option :label="$t('manager.hk_donot')" value=""></el-option>
                                    <el-option v-for="item in dinnerList" :key="item.id" :label="item.mealName" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="overLine"></div>
                <!--表格数据 -->
                <el-table v-if="ifMeeting!=3" ref="multipleTable" :data="roomInfo.personList" max-height="500px;" header-row-class-name="default" size="small">
                    <el-table-column :label="$t('desk.home_nameD')" align="center" width="230px">
                        <template slot-scope="{ row }">
                            <el-input v-model="row.name" size="small" style="width: 100px"></el-input>
                            <el-input :placeholder="$t('desk.customer_faying')" v-model="row.pronunciation" size="small" style="width: 100px; margin-left: 5px"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('desk.customer_documentTypeA')"  width="130px">
                        <template slot-scope="{ row }">
                            <el-select v-model="row.idcardType" :placeholder="$t('commons.selectIdCardType')" size="small" style="width:120px;">
                                <el-option v-for="(value, key) in $t('commons.idCardType')" :label="value" :value="key" :key="key"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('desk.home_idCardNumA')" width="130px">
                        <template slot-scope="{ row }">
                            <el-input v-model="row.idcard" size="small" style="width: 120px"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('desk.customer_sex')" width="220px">
                        <template slot-scope="{ row }">
                            <el-radio-group v-model="row.sex">
                                <el-radio v-for="(item, key, index) of $t('commons.F_sex')" :label="key" :key="index">{{ item }}</el-radio>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('desk.order_guestKind')">
                        <template slot-scope="{ row }">
                            <el-select v-model="row.customerType" size="small" style="width:100%">
                                <el-option :value="key" v-for="(item,key) of $t('commons.customerTypes')"   :label="item" :key="key"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('desk.editor_asideBreakfast')">
                        <template slot-scope="{ row }">
                            <el-select v-model="row.attachMealId" style="width:100%" size="small">
                                <el-option :label="$t('manager.hk_donot')" value=""></el-option>
                                <el-option v-for="item in breakfastList" :key="item.id" :label="item.mealName" :value="item.id"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('desk.editor_asideDinner')">
                        <template slot-scope="{ row }">
                            <el-select v-model="row.attachMealIdDinner" style="width:100%" size="small">
                                <el-option :label="$t('manager.hk_donot')" value=""></el-option>
                                <el-option v-for="item in dinnerList" :key="item.id" :label="item.mealName" :value="item.id"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column width="60px">
                        <template slot-scope="{ row, $index }">
                            <el-button type="text" size="mini" @click="deletePerson(roomInfo, row, $index)">{{$t('commons.delete')}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button v-if="ifMeeting!=3" type="primary" @click="addPeople(roomInfo, topIndex)" style="margin-top: 10px">{{$t('desk.customer_toTheGuestA')}}</el-button>
            </div>

            <div class="bottomBottom">
                <el-button @click="goBack">{{$t('commons.cancel')}}</el-button>
                <el-button type="primary" @click="addPersonSubmit">{{$t('commons.confirm')}}</el-button>
            </div>
        </el-card>

        <!-- 脏房/维修房提醒 -->
        <el-dialog
            top="0"
            :show-close="false"
            :title="$t('desk.home_roomCardOpreat')"
            :visible.sync="checkInRoomTipVisible"
            width="60%"
        >
            <div>{{checkInRoomTip}}</div>
            <div class="bottomBottom">
                <el-button @click="goBack">{{$t('commons.cancel')}}</el-button>
                <el-button type="primary" @click="checkInRoomTipConfirm">{{$t('commons.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ["checkinType"],
    mounted() {
      this.ifMeeting = this.$route.params.ifMeeting;
      console.log(this.ifMeeting);
        // type: checkin: 前台入住  1：入住人管理  2：批量入住  3：单个房间入住
        if (this.checkinType) {
            //当是从前台办理过来的请求
            this.type = "checkin";
            let checkInDetail = this.$F.deepClone(this.checkInDetail);
            checkInDetail.forEach((item) => {
                if (item.headerObj) {
                    item.headerObj.personType = 2; //主入住人
                    item.personList.unshift(item.headerObj);
                }
            });
            this.detailData = {
                checkIn: {
                    id: "",
                },
                inRoomList: checkInDetail,
            };
        } else {
            this.type = this.$route.params.type;
            this.currentRoom = this.$route.params.currentRoom || {};
            debugger
            if (this.type == 3) {
                this.detailData = this.$F.deepClone(
                    this.$route.params.detailData
                );
                this.detailData.inRoomList = [this.currentRoom];
                // this.detailData = {
                //     checkIn: {id: this.currentRoom.checkinId || this.currentRoom.checkinReserveId,},
                //     inRoomList: [this.currentRoom],
                // };
            } else {
                this.detailData = this.$F.deepClone(
                    this.$route.params.detailData
                );
                if (this.detailData.inRoomList && this.detailData.inRoomList.length > 0) {
                    let inRoomListTemp = [];
                    this.detailData.inRoomList.forEach((room) => {
                        if (room.state != 1) {
                            inRoomListTemp.push(room);
                        }
                    })
                    this.detailData.inRoomList = inRoomListTemp;
                }
            }
        }

        this.inRoomList = [];
        if (this.detailData.inRoomList && this.detailData.inRoomList.length > 0) {
            this.detailData.inRoomList.forEach((room) => {
                let object = {
                    headerObj: {
                        checkinRoomId: room.roomId,
                        housePrice: room.housePrice || room.realPrice || room.reservePrice || room.roomMarkPrice,
                        name: this.detailData.checkIn.name,
                        pronunciation: this.detailData.checkIn.pronunciation,
                        mobile: this.detailData.checkIn.mobile,
                        region: this.detailData.checkIn.region,
                        enterMobile: this.detailData.checkIn.enterMobile,
                        homeMobile: this.detailData.checkIn.homeMobile,
                        sex: this.detailData.checkIn.sex || '1',
                    },
                    room: room,
                };
                this.fetchHousePrice(room.roomTypeId, object);
                room.personList.forEach((person, index) => {
                    person.customerType = person.customerType ? person.customerType + "" : "1";
                    person.idcardType = person.idcardType ? person.idcardType + "" : "1";
                    person.sex = person.sex ? person.sex + "" : "1";
                });
                room.personList.forEach((person, index) => {
                    if (person.personType == 2) {
                        this.$F.merge(
                            object.headerObj,
                            this.$F.deepClone(person)
                        );
                        object.headerObj.checkinRoomId = room.roomId;
                        object.headerObj.definedPrice = person.housePrice || 0;
                        room.personList.splice(index, 1);
                    }
                });
                object.personList = room.personList || [];
                if (room.personList) {

                }
                this.inRoomList.push(object);
            });
        }
        console.log(this.inRoomList);
    },
    data() {
        return {
            checkInRoomTip: '',
            checkInRoomTipVisible: false,
            checkInRoomTipConfirmFlag: false,
            inRoomList: [], //入住人主要信息 包括主入住人和同来宾客
            type: 1, //1： 入住人管理   2： 添加入住人 入住
            detailData: {}, //订单信息
            currentRoom: "", //当前房间
            form: {
                name: "",
                region: "",
                resource: "",
                desc: "",
            },
            checkinInfo: {
                // checkinId: '',  //预订单或订单id
                personList: [], //入住人列表
                headerObj: {
                    //  主入住人对象   json字符串
                    checkinRoomId: "", //房间id  int必填
                    name: "", //          姓名  String必填
                    pronunciation: "", // 姓名发音String必填
                    idcardType: "2", //    证件类型 1身份证  2护照  Integer必填
                    idcard: "", //       证件号码  String必填
                    sex: "1", //           性别 1男  2女 3保密  Integer必填
                    mobile: "", //        手机号  String必填
                    id: "", //            入住人表id  传改值可以编辑入住人信息  String选填
                    housePrice: "", //    住宿价格   double必填
                    customerType: "", //  客人分类  1大人 2儿童A（小学5年级以上）  3儿童B（3岁至小学5年级） 4儿童C（0至3岁不占床）   int必填
                    // attachMealId: "", //  附餐id-早餐 （附餐列表中获取） string选填
                    // attachMealIdDinner: "", //  附餐id-晚餐 （附餐列表中获取） string选填
                    email: "", //      邮箱  String选填
                    region: "", //      地区  String选填
                    homeAddressZip1: "", //      住家地址邮编1  String选填
                    homeAddressZip2: "", //      住家地址邮编2  String选填
                    homeAddress: "", //      住家地址  String选填
                    homeMobile: "", //      住家号码  String选填
                    phone: "", //      手机号  String选填
                    enterName: "", //      单位名称  String选填
                    enterPinyin: "", //      单位发音  String选填
                    enterMobile: "", //      单位电话  String选填
                    enterAddressZip1: "", //      单位地址邮编1  String选填
                    enterAddressZip2: "", //      单位地址邮编2  String选填
                    enterAddress: "", //      单位地址  String选填
                    definedPrice: 0,
                },
            },
            tableData: [],
            //附餐列表
            breakfastList: [], //早餐
            dinnerList: [], //晚餐
            ifMeeting:'',
        };
    },

    created() {
        this.fetchHotelattaChmealList();
    },

    methods: {
        checkInRoomTipConfirm() {
            this.checkInRoomTipConfirmFlag = true;
            this.addPersonSubmit();
        },
        headerObjChange(index) {
            this.$set(this.inRoomList, index, this.inRoomList[index]);
        },
        fetchHousePrice(roomTypeId, object) {
            let params = {
                strategyTime: new Date().Format("yyyy-MM-dd"),
                priceCalend: 2,
                timeType: 3,
                roomTypeId: roomTypeId
            };
            this.$F.doRequest(
                this, "/pms/hotel/hotel_price_guest_chamber_list", params, (res) => {
                  if(res.roomType.personPrice){
                     let array = res.roomType.personPrice.split(',');
                    object.priceList = [];
                    array.forEach((price, i) => {
                        object.priceList.push({
                            label: (i + 1) + this.$t('manager.hk_peopleLive') + ': ' + price,
                            value: price
                        })
                    })
                    object.priceList.push({
                        label: this.$t('desk.book_theCustomB'),
                        value: 'defined'
                    })
                    this.$forceUpdate()
                  }

                }
            )
        },

        priceChange(value) {
            if (value === 'defined') {

            }
        },

        changeName(e, personInfo, index) {
            if (e.name) {
                debugger
                delete e['checkIn'];
                delete e['checkinId'];
                delete e['checkinRoomId'];
                delete e['createTime'];
                delete e['attachMealId'];
                delete e['attachMealIdDinner'];
                delete e['housePrice'];
                e.sex = e.sex ? e.sex.toString() : '1';
                this.$F.removeNullKey(e, true);
                this.$F.merge(personInfo, e);
                personInfo.phone = e.mobile;
            } else {
                this.checkInForm.name = e;
            }
            setTimeout( () => {
                this.$forceUpdate();
                this.$set(this.inRoomList, index, this.inRoomList[index]);
            }, 100)

        },

        remoteMethod(query, cb) {
            // let params = {
            //     name: query,
            //     searchType: 1,
            //     pageIndex: 1,
            //     filter: true,
            //     pageSize: 999,
            //     paging: false,
            //     storesNum: '',
            // };
            let searchForm = {
                storesNum: '',
                name: query,
                pageIndex: 1, //当前页
                pageSize: 100, //页数
                paging: false,
            };
            this.$F.doRequest(
                this,
                // "/pms/checkin/hotel_checkin_person_list",
                "/pms/guestarchives/guest_archives_list",
                searchForm,
                (res) => {
                    this.options = res.personList || res.guestList || [];
                    this.options.forEach((element) => {
                        element.value = `${element.name}【${element.pronunciation}】` +
                            "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
                            (element.mobile || "");
                    });
                    cb(this.options);
                    this.$forceUpdate();
                }
            );
        },
        checkNextcode(code1, index) {
            this.$set(this.inRoomList, index, this.inRoomList[index]);
            if (!code1 || code1.length !== 3) {
                // this.$message({
                //     message: this.$t("desk.customer_sureZipcode"),
                //     type: "warning",
                // });
            }
        },
        // 输入邮编检索地址
        checkAddress(code1, code2, type, roomInfo, index) {
            this.$set(this.inRoomList, index, this.inRoomList[index]);
            console.log(roomInfo);
            if (code1 && code2) {
                if (code1.length == 3 && code2.length == 4) {
                    this.$F.commons.zipCode(code1, code2, (res) => {
                        if (res.results.length > 0) {
                            switch (type) {
                                case "addressA":
                                    roomInfo.headerObj.homeAddress =
                                        res.results[0].address1 +
                                        res.results[0].address2 +
                                        res.results[0].address3;
                                    break;
                                case "addressB":
                                    roomInfo.headerObj.enterAddress =
                                        res.results[0].address1 +
                                        res.results[0].address2 +
                                        res.results[0].address3;
                                    break;
                            }
                            this.$forceUpdate();
                        } else {
                            switch (type) {
                                case "addressA":
                                    roomInfo.headerObj.homeAddress = "";
                                    break;
                                case "addressB":
                                    roomInfo.headerObj.enterAddress = "";
                                    break;
                            }
                            this.$message.warning(this.$t("desk.customer_sureZipcode"));
                            this.$forceUpdate();
                        }
                    });
                } else {
                    // this.$message({
                    //     message: this.$t("desk.customer_sureZipcode"),
                    //     type: "warning",
                    // });
                }
            } else {
                this.$message({
                    message: this.$t("desk.customer_sureZipcode"),
                    type: "warning",
                });
            }
        },
        addPeople(roomInfo) {
            roomInfo.personList.push({
                checkinRoomId: roomInfo.room.roomId,
                housePrice: roomInfo.headerObj.housePrice,
                sex: "1",
                idcardType: "2",
            });
            console.log(this.inRoomList);
            this.$forceUpdate();
        },
        deletePerson(roomInfo, row, index) {
          this.$confirm(this.$t("commons.confirm_deleteC"),  this.$t("commons.tip_desc"), {
          confirmButtonText: this.$t("commons.confirm"),
          cancelButtonText: this.$t("commons.cancel"),
          type: 'warning'
        }).then(() => {
           roomInfo.personList.splice(index, 1);
        }).catch(() => {
          return false;
        });
        },
        //提交添加入住人
        addPersonSubmit() {
            let params = {};
            this.$F.merge(params, {
                checkInReserveId: this.detailData.checkIn.id,
                checkinId: this.detailData.checkIn.id,
            });
            let checkInRoomJson = [], checkinId = '';

            this.inRoomList.forEach((room) => {
                room.headerObj.housePrice = (room.headerObj.housePrice === 'defined' ? room.headerObj.definedPrice : room.headerObj.housePrice);
                let checkinInfo = {
                    roomId: room.room.roomId,
                    houseNum: room.room.houseNum,
                    roomTypeName: room.room.roomTypeName,
                    reservePrice: room.housePrice || room.definedPrice || room.room.reservePrice,
                    realPrice: room.housePrice || room.definedPrice || room.room.realPrice || room.room.roomMarkPrice,
                    roomTypeId: room.room.roomTypeId,
                    headerObj: room.headerObj,
                    personList: room.personList,
                };
                checkinId = room.room.checkinId;
                checkInRoomJson.push(checkinInfo);
            });
            debugger
            console.log(this.inRoomList);
            let checkInRoomIds = [];
            this.inRoomList.forEach((room) => {
                checkInRoomIds.push(room.room.id);
            })
            if (this.type == "checkin") {
                this.$emit("personCallback", checkInRoomJson);
            } else {
                this.$F.merge(params, {
                    checkInRoomJson: JSON.stringify(checkInRoomJson),
                });
                this.$F.doRequest(this, "/pms/checkin/live_in_person_batch", params, (data) => {
                        if (this.type == 1) {
                            this.$router.go(-1);
                        } else {
                            this.fetchRoomStatus( ()=> {
                                if (checkinId) {
                                    this.update_checkinroom_state(checkInRoomIds, checkinId);
                                } else {
                                    this.reserve_to_checkin(params, (response) => {
                                        this.update_checkinroom_state(checkInRoomIds, response.checkinId);
                                    })
                                }

                            })
                        }
                    }
                );
            }
        },

        update_checkinroom_state(checkInRoomIds, checkinId) {
            this.$F.doRequest(this, "/pms/reserve/update_checkinroom_state", {
                    checkInRoomIds: checkInRoomIds.join(','),
                    state: 1
                }, (res) => {
                    this.$router.push(
                        `/orderdetail?id=${checkinId}`
                    );
                }
            );
        },

        reserve_to_checkin(params, callback) {
            this.$F.doRequest(this, "/pms/reserve/reserve_to_checkin", params, (response) => {
                callback(response);
            });
        },

        fetchRoomStatus(callback) {
            if (this.checkInRoomTipConfirmFlag)
                callback();
            console.log(this.currentRoom);
            let roomIds = [];
            if (this.currentRoom && this.currentRoom.roomId) {
                roomIds.push(this.currentRoom.roomId);
            } else {
                this.detailData.inRoomList.forEach(room => {
                    roomIds.push(room.roomId);
                })
            }
            this.$F.doRequest(this, "/pms/hotel/hotel_room_detail",
                {
                    roomIds: roomIds,
                }, (res) => {
                    let dirtyRooms = res.filter((room) => {
                        return room.roomStatus == 2
                    }) || []
                    let serviceRooms = res.filter((room) => {
                        return room.roomStatus == 5
                    }) || []
                    if ((dirtyRooms && dirtyRooms.length > 0) || (serviceRooms && serviceRooms.length > 0)) {
                        let dirtyRoomsString = '', serviceRoomsString = '', dirtyRoomsArray = [], serviceRoomsArray = [];
                        dirtyRooms.forEach(dirtyRoom => {
                            dirtyRoomsArray.push(dirtyRoom.houseNum);
                        })
                        serviceRooms.forEach(dirtyRoom => {
                            serviceRoomsArray.push(dirtyRoom.houseNum);
                        })
                        this.checkInRoomTip = `清掃中/故障部屋状態のご確認，${dirtyRoomsArray.length > 0 ? (dirtyRoomsString.join('、') + 'は掃除中です，') : ''}
                        ${serviceRoomsArray.length > 0 ? (serviceRoomsArray.join('、') + 'は故障部屋です，') : ''} このままC/I処理続きますか`;
                        this.checkInRoomTipVisible = true;
                    } else
                        callback();
                }
            );
        },
        fetchHotelattaChmealList() {
            this.$F.doRequest(this,
                "/pms/hotelattachmeal/list",
                {
                    pageIndex: 1,
                    pageSize: 999,
                    state: 1, //1启用 2禁用
                },
                (res) => {
                    let hotelattaChmealList = res.list;
                    this.breakfastList =
                        hotelattaChmealList.filter((item) => {
                            return item.mealTime == 1;
                        }) || [];
                    this.dinnerList =
                        hotelattaChmealList.filter((item) => {
                            return item.mealTime == 2;
                        }) || [];
                    this.$forceUpdate();
                }
            );
        },
        goBack() {
            if (this.type != "checkin") {
                this.$router.go(-1);
            } else {
                this.$emit("personCallback", []);
            }
        },
    },
};
</script>

<style lang="less" scoped>

.width-200 {
    width: 200px;
}
.width-100 {
    width: 100px;
}
.headerBox {
    color: rgba(102, 102, 102, 100);
    font-size: 18px;
    span:nth-of-type(3) {
        font-weight: 600;
    }
    .point {
        cursor: pointer;
    }
}
.infoBlock {
    box-sizing: border-box;
    padding: 10px;
    border-radius: 4px;
    background-color: rgba(252, 252, 252, 1);
    border: 1px solid rgba(211, 211, 211, 1);
    .overLine {
        margin-bottom: 10px;
        height: 1px;
        border: 1px solid rgba(227, 227, 227, 1);
    }
    .roomItem {
        color: rgba(51, 51, 51, 100);
        font-size: 16px;
        font-weight: 500;
        margin: 10px 0;
        margin-top: 5px;
    }
}
.bottomBottom {
    text-align: right;
    margin-top: 10px;
    margin-right: 20px;
}
/***** */
.el-row {
    margin-bottom: 0px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
