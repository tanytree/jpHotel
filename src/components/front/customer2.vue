<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-10 16:36:39
 * @FilePath: /jiudian/src/views/market/orders/bookingcoms/customer.vue
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
            <el-table-column label="房号/房型" width="200">
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
            <el-table-column prop="realPrice" label="房价">
            </el-table-column>
            <el-table-column label="姓名" width="150">
                <template slot-scope="{row, $index}">
                    <el-row>
                        <el-input v-model="row.name" placeholder="请输入姓名" @keyup.native="personListKeyup(row, 'name', row.name, $index)"></el-input>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column prop="groupName" label="证件类型">
                <template slot-scope="{row}">
                    <el-row>
                        <el-select v-model="row.idcardType" style="width:100%">
                            <el-option :value="key" v-for="(item,key,index) of $t('commons.idCardType')" :label="item" :key="index" ></el-option>
                        </el-select>
                    </el-row>
                </template>

            </el-table-column>
            <el-table-column prop="groupName" label="证件号码">
                <template slot-scope="{row}">
                    <el-row>
                        <el-input v-model="row.idcard" placeholder="请输入证件号码"></el-input>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column label="性别">
                <template slot-scope="{row}">
                    <el-row>
                        <el-select v-model="row.sex" style="width:100%">
                            <el-option v-for="(item,key,index) of $t('commons.F_sex')" :label="item" :value="key" :key="index"></el-option>
                        </el-select>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column prop="groupName" label="手机号">
                <template slot-scope="{row}">
                    <el-row>
                        <el-input v-model="row.mobile" placeholder="请输入手机号"></el-input>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="del_live_in_person(scope.row, scope.$index)" v-if="scope.row.isChild">删除</el-button>
                    <el-button type="text" v-if="!scope.row.isChild" size="mini" @click="addGuest(scope.row, scope.$index)"><!--@click="addItem_live_in_person(scope.$index,scope.row)"-->
                        <template>+同来宾客</template>
                        <!--                    <template v-else>+入住人</template>-->
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="personSubmit()">确定</el-button>
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
            }
        };
    },

    created() {
        console.log(this.liveData);
        console.log(this.checkinInfo);
        this.liveInPersonData = this.$F.deepClone(this.liveData);
        this.$forceUpdate();
    },

    methods: {

        personListKeyup(object, key, value, index) {
            debugger
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
        getRowKey(row) {
            return row.id + row.roomId + row.houseNum;
        },
        personSubmit() {
            console.log(this.liveInPersonData)
            let checkInRoomJson = [];
            let personListJSONList = [];
            this.liveInPersonData.forEach(item => {
                if (!item.personList)
                    item.personList;
                let temp = {
                    checkinRoomId: item.roomId,
                    roomTypeId: item.roomTypeId,
                    roomId: item.roomId,
                    reservePrice: item.reservePrice,
                    realPrice: item.realPrice,
                    personList: item.personList || []
                }
                let tempObject = {
                    checkinRoomId: item.roomId,
                    name: item.name,
                    idcardType: item.idcardType,
                    idcard: item.idcard,
                    sex: item.sex,
                    mobile: item.mobile,
                    id: item.id
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
            debugger
            if (this.type == 'reserve') {
                let params = {};
                this.$F.merge(params, {
                    checkInReserveId: this.checkinInfo.id,
                });
                //预定房办理入住
                this.$F.doRequest(this, '/pms/reserve/reserve_to_checkin', params, (res) => {
                    // res.checkinId
                    //然后立即办理入住
                    params = {
                        checkinId: res.checkinId,
                        personListJson: JSON.stringify(this.liveInPersonData[0].personList),
                        personList: JSON.stringify(this.liveInPersonData[0].personList),
                    }
                    this.$F.doRequest(this, '/pms/checkin/live_in_person_batch', params, (res) => {

                    })
                })
            } else if (this.type == 'order'){
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
            debugger
            if (! this.liveInPersonData[index].personList) {
                row.personList = [];
            }
            this.liveInPersonData[index].personList.push({
                roomId: newRow.roomId,
                name: '',
                checkinRoomId: newRow.roomId,
                isChild: true,
                idcardType: '1',
                idcard: '',
                sysIndex: this.liveInPersonData[index].personList.length,
                sex: '1',
                mobile: '',
            });
            this.liveInPersonData.forEach((item, i) => {
                this.$set(this.liveInPersonData, i, this.liveInPersonData[i]);
            })
            this.$forceUpdate()
        },

        editItem_live_in_person(item) {
            if (!item.name) {
                this.$message.error('请填写姓名');
                return
            }
            if (!item.idcardType) {
                this.$message.error('请选择证件类型');
                return
            }
            if (!item.idcard) {
                this.$message.error('请填写证件号');
                return
            }
            if (!item.sex) {
                this.$message.error('请选择性别');
                return
            }
            if (!item.mobile) {
                this.$message.error('请输入手机号');
                return
            }
            let params = {
                checkinRoomId: item.checkinRoomId,
                name: item.name,
                idcardType: item.idcardType,
                idcard: item.idcard,
                sex: item.sex,
                mobile: item.mobile,
                checkinId: item.checkinId,
                checkInPersonId: item.checkInPersonId
            };
            this.$F.doRequest(this, '/pms/checkin/live_in_person', params, (res) => {
                this.live_in_person_list()
                this.$forceUpdate()
            })
        },
        addItem_live_in_person(i, item) {
            console.log(item)
            return
            if (!item.name) {
                this.$message.error('请填写姓名');
                return
            }
            if (!item.idcardType) {
                this.$message.error('请选择证件类型');
                return
            }
            if (!item.idcard) {
                this.$message.error('请填写证件号');
                return
            }
            if (!item.sex) {
                this.$message.error('请选择性别');
                return
            }
            if (!item.mobile) {
                this.$message.error('请输入手机号');
                return
            }
            let params = {
                checkinRoomId: item.checkinRoomId,
                name: item.name,
                idcardType: item.idcardType,
                idcard: item.idcard,
                sex: item.sex,
                mobile: item.mobile,
                checkinId: this.checkInForm.checkInId,
                checkInPersonId: '',

            };
            this.$F.doRequest(this, '/pms/checkin/live_in_person', params, (res) => {
                this.live_in_person_list()
                this.$forceUpdate()
            })
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
