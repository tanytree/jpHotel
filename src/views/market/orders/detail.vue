<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-16 16:12:30
 * @FilePath: \jiudian\src\views\market\orders\detail.vue
 -->
<template>
  <div class="boss-index ov-y">
    <div class="el-card" style="height: auto">
      <div class="el-card__header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/orders?type=order' }">{{
            $t("desk.order_orderManage")
          }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t("commons.detail") }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="bodyInfo margin-t-10" v-loading="loading">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <div class="customerInfo">
              <div class="wrap">
                <div class="hd">
                  <h3>{{ $t("desk.order_guestInfo") }}</h3>
                </div>
                <div class="bd" v-if="detailData.checkIn">
                  <div class="innerWrap">
                    <el-row class="row clearfix">
                      <el-button
                        class="fr"
                        size="mini"
                        :type="
                          detailData.checkIn.state == 1 ? 'success' : 'danger'
                        "
                        plain
                      >
                        {{ F_checkinState(detailData.checkIn.state) }}
                      </el-button>
                      {{ $t("desk.order_guestName") + ":"
                      }}{{ detailData.checkIn.name }}
                    </el-row>
                    <el-row class="row">
                      {{ $t("desk.home_phoneNum") + ":"
                      }}{{ detailData.checkIn.mobile }}
                    </el-row>
                    <el-row class="row">
                      <el-col :span="12" class="cell">
                        {{ $t("desk.order_sourceType") + ":"
                        }}{{ F_guestType(detailData.checkIn.guestType) }}
                      </el-col>
                      <el-col
                        :span="12"
                        class="cell"
                        v-if="detailData.checkIn.memberObject"
                      >
                        会员类型：白金卡
                      </el-col>
                      <el-col
                        :span="12"
                        class="cell"
                        v-if="detailData.checkIn.memberObject"
                      >
                        余额：2
                        <el-button size="mini" type="text">充值</el-button>
                      </el-col>
                      <el-col
                        :span="12"
                        class="cell"
                        v-if="detailData.checkIn.memberObject"
                      >
                        积分：
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <el-row class="customerCtrl">
                <ul>
                  <li
                    @click="checkTypeHandle('order')"
                    :class="checkType == 'order' ? 'active' : ''"
                  >
                    <div class="wrap"><span>查看订单信息（联房）></span></div>
                  </li>
                  <li
                    @click="checkTypeHandle('customer', item)"
                    v-for="(item, index) of detailData.inRoomList"
                    :key="index"
                    :class="
                      checkType == 'customer' && currentRoom.id == item.id
                        ? 'active'
                        : ''
                    "
                  >
                    <div class="wrap">
                      <el-button
                        size="mini"
                        :type="item.state == 1 ? 'success' : 'danger'"
                        plain
                        class="fr"
                      >
                        {{ F_checkinState(item.state) }}
                      </el-button>
                      <span>
                        <i class="el-icon-s-custom vm"></i>
                        {{
                          item.personList.length ? item.personList[0].name : ""
                        }}（{{ item.houseNum }}）</span
                      >
                    </div>
                  </li>
                </ul>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content">
            <template v-if="checkType == 'customer'">
              <c1
                v-if="isReset"
                :detailData="detailData"
                :currentRoomId="currentRoom.id"
                @getOrderDetail="getDetail"
              ></c1>
            </template>
            <template v-if="checkType == 'order'">
              <div class="detailTabWrap">
                <div class="el-card detailTab">
                  <div class="el-card__header" style="padding: 0 20px">
                    <el-tabs v-model="activeName">
                      <el-tab-pane
                        :label="$t('desk.order_billingDetails')"
                        name="first"
                      >
                        <c2
                          v-if="isReset"
                          :detailData="detailData"
                          :currentRoomId="currentRoom.id"
                          @getOrderDetail="getDetail"
                        ></c2>
                      </el-tab-pane>
                      <el-tab-pane
                        :label="$t('desk.order_orderInfo')"
                        name="second"
                      >
                        <div class="thisOrderInfo">
                          <div class="wrap">
                            <el-row class="row">
                              <h3>
                                {{ $t("desk.serve_basicInfo") }}
                                <el-button
                                  style="
                                    vertical-align: middle;
                                    margin-left: 10px;
                                    display: inline-block;
                                  "
                                  size="mini"
                                  class="vm"
                                  @click="yokeplateHandle"
                                  v-if="detailData.inRoomList.length"
                                >
                                  {{ $t("desk.order_alRoom") }}
                                </el-button>
                              </h3>
                              <el-row class="cell">
                                <el-col :span="6">
                                  {{ $t("desk.order_checkinDate") + ":"
                                  }}{{ detailData.checkIn.checkinTime }}
                                </el-col>
                                <el-col :span="6">
                                  {{ $t("desk.order_departureTime") + ":"
                                  }}{{ detailData.checkIn.checkoutTime }}
                                </el-col>
                              </el-row>
                              <el-row class="cell">
                                <el-col :span="6"
                                  >{{ $t("desk.home_note") + ":"
                                  }}{{ detailData.checkIn.remark }}
                                </el-col>
                              </el-row>
                            </el-row>
                            <el-divider></el-divider>
                            <el-row class="row">
                              <h3>{{ $t("desk.order_roomInfo") }}</h3>
                              <el-row class="cell">
                                <el-col
                                  :span="6"
                                  v-for="(item, index) of detailData.inRoomList"
                                  :key="index"
                                >
                                  {{ $t("desk.book_checkin") + ":"
                                  }}{{ item.roomTypeName }}（{{
                                    item.houseNum
                                  }}）
                                </el-col>
                              </el-row>
                            </el-row>
                            <el-divider></el-divider>
                            <el-row class="row">
                              <h3>{{ $t("desk.order_saleInfo") }}</h3>
                              <el-row class="cell">
                                <el-col :span="6">
                                  {{ $t("desk.order_salesman") + ":"
                                  }}{{ F_salesId(detailData.checkIn.salesId) }}
                                </el-col>
                              </el-row>
                            </el-row>
                          </div>
                        </div>
                      </el-tab-pane>
                      <el-tab-pane
                        :label="$t('desk.order_guestInfo')"
                        name="third"
                      >
                        <customer />
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
                <template v-if="activeName == 'third'"> </template>
              </div>
            </template>
          </div>
        </el-col>
      </el-row>
    </div>
    <unitedRoomHandle ref="unitedRoomHandle" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import c1 from "./coms/c1";
