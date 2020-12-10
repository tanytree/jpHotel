<!--
 * @Date: 2020-12-10 11:22:33
 * @Author: 陶子
 * @LastEditTime: 2020-12-10 15:02:54
 * @FilePath: \jiudian\src\views\market\home\roomInfo.vue
-->
<template>
  <el-dialog
    top="0"
    :visible.sync="hosteldis"
    width="800px"
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
    <el-tabs type="border-card">
      <el-tab-pane
        :label="currentRoom.label"
        v-if="
          currentRoom.checkInRoomType == 1 || currentRoom.checkInRoomType == 2
        "
        :key="0"
      >
        <div class="inMsg">
          <div class="row">
            <div class="col">
              {{ $t("desk.order_checkinDate") }}：
              <span>{{ currentRoom.checkInObj.checkinTime }}</span>
            </div>
            <div class="col">
              {{ $t("desk.consumerTotal") }}：
              <span>{{ currentRoom.consumePrice || 0 }}</span>
            </div>
            <div class="col">
              {{ $t("desk.order_departureTime") }}：
              <span>{{ currentRoom.checkInObj.checkoutTime }}</span>
            </div>
            <div class="col">
              {{ $t("desk.checkInDays") }}：
              <span>{{ currentRoom.checkInObj.checkInDays || 1 }}</span>
            </div>
            <div class="col">
              {{ $t("desk.payTotal") }}：
              <span>{{ currentRoom.payPrice || 0 }}</span>
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
            <el-table-column :label="$t('desk.home_name')" width="100">
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
          <div class="remark">
            <label>
              {{ $t("desk.home_note") }}：
              <span>{{ currentRoom.remark }}</span>
            </label>
          </div>
        </div>
      </el-tab-pane>
      <!-- 房间信息 -->
      <el-tab-pane :label="$t('desk.roomInfoDesc')" :key="1">
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
.inMsg {
  padding: 20px;

  .row {
    display: flex;
    flex-wrap: wrap;
    line-height: 26px;

    .col {
      width: 33%;

      span {
        margin-left: 5px;
      }
    }
  }

  .el-table {
    margin: 10px 0;
  }

  .remark {
    padding: 0 20px;
    display: flex;
    align-items: center;
    line-height: 30px;

    .el-button {
      font-size: 14px;
    }
  }
}
</style>
