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
                v-if="$F.filterThirdMenu('frontOffice', item.path, true) && item.path != 'pmsshop_report' && item.path != 'pmsshop_employ_permission'"
            >
            <!-- 首页-->
            <shop  ref="shop" v-if="item.path == 'pmsshop_home'"/>
            <bookOff ref="bookOff" v-if="item.path == 'pmsshop_succession'"/>
            <!-- 员工权限-->
            <employeeRights v-if="item.path == 'staff-rights'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import shop from "./main/pmsshop_home.vue";
    import bookOff from "../food/home/bookOff.vue";
    import employeeRights from '@/components/employeeRights'
    import { getLanguage, setLanguage } from "@/utils/auth";
    export default {
        components: {shop, bookOff, employeeRights},
        data() {
            return {
                activeName: "",
                categoryList:[]
            }
        },
        created() {

            this.$F.handleThirdMenu(this);
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
            getCateList(){
                // this.loading = false
                // let params = {
                //     userId:this.userId,
                //     storesNum:this.storesNum,
                // }
                // this.$F.doRequest(this, "/pms/dishes/dishes_category_list", params, (res) => {
                //     console.log(res.categoryList)
                //     let list = res.categoryList
                //     this.categoryList = list
                // });
            },
        },
		watch:{
		    activeName(val, oldVal){//普通的watch监听
                // console.log(val)
		        // if(val == 'home'){
		        //     this.$refs.orderDesk[0].getDataList();
		        // }
		        // if(val == 'bookOff'){
		        //     this.$refs.bookOff[0].getDataList();
		        // }
		    },
		}
    };
</script>

<style lang="less" scoped>

</style>
