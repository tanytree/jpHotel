<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-04 18:08:42
 * @FilePath: \jiudian\src\views\market\orders\bookingcoms\base.vue
 -->
<template>
<div class="base">
    <el-row class="clearfix">
        <div class="fr">
<!--            :disabled="checkinInfo.state != 1 && checkinInfo.state != 2"-->
            <el-button plain @click="batchCheckId" :disabled="checkinInfo.state != 1 && checkinInfo.state != 2">{{ $t('desk.batchCheckin') }}</el-button>
            <el-button plain @click="baseInfoChangeHandle('baseInfoChangeShow')" :disabled="checkinInfo.state != 1 && checkinInfo.state != 2">{{ $t('desk.updateOrder') }}</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-dropdown split-button type="primary"> {{ $t('commons.moreOperating') }}
                <el-dropdown-menu slot="dropdown">
<!--                    <el-dropdown-item @click.native="rowRoomHandle" v-if="!inRoomList || inRoomList.length == 0">{{$t('desk.rowHouse')}}</el-dropdown-item>-->
<!--                    <el-dropdown-item @click.native="baseInfoChangeHandle('gustTypeChangeShow')">更改客源</el-dropdown-item>-->
<!--                    v-if="checkinInfo.state == 1 || checkinInfo.state == 2"-->
                    <el-dropdown-item @click.native="handleCancel(8)" :disabled="checkinInfo.state != 1 && checkinInfo.state != 2">{{$t('desk.order_cancelOrder')}}</el-dropdown-item>
                    <el-dropdown-item @click.native="handleNoshow(4)" :disabled="checkinInfo.state == 4">NOSHOW</el-dropdown-item>
                    <el-dropdown-item @click.native="handleNoshow(1)" v-if="checkinInfo.state == 4">{{$t('commons.cancel')}}NOSHOW</el-dropdown-item>
                    <el-dropdown-item @click.native="rowRoomHandle" v-if="!inRoomList || inRoomList.length == 0">{{ $t('desk.rowHouse') }}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-row>
    <el-row>
        <!--客房信息-->
        <h4>{{ $t('desk.serve_basicInfo') }}</h4>
        <el-row>
            <el-col :span="8">
                <p>{{ $t('desk.book_orderNum') }}：{{checkinInfo.reserveOrderNum || ''}}</p>
            </el-col>
            <el-col :span="8">
                <p>{{$t('desk.book_orderSoutce')}}:：{{F_orderSource(checkinInfo.orderSource)}}</p>
            </el-col>
