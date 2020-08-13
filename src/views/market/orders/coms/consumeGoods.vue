<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-13 15:56:46
 * @FilePath: /jiudian/src/views/market/orders/coms/consumeGoods.vue
 -->
<template>
<el-dialog top='0' title="迷你吧" :visible.sync="visible" :lock-scroll='false' width="1200px">
        <el-row :gutter="20">
            <el-col :span="14">
                <el-row>
                    <div class="">
                        <el-form inline size="small" label-width="100px">
                            <el-form-item label="商品名称：">
                                <el-input v-model="searchForm.name" style="width:150px"></el-input>
                            </el-form-item>
                            <el-form-item label="商品类别：">
                                <el-select v-model="searchForm.storesNum" style="width:150px">
                                    <el-option label="全部" value=""></el-option>
                                    <!-- <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum">
                                    </el-option> -->
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="getDataList">查询</el-button>
                                <el-button type="primary" @click="initForm">重置</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
                            <el-table-column label="商品名称" show-overflow-tooltip>
                                <template slot-scope="{row}">
                                    {{F_priceType(row.priceType)}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="consumePrice" label="商品类别" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="consumePrice" label="商品单价(元)" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="consumePrice" label="员工价(元)" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="createTime" label="库存" show-overflow-tooltip></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="{row}">
                                    <el-button type="text" size="mini">添加</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-row>
            </el-col>
            <el-col :span="10">
                <div class="">
                    <h3>已选商品</h3>
                    <el-table v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
                        <el-table-column label="商品名称" show-overflow-tooltip>
                            <template slot-scope="{row}">
                                {{F_priceType(row.priceType)}}
                            </template>
                        </el-table-column>

                        <el-table-column prop="consumePrice" label="单价(元)" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="consumePrice" label="数量" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="createTime" label="合计(元)" show-overflow-tooltip></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="{row}">
                                <el-button type="text" size="mini">移除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-row class="padding-tb-10">
                        <em>共十件</em>，合计：50元
                    </el-row>
                    <el-form size="mini">
                        <el-form-item label="按员工价：">
                            <el-checkbox v-model="consumeOperForm.name"></el-checkbox>
                        </el-form-item>
                        <el-form-item label="选择房间：">
                            <el-select v-model="consumeOperForm.damageTypeId">
                                <!-- <el-option v-for="item in hoteldamagetypeList" :key="item.id" :label="item.name" :value="item.id">
                                </el-option> -->
                            </el-select>

                        </el-form-item>
                        <el-form-item label="入账金额：">
                            50
                        </el-form-item>
                        <el-form-item label="备注：">
                            <el-input class="width200" type="textarea" v-model="consumeOperForm.remark" autocomplete="off"></el-input>
                        </el-form-item>

                    </el-form>
                </div>
            </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="visible = false">确认</el-button>
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
            consumeOperForm:{
                name:''
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
            this.searchForm = {
                orderId:this.id,
                pageIndex:1,
                pageSize:10
            };
            this.getDataList();
        },
        getDataList() {
            this.loading = true
            this.$F.doRequest(this, '/pms/consume/consume_goods_list', this.searchForm, (res) => {
                this.tableData = res.consumeGoodsList;
                this.listTotal = res.page.count
                
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
