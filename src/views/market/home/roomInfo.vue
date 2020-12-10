<!--
 * @Date: 2020-12-10 11:22:33
 * @Author: 陶子
 * @LastEditTime: 2020-12-10 18:02:37
 * @FilePath: \jiudian\src\views\market\home\roomInfo.vue
-->
<template>
  <el-dialog
    top="0"
    :visible.sync="hosteldis"
    width="80%"
    :title="
      `${currentRoom.houseNum}` +
      '  ' +
      `${
        currentRoom.hotelRoomType ? currentRoom.hotelRoomType.houseName : ''
      }` +
      `${currentRoom.checkIn ? '-' : ''}` +
      checkTitleEnd()
    "
  >
    <el-tabs type="border-card" v-model="activeName">
      <!-- 基本信息 -->
      <el-tab-pane
        :label="$t('desk.serve_basicInfo')"
        v-if="
          currentRoom.checkInRoomType == 1 || currentRoom.checkInRoomType == 2
        "
        :key="0"
        name="first"
      >
        <div class="buttonBox">
          <el-button type="primary" size="small" plain>置脏</el-button>
          <el-button type="primary" size="small" plain>账务</el-button>
          <el-button type="primary" size="small" plain>挂账</el-button>
          <el-button type="primary" size="small" plain>结账退房</el-button>
        </div>
        <div class="infoBox">
          <div class="public">
            <div class="infoTitle">入住信息：</div>
            <div class="itemDetail">
              <el-row>
                <el-col :span="6">预订单号：498576890458</el-col>
                <el-col :span="6" :offset="1">订单来源：前台</el-col>
                <el-col :span="6" :offset="1">外部订单号：398759487430</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">地区：安徽省合肥市蜀山区</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">入住时间：2020-04-26 12:00</el-col>
                <el-col :span="6" :offset="1"
                  >预离时间：2020-04-27 12:00</el-col
                >
                <el-col :span="6" :offset="1">入住天数：1</el-col>
              </el-row>
            </div>
          </div>
          <div class="public otherStyle">
            <div class="infoTitle">预约内容/住宿plan：</div>
            <div class="itemDetail">
              <el-row>
                <el-col :span="6">消费合计：80000</el-col>
                <el-col :span="6" :offset="1">付款合计：9000</el-col>
              </el-row>
              <el-row>
                <el-col :span="18"
                  >付款方式：现金（2000）；信用卡（4000）；挂账（1000）；其他（2000））</el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6">预约人：张三【zhangsan】</el-col>
                <el-col :span="8" :offset="1"
                  >预约人电话：（手）18077689906</el-col
                >
              </el-row>
            </div>
          </div>
          <el-table
            v-if="
              currentRoom.currentRoomData.personList &&
              currentRoom.currentRoomData.personList.length > 0
            "
            :data="currentRoom.currentRoomData.personList"
            style="width: 100%" 
            border
            header-row-class-name="default"
            size="small"
          >
            <el-table-column label="入住人/单位名称/团队名" width="150">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column :label="$t('desk.home_phoneNum')" width>
              <template slot-scope="scope">{{ scope.row.mobile }}</template>
            </el-table-column>
            <el-table-column :label="$t('desk.customer_sex')" width>
              <template slot-scope="scope">
                {{ F_sex(scope.row.sex) }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('desk.order_sourceType')" width>
              <template slot-scope="scope"
                >{{ F_guestType(scope.row.checkIn.guestType) }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('desk.customer_toTheGuest')" width>
              <template>{{ currentRoom.personLength }} </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!-- 房间信息 -->
      <el-tab-pane :label="$t('desk.roomInfoDesc')" :key="1" name="second">
        <div class="inMsg">
          <div class="row">
            <div class="col">
              {{ $t("manager.hk_doorPrice") }}：
              <span>{{ currentRoom.currentRoomData.realPrice }}</span>
            </div>
            <div class="col">
              {{ $t("desk.home_window") }}：
              <span>{{ F_is1or2(currentRoom.windowFlag) }}</span>
            </div>
            <div class="col">
              {{ $t("manager.hk_toward") }}:
              <span>{{ F_is1or2(currentRoom.toward) }}</span>
            </div>
            <div class="col">
              {{ $t("desk.home_roomRemark") }}：
              <span>{{ currentRoom.remark }}</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button
        style="width: 60px"
        v-if="
          currentRoom.roomStatus == 'null' ||
          currentRoom.roomStatus == null ||
          currentRoom.roomStatus == 1 ||
          currentRoom.roomStatus == 3
        "
        @click="handleOperRoomStatus(2, currentRoom)"
        >{{ $t("desk.home_putDirty") }}
      </el-button>
      <el-button
        style="width: 60px"
        v-if="currentRoom.roomStatus == 2 || currentRoom.roomStatus == 4"
        @click="handleOperRoomStatus(1, currentRoom)"
        >{{ $t("desk.home_buyNet") }}
      </el-button>
      <el-button style="width: 60px" @click="handleFix(currentRoom)"
        >{{ $t("desk.home_service") }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import myMixin from "@/utils/filterMixin";
export default {
  props: ["currentRoom"],
  computed: {
    activeName: {
      get() {
        if (
          this.currentRoom.checkInRoomType == 1 ||
          this.currentRoom.checkInRoomType == 2
        ) {
          return "first";
        } else {
          return "second";
        }
      },
      set() {},
    },
  },
  mixins: [myMixin],
  data() {
    return {
      hosteldis: false,
    };
  },
  created() {},
  methods: {
    changeVisible() {
      this.hosteldis = true;
    },
    checkTitleEnd() {
      if (
        this.currentRoom.checkIn &&
        this.currentRoom.checkIn.operCheckinType
      ) {
        switch (this.currentRoom.checkIn.operCheckinType) {
          case 1:
            return "普通入住";
            break;
          case 2:
            return "时租房入住";
            break;
          case 3:
            return "会场";
            break;
        }
      } else {
        return "";
      }
    },
    handleOperRoomStatus(status, item) {
      // console.log(s) // ; // let status = ''; // if (s == 1 || s == null || s == 'null') { //     status = 2 // } // if (s == 3) { //     status = 4 // } // if (s == 2) { //     status = 1 // } // if (s == 4) { //     status = 1 // }
      item.roomStatus = status;
      this.$F.doRequest(
        this,
        "/pms/hotel/oper_room_status",
        {
          roomIds: item.id,
          roomStatus: status,
        },
        (res) => {
          this.hosteldis = false;
          this.$message({
            message: this.$t("commons.request_success"),
            type: "success",
          });
          // this.getDataList()
        }
      );
    },
    //将房间设置为维修状态
    handleFix(item) {
      this.$confirm(
        this.$t("desk.home_sureService"),
        this.$t("commons.tip_desc"),
        {
          confirmButtonText: this.$t("commons.confirm"),
          cancelButtonText: this.$t("commons.cancel"),
          type: "warning",
        }
      )
        .then(() => {
          this.$F.doRequest(
            this,
            "/pms/hotel/oper_room_status",
            {
              roomStatus: 5,
              roomIds: item.id,
            },
            (res) => {
              this.$message({
                message: this.$t("commons.request_success"),
                type: "success",
              });
              this.hosteldis = false;
            }
          );
        })
        .catch(() => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.buttonBox {
  box-sizing: border-box;
  padding: 10px;
}

.infoBox {
  box-sizing: border-box;
  padding: 10px;
  padding-top: 0;
  .public {
    margin-bottom: 20px;
    .infoTitle {
      font-weight: 600;
      margin-bottom: 10px;
    }
    .itemDetail {
      .el-row {
        margin-bottom: 10px;
      }
    }
  }
  .otherStyle {
    margin-bottom: 10px;
  }
}
</style>
