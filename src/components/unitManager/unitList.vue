<template>
  <div>
    <el-row :gutter="20" v-if="tab1_show">
      <el-row>
        <el-form class="demo-form-inline" inline size="small">
          <el-form-item :label="$t('manager.ps_ruleName')+':'">
            <el-input v-model="searchForm.ruleName" class="row-width"></el-input>
          </el-form-item>
          <el-form-item :label="$t('boss.loginDetail_state')+':'" class="margin-l-15">
            <el-select
              v-model="searchForm.state"
              :placeholder="$t('boss.compensation_selectState')"
              class="row-width"
            >
              <el-option :label="$t('commons.enable')" value="1"></el-option>
              <el-option :label="$t('commons.disable')" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100px;"
              size="mini"
              @click="get_price_enter_strategy_list"
            >{{$t('commons.queryBtn')}}</el-button>
          </el-form-item>
          <el-form-item class="form-inline-flex">
            <el-row class="form-inline-flex">
              <el-button
                type="primary"
                @click="popup('add')"
                style="width: 100px;"
                size="mini"
              >{{$t('commons.newAdd')}}</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-row>
      <div class="components-edit">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        >
          <el-table-column prop="ruleName" :label="$t('manager.ps_ruleName')"></el-table-column>
          <el-table-column :label="$t('boss.loginDetail_state')">
            <template slot-scope="{row}">
              <span>{{row.state ? $t('commons.enable'):$t('commons.disable')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ruleName" :label="$t('boss.loginDetail_note')"></el-table-column>
          <el-table-column :label="$t('commons.operating')" width="350">
            <template slot-scope="{row}">
              <el-button
                type="text"
                size="small"
                @click="popup('see', row)"
              >{{$t('boss.compensation_toView')}}</el-button>
              <el-button
                type="text"
                size="small"
                @click="popup('change', row)"
              >{{$t('commons.modify')}}</el-button>
              <el-popconfirm
                :title="$t('manager.hp_bulletTitle')"
                @onConfirm="get_price_enter_strategy_delete(row)"
              >
                <el-button
                  slot="reference"
                  type="text"
                  size="small"
                  v-if="row.state == 0"
                >{{$t('commons.delete')}}</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>

    <el-row v-if="!tab1_show">
      <el-row style="padding: 20px 0px;">
        <el-page-header @back="back_1" content></el-page-header>
      </el-row>
      <el-row :gutter="20">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-row>
            <el-col :span="5">
              <el-form-item
                :label="$t('manager.ps_ruleName')+':'"
                prop="ruleName"
                style="display: flex;align-items: center;"
              >
                <el-input v-model="ruleForm.ruleName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item :label="$t('boss.loginDetail_state')+':'">
                <el-radio-group v-model="ruleForm.state">
                  <el-radio :label="1">{{$t('commons.enable')}}</el-radio>
                  <el-radio :label="0">{{$t('commons.disable')}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="20">
            <el-form-item :label="$t('manager.grsl_selectTime')+':'" prop="time">
              <el-date-picker
                v-model="ruleForm.time"
                type="daterange"
                align="right"
                value-format="yyyy-MM-dd"
                unlink-panels
                :range-separator="$t('boss.report_toText')"
                :start-placeholder="$t('manager.ps_startDate')"
                :end-placeholder="$t('manager.ps_endDate')"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item :label="$t('manager.ps_selectWeek')+':'" prop="name">
              <el-checkbox-group v-model="ruleForm.weeks" @change="handleWeekDayChange">
                <el-checkbox
                  v-for="(item, index) in weekDays"
                  :label="item.value"
                  :key="index"
                >{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item :label="$t('manager.ps_discount')+':'" prop="name">
              <el-radio-group v-model="ruleForm.discounts">
                <el-radio label="1">{{$t('manager.ps_upword')}}</el-radio>
                <el-radio label="2">{{$t('manager.ps_down')}}</el-radio>
                <el-radio label="3">{{$t('manager.ps_fourAndFive')}}</el-radio>
                <!-- <el-radio label="4">保持不变</el-radio> -->
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="ruleForm.roomStrategyJson"
        tooltip-effect="dark"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
      >
        <el-table-column prop="houseName" :label="$t('manager.hp_room')"></el-table-column>
        <el-table-column prop="marketPrice" :label="$t('manager.hk_doorPrice')"></el-table-column>
        <el-table-column :label="$t('manager.ps_changPriceWay')">
          <template slot-scope="{row, $index}">
            <el-row class="demo-form-inline">
              <el-select
                v-model="row.adjustType"
                :placeholder="$t('manager.hk_pleaseSelect')"
                style="width: 150px;"
                @change="change(row)"
              >
                <el-option :label="$t('manager.ps_discount')" value="1"></el-option>
                <el-option :label="$t('manager.ps_fixedPrice')" value="2"></el-option>
              </el-select>
              <span v-if="row.adjustType == 1">
                <el-input
                  v-model.number="row.content"
                  min="1"
                  max="100"
                  style="width: 120px;margin: 0px 15px;"
                  @input="priceBlur(row, $index)"
                ></el-input>%
              </span>
              <span v-if="row.adjustType == 2">
                <el-input
                  v-model.number="row.content"
                  min="1"
                  max="100"
                  style="width: 120px;margin: 0px 15px;"
                  @input="priceBlur(row, $index)"
                ></el-input>
                {{$t('manager.ps_japanYen')}}
              </span>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('manager.ps_dueTo')">
          <template slot-scope="{row}">
            <el-input v-model="row.adjustPrice" :disabled="true"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="padding: 20px 0px;">
        <el-button type="primary" style="width: 80px;" @click="onSave">{{$t('commons.save')}}</el-button>
        <el-button
          style="width: 80px;margin-left: 20px; cursor: pointer"
          @click="back_1()"
        >{{$t('commons.back')}}</el-button>
      </el-row>
    </el-row>

    <!-- 查看 -->
    <el-dialog
      top="0"
      :title="$t('boss.compensation_toView')"
      :visible.sync="dialogDetail"
      :close-on-click-modal="false"
    >
      <el-row style="line-height: 30px;">
        <el-row>
          <el-col span="6" style="color: #898B8E;">{{$t('manager.ps_ruleName')+':'}}</el-col>
          <el-col span="14">{{detail_info.ruleName}}</el-col>
        </el-row>
        <el-row>
          <el-col span="6" style="color: #898B8E;">{{$t('boss.loginDetail_state')+':'}}</el-col>
          <el-col span="14">{{detail_info.state==1? $t('commons.enable'):$t('commons.disable')}}</el-col>
        </el-row>
        <el-row>
          <el-col span="6" style="color: #898B8E;">{{$t('commons.time')+':'}}</el-col>
          <el-col span="14">{{detail_info.createTime}}</el-col>
        </el-row>
        <el-row>
          <el-col span="6" style="color: #898B8E;">{{$t('commons.week')+':'}}</el-col>
          <el-col span="14">{{handleShowWeeks(detail_info.weeks)}}</el-col>
        </el-row>
        <el-row>
          <el-col span="6" style="color: #898B8E;">{{$t('manager.ps_discount')+':'}}</el-col>
          <el-col span="14">{{detail_info.discounts_name}}</el-col>
        </el-row>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="detail_info.hotelPriceRoomTypeList"
        tooltip-effect="dark"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
      >
        <el-table-column prop="houseName" :label="$t('manager.hp_room')"></el-table-column>
        <el-table-column prop="marketPrice" :label="$t('manager.hk_doorPrice')"></el-table-column>
        <el-table-column prop="job_status" :label="$t('manager.ps_changPriceWay')">
          <template slot-scope="{row}">
            <span>{{row.adjustType ? $t('manager.ps_discount'):$t('manager.ps_fixedPrice')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="adjustPrice" :label="$t('manager.ps_dueTo')"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDetail = false">{{$t('commons.close')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // props: ['tab1_show'],
  data() {
    return {
      tab1_show: true,
      searchForm: {
        // 搜索列表参数
        ruleName: "",
        state: "",
      },
      tableData: [],
      ruleForm: {
        ruleName: "",
        time: "",
        startTime: "",
        endTime: "",
        weeks: [],
        discounts: "1",
        state: 1,
        roomStrategyJson: [],
      },
      rules: {
        ruleName: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
        ],
        time: [{ required: true, message: "请选择时间", trigger: "blur" }],
      },
      weekDays: [
        { label: "全选", value: "" },
        { label: "周一", value: "1" },
        { label: "周二", value: "2" },
        { label: "周三", value: "3" },
        { label: "周四", value: "4" },
        { label: "周五", value: "5" },
        { label: "周六", value: "6" },
        { label: "周日", value: "7" },
      ],
      dialogDetail: false,
      detail_info: {},
    };
  },
  mounted() {
    this.tableData = [];
    this.ruleForm.roomStrategyJson = [];
    this.get_price_enter_strategy_list();
  },

  methods: {
    handleShowWeeks(value) {
      if (value) {
        if (value.length == 7) return "每天";
        if (value == [1, 2, 3, 4, 5]);
        return "工作日";
        if (value == [6, 7]);
        return "休息日";
        let descs = this.$t("commons.weeks");
        var array = [];
        for (let i = 0; i < value.length; i++) {
          array.push(descs[i]);
        }
        return array.join(",");
      }
    },
    //单位-增加-修改
    onSave() {
      console.log(this.ruleForm);
      let params = this.$F.deepClone(this.ruleForm);
      params.startTime = params.time[0];
      params.endTime = params.time[1];
      let index = null;
      params.weeks.forEach((item, $index) => {
        if (!item) index = $index;
      });
      if (index != null) {
        params.weeks.splice(index, 1);
      }
      params.weeks = params.weeks.join(",");
      params.roomStrategyJson = JSON.stringify(params.roomStrategyJson);
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_price_enter_strategy_save",
        params,
        (res) => {
          return this.$message({
            message: this.$t('commons.request_success'),
            type: "warn",
          });
          this.back_1();
        }
      );
    },
    priceBlur(row, index) {
      if (row.adjustType == 1) {
        row.adjustPrice = (
          (row.marketPrice * (100 - row.content)) /
          100
        ).toFixed(2);
      } else {
        row.adjustPrice = row.content;
      }
      // this.$set(memberTableData.memberTypeList[0].roomTypeList, index, row);
      this.$forceUpdate();
    },
    change(row) {},
    //选择日期change事件
    handleWeekDayChange(value) {
      this.ruleForm.weeks = value;
      if (value.length == 0) this.ruleForm.weeks = [];
      // console.log(value== "")
      // let i = typeof(value)
      if (value.length == 8 || value == "") {
        if (value.length == 8) {
          this.ruleForm.weeks = [];
        } else {
          this.ruleForm.weeks = value;
          this.weekDays.forEach((week) => {
            this.ruleForm.weeks.push(week.value);
          });
        }
      } else {
        let $index = 999;
        this.ruleForm.weeks.forEach((week, index) => {
          if (week === "") {
            $index = index;
          }
        });
        if ($index != 999) {
          this.ruleForm.weeks.splice($index, 1);
        }
      }
    },
    popup(type, value) {
      switch (type) {
        case "add":
          this.tab1_show = false;
          this.allForm.ruleForm = null;
          this.ruleForm.roomStrategyJson = [];
          this.get_hotel_price_room_type_list();
          break;
        case "see":
          this.dialogDetail = true;
          this.hotel_price_enter_strategy_detail(value);
          break;
        case "change":
          this.tab1_show = false;
          this.hotel_price_enter_strategy_detail(value);
          break;
      }
    },
    // 单位--房型
    get_hotel_price_room_type_list() {
      let params = {
        pageIndex: 1,
        pageSize: 99,
        totalSize: 0,
        roomType: 3, // 房屋类型  1客房类型  2会议室房型 3全部
      };
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_room_type_list",
        params,
        (res) => {
          res.list.forEach((item) => {
            this.ruleForm.roomStrategyJson.push({
              roomTypeId: item.id,
              marketPrice: item.marketPrice,
              adjustType: "1",
              houseName: item.houseName,
              content: "",
              adjustPrice: "",
            });
          });
          this.$forceUpdate();
        }
      );
    },
    // 单位列表-查看-修改详情
    hotel_price_enter_strategy_detail(value) {
      let params = {
        id: value.id,
      };
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_price_enter_strategy_detail",
        params,
        (res) => {
          switch (res.discounts) {
            case "1":
              res.discounts_name = "向上取整";
              break;
            case "2":
              res.discounts_name = "向下取整";
              break;
            case "3":
              res.discounts_name = "四舍五入(取整)";
              break;
            case "4":
              res.discounts_name = "保持不变";
              break;
          }

          this.detail_info = res;
          this.ruleForm = res;
          let time_arr = [];
          time_arr.push(this.ruleForm.startTime);
          time_arr.push(this.ruleForm.endTime);
          this.ruleForm.time = time_arr;
          this.ruleForm.weeks = this.ruleForm.weeks.split(",");
          this.ruleForm.roomStrategyJson = this.ruleForm.hotelPriceRoomTypeList;
        }
      );
    },
    // 单位列表-删除
    get_price_enter_strategy_delete(value) {
      let params = {
        id: value.id,
      };
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_price_enter_strategy_delete",
        params,
        (res) => {
          this.get_price_enter_strategy_list();
          this.$message({
            message: this.$t('commons.delete_success'),
            type: "success",
          });
        }
      );
    },
    // 获取 价格策略单位列表
    get_price_enter_strategy_list() {
      let params = {
        status: 1,
      };
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_price_enter_strategy_list",
        params,
        (res) => {
          if (res.length != 0) {
            this.tableData = res;
          }
        }
      );
    },
    back_1() {
      this.get_price_enter_strategy_list();
      this.tab1_show = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
.demo-form-inline {
  display: flex;
  align-items: center;
}
.editPriceDialog .tip {
  font-size: 12px;
  color: #b1b1b1;
}

.row-width {
  width: 120px;
}

.padding-item {
  padding-bottom: 5px;
}

.btn-click {
  height: 200px;
  width: 300px;
  background: #e5e5e5;
  // background-color: linear-gradient(toright, #e5e5e5, #e5e5e5);
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    font-size: 30px;
  }

  span {
    font-size: 20px;
    color: #666666;
    margin-left: 10px;
  }
}

.btn-click:hover {
  height: 200px;
  width: 300px;
  background: #4db8ff;
  // background: linear-gradient(toright, #4db8ff, #1aa3ff);
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    font-size: 30px;
    color: #fff;
  }

  span {
    font-size: 20px;
    color: #fff;
    margin-left: 10px;
  }
}

.member-price .el-table .cell {
  cursor: pointer !important;
}
</style>
