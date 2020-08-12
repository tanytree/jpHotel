<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-12 21:23:38
 * @FilePath: /jiudian/src/views/market/orders/coms/finance.vue
 -->
<template>
<div class="finance">
    <!-- 查询部分 -->
    <el-form inline size="small">
        <el-row>
            <el-form-item label="">
                <el-button type="primary" size="mini" @click="entryShow=true">入账</el-button>
                <el-button type="primary" size="mini" @click="onAccountShow=true">挂账</el-button>
                <el-button type="primary" size="mini">迷你吧</el-button>
                <el-button type="primary" size="mini">结账</el-button>
                <el-button type="primary" size="mini" @click="openInvoiceShow=true">开发票</el-button>
                <el-button type="primary" size="mini">打印</el-button>
                <el-button type="primary" size="mini">冲调</el-button>
                <el-button type="primary" size="mini">部分结账</el-button>
                <el-button type="primary" size="mini">撤销结账</el-button>
                <el-button type="primary" size="mini">撤销退房</el-button>
                <el-button type="primary" size="mini" @click="knotShow=true">走结</el-button>
            </el-form-item>
        </el-row>
        <el-form-item label="账务类别：">
            <el-button plain size="mini" @click="consume_order_list">所有账务</el-button>
            <el-button plain size="mini" @click="consume_order_list(1)">未结账务</el-button>
            <el-button plain size="mini" @click="consume_order_list(2)">已结账务</el-button>
        </el-form-item>
        <el-form-item class="fr">
            <el-button type="primary">导出</el-button>
        </el-form-item>
    </el-form>
    <!--表格数据 -->
    <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" @selection-change="handleSelectionChange" size="mini">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="createTime" label="消费时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="roomName" label="房间号" show-overflow-tooltip></el-table-column>
        <el-table-column label="账务项目" show-overflow-tooltip>
            <template slot-scope="{row}">
                {{F_priceType(row.priceType)}}
            </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" show-overflow-tooltip>
            <template slot-scope="{row}">
                {{row.state==1?'已结':'未结'}}
            </template>
        </el-table-column>
        <el-table-column prop="consumePrice" label="消费" show-overflow-tooltip></el-table-column>
        <el-table-column prop="enterType" label="业务说明" show-overflow-tooltip></el-table-column>
        <el-table-column prop="creatorName" label="操作人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="{row}">
                <el-button type="text" size="mini" @click="consume_move(row)">移除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div style="margin-top:10px"></div>
    <!--分页 -->
    <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.page" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.page_num" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination> -->
    <!--入账-->
    <el-dialog title="入账" :visible.sync="entryShow">
        <el-form :model="consumeOperForm" ref="entry" :rules="rules" size="mini" label-width="100px">
            <p>快速入账项目</p>
            <el-form-item label="付款项目：">
                <el-radio-group v-model="consumeOperForm.priceType">
                    <el-radio-button :label="4" :value="4">收款</el-radio-button>
                    <el-radio-button :label="2" :value="2">押金</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="消费项目：">
                <el-radio-group v-model="consumeOperForm.priceType" @change="priceTypeChange">
                    <el-radio-button :label="5" :value="5">加收全天房费</el-radio-button>
                    <el-radio-button :label="6" :value="6">加收半天房费</el-radio-button>
                    <el-radio-button :label="7" :value="7">损物赔偿</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <template v-if="consumeOperForm.priceType==7">
                <el-form-item label="商品类别：">
                    <el-select v-model="consumeOperForm.damageTypeId" @change="damageTypeIdChange">
                        <el-option v-for="item in hoteldamagetypeList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称：">
                    <el-select v-model="consumeOperForm.damageId">
                        <el-option v-for="item in hoteldamageList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>&nbsp;&nbsp;&nbsp;&nbsp;<el-input-number v-model="consumeOperForm.damageCount" :min="1" label=""></el-input-number>
                </el-form-item>
            </template>
            <el-form-item label="金额：">
                <el-input class="width100" v-if="consumeOperForm.priceType==4||consumeOperForm.priceType==2" v-model="consumeOperForm.payPrice" autocomplete="off"></el-input>
                <el-input class="width100" v-else v-model="consumeOperForm.consumePrice" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input class="width200" type="textarea" v-model="consumeOperForm.remark" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="打印单据：">
                <el-checkbox v-model="consumeOperForm.name"></el-checkbox>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="entryShow = false">关闭</el-button>
            <el-button type="primary" @click="consume_oper(1,'entry')">入账</el-button>
        </div>
    </el-dialog>
    <el-dialog title="选择结算方式" :visible.sync="payTypeShow">
        <el-form :model="consumeOperForm" size="mini">
            <el-form-item label="">
                <el-radio-group v-model="consumeOperForm.payType">
                    <el-radio :label="1" :value="1">现金</el-radio>
                    <el-radio :label="2" :value="2">银行卡</el-radio>
                    <el-radio :label="3" :value="3">支付宝</el-radio>
                    <el-radio :label="4" :value="4">微信</el-radio>
                    <el-radio :label="5" :value="5">会员卡</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="payTypeShow = false">取消</el-button>
            <el-button type="primary" @click="payTypeShow = false">确认</el-button>
        </div>
    </el-dialog>
    <!--挂账-->
    <el-dialog title="挂账" :visible.sync="onAccountShow" width="500px">
        <el-form :model="consumeOperForm" ref="onAccount" :rules="rules" size="mini" label-width="100px">
            <el-row v-if="currentRoom">
                <el-col :span="8">
                    房型：{{currentRoom.roomTypeName}}
                </el-col>
                <el-col :span="8">
                    房间号：{{currentRoom.houseNum}}
                </el-col>
                <el-col :span="8">
                    入住人：{{currentRoom.personList[0].name}}
                </el-col>
            </el-row>
            <el-row v-else>
                <template v-if="detailData&&detailData.inRoomList">
                    <el-col :span="8">
                        房型：{{detailData.inRoomList[0].roomTypeName}}
                    </el-col>
                    <el-col :span="8">
                        房间号：{{detailData.inRoomList[0].houseNum}}
                    </el-col>
                    <el-col :span="8">
                        入住人：{{detailData.inRoomList[0].personList[0].name}}
                    </el-col>
                </template>
            </el-row>
            <br />
            <el-form-item label="挂账金额：" class="" prop="consumePrice">
                <el-input class="width200" type="number" v-model="consumeOperForm.consumePrice" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="挂账单位：" class="" prop="creditName">
                <el-select class="width200" v-model="consumeOperForm.enterId" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading" @change="enterNameChange">
                    <el-option v-for="item in hotelenterList" :key="item.id" :label="item.enterName" :value="item.id">
                        {{item.enterName}}
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input class="width200" type="textarea" v-model="consumeOperForm.remark" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onAccountShow=false">关闭</el-button>
            <el-button type="primary" @click="consume_oper(2,'onAccount')">确认</el-button>
        </div>
    </el-dialog>
    <!--走结-->
    <el-dialog title="走结" :visible.sync="knotShow" width="500px">
        <el-form :model="consumeOperForm" ref="knot" :rules="rules" size="mini" label-width="20px">
            <el-row v-if="currentRoom">
                <el-col :span="8">
                    房型：{{currentRoom.roomTypeName}}
                </el-col>
                <el-col :span="8">
                    房间号：{{currentRoom.houseNum}}
                </el-col>
                <el-col :span="8">
                    入住人：{{currentRoom.personList[0].name}}
                </el-col>
            </el-row>
            <el-row v-else>
                <template v-if="detailData&&detailData.inRoomList">
                    <el-col :span="8">
                        房型：{{detailData.inRoomList[0].roomTypeName}}
                    </el-col>
                    <el-col :span="8">
                        房间号：{{detailData.inRoomList[0].houseNum}}
                    </el-col>
                    <el-col :span="8">
                        入住人：{{detailData.inRoomList[0].personList[0].name}}
                    </el-col>
                </template>
            </el-row>
            <br />
            <el-form-item label="" class="">
                <p>是否确认改为走结？</p>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="knotShow=false">关闭</el-button>
            <el-button type="primary" @click="consume_oper(3,'knot')">确认</el-button>
        </div>
    </el-dialog>
    <!--开发票-->
    <el-dialog title="开发票" :visible.sync="openInvoiceShow" width="900px">
        <el-form :model="openInvoiceForm" ref="openInvoice" :rules="rules" size="mini" label-width="130px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="消费金额：">
                        <el-input class="width150" type="text" v-model="openInvoiceForm.consumePrice" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="已开票金额：">
                        <el-input class="width150" type="text" v-model="openInvoiceForm.invoicePrice" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="付款公司名称：" prop="companyName">
                        <el-input class="width150" type="text" v-model="openInvoiceForm.companyName" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="项目：" prop="projectName">
                        <el-input class="width150" type="text" v-model="openInvoiceForm.projectName" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="金额：" prop="prices">
                        <el-input class="width150" type="text" v-model="openInvoiceForm.prices" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="日期：" prop="invoiceTime">
                        <el-date-picker class="width150" v-model="openInvoiceForm.invoiceTime" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="备注：">
                        <el-input style="width:400px" type="textarea" v-model="openInvoiceForm.remark" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="openInvoiceShow = false">取消</el-button>
            <el-button type="primary" @click="consume_oper(4,'openInvoice')">确定</el-button>
        </div>
    </el-dialog>

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
    props: ['currentRoom', 'detailData'],

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
            hotelenterLoading: false,
            entryShow: false, //入账
            payTypeShow: false,
            onAccountShow: false,
            knotShow: false,
            openInvoiceShow: false,
            checkType: 'customer',
            activeName: 'first',
            detail: {
                text: ''
            },
            searchForm: {
                searchType: 1,
                content: '',
                enterStatus: '',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            },

            consumeOperForm: {
                priceType: '',
                payType: '',
                name:''
            },
            openInvoiceForm:{
                roomNum:'',
                name:'',
                checkInId:'',
                mobile:'',
                consumePrice:'',
                prices:'',
                invoicePrice:'',
                companyName:'',
                projectName:'',
                invoiceTime:'',
                remark:'',
                invoiceId:''
            },
            rules: {
                consumePrice: [{
                    required: true,
                    message: '请输入金额',
                    trigger: 'blur'
                }, ],
                creditName: [{
                    required: true,
                    message: '请选择挂账公司',
                    trigger: 'blur'
                }, ],
                companyName: [{
                    required: true,
                    message: '请输入付款公司名称',
                    trigger: 'blur'
                }, ],
                projectName: [{
                    required: true,
                    message: '请输入项目名称',
                    trigger: 'blur'
                }, ],
                invoiceTime: [{
                    required: true,
                    message: '请选择开票日期',
                    trigger: 'blur'
                }, ],
                prices: [{
                    required: true,
                    message: '请输入金额',
                    trigger: 'blur'
                }, ],
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [{}], //表格数据
            hoteldamagetypeList: [],
            hoteldamageList: [],
            hotelenterList: [], //挂账企业列表
        };
    },

    mounted() {
        let id = this.$route.query.id
        this.consume_order_list(),
            this.hoteldamagetype_list()
    },

    methods: {
        consume_order_list(state = '') {
            let params = {
                state: state,
                checkInId: this.$route.query.id
            };
            this.$F.doRequest(this, '/pms/consume/consume_order_list', params, (res) => {
                this.tableData = res.consumeOrderList
                this.$forceUpdate()
            })
        },
        consume_move(item) {
            let params = {
                orderId: item.id
            };
            this.$confirm('请确认是否删除该项?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, '/pms/consume/consume_move', params, (res) => {
                    this.$message({
                        type: 'success',
                        message: '移除成功!'
                    });
                    this.consume_order_list()
                })
            }).catch(() => {});
        },
        consume_oper(type, formName) {
            /** 
             * 1.入账
             * 2.挂账
             * 3.走结
             * 4.结账
             * 
             * **/
            if (type != 3) {
                let params = this.consumeOperForm
                params.checkInId = this.$route.query.id
                if (this.currentRoom) {
                    params.roomId = this.currentRoom.id
                    params.roomNum = this.currentRoom.houseNum
                } else {
                    if (this.detailData.inRoomList.length) {
                        params.roomId = this.detailData.inRoomList[0].id
                        params.roomNum = this.detailData.inRoomList[0].houseNum
                    } else {
                        this.$message.error('暂无入住人');
                        return
                    }
                }
            }
            //入账
            if (type == 1) {
                params.state = 2
                if (!params.priceType) {
                    this.$message.error('请选择入账项目');
                    return
                }
                if (params.priceType == 4 && !params.payType) {
                    this.payTypeShow = true
                    return
                }
                if (params.priceType == 4 || params.priceType == 2) {
                    if (!params.payPrice) {
                        this.$message.error('请输入金额');
                        return
                    }
                } else {
                    if (!params.consumePrice) {
                        this.$message.error('请输入金额');
                        return
                    }
                }
            }
            //挂账
            if (type == 2) {
                params.priceType = 13
                params.payType = 1 //挂账无需支付方式
                params.state = 1
            }
            //走结
            if (type == 3) {
                let params = {
                    checkInId: this.$route.query.id,
                    billType: 4
                }
                this.$F.doRequest(this, '/pms/checkin/out_check_in', params, (res) => {
                    this.knotShow = false
                    this.consume_order_list()
                })
                return
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$F.doRequest(this, '/pms/consume/consume_oper', params, (res) => {
                        this.entryShow = false
                        this.onAccountShow = false
                        this.consume_order_list()
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        hoteldamagetype_list() {
            let params = {
                pageIndex: 1,
                pageSize: 10,
                paging: false
            };
            this.$F.doRequest(this, '/pms/hoteldamagetype/list', params, (res) => {
                this.hoteldamagetypeList = res.list
                this.$forceUpdate()
            })
        },
        hoteldamage_list(id) {
            let params = {
                damageTypeId: id,
                pageIndex: 1,
                pageSize: 10,
                paging: false
            };
            this.$F.doRequest(this, '/pms/hoteldamage/list', params, (res) => {
                this.hoteldamageList = res.list
                this.$forceUpdate()
            })
        },
        priceTypeChange(e) {
            console.log(e)
            if (e == 5) {
                if (this.currentRoom) {
                    this.consumeOperForm.consumePrice = this.currentRoom.realPrice
                } else {
                    if (this.detailData && this.detailData.inRoomList.length) {
                        this.consumeOperForm.consumePrice = this.detailData.inRoomList[0].realPrice
                    } else {
                        this.consumeOperForm.consumePrice = ''
                        this.$message.error('暂无入住人');
                        return
                    }

                }

            } else if (e == 6) {
                if (this.currentRoom) {
                    this.consumeOperForm.consumePrice = (this.currentRoom.realPrice * 0.5).toFixed(2)
                } else {
                    if (this.detailData && this.detailData.inRoomList.length) {
                        this.consumeOperForm.consumePrice = (this.detailData.inRoomList[0].realPrice * 0.5).toFixed(2)
                    } else {
                        this.consumeOperForm.consumePrice = ''
                        this.$message.error('暂无入住人');
                        return
                    }
                }
            } else if (e == 7) {
                this.consumeOperForm.consumePrice = ''
            }
            this.$forceUpdate()
        },
        /**获取挂账企业 */
        hotelenter_list(name) {
            let searchForm = {
                id: '',
                enterName: name,
                state: '',
                shareFlag: '',
                contactName: '',
                contactPhone: '',
                salesId: '',
                startCreditLimit: '',
                endCreditLimit: '',
                paging: false,
                pageIndex: 1,
                pageSize: 10
            };
            this.loading = true
            this.$F.doRequest(this, '/pms/hotelenter/list', searchForm, (res) => {
                this.loading = false
                this.hotelenterList = res.list;

            })
        },
        remoteMethod(query) {
            if (query !== '') {
                this.hotelenterLoading = true;
                setTimeout(() => {
                    this.hotelenterLoading = false;
                    this.hotelenter_list(query)
                }, 200);
            } else {
                this.hotelenterList = [];
            }
        },
        enterNameChange(e) {
            console.log(e)
            this.consumeOperForm.enterId = e
            this.hotelenterList.forEach(element => {
                if (e == element.id) {
                    this.consumeOperForm.creditName = element.enterName
                }
            });
        },
        damageTypeIdChange(e) {
            console.log(e)
            // this.hoteldamage_list()
        },
        /**多选 */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /**每页数 */
        handleSizeChange(val) {
            this.searchForm.pageSize = val;
            this.searchForm.pageIndex = 1;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.pageIndex = val;
            this.getDataList();
        }
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
