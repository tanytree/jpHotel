/* * @Author: Dana     *@Date: 2020-03-13 13:50:56  * @Last Modified by:   Dana  * @Last Modified time: 2020-03-13 13:50:56  */
<template>
    <div class="sec1">
        <el-form :model="form" inline class="top-body" size="small" label-width="80px">
            <el-form-item label="用户名称">
                <el-input v-model="form.userName" style="width:150px" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="上传时间">
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
            <el-form-item label="相关课程">
                <el-input v-model="form.courseName" style="width:150px" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="fetchCourseList()" type="primary">查询</el-button>
                <el-button @click="resetForm(true)">重置</el-button>
            </el-form-item>
        </el-form>

        <el-tabs class="subTab" v-model="form.examStatus" @tab-click="handleClick">
            <el-tab-pane label="全部" name="10"></el-tab-pane>
            <el-tab-pane label="待评选" name="0"></el-tab-pane>
            <el-tab-pane label="已评选" name="1"></el-tab-pane>
        </el-tabs>
        <div class="components-edit">
            <div class="components-table">
                <el-table
                        ref="multipleTable"
                        :data="courseList"
                        tooltip-effect="dark"
                        style="width: 100%;padding: 8px 0 ! important;"
                        height="100%"
                        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
                        v-loading="dataListLoading"
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
                    <el-table-column prop="courseName" label="课程名称" show-overflow-tooltip></el-table-column>

                    <el-table-column prop="createTime" label="上传时间">

                    </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.examStatus == 0">待评选</span>
                            <span v-if="scope.row.examStatus == 1">已评选</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="showDetail(scope.row)">查看</el-button>
                            <el-button type="text" size="mini" @click="kpiShow(scope.row)" v-if="scope.row.examStatus == 0">评选</el-button>
                            <!--                <el-button type="text" size="mini" @click="kpiShow(scope.row)">评选</el-button>-->
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
                <div class="show-title">考试信息</div>
                <el-form-item label="用户名称">
                    <span>{{selected.userName}}</span>
                </el-form-item>
                <el-form-item label="考试时间">
                    <span>{{selected.createTime}}</span>
                </el-form-item>
                <el-form-item label="课程分类">
                    <span>{{selected.channelName}}</span>
                </el-form-item>
                <el-form-item label="考试课程">
                    <span>{{selected.courseName}}</span>
                </el-form-item>
                <el-form-item label="考试课程">
                    <!--          <span class="play-exam" @click="playVideo(selected.examVideo)"></span>-->
                    <!--          <router-link :to="selected.examVideo" target="_blank" class="el-icon-video-camera"></router-link>-->
                    <a class="play-exam el-icon-video-camera" target="_blank" :href="selected.examVideo"></a>
                </el-form-item>
            </el-form>

            <el-form size="small" label-width="110px" :model="selected" class="demo-form-inline" v-if="selected.examStatus == 1">
                <div class="show-title">评选结果</div>
                <el-form-item label="分数">
                    <span>{{selected.examScore}}</span>
                </el-form-item>
                <el-form-item label="奖励获得">
                    <span v-if="selected.examCertificate">证书</span>
                    <span v-if="selected.examCertificate && selected.examScholarship">; </span>
                    <span v-if="selected.examScholarship">奖金</span>
                </el-form-item>
                <el-form-item label="评选时间">
                    <span>{{selected.updateTime}}</span>
                </el-form-item>
                <el-form-item label="评选说明">
                    <span>{{selected.examComment}}</span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
