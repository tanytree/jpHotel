<template>
    <div class="boss-index">
        <el-tabs class="pageTab" v-model="activeName">
            <el-tab-pane label="报表" name="report">
                <div class="boss-index">
                    <el-card shadow="never">
                        <el-tabs v-model="reportName" type="card" @tab-remove="removeTab">
                            <el-tab-pane label="首页" name="home">
                                <div class="reportHome">
                                    <div class="title">前台部报表</div>
                                    <div class="listBox">
                                        <ul v-for="(item, index) in arr" :key="index">
                                            <li v-for="(son, i) in item" :key="index + '_' + i" @click="addReport(son)"><img src="../../assets/images/star.png" alt="" width="20"><span>{{son.title}}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane v-if="reportNav.length > 0" v-for="(pane, $index) in reportNav" closable :key="$index" :label="pane.title" :name="pane.path">
                                <div class="report">
                                    <el-form ref="form" size="small" inline :model="form" class="term line">
                                        <div class="inline" v-if="pane.path == 'day'">
                                            <el-form-item label="营业时间：">
                                                <el-date-picker type="date" v-model="form.date"></el-date-picker>
                                            </el-form-item>
                                        </div>
                                        <div class="inline" v-if="pane.path == 'month'">
                                            <el-form-item label="营业时间：">
                                                <el-date-picker type="date" v-model="form.strDate"></el-date-picker>
                                                <span class="line">至</span>
                                                <el-time-picker type="date" v-model="form.endDate"></el-time-picker>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-radio-group v-model="form.cate">
                                                    <el-radio-button value="curMonth" label="本月"></el-radio-button>
                                                    <el-radio-button value="lastMonth" label="上月"></el-radio-button>
                                                </el-radio-group>
                                            </el-form-item>
                                        </div>
                                        <el-form-item>
                                            <el-button type="primary" class="submit">查询</el-button>
                                            <el-button type="primary" class="submit">打印</el-button>
                                            <el-button type="primary" class="submit">导出</el-button>
                                        </el-form-item>
                                    </el-form>
                                    <div class="reportTitle">{{pane.title}}</div>
                                    <div class="subTip">营业时间：{{strTime}} 至 {{endTime}}</div>
                                    <reportTable :type="pane.path" :reportData="reportData" />
                                    <div class="formula">
                                        <div class="red">计算公式：</div>
                                        <div>1.非房费收入包含损物赔偿、迷你吧、其他、会员卡</div>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import {
        get_withdraw_list,
        get_withdraw_info,
        withdrawapply
    } from '@/utils/api/finance'
    import reportTable from './report/table'

    export default {
        data () {
            return {
                activeName: 'report', reportName: 'home',
                reports: [
                    {title: '营业日报', path: 'day'},
                    {title: '营业月报', path: 'month'},
                    {title: '营业年报', path: 'year'},
                    {title: '现金流明细表', path: 'detailed'},
                    {title: '迷你吧销售报表', path: 'mini'},
                    {title: '结账汇总报表', path: 'summary'},
                    {title: '结账明细报表', path: 'sumDetailed'},
                    {title: '会员卡积分兑换报表', path: 'vip'},
                    {title: '单位挂账明细表', path: 'accountDetailed'},
                    {title: '单位挂账汇总表', path: 'accountUnit'},
                    {title: '销售员业绩明细表', path: 'salesDetailed'},
                    {title: '销售员业绩汇总表', path: 'sales'},
                    {title: '交班报表（按班次）', path: 'classes'},
                    {title: '交班报表（按收银员）', path: 'cashier'},
                    {title: '消费明细表', path: 'expand'},
                    {title: '收款明细表', path: 'income'}
                ], arr: [], reportNav: [],
                form: {}, strTime: '2020-04-26 00:00:00', endTime: '2020-04-26 23:59:59',
                reportData: [
                    {val1: '一、营收合计', val2: '7435', val3: '6666.88', val4: '8435689', val5: '8763578', val6: '892758934729.88'},
                    {val1: '一、营收合计', val2: '7435', val3: '6666.88', val4: '8435689', val5: '8763578', val6: '892758934729.88'},
                    {val1: '一、营收合计', val2: '7435', val3: '6666.88', val4: '8435689', val5: '8763578', val6: '892758934729.88'},
                    {val1: '一、营收合计', val2: '7435', val3: '6666.88', val4: '8435689', val5: '8763578', val6: '892758934729.88'},
                ]
            }
        },
        components: {reportTable},
        mounted () {
            this.arr = this.group(this.reports, 5);
        },
        methods: {
            removeTab(targetName) {
                const index = this.reportNav.findIndex(s => s.path == targetName);
                this.reportNav = this.reportNav.filter(s => s.path != targetName);
                if(this.reportName == 'targetName') {
                    this.reportName = this.reportNav[index-1].path;
                }
            },
            group(array, length) {
                let index = 0;
                let newArray = [];
                while(index < array.length) {
                    newArray.push(array.slice(index, index += length));
                }
                return newArray;
            },
            addReport(item) {
                const bool = this.reportNav.some(s => item.path == s.path);
                if(!bool) {
                    this.reportNav.push(item)
                }
                this.reportName = item.path;
            }
        }
    }
</script>

<style lang="scss">
    .reportHome {
        height: 100%;
        display: flex;
        flex-direction: column;

        .title {
            padding: 0 0 20px;
            font-size: 16px;
            color: #333;
            border-bottom: 1px solid #efefef;
        }
        .listBox {
            flex: 1;
            height: 0;
            overflow: auto;
            display: flex;

            ul {
                height: 100%;
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                padding: 20px 30px;

                &:first-child {
                    padding-left: 0;
                }

                li {
                    line-height: 40px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    img {
                        margin-right: 10px;
                    }
                }
            }
        }
    }
    .report {
        height: 100%;
        display: flex;
        flex-direction: column;

        .term {
            background: transparent;
            padding: 0;
            margin-bottom: 10px;

            .el-form-item {
                margin-bottom: 0;
            }
            .inline {
                display: inline-block;
            }
        }

        .reportTitle {
            font-size: 18px;
            line-height: 36px;
            color: #333;
            text-align: center;
            font-weight: 600;
        }

        .subTip {
            line-height: 26px;
            font-size: 14px;
            color: #666;
        }

        .report-table {
            flex: 1;
        }

        .formula {
            padding: 0 16px;
            font-size: 14px;
            color: #666;

            .red {
                color: #D52121;
                margin: 10px 0;
            }
        }
    }
</style>
