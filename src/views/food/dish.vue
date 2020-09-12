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
                 :class="item.path !== 'empty' ? 'bg' : ''"
            >
                <!-- 沽清管理-->
                <empty :categroyList = 'categoryList' v-if="item.path == 'empty'"/>
                <other :categroyList = 'categoryList'  v-if="item.path == 'other'"/>
                <dishlist :categroyList = 'categoryList'  v-if="item.path == 'dishlist'"/>
                <categray :categroyList = 'categoryList'  v-if="item.path == 'dishtype'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex"
    import empty from "./dish/empty";
    import other from "./dish/other";
    import dishlist from "./dish/dishlist";
    import categray from "./dish/dishtype";
    export default {
        components: {empty,other,dishlist,categray},
        data() {
            return {
                activeName: "",//第一个默认启动
                categoryList:[]
            }
        },
        created() {
            this.$F.handleThirdMenu(this);
            this.getCateList();
            this.getSelectPath();
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

            getSelectPath(){
                let q = this.$route.query
                if(q == 1){

                }else if(q == 2){
                   this.activeName =  'other'
                   this.$forceUpdate();
                }
                console.log(q)
            },

            getCateList(){
                this.loading = false
                let params = {
                    userId:this.userId,
                    storesNum:this.storesNum,
                }
                this.$F.doRequest(this, "/pms/dishes/dishes_category_list", params, (res) => {
                    console.log(res.categoryList)
                    let list = res.categoryList
                    this.categoryList = list
                });
            },
        }
    };
</script>

<style lang="less" scoped>

</style>
