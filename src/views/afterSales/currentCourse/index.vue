/*
* @Author: Dana 广告管理
* @Date: 2020-03-10 13:45:16
* @Last Modified by: Dana
* @Last Modified time: 2020-03-11 16:59:58
*/
<template>
    <div class="currentCourse">
        <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="课程申请管理" name="courseApply">
                <courseApply :courseTypes="courseTypes"/>
            </el-tab-pane>
            <el-tab-pane label="考试评选管理" name="examKPI">
                <examKPI :courseTypes="courseTypes"/>
            </el-tab-pane>
            <el-tab-pane label="留言管理" name="message">
                <leaveMessage :courseTypes="courseTypes"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import courseApply from './courseApply'
    import examKPI from './examKPI'
    import leaveMessage from './leaveMessage'
    import { mapState, mapActions } from 'vuex'

    export default {
        components: { courseApply, examKPI, leaveMessage },
        computed: {},
        created () {
            this.$F.getCourseTypes(null, 1, (data) => {
                this.courseTypes = data
            })
        },
        data () {
            return {
                courseTypes: [],
                input: '',
                currentIndex: '',
                form: {
                    //选择时间
                    date1: '',
                    date2: ''
                },
                formInline: {
                    user: '',
                    region: ''
                },
                activeName: 'courseApply', //第一个默认启动
                currentPage1: 1,
                tableData: [
                    {
                        haonumber: '29067474098237893',
                        builddate: '2016-05-03',
                        way: '分期(3期)',
                        press: '甲方90%',
                        bossName: '全购网络科技有限公司',
                        allmoney: '999999.00',
                        paymoney: '888888.00'
                    },
                    {
                        haonumber: '29067474098237893',
                        builddate: '2016-05-03',
                        way: '分期(3期)',
                        press: '甲方90%',
                        bossName: '全购网络科技有限公司',
                        allmoney: '999999.00',
                        paymoney: '888888.00'
                    }
                ]
            }
        },
        methods: {
            handleSelectionChange (val) {
                this.multipleSelection = val
            },

            // 切换
            change (index) {
                let that = this
                that.currentIndex = index
            },
            // 查询
            onSubmit () {
                console.log('submit!')
            },
            //二级tab切片
            handleClick (tab, event) {
                console.log(tab, event)
            },
            // 分页
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange (val) {
                console.log(`当前页: ${val}`)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
