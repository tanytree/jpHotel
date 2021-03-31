<template>
  <el-container  class="boss-index">
     <el-header>
        <div class="shoptitle"> <span class="sub"></span> {{$t('shop.shopDoor')}}</div>
     </el-header>
     <el-main  v-loading="loading">
        <div class="shopNavList clearfix">
            <div class="item" v-for="(item,index) in tableData" :key="index" @click="jump(item)">
                <div class="icon"><i class="el-icon-s-shop"></i></div>
                <div class="title">{{item.name}}</div>
            </div>
        </div>
     </el-main>
  </el-container>
</template>

<script>
import {mapState,mapActions} from "vuex";
import mixin from '../mixin';
export default {
  mixins: [mixin],
  components:{},
  data() {
    return {
        loading: false,
        tabCurr:0,
        listTotal: 0, //总条数
        tableData: [],
    };
  },

  async mounted() {
       await  this.intForm();
  },
  computed: {
    ...mapState({
        token: state => state.user.token,
        userId: state => state.user.userId,
        msgKey: state => state.config.msgKey,
        plat_source: state => state.config.plat_source
    }),


  },
  methods: {
    intForm(){

        this.getDataList();

    },
    //售卖点列表
    getDataList(){
        this.loading = true
        let params = {}
        params.isShop = 1 //新增字段 是否商店部
        params.userId = this.userId
        params.storesNum = this.storesNum
        this.$F.doRequest(this, "/pms/hotelgoodsSelling/list", params, (res) => {
            console.log(res)
            this.loading = false
            this.tableData = res.list
            // this.listTotal = res.page.count
        });
    },

    jump(item){
        this.$router.push({
            path:'/pmsshopselling',
            query:{
                key:item.id
            }
        })
        let nextPath = 'pmsshopselling'
        window.localStorage.setItem('currentPath',nextPath);
        window.localStorage.setItem('pagePath',nextPath);
    },

    /**每页数 */
    handleSizeChange(val) {
        // console.log(val)
        this.searchForm.pageSize = val;
        this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
        this.searchForm.pageIndex = val;
        this.getDataList();
    }
  }
};
</script>
<style lang="less" scoped>
.boss-index {
    background: #fff;
    border-radius: 10px;
    .el-header {
        // border-bottom: 1px solid #dedede;
        width: 100%;

        .shoptitle{
            background-color: #EEF1F7;
            margin-top:20px;
            padding:12px 20px;

           .sub{
               height: 18px;
               line-height: 18px;
               padding-left: 10px;
               border-left:3px solid #B5C3E1;
           }
        }

    }
    .shopNavList{
        .item{
            width:13% ;
            float: left;
            border-radius: 4px;
            background-color: rgba(239, 239, 239, 1);
            border: 1px solid rgba(200, 200, 200, 1);
            padding: 30px 0;
            text-align: center;
            margin-right: 15px;
            margin-bottom:15px;
            cursor: pointer;
            .icon{
                margin:0 auto;
                width: 60px;
                line-height: 60px;
                background: #1296DB;
                border-radius: 50%;
                color: #fff;
                font-size: 30px;
                i{
                    vertical-align: middle;
                }
            }
            .title{
                padding-top: 10px;
                font-size: 15px;
            }
        }
    }
}


</style>
