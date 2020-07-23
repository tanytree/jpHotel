<template>
<div class="boss-index">
    <div v-if="listVisible" class="author" v-loading="loading">
        <div class="title"> {{$i18n.locale == 'ri' ? firstMenuInfo.japanese : (firstMenuInfo.menuAliasTitle || firstMenuInfo.menuTitle)}}</div>
        <ul class="list">
            <li v-for="(item, index) in tableData" :key="index">
                <div class="left">
                    <el-avatar :size="40" fit="cover" :src="require('@/assets/images/people.png')"></el-avatar>
                    <div class="avatarName">{{item.userName}}</div>
                    <el-tag v-for="role in $t('commons.userRoleList')" :key="role.value" :label="role.value"
                         v-if="role.value == item.userType && item.userType == 2">{{role.label}}
                    </el-tag>
                </div>
                <el-dropdown trigger="click" @command="(e) => handleCommand(e, item)">
                    <span class="el-dropdown-link">
                        操作<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="see">查看资料</el-dropdown-item>
                        <el-dropdown-item command="set">权限设置</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
    </div>
    <div v-if="!listVisible" class="author setting" v-loading="loading">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item><a @click="back">员工权限</a></el-breadcrumb-item>
            <el-breadcrumb-item>权限设置</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="avatar">
            <el-avatar :size="40" fit="cover" :src="require('@/assets/images/people.png')"></el-avatar>
            <div class="avatarName">{{cur.userName}}</div>
        </div>
        <div class="content">
            <div class="title"><span>具体权限设置（ {{$i18n.locale == 'ri' ? firstMenuInfo.japanese : (firstMenuInfo.menuAliasTitle || firstMenuInfo.menuTitle)}}）</span> <span class="tip">开启后就拥有该项权限</span></div>
            <div class="inner">
                <div v-for="(item, index) in menuList" :key="index" class="checkItem">
                    <div class="label">
                        <span>{{item.menuTitle}}</span>
                        <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.checkAll" @change="(e) => checkAllChange(e, item)">全部开启</el-checkbox>
                    </div>
                    <el-row :gutter="20">
                        <el-col v-for="(child, i) in item.childList" :key="index + '_' + i" :span="6">
                            <div class="child">
                                <div class="left">
                                    <i class="icon el-icon-more"></i>
                                    <span>{{child.menuTitle}}</span>
                                </div>
                                <el-switch v-model="child.choose" active-color="#116EFF" @change="(e) => changeSet(e, item)"></el-switch>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div class="setBtn">
            <el-button class="submit" @click="saveChange">保存</el-button>
            <el-button class="cancel" @click="listVisible=true">返回</el-button>
        </div>
    </div>
</div>
</template>

<script>
function setArr(arr, newArr) {
    newArr = newArr || [];
    arr.forEach(item => {
        (item.id || item.id == 0) && newArr.push(item.id);
        item.childList && setArr(item.childList, newArr);
    })
    return newArr;
}
function setArrChoose(arr, str) {
    arr.forEach(item => {
        (item.id && str.indexOf(item.id) != -1) && (item.choose = true);
        item.childList && setArrChoose(item.childList, str);
    })
}

