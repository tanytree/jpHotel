/*
* @Author: Dana 广告管理
* @Date: 2020-03-10 13:45:16
* @Last Modified by: Dana
* @Last Modified time: 2020-03-11 16:59:58
*/
<template>
    <div class="boss-index">
        <el-tabs class="pageTab" v-model="activeName" @tab-click="tabChange">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                         :name="item.path"
                         :key="item.path"
                         v-if="$F.filterThirdMenu('finance', item.path, true)">
<!--                &lt;!&ndash; 财务慨览&ndash;&gt;-->
                <incomeStatus ref="incomes" v-if="item.path == 'overView'" :list="list" :initData="getFinancialData"/>
                <!-- 记一笔-->
                <record v-if="item.path == 'makeNote'" :list="remember" :initData="getRememberData"/>
                <!-- 员工权限-->
                <employeeRights v-if="item.path == 'staff-rights'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import incomeStatus from './index/incomeStatus'
    import authority from './index/authority'
    import record from './index/record'
    import employeeRights from '@/components/employeeRights'
    import {mapState, mapActions} from 'vuex'

    export default {
        components: {incomeStatus, authority, record, employeeRights},
        data() {
            return {
                activeName: 'overView', list: [], remember: []
            }
        },
        created() {
          this.$F.handleThirdMenu(this);
        },
        mounted() {
            this.tabChange()
        },
        methods: {
            tabChange() {
                const a = this;
                if(this.activeName == 'overView') {
                    this.getFinancialData(1, '', '', () => {
                        a.$refs['incomes'][0].initChartLine()
                    })
                } else if (this.activeName == 'makeNote') {
                    this.getRememberData()
                } else if (this.activeName == 'staff-rights') {
                    this.getAuditData(this.pageForm);
                }
            },
            getFinancialData(type, str, end, callback) {
                const params = {
                    searchType: type,
                    startTime: str,
                    endTime: end
                }
                this.$F.doRequest(this, '/pms/remeber/financial_charts', params, (res) => {
                    this.list = res.chartsList;
                    callback && callback()
                })
            },
            getRememberData () {
                this.$F.doRequest(this, '/pms/remeber/remeber_list', {}, (res) => {
                    this.remember = res.remeberList;
                })
            }
        }
    }
</script>

<style lang="scss">
    .income {
        height: 100%;
    }

    .bg {

        .el-tab-pane {
            background: #E2E2E2;
            border-radius: 6px;
        }

    }
</style>
