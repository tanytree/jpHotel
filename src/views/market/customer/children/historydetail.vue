<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-27 15:38:49
 * @FilePath: \jiudian\src\views\market\customer\children\historydetail.vue
 -->
<template>
    <div>
        <el-card>
            <!-- 头部导航 -->
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item
                        @click.native="goBack"
                        style="cursor: pointer"
                        >客史档案</el-breadcrumb-item
                    >
                    <el-breadcrumb-item>{{ itemInfo.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="bodyInfo">
                <div class="mianInfo">
                    <div class="thisOrderInfo">
                        <div class="wrap">
                            <el-form inline size="small" label-width="120px">
                                <el-row class="row">
                                    <el-row class="cell">
                                        <el-col :span="7" class="col">
                                            <el-form-item label="姓名:">
                                                <el-input
                                                    v-model="editorForm.name"
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7" class="col">
                                            <el-form-item label="电话:">
                                                <el-input
                                                    v-model="editorForm.mobile"
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="10" class="col">
                                            <el-form-item
                                                :label="
                                                    $t('commons.idCardTypeDesc')
                                                "
                                            >
                                                <el-select
                                                    style="
                                                        width: 100px;
                                                        margin-right: 4px;
                                                    "
                                                    v-model="
                                                        editorForm.idcardType
                                                    "
                                                    :placeholder="
                                                        $t(
                                                            'commons.placeChoose'
                                                        )
                                                    "
                                                    size="small"
                                                >
                                                    <el-option
                                                        v-for="(label,
                                                        value) in $t(
                                                            'commons.idCardType'
                                                        )"
                                                        :label="label"
                                                        :value="value"
                                                        :key="value"
                                                    ></el-option>
                                                </el-select>
                                                <el-input
                                                    v-model="editorForm.idcard"
                                                    style="width: 200px"
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-row>
                                <el-row class="row">
                                    <el-row class="cell">
                                        <el-col :span="7" class="col">
                                            <el-form-item label="性别:">
                                                <el-radio-group
                                                    v-model="editorForm.sex"
                                                >
                                                    <el-radio :label="1"
                                                        >男</el-radio
                                                    >
                                                    <el-radio :label="2"
                                                        >女</el-radio
                                                    >
                                                </el-radio-group>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="7" class="col">
                                            <el-form-item label="生日:">
                                                <el-date-picker
                                                    type="date"
                                                    placeholder="选择日期"
                                                    v-model="
                                                        editorForm.birthday
                                                    "
                                                    style="width: 200px"
                                                ></el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="10" class="col">
                                            <el-form-item label="邮箱:">
                                                <el-input
                                                    v-model="editorForm.email"
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row class="cell">
                                        <el-col :span="7" class="col">
                                            <el-form-item label="国籍:">
                                                <el-input
                                                    v-model="
                                                        editorForm.nationality
                                                    "
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="17" class="col">
                                            <el-form-item label="地址:">
                                                <el-input
                                                    v-model="editorForm.address"
                                                    style="width: 530px"
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row class="cell">
                                        <el-col :span="7" class="col">
                                            <el-form-item label="车牌号:">
                                                <el-input
                                                    v-model="editorForm.carNum"
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="17" class="col">
                                            <el-form-item label="爱好:">
                                                <el-input
                                                    v-model="editorForm.hobby"
                                                    style="width: 530px"
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row class="cell">
                                        <el-col :span="7" class="col">
                                            <el-form-item label="所属单位:">
                                                <el-select
                                                    style="width: 200px"
                                                    v-model="editorForm.enterId"
                                                    :placeholder="
                                                        $t(
                                                            'commons.placeChoose'
                                                        )
                                                    "
                                                    size="small"
                                                >
                                                    <el-option
                                                        v-for="item in hotelenterList"
                                                        :key="item.id"
                                                        :label="item.enterName"
                                                        :value="item.id"
                                                    ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="17" class="col">
                                            <el-form-item label="备注:">
                                                <el-input
                                                    v-model="editorForm.remark"
                                                    style="width: 530px"
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-row>
                            </el-form>
                        </div>
                        <div style="text-align: right">
                            <el-button type="primary" @click="saveEditor">{{
                                $t("commons.save")
                            }}</el-button>
                            <el-button @click="goBack()">返回</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import {
//     get_user_enterprise
// } from "@/utils/api/company";

export default {
    computed: {
        ...mapState({
            token: (state) => state.user.token,
            userId: (state) => state.user.userId,
            msgKey: (state) => state.config.msgKey,
            plat_source: (state) => state.config.plat_source,
        }),
    },
    data() {
        return {
            editorForm: {
                name: "",
                mobile: "",
                idcardType: "",
                idcard: "",
                sex: "",
                birthday: "",
                email: "",
                nationality: "",
                address: "",
                carNum: "",
                hobby: "",
                enterId: "",
                remark: "",
                memberTypeId: "",
                memberCard: "",
                state: 1,
            },
            hotelenterList: "",
            itemInfo: null,
        };
    },
    created() {
        this.hotelenter_list();
        this.itemInfo = this.$route.query.item;
    },
    mounted() {
        console.log(this.itemInfo);
        this.editorForm.name = this.itemInfo.name;
        this.editorForm.mobile = this.itemInfo.mobile;
        this.editorForm.idcardType = this.itemInfo.idcardType;
        this.editorForm.idcard = this.itemInfo.idcard;
        this.editorForm.sex = this.itemInfo.sex;
        this.editorForm.birthday = this.itemInfo.birthday;
        this.editorForm.email = this.itemInfo.email;
        this.editorForm.nationality = this.itemInfo.nationality;
        this.editorForm.address = this.itemInfo.address;
        this.editorForm.carNum = this.itemInfo.carNum;
        this.editorForm.hobby = this.itemInfo.hobby;
        this.editorForm.enterId = this.itemInfo.enterId;
        this.editorForm.remark = this.itemInfo.remark;
        //以下为非改项
        if (this.itemInfo.memberObject) {
            this.editorForm.memberTypeId = this.itemInfo.memberObject.memberTypeId;
        }
        this.editorForm.memberCard = this.itemInfo.memberCard;
    },

    methods: {
        //点击保存按钮
        saveEditor() {
            console.log(this.editorForm);
            this.$F.doRequest(
                this,
                "/pms/hotelmember/edit",
                this.editorForm,
                (data) => {
                    this.$message({
                        message: this.$t("修改成功"),
                        type: success,
                    });
                }
            );
        },
        hotelenter_list() {
            let params = {
                id: "",
                enterName: "",
                state: 1,
                shareFlag: "",
                contactName: "",
                contactPhone: "",
                salesId: "",
                startCreditLimit: "",
                endCreditLimit: "",
                paging: false,
                salesFlag: 1,
                pageIndex: 1,
                pageSize: 10,
            };
            this.$F.doRequest(this, "/pms/hotelenter/list", params, (data) => {
                this.hotelenterList = data.list;
            });
        },
        goBack() {
            this.$router.history.go(-1);
        },
    },
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
    padding: 10px 20px;
}

.fixedFoot .wrap button {
    margin-left: 20px;
}

.bodyInfo {
    .mianInfo {
    }
}

.thisOrderInfo {
    background: #fff;
    padding-bottom: 30px;

    .wrap {
        padding: 0 20px;

        h3 {
            margin: 0;
            font-size: 15px;
            color: #333;
        }

        .cell {
            padding: 5px 0;
            font-size: 14px;
            color: #333;
        }
    }
}
</style>
