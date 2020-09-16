<template>
    <div class="action">
        <el-form size="small" inline>
            <el-row>
                <el-form-item label="商品名称：">
                    {{info.dishesName ? info.dishesName : '--'}}
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="商品单位：">
                    {{info.inventoryCount ? info.inventoryCount : '--'}}
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="库存量：">
                    {{info.unit ? info.unit : '--'}}
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="商品编码：">
                    {{info.remark2 ? info.remark2 : '--'}}
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="所在仓库：">
                    {{info.storageName ? info.storageName : '--'}}
                </el-form-item>
            </el-row>
        </el-form>
        <el-divider></el-divider>
        <div class="dialog-footer text-center" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">关闭</el-button>
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
                info:{},
            }
        },
        computed: {
        },
        mounted() {

        },
        methods: {

            getInfo(data){
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
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 0px;
}
</style>
