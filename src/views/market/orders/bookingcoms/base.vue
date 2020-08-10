<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-10 17:30:58
 * @FilePath: /jiudian/src/views/market/orders/bookingcoms/base.vue
 -->
<template>
<div class="base" v-if="checkinInfo">
    <el-row class="clearfix">
        <div class="fr">
            <el-button plain @click="liveInPersonShow=true">批量入住</el-button>
            <el-button plain>修改订单</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-dropdown split-button type="primary">
                更多操作
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>排房</el-dropdown-item>
                    <el-dropdown-item>更改客源</el-dropdown-item>
                    <el-dropdown-item @click.native="handleCancel">取消预订</el-dropdown-item>
                    <el-dropdown-item @click.native="handleNoshow">NOSHOW</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-row>
    <el-row>
        <h4>基本信息</h4>
        <el-row>
            <el-col :span="8">
                <p>订单号：{{checkinInfo.reserveOrderNum?checkinInfo.reserveOrderNum:''}}</p>
            </el-col>
            <el-col :span="8">
                <p>订单来源：{{F_orderSource(checkinInfo.orderSource)}}</p>
            </el-col>
            <el-col :span="8">
                <p>入住类型：{{F_checkinType(checkinInfo.checkinType)}}</p>
            </el-col>
            <el-col :span="8">
                <p>抵离时间：{{checkinInfo.checkinTime}} - {{checkinInfo.checkoutTime}}</p>
            </el-col>
            <el-col :span="8">
                <p>保留时间：{{checkinInfo.keepTime}}</p>
            </el-col>
        </el-row>
    </el-row>

    <el-row>
        <h4>预订房型</h4>
        <el-row>
            <el-col :span="24" v-for="(item,key,index) of roomTypeList" :key="index">
                <p>{{checkKey(key)}}（{{item.length}}间）；房型：<el-button type="primary" size="mini" plain>{{item[0].roomTypeName}}({{item.length}})</el-button>
                </p>
            </el-col>
            <!-- <el-col :span="24">
                <p>未排房（1间）；房型：<el-button type="primary" size="mini" plain>标准间(1)</el-button>
                </p>
            </el-col> -->
        </el-row>
    </el-row>
    <el-row>
        <h4>销售信息</h4>
        <el-row>
            <el-col :span="8">
                <p>外部订单号：{{checkinInfo.thirdOrdernum?checkinInfo.thirdOrdernum:'无'}}</p>
            </el-col>
            <el-col :span="8">
                <p>销售员：{{checkinInfo.salesId}}</p>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <p>订单备注：{{checkinInfo.remark}}</p>
            </el-col>
        </el-row>
    </el-row>
    <el-dialog top="0" :visible.sync="liveInPersonShow" class="liveInPersonDia" title="添加入住人" width="80%">
        <customer></customer>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="liveInPersonShow=false">取消</el-button>
            <!-- <el-button size="small" type="primary" @click="liveInPersonShow = false">确定</el-button> -->
        </span>
    </el-dialog>
 <el-dialog top="0" title="NOSHOW" :visible.sync="noShowDiaShow" width="600px" center>
        <el-form :model="currentItem" style="margin-top:-20px" size="mini">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="预订单号：" class="">
                        {{currentItem.orderNum}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="预订人：" class="">
                        {{currentItem.name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="账务服务：" class="">
                        NOSHOW房费
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="金额：" class="">
                        <el-input type="text" disabled v-model="currentItem.deposit" style="width:150px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注：" class="">
                        <el-input type="textarea" v-model="currentItem.remark" style="width:450px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="noShowDiaShow = false">取 消</el-button>
            <el-button type="primary" @click="confirmNoshow">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import myMixin from '@/utils/filterMixin';
import customer from './customer'
export default {
    components: {
        customer
    },
    mixins: [myMixin],
    props: ['checkinInfo', 'roomInfo'],
    computed: {
        ...mapState({
            token: state => state.user.token,
            userId: state => state.user.userId,
            msgKey: state => state.config.msgKey,
            plat_source: state => state.config.plat_source
        })
    },
    watch: {
        roomInfo: {
            handler(n, o) {
                console.log(n)
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
                console.log(this.roomTypeList)
            },
            //   immediate: true,  
            deep: true
        }
    },
    data() {
        return {
            loading: false,
            liveInPersonShow: false,
            noShowDiaShow: false,
            activeName: 'first',
            roomTypeList: {},
            currentItem:{}

        };
    },

    mounted() {
        let id = this.$route.query.id
        // this.get_user_enterprise(id)
    },

    methods: {
        checkKey(key) {
            console.log(key)
            if (key.indexOf('checkIn') != -1) {
                return '已排房'
            }
            if (key.indexOf('notYet') != -1) {
                return '未排房'
            }
        },
        handleCancel() {
            let params = {
                checkInReserveId:this.$route.query.id || '',
                state: 8
            }
            this.$confirm('请确认是否取消?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, '/pms/reserve/reserve_oper', params, (res) => {
                    this.$router.go(-1)
                    this.$message({
                        message: '操作成功',
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
                    message: '操作成功',
                    type: 'success'
                });
                this.$router.go(-1)
            })
        },
        handleNoshow() {
            this.currentItem = this.checkinInfo;
            this.noShowDiaShow = true
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
