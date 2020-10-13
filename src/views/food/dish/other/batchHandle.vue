<template>
   <div>
        <div class="margin-b-20">
            <el-checkbox v-model="checkedRemainingCount">{{$t('food.common.food_remain_count')}}</el-checkbox>
            <el-checkbox v-model="checkedWarningCount">{{$t('food.common.warning_count')}}</el-checkbox>
        </div>
        <el-table
          :data="list"
          header-row-class-name="default"
          height="300"
          size="small"
        >
          <el-table-column :label="$t('food.common.food_title')">
              <template slot-scope="scope">
                <span class="text-blue">{{scope.row.name}}</span>
              </template>
          </el-table-column>
          <el-table-column :label="$t('food.common.food_remain_count')" width="160" >
              <template slot-scope="scope">
                 <el-input
                    size="small"
                    :placeholder="$t('food.common.food_remain_count')"
                    v-model="scope.row.remainingCount"
                    :disabled="!checkedRemainingCount"
                     >
                  </el-input>
              </template>
          </el-table-column>
          <el-table-column :label="$t('food.common.warning_count')" >
            <template slot-scope="scope">
              <el-input
                 size="small"
                 :placeholder="$t('food.common.warning_count')"
                 v-model="scope.row.warningCount"
                 :disabled="!checkedWarningCount"
                 >
               </el-input>
            </template>
          </el-table-column>
        </el-table>

        <div class="dialog-footer text-right" style="padding: 0 20px;margin:15px -20px -15px;">
           <el-button size="small" @click="closeDialog">{{$t('food.common.cancel')}}</el-button>
           <el-button size="small" type="primary" @click="submitForm('form')">{{$t('food.common.ok')}}</el-button>
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
