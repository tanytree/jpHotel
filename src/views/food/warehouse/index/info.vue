<template>
    <div class="action" v-loading="loading">
        <div>
		   <el-form label-width="100px" class="demo-ruleForm">
		        <el-form-item size="small" :label="$t('food.common.storage_name')">
                    <div class="text-black">{{ info.soteageName}}</div>
		        </el-form-item>
		        <el-form-item :label="$t('food.common.status')">
                    <div class="text-black">{{ info.state == 1 ? $t('food.common.active') : $t('food.common.disable')}}</div>
		        </el-form-item>
		        <el-form-item  :label="$t('food.common.storage_address')">
                    <div class="text-black">{{ info.address}}</div>
		        </el-form-item>
		        <el-form-item :label="$t('food.common.remark')">
		           <div class="text-black">{{ info.remark}}</div>
		        </el-form-item>
		   </el-form>
        </div>
        <el-divider></el-divider>
        <div class="dialog-footer text-center" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">{{$t('food.common.close')}}</el-button>
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
                // console.log(data)
                // console.log('详情')

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
