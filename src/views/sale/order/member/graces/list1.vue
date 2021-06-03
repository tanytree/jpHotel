<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-26 11:06:35
 * @FilePath: \jiudian\src\views\sale\order\member\graces\list1.vue
 -->

<template>
    <div>
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
            <el-row>
                <div class="header">{{$t('boss.add_integralConversion')}}</div>
                <el-form-item :label="$t('boss.add_conversionRatio')+':'" prop="integralSetDetail">
                    <el-input style="width:200px" v-model="ruleForm.integralSetDetail"></el-input>
                    <span style="color:#666666;margin-left:5px;">{{$t('boss.add_theFormula')}}</span>
                </el-form-item>
            </el-row>
            <el-form-item>
                <el-button type="primary" v-loading="loading2" @click="save('ruleForm')">{{$t('commons.save')}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data () {
        return {
            loading2: false,
            ruleForm: {
                integralSetDetail: '',
            },
            rules: {
                integralSetDetail: [
                    { required: true, trigger: 'blur' },
                ]
            },
        }
    },
    mounted () {
        this.$F.doRequest(this, '/pms/hotelparam/convertfind', {}, (res) => {
            this.ruleForm.integralSetDetail = res
        })
    },
    methods: {
        save (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading2 = true;
                    this.$F.doRequest(this, '/pms/hotelparam/integralconvert', this.ruleForm, (res) => {
                        this.$message.success(this.$t('commons.successTip'))
                        this.loading2 = false;
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
