<template>
  <div>
    <el-row class="demo-form-inline">
      <div class="tag-group">
        <span class="tag-group__title">{{$t('manager.hp_toRoom')}}</span>
        <el-tag
          effect="plain"
          class="tag-width2 margin-l2"
        >{{ $t('commons.all') + '(' + F_roomStatus('', 'total') + ')' }}</el-tag>
        <el-tag
            v-for="(value, key) in $t('commons.F_roomStatus')"
          :key="key"
          :type="key"
          effect="plain"
          class="tag-width2 margin-l2"
        >{{ value + '(' + F_roomStatus(key) + ')' }}</el-tag>
      </div>
      <el-form class="demo-form-inline" inline size="small" style="margin-left: 100px;">
        <el-form-item :label="$t('manager.hp_floorBuilding')+':'" class="margin-l-15">
          <el-select
            v-model="form.buildingId"
            :placeholder="$t('manager.hp_storiedBuilding')"
            class="row-width"
            @change="dongChange"
          >
            <el-option
              :label="value.name"
              :value="value.id"
              v-for="(value, index) in dongList"
              :key="index"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.buildingFloorId"
            :placeholder="$t('manager.hp_floor')"
            class="row-width"
            style="margin-left: 10px;"
            @change="cengChange"
          >
            <el-option
              :label="value.name"
              :value="value.id"
              v-for="(value, index) in cengList"
              :key="index"
            ></el-option>
          </el-select>
          <el-button
            plain
            style="width: 100px;margin-left: 30px;"
            @click="reset"
          >{{$t('commons.resetBtn')}}</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="demo-form-inline">
      <div class="tag-group">
        <span class="tag-group__title">{{$t('manager.hp_room')+':'}}</span>
        <el-tag
          effect="plain"
          class="tag-width2 margin-l2"
        >{{ $t('commons.all') + '(' + F_roomStatus('roomType', 'total') + ')' }}</el-tag>
        <el-tag
          v-for="(item, i) in roomInfo.roomTypeList"
          :key="i"
          :type="item.roomTypeId"
          effect="plain"
          class="tag-width2 margin-l2"
        >{{ (item.houseName || $t('manager.hp_unknown')) + '(' + item.total + ')' }}</el-tag>
      </div>
    </el-row>
    <template v-for="(item, index) in rooms_list_info.floorList">
      <el-row :key="index" v-if="item.floorRoomCount>0">
        <el-row :gutter="20" style="margin-top: 10px;">
          <el-col :span="5">
            {{item.building?item.building.name:''}}
            <span>{{item.floor}}</span>
            {{$t('manager.hp_layer')}}
          </el-col>
          <el-col :span="1" :offset="0.5" style="color: #999;">
            <span style="color: #126eff;">{{item.reserveFloorRoomCount}}</span>
            /{{item.floorRoomCount}}
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 10px;">
          <el-col
            @click.native="hostelmess(room)"
            :span="4"
            class="tag-margin"
            :style="`height:120px;background:${F_roomStatusColor(room.roomStatus)};cursor: pointer;`"
            v-for="(room, i) in item.roomList"
            :key="i"
          >
            <el-row style="color: #FFFFFF;font-size: 13px;margin-top: 10px;">
              <el-col :span="3">{{room.houseNum}}</el-col>
              <el-col :span="8" :offset="2">{{room.hotelRoomType.houseName}}</el-col>
            </el-row>
            <el-row
              style="color: #FFFFFF;font-size: 13px;margin-top: 10px;"
              v-if="room.livingPersonList && room.livingPersonList.length&&(room.roomStatus==3 || room.roomStatus==4)"
            >
              <el-col :span="8">{{room.livingPersonList[0].name}}</el-col>
              <el-col :span="8" :offset="2">{{room.livingPersonList[0].sex | F_sex}}</el-col>
            </el-row>
            <!-- 清扫图标后期加 -->
            <div class="placeIcon text-center" v-if="room.roomStatus==2 || room.roomStatus==5">
              <img v-if="room.roomStatus==5" :src="require('@/assets/images/frontdesk/fix.png')" />
              <img v-if="room.roomStatus==2" :src="require('@/assets/images/frontdesk/clearn.png')" />
            </div>
          </el-col>
        </el-row>
      </el-row>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "one",
      form: {},
      dongList: [],
      cengList: [],
      roomInfo: {}, //筛选区 房间信息
      rooms_list_info: [],
      roomList: [],
    };
  },
  mounted() {
    this.get_realtime_room_statistics();
    this.get_dong_list();
    this.get_realtime_hotel_room_list();
    this.initForm();
  },
  methods: {
    initForm() {
      this.form = {
        roomStatus: "",
        roomTypeId: "",
        buildingId: "",
        buildingFloorId: "",
      };
    },
    reset() {
      this.initForm();
      this.get_realtime_hotel_room_list();
    },
    // 获取  实时房态
    get_realtime_room_statistics() {
      this.$F.doRequest(
        this,
        "/pms/realtime/realtime_room_statistics",
        {},
        (res) => {
          this.roomInfo = res;
        }
      );
    },
    // 获取 实时房间列表
    get_realtime_hotel_room_list() {
      let params = Object.assign({}, this.form);
      this.$F.doRequest(
        this,
        "/pms/realtime/realtime_hotel_room_list",
        params,
        (res) => {
          this.rooms_list_info = res;
          this.$forceUpdate();
        }
      );
    },
    dongChange(id) {
      this.get_ceng_list(id);
      this.get_realtime_hotel_room_list();
    },
    // 获取 楼栋列表
    get_dong_list() {
      this.$F.doRequest(this, "/pms/hotel/hotel_building_list", {}, (res) => {
        this.dongList = res;
        this.get_ceng_list(this.dongList[0].id);
      });
    },

    cengChange() {
      this.get_realtime_hotel_room_list();
    },
    // 获取 楼层列表
    get_ceng_list(id) {
      let params = {
        buildingId: id,
      };
      this.cengList = [];
      this.form.buildingFloorId = "";
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_building_floor_list",
        params,
        (res) => {
          this.cengList = res || [];
        }
      );
    },

    F_roomStatus(value, type) {
      let enums = this.roomInfo.roomStatusList || [];
      if (type == "total") {
        var total = 0;
        if (value == "roomType") enums = this.roomInfo.roomTypeList || [];
        enums.forEach((item) => {
          total += item.total;
        });
        return total;
      } else {
        var array = enums.filter((item) => {
          return item.roomStatus == value;
        });
        return array.length > 0 ? array[0].total : 0;
      }
    },
    F_roomStatusColor(value) {
      let enums = {
        "1": "#27AE76",
        "2": "#C0512B",
        "3": "#276BBA",
        "4": "#C0512B",
        "5": "#27AE76",
      };
      return enums[value] ? enums[value] : "#276BBA";
    },
  },
};
</script>

<style lang="less" scoped>
.tag-width2 {
  width: 80px;
  display: flex;
  justify-content: center;
}

.margin-l2 {
  /*margin-left: 8px;*/
}

.tag-margin2 {
  margin-right: 8px;
  margin-top: 8px;
}

.row-width2 {
  width: 120px;
}
</style>
