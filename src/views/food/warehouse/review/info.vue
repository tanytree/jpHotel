<template>
    <div class="action" v-loading="loading">


        <el-form size="small" inline>
            <el-row>
                <el-col :span="16">
                    <el-form-item label="入库单号：">
                          {{info.orderNo}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="入库仓库:" v-if="info.type == 1">
                       {{info.storageName}}
                    </el-form-item>
                    <el-form-item label="出库仓库:" v-if="info.type == 2">
                       {{info.storageName}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请日期：">
                        {{info.applyTime}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="制单人：">
                        {{info.createrName}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="审核状态：" v-if="info.state">
                        {{$t('food.storageLogState.'+ info.state)}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="审核时间：">
                        {{info.updateTime ? info.updateTime : '--'}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="审核人：">
                        {{info.createrName}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="经办人：">
                        {{info.createrName}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="入库备注：">
                        {{info.remark}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="审核意见：">
                        {{info.remark2 ? info.remark2 : '--'}}
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-table
            class="margin-t-20"
            header-row-class-name="default"
            size="small"
            :data="list"
            tooltip-effect="dark"
            style="width: 100%"
           >
            <el-table-column
              prop="dishesName"
              label="商品名称"
              >
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              >
            </el-table-column>
            <el-table-column
              prop="inventoryCount"
              label="入库数量"
             >
            </el-table-column>
          </el-table>

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
                list:[],
                loading:false
            }
        },
        computed: {
            ...mapState({
                token: state => state.user.token,
                userId: state => state.user.userId,
                msgKey: state => state.config.msgKey,
                plat_source: state => state.config.plat_source
            }),


        },
        mounted() {

        },
        methods: {

            getInfo(data){
                this.loading = true
                let params = {
                   orderNo:data.orderNo
                }
                params.userId = this.userId
                params.storesNum = this.storesNum
                this.$F.doRequest(this, "/pms/mealstoragelog/findone", params, (res) => {
                    console.log(res.HotelMealStorageLog)
                    if(res.HotelMealStorageLog){
                        this.info = res.HotelMealStorageLog[0]
                        this.list = res.HotelMealStorageLog
                        this.loading = false
                    }

                });

            },
            closeDialog(){
                this.info = {}
                this.list = []
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
