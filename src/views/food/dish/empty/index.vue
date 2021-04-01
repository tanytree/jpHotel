<template>
  <div class="boss-index">
   <div class="content">
    <el-container class="left">
        <el-header>
            <div class="block flex" >
               <div class=" text-size14 text-left"  style="justify-content: flex-start">
                  {{$t('food.common.is_served')}}：{{soldOutList.length}}
                </div>
               <div style="max-width: 100px;">
                  <el-button type="primary"   :disabled="soldOutList.length == 0" @click="clearAll">{{$t('food.reset.cancel_all')}}</el-button>
               </div>
            </div>
        </el-header>
        <el-main  v-loading="loading" style="padding:0;">
            <div class="tablist">
                <el-table
                  :data="soldOutList"
                  border
                  header-row-class-name="default"
                  size="small"
                >
                  <el-table-column prop="name" :label="$t('food.common.food_title')" width="120"></el-table-column>
                  <el-table-column :label="$t('food.common.has')">
                      <template slot-scope="scope">
                        {{scope.row.remainingCount}}
                      </template>
                  </el-table-column>
                  <el-table-column :label="$t('food.common.solt_text')">
                    <template slot-scope="scope">
                        {{scope.row.soldOut == 2 ? $t('food.reset.yes') : $t('food.reset.no') }}
                    </template>

                  </el-table-column>
                  <el-table-column :label="$t('food.common.action')" width="80">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="clear(scope.row,1)">{{$t('food.reset.remove')}}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>

    <el-container class="right">
        <el-header>
            <el-row>
              <el-button size="small" :type="tabCurr == 999 ? 'primary' : '' " @click="intForm">{{$t('food.common.all')}}</el-button>
              <el-button size="small" v-for="(item,index) in categroyList" :key="index"  :type="tabCurr == index ? 'primary' : ''"  @click="changeTab(item.id,item,index)">{{item.name}}</el-button>
              <span style="float: right;">
                  <el-input
                    size="small"
                      :placeholder="$t('food.common.food_title')"
                      v-model="searchForm.name"
                      @change="getDataList"
                      >
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
              </span>
            </el-row>
        </el-header>

        <el-main  v-loading="list_loading">
            <div v-if="cateList.length > 0">
                <el-form class="demo-ruleForm">
                    <el-form-item :label="$t('food.common.cate')" prop="categoryId">
                      <el-cascader
                         :options="cateList"
                         v-model="searchForm.categoryId"
                         @change="handleChange"></el-cascader>
                    </el-form-item>
                </el-form>
            </div>

            <div class="menuList clearfix">
                <el-row :gutter="10" style="width: 100%;">
                    <el-col v-for="(item,index) in tableData" :key="index" :xs="8" :sm="8"  :md="8" :lg="6" :xl="6">
                      <div class="menuItem">
                          <div class="box">
                              <div class="top">
                                  <div>{{item.name}}</div>
                                  <div class="text-size12 margin-t-10 text-gray" style="height:16px;">
                                      <span v-if="item.remainingCount == null" class="text-gray text-size12">{{$t('food.common.no_set')}}</span>
                                      <div v-else>
                                          <div v-if="item.soldOut  == 1"  :class="item.remainingCount <= item.warningCount ? 'text-red' : ''" >{{$t('food.reset.food_surplus')}}：{{item.remainingCount}}</div>
                                          <div v-else class="text-red">{{$t('food.common.is_solt')}}</div>
                                      </div>

                                  </div>
                              </div>
                              <div class="bot margin-t-10 clearfix">
                                  <span>¥{{numFormate(item.price)}}</span>
                                  <el-button v-if="item.soldOut  == 1" @click="clear(item,2)" size="mini" plain>{{$t('food.common.solt_text')}}</el-button>
                                  <el-button v-else @click="clear(item,1)" size="mini" plain>{{$t('food.common.cancel')}}</el-button>
                              </div>
                          </div>
                      </div>
                    </el-col>
                </el-row>

            </div>
        </el-main>
        <div class="block" style="padding:0 20px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.pageIndex" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.pageSize" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
        </div>
    </el-container>
    </div>
  </div>
</template>

