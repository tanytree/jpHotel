<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 魏轩
 * @LastEditTime:
 * @FilePath:
 -->

<template>
    <div id="page1">
        <el-tabs  v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="积分换算" name="first">
                <list1 />
            </el-tab-pane>
            <el-tab-pane label="积分获取" name="second">
                <list2 />
            </el-tab-pane>
            <el-tab-pane label="积分抵扣" name="third">
                <list3 />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import list1 from "./graces/list1";
import list2 from "./graces/list2";
import list3 from "./graces/list3";

export default {
    components: { list1, list2, list3 },
    data() {
        return {
            activeName: "first"
        };
    },
    mounted() {},
    methods: {
        //二级tab切片
        handleClick(tab, event) {
            // console.log(tab.index);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
</style>
