<!--
 * @Date: 2020-09-14 09:29:00
 * @Author: 陶子
 * @LastEditTime: 2021-01-25 11:01:29
 * @FilePath: \jiudian\src\views\food\dish\other\edit.vue
-->
<template>
    <el-form :model="form" ref="form" label-width="150px" >

      <el-form-item
        :label="$t('food.common.food_remain_count')"
        prop="remainingCount"
      >
        <el-input type="text" v-model.number="form.remainingCount" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('food.common.warning_count')"
        prop="warningCount"
      >
        <el-input type="text" v-model.number="form.warningCount" autocomplete="off"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <div class="dialog-footer text-right" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">{{$t('food.common.cancel')}}</el-button>
           <el-button size="small" type="primary" @click="submitForm('form')">{{$t('food.reset.submit')}}</el-button>
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
                           this.alert(200,this.$t('food.common.success'));
                           this.closeDialog();
                        });
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
