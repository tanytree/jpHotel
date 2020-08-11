<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-11 17:49:51
 * @FilePath: /jiudian/src/views/market/orders/coms/finance.vue
 -->
<template>
<div class="finance">
    <!-- 查询部分 -->
    <el-form inline size="small">
        <el-row>
            <el-form-item label="">
                <el-button type="primary" size="mini">入账</el-button>
                <el-button type="primary" size="mini">挂账</el-button>
                <el-button type="primary" size="mini">迷你吧</el-button>
                <el-button type="primary" size="mini">结账</el-button>
                <el-button type="primary" size="mini">开发票</el-button>
                <el-button type="primary" size="mini">打印</el-button>
                <el-button type="primary" size="mini">冲调</el-button>
                <el-button type="primary" size="mini">部分结账</el-button>
                <el-button type="primary" size="mini">撤销结账</el-button>
                <el-button type="primary" size="mini">撤销退房</el-button>
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

    <el-dialog title="入账" :visible.sync="entryShow">
        <el-form :model="consumeOperForm" size="mini" label-width="100px">
            <p>快速入账项目</p>
            <el-form-item label="付款项目：">
                <el-radio-group v-model="consumeOperForm.priceType">
                    <el-radio-button label="收款" :value="4"></el-radio-button>
                    <el-radio-button label="押金" :value="2"></el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="消费项目：">
                <el-radio-group v-model="consumeOperForm.priceType">
                    <el-radio-button label="加收全天房费" :value="5"></el-radio-button>
                    <el-radio-button label="加收半天房费" :value="6"></el-radio-button>
                    <el-radio-button label="损物赔偿" :value="7"></el-radio-button>
                </el-radio-group>
            </el-form-item>
            <template v-if="consumeOperForm.priceType==7">
                <el-form-item label="房间日用品：" v-model="consumeOperForm.name">
                    <el-option v-for="item in 10" :key="item" :label="item" :value="item">
                    </el-option>
                </el-form-item>
                <el-form-item label="房间日用品：" v-model="consumeOperForm.name">
                    <el-option v-for="item in 10" :key="item" :label="item" :value="item">
                    </el-option>
                    <el-input-number v-model="num" :min="1" :max="10" label=""></el-input-number>
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
            <el-button type="primary" @click="consume_oper">入账</el-button>
        </div>
    </el-dialog>
    <el-dialog title="选择结算方式" :visible.sync="payTypeShow">
        <el-form :model="consumeOperForm" size="mini">
            <el-form-item label="">
                <el-radio-group v-model="consumeOperForm.payType">
                    <el-radio-button label="现金" :value="1"></el-radio-button>
                    <el-radio-button label="银行卡" :value="2"></el-radio-button>
                    <el-radio-button label="支付宝" :value="3"></el-radio-button>
                    <el-radio-button label="微信" :value="4"></el-radio-button>
                    <el-radio-button label="会员卡" :value="5"></el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="payTypeShow = false">关闭</el-button>
            <el-button type="primary" @click="payTypeShow">入账</el-button>
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
    props: ['currentRoom','detailData'],

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
            entryShow: true,
            payTypeShow:false,
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
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [{}] //表格数据
        };
    },

    mounted() {
        let id = this.$route.query.id
        this.consume_order_list()
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
        consume_oper() {
            /** 
             * 
             * 
             * 
             * **/
            
            let params = this.consumeOperForm
            params.checkInId = this.$route.query.id
            if(this.currentRoom){
                params.roomId = this.currentRoom.id
                params.roomNum = this.currentRoom.houseNum
            }else if(this.detailData){
                if(this.detailData.inRoomList.length){
                     params.roomId = this.detailData.inRoomList[0].id
                params.roomNum = this.detailData.inRoomList[0].houseNum
                }else{
                    this.$message.error('暂无入住人');
                    return
                }
               
            }
            this.$F.doRequest(this, '/pms/consume/consume_oper', params, (res) => {
                this.entryShow = false
                this.consume_order_list()
            })
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
