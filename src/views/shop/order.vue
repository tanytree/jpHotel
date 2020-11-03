<!--
 * @LastEditors: 董林
 *
 -->
<template>
    <div class="boss-index">
        <el-tabs class="pageTab noBg" v-model="activeName">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                 :name="item.path"
                 :key="item.path"
                 v-if="$F.filterThirdMenu('frontOffice', item.path, true)"
                 class="bg"

            >
                <!-- 沽清管理-->
                <orderlist :saleData = 'saleData' v-if="item.path == 'pmshoporder_child'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex"
    import orderlist from "./order/orderlist.vue";
    export default {
        components: {orderlist},
        data() {
            return {
                activeName: "",
                categoryList:[],
                saleData:[]
            }
        },
        created() {
            this.$F.handleThirdMenu(this);
            this.getSaleData();//获取售卖点
            // this.getCateList();
        },
        computed: {
            ...mapState({
                token: state => state.user.token,
                userId: state => state.user.userId,
                msgKey: state => state.config.msgKey,
                plat_source: state => state.config.plat_source
            })
        },
        methods: {
            // getCateList(){
            //     this.loading = false
            //     let params = {
            //         userId:this.userId,
            //         storesNum:this.storesNum,
            //     }
            //     this.$F.doRequest(this, "/pms/dishes/dishes_category_list", params, (res) => {
            //         console.log(res.categoryList)
            //         let list = res.categoryList
            //         this.categoryList = list
            //     });
            // },
            //获取售卖点列表
            getSaleData(){
                let params = {}
                params.userId = this.userId
                params.storesNum = this.storesNum
                this.$F.doRequest(this, "/pms/hotelgoodsSelling/list", params, (res) => {
                    console.log(res)
                   let arr = res.list
                   let array = []
                   for(let i in arr){
                        array.push({
                            label:arr[i].name,
                            value:arr[i].id,
                        })
                    }
                    this.saleData = array
                });
            },
        }
    };
</script>

<style lang="less" scoped>

</style>
