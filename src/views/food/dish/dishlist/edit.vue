<template>
        <el-form :model="info" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
              <el-form-item  size="small"  :label="$t('food.common.food_title')" prop="name" style="margin-top: -15px;">
                <el-input size="small" v-model="info.name" :placeholder="$t('food.common.food_title')"></el-input>
              </el-form-item>
              <el-form-item  size="small" :label="$t('food.common.taxStatus')" required>
                   <el-radio v-model="info.taxStatus" :label="1">{{$t('food.reset.noTax')}}</el-radio>
                   <el-radio v-model="info.taxStatus" :label="2">{{$t('food.reset.haveTax')}}</el-radio>
              </el-form-item>
              <el-form-item  size="small"  :label="$t('food.common.seviceStatus')" required>
                   <el-radio v-model="info.seviceStatus" :label="1">{{$t('food.reset.noServe')}}</el-radio>
                   <el-radio v-model="info.seviceStatus" :label="2">{{$t('food.reset.haveServe')}}</el-radio>
              </el-form-item>
              <el-form-item  size="small"  :label="$t('food.common.cate')" prop="categoryId">
                <el-cascader
                   :options="getNewCateList(categoryList)"
                   v-model="info.categoryId"
                   @change="handleChange">
                </el-cascader>
              </el-form-item>
              <!-- <el-form-item :label="$t('food.common.cate_name')" prop="categoryName">
                <el-input v-model="info.categoryName" ></el-input>
              </el-form-item> -->
              <el-form-item  size="small"  :label="$t('food.common.food_price')" prop="price">
                <el-input  size="small" :placeholder="$t('food.common.food_price')" v-model="info.price" type="number" name="price"></el-input>
              </el-form-item>
              <el-form-item  size="small"  :label="$t('food.reset.costPrice')" prop="costPrice">
                <el-input  size="small" :placeholder="$t('food.reset.costPrice')" v-model="info.costPrice" type="number" name="costPrice"></el-input>
              </el-form-item>
              <el-form-item  size="small" :label="$t('food.common.food_pic')" >
                    <el-upload
                       action="#"
                       ref="upload"
                       list-type="picture-card"
                       :file-list="files"
                       :limit="1"
                       :auto-upload="false">
                         <i slot="default" class="el-icon-plus"></i>
                         <div slot="file" slot-scope="{file}">
                           <img v-if="file.url" class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                           <span class="el-upload-list__item-actions">
                             <span
                               v-if="!disabled"
                               class="el-upload-list__item-delete"
                               @click="handleRemove(file)"
                             >
                               <i class="el-icon-delete"></i>
                             </span>
                           </span>
                         </div>
                    </el-upload>
                    <div class="picdesc text-gray text-size12">{{$t('food.reset.onePhoto')}}</div>
              </el-form-item>

              <el-form-item :label="$t('food.common.material')" >
                <el-input  size="small" :placeholder="$t('food.common.material')"  v-model="info.marterial"></el-input>
              </el-form-item>

             <el-form-item :label="$t('food.common.food_desc')" >
               <el-input  size="small" :placeholder="$t('food.common.food_desc')" type="textarea" v-model="info.remark"></el-input>
             </el-form-item>

             <el-form-item  size="small" :label="$t('food.common.status')">
                <el-radio v-model="info.state" :label="1">{{$t('food.reset.is_active')}}</el-radio>
                <el-radio v-model="info.state" :label="2">{{$t('food.reset.is_disable')}}</el-radio>
             </el-form-item>
            <el-divider style="margin:-15px;"></el-divider>
            <div class="text-right"  style="padding: 0 20px;margin:-10px -20px -15px;">
              <el-button @click="closeDialog">{{$t('food.common.cancel')}}</el-button>
              <el-button type="primary" @click="submitForm('form')">{{$t('food.common.ok')}}</el-button>
            </div>
        </el-form>
</template>

