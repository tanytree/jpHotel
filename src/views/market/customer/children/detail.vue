<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-08 16:12:09
 * @FilePath: /jiudian/src/views/market/customer/children/detail.vue
 -->
<template>
<div>
    <el-card>
        <!-- 头部导航 -->
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/customer' }">客户详情</el-breadcrumb-item>
                <el-breadcrumb-item>3296592769-张三-白金卡</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="bodyInfo">
            <div class="mianInfo">
                <div class="thisOrderInfo">
                    <div class="wrap">
                        <el-form inline size="small" label-width='120px'>
                            <el-row>
                                <el-form-item label="">
                                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(1)">换卡</el-button>
                                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(2)">修改类型</el-button>
                                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(3)">注销</el-button>
                                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(4)">挂失补卡</el-button>
                                </el-form-item>
                            </el-row>

                            <el-row class="row" style="background:#EFEFEF">
                                <div class="wrap">
                                    <p>剩余积分：<span class="text-blue">10000</span></p>
                                    <p><span class="text-blue">明细</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-blue">积分兑换</span></p>
                                </div>
                            </el-row>
                            <br />
                            <el-row class="row">
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="姓名">
                                            <el-input v-model="detailForm.name" v-if="type=='edit'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="电话">
                                            <el-input v-model="detailForm.name" v-if="type=='edit'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="证件类型">
                                            <el-input v-model="detailForm.name" v-if="type=='edit'"></el-input>
                                        </el-form-item>

                                    </el-col>
                                </el-row>
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="会员卡号">
                                            111111
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="会员类型">
                                            白金卡
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="是否黑名单">
                                            是
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-row>
                            <el-divider></el-divider>
                            <el-row class="row">
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="性别">
                                            <el-input v-model="detailForm.name" v-if="type=='edit'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="生日">
                                            <el-input v-model="detailForm.name" v-if="type=='edit'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="邮箱">
                                            <el-input v-model="detailForm.name" v-if="type=='edit'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="国籍">
                                            <el-input v-model="detailForm.name" v-if="type=='edit'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="地址">
                                            <el-input v-model="detailForm.name" v-if="type=='edit'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="车牌号">
                                            <el-input v-model="detailForm.name" v-if="type=='edit'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="爱好">
                                            <el-input v-model="detailForm.name" v-if="type=='edit'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="所属单位">
                                            <el-input v-model="detailForm.name" v-if="type=='edit'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="备注">
                                            <el-input v-model="detailForm.name" v-if="type=='edit'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-row>
                            <el-divider></el-divider>
                            <el-row class="row">
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="销售员">
                                            <el-input v-model="detailForm.name" v-if="type=='edit'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="发展途径">
                                            <el-select v-model="detailForm.name" v-if="type=='edit'">
                                                <el-option label="全部" value="3">全部</el-option>
                                                <el-option label="已认证" value="1">已认证</el-option>
                                                <el-option label="未认证" value="2">未认证</el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-row>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </el-card>
    <template v-if="type=='edit'">
        <el-row style="height:60px"></el-row>
        <el-row class="fixedFoot">
            <div class="wrap">
                <el-button type="primary">保存</el-button>
                <el-button>返回</el-button>
            </div>
        </el-row>
    </template>

    <el-dialog :title="cardForm.titleName" :visible.sync="setCardFormVisible" class="setCardForm">
        <el-form :model="detailForm" :label-width="formLabelWidth">
            <el-form-item label="" class="require" label-width="80px">
                原卡号：3296592769 姓名：张三 会员类型：白金卡
            </el-form-item>
            <template v-if="cardForm.type==1">
                <el-form-item label="新卡号" class="require">
                    <el-input style="width:300px"  v-model="detailForm.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="备注" class="require">
                    <el-input style="width:300px"  type="textarea" v-model="detailForm.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="立即发卡" class="require">
                    <el-checkbox v-model="detailForm.name">备选项</el-checkbox>
                </el-form-item>
            </template>
            <template v-if="cardForm.type==2">
                <el-form-item label="修改为" class="require">
                    <el-select v-model="detailForm.name" style="width:300px" >
                        <el-option label="全部" value="3">全部</el-option>
                        <el-option label="已认证" value="1">已认证</el-option>
                        <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式" class="require">
                    <el-select v-model="detailForm.name" style="width:300px" >
                        <el-option label="全部" value="3">全部</el-option>
                        <el-option label="已认证" value="1">已认证</el-option>
                        <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付费用" class="require">
                    <el-checkbox v-model="detailForm.name">备选项</el-checkbox>
                </el-form-item>
                <el-form-item label="修改原因" class="">
                    <el-input style="width:300px"  type="textarea" v-model="detailForm.name" placeholder=""></el-input>
                </el-form-item>
            </template>
            <template v-if="cardForm.type==3">
                <el-form-item label="备注" class="">
                    <el-input style="width:300px"  type="textarea" v-model="detailForm.name" placeholder=""></el-input>
                </el-form-item>
            </template>
            <template v-if="cardForm.type==4">
                <el-form-item label="新卡号" class="require">
                    <el-input style="width:300px"  v-model="detailForm.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="操作类型" class="require">
                    <el-radio-group v-model="detailForm.name">
                        <el-radio :label="3">挂失并补卡</el-radio>
                        <el-radio :label="6">仅挂失</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="支付方式" class="require">
                    <el-select v-model="detailForm.name" style="width:300px" >
                        <el-option label="全部" value="3">全部</el-option>
                        <el-option label="已认证" value="1">已认证</el-option>
                        <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付费用" class="require">
                    <el-input style="width:300px"  v-model="detailForm.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="备注" class="">
                    <el-input style="width:300px" type="textarea" v-model="detailForm.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="立即发卡" class="require">
                    <el-checkbox v-model="detailForm.name"></el-checkbox>
                </el-form-item>
            </template>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="setCardFormVisible=false">关闭</el-button>
            <el-button type="primary" @click="setCardFormVisible=false">确认</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
