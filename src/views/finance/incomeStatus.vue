<!--
 * @Date: 2019-12-25 22:12:46
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-10 10:21:40
 * @FilePath: /cloudAdmin/src/views/finance/incomeStatus.vue
 -->
<template>
    <div class="income">
        <el-card>
            <div class="chart-top">
                <span>总收入</span>
<!--                <el-input v-model="form.type"></el-input>-->
                <el-radio-group v-model="form.type" align="center" @change="radioChange">
                    <el-radio-button label="1">按天</el-radio-button>
                    <el-radio-button label="2">按月</el-radio-button>
                    <el-radio-button label="3">按年</el-radio-button>
                </el-radio-group>
                <el-select style="text-align: right" v-model="form.type"></el-select>
            </div>
            <div class="chart-box">
                <div id="J_chartLineBox" class="chart-box"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import { get_finance_count } from '@/utils/api/finance'
    import { mapState, mapActions } from 'vuex'

    export default {
        data () {
            return {
                form: {
                    type: '1',
                    month: '',
                    year: '2012,2013,2014',
                    day: ''
                },
                dataList: [],
                dataArr: []
            }
        },
        created () {
            // this.getChartData();
        },
        mounted () {
            this.radioChange()
            this.initChartLine()
        },
        methods: {
            getChartData () {
                get_finance_count({
                    type: this.form.type,
                    year: this.form.year,
                    month: this.form.month,
                    day: this.form.day
                }).then(res => {
                    if (res.code == 200) {
                        this.dataList = res.data
                        this.initChartLine()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            radioChange () {
                var dataArr = []
                var data = new Date()
                var year = data.getFullYear()
                if (this.form.type == 1) {
                    for (var i = -10; i < 1; i++) {
                        dataArr.push(year - i)
                    }
                    this.form.year = dataArr.join(',')
                    this.form.month = ''
                    this.form.day = ''
                } else if (this.form.type == 2) {
                    data.setMonth(data.getMonth() + 1, 1) //获取到当前月份,设置月份
                    for (var i = -12; i < 1; i++) {
                        data.setMonth(data.getMonth() - 1) //每次循环一次 月份值减1
                        var m = data.getMonth() + 1
                        m = m < 10 ? '0' + m : m
                        dataArr.push(data.getFullYear() + '-' + m)
                    }
                    this.form.year = ''
                    this.form.month = dataArr.join(',')
                    this.form.day = ''
                } else if (this.form.type == 3) {
                    for (let i = -30; i < 1; i++) {
                        const time = new Date(new Date().setDate(new Date().getDate() + i))
                        const year = time.getFullYear()
                        const month = `0${time.getMonth() + 1}`.slice(-2)
                        const strDate = `0${time.getDate()}`.slice(-2)
                        dataArr.push(`${year}-${month}-${strDate}`)
                    }
                    this.form.year = ''
                    this.form.month = ''
                    this.form.day = dataArr.join(',')
                }
                this.dataArr = dataArr
                // this.getChartData()
                // console.log(dataArr);
            },
            // 折线图
            initChartLine () {
                var option = {
                    title: {
                        text: '收入曲线'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
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
                            name: '收入',
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
            }
        }
    }
</script>

<style lang="scss">

    .chart-top {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
    }

    .chart-box {
        height: 400px;
        margin-top:40px;
    }
</style>
