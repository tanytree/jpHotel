<template>
   <div>
        <div class="margin-b-20">
            <el-checkbox v-model="checkedRemainingCount">剩余份数</el-checkbox>
            <el-checkbox v-model="checkedWarningCount">库存预警数</el-checkbox>
        </div>
        <el-table
          :data="list"
          header-row-class-name="default"
          height="300"
          size="small"
        >
          <el-table-column label="菜品名称">
              <template slot-scope="scope">
                <span class="text-blue">{{scope.row.name}}</span>
              </template>
          </el-table-column>
          <el-table-column label="剩余份数" width="160" >
              <template slot-scope="scope">
                 <el-input
                    size="small"
                    placeholder="请输入内容"
                    v-model="scope.row.remainingCount"
                    :disabled="!checkedRemainingCount"
                     >
                  </el-input>
              </template>
          </el-table-column>
          <el-table-column label="库存预警数" >
            <template slot-scope="scope">
              <el-input
                 size="small"
                 placeholder="请输入内容"
                 v-model="scope.row.warningCount"
                 :disabled="!checkedWarningCount"
                 >
               </el-input>
            </template>
          </el-table-column>
        </el-table>

        <div class="dialog-footer text-right" style="padding: 0 20px;margin:15px -20px -15px;">
           <el-button size="small" @click="closeDialog">取消</el-button>
           <el-button size="small" type="primary" @click="submitForm('form')">提交</el-button>
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
                checkedRemainingCount:true,
                checkedWarningCount:true,
                list:[]

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
            getData(list){

                this.list = list



            },

            submitForm() {
                 let params = {
                 }


                 let list = this.list

                 let arr = []
                 for(let i in list){
                    arr.push({
                        dishesId:list[i].id,
                        remainingCount:list[i].remainingCount,
                        warningCount:list[i].warningCount,
                    })
                 }
                 params.userId = this.userId
                 params.storesNum = this.storesNum
                 params.batchJson =  JSON.stringify(arr);
                 console.log(params)
                 this.$F.doRequest(this, "/pms/dishes/dishes_manage_updatecount_batch", params, (res) => {
                    console.log(res)
                    this.alert(200,'操作成功')
                    this.closeDialog();
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