export default {
    components: {},
    name: "",

    data() {
        return {
          loading: false,
            listVisible: true,
            searchForm: {},
            tableData: [],
            listTotal: 0,
            menuList: [],
            firstMenuInfo: [],
            cur: {},
        }
    },
    created() {
        this.initForm();
    },
    methods: {
        initForm() {
            this.firstMenuInfo = JSON.parse(sessionStorage.menul);
            this.searchForm = {
                departmentId: this.firstMenuInfo.id,
                searchType: 1,
                content: "",
                pageIndex: 1,
                pageSize: 10,

            };
            this.getDataList();
        },
        getDataList() {
            let that = this;
            this.$F.doRequest(this, '/pms/workuser/login_user_list', this.searchForm, (res) => {
                this.tableData = res.hotelUserList;
                this.listTotal = this.tableData.length
                that.$forceUpdate();
            })
        },
        getMenu_list() {
            let params = {
                departmentId: sessionStorage.getItem('partmentId'),
                type: 2,
                departmentHeader: false
            }
            let that = this;
            this.$F.doRequest(this, '/pms/role/menu_list', params, (res) => {
                this.menuList = res
                for (let i in this.menuList) {
                    this.menuList[i].checkAll = false;

                    this.menuList[i].isIndeterminate = false;
                    for (let k in this.menuList[i].childList) {
                        this.menuList[i].childList.choose = false
                    }
                }
                this.getUser_role(this.cur.id)
                that.$forceUpdate();
            })
        },
        getUser_role(id) {
            let that = this;
            this.$F.doRequest(this, '/pms/freeuser/user_role', {
                userId: id
            }, (res) => {
                //以下代码请在理解后改动
                let userRole = res.menuList;
                let currentUserRole = [];
                let departmentId = sessionStorage.getItem('partmentId');
                debugger
                for (let k in userRole) {
                    if (departmentId == userRole[k].id) {
                        currentUserRole = userRole[k];
                        break;
                    }
                }
                let ids = [];
                let thisIds = setArr(currentUserRole.childList, ids)
                if (thisIds.length) {
                    // console.log(thisIds)
                    let str = JSON.stringify(thisIds)
                    let newMenuList = setArrChoose(this.menuList, str)
                    for(let k in this.menuList){
                        let cItem = this.menuList[k];
                        let checkNum = 0;
                        for(let i in cItem.childList){
                            (cItem.childList[i].choose) && (checkNum++)
                        }
                        (checkNum>0) && (cItem.isIndeterminate = true)
                        if(checkNum && (checkNum == cItem.childList.length) ){
                            cItem.checkAll = true
                            cItem.isIndeterminate = false
                        }

                    }
                }
                // console.log(this.menuList);
                that.$forceUpdate();
            })
        },
        handleCommand(command, item) {
            console.log(item);
            if (command == 'set') {
                this.listVisible = false;
                this.cur = item;

                this.$nextTick(() => {
                    this.getMenu_list()
                    // this.$refs.authors.initForm();
                });
            }
        },
        back() {
            this.listVisible = true;
        },
        checkAllChange(val, item) {
            console.log(this.menuList)
            item.childList.map(s => {
                if (val) {
                    s.choose = true;
                } else {
                    s.choose = false;
                }
            })
            item.isIndeterminate = false;
            this.$forceUpdate()
            console.log(item)

        },
        changeSet(val, item) {
            let arr = [];
            item.childList.map(i => {
                if (i.choose) {
                    arr.push(i)
                }
            })
            if (arr.length == 0 || arr.length == item.childList.length) {
                item.isIndeterminate = false;
            } else {
                item.isIndeterminate = true;
            }
            if (arr.length == item.childList.length) {
                item.checkAll = true;
            } else {
                item.checkAll = false;
            }
            console.log(item)
            this.$forceUpdate()
        },
        saveChange() {
            let idArr = [];
            for (let k in this.menuList) {
                for (let i in this.menuList[k].childList) {
                    if (this.menuList[k].childList[i].choose) {
                        idArr.push(this.menuList[k].childList[i].id)
                    }
                }
            }
            console.log(idArr)
            let params = {
                disUserId: this.cur.id,
                departmentId: sessionStorage.getItem('partmentId'),
                menuIds: idArr.toString()
            }
            this.$F.doRequest(this, '/pms/workuser/set_user_menu', params, (res) => {
                this.$message({
                    message: '设置成功',
                    type: 'success'
                });
                this.listVisible = true
                that.$forceUpdate();
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.author {
    height: 100%;
    display: flex;
    flex-direction: column;

    .title {
        padding: 20px 30px;
        color: #333;
        font-size: 18px;
        border-bottom: 1px solid #e7e7e7;
    }

    .list {
        padding: 0 30px;

        li {
            display: flex;
            padding: 15px 10px;
            border-bottom: 1px solid #e7e7e7;
            align-items: center;

            .left {
                flex: 1;
                display: flex;
                align-items: center;
            }

            .el-avatar,
            .avatarName {
                margin-right: 20px;
            }

            .el-dropdown {
                float: right;
            }
        }
    }

    .el-breadcrumb {
        padding: 10px 20px;
    }

    .avatar {
        padding: 20px;
        border-bottom: 1px solid #dfdfdf;
        border-top: 1px solid #e1e1e1;
    }

    .content {
        padding: 20px;
        flex: 1;
        height: 0;
        overflow: auto;

        .title {
            padding: 0 0 20px;
            font-size: 16px;
            border-bottom: 0;
        }

        .tip {
            font-size: 14px;
            color: #888;
        }

        .checkItem {
            margin-bottom: 20px;

            .label {
                color: #1e1e1e;
                font-size: 16px;
                margin-bottom: 20px;

                &>span {
                    width: 100px;
                    display: inline-block;
                    text-align: left;
                }

                .el-checkbox .el-checkbox__label {
                    font-size: 16px;
                    color: #1e1e1e;
                }

                .el-checkbox__input.is-checked .el-checkbox__inner,
                .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                    background-color: #116EFF;
                    border-color: #116EFF;
                }
            }

            .child {
                border: 1px solid #d2d2d2;
                border-radius: 4px;
                display: flex;
                align-items: center;
                padding: 0 20px;
                height: 70px;

                .left {
                    flex: 1;
                    display: flex;
                    align-items: center;

                    .icon {
                        font-size: 12px;
                        background: #E2E2E2;
                        color: #aaa;
                        height: 32px;
                        line-height: 32px;
                        width: 32px;
                        text-align: center;
                        margin-right: 10px;
                        border-radius: 5px;
                    }
                }
            }
        }
    }

    .setBtn {
        height: 60px;
        padding: 10px 20px;
        margin: 0 -10px -10px;
        box-shadow: 0px -5px 8px 0px rgba(0, 0, 0, 0.19);
        text-align: right;
    }
}
</style>
