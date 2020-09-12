<template>
  <div v-loading="loading">
    <div class="content padding-10 round">
        <div class="padding-12 round basebg margin-b-20 margin-t-10">
            <el-button @click="slideAllList" :icon="slideAll ? 'el-icon-caret-bottom' : 'el-icon-caret-right' "> {{slideAll ? '展开全部': '折叠全部' }} </el-button>
            <el-button @click="addCategray(1)">新增一级分类</el-button>
        </div>

          <div class="padding-12 round basebg margin-b-20" v-for="(item,index) in categoryList">
              <div class="padding-12 clearfix" >
                <span style="float: left;" @click="slideList(index)">
                   <i v-if="item.childList.length > 0" :class="item.is_slide ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i> {{item.name}}
                </span>
                <div style="float:right;">
                    <el-button type="text" @click="addCategray_2(2,item.id)">新增二级分类</el-button>
                    <el-button type="text" @click="editCategray_1(1,item.id,item.name,item.pCategoryId)">编辑</el-button>
                    <el-button type="text" @click="del(item.id)">删除</el-button>
                </div>
              </div>

              <div v-show= "item.is_slide" class="subItem clearfix"  v-if="item.childList.length > 0">
                <div v-for="(subItem,sinidex) in item.childList" class="">
                    <div class="padding-12 top_border clearfix">
                        <span style="float: left;"  @click="slideSubList(index,sinidex)">
                             <i v-if="subItem.childList.length > 0" :class="subItem.is_slide ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i> {{subItem.name}}
                        </span>
                        <div style="float:right;">
                            <el-button type="text" @click="addCategray_3(3,subItem.id,index)">新增三级级分类</el-button>
                            <el-button type="text" @click="editCategray_2(2,subItem.id,index,subItem.name,subItem.pCategoryId)">编辑</el-button>
                            <el-button type="text" @click="del(subItem.id)">删除</el-button>
                        </div>
                    </div>
                    <div  v-show= "subItem.is_slide" class="clearfix"  v-if="subItem.childList.length > 0">
                         <div v-for="(subItems,sinidexs) in subItem.childList" class="padding-12 top_border clearfix subItem">
                             <span style="float: left;">{{subItems.name}}</span>
                             <div style="float:right;">
                                 <el-button type="text" @click="editCategray_3(3,subItems.id,subItems.name,subItems.pCategoryId,sinidexs,sinidex,index)">编辑</el-button>
                                 <el-button type="text" @click="del(subItems.id)">删除</el-button>
                             </div>
                         </div>
                    </div>
                </div>
              </div>
            </div>
    </div>

    <el-dialog top="0" title="新增" width="40%" :visible.sync="dialogShow" :close-on-click-modal="false" @close="closeDialog">
        <el-form :model="info" ref="form"  :rules="rules"  label-width="150px" >
            <el-form-item label="上级分类" v-if="list.length > 0 && info.pCategoryId && info.pCategoryId !== '0'" >
              <el-select v-model="info.pCategoryId" disabled placeholder="请选择上级分类">
                <el-option v-for="cate in list" :key="cate.id" :label="cate.name" :value="cate.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="info.categoryLevel == 3 ?  '三级分类名称：' : (info.categoryLevel == 2 ? '二级分类名称：' : '一级分类名称：') " prop="name" >
                <el-input v-model="info.name"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <div class="dialog-footer text-right" style="padding: 0 20px;margin:-10px -20px -15px;">
               <el-button size="small" @click="closeDialog">取消</el-button>
               <el-button size="small" type="primary" :disabled="!info.name" @click="submitForm('form')">提交</el-button>
            </div>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
        dialogShow:false,
        loading:false,
        slideAll:true,
        activeNames: [],
        categoryList:[],
        info:{
            categoryLevel:'',//级别1:一级 2:二级 3:三级 4:四级 5:五级 6:六级
            pCategoryId:'',// 类型父级id 一级类型填0
            categoryId:'',//当前分类id
            name:'',//分类名称
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
  async mounted() {
        await this.getList();
  },
  methods: {
    intForm(){
        this.info = {
            categoryLevel:'',//级别1:一级 2:二级 3:三级 4:四级 5:五级 6:六级
            pCategoryId:'',// 类型父级id 一级类型填0
            categoryId:'',//当前分类id
            name:'',//分类名称
        }
        this.list = []
    },
      //获取列表
    getList(){
        this.loading = false
        let params = {
            userId:this.userId,
            storesNum:this.storesNum,
        }
        this.$F.doRequest(this, "/pms/dishes/dishes_category_list", params, (res) => {
            let list = res.categoryList
            for(let i in list){
                list[i].is_slide = true
                let childList = list[i].childList
                if(childList.length > 0){
                    for(let j in childList){
                        childList[j].is_slide = true
                    }
                }
            }
            if(list.length > 0){
                this.activeNames.push(list[0].id)
            }
            this.categoryList = list
            console.log(list)
        });
    },

    slideAllList(){
        let list =  this.categoryList
        if(this.slideAll){
            this.slideAll = false
            for(let i in list){
                list[i].is_slide = false
                let childList = list[i].childList
                if(childList.length > 0){
                    for(let j in childList){
                        childList[j].is_slide = false
                    }
                }
            }
        }else{
            this.slideAll = true
            for(let i in list){
                list[i].is_slide = true
                let childList = list[i].childList
                if(childList.length > 0){
                    for(let j in childList){
                        childList[j].is_slide = true
                    }
                }
            }
        }
    },

    slideList(index){
        let list =  this.categoryList
        list[index].is_slide = !list[index].is_slide
    },
    slideSubList(index,subindex){
        let list =  this.categoryList[index].childList
        list[subindex].is_slide = !list[subindex].is_slide
    },

    //删除菜单
    del(id){
       let info = {
           userId:this.userId,
           categoryId:id
       }
       this.$confirm('确认删除?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
       }).then(() => {
           this.$F.doRequest(this, "/pms/dishes/dishes_category_delete", info, (res) => {
              this.getList();
           });
           this.$message({
               type: 'success',
               message: '操作成功!'
           });
       }).catch(() => {

       });
    },


    //获取当前等级的列表
    getUpLever(v){
        let list =  this.categoryList
        let arr = []
        for(let i in list){
            if(list[i].categoryLevel == v){
                arr = [...arr,list[i]]
            }
        }
        return  arr
    },




    //添加分类1级分类
    addCategray(lever){
        this.dialogShow = true
        this.info.categoryLevel = lever
        this.info.pCategoryId = 0
        this.info.categoryId = ''
        this.list = []
    },


    // addCategray_2(1,item.id,item.pCategoryId)"
    //添加二级分类
    addCategray_2(lever,id,name){
        this.dialogShow = true
        this.info.categoryLevel = lever
        this.info.pCategoryId = id
        if(name){
            this.info.categoryId = id
            this.info.name = name
        }
        this.list = this.getUpLever(1)
        console.log(this.info)
    },

    //修改一级分类名称
    editCategray_1(lever,id,name,pid){
        this.dialogShow = true
        this.info.categoryLevel = lever
        this.info.pCategoryId = pid
        this.info.categoryId = id
        this.info.name = name
        this.list = this.getUpLever(1)
        console.log(this.info)
    },

    //添加三级级分类
    addCategray_3(lever,id,index,name){
        this.dialogShow = true
        this.info.categoryLevel = lever
        this.info.pCategoryId = id
        this.list = this.getUpLever2(2,index)
        if(name){
            this.info.categoryId = id
            this.info.name = name
        }
        console.log(this.info)
    },
    //编辑 二级分类
    editCategray_2(lever,id,index,name,pid){
        this.dialogShow = true
        this.info.categoryLevel = lever
        this.info.pCategoryId = pid
        console.log(this.getUpLever2(2,index))
        this.list= this.getUpLever(1)
        this.info.categoryId = id
        this.info.name = name
        console.log(this.info)
    },



   //修改3级分类名称
   editCategray_3(lever,id,name,pid,sinidexs,sinidex,index){
       console.log('修改三级分类');
       this.dialogShow = true
       this.info.categoryLevel = lever
       this.info.pCategoryId = pid
       console.log(this.getUpLever2(2,index))
       this.list= this.getUpLever2(2,index)
       this.info.categoryId = id
       this.info.name = name
       console.log(this.info)
   },


    //获取当前 索引的 二级分类
    getUpLever2(v,index){
        let list =  this.categoryList[index].childList
        let arr = []
        for(let i in list){
            if(list[i].categoryLevel == v){
                arr = [...arr,list[i]]
            }
        }
        return  arr
    },

    //获取2级列表
    getUpLever3(v,index){
        let list =  this.categoryList[index].childList
        let arr = []
        for(let i in list){
            if(list[i].categoryLevel == v){
                arr = [...arr,list[i]]
            }
        }
        return  arr
    },

    //提交
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
        console.log(params)
        // return
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
        this.dialogShow = false
        this.getList();
        this.intForm();
        this.$refs.form.resetFields();
    }


  }
};
</script>
<style lang="less" scoped>
    .content{
        background:#E4E7EA;
        .padding-12{
            padding: 12px;
        }
        .basebg{
            background-color: #fff;
        }
        .subItem{
            padding-left:50px;
        }
        .top_border{
            border-top: 1px solid #eee;
        }




    }

    .round{
        border-radius: 10px;
    }


</style>
