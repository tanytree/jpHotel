<template>
    <div class="boss-index">
        <el-table v-if="type=='day'" :data="reportData" size="small" border height="100%" header-row-class-name="default" class="report-table">
            <el-table-column header-align="center" prop="val1" label="业务"></el-table-column>
            <el-table-column header-align="center" prop="val2" label="本日发生"></el-table-column>
            <el-table-column header-align="center" prop="val3" label="本月累计"></el-table-column>
            <el-table-column header-align="center" prop="val4" label="上月累计"></el-table-column>
            <el-table-column header-align="center" prop="val5" label="上年本月"></el-table-column>
            <el-table-column header-align="center" prop="val6" label="本年累计"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {

            }
        },
        props: {
            type: String, reportData: Array
        },
    }
</script>

<style scoped>

</style>
