<template>
    <div class="action" v-loading="loading">
        <div>
           <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item :label="$t('food.common.view_status')" prop="state">
                    <el-radio-group v-model="form.state" >
                        <el-radio :label="2">{{$t('food.common.pass')}}</el-radio>
                        <el-radio :label="3">{{$t('food.common.nopass')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item  :label="$t('food.common.view_remark')">
                    <el-input type="textarea" :placeholder="$t('food.common.view_remark')" v-model="form.remark2"  maxlength="200" show-word-limit></el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-divider></el-divider>
        <div class="dialog-footer text-center" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">{{$t('food.common.cancel')}}</el-button>
           <el-button type="primary" size="small"  @click="submit">{{$t('food.common.ok')}}</el-button>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex"
    import mixin from '../../mixin';
    export default {
        mixins: [mixin],
        data() {
            return {
                loading:false,
                info:{},
                form:{
                    orderNo:'',
                    state:2,//状态
                    remark2:'',//  备注 String 非必填
                },

            }
        },
        computed: {
            ...mapState({
                token: state => state.user.token,
                userId: state => state.user.userId,
                msgKey: state => state.config.msgKey,
                plat_source: state => state.config.plat_source
            }),


        },
        mounted() {

        },
        methods: {
            intForm(){
               this.form = {
                    orderNo:'',
                    state:2,//状态
                    remark2:'',//  备注 String 非必填
                }
                this.$refs['form'].resetFields();
            },
            //获取传过来的值
            getData(data){
                this.intForm();
                this.form = {
                    orderNo:data.orderNo,
                    state:2,//状态
                    remark2:data.remark2,//  备注 String 非必填
                }
            },

            submit(){
                let params = this.form
                params.userId = this.userId
                params.storesNum = this.storesNum
                this.$F.doRequest(this, "/pms/mealstoragelog/approval", params, (res) => {
                    this.alert(200,this.$t('food.common.success'));
                    this.closeDialog();
                });
            },

            closeDialog(){
                this.info = {}
                this.intForm()
                this.$emit('closeDialog')
            }
        },
        watch:{

        }
    }
</script>

<style lang="less" scoped>




</style>
