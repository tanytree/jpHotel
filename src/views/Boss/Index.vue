/*
* @Author: 何丽梅 员工权限
* @Date: 2020-03-10 13:45:16
* @Last Modified by: cindy
* @Last Modified time: 2020-03-11 16:59:58
*/
<template>
    <div class="boss-index">
        <el-tabs class="pageTab" v-model="activeName">
            <el-tab-pane
                v-for="item in menuList"
                :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                :name="item.path"
                :key="item.path"
                v-if="$F.filterThirdMenu('sale', item.path, true)"
            >
                <!-- 门店慨然-->
                <storeLookTao v-if="item.path == 'stores-overview'"/>
                <!-- 报表-->
                <Report v-if="item.path == 'boss-report'" sourcePage='boss'/>
                <!-- 员工权限-->
                <EmployeeRights v-if="item.path == 'staff-rights'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import storeLookTao from "@/components/storeLookTao";
import EmployeeRights from "@/components/employeeRights";
import Report from "@/views/finance/report/main";

export default {
    components: {storeLookTao, Report,EmployeeRights},
    data() {
        return {
            activeName: "boss-report",
            active_second_name: "one",
            first_title: "Home",
            select_title: "",
            peopleList: [],
            dialogDetail: false,
            select_info: {}, // 点击中的选中信息
            detailInfo: {}, // 点击选中项的详情
            tabs: {},
        };
    },
    created() {
        this.$F.handleThirdMenu(this);
        console.log(this.menuList);
        // 
        // for (let i = 0; i < this.menuList.length; i++) {
        //     if (this.menuList[i].path == 'staff-rights') {
        //         this.menuList.splice(i, 1)
        //         break;
        //     }
        // }
    },
    mounted() {
        // this.select_title = JSON.parse(sessionStorage.getItem('menul')).name
        this.get_tableDate();
    },
    methods: {
        // 获取各部门人员列表
        get_tableDate() {
            let params = {
                departmentId: JSON.parse(sessionStorage.getItem("menul") || "{}").id,
                pageIndex: 1,
                pageSize: 10,
            };
            this.$F.doRequest(this, "/pms/employee/employee_list", params, (res) => {
                if (res.hotelUserList != null && res.hotelUserList != "") {
                    res.hotelUserList.forEach((value) => {
                        if (value.header != null && value.header != "") {
                            value.header_name = value.header.userName;
                        }
                    });
                }
                this.peopleList = res.hotelUserList;
            });
        },
        // 获取人员信息资料
        get_peopleInfo() {
            let params = {
                employeeId: this.select_info.id,
            };
            this.$F.doRequest(
                this,
                "/pms/employee/detail_employee",
                params,
                (res) => {
                    this.detailInfo = res;
                }
            );
        },


        // getTabName(tabName) {
        //   if (this.tabs[tabName])
        //     return this.tabs[tabName];
        //   let menul = this.$F.filterThirdMenu(tabName);
        //   this.tabs[tabName] = menul;
        //   return menul;
        // },
        // 作用是--点击获取当前点击的信息
        routerPath(value, index) {
            this.select_info = value;
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.padding-item {
    padding-bottom: 8px;
}

.boss-index {
    height: 100%;

    .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    // ========
    .first-body {
        .title {
            border-bottom: 1px solid #e4e7ed;
            margin-bottom: 15px;

            span {
                display: flex;
                padding: 15px 0px;
                font-weight: bolder;
            }
        }

        .content-body {
            .body-item {
                display: flex;

                .item-tag {
                    width: 200px;
                    font-size: 12px;
                    display: flex;
                    //flex: 1;
                    flex-direction: column;
                    justify-content: space-between;

                    .item {
                        padding: 5px 0px;
                        line-height: 15px;
                    }
                }
            }
        }
    }

    .second-body {
        .title {
            border-bottom: 1px solid #e4e7ed;

            span {
                display: flex;
                padding: 15px 0px;
                font-weight: bolder;
            }
        }

        .row-body {
            .row-line {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 0px;
                border-bottom: 1px solid #e5e5e5;

                .row-item {
                    display: flex;
                    align-items: center;
                    font-size: 12px;

                    .row-img {
                        height: 40px;
                        width: 40px;
                        border-radius: 50%;
                        background-color: #f2f2f2;
                    }

                    .default-text {
                        padding: 0px 15px;
                    }

                    .active-facus {
                        border: 1px solid #126eff;
                        padding: 3px 15px;
                        border-radius: 5px;
                        color: #126eff;
                    }
                }
            }
        }
    }
}
</style>