// import {
//     get_user_enterprise
// } from "@/utils/api/company";

export default {
    computed: {
        ...mapState({
            token: state => state.user.token,
            userId: state => state.user.userId,
            msgKey: state => state.config.msgKey,
            plat_source: state => state.config.plat_source
        })
    },
    data() {
        return {
            type: 'edit',
            setCardFormVisible: false,
            formLabelWidth: '120px',

            cardForm: {
                titleName: '',
                type: '',
                name: '',
            },
            detailForm: {
                name: ''
            }
        };
    },

    mounted() {
        console.log(this.$route)
        let id = this.$route.query.id
        this.type = this.$route.name == 'customeredit' ? 'edit' : 'detail'
        // this.get_user_enterprise(id)
    },

    methods: {
        get_user_enterprise(id) {
            // 加载组件
            let params = {
                token: this.token,
                userId: this.userId,
                plat_source: this.plat_source,
                enterCode: id
            }
            get_user_enterprise(params).then(res => {
                    if (res.code == 200) {
                        this.detailDialogFormVisible = true;
                        this.detailData = res.data
                    } else {
                        this.$message.error(res.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err.message);
                });

        },
        setCardFormBtnClick(v) {
            let enums = {
                '1': '换卡操作',
                '2': '修改会员类型',
                '3': '会员停用',
                '4': '挂失/补卡操作'
            }
            this.cardForm.type = v
            this.cardForm.titleName = v && enums[v] ? enums[v] : '其它'
            this.setCardFormVisible = true
        }

    }
};
</script>

<style lang="less" scoped>
.fixedFoot {
    text-align: right;
    position: fixed;
    bottom: 0;
    left: 200px;
    right: 20px;
    background: #fff;
    border-top: 1px solid #eee;
    z-index: 9;
}

.fixedFoot .wrap {
    padding: 10px 20px
}

.fixedFoot .wrap button {
    margin-left: 20px;
}

.bodyInfo {
    .mianInfo {}

}

.thisOrderInfo {
    background: #fff;
    padding-bottom: 30px;

    .wrap {
        padding: 0 20px;

        h3 {
            margin: 0;
            font-size: 15px;
            color: #333
        }

        .cell {
            padding: 5px 0;
            font-size: 14px;
            color: #333
        }

    }
}
</style>
