<!--
 * @Date: 2019-12-25 22:12:46
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-10 10:21:40
 * @FilePath: /cloudAdmin/src/views/finance/incomeStatus.vue
 -->
<template>
    <div class="income">
        <el-card shadow="never">
            <el-tabs v-model="activeName" @tab-click="tabChange" class="tabCenter">
                <el-tab-pane v-for="item in paneArr" :key="item.name" :label="item.label" :name="item.name">
                    <div class="chart-top">
                        <p>{{item.tip}} {{date.strDate}} 至 {{date.endDate}}</p>
                        <el-form v-if="activeName == 'week'" size="small" :inline="true" :model="date">
                            <el-form-item>
                                <el-date-picker type="date" placeholder="开始时间" v-model="date.strDate"></el-date-picker>
                            </el-form-item>
                            <el-form-item>至</el-form-item>
                            <el-form-item>
                                <el-time-picker type="date" placeholder="结束时间" v-model="date.endDate"></el-time-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" class="submit" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div id="J_chartLineBox" class="chart-box"></div>
                </el-tab-pane>
            </el-tabs>

        </el-card>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                activeName: 'week',
                tip: '',
                date: {strDate: '2020-05-09', endDate: '2020-05-16'},
                dataList: [],
                dataArr: [],
                paneArr: [
                    {label: '近七天', name: 'week', tip: '近7天收支表'},
                    {label: '本月', name: 'month', tip: '月度收支表'},
                    {label: '本年', name: 'year', tip: '年度收支表'}
                ]
            }
        },
        mounted() {
            this.tabChange()
            // this.initChartLine()
        },
        methods: {

            tabChange() {
                var dataArr = []
                var data = new Date()
                var year = data.getFullYear();
                if (this.activeName == 'week') {
                    for (var i = -10; i < 1; i++) {
                        dataArr.push(year - i)
                    }
                    // this.form.year = dataArr.join(',')
                    // this.form.month = ''
                    // this.form.day = ''
                } else if (this.activeName == 'month') {
                    data.setMonth(data.getMonth() + 1, 1) //获取到当前月份,设置月份
                    for (var i = -12; i < 1; i++) {
                        data.setMonth(data.getMonth() - 1) //每次循环一次 月份值减1
                        var m = data.getMonth() + 1
                        m = m < 10 ? '0' + m : m
                        dataArr.push(data.getFullYear() + '-' + m)
                    }
                    // this.form.year = ''
                    // this.form.month = dataArr.join(',')
                    // this.form.day = ''
                } else if (this.activeName == 'year') {
                    for (let i = -30; i < 1; i++) {
                        const time = new Date(new Date().setDate(new Date().getDate() + i))
                        const year = time.getFullYear()
                        const month = `0${time.getMonth() + 1}`.slice(-2)
                        const strDate = `0${time.getDate()}`.slice(-2)
                        dataArr.push(`${year}-${month}-${strDate}`)
                    }
                    // this.form.year = ''
                    // this.form.month = ''
                    // this.form.day = dataArr.join(',')
                }
                this.dataArr = dataArr
                // this.getChartData()
                // console.log(dataArr);
            },
            // 折线图
            initChartLine() {
                var option = {
                    legend: {
                        data: ['收入']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.dataArr
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '收入',
                            type: 'line',
                            smooth: true,
                            stack: '总量',
                            data: this.dataList.map(item => item.pay_price || 0)
                        },
                        {
                            name: '支出',
                            type: 'line',
                            smooth: true,
                            stack: '支付总金额',
                            data: this.dataList.map(item => item.total_price || 0)
                        },
                        {
                            name: '利润',
                            type: 'line',
                            smooth: true,
                            stack: '支付总金额',
                            data: this.dataList.map(item => item.total_price || 0)
                        }
                    ]
                }
                this.chartLine = echarts.init(document.getElementById('J_chartLineBox'))
                this.chartLine.setOption(option)
                window.addEventListener('resize', () => {
                    this.chartLine.resize()
                })
            },
            onSubmit() {}
        }
    }
</script>

<style lang="scss">
    .income .el-card {
        border: 0;

        .el-card__body {
            padding: 10px;
        }
    }
    .chart-box {
        height: 400px;
        margin-top: 40px;
    }
</style>
