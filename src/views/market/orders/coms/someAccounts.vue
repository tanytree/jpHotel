<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-05 11:58:05
 * @FilePath: \jiudian\src\views\market\orders\coms\someAccounts.vue
 -->
<template>
<el-dialog :title="$t('desk.order_partBill')" top="0" :visible.sync="visible" :lock-scroll='false' width="800px">
    <el-form v-loading="loading" :model="consumeOperForm" ref="someAccounts" :rules="{}" size="mini" label-width="100px">
        <p>{{$t('desk.order_billExplain')}}</p>
        <el-table v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" @selection-change="handleSelectionChange" size="mini">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column :label="$t('desk.order_accountingProgram')" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_priceType(row.priceType)}}
                </template>
            </el-table-column>
            <el-table-column prop="consumePrice" :label="$t('desk.order_payment')" show-overflow-tooltip></el-table-column>
            <el-table-column prop="consumePrice" :label="$t('desk.order_expense')" show-overflow-tooltip></el-table-column>
            <el-table-column prop="consumePrice" :label="$t('desk.order_saleDay')" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" :label="$t('desk.enterAccountTime')" show-overflow-tooltip></el-table-column>
            <el-table-column prop="roomName" :label="$t('desk.home_roomNum')" show-overflow-tooltip></el-table-column>
            <el-table-column prop="creatorName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-row class="padding-tb-10">
            <span>{{ $t('desk.customer_totalConsum') }}：{{detailData.consumePrice}}</span>
            <span style="padding: 0 12px;">{{ $t('desk.order_allPay') }}：{{detailData.payPrice}}</span>
            <span>{{ $t('desk.order_shouldBack') }}：{{detailData.totalPrice}}</span>
        </el-row>
        <el-form-item label="" label-width="0">
            <el-button type="primary" size="mini" @click="openDialog(1)">{{ $t('desk.customer_collection') }}</el-button>
            <el-button type="primary" size="mini">{{$t('desk.charge')}}</el-button>
            <el-button type="primary" size="mini" @click="openDialog(2)">{{ $t('desk.customer_freeOfCharge') }}</el-button>
            <el-button type="primary" size="mini" @click="openDialog(3)">{{ $t('desk.customer_refund') }}</el-button>
        </el-form-item>
        <el-table v-loading="loading" :data="destructionList" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column :label="$t('desk.order_accountingProgram')" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_priceType(row.priceType)}}
                </template>
            </el-table-column>
            <el-table-column prop="consumePrice" :label="$t('desk.order_payment')" show-overflow-tooltip></el-table-column>
            <el-table-column prop="refund" :label="$t('desk.customer_refund')" show-overflow-tooltip></el-table-column>
            <el-table-column prop="creatorName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('commons.operating')">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="consume_move(scope.$index)">{{ $t('desk.customer_remove') }}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="visible=false">{{ $t('commons.cancel') }}</el-button>
        <el-button type="primary" @click="consume_oper(2,'onAccount')">{{ $t('desk.order_invoicing') }}</el-button>
    </div>


    <el-dialog :title="title" top="0" :visible.sync="getStatus" :modal="false">
        <el-form ref="form" :model="getForm" label-width="80px">
          <el-form-item :label="$t('desk.customer_paymentMethod')" required v-if="type == 1">
            <el-radio-group v-model="getForm.payType">
                <el-radio  v-for="(value, key) in $t('commons.payType')" :label="key" :key="key">{{value}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('desk.customer_paymentMethod')" required v-if="type == 2">
            <el-radio-group v-model="getForm.payType">
                <el-radio :label="0" :value="0">{{ $t('desk.customer_freeOfCharge') }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('desk.customer_paymentMethod')" required v-if="type == 3">
            <el-radio-group v-model="getForm.payType">
                <el-radio :label="0" :value="0">{{ $t('desk.order_cachRefund') }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('desk.customer_sum')" required>
            <el-input size="small" :placeholder="$t('desk.customer_sum')" v-model="getForm.amount"></el-input>
          </el-form-item>
          <el-form-item :label="$t('desk.home_note')">
            <el-input type="textarea" :placeholder="$t('desk.home_note')" v-model="getForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="getStatus = false">{{ $t('commons.cancel') }}</el-button>
            <el-button type="primary" @click="addDestructionList" >{{ $t('commons.confirm') }}</el-button>
        </div>
    </el-dialog>




</el-dialog>
</template>

<script>
Array.prototype.push2 = function () {
    for (var i = 0; i < arguments.length; i++) {
        var ele = arguments[i];
        if (this.indexOf(ele) == -1) {
            this.push(ele);
        }
    }
};
import myMixin from '@/utils/filterMixin';

export default {
    mixins: [myMixin],
    props:['detailData','currentRoom'],
    data() {
        return {
            id: '',
            type: '',
            visible: false,
            loading: true,
            searchForm: {
                searchType: 3,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [], //表格数据
            destructionList: [],
            consumeOperForm: {},
            getStatus:false,
            getForm:{
                payType:1,
                amount:'',
                remark:''
            },

            title:'收款',
            type:1
        };
    },
    computed: {},
    methods: {
        async init(id) {
            this.id = id
            this.initForm()
            this.visible = true;
        },
        initForm() {
            this.getDataList();
        },
        getDataList() {
            this.loading = true
            let params = {
                state: 1,
                checkInId: this.$route.query.id
            };
            this.$F.doRequest(this, '/pms/consume/consume_order_list', params, (res) => {
                console.log(res)
                this.tableData = res.consumeOrderList
                this.loading = false
                this.$forceUpdate()
            })
        },


        openDialog(v){
            if(v== 1){
                this.title = this.$t('desk.customer_collection')
                this.getForm.payType = 1
            }else if(v == 2){
                this.title =  this.$t('desk.customer_freeOfCharge')
                this.getForm.payType = 0
            }else if(v == 3){
                this.title =this.$t('desk.customer_refund')
                this.getForm.payType = 0
            }
            this.type = v
            this.getStatus = true
            console.log(this.getForm)
        },

        //添加财务数据
        addDestructionList(){
            let type  = this.type
            let obj = {
                creatorName:window.sessionStorage.getItem('account'),
                consumePrice:this.getForm.amount,
            }
            if(type == 1){
                obj.priceType = 3
                obj.refund = 0
            }else if(type == 2){
                obj.priceType = 11
                obj.refund = 0
            }else if(type == 3){
                obj.priceType = 4
                obj.consumePrice = 0
                obj.refund = this.getForm.amount
            }
            this.destructionList.push(obj)
            this.getStatus = false
            this.getForm = {
                payType:1,
                amount:'',
                remark:''
            }

        },
        //删除添加的财务数据
        consume_move(index){
           this.destructionList.splice(index, 1);
        },


        //
        consume_oper() {
            let params = {}
            params.checkInId = this.$route.query.id
            params.priceType = 8
            params.payType = 0
            params.state = 1
            params.remak = this.consumeOperForm.remark
            params.roomId = this.currentRoom.roorId;
            params.roomNum = this.currentRoom.houseNum
            this.$F.doRequest(this, '/pms/consume/consume_oper', params, (res) => {
              this.visible = false
              this.$emit('get_consume_order_list','');
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
.roomNumTag {
    position: relative;
    min-width: 100px;
}

.roomNumTag .del {
    display: none;
}

.roomNumTag:hover .del {
    display: block;
    z-index: 9;
    width: 100%;
    border-radius: 5px;
    font-size: 12px;
    font-style: normal;
    margin: 0;
    line-height: 38px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.66);
    color: #fff
}
</style>
