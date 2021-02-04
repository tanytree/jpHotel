<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-12 14:56:59
 * @FilePath: \jiudian\src\views\market\orders\coms\someAccounts.vue
 -->
<template>
<el-dialog :title="$t('desk.order_partBill')" top="0" :visible.sync="visible" :lock-scroll='false' width="800px">
    <el-form v-loading="loading" ref="someAccounts" :rules="{}" size="mini" label-width="100px">
        <p>{{$t('desk.order_billExplain')}}</p>
        <el-table v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" @selection-change="handleSelectionChange" size="mini">
            <el-table-column type="selection" width="55" :selectable="selectable">
            </el-table-column>
            <el-table-column :label="$t('desk.order_accountingProgram')" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_priceType(row.priceType)}}
                </template>
            </el-table-column>
            <el-table-column :label="$t('desk.order_payment')" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{numFormate(getPriceStr(row.payPrice))}}
                </template>

            </el-table-column>
            <el-table-column prop="consumePrice" :label="$t('desk.order_expense')" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{numFormate(getPriceStr(row.consumePrice))}}
                </template>
            </el-table-column>
            <el-table-column  :label="$t('desk.order_saleDay')" show-overflow-tooltip>
                <template slot-scope="{row}">
                </template>
            </el-table-column>
            <el-table-column prop="createTime" :label="$t('desk.enterAccountTime')" show-overflow-tooltip></el-table-column>
            <el-table-column prop="roomName" :label="$t('desk.home_roomNum')" show-overflow-tooltip></el-table-column>
            <el-table-column prop="creatorName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-row class="padding-tb-10">

        </el-row>


    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="visible=false">{{ $t('commons.cancel') }}</el-button>
        <el-button type="primary" @click="consume_oper">{{ $t('desk.order_invoicing') }}</el-button>
    </div>

    <checkoutPart ref="checkoutPart" :currentRoom="currentRoom" @getOrderDetail="getOrderDetail" ></checkoutPart>

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
import checkoutPart from "./checkoutPartPay";
export default {
    mixins: [myMixin],
    props:['currentRoom'],
    components:{checkoutPart},
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
            multipleSelection: [], //多选
            tableData: [], //表格数据
            priceTypeList:[9,10]
        };
    },
    computed: {
      title(){
        return this.$t('desk.customer_collection');
      }
    },
    methods: {
        selectable(row, index) {
            return row.richType != 1;
        },
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
                console.log(res.consumeOrderList)
                let list = res.consumeOrderList
                let arr = []
                list.forEach(element => {
                    if(element.priceType&&this.priceTypeList.indexOf(element.priceType) == -1 && element.state == 1){
                        arr.push(element)
                    }
                })
                this.tableData = arr
                this.loading = false
            })
        },

        //理解结账
        consume_oper() {
            let list = this.multipleSelection
            if(list.length == 0){
                alert('请选择一个项目')
                return false
            }
            this.$refs.checkoutPart.resetVisibel(list)
            console.log(this.multipleSelection)

        },

        /**多选 */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },



        getOrderDetail(){
            console.log('part')
            this.visible = false
            this.$emit('getOrderDetail')
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