<script>
    import mixin from '../../mixin';
    import { mapState, mapActions } from "vuex"
    export default {
        mixins: [mixin],
        data() {
            return {
               categoryList:[],//上级获取的分类列表
               info:{
                   name:'',
                   categoryId:'',
                   categoryName:'',
                   taxStatus:1,
                   seviceStatus:1,
                   costPrice:'',
                   price:'',
                   remark:'',
                   marterial:'',
                   images:'',
                   dishesId:'',
                   state:1
               },
               files:[],
               dialogImageUrl: '',
               dialogVisible: false,
               disabled: false,
               rules: {
                 name: [
                   { required: true, message: this.$t('food.common.input_food_title'), trigger: 'change' },
                 ],
                 categoryId: [
                   { required: true, message: this.$t('food.common.input_food_cate'), trigger: 'change' }
                 ],
                 price: [
                   { required: true, message: this.$t('food.common.input_food_price'), trigger: 'change' }
                 ],
                 costPrice:[
                     { required: true, message: this.$t('food.common.input_food_price'), trigger: 'change' }
                 ],
                 remark:[
                     { required: true, message:'请输入菜品介绍', trigger: 'change' }
                 ],
                 marterial:[
                     { required: true, message:'请输入原料', trigger: 'change' }
                 ]
               },
               options:[],
            }
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
            // this.value =  ["2c98c1df744926110174499d0c250004", "2c98c1df7449ff3e01744a12cfe10001", "2c98c1df7449ff3e01744a1451330003"]
        },
        methods: {
            //获取传过来的值
            getData(data){
                console.log(data)
                this.files = []
                this.info = {
                     name:data.name,
                     categoryId:data.categoryId,
                     categoryName:data.categoryName,
                     price:data.price,
                     remark:data.remark,
                     marterial:data.marterial,
                     images:data.images,
                     state:data.state,
                     dishesId:data.id,
                     state:data.state,
                     taxStatus:data.taxStatus ? data.taxStatus : 1 ,
                     seviceStatus:data.seviceStatus ? data.seviceStatus : 1,
                     costPrice:data.costPrice
                }
                if(data.images){
                    this.files.push({
                       url:data.images
                    })
                }
            },

            intData(){
                this.info = {
                     name:'',
                     categoryId:'',
                     categoryName:'',
                     price:'',
                     remark:'',
                     marterial:'',
                     images:'',
                     dishesId:'',
                     state:1,
                }
                this.files = []
            },
            //接收所有的分类列表
            getCateList(list){
                // console.log(list)
                this.categoryList = list
            },
            //获取选择的产品最后一级分类
            handleChange(value) {
               this.info.categoryId = value[value.length - 1].toString();
                this.$nextTick(()=>{
                    this.getName(this.info.categoryId,this.categoryList)
                })

            },
            getName(id,list){
                if(list.length > 0 ){
                    let arr = []
                    for(let i in list){
                        arr.push({
                            value:list[i].id,
                            label:list[i].name,
                            children:this.getNewCateList(list[i].childList)
                        })
                    }
                 }
            },
            handleRemove(file) {
              this.files = this.files.filter(
                (item) => item.url != file.url
              );
            },
            submitForm(form) {
                // console.log(this.info)
                this.$refs[form].validate((valid) => {
                 if (valid) {
                    this.formData = new FormData();
                    let imgList = this.$refs.upload.uploadFiles || [];
                    // if (imgList.length == 0) {
                    //     this.alert(0,this.$t('food.common.input_food_pic'));
                    //     return false
                    // }
                    this.$F.doUploadBatch(this, imgList, (data) => {
                        this.info.images = data;
                        let params = this.info
                        params.categoryName = '默认'
                        params.userId = this.userId

                        this.$F.doRequest(this, "/pms/dishes/dishes_manage_edit", params, (res) => {
                          console.log(res)
                          if(res.dishesId){
                              this.alert(200,this.$t('food.common.success'))
                              this.closeDialog();
                          }
                      });
                    });
                 }
                });
            },


            closeDialog(){
                this.$refs['form'].resetFields();
                this.intData();
                this.$emit('closeDialog')
            }
        }
    }
</script>


<style lang="less" scoped>
    // .el-form-item{margin-bottom: 5px;}
</style>