import c2 from "./coms/c2";
import customer from "@/components/front/customer";
import myMixin from "@/utils/filterMixin";
import unitedRoomHandle from "@/views/market/home/unitedRoomHandle";

export default {
  mixins: [myMixin],
  components: {
    c1,
    c2,
    customer,
    unitedRoomHandle,
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),
  },
  data() {
    return {
      isOrder: true,
      loading: false,
      activeName: "first",
      detail: {
        text: "",
      },
      detailData: {
        checkIn: {},
        inRoomList: [],
      },
      consumePrice: "0.00",
      payPrice: "0.00",
      checkType: "order",
      searchForm: {
        searchType: 1,
        content: "",
        enterStatus: "",
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        startTime: "", //考试时件
        endTime: "", //结束时间
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
      salesList: [],
      currentRoom: {},
      isReset: true,
    };
  },

  mounted() {
    this.getDetail();
    this.$F.commons.fetchSalesList({ salesFlag: 1 }, (data) => {
      this.salesList = data.hotelUserList;
    });
  },
  methods: {
    getDetail() {
      console.log(111);
      let id = this.$route.query.id;
      this.$F.doRequest(
        this,
        "/pms/checkin/check_in_detail",
        {
          checkInId: id,
        },
        (res) => {
          this.detailData = res;
          // this.$F.merge(this.detailData, res);

          //默认获取第一个房间为主账房，暂不明确主账房标识
          // debugger;
          if (res.inRoomList.length > 0) {
            this.currentRoom = res.inRoomList[0];
            this.resetDom();
            this.$forceUpdate();
          }
        }
      );
    },

    F_salesId(v) {
      let that = this;
      for (let k in that.salesList) {
        if (that.salesList[k].id == v) {
          return that.salesList[k].userName;
        }
      }
      return "";
    },
    /**多选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**每页数 */
    handleSizeChange(val) {
      this.searchForm.page_num = val;
      this.searchForm.page = 1;
      this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.getDataList();
    },

    yokeplateHandle() {
      this.$refs.unitedRoomHandle.init(this.$route.query.id);
    },

    checkTypeHandle(v, item) {
      this.checkType = v;
      this.currentRoom = item || {};
      this.resetDom();
      this.$forceUpdate();
      //切换关联订单后需要刷新组件，原来没有刷新，所以里面的内容没有变化
    },
    resetDom() {
      this.isReset = false;
      this.$nextTick(() => (this.isReset = true));
    },
  },
};
</script>

<style scoped>
.detailTab {
  border: 0;
}

.detailTab >>> .el-tabs__header {
  margin: 0;
}
</style>
<style lang="less" scoped>
.active {
  background: #e3eeff;
  color: #126eff;
  border-right-color: #126eff;
}

.bodyInfo {
  .customerInfo {
    background: #fff;

    .wrap {
      padding: 0 10px;

      .hd {
        overflow: hidden;
        padding: 10px 0;
        line-height: 2;

        h3 {
          font-size: 16px;
          padding: 0;
          margin: 0;
        }
      }

      .bd {
        background: #f3f3f3;
        padding: 10px 0;
        margin-bottom: 10px;

        .row {
          font-size: 14px;
          padding: 5px 10px;

          .cell {
            padding: 5px 0;
          }
        }
      }
    }

    .customerCtrl {
      ul {
        li {
          line-height: 2;
          padding: 10px 0;
          font-size: 12px;

          span {
            color: #126eff;
            cursor: pointer;

            i {
              font-size: 18px;
              color: #dc3e3e;
            }
          }

          &:hover {
            background: #e3eeff;
          }
        }
      }
    }
  }

  .thisOrderInfo {
    background: #fff;
    padding: 30px 0;

    .wrap {
      padding: 0 20px;

      h3 {
        margin: 0;
        font-size: 15px;
        color: #333;
      }

      .cell {
        font-size: 12px;
        color: #333;
      }
    }
  }
}
</style>
