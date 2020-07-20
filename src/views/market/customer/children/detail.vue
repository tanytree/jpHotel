<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-20 20:44:52
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
                        <el-form inline size="small" label-width='120px' :model="detailForm" ref="detailForm" :rules="rules">
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
                                        <el-form-item label="会员卡号">
                                            <el-input v-model="detailForm.memberCard" v-if="type!='detail'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="会员类型">
                                            <el-select v-model="detailForm.memberTypeId" v-if="type!='detail'" class="width150">
                                                <el-option v-for="item in smembertypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="姓名">
                                            <el-input v-model="detailForm.name" v-if="type!='detail'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="电话">
                                            <el-input v-model="detailForm.mobile" v-if="type!='detail'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="证件类型">
                                            <el-select v-model="detailForm.idcardType" v-if="type!='detail'" class="width100">
                                                <el-option label="身份证" :value="1"></el-option>
                                                <el-option label="护照" :value="2"></el-option>
                                                <el-option label="驾驶证" :value="3"></el-option>
                                            </el-select>
                                            <el-input v-model="detailForm.idcard" v-if="type!='detail'" class="width150"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell" v-if="type!='add'">
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
                                            <el-radio-group v-model="detailForm.sex" v-if="type!='detail'">
                                                <el-radio :label="1">男</el-radio>
                                                <el-radio :label="2">女</el-radio>
                                                <el-radio :label="3">保密</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="生日">
                                            <el-date-picker v-model="detailForm.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-if="type!='detail'"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="邮箱">
                                            <el-input v-model="detailForm.email" v-if="type!='detail'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="国籍">
                                            <el-select v-model="detailForm.nationality" class="" v-if="type!='detail'">
                                                <el-option v-for="item in nationalityList" :key="item.id" :label="$i18n.locale == 'ri' ?item.jName:item.cName" :value="item.id">
                                                </el-option>
                                            </el-select>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="地址">
                                            <el-input v-model="detailForm.address" v-if="type!='detail'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="车牌号">
                                            <el-input v-model="detailForm.carNum" v-if="type!='detail'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="爱好">
                                            <el-input v-model="detailForm.hobby" v-if="type!='detail'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="所属单位">
                                            <el-input v-model="detailForm.name" v-if="type!='detail'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="备注">
                                            <el-input v-model="detailForm.remark" v-if="type!='detail'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-row>
                            <el-divider></el-divider>
                            <el-row class="row">
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="销售员">
                                            <el-input v-model="detailForm.salesId" v-if="type!='detail'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="发展途径">
                                            <el-select v-model="detailForm.getWay" v-if="type!='detail'">
                                                <el-option label="线上" :value="1">已认证</el-option>
                                                <el-option label="线下" :value="2">未认证</el-option>
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
    <template v-if="type!='detail'">
        <el-row style="height:60px"></el-row>
        <el-row class="fixedFoot">
            <div class="wrap">
                <el-button type="primary">保存</el-button>
                <el-button>返回</el-button>
            </div>
        </el-row>
    </template>

    <el-dialog top="0" :title="cardForm.titleName" :visible.sync="setCardFormVisible" class="setCardForm">
        <el-form :model="detailForm" :label-width="formLabelWidth">
            <el-form-item label="" class="require" label-width="80px">
                原卡号：3296592769 姓名：张三 会员类型：白金卡
            </el-form-item>
            <template v-if="cardForm.type==1">
                <el-form-item label="新卡号" class="require">
                    <el-input style="width:300px" v-model="detailForm.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="备注" class="require">
                    <el-input style="width:300px" type="textarea" v-model="detailForm.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="立即发卡" class="require">
                    <el-checkbox v-model="detailForm.name">备选项</el-checkbox>
                </el-form-item>
            </template>
            <template v-if="cardForm.type==2">
                <el-form-item label="修改为" class="require">
                    <el-select v-model="detailForm.name" style="width:300px">
                        <el-option label="全部" value="3">全部</el-option>
                        <el-option label="已认证" value="1">已认证</el-option>
                        <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式" class="require">
                    <el-select v-model="detailForm.name" style="width:300px">
                        <el-option label="全部" value="3">全部</el-option>
                        <el-option label="已认证" value="1">已认证</el-option>
                        <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付费用" class="require">
                    <el-checkbox v-model="detailForm.name">备选项</el-checkbox>
                </el-form-item>
                <el-form-item label="修改原因" class="">
                    <el-input style="width:300px" type="textarea" v-model="detailForm.name" placeholder=""></el-input>
                </el-form-item>
            </template>
            <template v-if="cardForm.type==3">
                <el-form-item label="备注" class="">
                    <el-input style="width:300px" type="textarea" v-model="detailForm.name" placeholder=""></el-input>
                </el-form-item>
            </template>
            <template v-if="cardForm.type==4">
                <el-form-item label="新卡号" class="require">
                    <el-input style="width:300px" v-model="detailForm.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="操作类型" class="require">
                    <el-radio-group v-model="detailForm.name">
                        <el-radio :label="3">挂失并补卡</el-radio>
                        <el-radio :label="6">仅挂失</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="支付方式" class="require">
                    <el-select v-model="detailForm.name" style="width:300px">
                        <el-option label="全部" value="3">全部</el-option>
                        <el-option label="已认证" value="1">已认证</el-option>
                        <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付费用" class="require">
                    <el-input style="width:300px" v-model="detailForm.name" placeholder=""></el-input>
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
            nationalityList: '',
            storeList: '',
            smembertypeList: '',
            cardForm: {
                titleName: '',
                type: '',
                name: '',
            },
            detailForm: {
                id: '',
                name: ''
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入外宾姓名',
                    trigger: 'blur'
                }, ],
                sex: [{
                    required: true,
                    message: '请选择性别',
                    trigger: 'change'
                }, ],
                idcardType: [{
                    required: true,
                    message: '请选择证件类型',
                    trigger: 'change'
                }, ],
                idcard: [{
                    required: true,
                    message: '请填入证件编号',
                    trigger: 'blur'
                }, ],
                mobile: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                }, ],
                memberCard: [{
                    required: true,
                    message: '请输入会员卡号',
                    trigger: 'blur'
                }, ],
                state: [{
                    required: true,
                    message: '请选择是否立即发卡',
                    trigger: 'change'
                }, ],
            }
        };
    },
    filters: {
        F_visaType(value) {
            let enums = {
                '1': '普通签证',
                '2': '外交签证',
                '3': '公务签证'
            }
            return value && enums[value] ? enums[value] : '其它'
        },
        F_sex(value) {
            let enums = {
                '1': '男',
                '2': '女',
            }
            return value && enums[value] ? enums[value] : '其它'
        },
        F_state(value) {
            let enums = {
                '1': '启用',
                '2': '禁用'
            }
            return value && enums[value] ? enums[value] : '其它'
        },
        F_idcardType(value) {
            let enums = {
                '1': '身份证',
                '2': '护照',
                '3': '驾驶证'
            }
            return value && enums[value] ? enums[value] : '其它'
        }

    },
    mounted() {
        console.log(this.$route)
        this.detailForm.id = this.$route.query.id
        if (this.$route.name == 'customeradd') {
            this.type = 'add'
        } else if (this.$route.name == 'customeredit') {
            this.type = 'edit'
        } else {
            this.type = 'detail'
        }
        this.stores_list()
        this.nationality()
        this.smembertype_list()
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
        },
        smembertype_list() {
            let params = {
                name: '',
                pageIndex: 1,
                pageSize: 10,
                paging: false,
                id: ''
            }
            this.$F.doRequest(this, '/pms/membertype/list', params, (data) => {
                this.smembertypeList = data.list;
            })
        },
        stores_list() {
            this.$F.doRequest(this, '/pms/freeuser/stores_list', {}, (data) => {
                this.storeList = data;
            })
        },
        nationality() {
            this.$F.doRequest(this, '/pms/system/country_list', {}, (res) => {
                this.nationalityList = res;
            })
        },

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
