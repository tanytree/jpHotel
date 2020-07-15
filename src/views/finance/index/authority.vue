<template>
    <div class="boss-index">
        <div v-if="listVisible" class="author">
            <div class="title">财务部</div>
            <ul class="list">
                <li v-for="(item, index) in authors" :key="index">
                    <div class="left">
                        <el-avatar :size="40" fit="cover" :src="item.avatar"></el-avatar>
                        <div class="avatarName">{{item.name}}</div>
                        <el-tag v-if="item.post" effect="plain">{{item.post}}</el-tag>
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
        <div v-if="!listVisible" class="author setting">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><a @click="back">员工权限</a></el-breadcrumb-item>
                <el-breadcrumb-item>权限设置</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="avatar">
                <el-avatar :size="40" fit="cover" :src="cur.avatar"></el-avatar>
                <div class="avatarName">{{cur.name}}</div>
            </div>
            <div class="content">
                <div class="title"><span>具体权限设置（财务部）</span> <span class="tip">开启后就拥有该项权限</span></div>
                <div class="inner">
                    <div v-for="(item, index) in setData" :key="index" class="checkItem">
                        <div class="label">
                            <span>{{item.label}}</span>
                            <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.checkAll" @change="(e) => checkAllChange(e, item)">全部开启</el-checkbox>
                        </div>
                        <el-row :gutter="20">
                            <el-col v-for="(child, i) in item.child" :key="index + '_' + i" :span="6">
                                <div class="child">
                                    <div class="left">
                                        <i class="icon el-icon-more"></i>
                                        <span>{{child.name}}</span>
                                    </div>
                                    <el-switch v-model="child.choose" active-color="#116EFF" @change="(e) => changeSet(e, item)"></el-switch>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div class="setBtn">
                <el-button class="submit">保存</el-button>
                <el-button class="cancel">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                listVisible: true,
                authors: [
                    {name: '章欣', post: '部门负责人', avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
                    {name: '王子文', post: '', avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
                    {name: '章欣', post: '研发一部负责人', avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
                ],
                cur: {},
                setData: [
                    {label: '首页', isIndeterminate: true, checkAll: false, child: [{name: '财务概览', choose: true},{name: '记一笔', choose: false}]},
                    {label: '统计分析管理', isIndeterminate: true, checkAll: false, child: [{name: '流水账', choose: true},{name: '总账', choose: false}, {name: '明细账', choose: false}, {name: '科目余额表', choose: false}]},
                    {label: '凭证', isIndeterminate: true, checkAll: false, child: [{name: '录凭证', choose: true},{name: '查凭证', choose: false}, {name: '设置', choose: false}]},
                    {label: '报表系统', isIndeterminate: false, checkAll: true, child: [{name: '报表', choose: true}]},
                    {label: '发票管理', isIndeterminate: false, checkAll: true, child: [{name: '已开发票', choose: true}]},
                ],
            }
        },
        methods: {
            handleCommand(command, item) {
                console.log(item);
                if(command == 'set') {
                    this.listVisible = false;
                    this.cur = item;
                }
            },
            back() {
                this.listVisible = true;
            },
            checkAllChange(val, item) {
                item.child.map(s => {
                    if(val) {
                        s.choose = true;
                    } else {
                        s.choose = false;
                    }
                })
                item.isIndeterminate = false;
            },
            changeSet(val, item) {
                let arr = [];
                item.child.map(i => {
                    if(i.choose) {
                        arr.push(i)
                    }
                })
                if(arr.length == 0 || arr.length == item.child.length) {
                    item.isIndeterminate = false;
                } else {
                    item.isIndeterminate = true;
                }
                if(arr.length == item.child.length) {
                    item.checkAll = true;
                } else {
                    item.checkAll = false;
                }
            }
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

                .el-avatar, .avatarName {
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

                    & > span {
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
