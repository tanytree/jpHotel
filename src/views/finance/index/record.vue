<template>
    <div class="record">
        <div class="recordTop">
            <div class="recordCate">
                <el-row :gutter="20">
                    <el-col v-for="(item, index) in recordCate" :key="index" :span="3">
                        <el-tag class="cate-content" :closable="item.bool" :disable-transitions="false" @close="handleClose(item, 1)" @click="chooseCate(item)">
                            <span>{{item.title}}</span>
                            <span v-if="item.type=='income'" class="tip in">收入</span>
                            <span v-if="item.type=='expend'" class="tip ex">支出</span>
                        </el-tag>
                    </el-col>
                    <el-col :span="3"><el-tag class="cate-content" @click="addCate(1)"><i class="el-icon-plus"></i></el-tag></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col v-for="(item, index) in secondLevel" :key="index" :span="2">
                        <el-tag class="cate-content second" closable :disable-transitions="false" @close="handleClose(item, 2)" @click="change(item)">{{item.title}}</el-tag>
                    </el-col>
                    <el-col :span="2"><el-tag class="cate-content second" @click="addCate(2)"><i class="el-icon-plus"></i></el-tag></el-col>
                </el-row>
            </div>
            <div class="addBox">
                <div class="current">当前选择：{{cur.title}} <el-tag class="tip" :class="cur.type=='income' ? 'in' : 'ex'">{{cur.typeDesc}}</el-tag></div>
                <el-form  ref="form" :model="form" label-width="130px" :rules="rules">
                    <el-form-item label="摘要：" prop="abstract">
                        <el-input v-model="form.abstract"></el-input>
                    </el-form-item>
                    <el-form-item label="账户：">
                        <el-select v-model="form.account" placeholder="请选择活动区域">
                            <el-option label="支付宝" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input v-model="form.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="本次发生金额：" prop="price">
                        <el-input v-model="form.price">
                            <template slot="append">日元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="支付时间：" prop="date">
                        <el-date-picker type="date" placeholder="支付时间" v-model="form.date"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture">
                            <el-button size="small" type="primary">上传图片</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="recordBtm">
            <el-button class="submit">保存并继续添加</el-button>
            <el-button class="cancel">清除内容</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                recordCate: [
                    {id: 0, title: '营业收入', type: 'income', bool: false, children: []},
                    {id: 1, title: '迷你吧', type: 'income', bool: false, children: []},
                    {id: 2, title: '员工费用', type: 'expend', bool: false, children: []},
                    {id: 3, title: '维保费用', type: 'expend', bool: false, children: []},
                    {id: 4, title: '营业成本', type: 'expend', bool: false, children: []},
                    {id: 5, title: '其他费用', type: 'expend', bool: true, children: []}
                ],
                secondLevel: [],
                form: {abstract: '', account: '', remark: '', price: '', date: ''}, cur: {},
                rules: {
                    abstract: [{ required: true, message: '请输入摘要', trigger: 'blur' }],
                    remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
                    price: [{ required: true, message: '请输入金额', trigger: 'blur' }],
                    date: [{ required: true, message: '请选择日期', trigger: 'change' }],
                }
            }
        },
        methods: {
            chooseCate(item) {

            },
            addCate(level) {

            },
            handleClose (item, level) {

            },
            change () {}
        }
    }
</script>

<style lang="scss">
    .record {
        padding: 10px;
        height: 100%;
        display: flex;
        flex-direction: column;

        .recordTop {
            flex: 1;
            height: 0;
            overflow: auto;

            .recordCate {
                .el-row {
                    margin: 0 0 20px !important;
                }
                .cate-content {
                    position: relative;
                    height: 90px;
                    padding: 10px 30px;
                    color: #333;
                    font-size: 16px;
                    border: 1px solid #ababab;
                    background: #fafafa;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    &.second {
                        height: auto;
                        font-size: 14px;
                    }
                }

                .el-tag__close {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    background: #EA4B5F;
                    color: #fff;
                }
            }
            .tip {
                margin-top: 4px;
                font-size: 12px;
                padding: 0 10px;
                border-radius: 5px;
                color: #fff;
                line-height: 26px;

                &.in {
                    background: #29BD7D;
                }
                &.ex {
                    background: #CE5433;
                }
            }

            .addBox {
                border-top: 1px solid #d7d7d7;
                padding: 10px 0 0;

                .current {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                }

                .el-form {
                    margin-top: 10px;

                    .el-form-item {
                        .el-input, .el-select {
                            width: 450px;
                        }
                    }
                }
            }
        }

        .recordBtm {
            border-top: 1px solid #e2e2e2;
            line-height: 60px;
            padding: 0 20px;

            .el-button {
                margin-right: 30px;
            }
        }
    }
</style>
