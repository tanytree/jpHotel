<!-- 房锁维护 -->
<template>
  <div id="page1" class="boss-index">
    <el-row :gutter="20" style="font-size: 14px; font-weight: bolder;">
      <el-col :span="2.5">{{hotel_name || ''}}</el-col>
      <el-col
        :span="2"
      >{{$t('manager.hk_total')}}{{dongList.length || ''}}{{$t('manager.hk_building')}}</el-col>
    </el-row>
    <el-row style="padding: 20px 0px;">
      <el-radio-group v-model="selectRedio">
        <el-radio-button
          :label="value.id"
          v-for="(value, index) in dongList"
          :key="index"
        >{{value.name}}</el-radio-button>
      </el-radio-group>
    </el-row>
    <el-row :gutter="20" class="demo-form-inline">
      <el-col :span="10" :offset="14">
        <el-row class="form-inline-flex" style="margin-bottom: 20px;">
          <el-button
            type="primary"
            size="mini"
            @click="popup('addPie')"
          >{{$t('manager.hk_batchModify')}}</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-container direction="vertical" class="boss-index">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        height="100%"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
      >
        <el-table-column prop="houseNum" :label="$t('manager.hk_roomNumber')"></el-table-column>
        <el-table-column prop="time" :label="$t('manager.hk_hardWare')">
          <template slot-scope="{row}">
            <span>{{row.hotelRoomLock.hardware}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('manager.hp_storiedBuilding')">
          <template slot-scope="{row}">
            <span>{{row.hotelBuilding.name}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('manager.hp_floor')">
          <template slot-scope="{row}">
            <span>{{row.hotelBuildingFloor.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" :label="$t('manager.hk_lock')">
          <template slot-scope="{row}">
            <span>{{row.hotelRoomLock.lockNum}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="part" :label="$t('manager.hk_interfaceType')">
          <template slot-scope="{row}">
            <span>{{row.hotelRoomLock.apiType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="job" :label="$t('manager.hk_roomLockInfo')">
          <template slot-scope="{row}">
            <span>{{row.hotelRoomLock.setInfo}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" :label="$t('manager.hk_cardNum')">
          <template slot-scope="{row}">
            <span>{{row.hotelRoomLock.cardNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="part" :label="$t('manager.hk_theOpen')">
          <template slot-scope="{row}">
            <span v-if="row.hotelRoomLock.openOpposite">{{$t('manager.hk_yes')}}</span>
            <span v-else>{{$t('manager.hk_no')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="setInfo" :label="$t('manager.hk_lockType')">
          <template slot-scope="{row}">
            <span>{{row.hotelRoomLock.lockType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" :label="$t('manager.hk_roomWhterNum')">
          <template slot-scope="{row}">
            <span>{{row.hotelRoomLock.roomSerial}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="part" :label="$t('manager.hk_roomSerialNum')">
          <template slot-scope="{row}">
            <span>{{row.hotelRoomLock.roomImei}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="popup('change', scope.row)"
            >{{$t('commons.modify')}}</el-button>
            <el-button
              type="text"
              size="small"
              @click="popup('detail', scope.row)"
            >{{$t('commons.detail')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="form.pageSize"
        :total="form.totalSize"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </el-container>
    <!-- 按列批量修改 -->
    <el-dialog
      top="0"
      :title="$t('manager.hk_batchModify')"
      :visible.sync="dialogAdd_kinds"
      :close-on-click-modal="false"
    >
      <el-row class="demo-form-inline">
        <el-checkbox-group v-model="checkList" style="line-height: 30px;">
          <el-checkbox label="a">{{$t('manager.hk_hardWare')}}</el-checkbox>
          <!-- <el-checkbox label="b">楼栋</el-checkbox>
          <el-checkbox label="c">楼层</el-checkbox>-->
          <el-checkbox label="d">{{$t('manager.hk_lock')}}</el-checkbox>
          <el-checkbox label="e">{{$t('manager.hk_interfaceType')}}</el-checkbox>
          <el-checkbox label="f">{{$t('manager.hk_doorInfo')}}</el-checkbox>

          <el-checkbox label="g">{{$t('manager.hk_cardNum')}}</el-checkbox>
          <el-checkbox label="h">{{$t('manager.hk_theOpen')}}</el-checkbox>
          <el-checkbox label="i">{{$t('manager.hk_lockType')}}</el-checkbox>
          <el-checkbox label="j">{{$t('manager.hk_roomWhterNum')}}</el-checkbox>
          <el-checkbox label="k">{{$t('manager.hk_roomSerialNum')}}</el-checkbox>
          <el-checkbox label="l">{{$t('manager.hk_params')}}1</el-checkbox>

          <el-checkbox label="m">{{$t('manager.hk_params')}}2</el-checkbox>
          <el-checkbox label="n">{{$t('manager.hk_params')}}3</el-checkbox>
          <el-checkbox label="o">{{$t('manager.hk_params')}}4</el-checkbox>
          <el-checkbox label="p">{{$t('manager.hk_params')}}5</el-checkbox>
          <el-checkbox label="q">{{$t('manager.hk_params')}}6</el-checkbox>
          <el-checkbox label="r">{{$t('manager.hk_params')}}7</el-checkbox>
          <el-checkbox label="s">{{$t('manager.hk_params')}}8</el-checkbox>
        </el-checkbox-group>
      </el-row>
      <el-row>
        <!-- 这里看设计图，因为不一样，根据列不一样展示下拉，输入框，或者单选 -->
        <el-table
          ref="multipleTable"
          :data="tableData_select"
          tooltip-effect="dark"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        >
          <el-table-column :label="$t('manager.hk_name')" width="200">
            <template slot-scope="{row, $index}">
              <div v-for="(value, index) in checkList" :key="index">
                <el-row class="demo-flex" v-if="value =='a'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_hardWare')}}</el-col>
                </el-row>
                <el-row class="demo-flex" v-if="value =='d'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_lock')}}</el-col>
                </el-row>
                <el-row class="demo-flex" v-if="value =='e'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_interfaceType')}}</el-col>
                </el-row>
                <el-row class="demo-flex" v-if="value =='f'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_doorInfo')}}</el-col>
                </el-row>

                <el-row class="demo-flex" v-if="value =='g'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_cardNum')}}</el-col>
                </el-row>
                <el-row class="demo-flex" v-if="value =='h'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_theOpen')}}</el-col>
                </el-row>
                <el-row class="demo-flex" v-if="value =='i'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_lockType')}}</el-col>
                </el-row>
                <el-row class="demo-flex" v-if="value =='j'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_roomWhterNum')}}</el-col>
                </el-row>
                <el-row class="demo-flex" v-if="value =='k'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_roomSerialNum')}}</el-col>
                </el-row>
                <el-row class="demo-flex" v-if="value =='l'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_params')}}1</el-col>
                </el-row>

                <el-row class="demo-flex" v-if="value =='m'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_params')}}2</el-col>
                </el-row>
                <el-row class="demo-flex" v-if="value =='n'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_params')}}3</el-col>
                </el-row>
                <el-row class="demo-flex" v-if="value =='o'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_params')}}4</el-col>
                </el-row>
                <el-row class="demo-flex" v-if="value =='p'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_params')}}5</el-col>
                </el-row>
                <el-row class="demo-flex" v-if="value =='q'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_params')}}6</el-col>
                </el-row>
                <el-row class="demo-flex" v-if="value =='r'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_params')}}7</el-col>
                </el-row>
                <el-row class="demo-flex" v-if="value =='s'">
                  <el-col :span="8" class="title-co">{{$t('manager.hk_params')}}8</el-col>
                </el-row>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('manager.hk_setValue')">
            <template slot-scope="{row, $index}">
              <div v-for="(value, index) in checkList" :key="index">
                <el-row class="demo-flex" v-if="value =='a'">
                  <el-select
                    v-model="row.hardware"
                    :placeholder="row.hourAddPrice"
                    style="width: 100%;"
                  >
                    <el-option
                      :label="value.label"
                      :value="value.label"
                      v-for="(value, index) in hardwareList"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-row>
                <el-row class="demo-flex" v-if="value =='d'">
                  <el-input v-model="row.lockNum"></el-input>
                </el-row>
                <el-row class="demo-flex" v-if="value =='e'">
                  <el-input v-model="row.apiType"></el-input>
                </el-row>
                <el-row class="demo-flex" v-if="value =='f'">
                  <el-input v-model="row.setInfo"></el-input>
                </el-row>

                <el-row class="demo-flex" v-if="value =='g'">
                  <el-input v-model="row.cardNumber"></el-input>
                </el-row>
                <el-row class="demo-flex" v-if="value =='h'">
                  <el-radio-group v-model="row.openOpposite">
                    <el-radio :label="1">{{$t('manager.hk_yes')}}</el-radio>
                    <el-radio :label="0">{{$t('manager.hk_no')}}</el-radio>
                  </el-radio-group>
                </el-row>
                <el-row class="demo-flex" v-if="value =='i'">
                  <el-input v-model="row.lockType"></el-input>
                </el-row>
                <el-row class="demo-flex" v-if="value =='j'">
                  <el-input v-model="row.roomSerial"></el-input>
                </el-row>
                <el-row class="demo-flex" v-if="value =='k'">
                  <el-input v-model="row.roomImei"></el-input>
                </el-row>
                <el-row class="demo-flex" v-if="value =='l'">
                  <el-input v-model="row.lockP1"></el-input>
                </el-row>

                <el-row class="demo-flex" v-if="value =='m'">
                  <el-input v-model="row.lockP2"></el-input>
                </el-row>
                <el-row class="demo-flex" v-if="value =='n'">
                  <el-input v-model="row.lockP3"></el-input>
                </el-row>
                <el-row class="demo-flex" v-if="value =='o'">
                  <el-input v-model="row.lockP4"></el-input>
                </el-row>
                <el-row class="demo-flex" v-if="value =='p'">
                  <el-input v-model="row.lockP5"></el-input>
                </el-row>
                <el-row class="demo-flex" v-if="value =='q'">
                  <el-input v-model="row.lockP6"></el-input>
                </el-row>
                <el-row class="demo-flex" v-if="value =='r'">
                  <el-input v-model="row.lockP7"></el-input>
                </el-row>
                <el-row class="demo-flex" v-if="value =='s'">
                  <el-input v-model="row.lockP8"></el-input>
                </el-row>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" @click="savePi">{{$t('commons.determine')}}</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      top="0"
      :title="dia_title"
      :visible.sync="dialogChange_show"
      :close-on-click-modal="false"
    >
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row class="demo-form-inline">
          <el-col>
            <!-- 得去确认哪些是必填项 -->
            <!-- 详情和修改是一样的，可以将输入框变成不可输入，去掉取消确认按钮 标题变成详情-->
            <el-form-item :label="$t('manager.hk_roomNumber')">
              <el-input v-model="ruleForm.houseNum" :disabled="isDisable || detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hp_floor')">
              <el-input
                v-model="ruleForm.hotelBuildingFloor.name"
                :disabled="isDisable || detail_show"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_interfaceType')">
              <el-input v-model="ruleForm.hotelRoomLock.apiType" :disabled="detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_theOpen')">
              <el-radio-group v-model="ruleForm.hotelRoomLock.openOpposite">
                <el-radio
                  :label="value.status"
                  v-for="(value, index) in is_openOpposite"
                  :key="index"
                >{{value.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_roomWhterNum')">
              <el-input v-model="ruleForm.hotelRoomLock.roomSerial" :disabled="detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_doorParams')+1">
              <el-input v-model="ruleForm.hotelRoomLock.lockP1" :disabled="detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_doorParams')+3">
              <el-input v-model="ruleForm.hotelRoomLock.lockP3" :disabled="detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_doorParams')+5">
              <el-input v-model="ruleForm.hotelRoomLock.lockP5" :disabled="detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_doorParams')+7">
              <el-input v-model="ruleForm.hotelRoomLock.lockP7" :disabled="detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_hardWare')+':'">
              <el-select
                v-model="ruleForm.hotelRoomLock.hardware"
                :placeholder="ruleForm.hotelRoomLock.hardware"
                style="width: 120px"
                :disabled="detail_show"
              >
                <el-option
                  :label="value.label"
                  :value="value.label"
                  v-for="(value, index) in hardwareList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="margin-l-15">
            <el-form-item :label="$t('manager.hp_storiedBuilding')">
              <el-input v-model="ruleForm.hotelBuilding.name" :disabled="isDisable || detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_lock')">
              <el-input v-model="ruleForm.hotelRoomLock.lockNum" :disabled="detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_roomInfo')">
              <el-input v-model="ruleForm.hotelRoomLock.setInfo" :disabled="detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_lockType')">
              <el-input v-model="ruleForm.hotelRoomLock.lockType" :disabled="detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_roomSerialNum')">
              <el-input v-model="ruleForm.hotelRoomLock.roomImei" :disabled="detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_doorParams')+2">
              <el-input v-model="ruleForm.hotelRoomLock.lockP2" :disabled="detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_doorParams')+4">
              <el-input v-model="ruleForm.hotelRoomLock.lockP4" :disabled="detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_doorParams')+6">
              <el-input v-model="ruleForm.hotelRoomLock.lockP6" :disabled="detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_doorParams')+8">
              <el-input v-model="ruleForm.hotelRoomLock.lockP8" :disabled="detail_show"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hk_cardNum')">
              <el-input v-model="ruleForm.hotelRoomLock.cardNumber" :disabled="detail_show"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="!detail_show">
        <el-button @click="centerDialogVisible = false">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" @click="defineSingle">{{$t('commons.determine')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    modify: {
      get() {
        return this.$t("commons.modify");
      },
      set() {},
    },
    detail: {
      get() {
        return this.$t("commons.detail");
      },
      set() {},
    },
    saveSuccess: {
      get() {
        return this.$t("commons.saveSuccess");
      },
      set() {},
    },
  },
  data() {
    return {
      hotel_name: "",
      dongList: [], //楼栋列表
      selectRedio: 0,
      form: {
        pageIndex: 1,
        pageSize: 10,
        buildingId: "",
        totalSize: 0,
      },
      tableData: [],
      dialogAdd_kinds: false,
      checkList: [],
      tableData_select: [
        {
          roomIds: "",
          lockNum: "",
          apiType: "",
          setInfo: "",
          openOpposite: "",
          lockType: "",
          roomSerial: "",
          roomImei: "",
          lockP1: "",
          lockP2: "",
          lockP3: "",
          lockP4: "",
          lockP5: "",
          lockP6: "",
          lockP7: "",
          lockP8: "",
          hardware: "",
          cardNumber: "",
        },
      ],
      dialogChange_show: false,
      dia_title: "修改",
      isDisable: false,
      ruleForm: {
        //列表选中的行
        houseNum: "",
        hotelBuilding: {
          name: "",
        },
        hotelBuildingFloor: {
          name: "",
        },
        hotelRoomLock: {
          roomIds: "",
          lockNum: "",
          apiType: "",
          setInfo: "",
          openOpposite: "",
          lockType: "",
          roomSerial: "",
          roomImei: "",
          lockP1: "",
          lockP2: "",
          lockP3: "",
          lockP4: "",
          lockP5: "",
          lockP6: "",
          lockP7: "",
          lockP8: "",
          hardware: "",
          cardNumber: "",
        },
      },
      is_openOpposite: [
        {
          // 是否反开
          name: "是",
          status: 1,
        },
        {
          name: "否",
          status: 2,
        },
      ],
      hardwareList: [
        {
          // 硬件类型列表
          label: "双峰",
        },
      ],
      detail_show: false, //展示详情时的
    };
  },
  watch: {
    selectRedio() {
      this.hotel_room_lock_list();
    },
    modify(newValue, oldValue) {
      this.modify = newValue;
    },
    detail(newValue, oldValue) {
      this.detail = newValue;
    },
    saveSuccess(newValue, oldValue) {
      this.saveSuccess = newValue;
    },
  },
  created() {
    this.hotel_name = JSON.parse(
      sessionStorage.getItem("userData")
    ).storesInfo.storesName;
    this.get_dong_list();
  },
  methods: {
    popup(type, value) {
      switch (type) {
        case "addPie":
          this.checkList = [];
          this.dialogAdd_kinds = true;
          break;
        case "change":
          this.dialogChange_show = true;
          this.isDisable = true;
          this.ruleForm = value;
          this.detail_show = false;
          this.dia_title = this.modify;
          break;
        case "detail":
          this.dialogChange_show = true;
          this.isDisable = true;
          this.ruleForm = value;
          this.detail_show = true;
          this.dia_title = this.detail;
          break;
      }
    },
    // 批量修改--保存
    savePi() {
      let params = {};
      let roomIds = "";
      this.tableData_select.forEach((item) => {
        params = item;
      });
      this.tableData.forEach((item) => {
        roomIds = roomIds + "," + item.id;
      });
      if (roomIds.substr(0, 1) === ",") {
        roomIds = roomIds.substr(1);
      }
      params.roomIds = roomIds;
      params.status = 1;
      debugger;
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_room_lock_save",
        params,
        (res) => {
          this.$message({
            message: this.saveSuccess,
            type: "success",
          });
          this.tableData = [];
          this.dialogAdd_kinds = false;
          this.hotel_room_lock_list();
        }
      );
    },
    // 修改
    defineSingle() {
      let params = Object.assign({}, this.ruleForm.hotelRoomLock);
      params.roomIds = this.ruleForm.id;
      params.status = 1;
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_room_lock_save",
        params,
        (res) => {
          this.$message({
            message: this.saveSuccess,
            type: "success",
          });
          this.tableData = [];
          this.dialogChange_show = false;
          this.hotel_room_lock_list();
        }
      );
    },
    // 获取 楼栋列表
    get_dong_list() {
      this.$F.doRequest(this, "/pms/hotel/hotel_building_list", {}, (res) => {
        if (res.length != 0) {
          this.dongList = res;
          this.selectRedio = this.dongList[0].id;
          this.hotel_room_lock_list();
        }
      });
    },
    // 获取 房间门锁列表
    hotel_room_lock_list() {
      // debugger
      this.form.buildingId = this.selectRedio;
      let params = Object.assign({}, this.form);
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_room_lock_list",
        params,
        (res) => {
          if (res.length != 0) {
            this.tableData = res.list;
            this.form.totalSize = res.totalSize;
          }
        }
      );
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.form.pageIndex = 1;
      this.hotel_room_lock_list();
    },
    handleCurrentChange(val) {
      this.form.pageIndex = val;
      this.hotel_room_lock_list();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.row-width {
  width: 120px;
}
.boss-index {
  height: 100%;
}
.demo-flex {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.title-co {
  color: #126eff;
  width: 100%;
}
</style>
