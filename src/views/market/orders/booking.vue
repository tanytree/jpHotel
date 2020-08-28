<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-14 16:19:54
 * @FilePath: /jiudian/src/views/market/orders/booking.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="100px">
            <el-row>
                <el-form-item label="订单状态：">
                    <div class="tagList">
                        <template v-for="(item,key,index) of $t('commons.reserveState')">
                            <el-tag class="tag" :type="searchForm.state==key?'':'info'" :key="index" @click="stateClick(key)">{{item}}</el-tag>
                        </template>
                    </div>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="预抵日期：">
                    <!-- <el-tag type="info">不限</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">上周</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">今日</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">本周</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">下周</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">自定义</el-tag>&nbsp;&nbsp; -->
                </el-form-item>
                <el-form-item label="">
                    <el-date-picker v-model="searchForm.checkinTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="预订日期：">
                    <!-- <el-tag type="info">不限</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">上周</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">今日</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">本周</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">下周</el-tag>&nbsp;&nbsp;
                    <el-tag type="info">自定义</el-tag>&nbsp;&nbsp; -->
                </el-form-item>
                <el-form-item label="">
                    <el-date-picker v-model="searchForm.createTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                </el-form-item>

            </el-row>
            <el-row>
                <el-form-item label="入住类型：">
                    <el-select v-model="searchForm.checkinType" class="width150">
                        <el-option :value="key" v-for="(item,key,index) of $t('commons.checkinType')" :label="item" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单来源：">
                    <el-select v-model="searchForm.orderSource" class="width150">
                        <el-option :value="key" v-for="(item,key,index) of $t('commons.orderSource')" :label="item" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="团队名称：">
                    <el-input v-model="searchForm.enterName" class="width150"></el-input>
                </el-form-item>
                <el-form-item label="预订单号：">
                    <el-input v-model="searchForm.orderNum" class="width150"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="预订人：">
                    <el-input v-model="searchForm.name" class="width150"></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input v-model="searchForm.mobile" class="width150"></el-input>
                </el-form-item>
                <el-form-item label="房型：">
                    <el-select v-model="searchForm.enterStatus" class="width150">
                        <el-option :label="item.houseName?item.houseName:'未知'" :value="item.roomTypeId" v-for="(item,index) of roomTypeList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房间号：">
                    <el-input v-model="searchForm.houseNum" class="width150"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="外部单号：">
                    <el-input v-model="searchForm.thirdOrdernum" class="width150"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getDataList">查询</el-button>
                    <el-button type="primary" @click="initForm">重置</el-button>
                    <el-button type="primary" @click="initForm">导出</el-button>
                </el-form-item>
                <el-form-item style="float:right">
                    <el-button type="text" icon="el-icon-arrow-up">收起</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="name" label="预订人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mobile" label="手机号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="预订时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="抵离时间" width="300">
                <template slot-scope="{row}">
                    <div class="box">
                        <div class="item">
                            <div>
                                <span class="text-blue">抵</span>{{row.checkinTime}}
                            </div>
                            <div>
                                <span class="text-red">离</span>{{row.checkoutTime}}
                            </div>
                        </div>
                        <div class="item">{{row.checkinDays}}天</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="operCheckinType" label="房型（房号）" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_operCheckinType(row.operCheckinType)}}
                </template>
            </el-table-column>
            <el-table-column prop="deposit" label="订金" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{row.deposit || 0}}
                </template>
            </el-table-column>
            <el-table-column prop="totalRoomPrice" label="总房费" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{row.totalRoomPrice || 0}}
                </template>
            </el-table-column>
            <el-table-column prop="" label="订单来源" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_orderSource(row.orderSource)}}
                </template>
            </el-table-column>
            <el-table-column prop="" label="状态" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_reserveState(row.state)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="handelDetail(row)">详情</el-button>
                    <template v-if="row.state!=7">
                        <el-button type="text" size="mini" v-if="!row.deposit" @click="handleDeposit(row)">订金</el-button>
                        <el-button type="text" size="mini" v-if="row.state==5" @click="handleNoshow(row)">NOSHOW</el-button>
                        <el-button type="text" size="mini" v-if="row.state != 8" @click="handleCancel(row)">取消</el-button>
<!--                        只有当渠道订单才会有接收和拒单-->
                        <el-button type="text" size="mini" v-if="row.state==1&&row.orderSource == 3" @click="handleAccept(row)">接受</el-button>
                        <el-button type="text" size="mini" v-if="row.state==1&&row.orderSource == 3" @click="handleRefuse(row)">拒单</el-button>
                        <el-button type="text" size="mini" v-if="row.state == 8" @click="handleReset(row)">恢复</el-button>
<!--                        <el-button type="text" size="mini" v-if="row.state==4" @click="handleReset(row)">撤销</el-button>-->
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top:10px"></div>
        <!--分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.page" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.page_num" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
    </el-card>
    <!-- 编辑or详情弹窗 -->
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
    <!--交订金-->
    <el-dialog title="交订金" :visible.sync="depositShow">
        <el-form :model="consumeOperForm" ref="deposit" size="mini" label-width="100px">
            <el-row>
                <el-col :span="8">预订单号：{{currentItem.reserveOrderNum}}</el-col>
                <el-col :span="8">预订人：{{currentItem.name}}</el-col>
            </el-row>
            <br />
            <el-form-item label="付款项目：">
                <el-radio-group v-model="consumeOperForm.priceType">
                    <el-radio-button :label="1" :value="1">订金</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="金额：">
                <el-input class="width100" v-model="consumeOperForm.payPrice" :autofocus="true" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input class="width200" type="textarea" v-model="consumeOperForm.remark" autocomplete="off"></el-input>
            </el-form-item>
