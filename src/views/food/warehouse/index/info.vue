<template>
    <div class="action" v-loading="loading">
        <div>
		   <el-form label-width="100px" class="demo-ruleForm">
		        <el-form-item size="small" label="仓库名称 :">
                    <div class="text-black">{{ info.soteageName}}</div>
		        </el-form-item>
		        <el-form-item label="状态 :">
                    <div class="text-black">{{ info.state == 1 ? '启用' : '禁用'}}</div>
		        </el-form-item>
		        <el-form-item  label="仓库地址 :">
                    <div class="text-black">{{ info.address}}</div>
		        </el-form-item>
		        <el-form-item label="备注 :">
		           <div class="text-black">{{ info.remark}}</div>
		        </el-form-item>
		   </el-form>
        </div>
        <el-divider></el-divider>
        <div class="dialog-footer text-center" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">关闭</el-button>
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
                        {required: true, message: '请输入仓库名称', trigger: 'blur' }
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
            },
            //获取传过来的值
            getInfo(data){
                this.info = data
                console.log(data)
                console.log('详情')

            },

            closeDialog(){
                this.info = {}
                this.$emit('closeDialog')
            }
        },
        watch:{

        }
    }
</script>

<style lang="less" scoped>

.text-black{color: #333;}

.el-form-item {
    margin-bottom: 0px;
}

</style>
