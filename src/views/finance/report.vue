<template>
    <div class="boss-index">
        <el-tabs class="pageTab" v-model="activeName">
            <el-tab-pane label="报表" name="report">
                <MainContainer></MainContainer>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import MainContainer from './report/main'

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
        components: {MainContainer},
        mounted () {
            this.arr = this.group(this.reports, 5);
        },
        methods: {
            removeTab(targetName) {
                const index = this.reportNav.findIndex(s => s.path == targetName);
                this.reportNav = this.reportNav.filter(s => s.path != targetName);
                if(this.reportNav.length === 0) {
                    this.reportName = 'home'
                }
                if(this.reportName == targetName) {
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
                min-width: 220px;

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
