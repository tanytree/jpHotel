<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-27 11:09:35
 * @FilePath: \jiudian\src\components\front\customer2.vue
 -->
<template>
    <div class="customer">
        <el-table
            :data="liveInPersonData"
            style="width: 100%;margin-bottom: 20px;"
            :row-key="getRowKey"
            border
            default-expand-all
            :tree-props="{children: 'personList', hasChildren: 'hasChildren'}">
            <el-table-column :label="$t('desk.customer_roomKind')"  width="130">
                <template slot-scope="scope">
                <span v-if="!scope.row.isChild">
                    {{scope.row.isChild?'':scope.row.houseNum}}
                </span>
                <span v-if="!scope.row.isChild">/</span>
                <span v-if="!scope.row.isChild">
                    {{scope.row.isChild?'':scope.row.roomTypeName}}
                </span>
                </template>
            </el-table-column>
            <el-table-column prop="housePrice" :label="$t('manager.hk_livePrice')">
                <template slot-scope="{row, $index}">
                    <el-row v-if="!row.isChild">
                        <el-input v-model.number="row.realPrice" :placeholder="$t('commons.pleaseEnter')" @keyup.native="personListKeyup(row, 'realPrice', row.name, $index)"></el-input>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column :label="$t('boss.loginDetail_name')" width="232">
                <template slot-scope="{row, $index}">
                    <el-row>
                        <el-input v-model="row.name" @keyup.native="personListKeyup(row, 'name', row.name, $index)"
                                  style="width: 100px;margin-right: 10px" :placeholder="$t('desk.home_name')"></el-input>
                        <el-input v-model="row.pronunciation" @keyup.native="personListKeyup(row, 'pronunciation', row.pronunciation, $index)"
                                  style="width: 100px" :placeholder="$t('desk.customer_nameSpell')"></el-input>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column :label="$t('commons.idCardTypeDesc')">
                <template slot-scope="{row}">
                    <el-row>
                        <el-select v-model="row.idcardType" style="width:100%">
                            <el-option :value="key" v-for="(item,key,index) of $t('commons.idCardType')" :label="item" :key="index" ></el-option>
                        </el-select>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column :label="$t('desk.home_idCardNum')">
                <template slot-scope="{row}">
                    <el-row>
                        <el-input v-model="row.idcard"></el-input>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column :label="$t('desk.customer_sex')">
                <template slot-scope="{row}">
                    <el-row>
                        <el-select v-model="row.sex" style="width:100%">
                            <el-option v-for="(item,key,index) of $t('commons.F_sex')" :label="item" :value="key" :key="index"></el-option>
                        </el-select>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column :label="$t('desk.customer_guestType')">
                <template slot-scope="{row}">
                    <el-row>
                        <el-select v-model="row.customerType" style="width:100%">
                            <el-option :value="key" v-for="(item,key,index) of $t('commons.customerTypes')" :label="item" :key="index" ></el-option>
                        </el-select>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column :label="$t('desk.order_moblePhone')">
                <template slot-scope="{row}">
                    <el-row>
                        <el-input v-model="row.mobile" :placeholder="$t('commons.pleaseEnter')"></el-input>
                    </el-row>
                </template>
            </el-table-column>
            <!-- 附餐 -->
            <el-table-column :label="$t('desk.editor_asideBreakfast')">
                <template slot-scope="{row}">
                    <el-row>
                        <el-select v-model="row.attachMealId" style="width:100%">
                            <el-option
                                v-for="item in hotelattaChmealList"
                                :key="item.id"
                                :label="item.mealName"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-row>
                </template>
            </el-table-column>
            <!-- ---------- -->
             <el-table-column :label="$t('desk.editor_asideDinner')">
                <template slot-scope="{row}">
                    <el-row>
                        <el-select v-model="row.attachMealIdDinner" style="width:100%">
                            <el-option
                                v-for="item in hotelattaChmealList"
                                :key="item.id"
                                :label="item.mealName"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-row>
                </template>
            </el-table-column>
            <!-- 附餐 -->
            <el-table-column :label="$t('commons.operating')">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="del_live_in_person(scope.row, scope.$index)" v-if="scope.row.isChild">{{$t('commons.delete')}}</el-button>
                    <el-button type="text" v-if="!scope.row.isChild" size="mini" @click="addGuest(scope.row, scope.$index)"><!--@click="addItem_live_in_person(scope.$index,scope.row)"-->
                        <template>+{{$t('desk.customer_toTheGuest')}}</template>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="personSubmit()">{{ $t('commons.confirm') }}</el-button>
        </div>
    </div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import myMixin from '@/utils/filterMixin';