<script>
import mixin from '../../mixin';
import {mapState,mapActions} from "vuex";
export default {
  mixins: [mixin],
  props:['categroyList'],
  components: {},
  computed: {
      ...mapState({
          token: state => state.user.token,
          userId: state => state.user.userId,
          msgKey: state => state.config.msgKey,
          plat_source: state => state.config.plat_source
      })
  },
  data() {
    return {
        loading: true,
        list_loading:true,
        searchForm: {
            name:'',
            categoryId: '',

        },
        tabCurr:0,
        listTotal: 0, //总条数
        cateList:[],
        tableData: [],
        soldOutList:[],
        soldOutInfo:{
           soldOut:2,//已沽清
           pageIndex: 1, //当前页
           pageSize: 200, //页数
        }
    };
  },

  async mounted() {
    this.intForm();
    this.getSoldOutList();
  },
  methods: {
    intForm(){
        this.tabCurr = 999
        this.cateList = []
        this.searchForm = {
            name:'',
            categoryId: '',
            pageIndex: 1, //当前页
            pageSize: 20, //页数
        }
        this.getDataList();

    },
    getDataList(){
        this.list_loading = true
        let params = this.searchForm
        params.userId = this.userId
        params.storesNum = this.storesNum
        this.$F.doRequest(this, "/pms/dishes/dishes_manage_list", params, (res) => {
            console.log(res)
            this.list_loading = false
            this.tableData = res.dishesList
            this.listTotal = res.page.count;
        });
    },
    getSoldOutList(){
        this.loading = true
        let params = this.soldOutInfo
        params.userId = this.userId
        params.storesNum = this.storesNum
        this.$F.doRequest(this, "/pms/dishes/dishes_manage_list", params, (res) => {
            console.log(res)
            this.loading = false
            this.soldOutList = res.dishesList
        });
    },

    //切换菜品类型
    async changeTab(v,item,index){


        this.cateList = []
        this.tabCurr = index
        this.searchForm.categoryId = v
        this.getDataList();
        if(item.childList.length > 0){
            this.cateList = await this.getNewCateList(item.childList);
        }


       //  this.cateList = []
       //  this.tabCurr = index
       //  this.searchForm.categoryId = ''
       // if(item.childList.length > 0){
       //      this.cateList = await this.getNewCateList(item.childList)
       // }else{
       //     this.searchForm.categoryId = v
       //     this.getDataList();
       // }
    },

    handleChange(value) {
       this.searchForm.categoryId = value[value.length - 1].toString();
        this.$nextTick(()=>{
            this.getDataList()
        })
    },

    //沽清菜单
    clear(item,status){
        let text = ''
        if(status == 1){
            text = this.$t('food.reset.is_confirm_solt_cancel')
        }else{
             text = this.$t('food.common.is_confirm_solt')
        }

        this.$confirm(text, this.$t('food.common.tip'), {
            confirmButtonText: this.$t('food.common.ok'),
            cancelButtonText: this.$t('food.common.cancel'),
            type: 'warning'
        }).then(() => {
            let params = {
                dishesIds:item.id,
                soldOut:status
            }
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$F.doRequest(this, "/pms/dishes/dishes_manage_sold_out", params, (res) => {
                console.log(res)
                this.getDataList();
                this.getSoldOutList();
            });
            this.alert(200,this.$t('food.common.success'));
        }).catch(() => {
        });
    },

    //提交
    clearAll(){
        this.$confirm(this.$t('food.common.is_confirm_solt_cancel_all'), this.$t('food.common.tip'), {
            confirmButtonText: this.$t('food.common.ok'),
            cancelButtonText: this.$t('food.common.cancel'),
            type: 'warning'
        }).then(() => {
            let list = this.soldOutList
            let params = {
                dishesIds:this.getArr(list),
                soldOut:1
            }
            params.userId = this.userId
            params.storesNum = this.storesNum
            this.$F.doRequest(this, "/pms/dishes/dishes_manage_sold_out", params, (res) => {
                console.log(res)
                this.getDataList();
                this.getSoldOutList();
            });
            this.alert(200,this.$t('food.common.success'));
        }).catch(() => {

        });
    },

    /**每页数 */
    handleSizeChange(val) {
        console.log(val)
        this.searchForm.pageSize = val;
        this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
        console.log(val)
        this.searchForm.pageIndex = val;
        this.getDataList();
    }

  }
};
</script>
<style lang="less" scoped>


    .el-col {
        border-radius: 4px;
      }
      .bg-purple-dark {
        background: #99a9bf;
      }
      .bg-purple {
        background: #d3dce6;
      }
      .bg-purple-light {
        background: #e5e9f2;
      }
      .grid-content {
        border-radius: 4px;
        min-height: 36px;
      }
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
