<!--
 * @Date: 2020-11-25 16:27:58
 * @Author: 陶子
 * @LastEditTime: 2020-11-25 18:43:19
 * @FilePath: \jiudian\src\components\storeLookTao.vue
-->
 <!-- 总后台 > 总办 > 首页 > 门店概览 -->
<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form
        class="term"
        inline
        size="small"
        label-width="80px"
        :model="storeForm"
      >
        <el-form-item label="选择日期:">
          <el-date-picker
            v-model="storeForm.startTime"
            value-format="yyyy-MM-dd"
            type="date"
            :placeholder="$t('commons.selectDate')"
          ></el-date-picker>
          <span style="margin: 0 5px">-</span>
          <el-date-picker
            v-model="storeForm.endTime"
            value-format="yyyy-MM-dd"
            type="date"
            :placeholder="$t('commons.selectDate')"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="选择门店:">
          <el-select
            v-model="storeForm.storesNum"
            :placeholder="$t('login.sTip')"
          >
            <el-option
              v-for="item in storeList"
              :key="item.storesNum"
              :label="item.storesName"
              :value="item.storesNum"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div v-if="itemInfo">
        <div class="container">
          <div class="title">门店客房数据概览</div>
          <div class="flexBox">
            <div class="itemBox">
              <img
                src="../assets/images/storeLookTao/rents.png"
                class="boxLeft"
              />
              <div class="boxRight">
                <div class="boxRight_top">出租率</div>
                <div class="botRight_bottom">
                  {{ itemInfo.guest_rents * 100 }}%
                </div>
              </div>
            </div>
            <div class="itemBox">
              <img
                src="../assets/images/storeLookTao/housePrice.png"
                class="boxLeft"
              />
              <div class="boxRight">
                <div class="boxRight_top">平均房价</div>
                <div class="botRight_bottom">
                  {{ itemInfo.guest_avg_prices }}
                </div>
              </div>
            </div>
            <div class="itemBox">
              <img
                src="../assets/images/storeLookTao/RevPAR.png"
                class="boxLeft"
              />
              <div class="boxRight">
                <div class="boxRight_top">RevPAR</div>
                <div class="botRight_bottom">{{ itemInfo.guest_revpar }}</div>
              </div>
            </div>
            <div class="itemBox">
              <img
                src="../assets/images/storeLookTao/totalRevenue.png"
                class="boxLeft"
              />
              <div class="boxRight">
                <div class="boxRight_top">总收入</div>
                <div class="botRight_bottom">
                  {{ itemInfo.guest_total_prices }}
                </div>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
        <div class="container">
          <div class="title">门店会议厅数据概览</div>
          <div class="flexBox">
            <div class="itemBox">
              <img
                src="../assets/images/storeLookTao/rents.png"
                class="boxLeft"
              />
              <div class="boxRight">
                <div class="boxRight_top">出租率</div>
                <div class="botRight_bottom">
                  {{ itemInfo.meeting_rents * 100 }}%
                </div>
              </div>
            </div>
            <div class="itemBox">
              <img
                src="../assets/images/storeLookTao/housePrice.png"
                class="boxLeft"
              />
              <div class="boxRight">
                <div class="boxRight_top">平均房价</div>
                <div class="botRight_bottom">
                  {{ itemInfo.meeting_avg_prices }}
                </div>
              </div>
            </div>
            <div class="itemBox">
              <img
                src="../assets/images/storeLookTao/RevPAR.png"
                class="boxLeft"
              />
              <div class="boxRight">
                <div class="boxRight_top">RevPAR</div>
                <div class="botRight_bottom">{{ itemInfo.meeting_revpar }}</div>
              </div>
            </div>
            <div class="itemBox">
              <img
                src="../assets/images/storeLookTao/totalRevenue.png"
                class="boxLeft"
              />
              <div class="boxRight">
                <div class="boxRight_top">总收入</div>
                <div class="botRight_bottom">
                  {{ itemInfo.meeting_total_prices }}
                </div>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
          filterHeader: true,
        },
        (data) => {
          this.storeList = data;
          this.storeForm.storesNum = this.storeList[0].storesNum;
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
            this.$message({
              message: "请求成功",
              type: "success",
            });
          }
        );
     
    },
    getNowTime() {
      let date = new Date();
      let Y = date.getFullYear();
      let M = date.getMonth() + 1;
      let D = date.getDate();
      let d = date.getDate() - 1;
      let time = Y + "-" + M + "-" + D;
      let time2 = Y + "-" + M + "-" + d;
      this.storeForm.endTime = time;
      this.storeForm.startTime = time2;
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
    margin-bottom: 20px;
  }
  .flexBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemBox {
      width: 23%;
      height: 90px;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 1);
      border: 1px solid rgba(220, 220, 220, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      .boxLeft {
        width: 50px;
        height: 50px;
        background-color: rgba(255, 255, 255, 1);
        margin-right: 16px;
      }
      .boxRight {
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
}
</style>
