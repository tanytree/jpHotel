<template>
    <div class="action" v-loading="loading">
        <div>
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                 <el-form-item size="small" :label="$t('food.common.storage_name')" prop="soteageName">
                    <el-input v-model="form.soteageName" :placeholder="$t('food.common.storage_name')"></el-input>
                  </el-form-item>

                <el-form-item :label="$t('food.common.status')" prop="state">
                    <el-radio-group v-model="form.state" >
                        <el-radio :label="1">{{$t('food.common.active')}}</el-radio>
                        <el-radio :label="2">{{$t('food.common.disable')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item  :label="$t('food.common.storage_address')" prop="address">
                    <el-input type="textarea" :placeholder="$t('food.common.storage_address')" v-model="form.address"  maxlength="200" show-word-limit></el-input>
                </el-form-item>
                <el-form-item  :label="$t('food.common.remark')">
                    <el-input type="textarea" :placeholder="$t('food.common.remark')" v-model="form.remark"  maxlength="200" show-word-limit></el-input>
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
                    state:1,//状态
                    soteageName:'',// 仓库名称 String 必填
                    address:'',// 仓库地址 String 非必填
                    remark:'',//  备注 String 非必填
                },
                rules: {
                    soteageName: [
                        {required: true, message: this.$t('food.common.input_storage_name'), trigger: 'change' }
                    ],
                    state: [
                        { required: true, message: this.$t('food.common.status'), trigger: 'change' }
                    ],
                }
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
                    id:'',
                    state:1,//状态
                    soteageName:'',// 仓库名称 String 必填
                    address:'',// 仓库地址 String 非必填
                    remark:'',//  备注 String 非必填
                }
                this.$refs['form'].resetFields();
                // console.log('初始化')
            },
            //获取传过来的值
            getData(data){
                this.intForm();
                // console.log(data)
                // console.log('新增/编辑')
                this.form = {
                    state:data.state,//状态
                    soteageName:data.soteageName,// 仓库名称 String 必填
                    address:data.address,// 仓库地址 String 非必填
                    remark:data.remark,//  备注 String 非必填
                }
                if(data.id){
                    this.form.id = data.id
                }
                // console.log(this.form)
            },

            submit(){
                let params = this.form
                params.userId = this.userId
                params.storesNum = this.storesNum
                // console.log(params)
                this.$refs['form'].validate((valid) => {
                  if (valid) {
                    this.$F.doRequest(this, "/pms/hotelmealstorage/edit", params, (res) => {
                        this.alert(200,this.$t('food.common.success'));
                        this.closeDialog();
                    });
                  } else {
                    // console.log('error submit!!');
                    return false;
                  }
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
