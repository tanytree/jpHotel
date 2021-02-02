<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-27 17:44:33
 * @FilePath: \jiudian\src\views\market\orders\detail.vue
 -->
<template>
  <div class="boss-index ov-y">
    <div class="el-card" style="height: auto">
      <div class="el-card__header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item @click.native="clickGo">{{ $t("desk.order_orderManage") }}</el-breadcrumb-item>
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
                      <el-button class="fr" size="mini" :type=" detailData.checkIn.state == 1 ? 'success' : 'danger'" plain>
                        {{ F_checkinState(detailData.checkIn.state) }}
                      </el-button>
                      {{ $t("desk.order_guestName") + ":" }}{{ detailData.checkIn.name }}
                    </el-row>
                    <el-row class="row">
                      {{ $t("desk.home_phoneNum") + ":" }}{{ detailData.checkIn.mobile }}
                    </el-row>
                    <el-row class="row">
                      <el-col :span="12" class="cell">
                        {{ $t("desk.order_sourceType") + ":" }}{{ F_guestType(detailData.checkIn.guestType) }}
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <el-row class="customerCtrl">
                <ul>
                  <li @click="checkTypeHandle('order')" :class="checkType == 'order' ? 'active' : ''">
                    <div class="wrap"><span>{{$t('desk.order_lookOrderInfo')}}></span></div>
                  </li>
                  <li @click="checkTypeHandle('customer', item)" v-for="(item, index) of detailData.inRoomList" :key="index" :class=" checkType == 'customer' && currentRoom.id == item.id ? 'active' : ''">
                    <div class="wrap">
                      <el-button size="mini" :type="item.state == 1 ? 'success' : 'danger'" plain class="fr">
                        {{ F_checkinState(item.state) }}
                      </el-button>
                      <span>
                        <span class="icon-main" v-if="index == 0">{{$t('desk.add_theMain')}}</span>
                          <span>
                              {{ item.personList.length ? getMainCheckPerson(item.personList).name : "" }}（{{ item.houseNum }}）
                          </span>
                      </span>
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
              <c1 v-if="isReset" :detailData="detailData" :currentRoom="currentRoom" @getOrderDetail="getDetail"></c1>
            </template>
            <template v-if="checkType == 'order'">
              <div class="detailTabWrap">
                <div class="el-card detailTab">
                  <div class="el-card__header" style="padding: 0 20px">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane :label="$t('desk.order_billingDetails')" name="first">
                        <c2 v-if="isReset" :detailData="detailData" :currentRoom="currentRoom" @getOrderDetail="getDetail"></c2>
                      </el-tab-pane>
                      <el-tab-pane :label="$t('desk.order_orderInfo')" name="second">
                        <div class="thisOrderInfo">
                          <div class="wrap">
                            <el-row class="row">
                              <h3>
                                {{ $t("desk.serve_basicInfo") }}
                              </h3>
                              <el-row class="cell">
                                <el-col :span="6">
                                  {{ $t("desk.order_checkinDateA") + ":" }}{{ detailData.checkIn.checkinTime }}
                                </el-col>
                                <el-col :span="6">
                                  {{ $t("desk.order_departureTime") + ":" }}{{ detailData.checkIn.checkoutTime }}
                                </el-col>
                              </el-row>
                              <el-row class="cell">
                                <el-col :span="6">{{ $t("desk.home_note") + ":" }}{{ detailData.checkIn.remark }}</el-col>
                              </el-row>
                            </el-row>
                            <el-divider></el-divider>
                            <el-row class="row">
                              <h3>{{ $t("desk.order_roomInfo") }}</h3>
                              <el-row class="cell">
                                <el-col :span="6" v-for="(item, index) of detailData.inRoomList" :key="index">{{ $t("desk.book_checkin") + ":" }}{{ item.roomTypeName }}（{{ item.houseNum }}）</el-col>
                              </el-row>
                            </el-row>
<!--                            <el-divider></el-divider>-->
<!--                            <el-row class="row">-->
<!--                              <h3>{{ $t("desk.order_saleInfo") }}</h3>-->
<!--                              <el-row class="cell">-->
<!--                                <el-col :span="6">{{ $t("desk.order_salesman") + ":" }}{{ F_salesId(detailData.checkIn.salesId) }}</el-col>-->
<!--                              </el-row>-->
<!--                            </el-row>-->
                          </div>
                        </div>
                      </el-tab-pane>
                        <el-tab-pane :label="$t('desk.order_guestInfo')" name="customer">
                            <checkInInfo type="detail" :orderInfo="detailData" ref="checkInInfo"></checkInInfo>
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
import c1 from "./coms/c1";
import c2 from "./coms/c2";
import customer from "@/components/front/customer";
import myMixin from "@/utils/filterMixin";
import unitedRoomHandle from "@/views/market/home/unitedRoomHandle";
import checkInInfo from "@/components/front/checkInInfo";   //客人信息

export default {
  mixins: [myMixin],
  components: {
      checkInInfo,
    c1,
    c2,
    customer,
    unitedRoomHandle,
  },
  data() {
    return {
      itemGuestInfo: null,
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
      handleClick() {
          if (this.activeName == 'customer') {
              console.log(this.detailData);
              this.$refs.checkInInfo.init('detail', this.detailData);
          }
      },

      //获取主入住人信息
      getMainCheckPerson(personList) {
          let personInfo = {};
          personList.forEach( person => {
              if (person.personType == 2) {
                  personInfo = person;
              }
          })
          return personInfo;
      },
    //点击顶部订单管理
    clickGo() {
      console.log(this.$route.query.member);
      if (this.$route.query.member) {
        this.$router.replace({
          name: "customerhistory",
          query: {
            item: this.itemGuestInfo,
          },
        });
      } else {
        // :to="{ path: '/orders?type=order' }"
        this.$router.replace({
          path: "/orders",
          query: {
            type: 'order',
          },
        });
      }
    },
    getDetail() {
      console.log(111);
      let id = this.$route.query.id; //该id为checkinId
      this.itemGuestInfo = this.$route.query.item;
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
          // ;
          if (res.inRoomList.length > 0) {
            // this.currentRoom = res.inRoomList[0];
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

<style lang="less" scoped>
.detailTab {
  border: 0;
}
.active {
  background: #e3eeff;
  color: #126eff;
  border-right-color: #126eff;
}

.bodyInfo {
  height: 100%;
  .customerInfo {
    background: #fff;
    .icon-main{
        border:1px  solid #f00;
        border-radius: 50%;
        font-size: 12px;
        background-color: #fff;
        width: 20px;height: 20px;display: inline-block;text-align: center;line-height: 16px;color: #f00 !important;
        vertical-align: middle;margin-right: 5px;
    }
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
