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
                 v-if="$F.filterThirdMenu('frontOffice', item.path, true) "
                 class="bg"
            >
                <!-- 沽清管理-->
                <wareHouseList ref="wareHouseList" v-if="item.path == 'wareHouseList'"/>
                <storageList ref="storageList" :mealstorageList="hotelmealstorageList" v-if="item.path == 'storageList'"/>
                <review ref="review" :mealstorageList="hotelmealstorageList" v-if="item.path == 'review'"/>
                <reviewList ref="reviewList" :mealstorageList="hotelmealstorageList" v-if="item.path == 'reviewList'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex"
    import wareHouseList from "./warehouse/index/wareHouseList";
    import storageList from "./warehouse/storage/index"
    import review from "./warehouse/review/index"
    import reviewList from "./warehouse/reviewList/index"
    export default {
        components: {wareHouseList,storageList,review,reviewList },
        data() {
            return {
                activeName: "",
                hotelmealstorageList:[]
            }
        },
        created() {
            this.$F.handleThirdMenu(this);

        },
        mounted() {
            this.HotelmealstorageList();
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
            HotelmealstorageList() {
                this.loading = true
                let params = {

                }
                params.userId = this.userId
                params.storesNum = this.storesNum
                this.$F.doRequest(this, "/pms/hotelmealstorage/list", params, (res) => {
                    console.log(res)
                    this.hotelmealstorageList = res.list
                });
            },


        },
        watch:{
            activeName(val, oldVal){//普通的watch监听
                if(val == 'wareHouseList'){
                    this.$refs.wareHouseList[0].getDataList();
                }
                if(val == 'storageList'){
                    this.$refs.storageList[0].getDataList();
                }
                if(val == 'review'){
                    this.$refs.review[0].getDataList();
                }
                if(val == 'reviewList'){
                    this.$refs.reviewList[0].getDataList();
                }
            },
        }
    };
</script>

<style lang="less" scoped>

</style>
