<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-06 16:33:58
 * @FilePath: /jiudian/src/views/market/customer/children/historydetail.vue
 -->
<template>
<div>
    <el-card>
        <!-- 头部导航 -->
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/customerhistory' }">客史档案</el-breadcrumb-item>
                <el-breadcrumb-item>张三</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="bodyInfo">
            <div class="mianInfo">
                <div class="thisOrderInfo">
                    <div class="wrap">
                        <el-form inline size="small" label-width='120px'>
                            <el-row class="row">
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="姓名">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="电话">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="证件类型">
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
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="生日">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="邮箱">
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="国籍">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="地址">
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="车牌号">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="爱好">
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="所属单位">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="备注">
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-row>
                            <el-divider></el-divider>
                            <el-row class="row">
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="销售员">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="发展途径">
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
            loading: false,
            type: 'edit',
            setCardFormVisible: false,
            formLabelWidth: '120px',
            nationalityList: [],
            storeList: '',
            smembertypeList: '',
            salesList: '',
            hotelenterList: '',
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
                    message: '请输入姓名',
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
                memberTypeId: [{
                    required: true,
                    message: '请选择会员类型',
                    trigger: 'change'
                }, ],
                state: [{
                    required: true,
                    message: '请选择是否立即发卡',
                    trigger: 'change'
                }, ],
                remark: [{
                    required: true,
                    message: '请填写备注',
                    trigger: 'blur'
                }, ],
                payPrices: [{
                    required: true,
                    message: '请填写支付金额',
                    trigger: 'blur'
                }, ],
                payWay: [{
                    required: true,
                    message: '请选择支付方式',
                    trigger: 'change'
                }, ],
                operType: [{
                    required: true,
                    message: '请选择操作类型',
                    trigger: 'change'
                }, ],

            }
        };
    },
    filters: {

    },
    mounted() {
        this.detailForm.id = this.$route.query.id ? this.$route.query.id : ''
        // debugger
        if (this.$route.name == 'customeradd') {
            this.type = 'add'
        } else if (this.$route.name == 'customeredit') {
            this.type = 'edit'
        } else {
            this.type = 'detail'
        }
        if (this.$route.query.id) {
            this.findone(this.$route.query.id)
        }
        this.stores_list()
        this.nationality()
        this.login_user_list()
        this.hotelenter_list()
        this.smembertype_list()
    },

    methods: {
        findone(id) {
            this.$F.doRequest(this, '/pms/hotelmember/findone', {
                id: id
            }, (res) => {
                for (var key in res) { //遍历json对象的每个key/value对,p为key
                    if (res[key] && typeof (res[key]) == "number") {
                        res[key] = res[key].toString();
                    }
                }
                this.detailForm = res;
            })
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
        setCardFrormChange(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {},
                        url = '';
                    if (this.cardForm.type == 1) {
                        url = '/pms/hotelmember/changecard';
                        params = {
                            id: this.detailForm.id,
                            remark: this.cardForm.remark,
                            memberCard: this.cardForm.memberCard,
                            state: this.cardForm.state ? 1 : 3
                        }
                    }
                    if (this.cardForm.type == 2) {
                        url = '/pms/hotelmember/change_type';
                        params = {
                            memberId: this.detailForm.id,
                            remark: this.cardForm.remark,
                            oldTypeId: this.detailForm.memberTypeId,
                            newTypeId: this.cardForm.memberTypeId,
                            operType: 1,
                            oldCardNum: this.detailForm.memberCard,
                            cardNum: this.detailForm.memberCard,
                            payWay: this.cardForm.payWay,
                            payPrices: this.cardForm.payPrices
                        }
                    }
                    if (this.cardForm.type == 3) {
                        url = '/pms/hotelmember/delete';
                        params = {
                            id: this.detailForm.id,
                            remark: this.cardForm.remark,
                        }
                    }
                    if (this.cardForm.type == 4) {
                        if (this.cardForm.operType == 2) {
                            params = {
                                memberId: this.detailForm.id,
                                remark: this.cardForm.remark,
                                oldTypeId: this.detailForm.memberTypeId,
                                newTypeId: this.detailForm.memberTypeId,
                                operType: 2,
                                oldCardNum: this.detailForm.memberCard,
                                cardNum: this.cardForm.memberCard,
                                payWay: this.cardForm.payWay,
                                payPrices: this.cardForm.payPrices
                            }
                            url = '/pms/hotelmember/change_type';
                        } else {
                            params = {
                                id: this.detailForm.id,
                                remark: this.cardForm.remark,
                                state: 2
                            }
                            url = '/pms/hotelmember/enable_disable';
                        }
                    }
                    this.$F.doRequest(this, url, params, (data) => {
                        if (this.cardForm.type != 3 || this.cardForm.type != 4) {
                            this.setCardFormVisible = false
                            this.findone(this.detailForm.id)
                        } else {
                            this.$router.go(-1)
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        smembertype_list() {
            this.$F.commons.fetchMemberTypeList({}, (res) => {
                this.smembertypeList = res.list;
            })
        },
        login_user_list() {
            let params = {
                searchType: 1,
                paging: false,
                salesFlag: 1,
                content: '',
                departmentId: '',
                pageIndex: 1,
                pageSize: 10
            }
            this.$F.doRequest(null, '/pms/workuser/login_user_list', params, (data) => {
                this.salesList = data.hotelUserList;
            })
        },
        hotelenter_list() {
            let params = {
                id: '',
                enterName: '',
                state: 1,
                shareFlag: '',
                contactName: '',
                contactPhone: '',
                salesId: '',
                startCreditLimit: '',
                endCreditLimit: '',
                paging: false,
                salesFlag: 1,
                pageIndex: 1,
                pageSize: 10
            }
            this.$F.doRequest(null, '/pms/hotelenter/list', params, (data) => {
                this.hotelenterList = data.list
            })
        },
        stores_list() {
            this.$F.doRequest(null, '/pms/freeuser/stores_list', {}, (data) => {
                this.storeList = data;
            })
        },
        nationality() {
            this.$F.commons.fetchNationality((res) => {
                this.nationalityList = res;
            })
        },
        addItem(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$F.doRequest(this, '/pms/hotelmember/edit', this.detailForm, (res) => {
                        this.$message({
                            message: 'success',
                            type: 'success'
                        });
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 1200)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        memberTypeIdChange(e) {
            let that = this
            console.log(e)
            for (let k in that.smembertypeList) {
                if (that.smembertypeList[k].id == e) {
                    this.cardForm.payPrices = that.smembertypeList[k].prices || ''
                }
            }
        },
        F_memberTypeId(v) {
            let that = this
            for (let k in that.smembertypeList) {
                if (that.smembertypeList[k].id == v) {
                    return that.smembertypeList[k].name
                }
            }
            return ''
        },
        F_storeName(v) {
            let that = this
            for (let k in that.storeList) {
                if (that.storeList[k].storesNum == v) {
                    return that.storeList[k].storesName
                }
            }
            return ''
        },
        F_nationality(v) {
            let that = this
            for (let k in that.nationalityList) {
                if (that.nationalityList[k].id == v) {
                    return this.$i18n.locale == 'ri' ? that.nationalityList[k].jName : that.nationalityList[k].cName
                }
            }
            return ''
        },
        F_salesId(v) {
            let that = this
            for (let k in that.salesList) {
                if (that.salesList[k].id == v) {
                    return that.salesList[k].userName
                }
            }
            return ''
        },
        F_enterId(v) {
            let that = this
            for (let k in that.hotelenterList) {
                if (that.hotelenterList[k].id == v) {
                    return that.hotelenterList[k].enterName
                }
            }
            return ''
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
