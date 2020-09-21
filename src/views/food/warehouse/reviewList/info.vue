<template>
    <div class="action" v-loading="loading">
        <el-form size="small" inline>
            <el-row>
                <el-col :span="16">
                    <el-form-item :label="$t('food.common.storage_order_no')">
                          {{info.orderNo}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('food.common.storageInTitle')" v-if="info.type == 1">
                       {{info.storageName}}
                    </el-form-item>
                    <el-form-item :label="$t('food.common.storageOutTitle')" v-if="info.type == 2">
                       {{info.storageName}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('food.common.apply_time')">
                        {{info.applyTime}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('food.common.createrName')">
                        {{info.createrName}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('food.common.review_status')" v-if="info.state">
                        {{$t('food.storageLogState.'+ info.state)}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('food.common.view_time')" >
                        {{info.approvalTime ? info.approvalTime : '--'}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('food.common.applyer_name')" >
                        {{info.applyerName ? info.applyerName : '--'}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('food.common.viewer_name')">
                        {{info.approvalName ? info.approvalName : '--' }}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item :label="$t('food.common.remark')">
                        {{info.remark}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('food.common.view_remark')">
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
              :label="$t('food.common.product_name')"
              >
            </el-table-column>
            <el-table-column
              prop="unit"
              :label="$t('food.common.unit')"
              >
            </el-table-column>
            <el-table-column
              prop="inventoryCount"
              :label=" info.type == 1 ? $t('food.common.product_storage_in_count') : $t('food.common.product_storage_out_count')"
             >
            </el-table-column>
        </el-table>


        <el-divider></el-divider>
        <div class="dialog-footer text-center" style="padding: 0 20px;margin:-10px -20px -15px;">
           <el-button size="small" @click="closeDialog">{{$t('food.common.close')}}</el-button>
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
