/* * @Author: Dana     *@Date: 2020-03-13 13:50:56  * @Last Modified by:   Dana  * @Last Modified time: 2020-03-13 13:50:56  */
<template>
    <div class="sec1" v-loading="dataListLoading">
        <el-form :model="form" :inline="true" class="top-body" size="small" label-width="80px">
            <el-form-item label="用户名称">
                <el-input v-model="form.userName" style="width:150px" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="报名时间">

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
            <el-form-item>
                <el-button @click="queryActivityList()" type="primary">查询</el-button>
                <el-button @click="resetForm(true)">重置</el-button>
            </el-form-item>
        </el-form>

        <el-tabs class="subTab" v-model="form.applyStatus" @tab-click="queryActivityList(true)">
            <el-tab-pane label="全部" name="10"></el-tab-pane>
            <el-tab-pane label="待审核" name="0"></el-tab-pane>
            <el-tab-pane label="未通过" name="2"></el-tab-pane>
            <el-tab-pane label="已通过" name="1"></el-tab-pane>
        </el-tabs>
        <div class="components-edit">
            <div class="components-table">
                <el-table
                        ref="multipleTable"
                        :data="activityList"
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

                    <el-table-column prop="createTime" label="报名时间"></el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.applyStatus == 0">待审核</span>
                            <span v-if="scope.row.applyStatus == 1">已通过</span>
                            <span v-if="scope.row.applyStatus == 2">未通过</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="showDetail(scope.row)">查看</el-button>
                            <el-button type="text" size="mini" @click="applyShow(scope.row)" v-if="scope.row.applyStatus == 0">审核</el-button>
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
        <el-dialog title="查看" :close-on-click-modal="false" width="800px" :visible.sync="showDetailVisible" @close="showDetailVisible = false">
            <el-form size="small" label-width="110px" :model="selected" class="demo-form-inline">
                <div class="show-title">基本信息</div>
                <el-form-item label="姓名">
                    <span>{{selected.eactivityApplySub.name}}</span>
                </el-form-item>
                <el-form-item label="性别">
                    <span v-if="selected.eactivityApplySub.sex == 1">男</span>
                    <span v-if="selected.eactivityApplySub.sex == 2">女</span>
                </el-form-item>
                <el-form-item label="年龄">
                    <span>{{selected.eactivityApplySub.age}}</span>
                </el-form-item>
                <el-form-item label="特长">
                    <span>{{selected.eactivityApplySub.eactivityApplySub}}</span>
                </el-form-item>
            </el-form>
            <el-form size="small" label-width="110px" :model="selected" class="demo-form-inline">
                <div class="show-title">学历信息</div>
                <el-form-item label="学校">
                    <span>{{selected.eactivityApplySub.school}}</span>
                </el-form-item>
                <el-form-item label="年级">
                    <span>{{selected.eactivityApplySub.classRoom}}</span>
                </el-form-item>
            </el-form>
            <el-form size="small" label-width="110px" :model="selected" class="demo-form-inline">
                <div class="show-title">联系地址</div>
                <el-form-item label="电话">
                    <span>{{selected.eactivityApplySub.phone}}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                    <span>{{selected.eactivityApplySub.email}}</span>
                </el-form-item>
                <el-form-item label="地址">
                    <span>{{selected.eactivityApplySub.address}} {{selected.eactivityApplySub.addressDetail}}</span>
                </el-form-item>
            </el-form>
            <el-form size="small" label-width="110px" :model="selected" class="demo-form-inline">
                <div class="show-title">报名信息</div>
                <el-form-item label="用户名称">
                    <span>{{selected.edtUser.nickName || selected.userName}}</span>
                </el-form-item>
                <el-form-item label="报名时间">
                    <span>{{selected.eactivityApplySub.createTime}}</span>
                </el-form-item>
                <el-form-item label="报名活动">
                    <span>{{selected.eactivityApplySub.activityName}} - {{selected.eactivityApplySub.activitySubName}}</span>
                </el-form-item>
                <el-image v-for="(url) in selected.eactivityApplySub.applyIconArray" :key="url"
                          style="width: 100px; height: 100px"
                          :src="url"
                          :preview-src-list="selected.eactivityApplySub.applyIconArray">
                </el-image>
            </el-form>

            <el-form v-if='selected.applyStatus != 0' size="small" label-width="110px" :model="selected" class="demo-form-inline">
                <div class="show-title">审核结果</div>
                <el-form-item label="报名结果">
                    <template>
                        <span v-if="selected.applyStatus != 1">通过</span>
                        <span v-if="selected.applyStatus != 2">不通过</span>
                    </template>
                </el-form-item>
                <el-form-item label="审核时间">
                    <span>{{selected.updateTime}}</span>
                </el-form-item>
                <el-form-item label="评选说明">
                    <span>{{selected.applyContent}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDetailVisible = false">取消</el-button>
                <el-button type="primary" @click="dataFormSubmit('ruleForm')">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="报名审核" :close-on-click-modal="false" width="550px" :visible.sync="applyVisible" @close="applyClose">
            <el-form size="small" label-width="110px" :model="selected" ref="applyForm" class="demo-form-inline" :rules="rules">
                <el-form-item label="审核意见:">
                    <template>
                        <el-radio v-model="selected.applyStatus" label="1">通过</el-radio>
                        <el-radio v-model="selected.applyStatus" label="2">未通过</el-radio>
                    </template>
                </el-form-item>

                <el-form-item label="评选说明:">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 6, maxRows: 10}"
                            placeholder="请填写评选说明"
                            v-model="selected.applyContent">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="applyVisible = false">取消</el-button>
                <el-button type="primary" @click="applySubmit( 'applyForm')">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { get_co_group_list, del_co_group } from '@/utils/api/market'
    import { mapState, mapActions } from 'vuex'

    let id = 0
    export default {
        props: ['activeties'],
        computed: {},
        data () {
            return {
                actives: [],   //活动子活动
                applyVisible: false,
                chooseTime: '',
                showDetailVisible: false,
                selected: {
                    eactivityApplySub: {},
                    edtUser: {}
                },
                selectedIndex: 0,
                pageIndex: 1,
                pageSize: 8,
                totalPage: 0,
                dataListLoading: false,
                activityList: [],  //课程列表
                form: {
                    time: '',
                    courseName: '',
                    userName: '',
                    startTime: '',
                    endTime: '',
                    applyStatus: '10',
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
            this.fetchActivityList()
        },
        methods: {
            /*通知上课提交*/
            applySubmit (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log({
                            applyId: this.selected.id,
                            applyStatus: this.selected.applyStatus,
                            applyContent: this.selected.applyContent
                        })
                        this.$F.doRequest(this, '/edt/Adminactivity/sub_activity_apply_check', {
                            applyId: this.selected.id,
                            applyStatus: this.selected.applyStatus,
                            applyContent: this.selected.applyContent
                        }, (data) => {
                            this.$message.success('报名审核成功')
                            this.applyClose(true)
                        })
                    }
                })
            },
            applyClose (flag) {
                this.applyVisible = false
                this.$refs['applyForm'].resetFields()
                if (!flag) {
                    this.selected.schoolTime = ''
                }
            },
            showDetail (node) {
                // this.selected = node;
                // this.showDetailVisible = true;
                this.$F.doRequest(this, '/edt/Adminactivity/sub_activity_apply_detail', {
                    applyId: node.id,
                }, (data) => {
                    this.selected = data
                    if (data.eactivityApplySub.applyIcon) {
                        this.selected.eactivityApplySub.applyIconArray = data.eactivityApplySub.applyIcon.split(',')
                    }
                    this.showDetailVisible = true
                })
            },
            applyShow (node) {
                this.applyVisible = true
                this.chooseTime = ''
                this.selected = node
                this.selected.applyStatus = '1'
            },
            resetForm (query) {
                this.form = {
                    courseName: '',
                    time: '',
                    userName: '',
                    startTime: '',
                    endTime: '',
                    applyStatus: '10',
                    channelId: ''
                }
                this.actives = []
                this.pageIndex = 1
                this.pageSize = 8
                this.totalPage = 0
                if (query) {
                    this.fetchActivityList()
                }
            },

            /*点击查询按钮*/
            queryActivityList (switchFlag) {
                if (!switchFlag) {
                    this.form.applyStatus = '10'
                }
                this.pageIndex = 1
                this.fetchActivityList()
            },

            /*获取列表接口*/
            fetchActivityList (params = {}) {
                console.log(this.pageIndex)
                this.$F.merge(params, this.form)
                this.$F.merge(params, {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    modelType: 1,    //订单模块类型 1课程
                    applyStatus: this.form.applyStatus == 10 ? '' : this.form.applyStatus
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
                        activitySubId: this.actives[1],
                    })
                }
                this.$F.doRequest(this, '/edt/Adminactivity/sub_activity_apply_list', params, (data) => {
                    this.activityList = data.list
                    this.totalPage = data.totalSize
                })
            },

            // 每页数
            handleSizeChange (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.fetchActivityList()
            },
            // 当前页
            handleCurrentChange (val) {
                this.pageSize = 8
                this.pageIndex = val
                this.fetchActivityList()
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
</style>
