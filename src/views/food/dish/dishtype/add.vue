<template>
    <el-form :model="info" ref="form"  :rules="rules"  label-width="150px" >
        <el-form-item label="上级分类" v-if="list.length > 0 && info.categoryId !== 0" >
          <el-select v-model="info.pCategoryId" placeholder="请选择上级分类">

            <el-option key="0" label="--" value="0"></el-option>
            <el-option v-for="cate in list" :key="cate.id" :label="cate.name" :value="cate.id"></el-option>
          </el-select>
        </el-form-item>

      <el-form-item :label="info.categoryLevel == 1 ?  '一级分类名称：' : (info.categoryLevel== 2 ? '二级分类名称：' : '三级分类名称：') " prop="name" >
        <el-input v-model="info.name"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <div class="dialog-footer text-right" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">取消</el-button>
           <el-button size="small" type="primary" :disabled="!info.name" @click="submitForm('form')">提交</el-button>
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
                   message: '分类名称不能为空',
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
