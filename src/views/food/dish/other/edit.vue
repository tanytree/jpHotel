<template>
    <el-form :model="form" ref="form" label-width="150px" >
      <el-form-item
        label="菜品剩余份数:"
        prop="remainingCount"
      >
        <el-input type="text" v-model.number="form.remainingCount" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="预警数:"
        prop="warningCount"
      >
        <el-input type="text" v-model.number="form.warningCount" autocomplete="off"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <div class="dialog-footer text-right" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">取消</el-button>
           <el-button size="small" type="primary" @click="submitForm('form')">提交</el-button>
      </div>
    </el-form>
</template>

<script>
    import { mapState, mapActions } from "vuex"
    import mixin from '../../mixin';
    export default {
        mixins: [mixin],
        data() {
            return {
                form:{
                    dishesId:'',
                    remainingCount:'',
                    warningCount:'',

                },
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

            intData(data){
                console.log(data)
                this.form.dishesId = data.id
                this.form.remainingCount = data.remainingCount
                this.form.warningCount = data.warningCount
                console.log(this.form)
            },

            submitForm(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {
                        }
                        let batchJson = []
                            batchJson = [...batchJson,JSON.parse(JSON.stringify(this.form))]
                        params.userId = this.userId
                        params.storesNum = this.storesNum
                        params.batchJson =  JSON.stringify(batchJson);
                        console.log(params)
                        this.$F.doRequest(this, "/pms/dishes/dishes_manage_updatecount_batch", params, (res) => {
                           console.log(res)
                           this.alert(200,'操作成功')
                           this.closeDialog();
                        });
                    } else {
                      this.alert(0,'操作失败')
                    }
               });
            },
            closeDialog(){
                this.$emit('closeDialog')
            }
        }
    }
</script>

<style>
</style>
