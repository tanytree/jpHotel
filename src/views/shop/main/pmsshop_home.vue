<template>
  <div class="boss-index">
      324432
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import mixin from '../mixin';
export default {
  mixins: [mixin],
  components: {},

  data() {
    return {
        loading: true,
        list_loading:false,
       
       
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
    getDataList(){
        // this.list_loading = true
        // let params = this.searchForm
        // params.state = 1
        // params.userId = this.userId
        // params.storesNum = this.storesNum
        // this.$F.doRequest(this, "/pms/dishes/dishes_manage_list", params, (res) => {
        //     console.log(res)
        //     this.list_loading = false
        //     this.tableData = res.dishesList
        //     this.listTotal = res.page.count
        //     this.intCart();
        // });
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
.content {
  display: flex;
  flex-direction: row;
  height: 100%;
  background: transparent;
  padding: 0;

  > div,
  section {
    background: #fff;
    border-radius: 10px;
    height: 100%;
    overflow: auto;
  }

    .el-header {
      border-bottom: 1px solid #dedede;
      width: 100%;
    }
  .left {
    flex: 1.2;
    margin-right: 20px;
    padding:0 20px;
        .el-header{
            padding: 0;
            line-height: 60px;
        }
        .tablist{
            height: calc(100% - 110px);
            padding-top: 20px;
        }

  }

  .right {
    flex: 3;

    .el-header{
        padding-top:10px;
    }

    .menuList{
       padding:5px;
       display: -webkit-box;
       display: -ms-flexbox;
       display: flex;
       -ms-flex-wrap: wrap;
       flex-wrap: wrap;
       margin:-10px;
       .menuItem{
           width: 100%;
           margin-bottom: 10px;
            .box{
                background-color: #E2E9F2;
                display: block;
                text-align: left;
                .top{
                    padding:10px;
                    padding-bottom: 0;
                }
                .bot{
                    background-color: #7B9FCD;
                    padding:10px;
                    span{
                        color: #fff;
                        padding-top: 3px;
                        display: inline-block;
                    }
                    .el-button{
                        float: right;
                        background: #7B9FCD !important;
                        color: #fff;
                    }


                }



            }
        }
    }
    .el-footer {
      display: flex;
      align-items: center;
      background-color: #fff;
      box-shadow: 0px -5px 8px 0px rgba(0, 0, 0, 0.19);
    }

    .el-main {


    }
  }
}


</style>
