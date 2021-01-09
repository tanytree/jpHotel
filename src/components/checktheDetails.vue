<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-31 16:57:07
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
                    <span style="font-size: 16px">{{$t('desk.order_livePeopleManegerment')}}</span>
                </div>
            </div>
            <div class="infoBlock" v-for="(roomInfo, topIndex) of inRoomList" :key="topIndex">
                <div class="roomItem">{{ roomInfo.room.houseNum }}/{{ roomInfo.room.roomTypeName }}</div>
                <el-form ref="form" :model="form" label-width="100px" inline>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item :label="$t('manager.hk_livePrice') + ':'">
                                <el-input v-model.number="roomInfo.headerObj.housePrice" size="small" style="width: 200px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.customer_livePeople')+ ':'">
                                <el-autocomplete
                                    style="width: 100px"
                                    v-model="roomInfo.headerObj.name"
                                    name="name"
                                    :fetch-suggestions="remoteMethod"
                                    :highlight-first-item="true"
                                    popper-class="popper-class"
                                    :trigger-on-focus="false"
                                    :placeholder="$t('desk.book_inputContent')"
                                    @select="changeName($event, roomInfo.headerObj)"
                                ></el-autocomplete>
                                <el-input
                                    style="width: 110px; margin-left: 10px"
                                    v-model="roomInfo.headerObj.pronunciation"
                                    :placeholder="$t('desk.home_nameA')"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.customer_sex')+ ':'">
                                <el-radio-group v-model="roomInfo.headerObj.sex">
                                    <el-radio v-for="(item, key, index) of $t('commons.F_sex')" :label="key" :key="index">{{ item }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.order_guestKind')+ ':'">
                                <el-select v-model="roomInfo.headerObj.customerType" size="small" style="width:200px">
                                    <el-option :value="key" v-for="(item,key,index) of $t('commons.customerTypes')" :label="item" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.customer_documentType')+ ':'">
                                <el-select v-model="roomInfo.headerObj.idcardType" size="small" :placeholder="$t('commons.selectIdCardType')" style="width: 200px">
                                    <el-option v-for="(value, key) in $t('commons.idCardType')" :label="value" :value="key" :key="key"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.customer_documentNum')+ ':'">
                                <el-input :placeholder="$t('desk.order_inputCardNum')" v-model="roomInfo.headerObj.idcard" size="small" style="width: 200px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="E-mail:">
                                <el-input :placeholder="$t('commons.pleaseEnter')" v-model="roomInfo.headerObj.email" size="small" style="width: 180px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.customer_region')+ ':'">
                                <el-input style="width:200px" :placeholder="$t('desk.customer_pleaceInput')" v-model="roomInfo.headerObj.region" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('desk.order_liveAddress')+ ':'">
                                <el-input v-model="roomInfo.headerObj.homeAddressZip1" size="small" @blur="checkNextcode(roomInfo.headerObj.homeAddressZip1)" style="width: 80px"></el-input>
                                <span style="margin: 0 5px">-</span>
                                <el-input v-model="roomInfo.headerObj.homeAddressZip2" size="small" @blur="checkAddress(roomInfo.headerObj.homeAddressZip1,roomInfo.headerObj.homeAddressZip2,'addressA',roomInfo)" style="width:80px"></el-input>
                                <el-input :placeholder="$t('desk.customer_zipcodeTo')" v-model="roomInfo.headerObj.homeAddress" size="small" style="width: 300px; margin-left: 10px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.order_homePhone')+ ':'">
                                <el-input :placeholder="$t('desk.customer_pleaceInput')" v-model="roomInfo.headerObj.homeMobile" size="small" style="width: 180px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.home_phoneNum')+ ':'">
                                <el-input style="width:200px" :placeholder="$t('desk.customer_pleaceInput')" v-model="roomInfo.headerObj.phone" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.customer_unitName')+ ':'">
                                <el-input :placeholder="$t('commons.pleaseEnter')" v-model="roomInfo.headerObj.enterName" size="small" style="width: 95px"></el-input>
                                <el-input :placeholder="$t('desk.customer_faying')" v-model="roomInfo.headerObj.enterPinyin" size="small" style="width: 95px; margin-left: 5px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.customer_unitPhone')+ ':'">
                                <el-input :placeholder="$t('commons.pleaseEnter')" v-model="roomInfo.headerObj.enterMobile" size="small" style="width: 200px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('desk.customer_unitAddress')+ ':'">
                                <el-input v-model="roomInfo.headerObj.enterAddressZip1" size="small" style="width: 80px" @blur="checkNextcode(roomInfo.headerObj.enterAddressZip1)"></el-input>
                                <span style="margin: 0 5px">-</span>
                                <el-input v-model="roomInfo.headerObj.enterAddressZip2" @blur="checkAddress(roomInfo.headerObj.enterAddressZip1,roomInfo.headerObj.enterAddressZip2,'addressB',roomInfo)" size="small" style="width: 80px"></el-input>
                                <el-input :placeholder="$t('desk.customer_zipcodeTo')" v-model="roomInfo.headerObj.enterAddress" size="small" style="width: 300px; margin-left: 10px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.editor_asideBreakfast')+ ':'">
                                <el-select v-model="roomInfo.headerObj.attachMealId" size="small" style="width: 200px">
                                    <el-option :label="$t('manager.hk_donot')" value=""></el-option>
                                    <el-option v-for="item in breakfastList" :key="item.id" :label="item.mealName" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item :label="$t('desk.editor_asideDinner')+ ':'">
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
                <el-table ref="multipleTable" :data="roomInfo.personList" max-height="500px;" header-row-class-name="default" size="small">
                    <el-table-column :label="$t('desk.home_name')" align="center" width="230px">
                        <template slot-scope="{ row }">
                            <el-input v-model="row.name" size="small" style="width: 100px"></el-input>
                            <el-input :placeholder="$t('desk.customer_faying')" v-model="row.pronunciation" size="small" style="width: 100px; margin-left: 5px"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('desk.customer_documentType')"  width="130px">
                        <template slot-scope="{ row }">
                            <el-select v-model="row.idcardType" :placeholder="$t('commons.selectIdCardType')" size="small" style="width:120px;">
                                <el-option v-for="(value, key) in $t('commons.idCardType')" :label="value" :value="key" :key="key"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('desk.home_idCardNum')" width="130px">
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
                            <el-select v-model="row.customerType || '1'" size="small" style="width:100%">
                                <el-option :value="key" v-for="(item,key,index) of $t('commons.customerTypes')" :label="item" :key="index"></el-option>
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
                <el-button type="primary" @click="addPeople(roomInfo, topIndex)" style="margin-top: 10px">{{$t('desk.customer_toTheGuestA')}}</el-button>
            </div>

            <div class="bottomBottom">
                <el-button @click="goBack">{{$t('commons.cancel')}}</el-button>
                <el-button type="primary" @click="addPersonSubmit">{{$t('commons.confirm')}}</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    props: ["checkinType", "checkInDetail"],
    mounted() {
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
            this.currentRoom = this.$route.params.currentRoom || "";
            if (this.type == 3) {
                this.detailData = {
                    checkIn: {id: this.currentRoom.checkinId || this.currentRoom.checkinReserveId,},
                    inRoomList: [this.currentRoom],
                };
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
                        housePrice: room.realPrice || room.reservePrice,
                    },
                    room: room,
                };

                room.personList.forEach((person, index) => {
                    person.customerType = person.customerType
                        ? person.customerType + ""
                        : "1";
                    person.idcardType = person.idcardType
                        ? person.idcardType + ""
                        : "1";
                    person.sex = person.sex ? person.sex + "" : "1";
                });
                room.personList.forEach((person, index) => {
                    if (person.personType == 2) {
                        this.$F.merge(
                            object.headerObj,
                            this.$F.deepClone(person)
                        );
                        object.headerObj.checkinRoomId = room.roomId;
                        room.personList.splice(index, 1);
                    }
                });
                object.personList = room.personList || [];
                this.inRoomList.push(object);
            });
        }
        console.log(this.inRoomList);
    },
    data() {
        return {
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
                    idcardType: "1", //    证件类型 1身份证  2护照  Integer必填
                    idcard: "", //       证件号码  String必填
                    sex: "1", //           性别 1男  2女 3保密  Integer必填
                    mobile: "", //        手机号  String必填
                    id: "", //            入住人表id  传改值可以编辑入住人信息  String选填
                    housePrice: "", //    住宿价格   double必填
                    customerType: "", //  客人分类  1大人 2儿童A（小学5年级以上）  3儿童B（3岁至小学5年级） 4儿童C（0至3岁不占床）   int必填
                    attachMealId: "", //  附餐id-早餐 （附餐列表中获取） string选填
                    attachMealIdDinner: "", //  附餐id-晚餐 （附餐列表中获取） string选填
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
                },
                //
                //         checkinRoomId 房间id  int必填
                //         *                                           name          姓名  String必填
                //             *                                           pronunciation 姓名发音String必填
                //         *                                           idcardType    证件类型 1身份证  2护照  Integer必填
                //             *                                           idcard        证件号码  String必填
                //             *                                           sex           性别 1男  2女 3保密  Integer必填
                //             *                                           mobile        手机号  String必填
                //             *                                           id            入住人表id  传改值可以编辑入住人信息  String选填
                //         *                                           housePrice    住宿价格   double必填
                //             *                                           customerType  客人分类  1大人 2儿童A（小学5年级以上）  3儿童B（3岁至小学5年级） 4儿童C（0至3岁不占床）   int必填
                // *                                           attachMealId  附餐id-早餐 （附餐列表中获取） string选填
                // *                                           attachMealIdDinner  附餐id-晚餐 （附餐列表中获取）
            },
            tableData: [],
            //附餐列表
            breakfastList: [], //早餐
            dinnerList: [], //晚餐
        };
    },

    created() {
        this.fetchHotelattaChmealList();
    },

    methods: {
        changeName(e, personInfo) {
            console.log(e);
            debugger
            if (e.name) {
                delete e['checkIn'];
                delete e['checkinId'];
                delete e['checkinRoomId'];
                delete e['createTime'];
                e.sex = e.sex ? e.sex.toString() : '1';
                this.$F.removeNullKey(e, true);
                console.log(JSON.parse(JSON.stringify(personInfo)))
                console.log(JSON.parse(JSON.stringify(e)))
                debugger
                this.$F.merge(personInfo, e);
            } else {
                this.checkInForm.name = e;
            }
        },

        remoteMethod(query, cb) {
            let params = {
                name: query,
                searchType: 1,
                pageIndex: 1,
                filter: true,
                pageSize: 999,
                paging: false,
            };
            this.$F.doRequest(
                this,
                "/pms/checkin/hotel_checkin_person_list",
                params,
                (res) => {
                    this.options = res.personList || [];
                    this.options.forEach((element) => {
                        element.value =
                            element.name +
                            "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
                            (element.mobile || "") +
                            "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
                            (element.idcard ? element.idcard.slice(-4) : "");
                    });
                    cb(this.options);
                    this.$forceUpdate();
                }
            );
        },
        checkNextcode(code1) {
            if (!code1 || code1.length !== 3) {
                this.$message({
                    message: this.$t("desk.customer_sureZipcode"),
                    type: "warning",
                });
            }
        },
        // 输入邮编检索地址
        checkAddress(code1, code2, type, roomInfo) {
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
                    this.$message({
                        message: this.$t("desk.customer_sureZipcode"),
                        type: "warning",
                    });
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
                idcardType: "1",
            });
            console.log(this.inRoomList);
            this.$forceUpdate();
        },
        deletePerson(roomInfo, row, index) {
            roomInfo.personList.splice(index, 1);
        },
        //提交添加入住人
        addPersonSubmit() {
            let params = {};
            this.$F.merge(params, {
                checkInReserveId: this.detailData.checkIn.id,
                checkinId: this.detailData.checkIn.id,
            });
            let checkInRoomJson = [];
            this.inRoomList.forEach((room) => {
                let checkinInfo = {
                    roomId: room.room.roomId,
                    houseNum: room.room.houseNum,
                    roomTypeName: room.room.roomTypeName,
                    reservePrice: room.room.reservePrice,
                    realPrice: room.room.realPrice,
                    roomTypeId: room.room.roomTypeId,
                    headerObj: room.headerObj,
                    personList: room.personList,
                };
                checkInRoomJson.push(checkinInfo);
            });
            console.log(this.inRoomList);
            let checkInRoomIds = [];
            this.inRoomList.forEach((room) => {
                checkInRoomIds.push(room.room.id);
            })
            debugger
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
                            this.$F.doRequest(this, "/pms/reserve/reserve_to_checkin", params, (response) => {
                                this.$F.doRequest(this, "/pms/reserve/update_checkinroom_state", {
                                        checkInRoomIds: checkInRoomIds.join(','),
                                        state: 1
                                    }, (res) => {
                                        this.$router.push(
                                            `/orderdetail?id=${response.checkinId}`
                                        );
                                    }
                                );
                            });
                        }
                    }
                );
            }
        },
        fetchHotelattaChmealList() {
            this.$F.doRequest(
                this,
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
