<template>
   <div>
       <div class="padding-20">手动清空将清空所有菜品剩余份数，所有菜品可以重新设置剩余份数</div>
       <div style="padding: 0 20px;">
            <el-checkbox v-model="checked">清除所有菜品预警数</el-checkbox>
       </div>
       <el-divider></el-divider>
       <div class="dialog-footer text-right" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">取 消</el-button>
           <el-button size="small" @click="submitForm" type="primary">确 定</el-button>
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
                if(this.checked){
                    let params = {}
                    params.userId = this.userId
                    params.storesNum = this.storesNum
                    this.$F.doRequest(this, "/pms/dishes/dishes_manage_clear_waring", params, (res) => {
                        console.log(res)
                        this.alert(200,'操作成功')
                        this.closeDialog();
                    });
                }
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