export default {
    mixins: [myMixin],
    props: ['roomInfo', 'type', 'detailData', 'liveData', 'checkinInfo'],
    computed: {
        ...mapState({
            token: state => state.user.token,
            userId: state => state.user.userId,
            msgKey: state => state.config.msgKey,
        })
    },
    data() {
        return {
            loading: false,
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [{checkIn: {}, inRoomList:[]}], //表格数据
            liveInPersonData: [],
            searchForm: {
                type: 3,
                checkinId: '',
                pageIndex: 1,
                pageSize: 999
            },

            //附餐列表
            hotelattaChmealList: []
        };
    },

    created() {
        this.liveInPersonData = this.$F.deepClone(this.liveData);
        //
        this.fetchHotelattaChmealList();
        this.$forceUpdate();
    },

    methods: {
        personListKeyup(object, key, value, index) {
            if (object.sysIndex || object.sysIndex === 0) {
                let index2 = 0;
                this.liveInPersonData.forEach((item, i) => {
                    if (item.roomId == object.roomId) {
                        index2 = i;
                    }
                })
                this.liveInPersonData[index2].personList[object.sysIndex][key] = value;
                this.$set(this.liveInPersonData, index2, this.liveInPersonData[index2]);
                this.$set(this.liveInPersonData[index2].personList, object.sysIndex, this.liveInPersonData[index2].personList[object.sysIndex]);
            }
        },
        fetchHotelattaChmealList() {
            this.$F.doRequest(this, '/pms/hotelattachmeal/list', {
                pageIndex: 1,
                pageSize: 999,
                state: 1,  //1启用 2禁用
            }, (res) => {
                this.hotelattaChmealList = res.list;
                this.$forceUpdate();
            })
        },
        getRowKey(row) {
            return row.id + row.roomId + row.houseNum;
        },
        personSubmit() {
            console.log(this.liveInPersonData)
            let checkInRoomJson = [];
            let personListJSONList = [];
            this.liveInPersonData.forEach(item => {
                if (!item.personList)
                    item.personList = [];
                let temp = {
                    // checkinRoomId: item.roomId,
                    roomTypeId: item.roomTypeId,
                    roomId: item.roomId,
                    reservePrice: item.realPrice || 0,
                    realPrice: item.realPrice || 0,
                    personList: item.personList || []
                }
                let tempObject = {
                    checkinRoomId: item.roomId,
                    name: item.name,
                    idcardType: item.idcardType,
                    idcard: item.idcard,
                    sex: item.sex,
                    mobile: item.mobile,
                    id: item.id || '',
                    customerType: item.customerType,  //客户类型
                    attachMealId: item.attachMealId,   //附餐-早餐
                    attachMealIdDinner:item.attachMealIdDinner, //附餐-晚餐
                    pronunciation: item.pronunciation,  //拼音
                    // housePrice: (temp.personList.length > 0 ? temp.personList[0].housePrice : 0)
                    housePrice: 0
                }
                temp.personList.unshift(tempObject);
                temp.personList.forEach(temp => {
                    delete temp['isChild'];
                    delete temp['sysIndex'];
                    delete temp['roomId'];
                })
                personListJSONList = personListJSONList.concat(temp.personList);
                checkInRoomJson.push(temp);
            })
            if (this.type == 'reserve') {
                let params = {};
                this.$F.merge(params, {
                    checkInReserveId: this.checkinInfo.id,
                });
                //预定房办理入住
                this.$F.doRequest(this, '/pms/reserve/reserve_to_checkin', params, (res) => {
                    //然后立即办理入住
                    params = {
                        checkinId: res.checkinId,
                        personListJson: JSON.stringify(this.liveInPersonData[0].personList),
                        personList: JSON.stringify(this.liveInPersonData[0].personList),
                    }
                    this.$F.doRequest(this, '/pms/checkin/live_in_person_batch', params, (data) => {
                        this.$emit('checkInCallback', res.checkinId);
                    })
                })
            } else if (this.type == 'order' || this.type == 'checkin'){
                this.$emit('personCallback', checkInRoomJson);
            } else {
                this.$emit('personCallback', personListJSONList);
            }

        },

        //添加同来宾客
        addGuest(row, index) {
            let newRow = this.$F.deepClone(row);
            let sysIndex = 0;
            for (let i = 0; i < this.liveInPersonData.length; i++) {
                let item = this.liveInPersonData[i];
                if (item.roomId == newRow.roomId) {
                    index = i;
                    break;
                }
            }
            if (! this.liveInPersonData[index].personList) {
                row.personList = [];
            }
            this.liveInPersonData[index].personList.push({
                roomId: newRow.roomId,
                name: '',
                checkinRoomId: newRow.roomId,
                isChild: true,
                idcardType: '2',
                idcard: '',
                sysIndex: this.liveInPersonData[index].personList.length,
                sex: '1',
                mobile: '',
                customerType: '1',  //客户类型
                attachMealId: '',   //附餐-早餐
                attachMealIdDinner:'',  //附餐-晚餐
                pronunciation: '',  //拼音
                housePrice: 0,    //房价
            });
            this.liveInPersonData.forEach((item, i) => {
                this.$set(this.liveInPersonData, i, this.liveInPersonData[i]);
            })
            this.$forceUpdate()
        },
        del_live_in_person(item, index) {
            let currentIndex = 0;
            for (let i = 0 ; i < this.liveInPersonData.length; i++) {
                currentIndex = i;
                if (this.liveInPersonData[i].personList && this.liveInPersonData[i].personList.length > 0) {
                    let personList = this.liveInPersonData[i].personList;
                    for (let j = 0 ; j < personList.length; j++) {
                        if (personList[j].roomId == item.roomId) {
                            personList.splice(j, 1);
                        }
                    }
                }
            }
            this.$set(this.liveInPersonData, currentIndex, this.liveInPersonData[currentIndex]);
            this.$forceUpdate()
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
