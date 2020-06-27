<template>
    <!-- 产品列表 -->
    <div class="sec1" v-loading="dataListLoading">
        <el-form :model="form" inline class="top-body" size="small" label-width="80px">
            <el-form-item label="产品名称" label-width="70px">
                <el-input v-model="form.title" style="width:180px" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="实际销量">
                <el-input v-model="form.startBuyCount" type="number" :min="0" class="input" placeholder=""></el-input>
                <span class="space">-</span>
                <el-input v-model="form.endBuyCount" type="number" :min="0" class="input" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="产品类型">
                <el-select v-model="form.type" style="width:150px" placeholder="产品类型">
                    <el-option label="全部" value></el-option>
                    <el-option label="当前课程" value="1"></el-option>
                    <el-option label="活动课程" value="2"></el-option>
                    <el-option label="场地" value="3"></el-option>
                    <el-option label="演出" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="一口价">
                <el-input v-model="form.startPrice" type="number" class="input" min="0" placeholder=""></el-input>
                <span class="space">-</span>
                <el-input v-model="form.endPrice" type="number" class="input" min="0" placeholder=""></el-input>
            </el-form-item>
            <div class="btns">
                <el-button @click="pageIndex=1;fetchGoodList()" type="primary">查询</el-button>
                <el-button @click="resetForm(true)">重置</el-button>
                <el-button @click="editProduct({})" type="primary" class="add-others">新增商品</el-button>
            </div>
        </el-form>

        <div style="margin-top:10px;width:250px">
            <el-button
                    type="danger"
                    size="mini"
                    @click="deleteHandle()"
                    :disabled="dataListSelections.length <= 0"
            >批量删除
            </el-button>

            <!--      <el-button size="mini" :disabled="dataListSelections.length <= 0" @click="changeMStatus(1)">上架</el-button>-->
            <!--      <el-button size="mini" :disabled="dataListSelections.length <= 0" @click="changeMStatus(2)">下架</el-button>-->
          <span class="delate-select" style="margin-left: 10px">已选({{ dataListSelections.length }})</span>
        </div>


        <div class="components-edit">
            <div class="components-table">
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;padding: 8px 0 ! important;" height="100%" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" @selection-change="selectionChangeHandle">
                    <el-table-column type="selection" width="55" :selectable='authCheckAble'></el-table-column>
                    <el-table-column label="商品">
                        <template slot-scope="scope">
                            <img :src="scope.row.icon" class="goodsImg"/>
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable label="产品类型">
                      <template slot-scope="{row}">
                        <span v-if="row.type == 1">当前课程</span>
                        <span v-if="row.type == 2">活动课程</span>
                        <span v-if="row.type == 3">演出</span>
                        <span v-if="row.type == 4">场地</span>
                      </template>
                    </el-table-column>
                    <el-table-column sortable label="实际销量">
                        <template slot-scope="{row}">
                            <div v-if="row.buyCount">{{row.buyCount}}</div>
                            <div v-else>0</div>
                        </template>
                    </el-table-column>
                    <el-table-column sortable label="总库存" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <div v-if="row.total">{{row.total}}</div>
                            <div v-else>无</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="产品价格" show-overflow-tooltip></el-table-column>
                    <el-table-column label="创建时间" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <div>{{row.createTime}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="use_num" label="上架" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            <el-switch
                                    :active-value="0"
                                    :inactive-value="1"
                                    v-model="row.shelvesStatus"
                                    @change="val=>changeStatus(row, val)"
                            />
                            <span class="shopStatus">{{row.shelvesStatus=='0'?'已上架':'未上架'}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="ceneter" label="操作">
                        <template slot-scope="{row, $index}">
                            <el-button type="text" @click="editProduct(row, $index)">编辑产品</el-button>
<!--                            <el-button type="text" size="mini" @click="deleteHandle(row)">删除</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[8, 16, 30, 50]"
                        :page-size="pageSize"
                        :total="totalPage"
                        layout="total, sizes, prev, pager, next, jumper"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        get_goods_list,
        edit_goods_status,
        del_goods_info
    } from '@/utils/api/market'

    export default {
        data () {
            return {
                pageIndex: 1,
                pageSize: 8,
                totalPage: 0,
                showTop: false,
                tableData: [],
                dataListLoading: false,
                dataListSelections: [],
                form: {}
            }
        },
        created () {
            this.resetForm()
            this.fetchGoodList()
        },
        methods: {
            resetForm (query) {
                this.form = {
                    type: '',   //商品类型
                    title: '',  //商品名模糊查询
                    buyCount: [],
                    price: [],
                    shelvesStatus: '',
                }
                this.pageIndex = 1
                this.pageSize = 8
                this.totalPage = 0
                if (query) {
                    this.fetchGoodList()
                }
            },

            /**新增 / 修改 */
            editProduct (row, index) {
                this.form = row;
                this.$emit('setProductDetail', row);
            },
            /**删除 */
            deleteHandle () {
                let data = this.dataListSelections;
                var ids =
                    data && data.id
                        ? [data.id]
                        : this.dataListSelections.map(item => {
                            return item.id
                        })
                var nameS =
                    data && data.name
                        ? [data.name]
                        : this.dataListSelections.map(item => {
                            return item.name
                        })
                this.$confirm(
                    `确定对 [ ${nameS.join(',')} ] 进行 [ ${
                        data && data.id ? '删除' : '批量删除'
                    } ] 操作?`,
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                )
                .then(() => {
                    var products = [];
                    this.dataListSelections.map(item => {
                        let temp = {};
                        temp[item.type.toString()] = [item.id];
                        products.push(temp);
                    })
                    this.$F.doRequest(this, '/edt/adminsystem/product_save', {
                        status: 1,
                        productList: JSON.stringify(products)
                    }, (data) => {
                        this.$message.success('删除成功');
                        this.fetchGoodList();
                    })
                })
                .catch(() => {
                })
            },
            changeMStatus (status) {
                var ids = this.dataListSelections.map(item => {
                    return item.id
                })
                this.changeStatus(ids.join(','), status)
            },

            /**商品上下架 */
            changeStatus (row, val) {
                var product = {};
                product[row.type.toString()] = [row.id];
                this.$F.doRequest(this, '/edt/adminsystem/product_save', {
                    shelvesStatus: val,
                    productList: JSON.stringify( [product])
                }, (data) => {
                    this.$message.success('商品状态更新成功');
                })
            },

            handleUpdate(product, type) {
                this.$F.doRequest(this, '/edt/adminsystem/product_save', {
                    shelvesStatus: val,
                    productList: JSON.stringify( [product])
                }, (data) => {
                    this.$message.success('商品状态更新成功');
                })
            },

            /**商品删除 */
            deleteProduct (id) {
                this.$F.doRequest(this, '/edt/adminsystem/product_save', {
                    shelvesStatus: val,
                }, (data) => {
                    this.tableData = data.list
                    this.totalPage = data.totalSize
                })
            },

            /**获取列表数据 */
            fetchGoodList (params = {}) {
                console.log(this.pageIndex)
                this.$F.merge(params, {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    // shelvesStatus: this.form.shelvesStatus,
                })
                this.$F.merge(params, this.form)
                this.$F.doRequest(this, '/edt/adminsystem/product_list', params, (data) => {
                    this.tableData = data.list
                    this.totalPage = data.totalSize
                })
            },
            // 每页数
            handleSizeChange (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.fetchGoodList()
            },
            // 当前页
            handleCurrentChange (val) {
                this.pageSize = 8
                this.pageIndex = val
                this.fetchGoodList()
            },
            selectionChangeHandle (val) {
                this.dataListSelections = val
            },

            authCheckAble (row) {
                return row.shelvesStatus !== 0
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .goodsImg {
        width: 30px;
        height: 30px;
        vertical-align: middle;
    }

    .top-close {
        display: flex;
        align-items: center;
        float: right;
        cursor: pointer;
        padding-right: 10px;
        padding-top: 20px;
        font-size: 14px;

        i {
            margin-left: 8px;
        }
    }

    .shopStatus {
        color: rgba(9, 109, 217, 1);
        font-size: 12px;
        margin-left: 10px;
    }

    .sec1 {
        width: 100%;
        display: flex;
        flex-direction: column;

        .top-body {
            padding: 20px;

            .input {
                width: 100px;
            }

            .space {
                margin: 0 5px;
            }
        }
    }

    .components-edit {
        margin-top: 10px;
        flex: 1;

        .components-table {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .block {
            padding: 10px 20px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .page-all {
                font-size: 12px;
                color: #666666;
                letter-spacing: 2px;
            }
        }
    }
</style>
