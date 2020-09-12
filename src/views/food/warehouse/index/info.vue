<template>
    <div class="action" v-loading="loading">
        <div>
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                 <el-form-item size="small" label="仓库名称:" prop="soteageName">
                    <el-input v-model="form.soteageName" placeholder="仓库名称"></el-input>
                  </el-form-item>

                <el-form-item label="计费类型:" prop="state">
                    <el-radio-group v-model="form.state" >
                        <el-radio :label="1">启用</el-radio>
                        <el-radio :label="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item  label="仓库地址:" prop="address">
                    <el-input type="textarea" placeholder="请填写仓库地址" v-model="form.address"  maxlength="200" show-word-limit></el-input>
                </el-form-item>


                <el-form-item  label="备注:">
                    <el-input type="textarea" placeholder="请填写备注" v-model="form.remark"  maxlength="200" show-word-limit></el-input>
                </el-form-item>




            </el-form>
        </div>
        <el-divider></el-divider>
        <div class="dialog-footer text-center" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">取消</el-button>
           <el-button type="primary" size="small"  @click="submit">确认</el-button>
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
                        {required: true, message: '请输入仓库名称', trigger: 'change' }
                    ],
                    state: [
                        { required: true, message: '请选择状态', trigger: 'change' }
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
            },
            //获取传过来的值
            getInfo(data){
                this.intForm();
                console.log(data)
                this.info = {
                    state:1,//状态
                    soteageName:'',// 仓库名称 String 必填
                    address:'',// 仓库地址 String 非必填
                    remark:'',//  备注 String 非必填
                }
                if(data.id){
                    this.info.id = data.id
                }
            },



            submit(){
                let params = this.form
                params.userId = this.userId
                params.storesNum = this.storesNum
                console.log(params)
                this.$F.doRequest(this, "/pms/hotelmealstorage/edit", params, (res) => {
                    this.alert(200,'操作成功');
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
