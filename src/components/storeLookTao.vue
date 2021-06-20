<!--
 * @Date: 2020-11-25 16:27:58
 * @Author: 陶子
 * @LastEditTime: 2021-03-12 11:24:24
 * @FilePath: \jiudian\src\components\storeLookTao.vue
 * @pageName: 这是--（门店概览）--页面
-->
<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small" label-width="80px" :model="storeForm">
        <el-form-item :label="$t('boss.add_chooseDate') + ':'">
          <el-date-picker v-model="storeForm.startTime" value-format="yyyy-MM-dd" type="date" :placeholder="$t('commons.selectDate')"></el-date-picker>
          <span style="margin: 0 5px">-</span>
          <el-date-picker v-model="storeForm.endTime" value-format="yyyy-MM-dd" type="date" :placeholder="$t('commons.selectDate')"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('boss.add_chooseStore') + ':'" label-width="100px">
          <el-select v-model="storeForm.storesNum" :placeholder="$t('login.sTip')">
            <el-option label="ALL" value=""></el-option>
            <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div v-if="itemInfo">
        <div class="container">
          <div class="title">{{ $t("boss.add_roomData") }}</div>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="itemBox">
                <img src="../assets/images/storeLookTao/rents.png" class="boxLeft" />
                <div class="boxRight">
                  <div class="boxRight_top">{{$t('boss.add_allRoomNum')}}</div>
                  <div class="botRight_bottom">{{$F.numFormate(itemInfo.hotel_room_num)}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="itemBox">
                <img src="../assets/images/storeLookTao/housePrice.png" class="boxLeft" />
                <div class="boxRight">
                  <div class="boxRight_top">{{$t('boss.add_canSaleRoom')}}</div>
                  <div class="botRight_bottom">{{$F.numFormate(itemInfo.hotel_reserve_room_num)}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="itemBox">
                <img src="../assets/images/storeLookTao/RevPAR.png" class="boxLeft" />
                <div class="boxRight">
                  <div class="boxRight_top">{{$t('boss.add_allSaleRoom')}}</div>
                  <div class="botRight_bottom">{{$F.numFormate(itemInfo.sale_room_num)}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="itemBox">
                <img src="../assets/images/storeLookTao/totalRevenue.png" class="boxLeft" />
                <div class="boxRight">
                  <div class="boxRight_top">{{$t('boss.add_allSaleCustormer')}}</div>
                  <div class="botRight_bottom">{{$F.numFormate(itemInfo.sale_person_num)}}</div>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <div class="itemBox">
                <img src="../assets/images/storeLookTao/rents.png" class="boxLeft" />
                <div class="boxRight">
                  <div class="boxRight_top">{{$t('boss.add_rents')}}</div>
                  <div class="botRight_bottom">{{itemInfo.guest_rents*100}}%</div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="itemBox">
                <img src="../assets/images/storeLookTao/housePrice.png" class="boxLeft" />
                <div class="boxRight">
                  <div class="boxRight_top">{{$t('boss.add_averageRoomprice')}}</div>
                  <div class="botRight_bottom">{{$F.numFormate(itemInfo.room_avg_prices)}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="itemBox">
                <img src="../assets/images/storeLookTao/RevPAR.png" class="boxLeft" />
                <div class="boxRight">
                  <div class="boxRight_top">{{$t('boss.add_averageCoustormerprice')}}</div>
                  <div class="botRight_bottom">{{$F.numFormate(Math.round(itemInfo.guest_avg_prices))}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="itemBox">
                <img src="../assets/images/storeLookTao/totalRevenue.png" class="boxLeft" />
                <div class="boxRight">
                  <div class="boxRight_top">RevPAR</div>
                  <div class="botRight_bottom">{{$F.numFormate(Math.round(itemInfo.guest_revpar))}}</div>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <div class="itemBox">
                <img src="../assets/images/storeLookTao/rents.png" class="boxLeft" />
                <div class="boxRight">
                  <div class="boxRight_top">{{$t('boss.add_roomSaleNum')}}</div>
                  <div class="botRight_bottom">{{$F.numFormate(itemInfo.guest_total_prices)}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="itemBox">
                <img src="../assets/images/storeLookTao/housePrice.png" class="boxLeft" />
                <div class="boxRight">
                  <div class="boxRight_top">{{$t('boss.add_foodAstore')}}</div>
                  <div class="botRight_bottom">{{$F.numFormate(itemInfo.dishshop_total_prices)}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="itemBox">
                <img src="../assets/images/storeLookTao/RevPAR.png" class="boxLeft" />
                <div class="boxRight">
                  <div class="boxRight_top">{{$t('boss.add_saleTotal')}}</div>
                  <div class="botRight_bottom">{{$F.numFormate(itemInfo.sales_total_prices)}}</div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="itemBox">
                <img src="../assets/images/storeLookTao/rents.png" class="boxLeft" />
                <div class="boxRight">
                  <div class="boxRight_top">{{$t('boss.add_teamNum')}}</div>
                  <div class="botRight_bottom">{{$F.numFormate(itemInfo.group_total)}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="itemBox">
                <img src="../assets/images/storeLookTao/housePrice.png" class="boxLeft" />
                <div class="boxRight">
                  <div class="boxRight_top">{{$t('boss.add_teamAllPerpson')}}</div>
                  <div class="botRight_bottom">{{$F.numFormate(itemInfo.group_person_total)}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="itemBox">
                <img src="../assets/images/storeLookTao/RevPAR.png" class="boxLeft" />
                <div class="boxRight">
                  <div class="boxRight_top">{{$t('boss.add_teamAllGet')}}</div>
                  <div class="botRight_bottom">{{$F.numFormate(itemInfo.group_person_price)}}</div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storeForm: {
        startTime: "",
        endTime: "",
        storesNum: "",
      },
      storeList: [],
      loading: false,
      itemInfo: null,
    };
  },

  mounted() {
    this.getStoreList();
    this.getNowTime();
  },
  watch: {
    storeForm: {
      handler: function () {
        this.getData();
      },
      deep: true,
    },
  },
  methods: {
    getStoreList() {
      this.$F.doRequest(
        this,
        "/pms/freeuser/stores_list",
        {
          filterHeader: false,
        },
        (data) => {
          this.storeList = data;
          this.storeForm.storesNum = "";
          this.getData();
        }
      );
    },
    /**获取数据 */
    getData() {
      this.loading = true;
      this.$F.doRequest(
        this,
        "/pms/head/stores_overview",
        this.storeForm,
        (res) => {
          console.log(res);
          this.loading = false;
          this.itemInfo = res;
        }
      );
    },
    getNowTime() {
      let date = new Date();
      let Y = date.getFullYear();
      let M = date.getMonth() + 1;
      let D = date.getDate();
      let d = date.getDate() - 1;
      let time = Y + "-" + M + "-" + d;
      let time2 = Y + "-" + M + "-" + D;
      this.storeForm.startTime = time;
      this.storeForm.endTime = time2;
    },
  },
};
</script>

<style lang="scss" scoped>
.open {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;

  .count {
    color: #333;
  }
}

.dialogDiv span {
  margin-right: 15px;
}

.dialogDiv {
  margin-bottom: 15px;
}

.container {
  .title {
    color: rgba(51, 51, 51, 100);
    font-size: 20px;
  }

  .itemBox {
    box-sizing: border-box;
    padding-left: 25px;
    margin-top: 20px;
    width: 100%;
    height: 90px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(220, 220, 220, 1);
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .boxLeft {
      width: 50px;
      height: 50px;
      background-color: rgba(255, 255, 255, 1);
      margin-right: 16px;
    }

    .boxRight {
      flex: 1;

      .boxRight_top {
        color: rgba(51, 51, 51, 100);
        font-size: 12px;
      }

      .botRight_bottom {
        color: rgba(51, 51, 51, 100);
        font-size: 24px;
      }
    }
  }
}

.el-row {
  margin-bottom: 0px;

  &:last-child {
    margin-bottom: 0;
  }
}

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

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
