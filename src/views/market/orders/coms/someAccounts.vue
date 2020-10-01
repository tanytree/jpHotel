<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-14 09:48:22
 * @FilePath: /jiudian/src/views/market/orders/coms/someAccounts.vue
 -->
<template>
<el-dialog title="部分结账" top="0" :visible.sync="visible" :lock-scroll='false' width="800px">
    <el-form v-loading="loading" :model="consumeOperForm" ref="someAccounts" :rules="{}" size="mini" label-width="100px">
        <p>选择账务：自动计费、已冲调、已结的账务不可部分结账</p>
        <el-table v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" @selection-change="handleSelectionChange" size="mini">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="账务项目" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_priceType(row.priceType)}}
                </template>
            </el-table-column>
            <el-table-column prop="consumePrice" label="付款" show-overflow-tooltip></el-table-column>
            <el-table-column prop="consumePrice" label="消费" show-overflow-tooltip></el-table-column>
            <el-table-column prop="consumePrice" label="营业日" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="入账时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="roomName" label="房间号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="creatorName" label="操作人" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-row class="padding-tb-10">
            <el-col :span="3">
                总消费：{{detailData.consumePrice}}
            </el-col>
            <el-col :span="3">
                总支付：{{detailData.payPrice}}
            </el-col>
            <el-col :span="3">
                应退：{{detailData.totalPrice}}
            </el-col>





        </el-row>
        <el-form-item label="" label-width="0">
            <el-button type="primary" size="mini">收款</el-button>
            <el-button type="primary" size="mini">挂账</el-button>
            <el-button type="primary" size="mini">免单</el-button>
            <el-button type="primary" size="mini">退款</el-button>
        </el-form-item>
        <el-table v-loading="loading" :data="destructionList" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column label="账务项目" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{F_priceType(row.priceType)}}
                </template>
            </el-table-column>
            <el-table-column prop="consumePrice" label="付款" show-overflow-tooltip></el-table-column>
            <el-table-column prop="consumePrice" label="退款" show-overflow-tooltip></el-table-column>
            <el-table-column prop="creatorName" label="操作人" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="consume_move(row)">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="visible=false">取消</el-button>
        <el-button type="primary" @click="consume_oper(2,'onAccount')">结账</el-button>
    </div>
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
    props:['detailData'],
    data() {
        return {
            id: '',
            type: '',
            visible: false,
            loading: true,
            searchForm: {
                mobile: '',
                idcard: '',
                name: '',
                searchType: 3,
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                paging: true
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [], //表格数据
            destructionList: [],
            consumeOperForm: {
                name: ''
            }
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
                this.tableData = res.consumeOrderList
                this.loading = false
                this.$forceUpdate()
            })
        },
        already_room_join(id) {
            return new Promise((resolve, reject) => {
                this.$F.doRequest(this, '/pms/checkin/already_room_join', {
                    roomId: id
                }, (res) => {
                    this.roomJoinList = res || []
                    resolve(res)
                })
            })
        },
        dataFormSubmit() {
            let joinRoomIds = [];
            joinRoomIds.push()
            this.roomJoinList.forEach(element => {
                joinRoomIds.push(element.id || element.roomId)
            });
            let params = {
                roomId: this.id,
                joinRoomIds: joinRoomIds,
            }
            this.$confirm('请确认联房', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, '/pms/checkin/check_in_room_join', params, (res) => {
                    this.visible = false
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                })
            }).catch(() => {

            });

        },
        handleAdd(item) {
            let room = {
                houseNum: item.houseNum,
                roomId: item.id
            }
            this.roomJoinList.push2(room)
        },
        handleDel(i, item) {
            console.log(item)
            if (item.id) {
                this.$F.doRequest(this, '/pms/checkin/move_room_join', {
                    joinId: item.id
                }, (res) => {
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.already_room_join(this.id)
                })
            } else if (item.roomId) {
                this.roomJoinList.splice(i, 1)
            }
        },
        checkItem(id) {
            if (JSON.stringify(this.roomJoinList).indexOf(id) != -1) {
                return true
            }
            return false
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
