<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-26 13:26:05
 * @FilePath: \jiudian\src\views\sale\order\member\graces\list3.vue
 -->

<template>
    <div>
        <el-form :model="ruleForm"  ref="ruleForm" :rules="rules">
            <el-row>
                <div class="header">{{$t('boss.add_housePriceDeduction')}}</div>
                <el-form-item :label="$t('boss.add_ifEnabel')+':'" prop="house_discount_flag">
                    <el-radio-group v-model="ruleForm.house_discount_flag">
                        <el-radio label="1">{{$t('boss.add_yes')}}</el-radio>
                        <el-radio label="2">{{$t('boss.add_not')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('boss.add_discount')+':'" prop="house_discount_ratio">
                    <el-input style="width:200px" v-model="ruleForm.house_discount_ratio"  :placeholder="$t('boss.add_orange')"></el-input>
                    <span style="color:#666666;margin-left:5px;">{{$t('boss.add_deductionRoomprice')}}</span>
                </el-form-item>
            </el-row>

            <el-row>
                <div class="header">{{$t('boss.add_meetingDiscount')}}</div>
                <el-form-item :label="$t('boss.add_ifEnabel')+':'" prop="chamber_discount_flag">
                    <el-radio-group v-model="ruleForm.chamber_discount_flag">
                        <el-radio label="1">{{$t('boss.add_yes')}}</el-radio>
                        <el-radio label="2">{{$t('boss.add_not')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-row>

            <el-row>
                <div class="header">{{$t('boss.add_foodDiscount')}}</div>
                <el-form-item :label="$t('boss.add_ifEnabel')+':'" prop="meeting_discount_flag">
                    <el-radio-group v-model="ruleForm.meeting_discount_flag">
                        <el-radio label="1">{{$t('boss.add_yes')}}</el-radio>
                        <el-radio label="2">{{$t('boss.add_not')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-row>
            <el-row>
                <div class="header">{{$t('boss.add_goodDiscount')}}</div>
                <el-form-item :label="$t('boss.add_ifEnabel')+':'" prop="shop_discount_flag ">
                    <el-radio-group v-model="ruleForm.shop_discount_flag ">
                        <el-radio label="1">{{$t('boss.add_yes')}}</el-radio>
                        <el-radio label="2">{{$t('boss.add_not')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('boss.add_discount')+':'" prop="shop_discount_ratio">
                    <el-input style="width:200px" v-model="ruleForm.shop_discount_ratio" :placeholder="$t('boss.add_orange')"></el-input>
                    <span style="color:#666666">{{$t('boss.add_deductionGoodsprice')}}</span>
                </el-form-item>
            </el-row>
            <el-form-item>
                <el-button type="primary" v-loading="loading" @click="save('ruleForm')">{{$t('commons.save')}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            ruleForm: {
                chamber_discount_flag: "1",
                house_discount_flag: "1",
                house_discount_ratio: "0.22",
                meeting_discount_flag: "2",
                shop_discount_flag: "2",
                shop_discount_ratio: "0.22"
            },
            rules: {
                house_discount_ratio: [
                    { required: true, trigger: 'blur' },
                ],
                shop_discount_ratio: [
                    { required: true, trigger: 'blur' },
                ]
            },
        }
    },
    mounted () {
        this.$F.doRequest(this, '/pms/hotelparam/discountfind', {}, (res) => {
            this.$F.merge(this.ruleForm, res);
        })
    },
    methods: {
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$F.doRequest(this, '/pms/hotelparam/integraldiscount', this.ruleForm, (res) => {
                        this.$message.success('Success')
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.header {
    color: rgba(30, 30, 30, 1);
    font-size: 16px;
    font-weight: 800;
}
</style>
