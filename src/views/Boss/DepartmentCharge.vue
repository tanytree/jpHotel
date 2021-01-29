<template>
    <div class="boss-index">
        <el-tabs class="pageTab" v-model="activeName">
            <el-tab-pane
                v-for="item in menuList"
                :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                :name="item.path"
                :key="item.path"
                v-if="$F.filterThirdMenu('boos', item.path, true)"
            >
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    style="width: 100%"
                    tooltip-effect="dark"
                    :header-cell-style="{background:'#e6eaed',color:'#1E1E1E'}"
                >
                    <el-table-column :label="$t('boss.department_nameA')">
                        <template slot-scope="{row}">
                            {{$i18n.locale == 'ri' ? row.japanese : row.menuTitle}}
                        </template>

                    </el-table-column>
                    <el-table-column :label="$t('boss.department_head')">
                        <template slot-scope="{row}">
                            <span v-if="row.header_name">{{row.header_name}}</span>
                            <span v-else>{{$t('boss.loginDetail_no')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('commons.operating')">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                size="small"
                                @click="selectPeople(scope.row)"
                            >{{$t('boss.department_setHead')}}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
            top="0"
            :title="$t('boss.department_setHead')"
            :visible.sync="dialogTableVisible"
            :close-on-click-modal="false"
            @close="closeDialog"
        >
            <el-col :span="5" class="col-title">{{dialog_info.title+':'}}</el-col>
            <el-row>
                <el-input
                    :placeholder="$t('boss.department_placeEnterContent')"
                    v-model="dialog_info.content"
                    class="input-with-select"
                >
                    <el-button slot="append" icon="el-icon-search" @click="get_dialogList2({});"></el-button>
                </el-input>
                <el-row>
                    <ul class="infinite-list" style="overflow:auto">
                        <el-row class="list" v-for="(value,index) in peopleList " :key="index">
                            <div @click="changeRedio(value,index)">
                                <el-col class="item">
                                    <el-checkbox :value="value.checked"></el-checkbox>
                                    <img src="../../assets/images/icon02.png" alt class="img-head"/>
                                    <el-col>{{value.userName}}</el-col>
                                </el-col>
                                <el-col class="item item-r">
                                    <el-col>{{value.phone}}</el-col>
                                </el-col>
                            </div>
                        </el-row>
                    </ul>
                    <el-row>
                        <el-col
                            class="selected"
                        >{{$t('boss.department_hasChosen')+'：'}} {{dialog_info.selected_name ||
                            (dialog_info.header_name) ||$t('boss.loginDetail_no')}}
                        </el-col>
                    </el-row>
                </el-row>
            </el-row>
            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">{{$t('boss.add_cancel')}}</el-button>
        <el-button type="primary" @click="defineChange">{{$t('commons.determine')}}</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                activeName: "department-charge",
                tableData: [],
                dialogTableVisible: false,
                dialog_info: {
                    header: null,
                    title: "",
                    content: "",
                    selected_name: "",
                    selected_id: "",
                    departmentId: "",
                    searchType: 1, //检索类型  1普通检索  2门店列表用户检索
                    pageIndex: 1,
                    pageSize: 6,
                },
                peopleList: [], //设为负责人--人员列表
            };
        },
        computed: {
            setSuccess() {
                return this.$t("boss.department_setSuccess");
            },
        },
        watch: {
            setSuccess(newValue, oldValue) {
                this.setSuccess = newValue;
            },
        },
        created() {
            if (sessionStorage.subMenul) {
                this.menuList = JSON.parse(sessionStorage.subMenul).childList || [];
                this.$forceUpdate();
            }
            this.activeName = this.$F.filterThirdMenu(null, null, false, true).path;
        },
        mounted() {
            this.get_tableDate();
            this.activeName = this.$F.filterThirdMenu(
                "boss",
                "department-charge",
                false,
                true
            ).path;
        },
        methods: {
            //获取负责人列表
            get_tableDate() {
                let params = {
                    type: 1,
                    departmentHeader: true,
                };
                this.$F.doRequest(this, "/pms/role/menu_list", params, (res) => {
                    if (res) {
                        res.forEach((value) => {
                            if (value.header) {
                                value.header_name = value.header.userName;
                            }
                        });
                    }
                    this.tableData = res;
                });
            },
            // 弹框 -- 获取人员列表
            get_dialogList(item = {}) {
                let params = this.dialog_info;
                this.$F.commons.fetchSalesList(params, (res)=> {
                    res.hotelUserList.forEach((value) => {
                        if (item.header && item.header.account == value.account) value.checked = true;
                        else value.checked = false;
                    });
                    this.peopleList = res.hotelUserList;
                    this.$forceUpdate();
                });
            },

            get_dialogList2() {
                this.dialog_info.selected_name = '';
                this.dialog_info.header_name = '';
                this.get_dialogList({});
            },

            // fetchUserList(params = {}, callback) {
            //     this.$F.merge(this.dialog_info, params)
            //     this.$F.commons.fetchSalesList(params, (res) => {
            //         this.peopleList = res.hotelUserList;
            //         if (callback)
            //             callback(res);
            //     });
            // },

            // 弹框--改变选中的人
            changeRedio(value, index) {
                this.peopleList.forEach((item) => {
                    item.checked = false;
                });
                this.peopleList[index].checked = true;
                this.dialog_info.selected_name = value.userName;
                this.dialog_info.selected_id = value.id;
            },
            // 设置负责人--确认
            defineChange() {
                let params = {};
                if (this.dialog_info.header == null) {
                    params = {
                        disUserId: this.dialog_info.selected_id,
                        departmentId: this.dialog_info.departmentId,
                        operType: 1, //操作类型   1新设置  2更换
                    };
                } else {
                    params = {
                        disUserId: this.dialog_info.selected_id,
                        departmentId: this.dialog_info.departmentId,
                        operType: 2, //操作类型   1新设置  2更换
                    };
                }
                this.$F.doRequest(
                    this,
                    "/pms/workuser/set_department_user",
                    params,
                    (res) => {
                        this.dialogTableVisible = false;
                        this.$message({
                            message: this.setSuccess,
                            type: "success",
                        });
                        this.get_tableDate();
                    }
                );
            },
            // 设置负责人--关闭弹框
            closeDialog() {
                this.dialog_info.content = '';
                this.dialog_info.selected_name = "";
                this.dialog_info.selected_id = "";
                this.dialogTableVisible = false;
            },
            // 设置负责人--打开弹框
            selectPeople(value) {
                let params = this.$F.deepClone(value);
                this.dialog_info.departmentId = params.id;
                this.dialog_info.title = this.$i18n.locale == 'ri'?params.japanese:params.menuTitle;
                this.dialog_info.header = params.header;
                this.dialog_info.header_name = params.header_name;
                this.get_dialogList(value);
                this.dialogTableVisible = true;
            },
        },
    };
</script>

<style lang="less" scoped="">
    .col-title {
        padding: 10px 0px;
        font-weight: bolder;
    }

    .infinite-list {
        height: 200px;
        overflow-y: scroll;

    .list {
        display: flex;
        align-items: center;

    .item {
        display: flex;
        align-items: center;
        flex: 1;
        padding-left: 10px;

    .img-head {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background-color: #8c939d;
        margin: 10px 20px 10px 30px;
    }
    }
    .item-r {
        display: flex;
        align-items: center;
        flex: 2;
    }
    }
    }
    .selected {
        padding: 10px 0px;
        font-size: 14px;
        font-weight: 800;
        border-top: 1px solid #e4e7ed;
    }
</style>
