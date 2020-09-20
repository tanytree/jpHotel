<template>
   <div class="">
        <div>
            <el-radio v-model="info.flag" :label="true">{{$t('food.common.open')}}</el-radio>
            <el-radio v-model="info.flag" :label="false">{{$t('food.common.close')}}</el-radio>
        </div>
        <div class="padding-tb-20">
            <el-time-select
              v-model="info.content"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              :placeholder="$t('food.common.select_date')">
            </el-time-select>
             <span class="margin-l-15">
                 <el-checkbox v-model="info.check">{{$t('food.common.hanlde_empty_warning')}}</el-checkbox>
             </span>
        </div>
        <el-divider></el-divider>
        <div class="dialog-footer text-right" style="padding: 0 20px;margin:-10px -20px -20px;">
            <el-button size="small" @click="closeDialog">{{$t('food.common.cancel')}}</el-button>
            <el-button size="small" :disabled="!info.content" @click="submitForm" type="primary">{{$t('food.common.ok')}}</el-button>
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
                info:{
                    flag:true,
                    content:'',
                    check:false
                }
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
                // console.log(this.info)
                if( this.info.content ){
                    let params =this.info
                    params.userId = this.userId
                    params.storesNum = this.storesNum
                    this.$F.doRequest(this, "/pms/dishes/dishes_manage_set_auto", params, (res) => {
                        console.log(res)
                        this.alert(200,this.$t('food.common.success'));
                        this.closeDialog();
                    });
                }

            },
            closeDialog(){
                this.$emit('closeDialog');
                this.info = {
                    flag:true,
                    content:'',
                    check:false
                }
            }
        }
    }
</script>

<style>
</style>