<!--            <el-col :span="8">-->
<!--                <p>{{$t('commons.checkInTypeDesc')}}：{{F_checkinType(checkinInfo.checkinType)}}</p>-->
<!--            </el-col>-->
            <el-col :span="8">
                <p>{{ $t('desk.nightAudit.arriveTime') }}：{{checkinInfo.checkinTime}} - {{checkinInfo.checkoutTime}}</p>
            </el-col>
        </el-row>
    </el-row>
    <el-row>
        <h4>{{ $t('desk.order_bookRoomType') }}</h4>
        <el-row>
            <el-col :span="24" v-for="(item,key,index) of roomTypeList" :key="index">
                <p>
                    {{checkKey(key)}}（{{item.length}}{{$t('manager.hk_space')}}）；
                    {{$t('desk.home_roomType')}}：
                    <el-button type="primary" size="mini" plain>{{item[0].roomTypeName}}({{item.length}})</el-button>
                </p>
            </el-col>
            <!-- <el-col :span="24">
                <p>未排房（1间）；房型：<el-button type="primary" size="mini" plain>标准间(1)</el-button> </p>
            </el-col> -->
        </el-row>
    </el-row>
    <el-row>
        <h4>{{ $t('desk.order_saleInfo') }}</h4>
        <el-row>
            <el-col :span="8">
                <p>{{ $t('desk.order_outOrder') }}：{{checkinInfo.thirdOrdernum?checkinInfo.thirdOrdernum:$t('desk.order_noText')}}</p>
            </el-col>
            <el-col :span="8">
                <p>{{ $t('desk.order_salesman') }}：{{ currentSale.userName || $t('desk.order_noText')}}</p>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <p>{{ $t('desk.orderMarkInfo') }}：{{checkinInfo.remark || $t('desk.order_noText')}}</p>
            </el-col>
        </el-row>
    </el-row>
    <el-dialog top="0" :visible.sync="liveInPersonShow" class="liveInPersonDia" :title="$t('desk.order_rowHouses')" width="80%">
        <customer2 :liveData="liveData" :checkinInfo="checkinInfo" type="reserve" @checkInCallback="checkInCallback"></customer2>
    </el-dialog>



    <el-dialog top="0" :title="$t('desk.updateOrder')" :visible.sync="baseInfoChangeShow" width="900px" center>
        <el-form :model="baseInfoChangeForm" ref="baseInfoChange" :rules="rules" style="margin-top:-10px" size="mini" label-width="100px">
            <el-row>
                <el-col :span="8">
                    <el-form-item :label="$t('desk.arrivalTime')" class="">
                        {{baseInfoChangeForm.checkinTime}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('desk.checkInDays')" class="">
                        {{baseInfoChangeForm.checkinDays}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('desk.order_departureTime')" class="">
                        {{baseInfoChangeForm.checkoutTime}}
                    </el-form-item>
                </el-col>
<!--                <el-col :span="8">-->
<!--                    <el-form-item :label="$t('commons.checkInTypeDesc')" prop="checkinType">-->
<!--                        <el-select v-model="baseInfoChangeForm.checkinType" class="width150">-->
<!--                            <el-option :value="key" v-for="(item,key,index) of $t('commons.checkinType')" :label="item" :key="index"></el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
                <el-col :span="8">
                    <el-form-item :label="$t('desk.order_salesman') + '：'">
                        <el-select v-model="baseInfoChangeForm.salesId" class="width150">
                            <el-option v-for="item in salesList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('desk.home_bookPeople')" class="" prop="name">
                        <el-input type="text" v-model="baseInfoChangeForm.name" style="width:150px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('desk.order_moblePhone')" prop="mobile">
                        <el-input v-model="baseInfoChangeForm.mobile" class="width150"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('desk.order_outOrder') + '：'">
                        <el-input v-model="baseInfoChangeForm.thirdOrdernum" class="width150"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item :label="$t('desk.home_note') + ':'" class="">
                        <el-input type="textarea" v-model="baseInfoChangeForm.remark" style="width:450px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="baseInfoChangeShow = false">{{$t('commons.cancel')}}</el-button>
            <el-button type="primary" @click="hotel_check_inChange">{{$t('commons.determine')}}</el-button>
        </span>
    </el-dialog>
    <el-dialog top="0" :title="$t('desk.order_changeSource')" :visible.sync="gustTypeChangeShow" width="500px" center>
        <el-form :model="baseInfoChangeForm" ref="baseInfoChange" :rules="rules" style="margin-top:-10px" size="mini" label-width="100px">
            <el-row>

                <el-row>
                    <el-form-item :label="$t('desk.customer_guestType') + ':'" class="" style="margin-bottom:0" prop="guestType">
                        <el-radio-group v-model="baseInfoChangeForm.guestType">
                            <el-radio v-for="(item,key,index) of $t('commons.guestType')" :label="key" :key="index">{{item}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label-width="100px" label="" class="" style="margin-bottom:0" v-if="baseInfoChangeForm.guestType==2||baseInfoChangeForm.guestType==3">
                        <el-input type="text" class="width200"></el-input>

                    </el-form-item>
                </el-row>
                <br />
                <el-row>
                    <el-form-item :label="$t('desk.book_orderSoutce')" prop="orderSource">
                        <el-select v-model="baseInfoChangeForm.orderSource" class="width200">
                            <el-option :value="key" v-for="(item,key,index) of $t('commons.orderSource')" :label="item" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="baseInfoChangeShow = false">{{$t('commons.cancel')}}</el-button>
            <el-button type="primary" @click="hotel_check_inChange">{{$t('commons.determine')}}</el-button>
        </span>
    </el-dialog>

    <el-dialog top="0" title="NOSHOW" :visible.sync="noShowDiaShow" width="600px" center>
        <el-form :model="currentItem" style="margin-top:-20px" size="mini">
            <el-row>
                <el-col :span="12">
                    <el-form-item :label="$t('desk.order_bookOrderNum') + '：'" class="">
                        {{currentItem.orderNum}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('desk.home_bookPeople')" class="">
                        {{currentItem.name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('desk.order_accountingService') + '：'" class="">
                        NOSHOW{{$t('desk.serve_roomPrice')}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('desk.customer_sum') + '：'" class="">
                        <el-input type="text" disabled v-model="currentItem.deposit" style="width:150px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item :label="$t('desk.home_note') + ':'" class="">
                        <el-input type="textarea" v-model="currentItem.remark" style="width:450px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="noShowDiaShow = false">{{$t('commons.cancel')}}</el-button>
            <el-button type="primary" @click="confirmNoshow">{{$t('commons.determine')}}</el-button>
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
import customer2 from '@/components/front/customer2'
import rowRoomHandle from "@/views/market/home/rowRoomHandle";

export default {
    components: {
        customer2,
        rowRoomHandle
    },
    mixins: [myMixin],
    props: ['checkinInfo', 'inRoomList'],
    computed: {
        ...mapState({
            token: state => state.user.token,
            userId: state => state.user.userId,
            msgKey: state => state.config.msgKey,
            plat_source: state => state.config.plat_source
        }),
        rules(){
            return{
                name: [{
                    required: true,
                    // message: '请输入姓名',
                    message: this.$t('commons.mustInput'),
                    trigger: 'blur'
                }, ],
                sex: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择性别',请选择性别
                    trigger: 'blur'
                }, ],
                mobile: [{
                    required: true,
                    // message: '请输入手机号',
                    message: this.$t('commons.mustInput'),
                    trigger: 'blur'
                }, ],
                idcardType: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择护照类型',
                    trigger: 'blur'
                }, ],
                idcard: [{
                    required: true,
                    // message: '请输入证件号',
                    message: this.$t('commons.mustInput'),
                    trigger: 'blur'
                }, ],
                checkinTime: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择入住时间',
                    trigger: 'change'
                }, ],
                checkoutTime: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择预离时间',
                    trigger: 'change'
                }, ],
                checkinDays: [{
                    required: true,
                    // message: '请输入入住天数',
                    message: this.$t('commons.mustInput'),
                    trigger: 'change'
                }, ],
                guestType: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择客源类型',
                    trigger: 'blur'
                }, ],
                orderSource: [{
                    required: true,
                    message: this.$t('desk.book_orderSoutce'),
                    trigger: 'change'
                }, ],
                checkinType: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择入住类型',
                    trigger: 'change'
                }, ],
                ruleHourId: [{
                    required: true,
                    message: this.$t('commons.placeChoose'),
                    // message: '请选择计费规则',
                    trigger: 'change'
                }, ],
            }
        }
    },
    watch: {
        roomInfo: {
            handler(n, o) {
                debugger
                n.forEach(element => {
                    if (element.personList.length) {
                        if (!this.roomTypeList[element.roomTypeId + 'checkIn']) {
                            this.roomTypeList[element.roomTypeId + 'checkIn'] = []
                        }
                        this.roomTypeList[element.roomTypeId + 'checkIn'].push(element)
                    } else {
                        if (!this.roomTypeList[element.roomTypeId + 'notYet']) {
                            this.roomTypeList[element.roomTypeId + 'notYet'] = []
                        }
                        this.roomTypeList[element.roomTypeId + 'notYet'].push(element)
                    }
                });
                console.log(222222222222)
                console.log(this.roomTypeList)

            },
            //   immediate: true,
            deep: true
        }
    },
    data() {
        return {
            currentSale: {},
            loading: false,
            liveInPersonShow: false,
            noShowDiaShow: false,
            baseInfoChangeShow: false,
            gustTypeChangeShow: false,
            activeName: 'first',
            salesList: [],
            roomTypeList: {},
            currentItem: {},
            liveData: [],
            baseInfoChangeForm: {},
            leaveTime: {
                disabledDate: time => {
                    if (this.baseInfoChangeForm.checkinTime != "" && this.baseInfoChangeForm.checkinTime) {
                        let timeStr = new Date(new Date(this.baseInfoChangeForm.checkinTime).Format("yyyy-MM-dd").replace(/-/g, "/"));
                        if (this.operCheckinType == 'b2') { //时租预订
                            return new Date(time.Format("yyyy-MM-dd")).getTime() - 8.64e7 > timeStr;
                        }
                        return new Date(time.Format("yyyy-MM-dd")).getTime() - 8.64e7 < timeStr;
                    } else if (this.baseInfoChangeForm.checkinTime == "") {
                        return new Date(time.Format("yyyy-MM-dd")).getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天
                    } else {
                        return "";
                    }
                }
            },
        };
    },

    created() {
        console.log(JSON.parse(JSON.stringify(this.checkinInfo)));
    },

    mounted() {
        let id = this.$route.query.id
        this.$F.commons.fetchSalesList({salesFlag: 1}, (data)=> {
            this.salesList = data.hotelUserList;
            let tempArray = this.salesList.filter(sale => {  return sale.id == this.checkinInfo.salesId}) || [{}];
            this.currentSale = tempArray[0] || {};
        });
    },

    methods: {
        checkInCallback(id) {
            this.liveInPersonShow = false;
            this.$router.push('/orderdetail?id=' + id);
        },
        batchCheckId() {
            console.log(JSON.parse(JSON.stringify(this.checkinInfo)));
            console.log(JSON.parse(JSON.stringify(this.inRoomList)));
            this.inRoomList.forEach((item, i) => {
                let object = {
                    checkinRoomId: this.checkinInfo.id,
                    name: this.checkinInfo.name,
                    idcardType: this.checkinInfo.idcardType || '1',
                    idcard: this.checkinInfo.idcard,
                    sex: this.checkinInfo.sex || '1',
                    mobile: this.checkinInfo.mobile,
                    checkinId: '',
                    checkInPersonId: '',
                    houseNum: item.houseNum,
                    realPrice: item.realPrice,
                    reservePrice: item.reservePrice,
                    roomId: item.roomId,
                    roomTypeId: item.roomTypeId,
                    roomTypeName: item.roomTypeName,
                    personList: []
                }
                this.liveData.push(object);
            })
            this.liveInPersonShow = true;
        },
        checkKey(key) {
            console.log(key)
            if (key.indexOf('checkIn') != -1) {
                return this.$t('desk.hadRowHouses');
            }
            if (key.indexOf('notYet') != -1) {
                return this.$t('desk.noRowHouses');
            }
        },
        handleCancel() {
            let params = {
                checkInReserveId: this.$route.query.id || '',
                state: 8
            }
            this.$confirm(this.$t('desk.order_sureDelete'), this.$t('commons.tip_desc'), {
                confirmButtonText: this.$t('commons.confirm'),
                cancelButtonText: this.$t('commons.cancel'),
                type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, '/pms/reserve/reserve_oper', params, (res) => {
                    this.$router.go(-1)
                    this.$message({
                       message: this.$t('commons.request_success'),
                        type: 'success'
                    });
                })
            }).catch(() => {

            });
        },
        confirmNoshow() {
            let params = {
                checkInReserveId: this.currentItem.id,
                state: 4
            }
            this.$F.doRequest(this, '/pms/reserve/reserve_oper', params, (res) => {
                this.noShowDiaShow = false
                this.$message({
                   message: this.$t('commons.request_success'),
                    type: 'success'
                });
                this.$router.go(-1)
            })
        },

        hotel_check_inChange() {
            this.$refs.baseInfoChange.validate((valid) => {
                this.baseInfoChangeForm.checkInReserveId = this.$route.query.id
                if (valid) {
                    this.$F.doRequest(this, '/pms/reserve/reserve_check_in', this.baseInfoChangeForm, (data) => {
                        this.baseInfoChangeShow = false
                        this.gustTypeChangeShow = false
                        this.$emit('baseInfoChange', '');
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        baseInfoChangeHandle(type) {
            this.baseInfoChangeForm = this.checkinInfo
            this[type] = true
            this.baseInfoChangeForm.checkinType = this.baseInfoChangeForm.checkinType.toString()
            this.baseInfoChangeForm.orderSource = this.baseInfoChangeForm.orderSource.toString()
            this.baseInfoChangeForm.guestType = this.baseInfoChangeForm.guestType.toString()
        },
        baseInfoChange() {
            this.$emit('baseInfoChange', '');
        },
        //将订单变为NOSHOW状态
        handleNoshow(state) {
            let params = {
                checkInReserveId: this.$route.query.id || '',
                state: state
            }
            debugger
            this.$F.doRequest(this, '/pms/reserve/reserve_oper', params, (res) => {
                this.$router.go(-1)
                this.$message({
                    message: this.$t('commons.request_success'),
                    type: 'success'
                });
            })
        },
        rowRoomHandle() {
            if (!this.$route.query.id) {
                return
            }
            this.$refs.rowRoomHandle.initForm(this.$route.query.id, this.checkinInfo, this.roomInfo || []);
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
