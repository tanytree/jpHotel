<template>
    <div>
        <div class="proInfo">
            <div v-if="info.images" class=" items imgs text-center">
              <img :src="info.images">
            </div>
            <div class="items text-size20"><b>{{info.name}}</b></div>
            <div class="items text-red text-size18"> ￥{{numFormate(info.price)}}</div>
            <div class="items flex text-gray">
               <div class="label">【{{$t('food.common.cate')}}】</div>
               <div>{{info.categoryName}}</div>
            </div>
            <div class="items flex text-gray">
               <div class="label">【{{$t('food.common.material')}}】</div>
               <div>{{info.marterial}}</div>
            </div>
            <div class="items flex text-gray" >
               <div class="label">【{{$t('food.common.food_desc')}}】</div>
                <div>{{info.remark}}</div>
            </div>
        </div>

        <el-divider></el-divider>
        <div class="dialog-footer text-center" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">{{$t('food.common.closed')}}</el-button>
        </div>
    </div>
</template>

<script>
    
    import mixin from '../../mixin';      
    export default {
        mixins: [mixin],
        data() {
            return {
               info:{}
            };
        },

        mounted() {
        },
        methods: {
            //获取传过来的值
            getInfo(data){
                // console.log(data)
                 this.info = data
            },
            closeDialog(){
                this.info = {}
                this.$emit('closeDialog')
            }
        }
    }
</script>

<style lang="less" scoped>

    .proInfo{
        width:100%;margin: 0 auto;
        .text-size18{
            font-size: 18px;
        }
        .imgs{
            height: auto;
            overflow: hidden;
            border-radius: 5px;
            img{
                width: 100%;

            }
        }
        .items{
            margin-bottom:15px;
            div{
                flex-grow:4;
                justify-content: flex-start;
                padding-right: 10px;
            }
            .label{
                flex-grow:1.5;
            }
        }
    }

</style>
