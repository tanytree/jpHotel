/* * @Author: Dana     *@Date: 2020-03-13 13:50:56  * @Last Modified by:   Dana  * @Last Modified time: 2020-03-13 13:50:56  */
<template>
    <div class="sec1" v-loading="dataListLoading">
        <el-form :model="form" inline class="top-body" size="small" label-width="80px">
            <el-form-item label="用户名称">
                <el-input v-model="form.userName" style="width:150px" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="留言时间">
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
            <el-form-item label="留言课程">
                <el-input v-model="form.courseName" style="width:150px" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="queryLeaveMessageList()" type="primary">查询</el-button>
                <el-button @click="resetForm(true)">重置</el-button>
            </el-form-item>
        </el-form>

        <el-tabs class="subTab" v-model="form.commentType" @tab-click="queryLeaveMessageList(true)">
            <el-tab-pane label="全部" name="10"></el-tab-pane>
            <el-tab-pane label="待回复" name="1"></el-tab-pane>
            <el-tab-pane label="已回复" name="2"></el-tab-pane>
        </el-tabs>
        <div class="components-edit">
            <div class="components-table">
                <el-table
                        ref="multipleTable"
                        :data="leaveMessageList"
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
                    <el-table-column label="相关活动" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.activityName}}</span>
                            <span>-</span>
                            <span>{{scope.row.activitySubName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="courseName" label="留言课程"></el-table-column>
                    <el-table-column prop="createTime" label="留言时间"></el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <span v-if="!scope.row.contentBack">待回复</span>
                            <span v-else>已回复</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="showDetail(scope.row)">查看</el-button>
                            <!--                <el-button type="text" size="mini" @click="notice(scope.row)" v-if="scope.row.commentType == 0">立即回复</el-button>-->
                            <el-button type="text" size="mini" @click="notice(scope.row, scope.$index)" v-if="!scope.row.contentBack">立即回复</el-button>
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
        <el-dialog title="详情" :close-on-click-modal="false" width="700px" :visible.sync="showDetailVisible" @close="showDetailVisible = false">
            <el-form size="small" label-width="110px" :model="selected" class="demo-form-inline">
                <el-form-item label="留言人：">
                    <span>{{selected.userName}}</span>
                </el-form-item>
                <el-form-item label="留言内容：">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 10}"
                            placeholder="请输入内容"
                            v-model="selected.content">
                    </el-input>
                </el-form-item>
                <div>
                    <label>
                        <span>发布时间：</span>
                        <span>{{selected.createTime}}</span>
                    </label>
                    <label>
                        <span>相关活动：</span>
                        <span>{{selected.activityName}}-{{selected.activitySubName}}</span>
                    </label>
                    <label>
                        <span>留言课程：</span>
                        <span>{{selected.courseName}}</span>
                    </label>
                </div>
                <div v-if="selected.contentBack">
                    <div>
                        <span>回复信息：</span>
                    </div>
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 10}"
                            v-model="selected.contentBack">
                    </el-input>
                </div>
            </el-form>
        </el-dialog>

        <el-dialog title="回复" :close-on-click-modal="false" width="50%" :visible.sync="backMessageVisible" @close="backMessageClose">
            <el-form size="small" label-width="110px" class="demo-form-inline" :rules="rules">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 16, maxRows: 23}"
                        placeholder="请填写回复内容（必填）"
                        v-model="contentBack">
                </el-input>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="backMessageVisible = false">取消</el-button>
                <el-button type="primary" @click="leaveMessageSubmit()">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        props: ['courseTypes', 'activeties'],
        computed: {},
        data () {
            return {
                contentBack: '',
                backMessageVisible: false,
                chooseTime: '',
                showDetailVisible: false,
                selected: {},
                $index: 0,
                selectedIndex: 0,
                pageIndex: 1,
                pageSize: 8,
                totalPage: 0,
                dataListLoading: false,
                leaveMessageList: [],  //课程列表
                form: {
                    time: '',
                    courseName: '',
                    userName: '',
                    startTime: '',
                    endTime: '',
                    commentType: '10',
                    channelId: ''
                },
                actives: [],   //活动子活动
                //加载子活动
                props: {
                    expandTrigger: 'hover',
                    lazy: true,
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
                },
                rules: {
                    schoolTime: [
                        { required: true, message: '上课时间不能为空', trigger: 'change' }
                    ]
                }
            }
        },
        created () {
            this.resetForm()
            this.fetchLeaveMessageList()
        },
        methods: {
            /*提交回复*/
            leaveMessageSubmit () {
                if (!this.contentBack) {
                    this.$message.info('回复内容不能为空')
                } else {
                    this.$F.doRequest(this, '/edt/Admincourse/course_comment_save', {
                        commentId: this.selected.id,
                        contentBack: this.contentBack
                    }, (data) => {
                        this.$message.success('回复成功')
                        this.$set(this.leaveMessageList, this.$index, this.selected)
                        this.backMessageClose(true)
                    })
                }
            },
            backMessageClose () {
                this.backMessageVisible = false
                this.contentBack = ''
            },
            showDetail (node) {
                this.$F.doRequest(this, '/edt/Admincourse/course_comment_detail', {
                    commentId: node.id,
                    courseType: 2   //活动
                }, (data) => {
                    this.selected = data
                    this.showDetailVisible = true
                })

            },
            notice (node, index) {
                this.backMessageVisible = true
                this.chooseTime = ''
                this.selected = node
                this.$index = index
            },
            resetForm (query) {
                this.form = {
                    courseName: '',
                    time: '',
                    userName: '',
                    startTime: '',
                    endTime: '',
                    commentType: '10'
                }
                this.pageIndex = 1
                this.pageSize = 8
                this.totalPage = 0
                if (query) {
                    this.fetchLeaveMessageList()
                }
            },

            /*点击查询按钮*/
            queryLeaveMessageList (switchFlag) {
                if (!switchFlag) {
                    this.form.commentType = '10'
                }
                this.pageIndex = 1
                this.fetchLeaveMessageList()
            },

            /*获取列表接口*/
            fetchLeaveMessageList (params = {}) {
                console.log(this.pageIndex)
                this.$F.merge(params, this.form)
                this.$F.merge(params, {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    courseType: 2,    //订单模块类型 2活动
                    commentType: this.form.commentType == 10 ? '' : this.form.commentType   //评选类型 1待回复 2 已回复
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
                this.$F.doRequest(this, '/edt/Admincourse/course_comment_list', params, (data) => {
                    this.leaveMessageList = data.list
                    this.totalPage = data.totalSize
                })
            },

            // 每页数
            handleSizeChange (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.fetchLeaveMessageList()
            },
            // 当前页
            handleCurrentChange (val) {
                this.pageSize = 8
                this.pageIndex = val
                this.fetchLeaveMessageList()
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
