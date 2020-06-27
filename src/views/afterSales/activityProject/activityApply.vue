/* * @Author: Dana     *@Date: 2020-03-13 13:50:56  * @Last Modified by:   Dana  * @Last Modified time: 2020-03-13 13:50:56  */
<template>
    <div class="sec1" v-loading="dataListLoading">
        <el-form :model="form" inline class="top-body" size="small" label-width="80px">
            <el-form-item label="用户名称">
                <el-input v-model="form.userName" style="width:150px" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="申请时间">

                <el-date-picker
                        v-model="form.time"
                        type="datetimerange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        align="right"
                        unlink-panels
                        range-separator="--"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="报名活动">
                <el-cascader :props="props" v-model="actives"></el-cascader>
            </el-form-item>
            <el-form-item label="申请课程">
                <el-input v-model="form.courseName" style="width:150px" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="queryactivityCourseList()" type="primary">查询</el-button>
                <el-button @click="resetForm(true)">重置</el-button>
            </el-form-item>
        </el-form>

        <el-tabs class="subTab" v-model="form.edtNotice" @tab-click="queryactivityCourseList(true)">
            <el-tab-pane label="全部" name="10"></el-tab-pane>
            <el-tab-pane label="待通知" name="0"></el-tab-pane>
            <el-tab-pane label="已通知" name="1"></el-tab-pane>
            <el-tab-pane label="待上课" name="2"></el-tab-pane>
            <el-tab-pane label="已上课" name="3"></el-tab-pane>
        </el-tabs>
        <div class="components-edit">
            <div class="components-table">
                <el-table
                        ref="multipleTable"
                        :data="activityCourseList"
                        tooltip-effect="dark"
                        style="width: 100%;padding: 8px 0 ! important;"
                        height="100%"
                        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
                >
                    <el-table-column label="用户名称">
                        <template slot-scope="scope">
                            <span>{{scope.row.userName}}</span>
                            <label>
                                <span v-if="scope.row.edtUser.memberType == 0">(普通用户)</span>
                                <span v-if="scope.row.edtUser.memberType == 1">(会员)</span>
                                <span v-if="scope.row.edtUser.memberType == 2">(超级会员)</span>
                            </label>
                        </template>
                    </el-table-column>
                    <!--            <el-table-column prop="activityName" label="报名活动"></el-table-column>-->
                    <el-table-column label="报名活动" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.activityName}}</span>
                            <span>-</span>
                            <span>{{scope.row.activitySubName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="申请时间"></el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.edtNotice == 0">待通知</span>
                            <span v-if="scope.row.edtNotice == 1">已通知</span>
                            <span v-if="scope.row.edtNotice == 2">待上课</span>
                            <span v-if="scope.row.edtNotice == 3">已上课</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="schoolTime" label="上课时间">
                        <template slot-scope="scope">
                            <span v-if="scope.row.schoolTime">{{scope.row.schoolTime}}</span>
                            <span v-else>未通知</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="showDetail(scope.row)">查看</el-button>
                            <el-button type="text" size="mini" @click="notice(scope.row)" v-if="scope.row.edtNotice == 0">通知上课</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[8, 16, 50]"
                        :page-size="pageSize"
                        :total="totalPage"
                        layout="total, sizes, prev, pager, next, jumper"
                ></el-pagination>
            </div>
        </div>
        <el-dialog title="查看" :close-on-click-modal="false" width="700px" :visible.sync="showDetailVisible" @close="showDetailVisible = false">
            <el-form size="small" label-width="110px" :model="selected" class="demo-form-inline">
                <div class="show-title">申请信息</div>
                <el-form-item label="用户名称">
                    <span>{{selected.userName}}</span>
                </el-form-item>
                <el-form-item label="申请时间">
                    <span>{{selected.createTime}}</span>
                </el-form-item>
                <el-form-item label="申请课程">
                    <span>{{selected.courseName}}</span>
                </el-form-item>
                <el-form-item label="报名活动">
                    <span>{{selected.activityName}}-{{selected.activitySubName}}</span>
                </el-form-item>
            </el-form>

            <el-form size="small" label-width="110px" :model="selected" class="demo-form-inline">
                <div class="show-title">上课信息</div>
                <el-form-item label="状态">
                    <template>
                        <span v-if="selected.edtNotice == 0">待通知</span>
                        <span v-if="selected.edtNotice == 1">已通知</span>
                        <span v-if="selected.edtNotice == 2">待上课</span>
                        <span v-if="selected.edtNotice == 3">已上课</span>
                    </template>
                </el-form-item>
                <el-form-item label="上课时间" v-if="selected.schoolTime">
                    <span>{{selected.schoolTime}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDetailVisible = false">取消</el-button>
                <el-button type="primary" @click="dataFormSubmit('ruleForm')">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="通知上课" :close-on-click-modal="false" width="550px" :visible.sync="noticeVisible" @close="noticeClose">
            <el-form size="small" label-width="110px" :model="selected" ref="noticeForm" class="demo-form-inline" :rules="rules">
                <el-form-item label="选择上课时间" prop="schoolTime">
                    <el-date-picker
                            style="width: 300px"
                            type="datetime"
                            placeholder="请选择"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            class="dateBox"
                            v-model="selected.schoolTime"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <span>提交后会立即在用户端通知学生上课时间</span>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="noticeVisible = false">取消</el-button>
                <el-button type="primary" @click="noticeSubmit( 'noticeForm')">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { get_co_group_list, del_co_group } from '@/utils/api/market'
    import { mapState, mapActions } from 'vuex'

    export default {
        props: ['courseTypes', 'activeties'],
        computed: {},
        data () {
            return {
                actives: [],   //活动子活动
                noticeVisible: false,
                chooseTime: '',
                showDetailVisible: false,
                selected: {},
                selectedIndex: 0,
                pageIndex: 1,
                pageSize: 8,
                totalPage: 0,
                dataListLoading: false,
                activityCourseList: [],  //课程列表
                form: {
                    time: '',
                    courseName: '',
                    userName: '',
                    startTime: '',
                    endTime: '',
                    edtNotice: '10',
                    channelId: ''
                },
                rules: {
                    schoolTime: [
                        { required: true, message: '上课时间不能为空', trigger: 'change' }
                    ]
                },
                //加载子活动
                props: {
                    lazy: true,
                    expandTrigger: 'hover',
                    lazyLoad: (node, resolve) => {
                        const { level } = node
                        if (level == 0) {
                            if (this.activeties.length > 0) {
                                resolve(this.$F.changeActivityDatas(this.activeties))
                            } else {
                                this.$F.doRequest(null, '/edt/Admincourse/activity_list', {}, (data) => {
                                    resolve(this.$F.changeActivityDatas(data))
                                })
                            }
                        } else {
                            this.$emit('fetchSecondActiveties', node.value, (data) => {
                                resolve(this.$F.changeActivityDatas(data, true))
                            })
                        }
                    }
                }
            }
        },
        created () {
            this.resetForm()
            this.fetchActivityCourseList()
        },
        methods: {
            /*通知上课提交*/
            noticeSubmit (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$F.doRequest(this, '/edt/shopadmin/edt_course_notice_status', {
                            orderId: this.selected.id,
                            schoolTime: this.selected.schoolTime,
                            status: '1'
                        }, (data) => {
                            this.noticeClose(true)
                        })
                    }
                })
            },
            noticeClose (flag) {
                this.noticeVisible = false
                this.$refs['noticeForm'].resetFields()
                if (!flag) {
                    this.selected.schoolTime = ''
                }
            },
            showDetail (node) {
                this.selected = node
                this.showDetailVisible = true
                // this.$F.doRequest(this, '/edt/shopadmin/scores_order_detail', {
                //   orderId: this.selected.id,
                // }, (data)=> {
                //   this.showDetailVisible = true;
                // })
            },
            notice (node) {
                this.noticeVisible = true
                this.chooseTime = ''
                this.selected = node
            },
            resetForm (query) {
                this.form = {
                    courseName: '',
                    time: '',
                    userName: '',
                    startTime: '',
                    endTime: '',
                    edtNotice: '10'
                }
                this.actives = []
                this.pageIndex = 1
                this.pageSize = 8
                this.totalPage = 0
                if (query) {
                    this.fetchActivityCourseList()
                }
            },

            /*点击查询按钮*/
            queryactivityCourseList (switchFlag) {
                if (!switchFlag) {
                    this.form.edtNotice = '10'
                }
                this.pageIndex = 1
                this.fetchActivityCourseList()
            },

            /*获取列表接口*/
            fetchActivityCourseList (params = {}) {
                console.log(this.pageIndex)
                this.$F.merge(params, this.form)
                this.$F.merge(params, {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    modelType: 1,    //订单模块类型 1课程
                    orderStatus: 2,  //订单状态 订单状态 2已支付
                    edtType: 2,       //课程类型 1课程 2活动课程 int 必填
                    edtNotice: this.form.edtNotice == 10 ? '' : this.form.edtNotice
                })
                if (this.form.time && this.form.time.length > 0) {
                    this.$F.merge(params, {
                        startTime: this.form.time[0],
                        endTime: this.form.time[1],
                    })
                    delete params['time']
                }
                if (this.actives.length > 0) {
                    this.$F.merge(params, {
                        activityId: this.actives[0],
                        activitySubId: this.actives[1]
                    })
                }
                this.$F.doRequest(this, '/edt/shopadmin/scores_order_list', params, (data) => {
                    this.activityCourseList = data.list
                    this.totalPage = data.totalSize
                })
            },

            // 每页数
            handleSizeChange (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.fetchActivityCourseList()
            },
            // 当前页
            handleCurrentChange (val) {
                this.pageSize = 8
                this.pageIndex = val
                this.fetchActivityCourseList()
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .show-title {
        color: rgba(51, 51, 51, 1);
        font-size: 16px;
        text-align: left;
        font-family: PingFangSC-Medium;
        margin: 0 0 15px 40px;
        font-weight: 600;
    }

    /*.el-form .el-input__inner {*/
    /*  border: 0 !important;*/
    /*}*/
</style>
