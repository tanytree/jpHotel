<template>
   <div>
       <div class="padding-20">{{$t('food.common.hanlde_empty_remain')}}</div>
       <div style="padding: 0 20px;">
            <el-checkbox v-model="checked">{{$t('food.common.hanlde_empty_warning')}}</el-checkbox>
       </div>
       <el-divider></el-divider>
       <div class="dialog-footer text-right" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">{{$t('food.common.cancel')}}</el-button>
           <el-button size="small" @click="submitForm" type="primary">{{$t('food.common.ok')}}</el-button>
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
                checked:false
            };
        },
        computed: {
            ...mapState({
                token: state => state.user.token,
                userId: state => state.user.userId,
                msgKey: state => state.config.msgKey,
                plat_source: state => state.config.plat_source
            })
        },
        mounted() {
        },
        methods: {
            submitForm() {
                    let params = {}
                    if(this.checked){
                        params.clearWaring = 1
                    }else{
                        params.clearWaring = 2
                    }
                    params.userId = this.userId
                    params.storesNum = this.storesNum
                    this.$F.doRequest(this, "/pms/dishes/dishes_manage_clear_waring", params, (res) => {
                        console.log(res)
                        this.alert(200,this.$t('food.common.success'));
                        this.closeDialog();
                    });
            },
            closeDialog(){
                this.$emit('closeDialog');
                this.checked = false

            }
        }
    }
</script>

<style>
</style>
