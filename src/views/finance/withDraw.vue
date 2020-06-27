<!--
 * @Date: 2020-03-20 12:13:31
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-16 16:43:47
 * @FilePath: /cloudAdmin/src/views/finance/withDraw.vue
 -->
<template>
    <div>
        <el-card>
            <el-form inline label-width="80px">
                <el-form-item label="用户名称">
                    <el-input></el-input>
                </el-form-item>
                <!-- <el-form-item label="充值日前"></el-form-item> -->
                <!-- <el-form-item label="提现类型">
                  <el-select>
                    <el-option>现金</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="提现状态">
                  <el-select>
                    <el-option>现金</el-option>
                  </el-select>
                </el-form-item>-->
                <el-form-item>
                    <el-button @click="getDataList">查询</el-button>
                    <el-button @click="initForm">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table
                    size="mini"
                    :data="tableData"
                    :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
            >
                <el-table-column prop="agent_name" label="客户名称"></el-table-column>
                <el-table-column prop="create_time" label="申请时间"></el-table-column>
                <el-table-column prop="price" label="提现金额"></el-table-column>
                <el-table-column prop="balance" label="分销账户余额"></el-table-column>
                <el-table-column label="提现类型">
                    <template slot-scope="{row}">{{row.users_type==1?'分销商':'合伙人'}}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{row}">
                        <el-button size="mini" @click="getDetail(row)">详情</el-button>
                        <el-button v-if="row.type==1" size="mini" @click="shenghe(row)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top:10px"></div>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="searchForm.page"
                    :page-sizes="[10, 50, 100, 200]"
                    :page-size="searchForm.page_num"
                    layout=" sizes, prev, pager, next, jumper"
                    :total="listTotal"
            ></el-pagination>
        </el-card>
        <el-dialog :close-on-click-modal="false" :visible.sync="detailVisibal" title="详情">
            <el-form label-width="80px">
                <el-form-item label="用户名称">{{drawDetail.agent_name}}</el-form-item>
                <el-form-item label="提现金额">{{drawDetail.price}}</el-form-item>
                <!-- <el-form-item label="提现类型">{{drawDetail.agent_name}}</el-form-item> -->
                <el-form-item label="账户余额">{{drawDetail.balance}}</el-form-item>
                <el-form-item label="审核时间">{{drawDetail.agree_time}}</el-form-item>
                <el-form-item label="审核说明">{{drawDetail.remarks}}</el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :visible.sync="editVisibal">
            <el-form>
                <el-form-item label="选择审核结果">
                    <el-radio-group v-model="applyForm.type">
                        <el-radio label="2">通过</el-radio>
                        <el-radio label="3">不通过</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="审核说明">
                    <el-input type="textarea" v-model="applyForm.remarks"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="editVisibal = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import {
        get_withdraw_list,
        get_withdraw_info,
        withdrawapply
    } from '@/utils/api/finance'

    export default {
        data () {
            return {
                detailVisibal: false,
                editVisibal: false,
                searchForm: {},
                drawDetail: {},
                tableData: [],
                applyForm: {},
                listTotal: 0
            }
        },
        created () {
            this.getDataList()
        },
        methods: {
            initForm () {
                this.searchForm = {
                    page: 1, //当前页
                    page_num: 10, //页数
                    keywords: '', //关键字
                    start_time: '', //考试时件
                    end_time: '' //结束时间
                }
                this.getDataList()
            },
            /**获取表格数据 */
            getDataList () {
                get_withdraw_list(this.searchForm).then(res => {
                    if (res.code == 200) {
                        this.tableData = res.data.list
                        this.listTotal = res.data.total
                    }
                })
            },
            getDetail (row) {
                get_withdraw_info({ id: row.id }).then(res => {
                    if (res.code == 200) {
                        this.drawDetail = res.data
                        this.detailVisibal = true
                    }
                })
            },
            /**显示审核 */
            shenghe (row) {
                this.applyForm = {
                    id: row.id,
                    type: '1',
                    remarks: ''
                }
                this.editVisibal = true
            },
            /**审核 */
            dataFormSubmit () {
                withdrawapply(this.applyForm).then(res => {
                    if (res.code == 200) {
                        this.$message.success(res.message)
                        this.getDataList()
                    } else {
                        this.$message.error(res.message)
                    }
                    this.detailVisibal = false
                })
            },

            /**每页数 */
            handleSizeChange (val) {
                this.searchForm.page_num = val
                this.searchForm.page = 1
                this.getDataList()
            },
            /**当前页 */
            handleCurrentChange (val) {
                this.searchForm.page = val
                this.getDataList()
            }
        }
    }
</script>

<style>
</style>
