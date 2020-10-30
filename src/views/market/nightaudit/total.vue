<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-07 11:18:31
 * @FilePath: /jiudian/src/views/market/nightaudit/list1.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div class="boss-index">
    <el-card class="box-card" v-loading="nightAuditShow" >
        <div slot="header" class="clearfix">
            <span>{{ $t('frontOffice.nightAudit.auditSuggest') }}</span>
<!--            <el-button style="float: right; padding: 3px 0" type="text" @click="recordShow=true">夜审记录</el-button>-->
        </div>
        <div class="row">
            <div class="grid-content">
                <el-badge :value="totalObject.gosettleCount" class="item">
                    <el-button size="small" icon="el-icon-document" @click="setCurrentItem('notyet')"> {{$t('desk.nightAudit.notyet')}} </el-button>
                </el-badge>
            </div>
            <div class="grid-content">
                <el-badge :value="totalObject.nocheckinCount" class="item">
                    <el-button size="small" icon="el-icon-document" @click="setCurrentItem('notleaving')">{{$t('desk.nightAudit.notleaving')}}</el-button>
                </el-badge>
            </div>
            <div class="grid-content">
                <el-badge :value="totalObject.pretrialCount" class="item">
                    <el-button size="small" icon="el-icon-document" @click="setCurrentItem('leave')">{{$t('desk.nightAudit.leave')}}</el-button>
                </el-badge>
            </div>
<!--            <div class="grid-content">-->
<!--                <el-badge :value="totalObject.nocheckoutCount" class="item">-->
<!--                    <el-button size="small" icon="el-icon-document" @click="setCurrentItem('verify')">{{$t('desk.nightAudit.verify')}}</el-button>-->
<!--                </el-badge>-->
<!--            </div>-->
        </div>
    </el-card>
    <div class="box-card">
        <el-button type="primary" class="submit" @click="nightAudit">{{ $t('frontOffice.nightAudit.audit') }}</el-button>
    </div>
    <el-dialog top="0" :visible.sync="recordShow" title="选择企业" width="600px" class="dialogCom">
 <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" @selection-change="handleSelectionChange" size="mini">
            <el-table-column prop="enterName" label="夜审时间（自然日）"></el-table-column>
            <el-table-column prop="enterName" label="夜审营业日" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterName" label="夜审结果" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterName" :label="$t('desk.home_operator')" show-overflow-tooltip></el-table-column>
        </el-table>
        <!--分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.page" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.page_num" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>

        <div slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" class="grey" @click="recordShow=false">关闭</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
export default {
    // props: ['totalObject'],
    data() {
        return {
            nightAuditShow: false,
            loading: false,
            recordShow:false,
            totalObject: {
                "gosettleCount": 1,    //应到未到
                "nocheckinCount": 1, //应离未离
                "pretrialCount": 1,  //走结数量
                "nocheckoutCount": 1  //预审订单
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
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [] //表格数据
        };
    },
    mounted() {
        this.initForm();
    },
    methods: {
        nightAudit() {
            this.$confirm( this.$t('frontOffice.nightAudit.auditTip'), this.$t('food.common.tip'), {
                confirmButtonText: this.$t('food.common.ok'),
                cancelButtonText: this.$t('food.common.cancel'),
                type: 'warning'
            }).then(() => {
                this.nightAuditShow = true;
                this.$F.doRequest(this, "/pms/night/audit", {}, (res) => {
                    setTimeout(() => {
                        this.nightAuditShow = false;
                        this.$message({
                            message: this.$t("commons.request_success"),
                            type: "success",
                        });
                    }, 3000)
                }, res => {
                    this.nightAuditShow = false;
                    if (res.code == 406) {
                        this.$message.error(res.message)
                    }

                });

            })
        },
        initForm() {
            this.searchForm = {
                searchType: 1,
                content: '',
                enterStatus: '',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.$F.doRequest(
                this,
                "/pms/night/audit_count",
                {
                    searchType: 1,
                    content: "",
                    enterStatus: "",
                    pageIndex: 1, //当前页
                    pageSize: 10, //页数
                    startTime: "", //考试时件
                    endTime: "", //结束时间
                },
                (res) => {
                    this.totalObject = res;
                }
            );
        },
        setCurrentItem(v) {
            this.$emit('getCurrentItem', v)
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
            this.searchForm.page_num = val;
            this.searchForm.page = 1;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.page = val;
            this.getDataList();
        }
    }
};
</script>

<style lang="scss" scoped>
    .box-card {
        height: auto;
        width: 1000px;
        margin: 50px auto 0;

        .row {
            display: flex;

            .grid-content {
                flex: 1;
                border-right: 1px solid #eee;
                text-align: center;
                padding: 80px 0;

                &:last-child{
                    border-right: 0;
                }

                .item {
                    max-width: 80%;
                    margin: auto;

                    .el-button {
                        display: block;
                        white-space: pre-wrap;
                        line-height: 22px;
                    }
                }
            }
        }
    }
</style>
