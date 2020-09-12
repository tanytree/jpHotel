<template>
        <el-form :model="info" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
              <el-form-item label="菜品名称" prop="name" style="margin-top: -15px;">
                <el-input v-model="info.name"></el-input>
              </el-form-item>

              <el-form-item label="菜品分类" prop="categoryId">
                <el-cascader
                   :options="getNewCateList(categoryList)"
                   v-model="info.categoryId"
                   @change="handleChange"></el-cascader>
              </el-form-item>

              <el-form-item label="菜品分类名称" prop="name">
                <el-input v-model="info.categoryName" ></el-input>
              </el-form-item>

              <el-form-item label="菜品价格" prop="name">
                <el-input v-model="info.price"></el-input>
              </el-form-item>

              <el-form-item label="菜品图片" prop="name">
                <div>
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
                             <!-- <span
                               class="el-upload-list__item-preview"
                               @click="handlePictureCardPreview(file)"
                             >
                               <i class="el-icon-zoom-in"></i>
                             </span> -->
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
                </div>
              </el-form-item>

              <el-form-item label="菜品原料" prop="desc" :style="files.length == 0 ? '' : 'margin-top: -25px;'">
                <el-input  v-model="info.marterial"></el-input>
              </el-form-item>

             <el-form-item label="菜品介绍" prop="desc">
               <el-input type="textarea" v-model="info.remark"></el-input>
             </el-form-item>

             <el-form-item label="菜品状态">
                <el-radio v-model="info.state" :label="1">启用</el-radio>
                <el-radio v-model="info.state" :label="2">禁用</el-radio>
             </el-form-item>
            <el-divider style="margin:-15px;"></el-divider>
            <div class="text-right"  style="padding: 0 20px;margin:-10px -20px -15px;">
              <el-button @click="closeDialog">取消</el-button>
               <el-button type="primary" @click="submitForm('form')">确定</el-button>
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
                   { required: true, message: '请输入活动名称', trigger: 'blur' },
                 ],
                 categoryId: [
                   { required: true, message: '请选择菜品分类', trigger: 'change' }
                 ],
                 categoryName: [
                   {  required: true, message: '请选择输入菜品分类名称', trigger: 'change' }
                 ],
                 price: [
                   { required: true, message: '请输入菜品价格', trigger: 'change' }
                 ],
                 marterial: [
                   { required: true, message: '请输入菜品原料', trigger: 'change' }
                 ],
                 remark: [
                   { required: true, message: '请输入菜品介绍', trigger: 'change' }
                 ],

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
                     state:data.state
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
                     console.log(arr)
                     // return arr
                 }
            },

            // 选择图片--放大
            // handlePictureCardPreview(file) {
            //   this.dialogImageUrl = file.url;
            //   this.dialogVisible = true;
            // },
            handleRemove(file) {
              this.files = this.files.filter(
                (item) => item.url != file.url
              );
              this.$refs.upload.uploadFiles = this.$F.deepClone(this.hotelData.files);
            },
            submitForm(form) {
                // console.log(this.info)
                this.$refs[form].validate((valid) => {
                 if (valid) {
                    this.formData = new FormData();
                    let imgList = this.$refs.upload.uploadFiles || [];
                    if (imgList.length == 0) {
                        return a.$message.warning('无图片');
                    }
                    this.$F.doUploadBatch(this, imgList, (data) => {
                        this.info.images = data;
                        let params = this.info
                        params.userId = this.userId

                        this.$F.doRequest(this, "/pms/dishes/dishes_manage_edit", params, (res) => {
                          console.log(res)
                          if(res.dishesId){
                              this.alert(200,'操作成功')
                              this.closeDialog();
                          }
                      });
                    });
                 } else {
                   this.alert(0,'操作失败')
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
   
</style>
