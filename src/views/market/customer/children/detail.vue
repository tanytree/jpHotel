<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-21 16:56:31
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
                        <el-form inline size="small" label-width='120px' :model="detailForm" ref="detailForm" :rules="type!='detail'?rules:{}">
                            <el-row v-if="type=='edit'">
                                <el-form-item label="">
                                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(1)">换卡</el-button>
                                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(2)">修改类型</el-button>
                                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(3)">注销</el-button>
                                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(4)">挂失补卡</el-button>
                                </el-form-item>
                            </el-row>
                            <el-row v-if="type=='add'">
                                <el-form-item label="">
                                    <el-button type="primary" size="mini">读会员号</el-button>
                                </el-form-item>
                            </el-row>
                            <el-row class="row" style="background:#EFEFEF" v-if="type!='add'">
                                <div class="wrap">
                                    <p>剩余积分：<span class="text-blue">10000</span></p>
                                    <p><span class="text-blue">明细</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-blue" v-if="type=='edit'">积分兑换</span></p>
                                </div>
                            </el-row>
                            <br />
                            <el-row class="row">
                                <el-row class="cell">
                                    <template v-if="type=='add'">
                                        <el-col :span="8" class="col">
                                            <el-form-item label="会员卡号" prop="memberCard">
                                                <el-input v-model="detailForm.memberCard" v-if="type!='detail'"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8" class="col">
                                            <el-form-item label="会员类型" prop="memberTypeId">
                                                <el-select v-model="detailForm.memberTypeId" v-if="type!='detail'" class="">
                                                    <el-option v-for="item in smembertypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </template>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="姓名" prop="name">
                                            <el-input v-model="detailForm.name" v-if="type!='detail'"></el-input>
                                            <template v-if="type=='detail'">{{detailForm.name}}</template>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="电话" prop="mobile">
                                            <el-input v-model="detailForm.mobile" v-if="type!='detail'"></el-input>
                                            <template v-if="type=='detail'">{{detailForm.mobile}}</template>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="证件类型" prop="idcardType">
                                            <el-select v-model="detailForm.idcardType" v-if="type!='detail'" class="">
                                                <el-option label="身份证" :value="1"></el-option>
                                                <el-option label="护照" :value="2"></el-option>
                                                <el-option label="驾驶证" :value="3"></el-option>
                                            </el-select>
                                            <template v-if="type=='detail'">{{detailForm.idcardType | F_idcardType}}</template>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="证件号码" prop="idcard">
                                            <el-input v-model="detailForm.idcard" v-if="type!='detail'" class=""></el-input>
                                            <template v-if="type=='detail'">{{detailForm.idcard}}</template>

                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell" v-if="type!='add'">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="会员卡号">
                                            {{detailForm.memberCard}}
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="会员类型">
                                            {{F_memberTypeId(detailForm.memberTypeId)}}
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="是否黑名单">
                                            {{detailForm.isBlacklist | F_isBlacklist}}
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-row>
                            <el-divider></el-divider>
                            <el-row class="row">
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="性别" prop="sex">
                                            <el-radio-group v-model="detailForm.sex" v-if="type!='detail'">
                                                <el-radio :label="1">男</el-radio>
                                                <el-radio :label="2">女</el-radio>
                                                <el-radio :label="3">保密</el-radio>
                                            </el-radio-group>
                                            <template v-if="type=='detail'">{{detailForm.sex | F_sex}}</template>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="生日" prop="birthday">
                                            <el-date-picker v-model="detailForm.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-if="type!='detail'"></el-date-picker>
                                            <template v-if="type=='detail'">{{detailForm.birthday}}</template>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="邮箱" prop="email">
                                            <el-input v-model="detailForm.email" v-if="type!='detail'"></el-input>
                                            <template v-if="type=='detail'">{{detailForm.email}}</template>

                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="国籍" prop="nationality">
                                            <el-select v-model="detailForm.nationality" class="" v-if="type!='detail'">
                                                <el-option v-for="item in nationalityList" :key="item.id" :label="$i18n.locale == 'ri' ?item.jName:item.cName" :value="item.id">
                                                </el-option>
                                            </el-select>
                                            <template v-if="type=='detail'">{{F_nationality(detailForm.nationality)}}</template>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="地址" prop="address">
                                            <el-input v-model="detailForm.address" v-if="type!='detail'"></el-input>
                                            <template v-if="type=='detail'">{{detailForm.address}}</template>

                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="车牌号" prop="carNum">
                                            <el-input v-model="detailForm.carNum" v-if="type!='detail'"></el-input>
                                            <template v-if="type=='detail'">{{detailForm.carNum}}</template>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="爱好" prop="hobby">
                                            <el-input v-model="detailForm.hobby" v-if="type!='detail'"></el-input>
                                            <template v-if="type=='detail'">{{detailForm.hobby}}</template>

                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="所属单位" prop="enterId">
                                            <el-select v-model="detailForm.enterId" class="" v-if="type!='detail'">
                                                <el-option v-for="item in hotelenterList" :key="item.id" :label="item.enterName" :value="item.id">
                                                </el-option>
                                            </el-select>
                                            <template v-if="type=='detail'">{{F_enterId(detailForm.enterId)}}</template>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="备注">
                                            <el-input v-model="detailForm.remark" v-if="type!='detail'"></el-input>
                                            <template v-if="type=='detail'">{{detailForm.remark}}</template>

                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-row>
                            <el-divider></el-divider>
                            <el-row class="row">
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="销售员" prop="salesId">
                                            <el-select v-model="detailForm.salesId" v-if="type!='detail'">
                                                <el-option v-for="item in salesList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
                                            </el-select>
                                            <template v-if="type=='detail'">{{F_salesId(detailForm.salesId)}}</template>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" class="col">
                                        <el-form-item label="发展途径" prop="getWay">
                                            <el-select v-model="detailForm.getWay" v-if="type!='detail'">
                                                <el-option label="线上" :value="1"></el-option>
                                                <el-option label="线下" :value="2"></el-option>
                                            </el-select>
                                            <template v-if="type=='detail'">{{detailForm.mobile}}</template>

                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-row>
                            <el-row class="row" v-if="type=='add'">
                                <el-row class="cell">
                                    <el-col :span="8" class="col">
                                        <el-form-item label="立即发卡" prop="state">
                                            <el-select v-model="detailForm.state">
                                                <el-option label="是" :value="1"></el-option>
                                                <el-option label="待启用" :value="2"></el-option>
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
                <el-button type="primary" @click="addItem('detailForm')">保存</el-button>
                <el-button @click="$router.go(-1)">返回</el-button>
            </div>
        </el-row>
    </template>

    <el-dialog top="0" :title="cardForm.titleName" :visible.sync="setCardFormVisible" class="setCardForm">
        <el-form :model="cardForm" ref="cardForm" :rules="rules" :label-width="formLabelWidth">
            <el-form-item label="" class="require" label-width="80px">
                原卡号：{{detailForm.memberCard}} 姓名：{{detailForm.name}} 会员类型：{{F_memberTypeId(detailForm.memberTypeId)}}
            </el-form-item>
            <template v-if="cardForm.type==1">
                <el-form-item label="新卡号" class="" prop="memberCard">
                    <el-input style="width:300px" v-model="cardForm.memberCard" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="备注" class="" prop="remark">
                    <el-input style="width:300px" type="textarea" v-model="cardForm.remark" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="立即发卡" class="" prop="state">
                    <el-checkbox v-model="cardForm.state"></el-checkbox>
                </el-form-item>
            </template>
            <template v-if="cardForm.type==2">
                <el-form-item label="修改为" class="" prop="memberTypeId">
                    <el-select v-model="cardForm.memberTypeId" style="width:300px">
                        <el-option v-for="item in smembertypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式" class="" prop="payWay">
                    <el-select v-model="cardForm.payWay" style="width:300px">
                        <el-option label="现金" :value="1"></el-option>
                        <el-option label="微信" :value="2"></el-option>
                        <el-option label="支付宝" :value="3"></el-option>
                        <el-option label="银联" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付费用" class="" prop="payPrices">
                    <el-input style="width:300px" v-model="cardForm.payPrices" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="修改原因" class="" prop="remark">
                    <el-input style="width:300px" type="textarea" v-model="cardForm.remark" placeholder=""></el-input>
                </el-form-item>
            </template>
            <template v-if="cardForm.type==3">
                <el-form-item label="备注" class="" prop="remark">
                    <el-input style="width:300px" type="textarea" v-model="cardForm.remark" placeholder=""></el-input>
                </el-form-item>
            </template>
            <template v-if="cardForm.type==4">
                <el-form-item label="操作类型" class="">
                    <el-radio-group v-model="cardForm.operType">
                        <el-radio :label="2">挂失并补卡</el-radio>
                        <el-radio :label="3">仅挂失</el-radio>
                    </el-radio-group>
                </el-form-item>
                <template v-if="cardForm.operType==2">
                    <el-form-item label="新卡号" class="">
                        <el-input style="width:300px" v-model="cardForm.memberCard" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="支付方式" class="" prop="payWay">
                        <el-select v-model="cardForm.payWay" style="width:300px">
                            <el-option label="现金" :value="1"></el-option>
                            <el-option label="微信" :value="2"></el-option>
                            <el-option label="支付宝" :value="3"></el-option>
                            <el-option label="银联" :value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支付费用" class="" prop="payPrices">
                        <el-input style="width:300px" v-model="cardForm.payPrices" placeholder=""></el-input>
                    </el-form-item>
                </template>
                <el-form-item label="备注" class="" prop="remark">
                    <el-input style="width:300px" type="textarea" v-model="cardForm.remark" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="立即发卡" class="" prop="state" v-if="cardForm.operType==1">
                    <el-checkbox v-model="detailForm.state"></el-checkbox>
                </el-form-item>
            </template>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="setCardFormVisible=false">关闭</el-button>
            <el-button type="primary" @click="setCardFrormChange('cardForm')">确认</el-button>
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

            }
        };
    },
    filters: {

    },
    mounted() {
        console.log(this.$route)
        this.detailForm.id = this.$route.query.id ? this.$route.query.id : ''
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
                this.detailForm = res
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
                            cardNum:this.detailForm.memberCard,
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
                            url = '/pms/hotelmember/enable_disable';
                        } else {
                            params = {
                                id: this.detailForm.id,
                                remark: this.cardForm.remark
                            }
                            url = '/pms/hotelmember/enable_disable';
                        }
                    }
                    this.$F.doRequest(this, url, params, (data) => {
                        if (this.cardForm.type != 3) {
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
        login_user_list() {
            let params = {
                searchType: 2,
                paging: false,
                salesFlag: 1,
                content: '',
                departmentId: '',
                pageIndex: 1,
                pageSize: 10
            }
            this.$F.doRequest(this, '/pms/workuser/login_user_list', params, (data) => {
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
            this.$F.doRequest(this, '/pms/hotelenter/list', params, (data) => {
                this.hotelenterList = data.list
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
        addItem(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$F.doRequest(this, '/pms/hotelmember/edit', this.detailForm, (res) => {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 2000)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

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