<!--        <el-button @click="showDetailVisible = false">取消</el-button>-->
<!--        <el-button type="primary" @click="dataFormSubmit('ruleForm')">确定</el-button>-->
      </span>
        </el-dialog>


        <el-dialog title="考试评选" :close-on-click-modal="false" width="700px" :visible.sync="kpiVisible" @close="kpiVisible = false">
            <el-form size="small" ref="kpiForm" :model="kpiForm" :rules="rules">
                <el-form-item label="分数" prop="examScore">
                    <el-input v-model="kpiForm.examScore"></el-input>
                </el-form-item>
                <el-form-item label="奖励">
                    <el-checkbox-group v-model="kpiForm.awardsTypes" @change="scholarshipHandleCheck">
                        <el-checkbox label="0">无</el-checkbox>
                        <el-checkbox label="1" :disabled="kpiForm.awardsTypes.indexOf('0') > -1">证书</el-checkbox>
                        <el-checkbox label="2" :disabled="kpiForm.awardsTypes.indexOf('0') > -1" >
                            <span>奖学金</span>
                            <template>
                <span class="scholar-desc" v-if="kpiForm.awardsTypes.indexOf('0') == -1">
                  {{kpiForm.scholarshipDesc}}
                </span>
                            </template>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 6, maxRows: 10}"
                            placeholder="请填写评选内容"
                            v-model="kpiForm.examComment">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
          <el-button @click="kpiVisible = false">取消</el-button>
          <el-button type="primary" @click="kpiSubmit('kpiForm')">确定</el-button>
        </span>
        </el-dialog>

        <el-dialog title="选择奖学金" :close-on-click-modal="false" width="700px" :visible.sync="scholarshipVisable" @close="scholarshipVisable = false">
            <el-form size="small" ref="kpiForm" :model="kpiForm">
                <el-radio-group v-model="scholarshipSelected">
                    <el-radio v-for="item in scholarshipList" :label="item.id" :key="item.id">
                        <template>
                            <label>
                                <span>{{item.createTime}}</span>
                                <span>{{item.awardsTitle}}</span>
                                <span>{{item.awardsMoney}}</span>
                                <span>{{item.awardsRange}}</span>
                            </label>
                        </template>
                    </el-radio>
                    <br>
                </el-radio-group>
            </el-form>
            <span slot="footer" class="dialog-footer">
          <el-button @click="scholarshipVisable = false">取消</el-button>
          <el-button type="primary" @click="scholarshipSubmit('kpiForm')">确定</el-button>
        </span>
        </el-dialog>
        <!--    <video :url="selected.examVideo" v-if="playFlag"></video>-->
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        props: ['courseTypes'],
        computed: {},
        data () {
            return {
                oncehadChoose: false,  //在同一个操作内是否勾选过
                scholarshipSelected: '',  //奖学金选中得值
                scholarshipVisable: false,
                scholarshipList: [],
                kpiVisible: false,
                kpiForm: {
                    awardsTypes: ['0']
                },
                playFlag: false,
                noticeVisible: false,
                chooseTime: '',
                showDetailVisible: false,
                selected: {},
                selectedIndex: 0,
                pageIndex: 1,
                pageSize: 8,
                totalPage: 0,
                dataListLoading: false,
                courseList: [],  //课程列表
                dataListSelections: [],
                form: {
                    time: '',
                    courseName: '',
                    userName: '',
                    startTime: '',
                    endTime: '',
                    examStatus: '10',
                    channelId: ''
                },
                rules: {
                    examScore: [
                        { required: true, message: '上课时间不能为空', trigger: 'change' }
                    ],
                    // awardsTypes: [
                    //   { required: true, message: '上课时间不能为空', trigger: 'change' }
                    // ]
                }
            }
        },
        created () {
            this.resetForm()
            this.fetchCourseList();
            this.$F.doRequest(this, '/edt/Admincourse/edt_awards_list', {
                awardsType: 2,    //证书
                awardsStatus: 2,   //待使用
                pageIndex: 1,
                pageSize: 100
            }, (data) => {
                this.scholarshipList = data.list

            })
        },
        methods: {
            scholarshipSubmit () {
                this.oncehadChoose = true
                const object = this.scholarshipList.filter(item => {
                    return item.id == this.scholarshipSelected
                })
                this.scholarshipVisable = false
                this.kpiForm.scholarshipDesc = object[0].awardsRange
            },
            scholarshipHandleCheck (val) {
                console.log(this.kpiForm.awardsTypes)
                if (val.indexOf('0') > -1) {
                    this.kpiForm.awardsTypes = ['0']
                    this.kpiForm.scholarshipDesc = ''
                    this.oncehadChoose = false
                    return
                }
                if (val.indexOf('2') > -1 && !this.oncehadChoose) {
                    this.scholarshipSelected = this.scholarshipList.length > 0 ? this.scholarshipList[0].id : '';
                    this.scholarshipVisable = true
                }
            },
            /*开始评选相关methods*/
            kpiSubmit (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$F.doRequest(this, 'edt/Admincourse/course_exam_grade', {
                            examId: this.selected.id,    //考试id
                            examScore: this.kpiForm.examScore,
                            examComment: this.kpiForm.examComment,
                            awardsTypes: this.kpiForm.awardsTypes.join(','),
                            awardsId: this.scholarshipSelected || ''
                        }, (data) => {
                            this.oncehadChoose = false
                            this.selected.examStatus = 1
                            this.$message.success('提交考试评选成功')
                            this.kpiVisible = false
                        })
                    }
                })
            },
            kpiShow (node) {
                this.selected = node
                this.kpiVisible = true
            },
            showDetail (node) {

                this.$F.doRequest(this, '/edt/Admincourse/course_exam_detail', {
                    examId: node.id,
                    courseType: 1
                }, (data) => {
                    this.selected = data
                    this.selected.channelId = data.course.channelId;
                    console.log(this.courseTypes)
                    let array = this.courseTypes.filter((item) => {
                        return item.id == this.selected.channelId;
                    })
                    if (array && array.length > 0) {
                        this.selected.channelName = array[0].name;
                    }
                    this.showDetailVisible = true
                })
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
                    examStatus: '10',
                }
                this.pageIndex = 1
                this.pageSize = 8
                this.totalPage = 0
                if (query) {
                    this.fetchCourseList()
                }
            },

            handleClick (val) {
                this.form.pageIndex = 1
                this.fetchCourseList()
            },
            /*获取列表接口*/
            fetchCourseList (params = {}) {
                console.log(this.pageIndex)
                this.$F.merge(params, this.form)
                this.$F.merge(params, {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    modelType: 1,    //订单模块类型 1课程
                    orderStatus: 2,  //订单状态 订单状态 2已支付
                    courseType: 1,       //课程类型 1课程 2活动课程 int 必填
                    examStatus: this.form.examStatus == 10 ? '' : this.form.examStatus
                })
                if (this.form.time && this.form.time.length > 0) {
                    this.$F.merge(params, {
                        startTime: this.form.time[0],
                        endTime: this.form.time[1],
                    })
                    delete params['time']
                }
                this.$F.doRequest(this, '/edt/Admincourse/course_exam_list', params, (data) => {
                    this.courseList = data.list
                    this.totalPage = data.totalSize
                })
            },
            // 每页数
            handleSizeChange (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.fetchCourseList()
            },
            // 当前页
            handleCurrentChange (val) {
                this.pageSize = 8
                this.pageIndex = val
                this.fetchCourseList()
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

    .play-exam {
        height: 32px;
        padding: 10px;
        background-color: rgba(242, 242, 242, 1);
        border-radius: 7px;
        cursor: pointer;
    }

    .scholar-desc {
        border-radius: 4px;
        background-color: rgba(242, 242, 242, 1);
        margin-left: 10px;
    }
</style>
