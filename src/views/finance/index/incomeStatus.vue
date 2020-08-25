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
                                <el-date-picker type="date" placeholder="开始时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="date.strDate"></el-date-picker>
                            </el-form-item>
                            <el-form-item>至</el-form-item>
                            <el-form-item>
                                <el-date-picker type="date" placeholder="结束时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="date.endDate"></el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" class="submit" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="chart-box">
                        <div id="J_chartLineBox" class="chart-box"></div>
                    </div>
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
                date: {strDate: '', endDate: ''},
                dataList: [],
                dataArr: [],
                paneArr: [
                    {label: '近七天', name: 'week', tip: '近7天收支表'},
                    {label: '本月', name: 'month', tip: '月度收支表'},
                    {label: '本年', name: 'year', tip: '年度收支表'}
                ],
                times: [], income: [], expend: [], profit: [],
            }
        },
        props: {
            list: Array, initData: Function
        },
        mounted() {
            this.tabChange()
        },
        methods: {
            tabChange() {
                var dataArr = []
                var data = new Date()
                var year = data.getFullYear();
                if (this.activeName == 'week') {
                    for (let i = -7; i < 1; i++) {
                        const time = new Date(new Date().setDate(new Date().getDate() + i))
                        const year = time.getFullYear()
                        const month = `0${time.getMonth() + 1}`.slice(-2)
                        const strDate = `0${time.getDate()}`.slice(-2)
                        dataArr.push(`${year}-${month}-${strDate}`)
                    }
                    this.data = {strDate: dataArr[0], endDate: dataArr[dataArr.length-1]}
                } else if (this.activeName == 'year') {
                    data.setMonth(data.getMonth() + 1, 1) //获取到当前月份,设置月份
                    for (var i = -12; i < 1; i++) {
                        data.setMonth(data.getMonth() - 1) //每次循环一次 月份值减1
                        var m = data.getMonth() + 1
                        m = m < 10 ? '0' + m : m
                        dataArr.push(data.getFullYear() + '-' + m)
                    }
                } else if (this.activeName == 'month') {
                    for (let i = -30; i < 1; i++) {
                        const time = new Date(new Date().setDate(new Date().getDate() + i))
                        const year = time.getFullYear()
                        const month = `0${time.getMonth() + 1}`.slice(-2)
                        const strDate = `0${time.getDate()}`.slice(-2)
                        dataArr.push(`${year}-${month}-${strDate}`)
                    }
                }
                this.dataArr = dataArr;
                this.openChart()
            },
            openChart() {
                this.$nextTick(() => {
                    // this.chartLine = echarts.init(document.getElementById('J_chartLineBox'));
                    let type = this.activeName == 'week' ? 1 : this.activeName == 'month' ? 2 : 3;
                    this.initData(type, this.date.strDate, this.date.endDate, () => {
                        this.initChartLine()
                    });
                });
            },
            handleData() {
                this.list.map(item => {
                    if(this.times.indexOf(item.time) < 0) {
                        this.times.push(item.time);
                    }
                })
                this.times.map(t => {
                    this.list.map(l => {
                        if(l.time == t) {
                            if(l.payment == 1) {
                                this.expend.push(l.total)
                            } else if (l.payment == 2) {
                                this.income.push(l.total)
                            }
                        }
                    })
                })
                this.expend.map((ex, i) => {
                    const val = this.income[i] - ex;
                    this.profit.push(val);
                })
            },
            // 折线图
            initChartLine() {
                this.handleData();
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
                            data: this.income
                        },
                        {
                            name: '支出',
                            type: 'line',
                            smooth: true,
                            stack: '支付总金额',
                            data: this.expend
                        },
                        {
                            name: '利润',
                            type: 'line',
                            smooth: true,
                            stack: '支付总金额',
                            data: this.profit
                        }
                    ]
                }
                this.chartLine = echarts.init(document.getElementById('J_chartLineBox'))
                this.chartLine.setOption(option)
                window.addEventListener('resize', () => {
                    this.chartLine.resize()
                })
            },
            onSubmit() {
                this.tabChange()
            }
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
