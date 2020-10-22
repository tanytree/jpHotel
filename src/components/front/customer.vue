<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-10 16:36:39
 * @FilePath: /jiudian/src/views/market/orders/bookingcoms/customer.vue
 -->
<template>
<div class="customer">
    <!--表格数据 -->
     <el-table v-if="type == 'detail'" ref="multipleTable" v-loading="loading" :data="tableData"
               :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
        <el-table-column label="姓名" show-overflow-tooltip>
            <template slot-scope="{row}">
                <span>{{row.checkIn.name}}</span>
            </template>
        </el-table-column>
        <el-table-column label="性别" show-overflow-tooltip>
            <template slot-scope="{row}">
                <span>{{F_sex(row.checkIn.sex)}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="$t('food.common.status')">
            <template slot-scope="{row}">
                <el-button type="text" v-if="row.inRoomList && row.inRoomList.personList > 0">{{ $t('desk.clickCheckin') }}</el-button>
                <el-button type="text" v-else>点击排房</el-button>
            </template>
        </el-table-column>
        <el-table-column :label="$t('desk.home_roomNum') + $t('desk.home_roomType')" show-overflow-tooltip>
            <template slot-scope="{row}">
                -
            </template>
        </el-table-column>
        <el-table-column :label="$t('commons.idCardTypeDesc')" show-overflow-tooltip>
            <template slot-scope="{row}">
                <span>-</span>
            </template>
        </el-table-column>
        <el-table-column label="证件号码" show-overflow-tooltip>
            <template slot-scope="{row}">
                <span>-</span>
            </template>
        </el-table-column>
        <el-table-column :label="$t('commons.mobile')" show-overflow-tooltip>
            <template slot-scope="{row}">
                <span>{{row.checkIn.mobile}}</span>
            </template>
        </el-table-column>
        <el-table-column label="备注" show-overflow-tooltip>
            <template slot-scope="{row}">
                <span>{{row.checkIn.remark}}</span>
            </template>
        </el-table-column>
    </el-table>
    <el-table v-else v-loading="loading" :data="liveInPersonData" style="width: 100%;margin-bottom: 20px;"
              border :default-expand-all='true'
             >
        <el-table-column :label="$t('desk.customer_roomKind')" width="150">
            <template slot-scope="scope">
                {{scope.row.isChild?'':scope.row.houseNum}}
                {{scope.row.isChild?'':scope.row.roomTypeName}}
            </template>
        </el-table-column>
        <el-table-column prop="realPrice" label="房价" width="100">
        </el-table-column>
        <el-table-column label="姓名" width="150">
            <template slot-scope="{row}">
                <el-row>
                    <span>{{row.name}}</span>
                </el-row>
            </template>
        </el-table-column>
        <el-table-column prop="groupName" :label="$t('commons.idCardTypeDesc')" width="150">
            <template slot-scope="{row}">
                <el-row>
                    <span>{{F_idcardType(row.idcardType)}}</span>
                </el-row>
            </template>

        </el-table-column>
        <el-table-column prop="groupName" label="证件号码">
            <template slot-scope="{row}">
                <el-row>
                    <span>{{row.idcard}}</span>
                </el-row>
            </template>
        </el-table-column>
        <el-table-column label="性别" width="120">
            <template slot-scope="{row}">
                <el-row>
                    <span>{{F_sex(row.sex)}}</span>
                </el-row>
            </template>
        </el-table-column>
        <el-table-column prop="groupName" :label="$t('desk.order_moblePhone')" width="150">
            <template slot-scope="{row}">
                <el-row>
                    <span>{{row.mobile}}</span>
                </el-row>
            </template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" width="180">
            <template slot-scope="scope">
                <el-button type="text" size="mini" @click="edit_live_in_person()">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog top="0" :show-close='false' :title="$t('desk.order_rowHouses')" :visible.sync="addLivePersonShow" width="80%">
        <customer2 v-if="addLivePersonShow" :liveData="liveData2" @personCallback="personCallback"></customer2>
    </el-dialog>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import myMixin from '@/utils/filterMixin';
import customer2 from '@/components/front/customer2'
import customer from "@/components/front/customer2";
export default {
    mixins: [myMixin],
    props: ['roomInfo', 'type', 'detailData', 'liveData'],
    components: {
        customer2,
    },
    computed: {
        ...mapState({
            token: state => state.user.token,
        })
    },
    data() {
        return {
            addLivePersonShow: false,  //是否打开添加入住人窗口
            loading: false,
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [{checkIn: {}, inRoomList:[]}], //表格数据
            liveInPersonData:[],
            liveData2: [],
            searchForm: {
                type: 3,
                checkinId: '',
                pageIndex: 1,
                pageSize: 999
            }
        };
    },
    watch: {
        liveInPersonData(newValue, oldValue) {
            this.liveInPersonData = newValue;
            this.handleData(newValue)
            this.$forceUpdate();
        },
    },
    mounted() {
        if (this.type != 'checkin') {
            let id = this.$route.query.id;
            this.searchForm.checkinId = id
            this.live_in_person_list();
            this.tableData[0] = this.detailData;
        } else {
            this.liveInPersonData = this.liveData;
        }

    },

    methods: {
        //添加完入住人回调
        personCallback(data) {
            let id = this.$route.query.id
            let params = {
                checkinId: id,
                personListJson: JSON.stringify(data),
                personList: JSON.stringify(data),
            }
            this.$F.doRequest(this, '/pms/checkin/live_in_person_batch', params, (res) => {

            })
        },
        //添加同来宾客
        addGuest(row, index) {
            let newRow = this.$F.deepClone(row);
            row.children.push({
                checkinId: newRow.checkinId,
                checkinRoomId: newRow.roomId,
                id: '3213213',
                name: '',
                isChild: true,
                idcardType: '',
                idcard: '',
                edit: true,
                sex: '',
                mobile: '',
                checkInPersonId: '',
                // hasChildren: false
            });
        },

        //获取入住人数
        live_in_person_list() {
            let params = {
                type: 1,
                checkinId: this.$route.query.id,
                pageIndex: 1,
                pageSize: 999
            };
            this.$F.doRequest(this, '/pms/checkin/live_in_person_list', params, (res) => {
                let data = res.checkInRoomList;
                this.handleData(data);
                this.liveInPersonData = data;
                this.$forceUpdate()
            })
        },

        handleData(data) {
            for (let k = 0; k < data.length; k++) {
                this.$F.merge(data[k], {
                    checkinRoomId: data[k].room ? data[k].room.id : '',
                    name: '',
                    idcardType: '',
                    idcard: '',
                    sex: '',
                    mobile: '',
                    checkinId: this.$route.query.id,
                    checkInPersonId: '',
                    children: []
                    // hasChildren: false
                });
                if (data[k].personList && data[k].personList.length) {
                    this.$F.formatJsonNumberToString(data[k].personList[0])
                    this.$F.merge(data[k], data[k].personList[0]);
                    data[k].children = [];
                    data[k].personList.forEach((element, index) => {
                        if (index > 0) {
                            element.sex = element.sex.toString()
                            element.idcardType = element.idcardType.toString()
                            element.isChild = true;
                            element.edit = false;
                            if (index > 0) {
                                element.isIndex0 = false
                            } else {
                                element.isIndex0 = true
                            }
                            data[k].children.push(element)
                        }
                    });
                    // data[k].hasChildren = true
                } else {
                    data[k].children = []
                    // data[k].hasChildren = false
                }
            }
        },

        editItem_live_in_person(item) {
            if (!item.name) {
                this.$message.error('请填写姓名');
                return
            }
            if (!item.idcardType) {
                this.$message.error(this.$t('commons.selectIdCardType'));
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
                this.$message.error(this.$t('commons.selectIdCardType'));
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
        edit_live_in_person() {
            this.liveData2 = [];
            let tempArray = this.$F.deepClone(this.liveInPersonData);
            tempArray.forEach(roomTypeObject => {
                if (roomTypeObject.personList && roomTypeObject.personList.length > 1) {
                    this.$F.merge(roomTypeObject, roomTypeObject.personList[0])
                    roomTypeObject.personList.forEach((element, index) => {
                        element.roomId = roomTypeObject.roomId;
                        if (index > 0) {
                            element.isChild = true;
                        }
                    });
                    roomTypeObject.personList.splice(0, 1);
                } else if (roomTypeObject.personList && roomTypeObject.personList.length == 1) {
                    this.$F.merge(roomTypeObject, roomTypeObject.personList[0])
                    delete roomTypeObject['personList'];
                }
                this.liveData2.push(roomTypeObject);
            })
            this.addLivePersonShow = true;
        },
        cancel_live_in_person(item) {
            item.edit = false
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
