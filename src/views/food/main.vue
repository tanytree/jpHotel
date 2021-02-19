<!--
 * @LastEditors: Please set LastEditors
 *
 -->
<template>
    <div class="boss-index">
        <el-tabs class="pageTab noBg" v-model="activeName">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                :name="item.path"
                :key="item.path"
                v-if="$F.filterThirdMenu('frontOffice', item.path, true) && ['orderDesk','bookOff', 'staff-rights'].indexOf(item.path) > -1"
                :class="item.path !== 'orderDesk' ? 'bg' : ''"
            >
            <!-- 前台点餐-->
            <orderDesk :categroyList = 'categoryList' ref="orderDesk" v-if="item.path == 'orderDesk'"/>
            <!-- 交班-->
            <bookOff :categroyList = 'categoryList' ref="bookOff" v-if="item.path == 'bookOff'"/>
            <!-- 员工权限-->
             <employeeRights v-if="item.path == 'staff-rights'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex"
    import orderDesk from "./home/orderDesk";
    import bookOff from "./home/bookOff";
    import employeeRights from '@/components/employeeRights'
    export default {
        components: {orderDesk, bookOff, employeeRights},
        data() {
            return {
                activeName: "",
                categoryList:[]
            }
        },
        created() {

            this.$F.handleThirdMenu(this);
            this.getCateList();
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
        },
		watch:{
		    activeName(val, oldVal){//普通的watch监听
                // console.log(val)
		        if(val == 'orderDesk'){
		            this.$refs.orderDesk[0].getDataList();
		        }
		        // if(val == 'bookOff'){
		        //     this.$refs.bookOff[0].getDataList();
		        // }
		    },
		}
    };
</script>

<style lang="less" scoped>

</style>
