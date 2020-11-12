<template>
    <el-form :model="info" ref="form"  :rules="rules"  label-width="150px" >
        <el-form-item :label="$t('food.common.up_level')" v-if="list.length > 0 && info.categoryId !== 0" >
          <el-select v-model="info.pCategoryId" :placeholder="$t('food.common.up_level')">

            <el-option key="0" label="--" value="0"></el-option>
            <el-option v-for="cate in list" :key="cate.id" :label="cate.name" :value="cate.id"></el-option>
          </el-select>
        </el-form-item>      
        <el-form-item :label="info.categoryLevel == 1 ?  $t('food.common.add_first_level') : (info.categoryLevel== 2 ? $t('food.common.add_second_level') : $t('food.common.add_three_level')) " prop="name" >
            <el-input v-model="info.name"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <div class="dialog-footer text-right" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">{{ $t('commons.cancel') }}</el-button>
           <el-button size="small" type="primary" :disabled="!info.name" @click="submitForm('form')">{{$t('food.common.submit')}}</el-button>
        </div>
    </el-form>
</template>

<script>
    import { mapState, mapActions } from "vuex"
    export default {
        data() {
            return {
               info:{
                   categoryLevel:'',
                   pCategoryId:'',
                   categoryId:'',
                   name:''
               },
               list:[],
               rules: {
                 name: [{
                   required: true,
                   message: this.$t('food.common.input_food_cate_name'),
                   trigger: 'change'
                 }]
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
            //获取传过来的值
            intForm(){
                this.info = {
                    categoryLevel:'',
                    pCategoryId:'',
                    categoryId:'',
                    name:''
                }
                this.list = []
            },
            intData(data){
                console.log(data)
                this.info.categoryLevel = data.categoryLevel
                this.info.pCategoryId = data.pCategoryId
                this.info.categoryId = data.categoryId
                this.info.name = data.name
                this.list = data.cartgrayList
            },


            submitForm(form) {
                let params = {
                    userId:this.userId,
                    storesNum:this.storesNum,
                    name:this.info.name
                }
                if(this.info.categoryLevel !== ''){
                    params.categoryLevel = this.info.categoryLevel
                }
                if(this.info.pCategoryId  !== ''){
                    params.pCategoryId = this.info.pCategoryId
                }
                if(this.info.categoryId  !== ''){
                    params.categoryId = this.info.categoryId
                }


                this.$refs[form].validate((valid) => {
                 if (valid) {

                   this.$F.doRequest(this, "/pms/dishes/dishes_category_edit", params, (res) => {
                        this.closeDialog();
                        this.$refs[form].resetFields();
                   });

                 } else {
                   console.log('error submit!!');
                   return false;
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
