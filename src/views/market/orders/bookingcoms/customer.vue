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
                <el-button type="text" v-if="row.inRoomList && row.inRoomList.personList > 0">点击入住</el-button>
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
              row-key="id" border :default-expand-all='true'
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column :label="$t('desk.customer_roomKind')" width="100">
            <template slot-scope="scope">
                {{scope.row.isChild?'':scope.row.houseNum}}
                {{scope.row.isChild?'':scope.row.roomTypeName}}
            </template>
        </el-table-column>
        <el-table-column prop="realPrice" label="房价" width="100">
        </el-table-column>
        <!-- <el-table-column prop="" label="排房" width="150">
        </el-table-column> -->
        <el-table-column label="姓名" width="150">
            <template slot-scope="{row}">
                <el-row>
                    <el-input v-model="row.name" placeholder="请输入姓名"></el-input>
                </el-row>
<!--                <el-row v-else>-->
<!--                    <el-input v-if="row.edit" v-model="row.name"></el-input>-->
<!--                    <span v-else>{{row.name}}</span>-->
<!--                </el-row>-->
            </template>
        </el-table-column>
        <el-table-column prop="groupName" :label="$t('commons.idCardTypeDesc')" width="150">
            <template slot-scope="{row}">
                <el-row>
                    <el-select v-model="row.idcardType" style="width:100%">
                        <el-option :value="key" v-for="(item,key,index) of $t('commons.idCardType')" :label="item" :key="index"></el-option>
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
        <el-table-column label="性别" width="120">
            <template slot-scope="{row}">
                <el-row>
                    <el-select v-model="row.sex" style="width:100%">
                        <el-option v-for="(item,key,index) of $t('commons.F_sex')" :label="item" :value="key" :key="index"></el-option>
                    </el-select>
                </el-row>
            </template>
        </el-table-column>
        <el-table-column prop="groupName" label="手机号" width="150">
            <template slot-scope="{row}">
                <el-row>
                    <el-input v-model="row.mobile" placeholder="请输入手机号"></el-input>
                </el-row>
            </template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" width="180">
            <template slot-scope="scope">
                <el-button type="text" size="mini" @click="editItem_live_in_person(scope.row)" v-if="scope.row.isChild&&scope.row.edit">{{ $t('commons.save') }}</el-button>
                <el-button type="text" size="mini" @click="edit_live_in_person(scope.row.isChild?scope.row:scope.row)" v-if="scope.row.isChild&&!scope.row.edit">编辑</el-button>
                <el-button type="text" size="mini" @click="del_live_in_person(scope.row)" v-if="scope.row.isChild && !scope.row.isIndex0">{{$t('commons.delete')}}</el-button>
                <el-button type="text" v-if="!scope.row.isChild" size="mini" @click="addGuest(scope.row, scope.$index)"><!--@click="addItem_live_in_person(scope.$index,scope.row)"-->
                    <template>+同来宾客</template>
<!--                    <template v-else>+入住人</template>-->
                </el-button>
            </template>
        </el-table-column>
    </el-table>

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
    props: ['roomInfo', 'type', 'detailData'],
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
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [{checkIn: {}, inRoomList:[]}], //表格数据
            liveInPersonData:[],
            searchForm: {
                type: 3,
                checkinId: '',
                pageIndex: 1,
                pageSize: 999
            }
        };
    },
    watch: {

    },
    mounted() {
        let id = this.$route.query.id;
        this.searchForm.checkinId = id
        this.live_in_person_list();
        this.tableData[0] = this.detailData;
        this.$forceUpdate();
    },

    methods: {
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
                        data[k].children = []
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
                this.liveInPersonData = data
                this.$forceUpdate()
            })
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
        del_live_in_person(item) {
            let params = {
                checkInPersonId: item.id,
            };
            this.$F.doRequest(this, '/pms/checkin/delete_live_in_person', params, (res) => {
                this.$message({
                    message: this.$t('commons.request_success'),
                    type: 'success'
                });
                this.live_in_person_list()
                this.$forceUpdate()
            })
        },
        edit_live_in_person(item) {
            item.edit = true
            this.$forceUpdate()
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
