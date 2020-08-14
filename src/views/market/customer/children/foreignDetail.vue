<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-21 10:35:49
 * @FilePath: /jiudian/src/views/market/customer/children/foreignDetail.vue
 -->
<template>
<div>
    <el-card>
        <!-- 头部导航 -->
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/guest' }">外宾详情</el-breadcrumb-item>
                <el-breadcrumb-item>张三</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="bodyInfo">
            <div class="mianInfo">
                <div class="thisOrderInfo">
                    <div class="wrap">
                        <el-form inline size="small" label-width='120px' :model="detailForm">
                            <el-row class="row">
                                <el-row class="cell">
                                    <el-col :span="6" class="col">
                                        <el-form-item label="姓名:">
                                            {{detailForm.name}}
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" class="col">
                                        <el-form-item label="性别:">
                                            {{detailForm.sex | F_sex}}
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="6" class="col">
                                        <el-form-item label="证件类型:">
                                            {{detailForm.idcardType | F_idcardType}}
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" class="col">
                                        <el-form-item label="证件号:">
                                            {{detailForm.idcard}}
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell">
                                    <el-col :span="6" class="col">
                                        <el-form-item label="签证种类:">
                                            {{detailForm.visaType | F_visaType}}
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" class="col">
                                        <el-form-item label="有效时间:">
                                            {{detailForm.dueTime}}
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" class="col">
                                        <el-form-item label="国籍:">
                                            {{F_nationality(detailForm.nationality)}}
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="6" class="col">
                                        <el-form-item label="手机号码:">
                                            {{detailForm.phone}}
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="cell">

                                    <el-col :span="8" class="col">
                                        <el-form-item label="备注:">
                                            {{detailForm.remark}}
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
            storeList: '',
            nationalityList: '',
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
    filters: {


    },
    mounted() {
        let id = this.$route.query.id
        this.$F.doRequest(this, '/pms/foreignguest/findone', {
            id: id
        }, (res) => {
            this.detailForm = res
        })
        this.stores_list()
        this.nationality()
    },

    methods: {
        F_storeName(v) {
            let that = this
            for (let k in that.storeList) {
                if (that.storeList[k].storesNum == v) {
                    return that.storeList[k].storesName
                }
            }
            return '未知门店'
        },
        F_nationality(v) {
            let that = this
            for (let k in that.nationalityList) {
                if (that.nationalityList[k].id == v) {
                    return this.$i18n.locale == 'ri' ? that.nationalityList[k].jName : that.nationalityList[k].cName
                }
            }
            return '未知'
        },
        stores_list() {
            this.$F.doRequest(this, '/pms/freeuser/stores_list', {}, (data) => {
                this.storeList = data;
            })
        },
        nationality() {
          this.$F.commons.fetchNationality((res) => {
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
