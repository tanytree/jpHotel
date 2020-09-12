<template>
    <div>
        <div class="proInfo">
            <div v-if="info.images" class=" items imgs text-center">
              <img :src="info.images">
            </div>
            <div class="items text-size20"><b>{{info.name}}</b></div>
            <div class="items text-red text-size18"> ￥{{info.price}}</div>
            <div class="items flex text-gray">
               <div class="label" style="width:100px;">【菜品分类】</div>
               <div>{{info.categoryName}}</div>
            </div>
            <div class="items flex text-gray">
               <div class="label">【菜品原料】</div>
               <div>{{info.marterial}}</div>
            </div>
            <div class="items flex text-gray" >
               <div class="label">【菜品介绍】</div>
                <div>{{info.remark}}</div>
            </div>
        </div>

        <el-divider></el-divider>
        <div class="dialog-footer text-center" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">关闭</el-button>
        </div>
    </div>
</template>

<script>
    export default {
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
        width:500px;margin: 0 auto;
        .text-size18{
            font-size: 18px;
        }
        .imgs{
            height: 200px;
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
                flex-grow:1;
            }
        }
    }

</style>
