<template>
    <div class="boss-index">
        <!-- <el-form ref="searchForm" :model="searchForm" inline>
            <el-form-item>
                <el-input style="width: 300px" v-model="searchForm.name" placeholder="请输入账表名称查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
        </el-form> -->
        <div style="margin-bottom:20px;" v-for='(item,index) in checkArrayList' :key="index">
            <div class="diaryTable">{{ item }}</div>
            <el-divider></el-divider>
            <div class="reportHome">
                <div class="listBox">
                    <ul v-for="(item, index) in arr" :key="index">
                        <li v-for="(each, i) in item" :key="index + '_' + i" @click="addReport(each)">
                            <img src="../../../assets/images/star.png" alt width="20"/>
                            <span>{{ each.title }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
    props: ["sourcePage"],
    computed: {
        reports: {
            get() {
                return [
                    {title: this.$t("boss.report_day"), path: "day", reportType: 1, reportNum: 1001},
                    {title: this.$t("boss.report_month"), path: "month", reportType: 2, reportNum: 1002},
                    {title: this.$t("boss.report_year"), path: "year", reportType: 3, reportNum: 1003},
                    {title: this.$t("boss.report_detailed"), path: "detailed"},
                    {title: this.$t("boss.report_mini"), path: "mini"},
                    {title: this.$t("boss.report_summary"), path: "summary"},
                    {title: this.$t("boss.report_sumDetailed"), path: "sumDetailed"},
                    {title: this.$t("boss.report_vip"), path: "vip"},
                    {
                        title: this.$t("boss.report_accountDetailed"),
                        path: "accountDetailed",
                    },
                    {title: this.$t("boss.report_accountUnit"), path: "accountUnit"},
                    {
                        title: this.$t("boss.report_salesDetailed"),
                        path: "salesDetailed",
                    },
                    {title: this.$t("boss.report_sales"), path: "sales"},
                    {title: this.$t("boss.report_classes"), path: "classes"},
                    {title: this.$t("boss.report_cashier"), path: "cashier"},
                    {title: this.$t("boss.report_expand"), path: "expand"},
                    {title: this.$t("boss.report_income"), path: "income"},
                ];
            },
            set() {
            },

        },
    },

    data() {
        return {
            reportNum: 1001,
            searchForm: {
                name: "",
            },
            arr: [],
            bossArray: ['日记表', '月度报表'],
            deskArray: ['估价单 请款单 消费明细 收据', '预约相关表', '前台报表', '日计表', '月度报表'],
            checkArrayList: null,
        };
    },
    mounted() {
        this.arr = this.group(this.reports, 5);
        console.log(this.arr);
        if (this.sourcePage == 'boss') {
            this.checkArrayList = this.bossArray;
        } else {
            this.checkArrayList = this.deskArray;
        }
    },
    methods: {
        group(array, length) {
            let index = 0;
            let newArray = [];
            while (index < array.length) {
                newArray.push(array.slice(index, (index += length)));
            }
            return newArray;
        },
        addReport(item) {
            this.$router.push({
                name: "browseReport",
                query: {
                    sourcePage: this.sourcePage,
                    reportNum: item.reportNum || 1001,
                    reportType: item.reportType || 1,
                },
            });
        },
    },
};
</script>

<style lang="scss">
.reportHome {
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
        overflow: auto;
        display: flex;

        ul {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            padding: 0px 30px;
            min-width: 220px;

            & :first-child {
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
            color: #d52121;
            margin: 10px 0;
        }
    }
}

.diaryTable {
    color: rgba(51, 51, 51, 100);
    font-size: 16px;
    font-weight: 500;
}
</style>
