<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-08 16:53:11
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
            type: 'edit',
            setCardFormVisible: false,
            formLabelWidth: '120px',
            cardForm: {
                titleName: '',
                type: '',
                name: ''
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
