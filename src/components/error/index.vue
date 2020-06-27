<!--
 * @Date: 2020-03-20 11:17:35
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-20 11:27:15
 * @FilePath: /cloudAdmin/src/components/error/index.vue
 -->
<template>
    <div class="wrapper">
        <img src="@/assets/images/404.jpg" alt="">
        <div style="margin-top:50px">
            <el-button @click="$router.back()" type="primary">返回首页</el-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.wrapper{
    width: 100%;
    height: 100%;;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
}
</style>
