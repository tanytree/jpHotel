<template>
    <el-container  class="boss-index">
        <el-header class="bg round" >
            <div class="item" v-for="item in tableData"  :key="item.id" :class="active == item.id ? 'active' : ''" @click="changeTab(item.id)">{{item.name}}</div>
        </el-header>
        <el-main class="round bg"  v-loading="loading">
            <div class="content">
               <div class="left">1</div>
               <div class="right">2</div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import {mapState,mapActions} from "vuex";
import mixin from '../mixin';
export default {
  mixins: [mixin],
  components: {},

  data() {
    return {
        loading: false,
        tabCurr:0,
        listTotal: 0, //总条数
        tableData: [],
        active:''
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
    getDataList(){
        this.loading = true
        let params = {}
        params.userId = this.userId
        params.storesNum = this.storesNum
        this.$F.doRequest(this, "/pms/hotelgoodsSelling/list", params, (res) => {
            console.log(res)
            this.loading = false
            this.tableData = res.list
            if( res.list.length > 0){
                this.active = res.list[0].id
            }
            // this.listTotal = res.page.count
        });
    },


    //切换
    changeTab(id){
      this.active = id
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



.bg{
    background: #fff;
}
.boss-index {
    border-radius: 10px;
    .round{
        border-radius: 10px;
    }
    .el-tabs__content{display: none;}
    .el-header {
        padding: 20px;
        height: auto !important;
        width: 100%;
        margin-bottom: 20px;
        .item{
            cursor: pointer;
            display: inline-block;
            padding: 0 25px;
            line-height: 40px;
            min-width: 120px;
            text-align: center;
            font-size: 16px;
        }
        .item.active{
            background: #126eff;
            border-radius: 4px;
            color: #ffffff;
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

    .content {
        display: flex;
        flex-direction: row;
        height: 100%;
        background: transparent;
        padding: 0;

        .left {
            flex: 4;
            margin-right: 20px;
            padding:0 20px;
        }

        .right {
            flex: 2;
        }
    }
}


</style>
