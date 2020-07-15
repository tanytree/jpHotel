<!--
 * @Date: 2020-03-20 19:11:04
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-13 17:52:16
 * @FilePath: /cloudAdmin/src/views/finance/account/bill.vue
 -->
<template>
    <div class="income">
        <el-card>
            <el-form inline size="small">
                <el-form-item label="交易类型">
                    <el-select v-model="form.modelType">
                      <el-option value="" label="全部"></el-option>
                      <el-option value="1" label="当前课程"></el-option>
                      <el-option value="2" label="活动课程"></el-option>
                      <el-option value="3" label="场地预定"></el-option>
                      <el-option value="4" label="门票"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="交易时间">
                    <el-date-picker
                            v-model="form.startTime"
                            value-format="yyyy-MM-dd"
                            type="date"
                            style="width:140px"
                            placeholder="选择日期"
                    ></el-date-picker>
                    <span style="margin:0 5px">-</span>
                    <el-date-picker
                            v-model="form.endTime"
                            value-format="yyyy-MM-dd"
                            type="date"
                            style="width:140px"
                            placeholder="选择日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="订单编号">
                    <el-input v-model="form.orderNumber"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="fetchBillList()">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm(true)">重置</el-button>
                </el-form-item>
            </el-form>
            <div style="padding-bottom:10px">
                <el-button
                        type="danger"
                        size="mini"
                        @click="deleteHandle()"
                        :disabled="multipleSelection.length <= 0"
                >批量删除
                </el-button>
                <label style="margin-left: 10px">已选<span>({{multipleSelection.length}})</span></label>
            </div>
            <el-table
                    :data="tableData"
                    :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
                    size="medium"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" :disabled="tableData.length > 0"></el-table-column>
                <el-table-column label="交易类型">
                    <template slot-scope="{row}">
                      <span v-if="row.modelType ==1">当前课程</span>
                      <span v-if="row.modelType ==2">活动课程</span>
                      <span v-if="row.modelType ==3">场地预定</span>
                      <span v-if="row.modelType ==4">门票</span>
                    </template>
                </el-table-column>
                <el-table-column prop="orderNumber" label="订单编号"></el-table-column>
                <el-table-column prop="createTime" label="交易时间"></el-table-column>
                <!-- <el-table-column prop="money_type" label="交易类型"></el-table-column> -->
                <el-table-column label="交易金额" prop="orderPrice"> </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{row}">
<!--                        <el-button type="text" size="mini" @click="deleteHandle(row.id)">详情</el-button>-->
                        <el-button type="text" size="mini" @click="deleteHandle(row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top:10px"></div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pageSize"
              :total="totalPage"
              layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>
        </el-card>
    </div>
</template>

<script>
    import { get_consume_list, del_consume_info } from '@/utils/api/finance'

    export default {
        data () {
            return {
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                showTop: false,
                tableData: [],
                multipleSelection: [], //多选
                total: 10,
                form: {
                    orderNumber: '', //订单编号
                    modelType: '', //交易类型
                    startTime: '',
                    endTime: '',
                }
            }
        },
        created () {
            this.resetForm()
            this.fetchBillList()
        },
        methods: {
            resetForm (query) {
                this.form = { }
                this.pageIndex = 1
                this.pageSize = 10
                this.totalPage = 0
                if (query) {
                    this.fetchBillList()
                }
            },

            // 删除
            deleteHandle (id) {
                var ids = id
                    ? [id]
                    : this.multipleSelection.map(item => {
                        return item.id
                    })
                this.$confirm(
                    `确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`,
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(() => {
                    this.$F.doRequest(this, '/edt/shopadmin/shop_goods_order_deletes', {orderIds: ids.join(',')}, (data) => {
                        this.$message.success('删除订单成功');
                        this.fetchBillList();
                    })
                })
                .catch(() => {
                    // this.$message.error("系统错误");
                })
            },
            /**多选 */
            handleSelectionChange (val) {
                this.multipleSelection = val
            },

            /**获取列表数据 */
            fetchBillList (params = {}) {
                this.$F.merge(params, {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                })
                this.$F.merge(params, this.form);
                this.$F.doRequest(this, '/edt/shopadmin/scores_order_list', params, (data) => {
                    this.tableData = data.list
                    this.totalPage = data.totalSize
                })
            },
            // 每页数
            handleSizeChange (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.fetchBillList()
            },
            // 当前页
            handleCurrentChange (val) {
                this.pageSize = 10
                this.pageIndex = val
                this.fetchBillList()
            },
        }
    }
</script>

<style>
</style>