<!--            <el-form-item label="打印单据：">-->
<!--                <el-checkbox v-model="consumeOperForm.name"></el-checkbox>-->
<!--            </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="deposit = false">关闭</el-button>
            <el-button type="primary" @click="consume_oper(1,'deposit')">结算</el-button>
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
            <el-button @click="payTypeShow = false">关闭</el-button>
            <el-button type="primary" @click="payTypeShow = false">结算</el-button>
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
            noShowDiaShow: false,
            showDetail: false,
            depositShow: false,
            payTypeShow: false,
            searchForm: {
                operCheckinType: '',
                enterName: '',
                houseNum: '',
                thirdOrdernum: '',
                orderNum: '',
                mobile: '',
                name: '',
                orderSource: '',
                checkinType: '',
                checkinTime: '',
                createTime: '',
                state: '',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [], //表格数据
            roomTypeList: [],
            currentItem: {},
            consumeOperForm: {
                priceType: '1',
                payType: '',
                name: ''
            },

        };
    },

    mounted() {
        this.initForm();
        this.realtime_room_statistics()
    },
    methods: {
        initForm() {
            this.searchForm = {
                operCheckinType: '',
                enterName: '',
                houseNum: '',
                thirdOrdernum: '',
                orderNum: '',
                mobile: '',
                name: '',
                orderSource: '',
                checkinType: '',
                checkinTime: '',
                createTime: '',
                state: '',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.$F.doRequest(this, '/pms/reserve/reserve_order_list', this.searchForm, (res) => {
                this.tableData = res.resreveList;
                this.listTotal = res.page.count
            })
        },
        realtime_room_statistics() {
            this.$F.doRequest(this, '/pms/realtime/realtime_room_statistics', this.searchForm, (res) => {
                this.roomTypeList = res.roomTypeList
            })
        },
        stateClick(key) {
            this.searchForm.state = key
        },
        handleNoshow(item) {
            this.currentItem = item;
            this.noShowDiaShow = true
        },
        handleDeposit(item) {
            this.currentItem = item;
            this.depositShow = true
        },
        handelDetail(item) {
            this.$router.push('/bookingDetail?id=' + item.id)
        },
        confirmNoshow() {
            let params = {
                checkInReserveId: this.currentItem.id,
                state: 4
            }
            this.$F.doRequest(this, '/pms/reserve/reserve_oper', params, (res) => {
                this.noShowDiaShow = false
                this.getDataList()
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });
            })
        },


        handleCancel(item) {
            let params = {
                checkInReserveId: item.id,
                state: 8
            }
            this.$confirm('请确认是否取消?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, '/pms/reserve/reserve_oper', params, (res) => {
                    this.getDataList()
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                })
            }).catch(() => {

            });
        },
        handleAccept(item) {
            let params = {
                checkInReserveId: item.id,
                state: 2
            }
            this.$confirm('请确认是否接受?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, '/pms/reserve/reserve_oper', params, (res) => {
                    this.getDataList()
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                })
            }).catch(() => {

            });
        },
        handleRefuse(item) {
            let params = {
                checkInReserveId: item.id,
                state: 3
            }
            this.$confirm('请确认是否拒绝?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, '/pms/reserve/reserve_oper', params, (res) => {
                    this.getDataList()
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                })
            }).catch(() => {

            });
        },
        handleReset(item) {
            let params = {
                checkInReserveId: item.id,
                state: 2
            }
            this.$confirm('请确认您的操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, '/pms/reserve/reserve_oper', params, (res) => {
                    this.getDataList()
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                })
            }).catch(() => {

            });
        },
        consume_oper(type, formName) {
            /**
             * 1.订金
             * 2.退订金
             *
             * **/
            let params = this.consumeOperForm

            params.checkinReserveId = this.currentItem.id

            if (this.currentItem.checkInRoomList.length) {
                params.roomId = this.currentItem.checkInRoomList[0].id
                params.roomNum = this.currentItem.checkInRoomList[0].houseNum
            } else {
                this.$message.error('请优先排房，添加入住人');
                return
            }

            //订金，退订金
            if (type == 1 || type == 2) { //这个type没什么意义，只是按照开发顺序或者按钮顺序来做个简单处理
                params.state = 2
                if (!params.priceType) {
                    this.$message.error('请选择付款项目');
                    return
                }
                if (params.priceType == 1 && !params.payType) {
                    this.payTypeShow = true
                    return
                }
                if (params.priceType == 1) {
                    if (params.payPrice < 0 || params.payPrice == 0) {
                        this.$message.error('请输入大于0的金额');
                        return
                    }
                }
                if (params.priceType == 4) {
                    // params.priceType == 1
                    if (params.consumePrice > 0 || params.consumePrice == 0) {
                        this.$message.error('请输入为负数金额');
                        return
                    }
                }
            }
            //冲调
            if (type == 3) { //这个type没什么意义，只是按照开发顺序或者按钮顺序来做个简单处理
                params.state = 2

                // params.priceType == 1
                if (params.consumePrice > 0 || params.consumePrice == 0) {
                    this.$message.error('请输入为负数金额');
                    return
                }
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$F.doRequest(this, '/pms/consume/consume_oper', params, (res) => {
                        this.depositShow = false
                        this.getDataList()
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
.tagList .tag {
    margin-right: 5px
}
</style>
